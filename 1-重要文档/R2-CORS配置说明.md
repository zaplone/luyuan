# Cloudflare R2 CORS 配置说明

## 问题现象

在 Strapi 后台创建/编辑产品时，上传的图片已成功传到 R2，但**后台界面上看不到图片缩略图**，或显示为空白/ broken 图标。

## 原因

Strapi 管理后台运行在浏览器中，加载图片时会向 R2 发起跨域请求。R2 默认没有 CORS 配置，浏览器会拦截这类请求，导致图片无法显示。

## 解决步骤

### 1. 进入 Cloudflare 控制台

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 左侧选择 **R2 Object Storage**
3. 找到你的 bucket（如 `luyuan`），点击进入

### 2. 添加 CORS 策略

1. 进入 **Settings** 标签
2. 找到 **CORS Policy** 区域
3. 点击 **Add CORS policy**
4. 选择 **JSON** 标签，粘贴以下配置：

```json
[
  {
    "AllowedOrigins": [
      "http://43.165.0.206:3667",
      "http://localhost:1337",
      "http://localhost:3000",
      "https://yourdomain.com"
    ],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]
```

5. **按需修改** `AllowedOrigins`：
   - `http://43.165.0.206:3667`：当前 Strapi 后台地址
   - `http://localhost:1337`：本地开发 Strapi
   - `http://localhost:3000`：本地开发前端
   - `https://yourdomain.com`：替换为你的正式域名（前后端都可访问 R2 图片时使用）

6. 点击 **Save**

### 3. 确认 Bucket 已允许公网读取

- 若使用 R2 默认公网域名（`pub-xxx.r2.dev`），需在 bucket 设置中开启 **Public access**
- 路径：Bucket → **Settings** → **Public access** → 确认已开启

### 4. 验证

1. 保存 CORS 后等待约 30 秒生效
2. 刷新 Strapi 后台页面
3. 打开任一产品，查看图片是否正常显示

---

## 数据流说明

```
管理员选择图片
      ↓
Strapi 接收文件 → 通过 R2 插件上传到 Cloudflare R2
      ↓
数据库保存图片 URL（如 https://pub-xxx.r2.dev/xxx.jpg）
      ↓
后台界面用该 URL 加载缩略图 ← 这里需要 CORS 允许 Strapi 域名访问 R2
```

图片文件本身**只存在 R2**，不在 Strapi 服务器。后台能“看到”图片，是因为浏览器用保存的 URL 去请求 R2，因此 R2 必须允许 Strapi 所在域名的跨域请求。
