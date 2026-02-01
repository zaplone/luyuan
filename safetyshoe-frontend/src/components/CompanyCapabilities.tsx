'use client';

import { useState } from 'react';
import { 
  Factory, ShieldCheck, Globe, TrendingUp, CheckCircle2,
  BadgeCheck, Users, X, Play
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const STATS = [
  { label: 'Monthly Capacity', value: '50,000+', unit: 'Pairs', icon: TrendingUp },
  { label: 'Defect Rate', value: '< 0.02%', unit: 'Grade A', icon: ShieldCheck },
  { label: 'Export Markets', value: '50+', unit: 'Countries', icon: Globe },
  { label: 'Experience', value: '30+', unit: 'Years', icon: Factory },
];

const ADVANTAGES = [
  {
    title: 'Certified Quality',
    description: 'Full compliance with ISO 20345, ASTM F2413 & CSA standards.',
    icon: BadgeCheck,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Factory Direct',
    description: 'Direct manufacturing pricing with transparent production process.',
    icon: Factory,
    color: 'bg-accent-50 text-accent-600',
  },
  {
    title: 'Flexible OEM/ODM',
    description: 'Rapid 7-day prototyping and full brand customization service.',
    icon: Users,
    color: 'bg-green-50 text-green-600',
  }
];

export function CompanyCapabilities() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const t = useTranslations('WhyChooseUs');

  return (
    <>
      <section id="capabilities" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Manufacturing Excellence
            </h2>
            <p className="text-slate-600 text-lg">
              Combining craftsmanship with automation to deliver consistent quality globally.
            </p>
          </div>

          {/* Key Stats Bar - Cleaner Horizontal Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center hover:shadow-md transition-shadow">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full text-primary-600 mb-4 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Advantages Grid - Simplified */}
          <div className="grid md:grid-cols-3 gap-8">
            {ADVANTAGES.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-primary-100 hover:shadow-lg transition-all duration-300 group">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${adv.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{adv.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* VR Tour Section - High Impact Visual */}
      <section className="relative h-[400px] bg-slate-900 overflow-hidden group cursor-pointer" onClick={() => setIsVideoOpen(true)}>
        <div className="absolute inset-0 opacity-60 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80')] bg-cover bg-fixed bg-center group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
           <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
               <Play className="w-6 h-6 text-slate-900 ml-1 fill-slate-900" />
             </div>
           </div>
           <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Virtual Factory Tour</h2>
           <p className="text-lg text-white/90 max-w-xl">
             Experience our ISO 9001 certified production lines and testing labs from anywhere.
           </p>
           <span className="mt-8 inline-flex items-center text-sm font-bold text-white border border-white/30 px-6 py-2 rounded-full hover:bg-white hover:text-slate-900 transition-colors">
             Watch Video
           </span>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-fade-in" onClick={(e) => {
            if (e.target === e.currentTarget) setIsVideoOpen(false);
        }}>
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1" 
              title="Factory Tour" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
