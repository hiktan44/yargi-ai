# ============================================================================
# YARGI MCP - SUPABASE ENTEGRASYONU ÖZETİ
# ============================================================================
#
# ✅ Tam Supabase entegrasyonu ile yargi-mcp deployment paketi
#
# 📦 Oluşturulan Dosyalar:
#    1. supabase_client.py          - Supabase connection factory
#    2. supabase_vector_store.py   - Vector storage with pgvector
#    3. supabase_cache.py          - API response caching
#    4. supabase_oauth_storage.py  - OAuth session/token management
#    5. supabase_analytics.py      - Usage analytics & error tracking
#    6. supabase_migration.sql     - Database schema & functions
#    7. .env.example.supabase      - Environment variables template
#    8. COOLIFY_DEPLOYMENT.md      - Deployment guide
#    9. requirements-supabase.txt  - Python dependencies
#    10. PYPROJECT_TOML_UPDATES.txt - pyproject.toml changes
#
# ============================================================================

## 🎯 ÖZELLİKLER

### 1. Vector Storage (Semantic Search)
- ✅ pgvector extension ile vektör benzerlik araması
- ✅ 768 boyutlu embedding desteği (OpenAI uyumlu)
- ✅ Kosinüs benzerlik ölçümü
- ✅ Otomatik indexleme (HNSW)
- ✅ Metadata filtreleme
- ✅ TTL tabanlı otomatik temizleme

### 2. Response Caching
- ✅ API yanıtlarını cache'leme
- ✅ Ayarlanabilir TTL (varsayılan: 1 saat)
- ✅ Cache hit/miss analitiği
- ✅ Pattern-based invalidation
- ✅ Otomatik expire temizliği

### 3. OAuth Management
- ✅ Session yönetimi (Clerk, Google, vb.)
- ✅ Secure token storage
- ✅ Refresh token desteği
- ✅ Otomatik expire kontrolü
- ✅ Multi-provider desteği

### 4. Analytics & Monitoring
- ✅ Event tracking (API, cache, search, OAuth)
- ✅ Performans metrikleri (response time, throughput)
- ✅ Error tracking ve aggregation
- ✅ Hourly/daily stats
- ✅ Top queries analizi

## 📋 KURULUM ADIMLARI

### Adım 1: Supabase Setup

```bash
1. Supabase projesi oluştur: https://supabase.com
2. SQL Editor'i aç
3. supabase_migration.sql dosyasını kopyala
4. Script'i çalıştır
5. Settings → API'den credentials'ları al
```

### Adım 2: Environment Variables

```bash
# Supabase Credentials
SUPABASE_URL=http://supabasekong-lwcg4k08sskkw8g84swcc008.65.108.77.26.sslip.io
SUPABASE_SERVICE_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...

# Enable Features
ENABLE_SUPABASE=true
ENABLE_SUPABASE_CACHE=true
ENABLE_SUPABASE_ANALYTICS=true
ENABLE_SUPABASE_AUTH=true
```

### Adım 3: Coolify Deployment

```bash
1. New Project → Dockerfile
2. Repository: https://github.com/saidsurucu/yargi-mcp
3. Environment variables'ı ekle
4. Deploy!
```

### Adım 4: MCP Client Entegrasyonu

```json
{
  "mcpServers": {
    "Yargı MCP": {
      "url": "https://your-app.coolify.com/mcp"
    }
  }
}
```

## 🗄️ SUPABASE TABLOLARI

| Tablo | Açıklama |
|-------|----------|
| `mcp_documents` | Vektör embeddings ile belgeler |
| `mcp_cache` | API response cache |
| `oauth_sessions` | OAuth session verileri |
| `oauth_tokens` | OAuth token'lar (secure) |
| `mcp_events` | Analytics event'leri |
| `mcp_errors` | Error logları |
| `cache_analytics` | Cache performans metrikleri |

## 📊 ANALYTICS ÖRNEKLERİ

### Kullanım İstatistikleri
```sql
-- Günlük event sayıları
SELECT
    DATE(timestamp) as date,
    event_type,
    COUNT(*) as count
FROM mcp_events
WHERE timestamp > NOW() - INTERVAL '7 days'
GROUP BY date, event_type
ORDER BY date DESC, count DESC;
```

### Cache Performansı
```sql
-- Cache hit ratio
SELECT
    method,
    COUNT(*) as total_entries,
    SUM(hit_count) as total_hits,
    ROUND(AVG(hit_count)::numeric, 2) as avg_hits
FROM mcp_cache
GROUP BY method;
```

