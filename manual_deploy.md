# Manuel Backend Deployment Gerekli

## Durum
Frontend başarıyla deploy edildi ancak Supabase Edge Functions için access token süresi dolmuş.

## Backend Değişiklikleri
1. **legal-search**: Sayıştay detayları iyileştirildi (v6)
2. **text-to-speech**: OpenAI TTS entegrasyonu (v2)

## Manuel Deploy Adımları

### 1. Supabase CLI ile Deploy

```bash
# Supabase'e login
npx supabase login

# Legal Search Deploy
cd /workspace/supabase/functions
npx supabase functions deploy legal-search --project-ref jnnwhnjmgnmvhgogifzd

# Text-to-Speech Deploy
npx supabase functions deploy text-to-speech --project-ref jnnwhnjmgnmvhgogifzd
```

### 2. OpenAI API Key Ekleme

```bash
# Supabase secrets
npx supabase secrets set OPENAI_API_KEY="YOUR_OPENAI_API_KEY_IN_ENV" --project-ref jnnwhnjmgnmvhgogifzd
```

### 3. Test

```bash
# Sayıştay detay testi
curl -X POST 'https://jnnwhnjmgnmvhgogifzd.supabase.co/functions/v1/legal-search' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpubndobmptZ25tdmhnb2dpZnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NzU5NjEsImV4cCI6MjA3NzM1MTk2MX0.Ye1dLTtpYNo6rwQvlXulfXDQtT3Z90JGnDzohDd1BUA' \
  -d '{"searchQuery": "tazminat", "institutions": ["sayistay"], "filters": {"pageSize": 1}}'

# OpenAI TTS testi
curl -X POST 'https://jnnwhnjmgnmvhgogifzd.supabase.co/functions/v1/text-to-speech' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpubndobmptZ25tdmhnb2dpZnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NzU5NjEsImV4cCI6MjA3NzM1MTk2MX0.Ye1dLTtpYNo6rwQvlXulfXDQtT3Z90JGnDzohDd1BUA' \
  -d '{"text": "Test mesajı"}'
```

## Dosya Konumları
- Legal Search: `/workspace/supabase/functions/legal-search/index.ts`
- Text-to-Speech: `/workspace/supabase/functions/text-to-speech/index.ts`
