'use client';

import { useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    description: string;
    features: string[];
    specifications: {
      sole: string;
      certification: string;
      material: string;
      weight: string;
    };
    images: Array<{ image_url: string; alt_text?: string }>;
    applications: string[];
    category_name?: string;
  } | null;
  relatedProducts?: {
    id: string;
    name: string;
    image: string;
    price?: string;
    category: string;
  }[];
  onProductSelect?: (productId: string) => void;
  loading?: boolean;
}

export function ProductModal({ isOpen, onClose, product, relatedProducts = [], onProductSelect, loading = false }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // 显示loading状态
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">加载中...</h3>
            <p className="text-gray-600">正在获取产品信息</p>
          </div>
        </div>
      </div>
    );
  }

  // 如果没有产品数据，显示空状态
  if (!product) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">暂无产品</h3>
            <p className="text-gray-600">该分类下暂无产品信息</p>
            <button 
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    if (!product?.images) return;
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    setImagePosition({ x: 0, y: 0 }); // 切换图片时重置位置
  };

  const prevImage = () => {
    if (!product?.images) return;
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    setImagePosition({ x: 0, y: 0 }); // 切换图片时重置位置
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    setZoomLevel(isZoomed ? 1 : 2);
  };

  const zoomIn = () => {
    if (zoomLevel < 3) {
      setZoomLevel(zoomLevel + 0.5);
      setIsZoomed(true);
    }
  };

  const zoomOut = () => {
    if (zoomLevel > 1) {
      setZoomLevel(zoomLevel - 0.5);
      if (zoomLevel <= 1.5) {
        setIsZoomed(false);
      }
    }
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setIsZoomed(false);
    setImagePosition({ x: 0, y: 0 });
  };

  // 拖拽处理函数
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - imagePosition.x,
      y: e.clientY - imagePosition.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isZoomed) return;
    e.preventDefault();
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // 计算边界限制
    const container = containerRef.current;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const maxX = (zoomLevel - 1) * containerRect.width / 2;
      const maxY = (zoomLevel - 1) * containerRect.height / 2;
      
      setImagePosition({
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 触摸事件处理（移动端支持）
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isZoomed) return;
    e.preventDefault();
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - imagePosition.x,
      y: touch.clientY - imagePosition.y
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !isZoomed) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const newX = touch.clientX - dragStart.x;
    const newY = touch.clientY - dragStart.y;
    
    // 计算边界限制
    const container = containerRef.current;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const maxX = (zoomLevel - 1) * containerRect.width / 2;
      const maxY = (zoomLevel - 1) * containerRect.height / 2;
      
      setImagePosition({
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY))
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Main Container */}
      <div className="relative flex items-start justify-center w-full max-w-7xl mx-4 gap-6">
        {/* Related Products Sidebar */}
        {relatedProducts.length > 0 && (
          <div className="bg-white rounded-2xl shadow-2xl w-80 h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-900">Related Products</h3>
              <p className="text-sm text-gray-500 mt-1">Browse similar products</p>
            </div>
            <div className="p-4 space-y-3 flex-1 overflow-y-auto">
              {relatedProducts.map((relatedProduct) => (
                <button
                  key={relatedProduct.id}
                  onClick={() => onProductSelect?.(relatedProduct.id)}
                  className="w-full p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:shadow-md transition-all duration-200 text-left group border border-transparent hover:border-blue-200"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-16 h-16 object-cover rounded-lg shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                        {relatedProduct.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{relatedProduct.category}</p>
                      {relatedProduct.price && (
                        <p className="text-sm font-bold text-green-600 mt-2">{relatedProduct.price}</p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Modal Content */}
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">
            {product.category_name ? `${product.category_name} - ${product.name}` : product.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Image Section */}
          <div className="lg:w-3/5 p-6 overflow-y-auto">
            {/* Main Image */}
            <div 
              ref={containerRef}
              className="relative mb-4 overflow-hidden rounded-lg"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative overflow-hidden">
                <img
                  ref={imageRef}
                  src={product.images?.[currentImageIndex]?.image_url || ''}
                  alt={product.name}
                  className={`w-full h-80 object-cover transition-all duration-300 select-none ${
                    isZoomed 
                      ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') 
                      : 'cursor-zoom-in'
                  }`}
                  style={{
                    transform: `scale(${zoomLevel}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                    transformOrigin: 'center center'
                  }}
                  onClick={!isZoomed ? toggleZoom : undefined}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  draggable={false}
                />
                
                {/* Zoom Controls */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  <button
                    onClick={zoomIn}
                    className="bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    title="Zoom In"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                  <button
                    onClick={zoomOut}
                    className="bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    title="Zoom Out"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  {isZoomed && (
                    <button
                      onClick={resetZoom}
                      className="bg-white/90 hover:bg-white rounded-full px-3 py-2 shadow-lg transition-all text-xs font-medium"
                      title="Reset Zoom"
                    >
                      Reset
                    </button>
                  )}
                </div>
                
                {/* Zoom Level Indicator */}
                {isZoomed && (
                  <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1 text-xs font-medium shadow-lg">
                    {Math.round(zoomLevel * 100)}%
                  </div>
                )}
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    selectImage(index);
                    resetZoom(); // 切换图片时重置缩放
                  }}
                  className={`relative overflow-hidden rounded-lg transition-all ${
                    currentImageIndex === index
                      ? 'ring-2 ring-blue-500 scale-105'
                      : 'hover:scale-105'
                  }`}
                >
                  <img
                    src={image.image_url}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-16 object-cover"
                  />
                </button>
              ))}
            </div>
            
            {/* Zoom Instructions */}
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">
                {isZoomed 
                  ? "Drag to explore • Use +/- for zoom • Reset to center"
                  : "Click image to zoom • Use +/- buttons for precise control"
                }
              </p>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-2/5 p-6 bg-gray-50 overflow-y-auto">
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Features</h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Specifications</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Sole Type:</span>
                    <span className="text-gray-600 ml-2">{product.specifications?.sole || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Certification:</span>
                    <span className="text-gray-600 ml-2">{product.specifications?.certification || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Material:</span>
                    <span className="text-gray-600 ml-2">{product.specifications?.material || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Weight:</span>
                    <span className="text-gray-600 ml-2">{product.specifications?.weight || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Applications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Applications</h3>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons - Hidden */}
              {/* <div className="flex space-x-3 pt-4">
                <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Request Quote
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Download Catalog
                </button>
              </div> */}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
