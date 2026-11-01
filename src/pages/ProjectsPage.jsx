import React, { useState, useEffect } from 'react';
import { detailedProjects } from '../data/cloudAxisData';
import { getProjectsList } from '../lib/supabase';
import { 
  ChevronRight, 
  Search, 
  Layers, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  X, 
  Award, 
  Sliders, 
  FileText, 
  PhoneCall, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function ProjectsPage({ onOpenQuote, onNavigateHome }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState(null);
  const [projectList, setProjectList] = useState(detailedProjects);

  useEffect(() => {
    let isMounted = true;
    getProjectsList().then(res => {
      if (isMounted && res.data && res.data.length > 0) {
        setProjectList(res.data);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const categories = [
    'All',
    'Airport Systems',
    'Control Panels',
    'Factory Automation',
    'Robotics',
    'Industrial IoT'
  ];

  const filteredProjects = projectList.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      item.title?.toLowerCase().includes(query) ||
      item.sector?.toLowerCase().includes(query) ||
      (Array.isArray(item.tags) && item.tags.some(tag => tag?.toLowerCase().includes(query))) ||
      item.objective?.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen animate-in fade-in duration-300">
      
      {/* 1. Page Hero Header */}
      <section className="relative bg-[#0B0F19] text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-2 border-[#E51A1A]">
        {/* Subtle Industrial Grid Background */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#E51A1A 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4">
            <button 
              onClick={onNavigateHome} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[#E51A1A] font-semibold">Turnkey Projects</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-[#E51A1A] uppercase bg-[#E51A1A]/10 border border-[#E51A1A]/30 px-3 py-1 rounded-full mb-4">
                <Sliders className="w-3.5 h-3.5" />
                ENGINEERED PORTFOLIO
              </span>
              <h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4"
                style={{ fontFamily: "'Times New Roman', Times, serif" }}
              >
                Turnkey Engineering <span className="text-[#E51A1A]">& Automation Projects</span>
              </h1>
              <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
                Explore our mission-critical airport handling systems, UL 508A custom electrical panels, PLC/SCADA migrations, and robotic workcells commissioned across aviation, automotive, and heavy industrial facilities.
              </p>
            </div>

            {/* Quick Metrics Badges */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 shrink-0 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <div className="text-center px-2">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#E51A1A]">100%</div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-1">FAT Pass Rate</div>
              </div>
              <div className="text-center px-2 border-x border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">180+</div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-1">Systems Built</div>
              </div>
              <div className="text-center px-2">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#E51A1A]">0</div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-1">Downtime Loss</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Filter Tabs & Search Bar */}
      <div className="border-b border-gray-200 bg-gray-50/90 sticky top-[74px] z-30 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#E51A1A] text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by PLC, client, sector..."
              className="w-full pl-10 pr-4 py-2 bg-white text-sm text-gray-800 border border-gray-300 rounded-full focus:outline-none focus:border-[#E51A1A] focus:ring-1 focus:ring-[#E51A1A] transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 3. Projects Grid */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <p className="text-xs sm:text-sm text-gray-500 font-mono">
            Showing <span className="font-bold text-gray-900">{filteredProjects.length}</span> documented case studies
          </p>
          <button 
            onClick={() => onOpenQuote && onOpenQuote('Turnkey Custom Project')}
            className="text-xs font-bold text-[#E51A1A] hover:text-black flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Have a specific project in mind?</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <Layers className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-800 mb-1">No Projects Match Your Filter</h3>
            <p className="text-sm text-gray-500 mb-4">Try clearing your search query or selecting "All" categories.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="text-xs bg-[#E51A1A] text-white font-bold px-4 py-2 rounded-lg hover:bg-black transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
              >
                {/* Project Image Banner */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Category & Sector Badges */}
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#E51A1A] text-white shadow-md">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                    <span className="font-medium bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/10">
                      {project.sector}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px] bg-black/60 backdrop-blur-xs px-2 py-1 rounded-md text-amber-300">
                      <Clock className="w-3 h-3" />
                      {project.duration}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Key Metric Highlight */}
                    <div className="mb-3 p-2.5 bg-red-50/70 border-l-3 border-[#E51A1A] rounded-r-lg">
                      <div className="text-[11px] font-mono text-zinc-600 uppercase font-semibold">Measurable Result:</div>
                      <div className="text-xs font-bold text-[#E51A1A]">{project.metric}</div>
                    </div>

                    {/* Title */}
                    <h3 
                      className="text-lg font-bold text-gray-900 group-hover:text-[#E51A1A] transition-colors leading-snug mb-2.5"
                      style={{ fontFamily: "'Times New Roman', serif" }}
                    >
                      {project.title}
                    </h3>

                    {/* Objective Excerpt */}
                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                      {project.objective}
                    </p>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className="text-[10px] font-mono bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveProject(project)}
                      className="text-xs font-bold text-gray-900 hover:text-[#E51A1A] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Deep Dive Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => onOpenQuote && onOpenQuote(project.title)}
                      className="text-[11px] font-bold uppercase tracking-wider text-white bg-zinc-900 hover:bg-[#E51A1A] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Quote Similar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Turnkey Engineering Consultation Banner */}
      <section className="bg-gradient-to-r from-[#0B0F19] via-[#111827] to-black text-white py-16 px-4 sm:px-6 lg:px-8 border-y-2 border-[#E51A1A] relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E51A1A] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              BESPOKE INDUSTRIAL AUTOMATION
            </div>
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold"
              style={{ fontFamily: "'Times New Roman', serif" }}
            >
              Have a Custom Control or Automation Challenge?
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl font-light">
              Our registered controls architects, UL 508A panel shop, and field deployment teams are ready to review your electrical single lines and mechanical specs for immediate quotation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenQuote && onOpenQuote('Custom Automation Project')}
              className="w-full sm:w-auto bg-[#E51A1A] hover:bg-white hover:text-black text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-95 text-center"
            >
              Request Engineering Quote
            </button>
            <a
              href="tel:+94112345678"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#E51A1A]" />
              <span>Talk to an Engineer</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. Case Study In-Depth Modal */}
      {activeProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveProject(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border-2 border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 bg-black/70 hover:bg-[#E51A1A] text-white p-2 rounded-full transition-colors cursor-pointer z-10 shadow"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title & Metadata inside Hero */}
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-[#E51A1A] text-white px-2.5 py-0.5 rounded">
                    {activeProject.category}
                  </span>
                  <span className="text-[11px] font-medium bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded text-slate-200">
                    {activeProject.sector}
                  </span>
                  <span className="text-[11px] font-mono text-amber-300 ml-auto">
                    Duration: {activeProject.duration}
                  </span>
                </div>
                <h2 
                  className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight"
                  style={{ fontFamily: "'Times New Roman', serif" }}
                >
                  {activeProject.title}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Metric Result Bar */}
              <div className="bg-[#0B0F19] text-white p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 border-l-4 border-[#E51A1A]">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400">Verified Plant Performance Metric</div>
                  <div className="text-base font-bold text-[#E51A1A]">{activeProject.metric}</div>
                </div>
                <button
                  onClick={() => {
                    const title = activeProject.title;
                    setActiveProject(null);
                    if (onOpenQuote) onOpenQuote(title);
                  }}
                  className="text-xs bg-[#E51A1A] hover:bg-white hover:text-black text-white font-bold px-4 py-2 rounded-lg transition-colors shrink-0 cursor-pointer"
                >
                  Request Similar RFP
                </button>
              </div>

              {/* Objective */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase text-gray-500 tracking-wider mb-2">
                  Project Challenge & Objective
                </h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-200">
                  {activeProject.objective}
                </p>
              </div>

              {/* Deliverables Checklist */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase text-gray-500 tracking-wider mb-3">
                  Scope of Delivery & Engineering Milestones
                </h3>
                <div className="space-y-2.5">
                  {activeProject.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-gray-100 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-[#E51A1A] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-800 font-medium leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Deployed */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase text-gray-500 tracking-wider mb-2">
                  Hardware, Protocols & Software Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="text-xs font-mono bg-zinc-100 text-zinc-800 font-semibold px-3 py-1 rounded-md border border-zinc-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setActiveProject(null)}
                  className="w-full sm:w-auto text-xs font-bold text-gray-600 hover:text-black py-2.5 px-4 rounded-lg transition-colors cursor-pointer"
                >
                  Close Case Study
                </button>
                <button
                  onClick={() => {
                    const title = activeProject.title;
                    setActiveProject(null);
                    if (onOpenQuote) onOpenQuote(title);
                  }}
                  className="w-full sm:w-auto bg-[#E51A1A] hover:bg-black text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-lg shadow-md transition-colors cursor-pointer"
                >
                  Consult on this Technology
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
