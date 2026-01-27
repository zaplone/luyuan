'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Mail, Phone, Clock, Send, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock FAQs
const FAQS = [
  {
    question: "What is your Minimum Order Quantity (MOQ)?",
    answer: "Our standard MOQ is 500 pairs per style/color. However, for first-time trial orders, we can accept smaller quantities (e.g., 200 pairs) to help you test the market."
  },
  {
    question: "Can I customize the logo and packaging?",
    answer: "Yes, we offer full OEM/ODM services. You can customize the shoe logo (embossing, label, print), box design, and even the outsole mold."
  },
  {
    question: "What safety certifications do you have?",
    answer: "Our products are certified by CE (EN ISO 20345), ASTM F2413-18, and CSA Z195. We can provide test reports from Intertek or SGS upon request."
  },
  {
    question: "What is the lead time for production?",
    answer: "Sample lead time is 7-10 days. Mass production typically takes 30-45 days after deposit and sample confirmation, depending on the order volume."
  },
  {
    question: "Do you offer shipping assistance?",
    answer: "Yes, we can arrange FOB, CIF, or DDP shipping terms. We work with reliable freight forwarders to deliver goods to your designated port or warehouse."
  }
];

export function FAQAndContact() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <section id="contact" className="bg-slate-50 py-24 relative">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-slate-50 z-0" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white z-0" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Have Questions? We're Here to Help.
          </h2>
          <p className="text-lg text-slate-600">
            Whether you need a custom quote or technical advice, our expert team is ready to assist.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: FAQ Accordion (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm mr-3">FAQ</span>
              Common Inquiries
            </h3>
            {FAQS.map((faq, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl border transition-all duration-300 ${
                  openIndex === index ? 'border-primary-500 shadow-md' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                >
                  <span className={`font-semibold ${openIndex === index ? 'text-primary-700' : 'text-slate-800'}`}>
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-primary-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Contact Card (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden">
            {/* Background Map Graphic (Optional) */}
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
               <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                 <path fill="#FFF" d="M45.7,-76.3C58.9,-69.3,69.1,-55.6,76.3,-41.3C83.5,-26.9,87.6,-11.9,86.4,2.5C85.2,16.9,78.7,30.7,69.5,42.6C60.3,54.5,48.4,64.5,35.1,70.8C21.8,77.1,7.1,79.8,-6.4,77.9C-19.9,76,-32.8,69.6,-44.7,61.3C-56.6,53,-67.5,42.8,-74.3,30.2C-81.1,17.6,-83.8,2.6,-81.2,-11.1C-78.6,-24.8,-70.7,-37.2,-60.3,-46.5C-49.9,-55.8,-37,-62,-24.3,-66.2C-11.6,-70.4,0.9,-72.6,13.8,-72.3C26.7,-72,32.5,-83.3,45.7,-76.3Z" transform="translate(100 100)" />
               </svg>
            </div>

            <div className="grid md:grid-cols-2 gap-12 relative z-10">
              
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Get In Touch</h3>
                  <p className="text-slate-400 text-sm">Fill out the form and our team will get back to you within 24 hours.</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-white/10 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-accent-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white mb-1">Factory Location</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        No. 128, Industrial Park Road, <br/>
                        Gaomi City, Shandong Province, China
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-white/10 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-accent-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white mb-1">Email Us</h4>
                      <p className="text-slate-400 text-sm">
                        sales@dengtaishoes.com <br/>
                        support@dengtaishoes.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-white/10 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-accent-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white mb-1">Call Us</h4>
                      <p className="text-slate-400 text-sm">
                        +86 138 0000 0000 (Global) <br/>
                        Mon-Sat 8:00am - 6:00pm
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-xl">
                {isSent ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                    <p className="text-slate-500 text-sm mb-6">We'll be in touch shortly.</p>
                    <button 
                      onClick={() => setIsSent(false)}
                      className="text-primary-600 font-bold hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Name</label>
                      <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" placeholder="Your Name" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label>
                      <input type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" placeholder="name@company.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Message</label>
                      <textarea required rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" placeholder="I'm interested in..." />
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-accent-500 hover:bg-accent-600 text-slate-900 font-bold py-3 rounded-lg transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
