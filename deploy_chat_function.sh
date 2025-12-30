#!/bin/bash
# Chat edge function manuel deployment script

SUPABASE_URL="https://jnnwhnjmgnmvhgogifzd.supabase.co"
SUPABASE_ACCESS_TOKEN="YOUR_SUPABASE_TOKEN_IN_ENV"
PROJECT_ID="jnnwhnjmgnmvhgogifzd"

FUNCTION_NAME="chat"
FUNCTION_PATH="/workspace/user_input_files/truth-rebuild-ai-enhanced/supabase/functions/chat/index.ts"

echo "Deploying edge function: $FUNCTION_NAME"
echo "Function path: $FUNCTION_PATH"

# Supabase Management API kullanarak deployment
curl -X POST \
  "${SUPABASE_URL}/functions/v1/${FUNCTION_NAME}" \
  -H "Authorization: Bearer ${SUPABASE_ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @${FUNCTION_PATH}

echo ""
echo "Deployment attempt completed"
