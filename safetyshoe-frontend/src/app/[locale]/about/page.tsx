'use client';

import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import { CompanyCapabilities } from '@/components/CompanyCapabilities';
import { FactoryNews } from '@/components/FactoryNews';
import { FAQAndContact } from '@/components/FAQAndContact';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('About');
  const navT = useTranslations('Navigation');

  return (
    <div className="bg-white min-h-screen">
      
      {/* Page Header */}
      <div className="bg-slate-900 py-16 md:py-24 relative overflow-hidden pt-32">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t('title')}</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            {t('description')}
          </p>
          
          <div className="flex items-center justify-center text-sm text-slate-400">
             <Link href="/" className="hover:text-white flex items-center transition-colors">
               <Home className="w-4 h-4 mr-1" />
               {navT('home')}
             </Link>
             <ChevronRight className="w-4 h-4 mx-2" />
             <span className="text-white font-medium">{navT('about')}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <CompanyCapabilities />
      
      {/* News Section */}
      <FactoryNews />

      {/* Contact Section */}
      <FAQAndContact />

    </div>
  );
}

