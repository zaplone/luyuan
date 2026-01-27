'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { LayoutGrid, List, ArrowUpDown, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { ProductQuickView } from './ProductQuickView';
import { fetchProducts, transformProduct } from '@/lib/strapi';

interface ProductGridProps {
  viewMode?: 'grid' | 'list';
}

export function ProductGrid({ viewMode: initialViewMode }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(initialViewMode || 'grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  
  // Data State
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Quick View State
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ITEMS_PER_PAGE = 12;

  // Load products from API
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const strapiProducts = await fetchProducts();
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
  }, []);

  // Sort logic
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        // Assuming id is roughly chronological, or use createdAt if available
        return b.id - a.id;
      case 'price-low':
        return parseInt(a.price_range.replace(/\D/g, '')) - parseInt(b.price_range.replace(/\D/g, ''));
      case 'price-high':
        return parseInt(b.price_range.replace(/\D/g, '')) - parseInt(a.price_range.replace(/\D/g, ''));
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
        <p className="text-slate-500">Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex-1 py-20 text-center bg-white rounded-xl border border-dashed border-slate-300">
        <div className="text-4xl mb-4">📦</div>
        <h3 className="text-lg font-bold text-slate-900">No products found</h3>
        <p className="text-slate-500">Please check back later or contact us for catalog.</p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      
      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-500 font-medium">
          Showing <span className="text-slate-900 font-bold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, sortedProducts.length)}</span> of <span className="text-slate-900 font-bold">{sortedProducts.length}</span> results
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 hidden sm:inline">Sort by:</span>
            <div className="relative">
              <select 
                className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg pl-3 pr-8 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
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
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'list' ? 'bg-white shadow-sm text-primary-600' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="List View"
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
                    Quick View
                  </button>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded capitalize">
                    {product.category}
                  </span>
                  {product.standards && product.standards.length > 0 && (
                    <span className="text-xs font-bold text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded">
                      {product.standards[0]}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-slate-900 mb-2 truncate group-hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>MOQ: <strong className="text-slate-700">{product.moq}</strong></span>
                  <span>Est. {product.price_range}</span>
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
                    {product.category}
                  </span>
                  {product.standards && product.standards.length > 0 && (
                    <span className="text-xs font-bold text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded">
                      {product.standards[0]}
                    </span>
                  )}
                  {product.is_new && <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded">NEW</span>}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
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
                    <span className="font-semibold text-slate-900">Price:</span> {product.price_range}
                  </div>
                </div>
              </div>
              <div className="p-6 border-t sm:border-t-0 sm:border-l border-slate-100 flex items-center justify-center bg-slate-50 sm:w-40 flex-shrink-0">
                <button className="w-full sm:w-auto bg-white border border-slate-200 hover:border-primary-500 hover:text-primary-600 text-slate-700 font-bold py-2 px-4 rounded-lg transition-all shadow-sm text-sm">
                  View Details
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
