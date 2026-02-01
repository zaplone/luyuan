'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronRight, Shield, Zap, Droplets, Snowflake, HardHat, Factory, Utensils, Hammer, Filter } from 'lucide-react';
import { ProductQuickView } from './ProductQuickView';
import { fetchProducts, transformProduct } from '@/lib/strapi';
import { useTranslations, useLocale } from 'next-intl';
import { Product } from '@/types'; // Import the new type

interface ProductCategoriesProps {
  initialProducts?: any[]; // Keep any[] for compatibility with raw Strapi response for now
  hideFilters?: boolean; // New prop to hide filters on homepage
}

export function ProductCategories({ initialProducts, hideFilters = false }: ProductCategoriesProps = {}) {
  const t = useTranslations('ProductCategories');
  const locale = useLocale();

  // Industry Categories
  const INDUSTRIES = [
    { 
      id: 'Construction', // Updated to match new industry values
      name: t('categories.construction'), 
      icon: HardHat,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80',
      desc: t('categories.construction')
    },
    { 
      id: 'Oil & Gas', 
      name: t('categories.industrial'), 
      icon: Factory,
      image: 'https://images.unsplash.com/photo-1516937941348-c09e554b9631?auto=format&fit=crop&q=80',
      desc: t('categories.industrial')
    },
    { 
      id: 'Food Industry', // Corrected ID to match Seeding Data
      name: t('categories.executive'), 
      icon: Utensils,
      image: 'https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?auto=format&fit=crop&q=80',
      desc: t('categories.executive')
    },
    { 
      id: 'Logistics', 
      name: t('categories.logistics'), 
      icon: Hammer,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
      desc: t('categories.logistics')
    },
  ];

  // Filter Options
  const FILTER_OPTIONS = {
    standard: [
      { value: 'All Standards', label: t('filter.standards.all') },
      { value: 'S3', label: 'S3' },
      { value: 'S1P', label: 'S1P' },
      { value: 'SB', label: 'SB' },
      { value: 'OB', label: 'OB' }
    ],
    feature: [
      { value: 'All Features', label: t('filter.features.all') },
      { value: 'Waterproof', label: t('filter.features.waterproof') }, // Need mapping logic
      { value: 'Metal Free', label: t('filter.features.metalFree') },
      { value: 'Insulated', label: t('filter.features.insulated') },
      { value: 'Slip Resistant', label: t('filter.features.slipResistant') }
    ],
    style: [
      { value: 'All Styles', label: t('filter.styles.all') },
      { value: 'Low Cut', label: t('filter.styles.low') },
      { value: 'Mid Cut', label: t('filter.styles.mid') },
      { value: 'High Boot', label: t('filter.styles.high') }
    ]
  };

  const [activeTab, setActiveTab] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  
  const [products, setProducts] = useState<Product[]>(
    initialProducts ? initialProducts.map(p => p.id ? p : transformProduct(p)) : []
  );
  const [isLoading, setIsLoading] = useState(!initialProducts || initialProducts.length === 0);

  const [filters, setFilters] = useState({
    standard: 'All Standards',
    feature: 'All Features',
    style: 'All Styles'
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data Loading
  useEffect(() => {
    // If we have initial products, we don't need to fetch immediately
    // BUT we should re-fetch if locale changes and we are not relying on parent re-render
    
    // In App Router, page.tsx re-runs on locale change, passing new initialProducts.
    // So we can sync props to state.
    if (initialProducts && initialProducts.length > 0) {
      setProducts(initialProducts.map(p => p.id ? p : transformProduct(p)));
      setIsLoading(false);
      return;
    }

    async function loadData() {
      setIsLoading(true);
      try {
        const strapiProducts = await fetchProducts(locale);
        const transformedProducts = strapiProducts.map(transformProduct);
        setProducts(transformedProducts);
      } catch (error) {
        console.error('Failed to load products:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [locale, initialProducts]); // Add initialProducts dependency

  // Filter Logic (Updated for new Schema)
  const filteredProducts = products.filter(p => {
    // 1. Industry Filter (Active Tab)
    if (activeTab !== 'all') {
      if (!p.industries?.includes(activeTab as any)) return false;
    }
    
    // 2. Standard Filter
    if (filters.standard !== 'All Standards' && p.safety_standard !== filters.standard) return false;

    // 3. Style Filter
    if (filters.style !== 'All Styles' && p.style !== filters.style) return false;

    // 4. Feature Filter (Complex Logic)
    if (filters.feature !== 'All Features') {
       if (filters.feature === 'Waterproof') {
         // Logic: WR cert OR S3 standard OR description keyword
         return p.additional_certs?.includes('WR') || p.safety_standard === 'S3' || p.materials?.upper?.toLowerCase().includes('waterproof');
       }
       if (filters.feature === 'Metal Free') {
         return p.materials?.toe_cap !== 'Steel' && p.materials?.midsole !== 'Steel Plate';
       }
       if (filters.feature === 'Insulated') {
         return p.additional_certs?.includes('CI');
       }
       if (filters.feature === 'Slip Resistant') {
         return p.additional_certs?.includes('SRC');
       }
    }

    return true;
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="py-24 bg-slate-50 relative" id="products">
        {/* ... Background ... */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 bg-white border border-slate-200 text-slate-500 rounded-full text-sm font-semibold mb-4 shadow-sm">
              {t('label')}
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-slate-600">
              {t('subtitle')}
            </p>
          </div>

          {/* Industry Visual Navigation */}
          {!hideFilters && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {INDUSTRIES.map((ind) => (
                <div 
                  key={ind.id}
                  onClick={() => setActiveTab(ind.id)}
                  className={`relative h-40 rounded-xl overflow-hidden cursor-pointer group border-2 transition-all ${
                    activeTab === ind.id ? 'border-primary-600 ring-2 ring-primary-600 ring-offset-2' : 'border-transparent hover:border-slate-300'
                  }`}
                >
                  {ind.image && (ind.image.startsWith('http') || ind.image.startsWith('/')) ? (
                    <Image 
                      src={ind.image} 
                      alt={ind.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                      <ind.icon className="w-12 h-12 text-slate-400" />
                    </div>
                  )}
                  <div className={`absolute inset-0 transition-colors ${
                    activeTab === ind.id ? 'bg-primary-900/80' : 'bg-slate-900/60 group-hover:bg-slate-900/70'
                  }`} />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <ind.icon className={`w-8 h-8 mb-2 ${activeTab === ind.id ? 'text-accent-500' : 'text-white'}`} />
                    <h3 className="text-white font-bold text-lg leading-tight">{ind.name}</h3>
                    <p className="text-white/70 text-xs mt-1 hidden md:block">{ind.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Filter Bar */}
          {!hideFilters && (
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
               <div className="flex items-center gap-2 text-slate-700 font-semibold">
                 <Filter className="w-5 h-5 text-primary-600" />
                 <span>{t('filter.label')}</span>
               </div>
               
               <div className="flex flex-wrap gap-3 flex-1 justify-end">
                 <select 
                   className="form-select bg-slate-50 border-slate-200 rounded-lg text-sm focus:ring-primary-500 focus:border-primary-500 py-2.5 pl-4 pr-10 min-w-[140px]"
                   value={filters.standard}
                   onChange={(e) => setFilters({...filters, standard: e.target.value})}
                 >
                   {FILTER_OPTIONS.standard.map(opt => (
                     <option key={opt.value} value={opt.value}>{opt.label}</option>
                   ))}
                 </select>

                 <select 
                   className="form-select bg-slate-50 border-slate-200 rounded-lg text-sm focus:ring-primary-500 focus:border-primary-500 py-2.5 pl-4 pr-10 min-w-[140px]"
                   value={filters.feature}
                   onChange={(e) => setFilters({...filters, feature: e.target.value})}
                 >
                   {FILTER_OPTIONS.feature.map(opt => (
                     <option key={opt.value} value={opt.value}>{opt.label}</option>
                   ))}
                 </select>

                 <select 
                   className="form-select bg-slate-50 border-slate-200 rounded-lg text-sm focus:ring-primary-500 focus:border-primary-500 py-2.5 pl-4 pr-10 min-w-[140px]"
                   value={filters.style}
                   onChange={(e) => setFilters({...filters, style: e.target.value})}
                 >
                   {FILTER_OPTIONS.style.map(opt => (
                     <option key={opt.value} value={opt.value}>{opt.label}</option>
                   ))}
                 </select>

                 <button 
                   onClick={() => {
                     setActiveTab('all');
                     setFilters({ standard: 'All Standards', feature: 'All Features', style: 'All Styles' });
                   }}
                   className="text-sm text-slate-500 hover:text-red-500 underline px-2"
                 >
                   {t('filter.reset')}
                 </button>
               </div>
            </div>
          )}

          {/* Product Grid */}
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
              <p className="text-slate-600">Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  className="group relative h-[420px] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white border border-slate-100"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  onClick={() => handleProductClick(product)}
                >
                  {/* Product Image */}
                  <div className="relative h-3/4 w-full bg-slate-100">
                    {product.image && (product.image.startsWith('http') || product.image.startsWith('/')) ? (
                      <Image 
                        src={product.image}
                        alt={product.name}
                        fill
                        className={`object-cover transition-transform duration-700 ${
                          hoveredProduct === product.id ? 'scale-110' : 'scale-100'
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <span className="text-sm">No Image</span>
                      </div>
                    )}
                    
                    {/* Standards Badges (UPDATED) */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {/* Safety Standard Badge */}
                      {product.safety_standard && (
                        <span className="bg-primary-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-primary-500">
                          {product.safety_standard}
                        </span>
                      )}
                      {/* Additional Certs Badges */}
                      {product.additional_certs?.map((cert, idx) => (
                        <span key={idx} className="bg-white/90 backdrop-blur text-slate-900 text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-slate-200">
                          {cert}
                        </span>
                      ))}
                    </div>

                    {/* Hover Overlay (UPDATED) */}
                    <div className={`absolute inset-0 bg-slate-900/95 flex flex-col justify-center items-center p-8 text-center transition-all duration-300 ${
                      hoveredProduct === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      <div className="space-y-3 mb-6">
                        {/* Display core materials instead of random features */}
                        {product.materials?.toe_cap && (
                          <div className="inline-block bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full text-xs mr-2 mb-2">
                            Toe: {product.materials.toe_cap}
                          </div>
                        )}
                        {product.materials?.upper && (
                          <div className="inline-block bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full text-xs mr-2 mb-2">
                            {product.materials.upper}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
                        <button className="w-full py-3 bg-accent-500 hover:bg-accent-400 text-slate-900 font-bold rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-accent-500/20 text-sm">
                          {t('viewDetails')}
                          <ChevronRight className="ml-2 w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="h-1/4 p-5 bg-white flex flex-col justify-between relative z-10">
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{product.name}</h3>
                        <ArrowRight className={`w-5 h-5 text-primary-600 transition-transform duration-300 ${hoveredProduct === product.id ? 'translate-x-1' : ''}`} />
                </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">MOQ: <span className="text-slate-900 font-semibold">{product.moq}</span></span>
                        <span className="text-xs text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded">Wholesale</span>
                    </div>
                  </div>
                </div>
              ))}
              </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-500">Try adjusting your filters or browse all categories.</p>
              <button 
                onClick={() => {
                   setActiveTab('all');
                   setFilters({ standard: 'All Standards', feature: 'All Features', style: 'All Styles' });
                }}
                className="mt-6 text-primary-600 font-bold hover:underline"
              >
                Clear Filters
              </button>
              </div>
            )}

          {/* View All Button */}
          {filteredProducts.length > 0 && (
            <div className="mt-16 text-center">
              <a href="/products" className="inline-flex items-center px-8 py-3 border-2 border-slate-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white text-slate-600 font-bold rounded-lg transition-all">
                {t('loadMore')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Product Quick View Modal */}
      <ProductQuickView 
        product={selectedProduct}
          isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}