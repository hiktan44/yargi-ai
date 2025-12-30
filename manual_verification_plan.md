# Backend Deployment ve Doğrulama Planı

## Durum
- Frontend: ✅ Deploy edildi (https://lf3wpjtlri21.space.minimax.io)
- Backend: ⏳ Token sorunu nedeniyle deployment bekleniyor

## Deployment Sonrası Test Planı

### 1. Backend Endpoint Testleri

#### Test 1: Legal Search - Sayıştay Detayları
```bash
curl -X POST 'https://jnnwhnjmgnmvhgogifzd.supabase.co/functions/v1/legal-search' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer [ANON_KEY]' \
  -d '{"searchQuery": "tazminat", "institutions": ["sayistay"], "filters": {"pageSize": 2}}'
```

**Beklenen Sonuç**:
- Sayıştay summary alanı 200+ karakter
- "mali denetimde", "bütçe uygulama", "hesap ve işlemlerinde" gibi detaylı ifadeler
- En az 2 karar dönmeli

#### Test 2: OpenAI TTS API
```bash
curl -X POST 'https://jnnwhnjmgnmvhgogifzd.supabase.co/functions/v1/text-to-speech' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer [ANON_KEY]' \
  -d '{"text": "Merhaba, bu OpenAI TTS test mesajıdır."}'
```

**Beklenen Sonuç**:
```json
{
  "success": true,
  "useNativeTTS": false,
  "audio": "[base64_data]",
  "contentType": "audio/mpeg"
}
```

**VEYA** (API key yoksa):
```json
{
  "success": false,
  "useNativeTTS": true,
  "message": "OpenAI API key bulunamadı..."
}
```

### 2. Frontend-Backend Entegrasyon Testi

**Test Website ile Kapsamlı Test**:
1. Ana sayfa yükleme
2. Footer'da "ThirdhandAI tarafından yapılmıştır" + link kontrolü
3. Arama: "tazminat" + Sayıştay seçimi
4. Sonuçları kontrol: Sayıştay detayları uzun mu?
5. TTS butonu test: OpenAI TTS çalışıyor mu?
6. Konsol hataları kontrolü

### 3. Doğrulama Kriterleri

#### ✅ Başarılı Deployment:
- [ ] Legal search endpoint 200 OK
- [ ] Sayıştay summary 200+ karakter
- [ ] TTS endpoint 200 OK
- [ ] OpenAI TTS yanıtı (success: true VEYA useNativeTTS: true)
- [ ] Frontend arama sonuçları detaylı
- [ ] TTS butonları çalışıyor
- [ ] Konsol hatası yok

#### ❌ Sorunlu Deployment:
- Legal search 500 hatası
- Sayıştay summary hala kısa (<100 karakter)
- TTS endpoint 401/500 hatası
- Frontend-backend bağlantı sorunu

## Şu Anki Test Sonuçları

### Mevcut Backend Durumu (Eski Versiyon)
```bash
# Test edildi: 2025-11-20
Legal Search Sayıştay: Kısa summary (eski versiyon)
TTS Endpoint: ElevenLabs API hatası 401 (eski versiyon)
```

**YENİ DEPLOYMENT SONRASI GÜNCELLENECEK**

