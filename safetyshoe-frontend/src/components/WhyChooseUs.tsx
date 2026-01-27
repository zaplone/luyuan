import { Shield, Award, Truck, Users, Clock, Globe } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Certified Safety Standards',
    description: 'All our products meet ANSI Z41, ASTM F2413-18, and CE EN ISO 20345 standards. Your workers\' safety is our top priority.',
    stats: '100% Certified',
  },
  {
    icon: Award,
    title: 'Premium Quality Materials',
    description: 'We use only the finest leather, composite materials, and advanced sole technologies for maximum durability and comfort.',
    stats: '5-Year Warranty',
  },
  {
    icon: Truck,
    title: 'Global Shipping Network',
    description: 'Fast, reliable delivery to over 50 countries. Express shipping available for urgent orders with tracking included.',
    stats: '50+ Countries',
  },
  {
    icon: Users,
    title: 'OEM Manufacturing',
    description: 'Custom solutions for large orders. Private labeling, custom colors, and specialized requirements available.',
    stats: '10K+ MOQ',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'Quick production times without compromising quality. Standard orders ship within 7-14 business days.',
    stats: '7-14 Days',
  },
  {
    icon: Globe,
    title: 'Worldwide Support',
    description: '24/7 customer support in multiple languages. Technical assistance and product guidance available.',
    stats: '24/7 Support',
  },
];

const testimonials = [
  {
    name: 'Michael Rodriguez',
    company: 'Construction Solutions Inc.',
    content: 'SafeStep boots have been our go-to choice for over 3 years. The quality is exceptional and our workers love the comfort.',
    rating: 5,
  },
  {
    name: 'Sarah Chen',
    company: 'Industrial Safety Corp.',
    content: 'Outstanding customer service and fast delivery. The custom OEM solution they provided exceeded our expectations.',
    rating: 5,
  },
  {
    name: 'David Thompson',
    company: 'Manufacturing Works',
    content: 'Best safety footwear we\'ve used. The slip-resistant technology has significantly reduced workplace accidents.',
    rating: 5,
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose SafeStep?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            With over 15 years of experience in safety footwear manufacturing, we've built a reputation 
            for quality, reliability, and innovation that industrial companies trust worldwide.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group text-center p-6 rounded-lg hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6 group-hover:bg-primary-600 transition-colors">
                  <Icon className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                <div className="inline-block bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {feature.stats}
                </div>
              </div>
            );
          })}
        </div>

        {/* Statistics Section */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h3>
            <p className="text-lg text-gray-600">
              Our numbers speak for themselves
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">500K+</div>
              <div className="text-gray-600">Pairs Sold</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">99%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h3>
          <p className="text-lg text-gray-600">
            Don't just take our word for it
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-soft p-6 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-gray-600 mb-4 italic">
                "{testimonial.content}"
              </blockquote>
              <div className="border-t border-gray-100 pt-4">
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
