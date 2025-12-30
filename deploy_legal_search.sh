#!/bin/bash

# Configuration for Self-Hosted Supabase on Coolify
export SUPABASE_ACCESS_TOKEN="YOUR_SUPABASE_TOKEN_IN_ENV"

# Self-hosted API URL
export SUPABASE_API_URL="http://supabasekong-lwcg4k08sskkw8g84swcc008.65.108.77.26.sslip.io"

# Project ID for self-hosted is often "default" or defined in config
PROJECT_REF="default"
APP_DIR="/Users/hikmettanriverdi/yargıminimax/user_input_files/truth-rebuild-ai-enhanced"

echo "=== Yargı Arama Özelliği Güncelleniyor (Self-Hosted) ==="
echo "Hedef: $SUPABASE_API_URL"

# 1. Supabase Fonksiyonunu Deploy Et
echo "1. legal-search fonksiyonu deploy ediliyor..."
cd "$APP_DIR" || exit 1

# Self-hosted için endpoint belirtiyoruz
npx supabase functions deploy legal-search --project-ref "$PROJECT_REF" --api-url "$SUPABASE_API_URL" --no-verify-jwt

echo "İşlem tamamlandı."
