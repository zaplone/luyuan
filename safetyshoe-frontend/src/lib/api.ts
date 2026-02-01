import { 
  Product, 
  Category, 
  Inquiry, 
  ProductsResponse, 
  CategoriesResponse, 
  CategoryResponse,
  InquiryResponse,
  InquiryStats,
  SearchParams,
  ApiResponse 
} from '@/types';

// API基础URL
const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.NEXT_PUBLIC_API_URL || 'https://dtwz.zhiyuansafety.com';

// 通用API请求函数
async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

// 产品相关API
export const productsApi = {
  // 获取产品列表
  async getProducts(params: SearchParams = {}): Promise<ProductsResponse> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    });
    
    const queryString = searchParams.toString();
    const endpoint = `/api/products${queryString ? `?${queryString}` : ''}`;
    
    // 使用缓存API请求
    return cachedApiRequest<ProductsResponse>(endpoint, {}, 5 * 60 * 1000); // 5分钟缓存
  },

  // 获取单个产品
  async getProduct(slug: string): Promise<Product> {
    return apiRequest<Product>(`/api/products/${slug}`);
  },

  // 按分类获取产品
  async getProductsByCategory(categorySlug: string): Promise<ProductsResponse> {
    return this.getProducts({ category: categorySlug, limit: 20 });
  },

  // 检查slug可用性
  async checkSlug(slug: string, exclude?: number): Promise<{ available: boolean; slug: string }> {
    const params = new URLSearchParams();
    if (exclude) params.append('exclude', String(exclude));
    
    const queryString = params.toString();
    const endpoint = `/api/products/slug/${slug}${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest<{ available: boolean; slug: string }>(endpoint);
  },
};

// 分类相关API
export const categoriesApi = {
  // 获取所有分类
  async getCategories(includeProducts = false): Promise<Category[]> {
    const params = includeProducts ? '?include_products=true' : '';
    const response = await cachedApiRequest<{categories: Category[]}>(`/api/categories${params}`, {}, 10 * 60 * 1000); // 10分钟缓存
    return response.categories;
  },

  // 获取单个分类及其产品
  async getCategory(slug: string, params: SearchParams = {}): Promise<CategoryResponse> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    });
    
    const queryString = searchParams.toString();
    const endpoint = `/api/categories/${slug}${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest<CategoryResponse>(endpoint);
  },
};

// 询盘相关API
export const inquiriesApi = {
  // 提交询盘
  async submitInquiry(data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    country?: string;
    product_id?: number;
    product_name?: string;
    message: string;
    quantity?: number;
    target_price?: number;
  }): Promise<InquiryResponse> {
    return apiRequest<InquiryResponse>('/api/inquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // 获取询盘统计（管理后台用）
  async getStats(): Promise<InquiryStats> {
    return apiRequest<InquiryStats>('/api/inquiries/stats');
  },
};

// 认证相关API
export const authApi = {
  // 登录
  async login(username: string, password: string): Promise<{
    success: boolean;
    token?: string;
    user?: {
      id: number;
      username: string;
      email: string;
      role: string;
    };
    error?: string;
  }> {
    return apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  // 登出
  async logout(): Promise<{ success: boolean; message: string }> {
    return apiRequest('/api/auth/logout', {
      method: 'POST',
    });
  },

  // 获取当前用户信息
  async getMe(token: string): Promise<{
    user: {
      id: number;
      username: string;
      email: string;
      role: string;
      is_active: boolean;
      created_at: string;
      updated_at: string;
    };
  }> {
    return apiRequest('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // 验证token
  async verifyToken(token: string): Promise<{
    valid: boolean;
    user?: {
      id: number;
      username: string;
      role: string;
    };
  }> {
    return apiRequest('/api/auth/verify-token', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

// 管理后台API
export const adminApi = {
  // 获取仪表盘数据
  async getDashboard(token: string): Promise<{
    stats: {
      total_products: number;
      draft_products: number;
      total_categories: number;
      pending_inquiries: number;
      today_inquiries: number;
      week_inquiries: number;
      month_inquiries: number;
    };
    recent_products: Product[];
    recent_inquiries: Inquiry[];
  }> {
    return apiRequest('/api/admin/dashboard', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // 获取产品列表（管理后台）
  async getProducts(token: string, params: SearchParams = {}): Promise<ProductsResponse> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    });
    
    const queryString = searchParams.toString();
    const endpoint = `/api/admin/products${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest<ProductsResponse>(endpoint, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // 创建产品
  async createProduct(token: string, data: Partial<Product>): Promise<{
    success: boolean;
    product: Product;
  }> {
    return apiRequest('/api/admin/products', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  },

  // 更新产品
  async updateProduct(token: string, id: number, data: Partial<Product>): Promise<{
    success: boolean;
    product: Product;
  }> {
    return apiRequest(`/api/admin/products/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  },

  // 删除产品
  async deleteProduct(token: string, id: number): Promise<{
    success: boolean;
    message: string;
  }> {
    return apiRequest(`/api/admin/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // 获取分类列表（管理后台）
  async getCategories(token: string): Promise<Category[]> {
    return apiRequest<Category[]>('/api/admin/categories', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // 创建分类
  async createCategory(token: string, data: Partial<Category>): Promise<{
    success: boolean;
    category: Category;
  }> {
    return apiRequest('/api/admin/categories', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  },
};

// 健康检查
export const healthApi = {
  async check(): Promise<{
    status: string;
    timestamp: string;
    environment: string;
  }> {
    return apiRequest('/health');
  },
};

// 错误处理工具函数
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}

// 请求重试函数
export async function retryRequest<T>(
  requestFn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError!;
}

// 缓存工具（简单内存缓存）
const cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

export function getCachedData<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < cached.ttl) {
    return cached.data;
  }
  cache.delete(key);
  return null;
}

export function setCachedData<T>(key: string, data: T, ttl = 5 * 60 * 1000): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  });
}

// 带缓存的API请求
export async function cachedApiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  ttl = 5 * 60 * 1000
): Promise<T> {
  const cacheKey = `${endpoint}_${JSON.stringify(options)}`;
  const cached = getCachedData<T>(cacheKey);
  
  if (cached) {
    return cached;
  }
  
  const data = await apiRequest<T>(endpoint, options);
  setCachedData(cacheKey, data, ttl);
  return data;
}
