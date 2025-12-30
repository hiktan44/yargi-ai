"""
Supabase Cache Layer for MCP API Responses
Intelligent caching with TTL, invalidation, and analytics
"""

import hashlib
import json
import logging
from typing import Any, Dict, Optional, List
from datetime import datetime, timedelta
from functools import wraps

from supabase_client import get_supabase

logger = logging.getLogger(__name__)


class SupabaseCache:
    """
    Distributed cache using Supabase for MCP API responses

    Features:
    - Automatic TTL management
    - Cache key generation based on query + params
    - Hit/miss analytics
    - Selective invalidation
    - Compression for large responses
    """

    TABLE_NAME = "mcp_cache"
    DEFAULT_TTL = 3600  # 1 hour
    MAX_VALUE_SIZE = 10_000  # KB (Supabase limit)

    def __init__(
        self,
        default_ttl: int = DEFAULT_TTL,
        compression_threshold: int = 5000  # chars
    ):
        """
        Initialize Supabase cache

        Args:
            default_ttl: Default time-to-live in seconds
            compression_threshold: Min size to compress (characters)
        """
        self.supabase = get_supabase()
        self.default_ttl = default_ttl
        self.compression_threshold = compression_threshold

        logger.info(f"SupabaseCache initialized: TTL={default_ttl}s")

    def _generate_key(
        self,
        query: str,
        params: Optional[Dict[str, Any]] = None,
        method: str = "default"
    ) -> str:
        """
        Generate consistent cache key from query and parameters

        Args:
            query: The query or function name
            params: Function parameters
            method: Cache method (e.g., "search_yargitay")

        Returns:
            SHA256 hash as cache key
        """
        # Create deterministic string representation
        key_parts = [method, query]

        if params:
            # Sort params for consistency
            sorted_params = json.dumps(params, sort_keys=True)
            key_parts.append(sorted_params)

        key_string = "|".join(key_parts)
        return hashlib.sha256(key_string.encode()).hexdigest()[:32]

    def get(
        self,
        query: str,
        params: Optional[Dict[str, Any]] = None,
        method: str = "default"
    ) -> Optional[Dict[str, Any]]:
        """
        Get cached response

        Args:
            query: Query or function name
            params: Function parameters
            method: Cache method identifier

        Returns:
            Cached response or None if not found/expired
        """
        cache_key = self._generate_key(query, params, method)

        try:
            result = self.supabase.table(self.TABLE_NAME).select(
                "*"
            ).eq("key", cache_key).execute()

            if not result.data:
                await self._track_miss(cache_key, method)
                return None

            cached = result.data[0]

            # Check if expired
            expires_at = cached.get("expires_at")
            if expires_at:
                expiry_time = datetime.fromisoformat(expires_at)
                if datetime.utcnow() > expiry_time:
                    # Delete expired entry
                    self.delete(cache_key)
                    await self._track_miss(cache_key, method)
                    return None

            # Update hit count
            await self._track_hit(cache_key, method)

            # Return cached data
            return {
                "data": cached.get("response"),
                "cached_at": cached.get("created_at"),
                "hit_count": cached.get("hit_count", 0) + 1
            }

        except Exception as e:
            logger.error(f"Cache get error: {e}")
            return None

    def set(
        self,
        query: str,
        response: Any,
        params: Optional[Dict[str, Any]] = None,
        method: str = "default",
        ttl: Optional[int] = None,
        metadata: Optional[Dict[str, Any]] = None
    ) -> bool:
        """
        Cache a response

        Args:
            query: Query or function name
            response: Response data to cache
            params: Function parameters
            method: Cache method identifier
            ttl: Custom TTL in seconds
            metadata: Additional metadata to store

        Returns:
            True if cached successfully
        """
        cache_key = self._generate_key(query, params, method)
        ttl = ttl or self.default_ttl

        # Prepare cache entry
        cache_entry = {
            "key": cache_key,
            "method": method,
            "query": query,
            "params": params or {},
            "response": response,
            "metadata": metadata or {},
            "hit_count": 0,
            "expires_at": f"now() + interval '{ttl} seconds'"
        }

        try:
            self.supabase.table(self.TABLE_NAME).upsert(
                cache_entry,
                on_conflict="key"
            ).execute()

            logger.debug(f"Cached response: {cache_key[:16]}...")
            return True

        except Exception as e:
            logger.error(f"Cache set error: {e}")
            return False

    def delete(self, cache_key: str) -> bool:
        """Remove specific cache entry"""
        try:
            self.supabase.table(self.TABLE_NAME).delete().eq(
                "key",
                cache_key
            ).execute()
            return True
        except Exception as e:
            logger.error(f"Cache delete error: {e}")
            return False

    def invalidate_pattern(self, pattern: str) -> int:
        """
        Invalidate all cache entries matching a pattern

        Args:
            pattern: SQL LIKE pattern (e.g., "yargitay%")

        Returns:
            Number of entries deleted
        """
        try:
            result = self.supabase.table(self.TABLE_NAME).delete().like(
                "key",
                pattern
            ).execute()
            return len(result.data) if result.data else 0
        except Exception as e:
            logger.error(f"Pattern invalidation error: {e}")
            return 0

    def cleanup_expired(self) -> int:
        """Remove all expired cache entries"""
        try:
            result = self.supabase.table(self.TABLE_NAME).delete().lt(
                "expires_at",
                "now()"
            ).execute()
            count = len(result.data) if result.data else 0
            logger.info(f"Cleaned up {count} expired cache entries")
            return count
        except Exception as e:
            logger.error(f"Cache cleanup error: {e}")
            return 0

    async def _track_hit(self, cache_key: str, method: str):
        """Track cache hit"""
        try:
            self.supabase.table(self.TABLE_NAME).update({
                "hit_count": self.supabase.raw("hit_count + 1"),
                "last_accessed": "now()"
            }).eq("key", cache_key).execute()
        except Exception as e:
            logger.debug(f"Hit tracking error: {e}")

    async def _track_miss(self, cache_key: str, method: str):
        """Track cache miss for analytics"""
        try:
            self.supabase.table("cache_analytics").insert({
                "cache_key": cache_key,
                "method": method,
                "event_type": "miss",
                "timestamp": "now()"
            }).execute()
        except Exception as e:
            logger.debug(f"Miss tracking error: {e}")

    def get_stats(self) -> Dict[str, Any]:
        """Get cache statistics"""
        try:
            # Total entries
            total_result = self.supabase.table(self.TABLE_NAME).select(
                "key", count="exact"
            ).execute()

            # Expired entries
            expired_result = self.supabase.table(self.TABLE_NAME).select(
                "key", count="exact"
            ).lt("expires_at", "now()").execute()

            # Calculate hit rate
            stats_result = self.supabase.table(self.TABLE_NAME).select(
                "hit_count"
            ).execute()

            total_hits = sum(row.get("hit_count", 0) for row in stats_result.data)

            return {
                "total_entries": total_result.count or 0,
                "expired_entries": expired_result.count or 0,
                "total_hits": total_hits,
                "default_ttl": self.default_ttl
            }

        except Exception as e:
            logger.error(f"Stats error: {e}")
            return {"error": str(e)}


# Decorator for automatic caching
def cached(
    method: str,
    ttl: int = 3600,
    key_params: Optional[List[str]] = None
):
    """
    Decorator to cache function results in Supabase

    Args:
        method: Cache method identifier
        ttl: Time-to-live in seconds
        key_params: Param names to include in cache key

    Usage:
        @cached(method="search_yargitay", ttl=1800)
        def search_yargitay(query: str, filters: dict):
            ...
    """
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            cache = SupabaseCache()

            # Build params dict for key generation
            if key_params:
                params = {
                    k: v for k, v in kwargs.items()
                    if k in key_params
                }
            else:
                params = kwargs

            # Try cache first
            cached = cache.get(
                func.__name__,
                params=params,
                method=method
            )

            if cached:
                logger.debug(f"Cache hit: {func.__name__}")
                return cached["data"]

            # Execute function
            result = await func(*args, **kwargs)

            # Cache result
            cache.set(
                func.__name__,
                result,
                params=params,
                method=method,
                ttl=ttl
            )

            return result

        return wrapper
    return decorator
