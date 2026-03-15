'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Calendar, Award, TrendingUp, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

export function BrandStory() {
  const t = useTranslations('BrandStory');
  
  // 图片轮播数据
  const SLIDES = [
    '/images/about/home-about.jpg',
    '/images/about/factory-slide-1.png',
    '/images/about/factory-slide-2.png',
    '/images/about/factory-slide-3.png',
    '/images/about/factory-slide-4.png'
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4000); // 4秒切换一次
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const milestones = [
    {
      year: '1990',
      title: t('milestones.founded.title'),
      desc: t('milestones.founded.desc'),
      icon: Calendar
    },
    {
      year: '2005',
      title: t('milestones.expansion.title'),
      desc: t('milestones.expansion.desc'),
      icon: TrendingUp
    },
    {
      year: '2012',
      title: t('milestones.certification.title'),
      desc: t('milestones.certification.desc'),
      icon: Award
    },
    {
      year: '2023',
      title: t('milestones.global.title'),
      desc: t('milestones.global.desc'),
      icon: Globe
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Story Text */}
          <div className="order-2 lg:order-1">
            <span className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-4 block">
              {t('label')}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {t('title')}
            </h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>{t('p1')}</p>
              <p>{t('p2')}</p>
              <blockquote className="border-l-4 border-primary-500 pl-6 italic text-slate-700 font-medium my-8">
                "{t('quote')}"
              </blockquote>
              <p>{t('p3')}</p>
            </div>
          </div>

          {/* Image Slider */}
          <div className="order-1 lg:order-2 relative group">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-slate-100">
               {SLIDES.map((slide, index) => (
                 <div 
                   key={index}
                   className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                     index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                   }`}
                 >
                   <Image
                     src={slide}
                     alt={`Factory View ${index + 1}`}
                     fill
                     className="object-cover"
                     priority={index === 0}
                   />
                   {/* Gradient Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 </div>
               ))}
               
               {/* Controls - Only show on hover */}
               <button 
                 onClick={prevSlide}
                 className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
               >
                 <ChevronLeft className="w-6 h-6" />
               </button>
               <button 
                 onClick={nextSlide}
                 className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
               >
                 <ChevronRight className="w-6 h-6" />
               </button>

               {/* Dots Indicator */}
               <div className="absolute bottom-24 left-8 z-20 flex gap-2">
                 {SLIDES.map((_, idx) => (
                   <button
                     key={idx}
                     onClick={() => setCurrentSlide(idx)}
                     className={`w-2 h-2 rounded-full transition-all ${
                       idx === currentSlide ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
                     }`}
                   />
                 ))}
               </div>

               <div className="absolute bottom-8 left-8 text-white z-20">
                 <div className="text-sm opacity-80 mb-1">Since 1990</div>
                 <div className="text-2xl font-bold">Crafting Safety</div>
               </div>
            </div>
            {/* Decorative dots */}
            <div className="absolute -z-10 top-12 -right-12 w-24 h-24 opacity-20 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="absolute -z-10 -bottom-12 -left-12 w-32 h-32 opacity-20 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:16px_16px]"></div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-900">{t('timelineTitle')}</h3>
          </div>

          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
             {milestones.map((item, index) => {
               const Icon = item.icon;
               return (
                 <div key={index} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative group">
                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-50 transition-colors mx-auto md:mx-0">
                      <Icon className="w-6 h-6 text-slate-400 group-hover:text-primary-600 transition-colors" />
                    </div>
                    <div className="text-3xl font-bold text-slate-200 absolute top-4 right-4">{item.year}</div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2 relative z-10">{item.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed relative z-10">
                      {item.desc}
                    </p>
                 </div>
               );
             })}
          </div>
        </div>

      </div>
    </section>
  );
}
