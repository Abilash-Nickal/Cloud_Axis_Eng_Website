import React, { useState, useEffect } from 'react';
import { Star, Quote, Building2, Shield, CheckCircle } from 'lucide-react';
import { clientTestimonials, partnerBrands } from '../data/industrialData';
import { getTestimonialsList } from '../lib/supabase';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(clientTestimonials);

  useEffect(() => {
    let isMounted = true;
    getTestimonialsList().then(res => {
      if (isMounted && res.data && res.data.length > 0) {
        setTestimonials(res.data);
      }
    });
    return () => { isMounted = false; };
  }, []);

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[#0F172A] text-white relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-600/10 border border-red-500/30 text-xs font-mono text-red-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span>CLIENT TESTIMONIALS & TRUSTED PARTNERS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Rajdhani'] tracking-tight text-white">
            Trusted By <span className="text-red-500">Plant Directors & Chief Engineers</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-3">
            Hear from operations leaders whose facilities depend on CloudAxis control architectures every single day.
          </p>
        </div>

        {/* 3-Column Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="relative rounded-2xl bg-slate-950/80 border border-slate-800 p-8 flex flex-col justify-between hover:border-red-500/40 transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >
              <div>
                {/* Rating stars & Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-slate-900 text-red-400 px-2.5 py-1 rounded border border-red-500/20">
                    {t.tag}
                  </span>
                </div>

                {/* Quote Icon & Text */}
                <Quote className="w-8 h-8 text-red-500/30 mb-3" />
                <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Author profile */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3.5">
                <img
                  src={t.avatar_url || t.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
                  alt={t.client_name || t.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-red-500/40"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-sm font-bold text-white font-['Rajdhani']">
                    {t.client_name || t.author}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    {t.designation || t.role}
                  </p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3 h-3 text-red-500" />
                    <span>{t.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Automation Partner Trust Banner */}
        <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-8 sm:p-10">
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
              OFFICIAL SYSTEM INTEGRATION & HARDWARE PARTNERS
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {partnerBrands.map((brand, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 rounded-xl p-4 border border-slate-800/90 hover:border-red-500/40 transition-colors flex flex-col items-center justify-center text-center group"
              >
                <div className="font-['Rajdhani'] font-extrabold text-sm sm:text-base text-slate-200 group-hover:text-red-400 transition-colors tracking-wider">
                  {brand.logoText}
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">
                  {brand.tier}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
