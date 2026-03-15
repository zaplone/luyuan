#!/bin/bash

# ==========================================
# 登泰网站 - 前端静态网页一键部署脚本 (宝塔版)
# ==========================================

# --- 服务器配置 ---
SERVER_IP="43.153.118.218"
SERVER_USER="root"
# 宝塔自动生成的网站根目录
REMOTE_PATH="/www/wwwroot/slsafetyshoes.com" 

# --- 项目配置 ---
FRONTEND_DIR="safetyshoe-frontend"

# 报错即停止
set -e

echo "------------------------------------------"
echo "🚀 开始执行一键部署流程..."
echo "目标服务器: ${SERVER_IP}"
echo "目标目录: ${REMOTE_PATH}"
echo "------------------------------------------"

# 1. 进入前端目录
cd $FRONTEND_DIR

# 2. 执行本地构建
echo "📦 步骤 1/2: 正在本地构建静态页面 (npm run build)..."
npm run build

# 3. 同步文件到服务器
echo "📤 步骤 2/2: 正在同步文件到服务器..."
echo "💡 请在下方提示时输入服务器密码。"

# 使用 rsync 进行增量同步
# --delete 会删除服务器上宝塔自带的初始文件（如 index.html, 404.html），确保只保留你的项目文件
rsync -avz --delete out/ ${SERVER_USER}@${SERVER_IP}:${REMOTE_PATH}/

echo "------------------------------------------"
echo "✅ 部署完成！"
echo "🌐 请访问: http://slsafetyshoes.com (或你的服务器 IP)"
echo "------------------------------------------"
