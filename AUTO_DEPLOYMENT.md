# 🚀 安全鞋网站自动化部署指南

## 📋 部署流程总览
本文档记录了使用Wrangler CLI自动化部署到Cloudflare Pages的完整流程。

## 🛠️ 前置条件
- ✅ Node.js 环境
- ✅ Wrangler CLI 已安装
- ✅ Cloudflare 账户
- ✅ 项目已构建完成

## 📦 安装Wrangler CLI
```bash
# 全局安装Wrangler
npm install -g wrangler

# 验证安装
wrangler --version
```

## 🔐 登录Cloudflare
```bash
# 登录到Cloudflare账户
wrangler login

# 验证登录状态
wrangler whoami
```

## 🏗️ 项目构建
```bash
# 进入项目目录
cd /Users/zhengpeilong/1-正式项目/2-登泰网站/safetyshoe-frontend

# 构建项目
npm run build

# 验证构建结果
ls -la out/
```

## 📋 检查现有项目
```bash
# 查看所有Pages项目
wrangler pages project list

# 输出示例：
# ┌──────────────┬────────────────────────────────────────┬──────────────┬───────────────┐
# │ Project Name │ Project Domains                        │ Git Provider │ Last Modified │
# ├──────────────┼────────────────────────────────────────┼──────────────┼───────────────┤
# │ dengtai      │ dengtai.pages.dev, zhiyuanshoes.com.cn │ No           │ 16 hours ago  │
# └──────────────┴────────────────────────────────────────┴──────────────┴───────────────┘
```

## 🚀 自动化部署命令
```bash
# 部署到现有项目
wrangler pages deploy out/ --project-name=dengtai --commit-message="Deploy safetyshoe website v1.0"

# 如果需要忽略git警告
wrangler pages deploy out/ --project-name=dengtai --commit-dirty=true --commit-message="Deploy safetyshoe website v1.0"
```

## 📊 部署状态检查
```bash
# 查看部署历史
wrangler pages deployment list --project-name=dengtai

# 查看特定部署详情
wrangler pages deployment tail --project-name=dengtai
```

## 🔄 回滚部署
```bash
# 回滚到上一个版本
wrangler pages deployment rollback --project-name=dengtai

# 回滚到特定版本
wrangler pages deployment rollback --project-name=dengtai --deployment-id=ba917c69-ddcc-481a-972c-c564e9da3c5d
```

## 📁 项目结构
```
safetyshoe-frontend/
├── out/                    # 静态文件输出目录
│   ├── index.html         # 主页
│   ├── 404.html           # 404页面
│   ├── _next/             # Next.js静态资源
│   ├── images/            # 图片资源
│   └── index.txt          # 站点地图
├── safetyshoe-website.zip # 手动部署包
├── safetyshoe-website.tar.gz # 手动部署包
└── DEPLOYMENT.md          # 手动部署说明
```

## 🌐 部署URL信息
- **临时URL**: https://ba917c69.dengtai.pages.dev
- **自定义域名**: zhiyuanshoes.com.cn
- **项目名称**: dengtai

## ⚙️ 配置文件说明

### next.config.js 关键配置
```javascript
const nextConfig = {
  // 静态导出配置
  output: 'export',
  trailingSlash: true,
  
  // 图片配置
  images: {
    domains: ['localhost', 'your-oss-domain.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // 环境变量
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
};
```

## 🚨 常见问题解决

### 1. 构建失败
```bash
# 清理缓存重新构建
rm -rf .next out/
npm run build
```

### 2. 部署失败 - 编码问题
```bash
# 使用简单的英文提交信息
wrangler pages deploy out/ --project-name=dengtai --commit-message="Deploy update"
```

### 3. 登录问题
```bash
# 重新登录
wrangler logout
wrangler login
```

### 4. 权限问题
```bash
# 检查账户权限
wrangler whoami
wrangler pages project list
```

## 📝 完整部署脚本
```bash
#!/bin/bash
# 一键部署脚本

echo "🚀 开始部署安全鞋网站..."

# 1. 检查Wrangler
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler未安装，正在安装..."
    npm install -g wrangler
fi

# 2. 检查登录状态
if ! wrangler whoami &> /dev/null; then
    echo "🔐 请先登录Cloudflare..."
    wrangler login
fi

# 3. 构建项目
echo "🏗️ 构建项目..."
npm run build

# 4. 部署到Cloudflare
echo "🚀 部署到Cloudflare Pages..."
wrangler pages deploy out/ --project-name=dengtai --commit-message="Auto deploy $(date)"

# 5. 检查部署状态
echo "📊 检查部署状态..."
wrangler pages deployment list --project-name=dengtai

echo "✅ 部署完成！"
```

## 🎯 部署检查清单
- [ ] Wrangler CLI 已安装
- [ ] 已登录Cloudflare账户
- [ ] 项目构建成功
- [ ] 静态文件生成在 `out/` 目录
- [ ] 部署命令执行成功
- [ ] 网站可正常访问
- [ ] 自定义域名配置正确

## 📞 技术支持
- **Cloudflare文档**: https://developers.cloudflare.com/pages/
- **Wrangler文档**: https://developers.cloudflare.com/workers/wrangler/
- **Next.js静态导出**: https://nextjs.org/docs/advanced-features/static-html-export

---
**创建时间**: $(date)
**版本**: v1.0.0
**状态**: ✅ 已验证可用
