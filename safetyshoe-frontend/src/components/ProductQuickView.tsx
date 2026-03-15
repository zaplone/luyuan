import { X, Check, Truck, Layers, Activity, Ruler, ChevronLeft, Send, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { submitInquiry } from '@/lib/strapi';
import { ImageMagnifier } from './ImageMagnifier';
import { useTranslations, useLocale } from 'next-intl';
import { Product } from '@/types';
import { isValidImageUrl, getSafeImageUrl } from '@/lib/imageUtils';

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  const t = useTranslations('ProductQuickView');
  const locale = useLocale();
  const [activeImage, setActiveImage] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset state when opening
      setShowForm(false);
      setSubmitStatus('idle');
      setFormData({ name: '', email: '', company: '', message: '' });
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset active image when product changes
  useEffect(() => {
    if (product) {
      // Set initial image (use first from gallery or main image)
      const initialImage = (product.images && product.images.length > 0) 
        ? product.images[0] 
        : product.image;
      
      // 使用安全的图片 URL
      setActiveImage(getSafeImageUrl(initialImage));
      
      setFormData(prev => ({
        ...prev,
        message: `I am interested in ${product.name}. Please send me a quote for [Quantity] pairs.`
      }));
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setIsSubmitting(true);
    try {
      const success = await submitInquiry({
        ...formData,
        product_name: product.name
      });
      
      if (success) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !product) return null;

  // Ensure we have a valid list of images
  const galleryImages: string[] = product.images && product.images.length > 0 
    ? product.images.filter(isValidImageUrl) as string[]
    : (isValidImageUrl(product.image) ? [product.image!] : []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content - 移动端：上图下文；桌面端：左图右文 */}
      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh] max-h-[90vh] animate-scale-in">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 z-20 p-2 bg-white/90 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-900 shadow-sm"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Left / Top: Image Gallery - 移动端显示在上方，桌面端左侧 */}
        <div className="w-full md:w-7/12 bg-slate-100 relative h-48 sm:h-56 md:h-full flex-shrink-0 md:min-h-0 group">
          {isValidImageUrl(activeImage) ? (
            <ImageMagnifier
              src={activeImage}
              alt={product.name}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              <span className="text-sm">No Image Available</span>
            </div>
          )}
          
          {/* Thumbnails - 移动端在图片下方横排，桌面端叠在图片底部 */}
          {galleryImages.length > 1 && (
            <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4 flex gap-1.5 md:gap-2 overflow-x-auto pb-1 md:pb-2 z-10">
              {galleryImages.map((img, i) => (
                <button 
                  key={i} 
                  onClick={(e) => { e.stopPropagation(); setActiveImage(img); }}
                  className={`relative w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 shadow-sm ${
                    activeImage === img ? 'border-primary-500 ring-2 ring-primary-500/50' : 'border-white hover:border-primary-300'
                  }`}
                >
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right / Bottom: Product Details or Inquiry Form - 移动端可滚动 */}
        <div className="w-full md:w-5/12 p-4 sm:p-6 md:p-8 overflow-y-auto bg-white flex flex-col flex-1 min-h-0 relative">
          
          {/* View Mode: Product Details */}
          {!showForm && (
            <>
              {/* Header - 移动端更紧凑 */}
              <div className="mb-4 md:mb-6">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 md:mb-3">
                  {product.industries?.slice(0, 2).map((ind) => (
                    <span key={ind} className="text-[10px] sm:text-xs font-bold text-primary-700 bg-primary-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full uppercase tracking-wide">
                      {ind}
                    </span>
                  ))}
                  {product.style && (
                    <span className="text-[10px] sm:text-xs font-bold text-slate-600 bg-slate-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border border-slate-200">
                      {product.style}
                    </span>
                  )}
                  {product.safety_standard && (
                    <span className="text-[10px] sm:text-xs font-medium text-white bg-slate-800 border border-slate-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                      {product.safety_standard}
                    </span>
                  )}
                  {product.additional_certs?.slice(0, 2).map((cert) => (
                    <span key={cert} className="text-[10px] sm:text-xs font-medium text-slate-500 border border-slate-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                      {cert}
                    </span>
                  ))}
                </div>

                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-slate-900 mb-1 md:mb-2 leading-tight">{product.name}</h2>
                {product.model_code && (
                   <div className="text-xs sm:text-sm text-slate-500 font-mono mb-1 md:mb-2">Model: {product.model_code}</div>
                )}
              </div>

              {/* Material Specs (NEW STRUCTURE) - 移动端略收紧 */}
              {product.materials && (
                <div className="mb-4 md:mb-6 p-3 sm:p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4" /> {t('materialSpecs')}
                  </h3>
                  <div className="space-y-2">
                    {product.materials.upper && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">{t('upper')}</span>
                        <span className="font-semibold text-slate-900">{product.materials.upper}</span>
                      </div>
                    )}
                    {product.materials.toe_cap && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">{t('toeCap')}</span>
                        <span className="font-semibold text-slate-900">{product.materials.toe_cap}</span>
                      </div>
                    )}
                    {product.materials.midsole && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">{t('midsole')}</span>
                        <span className="font-semibold text-slate-900">{product.materials.midsole}</span>
                      </div>
                    )}
                    {product.materials.outsole && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">{t('outsole')}</span>
                        <span className="font-semibold text-slate-900">{product.materials.outsole}</span>
                      </div>
                    )}
                    {product.materials.lining && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">{t('lining')}</span>
                        <span className="font-semibold text-slate-900">{product.materials.lining}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="mb-4 md:mb-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> {t('features')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.features?.map((feature, idx) => (
                    <span key={idx} className="inline-flex items-center text-xs font-medium text-slate-700 bg-white border border-slate-200 px-2 py-1.5 rounded-md shadow-sm">
                      <Check className="w-3 h-3 text-green-500 mr-1.5" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-auto pt-6 border-t border-slate-100">
                 <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-2">
                       <Truck className="w-4 h-4" />
                       <span>{t('moq')}: <strong className="text-slate-900">{product.moq || 'Negotiable'}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Ruler className="w-4 h-4" />
                       <span>{t('sizes')}: 36-48 (EU)</span>
                    </div>
                 </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => setShowForm(true)}
                    className="w-full sm:flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-slate-900/10 transition-all hover:translate-y-[-2px] active:translate-y-0 flex items-center justify-center gap-2"
                  >
                    {t('requestQuote')}
                    <Send className="w-4 h-4" />
                  </button>
                  
                  <Link 
                    href={`/${locale}/products/${product.slug}/`}
                    prefetch={true}
                    className="w-full sm:flex-1 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-slate-50"
                    onClick={() => {
                      onClose();
                      window.scrollTo(0, 0);
                    }}
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* Form Mode: Inquiry Form */}
          {showForm && (
            <div className="h-full flex flex-col animate-fade-in">
              <div className="mb-6">
                <button 
                  onClick={() => setShowForm(false)}
                  className="flex items-center text-sm text-slate-500 hover:text-slate-900 mb-4 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  {t('back')}
                </button>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">{t('formTitle')}</h2>
                <p className="text-slate-600 text-sm">{t('formDesc')}</p>
              </div>

              {submitStatus === 'success' ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-green-50 rounded-2xl border border-green-100">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{t('inquirySent')}</h3>
                  <p className="text-slate-600 mb-6">
                    {t('inquiryDesc')}
                  </p>
                  <button 
                    onClick={onClose}
                    className="px-6 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    {t('closeWindow')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">{t('form.name')} *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">{t('form.email')} *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">{t('form.company')}</label>
                    <input 
                      type="text" 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                      placeholder="Your Company Ltd."
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">{t('form.message')} *</label>
                    <textarea 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full h-full min-h-[120px] px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                      {t('error')}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-auto"
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
          )}

        </div>
      </div>
    </div>
  );
}
