#!/bin/bash
# Chat edge function test script

echo "Testing chat edge function..."
echo ""

# Test endpoint
curl -X POST 'https://jnnwhnjmgnmvhgogifzd.supabase.co/functions/v1/chat' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpubndobmptZ25tdmhnb2dpZnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NzU5NjEsImV4cCI6MjA3NzM1MTk2MX0.Ye1dLTtpYNo6rwQvlXulfXDQtT3Z90JGnDzohDd1BUA' \
  -d '{
    "message": "Merhaba, Danıştay nedir?",
    "conversationHistory": []
  }'

echo ""
echo "Test completed"
