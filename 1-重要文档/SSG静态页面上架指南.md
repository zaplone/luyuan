# 登泰网站 (Safetyshoe) SSG + ISR 落地实施指南

本文档详细描述了如何将现有的 **Next.js 14 + Strapi + i18n** 项目改造为 **SSG (静态站点生成)** 模式，以实现最佳的全球访问速度和 SEO 效果。

## 1. 核心策略说明

我们采用 **SSG (静态生成) + ISR (增量静态再生)** 的混合策略：

*   **SSG (Static Site Generation)**: 在构建时 (`npm run build`) 生成所有已知的页面 HTML。
*   **ISR (Incremental Static Regeneration)**: 设置页面缓存有效期（如 1 小时）。过期后，如果有新请求，服务器会在后台默默更新静态文件。
*   **On-Demand Generation**: 对于构建后新增的产品，用户首次访问时触发实时生成，之后自动变为静态页面。

## 2. 准备工作：API 增强

在 `safetyshoe-frontend/src/lib/strapi.ts` 中，我们需要做两件事：
1.  支持 `revalidate` 缓存控制。
2.  支持根据 URL (`model_code`) 反查产品。

### 2.1 修改 `fetchProducts` 支持缓存

```typescript
// 修改前
const response = await fetch(url, { cache: 'no-store' });

// 修改后
const response = await fetch(url, { 
  next: { revalidate: 3600 } // 单位：秒 (1小时)
});
```

### 2.2 新增 `fetchProductByModelCode`

我们需要一个函数，通过 URL 中的 model code 找到具体产品。

```typescript
export async function fetchProductByModelCode(modelCode: string, locale: string = 'en') {
  // Strapi 过滤查询
  const url = `${STRAPI_URL}/api/products?filters[model_code][$eq]=${modelCode}&populate=*&locale=${locale}`;
  // ... fetch 逻辑 ...
}
```

## 3. 实施步骤

### 步骤一：全局多语言静态化

修改 `src/app/[locale]/layout.tsx`，告诉 Next.js 我们有哪些语言需要预生成。

```typescript
// src/app/[locale]/layout.tsx

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}
```

### 步骤二：创建产品详情页 (SSG 核心)

创建新文件 `src/app/[locale]/products/[slug]/page.tsx`。

```typescript
import { fetchProducts, fetchProductByModelCode } from '@/lib/strapi';
import { notFound } from 'next/navigation';

// 1. 生成静态参数：告诉 Next.js 有哪些产品 ID/Slug
export async function generateStaticParams({ params: { locale } }) {
  const products = await fetchProducts(locale);
  
  return products.map((product) => ({
    slug: product.model_code, // 假设我们用 model_code 作为 URL
  }));
}

// 2. 页面组件
export default async function ProductPage({ params }) {
  const { slug, locale } = params;
  const product = await fetchProductByModelCode(slug, locale);

  if (!product) {
    notFound();
  }

  return (
    <div>
      {/* 产品详情渲染 */}
      <h1>{product.name}</h1>
    </div>
  );
}
```

### 步骤三：配置 Next.js 图片优化

静态导出模式下，Next.js 的默认图片优化需要调整。

如果使用 `next start` (Node.js 运行)，保持现状即可，Next.js 会自动优化图片。
如果完全静态导出 ( `output: 'export'` )，则需要：

```javascript
// next.config.js
module.exports = {
  images: {
    unoptimized: true, // 纯静态导出时开启
  },
}
```
*注：既然我们有 ISR 需求，建议保持 Node.js 运行模式 (next start)，这样既能享受 SSG 的速度，又有 ISR 的更新能力。*

## 4. 部署与运维

### 4.1 构建命令
在服务器上上线时：

```bash
npm run build
# build 会自动触发 generateStaticParams，生成所有 HTML
```

### 4.2 启动命令

```bash
npm start
# 启动 Node.js 服务器，提供 ISR 支持
```

### 4.3 新增产品流程
1.  运营人员在 Strapi 后台添加新产品 "New Boot 2026"。
2.  **无需重新部署**。
3.  用户访问 `/products/new-boot-2026`。
4.  Next.js 发现没有这个静态页，触发 SSR 渲染并返回页面。
5.  Next.js 保存该页面为静态文件。
6.  后续用户访问瞬间打开。

