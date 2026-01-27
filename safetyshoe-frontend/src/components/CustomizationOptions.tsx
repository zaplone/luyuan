'use client';

import { Layers, Scissors, Tag, Package, Palette, Check } from 'lucide-react';

const OPTIONS = [
  {
    title: 'Logo & Branding',
    desc: 'Your brand, front and center. We offer various logo applications.',
    icon: Tag,
    items: ['Embroidery', 'Rubber Patch', 'Screen Print', 'Metal Hardware']
  },
  {
    title: 'Materials & Colors',
    desc: 'Choose from our premium library of leathers and textiles.',
    icon: Palette,
    items: ['Full Grain Leather', 'Suede / Nubuck', 'Microfiber', 'Custom Pantone Colors']
  },
  {
    title: 'Sole Technology',
    desc: 'Select the right outsole for your market\'s terrain.',
    icon: Layers,
    items: ['Dual Density PU', 'Rubber (300°C HRO)', 'TPU', 'ESD Compounds']
  },
  {
    title: 'Packaging',
    desc: 'Retail-ready presentation that stands out on the shelf.',
    icon: Package,
    items: ['Custom Shoe Box', 'Hang Tags', 'User Manuals', 'Silica Gel']
  }
];

export function CustomizationOptions() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Total Customization Freedom
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Don't settle for generic off-the-shelf products. We give you full control over 
              every detail of your safety footwear, ensuring it meets your specific market demands 
              and price points.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {OPTIONS.map((opt, idx) => {
                const Icon = opt.icon;
                return (
                  <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mb-4 text-primary-600">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{opt.title}</h3>
                    <ul className="space-y-2">
                      {opt.items.map((item, i) => (
                        <li key={i} className="flex items-center text-xs text-slate-500">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Visual Exploded View (Placeholder) */}
          <div className="relative">
            {/* Background Shape */}
            <div className="absolute inset-0 bg-slate-200 rounded-full blur-[100px] opacity-50 transform translate-x-10 translate-y-10"></div>
            
            {/* Main Image Container */}
            <div className="relative bg-white rounded-2xl p-4 shadow-2xl border-4 border-white rotate-1 hover:rotate-0 transition-transform duration-500">
               <div className="aspect-[4/3] bg-slate-100 rounded-lg relative overflow-hidden flex items-center justify-center">
                 {/* Replace with actual exploded view image */}
                 <span className="text-slate-400 font-bold text-lg">Exploded Shoe Diagram Placeholder</span>
                 
                 {/* Floating Hotspots (Demo) */}
                 <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent-500 rounded-full shadow-lg ring-4 ring-white animate-pulse cursor-pointer">
                   <div className="absolute left-6 top-0 bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                     Steel Toe Cap
                   </div>
                 </div>
                 <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-accent-500 rounded-full shadow-lg ring-4 ring-white animate-pulse cursor-pointer"></div>
               </div>
               
               <div className="mt-4 flex justify-between items-center text-sm text-slate-500">
                 <span>Schematic View</span>
                 <span className="font-mono">Ref: OEM-2024</span>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