### En Sık Aramalar
```sql
-- Top search queries
SELECT
    properties->>'query' as query,
    properties->>'source' as source,
    COUNT(*) as count
FROM mcp_events
WHERE event_type = 'search_query'
GROUP BY query, source
ORDER BY count DESC
LIMIT 20;
```

## 🔧 BAKIM & TEMİZLİK

### Otomatik Temizlik
```sql
-- Expired entry'leri temizle
SELECT cleanup_expired_entries();

-- Sonuç örneği:
-- {
--   "documents": 145,
--   "cache": 89,
--   "sessions": 12,
--   "tokens": 3,
--   "cleaned_at": "2025-01-15T10:30:00Z"
-- }
```

### Manuel Temizlik
```sql
-- Belirli tarihten eski event'leri sil
DELETE FROM mcp_events
WHERE timestamp < NOW() - INTERVAL '90 days';

-- Error loglarını temizle
DELETE FROM mcp_errors
WHERE created_at < NOW() - INTERVAL '30 days';
```

## ⚡ PERFORMANS TUNING

### Connection Pooling
```bash
SUPABASE_POOL_SIZE=20
SUPABASE_ENABLE_POOLING=true
```

### Cache Optimization
```bash
# Daha kısa TTL (sık değişen veri için)
CACHE_DEFAULT_TTL=1800

# Daha uzun cache (stabil veri için)
VECTOR_MAX_RESULTS=20
```

### Query Timeout
```bash
SUPABASE_QUERY_TIMEOUT=30
```

## 🚨 TROUBLESHOOTING

### Connection Error
```bash
# Çözüm: Supabase credentials'ları kontrol et
# - service_role key kullanılmalı
# - Proje aktif olmalı
# - RLS policies doğru ayarlanmalı
```

### Vector Search Çalışmıyor
```sql
-- pgvector extension'ı kontrol et
SELECT * FROM pg_extension WHERE extname = 'vector';

-- Fonksiyon varlığını kontrol et
SELECT routine_name
FROM information_schema.routines
WHERE routine_name = 'match_mcp_documents';
```

### Cache Boş
```sql
-- Cache table'ını kontrol et
SELECT COUNT(*) FROM mcp_cache;

-- Son cache entry'leri gör
SELECT * FROM mcp_cache
ORDER BY created_at DESC
LIMIT 10;
```

## 📈 COST ESTIMATION

### Supabase Free Tier
- 500 MB Database ✅
- 1 GB Storage ✅
- 50K API requests/month ✅
- **Cost: $0/month**

### Tahmini Kullanım
| Kaynak | Aylık Kullanım | Maliyet |
|---------|----------------|--------|
| Database | ~100 MB | Free |
| API Calls | ~10K | Free |
| Storage | ~50 MB | Free |

## 🔒 SECURITY

⚠️ **Önemli Security Notları:**

1. **service_role key sadece server-side kullan**
2. **Asla client'a exposed etme**
3. **RLS policies her zaman enabled**
4. **Key rotation düzenli yap**

## 📚 DAHA FAZLA

- **COOLIFY_DEPLOYMENT.md** - Detaylı deployment rehberi
- **supabase_migration.sql** - SQL schema açıklamaları
- **GitHub**: https://github.com/saidsurucu/yargi-mcp

## ✅ DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] Supabase projesi oluşturuldu
- [ ] Migration script çalıştırıldı
- [ ] Credentials alındı (URL + service_role)
- [ ] Environment variables hazırlandı

### Deployment
- [ ] Coolify projesi oluşturuldu
- [ ] Repository bağlılandı
- [ ] Environment variables eklendi
- [ ] Port ayarları yapıldı (8000)
- [ ] Health check konfigüre edildi

### Post-Deployment
- [ ] Application başlatıldı
- [ ] Loglar kontrol edildi ("Supabase client initialized")
- [ ] Health check başarılı (/health)
- [ ] MCP endpoint erişilebilir (/mcp)
- [ ] Supabase tabloları doluyor
- [ ] Analytics kaydediliyor

### MCP Client Setup
- [ ] Claude Desktop konfigüre edildi
- [ ] Test query çalıştırıldı
- [ ] Cache hit/miss kontrol edildi
- [ ] Analytics dashboard'da görünüyor

## 🎉 BAŞARILI DEPLOYMENT!

Artık Yargı MCP'niz Supabase ile çalışıyor:
- ✅ Semantic search (vector similarity)
- ✅ Response caching (faster responses)
- ✅ OAuth management (secure auth)
- ✅ Analytics (usage insights)

**MCP URL**: `https://your-app.coolify.com/mcp`

---

*Sorun yaşarsanız GitHub Issues'dan bildirin.*
