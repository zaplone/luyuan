'use client';

import { MessageSquare, PenTool, Hammer, CheckCircle2, Ship, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    title: 'Consultation',
    desc: 'Share your requirements, sketches, or reference samples. We discuss materials, standards, and budget.',
    icon: MessageSquare,
    time: 'Day 1'
  },
  {
    id: 2,
    title: 'Design & CAD',
    desc: 'Our R&D team creates technical drawings and selects material swatches for your approval.',
    icon: PenTool,
    time: 'Day 2-3'
  },
  {
    id: 3,
    title: 'Prototyping',
    desc: 'We produce a physical sample. You test the fit, look, and quality. We revise until perfect.',
    icon: Hammer,
    time: 'Day 7-10'
  },
  {
    id: 4,
    title: 'Mass Production',
    desc: 'Production begins in our ISO facility. QC checks are performed at every stage (cutting, stitching, lasting).',
    icon: CheckCircle2,
    time: 'Day 30-45'
  },
  {
    id: 5,
    title: 'Global Delivery',
    desc: 'We handle packaging, customs documentation, and shipping (FOB/CIF) to your warehouse.',
    icon: Ship,
    time: 'Arrival'
  }
];

export function ProcessTimeline() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-600 font-bold tracking-wider uppercase text-sm">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
            From Concept to Container
          </h2>
          <p className="text-slate-600">
            A streamlined 5-step process designed to get your products to market faster.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex flex-col items-center text-center group">
                  
                  {/* Step Number Badge */}
                  <div className="w-24 h-24 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:border-primary-500 group-hover:shadow-md transition-all relative">
                    <div className="bg-slate-50 p-4 rounded-full group-hover:bg-primary-50 transition-colors">
                      <Icon className="w-8 h-8 text-slate-400 group-hover:text-primary-600 transition-colors" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-white">
                      {step.id}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded mb-3">
                    {step.time}
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center text-primary-600 font-bold hover:text-primary-700 hover:underline">
            View Detailed Production Schedule <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}

