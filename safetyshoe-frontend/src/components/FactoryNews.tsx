'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calendar, ArrowRight, User, Play, X } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface FactoryNewsProps {
  initialNews?: any[];
}

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:1337';

export function FactoryNews({ initialNews }: FactoryNewsProps) {
  const t = useTranslations('FactoryNews');
  const [newsItems, setNewsItems] = useState<any[]>(initialNews || []);
  const [loading, setLoading] = useState(!initialNews || initialNews.length === 0);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [isVertical, setIsVertical] = useState(false);

  // Helper to check if it's a Shorts video
  const isShortsVideo = (url: string) => {
    return url.includes('youtube.com/shorts/');
  };

  useEffect(() => {
    // 如果没有初始数据，从后端获取
    if (!initialNews || initialNews.length === 0) {
      fetchNews();
    } else {
      setNewsItems(initialNews);
    }
  }, [initialNews]);

  const fetchNews = async () => {
    try {
      console.log('[FactoryNews] Fetching from:', `${STRAPI_URL}/api/factory-updates?populate=*&sort=date:desc&pagination[limit]=3`);
      const response = await fetch(`${STRAPI_URL}/api/factory-updates?populate=*&sort=date:desc&pagination[limit]=3`);
      
      if (response.ok) {
        const data = await response.json();
        
        const transformedNews = data.data.map((item: any) => {
          // 处理图片
          let imageUrl = 'https://images.unsplash.com/photo-1565514020176-db792f4b6d96?auto=format&fit=crop&q=80';
          if (item.image?.url) {
            const url = item.image.url;
            imageUrl = url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
          }

          return {
            id: item.documentId, // 使用 documentId 而不是 id
            title: item.title,
            excerpt: item.excerpt,
            date: item.date,
            author: item.author,
            category: item.category,
            image: imageUrl,
            media_type: item.media_type,
            video_url: item.video_url
          };
        });
        setNewsItems(transformedNews);
      } else {
        console.error('[FactoryNews] Failed to fetch:', response.statusText);
      }
    } catch (error) {
      console.error('[FactoryNews] Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to get YouTube ID
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    
    // Handle standard YouTube URLs
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    }
    
    // Handle YouTube Shorts
    const shortsRegExp = /youtube\.com\/shorts\/([^#&?]*)/;
    const shortsMatch = url.match(shortsRegExp);
    if (shortsMatch && shortsMatch[1]) {
      return shortsMatch[1];
    }
    
    return null;
  };

  const handleNewsClick = (e: React.MouseEvent, item: any) => {
    // 如果是视频类型且有视频链接，阻止跳转并播放视频
    if (item.media_type === 'Video' && item.video_url) {
      e.preventDefault();
      setPlayingVideo(item.video_url);
      setIsVertical(isShortsVideo(item.video_url));
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-slate-600">Loading news...</p>
        </div>
      </section>
    );
  }

  if (newsItems.length === 0) {
    return null; // 如果没有新闻，不显示这个区块
  }

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
           <div>
             <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">{t('label')}</span>
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">{t('title')}</h2>
           </div>
           
           <Link href="/news" className="hidden md:inline-flex items-center font-bold text-slate-600 hover:text-primary-600 transition-colors">
             {t('viewAll')} <ArrowRight className="w-4 h-4 ml-2" />
           </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <article key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-slate-100">
              
              {/* Image */}
              <div className="relative h-48 overflow-hidden group/image cursor-pointer" onClick={(e) => handleNewsClick(e, item)}>
                {item.image && (item.image.startsWith('http') || item.image.startsWith('/')) ? (
                  <Image 
                    src={item.image} 
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                    <span className="text-sm">No Image</span>
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm z-10">
                  {item.category}
                </div>

                {/* Video Play Button Overlay */}
                {item.media_type === 'Video' && item.video_url && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/image:bg-black/40 transition-colors z-0">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover/image:scale-110 transition-transform">
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
                  <Link href={`/news/${item.id}`} onClick={(e) => handleNewsClick(e, item)}>
                    {item.title}
                  </Link>
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                  {item.excerpt}
                </p>
                
                <Link 
                  href={`/news/${item.id}`} 
                  className="inline-flex items-center text-sm font-bold text-primary-600 hover:underline mt-auto"
                  onClick={(e) => handleNewsClick(e, item)}
                >
                  {item.media_type === 'Video' && item.video_url ? 'Watch Video' : t('readMore')} 
                  {item.media_type === 'Video' && item.video_url ? <Play className="w-3.5 h-3.5 ml-1 fill-current" /> : <ArrowRight className="w-3.5 h-3.5 ml-1" />}
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/news" className="inline-block bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-lg font-bold">
            {t('viewAll')}
          </Link>
        </div>

        {/* Video Modal */}
        {playingVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setPlayingVideo(null)}>
            <div className={`relative w-full bg-black rounded-2xl overflow-hidden shadow-2xl ${
              isVertical 
                ? 'max-w-md aspect-[9/16] max-h-[90vh]' 
                : 'max-w-4xl aspect-video'
            }`}>
              <button 
                onClick={() => setPlayingVideo(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all z-10"
              >
                <X className="w-6 h-6" />
              </button>
              
              {getYouTubeId(playingVideo) ? (
                <iframe 
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${getYouTubeId(playingVideo)}?autoplay=1`}
                  title="Video Player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center flex-col text-white">
                  <p className="mb-4">Video format not supported for direct embed.</p>
                  <a 
                    href={playingVideo} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-700 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Open in New Tab
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}