import React from 'react';
import { clientLogosRow1, clientLogosRow2 } from '../data/cloudAxisData';

export default function ClientCarousel() {
  return (
    <section id="clients" className="py-20 bg-white overflow-hidden border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3"
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
        >
          Trusted by <span className="text-[#E51A1A]">Industry Leaders</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base font-light">
          We take pride in earning the unwavering trust of top-tier industrial clients through unmatched quality, innovation, and reliability.
        </p>
        <div className="w-24 h-1 bg-[#E51A1A] mx-auto mt-4 rounded-full" />
      </div>

      {/* Marquee Row 1 */}
      <div className="relative w-full overflow-hidden mb-8">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-scroll-left flex items-center space-x-10">
          {[...clientLogosRow1, ...clientLogosRow1, ...clientLogosRow1].map((client, idx) => (
            <div 
              key={idx}
              className="flex items-center justify-center h-20 min-w-[180px] p-4 bg-gray-50 border border-gray-200 rounded-xl shadow-xs hover:border-red-500/50 hover:shadow-md hover:scale-105 transition-all duration-300"
            >
              <span 
                className="font-bold text-gray-800 text-sm tracking-wide text-center"
                style={{ fontFamily: "'Times New Roman', serif" }}
              >
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (Reverse) */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-scroll-right flex items-center space-x-10">
          {[...clientLogosRow2, ...clientLogosRow2, ...clientLogosRow2].map((client, idx) => (
            <div 
              key={idx}
              className="flex items-center justify-center h-20 min-w-[180px] p-4 bg-gray-50 border border-gray-200 rounded-xl shadow-xs hover:border-red-500/50 hover:shadow-md hover:scale-105 transition-all duration-300"
            >
              <span 
                className="font-bold text-gray-800 text-sm tracking-wide text-center"
                style={{ fontFamily: "'Times New Roman', serif" }}
              >
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
