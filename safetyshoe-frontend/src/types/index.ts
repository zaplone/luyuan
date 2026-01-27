// 产品类型定义
export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  weight?: number;
  material?: string;
  toe_type?: string;
  slip_resistance: boolean;
  electrical_hazard: boolean;
  status: 'draft' | 'active' | 'archived';
  featured: boolean;
  view_count: number;
  category_id?: number;
  is_category_cover?: boolean;
  sort_order?: number;
  specs?: {
    sole?: string;
    certification?: string;
    material?: string;
    weight?: string;
  };
  features?: string[];
  applications?: string[];
  show_in_category?: boolean;
  category_sort_order?: number;
  created_at: string;
  updated_at: string;
  primary_image?: string;
  images?: ProductImage[];
  categories?: Category[];
  related_products?: Product[];
}

// 产品图片类型
export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  alt_text?: string;
  sort_order: number;
  is_primary: boolean;
  created_at: string;
}

// 分类类型定义
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent_id?: number;
  sort_order: number;
  is_active: boolean;
  seo_title?: string;
  seo_description?: string;
  created_at: string;
  updated_at: string;
  product_count?: number;
  parent_name?: string;
  products?: Product[];
}

// 询盘类型定义
export interface Inquiry {
  id: number;
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
  status: 'pending' | 'replied' | 'closed' | 'spam';
  admin_notes?: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  updated_at: string;
  product_full_name?: string;
  product_slug?: string;
}

// 分页类型定义
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// API响应类型定义
export interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  error?: string;
  details?: string;
  pagination?: Pagination;
}

// 产品列表响应
export interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
}

// 分类响应
export interface CategoriesResponse {
  categories: Category[];
}

// 单个分类响应
export interface CategoryResponse {
  category: Category;
  products: Product[];
  pagination: Pagination;
}

// 询盘提交响应
export interface InquiryResponse {
  success: boolean;
  message: string;
  inquiry_id: number;
  created_at: string;
}

// 询盘列表响应
export interface InquiriesResponse {
  inquiries: Inquiry[];
  pagination: Pagination;
}

// 询盘统计响应
export interface InquiryStats {
  total_inquiries: number;
  pending_inquiries: number;
  replied_inquiries: number;
  today_inquiries: number;
  week_inquiries: number;
  month_inquiries: number;
}

// 用户类型定义
export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// 认证响应
export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  error?: string;
}

// 询盘表单数据
export interface InquiryFormData {
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
}

// 搜索参数
export interface SearchParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  status?: string;
  featured?: boolean;
  sort?: string;
  order?: 'asc' | 'desc';
}

// 网站配置类型
export interface SiteConfig {
  site_name: string;
  site_description: string;
  contact_email: string;
  contact_phone: string;
  company_address: string;
  default_currency: string;
  items_per_page: number;
  enable_inquiries: boolean;
}

// SEO元数据类型
export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

// 面包屑导航类型
export interface Breadcrumb {
  name: string;
  href: string;
  current?: boolean;
}

// 导航菜单类型
export interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
}

// 社交媒体链接类型
export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

// 公司信息类型
export interface CompanyInfo {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  social_links: SocialLink[];
}

// 特色服务类型
export interface Service {
  title: string;
  description: string;
  icon: string;
}

// 客户评价类型
export interface Testimonial {
  id: number;
  name: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
  created_at: string;
}

// 常见问题类型
export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category?: string;
  sort_order: number;
}

// 新闻/博客文章类型
export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  author: string;
  published_at: string;
  tags: string[];
  seo_title?: string;
  seo_description?: string;
}

// 联系表单数据
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}

// 邮件订阅类型
export interface NewsletterSubscription {
  email: string;
  name?: string;
  interests?: string[];
}

// 错误类型
export interface AppError {
  message: string;
  code?: string;
  status?: number;
}

// 加载状态类型
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

// 筛选选项类型
export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

// 排序选项类型
export interface SortOption {
  value: string;
  label: string;
  direction: 'asc' | 'desc';
}
