import Link from 'next/link';
import { ArrowLeft, Map } from 'lucide-react';
import { locales } from '@/locales';
import { useTranslations } from 'next-intl';

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default function SitemapPage() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="bg-slate-900 py-16 md:py-24">
                <div className="container mx-auto px-4 text-center">
                    <Map className="w-16 h-16 text-primary-500 mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Site Map</h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Easy navigation across all our website sections and products.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-12">

                    {/* Main Sections */}
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                            <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                            Main Pages
                        </h2>
                        <ul className="space-y-4">
                            <SitemapLink href="/">Home Page</SitemapLink>
                            <SitemapLink href="/products">Product Catalog</SitemapLink>
                            <SitemapLink href="/services/oem">OEM & ODM Services</SitemapLink>
                            <SitemapLink href="/about">About Factory</SitemapLink>
                            <SitemapLink href="/news">Latest News & Updates</SitemapLink>
                            <SitemapLink href="/faq">Frequently Asked Questions</SitemapLink>
                        </ul>
                    </section>

                    {/* Product Categories */}
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                            <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                            Product Categories
                        </h2>
                        <ul className="space-y-4">
                            <SitemapLink href="/products?category=Construction">Construction Safety</SitemapLink>
                            <SitemapLink href="/products?category=Logistics">Logistics & Warehouse</SitemapLink>
                            <SitemapLink href="/products?category=Industrial">Industrial Protection</SitemapLink>
                            <SitemapLink href="/products?feature=waterproof">Waterproof Series</SitemapLink>
                            <SitemapLink href="/products?feature=metal-free">Metal-Free Tech</SitemapLink>
                        </ul>
                    </section>

                    {/* Legal & Support */}
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                            <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                            Company & Legal
                        </h2>
                        <ul className="space-y-4">
                            <SitemapLink href="/privacy">Privacy Policy</SitemapLink>
                            <SitemapLink href="/terms">Terms of Service</SitemapLink>
                            <SitemapLink href="/about">Company Background</SitemapLink>
                            <SitemapLink href="/faq">Customer Support</SitemapLink>
                        </ul>
                    </section>

                </div>

                <div className="mt-20 text-center">
                    <Link href="/" className="inline-flex items-center text-primary-600 font-bold hover:underline">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Return to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}

function SitemapLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link href={href} className="text-slate-600 hover:text-primary-600 transition-colors flex items-center">
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mr-3"></span>
                {children}
            </Link>
        </li>
    );
}
