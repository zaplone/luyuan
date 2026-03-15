#!/bin/bash

# 简化部署脚本：本地构建打包，服务器解压运行

set -e

echo "🚀 开始构建和打包..."

# 服务器信息
SERVER_IP="43.165.0.206"
SERVER_USER="root"
SERVER_PASS="19841127Aa!"

# 1. 构建管理端
echo "📦 1. 构建管理端..."
cd safetyshoe-admin
npm run build
cd ..

# 2. 打包部署文件
echo "📦 2. 打包部署文件..."
rm -rf deploy-package
mkdir -p deploy-package/admin
mkdir -p deploy-package/api
mkdir -p deploy-package/database

# 复制管理端
cp -r safetyshoe-admin/out/* deploy-package/admin/

# 复制API（不需要node_modules）
cp -r safetyshoe-api/* deploy-package/api/
rm -rf deploy-package/api/node_modules

# 复制数据库文件
if [ -d "database" ]; then
    cp -r database/* deploy-package/database/
fi

# 创建docker-compose.yml
cat > deploy-package/docker-compose.yml << 'EOF'
services:
  postgres:
    image: postgres:15
    container_name: safetyshoe_postgres
    environment:
      POSTGRES_DB: safetyshoe_db
      POSTGRES_USER: safetyshoe_user
      POSTGRES_PASSWORD: Safetyshoe2024!
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database:/docker-entrypoint-initdb.d
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U safetyshoe_user -d safetyshoe_db"]
      interval: 10s
      timeout: 5s
      retries: 5

  api:
    build: ./api
    container_name: safetyshoe_api
    environment:
      NODE_ENV: production
      PORT: 8787
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: safetyshoe_db
      DB_USER: safetyshoe_user
      DB_PASSWORD: Safetyshoe2024!
      JWT_SECRET: ${JWT_SECRET:-your-super-secret-jwt-key-change-this-in-production}
      R2_ACCESS_KEY_ID: ${R2_ACCESS_KEY_ID}
      R2_SECRET_ACCESS_KEY: ${R2_SECRET_ACCESS_KEY}
      R2_BUCKET: ${R2_BUCKET}
      R2_ENDPOINT: ${R2_ENDPOINT}
      R2_PUBLIC_URL: ${R2_PUBLIC_URL}
    ports:
      - "3666:8787"
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped

volumes:
  postgres_data:
EOF

# 创建API Dockerfile
cat > deploy-package/api/Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 8787
CMD ["node", "src/index.js"]
EOF

# 打包
echo "📦 3. 压缩打包..."
tar -czf deploy.tar.gz -C deploy-package .

# 4. 上传到服务器
echo "📤 4. 上传到服务器..."
sshpass -p "${SERVER_PASS}" scp -o StrictHostKeyChecking=no deploy.tar.gz ${SERVER_USER}@${SERVER_IP}:/tmp/

# 5. 服务器端解压和运行
echo "🔧 5. 服务器端部署..."
sshpass -p "${SERVER_PASS}" ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_IP} << 'SSH_EOF'
set -e

DEPLOY_DIR="/opt/safetyshoe"
ADMIN_DIR="/www/wwwroot/dtwz/admin"

echo "📁 创建目录..."
mkdir -p ${DEPLOY_DIR}
mkdir -p ${ADMIN_DIR}

echo "📦 解压文件..."
cd /tmp
tar -xzf deploy.tar.gz -C ${DEPLOY_DIR}

echo "📂 复制管理端..."
cp -r ${DEPLOY_DIR}/admin/* ${ADMIN_DIR}/

echo "🐳 启动Docker服务..."
cd ${DEPLOY_DIR}
docker-compose down 2>/dev/null || true
docker-compose up -d --build

echo "✅ 部署完成！"
echo "管理端: ${ADMIN_DIR}"
echo "API端口: 3666"
SSH_EOF

# 清理
rm -rf deploy-package
rm -f deploy.tar.gz

echo "✅ 部署完成！"
echo "📋 下一步：在宝塔面板配置Nginx反向代理"
echo "  - /admin -> ${ADMIN_DIR}"
echo "  - /api -> http://127.0.0.1:3666"

