'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Shield, Zap, Droplets, Snowflake } from 'lucide-react';
import { Category } from '@/types';
import { categoriesApi } from '@/lib/api';
import { cn } from '@/lib/utils';

const categoryIcons = {
  'steel-toe-boots': Shield,
  'composite-toe-boots': Zap,
  'slip-resistant-boots': Droplets,
  'winter-safety-boots': Snowflake,
};

const categoryColors = {
  'steel-toe-boots': 'from-gray-600 to-gray-800',
  'composite-toe-boots': 'from-yellow-500 to-orange-600',
  'slip-resistant-boots': 'from-blue-500 to-blue-700',
  'winter-safety-boots': 'from-blue-300 to-blue-500',
};

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await categoriesApi.getCategories(true); // 包含产品
        setCategories(response);
      } catch (err) {
        setError('Failed to load categories');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the perfect safety footwear for your specific work environment
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-soft overflow-hidden">
                <div className="aspect-video bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
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
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Categories</h2>
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
    <section className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Safety Footwear Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our comprehensive range of safety footwear designed for different 
            work environments and protection requirements.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = categoryIcons[category.slug as keyof typeof categoryIcons] || Shield;
            const colorClass = categoryColors[category.slug as keyof typeof categoryColors] || 'from-gray-600 to-gray-800';
            
            return (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group bg-white rounded-lg shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                {/* Category Image/Icon */}
                <div className={cn(
                  'aspect-video bg-gradient-to-br flex items-center justify-center',
                  colorClass
                )}>
                  <Icon className="h-16 w-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Category Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                  
                  {/* Product Count */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {category.product_count} {category.product_count === 1 ? 'Product' : 'Products'}
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Why Choose Our Categories */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Safety Footwear?
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every product in our catalog meets or exceeds international safety standards, 
              ensuring maximum protection for your workforce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Certified Protection</h4>
              <p className="text-gray-600">
                ANSI Z41, ASTM F2413-18, and CE EN ISO 20345 certified safety standards.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Zap className="h-8 w-8 text-primary-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Advanced Technology</h4>
              <p className="text-gray-600">
                Latest materials and construction techniques for superior comfort and durability.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Droplets className="h-8 w-8 text-primary-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Environment Specific</h4>
              <p className="text-gray-600">
                Specialized designs for wet, oily, electrical, and cold weather conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
