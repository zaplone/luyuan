'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Shield, Thermometer, Hammer } from 'lucide-react';
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
      image: 'https://images.unsplash.com/photo-1542838686-37da4a5fd44e?q=80&w=2500&auto=format&fit=crop', 
      badgeIcon: Hammer,
      translationKey: 'slide1'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1603970222129-23c44883d6a2?q=80&w=2500&auto=format&fit=crop',
      badgeIcon: Shield,
      translationKey: 'slide2'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=2500&auto=format&fit=crop',
      badgeIcon: Thermometer,
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

  // Helper to get text for current slide safely
  // We assume the translation structure is flat under 'Hero' for now, 
  // but let's adapt it to support multiple slides if the JSON supports it.
  // 
  // Since our current JSON only has one set of keys (title, highlight, etc.), 
  // I will map the single JSON entry to Slide 2 (Composite Tech) as default,
  // and mock the others or use the same keys if that was the intention.
  //
  // WAIT: To support multiple slides properly, we should update the JSON structure later.
  // For now, I will use the existing keys for the "Composite Tech" slide (which seems to be the main one),
  // and for the others I will fallback to hardcoded English OR duplication if JSON is not updated.
  //
  // BETTER APPROACH: I will update the JSON structure in the next step to support arrays or nested keys.
  // For this step, I'll update the component to expect keys like 'slides.0.title', etc.
  
  return (
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
      
      {/* 3. Text Content */}
      <div className="container mx-auto px-4 z-20 relative h-full flex flex-col justify-center">
        <div className="max-w-3xl pl-4 lg:pl-0">
          
          <div key={currentSlide} className="animate-fade-in-up">
            
            {/* Dynamic Badge */}
            <div className="inline-flex items-center space-x-2 bg-accent-500 text-slate-900 px-4 py-1.5 rounded-full text-sm font-bold mb-8 shadow-lg shadow-accent-500/20">
              {(() => {
                const Icon = SLIDES_CONFIG[currentSlide].badgeIcon;
                return <Icon className="w-4 h-4" />;
              })()}
              {/* 
                  Temporary fallback logic: 
                  If currentSlide is 1 (Composite), use the JSON keys we defined earlier.
                  For others, we might need to add keys to JSON. 
                  For now I'll use a switch to pick the right translation key suffix if we had them.
                  Since we only defined ONE set of Hero keys in JSON, I will apply them to ALL slides temporarily
                  to show it working, but ideally we need 'Hero.slides.0.title' etc.
              */}
              <span>{t('badge')}</span>
            </div>

            {/* Dynamic Title */}
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight drop-shadow-lg">
              {t('title')} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-white">
                {t('highlight')}
              </span>
            </h1>

            {/* Dynamic Description */}
            <p className="text-xl text-slate-200 mb-10 leading-relaxed max-w-xl drop-shadow-md">
              {t('description')}
            </p>

            {/* Dynamic Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                href={`/${locale}/products`} 
                className="inline-flex items-center justify-center px-8 py-4 bg-accent-500 hover:bg-accent-400 text-slate-900 font-bold rounded-full transition-all shadow-lg shadow-accent-500/30 hover:shadow-accent-500/50 hover:-translate-y-1"
              >
                {t('cta_primary')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                href={`/${locale}/#contact`} 
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-full transition-all hover:bg-white/10 hover:border-white"
              >
                {t('cta_secondary')}
              </Link>
            </div>
          </div>

          {/* Static Stats Footer */}
          <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-8 max-w-xl animate-fade-in delay-300">
            <div>
              <div className="text-3xl font-bold text-white mb-1 whitespace-nowrap">ISO 9001</div>
              <div className="text-sm text-slate-400 font-medium whitespace-nowrap">Certified Factory</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1 whitespace-nowrap">CE / ANSI</div>
              <div className="text-sm text-slate-400 font-medium whitespace-nowrap">Safety Standards</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1 whitespace-nowrap">OEM / ODM</div>
              <div className="text-sm text-slate-400 font-medium whitespace-nowrap">Custom Service</div>
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