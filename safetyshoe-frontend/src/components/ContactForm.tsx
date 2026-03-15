'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { inquiriesApi } from '@/lib/api';
import { cn } from '@/lib/utils';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }
      
      setIsSubmitted(true);
      reset();
      toast.success('Message sent successfully! We\'ll get back to you soon.');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for contacting us. We'll review your message and get back to you 
              within 24 hours during business days.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn btn-outline"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600">
              Ready to discuss your safety footwear needs? Our team of experts is here to help 
              you find the perfect solution for your business.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-soft p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className={cn(
                      'input w-full',
                      errors.name && 'border-red-500 focus:ring-red-500'
                    )}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className={cn(
                      'input w-full',
                      errors.email && 'border-red-500 focus:ring-red-500'
                    )}
                    placeholder="your.email@company.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone and Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    className="input w-full"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    {...register('company')}
                    className="input w-full"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  {...register('subject', { required: 'Subject is required' })}
                  className={cn(
                    'select w-full',
                    errors.subject && 'border-red-500 focus:ring-red-500'
                  )}
                >
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Product Information">Product Information</option>
                  <option value="Custom Manufacturing">Custom Manufacturing</option>
                  <option value="OEM Services">OEM Services</option>
                  <option value="Pricing Quote">Pricing Quote</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message', { 
                    required: 'Message is required',
                    minLength: {
                      value: 10,
                      message: 'Message must be at least 10 characters'
                    }
                  })}
                  className={cn(
                    'textarea w-full',
                    errors.message && 'border-red-500 focus:ring-red-500'
                  )}
                  placeholder="Please provide details about your inquiry, requirements, or questions..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    'btn btn-primary btn-lg inline-flex items-center',
                    isSubmitting && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading h-4 w-4 mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </div>

              {/* Privacy Notice */}
              <div className="text-center text-sm text-gray-500">
                <p>
                  By submitting this form, you agree to our{' '}
                  <a href="/privacy" className="text-primary-600 hover:text-primary-700">
                    Privacy Policy
                  </a>
                  . We'll use your information to respond to your inquiry and may contact you 
                  about our products and services.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}