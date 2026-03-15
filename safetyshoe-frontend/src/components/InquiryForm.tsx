'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
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
  variant?: 'default' | 'simple';
}

export function InquiryForm({ productName, className, variant = 'default' }: InquiryFormProps) {
  const t = useTranslations('InquiryForm');
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
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('success.title')}</h3>
        <p className="text-gray-600 mb-6">
          {t('success.desc')}
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="btn btn-outline"
        >
          {t('success.button')}
        </button>
      </div>
    );
  }

  return (
    <div className={cn('bg-white rounded-lg shadow-soft p-6 md:p-8', className)}>
      {variant === 'default' && (
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {t('defaultTitle')}
          </h3>
          <p className="text-gray-600">
            {t('defaultSubtitle')}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              {t('name')}
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: t('errors.nameRequired') })}
              className={cn(
                'input w-full px-3 py-2',
                errors.name && 'border-red-500 focus:ring-red-500'
              )}
              placeholder={t('placeholders.name')}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {t('email')}
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { 
                required: t('errors.emailRequired'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('errors.emailInvalid')
                }
              })}
              className={cn(
                'input w-full px-3 py-2',
                errors.email && 'border-red-500 focus:ring-red-500'
              )}
              placeholder={t('placeholders.email')}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              {t('phone')}
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone')}
              className="input w-full px-3 py-2"
              placeholder={t('placeholders.phone')}
            />
          </div>

          {variant === 'default' && (
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                {t('company')}
              </label>
              <input
                type="text"
                id="company"
                {...register('company')}
                className="input w-full px-3 py-2"
                placeholder={t('placeholders.company')}
              />
            </div>
          )}
        </div>

        {variant === 'default' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('country')}
                </label>
                <select
                  id="country"
                  {...register('country')}
                  className="select w-full px-3 py-2"
                >
                  <option value="">{t('countries.select')}</option>
                  <option value="US">{t('countries.US')}</option>
                  {/* ... simplified options for brevity in logic ... */}
                  <option value="CA">{t('countries.CA')}</option>
                  <option value="GB">{t('countries.GB')}</option>
                  <option value="DE">{t('countries.DE')}</option>
                  <option value="FR">{t('countries.FR')}</option>
                  <option value="AU">{t('countries.AU')}</option>
                  <option value="JP">{t('countries.JP')}</option>
                  <option value="CN">{t('countries.CN')}</option>
                  <option value="IN">{t('countries.IN')}</option>
                  <option value="BR">{t('countries.BR')}</option>
                  <option value="MX">{t('countries.MX')}</option>
                  <option value="other">{t('countries.other')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('quantity')}
                </label>
                <input
                  type="number"
                  id="quantity"
                  {...register('quantity', { min: 1 })}
                  className="input w-full px-3 py-2"
                  placeholder={t('placeholders.quantity')}
                  min="1"
                />
              </div>
            </div>

            <div>
              <label htmlFor="target_price" className="block text-sm font-medium text-gray-700 mb-1">
                {t('targetPrice')}
              </label>
              <input
                type="number"
                id="target_price"
                {...register('target_price', { min: 0 })}
                className="input w-full px-3 py-2"
                placeholder={t('placeholders.targetPrice')}
                min="0"
                step="0.01"
              />
            </div>
          </>
        )}

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
                {t('submitting')}
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                {t('submit')}
              </>
            )}
          </button>
        </div>

        {/* Privacy Notice */}
        <div className="text-center text-sm text-gray-500">
          <p>
            {t('privacy')}{' '}
            <a href="/privacy" className="text-primary-600 hover:text-primary-700">
              {t('privacyLink')}
            </a>
            {t('privacySuffix')}
          </p>
        </div>
      </form>
    </div>
  );
}
