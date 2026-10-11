import React from 'react';
import { ArrowRight, FileSpreadsheet, ShieldCheck, ChevronRight, Activity, Cpu, Server, CheckCircle2 } from 'lucide-react';
import { companyInfo } from '../data/industrialData';

export default function Hero({ onProjectsClick, onConsultationClick }) {
  const scrollTo = (selector) => {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative bg-[#0B0F19] text-white pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden border-b border-slate-800">
      {/* Background Mesh, Grid & Glow Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      
      {/* Radial lighting flares */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0B0F19] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top High-Tech Badge Strip */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-red-500/30 text-xs font-mono text-red-400 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-semibold tracking-wider uppercase">UL 508A & ISO 9001:2015 CERTIFIED PANEL SHOP</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-400">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>SIEMENS & ROCKWELL INTEGRATION ALLIANCE</span>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight font-['Rajdhani'] leading-[1.08] text-white">
              Pioneering <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-red-400">Smart Factory Automation</span> & Control Systems
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
              End-to-end industrial engineering: PLC/SCADA programming, custom electrical control panel fabrication, robotics, and industrial IoT solutions.
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 pb-2 text-sm text-slate-300 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span>Zero-downtime line cutovers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span>Deterministic IEC 61131-3 logic</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span>3D EPLAN Pro Panel design</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span>ISO 13849 Category 4 / PLe safety</span>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => {
                  if (onProjectsClick) onProjectsClick();
                  else scrollTo('#projects');
                }}
                className="inline-flex items-center justify-center gap-2.5 bg-[#E51A1A] hover:bg-[#D6181F] text-white font-semibold text-base px-8 py-3.5 rounded-lg shadow-xl shadow-red-900/40 hover:shadow-red-600/50 transition-all duration-200 active:scale-95 group"
              >
                <span>Explore Our Projects</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  if (onConsultationClick) onConsultationClick();
                  else scrollTo('#contact');
                }}
                className="inline-flex items-center justify-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-500 font-semibold text-base px-7 py-3.5 rounded-lg transition-all duration-200 active:scale-95"
              >
                <span>Get Technical Consultation</span>
              </button>
            </div>

            {/* Rapid Response Notice */}
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Plant emergency hotline active: average response window &lt; 15 mins</span>
            </div>
          </div>

          {/* Right Column: High-Tech Industrial Terminal & Graphic Card */}
          <div className="lg:col-span-5 xl:col-span-5 relative">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-950/90 border border-slate-700/80 p-5 shadow-2xl backdrop-blur-xl overflow-hidden">
              
              {/* Header of panel */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-slate-400 pl-2">CAX-GATEWAY-NODE #01</span>
                </div>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
              </div>

              {/* Live Plant Telemetry Simulator Display */}
              <div className="py-4 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-slate-400 text-[11px]">LINE 4 SCADA STATUS</div>
                    <div className="text-lg font-bold text-white mt-1">SYNCHRONIZED</div>
                    <div className="text-[10px] text-emerald-400 mt-1">Cycle Rate: 1,240 ppm</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-slate-400 text-[11px]">PLC CYCLE JITTER</div>
                    <div className="text-lg font-bold text-emerald-400 mt-1">0.42 ms</div>
                    <div className="text-[10px] text-slate-400 mt-1">Profinet IRT Active</div>
                  </div>
                </div>

                {/* Subsystem status bars */}
                <div className="space-y-2.5 text-xs font-mono bg-slate-900/60 p-3.5 rounded-lg border border-slate-800/80">
                  <div className="flex justify-between text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-red-500" /> Siemens S7-1500F CPU Core
                    </span>
                    <span className="text-emerald-400 font-semibold">RUN / OPTIMAL</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full w-[88%]" />
                  </div>

                  <div className="flex justify-between text-slate-300 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5 text-blue-400" /> Ignition SCADA Gateway
                    </span>
                    <span className="text-emerald-400 font-semibold">99.98% UPTIME</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full w-[99.8%]" />
                  </div>
                </div>

                {/* Technical badge banner */}
                <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/20 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-red-500 shrink-0" />
                    <div>
                      <div className="font-semibold text-white">Full Turnkey Assurance</div>
                      <div className="text-[11px] text-slate-400">Pre-tested FAT at Detroit Facility</div>
                    </div>
                  </div>
                  <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-[10px] font-mono font-bold">
                    VERIFIED
                  </span>
                </div>
              </div>

              {/* Decorative bottom barcode/specs */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>SPEC: UL508A / NFPA-79</span>
                <span>REV: 2026.04</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Metric Counter Strip */}
        <div className="mt-14 pt-10 border-t border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {companyInfo.metrics.map((metric, idx) => (
              <div 
                key={idx}
                className="relative bg-slate-900/40 backdrop-blur-sm rounded-xl p-5 border border-slate-800/80 hover:border-red-500/40 transition-colors group"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Rajdhani'] text-white group-hover:text-red-500 transition-colors tracking-tight">
                  {metric.value}
                </div>
                <div className="text-sm sm:text-base font-semibold text-slate-200 mt-1">
                  {metric.label}
                </div>
                <div className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {metric.detail}
                </div>
                <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                  <div className="w-12 h-1.5 bg-red-600/30 transform rotate-45 translate-x-3 -translate-y-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
