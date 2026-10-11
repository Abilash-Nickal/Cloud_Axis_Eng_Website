import React from 'react';
import { Mail, Phone, MapPin, ArrowUp, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { companyInfo } from '../data/industrialData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070A11] text-slate-400 border-t border-slate-800 text-sm">
      {/* Upper Footer: Engineering Certifications Strip */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <ShieldCheck className="w-4 h-4 text-red-500" />
            <span className="font-semibold uppercase tracking-wider">Industrial Certification Standards:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
            {companyInfo.certifications.slice(0, 4).map((c, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-red-500/40 bg-slate-900 flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="CloudAxis Engineering" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-bold tracking-tight text-white font-['Rajdhani']">
                  Cloud<span className="text-red-500">Axis</span>
                </span>
                <span className="bg-[#E51A1A] text-white text-[10px] font-extrabold tracking-widest uppercase px-1.5 py-0.5 rounded font-mono">
                  ENGINEERING
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              {companyInfo.tagline}. Specializing in turnkey automated systems, high-speed PLC control, and custom UL 508A electrical panel fabrication.
            </p>

            <div className="pt-2 text-xs space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>{companyInfo.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>{companyInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span className="font-mono">{companyInfo.phone}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Capabilities */}
          <div>
            <h4 className="text-sm font-bold font-['Rajdhani'] uppercase tracking-wider text-white mb-4">
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors">
                  PLC & SCADA Architecture
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors">
                  UL 508A Panel Fabrication
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors">
                  Robotics & Motion Control
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors">
                  Industrial IoT & Edge Telemetry
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors">
                  Machine Retrofitting & Safety
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors">
                  Turnkey Commissioning & FAT
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div>
            <h4 className="text-sm font-bold font-['Rajdhani'] uppercase tracking-wider text-white mb-4">
              Company & Projects
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollTo('home')} className="hover:text-white transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('projects')} className="hover:text-white transition-colors">
                  Industrial Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors">
                  About Our Engineering Shop
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('testimonials')} className="hover:text-white transition-colors">
                  Client Endorsements
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors">
                  Request RFP Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Support & Emergency */}
          <div>
            <h4 className="text-sm font-bold font-['Rajdhani'] uppercase tracking-wider text-white mb-4">
              Plant Emergency
            </h4>
            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-3">
              <div className="text-xs text-slate-300">
                Critical line breakdown or sudden PLC fault?
              </div>
              <div className="text-sm font-bold font-mono text-red-400">
                24/7 Field Dispatch
              </div>
              <a 
                href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`} 
                className="w-full inline-flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span>Call Hotline</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-400 font-mono space-y-1 text-center sm:text-left">
            <div>© 2026 CloudAxis Engineering Inc. All rights reserved. Registered Industrial Control System Integrator.</div>
            <div className="text-slate-400 font-sans">
              Design &amp; Developed by{' '}
              <a
                href="https://arumugam-abilashan.web.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-bold hover:text-[#E51A1A] transition-colors"
              >
                Arumugam Abilashan
              </a>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("CloudAxis Engineering adheres strictly to industrial non-disclosure agreements (NDAs) and SOC2/ISO 27001 data protection principles."); }} className="text-slate-400 hover:text-white transition-colors">
              Privacy Policy & NDA
            </a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Standard engineering terms: UL 508A inspection, GAMP 5 validation protocols, and 2-year warranty on fabrication."); }} className="text-slate-400 hover:text-white transition-colors">
              Engineering Terms
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-800"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
