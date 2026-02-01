#!/bin/bash

# 后端部署脚本 (Strapi + PostgreSQL)
# 使用方法: ./deploy-backend-strapi.sh

set -e

# 加载环境变量
if [ -f .env.production ]; then
    export $(cat .env.production | grep -v '#' | awk '/=/ {print $0}')
else
    echo "❌ 错误: 未找到 .env.production 文件。请先配置环境变量。"
    exit 1
fi

echo "🚀 开始部署流程..."

# 服务器信息 (请确认是否正确)
SERVER_IP="43.165.0.206"
SERVER_USER="root"
# 注意：生产环境建议使用 SSH Key 认证，避免脚本中明文写密码
# 这里为了方便演示保留，请确保 sshpass 已安装 (brew install sshpass)
SERVER_PASS="19841127Aa!"

DEPLOY_DIR="/opt/safetyshoe-backend"

# 1. 准备部署包
echo "📦 1. 准备部署文件..."
rm -rf deploy-dist
mkdir -p deploy-dist/app

# 复制后端代码 (排除不必要文件)
echo "   - 复制代码..."
rsync -av --progress safetyshoe-backend/ deploy-dist/app/ \
    --exclude node_modules \
    --exclude .git \
    --exclude .tmp \
    --exclude build \
    --exclude .cache \
    --exclude tests \
    --exclude dist \
    --exclude '._*' \
    --exclude '.DS_Store'

# 2. 生成 Docker 配置
echo "🐳 2. 生成 Docker 配置..."

# .dockerignore (排除 macOS 等无关文件)
cat > deploy-dist/.dockerignore << 'DOCKERIGNORE'
**/._*
**/.DS_Store
**/dist
**/node_modules
**/.git
DOCKERIGNORE

# Dockerfile
cat > deploy-dist/Dockerfile << EOF
FROM node:20-alpine
WORKDIR /opt/app
COPY app/package*.json ./
RUN npm config set registry https://registry.npmmirror.com/
RUN npm ci
# 自动安装 R2 插件 (防止 package.json 中遗漏)
RUN npm install strapi-provider-upload-cloudflare-r2
COPY app/ .
# 删除 macOS 资源分叉文件 (._*) 防止 Strapi 加载失败
RUN find . -name '._*' -delete 2>/dev/null || true
RUN npm run build
EXPOSE 1337
CMD ["npm", "run", "start"]
EOF

# docker-compose.yml
cat > deploy-dist/docker-compose.yml << EOF
version: '3'
services:
  safetyshoe-strapi:
    container_name: safetyshoe_strapi
    build: .
    image: safetyshoe-strapi:latest
    restart: unless-stopped
    env_file: .env
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_HOST: safetyshoe_postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: ${DB_NAME}
      DATABASE_USERNAME: ${DB_USER}
      DATABASE_PASSWORD: ${DB_PASS}
      NODE_ENV: production
    volumes:
      - ./app/public/uploads:/opt/app/public/uploads
    ports:
      - "3667:1337"
    depends_on:
      - safetyshoe-postgres
    networks:
      - safetyshoe-net

  safetyshoe-postgres:
    container_name: safetyshoe_postgres
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASS}
    volumes:
      - safetyshoe_data:/var/lib/postgresql/data
    networks:
      - safetyshoe-net

volumes:
  safetyshoe_data:

networks:
  safetyshoe-net:
    driver: bridge
EOF

# 生成服务器端 .env
cat > deploy-dist/.env << EOF
HOST=0.0.0.0
PORT=1337
APP_KEYS=${JWT_SECRET},${API_TOKEN_SALT},${ADMIN_JWT_SECRET},${TRANSFER_TOKEN_SALT}
API_TOKEN_SALT=${API_TOKEN_SALT}
ADMIN_JWT_SECRET=${ADMIN_JWT_SECRET}
TRANSFER_TOKEN_SALT=${TRANSFER_TOKEN_SALT}
JWT_SECRET=${JWT_SECRET}
# R2 Config
R2_ACCESS_KEY_ID=${R2_ACCESS_KEY_ID}
R2_SECRET_ACCESS_KEY=${R2_SECRET_ACCESS_KEY}
R2_BUCKET=${R2_BUCKET}
R2_ENDPOINT=${R2_ENDPOINT}
R2_PUBLIC_URL=${R2_PUBLIC_URL}
EOF

# 3. 打包并上传
echo "📦 3. 打包上传..."
tar -czf backend-deploy.tar.gz -C deploy-dist .

echo "📤 上传到服务器 ${SERVER_IP}..."
sshpass -p "${SERVER_PASS}" scp -o StrictHostKeyChecking=no backend-deploy.tar.gz ${SERVER_USER}@${SERVER_IP}:/tmp/

# 4. 服务器执行部署
echo "🔧 4. 服务器端执行部署..."
sshpass -p "${SERVER_PASS}" ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_IP} << ENDSSH
    set -e
    echo "   - 创建目录 ${DEPLOY_DIR}..."
    mkdir -p ${DEPLOY_DIR}
    
    echo "   - 解压文件..."
    tar -xzf /tmp/backend-deploy.tar.gz -C ${DEPLOY_DIR}
    rm /tmp/backend-deploy.tar.gz
    
    echo "   - 停止并移除所有容器..."
    docker stop \$(docker ps -aq) 2>/dev/null || true
    docker rm \$(docker ps -aq) 2>/dev/null || true
    
    echo "   - 启动 Docker 服务（Strapi + PostgreSQL 共 2 个容器）..."
    cd ${DEPLOY_DIR}
    docker-compose up -d --build
    
    echo "   - 清理未使用的镜像..."
    docker image prune -f
    
    echo "✅ 后端部署完成！"
    echo "API 地址: http://${SERVER_IP}:3668"
ENDSSH

# 清理本地临时文件
rm -rf deploy-dist backend-deploy.tar.gz

echo "🎉 脚本执行完毕！"
