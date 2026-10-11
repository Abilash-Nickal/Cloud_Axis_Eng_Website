import React, { useState, useEffect } from 'react';
import TopContactBar from './components/TopContactBar';
import HeaderNav from './components/HeaderNav';
import FooterSection from './components/FooterSection';
import QuoteModal from './components/QuoteModal';

// Dedicated Pages
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import ProjectsPage from './pages/ProjectsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  // Synchronize navigation with browser history and URL hashes
  useEffect(() => {
    const syncWithHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#news' || hash === '#news-page') {
        setCurrentPage('news');
      } else if (hash === '#projects' || hash === '#projects-page') {
        setCurrentPage('projects');
      } else if (hash === '#home' || hash === '') {
        setCurrentPage('home');
      }
    };

    syncWithHash();
    window.addEventListener('hashchange', syncWithHash);
    return () => window.removeEventListener('hashchange', syncWithHash);
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? 'home' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuoteWithService = (serviceTitle = '') => {
    setSelectedService(serviceTitle);
    setIsQuoteOpen(true);
  };

  const handleOpenQuoteGeneral = () => {
    setSelectedService('');
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans relative selection:bg-[#E51A1A] selection:text-white">
      {/* 1. Carbon & Maroon Contact Bar */}
      <TopContactBar />

      {/* 2. Sticky Header with Logo, Navigation Links & Red/Black Hazard Tape */}
      <HeaderNav 
        onOpenQuote={handleOpenQuoteGeneral} 
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* 3. Dynamic Page View */}
      <main>
        {currentPage === 'news' && (
          <NewsPage 
            onOpenQuote={handleOpenQuoteWithService}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'projects' && (
          <ProjectsPage 
            onOpenQuote={handleOpenQuoteWithService}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'home' && (
          <HomePage 
            onOpenQuote={handleOpenQuoteWithService}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* 4. Industrial Footer & Floating Action Buttons (WhatsApp + Scroll To Top) */}
      <FooterSection 
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      {/* 5. Interactive Quotation / RFP Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
}
