'use client';

import Link from 'next/link';
import { ArrowRight, Check, Zap } from 'lucide-react';
import { CustomizationOptions } from '@/components/CustomizationOptions';
import { FAQAndContact } from '@/components/FAQAndContact';

import { OemCaseStudies } from '@/components/OemCaseStudies';
import { InteractiveOemCase } from '@/components/InteractiveOemCase';

export default function OemServicePage() {
  return (
    <div className="bg-white">
      {/* 1. OEM Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-slate-900 overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 opacity-20">
          {/* Background Image Placeholder */}
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581092921461-eab62e97a782?q=80&w=2070&auto=format&fit=crop')" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/40" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Text Content */}
            <div className="max-w-2xl animate-fade-in-up">
              <div className="inline-block bg-accent-500 text-slate-900 font-bold px-3 py-1 rounded text-sm mb-8">
                OEM & ODM SERVICES
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Your Brand. <br/>
                <span className="text-primary-400">Our Manufacturing.</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Scale your footwear business with a trusted manufacturing partner. 
                We turn your concepts into certified, market-ready products with speed and precision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="#contact"
                  className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-colors inline-flex items-center justify-center shadow-lg hover:-translate-y-1 transform duration-300"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <div className="flex flex-col justify-center gap-2 text-slate-300 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" /> 500 Pairs Low MOQ
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" /> 7-Day Rapid Sampling
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Shoe Anatomy (Visual) */}
            <div className="relative hidden lg:block animate-fade-in delay-200">
               {/* Shoe Image Container */}
               <div className="relative w-full aspect-[4/3] bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 shadow-2xl">
                  {/* Placeholder for Shoe Image - Replace with actual transparent PNG */}
                  <div className="w-full h-full relative bg-[url('/images/products/steel-toe-boot.jpg')] bg-contain bg-no-repeat bg-center mix-blend-lighten opacity-90 grayscale hover:grayscale-0 transition-all duration-500">
                  </div>

                  {/* Hotspot 1: Toe Cap */}
                  <div className="absolute top-[40%] right-[15%] group cursor-pointer">
                    <div className="w-4 h-4 bg-accent-500 rounded-full shadow-[0_0_0_4px_rgba(245,158,11,0.3)] animate-pulse group-hover:animate-none"></div>
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-3 py-2 rounded-lg shadow-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 w-48 z-20">
                      <h4 className="text-accent-600 mb-1 flex items-center"><Zap className="w-3 h-3 mr-1"/> Toe Protection</h4>
                      <p className="text-xs font-normal text-slate-600">Steel / Composite / Nano-carbon customization available.</p>
                    </div>
                    {/* Line */}
                    <div className="absolute right-2 top-2 w-12 h-[1px] bg-accent-500/50 -rotate-45 origin-left"></div>
                  </div>

                  {/* Hotspot 2: Upper Material */}
                  <div className="absolute top-[30%] left-[40%] group cursor-pointer">
                    <div className="w-4 h-4 bg-accent-500 rounded-full shadow-[0_0_0_4px_rgba(245,158,11,0.3)] animate-pulse group-hover:animate-none"></div>
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-3 py-2 rounded-lg shadow-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 w-48 z-20">
                      <h4 className="text-accent-600 mb-1">Upper Material</h4>
                      <p className="text-xs font-normal text-slate-600">Full grain leather, suede, or breathable microfiber mesh.</p>
                    </div>
                  </div>

                  {/* Hotspot 3: Outsole */}
                  <div className="absolute bottom-[15%] left-[50%] group cursor-pointer">
                    <div className="w-4 h-4 bg-accent-500 rounded-full shadow-[0_0_0_4px_rgba(245,158,11,0.3)] animate-pulse group-hover:animate-none"></div>
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-3 py-2 rounded-lg shadow-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 w-48 z-20">
                      <h4 className="text-accent-600 mb-1">Outsole Tech</h4>
                      <p className="text-xs font-normal text-slate-600">Dual-density PU/PU or Rubber. Oil & Slip resistant (SRC).</p>
                    </div>
                  </div>

                  {/* Hotspot 4: Logo Area */}
                  {/*
                  <div className="absolute top-[20%] left-[20%] group cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_0_4px_rgba(255,255,255,0.2)] animate-pulse group-hover:animate-none"></div>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-3 py-2 rounded-lg shadow-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 w-40 z-20 text-right">
                      <h4 className="text-primary-600 mb-1">Your Logo Here</h4>
                      <p className="text-xs font-normal text-slate-600">Embroidery, printing, or rubber patch options.</p>
                    </div>
                  </div>
                  */}

               </div>
               
               {/* New: Customization Montage Overlay */}
               <div className="absolute -bottom-6 -right-6 w-64 bg-white p-4 rounded-xl shadow-2xl animate-fade-in-up border border-slate-100 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-3">
                     <span className="w-2 h-2 rounded-full bg-green-500"></span>
                     <span className="text-xs font-bold text-slate-500 uppercase">Infinite Possibilities</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                     <div className="bg-slate-100 h-16 rounded-lg flex items-center justify-center text-xs text-slate-400 font-medium">Logos</div>
                     <div className="bg-slate-100 h-16 rounded-lg flex items-center justify-center text-xs text-slate-400 font-medium">Materials</div>
                     <div className="bg-slate-100 h-16 rounded-lg flex items-center justify-center text-xs text-slate-400 font-medium">Soles</div>
                     <div className="bg-slate-100 h-16 rounded-lg flex items-center justify-center text-xs text-slate-400 font-medium">Boxes</div>
                  </div>
               </div>

               {/* <p className="text-center text-slate-500 text-xs mt-4">Hover over points to see customization options</p> */}
            </div>

          </div>
        </div>
      </section>

      {/* 2. Interactive Case Study (Replaces Timeline) */}
      <InteractiveOemCase />

      {/* 3. Customization Options */}
      <CustomizationOptions />

      {/* 4. Tiers & Pricing Table (Optional, Simplified) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Flexible Cooperation Models</h2>
            <p className="text-slate-600 mt-2">Choose the level of customization that fits your business stage.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Tier 1 */}
            <div className="border border-slate-200 rounded-xl p-8 hover:border-primary-500 hover:shadow-lg transition-all bg-slate-50">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Private Label</h3>
              <p className="text-sm text-slate-500 mb-6">Best for startups & distributors</p>
              <div className="text-3xl font-bold text-slate-900 mb-6">500 <span className="text-sm font-normal text-slate-500">pairs / style</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm"><Check className="w-4 h-4 text-green-500 mr-2" /> Use our existing molds</li>
                <li className="flex items-center text-sm"><Check className="w-4 h-4 text-green-500 mr-2" /> Custom Logo & Box</li>
                <li className="flex items-center text-sm"><Check className="w-4 h-4 text-green-500 mr-2" /> Standard Materials</li>
              </ul>
              <button className="w-full py-2 border border-slate-300 rounded-lg font-bold hover:bg-white hover:border-primary-500 hover:text-primary-600 transition-colors">Select Plan</button>
            </div>

            {/* Tier 2 (Highlighted) */}
            <div className="border-2 border-primary-500 rounded-xl p-8 shadow-xl bg-white relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Most Popular</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">ODM Customization</h3>
              <p className="text-sm text-slate-500 mb-6">For established brands</p>
              <div className="text-3xl font-bold text-slate-900 mb-6">1,000 <span className="text-sm font-normal text-slate-500">pairs / style</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm"><Check className="w-4 h-4 text-green-500 mr-2" /> Modify Upper Design</li>
                <li className="flex items-center text-sm"><Check className="w-4 h-4 text-green-500 mr-2" /> Custom Materials & Colors</li>
                <li className="flex items-center text-sm"><Check className="w-4 h-4 text-green-500 mr-2" /> Upgraded Insoles</li>
              </ul>
              <button className="w-full py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/30">Get Started</button>
            </div>

            {/* Tier 3 */}
            <div className="border border-slate-200 rounded-xl p-8 hover:border-primary-500 hover:shadow-lg transition-all bg-slate-50">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Full OEM</h3>
              <p className="text-sm text-slate-500 mb-6">For unique market leaders</p>
              <div className="text-3xl font-bold text-slate-900 mb-6">3,000+ <span className="text-sm font-normal text-slate-500">pairs / mold</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm"><Check className="w-4 h-4 text-green-500 mr-2" /> New Outsole Mold</li>
                <li className="flex items-center text-sm"><Check className="w-4 h-4 text-green-500 mr-2" /> Exclusive Design Rights</li>
                <li className="flex items-center text-sm"><Check className="w-4 h-4 text-green-500 mr-2" /> Lab Testing Included</li>
              </ul>
              <button className="w-full py-2 border border-slate-300 rounded-lg font-bold hover:bg-white hover:border-primary-500 hover:text-primary-600 transition-colors">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Contact Section (Reuse existing component) */}
      <FAQAndContact />
    </div>
  );
}
