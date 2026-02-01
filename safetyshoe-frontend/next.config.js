/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig = {
  // 静态导出配置
  output: 'export',
  
  // 强制生成 index.html (例如 /en -> /en/index.html)，兼容 Cloudflare
  trailingSlash: true,
  
  // 图片配置
  images: {
    unoptimized: true, // 静态导出必须开启此项
    domains: ['localhost', '43.165.0.206', 'pub-9a6ce20adf6d44c499aad464d60190a1.r2.dev'], // Strapi 服务器和 R2 存储
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '43.165.0.206',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // 环境变量
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://dtwz.zhiyuansafety.com',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://dtwz.zhiyuansafety.com',
  },
  
  // 重写规则（静态导出不支持 rewrites，已注释）
  // async rewrites() {
  //   const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `${apiUrl}/api/:path*`,
  //     },
  //   ];
  // },
  
  // 压缩配置
  compress: true,
  
  // 性能优化
  poweredByHeader: false,
  
  // 重定向配置
  // async redirects() {
  //   return [
  //     {
  //       source: '/home',
  //       destination: '/',
  //       permanent: true,
  //     },
  //   ];
  // },
  
  // 头部配置（静态导出不支持 headers，已注释以避免开发模式报错）
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'X-Frame-Options',
  //           value: 'DENY',
  //         },
  //         {
  //           key: 'X-Content-Type-Options',
  //           value: 'nosniff',
  //         },
  //         {
  //           key: 'Referrer-Policy',
  //           value: 'origin-when-cross-origin',
  //         },
  //       ],
  //     },
  //   ];
  // },
};

module.exports = withNextIntl(nextConfig);