## 5. Cloudflare 托管与内容更新机制 (重要)

针对托管在 Cloudflare Pages 上的场景，我们通过 **"Webhook 触发自动重构建"** 的机制来更新内容。这就像报社印报纸：Strapi 是编辑部，Next.js 是印刷厂，Cloudflare 是报刊亭。

### 场景一：修改了现有产品的描述
*   **操作**：在 Strapi 后台修正了 "Steel Toe" 的拼写错误并保存。
*   **机制**：Strapi 自动发送 Webhook -> Cloudflare 接收信号 -> 重新构建网站。
*   **结果**：约 1-3 分钟后，新版网站上线，用户看到修正后的描述。

### 场景二：增加了一个新产品 (第 101 款)
*   **操作**：在 Strapi 后台添加并发布了新产品。
*   **机制**：Webhook 触发 Cloudflare 重新构建。Next.js 在构建时检测到新数据，自动生成 `product-101.html` 并加入列表页。
*   **结果**：构建完成后，新产品自动出现在网站上。

### 场景三：发布了一篇新新闻稿
*   **操作**：在 Strapi 发布了一篇展会新闻。
*   **机制**：Webhook 触发重构建。
*   **结果**：首页新闻板块和新闻列表页自动更新。

**核心优势**：
1.  **极速访问**：用户始终访问的是 Cloudflare CDN 上的纯静态文件。
2.  **自动化**：运营人员只需在 Strapi 操作，无需懂代码，网站自动更新。
3.  **零维护**：不需要管理服务器缓存，每次构建都是全新的。

## 6. 部署架构与核心前提 (必读)

在 Cloudflare 上落地 Headless CMS + SSG 架构，必须满足两个绝对前提。我们可以把 Cloudflare 构建比作**"炒菜"**：代码是菜谱，数据是食材，Cloudflare 是厨师。

### 6.1 核心架构图解

```mermaid
graph LR
    A[你的电脑] -- 1.上传代码 (菜谱) --> B[GitHub仓库]
    C[Cloudflare] -- 2.拉取代码 --> B
    C -- 3.抓取数据 (食材) --> D[云端 Strapi (公网IP)]
    D -- 返回 JSON 数据 --> C
    C -- 4.生成 HTML (炒菜) --> E[全球 CDN 节点]
```

### 6.2 两个绝对前提

Cloudflare 构建服务器位于海外云端，它无法访问你家里的电脑。因此：

1.  **源代码必须托管在 Git (GitHub/GitLab)**
    *   **作用**：这是 Cloudflare 的**"菜谱来源"**。
    *   **机制**：Cloudflare 必须能从远程仓库拉取到代码，才知道如何构建项目。即使代码逻辑没变，只要数据变了，Cloudflare 依然是用这份"旧代码"去抓取"新数据"来生成新页面。

2.  **后端 (Strapi) 必须部署在云端 (公网可访问)**
    *   **作用**：这是 Cloudflare 的**"食材超市"**。
    *   **关键点**：构建时，Cloudflare 会发起 HTTP 请求获取产品数据。如果 Strapi 还在你本地 (`localhost`)，Cloudflare 无法连接，构建会失败。
    *   **建议**：将 Strapi 部署在 VPS (如 DigitalOcean, Linode, 阿里云) 上，并配置域名 (如 `api.dengtai.com`)。

## 7. 常见问题 (FAQ)

*   **Q: 为什么我修改了 Strapi 内容，前台没变？**
    *   A: 因为开启了 ISR，缓存默认 1 小时。你可以缩短 `revalidate` 时间，或者配置 On-Demand Revalidation (按需清除缓存)。
*   **Q: Build 失败了怎么办？**
    *   A: 检查 `generateStaticParams` 里的数据源。如果 Strapi 挂了，Build 会失败。确保构建时 Strapi 是可用的。

---
**总结**：
按照此指南落地，你的网站将拥有：
1.  **秒开级速度** (HTML 提前生成)。
2.  **Google 完美收录** (内容静态化)。
3.  **极低运维成本** (自动更新内容)。
