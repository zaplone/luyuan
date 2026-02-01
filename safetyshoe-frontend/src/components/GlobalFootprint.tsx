'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight, Globe, ShieldCheck, Truck, ThermometerSun } from 'lucide-react';

export function GlobalFootprint() {
  const t = useTranslations('GlobalFootprint');

  const cases = [
    {
      id: 'europe',
      region: t('cases.europe.region'),
      title: t('cases.europe.title'),
      desc: t('cases.europe.desc'),
      challenge: t('cases.europe.challenge'),
      solution: t('cases.europe.solution'),
      icon: ShieldCheck,
      image: '/images/products/composite-shoe.jpg', // Placeholder
      stats: t('cases.europe.stats')
    },
    {
      id: 'usa',
      region: t('cases.usa.region'),
      title: t('cases.usa.title'),
      desc: t('cases.usa.desc'),
      challenge: t('cases.usa.challenge'),
      solution: t('cases.usa.solution'),
      icon: Truck,
      image: '/images/products/slip-resistant.jpg', // Placeholder
      stats: t('cases.usa.stats')
    },
    {
      id: 'middleEast',
      region: t('cases.middleEast.region'),
      title: t('cases.middleEast.title'),
      desc: t('cases.middleEast.desc'),
      challenge: t('cases.middleEast.challenge'),
      solution: t('cases.middleEast.solution'),
      icon: ThermometerSun,
      image: '/images/products/steel-toe-boot.jpg', // Placeholder
      stats: t('cases.middleEast.stats')
    }
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Map Decoration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-center bg-no-repeat bg-contain"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold mb-4 border border-blue-100">
            <Globe className="w-3 h-3" />
            <span>{t('badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-lg text-slate-600">
            {t('subtitle')}
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {cases.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                
                {/* Image Area */}
                <div className="h-56 relative overflow-hidden bg-slate-200">
                  {item.image && item.image.startsWith('/') ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <span className="text-sm">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">{item.region}</div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="space-y-4 mb-8 flex-grow">
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-1">Challenge</div>
                      <div className="text-sm text-slate-800">{item.challenge}</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                      <div className="text-xs font-bold text-green-600 uppercase mb-1">Our Solution</div>
                      <div className="text-sm text-slate-800">{item.solution}</div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                     <div className="text-sm font-bold text-slate-900">
                       {item.stats}
                     </div>
                     <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-colors">
                       <Icon className="w-4 h-4" />
                     </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center font-bold text-slate-900 hover:text-primary-600 transition-colors text-lg">
            {t('viewMore')} <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>

      </div>
    </section>
  );
}
