import React, { useState } from 'react';
import { 
  Cpu, 
  Zap, 
  Bot, 
  Network, 
  ShieldCheck, 
  Activity, 
  ArrowRight, 
  Check, 
  X, 
  Layers, 
  FileCode2,
  Wrench
} from 'lucide-react';
import { coreServices } from '../data/industrialData';

const iconMap = {
  Cpu: Cpu,
  Zap: Zap,
  Bot: Bot,
  Network: Network,
  ShieldCheck: ShieldCheck,
  Activity: Activity
};

export default function Services({ onSelectServiceForQuote }) {
  const [activeModalService, setActiveModalService] = useState(null);

  return (
    <section id="services" className="py-20 md:py-28 bg-slate-900 text-white relative border-b border-slate-800">
      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-600/10 border border-red-500/30 text-xs font-mono text-red-400">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>ENGINEERING CAPABILITIES & SOLUTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Rajdhani'] tracking-tight text-white">
              Industrial Automation & <span className="text-red-500">Custom Engineering</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              From hardware blueprinting and UL 508A panel fabrication to deterministic control algorithms and plant telemetry, we provide end-to-end industrial execution.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">STANDARDS:</span>
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300">IEC 61131-3</span>
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300">UL 508A</span>
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300">NFPA 79</span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreServices.map((service) => {
            const Icon = iconMap[service.iconName] || Cpu;

            return (
              <div
                key={service.id}
                className="group relative rounded-xl bg-slate-950/80 border border-slate-800 p-8 hover:border-red-500/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-red-950/20 flex flex-col justify-between"
              >
                {/* Accent top border strip */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl" />

                <div>
                  {/* Icon & Index */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-mono text-slate-500 font-semibold">
                      CAPABILITY #{service.id.toUpperCase().slice(0, 4)}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-xl sm:text-2xl font-bold font-['Rajdhani'] text-white group-hover:text-red-400 transition-colors mb-3">
                    {service.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Tech stack badges */}
                  <div className="mb-6">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">Key Platforms:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {service.techStack.slice(0, 3).map((tech, idx) => (
                        <span 
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                      {service.techStack.length > 3 && (
                        <span className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 font-mono">
                          +{service.techStack.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action footer */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 group-hover:text-red-400 transition-colors hover:underline"
                  >
                    <span>Technical Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => {
                      if (onSelectServiceForQuote) {
                        onSelectServiceForQuote(service.title);
                      } else {
                        const target = document.querySelector('#contact');
                        if (target) target.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-[11px] px-2.5 py-1 rounded bg-red-600/10 hover:bg-red-600 hover:text-white text-red-400 border border-red-500/20 font-mono transition-colors"
                  >
                    Quote Service
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Turnkey Callout Banner */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500 shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold font-['Rajdhani'] text-white">Need a Custom Turnkey Automation Package?</h4>
              <p className="text-sm text-slate-400">We manage projects from initial CAD P&ID architecture to on-site shift commissioning and SAT sign-off.</p>
            </div>
          </div>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector('#contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-[#E51A1A] hover:bg-[#D6181F] text-white text-sm font-semibold px-6 py-3 rounded-lg shadow-md transition-all shrink-0 active:scale-95"
          >
            <span>Consult Our Engineering Team</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Service Details Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500">
                  {React.createElement(iconMap[activeModalService.iconName] || Cpu, { className: "w-5 h-5" })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-['Rajdhani'] text-white">
                    {activeModalService.title}
                  </h3>
                  <div className="text-xs font-mono text-red-400">Full Architectural Scope</div>
                </div>
              </div>
              <button 
                onClick={() => setActiveModalService(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-6 space-y-6">
              <p className="text-slate-300 text-sm leading-relaxed">
                {activeModalService.fullDesc}
              </p>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Hardware & Software Platforms:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalService.techStack.map((tech, i) => (
                    <span key={i} className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-mono text-white">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Engineering Deliverables & Documentation:
                </h4>
                <ul className="space-y-2.5">
                  {activeModalService.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveModalService(null)}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const serviceTitle = activeModalService.title;
                  setActiveModalService(null);
                  if (onSelectServiceForQuote) {
                    onSelectServiceForQuote(serviceTitle);
                  } else {
                    const el = document.querySelector('#contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-[#E51A1A] hover:bg-[#D6181F] text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-md transition-colors"
              >
                <span>Request Scope for this Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
