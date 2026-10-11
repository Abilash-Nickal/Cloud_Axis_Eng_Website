import React from 'react';
import { Check, ArrowRight, Cpu, Zap, Wrench, Boxes } from 'lucide-react';
import { companyDetails } from '../data/cloudAxisData';

export default function AboutSection({ onReadMore }) {
  const corePillars = [
    { title: "Industrial Automation & PLC/SCADA Programming", icon: Cpu },
    { title: "Custom Electrical Control Panel Design & Integration", icon: Zap },
    { title: "Mechanical & Electro-Mechanical Systems Design", icon: Wrench },
    { title: "Smart Manufacturing & Hardware Integration", icon: Boxes },
  ];

  return (
    <section 
      id="about" 
      className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 py-24 px-4 md:px-8 lg:px-16 overflow-hidden border-b border-gray-100"
    >
      {/* Background Radial Dots */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#E51A1A 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Big Watermark Behind Section */}
      <h1 className="absolute top-8 left-6 lg:left-16 text-8xl lg:text-[180px] text-black/[0.04] font-black z-0 pointer-events-none select-none tracking-tighter">
        ABOUT
      </h1>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left: Modern Framed Image with Badges & Stats */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative group">
            
            {/* Main Image with Modern Frame */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl border-2 border-gray-900/10">
              <img 
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80" 
                alt="CloudAxis Engineering Automation" 
                className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
            </div>

          </div>

          {/* Stats Bar (Red & Black Accents) */}
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            <div className="bg-white p-4 sm:p-5 rounded-xl shadow-md border border-gray-100 hover:border-red-500/40 transition-colors">
              <div 
                className="text-2xl sm:text-3xl font-extrabold text-[#E51A1A]"
                style={{ fontFamily: "'Times New Roman', serif" }}
              >
                2026
              </div>
              <div className="text-xs sm:text-sm text-gray-700 font-semibold mt-0.5">Founded</div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-xl shadow-md border border-gray-100 hover:border-red-500/40 transition-colors">
              <div 
                className="text-2xl sm:text-3xl font-extrabold text-[#E51A1A]"
                style={{ fontFamily: "'Times New Roman', serif" }}
              >
                18+
              </div>
              <div className="text-xs sm:text-sm text-gray-700 font-semibold mt-0.5">Specialties</div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-xl shadow-md border border-gray-100 hover:border-red-500/40 transition-colors">
              <div 
                className="text-2xl sm:text-3xl font-extrabold text-[#E51A1A]"
                style={{ fontFamily: "'Times New Roman', serif" }}
              >
                100%
              </div>
              <div className="text-xs sm:text-sm text-gray-700 font-semibold mt-0.5">Turnkey SLA</div>
            </div>
          </div>

        </div>

        {/* Right: Text Content */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-mono text-[#E51A1A] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#E51A1A] animate-pulse" />
            <span>INTELLIGENT PLANT CONTROL</span>
          </div>

          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 font-bold leading-tight"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            CLOUDAXIS <span className="text-[#E51A1A]">ENGINEERING</span><br />
            <span className="text-xl sm:text-2xl md:text-3xl text-gray-500 font-normal">
              — Founded {companyDetails.sinceYear} • {companyDetails.headquarters}
            </span>
          </h2>

          <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed font-light text-justify">
            <p className="text-justify">
              <strong className="text-gray-900 font-medium">CloudAxis Engineering</strong> is an innovative industrial automation and engineering solutions firm dedicated to optimizing plant efficiency and modernizing manufacturing systems. We bridge the gap between mechanical execution and intelligent control.
            </p>
            <p className="text-sm sm:text-base text-gray-600 text-justify">
              Whether you are looking to upgrade legacy infrastructure, minimize factory downtime, or commission custom automation architecture, CloudAxis Engineering delivers robust, scalable, and future-ready solutions.
            </p>
          </div>

          {/* Core Capabilities Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {corePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-gray-200/80 shadow-2xs">
                  <div className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-[#E51A1A] shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-gray-800 leading-snug">
                    {pillar.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* EPLAN & SOLIDWORKS Badge */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-800 font-semibold uppercase tracking-wide bg-slate-50 border border-gray-200 p-3.5 rounded-xl w-fit shadow-xs">
            <div className="w-5 h-5 rounded-full bg-[#E51A1A] text-white flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span>EPLAN Electric P8 & SOLIDWORKS Engineering</span>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                if (onReadMore) onReadMore();
                else {
                  const target = document.querySelector('#services');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2.5 bg-[#E51A1A] hover:bg-black text-white font-bold px-8 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer text-sm tracking-wide active:scale-95"
            >
              <span>Explore Capabilities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
