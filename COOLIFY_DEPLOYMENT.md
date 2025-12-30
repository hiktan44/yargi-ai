# ============================================================================
# COOLIFY DEPLOYMENT GUIDE - Yargı MCP with Supabase
# ============================================================================

This guide explains how to deploy yargi-mcp with full Supabase integration on Coolify.

## Features

✅ **Vector Storage** - Semantic search with pgvector
✅ **Response Caching** - API response caching with TTL
✅ **OAuth Management** - Session and token persistence
✅ **Analytics** - Usage tracking and error monitoring

---

## Prerequisites

### 1. Supabase Setup

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Create new project
   - Wait for database provisioning

2. **Run Migration Script**
   ```
   Open Supabase Dashboard → SQL Editor
   Copy contents of: supabase_migration.sql
   Run the script
   ```

3. **Get Credentials**
   - Go to Settings → API
   - Copy:
     - Project URL
     - `service_role` key (NOT anon key!)

### 2. GitHub Fork (Optional)

If you want to customize:

1. Fork https://github.com/saidsurucu/yargi-mcp
2. Add Supabase modules to your fork
3. Update reference in Coolify

---

## Coolify Deployment

### Step 1: Create New Project

1. Open Coolify Dashboard
2. Click **New Project**
3. Select **Dockerfile**

### Step 2: Configure Source

```
Repository: https://github.com/saidsurucu/yargi-mcp
Branch: main
Build Path: /
Dockerfile Path: Dockerfile
```

### Step 3: Environment Variables

Add these in Coolify → Environment Variables:

```bash
# Supabase Configuration
SUPABASE_URL=http://supabasekong-lwcg4k08sskkw8g84swcc008.65.108.77.26.sslip.io
SUPABASE_SERVICE_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NjkyMTQwMCwiZXhwIjo0OTIyNTk1MDAwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.90i2oyLzArTFLkykuqOuGjR4QMm7IlT5If8GBcfymdk

# Enable Supabase Features
ENABLE_SUPABASE=true
ENABLE_SUPABASE_CACHE=true
ENABLE_SUPABASE_ANALYTICS=true

# Server Configuration
PORT=8000
ENABLE_AUTH=false
PYTHONUNBUFFERED=1

# Optional: OpenRouter for Semantic Search
# OPENROUTER_API_KEY=sk-or-v1-xxx
```

### Step 4: Ports

```
Container Port: 8000
Public Port: Auto (or specify)
```

### Step 5: Health Check

```
Endpoint: /health
Interval: 30s
Timeout: 10s
Start Period: 10s
```

### Step 6: Deploy

Click **Deploy** and wait for build to complete.

---

## Post-Deployment Verification

### 1. Check Logs

```bash
# In Coolify, view application logs
# Look for:
✅ "Supabase client initialized"
✅ "SupabaseCache initialized"
✅ "SupabaseAnalytics initialized"
✅ "Application startup complete"
```

### 2. Test MCP Endpoint

```bash
curl https://your-app.coolify.com/mcp
```

Expected: JSON response with MCP server info

### 3. Test Vector Storage

```bash
curl -X POST https://your-app.coolify.com/test-vector \
  -H "Content-Type: application/json"
```

### 4. Check Supabase Dashboard

```
Supabase Dashboard → Table Editor
Verify tables created:
✅ mcp_documents
✅ mcp_cache
✅ oauth_sessions
✅ oauth_tokens
✅ mcp_events
✅ mcp_errors
```

---

## MCP Client Configuration

### Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "Yargı MCP (Supabase)": {
      "command": "uvx",
      "args": ["yargi-mcp"],
      "env": {
        "SUPABASE_URL": "https://your-app.coolify.com",
        "ENABLE_SUPABASE": "true"
      }
    }
  }
}
```

### Direct URL

```
https://your-app.coolify.com/mcp
```

---

## Monitoring

### Health Check

```bash
curl https://your-app.coolify.com/health
```

### Statistics

```bash
curl https://your-app.coolify.com/stats
```

### Supabase Queries

```sql
-- Get current stats
SELECT get_mcp_stats();

-- View recent errors
SELECT * FROM recent_errors;

-- Cache performance
SELECT
    method,
    COUNT(*) as total,
    AVG(hit_count) as avg_hits
FROM mcp_cache
GROUP BY method;
```

---

## Troubleshooting

### Issue: Supabase Connection Error

**Solution**:
- Verify `SUPABASE_SERVICE_KEY` is correct
- Check Supabase project is active
- Ensure RLS policies allow service_role access

### Issue: Vector Search Not Working

**Solution**:
```sql
-- Check pgvector extension
SELECT * FROM pg_extension WHERE extname = 'vector';

-- Check function exists
SELECT routine_name
FROM information_schema.routines
WHERE routine_name = 'match_mcp_documents';
```

### Issue: Cache Not Working

**Solution**:
- Check `ENABLE_SUPABASE_CACHE=true`
- Verify mcp_cache table exists
- Check logs for cache errors

### Issue: Analytics Not Recording

**Solution**:
- Check `ENABLE_SUPABASE_ANALYTICS=true`
- Verify mcp_events table exists
- Check Supabase logs for insert errors

---

## Performance Tuning

### 1. Connection Pooling

```bash
SUPABASE_POOL_SIZE=20
SUPABASE_ENABLE_POOLING=true
```

### 2. Cache TTL

```bash
# Shorter TTL for frequently changing data
CACHE_DEFAULT_TTL=1800

# Longer TTL for stable data
VECTOR_MAX_RESULTS=20
```

### 3. Cleanup Jobs

```bash
# Auto cleanup interval
CACHE_CLEANUP_INTERVAL=1800

# Retention periods
ANALYTICS_RETENTION_DAYS=30
DOCUMENT_TTL_DAYS=7
```

---

## Maintenance

### Regular Cleanup

Run periodically in Supabase SQL Editor:

```sql
-- Cleanup expired entries
SELECT cleanup_expired_entries();

-- View cleanup results
SELECT get_mcp_stats();
```

### Backup

Supabase automatically backs up, but for critical data:

```bash
# Export data
pg_dump $DATABASE_URL > backup.sql
```

---

## Security Notes

⚠️ **Important**:
- Use `service_role` key only server-side
- Never expose `service_role` key to clients
- Enable RLS policies on all tables
- Rotate keys regularly in Supabase dashboard

---

## Support

- **GitHub Issues**: https://github.com/saidsurucu/yargi-mcp/issues
- **Supabase Docs**: https://supabase.com/docs
- **Coolify Docs**: https://coolify.io/docs

---

## Cost Estimation

### Supabase (Free Tier)

- 500 MB Database
- 1 GB File Storage
- 50K API requests/month
- 2 Project members

### Estimated Usage

| Resource | Usage/Month | Cost |
|----------|-------------|------|
| Database | ~100 MB | Free |
| API Calls | ~10K | Free |
| File Storage | ~50 MB | Free |

**Total**: $0/month (Free Tier)

---

## Next Steps

1. ✅ Deploy to Coolify
2. ✅ Test all features
3. ✅ Set up monitoring
4. ✅ Configure MCP clients
5. ✅ Enjoy Supabase-powered MCP!
