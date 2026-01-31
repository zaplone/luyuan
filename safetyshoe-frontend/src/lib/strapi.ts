// Strapi API 配置
// 服务端和客户端都能使用
const STRAPI_URL = 
  typeof window !== 'undefined' 
    ? (process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337')
    : (process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337');

import { Product, SafetyStandard, Certification, MaterialSpec, ShoeStyle, Industry } from '@/types';

// Strapi API 响应的原始接口
export interface StrapiProductAttributes {
  name: string;
  model_code: string;
  description?: string;
  // local_image_path removed
  images?: { data: any[] }; // Strapi v4/v5 media structure
  moq?: string;
  safety_standard?: SafetyStandard;
  additional_certs?: Certification[]; // JSON
  style?: ShoeStyle;
  industries?: Industry[]; // JSON
  materials?: MaterialSpec; // Component
  features?: string[]; // JSON
  is_hot?: boolean;
  is_new?: boolean;
  price_range?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StrapiProduct {
  id: number;
  documentId: string;
  // Strapi v5 可能会直接把 attributes 展平，也可能不会。我们这里兼容两种情况。
  // 但目前 fetchProducts 返回的是 data: [...]，每个 item 是 { id, documentId, ...attributes }
  name?: string; 
  // ... 其他属性如果展平
  // 或者
  attributes?: StrapiProductAttributes;
  // 直接定义展平的属性更安全，因为我们会在 fetch 时 populate=*
  model_code?: string;
  // local_image_path removed
  description?: string;
  images?: any;
  moq?: string;
  safety_standard?: SafetyStandard;
  additional_certs?: Certification[];
  style?: ShoeStyle;
  industries?: Industry[];
  materials?: MaterialSpec;
  features?: string[];
  is_hot?: boolean;
  is_new?: boolean;
}

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// ... (News related interfaces kept as is) ...

export interface StrapiNews {
  id: number;
  documentId: string;
  title: string;
  excerpt: string;
  content: string;
  image?: any;
  date: string;
  author: string;
  category: string;
  publishedAt?: string;
  media_type?: 'Article' | 'Video';
  video_url?: string;
}

/**
 * 获取最新的 3 条新闻
 */
export async function fetchLatestNews(): Promise<StrapiNews[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/factory-updates?populate=*&sort=date:desc&pagination[limit]=3`,
      { cache: 'no-store' }
    );

    if (!response.ok) return [];
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

/**
 * 获取单条新闻详情
 */
export async function fetchNewsItem(documentId: string): Promise<StrapiNews | null> {
  try {
    const url = `${STRAPI_URL}/api/factory-updates/${documentId}?populate=*`;
    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) return null;
    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching news item:', error);
    return null;
  }
}

/**
 * 转换新闻数据格式
 */
export function transformNews(item: StrapiNews) {
  if (!item) return null;

  let imageUrl = 'https://images.unsplash.com/photo-1565514020176-db792f4b6d96?auto=format&fit=crop&q=80';
  
  const imgData = item.image;
  if (imgData) {
     if (Array.isArray(imgData) && imgData.length > 0) {
        const url = imgData[0].url;
        imageUrl = url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
     } 
     else if (imgData.url) {
        const url = imgData.url;
        imageUrl = url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
     }
  }

  return {
    id: item.documentId,
    title: item.title || 'Untitled News',
    excerpt: item.excerpt || '',
    content: item.content || '',
    date: item.date || new Date().toISOString().split('T')[0],
    author: item.author || 'Admin',
    category: item.category || 'News',
    image: imageUrl,
    media_type: item.media_type || 'Article',
    video_url: item.video_url || '',
  };
}

/**
 * 提交询盘
 */
export async function submitInquiry(data: {
  name: string;
  email: string;
  company?: string;
  message: string;
  product_name?: string;
}) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: data }),
    });
    return response.ok;
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return false;
  }
}

/**
 * 从 Strapi 获取所有产品
 * @param locale 前端 locale（'en', 'zh'）
 */
export async function fetchProducts(locale: string = 'en'): Promise<StrapiProduct[]> {
  try {
    // 直接使用前端的 locale，因为后端现在使用 'zh' 而不是 'zh-Hant'
    const response = await fetch(
      `${STRAPI_URL}/api/products?populate=*&sort=createdAt:desc&locale=${locale}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      console.error('Failed to fetch products:', response.statusText);
      return [];
    }

    const data: StrapiResponse<StrapiProduct> = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * 转换 Strapi 产品格式为前端使用的格式 (New Schema)
 */
export function transformProduct(product: StrapiProduct): Product {
  // 安全检查
  if (!product) {
    // Return dummy valid product to avoid crashes
    return {
      id: 0,
      name: 'Error Loading',
      slug: 'error',
      safety_standard: 'SB',
      image: '/images/products/placeholder.jpg',
    } as Product;
  }

  // 1. 处理图片
  // 优先级: images (API) > placeholder
  let mainImage = '/images/products/placeholder.jpg';
  let gallery: string[] = [];

  // A. 优先解析 Strapi Media (用户在后台手动上传的图片)
  const rawImages = product.images;
  if (Array.isArray(rawImages) && rawImages.length > 0) {
    gallery = rawImages.map((img: any) => {
      const url = img.url || '';
      return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
    });
    if (gallery.length > 0) mainImage = gallery[0];
  } 


  // 2. 构建符合 TypeScript 接口的 Product 对象
  return {
    id: product.id,
    documentId: product.documentId,
    name: product.name || 'Untitled Product',
    slug: (product.model_code || `prod-${product.id}`).toLowerCase().replace(/\s+/g, '-'),
    model_code: product.model_code,
    description: product.description || '',
    
    // 核心结构化字段
    safety_standard: product.safety_standard,
    additional_certs: product.additional_certs || [],
    style: product.style,
    industries: product.industries || [],
    
    materials: product.materials || {},
    
    // 业务字段
    moq: product.moq || '500 Pairs',
    features: product.features || [],
    
    // 图片
    image: mainImage,
    images: gallery,
    
    // 元数据
    featured: product.is_hot || false,
    is_new: product.is_new || false,
  };
}
