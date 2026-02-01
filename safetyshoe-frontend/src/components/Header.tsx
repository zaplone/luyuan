'use client';

import { useState, useEffect, useRef, useTransition } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, MessageCircle, Mail, Phone, ArrowRight, Search, MessageSquare, Globe } from 'lucide-react';
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

  const logoColor = isTransparent ? 'text-white' : 'text-slate-900';
  
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
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href={`/${locale}`} className="flex items-center space-x-2 group">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                  isTransparent ? "bg-white text-slate-900" : "bg-primary-600 text-white"
                )}>
                  <span className="font-bold text-xl">L</span>
                </div>
                <span className={cn("text-xl font-bold transition-colors", logoColor)}>
                  Luyuan
                </span>
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

      {/* Floating Contact Buttons (Optimized) */}
      <div className="fixed right-6 bottom-8 z-40 flex flex-col space-y-4">
        {[
          { icon: MessageSquare, label: 'WhatsApp: +86 156 1021 4670', color: 'bg-[#25D366]', href: 'https://wa.me/8615610214670' },
          { icon: Mail, label: '84082280@qq.com', color: 'bg-blue-500', href: 'mailto:84082280@qq.com' },
          { icon: Phone, label: '+86 156 1021 4670', color: 'bg-accent-500', href: 'tel:+8615610214670' },
        ].map((item, idx) => {
           const Icon = item.icon;
           return (
             <div key={idx} className="relative group">
                <a
                  href={item.href}
                  className={`${item.color} w-12 h-12 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300`}
                >
                  <Icon className="h-5 w-5" />
                </a>
                <div className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white text-xs font-medium px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
                  {item.label}
                  <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                </div>
             </div>
           )
        })}
      </div>
    </>
  );
}