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
  zoomLevel = 2.5
}: ImageMagnifierProps) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [xy, setXY] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  // 验证 src 是否有效
  if (!isValidImageUrl(src)) {
    return (
      <div className={cn("relative inline-block w-full h-full bg-slate-200 flex items-center justify-center", className)}>
        <span className="text-slate-400 text-sm">Invalid Image URL</span>
      </div>
    );
  }

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    setShowMagnifier(true);
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    setShowMagnifier(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    
    const elem = imgRef.current;
    const { top, left, width, height } = elem.getBoundingClientRect();
    
    // Calculate relative position (0 to 1)
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    setXY({ x, y });
  };

  return (
    <div 
      className={cn("relative inline-block overflow-hidden w-full h-full", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />

      {showMagnifier && (
        <div
          style={{
            display: "block",
            position: "absolute",
            pointerEvents: "none",
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            // Move the magnifier glass to follow the cursor
            // We need to adjust by half the width/height to center it
            top: `${xy.y * 100}%`, 
            left: `${xy.x * 100}%`,
            transform: "translate(-50%, -50%)", // Center the div on the cursor
            border: "1px solid lightgray",
            backgroundColor: "white",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            // Calculate background size based on zoom level
            backgroundSize: `${zoomLevel * 100}% ${zoomLevel * 100}%`,
            // Calculate background position
            // If x is 0 (left), we want bg pos 0. If x is 1 (right), we want bg pos 100%
            backgroundPositionX: `${xy.x * 100}%`,
            backgroundPositionY: `${xy.y * 100}%`,
            borderRadius: "50%", // Circular magnifier
            zIndex: 100,
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
          }}
        />
      )}
    </div>
  );
}
