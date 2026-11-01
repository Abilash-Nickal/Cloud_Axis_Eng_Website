import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { companyDetails } from '../data/cloudAxisData';

export default function FooterSection({ onNavigate, currentPage = 'home' }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (targetType, value) => {
    if (targetType === 'page') {
      if (onNavigate) {
        onNavigate(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (targetType === 'section') {
      if (currentPage !== 'home') {
        if (onNavigate) {
          onNavigate('home');
          setTimeout(() => {
            const el = document.getElementById(value);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      } else {
        const el = document.getElementById(value);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#0B0F19] via-[#05070c] to-black text-white pt-16 pb-10 px-4 sm:px-6 lg:px-8 border-t-2 border-[#E51A1A]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Col 1: Official Logo & Description */}
        <div className="space-y-4">
          <div className="bg-white px-3.5 py-2 rounded-xl inline-block shadow-lg border border-gray-200">
            <img 
              src="/logo.png" 
              alt="CloudAxis Engineering Logo" 
              className="h-10 sm:h-11 w-auto object-contain" 
            />
          </div>

          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light pt-1">
            CloudAxis Engineering (Pvt) Ltd is a leading CIDA EM1 registered and ISO certified mechanical, electrical, and smart automation engineering enterprise.
          </p>

          <div className="text-xs text-slate-400 font-mono space-y-1">
            <div>Hotline: <span className="text-white font-semibold">{companyDetails.phone}</span></div>
            <div>Inquiries: <span className="text-white">{companyDetails.email}</span></div>
          </div>
        </div>

        {/* Col 2: Other Company Websites */}
        <div>
          <h3 
            className="text-base sm:text-lg font-bold text-white mb-4"
            style={{ fontFamily: "'Times New Roman', serif" }}
          >
            Our Other Divisions
          </h3>
          <ul className="space-y-2.5 text-gray-400 text-xs sm:text-sm font-light">
            <li>
              <button onClick={() => handleNav('section', 'services')} className="hover:text-[#E51A1A] transition-colors text-left cursor-pointer">
                CloudAxis Eco Solutions (Pvt) Ltd
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('page', 'projects')} className="hover:text-[#E51A1A] transition-colors text-left cursor-pointer">
                International Airport Solutions
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('section', 'services')} className="hover:text-[#E51A1A] transition-colors text-left cursor-pointer">
                CloudAxis Bio Med & Instrumentation
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('page', 'projects')} className="hover:text-[#E51A1A] transition-colors text-left cursor-pointer">
                UL 508A Electrical Panel Shop
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Quick Links */}
        <div>
          <h3 
            className="text-base sm:text-lg font-bold text-white mb-4"
            style={{ fontFamily: "'Times New Roman', serif" }}
          >
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-gray-400 text-xs sm:text-sm font-light">
            <li>
              <button onClick={() => handleNav('page', 'home')} className="hover:text-[#E51A1A] transition-colors cursor-pointer">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('section', 'about')} className="hover:text-[#E51A1A] transition-colors cursor-pointer">
                About Us
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('section', 'services')} className="hover:text-[#E51A1A] transition-colors cursor-pointer">
                Capabilities
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('page', 'projects')} className="hover:text-[#E51A1A] transition-colors cursor-pointer font-medium text-slate-200">
                Turnkey Projects
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('page', 'news')} className="hover:text-[#E51A1A] transition-colors cursor-pointer font-medium text-slate-200">
                News & Media
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('section', 'partners')} className="hover:text-[#E51A1A] transition-colors cursor-pointer">
                Global Partners
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('section', 'contact')} className="hover:text-[#E51A1A] transition-colors cursor-pointer">
                Contact & Map
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Social Media */}
        <div>
          <h3 
            className="text-base sm:text-lg font-bold text-white mb-4"
            style={{ fontFamily: "'Times New Roman', serif" }}
          >
            Follow Us
          </h3>
          <div className="flex gap-3">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Facebook"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E51A1A] flex items-center justify-center text-gray-300 hover:text-white transition-all shadow"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E51A1A] flex items-center justify-center text-gray-300 hover:text-white transition-all shadow"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74V9.93H5.06v8.57h2.8z"/>
              </svg>
            </a>

            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="YouTube"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E51A1A] flex items-center justify-center text-gray-300 hover:text-white transition-all shadow"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.26 5 12 5 12 5s-6.26 0-7.82.42A2.5 2.5 0 0 0 2.42 7.2 26.2 26.2 0 0 0 2 12a26.2 26.2 0 0 0 .42 4.81 2.5 2.5 0 0 0 1.76 1.77C5.74 19 12 19 12 19s6.26 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77A26.2 26.2 0 0 0 22 12a26.2 26.2 0 0 0-.42-4.81zM10 15V9l5.2 3-5.2 3z"/>
              </svg>
            </a>
          </div>

          <div className="mt-6 text-xs text-gray-400 font-mono">
            <div>Plant Emergency Dispatch: 24/7</div>
            <div className="text-[#E51A1A] font-semibold mt-1">SLA Response Window &lt; 15 Mins</div>
          </div>
        </div>

      </div>

      {/* Divider and Copyright */}
      <div className="border-t border-zinc-800 mt-8 pt-6 text-center text-xs text-gray-400 font-light space-y-1.5">
        <p>
          © 2026 CloudAxis Engineering (Pvt) Ltd. All rights reserved.
        </p>
        <p className="text-gray-300">
          Design &amp; Developed by{' '}
          <a
            href="https://arumugam-abilashan.web.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-bold hover:text-[#E51A1A] transition-colors"
          >
            Arumugam Abilashan
          </a>
          <span className="mx-2 text-zinc-700">•</span>
          <button
            onClick={() => onNavigate && onNavigate('admin')}
            className="text-zinc-500 hover:text-[#E51A1A] transition-colors cursor-pointer"
          >
            Admin CMS
          </button>
        </p>
      </div>

      {/* Floating Action Buttons at Bottom: WhatsApp & Scroll To Top */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center space-y-3">
        {/* Floating WhatsApp Button */}
        <a
          href={companyDetails.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-3.5 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer border border-white/20 group relative"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.169-3.495-8.424" />
          </svg>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-black/80 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat on WhatsApp
          </span>
        </a>

        {/* Floating Scroll to Top Arrow Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="bg-[#E51A1A] hover:bg-black text-white rounded-full p-3.5 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer border border-white/20 animate-in fade-in"
          >
            <ChevronUp className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}
      </div>
    </footer>
  );
}
