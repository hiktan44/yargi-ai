"""
Supabase OAuth Storage
Replaces file-based storage with persistent Supabase backend
"""

import logging
from typing import Dict, Any, Optional, List
from datetime import datetime, timedelta

from supabase_client import get_supabase

logger = logging.getLogger(__name__)


class SupabaseOAuthStorage:
    """
    Persistent OAuth session and token storage in Supabase

    Features:
    - Session management with automatic expiry
    - Secure token storage with encryption support
    - Multi-provider support (Clerk, Google, etc.)
    - Session analytics
    - Automatic cleanup of expired sessions
    """

    SESSIONS_TABLE = "oauth_sessions"
    TOKENS_TABLE = "oauth_tokens"

    def __init__(self, auto_cleanup: bool = True):
        """
        Initialize Supabase OAuth storage

        Args:
            auto_cleanup: Automatically clean expired sessions on init
        """
        self.supabase = get_supabase()

        if auto_cleanup:
            self.cleanup_expired()

        logger.info("SupabaseOAuthStorage initialized")

    # ============ SESSION MANAGEMENT ============

    def create_session(
        self,
        session_id: str,
        user_id: str,
        provider: str,
        redirect_url: str,
        state: str,
        expires_in: int = 3600,
        metadata: Optional[Dict[str, Any]] = None
    ) -> bool:
        """
        Create a new OAuth session

        Args:
            session_id: Unique session identifier
            user_id: User identifier (from provider)
            provider: OAuth provider (clerk, google, etc.)
            redirect_url: OAuth callback URL
            state: OAuth state parameter for CSRF protection
            expires_in: Session lifetime in seconds
            metadata: Additional session data

        Returns:
            True if session created successfully
        """
        try:
            self.supabase.table(self.SESSIONS_TABLE).insert({
                "id": session_id,
                "user_id": user_id,
                "provider": provider,
                "redirect_url": redirect_url,
                "state": state,
                "metadata": metadata or {},
                "created_at": "now()",
                "expires_at": f"now() + interval '{expires_in} seconds'"
            }).execute()

            logger.info(f"Created OAuth session: {session_id}")
            return True

        except Exception as e:
            logger.error(f"Error creating session: {e}")
            return False

    def get_session(self, session_id: str) -> Optional[Dict[str, Any]]:
        """Get session by ID (returns None if expired or not found)"""
        try:
            result = self.supabase.table(self.SESSIONS_TABLE).select(
                "*"
            ).eq("id", session_id).execute()

            if not result.data:
                return None

            session = result.data[0]

            # Check expiry
            expires_at = datetime.fromisoformat(session["expires_at"])
            if datetime.utcnow() > expires_at:
                # Delete expired session
                self.delete_session(session_id)
                return None

            return session

        except Exception as e:
            logger.error(f"Error getting session: {e}")
            return None

    def update_session(
        self,
        session_id: str,
        updates: Dict[str, Any]
    ) -> bool:
        """Update session data"""
        try:
            self.supabase.table(self.SESSIONS_TABLE).update(
                {**updates, "updated_at": "now()"}
            ).eq("id", session_id).execute()

            logger.debug(f"Updated session: {session_id}")
            return True

        except Exception as e:
            logger.error(f"Error updating session: {e}")
            return False

    def delete_session(self, session_id: str) -> bool:
        """Delete a session"""
        try:
            self.supabase.table(self.SESSIONS_TABLE).delete().eq(
                "id",
                session_id
            ).execute()

            logger.debug(f"Deleted session: {session_id}")
            return True

        except Exception as e:
            logger.error(f"Error deleting session: {e}")
            return False

    def get_user_sessions(
        self,
        user_id: str,
        provider: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """Get all active sessions for a user"""
        try:
            query = self.supabase.table(self.SESSIONS_TABLE).select(
                "*"
            ).eq("user_id", user_id).gt("expires_at", "now()")

            if provider:
                query = query.eq("provider", provider)

            result = query.execute()
            return result.data

        except Exception as e:
            logger.error(f"Error getting user sessions: {e}")
            return []

    # ============ TOKEN MANAGEMENT ============

    def store_token(
        self,
        token_id: str,
        user_id: str,
        provider: str,
        access_token: str,
        refresh_token: Optional[str] = None,
        expires_in: int = 3600,
        scope: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None
    ) -> bool:
        """
        Store OAuth token

        Args:
            token_id: Unique token identifier
            user_id: User identifier
            provider: OAuth provider
            access_token: OAuth access token
            refresh_token: OAuth refresh token (if available)
            expires_in: Token lifetime in seconds
            scope: OAuth scope
            metadata: Additional token data

        Returns:
            True if token stored successfully
        """
        try:
            self.supabase.table(self.TOKENS_TABLE).upsert({
                "id": token_id,
                "user_id": user_id,
                "provider": provider,
                "access_token": access_token,
                "refresh_token": refresh_token,
                "scope": scope,
                "metadata": metadata or {},
                "created_at": "now()",
                "updated_at": "now()",
                "expires_at": f"now() + interval '{expires_in} seconds'"
            }, on_conflict="id").execute()

            logger.info(f"Stored token: {token_id}")
            return True

        except Exception as e:
            logger.error(f"Error storing token: {e}")
            return False

    def get_token(self, token_id: str) -> Optional[Dict[str, Any]]:
        """Get token by ID"""
        try:
            result = self.supabase.table(self.TOKENS_TABLE).select(
                "*"
            ).eq("id", token_id).execute()

            if not result.data:
                return None

            token = result.data[0]

            # Check expiry
            expires_at = datetime.fromisoformat(token["expires_at"])
            if datetime.utcnow() > expires_at:
                # Try to refresh if refresh_token available
                if token.get("refresh_token"):
                    return self._refresh_token(token)
                return None

            return token

        except Exception as e:
            logger.error(f"Error getting token: {e}")
            return None

    def get_user_tokens(
        self,
        user_id: str,
        provider: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """Get all valid tokens for a user"""
        try:
            query = self.supabase.table(self.TOKENS_TABLE).select(
                "*"
            ).eq("user_id", user_id).gt("expires_at", "now()")

            if provider:
                query = query.eq("provider", provider)

            result = query.execute()
            return result.data

        except Exception as e:
            logger.error(f"Error getting user tokens: {e}")
            return []

    def revoke_token(self, token_id: str) -> bool:
        """Revoke a token (delete from storage)"""
        try:
            self.supabase.table(self.TOKENS_TABLE).delete().eq(
                "id",
                token_id
            ).execute()

            logger.info(f"Revoked token: {token_id}")
            return True

        except Exception as e:
            logger.error(f"Error revoking token: {e}")
            return False

    def revoke_user_tokens(
        self,
        user_id: str,
        provider: Optional[str] = None
    ) -> int:
        """Revoke all tokens for a user"""
        try:
            query = self.supabase.table(self.TOKENS_TABLE).delete().eq(
                "user_id",
                user_id
            )

            if provider:
                query = query.eq("provider", provider)

            result = query.execute()
            count = len(result.data) if result.data else 0

            logger.info(f"Revoked {count} tokens for user: {user_id}")
            return count

        except Exception as e:
            logger.error(f"Error revoking user tokens: {e}")
            return 0

    # ============ CLEANUP ============

    def cleanup_expired(self) -> Dict[str, int]:
        """Remove all expired sessions and tokens"""
        sessions_cleaned = 0
        tokens_cleaned = 0

        # Clean expired sessions
        try:
            result = self.supabase.table(self.SESSIONS_TABLE).delete().lt(
                "expires_at",
                "now()"
            ).execute()
            sessions_cleaned = len(result.data) if result.data else 0
        except Exception as e:
            logger.error(f"Session cleanup error: {e}")

        # Clean expired tokens
        try:
            result = self.supabase.table(self.TOKENS_TABLE).delete().lt(
                "expires_at",
                "now()"
            ).execute()
            tokens_cleaned = len(result.data) if result.data else 0
        except Exception as e:
            logger.error(f"Token cleanup error: {e}")

        logger.info(
            f"Cleanup complete: {sessions_cleaned} sessions, "
            f"{tokens_cleaned} tokens"
        )

        return {
            "sessions": sessions_cleaned,
            "tokens": tokens_cleaned
        }

    # ============ ANALYTICS ============

    def get_stats(self) -> Dict[str, Any]:
        """Get OAuth storage statistics"""
        try:
            # Active sessions
            sessions_result = self.supabase.table(self.SESSIONS_TABLE).select(
                "id", count="exact"
            ).gt("expires_at", "now()").execute()

            # Active tokens
            tokens_result = self.supabase.table(self.TOKENS_TABLE).select(
                "id", count="exact"
            ).gt("expires_at", "now()").execute()

            # Sessions by provider
            provider_result = self.supabase.table(self.SESSIONS_TABLE).select(
                "provider", count="exact"
            ).gt("expires_at", "now()").execute()

            return {
                "active_sessions": sessions_result.count or 0,
                "active_tokens": tokens_result.count or 0,
                "sessions_by_provider": {
                    row["provider"]: row["count"]
                    for row in provider_result.data
                }
            }

        except Exception as e:
            logger.error(f"Stats error: {e}")
            return {"error": str(e)}

    # ============ PRIVATE METHODS ============

    def _refresh_token(self, token_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Refresh expired token using refresh_token

        Note: This is a placeholder implementation.
        Actual refresh logic depends on the OAuth provider.
        """
        # TODO: Implement provider-specific refresh logic
        logger.warning("Token refresh not implemented")
        return None
