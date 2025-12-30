#!/bin/bash

echo "=== Backend Değişikliklerini Test Ediyorum ==="
echo ""

echo "1. Sayıştay Detay Testi:"
echo "------------------------"
curl -s -X POST 'https://jnnwhnjmgnmvhgogifzd.supabase.co/functions/v1/legal-search' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpubndobmptZ25tdmhnb2dpZnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NzU5NjEsImV4cCI6MjA3NzM1MTk2MX0.Ye1dLTtpYNo6rwQvlXulfXDQtT3Z90JGnDzohDd1BUA' \
  -d '{"searchQuery": "tazminat", "institutions": ["sayistay"], "filters": {"pageSize": 1}}' | jq '.data.results[0].results[0].summary' | head -5

echo ""
echo "2. OpenAI TTS Testi:"
echo "--------------------"
curl -s -X POST 'https://jnnwhnjmgnmvhgogifzd.supabase.co/functions/v1/text-to-speech' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpubndobmptZ25tdmhnb2dpZnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NzU5NjEsImV4cCI6MjA3NzM1MTk2MX0.Ye1dLTtpYNo6rwQvlXulfXDQtT3Z90JGnDzohDd1BUA' \
  -d '{"text": "Test mesajı"}' | jq '{success, useNativeTTS, message}'

echo ""
echo "=== Test Tamamlandı ==="
