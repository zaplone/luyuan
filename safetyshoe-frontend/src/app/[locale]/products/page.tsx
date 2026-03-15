import { Suspense } from 'react';
import ProductsPageClient from '@/components/ProductsPageClient';
import { fetchProducts, transformProduct } from '@/lib/strapi';

interface Props {
  params: {
    locale: string;
  };
}

export default async function ProductsPage({ params: { locale } }: Props) {
  // 1. 在构建时获取所有产品数据
  // 注意：因为这是服务端组件，在 'next build' 期间会执行，
  // 从而将数据静态地“烘焙”到 HTML 中。
  const strapiProducts = await fetchProducts(locale);
  const products = strapiProducts.map(transformProduct);

  // 2. 将数据传递给客户端组件
  // 客户端组件会立即渲染这些数据，实现秒开和 SEO 友好。
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 pt-20"><div className="container mx-auto px-4 py-20 text-center">Loading...</div></div>}>
      <ProductsPageClient initialProducts={products} locale={locale} />
    </Suspense>
  );
}
