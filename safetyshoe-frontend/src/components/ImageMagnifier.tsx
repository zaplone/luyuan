'use client';

import { useState, MouseEvent, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { isValidImageUrl } from '@/lib/imageUtils';

interface ImageMagnifierProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  magnifierHeight?: number;
  magnifierWidth?: number;
  zoomLevel?: number;
}

export function ImageMagnifier({
  src,
  alt,
  className,
  magnifierHeight = 150,
  magnifierWidth = 150,
  zoomLevel = 2 // 调整回 2.5，配合正确的计算方式已经足够大
}: ImageMagnifierProps) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [xy, setXY] = useState({ x: 0, y: 0 });
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // 验证 src 是否有效
  if (!isValidImageUrl(src)) {
    return (
      <div className={cn("relative inline-block w-full h-full bg-slate-200 flex items-center justify-center", className)}>
        <span className="text-slate-400 text-sm">Invalid Image URL</span>
      </div>
    );
  }

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    const { width, height } = e.currentTarget.getBoundingClientRect();
    setImgSize({ width, height });
    setShowMagnifier(true);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // 更新图片尺寸，确保响应式变化时准确
    if (width !== imgSize.width || height !== imgSize.height) {
      setImgSize({ width, height });
    }

    const x = Math.max(0, Math.min(1, (e.clientX - left) / width));
    const y = Math.max(0, Math.min(1, (e.clientY - top) / height));
    setXY({ x, y });
  };

  // 计算逻辑修正：
  // 1. 背景图大小 = 容器当前显示大小 * 缩放倍数
  //    这样才能保证放大镜里的图是原图的 zoomLevel 倍，而不是基于放大镜框的大小
  const bgWidth = imgSize.width * zoomLevel;
  const bgHeight = imgSize.height * zoomLevel;

  // 2. 背景图定位
  //    我们需要将背景图的对应点 (xy.x, xy.y) 移动到放大镜的中心 (magnifierWidth/2, magnifierHeight/2)
  //    Target Point in BG = xy.x * bgWidth
  //    Offset = Center - Target
  const bgPosX = magnifierWidth / 2 - xy.x * bgWidth;
  const bgPosY = magnifierHeight / 2 - xy.y * bgHeight;

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block overflow-hidden w-full h-full cursor-crosshair", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover pointer-events-none select-none"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {showMagnifier && (
        <div
          style={{
            position: "absolute",
            pointerEvents: "none",
            width: magnifierWidth,
            height: magnifierHeight,
            // 放大镜框跟随鼠标
            left: xy.x * imgSize.width,
            top: xy.y * imgSize.height,
            transform: "translate(-50%, -50%)",
            
            border: "2px solid rgba(255,255,255,0.9)",
            borderRadius: "50%",
            backgroundColor: "white",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            
            // 关键修正：背景图尺寸基于容器尺寸，而非放大镜尺寸
            backgroundSize: `${bgWidth}px ${bgHeight}px`,
            backgroundPosition: `${bgPosX}px ${bgPosY}px`,
            
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            zIndex: 50
          }}
        />
      )}
    </div>
  );
}
