#!/bin/bash

# Configuration for Supabase Cloud
PROJECT_REF="jnnwhnjmgnmvhgogifzd"
APP_DIR="/Users/hikmettanriverdi/yargıminimax/user_input_files/truth-rebuild-ai-enhanced"

echo "=== Yargı Arama Özelliği Güncelleniyor (Mevcut Oturum) ==="
echo "Proje ID: $PROJECT_REF"

cd "$APP_DIR" || exit 1

# Config temizliği (Emin olmak için)
if [ -f "supabase/config.toml" ]; then
    rm supabase/config.toml
fi

# Login komutunu kaldırdık! (Zaten giriş yapmış olmalısınız)
# Kullanıcı manuel olarak 'npx supabase login --token ...' yapmış olmalı.

echo "legal-search fonksiyonu deploy ediliyor..."
npx supabase functions deploy legal-search --project-ref "$PROJECT_REF" --no-verify-jwt

echo "İşlem tamamlandı."
