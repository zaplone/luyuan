'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Check,
  Truck,
  Layers,
  Activity,
  Ruler,
  Send,
  Loader2,
  ChevronRight,
  Shield,
  Zap,
  Droplets,
  Info,
  Factory,
  FileCheck,
  Globe,
  Clock,
  HelpCircle,
} from 'lucide-react';
import { Product } from '@/types';
import { submitInquiry } from '@/lib/strapi';
import { isValidImageUrl, getSafeImageUrl } from '@/lib/imageUtils';
import { ImageMagnifier } from './ImageMagnifier';
import Link from 'next/link';

interface ProductDetailClientProps {
  product: Product;
  locale: string;
}

// Trust stats (could later come from CMS or env)
const TRUST_STATS = {
  pairsShipped: '2M+',
  countries: '50+',
  responseHours: '24',
};

const KEY_FEATURE_IDS = ['safety', 'comfort', 'durability', 'compliance', 'grip', 'breathability'] as const;
const FAQ_IDS = ['moq', 'samples', 'leadTime', 'certDocs', 'payment', 'audit'] as const;

// Temporary placeholder content when CMS data is empty — for preview until backend is ready (English only)
const PLACEHOLDER = {
  description:
    'Professional safety shoe built for demanding workplaces. Features a steel toe cap meeting EN ISO 20345 impact and compression requirements, breathable lining for all-day comfort, and a dual-density PU outsole for slip and oil resistance (SRC). Ideal for construction, logistics, and general industry. Suitable for OEM and private label. Compliant with CE marking for EU market access.',
  materials: {
    upper: 'Buffalo leather / Synthetic',
    toe_cap: 'Steel' as const,
    midsole: 'Steel Plate' as const,
    outsole: 'Dual density PU',
    lining: 'Textile / Mesh',
  },
  industries: ['Construction', 'Logistics', 'Oil & Gas'] as string[],
  features: ['Steel toe', 'Slip resistant', 'Oil resistant', 'Puncture resistant'],
};

function useProductWithPlaceholders(product: Product) {
  const description = product.description?.trim() || PLACEHOLDER.description;
  const materials = {
    upper: product.materials?.upper || PLACEHOLDER.materials.upper,
    toe_cap: product.materials?.toe_cap || PLACEHOLDER.materials.toe_cap,
    midsole: product.materials?.midsole || PLACEHOLDER.materials.midsole,
    outsole: product.materials?.outsole || PLACEHOLDER.materials.outsole,
    lining: product.materials?.lining || PLACEHOLDER.materials.lining,
  };
  const industries = (product.industries?.length ? product.industries : PLACEHOLDER.industries) as string[];
  const features = (product.features?.length ? product.features : PLACEHOLDER.features) as string[];
  return { ...product, description, materials, industries, features };
}

