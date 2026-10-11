import React from 'react';
import { globalPartnersRow1, globalPartnersRow2 } from '../data/cloudAxisData';

export default function GlobalPartners() {
  return (
    <section id="partners" className="py-16 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 overflow-hidden relative border-b border-gray-200">
      
      <div className="max-w-7xl mx-auto px-4 text-center mb-10">
        <h2 
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3"
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
        >
          Our <span className="text-[#E51A1A]">Global Partners</span>
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-base sm:text-lg font-light">
          We proudly collaborate with industry leaders worldwide to deliver exceptional engineering solutions.
        </p>
      </div>

      {/* Two-Line Infinite Marquee with edge gradient fade */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left & Right Gradient fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        {/* Row 1: Scrolling Left */}
        <div className="flex mb-8 overflow-hidden">
          <div className="animate-scroll-left flex items-center space-x-12 sm:space-x-16">
            {[...globalPartnersRow1, ...globalPartnersRow1, ...globalPartnersRow1].map((partner, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-center h-16 min-w-[140px] px-5 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-red-500/50 hover:shadow-md hover:scale-105 transition-all duration-300"
              >
                <span 
                  className="font-bold text-gray-900 text-sm sm:text-base font-serif tracking-wider"
                  style={{ fontFamily: "'Times New Roman', serif" }}
                >
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Scrolling Right (Reverse direction) */}
        <div className="flex overflow-hidden">
          <div className="animate-scroll-right flex items-center space-x-12 sm:space-x-16">
            {[...globalPartnersRow2, ...globalPartnersRow2, ...globalPartnersRow2].map((partner, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-center h-16 min-w-[140px] px-5 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-red-500/50 hover:shadow-md hover:scale-105 transition-all duration-300"
              >
                <span 
                  className="font-bold text-gray-900 text-sm sm:text-base font-serif tracking-wider"
                  style={{ fontFamily: "'Times New Roman', serif" }}
                >
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
