import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { Toaster } from 'react-hot-toast';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Luyuan Safety Shoes - Professional Industrial Footwear',
    template: '%s | Luyuan Safety Shoes'
  },
  description: 'Professional safety footwear for industrial workers. Steel toe boots, composite toe shoes, slip-resistant boots, and winter safety boots. OEM manufacturing available.',
  keywords: [
    'safety shoes',
    'steel toe boots',
    'composite toe shoes',
    'slip resistant boots',
    'industrial footwear',
    'work boots',
    'safety boots',
    'OEM manufacturing',
    'safety footwear',
    'construction boots'
  ],
  authors: [{ name: 'Luyuan Safety Shoes' }],
  creator: 'Luyuan Safety Shoes',
  publisher: 'Luyuan Safety Shoes',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'zh': '/zh',
      'de': '/de',
      'ru': '/ru',
      'ar': '/ar',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Luyuan Safety Shoes - Professional Industrial Footwear',
    description: 'Professional safety footwear for industrial workers. Steel toe boots, composite toe shoes, slip-resistant boots, and winter safety boots. OEM manufacturing available.',
    siteName: 'Luyuan Safety Shoes',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luyuan Safety Shoes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luyuan Safety Shoes - Professional Industrial Footwear',
    description: 'Professional safety footwear for industrial workers. Steel toe boots, composite toe shoes, slip-resistant boots, and winter safety boots. OEM manufacturing available.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await params to get locale
  const { locale } = await params;
  
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  // Handle RTL for Arabic
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Luyuan Safety Shoes',
              description: 'Professional safety footwear manufacturer specializing in industrial work boots and safety shoes.',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/images/logo.png`,
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+86 156 1021 4670',
                contactType: 'customer service',
                availableLanguage: ['English', 'Chinese', 'German', 'Russian', 'Arabic'],
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'No. 128, Industrial Park Road',
                addressLocality: 'Gaomi City',
                addressRegion: 'Shandong',
                postalCode: '261500',
                addressCountry: 'CN',
              },
              sameAs: [
                'https://www.facebook.com/luyuanshoes',
                'https://www.linkedin.com/company/luyuanshoes',
                'https://www.twitter.com/luyuanshoes',
              ],
            }),
          }}
        />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        
        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Luyuan Safety Shoes" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="origin-when-cross-origin" />
        
        {/* Performance Optimization */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* Page Content */}
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          
          {/* Cookie Consent */}
          <CookieConsent />
          
          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          
          {/* Analytics (Production Only) */}
          {process.env.NODE_ENV === 'production' && (
            <>
              {/* Google Analytics */}
              <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'GA_MEASUREMENT_ID', {
                      page_title: document.title,
                      page_location: window.location.href,
                    });
                  `,
                }}
              />
            </>
          )}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}