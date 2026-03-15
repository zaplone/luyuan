import type { StrapiApp } from '@strapi/strapi/admin';

// 中英文翻译映射表
const translations: Record<string, string> = {
  // 导航和主菜单
  'Home': '首页',
  'Content Manager': '内容管理',
  'Content-Type Builder': '内容类型构建器',
  'Media Library': '媒体库',
  'Settings': '设置',
  'Plugins': '插件',
  
  // 首页
  'Welcome back': '欢迎回来',
  'Last edited entries': '最近编辑',
  'Last published entries': '最近发布',
  'LAST EDITED ENTRIES': '最近编辑',
  'LAST PUBLISHED ENTRIES': '最近发布',
  
  // 内容管理
  'Product': '产品',
  'Products': '产品',
  'Factory Update': '工厂动态',
  'Factory Updates': '工厂动态',
  'Create new entry': '创建新条目',
  'Save': '保存',
  'Publish': '发布',
  'Published': '已发布',
  'Draft': '草稿',
  'Edit': '编辑',
  'Delete': '删除',
  
  // 表单字段
  'Name': '名称',
  'Description': '描述',
  'Image': '图片',
  'Images': '图片',
  'Category': '分类',
  'Price': '价格',
  'Title': '标题',
  'Content': '内容',
  'Date': '日期',
  
  // 设置
  'Roles': '角色',
  'Users': '用户',
  'Permissions': '权限',
  'General': '常规',
  
  // 其他
  'Search': '搜索',
  'Filter': '筛选',
  'Actions': '操作',
  'Loading': '加载中...',
  'No content': '暂无内容',
};

// 智能翻译函数
function translateText(text: string): string {
  if (!text || !text.trim()) return text;
  const trimmed = text.trim();
  
  // 跳过纯数字和符号
  if (/^[\d\s\.,;:!?\-_=+()[\]{}@#$%^&*]+$/.test(trimmed)) return text;
  
  // 跳过已经是中文的
  if (/[\u4e00-\u9fa5]/.test(trimmed)) return text;
  
  // 精确匹配（不区分大小写）
  for (const [en, zh] of Object.entries(translations)) {
    if (trimmed.toLowerCase() === en.toLowerCase()) {
      return zh;
    }
  }
  
  return text;
}

export default {
  config: {
    locales: ['zh-Hans'],
  },
  bootstrap(app: StrapiApp) {
    if (typeof document !== 'undefined') {
      // 隐藏 Growth plan 横幅
      const style = document.createElement('style');
      style.textContent = `
        a[href*="upgrade"],
        div:has(a[href*="upgrade"]) {
          display: none !important;
        }
      `;
      document.head.appendChild(style);

      // 应用中文翻译
      const applyTranslations = () => {
        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode: (node) => {
              const parent = node.parentElement;
              if (parent && ['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA'].includes(parent.tagName)) {
                return NodeFilter.FILTER_REJECT;
              }
              return NodeFilter.FILTER_ACCEPT;
            }
          }
        );

        let node;
        while (node = walker.nextNode()) {
          const originalText = node.textContent || '';
          const translated = translateText(originalText);
          if (translated !== originalText) {
            node.textContent = translated;
          }
        }
      };

      // 立即执行
      setTimeout(applyTranslations, 100);

      // 监听 DOM 变化
      const observer = new MutationObserver(() => {
        setTimeout(applyTranslations, 100);
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
  },
};

