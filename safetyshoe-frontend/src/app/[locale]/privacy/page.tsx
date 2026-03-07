import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import { locales } from '@/locales';

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default function PrivacyPage() {
    return (
        <div className="bg-white min-h-screen pb-20">
            <div className="bg-slate-900 py-16 md:py-24">
                <div className="container mx-auto px-4 text-center">
                    <Shield className="w-16 h-16 text-primary-500 mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Your privacy is important to us. This policy outlines how we handle your data.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12">
                <div className="max-w-3xl mx-auto prose prose-slate prose-lg">
                    <p className="text-slate-500 mb-8 italic">Last updated: March 7, 2026</p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">1. Information We Collect</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        We collect information you provide directly to us through our contact forms or inquiries.
                        This may include your name, email address, company name, and any other information you choose to provide.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. How We Use Your Information</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        We use the information we collect to respond to your inquiries, provide quotes, and improve our services.
                        We do not sell or share your personal information with third parties for their marketing purposes.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Data Security</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing and against accidental loss, destruction, or damage.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. Cookies</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        We use cookies to enhance your browsing experience and analyze our website traffic.
                        By using our website, you consent to our use of cookies in accordance with our Cookie Policy.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">5. Contact Us</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        If you have any questions about this Privacy Policy, please contact us at:
                        <br />
                        <strong>Email:</strong> sales@slsafetyshoes.com
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
