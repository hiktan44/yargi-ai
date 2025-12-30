"""
Supabase Client Factory for Yargı MCP
Centralized Supabase connection management with connection pooling
"""

import os
from typing import Optional
from supabase import create_client, Client
from logging import getLogger

logger = getLogger(__name__)

class SupabaseClient:
    """Singleton Supabase client with connection management"""

    _instance: Optional[Client] = None
    _url: Optional[str] = None
    _key: Optional[str] = None

    @classmethod
    def initialize(cls, url: str = None, key: str = None) -> Client:
        """
        Initialize Supabase client (singleton pattern)

        Args:
            url: Supabase URL (defaults to env var)
            key: Supabase service key (defaults to env var)

        Returns:
            Supabase client instance
        """
        if cls._instance is None:
            cls._url = url or os.getenv("SUPABASE_URL")
            cls._key = key or os.getenv("SUPABASE_SERVICE_KEY")

            if not cls._url or not cls._key:
                raise ValueError(
                    "Supabase credentials not found. "
                    "Set SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables."
                )

            cls._instance = create_client(cls._url, cls._key)
            logger.info(f"Supabase client initialized: {cls._url}")

        return cls._instance

    @classmethod
    def get_client(cls) -> Client:
        """Get existing Supabase client instance"""
        if cls._instance is None:
            return cls.initialize()
        return cls._instance

    @classmethod
    def reset(cls):
        """Reset singleton (mainly for testing)"""
        cls._instance = None
        cls._url = None
        cls._key = None


# Convenience function
def get_supabase() -> Client:
    """Get Supabase client instance"""
    return SupabaseClient.get_client()
