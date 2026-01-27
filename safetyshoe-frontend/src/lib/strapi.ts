// Strapi API 配置
// 服务端和客户端都能使用
const STRAPI_URL = 
  typeof window !== 'undefined' 
    ? (process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337')
    : (process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337');

// Strapi v5 响应结构（扁平化）
export interface StrapiProduct {
  id: number;
  documentId: string;
  name: string;
  sku?: string;
  description?: string;
  // 图片字段在 v5 中可能直接是数组或对象，取决于 populate
  images?: any[]; 
  moq: number;
  category?: string;
  standards?: string[];
  features?: string[];
  price_range?: string;
  is_hot?: boolean;
  is_new?: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  style?: string; // 新增款式
  materials?: { // 新增材质
    upper?: string;
    outsole?: string;
    lining?: string;
    [key: string]: any;
  };
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
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      return [];
    }

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
  console.log(`[Strapi] Fetching news item documentId: ${documentId}`);
  try {
    const url = `${STRAPI_URL}/api/factory-updates/${documentId}?populate=*`;
    console.log(`[Strapi] Request URL: ${url}`);
    
    const response = await fetch(url, {
      cache: 'no-store',
    });

    console.log(`[Strapi] Response status: ${response.status}`);

    if (!response.ok) {
      console.error(`[Strapi] Failed to fetch news item ${documentId}: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    console.log(`[Strapi] Data received:`, data);
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

  // 处理图片
  let imageUrl = 'https://images.unsplash.com/photo-1565514020176-db792f4b6d96?auto=format&fit=crop&q=80'; // 默认图
  
  // 尝试解析 Strapi 图片
  const imgData = item.image;
  if (imgData) {
     // 如果是数组
     if (Array.isArray(imgData) && imgData.length > 0) {
        const url = imgData[0].url;
        imageUrl = url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
     } 
     // 如果是对象
     else if (imgData.url) {
        const url = imgData.url;
        imageUrl = url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
     }
  }

  return {
    id: item.documentId, // 使用 documentId 而不是 id
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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: data
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return false;
  }
}

/**
 * 从 Strapi 获取所有产品
 */
export async function fetchProducts(): Promise<StrapiProduct[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/products?populate=*&sort=createdAt:desc`,
      {
        cache: 'no-store', // 开发时总是获取最新数据
      }
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
 * 从 Strapi 获取单个产品
 */
export async function fetchProduct(id: number): Promise<StrapiProduct | null> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/products/${id}?populate=*`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      return null;
    }

    const data: { data: StrapiProduct } = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

/**
 * 转换 Strapi 产品格式为前端使用的格式
 */
export function transformProduct(product: StrapiProduct) {
  // 安全检查
  if (!product) {
    return {
      id: 0,
      name: 'Unknown Product',
      sku: '',
      category: 'construction',
      image: '/images/products/placeholder.jpg',
      images: [],
      features: [],
      moq: '500 Pairs',
      standards: [],
      description: '',
      price_range: 'Contact for price',
      is_hot: false,
      is_new: false,
      style: 'Low Cut',
      materials: {},
    };
  }

  // 处理图片：Strapi 5 返回的图片通常直接是数组（如果 populate=*）
  // 或者是 { url: ... } 对象
  let images: string[] = [];
  let mainImage = '/images/products/placeholder.jpg';

  // 尝试解析图片
  // 这里的逻辑需要兼容可能的数据结构
  const rawImages = product.images;
  
  if (Array.isArray(rawImages) && rawImages.length > 0) {
    images = rawImages.map((img: any) => {
      // 检查 url 是否已经是完整的（有些云存储插件会返回完整 URL）
      const url = img.url || '';
      return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
    });
    if (images.length > 0) {
      mainImage = images[0];
    }
  }

  return {
    id: product.id,
    name: product.name || 'Untitled Product',
    sku: product.sku || `PROD-${product.id}`,
    category: (product.category || 'construction').toLowerCase(),
    image: mainImage,
    images: images,
    features: product.features || [],
    moq: `${product.moq || 500} Pairs`,
    standards: product.standards || [],
    description: product.description || '',
    price_range: product.price_range || 'Contact for price',
    is_hot: product.is_hot || false,
    is_new: product.is_new || false,
    style: product.style || 'Low Cut',
    materials: product.materials || {},
  };
}