export function ProductDetailClient({ product, locale }: ProductDetailClientProps) {
  const t = useTranslations('ProductQuickView');
  const tDetail = useTranslations('ProductDetail');
  const tNav = useTranslations('Navigation');

  const p = useProductWithPlaceholders(product);

  const [activeImage, setActiveImage] = useState<string>(
    product.images && product.images.length > 0
      ? getSafeImageUrl(product.images[0])
      : getSafeImageUrl(product.image || '')
  );
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: `I am interested in ${p.name}. Please send me a quote for [Quantity] pairs.`,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const galleryImages: string[] =
    product.images && product.images.length > 0
      ? (product.images.filter(isValidImageUrl) as string[])
      : isValidImageUrl(product.image)
        ? [product.image!]
        : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const success = await submitInquiry({
        ...formData,
        product_name: p.name,
      });
      setSubmitStatus(success ? 'success' : 'error');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const industryKeys = p.industries;
  const hasIndustrySection = industryKeys.length > 0;

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center text-sm text-slate-500">
            <Link href={`/${locale}`} className="hover:text-primary-600 transition-colors">
              {tNav('home')}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href={`/${locale}/products`} className="hover:text-primary-600 transition-colors">
              {tNav('products')}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-slate-900 font-medium truncate max-w-[200px] sm:max-w-md">
              {p.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6 md:mt-10">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-7/12">
            <div className="sticky top-24 space-y-4">
              <div className="relative aspect-square md:aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden border border-slate-100 shadow-sm group">
                {isValidImageUrl(activeImage) ? (
                  <ImageMagnifier src={activeImage} alt={product.name} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <span className="text-sm">No Image Available</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                  {product.is_new && (
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      NEW
                    </span>
                  )}
                  {product.featured && (
                    <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      HOT
                    </span>
                  )}
                </div>
              </div>
              {galleryImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        activeImage === img
                          ? 'border-primary-600 ring-2 ring-primary-600/20'
                          : 'border-transparent hover:border-slate-300'
                      }`}
                    >
                      <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Hero + Description + Specs + Features + CTA */}
          <div className="w-full lg:w-5/12 flex flex-col gap-8">
            {/* 01 — Hero Section: 3-second retention */}
            <section className="border-b border-slate-100 pb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {p.industries?.map((ind) => (
                  <span
                    key={ind}
                    className="text-xs font-bold text-primary-700 bg-primary-50 px-3 py-1 rounded-full uppercase tracking-wide"
                  >
                    {ind}
                  </span>
                ))}
                {product.safety_standard && (
                  <span className="text-xs font-bold text-white bg-slate-900 px-3 py-1 rounded-full">
                    {product.safety_standard}
                  </span>
                )}
                <span className="text-xs font-bold text-slate-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full flex items-center gap-1">
                  <Factory className="w-3 h-3" />
                  {tDetail('hero.oemBadge')}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 leading-tight">
                {p.name}
              </h1>
              <p className="text-slate-600 text-sm mb-4">{tDetail('hero.certTagline')}</p>
              {product.model_code && (
                <div className="text-sm text-slate-500 font-mono flex items-center gap-2">
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-bold text-slate-600">
                    MODEL
                  </span>
                  {product.model_code}
                </div>
              )}
            </section>

            {/* 02 — Product Description (≤150 words) */}
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">{tDetail('descriptionSection.title')}</h2>
              <p className="text-slate-600 leading-relaxed">{p.description}</p>
              <p className="text-slate-500 text-sm mt-3 italic">{tDetail('descriptionSection.factoryLine')}</p>
            </section>

            {/* 03 — Full Specifications */}
            <section className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-1">{tDetail('specs.title')}</h2>
              <p className="text-sm text-slate-500 mb-4">{tDetail('specs.subtitle')}</p>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <dt className="text-slate-500">{tDetail('specs.upper')}</dt>
                <dd className="font-medium text-slate-900">{p.materials.upper}</dd>
                <dt className="text-slate-500">{tDetail('specs.toeCap')}</dt>
                <dd className="font-medium text-slate-900">{p.materials.toe_cap}</dd>
                <dt className="text-slate-500">{tDetail('specs.midsole')}</dt>
                <dd className="font-medium text-slate-900">{p.materials.midsole}</dd>
                <dt className="text-slate-500">{tDetail('specs.outsole')}</dt>
                <dd className="font-medium text-slate-900">{p.materials.outsole}</dd>
                <dt className="text-slate-500">{tDetail('specs.lining')}</dt>
                <dd className="font-medium text-slate-900">{p.materials.lining}</dd>
                <dt className="text-slate-500">{tDetail('specs.safetyLevel')}</dt>
                <dd className="font-medium text-slate-900">{p.safety_standard || 'S1'}</dd>
                <dt className="text-slate-500">{tDetail('specs.weight')}</dt>
                <dd className="font-medium text-slate-900">{tDetail('specs.weightDefault')}</dd>
                <dt className="text-slate-500">{tDetail('specs.testStandard')}</dt>
                <dd className="font-medium text-slate-900">{tDetail('specs.testDefault')}</dd>
                <dt className="text-slate-500">{tDetail('specs.colors')}</dt>
                <dd className="font-medium text-slate-900">{tDetail('specs.colorsDefault')}</dd>
                <dt className="text-slate-500">{tDetail('specs.sizes')}</dt>
                <dd className="font-medium text-slate-900">36–48 (EU)</dd>
              </dl>
            </section>

            {/* 04 — Key Features (4–6) */}
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-4">{tDetail('keyFeatures.title')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {KEY_FEATURE_IDS.map((id) => {
                  const key = tDetail(`keyFeatures.${id}.title`);
                  const d1 = tDetail(`keyFeatures.${id}.desc1`);
                  const d2 = tDetail(`keyFeatures.${id}.desc2`);
                  const icons: Record<string, React.ReactNode> = {
                    safety: <Shield className="w-5 h-5 text-primary-600 flex-shrink-0" />,
                    comfort: <Zap className="w-5 h-5 text-primary-600 flex-shrink-0" />,
                    durability: <Layers className="w-5 h-5 text-primary-600 flex-shrink-0" />,
                    compliance: <FileCheck className="w-5 h-5 text-primary-600 flex-shrink-0" />,
                    grip: <Droplets className="w-5 h-5 text-primary-600 flex-shrink-0" />,
                    breathability: <Activity className="w-5 h-5 text-primary-600 flex-shrink-0" />,
                  };
                  return (
                    <div
                      key={id}
                      className="flex gap-3 p-4 rounded-xl border border-slate-100 bg-white hover:border-primary-100 transition-colors"
                    >
                      <div>{icons[id] ?? <Activity className="w-5 h-5 text-primary-600 flex-shrink-0" />}</div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm mb-1">{key}</h3>
                        <p className="text-slate-600 text-xs leading-relaxed">{d1} {d2}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {p.features.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.features.map((f, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-md"
                    >
                      <Check className="w-3 h-3 text-green-500 mr-1.5" />
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </section>

            {/* 05 — Certifications */}
            <section className="bg-slate-900 text-white rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-1">{tDetail('certifications.title')}</h2>
              <p className="text-slate-300 text-sm mb-4">{tDetail('certifications.subtitle')}</p>
              <ul className="space-y-2 text-sm mb-4">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  {tDetail('certifications.ce')}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  {tDetail('certifications.en20345')}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  {tDetail('certifications.sgs')}
                </li>
              </ul>
              <p className="text-slate-300 text-xs leading-relaxed">{tDetail('certifications.meaning')}</p>
            </section>

            {/* 06 — Industry Applications */}
            {hasIndustrySection && (
              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-1">{tDetail('industryApplications.title')}</h2>
                <p className="text-sm text-slate-500 mb-4">{tDetail('industryApplications.subtitle')}</p>
                <div className="space-y-4">
                  {industryKeys.map((ind) => {
                    try {
                      const pain = tDetail(`industryApplications.${ind}.pain`);
                      const solution = tDetail(`industryApplications.${ind}.solution`);
                      if (!pain || pain.startsWith('industryApplications.') || !solution || solution.startsWith('industryApplications.')) return null;
                      return (
                        <div
                          key={ind}
                          className="p-4 rounded-xl border border-slate-200 bg-slate-50/50"
                        >
                          <h3 className="font-bold text-slate-900 text-sm mb-2">{ind}</h3>
                          <p className="text-slate-600 text-xs mb-1"><span className="text-slate-500">Pain: </span>{pain}</p>
                          <p className="text-slate-700 text-xs"><span className="text-slate-500">Solution: </span>{solution}</p>
                        </div>
                      );
                    } catch {
                      return null;
                    }
                  })}
                </div>
              </section>
            )}

            {/* 07 — OEM / Customization */}
            <section className="rounded-2xl border border-primary-200 bg-primary-50/30 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-1">{tDetail('oem.title')}</h2>
              <p className="text-sm text-slate-600 mb-4">{tDetail('oem.subtitle')}</p>
              <p className="text-slate-700 text-sm mb-4">{tDetail('oem.intro')}</p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary-600 flex-shrink-0" />
                  {tDetail('oem.logo')}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary-600 flex-shrink-0" />
                  {tDetail('oem.color')}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary-600 flex-shrink-0" />
                  {tDetail('oem.material')}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary-600 flex-shrink-0" />
                  {tDetail('oem.packaging')}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary-600 flex-shrink-0" />
                  {tDetail('oem.privateLabel')}
                </li>
              </ul>
            </section>

            {/* 08 — FAQ */}
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary-600" />
                {tDetail('faq.title')}
              </h2>
              <div className="space-y-2">
                {FAQ_IDS.map((id) => {
                  const q = tDetail(`faq.${id}.q`);
                  const a = tDetail(`faq.${id}.a`);
                  const isOpen = openFaq === id;
                  return (
                    <div
                      key={id}
                      className="rounded-xl border border-slate-200 overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : id)}
                        className="w-full text-left px-4 py-3 flex justify-between items-center text-sm font-medium text-slate-900 hover:bg-slate-50"
                      >
                        {q}
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-3 text-sm text-slate-600 border-t border-slate-100 pt-2">
                          {a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 09 — CTA + Trust Signals + Inquiry Form */}
            <section id="inquiry-form" className="scroll-mt-24">
              <h2 className="text-xl font-bold text-slate-900 mb-2">{tDetail('cta.requestQuote')}</h2>
              <p className="text-slate-500 text-sm mb-6">{tDetail('cta.formDesc')}</p>

              {/* Trust signals above form */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-2xl font-bold text-slate-900">{TRUST_STATS.pairsShipped}</div>
                  <div className="text-xs text-slate-500 mt-1">{tDetail('trustSignals.shipped')}</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-2xl font-bold text-slate-900">{TRUST_STATS.countries}</div>
                  <div className="text-xs text-slate-500 mt-1">{tDetail('trustSignals.countries')}</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-1">
                    <Clock className="w-5 h-5" /> {TRUST_STATS.responseHours}h
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{tDetail('trustSignals.response')}</div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-6 md:p-8">
                {submitStatus === 'success' ? (
                  <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1">{t('inquirySent')}</h4>
                    <p className="text-sm text-slate-600">{t('inquiryDesc')}</p>
                    <button
                      type="button"
                      onClick={() => setSubmitStatus('idle')}
                      className="mt-4 text-sm font-bold text-primary-600 hover:text-primary-700"
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">
                          {t('form.name')} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                          placeholder="Name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">
                          {t('form.email')} *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">
                        {t('form.company')}
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                        placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">
                        {t('form.message')} *
                      </label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full h-32 px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm resize-none"
                      />
                    </div>
                    {submitStatus === 'error' && (
                      <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        {t('error')}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-900/10 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {t('sending')}
                        </>
                      ) : (
                        <>
                          {t('send')}
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
