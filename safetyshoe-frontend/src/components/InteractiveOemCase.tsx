'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { PenTool, Hammer, FlaskConical, Package, Ship, ArrowRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEP_IDS = ['design', 'mold', 'sample', 'test', 'delivery'] as const;
const STEP_ICONS = [PenTool, Hammer, Package, FlaskConical, Ship] as const;
const STEP_IMAGES = [
  '/images/oem/step1.png',
  '/images/oem/step2.png',
  '/images/oem/step3.png',
  '/images/oem/step4.png',
  '/images/oem/step5.png',
];

export function InteractiveOemCase() {
  const t = useTranslations('InteractiveOemCase');
  const [activeStep, setActiveStep] = useState(0);

  const steps = STEP_IDS.map((id, idx) => ({
    id,
    icon: STEP_ICONS[idx],
    image: STEP_IMAGES[idx],
    label: t(`steps.${id}.label`),
    time: t(`steps.${id}.time`),
    title: t(`steps.${id}.title`),
    desc: t(`steps.${id}.desc`),
    quote: t(`steps.${id}.quote`),
  }));
  const currentStep = steps[activeStep];
  const stats = [
    { label: t('stats.devTime'), value: t('stats.devValue') },
    { label: t('stats.defectRate'), value: t('stats.defectValue') },
    { label: t('stats.firstOrder'), value: t('stats.firstValue') },
  ];

  return (
    <section className="py-24 bg-slate-50 text-slate-900 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-600 font-bold tracking-wider uppercase text-sm">{t('badge')}</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-6">
            {t('title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">{t('caseTitle')}</span>
          </h2>
          <p className="text-slate-600 text-lg">
            {t('summary')}
          </p>
        </div>

        {/* Timeline Navigation (Re-styled to match ProcessTimeline) */}
        <div className="relative mb-12 hidden md:block">
           {/* Connecting Line */}
           <div className="absolute top-12 left-0 w-full h-0.5 bg-slate-200 z-0"></div>
           
           <div className="grid grid-cols-5 gap-4 relative z-10">
              {steps.map((step, idx) => {
                 const Icon = step.icon;
                 const isActive = idx === activeStep;
                 return (
                   <button
                     key={step.id}
                     onClick={() => setActiveStep(idx)}
                     className="flex flex-col items-center text-center group focus:outline-none"
                   >
                     {/* Step Number/Icon Bubble */}
                     <div className={cn(
                       "w-24 h-24 rounded-full flex items-center justify-center mb-4 transition-all duration-300 relative border-4",
                       isActive 
                         ? "bg-white border-primary-500 shadow-[0_0_20px_rgba(59,130,246,0.2)] scale-110" 
                         : "bg-white border-slate-200 hover:border-slate-300"
                     )}>
                       <Icon className={cn(
                         "w-8 h-8 transition-colors",
                         isActive ? "text-primary-600" : "text-slate-400 group-hover:text-slate-600"
                       )} />
                       
                       {/* Number Badge */}
                       <div className={cn(
                         "absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-4 border-slate-50 transition-colors",
                         isActive ? "bg-primary-600 text-white" : "bg-slate-200 text-slate-500"
                       )}>
                         {idx + 1}
                       </div>
                     </div>

                     <h3 className={cn("text-lg font-bold mb-1 transition-colors", isActive ? "text-slate-900" : "text-slate-500")}>
                       {step.label}
                     </h3>
                     <div className={cn("text-xs font-bold px-2 py-1 rounded transition-colors", isActive ? "bg-primary-50 text-primary-700" : "bg-slate-100 text-slate-500")}>
                       {step.time}
                     </div>
                   </button>
                 );
              })}
           </div>
        </div>

        {/* Mobile Navigation (Simple Dots) */}
        <div className="flex md:hidden justify-center gap-2 mb-8">
           {steps.map((_, idx) => (
             <button
               key={idx}
               onClick={() => setActiveStep(idx)}
               className={cn(
                 "w-3 h-3 rounded-full transition-all",
                 idx === activeStep ? "bg-primary-600 w-8" : "bg-slate-300"
               )}
             />
           ))}
           <div className="text-center text-primary-600 text-sm font-bold ml-2 py-0.5">
             {t('stepOf', { n: activeStep + 1 })}: {currentStep.label}
           </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-xl relative min-h-[500px]">
          <div className="grid lg:grid-cols-2 h-full">
            
            {/* Left: Image (Animated) */}
            <div className="relative h-[300px] lg:h-auto overflow-hidden group bg-slate-100">
              {steps.map((step, idx) => (
                <div 
                  key={step.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-500 ease-in-out",
                    idx === activeStep ? "opacity-100 z-10" : "opacity-0 z-0"
                  )}
                >
                  {step.image && (step.image.startsWith('http') || step.image.startsWith('/')) ? (
                   <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-[3000ms] ease-out scale-100 group-hover:scale-110"
                  />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <span className="text-sm">Image Loading...</span>
                    </div>
                  )}
                  {/* Overlay - Lighter gradient for white theme */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10"></div>
                </div>
              ))}
              
              {/* Badge */}
              <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-sm font-bold text-slate-900 shadow-lg">
                {t('stepOf', { n: activeStep + 1 })}
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center relative z-10">
              
              {/* Animated Text Container */}
              <div key={activeStep} className="animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6 text-primary-600">
                  <div className="p-2 bg-primary-50 rounded-lg">
                    {(() => {
                      const Icon = currentStep.icon;
                      return <Icon className="w-6 h-6" />;
                    })()}
                  </div>
                  <span className="font-bold tracking-wider text-sm uppercase">{t('phase', { n: activeStep + 1 })}</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                  {currentStep.title}
                </h3>
                
                <p className="text-slate-600 text-lg leading-relaxed mb-8 border-l-2 border-slate-200 pl-6">
                  {currentStep.desc}
                </p>

                {/* Client Quote Box */}
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 relative">
                  <Quote className="w-8 h-8 text-slate-300 absolute -top-4 -left-2 fill-slate-200" />
                  <p className="text-slate-600 italic text-sm relative z-10">
                    "{currentStep.quote}"
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                    <span className="text-xs font-bold text-slate-500">{t('clientFeedback')}</span>
                  </div>
                </div>

                {/* Navigation Buttons (Bottom) */}
                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-slate-100">
                  <button 
                    onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                    className="flex items-center text-slate-900 font-bold hover:text-primary-600 transition-colors"
                  >
                    {t('nextPhase')} <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 text-center border border-slate-100 shadow-sm">
              <div className="text-slate-500 text-sm uppercase tracking-wider mb-2">{stat.label}</div>
              <div className="text-2xl md:text-3xl font-bold text-slate-900">{stat.value}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
