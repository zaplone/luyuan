'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ShieldCheck, Zap, Droplets, Hammer } from 'lucide-react';

const CERTIFICATIONS = [
  { name: 'ISO 9001:2015', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/ISO_9001-2015_Logo.svg' },
  { name: 'CE Certification', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/CE_Logo.svg' },
  { name: 'ASTM International', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/80/ASTM_International_logo.svg' },
  { name: 'CSA Group', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/91/CSA_Group_logo.svg/1200px-CSA_Group_logo.svg.png' },
  { name: 'Intertek', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Intertek_Logo.svg' },
  { name: 'SGS', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/67/SGS_Logo.svg' },
];

export function CertificationsBar() {
  const t = useTranslations('Certifications');

  const standards = [
    {
      code: 'SB / SBP',
      title: t('standards.sb.title'),
      desc: t('standards.sb.desc'),
      icon: Hammer,
      color: 'bg-slate-100 text-slate-600'
    },
    {
      code: 'S1 / S1P',
      title: t('standards.s1.title'),
      desc: t('standards.s1.desc'),
      icon: Zap,
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      code: 'S3',
      title: t('standards.s3.title'),
      desc: t('standards.s3.desc'),
      icon: Droplets,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      code: 'ASTM F2413',
      title: t('standards.astm.title'),
      desc: t('standards.astm.desc'),
      icon: ShieldCheck,
      color: 'bg-red-50 text-red-600'
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4">
        
        {/* Unified Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t('standardsDesc')}
          </p>
        </div>

        {/* Logos Section */}
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500 mb-20">
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.name} className="relative h-14 w-28 md:h-20 md:w-40 hover:scale-110 transition-transform cursor-help group">
              {cert.logo && cert.logo.startsWith('http') ? (
                <Image
                  src={cert.logo}
                  alt={cert.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded text-slate-400 text-xs">
                  {cert.name}
                </div>
              )}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                {cert.name}
              </div>
            </div>
          ))}
        </div>

        {/* Standards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {standards.map((item, idx) => {
             const Icon = item.icon;
             return (
               <div key={idx} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                 <div className="flex items-center justify-between mb-6">
                   <span className={`text-xs font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider ${item.color}`}>
                     {item.code}
                   </span>
                   <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-slate-500 group-hover:text-primary-600 transition-colors" />
                   </div>
                 </div>
                 <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-primary-700 transition-colors">{item.title}</h4>
                 <p className="text-sm text-slate-600 leading-relaxed">
                   {item.desc}
                 </p>
               </div>
             );
           })}
        </div>

      </div>
    </section>
  );
}
