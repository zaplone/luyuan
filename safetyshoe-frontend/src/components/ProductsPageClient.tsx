'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ProductFilterSidebar } from '@/components/ProductFilterSidebar';
import { ProductGrid } from '@/components/ProductGrid';
import { Filter, ChevronRight, Home, X } from 'lucide-react';
import Link from 'next/link';

interface ProductsPageClientProps {
  initialProducts: any[];
  locale: string;
}

export default function ProductsPageClient({ initialProducts, locale }: ProductsPageClientProps) {
  const t = useTranslations('ProductsPage');
  const tNav = useTranslations('Navigation');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search');

  const handleFilterChange = (groupId: string, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[groupId] || [];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      
      return { ...prev, [groupId]: updated };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center text-sm text-slate-500 mb-4">
            <Link href={`/${locale}`} className="hover:text-primary-600 flex items-center transition-colors">
              <Home className="w-4 h-4 mr-1" />
              {tNav('home')}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-slate-900 font-medium">{t('breadcrumbProducts')}</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('title')}</h1>
              <p className="text-slate-600 max-w-2xl">
                {t('description')}
              </p>
              
              {/* Show active search query */}
              {searchQuery && (
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <span className="text-slate-500">{t('searchResultsFor')}</span>
                  <span className="font-bold text-slate-900 bg-yellow-100 px-2 py-0.5 rounded">"{searchQuery}"</span>
                  <Link href={`/${locale}/products`} className="text-primary-600 hover:underline flex items-center text-xs ml-2">
                    <X className="w-3 h-3 mr-1" />
                    {t('clearSearch')}
                  </Link>
                </div>
              )}
            </div>
            
            {/* Mobile Filter Toggle - 暂时隐藏专业筛选 */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* 左侧专业筛选 Sidebar 暂时隐藏，仅保留主内容和排序 */}

          {/* Main Content */}
          <main className="flex-1">
            <ProductGrid 
              products={initialProducts}
              locale={locale} 
              filters={selectedFilters} 
              searchQuery={searchQuery} 
            />
          </main>

        </div>
      </div>
    </div>
  );
}
