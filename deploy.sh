#!/bin/bash

# 安全鞋网站部署脚本
# 服务器: 43.165.0.206
# 数据库: safetyshoe_db

set -e

echo "🚀 开始部署安全鞋网站..."

# 服务器信息
SERVER_IP="43.165.0.206"
SERVER_USER="root"
SERVER_PASS="19841127Aa!"

# 数据库配置
DB_NAME="safetyshoe_db"
DB_USER="safetyshoe_user"
DB_PASS="Safetyshoe2024!"
DB_PORT="5432"

# 目录配置
SITE_DIR="/www/wwwroot/dtwz/site"
ADMIN_DIR="/www/wwwroot/dtwz/admin"
API_DIR="/opt/safetyshoe-api"

echo "📦 1. 构建前端项目..."
cd safetyshoe-frontend
npm run build
echo "✅ 前端构建完成"

echo "📦 2. 构建管理端项目..."
cd ../safetyshoe-admin
npm run build
echo "✅ 管理端构建完成"

echo "📤 3. 上传文件到服务器..."
cd ..

# 创建临时目录
mkdir -p temp_deploy

# 复制前端文件
cp -r safetyshoe-frontend/out/* temp_deploy/

# 复制管理端文件
mkdir -p temp_deploy/admin
cp -r safetyshoe-admin/out/* temp_deploy/admin/

# 复制API文件
cp -r safetyshoe-api temp_deploy/

# 创建Docker配置
cat > temp_deploy/docker-compose.yml << EOF
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

  api:
    build: ./safetyshoe-api
    container_name: safetyshoe_api
    environment:
      NODE_ENV: production
      PORT: 8787
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: ${DB_NAME}
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASS}
      JWT_SECRET: your-super-secret-jwt-key-change-this-in-production
      R2_ACCESS_KEY_ID: your-r2-access-key
      R2_SECRET_ACCESS_KEY: your-r2-secret-key
      R2_BUCKET: your-r2-bucket
      R2_ENDPOINT: https://your-account-id.r2.cloudflarestorage.com
      R2_PUBLIC_URL: https://your-public-domain.com
    ports:
      - "8787:8787"
    depends_on:
      - postgres
    restart: unless-stopped

volumes:
  postgres_data:
EOF

# 创建API Dockerfile
cat > temp_deploy/safetyshoe-api/Dockerfile << EOF
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 8787

CMD ["node", "src/index.js"]
EOF

# 创建Nginx配置
cat > temp_deploy/nginx.conf << EOF
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

    # 前端网站
    location / {
        root ${SITE_DIR};
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }

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

echo "📋 4. 准备部署包..."
tar -czf safetyshoe-deploy.tar.gz -C temp_deploy .

echo "🚀 5. 上传到服务器..."
sshpass -p "${SERVER_PASS}" scp -o StrictHostKeyChecking=no safetyshoe-deploy.tar.gz ${SERVER_USER}@${SERVER_IP}:/tmp/

echo "🔧 6. 在服务器上执行部署..."
sshpass -p "${SERVER_PASS}" ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_IP} << 'EOF'
set -e

echo "📁 创建目录结构..."
mkdir -p /www/wwwroot/dtwz/site
mkdir -p /www/wwwroot/dtwz/admin
mkdir -p /opt/safetyshoe-api

echo "📦 解压部署包..."
cd /tmp
tar -xzf safetyshoe-deploy.tar.gz

echo "📂 复制文件..."
cp -r * /www/wwwroot/dtwz/site/
cp -r admin/* /www/wwwroot/dtwz/admin/
cp -r safetyshoe-api/* /opt/safetyshoe-api/

echo "🐳 安装Docker和Docker Compose..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com | sh
    systemctl start docker
    systemctl enable docker
fi

if ! command -v docker-compose &> /dev/null; then
    curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

echo "🔧 配置Nginx..."
if ! command -v nginx &> /dev/null; then
    yum install -y nginx
fi

# 备份原配置
cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup

# 创建新配置
cat > /etc/nginx/conf.d/dtwz.conf << 'NGINX_EOF'
server {
    listen 80;
    server_name dtwz.zhiyuansafety.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name dtwz.zhiyuansafety.com;

    # 自签名证书 (生产环境请使用真实证书)
    ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;
    ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;

    # 前端网站
    location / {
        root /www/wwwroot/dtwz/site;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

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

echo "🔐 生成自签名SSL证书..."
mkdir -p /etc/ssl/certs /etc/ssl/private
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/nginx-selfsigned.key \
    -out /etc/ssl/certs/nginx-selfsigned.crt \
    -subj "/C=CN/ST=Shandong/L=Gaomi/O=Zhiyuan/CN=dtwz.zhiyuansafety.com"

echo "🐳 启动服务..."
cd /opt/safetyshoe-api
docker-compose up -d

echo "🔄 重启Nginx..."
systemctl restart nginx
systemctl enable nginx

echo "✅ 部署完成！"
echo "🌐 网站地址: https://dtwz.zhiyuansafety.com"
echo "🔧 管理地址: https://dtwz.zhiyuansafety.com/admin"
echo "📊 API地址: https://dtwz.zhiyuansafety.com/api"

EOF

echo "🧹 7. 清理临时文件..."
rm -rf temp_deploy
rm -f safetyshoe-deploy.tar.gz

echo "✅ 部署完成！"
echo "🌐 网站地址: https://dtwz.zhiyuansafety.com"
echo "🔧 管理地址: https://dtwz.zhiyuansafety.com/admin"
echo "📊 API地址: https://dtwz.zhiyuansafety.com/api"
echo ""
echo "📋 下一步："
echo "1. 检查网站是否正常访问"
echo "2. 导入数据库schema"
echo "3. 配置R2凭证"
echo "4. 测试所有功能"

