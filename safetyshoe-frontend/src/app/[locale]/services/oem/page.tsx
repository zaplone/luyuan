'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, Check, Zap, X } from 'lucide-react';
import { CustomizationOptions } from '@/components/CustomizationOptions';
import { FAQAndContact } from '@/components/FAQAndContact';
import { InteractiveOemCase } from '@/components/InteractiveOemCase';
import { InquiryForm } from '@/components/InquiryForm';

interface OemTier {
  id: string;
  name: string;
  subtitle: string;
  moq: string;
  moqType: string;
  items: string[];
  recommended?: boolean;
}

export default function OemServicePage() {
  const t = useTranslations('OemPage');
  const locale = useLocale();
  const [selectedTier, setSelectedTier] = useState<OemTier | null>(null);

  const TIERS: OemTier[] = [
    {
      id: 'tier1',
      name: t('cooperation.tier1.name'),
      subtitle: t('cooperation.tier1.subtitle'),
      moq: t('cooperation.tier1.moq'),
      moqType: t('cooperation.pairsStyle'),
      items: [
        t('cooperation.tier1.item1'),
        t('cooperation.tier1.item2'),
        t('cooperation.tier1.item3'),
      ]
    },
    {
      id: 'tier2',
      name: t('cooperation.tier2.name'),
      subtitle: t('cooperation.tier2.subtitle'),
      moq: t('cooperation.tier2.moq'),
      moqType: t('cooperation.pairsStyle'),
      recommended: true,
      items: [
        t('cooperation.tier2.item1'),
        t('cooperation.tier2.item2'),
        t('cooperation.tier2.item3'),
      ]
    },
    {
      id: 'tier3',
      name: t('cooperation.tier3.name'),
      subtitle: t('cooperation.tier3.subtitle'),
      moq: t('cooperation.tier3.moq'),
      moqType: t('cooperation.pairsMold'),
      items: [
        t('cooperation.tier3.item1'),
        t('cooperation.tier3.item2'),
        t('cooperation.tier3.item3'),
      ]
    }
  ];

  return (
    <div className="bg-white">
      {/* 1. OEM Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-slate-50 overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full bg-cover bg-center grayscale"
            style={{ backgroundImage: "url('/images/oem/hero-bg.jpg')" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="max-w-2xl animate-fade-in-up">
              <div className="inline-block bg-accent-100 text-accent-700 font-bold px-3 py-1 rounded text-sm mb-8">
                {t('hero.badge')}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                {t('hero.title')} <br/>
                <span className="text-primary-600">{t('hero.titleHighlight')}</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                {t('hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href={`/${locale}/#contact`}
                  className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-colors inline-flex items-center justify-center shadow-lg hover:-translate-y-1 transform duration-300"
                >
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <div className="flex flex-col justify-center gap-2 text-slate-600 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" /> {t('hero.moq')}
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" /> {t('hero.sampling')}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block animate-fade-in delay-200">
               <div className="relative w-full aspect-[4/3] bg-white rounded-2xl border border-slate-200 p-8 shadow-2xl">
                  <div className="w-full h-full relative bg-[url('/images/oem/hero-shoe.jpg')] bg-contain bg-no-repeat bg-center mix-blend-multiply opacity-90 transition-all duration-500">
                  </div>

                  <div className="absolute top-[40%] right-[15%] group cursor-pointer">
                    <div className="w-4 h-4 bg-accent-500 rounded-full shadow-[0_0_0_4px_rgba(245,158,11,0.3)] animate-pulse group-hover:animate-none"></div>
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 w-48 z-20">
                      <h4 className="text-accent-400 mb-1 flex items-center"><Zap className="w-3 h-3 mr-1"/> {t('hotspots.toeProtection')}</h4>
                      <p className="text-xs font-normal text-slate-300">{t('hotspots.toeProtectionDesc')}</p>
                    </div>
                    <div className="absolute right-2 top-2 w-12 h-[1px] bg-accent-500/50 -rotate-45 origin-left"></div>
                  </div>
                  
                  <div className="absolute top-[30%] left-[40%] group cursor-pointer">
                    <div className="w-4 h-4 bg-accent-500 rounded-full shadow-[0_0_0_4px_rgba(245,158,11,0.3)] animate-pulse group-hover:animate-none"></div>
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 w-48 z-20">
                      <h4 className="text-accent-400 mb-1">{t('hotspots.upperMaterial')}</h4>
                      <p className="text-xs font-normal text-slate-300">{t('hotspots.upperMaterialDesc')}</p>
                    </div>
                  </div>

                  <div className="absolute bottom-[15%] left-[50%] group cursor-pointer">
                    <div className="w-4 h-4 bg-accent-500 rounded-full shadow-[0_0_0_4px_rgba(245,158,11,0.3)] animate-pulse group-hover:animate-none"></div>
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 w-48 z-20">
                      <h4 className="text-accent-400 mb-1">{t('hotspots.outsoleTech')}</h4>
                      <p className="text-xs font-normal text-slate-300">{t('hotspots.outsoleTechDesc')}</p>
                    </div>
                  </div>
               </div>
               
               <div className="absolute -bottom-6 -right-6 w-64 bg-white p-4 rounded-xl shadow-xl animate-fade-in-up border border-slate-100 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-3">
                     <span className="w-2 h-2 rounded-full bg-green-500"></span>
                     <span className="text-xs font-bold text-slate-500 uppercase">{t('infinitePossibilities')}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                     <div className="bg-slate-100 h-16 rounded-lg flex items-center justify-center text-xs text-slate-400 font-medium">{t('montage.logos')}</div>
                     <div className="bg-slate-100 h-16 rounded-lg flex items-center justify-center text-xs text-slate-400 font-medium">{t('montage.materials')}</div>
                     <div className="bg-slate-100 h-16 rounded-lg flex items-center justify-center text-xs text-slate-400 font-medium">{t('montage.soles')}</div>
                     <div className="bg-slate-100 h-16 rounded-lg flex items-center justify-center text-xs text-slate-400 font-medium">{t('montage.boxes')}</div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Interactive Case Study (Replaces Timeline) */}
      <InteractiveOemCase />

      {/* 3. Customization Options */}
      <CustomizationOptions />

      {/* 4. Tiers & Pricing Table */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">{t('cooperation.title')}</h2>
            <p className="text-slate-600 mt-2">{t('cooperation.subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {TIERS.map((tier) => (
              <div 
                key={tier.id}
                className={`rounded-xl p-8 transition-all relative flex flex-col ${
                  tier.recommended 
                    ? 'border-2 border-primary-500 shadow-xl bg-white transform md:-translate-y-4 z-10' 
                    : 'border border-slate-200 hover:border-primary-500 hover:shadow-lg bg-slate-50'
                }`}
              >
                {tier.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    {t('cooperation.tier2.badge')}
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">{tier.name}</h3>
                <p className="text-sm text-slate-500 mb-6">{tier.subtitle}</p>
                
                <div className="text-3xl font-bold text-slate-900 mb-6">
                  {tier.moq} <span className="text-sm font-normal text-slate-500">{tier.moqType}</span>
                </div>
                
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" /> 
                      {item}
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => setSelectedTier(tier)}
                  className={`w-full py-3 rounded-lg font-bold transition-colors shadow-lg ${
                    tier.recommended
                      ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-primary-600/30'
                      : 'border border-slate-300 hover:bg-white hover:border-primary-500 hover:text-primary-600'
                  }`}
                >
                  {t(`cooperation.${tier.id}.button`)}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      {selectedTier && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedTier(null)}
          />
          <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            <button 
              onClick={() => setSelectedTier(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-900"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left: Plan Details */}
            <div className="w-full md:w-5/12 bg-slate-900 p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-800 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold mb-2">{selectedTier.name}</h3>
                  <p className="text-slate-400 text-lg">{selectedTier.subtitle}</p>
                </div>
                
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 mb-8 backdrop-blur-sm">
                  <div className="text-sm text-slate-400 mb-1">{t('modal.moqLabel')}</div>
                  <div className="text-3xl font-bold text-white">
                    {selectedTier.moq} <span className="text-sm font-normal text-slate-400">{selectedTier.moqType}</span>
                  </div>
                </div>

                <ul className="space-y-4">
                  {selectedTier.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-slate-300">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3 flex-shrink-0 mt-[-2px]">
                        <Check className="w-3.5 h-3.5 text-green-500" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Inquiry Form */}
            <div className="w-full md:w-7/12 p-6 md:p-8 overflow-y-auto bg-white flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('modal.title')}</h3>
                <p className="text-slate-500 mb-6 text-sm">{t('modal.subtitle')}</p>
                <InquiryForm 
                  productName={`OEM Plan: ${selectedTier.name}`} 
                  className="shadow-none p-0"
                  variant="simple"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Contact Section (Reuse existing component) */}
      <FAQAndContact />
    </div>
  );
}
