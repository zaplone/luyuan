'use client';

import { useState } from 'react';
import { 
  Factory, Shield, Globe, Award, TrendingUp, Clock, Users, CheckCircle2,
  FileCheck, ShieldCheck, BadgeCheck, Download, FileText, Star, X
} from 'lucide-react';

const STATS = [
  { label: 'Monthly Capacity', value: '50,000+', unit: 'Pairs', icon: TrendingUp },
  { label: 'Defect Rate', value: '< 0.02%', unit: 'Grade A', icon: ShieldCheck },
  { label: 'Production Exp', value: '30+', unit: 'Years', icon: Factory },
  { label: 'Export Markets', value: '50+', unit: 'Countries', icon: Globe },
];

const ADVANTAGES = [
  {
    title: 'Certified Quality',
    description: 'Full compliance with international safety standards.',
    points: ['CE EN ISO 20345:2011', 'ASTM F2413-18', 'CSA Z195-14'],
    icon: BadgeCheck,
    color: 'bg-blue-50 text-blue-600',
    borderColor: 'border-blue-100'
  },
  {
    title: 'Factory Direct',
    description: 'Eliminate middlemen costs with direct manufacturing.',
    points: ['Competitive Wholesale Pricing', 'Transparent Production Process', 'Strict QC Control'],
    icon: Factory,
    color: 'bg-accent-50 text-accent-600',
    borderColor: 'border-accent-100'
  },
  {
    title: 'Flexible OEM/ODM',
    description: 'End-to-end customization services for your brand.',
    points: ['Custom Logo & Packaging', 'Material Selection', 'Rapid Prototyping (7 Days)'],
    icon: Users,
    color: 'bg-green-50 text-green-600',
    borderColor: 'border-green-100'
  }
];

export function CompanyCapabilities() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-semibold mb-4">
              Why Choose Zhiyuan
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Manufacturing <span className="text-primary-600">Excellence</span>
            </h2>
            <p className="text-lg text-slate-600">
              We combine decades of craftsmanship with modern automated production 
              to deliver consistent quality for global safety footwear brands.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Data Grid (4 Cols) */}
            <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
                Key Performance Metrics
              </h3>
              
              <div className="grid grid-cols-1 gap-6">
                {STATS.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <div className="bg-slate-100 p-2 rounded-lg">
                          <Icon className="w-5 h-5 text-slate-600" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.unit}</span>
                      </div>
                      <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                      <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200">
                <div className="text-sm text-slate-500 mb-2">Lead Time Efficiency</div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 mb-1">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Fastest: 25 Days</span>
                  <span>Average: 30 Days</span>
                </div>
              </div>
            </div>

            {/* Right Column: Feature Cards + Download Catalog */}
            <div className="lg:col-span-8 flex flex-col gap-8 h-full">
              
              {/* Row 1: Advantages */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ADVANTAGES.map((adv, idx) => {
                  const Icon = adv.icon;
                  return (
                    <div 
                      key={idx} 
                      className={`relative p-6 rounded-2xl border-2 transition-all hover:-translate-y-1 hover:shadow-lg bg-white flex flex-col ${adv.borderColor}`}
                    >
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 flex-shrink-0 ${adv.color}`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{adv.title}</h3>
                      <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                        {adv.description}
                      </p>
                      
                      <ul className="space-y-3 mt-auto">
                        {adv.points.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Row 2: Catalog Download & Testimonial (Filling the blank space) */}
              <div className="grid md:grid-cols-2 gap-6 flex-grow">
                 
                 {/* Catalog Card */}
                 <div className="bg-slate-900 rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden group cursor-pointer">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-slate-800 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-primary-900"></div>
                    <div className="relative z-10">
                      <div className="flex items-center space-x-3 mb-4">
                         <div className="p-2 bg-white/10 rounded-lg">
                           <FileText className="w-6 h-6 text-accent-500" />
                         </div>
                         <span className="text-white font-bold text-sm tracking-wide">BROCHURE</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">2024 Product Catalog</h3>
                      <p className="text-slate-400 text-sm mb-6">Download our complete specifications guide and size chart (PDF, 12MB).</p>
                      <button className="flex items-center text-white font-bold text-sm group-hover:text-accent-500 transition-colors">
                        Download Now <Download className="ml-2 w-4 h-4" />
                      </button>
                    </div>
                 </div>

                 {/* Testimonial Card */}
                 <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col justify-center">
                    <div className="flex space-x-1 text-orange-400 mb-4">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <blockquote className="text-slate-700 font-medium mb-6 italic">
                      "Zhiyuan's consistency in quality is unmatched. We've been sourcing our site boots here for 5 years without a single rejection."
                    </blockquote>
                    <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">
                         JS
                       </div>
                       <div>
                         <div className="text-sm font-bold text-slate-900">John Smith</div>
                         <div className="text-xs text-slate-500">Procurement Manager, UK</div>
                       </div>
                    </div>
                 </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* New Independent VR Tour Section */}
      <section className="relative py-24 bg-slate-900 overflow-hidden group cursor-pointer">
        <div className="absolute inset-0 opacity-40 group-hover:opacity-50 transition-opacity bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80')] bg-cover bg-fixed bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
             <div className="inline-flex items-center space-x-2 bg-accent-500 text-slate-900 px-3 py-1 rounded-full text-xs font-bold mb-4">
                <span className="relative flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-900"></span>
                </span>
                LIVE VIEW
             </div>
             <h2 className="text-4xl font-bold text-white mb-4">See It To Believe It</h2>
             <p className="text-lg text-slate-300">
               Transparency is our policy. Take a virtual walkthrough of our ISO 9001 certified production lines, 
               testing labs, and warehouse facilities anytime, anywhere.
             </p>
          </div>
          
          <button 
            onClick={() => setIsVideoOpen(true)}
            className="flex-shrink-0 px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 transition-all shadow-xl hover:scale-105 flex items-center"
          >
            Start Virtual Tour
            <div className="ml-3 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-slate-900" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </button>
        </div>
      </section>

      {/* Video Modal Overlay */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full h-full flex items-center justify-center">
              {/* Replace src with your actual video URL */}
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1" 
                title="Factory Tour" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
