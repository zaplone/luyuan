import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Play } from 'lucide-react';
import { fetchLatestNews, transformNews } from '@/lib/strapi';
import { notFound } from 'next/navigation';

// 强制生成静态路径
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default async function NewsPage() {
  // 由于这是一个服务端组件，我们直接获取数据
  const newsData = await fetchLatestNews();
  const news = newsData.map(transformNews).filter(Boolean);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-slate-900 py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Factory Updates & News</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Stay updated with the latest news from our factory, industry insights, and safety footwear innovations.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        {news.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No news available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {news.map((item: any) => (
              <article key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-slate-100">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  {item.image && (item.image.startsWith('http') || item.image.startsWith('/')) ? (
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                      No Image
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm z-10">
                    {item.category}
                  </div>

                  {/* Video Indicator */}
                  {item.media_type === 'Video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors pointer-events-none">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 text-primary-600 fill-primary-600 ml-1" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center text-xs text-slate-500 mb-4 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      {item.date}
                    </div>
                    <div className="flex items-center">
                      <User className="w-3.5 h-3.5 mr-1" />
                      {item.author}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    <Link href={`/news/${item.id}`}>
                      {item.title}
                    </Link>
                  </h3>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                    {item.excerpt}
                  </p>
                  
                  <Link 
                    href={`/news/${item.id}`} 
                    className="inline-flex items-center text-sm font-bold text-primary-600 hover:underline mt-auto"
                  >
                    Read Full Story <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
