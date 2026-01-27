'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronRight, Shield, Zap, Droplets, Snowflake, HardHat, Factory, Utensils, Hammer, Filter } from 'lucide-react';
import { ProductQuickView } from './ProductQuickView';
import { fetchProducts, transformProduct } from '@/lib/strapi';

// Industry Categories for Visual Navigation
const INDUSTRIES = [
  { 
    id: 'construction', 
    name: 'Construction', 
    icon: HardHat,
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80', // Construction Site
    desc: 'Heavy-duty protection for sites'
  },
  { 
    id: 'oil-gas', 
    name: 'Oil & Gas', 
    icon: Factory,
    image: 'https://images.unsplash.com/photo-1516937941348-c09e554b9631?auto=format&fit=crop&q=80', // Refinery
    desc: 'Chemical & Slip resistant'
  },
  { 
    id: 'food', 
    name: 'Food Service', 
    icon: Utensils,
    image: 'https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?auto=format&fit=crop&q=80', // Commercial Kitchen
    desc: 'Hygiene & Anti-slip'
  },
  { 
    id: 'heavy-duty', 
    name: 'Heavy Industry', 
    icon: Hammer,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80', // Manufacturing
    desc: 'Extreme condition gear'
  },
];

const MOCK_PRODUCTS = [
  {
    id: 101,
    name: 'Titan Pro Steel Toe',
    category: 'construction',
    image: '/images/products/steel-toe-boot.jpg',
    features: ['S3 Certified', 'Anti-Puncture', 'Waterproof'],
    moq: '500 Pairs',
    standards: ['S3', 'SRC'],
    description: 'Our best-selling steel toe boot for construction sites. Reinforced heel and toe cap.'
  },
  {
    id: 102,
    name: 'VoltGuard Composite',
    category: 'oil-gas',
    image: '/images/products/composite-shoe.jpg',
    features: ['EH Rated', 'Metal Free', 'Oil Resistant'],
    moq: '500 Pairs',
    standards: ['SB', 'E', 'FO'],
    description: 'Designed for electricians and engineers. 100% metal free and electrical hazard protection.'
  },
  {
    id: 103,
    name: 'ChefSafe Grip',
    category: 'food',
    image: '/images/products/slip-resistant.jpg',
    features: ['SRC Slip Resistant', 'Easy Clean', 'Lightweight'],
    moq: '1000 Pairs',
    standards: ['OB', 'SRC'],
    description: 'Maximum slip resistance for oily kitchen floors. Easy to clean microfiber upper.'
  },
  {
    id: 104,
    name: 'Arctic Force',
    category: 'heavy-duty',
    image: '/images/products/winter-boot.jpg',
    features: ['-40°C Rated', 'Thinsulate', 'Vibram Sole'],
    moq: '300 Pairs',
    standards: ['S3', 'CI', 'WR'],
    description: 'Extreme cold weather protection. 3M Thinsulate insulation keeps feet warm in freezing conditions.'
  },
  {
    id: 105,
    name: 'Construct Max',
    category: 'construction',
    image: '/images/products/steel-toe-boot.jpg',
    features: ['Steel Toe', 'Ankle Support', 'Breathable'],
    moq: '500 Pairs',
    standards: ['S1P', 'SRA'],
    description: 'Affordable and durable. The perfect choice for large crew outfitting.'
  },
  {
    id: 106,
    name: 'RigMaster Pro',
    category: 'oil-gas',
    image: '/images/products/composite-shoe.jpg',
    features: ['Chemical Resistant', 'Side Zip', 'Heat Resistant'],
    moq: '500 Pairs',
    standards: ['S3', 'HRO'],
    description: 'Heavy duty oil and gas boot with side zipper for easy on/off.'
  },
];

// 筛选选项
const FILTERS = {
  standard: ['All Standards', 'S3', 'S1P', 'SB', 'OB'],
  feature: ['All Features', 'Waterproof', 'Metal Free', 'Insulated', 'Slip Resistant'],
  style: ['All Styles', 'Low Cut', 'Mid Cut', 'High Boot']
};

interface ProductCategoriesProps {
  initialProducts?: any[]; // 首页传入的预加载产品数据（SSG）
}

