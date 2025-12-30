#!/bin/bash
export SUPABASE_ACCESS_TOKEN="sbp_oauth_82b7d0a70cdc326f4af2706039fbf5d1f825ec07"
export SUPABASE_PROJECT_ID="jnnwhnjmgnmvhgogifzd"

# OpenAI API Key'i Supabase'e ekle
npx supabase secrets set OPENAI_API_KEY="YOUR_OPENAI_API_KEY_IN_ENV" --project-ref jnnwhnjmgnmvhgogifzd

echo "OpenAI API Key eklendi!"
