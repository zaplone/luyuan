import { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { ProductCategories } from '@/components/ProductCategories';
import { CompanyCapabilities } from '@/components/CompanyCapabilities';
import { FAQAndContact } from '@/components/FAQAndContact';
import { FactoryNews } from '@/components/FactoryNews';
import { fetchProducts, transformProduct, fetchLatestNews, transformNews } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'SafeStep Industrial Footwear - Professional Safety Shoes',
  description: 'Professional safety footwear for industrial workers. Steel toe boots, composite toe shoes, slip-resistant boots, and winter safety boots. OEM manufacturing available.',
  openGraph: {
    title: 'SafeStep Industrial Footwear - Professional Safety Shoes',
    description: 'Professional safety footwear for industrial workers. Steel toe boots, composite toe shoes, slip-resistant boots, and winter safety boots. OEM manufacturing available.',
    images: ['/images/og-image.jpg'],
  },
};

// 首页使用静态生成（SSG）- 构建时获取数据，用户访问时已经是静态 HTML，速度最快
export const revalidate = 3600; // 每 1 小时重新生成一次（可选，如果不需要实时更新可以设为 false）

export default async function HomePage() {
  // 1. 获取产品数据
  let featuredProducts: any[] | undefined = undefined;
  try {
    const strapiProducts = await fetchProducts();
    if (strapiProducts.length > 0) {
      const transformed = strapiProducts
        .map(transformProduct)
        .filter(p => p.is_hot || p.is_new)
        .slice(0, 9);
      
      featuredProducts = transformed.length > 0 
        ? transformed 
        : strapiProducts.slice(0, 6).map(transformProduct);
    }
  } catch (error) {
    console.error('Failed to fetch products for homepage:', error);
  }

  // 2. 获取新闻数据
  let latestNews: any[] = [];
  try {
    const newsData = await fetchLatestNews();
    if (newsData.length > 0) {
      latestNews = newsData.map(transformNews).filter(Boolean);
    }
  } catch (error) {
    console.error('Failed to fetch news:', error);
  }

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Company Capabilities */}
      <CompanyCapabilities />

      {/* Safety Shoe Categories - 传入预加载的产品数据（如果 API 成功） */}
      <ProductCategories initialProducts={featuredProducts} />

      {/* Factory News - 传入真实新闻数据 */}
      <FactoryNews initialNews={latestNews} />

      {/* FAQ and Contact Form */}
      <FAQAndContact />
    </>
  );
}