export function ProductCategories({ initialProducts }: ProductCategoriesProps = {}) {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  
  // 产品数据状态
  // 如果有预加载数据且不为空，使用预加载数据；否则初始化为空数组，等待 API 或使用 mock
  const [products, setProducts] = useState<any[]>(
    initialProducts && initialProducts.length > 0 ? initialProducts : []
  );
  const [isLoading, setIsLoading] = useState(
    !initialProducts || initialProducts.length === 0
  );
  
  // 筛选状态
  const [filters, setFilters] = useState({
    standard: 'All Standards',
    feature: 'All Features',
    style: 'All Styles'
  });

  // Modal 状态
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 从 Strapi API 获取产品数据（仅在未提供预加载数据或预加载数据为空时执行）
  useEffect(() => {
    // 如果已经有有效的预加载数据（首页 SSG），跳过 API 请求
    if (initialProducts && initialProducts.length > 0) {
      setIsLoading(false);
      return;
    }

    async function loadProducts() {
      setIsLoading(true);
      try {
        const strapiProducts = await fetchProducts();
        if (strapiProducts.length > 0) {
          const transformedProducts = strapiProducts.map(transformProduct);
          setProducts(transformedProducts);
        } else {
          // 如果 API 返回空，使用 mock 数据作为后备
          console.log('No products from API');
          // setProducts(MOCK_PRODUCTS); // 暂时禁用 mock 数据，方便调试
          setProducts([]); 
        }
      } catch (error) {
        console.error('Failed to load products:', error);
        // 如果 API 失败，使用 mock 数据作为后备
        // setProducts(MOCK_PRODUCTS); // 暂时禁用 mock 数据，方便调试
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, [initialProducts]);

  // Filter products based on active tab AND filters
  const filteredProducts = products.filter(p => {
    // 1. Category Filter - 改进匹配逻辑
    if (activeTab !== 'all') {
      // 转换 API 里的 category (如 "Oil & Gas") 为 ID 格式 (如 "oil-gas")
      const productCat = (p.category || '').toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
      // 也要处理前端定义的 ID (如 "oil-gas")
      const tabId = activeTab.toLowerCase();
      
      // 如果不匹配，则过滤掉
      if (productCat !== tabId && p.category?.toLowerCase() !== tabId) return false;
    }
    
    // 2. Standard Filter (Mock logic)
    if (filters.standard !== 'All Standards' && !p.standards?.includes(filters.standard)) return false;

    // 3. Style Filter
    if (filters.style !== 'All Styles' && p.style !== filters.style) return false;

    // 4. Feature Filter (Mock logic - simple string match)
    if (filters.feature !== 'All Features') {
       // 简单的模拟匹配逻辑
       const featureMap: Record<string, string> = {
         'Waterproof': 'Waterproof',
         'Metal Free': 'Metal Free',
         'Insulated': 'Thinsulate',
         'Slip Resistant': 'Slip Resistant'
       };
       const targetFeature = featureMap[filters.feature] || filters.feature;
       const hasFeature = p.features.some(f => f.includes(targetFeature));
       if (!hasFeature) return false;
    }

    return true;
  });

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="py-24 bg-slate-50 relative" id="products">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 bg-white border border-slate-200 text-slate-500 rounded-full text-sm font-semibold mb-4 shadow-sm">
              Product Catalog
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Professional Safety Footwear
            </h2>
            <p className="text-lg text-slate-600">
              Select by industry or browse our complete collection of certified safety shoes.
            </p>
          </div>

          {/* Industry Visual Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {INDUSTRIES.map((ind) => (
              <div 
                key={ind.id}
                onClick={() => setActiveTab(ind.id)}
                className={`relative h-40 rounded-xl overflow-hidden cursor-pointer group border-2 transition-all ${
                  activeTab === ind.id ? 'border-primary-600 ring-2 ring-primary-600 ring-offset-2' : 'border-transparent hover:border-slate-300'
                }`}
              >
                <Image 
                  src={ind.image} 
                  alt={ind.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
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

          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
             <div className="flex items-center gap-2 text-slate-700 font-semibold">
               <Filter className="w-5 h-5 text-primary-600" />
               <span>Filter By:</span>
             </div>
             
             <div className="flex flex-wrap gap-3 flex-1 justify-end">
               <select 
                 className="form-select bg-slate-50 border-slate-200 rounded-lg text-sm focus:ring-primary-500 focus:border-primary-500 py-2.5 px-4"
                 value={filters.standard}
                 onChange={(e) => setFilters({...filters, standard: e.target.value})}
               >
                 {FILTERS.standard.map(opt => <option key={opt} value={opt}>{opt}</option>)}
               </select>

               <select 
                 className="form-select bg-slate-50 border-slate-200 rounded-lg text-sm focus:ring-primary-500 focus:border-primary-500 py-2.5 px-4"
                 value={filters.feature}
                 onChange={(e) => setFilters({...filters, feature: e.target.value})}
               >
                 {FILTERS.feature.map(opt => <option key={opt} value={opt}>{opt}</option>)}
               </select>

               <select 
                 className="form-select bg-slate-50 border-slate-200 rounded-lg text-sm focus:ring-primary-500 focus:border-primary-500 py-2.5 px-4"
                 value={filters.style}
                 onChange={(e) => setFilters({...filters, style: e.target.value})}
               >
                 {FILTERS.style.map(opt => <option key={opt} value={opt}>{opt}</option>)}
               </select>

               <button 
                 onClick={() => {
                   setActiveTab('all');
                   setFilters({ standard: 'All Standards', feature: 'All Features', style: 'All Styles' });
                 }}
                 className="text-sm text-slate-500 hover:text-red-500 underline px-2"
               >
                 Reset
               </button>
             </div>
          </div>

          {/* Product Grid */}
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
              <p className="text-slate-600">正在加载产品...</p>
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
                    <Image 
                      src={product.image}
                      alt={product.name}
                      fill
                      className={`object-cover transition-transform duration-700 ${
                        hoveredProduct === product.id ? 'scale-110' : 'scale-100'
                      }`}
                    />
                    
                    {/* Standards Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.standards?.map((std, idx) => (
                        <span key={idx} className="bg-white/90 backdrop-blur text-slate-900 text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-slate-200">
                          {std}
                        </span>
                      ))}
                    </div>

                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-slate-900/95 flex flex-col justify-center items-center p-8 text-center transition-all duration-300 ${
                      hoveredProduct === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      <div className="space-y-3 mb-6">
                        {product.features.map((feature, idx) => (
                          <div key={idx} className="inline-block bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full text-xs mr-2 mb-2">
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
                        <button className="w-full py-3 bg-accent-500 hover:bg-accent-400 text-slate-900 font-bold rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-accent-500/20 text-sm">
                          Quick View
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
                        <span className="text-xs text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded">Wholesale Only</span>
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
                View Full Catalog
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
