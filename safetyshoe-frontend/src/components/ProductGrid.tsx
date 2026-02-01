'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { LayoutGrid, List, ArrowUpDown, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { ProductQuickView } from './ProductQuickView';
import { fetchProducts, transformProduct } from '@/lib/strapi';

interface ProductGridProps {
  locale?: string;
  viewMode?: 'grid' | 'list';
  filters?: Record<string, string[]>;
  searchQuery?: string | null;
}

export function ProductGrid({ locale = 'en', viewMode: initialViewMode, filters = {}, searchQuery = '' }: ProductGridProps) {
  const t = useTranslations('ProductGrid');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(initialViewMode || 'grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  
  // Data State
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Quick View State
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reset pagination when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchQuery]);

  const ITEMS_PER_PAGE = 12;

  // Load products from API (with locale for i18n content from Strapi)
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const strapiProducts = await fetchProducts(locale);
        if (strapiProducts && strapiProducts.length > 0) {
          const transformed = strapiProducts.map(transformProduct);
          setProducts(transformed);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Failed to load products:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [locale]);

  // 筛选值 → Strapi 数据对应（与数据库/API 一致）
  const normalizeIndustry = (s: string) =>
    s.toLowerCase().replace(/\s+/g, '').replace(/&/g, '');
  const filterStandardToEnum: Record<string, string> = {
    sb: 'SB', sbp: 'S1P', s1: 'S1', s1p: 'S1P', s2: 'S2', s3: 'S3', ob: 'OB',
  };
  const filterFeatureToCertsAndKeywords: Record<string, { certs?: string[]; keywords: string[] }> = {
    'waterproof': { certs: ['WR'], keywords: ['waterproof', 'water resistant', 'water-resistant'] },
    'slip-resistant': { certs: ['SRC'], keywords: ['slip', 'slip resistant', 'slip-resistant'] },
    'metal-free': { keywords: ['metal free', 'metal-free', 'composite toe', 'non-metal'] },
    'esd': { certs: ['ESD'], keywords: ['antistatic', 'anti-static', 'esd'] },
    'heat-resistant': { certs: ['HRO'], keywords: ['heat', 'heat resistant', 'heat-resistant'] },
    'cold-insulated': { certs: ['CI'], keywords: ['cold', 'insulated', 'insulation', 'ci'] },
    'metatarsal': { certs: ['M', 'HI'], keywords: ['metatarsal', 'metatarsal guard'] },
  };
  const filterMaterialKeywords: Record<string, string[]> = {
    'leather-full': ['full grain', 'full grain leather', 'full leather'],
    'leather-split': ['split leather', 'split grain'],
    'microfiber': ['microfiber', 'micro-fiber'],
    'mesh': ['mesh', 'breathable mesh'],
    'pvc-rubber': ['pvc', 'rubber'],
  };

  const filteredProducts = products.filter(product => {
    // 1. 搜索：名称、描述、行业
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name?.toLowerCase().includes(q);
      const matchDesc = product.description?.toLowerCase().includes(q);
      const matchIndustries = product.industries?.some((ind: unknown) =>
        String(ind ?? '').toLowerCase().includes(q)
      );
      if (!matchName && !matchDesc && !matchIndustries) return false;
    }

    // 2. 侧栏筛选（对应 Strapi 表：industries, safety_standard, features, additional_certs, materials）
    for (const [key, values] of Object.entries(filters)) {
      if (!values || values.length === 0) continue;

      if (key === 'category') {
        // 对应 product.industries (JSON 数组，如 ["Construction", "Mining"])
        const productIndustryNorm = (product.industries || []).map((ind: unknown) =>
          normalizeIndustry(String(ind))
        );
        const hasMatch = values.some((v: string) => {
          const vNorm = normalizeIndustry(v.replace(/-/g, ''));
          return productIndustryNorm.some((p: string) => p.includes(vNorm) || vNorm.includes(p));
        });
        if (!hasMatch) return false;
      }

      if (key === 'standard') {
        // 对应 product.safety_standard (枚举: SB, S1, S1P, S2, S3, OB)
        const hasMatch = values.some(v => {
          const enumVal = filterStandardToEnum[v] || v.toUpperCase();
          return product.safety_standard === enumVal;
        });
        if (!hasMatch) return false;
      }

      if (key === 'feature') {
        // 对应 product.features (字符串数组) + product.additional_certs (如 WR, SRC)
        const certs = (product.additional_certs || []) as string[];
        const featStrs = (product.features || []).map((f: string) => f.toLowerCase());
        const hasMatch = values.some((v: string) => {
          const map = filterFeatureToCertsAndKeywords[v];
          if (!map) return featStrs.some((f: string) => f.includes(v.replace(/-/g, ' ')));
          if (map.certs?.some(c => certs.includes(c))) return true;
          return map.keywords.some(kw => featStrs.some((f: string) => f.includes(kw)));
        });
        if (!hasMatch) return false;
      }

      if (key === 'material') {
        // 对应 product.materials (component: upper, outsole, toe_cap, midsole, lining)
        const matStr = JSON.stringify(product.materials || {}).toLowerCase();
        const hasMatch = values.some(v => {
          const keywords = filterMaterialKeywords[v] || [v.replace(/-/g, ' ')];
          return keywords.some(kw => matStr.includes(kw));
        });
        if (!hasMatch) return false;
      }
    }

    return true;
  });

  const parsePrice = (p?: string) => {
    if (!p) return 0;
    const n = parseInt(String(p).replace(/\D/g, ''), 10);
    return isNaN(n) ? 0 : n;
  };
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.id - a.id;
      case 'price-low':
        return parsePrice(a.price_range) - parsePrice(b.price_range);
      case 'price-high':
        return parsePrice(b.price_range) - parsePrice(a.price_range);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleQuickView = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex-1 py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
        <p className="text-slate-500">{t('loading')}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex-1 py-20 text-center bg-white rounded-xl border border-dashed border-slate-300">
        <div className="text-4xl mb-4">📦</div>
        <h3 className="text-lg font-bold text-slate-900">{t('noProducts')}</h3>
        <p className="text-slate-500">{t('noProductsDesc')}</p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      
      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-500 font-medium">
          {t('showing', {
            from: (currentPage - 1) * ITEMS_PER_PAGE + 1,
            to: Math.min(currentPage * ITEMS_PER_PAGE, sortedProducts.length),
            total: sortedProducts.length,
          })}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 hidden sm:inline">{t('sortBy')}</span>
            <div className="relative">
              <select 
                className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg pl-3 pr-8 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">{t('newest')}</option>
                <option value="price-low">{t('priceLow')}</option>
                <option value="price-high">{t('priceHigh')}</option>
              </select>
              <ArrowUpDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'grid' ? 'bg-white shadow-sm text-primary-600' : 'text-slate-400 hover:text-slate-600'
              }`}
              title={t('gridView')}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'list' ? 'bg-white shadow-sm text-primary-600' : 'text-slate-400 hover:text-slate-600'
              }`}
              title={t('listView')}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => handleQuickView(product)}
            >
              <div className="relative h-64 bg-slate-100 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.is_new && <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">NEW</span>}
                  {product.is_hot && <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">HOT</span>}
                </div>

                {/* Hover Action */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <button className="bg-white text-slate-900 font-bold px-4 py-2 rounded-lg shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {t('quickView')}
                  </button>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded capitalize">
                    {product.industries?.[0] ?? ''}
                  </span>
                  {product.safety_standard && (
                    <span className="text-xs font-bold text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded">
                      {product.safety_standard}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2 truncate group-hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>MOQ: <strong className="text-slate-700">{product.moq}</strong></span>
                  {product.price_range ? <span>Est. {product.price_range}</span> : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {currentProducts.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all flex flex-col sm:flex-row cursor-pointer"
              onClick={() => handleQuickView(product)}
            >
              <div className="relative w-full sm:w-48 h-48 sm:h-auto bg-slate-100 flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col justify-center flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded capitalize">
                    {product.industries?.[0] ?? ''}
                  </span>
                  {product.safety_standard && (
                    <span className="text-xs font-bold text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded">
                      {product.safety_standard}
                    </span>
                  )}
                  {product.is_new && <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded">NEW</span>}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center gap-4 text-sm mt-auto">
                  <div className="flex items-center gap-1 text-slate-500">
                    <span className="font-semibold text-slate-900">MOQ:</span> {product.moq}
                  </div>
                  <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <span className="font-semibold text-slate-900">Price:</span> {product.price_range ?? '—'}
                  </div>
                </div>
              </div>
              <div className="p-6 border-t sm:border-t-0 sm:border-l border-slate-100 flex items-center justify-center bg-slate-50 sm:w-40 flex-shrink-0">
                <button className="w-full sm:w-auto bg-white border border-slate-200 hover:border-primary-500 hover:text-primary-600 text-slate-700 font-bold py-2 px-4 rounded-lg transition-all shadow-sm text-sm">
                  {t('viewDetails')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title={t('prev')}
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                currentPage === i + 1
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title={t('next')}
          >
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      )}

      {/* Quick View Modal */}
      <ProductQuickView 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
