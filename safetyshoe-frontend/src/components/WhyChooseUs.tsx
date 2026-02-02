'use client';

import { useState } from 'react';
import { Shield, Settings, Truck, Award, CheckCircle2, TrendingUp, Users, Factory, Play, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

export function WhyChooseUs() {
  const t = useTranslations('WhyChooseUs');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const pillars = [
    {
      id: 'manufacturing',
      title: t('cards.manufacturing.title'),
      icon: Factory,
      iconColor: 'bg-accent-500 text-slate-900',
      desc: t('cards.manufacturing.desc'),
      bgImage: "/images/about/manufacturing.jpg",
      videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
      points: [
        { text: 'ISO 9001', color: 'text-accent-500' },
        { text: '12 Lines', color: 'text-accent-500' }
      ]
    },
    {
      id: 'quality',
      title: t('cards.quality.title'),
      icon: Shield,
      iconColor: 'bg-blue-500 text-white',
      desc: t('cards.quality.desc'),
      bgImage: "/images/about/quality.jpg",
      videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1", 
      points: [
        { text: 'Lab Testing', color: 'text-blue-400' },
        { text: 'SGS Reports', color: 'text-blue-400' },
        { text: 'Zero-Defect', color: 'text-blue-400' }
      ]
    },
    {
      id: 'logistics',
      title: t('cards.logistics.title'),
      icon: Truck,
      iconColor: 'bg-green-500 text-white',
      desc: t('cards.logistics.desc'),
      bgImage: "/images/about/logistics.jpg",
      videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
      points: [
        { text: 'On-Time', color: 'text-green-400' },
        { text: 'DDP Service', color: 'text-green-400' }
      ]
    }
  ];

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        
        {/* 1. The Big Numbers Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-slate-100 pb-8">
          <div className="max-w-2xl">
            <span className="text-accent-500 font-bold tracking-wider uppercase text-sm">{t('label')}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 leading-tight">
              {t('title')} <br/>
              <span className="text-slate-400">{t('subtitle')}</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12 w-full md:w-auto">
            <div>
              <div className="text-3xl font-bold text-slate-900">2M+</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">{t('stats.capacity')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">50+</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">{t('stats.countries')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">7<span className="text-lg">Days</span></div>
              <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">{t('stats.sampleTime')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">0.2<span className="text-lg">%</span></div>
              <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">{t('stats.defectRate')}</div>
            </div>
          </div>
        </div>

        {/* 2. The 3 Pillars (Visual Cards with Video) */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.id}
                className="group relative overflow-hidden rounded-3xl bg-slate-900 shadow-xl transition-all duration-500 h-[420px]"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-40 transition-all duration-700 transform group-hover:scale-110"
                  style={{ backgroundImage: `url('${pillar.bgImage}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => setActiveVideo(pillar.videoUrl)}
                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group/btn"
                  >
                    <Play className="w-6 h-6 text-white fill-white group-hover/btn:text-slate-900 group-hover/btn:fill-slate-900" />
                  </button>
                </div>

                <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg", pillar.iconColor)}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-white mb-2 text-2xl">{pillar.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                  <ul className="space-y-2">
                    {pillar.points.map((point, idx) => (
                      <li key={idx} className="flex items-center text-xs text-white/80">
                        <CheckCircle2 className={cn("w-4 h-4 mr-2", point.color)}/> {point.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Factory Tour Banner (Restored "See It To Believe It" Style) */}
        <div className="relative rounded-3xl overflow-hidden h-[300px] flex items-center group shadow-2xl">
          {/* Background Image */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80')] bg-cover bg-fixed bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-700"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
          
          <div className="relative z-10 w-full px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
               <div className="inline-flex items-center space-x-2 bg-accent-500 text-slate-900 px-3 py-1 rounded-full text-xs font-bold mb-4">
                  <span className="relative flex h-2 w-2 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-900"></span>
                  </span>
                  {t('videoBanner.liveView')}
               </div>
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{t('videoBanner.title')}</h2>
               <p className="text-lg text-slate-300 leading-relaxed">
                 {t('videoBanner.desc')}
               </p>
            </div>
            
            <button 
              onClick={() => setActiveVideo('https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1')}
              className="flex-shrink-0 px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-accent-500 hover:text-slate-900 transition-all shadow-xl hover:scale-105 flex items-center group/btn"
            >
              {t('videoBanner.button')}
              <div className="ml-3 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center group-hover/btn:bg-white transition-colors">
                <Play className="w-4 h-4 text-slate-900 fill-slate-900" />
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* Video Modal Overlay */}
      {activeVideo && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full h-full flex items-center justify-center">
              <iframe 
                width="100%" 
                height="100%" 
                src={activeVideo} 
                title="Video Player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}