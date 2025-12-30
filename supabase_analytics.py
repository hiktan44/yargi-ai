"""
Supabase Analytics for MCP Usage Tracking
Comprehensive logging and analytics for API usage
"""

import logging
from typing import Dict, Any, List, Optional
from datetime import datetime, timedelta
from enum import Enum

from supabase_client import get_supabase

logger = logging.getLogger(__name__)


class EventType(str, Enum):
    """Analytics event types"""
    # API Events
    API_REQUEST = "api_request"
    API_RESPONSE = "api_response"
    API_ERROR = "api_error"

    # Cache Events
    CACHE_HIT = "cache_hit"
    CACHE_MISS = "cache_miss"
    CACHE_INVALIDATE = "cache_invalidate"

    # Search Events
    SEARCH_QUERY = "search_query"
    SEARCH_RESULT = "search_result"
    SEARCH_EMPTY = "search_empty"

    # OAuth Events
    OAUTH_START = "oauth_start"
    OAUTH_SUCCESS = "oauth_success"
    OAUTH_FAILURE = "oauth_failure"

    # System Events
    SYSTEM_STARTUP = "system_startup"
    SYSTEM_ERROR = "system_error"


class SupabaseAnalytics:
    """
    Analytics and logging system using Supabase

    Features:
    - Event tracking with automatic timestamping
    - Performance metrics (latency, throughput)
    - Error tracking and aggregation
    - User activity monitoring
    - Daily/hourly aggregation queries
    """

    EVENTS_TABLE = "mcp_events"
    METRICS_TABLE = "mcp_metrics"
    ERRORS_TABLE = "mcp_errors"

    def __init__(self, batch_size: int = 100, flush_interval: int = 60):
        """
        Initialize analytics

        Args:
            batch_size: Events to batch before writing
            flush_interval: Seconds between automatic flushes
        """
        self.supabase = get_supabase()
        self.batch_size = batch_size
        self.flush_interval = flush_interval
        self._event_buffer: List[Dict[str, Any]] = []

        logger.info("SupabaseAnalytics initialized")

    # ============ EVENT TRACKING ============

    def track_event(
        self,
        event_type: EventType,
        properties: Optional[Dict[str, Any]] = None,
        user_id: Optional[str] = None,
        session_id: Optional[str] = None,
        timestamp: Optional[datetime] = None
    ) -> bool:
        """
        Track an analytics event

        Args:
            event_type: Type of event
            properties: Event-specific properties
            user_id: User identifier (if available)
            session_id: Session identifier
            timestamp: Event time (defaults to now)

        Returns:
            True if tracked successfully
        """
        event = {
            "event_type": event_type.value,
            "properties": properties or {},
            "user_id": user_id,
            "session_id": session_id,
            "timestamp": (timestamp or datetime.utcnow()).isoformat()
        }

        # Add to buffer
        self._event_buffer.append(event)

        # Flush if buffer full
        if len(self._event_buffer) >= self.batch_size:
            return self.flush()

        return True

    def track_api_request(
        self,
        method: str,
        endpoint: str,
        user_id: Optional[str] = None,
        params: Optional[Dict[str, Any]] = None
    ) -> str:
        """
        Track API request start

        Returns:
            Request ID for tracking
        """
        request_id = f"{method}_{endpoint}_{datetime.utcnow().timestamp()}"

        self.track_event(
            EventType.API_REQUEST,
            properties={
                "method": method,
                "endpoint": endpoint,
                "params": params or {},
                "request_id": request_id
            },
            user_id=user_id
        )

        return request_id

    def track_api_response(
        self,
        request_id: str,
        status_code: int,
        response_time_ms: int,
        result_count: int = 0,
        user_id: Optional[str] = None
    ) -> bool:
        """Track API response"""
        return self.track_event(
            EventType.API_RESPONSE,
            properties={
                "request_id": request_id,
                "status_code": status_code,
                "response_time_ms": response_time_ms,
                "result_count": result_count
            },
            user_id=user_id
        )

    def track_api_error(
        self,
        request_id: str,
        error_message: str,
        error_type: str,
        user_id: Optional[str] = None
    ) -> bool:
        """Track API error"""
        # Log to events table
        self.track_event(
            EventType.API_ERROR,
            properties={
                "request_id": request_id,
                "error_message": error_message,
                "error_type": error_type
            },
            user_id=user_id
        )

        # Also log to errors table for easier querying
        try:
            self.supabase.table(self.ERRORS_TABLE).insert({
                "request_id": request_id,
                "error_message": error_message,
                "error_type": error_type,
                "user_id": user_id,
                "created_at": "now()"
            }).execute()

        except Exception as e:
            logger.error(f"Error logging to errors table: {e}")

        return True

    def track_search(
        self,
        query: str,
        source: str,  # yargitay, danistay, etc.
        result_count: int,
        response_time_ms: int,
        user_id: Optional[str] = None
    ) -> bool:
        """Track search query and results"""
        # Track query event
        self.track_event(
            EventType.SEARCH_QUERY,
            properties={
                "query": query[:500],  # Truncate long queries
                "source": source,
                "result_count": result_count,
                "response_time_ms": response_time_ms
            },
            user_id=user_id
        )

        # Track empty result if applicable
        if result_count == 0:
            self.track_event(
                EventType.SEARCH_EMPTY,
                properties={
                    "query": query[:500],
                    "source": source
                },
                user_id=user_id
            )

        return True

    # ============ BATCH OPERATIONS ============

    def flush(self) -> bool:
        """Flush event buffer to Supabase"""
        if not self._event_buffer:
            return True

        try:
            self.supabase.table(self.EVENTS_TABLE).insert(
                self._event_buffer
            ).execute()

            flushed = len(self._event_buffer)
            self._event_buffer.clear()

            logger.debug(f"Flushed {flushed} events to Supabase")
            return True

        except Exception as e:
            logger.error(f"Error flushing events: {e}")
            return False

    # ============ ANALYTICS QUERIES ============

    def get_metrics(
        self,
        start_date: Optional[datetime] = None,
        end_date: Optional[datetime] = None,
        event_type: Optional[EventType] = None
    ) -> Dict[str, Any]:
        """
        Get aggregated metrics

        Args:
            start_date: Start of date range
            end_date: End of date range
            event_type: Filter by event type

        Returns:
            Aggregated metrics dictionary
        """
        start_date = start_date or (datetime.utcnow() - timedelta(days=7))
        end_date = end_date or datetime.utcnow()

        try:
            # Total events
            query = self.supabase.table(self.EVENTS_TABLE).select(
                "event_type", count="exact"
            ).gte("timestamp", start_date.isoformat()).lte(
                "timestamp",
                end_date.isoformat()
            )

            if event_type:
                query = query.eq("event_type", event_type.value)

            result = query.execute()

            # Count by event type
            event_counts = {}
            for row in result.data:
                event_counts[row["event_type"]] = (
                    event_counts.get(row["event_type"], 0) + 1
                )

            # Calculate average response time for API events
            api_events = [
                r for r in result.data
                if r["event_type"] == EventType.API_RESPONSE.value
            ]

            avg_response_time = 0
            if api_events:
                response_times = [
                    r.get("properties", {}).get("response_time_ms", 0)
                    for r in api_events
                ]
                avg_response_time = sum(response_times) / len(response_times)

            # Get error count
            errors_result = self.supabase.table(self.ERRORS_TABLE).select(
                "id", count="exact"
            ).gte("created_at", start_date.isoformat()).lte(
                "created_at",
                end_date.isoformat()
            ).execute()

            return {
                "total_events": sum(event_counts.values()),
                "event_counts": event_counts,
                "avg_response_time_ms": round(avg_response_time, 2),
                "total_errors": errors_result.count or 0,
                "date_range": {
                    "start": start_date.isoformat(),
                    "end": end_date.isoformat()
                }
            }

        except Exception as e:
            logger.error(f"Error getting metrics: {e}")
            return {"error": str(e)}

    def get_top_queries(
        self,
        source: Optional[str] = None,
        limit: int = 10,
        days: int = 7
    ) -> List[Dict[str, Any]]:
        """
        Get most common search queries

        Args:
            source: Filter by source (yargitay, danistay, etc.)
            limit: Max results
            days: Number of days to look back

        Returns:
            List of top queries with counts
        """
        start_date = datetime.utcnow() - timedelta(days=days)

        try:
            query = self.supabase.table(self.EVENTS_TABLE).select(
                "properties"
            ).eq("event_type", EventType.SEARCH_QUERY.value).gte(
                "timestamp",
                start_date.isoformat()
            )

            result = query.execute()

            # Aggregate queries
            query_counts = {}
            for row in result.data:
                props = row.get("properties", {})
                query_text = props.get("query", "")

                # Filter by source if specified
                if source and props.get("source") != source:
                    continue

                query_counts[query_text] = query_counts.get(query_text, 0) + 1

            # Sort and return top N
            top_queries = [
                {"query": q, "count": c}
                for q, c in sorted(
                    query_counts.items(),
                    key=lambda x: x[1],
                    reverse=True
                )[:limit]
            ]

            return top_queries

        except Exception as e:
            logger.error(f"Error getting top queries: {e}")
            return []

    def get_hourly_stats(
        self,
        days: int = 1
    ) -> List[Dict[str, Any]]:
        """
        Get hourly event counts

        Args:
            days: Number of days to analyze

        Returns:
            List of hourly stats
        """
        start_date = datetime.utcnow() - timedelta(days=days)

        try:
            result = self.supabase.table(self.EVENTS_TABLE).select(
                "timestamp", "event_type"
            ).gte("timestamp", start_date.isoformat()).execute()

            # Aggregate by hour
            hourly_stats = {}
            for row in result.data:
                timestamp = datetime.fromisoformat(row["timestamp"])
                hour_key = timestamp.strftime("%Y-%m-%d %H:00")

                if hour_key not in hourly_stats:
                    hourly_stats[hour_key] = {
                        "hour": hour_key,
                        "total": 0,
                        "by_type": {}
                    }

                hourly_stats[hour_key]["total"] += 1

                event_type = row["event_type"]
                hourly_stats[hour_key]["by_type"][event_type] = (
                    hourly_stats[hour_key]["by_type"].get(event_type, 0) + 1
                )

            # Sort and return
            return sorted(
                hourly_stats.values(),
                key=lambda x: x["hour"],
                reverse=True
            )

        except Exception as e:
            logger.error(f"Error getting hourly stats: {e}")
            return []

    # ============ ERROR TRACKING ============

    def get_recent_errors(
        self,
        limit: int = 50,
        hours: int = 24
    ) -> List[Dict[str, Any]]:
        """Get recent errors"""
        start_time = datetime.utcnow() - timedelta(hours=hours)

        try:
            result = self.supabase.table(self.ERRORS_TABLE).select(
                "*"
            ).gte("created_at", start_time.isoformat()).order(
                "created_at",
                desc=True
            ).limit(limit).execute()

            return result.data

        except Exception as e:
            logger.error(f"Error getting recent errors: {e}")
            return []

    def get_error_summary(
        self,
        days: int = 7
    ) -> Dict[str, Any]:
        """Get error summary by type"""
        start_date = datetime.utcnow() - timedelta(days=days)

        try:
            result = self.supabase.table(self.ERRORS_TABLE).select(
                "error_type", count="exact"
            ).gte("created_at", start_date.isoformat()).execute()

            error_counts = {}
            for row in result.data:
                error_type = row.get("error_type", "unknown")
                error_counts[error_type] = error_counts.get(error_type, 0) + 1

            return {
                "total_errors": sum(error_counts.values()),
                "by_type": error_counts,
                "date_range": {
                    "start": start_date.isoformat(),
                    "end": datetime.utcnow().isoformat()
                }
            }

        except Exception as e:
            logger.error(f"Error getting summary: {e}")
            return {"error": str(e)}


# Singleton instance
_analytics_instance: Optional[SupabaseAnalytics] = None


def get_analytics() -> SupabaseAnalytics:
    """Get analytics singleton instance"""
    global _analytics_instance
    if _analytics_instance is None:
        _analytics_instance = SupabaseAnalytics()
    return _analytics_instance
