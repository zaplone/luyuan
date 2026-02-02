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
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent-500 font-bold tracking-wider uppercase text-sm">{t('badge')}</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-6">
            {t('title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-200">{t('caseTitle')}</span>
          </h2>
          <p className="text-slate-400 text-lg">
            {t('summary')}
          </p>
        </div>

        {/* Timeline Navigation (Re-styled to match ProcessTimeline) */}
        <div className="relative mb-12 hidden md:block">
           {/* Connecting Line */}
           <div className="absolute top-12 left-0 w-full h-0.5 bg-slate-700 z-0"></div>
           
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
                         ? "bg-slate-800 border-accent-500 shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-110" 
                         : "bg-slate-900 border-slate-700 hover:border-slate-500"
                     )}>
                       <Icon className={cn(
                         "w-8 h-8 transition-colors",
                         isActive ? "text-accent-500" : "text-slate-500 group-hover:text-slate-300"
                       )} />
                       
                       {/* Number Badge */}
                       <div className={cn(
                         "absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-4 border-slate-900 transition-colors",
                         isActive ? "bg-accent-500 text-slate-900" : "bg-slate-700 text-slate-400"
                       )}>
                         {idx + 1}
                       </div>
                     </div>

                     <h3 className={cn("text-lg font-bold mb-1 transition-colors", isActive ? "text-white" : "text-slate-500")}>
                       {step.label}
                     </h3>
                     <div className={cn("text-xs font-bold px-2 py-1 rounded transition-colors", isActive ? "bg-accent-500/20 text-accent-400" : "bg-slate-800 text-slate-600")}>
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
                 idx === activeStep ? "bg-accent-500 w-8" : "bg-slate-700"
               )}
             />
           ))}
           <div className="text-center text-accent-400 text-sm font-bold ml-2 py-0.5">
             {t('stepOf', { n: activeStep + 1 })}: {currentStep.label}
           </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-slate-900/50 rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl backdrop-blur-md relative min-h-[500px]">
          <div className="grid lg:grid-cols-2 h-full">
            
            {/* Left: Image (Animated) */}
            <div className="relative h-[300px] lg:h-auto overflow-hidden group bg-slate-800">
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
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                      <span className="text-sm">Image Loading...</span>
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900/50"></div>
                </div>
              ))}
              
              {/* Badge */}
              <div className="absolute top-6 left-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-sm font-bold text-white shadow-lg">
                {t('stepOf', { n: activeStep + 1 })}
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center relative z-10">
              
              {/* Animated Text Container */}
              <div key={activeStep} className="animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6 text-accent-400">
                  <div className="p-2 bg-accent-500/10 rounded-lg">
                    {(() => {
                      const Icon = currentStep.icon;
                      return <Icon className="w-6 h-6" />;
                    })()}
                  </div>
                  <span className="font-bold tracking-wider text-sm uppercase">{t('phase', { n: activeStep + 1 })}</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  {currentStep.title}
                </h3>
                
                <p className="text-slate-300 text-lg leading-relaxed mb-8 border-l-2 border-slate-600 pl-6">
                  {currentStep.desc}
                </p>

                {/* Client Quote Box */}
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50 relative">
                  <Quote className="w-8 h-8 text-slate-600 absolute -top-4 -left-2 fill-slate-800" />
                  <p className="text-slate-400 italic text-sm relative z-10">
                    "{currentStep.quote}"
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-700"></div>
                    <span className="text-xs font-bold text-slate-500">{t('clientFeedback')}</span>
                  </div>
                </div>

                {/* Navigation Buttons (Bottom) */}
                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-slate-700/50">
                  <button 
                    onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                    className="flex items-center text-white font-bold hover:text-accent-400 transition-colors"
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
            <div key={idx} className="bg-slate-800 rounded-xl p-6 text-center border border-slate-700">
              <div className="text-slate-400 text-sm uppercase tracking-wider mb-2">{stat.label}</div>
              <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
