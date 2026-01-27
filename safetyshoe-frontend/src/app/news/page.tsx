'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight, User, Home, ChevronRight } from 'lucide-react';

interface NewsItem {
  id: string; // documentId 是字符串
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:1337';

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(newsItems.map(item => item.category)))];

  // Filter news by category
  const filteredNews = selectedCategory === 'All' 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);

  // Fetch real news from API
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${STRAPI_URL}/api/factory-updates?populate=*&sort=date:desc`);
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
            image: imageUrl
          };
        });
        setNewsItems(transformedNews);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pt-20">
      
      {/* Page Header */}
      <div className="bg-slate-900 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Factory News & Updates</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Stay informed about our latest developments, industry insights, and company news.
          </p>
          
          <div className="flex items-center justify-center text-sm text-slate-400">
            <Link href="/" className="hover:text-white flex items-center transition-colors">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white font-medium">News</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-slate-600">Loading news...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <article 
                key={item.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-slate-100"
              >
                
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
                    {item.category}
                  </div>
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
                    Read More <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredNews.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-600 text-lg">No news found in this category.</p>
          </div>
        )}

        {/* Pagination - Placeholder */}
        {filteredNews.length > 0 && (
          <div className="mt-16 flex justify-center">
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-primary-600 text-white font-bold">
                1
              </button>
              <button className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold">
                2
              </button>
              <button className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold">
                3
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

