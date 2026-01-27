'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Star, TrendingUp } from 'lucide-react';
import { Product } from '@/types';
import { productsApi } from '@/lib/api';
import { ProductGrid } from './ProductCard';
import { cn } from '@/lib/utils';

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await productsApi.getProducts({
          featured: true,
          limit: 8,
          sort: 'created_at',
          order: 'desc'
        });
        setProducts(response.products);
      } catch (err) {
        setError('Failed to load featured products');
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Safety Shoe Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular safety footwear solutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-soft overflow-hidden">
                <div className="aspect-square bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Safety Shoe Categories</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
        </div>

        {/* Products Grid */}
        <ProductGrid products={products} />

      </div>
    </section>
  );
}
