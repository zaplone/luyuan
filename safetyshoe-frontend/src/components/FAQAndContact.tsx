'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, CheckCircle, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function FAQAndContact() {
  const t = useTranslations('FAQ');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Define FAQs using translation keys
  // Assuming keys like 'items.moq.q', 'items.moq.a' etc.
  const FAQ_KEYS = [
    'moq',
    'customization',
    'certifications',
    'samples',
    'payment',
    'leadTime',
    'shipping',
    'visit'
  ] as const;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <section id="faq" className="bg-slate-50 pt-24 pb-0 relative">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-slate-600">
            {t('subtitle')}
          </p>
        </div>

        {/* FAQ Grid (2 Columns) */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-24">
            {FAQ_KEYS.map((key, index) => (
              <div 
                key={key}
                className={`bg-white rounded-xl border transition-all duration-300 h-fit ${
                  openIndex === index ? 'border-primary-500 shadow-md' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                >
                  <span className={`font-semibold pr-4 ${openIndex === index ? 'text-primary-700' : 'text-slate-800'}`}>
                    {t(`items.${key}.q`)}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                    {t(`items.${key}.a`)}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Full Width CTA Banner */}
      <div className="w-full bg-slate-900 text-white py-24 relative overflow-hidden">
            {/* Background Map Graphic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none scale-150">
               <svg width="800" height="800" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                 <path fill="#FFF" d="M45.7,-76.3C58.9,-69.3,69.1,-55.6,76.3,-41.3C83.5,-26.9,87.6,-11.9,86.4,2.5C85.2,16.9,78.7,30.7,69.5,42.6C60.3,54.5,48.4,64.5,35.1,70.8C21.8,77.1,7.1,79.8,-6.4,77.9C-19.9,76,-32.8,69.6,-44.7,61.3C-56.6,53,-67.5,42.8,-74.3,30.2C-81.1,17.6,-83.8,2.6,-81.2,-11.1C-78.6,-24.8,-70.7,-37.2,-60.3,-46.5C-49.9,-55.8,-37,-62,-24.3,-66.2C-11.6,-70.4,0.9,-72.6,13.8,-72.3C26.7,-72,32.5,-83.3,45.7,-76.3Z" transform="translate(100 100)" />
               </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
              <div className="inline-block bg-accent-500/20 text-accent-400 font-bold px-4 py-1.5 rounded-full mb-8 border border-accent-500/20">
                {t('cta.ready')}
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight max-w-4xl">
                {t('cta.title')}
              </h3>
              <p className="text-slate-300 text-xl mb-12 max-w-2xl leading-relaxed">
                {t('cta.desc')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-lg">
                <a 
                  href="mailto:84082280@qq.com"
                  className="flex-1 bg-accent-500 hover:bg-accent-400 text-slate-900 font-bold py-4 px-8 rounded-xl transition-all transform hover:-translate-y-1 shadow-lg shadow-accent-500/20 flex items-center justify-center gap-3 text-lg"
                >
                  <Mail className="w-6 h-6" />
                  {t('cta.email')}
                </a>
                <a 
                  href="https://wa.me/8615610214670"
                  target="_blank"
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-3 text-lg backdrop-blur-sm"
                >
                  <MessageCircle className="w-6 h-6 text-green-400" />
                  {t('cta.whatsapp')}
                </a>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 w-full max-w-3xl flex justify-center gap-8 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                   <CheckCircle className="w-4 h-4 text-accent-500" /> {t('cta.features.noFees')}
                </div>
                <div className="flex items-center gap-2">
                   <CheckCircle className="w-4 h-4 text-accent-500" /> {t('cta.features.nda')}
                </div>
                <div className="flex items-center gap-2">
                   <CheckCircle className="w-4 h-4 text-accent-500" /> {t('cta.features.iso')}
                </div>
              </div>
            </div>
      </div>
    </section>
  );
}