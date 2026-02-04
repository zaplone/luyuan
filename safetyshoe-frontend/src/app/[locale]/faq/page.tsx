'use client';

import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import { FAQAndContact } from '@/components/FAQAndContact';
import { useTranslations } from 'next-intl';

export default function FAQPage() {
  const navT = useTranslations('Navigation');
  const t = useTranslations('FAQ');

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center text-sm text-slate-500 mb-4">
             <Link href="/" className="hover:text-primary-600 flex items-center transition-colors">
               <Home className="w-4 h-4 mr-1" />
               {navT('home')}
             </Link>
             <ChevronRight className="w-4 h-4 mx-2 text-slate-300" />
             <span className="text-slate-900 font-medium">{navT('faq')}</span>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('title')}</h1>
            <p className="text-slate-600 max-w-2xl">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Main FAQ Content */}
      <div className="bg-slate-50">
         <FAQAndContact />
      </div>

    </div>
  );
}
