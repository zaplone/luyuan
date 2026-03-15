'use client';

import Image from 'next/image';
import { ArrowRight, Star } from 'lucide-react';

const CASES = [
  {
    id: 1,
    client: 'German Construction Brand',
    title: 'Waterproof S3 Hiker Boot',
    desc: 'Developed a lightweight, metal-free safety boot for the European market. Passed all ISO 20345 tests on the first try.',
    image: '/images/products/composite-shoe.jpg', // Using existing image as placeholder
    stats: ['45 Days Lead Time', '15,000 Pairs/Year', '0.2% Defect Rate'],
    logo: '🇩🇪'
  },
  {
    id: 2,
    client: 'US Logistics Giant',
    title: 'Anti-Fatigue Warehouse Shoe',
    desc: 'Custom-engineered outsole with shock absorption for workers standing 10+ hours. 30% lighter than their previous supplier.',
    image: '/images/products/slip-resistant.jpg',
    stats: ['20% Cost Reduction', 'Comfort Focused', 'Anti-Slip SRC'],
    logo: '🇺🇸'
  },
  {
    id: 3,
    client: 'Australian Mining Corp',
    title: 'Heavy Duty Metatarsal Boot',
    desc: 'Extreme protection boot with internal metatarsal guard and heat-resistant outsole (300°C) for mining environments.',
    image: '/images/products/steel-toe-boot.jpg',
    stats: ['Heavy Duty', 'Heat Resistant', 'Side-Zip Design'],
    logo: '🇦🇺'
  }
];

export function OemCaseStudies() {
  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-primary-600 font-bold tracking-wider uppercase text-sm">Success Stories</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Recent OEM Projects
            </h2>
            <p className="text-slate-600 mt-4 text-lg">
              Don't just take our word for it. See how we've helped global brands bring their footwear concepts to reality.
            </p>
          </div>
          <button className="hidden md:inline-flex items-center font-bold text-slate-900 hover:text-primary-600 transition-colors">
            View All Projects <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        {/* Zig-Zag List */}
        <div className="space-y-20">
          {CASES.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={item.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                
                {/* Image Side (55%) */}
                <div className="w-full lg:w-[55%] relative group">
                  <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-xl bg-slate-200">
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
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                    
                    {/* Badge */}
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-slate-900 shadow-lg flex items-center gap-2">
                      <span className="text-xl">{item.logo}</span> 
                      {item.client}
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className={`absolute -bottom-6 ${isEven ? '-right-6' : '-left-6'} w-24 h-24 bg-accent-500/10 rounded-full blur-2xl -z-10`}></div>
                  <div className={`absolute -top-6 ${isEven ? '-left-6' : '-right-6'} w-32 h-32 bg-primary-500/10 rounded-full blur-2xl -z-10`}></div>
                </div>

                {/* Content Side (45%) */}
                <div className="w-full lg:w-[45%]">
                  <div className="flex items-center gap-2 mb-4">
                     <span className="text-accent-600 font-bold text-sm tracking-wider uppercase">Project {index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                     <div className="h-px w-12 bg-slate-200"></div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {item.stats.map((stat, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-primary-200 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 flex-shrink-0">
                           <Star className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-slate-800 text-sm">{stat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                     <button className="text-slate-900 font-bold hover:text-primary-600 inline-flex items-center group/btn transition-colors">
                        View Project Details 
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                     </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
        
        {/* Mobile CTA */}
        <div className="mt-8 text-center md:hidden">
          <button className="inline-flex items-center font-bold text-slate-900 hover:text-primary-600 transition-colors">
            View All Projects <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
