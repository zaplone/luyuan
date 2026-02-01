#!/bin/bash
# 通过 Strapi API 创建 2 个测试产品
# 使用前：在 Strapi 后台 Settings > API Tokens 创建 Token，并赋予 Product 的 create 权限
# 使用: API_TOKEN=你的token ./scripts/create-products-via-api.sh

BASE_URL="${STRAPI_URL:-http://43.165.0.206:3667}"
TOKEN="${API_TOKEN}"

if [ -z "$TOKEN" ]; then
  echo "❌ 请设置 API_TOKEN 环境变量"
  echo "   1. 打开 ${BASE_URL}/admin"
  echo "   2. Settings > API Tokens > Create new API Token"
  echo "   3. 赋予 Product 的 create 权限，复制 token"
  echo "   4. 执行: API_TOKEN=你的token ./scripts/create-products-via-api.sh"
  exit 1
fi

echo "📦 正在创建 2 个测试产品..."

# 产品 1
curl -s -X POST "${BASE_URL}/api/products" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "Test Safety Boot S1",
      "model_code": "TEST-001",
      "description": "Test product for construction industry.",
      "safety_standard": "S1",
      "style": "Mid Cut",
      "moq": "100 Pairs",
      "publishedAt": null
    }
  }' | head -c 500
echo ""

# 产品 2
curl -s -X POST "${BASE_URL}/api/products" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "Test Work Shoe S3",
      "model_code": "TEST-002",
      "description": "Test product with steel toe cap.",
      "safety_standard": "S3",
      "style": "High Boot",
      "moq": "200 Pairs",
      "publishedAt": null
    }
  }' | head -c 500
echo ""

echo "✅ 请求已发送，请检查上方返回。若成功会返回产品数据；若 403 请检查 Token 权限。"
