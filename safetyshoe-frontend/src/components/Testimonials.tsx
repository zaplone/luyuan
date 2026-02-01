'use client';

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: 'Michael Rodriguez',
    company: 'Construction Solutions Inc.',
    position: 'Safety Manager',
    content: 'SafeStep boots have been our go-to choice for over 3 years. The quality is exceptional and our workers love the comfort. We\'ve seen a significant reduction in foot injuries since switching to SafeStep.',
    rating: 5,
    image: '/images/testimonials/michael-rodriguez.jpg',
    location: 'Houston, TX',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    company: 'Industrial Safety Corp.',
    position: 'Procurement Director',
    content: 'Outstanding customer service and fast delivery. The custom OEM solution they provided exceeded our expectations. Their team worked closely with us to develop exactly what we needed.',
    rating: 5,
    image: '/images/testimonials/sarah-chen.jpg',
    location: 'Los Angeles, CA',
  },
  {
    id: 3,
    name: 'David Thompson',
    company: 'Manufacturing Works',
    position: 'Operations Manager',
    content: 'Best safety footwear we\'ve used. The slip-resistant technology has significantly reduced workplace accidents. The boots are comfortable for 12-hour shifts and hold up well in harsh conditions.',
    rating: 5,
    image: '/images/testimonials/david-thompson.jpg',
    location: 'Detroit, MI',
  },
  {
    id: 4,
    name: 'Jennifer Martinez',
    company: 'Energy Solutions Ltd.',
    position: 'Safety Coordinator',
    content: 'The electrical hazard protection is top-notch. Our electricians feel confident and safe wearing SafeStep boots. The quality is consistent across all orders, which is crucial for our operations.',
    rating: 5,
    image: '/images/testimonials/jennifer-martinez.jpg',
    location: 'Phoenix, AZ',
  },
  {
    id: 5,
    name: 'Robert Kim',
    company: 'Global Manufacturing',
    position: 'VP of Operations',
    content: 'We\'ve been working with SafeStep for 5 years now. Their reliability, quality, and customer service are unmatched. They understand our business needs and deliver consistently.',
    rating: 5,
    image: '/images/testimonials/robert-kim.jpg',
    location: 'Chicago, IL',
  },
  {
    id: 6,
    name: 'Amanda Foster',
    company: 'Safety First Industries',
    position: 'Quality Assurance Manager',
    content: 'The certification process was smooth and their documentation is comprehensive. We trust SafeStep for all our safety footwear needs. Their products meet all our compliance requirements.',
    rating: 5,
    image: '/images/testimonials/amanda-foster.jpg',
    location: 'Atlanta, GA',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what industry leaders say about 
            our safety footwear solutions.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-primary-100">
              <Quote className="h-12 w-12" />
            </div>

            {/* Testimonial Content */}
            <div className="text-center">
              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">
                    {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-primary-600 font-medium">
                    {currentTestimonial.position}
                  </p>
                  <p className="text-gray-600">
                    {currentTestimonial.company}
                  </p>
                  <p className="text-sm text-gray-500">
                    {currentTestimonial.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>

              {/* Dots */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={cn(
                      'w-3 h-3 rounded-full transition-colors',
                      index === currentIndex
                        ? 'bg-primary-600'
                        : 'bg-gray-300 hover:bg-gray-400'
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            More Customer Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-lg shadow-soft p-6 hover:shadow-medium transition-shadow"
              >
                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 mb-4 italic">
                  "{testimonial.content}"
                </blockquote>

                {/* Customer Info */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-gray-600">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-primary-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of satisfied customers who trust SafeStep for their safety footwear needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="btn bg-white text-primary-600 hover:bg-gray-100"
              >
                Browse Products
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
