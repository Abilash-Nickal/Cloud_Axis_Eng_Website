import React, { useState } from 'react';
import { ExternalLink, Tag, Clock, TrendingUp, CheckCircle, X, ChevronRight, Filter } from 'lucide-react';
import { projectItems } from '../data/industrialData';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filterTabs = [
    'All',
    'Factory Automation',
    'Control Panels',
    'Robotics',
    'Industrial IoT'
  ];

  const filteredProjects = activeFilter === 'All'
    ? projectItems
    : projectItems.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 md:py-28 bg-[#0F172A] text-white relative border-b border-slate-800">
      {/* Background tech grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-600/10 border border-red-500/30 text-xs font-mono text-red-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span>FIELD PROVEN INDUSTRIAL CASE STUDIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Rajdhani'] tracking-tight text-white">
            Engineered For Extreme <span className="text-red-500">Reliability & Scale</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-3">
            Explore our turnkey deployments across high-volume bottling, automotive stamping, clean energy EV lines, and precision chemical processing.
          </p>
        </div>

        {/* Filter Tabs Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#E51A1A] text-white shadow-lg shadow-red-900/40 border border-red-500 scale-105'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-slate-950/80 rounded-xl overflow-hidden border border-slate-800 hover:border-red-500/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Project Image Container */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Sector Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-slate-900/90 backdrop-blur-md text-red-400 border border-red-500/30 text-[11px] font-mono font-semibold px-2.5 py-1 rounded">
                      {project.clientSector}
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/60 backdrop-blur-md text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold font-['Rajdhani'] text-white group-hover:text-red-400 transition-colors line-clamp-2 mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                    {project.objective}
                  </p>

                  {/* Technical Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="px-6 pb-6 pt-2">
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-400 font-medium">
                    {project.metrics.split('•')[0]}
                  </span>
                  
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-red-400 transition-colors"
                  >
                    <span>View Case Study</span>
                    <ChevronRight className="w-4 h-4 text-red-500 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Case Study Deep-Dive Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-red-400 font-semibold px-2 py-0.5 rounded bg-red-950/50 border border-red-500/30">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Sector: {selectedProject.clientSector}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-['Rajdhani'] text-white">
                  {selectedProject.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Media & Stats Bar */}
            <div className="relative h-60 w-full rounded-xl overflow-hidden my-6 border border-slate-800">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                <div className="bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono text-emerald-400 font-semibold">
                  Result: {selectedProject.metrics}
                </div>
                <div className="bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono text-slate-300">
                  Execution: {selectedProject.timeline}
                </div>
              </div>
            </div>

            {/* Modal Details */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Engineering Challenge & Objective:
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-lg border border-slate-800">
                  {selectedProject.objective}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Scope of Delivery & Plant Commissioning:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProject.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
                      <CheckCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Hardware & Protocols Applied:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((t, idx) => (
                    <span key={idx} className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-mono text-white">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                Turnkey Sign-Off by CloudAxis Field Engineering
              </span>

              <button
                onClick={() => setSelectedProject(null)}
                className="bg-[#E51A1A] hover:bg-[#D6181F] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
