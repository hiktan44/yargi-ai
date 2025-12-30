#!/bin/bash

echo "=== MEVCUT BACKEND DURUMU TEST ==="
echo ""
echo "Test Zamanı: $(date)"
echo "Backend URL: https://jnnwhnjmgnmvhgogifzd.supabase.co"
echo ""

ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpubndobmptZ25tdmhnb2dpZnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NzU5NjEsImV4cCI6MjA3NzM1MTk2MX0.Ye1dLTtpYNo6rwQvlXulfXDQtT3Z90JGnDzohDd1BUA"

echo "1. LEGAL SEARCH - Sayıştay Detay Testi"
echo "========================================="
RESPONSE=$(curl -s -X POST 'https://jnnwhnjmgnmvhgogifzd.supabase.co/functions/v1/legal-search' \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $ANON_KEY" \
  -d '{"searchQuery": "tazminat", "institutions": ["sayistay"], "filters": {"pageSize": 1}}')

echo "Status: $(echo $RESPONSE | jq -r '.data.results[0].name // "HATA"')"
echo "Karar Sayısı: $(echo $RESPONSE | jq -r '.data.results[0].count // 0')"
echo ""
echo "İlk Karar Summary (karakter sayısı):"
SUMMARY=$(echo $RESPONSE | jq -r '.data.results[0].results[0].summary // "BULUNAMADI"')
echo "Uzunluk: ${#SUMMARY} karakter"
echo "İçerik: $SUMMARY"
echo ""

echo "2. TEXT-TO-SPEECH - TTS API Testi"
echo "==================================="
TTS_RESPONSE=$(curl -s -X POST 'https://jnnwhnjmgnmvhgogifzd.supabase.co/functions/v1/text-to-speech' \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $ANON_KEY" \
  -d '{"text": "Test mesajı"}')

echo "Yanıt:"
echo $TTS_RESPONSE | jq '{success, useNativeTTS, message}'
echo ""

echo "=== TEST TAMAMLANDI ==="
