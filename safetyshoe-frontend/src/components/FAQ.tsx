'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
}

export function FAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/faqs`);
      const data = await response.json();
      setFaqs(data.faqs || []);
    } catch (error) {
      console.error('Failed to load FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our safety footwear, 
            manufacturing process, and business services.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {loading ? (
            <div className="text-center py-8 text-gray-500">
              加载中...
            </div>
          ) : faqs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              暂无FAQ数据
            </div>
          ) : faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg shadow-soft border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300 ease-in-out',
                  openItems.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                )}
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-lg shadow-soft p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our team of safety footwear experts is here to help. 
              Contact us for personalized assistance with your requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn btn-primary"
              >
                Contact Us
              </a>
              <a
                href="mailto:info@safetyshoe.com"
                className="btn btn-outline"
              >
                Email Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
