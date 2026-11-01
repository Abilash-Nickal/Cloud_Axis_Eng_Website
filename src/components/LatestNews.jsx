import React, { useState, useEffect } from 'react';
import { X, Calendar, ArrowRight } from 'lucide-react';
import { latestNewsItems } from '../data/cloudAxisData';
import { getNewsList } from '../lib/supabase';

export default function LatestNews() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [news, setNews] = useState(latestNewsItems);

  useEffect(() => {
    let isMounted = true;
    getNewsList().then(res => {
      if (isMounted && res.data && res.data.length > 0) {
        setNews(res.data);
      }
    });
    return () => { isMounted = false; };
  }, []);

  return (
    <section id="news" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/60 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-mono text-[#E51A1A] font-semibold mb-2">
            <span>PRESS & MILESTONES</span>
          </div>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            Latest <span className="text-[#E51A1A]">News</span>
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {news.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden border border-gray-100 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 group hover:border-red-500/30"
            >
              <div>
                {/* Image */}
                <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#E51A1A] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow">
                    {item.date}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 
                    className="text-base sm:text-lg font-bold mb-2.5 text-gray-900 group-hover:text-[#E51A1A] transition-colors leading-snug"
                    style={{ fontFamily: "'Times New Roman', serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed font-light">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => setSelectedArticle(item)}
                  className="inline-flex items-center gap-1.5 text-xs text-white bg-[#E51A1A] hover:bg-black px-5 py-2.5 rounded-full font-medium transition duration-300 shadow hover:shadow-md cursor-pointer"
                >
                  <span>{item.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="relative h-56 w-full">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title} 
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-3 bg-[#E51A1A] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                {selectedArticle.date}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <h3 
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "'Times New Roman', serif" }}
              >
                {selectedArticle.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {selectedArticle.excerpt}
              </p>
              <p className="text-gray-600 text-xs leading-relaxed">
                CloudAxis Engineering continues to drive strategic manufacturing, infrastructure improvements, and automation milestones across the region with safety, innovation, and client satisfaction at the core of all operations.
              </p>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-[#E51A1A] hover:bg-black text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
