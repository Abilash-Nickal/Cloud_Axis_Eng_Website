import React, { useState } from 'react';
import { latestNewsItems } from '../data/cloudAxisData';
import { Search, Calendar, User, Clock, ArrowRight, X, ChevronRight, Share2, Mail } from 'lucide-react';

export default function NewsPage({ onOpenQuote, onNavigateHome }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);

  const categories = [
    'All',
    'Airport Systems',
    'Partnerships',
    'Awards',
    'Company Life',
    'Projects',
    'Accreditation'
  ];

  const filteredNews = latestNewsItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen animate-in fade-in duration-300">
      
      {/* Page Hero Header */}
      <section className="relative bg-[#0B0F19] text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-2 border-[#E51A1A]">
        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#E51A1A 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4">
            <button 
              onClick={onNavigateHome} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[#E51A1A] font-semibold">News & Press Releases</span>
          </div>

          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            Engineering <span className="text-[#E51A1A]">News & Media</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            Official announcements, airport system modernizations, global technology partnerships, and innovation milestones from CloudAxis Engineering.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="border-b border-gray-200 bg-gray-50/80 sticky top-[74px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#E51A1A] text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news & releases..."
              className="w-full bg-white border border-gray-300 rounded-full pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#E51A1A]"
            />
          </div>

        </div>
      </div>

      {/* Main News Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {filteredNews.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200">
            <p className="text-gray-500 text-base">No news releases match your selected criteria.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-3 text-xs text-[#E51A1A] font-bold underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden border border-gray-200 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 group"
              >
                <div>
                  {/* Article Media */}
                  <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#E51A1A] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md font-mono">
                      {article.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-[11px] text-gray-500 font-mono mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#E51A1A]" />
                        {article.date}
                      </span>
                      {article.readTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          {article.readTime}
                        </span>
                      )}
                    </div>

                    <h2 
                      className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#E51A1A] transition-colors leading-snug"
                      style={{ fontFamily: "'Times New Roman', serif" }}
                    >
                      {article.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 pt-0 border-t border-gray-100 mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 font-mono">
                    {article.author}
                  </span>
                  
                  <button
                    onClick={() => setActiveArticle(article)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#E51A1A] group-hover:text-black font-bold transition-colors cursor-pointer"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Media & Press Inquiries Banner */}
        <div className="mt-20 rounded-2xl bg-gradient-to-r from-gray-950 via-[#150202] to-gray-950 text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-zinc-800 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "'Times New Roman', serif" }}
            >
              Media Inquiries & Executive Press Kit
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl">
              Are you an industrial journalist, technical editor, or plant operations auditor looking for interview quotes or official high-res schematics?
            </p>
          </div>

          <a
            href="mailto:press@cloudaxis.com"
            className="inline-flex items-center gap-2 bg-[#E51A1A] hover:bg-white hover:text-black text-white px-7 py-3 rounded-full text-xs sm:text-sm font-bold shadow-lg transition-all shrink-0"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Media Relations</span>
          </a>
        </div>

      </div>

      {/* Full Article Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-300 max-h-[90vh] overflow-y-auto">
            {/* Modal Image */}
            <div className="relative h-64 sm:h-80 w-full bg-black">
              <img 
                src={activeArticle.image} 
                alt={activeArticle.title} 
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black text-white transition-colors cursor-pointer"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 bg-[#E51A1A] text-white text-xs font-mono font-bold px-3 py-1 rounded-full shadow">
                {activeArticle.category}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-10 space-y-6">
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-500 pb-2 border-b border-gray-100">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#E51A1A]" />
                  {activeArticle.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#E51A1A]" />
                  {activeArticle.author}
                </span>
                {activeArticle.readTime && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {activeArticle.readTime}
                  </span>
                )}
              </div>

              <h2 
                className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug"
                style={{ fontFamily: "'Times New Roman', serif" }}
              >
                {activeArticle.title}
              </h2>

              <p className="text-gray-800 text-sm sm:text-base leading-relaxed font-light">
                {activeArticle.content || activeArticle.excerpt}
              </p>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-600 space-y-1 font-mono">
                <div>SOURCE: CloudAxis Engineering Corporate Communications</div>
                <div>CLASSIFICATION: Public Industrial Release</div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-6 py-2.5 rounded-lg border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Close Article
                </button>

                <button
                  onClick={() => {
                    setActiveArticle(null);
                    if (onOpenQuote) onOpenQuote(activeArticle.title);
                  }}
                  className="bg-[#E51A1A] hover:bg-black text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-all shadow cursor-pointer"
                >
                  Inquire on Similar Project Scope
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
