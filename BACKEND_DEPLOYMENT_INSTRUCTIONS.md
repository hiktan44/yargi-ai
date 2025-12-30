# Backend Deployment Talimatları

## DURUM ÖZETİ

### ✅ Tamamlanan İşlemler
1. **Frontend Deploy**: https://lf3wpjtlri21.space.minimax.io
2. **Backend Kod Güncellemeleri**: 
   - `legal-search/index.ts`: Sayıştay detayları iyileştirildi
   - `text-to-speech/index.ts`: OpenAI TTS entegrasyonu

### ⏳ Bekleyen İşlem
**Backend Deployment**: Supabase access token süresi dolduğu için deployment beklemede

## DEPLOYMENT YAPILACAK DOSYALAR

### 1. Legal Search Function (v6)
**Dosya**: `/workspace/supabase/functions/legal-search/index.ts`

**Değişiklik**: Satır 515-524 - Sayıştay mock data templates
```typescript
sayistay: {
  courtName: 'Sayıştay',
  caseTypes: ['Genel Kurul Kararı', 'Temyiz Kararı', 'Daire Kararı', 'Mali Denetim Raporu', 'Uygunluk Denetimi'],
  summaryTemplates: [
    // 3 detaylı şablon, her biri 200+ karakter
    // Mali denetim, bütçe uygunsuzlukları, sorumluluk kararları vb.
  ]
}
```

### 2. Text-to-Speech Function (v2)
**Dosya**: `/workspace/supabase/functions/text-to-speech/index.ts`

**Değişiklik**: Tüm dosya - ElevenLabs → OpenAI TTS
```typescript
// Önceki: ElevenLabs API
const elevenLabsResponse = await fetch(
  `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, ...
)

// Yeni: OpenAI TTS API  
const openaiResponse = await fetch(
  'https://api.openai.com/v1/audio/speech', {
    body: JSON.stringify({
      model: 'tts-1',
      input: cleanText,
      voice: 'alloy',
      ...
    })
  }
)
```

## DEPLOYMENT KOMUTLARI

### Yöntem 1: Supabase CLI (Manuel)
```bash
# Terminal'de
cd /workspace/supabase/functions

# Legal Search Deploy
npx supabase functions deploy legal-search --project-ref jnnwhnjmgnmvhgogifzd

# Text-to-Speech Deploy
npx supabase functions deploy text-to-speech --project-ref jnnwhnjmgnmvhgogifzd

# OpenAI API Key Ekle
npx supabase secrets set OPENAI_API_KEY="YOUR_OPENAI_API_KEY_IN_ENV" --project-ref jnnwhnjmgnmvhgogifzd
```

### Yöntem 2: Supabase Dashboard (GUI)
1. https://supabase.com/dashboard/project/jnnwhnjmgnmvhgogifzd adresine git
2. Edge Functions sekmesine tıkla
3. `legal-search` fonksiyonunu seç → Edit → Kodu yapıştır → Deploy
4. `text-to-speech` fonksiyonunu seç → Edit → Kodu yapıştır → Deploy
5. Settings → Secrets → OPENAI_API_KEY ekle

## DEPLOYMENT SONRASI DOĞRULAMA

### Test 1: Sayıştay Detayları
```bash
curl -X POST 'https://jnnwhnjmgnmvhgogifzd.supabase.co/functions/v1/legal-search' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpubndobmptZ25tdmhnb2dpZnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NzU5NjEsImV4cCI6MjA3NzM1MTk2MX0.Ye1dLTtpYNo6rwQvlXulfXDQtT3Z90JGnDzohDd1BUA' \
  -d '{"searchQuery": "tazminat", "institutions": ["sayistay"], "filters": {"pageSize": 1}}'
```

**Beklenen**: Summary alanı 200+ karakter, "mali denetimde", "bütçe uygulama" gibi kelimeler

### Test 2: OpenAI TTS
```bash
curl -X POST 'https://jnnwhnjmgnmvhgogifzd.supabase.co/functions/v1/text-to-speech' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpubndobmptZ25tdmhnb2dpZnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NzU5NjEsImV4cCI6MjA3NzM1MTk2MX0.Ye1dLTtpYNo6rwQvlXulfXDQtT3Z90JGnDzohDd1BUA' \
  -d '{"text": "Test"}'
```

**Beklenen**: `{"success": true/false, "useNativeTTS": true/false}`

### Test 3: End-to-End Web Test
```bash
# test_website tool ile
URL: https://lf3wpjtlri21.space.minimax.io
Test: Arama → Sayıştay seçimi → Detay kontrolü → TTS testi
```

## BAŞARI KRİTERLERİ

✅ **Başarılı Deployment**:
- Legal search endpoint 200 OK
- Sayıştay summary 200+ karakter (önceki: ~90 karakter)
- TTS endpoint 200 OK  
- OpenAI TTS yanıtı (eski ElevenLabs hatası yok)
- Frontend arama çalışıyor
- TTS butonları çalışıyor

## SONRAKİ ADIMLAR

1. **Token Yenileme**: Coordinator'dan Supabase token yenileme
2. **Backend Deploy**: İki edge function deploy
3. **Backend Test**: Endpoint'leri curl ile test
4. **Frontend Test**: Web sitesini test_website ile tam test
5. **Final Rapor**: Tüm düzeltmelerin çalıştığını doğrula

