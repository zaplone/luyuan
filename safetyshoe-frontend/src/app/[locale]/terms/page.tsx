import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import { locales } from '@/locales';

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default function TermsPage() {
    return (
        <div className="bg-white min-h-screen pb-20">
            <div className="bg-slate-900 py-16 md:py-24">
                <div className="container mx-auto px-4 text-center">
                    <FileText className="w-16 h-16 text-primary-500 mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Please read these terms carefully before using our services.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12">
                <div className="max-w-3xl mx-auto prose prose-slate prose-lg">
                    <p className="text-slate-500 mb-8 italic">Last updated: March 7, 2026</p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">1. Acceptance of Terms</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. Use of Service</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        The content provided on this website is for informational purposes related to our professional safety footwear manufacturing.
                        Unauthorized use of any materials found on this site may violate copyright and trademark laws.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Products & Specifications</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        We strive to provide accurate product descriptions and specifications.
                        However, we do not warrant that product descriptions or other content are error-free.
                        Final specifications for mass production will be confirmed during the ordering process.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. Intellectual Property</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        All content on this site, including text, graphics, logos, and images, is the property of Shenglei Safety Shoes and is protected by international copyright laws.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">5. Limitation of Liability</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        Shenglei Safety Shoes shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the services or data on this website.
                    </p>

                    <div className="mt-16 pt-8 border-t border-slate-200">
                        <Link href="/" className="inline-flex items-center text-primary-600 font-bold hover:underline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
