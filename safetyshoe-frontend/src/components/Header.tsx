'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MessageCircle, Mail, Phone, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Product Catalog', href: '/products' },
  { name: 'OEM Service', href: '/services/oem' },
  { name: 'About Factory', href: '/about' },
  { name: 'Contact Us', href: '/#contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Check if we are on the homepage or OEM page or About page (which has dark hero)
  const isDarkHeroPage = pathname === '/' || pathname === '/services/oem' || pathname === '/about';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine styles based on scroll state AND current page
  // If scrolled: always white bg, dark text
  // If not scrolled:
  //    - Dark Hero Page: transparent bg, white text
  //    - Light Page (Products, etc): white bg (or transparent), DARK text
  
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
      <header className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 ease-in-out',
        headerClass
      )}>
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                  isTransparent ? "bg-white text-slate-900" : "bg-primary-600 text-white"
                )}>
                  <span className="font-bold text-xl">D</span>
                </div>
                <span className={cn("text-xl font-bold transition-colors", logoColor)}>
                  Dengtai
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-colors',
                      pathname === item.href ? navItemActiveColor : navItemColor
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <Link
                href="/#contact"
                className={cn(
                  "px-6 py-2.5 rounded-full font-bold text-sm transition-all transform hover:-translate-y-0.5 shadow-sm",
                  buttonClass
                )}
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
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
                  href={item.href}
                  className={cn(
                    'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-slate-50 text-primary-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2">
                <Link
                  href="/#contact"
                  className="block w-full text-center bg-primary-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Get Quote
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Floating Contact Buttons (Optimized) */}
      <div className="fixed right-6 bottom-8 z-40 flex flex-col space-y-4">
        {[
          { icon: MessageCircle, label: 'WeChat: 18669794582', color: 'bg-[#07C160]', href: '#' },
          { icon: Mail, label: 'sales@dengtaishoes.com', color: 'bg-blue-500', href: 'mailto:sales@dengtaishoes.com' },
          { icon: Phone, label: '+86 186 6979 4582', color: 'bg-accent-500', href: 'tel:+8618669794582' },
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
