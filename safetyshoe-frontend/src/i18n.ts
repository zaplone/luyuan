import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// 静态导入所有翻译文件（避免动态 import 路径解析问题）
import enMessages from './messages/en.json';
import zhMessages from './messages/zh.json';

// 1. 定义支持的语言
const locales = ['en', 'zh'] as const;

// 2. 翻译文件映射表
const messages = {
  en: enMessages,
  zh: zhMessages,
} as const;

export default getRequestConfig(async ({locale}) => {
  // 3. 校验语言参数
  if (!locales.includes(locale as any)) notFound();

  // 4. 返回对应的翻译文件和 locale
  return {
    locale,
    messages: messages[locale as keyof typeof messages]
  };
});