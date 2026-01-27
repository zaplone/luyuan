# 🚀 部署命令快速参考

## 📋 常用部署命令

### 1. 完整部署（推荐）
```bash
# 运行完整部署脚本
./deploy.sh
```

### 2. 快速部署
```bash
# 运行快速部署脚本
./quick-deploy.sh
```

### 3. 手动部署命令
```bash
# 构建项目
npm run build

# 部署到Cloudflare
wrangler pages deploy out/ --project-name=dengtai --commit-message="Deploy update"
```

## 🔧 管理命令

### 检查部署状态
```bash
# 查看所有部署
wrangler pages deployment list --project-name=dengtai

# 查看实时日志
wrangler pages deployment tail --project-name=dengtai
```

### 回滚部署
```bash
# 回滚到上一个版本
wrangler pages deployment rollback --project-name=dengtai
```

### 检查登录状态
```bash
# 查看当前用户
wrangler whoami

# 重新登录
wrangler login
```

## 📊 项目信息
- **项目名称**: dengtai
- **域名**: zhiyuanshoes.com.cn
- **Pages域名**: dengtai.pages.dev
- **管理面板**: https://dash.cloudflare.com/pages

## 🚨 故障排除

### 构建失败
```bash
# 清理缓存
rm -rf .next out/
npm run build
```

### 部署失败
```bash
# 检查登录状态
wrangler whoami

# 重新登录
wrangler logout
wrangler login
```

### 权限问题
```bash
# 检查项目列表
wrangler pages project list
```

---
**最后更新**: $(date)
**状态**: ✅ 已验证可用
