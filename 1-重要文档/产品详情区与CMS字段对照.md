# 产品详情区与 CMS 字段对照

> 说明：产品详情页（`/products/[slug]`）当前数据来源 = 后端 Strapi 产品 API + 前端占位/多语言文案。本文档梳理「哪些已从 CMS 来、哪些仍是硬编码」，以及如何组装详情区内容。

---

## 一、数据流概览

```
Strapi API (/api/products?populate=*&locale=xx)
    → fetchProducts(locale) → transformProduct(raw)
    → 产品详情页 page.tsx 按 slug 取一条 product
    → ProductDetailClient({ product }) 展示
```

- **slug**：由 `model_code` 生成（如 `LY-8801` → `ly-8801`），详情页用 slug 匹配产品。
- **后端**：`safetyshoe-backend`（Strapi），产品在 `api/product`，关联 certification / industry / feature 及组件 `product.material-spec`。

---

## 二、产品详情区各区块与数据来源

| 区块 | 内容 | 来源 | 说明 |
|------|------|------|------|
| **面包屑** | 首页 / 产品 / 当前产品名 | CMS `product.name` | ✅ 已用 CMS |
| **图集** | 主图 + 缩略图列表 | CMS `product.image` / `product.images` | ✅ 已用 CMS（transformProduct 已处理 R2 URL） |
| **角标 NEW/HOT** | 新品、热销 | CMS `product.is_new` / `product.featured`(is_hot) | ✅ 已用 CMS |
| **01 Hero** | 行业标签、安全标准、OEM 角标、名称、认证一句、型号 | CMS：`industries`、`safety_standard`、`name`、`model_code`<br>i18n：`ProductDetail.hero.oemBadge`、`certTagline` | ✅ 主体来自 CMS |
| **02 描述** | 产品描述 + 工厂一句 | CMS `product.description`<br>i18n：`descriptionSection.factoryLine` | ✅ 描述来自 CMS；空时用 PLACEHOLDER 英文段落 |
| **03 规格表** | 鞋面/鞋头/中底/大底/内里/安全等级/重量/测试标准/颜色/尺码 | CMS：`materials.*`、`safety_standard`<br>**硬编码**：重量、测试标准、颜色、尺码（见下） | ⚠️ 部分硬编码 |
| **04 关键卖点** | 6 个固定模块（安全/舒适/耐用/合规/防滑/透气）+ 产品 features 标签 | i18n：`ProductDetail.keyFeatures.*`<br>CMS：`product.features`（标签列表） | 卖点文案通用；标签来自 CMS |
| **05 认证** | CE / EN 20345 / SGS 三条 | 全 i18n `ProductDetail.certifications.*` | 通用文案，非按产品 |
| **06 行业应用** | 按行业展示痛点+解决方案 | CMS：`product.industries`<br>i18n：`industryApplications.{行业}.pain/solution` | ✅ 行业来自 CMS，文案 i18n |
| **07 OEM 定制** | 定制说明 + 列表（logo/颜色/材质/包装/贴牌） | 全 i18n `ProductDetail.oem.*` | 通用 |
| **08 FAQ** | 6 个问题（MOQ/样品/交期/证书/付款/验厂） | 全 i18n `ProductDetail.faq.*` | 通用 |
| **09 询盘** | 信任数据 + 表单 | **硬编码** TRUST_STATS + i18n | 见下 |

---

## 三、字段级对照（CMS ↔ 前端）

### 3.1 后端 Product 表（schema.json）→ 前端 Product 类型

| 后端字段 (Strapi) | 前端 Product / 详情页使用 | 说明 |
|-------------------|---------------------------|------|
| `name` | `product.name` | ✅ 通用 |
| `model_code` | `product.model_code`，并用于生成 `slug` | ✅ 通用 |
| `description` | `product.description` | ✅ 通用；空时详情页用 PLACEHOLDER.description |
| `images` (media, multiple) | `product.images[]`、`product.image`（首张） | ✅ 通用；transformProduct 已处理 URL |
| `moq` | `product.moq` | ✅ 通用 |
| `safety_standard` | `product.safety_standard` | ✅ 通用 |
| `additional_certs` (relation → certification) | `product.additional_certs`（名称数组） | ✅ 通用；transformProduct 用 extractNames |
| `style` | `product.style` | ✅ 通用（类型 ShoeStyle） |
| `industries` (relation → industry) | `product.industries` | ✅ 通用；extractNames |
| `materials` (component) | `product.materials`（upper, toe_cap, midsole, outsole, lining） | ✅ 通用；空时用 PLACEHOLDER.materials |
| `features` (relation → feature) | `product.features` | ✅ 通用；extractNames；空时用 PLACEHOLDER.features |
| `is_hot` | `product.featured` | ✅ 通用 |
| `is_new` | `product.is_new` | ✅ 通用 |
| `price_range` | `product.price_range` | ✅ 已映射；详情页未展示 |

后端 **没有**、但详情页用到的内容：

