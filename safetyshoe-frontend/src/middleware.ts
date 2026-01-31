import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // 支持的语言列表
  locales: ['en', 'zh'],

  // 默认语言（当无法探测浏览器语言时使用）
  defaultLocale: 'en'
});

export const config = {
  // Matcher 规则：
  // 1. 排除 api, _next, _vercel 等系统路径
  // 2. 排除所有带后缀的文件 (如 .jpg, .css, .js)
  // 3. 匹配其他所有路径
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};