#!/bin/bash
set -e

echo "=== Backend Deployment Başlıyor ==="
echo ""

# Supabase bilgileri
export SUPABASE_PROJECT_ID="jnnwhnjmgnmvhgogifzd"
export SUPABASE_ACCESS_TOKEN="YOUR_SUPABASE_TOKEN_IN_ENV"

echo "1. Legal Search Function Deploy..."
cd /workspace/supabase/functions
npx supabase functions deploy legal-search --project-ref $SUPABASE_PROJECT_ID 2>&1 | tail -10

echo ""
echo "2. Text-to-Speech Function Deploy..."
npx supabase functions deploy text-to-speech --project-ref $SUPABASE_PROJECT_ID 2>&1 | tail -10

echo ""
echo "3. OpenAI API Key Ekleniyor..."
npx supabase secrets set OPENAI_API_KEY="YOUR_OPENAI_API_KEY_IN_ENV" --project-ref $SUPABASE_PROJECT_ID 2>&1 | tail -5

echo ""
echo "=== Deployment Tamamlandı ==="
