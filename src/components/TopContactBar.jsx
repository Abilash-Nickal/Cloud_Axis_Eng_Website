import React from 'react';
import { companyDetails } from '../data/cloudAxisData';

export default function TopContactBar() {
  return (
    <div className="bg-[#0B0F19] text-slate-200 z-50 relative text-xs sm:text-sm font-sans tracking-wide border-b border-red-600/30">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Phone */}
        <a 
          href={`tel:${companyDetails.phone.replace(/[^0-9+]/g, '')}`} 
          className="flex items-center gap-2 hover:text-red-400 transition-colors"
        >
          <svg className="w-4 h-4 shrink-0 fill-current text-[#E51A1A]" viewBox="0 0 24 24">
            <path d="M2 3h4l2 5-3 2c1 3 4 6 7 7l2-3 5 2v4c0 1-1 2-2 2C7 22 2 13 2 4c0-1 1-2 2-2z" />
          </svg>
          <span className="font-semibold text-white">{companyDetails.phone}</span>
        </a>

        {/* Email */}
        <a 
          href={`mailto:${companyDetails.email}`} 
          className="flex items-center gap-2 hover:text-red-400 transition-colors"
        >
          <svg className="w-4 h-4 shrink-0 fill-current text-[#E51A1A]" viewBox="0 0 24 24">
            <path d="M20 4H4a2 2 0 00-2 2v1.8l10 6 10-6V6a2 2 0 00-2-2zM2 8.2V18a2 2 0 002 2h16a2 2 0 002-2V8.2l-10 6-10-6z" />
          </svg>
          <span>{companyDetails.email}</span>
        </a>

        {/* Reg No & Accreditation */}
        <div className="hidden md:flex items-center gap-2 text-slate-300">
          <svg className="w-4 h-4 shrink-0 fill-current text-[#E51A1A]" viewBox="0 0 24 24">
            <path d="M19 3H5a2 2 0 00-2 2v16l7-3 7 3V5a2 2 0 00-2-2z" />
          </svg>
          <span className="font-mono text-xs font-semibold tracking-wider text-slate-300">
            {companyDetails.regNo}
          </span>
        </div>
      </div>
    </div>
  );
}
