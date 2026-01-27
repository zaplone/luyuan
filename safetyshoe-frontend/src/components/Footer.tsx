'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Facebook, Linkedin, Twitter, Instagram, ArrowRight } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">Dengtai</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Professional safety footwear manufacturer since 1990. 
              We combine traditional craftsmanship with modern technology to protect workers worldwide.
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
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/products">Product Catalog</FooterLink>
              <FooterLink href="/services/oem">OEM & ODM Service</FooterLink>
              <FooterLink href="/about">Factory Tour</FooterLink>
              <FooterLink href="/#contact">Request Quote</FooterLink>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Our Products</h3>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/products?category=construction">Steel Toe Boots</FooterLink>
              <FooterLink href="/products?feature=metal-free">Composite Safety Shoes</FooterLink>
              <FooterLink href="/products?feature=slip-resistant">Slip Resistant Shoes</FooterLink>
              <FooterLink href="/products?category=heavy-duty">Winter Work Boots</FooterLink>
              <FooterLink href="/products">View All Products</FooterLink>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent-500 mt-0.5 flex-shrink-0" />
                <span>
                  No. 128, Industrial Park Road,<br />
                  Gaomi City, Shandong, China
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent-500 flex-shrink-0" />
                <a href="tel:+8613800000000" className="hover:text-white transition-colors">
                  +86 138 0000 0000
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent-500 flex-shrink-0" />
                <a href="mailto:sales@dengtaishoes.com" className="hover:text-white transition-colors">
                  sales@dengtaishoes.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-accent-500 flex-shrink-0" />
                <span>Mon - Sat: 8:00 - 18:00</span>
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
              <p>&copy; {currentYear} Dengtai Safety Shoes. All rights reserved.</p>
              <span className="hidden md:inline text-slate-800">|</span>
              <div className="flex space-x-4">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span>Designed for Global Trade</span>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper Components
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-slate-400 hover:text-white hover:pl-1 transition-all duration-300 flex items-center">
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
