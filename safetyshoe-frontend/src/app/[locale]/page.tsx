import { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { ProductCategories } from '@/components/ProductCategories';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { FAQAndContact } from '@/components/FAQAndContact';
import { FactoryNews } from '@/components/FactoryNews';
import { fetchProducts, transformProduct, fetchLatestNews, transformNews } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Shenglei Safety Shoes - Your Trusted Partner for Safety Footwear',
  description: 'Shenglei Safety Shoes: Professional manufacturer of labor protection shoes since 1990. 8 production lines, 2M pairs annual output. OEM/ODM available.',
  openGraph: {
    title: 'Shenglei Safety Shoes - Your Trusted Partner for Safety Footwear',
    description: 'Shenglei Safety Shoes: Professional manufacturer of labor protection shoes since 1990. 8 production lines, 2M pairs annual output. OEM/ODM available.',
    images: ['/images/og-image.jpg'],
  },
};

type HomePageProps = { params: Promise<{ locale: string }> };

// 强制生成静态路径
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  console.log('>>> Generating HomePage for locale:', locale);


  // 1. 获取产品数据（按当前语言）
  let featuredProducts: any[] | undefined = undefined;
  try {
    const strapiProducts = await fetchProducts(locale);
    if (strapiProducts.length > 0) {
      const transformed = strapiProducts
        .map(transformProduct)
        .sort((a, b) => {
          // 排序权重：Hot > New > 普通
          // 如果 a 是 Hot (10分)，b 不是 (0分) -> b-a = -10 -> a 排前面
          const scoreA = (a.featured ? 10 : 0) + (a.is_new ? 5 : 0); // 注意：transformProduct 把 is_hot 映射为了 featured
          const scoreB = (b.featured ? 10 : 0) + (b.is_new ? 5 : 0);
          return scoreB - scoreA;
        })
        .slice(0, 6); // 始终取前 6 个最优质的产品
      
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

      {/* Why Choose Us (Replaces CompanyCapabilities) */}
      <WhyChooseUs />

      {/* Safety Shoe Categories - 传入预加载的产品数据（如果 API 成功） */}
      <ProductCategories initialProducts={featuredProducts} hideFilters={true} />

      {/* Factory News - 传入真实新闻数据 */}
      <FactoryNews initialNews={latestNews} />

      {/* FAQ and Contact Form */}
      <FAQAndContact />
    </>
  );
}