- **规格区块**：重量、测试标准、颜色、尺码 —— 当前全部写死为默认文案（如 “As per standard” / “36–48 (EU)”）。
- **信任数据**：2M+ pairs、50+ countries、24h response —— 写死在 `TRUST_STATS`，未从 CMS 或环境变量读。

---

## 四、哪些通用、哪些不通用

### 4.1 已与 CMS 对齐（通用）

- 名称、型号、描述、图集、MOQ、安全标准、附加认证、款式、行业、材质组件、功能特性、是否热销/新品。
- 详情页 Hero、描述、规格中的材质与安全等级、行业应用、以及产品 features 标签，都直接或间接来自上述 CMS 字段；空值时由前端 PLACEHOLDER 兜底（仅描述/材质/行业/特性）。

### 4.2 不通用 / 需约定或扩展

1. **规格表后半部分（重量 / 测试标准 / 颜色 / 尺码）**  
   - 当前：固定 i18n 或写死（如 `specs.weightDefault`、`specs.testDefault`、`specs.colorsDefault`、`36–48 (EU)`）。  
   - 若希望按产品维护：需在 Strapi 产品上增加可选字段（如 `weight`、`test_standard`、`colors`、`sizes`），并在详情页改为优先读 `product.*`，再回退到现有默认文案。

2. **关键卖点（04）**  
   - 当前：6 个模块的标题和描述全部来自 i18n，对所有产品一致。  
   - 若希望按产品定制：需在 CMS 增加「产品级卖点」结构（如 repeatable component 或 relation），前端再按产品数据渲染；否则保持通用 i18n 即可。

3. **认证（05）、OEM（07）、FAQ（08）**  
   - 当前：全部 i18n，适用于全站。  
   - 通用即可时：无需改 CMS。若将来要做「按产品显示不同认证/OEM 说明」，再在 CMS 增加对应关系或富文本。

4. **信任数据（09）**  
   - 当前：`TRUST_STATS` 硬编码。  
   - 建议：可改为从环境变量或 Strapi 的 single type（如「公司信息」）读取，便于运营修改。

5. **slug 规则**  
   - 当前：前端用 `model_code` 生成 slug（小写、空格变 `-`）。  
   - 若后端以后增加独立 `slug` 字段，可改为优先使用 `slug`，并保持与列表/详情一致。

---

## 五、前端占位与转换逻辑（当前）

- **useProductWithPlaceholders(product)**：在 `ProductDetailClient` 内，对 `description`、`materials`、`industries`、`features` 做空值兜底，用 `PLACEHOLDER` 的英文内容，保证页面总有可展示文案。
- **transformProduct**：把 Strapi 的 relation（additional_certs、industries、features）转成名称数组；图片转成可直接用的 URL 数组和主图。

因此：**产品详情区「核心产品信息」已主要由 CMS 驱动**；真正未接 CMS 的，主要是「规格表中的重量/测试标准/颜色/尺码」和「信任数据」，以及全部通用区块（认证、OEM、FAQ、关键卖点文案）。

---

## 六、建议的组装方式与可选改动

### 6.1 保持现状即可

- 详情页已按「CMS 有则用、无则占位」组装；关系型字段（认证、行业、特性）已通过 `populate=*` + `transformProduct` 正确解析。
- 若当前不需要按产品维护重量/颜色/尺码等，可维持现有硬编码默认值。

### 6.2 若希望规格/信任数据也来自 CMS

1. **后端**（可选）：  
   - 在 `product` 的 schema 中增加可选字段，例如：  
     `weight`（string）、`test_standard`（string）、`colors`（string）、`sizes`（string）。  
   - 或新增 single type「Site / Company」存放 `pairs_shipped`、`countries`、`response_hours`。

2. **前端**：  
   - 在 `transformProduct` 中映射上述新字段到 `Product`。  
   - 详情页规格区：优先显示 `product.weight` / `product.test_standard` / `product.colors` / `product.sizes`，空时再用现有 i18n 默认文案。  
   - 信任数据：优先从 API 或 env 读，再回退到 `TRUST_STATS`。

### 6.3 产品详情区组装清单（实现层面）

- 从 CMS 拿：`fetchProducts(locale)` → 按 `slug`（由 `model_code` 生成）取一条 → `transformProduct` → 得到 `Product`。  
- 详情页用 `Product` 直接渲染：name、model_code、description、images、industries、safety_standard、materials、features、moq、is_new、featured。  
- 空值：description / materials / industries / features 由 `useProductWithPlaceholders` 用 PLACEHOLDER 补全。  
- 规格中的重量/测试标准/颜色/尺码：目前写死；若 CMS 加字段，再改为读 `product` 并保留当前默认为 fallback。  
- 其余（认证、OEM、FAQ、信任数据）：继续用 i18n 或现有常量即可，无需为「产品详情区」改 CMS。

按上述方式，产品详情区即可以 CMS 为核心、占位与通用文案为辅，组装完整内容；后续只需按需扩展后端字段并在前端做对应映射与回退即可。
