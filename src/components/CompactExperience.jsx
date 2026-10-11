import React from 'react';
import { PhoneCall } from 'lucide-react';
import { companyDetails } from '../data/cloudAxisData';

export default function CompactExperience() {
  return (
    <section className="relative bg-white overflow-hidden py-16 md:py-24 border-b border-gray-100">
      {/* Background Blueprint / Machinery Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-no-repeat bg-left bg-contain"
        style={{
          backgroundImage: "radial-gradient(#E51A1A 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        
        {/* Left Content */}
        <div className="text-center md:text-left space-y-4">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl text-black leading-snug font-bold"
            style={{ fontFamily: "'Times New Roman', Times, serif", letterSpacing: '-0.5px' }}
          >
            Pioneering <span className="text-[#E51A1A]">Smart Engineering</span><br />
            & Next-Gen Automation
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-widest font-semibold pt-2">
            Call us for immediate engineering consultation.
          </p>

          <div className="pt-2">
            <a 
              href={`tel:${companyDetails.phone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 border-2 border-[#E51A1A] text-[#E51A1A] font-bold rounded-full hover:bg-[#E51A1A] hover:text-white transition duration-300 shadow-md hover:shadow-xl tracking-wide text-base cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{companyDetails.phone}</span>
            </a>
          </div>
        </div>

        {/* Right Column Graphic */}
        <div className="hidden md:flex items-center justify-center p-6">
          <div className="w-64 h-64 rounded-full border-2 border-dashed border-[#E51A1A]/20 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border-2 border-[#E51A1A]/40 flex items-center justify-center text-center p-4 bg-red-50/20">
              <span 
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "'Times New Roman', serif" }}
              >
                Pioneering <span className="text-[#E51A1A]">Smart Engineering</span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
