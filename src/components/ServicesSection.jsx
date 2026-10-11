import React, { useState, useEffect, useRef } from 'react';
import { servicesOffer } from '../data/cloudAxisData';
import { ArrowRight, ArrowUpRight, Check, X, Wrench, Cpu, ShieldCheck } from 'lucide-react';

export default function ServicesSection({ onServiceSelect }) {
  const [activeModalService, setActiveModalService] = useState(null);
  const canvasRef = useRef(null);

  // Flame and ember particle simulation spanning the entire section
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = 0;
    let height = 0;

    const parent = canvas.parentElement;

    const updateDimensions = () => {
      if (!parent || !canvas) return;
      const rect = parent.getBoundingClientRect();
      width = canvas.width = rect.width || window.innerWidth;
      height = canvas.height = Math.max(parent.scrollHeight, parent.offsetHeight, rect.height || 0);
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    if (parent) resizeObserver.observe(parent);

    window.addEventListener('resize', updateDimensions);

    // Warm flame ember colors
    const colors = [
      'rgba(255, 69, 0, ',    // Fiery red-orange
      'rgba(255, 140, 0, ',   // Deep flame orange
      'rgba(255, 190, 11, ',  // Bright amber gold
      'rgba(229, 26, 26, ',   // CloudAxis Crimson
      'rgba(255, 215, 0, ',   // Yellow spark
      'rgba(255, 100, 30, ',  // Warm ember
    ];

    const particleCount = 140;

    const createParticle = () => {
      const colorBase = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * (width || window.innerWidth),
        y: Math.random() * (height || 2400),
        size: Math.random() * 2.8 + 1.2,
        speedY: Math.random() * 1.4 + 0.5,
        speedX: (Math.random() - 0.5) * 0.8,
        swaySpeed: Math.random() * 0.03 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.7 + 0.3,
        maxLife: Math.random() * 320 + 180,
        life: Math.random() * 200, // Staggered initial progress so they don't fade together
        colorBase
      };
    };

    const particles = Array.from({ length: particleCount }, () => createParticle());

    const render = () => {
      if (width === 0 || height === 0) {
        updateDimensions();
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;
        p.y -= p.speedY;
        p.x += Math.sin(p.life * p.swaySpeed + p.swayOffset) * p.speedX;

        // Realistic flame ember lifecycle (ignite, flicker, burn out)
        const progress = p.life / p.maxLife;
        let currentAlpha = 0;
        if (progress < 0.15) {
          currentAlpha = (progress / 0.15) * p.alpha;
        } else if (progress < 0.8) {
          currentAlpha = p.alpha * (0.8 + Math.sin(p.life * 0.25) * 0.2); // subtle flame flicker
        } else {
          currentAlpha = (1 - (progress - 0.8) / 0.2) * p.alpha;
        }

        // When a particle dies or floats above the section, respawn to guarantee full section coverage
        if (p.life >= p.maxLife || p.y < -20 || currentAlpha <= 0) {
          const respawnAtBottom = Math.random() < 0.6;
          p.x = Math.random() * width;
          p.y = respawnAtBottom ? height + Math.random() * 30 : Math.random() * height;
          p.life = 0;
          p.maxLife = Math.random() * 320 + 180;
          p.alpha = Math.random() * 0.7 + 0.3;
          p.size = Math.random() * 2.8 + 1.2;
          p.speedY = Math.random() * 1.4 + 0.5;
          p.colorBase = colors[Math.floor(Math.random() * colors.length)];
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorBase}${Math.max(0, Math.min(1, currentAlpha))})`;
        ctx.shadowBlur = p.size * 3.5;
        ctx.shadowColor = `${p.colorBase}0.85)`;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (parent) resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Technical details for the breakdown modal
  const technicalScopes = {
    "Airport Baggage Handling Systems": {
      platforms: ["Siemens S7-1500F", "Profinet IRT", "Wonderware InTouch", "Sick Optical Barcode Sorting"],
      deliverables: [
        "Check-in conveyor weigh scale integration",
        "High-speed sorting & pusher arm synchronization",
        "Departure baggage makeup carousel installation",
        "Fail-safe emergency stop & ISO 13849 safety compliance"
      ]
    },
    "Airport Baggage Handling System": {
      platforms: ["Siemens S7-1500F", "Profinet IRT", "Wonderware InTouch", "Sick Optical Barcode Sorting"],
      deliverables: [
        "Check-in conveyor weigh scale integration",
        "High-speed sorting & pusher arm synchronization",
        "Departure baggage makeup carousel installation",
        "Fail-safe emergency stop & ISO 13849 safety compliance"
      ]
    },
    "General Engineering Supplies": {
      platforms: ["Schneider Switchgear", "Phoenix Contact", "Rittal Enclosures", "Festo Pneumatics"],
      deliverables: [
        "Certified industrial sensor & actuator supply",
        "Precision fluid control valves & manifolds",
        "Heavy-duty switchgear & motor disconnects",
        "Fast-dispatch replacement parts inventory"
      ]
    },
    "Industrial Automation & PLC/SCADA": {
      platforms: ["Siemens TIA Portal", "Rockwell Studio 5000", "Ignition SCADA v8.1", "Modbus TCP / Profinet"],
      deliverables: [
        "IEC 61131-3 deterministic logic programming",
        "ISA-101 high-performance HMI visualizations",
        "Historical data logging & plant OEE tracking",
        "Zero-downtime hot backup redundancy"
      ]
    },
    "Automation Systems & PLC/SCADA": {
      platforms: ["Siemens TIA Portal", "Rockwell Studio 5000", "Ignition SCADA v8.1", "Modbus TCP / Profinet"],
      deliverables: [
        "IEC 61131-3 deterministic logic programming",
        "ISA-101 high-performance HMI visualizations",
        "Historical data logging & plant OEE tracking",
        "Zero-downtime hot backup redundancy"
      ]
    },
    "Custom Electrical Control Panels": {
      platforms: ["EPLAN Pro Panel 3D", "UL 508A Listed", "Rittal TS8", "Allen-Bradley GuardLogix"],
      deliverables: [
        "Complete electrical schematics & wire schedules",
        "Thermal dissipation modeling & active climate control",
        "100% Point-to-Point Factory Acceptance Testing (FAT)",
        "UL 508A / CE serialization & labeling"
      ]
    },
    "Electrical Panel Design and Supply": {
      platforms: ["EPLAN Pro Panel 3D", "UL 508A Listed", "Rittal TS8", "Allen-Bradley GuardLogix"],
      deliverables: [
        "Complete electrical schematics & wire schedules",
        "Thermal dissipation modeling & active climate control",
        "100% Point-to-Point Factory Acceptance Testing (FAT)",
        "UL 508A / CE serialization & labeling"
      ]
    },
    "Mechanical & Electro-Mechanical Design": {
      platforms: ["SolidWorks 3D CAD", "Simulation FEA", "Precision Actuators", "CNC Machining"],
      deliverables: [
        "Kinematic mechanical design & 3D assembly models",
        "Stress & thermal finite element analysis (FEA)",
        "Pneumatic, servo & mechanical integration",
        "Detailed bill of materials (BOM) & fabrication drawings"
      ]
    },
    "Smart Manufacturing & IoT Solutions": {
      platforms: ["MQTT Sparkplug B", "OPC UA & DA", "Node-RED", "Advantech Rugged Edge", "AWS IoT Core"],
      deliverables: [
        "Edge telemetry & real-time OEE machine monitoring",
        "Predictive motor vibration & temperature alerts",
        "Secure TLS air-gapped industrial connectivity",
        "Custom responsive web & mobile plant KPI dashboards"
      ]
    },
    "VFD & Servo Motion Control": {
      platforms: ["Kinetix 5700", "Siemens Sinamics", "Yaskawa Drives", "Schneider Altivar"],
      deliverables: [
        "Multi-axis synchronized kinematic motion profiling",
        "Closed-loop torque, speed, and position tuning",
        "Harmonic suppression & regen energy optimization",
        "Integrated safe torque off (STO) safety loops"
      ]
    },
    "Instrumentation & Process Control": {
      platforms: ["Rosemount / Emerson", "Endress+Hauser", "Yokogawa", "HART Protocol"],
      deliverables: [
        "Precision 4-20mA & HART sensor loop calibration",
        "PID loop tuning for thermal, pressure & level skids",
        "Safety-instrumented systems (SIS) validation",
        "Traceable NIST calibration certificates"
      ]
    },
    "Factory Automation Retrofits": {
      platforms: ["Legacy SLC500 / PLC-5 Migration", "Siemens S5 to S7-1500", "Distributed Safety I/O"],
      deliverables: [
        "Seamless obsolete controller drop-in replacement",
        "Preservation of field wiring & machinery structures",
        "Zero-downtime weekend cutovers",
        "Updated schematics & operator modern touchscreens"
      ]
    },
    "Process Optimization & Audits": {
      platforms: ["Bottleneck FFT Analysis", "Cycle-Time Simulation", "OEE Telemetry Analytics"],
      deliverables: [
        "Comprehensive line throughput audit report",
        "Cycle time bottleneck elimination plan",
        "Energy consumption & peak load reduction strategies",
        "ROI-backed automation modernization roadmap"
      ]
    },
    "Custom Machinery Manufacturing": {
      platforms: ["SolidWorks Mechanical", "Modular Extrusion / Steel Frames", "Rotary Indexers"],
      deliverables: [
        "Turnkey custom assembly & packaging machines",
        "High-precision pneumatic / servo pick-and-place",
        "Factory acceptance testing (FAT) with production run",
        "Complete CE / ISO documentation and operator manuals"
      ]
    },
    "Concrete Plants and Machinery": {
      platforms: ["Mitsubishi iQ-R", "Load Cell Batching Controllers", "Pneumatic Fluidization"],
      deliverables: [
        "Automated aggregate & cement batching automation",
        "Continuous moisture compensation algorithms",
        "High-pressure pneumatic silo transfer skids",
        "Full SCADA batch record recipe management"
      ]
    },
    "Heavy Steel Fabrication": {
      platforms: ["SolidWorks 3D", "AutoCAD Mechanical", "Certified AWS Welders", "Laser CNC Cutting"],
      deliverables: [
        "Custom structural gantry & machine frames",
        "Vibration-damped precision motor mounting plates",
        "Heavy-gauge stainless steel & carbon assemblies",
        "Ultrasonic weld inspection & load rating sign-off"
      ]
    },
    "Maintenance & Consultation Agreement": {
      platforms: ["Fluke Thermal Imagers", "Vibration FFT Analyzers", "24/7 VPN Diagnostics"],
      deliverables: [
        "Guaranteed 15-minute emergency response SLA",
        "Scheduled thermographic & insulation audits",
        "Predictive motor bearing vibration monitoring",
        "On-site shift relief & controls engineer dispatch"
      ]
    },
    "Cranes and Heavy Accessories": {
      platforms: ["Konecranes / Demag Drives", "Dual Wire Rope Hoists", "Wireless Tele-Radio Remotes"],
      deliverables: [
        "Overhead bridge crane variable speed profiling",
        "Anti-sway dynamic motion stabilization",
        "Tandem synchronized multi-hoist lifting logic",
        "Annual load certification & brake drop testing"
      ]
    },
    "Industrial Conveyor Systems": {
      platforms: ["SEW Eurodrive Gearmotors", "Modular Intralox Belting", "Profinet Distributed I/O"],
      deliverables: [
        "High-volume case & carton accumulation conveyors",
        "Variable speed feedscrew bottle indexing lines",
        "Integrated optical photo-eye line balancing",
        "Rugged washdown IP69K stainless construction"
      ]
    },
    "Material Handling & Warehouse Tech": {
      platforms: ["FANUC Roboguide", "Cognex 3D Area Scanners", "ASRS Rack Cranes"],
      deliverables: [
        "Automated end-of-line robotic palletizing cells",
        "Dynamic barcode verification & SKU route diverters",
        "Narrow-aisle automated guided vehicle (AGV) integration",
        "Perimeter optical muting safety laser scanners"
      ]
    }
  };

  return (
    <section 
      id="services" 
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-white"
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #110101 20%, #2f0202 45%, #5a0000 70%, #7e0000 88%, #8a0000 100%)'
      }}
    >
      {/* Particle Flame Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
      />

      {/* Warm Ambient Flame Hearth Glow at Base */}
      <div 
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-4/5 h-64 bg-gradient-to-t from-red-600/20 via-orange-500/10 to-transparent blur-3xl pointer-events-none z-0" 
      />

      {/* Big BACKGROUND 'WHAT WE DO' behind section */}
      <h1 
        className="absolute text-[120px] md:text-[180px] lg:text-[220px] font-extrabold text-white/[0.06] left-1/2 -translate-x-1/2 top-4 z-0 pointer-events-none select-none hidden md:block tracking-widest uppercase font-serif whitespace-nowrap"
        style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif" }}
      >
        WHAT WE DO
      </h1>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Heading - Matching titecautomation style */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 
            className="text-4xl md:text-5xl font-bold text-white tracking-wide"
            style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif" }}
          >
            <span className="text-[#E51A1A] font-extrabold">WHAT</span> We Do
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#E51A1A] via-red-500 to-transparent mx-auto mt-4 rounded-full" />
          <p className="mt-3 text-white/80 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Designing and deploying tailored automation systems — from concept to commissioning.
          </p>
        </div>

        {/* Services Grid with Titec-Style Hover Reveal Effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {servicesOffer.map((service) => (
            <div
              key={service.id}
              onClick={() => setActiveModalService(service)}
              className="group relative block rounded-2xl overflow-hidden shadow-xl transform hover:-translate-y-2 transition-all duration-500 bg-gray-950 border border-white/10 hover:border-[#E51A1A]/70 aspect-[4/3] cursor-pointer"
            >
              {/* Full Background Image with Smooth Scale Zoom on Hover */}
              {service.image && (
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
              )}

              {/* Dynamic Gradient Overlay that deepens slightly on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/65 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Floating Glassmorphism Arrow Badge (Fades in top-right) */}
              <div className="absolute top-4 right-4 bg-white/15 backdrop-blur-md p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0 border border-white/20 shadow-lg">
                <ArrowUpRight className="h-5 w-5 text-white" />
              </div>

              {/* Card Bottom Content Area */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end h-full z-10">
                {/* Title (Always visible, changes color on hover) */}
                <h3 
                  className="text-lg sm:text-xl font-bold text-white mb-2 tracking-wide transition-colors duration-300 group-hover:text-[#E51A1A]"
                  style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif" }}
                >
                  {service.title}
                </h3>

                {/* Description (Slides up and fades in on hover) */}
                <p className="text-gray-300 text-xs sm:text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 leading-relaxed font-light">
                  {service.description}
                </p>

                {/* Explore & Quote Row (Slides up and fades in on hover with delay-200) */}
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                  <span className="flex items-center font-bold text-xs sm:text-sm tracking-wider uppercase text-[#E51A1A]">
                    Explore Scope <span className="ml-2 text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onServiceSelect) onServiceSelect(service.title);
                    }}
                    className="text-[11px] font-bold text-white bg-[#E51A1A] hover:bg-white hover:text-black px-3.5 py-1.5 rounded-full shadow-md transition-all duration-300 cursor-pointer active:scale-95 whitespace-nowrap"
                  >
                    Quote Service
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Turnkey Callout Banner */}
        <div className="mt-16 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h4 
                className="text-lg sm:text-xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Need a Custom Turnkey Automation Package?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-light mt-0.5">
                We manage projects from initial CAD P&ID architecture to on-site shift commissioning and SAT sign-off.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onServiceSelect && onServiceSelect("Turnkey Automation & SCADA")}
            className="inline-flex items-center gap-2 bg-[#E51A1A] hover:bg-black text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full shadow-lg transition-all duration-300 shrink-0 cursor-pointer active:scale-95"
          >
            <span>Consult Our Engineering Team</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Technical Breakdown Scope Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#0B0F19] text-white border-2 border-[#E51A1A] rounded-2xl p-5 sm:p-6 shadow-2xl max-h-[92vh] overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3.5 border-b border-zinc-800">
              <div>
                <span className="text-[10px] font-mono text-[#E51A1A] font-bold uppercase tracking-wider block mb-0.5">
                  TECHNICAL SPECIFICATION
                </span>
                <h3 
                  className="text-xl sm:text-2xl font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {activeModalService.title}
                </h3>
              </div>
              <button 
                onClick={() => setActiveModalService(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="py-3.5 space-y-3.5 text-left">
              {activeModalService.image && (
                <div className="relative h-36 sm:h-40 w-full overflow-hidden rounded-xl border border-zinc-800 shadow-md">
                  <img
                    src={activeModalService.image}
                    alt={activeModalService.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-80" />
                </div>
              )}

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                {activeModalService.description}
              </p>

              {/* Hardware & Protocols Side-by-Side Grid */}
              {technicalScopes[activeModalService.title] && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div className="bg-white/[0.03] p-3 rounded-xl border border-white/5">
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                      Hardware & Software:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {technicalScopes[activeModalService.title].platforms.map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700/80 text-[11px] font-mono text-slate-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/[0.03] p-3 rounded-xl border border-white/5">
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                      Deliverables & Protocols:
                    </h4>
                    <ul className="space-y-1.5">
                      {technicalScopes[activeModalService.title].deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-[#E51A1A] mt-0.5 shrink-0" />
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModalService(null)}
                className="px-4 py-2 text-xs sm:text-sm text-slate-400 hover:text-white cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const serviceName = activeModalService.title;
                  setActiveModalService(null);
                  if (onServiceSelect) onServiceSelect(serviceName);
                }}
                className="bg-[#E51A1A] hover:bg-black text-white px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
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
