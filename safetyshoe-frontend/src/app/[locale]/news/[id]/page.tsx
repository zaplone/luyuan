import { fetchNewsItem, transformNews, fetchAllNewsIds } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft, Play } from 'lucide-react';

// 强制 SSG：不允许动态参数
export const dynamicParams = false;

// 生成所有静态路径
export async function generateStaticParams() {
  const newsIds = await fetchAllNewsIds();
  const locales = ['en', 'zh'];
  
  const params = [];
  for (const locale of locales) {
    for (const id of newsIds) {
      params.push({ locale, id });
    }
  }
  return params;
}

type NewsPageProps = {
  params: Promise<{ id: string; locale: string }>;
};

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { id } = await params;
  const newsData = await fetchNewsItem(id);
  
  if (!newsData) {
    notFound();
  }

  const news = transformNews(newsData);
  if (!news) return null; // Should be handled by notFound

  // 解析视频 ID (如果有)
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = news.media_type === 'Video' ? getYouTubeId(news.video_url) : null;

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-slate-900 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <Link href="/news" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News
          </Link>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl">
            {news.title}
          </h1>
          
          <div className="flex items-center text-slate-400 space-x-6">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {news.date}
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {news.author}
            </div>
            <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              {news.category}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden p-1 md:p-2">
          {videoId ? (
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={news.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="relative aspect-video w-full rounded-xl overflow-hidden">
              {news.image && (news.image.startsWith('http') || news.image.startsWith('/')) ? (
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                  No Image
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-slate max-w-none">
            {/* 简单的 Markdown 渲染 - 实际项目中可能需要 markdown-to-jsx */}
            {news.content.split('\n').map((paragraph: string, idx: number) => (
              paragraph.trim() && <p key={idx} className="mb-4 text-slate-700 leading-relaxed">{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
