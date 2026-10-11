import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import CompactExperience from '../components/CompactExperience';
import GlobalPartners from '../components/GlobalPartners';
import LatestNews from '../components/LatestNews';
import ClientCarousel from '../components/ClientCarousel';
import FaqAndMap from '../components/FaqAndMap';
import { ArrowRight, Layers } from 'lucide-react';

export default function HomePage({ onOpenQuote, onNavigate }) {
  return (
    <div className="animate-in fade-in duration-300">
      {/* Hero Honeycomb Carousel */}
      <HeroCarousel onCtaClick={onOpenQuote} />

      {/* About Section */}
      <AboutSection onReadMore={() => {
        const target = document.querySelector('#services');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* What We Offer Services with Action Buttons & Gradient */}
      <ServicesSection onServiceSelect={(serviceTitle) => {
        if (onOpenQuote) onOpenQuote(serviceTitle);
      }} />

      {/* Experience & Call Us Banner */}
      <CompactExperience />

      {/* Global Partners Marquee */}
      <GlobalPartners />

      {/* Latest News Preview with Direct Link to Dedicated News Page */}
      <div className="relative">
        <LatestNews />
        <div className="bg-gray-50/60 pb-16 text-center border-b border-gray-200">
          <button
            onClick={() => onNavigate && onNavigate('news')}
            className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-[#E51A1A] text-white px-7 py-3 rounded-full text-xs sm:text-sm font-bold shadow-md transition-all duration-300 cursor-pointer hover:shadow-xl active:scale-95"
          >
            <span>View All News & Press Releases</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Projects Showcase Banner linking to Dedicated Projects Page */}
      <section className="py-20 bg-[#0B0F19] text-white relative border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <span className="text-xs font-mono text-[#E51A1A] font-bold uppercase tracking-wider">
              FIELD-PROVEN CASE STUDIES
            </span>
            <h3 
              className="text-3xl sm:text-4xl font-bold text-white"
              style={{ fontFamily: "'Times New Roman', serif" }}
            >
              Explore Our <span className="text-[#E51A1A]">Turnkey Engineering Projects</span>
            </h3>
            <p className="text-slate-400 text-sm max-w-xl font-light">
              From international airport baggage carousels to multi-axis automotive stamping and pharmaceutical cleanrooms, browse our comprehensive project portfolio.
            </p>
          </div>

          <button
            onClick={() => onNavigate && onNavigate('projects')}
            className="inline-flex items-center gap-2.5 bg-[#E51A1A] hover:bg-white hover:text-black text-white px-8 py-4 rounded-xl text-sm font-bold shadow-xl transition-all duration-300 shrink-0 cursor-pointer active:scale-95"
          >
            <Layers className="w-4 h-4" />
            <span>Open Projects Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Client Carousel */}
      <ClientCarousel />

      {/* Map & FAQ */}
      <FaqAndMap />
    </div>
  );
}
