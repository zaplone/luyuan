'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Shield, PlayCircle, Thermometer, Hammer } from 'lucide-react';

// 定义轮播数据，包含图片和对应的文案
const SLIDES = [
  {
    id: 1,
    // 工业场景/钢头鞋 - 强调防护
    image: 'https://images.unsplash.com/photo-1542838686-37da4a5fd44e?q=80&w=2500&auto=format&fit=crop', 
    badge: 'Heavy Duty Protection',
    badgeIcon: Hammer,
    title: 'Built For The Toughest Jobs',
    highlight: 'Maximum Safety',
    description: 'Our steel-toe series withstands 200J impact. Designed for construction, mining, and heavy manufacturing environments.',
    btnText: 'View Heavy Duty Series'
  },
  {
    id: 2,
    // 轻量化/运动风 - 强调舒适
    image: 'https://images.unsplash.com/photo-1603970222129-23c44883d6a2?q=80&w=2500&auto=format&fit=crop',
    badge: 'Lightweight & Agile',
    badgeIcon: Shield,
    title: 'Protection Without The Weight',
    highlight: 'Composite Tech',
    description: 'Metal-free composite toe protection. 30% lighter than traditional boots, perfect for airport security and electricians.',
    btnText: 'View Composite Series'
  },
  {
    id: 3,
    // 极寒/户外 - 强调耐候
    image: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=2500&auto=format&fit=crop',
    badge: 'Extreme Cold Resistance',
    badgeIcon: Thermometer,
    title: 'Conquer The Elements',
    highlight: '-40°C Rated',
    description: 'Thinsulate™ insulation technology keeps feet warm in freezing conditions. Waterproof, slip-resistant, and unstoppable.',
    btnText: 'View Winter Collection'
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    // 使用 h-screen 占满全屏，增加沉浸感
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-slate-900">
      
      {/* 1. Background Image Carousel */}
      {SLIDES.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
            quality={90}
          />
          
          {/* 单独给每张图加微弱的缩放动画，增加呼吸感 */}
          <div className={`absolute inset-0 transition-transform duration-[6000ms] ease-out ${
             index === currentSlide ? 'scale-105' : 'scale-100'
          }`} />
        </div>
      ))}

      {/* 2. Global Overlay - 统一的遮罩，保证文字可读性 */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent z-10" />
      
      {/* 3. Text Content - With Animation Keyed to Slide */}
      <div className="container mx-auto px-4 z-20 relative h-full flex flex-col justify-center">
        <div className="max-w-3xl pl-4 lg:pl-0">
          
          {/* 我们用 key={currentSlide} 来触发 React 的重新渲染动画 */}
          <div key={currentSlide} className="animate-fade-in-up">
            
            {/* Dynamic Badge */}
            <div className="inline-flex items-center space-x-2 bg-accent-500 text-slate-900 px-4 py-1.5 rounded-full text-sm font-bold mb-8 shadow-lg shadow-accent-500/20">
              {(() => {
                const Icon = SLIDES[currentSlide].badgeIcon;
                return <Icon className="w-4 h-4" />;
              })()}
              <span>{SLIDES[currentSlide].badge}</span>
            </div>

            {/* Dynamic Title */}
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight drop-shadow-lg">
              {SLIDES[currentSlide].title} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-white">
                {SLIDES[currentSlide].highlight}
              </span>
            </h1>

            {/* Dynamic Description */}
            <p className="text-xl text-slate-200 mb-10 leading-relaxed max-w-xl drop-shadow-md">
              {SLIDES[currentSlide].description}
            </p>

            {/* Dynamic Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                href="/products" 
                className="inline-flex items-center justify-center px-8 py-4 bg-accent-500 hover:bg-accent-400 text-slate-900 font-bold rounded-full transition-all shadow-lg shadow-accent-500/30 hover:shadow-accent-500/50 hover:-translate-y-1"
              >
                {SLIDES[currentSlide].btnText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-full transition-all hover:bg-white/10 hover:border-white"
              >
                Get Quick Quote
              </Link>
            </div>
          </div>

          {/* Static Stats Footer (保持不变，作为底部锚点) */}
          <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-8 max-w-lg animate-fade-in delay-300">
            <div>
              <div className="text-3xl font-bold text-white mb-1">ISO 9001</div>
              <div className="text-sm text-slate-400 font-medium">Certified Factory</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">CE / ANSI</div>
              <div className="text-sm text-slate-400 font-medium">Safety Standards</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">OEM / ODM</div>
              <div className="text-sm text-slate-400 font-medium">Custom Service</div>
            </div>
          </div>

        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 right-10 z-20 flex space-x-3">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentSlide ? 'w-12 bg-white' : 'w-6 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
