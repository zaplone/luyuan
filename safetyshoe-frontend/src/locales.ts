/**
 * 支持的语言列表，与 i18n 及 generateStaticParams 共用，避免从 i18n.ts 直接导入导致 webpack 报错。
 */
export const locales = ['en', 'zh', 'ru'] as const;
export type Locale = (typeof locales)[number];
