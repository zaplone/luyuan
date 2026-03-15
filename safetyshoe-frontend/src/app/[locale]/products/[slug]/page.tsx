import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchProducts, transformProduct } from '@/lib/strapi';
import { ProductDetailClient } from '@/components/ProductDetailClient';
import { locales } from '@/locales';
import type { Product } from '@/types';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// --- 必须：output: 'export' 要求此页导出 generateStaticParams（不能从其他文件 re-export，否则 dev 会报错）---
export async function generateStaticParams(): Promise<{ locale: string; slug: string }[]> {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    try {
      const products = await fetchProducts(locale);
      for (const product of products) {
        const transformed = transformProduct(product);
        if (transformed?.slug) params.push({ locale, slug: transformed.slug });
      }
    } catch (e) {
      console.error(`generateStaticParams ${locale}:`, e);
    }
  }
  if (params.length === 0) return [{ locale: locales[0], slug: 'demo' }];
  return params;
}

export const dynamicParams = false;

// --- 占位产品（API 无数据或 slug=demo 时使用）---
function getDemoProduct(_locale: string): Product {
  return {
    id: 0,
    name: 'S1 Safety Work Shoe (Demo)',
    slug: 'demo',
    model_code: 'LY-DEMO',
    description: '',
    safety_standard: 'S1',
    industries: ['Construction', 'Logistics', 'Oil & Gas'],
    materials: {
      upper: 'Buffalo leather / Synthetic',
      toe_cap: 'Steel',
      midsole: 'Steel Plate',
      outsole: 'Dual density PU',
      lining: 'Textile / Mesh',
    },
    moq: '500 Pairs',
    features: ['Steel toe', 'Slip resistant', 'Oil resistant'],
    image: undefined,
    images: [],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const products = await fetchProducts(locale);
    const rawProduct = products.find((p) => transformProduct(p).slug === slug);
    const product = rawProduct ? transformProduct(rawProduct) : slug === 'demo' ? getDemoProduct(locale) : null;
    if (!product) return {};
    const title = `${product.name} - ${product.safety_standard || 'Safety Shoes'} | Shenglei`;
    const description = product.description?.slice(0, 160) || `Professional ${product.safety_standard} safety shoes.`;
    return { title, description, openGraph: { title, description, images: product.image ? [product.image] : [] } };
  } catch {
    if (slug === 'demo') return { title: `${getDemoProduct(locale).name} | Shenglei`, description: 'Demo product page.' };
    return {};
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  let product: Product;
  try {
    const products = await fetchProducts(locale);
    const rawProduct = products.find((p) => transformProduct(p).slug === slug);
    if (rawProduct) product = transformProduct(rawProduct);
    else if (slug === 'demo') product = getDemoProduct(locale);
    else notFound();
  } catch {
    if (slug === 'demo') product = getDemoProduct(locale);
    else notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images?.length ? product.images : product.image,
    description: product.description,
    sku: product.model_code,
    brand: { '@type': 'Brand', name: 'Shenglei' },
    manufacturer: { '@type': 'Organization', name: 'Shenglei Safety Shoes Factory' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: '0',
      availability: 'https://schema.org/InStock',
      url: `https://slsafetyshoes.com/${locale}/products/${slug}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetailClient product={product} locale={locale} />
    </>
  );
}
