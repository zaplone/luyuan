'use client';

import { useState, useEffect, useRef, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ArrowRight, Search, Globe } from 'lucide-react';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
import { cn } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';

export function Header() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const mouseNearTopRef = useRef(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('products'), href: '/products' },
    { name: t('oem'), href: '/services/oem' },
    { name: t('about'), href: '/about' },
    { name: t('faq'), href: '/faq' },
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'zh', label: '中文' },
    { code: 'ru', label: 'Русский' },
  ];

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node) && isSearchOpen) {
        setTimeout(() => setIsSearchOpen(false), 100);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${locale}/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      // Replace the locale in the pathname
      // e.g. /en/products -> /zh/products
      // Handle root path specially
      const pathSegments = pathname.split('/');
      // pathSegments[0] is empty string
      // pathSegments[1] is the locale
      pathSegments[1] = newLocale;
      const newPath = pathSegments.join('/');
      
      router.replace(newPath);
      setIsLangMenuOpen(false);
    });
  };

  // Check if we are on the homepage or OEM page or About page (which has dark hero)
  // Remove the locale prefix to check the path safely
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
  
  const isDarkHeroPage = 
    pathWithoutLocale === '/' || 
    pathWithoutLocale === '/services/oem' || 
    pathWithoutLocale === '/about';

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);
      // 顶部 80px 内始终显示；向上滑显示；向下滑隐藏；鼠标在顶部区域时显示
      const visible =
        y <= 80 ||
        y < lastScrollYRef.current ||
        mouseNearTopRef.current;
      setIsHeaderVisible(visible);
      lastScrollYRef.current = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nearTop = e.clientY <= 80;
      mouseNearTopRef.current = nearTop;
      if (nearTop) setIsHeaderVisible(true);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const isTransparent = !isScrolled && isDarkHeroPage;

  const headerClass = isTransparent
    ? 'bg-transparent text-white py-5'
    : 'bg-white shadow-md text-slate-900 py-3';

  const navItemColor = isTransparent
    ? 'text-white/80 hover:text-white'
    : 'text-slate-600 hover:text-primary-600';
    
  const navItemActiveColor = isTransparent 
    ? 'text-white font-bold' 
    : 'text-primary-600 font-bold';

  const buttonClass = isTransparent
    ? 'bg-white hover:bg-slate-100 text-slate-900'
    : 'bg-primary-600 hover:bg-primary-700 text-white';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out',
          headerClass
        )}
        style={{
          transform: (isHeaderVisible || isOpen) ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo: Icon + Brand Text */}
            <div className="flex-shrink-0">
              <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
                <div className="flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/images/logo-icon.png"
                    alt="SHENGLEI"
                    width={36}
                    height={36}
                    className="h-8 w-8 object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className={cn(
                    "text-lg font-bold tracking-tight transition-colors",
                    isTransparent ? "text-white" : "text-slate-900"
                  )}>
                    SHENGLEI<sup className="text-[10px] ml-0.5 opacity-80">®</sup>
                  </span>
                  <span className={cn(
                    "text-[11px] font-medium tracking-wide transition-colors",
                    isTransparent ? "text-white/80" : "text-slate-600"
                  )}>
                    Safety Shoes
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={`/${locale}${item.href === '/' ? '' : item.href}`}
                    className={cn(
                      'text-base font-medium transition-colors',
                      pathname === `/${locale}${item.href === '/' ? '' : item.href}` ? navItemActiveColor : navItemColor
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Search, Lang, and CTA */}
            <div className="hidden md:flex items-center gap-4">
              {/* Search Button */}
              <div className="relative">
                {isSearchOpen ? (
                   <form onSubmit={handleSearch} className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
                     <input
                       ref={searchInputRef}
                       type="text"
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       placeholder={t('searchPlaceholder')}
                       className="w-60 px-4 py-2 rounded-full border border-slate-200 shadow-sm text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 animate-in fade-in slide-in-from-right-10 duration-200"
                     />
                     <button 
                       type="button"
                       onClick={() => setIsSearchOpen(false)}
                       className="absolute right-3 text-slate-400 hover:text-slate-600"
                     >
                       <X className="w-4 h-4" />
                     </button>
                   </form>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className={cn(
                      "p-2 rounded-full transition-colors",
                      isTransparent ? "text-white/90 hover:bg-white/10" : "text-slate-500 hover:bg-slate-100 text-slate-600"
                    )}
                    aria-label="Search"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className={cn(
                    "p-2 rounded-full transition-colors flex items-center gap-1",
                    isTransparent ? "text-white/90 hover:bg-white/10" : "text-slate-500 hover:bg-slate-100 text-slate-600"
                  )}
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase">{locale}</span>
                </button>
                
                {isLangMenuOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={cn(
                          "w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors flex items-center justify-between",
                          locale === lang.code ? "text-primary-600 font-bold bg-primary-50" : "text-slate-700"
                        )}
                        disabled={isPending}
                      >
                        {lang.label}
                        {locale === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-primary-600"></div>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-4">
               {/* Mobile Lang Switcher (Simplified) */}
               <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className={cn(
                    "text-sm font-bold uppercase",
                    isTransparent ? "text-white" : "text-slate-900"
                  )}
                >
                  {locale}
                </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "p-2 rounded-md focus:outline-none",
                  isTransparent ? "text-white" : "text-slate-900"
                )}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 py-4 px-4 flex flex-col space-y-4 animate-slide-up">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={`/${locale}${item.href === '/' ? '' : item.href}`}
                  className={cn(
                    'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                    pathname === `/${locale}${item.href === '/' ? '' : item.href}`
                      ? 'bg-slate-50 text-primary-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Language Selection List */}
              <div className="border-t border-slate-100 pt-4 px-4">
                <p className="text-xs font-bold text-slate-400 mb-2 uppercase">Select Language</p>
                <div className="grid grid-cols-3 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        handleLanguageChange(lang.code);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "text-sm py-2 rounded-md border text-center transition-colors",
                        locale === lang.code 
                          ? "border-primary-500 bg-primary-50 text-primary-700 font-bold" 
                          : "border-slate-200 text-slate-600"
                      )}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}
        </nav>
      </header>

      {/* Floating WhatsApp Button */}
      <div className="fixed right-6 bottom-24 z-40">
        <div className="relative group">
          <a
            href="https://wa.me/8615726062996"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-[#25D366]/50"
            aria-label="WhatsApp: +86 157 2606 2996"
          >
            <WhatsAppIcon className="h-7 w-7" />
          </a>
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white text-xs font-medium px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
            WhatsApp: +86 157 2606 2996
            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
          </div>
        </div>
      </div>
    </>
  );
}
