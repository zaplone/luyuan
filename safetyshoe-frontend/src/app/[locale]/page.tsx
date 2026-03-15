import { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { ProductCategories } from '@/components/ProductCategories';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { FAQAndContact } from '@/components/FAQAndContact';
import { FactoryNews } from '@/components/FactoryNews';
import { locales } from '@/locales';
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

// 强制生成静态路径（与 i18n.locales 一致）
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  console.log('>>> Generating HomePage for locale:', locale);


  // 1. 首页产品：就这一条接口，带上数量，拉一次。前 6 条给上面卡片，整批给下面画廊
  const HOMEPAGE_PRODUCT_LIMIT = 30; // 接口里改数量即可，上面 6 条 + 画廊用
  let featuredProducts: any[] | undefined = undefined;
  let galleryProducts: any[] = [];
  try {
    const strapiProducts = await fetchProducts(locale, { limit: HOMEPAGE_PRODUCT_LIMIT });
    if (strapiProducts.length > 0) {
      const transformed = strapiProducts
        .map(transformProduct)
        .sort((a, b) => {
          const scoreA = (a.featured ? 10 : 0) + (a.is_new ? 5 : 0);
          const scoreB = (b.featured ? 10 : 0) + (b.is_new ? 5 : 0);
          return scoreB - scoreA;
        });
      featuredProducts = transformed.slice(0, 6);           // 上面 6 张卡片
      galleryProducts = transformed;                         // 下面画廊用同一批（最多 30 条）
    }
  } catch (error) {
    console.error('Failed to fetch products for homepage:', error);
  }

  // 2. 获取新闻数据（首页只展示最新 4 条）
  let latestNews: any[] = [];
  try {
    const newsData = await fetchLatestNews();
    if (newsData.length > 0) {
      latestNews = newsData.map(transformNews).filter(Boolean).slice(0, 4);
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
      <ProductCategories initialProducts={featuredProducts} initialGalleryProducts={galleryProducts} hideFilters={true} />

      {/* Factory News - 传入真实新闻数据 */}
      <FactoryNews initialNews={latestNews} />

      {/* FAQ and Contact Form */}
      <FAQAndContact />
    </>
  );
}