import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'SafeStep Industrial Footwear - Professional Safety Shoes',
    template: '%s | SafeStep Industrial Footwear'
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
  authors: [{ name: 'SafeStep Industrial Footwear' }],
  creator: 'SafeStep Industrial Footwear',
  publisher: 'SafeStep Industrial Footwear',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'es-ES': '/es',
      'de-DE': '/de',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'SafeStep Industrial Footwear - Professional Safety Shoes',
    description: 'Professional safety footwear for industrial workers. Steel toe boots, composite toe shoes, slip-resistant boots, and winter safety boots. OEM manufacturing available.',
    siteName: 'SafeStep Industrial Footwear',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SafeStep Industrial Footwear',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SafeStep Industrial Footwear - Professional Safety Shoes',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 预加载关键资源 */}
        {/* <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /> */}
        
        {/* DNS预解析 */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'SafeStep Industrial Footwear',
              description: 'Professional safety footwear manufacturer specializing in industrial work boots and safety shoes.',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/images/logo.png`,
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-800-SAFETY-1',
                contactType: 'customer service',
                availableLanguage: ['English', 'Spanish', 'German'],
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: '123 Industrial Way',
                addressLocality: 'Safety City',
                addressRegion: 'SC',
                postalCode: '12345',
                addressCountry: 'US',
              },
              sameAs: [
                'https://www.facebook.com/safestep',
                'https://www.linkedin.com/company/safestep',
                'https://www.twitter.com/safestep',
              ],
            }),
          }}
        />
        
        {/* 主题颜色 */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        
        {/* 移动端优化 */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SafeStep" />
        
        {/* 安全头 */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="origin-when-cross-origin" />
        
        {/* 性能优化 */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* 页面内容 */}
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        
        {/* Cookie同意横幅 */}
        <CookieConsent />
        
        {/* 通知组件 */}
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
        
        {/* 性能监控脚本 */}
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
            
            {/* Google Tag Manager */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-XXXXXXX');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
