import { fetchNewsItem, transformNews, fetchLatestNews } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ChevronLeft, Share2 } from 'lucide-react';

interface NewsPageProps {
  params: {
    id: string;
  };
}

export const revalidate = 3600; // 每小时更新一次

// 必修课：告诉 Next.js 有哪些新闻 ID 需要生成静态页面
export async function generateStaticParams() {
  // 获取最新的 50 条新闻用于生成静态页
  try {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
    const response = await fetch(`${apiUrl}/api/factory-updates?fields[0]=documentId&pagination[limit]=100`);
    if (!response.ok) return [];
    
    const data = await response.json();
    const newsIds = data.data.map((post: any) => post.documentId);
    
    // 为每种语言生成路径（locale 来自父路由）
    const locales = ['en', 'zh'];
    const params = [];
    for (const locale of locales) {
      for (const id of newsIds) {
        params.push({ locale, id });
      }
    }
    return params;
  } catch (error) {
    console.error('Error generating news params:', error);
    return [];
  }
}

// 在 output: export 模式下，必须设置为 false，表示仅支持静态生成的路径
export const dynamicParams = false;

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const newsItem = await fetchNewsItem(params.id); // 直接传递 documentId 字符串

  if (!newsItem) {
    notFound();
  }

  const news = transformNews(newsItem);
  if (!news) return notFound();

  // Helper to get YouTube ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>

        <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
          
          {/* Header */}
          <header className="p-8 md:p-12 border-b border-slate-100">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                {news.category}
              </span>
              <div className="flex items-center text-slate-500 text-sm">
                <Calendar className="w-4 h-4 mr-1.5" />
                {news.date}
              </div>
              <div className="flex items-center text-slate-500 text-sm">
                <User className="w-4 h-4 mr-1.5" />
                {news.author}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
              {news.title}
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed">
              {news.excerpt}
            </p>
          </header>

          {/* Media Section */}
          <div className="relative w-full bg-slate-100">
            {news.media_type === 'Video' && news.video_url ? (
              <div className="aspect-video w-full">
                {/* Try to embed YouTube */}
                {getYouTubeId(news.video_url) ? (
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${getYouTubeId(news.video_url)}`}
                    title={news.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  // Fallback for other videos: show link
                  <div className="flex items-center justify-center h-full flex-col">
                    <p className="mb-4 text-slate-500">Video source not supported for direct embed.</p>
                    <a href={news.video_url} target="_blank" rel="noopener noreferrer" className="bg-primary-600 text-white px-6 py-3 rounded-lg font-bold">
                      Watch Video
                    </a>
                  </div>
                )}
              </div>
            ) : (
              // Standard Image
              <div className="relative aspect-[21/9] w-full">
                <Image 
                  src={news.image} 
                  alt={news.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>

          {/* Content Body */}
          <div className="p-8 md:p-12 prose prose-lg prose-slate max-w-none">
            {/* Simple text rendering. For rich text blocks, we would need a block renderer */}
            {typeof news.content === 'string' ? (
               // If it's markdown string
               <div dangerouslySetInnerHTML={{ __html: news.content.replace(/\n/g, '<br/>') }} />
            ) : (
               // If it's Strapi Blocks (JSON), just dump text for now
               <p className="text-slate-600 italic">
                 [Rich content display requires Block Renderer - currently showing plain text summary]
               </p>
            )}
          </div>

          {/* Footer */}
          <footer className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
            <div className="text-slate-500 text-sm">
              © 2026 SafeStep Factory News
            </div>
            <button className="flex items-center text-slate-600 hover:text-primary-600 font-bold transition-colors">
              <Share2 className="w-4 h-4 mr-2" />
              Share Article
            </button>
          </footer>

        </article>
      </div>
    </div>
  );
}

