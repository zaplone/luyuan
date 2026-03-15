'use client';

import Link from 'next/link';
import { Building2, Zap, Factory, Truck, Snowflake, Heart, ChevronRight, Shield, Award } from 'lucide-react';

const industrySolutions = [
  {
    id: 'construction',
    name: 'Construction & Heavy Industry',
    icon: Building2,
    description: 'Heavy-duty steel toe boots for construction sites and industrial environments',
    productCount: '25+ Products',
    certifications: ['ANSI Z41', 'ASTM F2413-18'],
    features: ['Steel Toe Protection', 'Puncture Resistant', 'Oil Resistant'],
    color: 'bg-orange-500',
    textColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
    href: '/products?industry=construction'
  },
  {
    id: 'electrical',
    name: 'Electrical & Power',
    icon: Zap,
    description: 'Electrical hazard protection boots for electrical work and power industry',
    productCount: '18+ Products',
    certifications: ['Electrical Hazard', 'ASTM F2413-18'],
    features: ['EH Protection', 'Non-Conductive', 'Static Dissipative'],
    color: 'bg-yellow-500',
    textColor: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    href: '/products?industry=electrical'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Assembly',
    icon: Factory,
    description: 'Anti-slip and composite toe shoes for manufacturing and assembly lines',
    productCount: '32+ Products',
    certifications: ['Slip Resistant', 'Composite Toe'],
    features: ['Slip Resistant', 'Lightweight', 'Comfort Fit'],
    color: 'bg-blue-500',
    textColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    href: '/products?industry=manufacturing'
  },
  {
    id: 'logistics',
    name: 'Logistics & Warehousing',
    icon: Truck,
    description: 'Lightweight and comfortable safety shoes for logistics and warehouse operations',
    productCount: '15+ Products',
    certifications: ['Lightweight', 'Comfort'],
    features: ['Lightweight Design', 'All-Day Comfort', 'Quick Lace'],
    color: 'bg-green-500',
    textColor: 'text-green-600',
    bgColor: 'bg-green-50',
    href: '/products?industry=logistics'
  },
  {
    id: 'cold-weather',
    name: 'Cold Weather Operations',
    icon: Snowflake,
    description: 'Insulated safety boots for cold weather construction and outdoor work',
    productCount: '12+ Products',
    certifications: ['Cold Weather', 'Insulated'],
    features: ['400g Insulation', 'Waterproof', 'Steel Toe'],
    color: 'bg-cyan-500',
    textColor: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    href: '/products?industry=cold-weather'
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Medical',
    icon: Heart,
    description: 'Antimicrobial and slip-resistant shoes for healthcare professionals',
    productCount: '8+ Products',
    certifications: ['Antimicrobial', 'Medical Grade'],
    features: ['Antimicrobial', 'Easy Clean', 'Slip Resistant'],
    color: 'bg-pink-500',
    textColor: 'text-pink-600',
    bgColor: 'bg-pink-50',
    href: '/products?industry=healthcare'
  }
];

export function IndustrySolutions() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
        </div>

        {/* Industry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {industrySolutions.map((industry) => {
            const Icon = industry.icon;
            return (
              <Link
                key={industry.id}
                href={industry.href}
                className="group bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
              >
                {/* Header */}
                <div className={`${industry.bgColor} p-6 border-b border-gray-100`}>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`${industry.color} p-3 rounded-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {industry.name}
                      </h3>
                      <p className={`text-sm ${industry.textColor} font-medium`}>
                        {industry.productCount}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {industry.description}
                  </p>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Certifications */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {industry.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                        >
                          <Award className="h-3 w-3 mr-1" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Features</h4>
                    <ul className="space-y-1">
                      {industry.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">View Products</span>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Need Custom Solutions?
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Our OEM services can create custom safety footwear solutions for your specific industry requirements. 
            From design to delivery, we handle everything.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#about"
              className="btn btn-primary btn-lg inline-flex items-center group"
            >
              <Factory className="mr-2 h-5 w-5" />
              OEM Services
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/#contact"
              className="btn btn-outline btn-lg"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
