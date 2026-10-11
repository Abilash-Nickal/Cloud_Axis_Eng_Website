import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { companyDetails } from '../data/cloudAxisData';

export default function HeaderNav({ onOpenQuote, currentPage = 'home', onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const percent = Math.min((scrollTop / docHeight) * 100, 100);
        setScrollProgress(percent);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', type: 'page', page: 'home', href: '#home' },
    { name: 'About', type: 'section', sectionId: 'about', href: '#about' },
    { name: 'Services', type: 'section', sectionId: 'services', href: '#services' },
    { name: 'Projects', type: 'page', page: 'projects', href: '#projects' },
    { name: 'News', type: 'page', page: 'news', href: '#news' },
    { name: 'Partners', type: 'section', sectionId: 'partners', href: '#partners' },
    { name: 'Contact', type: 'section', sectionId: 'contact', href: '#contact' },
  ];

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (link.type === 'page') {
      if (onNavigate) {
        onNavigate(link.page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (link.type === 'section') {
      if (currentPage !== 'home') {
        if (onNavigate) {
          onNavigate('home');
          setTimeout(() => {
            const target = document.getElementById(link.sectionId);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      } else {
        const target = document.getElementById(link.sectionId);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm transition-all border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center px-4 py-2.5 sm:py-3">
          
          {/* Official Logo Provided by User with Proper Spacing */}
          <button 
            type="button"
            onClick={(e) => handleLinkClick(e, { type: 'page', page: 'home' })}
            className="flex items-center group cursor-pointer border-none bg-transparent p-0 text-left focus:outline-none"
          >
            <img 
              src="/logo.png" 
              alt="CloudAxis Engineering" 
              className="h-9 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-102" 
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-5 lg:space-x-8 items-center">
            {navLinks.map((link) => {
              const isActive = link.type === 'page' && currentPage === link.page;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`nav-link font-medium relative py-1 transition-colors cursor-pointer text-sm ${
                    isActive ? 'text-[#E51A1A] font-bold' : 'text-gray-800 hover:text-[#E51A1A]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E51A1A] rounded-full" />
                  )}
                </a>
              );
            })}

            {/* Red & Black CTA Button */}
            <button
              onClick={onOpenQuote}
              className="text-xs uppercase tracking-wider font-bold text-white bg-[#E51A1A] hover:bg-black px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-95 shrink-0"
            >
              Get Quote
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#E51A1A] p-1.5 focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 px-4 bg-white border-t border-gray-100 space-y-1 animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => {
              const isActive = link.type === 'page' && currentPage === link.page;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`block py-2.5 text-sm font-medium border-b border-gray-50 ${
                    isActive ? 'text-[#E51A1A] font-bold bg-red-50/50 px-2 rounded' : 'text-gray-700 hover:text-[#E51A1A]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenQuote) onOpenQuote();
              }}
              className="w-full mt-3 text-center text-sm font-bold text-white bg-[#E51A1A] hover:bg-black py-2.5 rounded-lg shadow transition-colors cursor-pointer"
            >
              Request Engineering Quote
            </button>
          </div>
        )}
      </div>

      {/* Cyber Telemetry Header Accent & Scroll Progress Indicator (Permanent) */}
      <div className="w-full bar-cyber-track">
        <div 
          className="bar-cyber-progress"
          style={{ width: `${Math.max(scrollProgress, 2)}%` }}
        />
      </div>
    </header>
  );
}
