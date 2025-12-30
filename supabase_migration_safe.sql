-- ============================================================================
-- Yargı MCP - Supabase Migration Script (SAFE VERSION)
-- ============================================================================
-- This version handles existing triggers gracefully
-- ============================================================================

-- ============================================================================
-- ENABLE EXTENSIONS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- DOCUMENT STORAGE WITH VECTORS
-- ============================================================================

CREATE TABLE IF NOT EXISTS mcp_documents (
    id TEXT PRIMARY KEY,
    text TEXT NOT NULL,
    embedding vector(768),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NULL
);

CREATE INDEX IF NOT EXISTS mcp_documents_embedding_idx
ON mcp_documents
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

CREATE INDEX IF NOT EXISTS mcp_documents_expires_idx
ON mcp_documents (expires_at)
WHERE expires_at IS NOT NULL;

CREATE INDEX IF NOT EXISTS mcp_documents_metadata_idx
ON mcp_documents USING GIN (metadata);

-- ============================================================================
-- CACHE LAYER
-- ============================================================================

CREATE TABLE IF NOT EXISTS mcp_cache (
    key TEXT PRIMARY KEY,
    method TEXT NOT NULL,
    query TEXT NOT NULL,
    params JSONB DEFAULT '{}',
    response JSONB NOT NULL,
    metadata JSONB DEFAULT '{}',
    hit_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_accessed TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS mcp_cache_expires_idx
ON mcp_cache (expires_at);

CREATE INDEX IF NOT EXISTS mcp_cache_method_idx
ON mcp_cache (method, expires_at);

-- ============================================================================
-- OAUTH SESSIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS oauth_sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    provider TEXT NOT NULL,
    redirect_url TEXT NOT NULL,
    state TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS oauth_sessions_user_idx
ON oauth_sessions (user_id, expires_at);

CREATE INDEX IF NOT EXISTS oauth_sessions_provider_idx
ON oauth_sessions (provider, expires_at);

CREATE INDEX IF NOT EXISTS oauth_sessions_state_idx
ON oauth_sessions (state, expires_at);

CREATE INDEX IF NOT EXISTS oauth_sessions_expires_idx
ON oauth_sessions (expires_at);

-- ============================================================================
-- OAUTH TOKENS
-- ============================================================================

CREATE TABLE IF NOT EXISTS oauth_tokens (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    provider TEXT NOT NULL,
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    scope TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS oauth_tokens_user_idx
ON oauth_tokens (user_id, expires_at);

CREATE INDEX IF NOT EXISTS oauth_tokens_provider_idx
ON oauth_tokens (provider, expires_at);

CREATE INDEX IF NOT EXISTS oauth_tokens_expires_idx
ON oauth_tokens (expires_at);

-- ============================================================================
-- ANALYTICS
-- ============================================================================

CREATE TABLE IF NOT EXISTS mcp_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type TEXT NOT NULL,
    properties JSONB DEFAULT '{}',
    user_id TEXT,
    session_id TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS mcp_events_type_idx
ON mcp_events (event_type, timestamp);

CREATE INDEX IF NOT EXISTS mcp_events_user_idx
ON mcp_events (user_id, timestamp);

CREATE INDEX IF NOT EXISTS mcp_events_session_idx
ON mcp_events (session_id, timestamp);

CREATE INDEX IF NOT EXISTS mcp_events_timestamp_idx
ON mcp_events (timestamp);

-- ============================================================================
-- ERROR TRACKING
-- ============================================================================

CREATE TABLE IF NOT EXISTS mcp_errors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id TEXT NOT NULL,
    error_message TEXT NOT NULL,
    error_type TEXT NOT NULL,
    user_id TEXT,
    stack_trace TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS mcp_errors_type_idx
ON mcp_errors (error_type, created_at);

CREATE INDEX IF NOT EXISTS mcp_errors_request_idx
ON mcp_errors (request_id);

CREATE INDEX IF NOT EXISTS mcp_errors_user_idx
ON mcp_errors (user_id, created_at);

CREATE INDEX IF NOT EXISTS mcp_errors_created_idx
ON mcp_errors (created_at);

-- ============================================================================
-- CACHE ANALYTICS
-- ============================================================================

CREATE TABLE IF NOT EXISTS cache_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cache_key TEXT NOT NULL,
    method TEXT NOT NULL,
    event_type TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS cache_analytics_method_idx
ON cache_analytics (method, event_type, timestamp);

-- ============================================================================
-- FUNCTIONS (CREATE OR REPLACE)
-- ============================================================================

-- Auto-update trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Vector similarity search function
CREATE OR REPLACE FUNCTION match_mcp_documents(
    query_embedding vector(768),
    match_threshold float DEFAULT 0.7,
    match_count int DEFAULT 10,
    filter_metadata jsonb DEFAULT '{}'
)
RETURNS TABLE (
    id TEXT,
    text TEXT,
    embedding vector(768),
    metadata jsonb,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        doc.id,
        doc.text,
        doc.embedding,
        doc.metadata,
        doc.created_at,
        doc.updated_at,
        1 - (doc.embedding <=> query_embedding) AS similarity
    FROM mcp_documents doc
    WHERE
        (filter_metadata = '{}'::jsonb OR doc.metadata @> filter_metadata)
        AND (doc.expires_at IS NULL OR doc.expires_at > NOW())
        AND (1 - (doc.embedding <=> query_embedding)) > match_threshold
    ORDER BY doc.embedding <=> query_embedding
    LIMIT match_count;
END;
$$;

-- Cleanup function
CREATE OR REPLACE FUNCTION cleanup_expired_entries()
RETURNS JSONB AS $$
DECLARE
    documents_count INTEGER;
    cache_count INTEGER;
    sessions_count INTEGER;
    tokens_count INTEGER;
BEGIN
    DELETE FROM mcp_documents
    WHERE expires_at IS NOT NULL AND expires_at < NOW();
    GET DIAGNOSTICS documents_count = ROW_COUNT;

    DELETE FROM mcp_cache
    WHERE expires_at < NOW();
    GET DIAGNOSTICS cache_count = ROW_COUNT;

    DELETE FROM oauth_sessions
    WHERE expires_at < NOW();
    GET DIAGNOSTICS sessions_count = ROW_COUNT;

    DELETE FROM oauth_tokens
    WHERE expires_at < NOW();
    GET DIAGNOSTICS tokens_count = ROW_COUNT;

    RETURN jsonb_build_object(
        'documents', documents_count,
        'cache', cache_count,
        'sessions', sessions_count,
        'tokens', tokens_count,
        'cleaned_at', NOW()
    );
END;
$$ LANGUAGE plpgsql;

-- Stats function
CREATE OR REPLACE FUNCTION get_mcp_stats()
RETURNS JSONB AS $$
DECLARE
    stats JSONB;
BEGIN
    SELECT jsonb_build_object(
        'documents', (SELECT COUNT(*) FROM mcp_documents),
        'cache_entries', (SELECT COUNT(*) FROM mcp_cache),
        'active_sessions', (SELECT COUNT(*) FROM oauth_sessions WHERE expires_at > NOW()),
        'active_tokens', (SELECT COUNT(*) FROM oauth_tokens WHERE expires_at > NOW()),
        'total_events', (SELECT COUNT(*) FROM mcp_events),
        'total_errors', (SELECT COUNT(*) FROM mcp_errors),
        'checked_at', NOW()
    ) INTO stats;

    RETURN stats;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TRIGGERS (DROP AND RECREATE)
-- ============================================================================

-- Drop existing triggers
DROP TRIGGER IF EXISTS update_mcp_documents_updated_at ON mcp_documents;
DROP TRIGGER IF EXISTS update_mcp_cache_updated_at ON mcp_cache;
DROP TRIGGER IF EXISTS update_oauth_sessions_updated_at ON oauth_sessions;
DROP TRIGGER IF EXISTS update_oauth_tokens_updated_at ON oauth_tokens;

-- Create triggers
CREATE TRIGGER update_mcp_documents_updated_at
    BEFORE UPDATE ON mcp_documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mcp_cache_updated_at
    BEFORE UPDATE ON mcp_cache
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_oauth_sessions_updated_at
    BEFORE UPDATE ON oauth_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_oauth_tokens_updated_at
    BEFORE UPDATE ON oauth_tokens
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VIEWS
-- ============================================================================

CREATE OR REPLACE VIEW active_cache AS
SELECT *
FROM mcp_cache
WHERE expires_at > NOW()
ORDER BY last_accessed DESC;

CREATE OR REPLACE VIEW active_sessions AS
SELECT *
FROM oauth_sessions
WHERE expires_at > NOW()
ORDER BY created_at DESC;

CREATE OR REPLACE VIEW recent_errors AS
SELECT *
FROM mcp_errors
WHERE created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;

CREATE OR REPLACE VIEW event_summary AS
SELECT
    event_type,
    COUNT(*) as count,
    DATE(timestamp) as date
FROM mcp_events
WHERE timestamp > NOW() - INTERVAL '7 days'
GROUP BY event_type, DATE(timestamp)
ORDER BY date DESC, count DESC;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS
ALTER TABLE mcp_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE mcp_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE oauth_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE oauth_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE mcp_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE mcp_errors ENABLE ROW LEVEL SECURITY;
ALTER TABLE cache_analytics ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Service role has full access on mcp_documents" ON mcp_documents;
DROP POLICY IF EXISTS "Service role has full access on mcp_cache" ON mcp_cache;
DROP POLICY IF EXISTS "Service role has full access on oauth_sessions" ON oauth_sessions;
DROP POLICY IF EXISTS "Service role has full access on oauth_tokens" ON oauth_tokens;
DROP POLICY IF EXISTS "Service role has full access on mcp_events" ON mcp_events;
DROP POLICY IF EXISTS "Service role has full access on mcp_errors" ON mcp_errors;
DROP POLICY IF EXISTS "Service role has full access on cache_analytics" ON cache_analytics;

-- Create policies
CREATE POLICY "Service role has full access on mcp_documents"
    ON mcp_documents FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role has full access on mcp_cache"
    ON mcp_cache FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role has full access on oauth_sessions"
    ON oauth_sessions FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role has full access on oauth_tokens"
    ON oauth_tokens FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role has full access on mcp_events"
    ON mcp_events FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role has full access on mcp_errors"
    ON mcp_errors FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role has full access on cache_analytics"
    ON cache_analytics FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- ============================================================================
-- COMPLETE
-- ============================================================================

DO $$
BEGIN
    RAISE NOTICE 'Yargı MCP Supabase migration completed successfully!';
END $$;
