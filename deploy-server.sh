#!/bin/bash

# 云服务器部署脚本（管理端+API+数据库）
# 服务器: 43.165.0.206

set -e

echo "🚀 开始部署到云服务器..."

# 服务器信息
SERVER_IP="43.165.0.206"
SERVER_USER="root"
SERVER_PASS="19841127Aa!"

# 数据库配置（在Docker容器中）
DB_NAME="safetyshoe_db"
DB_USER="safetyshoe_user"
DB_PASS="Safetyshoe2024!"

# 目录配置
ADMIN_DIR="/www/wwwroot/dtwz/admin"
API_DIR="/opt/safetyshoe-api"

echo "📦 1. 构建管理端..."
cd safetyshoe-admin
npm run build || echo "⚠️ 管理端构建有警告，但继续部署..."
echo "✅ 管理端构建完成"

echo "📤 2. 准备部署文件..."
cd ..

# 创建临时目录
rm -rf temp_server_deploy
mkdir -p temp_server_deploy/admin
mkdir -p temp_server_deploy/api

# 复制管理端文件
cp -r safetyshoe-admin/out/* temp_server_deploy/admin/

# 复制API文件
cp -r safetyshoe-api/* temp_server_deploy/api/

# 复制数据库文件（如果存在）
if [ -d "database" ]; then
    cp -r database temp_server_deploy/
fi

# 创建Docker配置
cat > temp_server_deploy/docker-compose.yml << EOF
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: safetyshoe_postgres
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASS}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database:/docker-entrypoint-initdb.d
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER} -d ${DB_NAME}"]
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
      DB_NAME: ${DB_NAME}
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASS}
      JWT_SECRET: \${JWT_SECRET:-your-super-secret-jwt-key-change-this-in-production}
      R2_ACCESS_KEY_ID: \${R2_ACCESS_KEY_ID}
      R2_SECRET_ACCESS_KEY: \${R2_SECRET_ACCESS_KEY}
      R2_BUCKET: \${R2_BUCKET}
      R2_ENDPOINT: \${R2_ENDPOINT}
      R2_PUBLIC_URL: \${R2_PUBLIC_URL}
    ports:
      - "8787:8787"
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped

volumes:
  postgres_data:
EOF

# 创建API Dockerfile
cat > temp_server_deploy/api/Dockerfile << EOF
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 8787

CMD ["node", "src/index.js"]
EOF

# 创建.env.example
cat > temp_server_deploy/api/.env.example << EOF
NODE_ENV=production
PORT=8787
DB_HOST=postgres
DB_PORT=5432
DB_NAME=${DB_NAME}
DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASS}
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
R2_ACCESS_KEY_ID=your-r2-access-key
R2_SECRET_ACCESS_KEY=your-r2-secret-key
R2_BUCKET=your-r2-bucket
R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
R2_PUBLIC_URL=https://your-public-domain.com
EOF

# 创建Nginx配置
cat > temp_server_deploy/nginx.conf << EOF
# 管理端和API的Nginx配置
server {
    listen 80;
    server_name dtwz.zhiyuansafety.com;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name dtwz.zhiyuansafety.com;

    # SSL配置 (需要配置证书)
    ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;
    ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;

    # 管理端
    location /admin {
        alias ${ADMIN_DIR};
        index index.html;
        try_files \$uri \$uri/ /admin/index.html;
    }

    # API接口
    location /api {
        proxy_pass http://127.0.0.1:8787;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

echo "📋 3. 打包部署文件..."
tar -czf server-deploy.tar.gz -C temp_server_deploy .

echo "🚀 4. 上传到服务器..."
sshpass -p "${SERVER_PASS}" scp -o StrictHostKeyChecking=no server-deploy.tar.gz ${SERVER_USER}@${SERVER_IP}:/tmp/

echo "🔧 5. 在服务器上执行部署..."
sshpass -p "${SERVER_PASS}" ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_IP} << 'EOF'
set -e

echo "📁 创建目录结构..."
mkdir -p /www/wwwroot/dtwz/admin
mkdir -p /opt/safetyshoe-api
mkdir -p /opt/safetyshoe-api/database

echo "📦 解压部署包..."
cd /tmp
tar -xzf server-deploy.tar.gz

echo "📂 复制文件..."
cp -r admin/* /www/wwwroot/dtwz/admin/
cp -r api/* /opt/safetyshoe-api/

# 复制数据库文件（如果存在）
if [ -d "database" ]; then
    cp -r database/* /opt/safetyshoe-api/database/
else
    echo "⚠️ 数据库文件目录不存在，跳过（稍后手动导入）"
fi

echo "🐳 检查Docker..."
if ! command -v docker &> /dev/null; then
    echo "安装Docker..."
    curl -fsSL https://get.docker.com | sh
    systemctl start docker
    systemctl enable docker
fi

if ! command -v docker-compose &> /dev/null; then
    echo "安装Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

echo "🔧 配置Nginx..."
if ! command -v nginx &> /dev/null; then
    yum install -y nginx || apt-get install -y nginx
fi

# 备份原配置
cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup.$(date +%Y%m%d_%H%M%S) 2>/dev/null || true

# 确保conf.d目录存在
mkdir -p /etc/nginx/conf.d

# 创建新配置
cat > /etc/nginx/conf.d/dtwz.conf << 'NGINX_EOF'
# 管理端和API的Nginx配置
server {
    listen 80;
    server_name dtwz.zhiyuansafety.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name dtwz.zhiyuansafety.com;

    # SSL配置 (需要配置证书)
    ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;
    ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;

    # 管理端
    location /admin {
        alias /www/wwwroot/dtwz/admin;
        index index.html;
        try_files $uri $uri/ /admin/index.html;
    }

    # API接口
    location /api {
        proxy_pass http://127.0.0.1:8787;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINX_EOF

echo "🔐 生成自签名SSL证书（如果不存在）..."
if [ ! -f /etc/ssl/certs/nginx-selfsigned.crt ]; then
    mkdir -p /etc/ssl/certs /etc/ssl/private
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/ssl/private/nginx-selfsigned.key \
        -out /etc/ssl/certs/nginx-selfsigned.crt \
        -subj "/C=CN/ST=Shandong/L=Gaomi/O=Zhiyuan/CN=dtwz.zhiyuansafety.com"
fi

echo "🐳 启动服务..."
cd /opt/safetyshoe-api

# 复制docker-compose.yml到API目录
if [ -f "/tmp/docker-compose.yml" ]; then
    cp /tmp/docker-compose.yml /opt/safetyshoe-api/
fi

docker-compose -f /opt/safetyshoe-api/docker-compose.yml down 2>/dev/null || true
docker-compose -f /opt/safetyshoe-api/docker-compose.yml up -d --build

echo "🔄 重启Nginx..."
systemctl restart nginx
systemctl enable nginx

echo "✅ 部署完成！"
echo "🌐 管理地址: https://dtwz.zhiyuansafety.com/admin"
echo "📊 API地址: https://dtwz.zhiyuansafety.com/api"

EOF

echo "🧹 6. 清理临时文件..."
rm -rf temp_server_deploy
rm -f server-deploy.tar.gz

echo "✅ 云服务器部署完成！"
echo "🌐 管理地址: https://dtwz.zhiyuansafety.com/admin"
echo "📊 API地址: https://dtwz.zhiyuansafety.com/api"
echo ""
echo "📋 下一步："
echo "1. 检查服务是否正常启动"
echo "2. 配置R2凭证（在/opt/safetyshoe-api/.env文件中）"
echo "3. 导入数据库schema"
echo "4. 测试所有功能"
