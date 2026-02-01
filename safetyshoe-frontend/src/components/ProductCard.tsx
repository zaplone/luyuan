'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Shield, Zap, Droplets, Eye } from 'lucide-react';
import { Product } from '@/types';
import { cn, formatPriceRange } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const getFeatureIcons = () => {
    const icons = [];
    
    // Check safety standard or certifications for slip resistance
    if (product.safety_standard === 'S3' || product.additional_certs?.includes('SRC')) {
      icons.push({ icon: Droplets, label: 'Slip Resistant', color: 'text-blue-600' });
    }
    
    // Check certifications for electrical hazard/ESD
    if (product.additional_certs?.includes('ESD')) {
      icons.push({ icon: Zap, label: 'ESD Protection', color: 'text-yellow-600' });
    }
    
    // Check toe cap type
    const toeCap = product.materials?.toe_cap;
    if (toeCap === 'Steel' || toeCap === 'Composite') {
      icons.push({ icon: Shield, label: `${toeCap} Toe`, color: 'text-gray-600' });
    }
    
    return icons.slice(0, 3); // 最多显示3个图标
  };

  const featureIcons = getFeatureIcons();

  return (
    <div className={cn('group bg-white rounded-lg shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden', className)}>
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <span className="text-gray-400 text-sm">Product Image</span>
        </div>
        
        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          </div>
        )}
        
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            href={`/products/${product.slug}`}
            className="btn btn-primary btn-sm inline-flex items-center"
          >
            <Eye className="h-4 w-4 mr-2" />
            Quick View
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          <Link href={`/products/${product.slug}`}>
            {product.name}
          </Link>
        </h3>

        {/* Short Description */}
        {product.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Features */}
        {featureIcons.length > 0 && (
          <div className="flex items-center space-x-2 mb-3">
            {featureIcons.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-center space-x-1"
                  title={feature.label}
                >
                  <Icon className={cn('h-4 w-4', feature.color)} />
                </div>
              );
            })}
          </div>
        )}

        {/* Price - 暂时隐藏，等待产品数据完善 */}
        {/* <div className="mb-4">
          <div className="text-lg font-bold text-gray-900">
            Contact for Price
          </div>
        </div> */}

        {/* Product Details */}
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          {product.materials?.upper && (
            <div className="flex justify-between">
              <span>Material:</span>
              <span className="font-medium">{product.materials.upper}</span>
            </div>
          )}
          {product.style && (
            <div className="flex justify-between">
              <span>Style:</span>
              <span className="font-medium">{product.style}</span>
            </div>
          )}
          {product.moq && (
            <div className="flex justify-between">
              <span>MOQ:</span>
              <span className="font-medium">{product.moq}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link
            href={`/products/${product.slug}`}
            className="btn btn-primary btn-sm flex-1 text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

// 产品网格组件
interface ProductGridProps {
  products: Product[];
  className?: string;
}

export function ProductGrid({ products, className }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <Shield className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Found</h3>
        <p className="text-gray-600">We're working on adding more products. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6', className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
