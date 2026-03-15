'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Shield, Palette, Hammer } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export function Hero() {
  const t = useTranslations('Hero');
  const locale = useLocale();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Define slide configuration (images and icons)
  // Text content will be pulled from translations based on index
  const SLIDES_CONFIG = [
    {
      id: 1,
      image: '/images/hero-banner.png',
      badgeIcon: Hammer,
      translationKey: 'slide1'
    },
    {
      id: 2,
      image: '/images/hero-slide2.png',
      badgeIcon: Shield,
      translationKey: 'slide2'
    },
    {
      id: 3,
      image: '/images/hero-slide3.png',
      badgeIcon: Palette,
      translationKey: 'slide3'
    },
  ];

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES_CONFIG.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slideKey = SLIDES_CONFIG[currentSlide].translationKey;

  return (
    // 恢复原来的首屏高度策略：整屏高度 + 最小 700px，避免底部出现白条
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-slate-900">
      
      {/* 1. Background Image Carousel */}
      {SLIDES_CONFIG.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt="Hero Background"
            fill
            className="object-cover"
            priority={index === 0}
            quality={90}
          />
          
          <div className={`absolute inset-0 transition-transform duration-[6000ms] ease-out ${
             index === currentSlide ? 'scale-105' : 'scale-100'
          }`} />
        </div>
      ))}

      {/* 2. Global Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent z-10" />
      {/* 3. 顶部安全区 - 统一三张轮播图的 logo 区域，避免与 header 重叠 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 from-0% via-slate-950/70 via-[15%] to-transparent to-[30%] z-10 pointer-events-none" />
      
      {/* 3. Text Content - 增加顶部内边距，避免与固定 Header 重叠 */}
      <div className="container mx-auto px-4 z-20 relative h-full flex flex-col justify-center pt-24 md:pt-28 pb-16">
        <div className="max-w-3xl pl-4 lg:pl-0">
          
          <div key={currentSlide} className="animate-fade-in-up">
            
            {/* Dynamic Badge - 移动端略小 */}
            <div className="inline-flex items-center space-x-2 bg-accent-500 text-slate-900 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-8 shadow-lg shadow-accent-500/20">
              {(() => {
                const Icon = SLIDES_CONFIG[currentSlide].badgeIcon;
                return <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
              })()}
              <span>{t(`${slideKey}.badge`)}</span>
            </div>

            {/* Dynamic Title - 移动端更紧凑 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-3 sm:mb-6 tracking-tight drop-shadow-lg">
              {t(`${slideKey}.title`)} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-white">
                {t(`${slideKey}.highlight`)}
              </span>
            </h1>

            {/* Dynamic Description - 移动端缩短展示，避免满屏字 */}
            <p className="text-sm sm:text-base md:text-xl text-slate-200 mb-6 sm:mb-10 leading-relaxed max-w-xl drop-shadow-md line-clamp-3 sm:line-clamp-none">
              {t(`${slideKey}.description`)}
            </p>

            {/* Dynamic Buttons - 移动端更紧凑 */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-12">
              <Link 
                href={`/${locale}/products`} 
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-accent-500 hover:bg-accent-400 text-slate-900 font-bold rounded-full transition-all shadow-lg shadow-accent-500/30 hover:shadow-accent-500/50 hover:-translate-y-1 text-sm sm:text-base"
              >
                {t('cta_primary')}
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link 
                href={`/${locale}/#contact`} 
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-full transition-all hover:bg-white/10 hover:border-white text-sm sm:text-base"
              >
                {t('cta_secondary')}
              </Link>
            </div>
          </div>

          {/* Static Stats Footer - 移动端缩小，减少占用 */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 border-t border-white/10 pt-4 sm:pt-6 md:pt-8 max-w-xl animate-fade-in delay-300">
            <div>
              <div className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1 whitespace-nowrap">ISO 9001</div>
              <div className="text-[10px] sm:text-xs md:text-sm text-slate-400 font-medium whitespace-nowrap">Certified Factory</div>
            </div>
            <div>
              <div className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1 whitespace-nowrap">CE / ANSI</div>
              <div className="text-[10px] sm:text-xs md:text-sm text-slate-400 font-medium whitespace-nowrap">Safety Standards</div>
            </div>
            <div>
              <div className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1 whitespace-nowrap">OEM / ODM</div>
              <div className="text-[10px] sm:text-xs md:text-sm text-slate-400 font-medium whitespace-nowrap">Custom Service</div>
            </div>
          </div>

        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 right-10 z-20 flex space-x-3">
        {SLIDES_CONFIG.map((_, idx) => (
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