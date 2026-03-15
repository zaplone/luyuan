'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');
  const navT = useTranslations('Navigation');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <Link href={`/${locale}`} className="flex items-center space-x-2.5 group">
              <Image
                src="/images/logo-icon.png"
                alt="SHENGLEI"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold tracking-tight">SHENGLEI<sup className="text-[9px] ml-0.5 opacity-80">®</sup></span>
                <span className="text-xs text-slate-400 font-medium">Safety Shoes</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t('about')}
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialIcon Icon={Linkedin} href="#" />
              <SocialIcon Icon={Facebook} href="#" />
              <SocialIcon Icon={Twitter} href="#" />
              <SocialIcon Icon={Instagram} href="#" />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">{t('quickLinks')}</h3>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/" locale={locale}>{navT('home')}</FooterLink>
              <FooterLink href="/products" locale={locale}>{navT('products')}</FooterLink>
              <FooterLink href="/services/oem" locale={locale}>{navT('oem')}</FooterLink>
              <FooterLink href="/about" locale={locale}>{navT('about')}</FooterLink>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">{t('products')}</h3>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/products?category=construction" locale={locale}>{t('productLinks.steelToe')}</FooterLink>
              <FooterLink href="/products?feature=metal-free" locale={locale}>{t('productLinks.composite')}</FooterLink>
              <FooterLink href="/products?feature=slip-resistant" locale={locale}>{t('productLinks.slipResistant')}</FooterLink>
              <FooterLink href="/products?category=heavy-duty" locale={locale}>{t('productLinks.winter')}</FooterLink>
              <FooterLink href="/products" locale={locale}>{t('products')}</FooterLink>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">{t('contact')}</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent-500 mt-0.5 flex-shrink-0" />
                <span>
                  {t.rich('address', {
                    br: () => <br />
                  })}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent-500 flex-shrink-0" />
                <a href="tel:+8615726062996" className="hover:text-white transition-colors">
                  +86 157 2606 2996
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent-500 flex-shrink-0" />
                <a href="mailto:sales@slsafetyshoes.com" className="hover:text-white transition-colors">
                  sales@slsafetyshoes.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-accent-500 flex-shrink-0" />
                <span>{t('hours')}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-slate-950">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p>&copy; {currentYear} Shenglei Safety Shoes. {t('rights')}</p>
              <span className="hidden md:inline text-slate-800">|</span>
              <div className="flex space-x-4">
                <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">{t('privacy')}</Link>
                <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">{t('terms')}</Link>
                <Link href={`/${locale}/sitemap`} className="hover:text-white transition-colors">{t('sitemap')}</Link>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span>{t('designedFor')}</span>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper Components
function FooterLink({ href, locale, children }: { href: string; locale: string; children: React.ReactNode }) {
  // Handle anchor links or absolute links properly
  const finalHref = href.startsWith('http') || href.startsWith('#') 
    ? href 
    : `/${locale}${href === '/' ? '' : href}`;

  return (
    <li>
      <Link href={finalHref} className="text-slate-400 hover:text-white hover:pl-1 transition-all duration-300 flex items-center group">
        <span className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all mr-2">›</span>
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ Icon, href }: { Icon: any; href: string }) {
  return (
    <a 
      href={href} 
      className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-slate-400 hover:bg-primary-600 hover:text-white transition-all duration-300"
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}