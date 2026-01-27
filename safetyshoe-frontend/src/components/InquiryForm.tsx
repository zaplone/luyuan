'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { inquiriesApi } from '@/lib/api';
import { cn } from '@/lib/utils';

interface InquiryFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  product_name?: string;
  message: string;
  quantity?: number;
  target_price?: number;
}

interface InquiryFormProps {
  productName?: string;
  className?: string;
}

export function InquiryForm({ productName, className }: InquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    defaultValues: {
      product_name: productName || '',
    },
  });

  const onSubmit = async (data: InquiryFormData) => {
    try {
      setIsSubmitting(true);
      await inquiriesApi.submitInquiry(data);
      setIsSubmitted(true);
      reset();
      toast.success('Inquiry submitted successfully! We\'ll get back to you soon.');
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error('Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={cn('text-center py-12', className)}>
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-6">
          Your inquiry has been submitted successfully. Our team will review your request 
          and get back to you within 24 hours.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="btn btn-outline"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className={cn('bg-white rounded-lg shadow-soft p-6 md:p-8', className)}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Get a Quote
        </h3>
        <p className="text-gray-600">
          Tell us about your requirements and we'll provide a customized quote
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <select
              id="country"
              {...register('country')}
              className="select w-full"
            >
              <option value="">Select your country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="AU">Australia</option>
              <option value="JP">Japan</option>
              <option value="CN">China</option>
              <option value="IN">India</option>
              <option value="BR">Brazil</option>
              <option value="MX">Mexico</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
              Quantity Needed
            </label>
            <input
              type="number"
              id="quantity"
              {...register('quantity', { min: 1 })}
              className="input w-full"
              placeholder="e.g., 1000"
              min="1"
            />
          </div>
        </div>

        <div>
          <label htmlFor="target_price" className="block text-sm font-medium text-gray-700 mb-2">
            Target Price Range (USD)
          </label>
          <input
            type="number"
            id="target_price"
            {...register('target_price', { min: 0 })}
            className="input w-full"
            placeholder="e.g., 50-80"
            min="0"
            step="0.01"
          />
        </div>

        {/* Product Name (hidden if provided) */}
        {productName && (
          <input type="hidden" {...register('product_name')} />
        )}

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            rows={4}
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
            placeholder="Please describe your requirements, specifications, delivery timeline, and any other details..."
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
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Submit Inquiry
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
            . We'll use your information to provide you with a quote and may contact you 
            about our products and services.
          </p>
        </div>
      </form>
    </div>
  );
}
