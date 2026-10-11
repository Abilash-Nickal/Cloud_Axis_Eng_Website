export const companyInfo = {
  name: "CloudAxis Engineering",
  tagline: "Next-Generation Industrial Automation & Smart Engineering Solutions",
  email: "contact@cloudaxis.com",
  supportEmail: "techsupport@cloudaxis.com",
  phone: "+1 (800) 458-AXIS",
  directLine: "+1 (555) 019-2834",
  address: "742 Automation Parkway, Tech Corridor, Detroit, MI 48226",
  hours: "Mon - Sat: 08:00 - 18:00 EST | 24/7 Plant Emergency Response",
  metrics: [
    { value: "120+", label: "Turnkey Projects", detail: "Successfully commissioned across North America & Europe" },
    { value: "99.8%", label: "Uptime Reliability", detail: "Industry-leading SCADA & control architecture stability" },
    { value: "45+", label: "Industrial Clients", detail: "From Fortune 500 manufacturers to specialized plant operations" },
    { value: "24/7", label: "Rapid Technical Support", detail: "Tier-3 PLC & DCS automation support within 15 minutes" },
  ],
  certifications: [
    "UL 508A Certified Panel Shop",
    "ISO 9001:2015 Quality Management",
    "NFPA 79 Industrial Machinery Standard",
    "CE Marked Assemblies",
    "ISA-95 Enterprise-Control System",
    "IEC 61508 / 62061 Functional Safety"
  ]
};

export const partnerBrands = [
  { name: "Siemens", tier: "Solution Partner", logoText: "SIEMENS", category: "PLC & Drives" },
  { name: "Rockwell Automation", tier: "System Integrator", logoText: "Rockwell Automation / Allen-Bradley", category: "ControlLogix & FactoryTalk" },
  { name: "Schneider Electric", tier: "Alliance Certified", logoText: "Schneider Electric", category: "EcoStruxure & Switchgear" },
  { name: "Omron", tier: "Automation Partner", logoText: "OMRON", category: "Sysmac & Machine Vision" },
  { name: "Mitsubishi Electric", tier: "Authorized Integrator", logoText: "MITSUBISHI ELECTRIC", category: "MELSEC & Motion" },
  { name: "ABB Robotics", tier: "Value Provider", logoText: "ABB", category: "Robotics & Instrumentation" }
];

export const coreServices = [
  {
    id: "plc-scada",
    title: "PLC & SCADA Systems",
    shortDesc: "Siemens, Allen-Bradley, Mitsubishi distributed architectures with rock-solid fault tolerance.",
    fullDesc: "We architect, program, and commission high-availability PLC and SCADA/HMI distributed control systems. From high-speed discrete packaging lines to complex batch continuous processes, our architectures guarantee sub-millisecond execution and real-time visualization.",
    techStack: ["Siemens TIA Portal & S7-1500", "Rockwell Studio 5000", "Ignition SCADA v8.1", "Wonderware / AVEVA", "Mitsubishi iQ-R"],
    deliverables: [
      "Structured IEC 61131-3 logic programming",
      "High-performance ISA-101 compliant HMI screens",
      "Redundant server SCADA historian setups",
      "Industrial network architecture (Profinet, Ethernet/IP)"
    ],
    iconName: "Cpu"
  },
  {
    id: "control-panels",
    title: "Electrical Control Panel Fabrication",
    shortDesc: "EPLAN-designed switchgear, motor control centers (MCCs), and precision VFD/Servo cabinets.",
    fullDesc: "Our in-house UL 508A certified engineering panel shop builds custom electrical enclosures tailored for harsh industrial conditions. Built with meticulous wire routing, comprehensive thermal calculation, and laser-engraved terminal labeling.",
    techStack: ["EPLAN Pro Panel 3D", "AutoCAD Electrical", "Rittal Enclosure Systems", "Schneider / ABB Switchgear", "Phoenix Contact"],
    deliverables: [
      "UL 508A / cUL listing & serialization",
      "Complete schematic packages (P&ID + Wiring schematics)",
      "Comprehensive Point-to-Point FAT testing",
      "Thermal load modeling & climate control integration"
    ],
    iconName: "Zap"
  },
  {
    id: "robotics-motion",
    title: "Robotic Automation & Motion Control",
    shortDesc: "High-speed pick-and-place, feedscrews, multi-axis servo synchronization, and robot workcells.",
    fullDesc: "We eliminate bottlenecks and elevate line throughput with advanced robotic workcells and multi-axis coordinated motion systems. Utilizing AI-assisted 2D/3D vision guidance for automated inspection and sorting.",
    techStack: ["FANUC Roboguide", "KUKA KRC4 / KRC5", "ABB RobotStudio", "Kinetix 5700 Multi-Axis Servos", "Cognex In-Sight Vision"],
    deliverables: [
      "Cycle-time optimization & offline simulation",
      "Integrated end-of-arm tooling (EOAT) design",
      "Seamless PLC kinematic synchronization",
      "ISO 10218 safety-rated zone supervision"
    ],
    iconName: "Bot"
  },
  {
    id: "iiot-telemetry",
    title: "Industrial IoT & Telemetry",
    shortDesc: "Real-time telemetry, remote condition monitoring, vibration analysis, and edge-to-cloud gateways.",
    fullDesc: "Bridge the gap between OT and IT. We deploy rugged edge computing gateways running MQTT Sparkplug B and OPC UA to securely ingest telemetry from legacy and modern plant assets into cloud dashboards or local MES.",
    techStack: ["MQTT / Sparkplug B", "OPC UA & DA", "Node-RED & InfluxDB", "AWS IoT SiteWise / Azure IoT", "Advantech Rugged Edge"],
    deliverables: [
      "Real-time Overall Equipment Effectiveness (OEE) tracking",
      "Predictive motor vibration & bearing temperature alerts",
      "Air-gapped cybersecurity & TLS 1.3 encrypted data pipes",
      "Web & mobile plant KPI monitoring dashboards"
    ],
    iconName: "Network"
  },
  {
    id: "retrofit-safety",
    title: "Machine Retrofitting & Safety Compliance",
    shortDesc: "Upgrading legacy plant lines to modern ISO/safety standards with minimal production downtime.",
    fullDesc: "Don't discard reliable mechanical equipment. We overhaul aging relay logic and obsolete PLCs (SLC 500, S5, TI505) with modern controllers and ISO 13849-1 Category 4 / PLe safety systems.",
    techStack: ["Pilz Safety Relays", "Sick Safety Laser Scanners", "Banner Optical Curtains", "Siemens Safety F-CPUs", "Euchner Interlocks"],
    deliverables: [
      "Comprehensive Risk Assessment (ANSI / ISO 12100)",
      "Safety Circuit SISTEMA verification & validation",
      "Turnkey weekend cutovers to preserve shift quotas",
      "Complete updated electrical schematics & operator manual"
    ],
    iconName: "ShieldCheck"
  },
  {
    id: "turnkey-commissioning",
    title: "Turnkey Commissioning & Plant Support",
    shortDesc: "Factory Acceptance Testing (FAT), Site Acceptance Testing (SAT), and round-the-clock site support.",
    fullDesc: "From pre-shipment simulation at our facility to on-site power-up, loop testing, I/O checkout, and ramp-up commissioning, our field engineers guarantee your facility hits target production yield on schedule.",
    techStack: ["Fluke Calibration Instruments", "Oscilloscopes & Network Analyzers", "Virtual Commissioning Tools", "VPN Remote Gateways"],
    deliverables: [
      "Rigorous FAT & SAT sign-off protocols",
      "Operator & maintenance staff hands-on training",
      "Rapid on-site emergency dispatch (under 4 hrs regional)",
      "Cloud remote diagnostics portal with instant support"
    ],
    iconName: "Activity"
  },
  {
    id: "general-engineering-supplies",
    title: "General Engineering Supplies",
    shortDesc: "Delivering trusted engineering items with precision and quality.",
    fullDesc: "We supply trusted, certified industrial-grade engineering components, precision fluid control assemblies, automation spares, sensors, and heavy-duty switchgear with rapid dispatch and guaranteed quality.",
    techStack: ["Schneider Switchgear", "Phoenix Contact", "Rittal Enclosures", "Festo Pneumatics", "Omron Industrial"],
    deliverables: [
      "Certified industrial sensor & actuator supply",
      "Precision fluid control valves & manifolds",
      "Heavy-duty switchgear & motor disconnects",
      "Fast-dispatch replacement parts inventory"
    ],
    iconName: "Boxes"
  }
];

export const projectItems = [
  {
    id: "bev-bottling-scada",
    title: "High-Speed Beverage Bottling Line Automation",
    category: "Factory Automation",
    clientSector: "FMCG / Beverage",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    tags: ["Siemens S7-1500F", "Ignition SCADA", "Profinet IRT", "OEE Tracking"],
    objective: "Upgrade an aging 60,000 bottles/hr packaging line with synchronized motion, zero-downtime batch changeover, and central SCADA visualization.",
    deliverables: [
      "Siemens S7-1500 Fail-safe PLC redundant core",
      "Ignition SCADA system monitoring 18 conveyor sub-zones",
      "Automated CIP (Clean-in-Place) cycle validation",
      "Integrated line OEE lifted from 74% to 89.4%"
    ],
    metrics: "22% Throughput Gain • 40% Reduced Changeover Time",
    timeline: "14 Weeks"
  },
  {
    id: "ev-battery-control-panels",
    title: "UL 508A Dual-Bay Control Center for EV Battery Cell Line",
    category: "Control Panels",
    clientSector: "Automotive / Clean Energy",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    tags: ["EPLAN Pro Panel", "UL 508A Listed", "Rittal TS8", "Allen-Bradley GuardLogix"],
    objective: "Design and build 8 custom dual-door NEMA 12 control enclosures with segregated 480V power distribution and 24VDC isolated sensor bus.",
    deliverables: [
      "EPLAN 3D thermal load modeling with integrated climate control",
      "Allen-Bradley GuardLogix SIL 3 safety controller layout",
      "Clean wiring raceways with custom wire ferruling & RFID tags",
      "100% FAT verified and shipped ahead of project milestone"
    ],
    metrics: "8 Enclosures Built • 100% FAT Pass on First Run",
    timeline: "8 Weeks"
  },
  {
    id: "robotic-palletizing-cell",
    title: "Dual FANUC Robot Palletizing & Vision Inspection Workcell",
    category: "Robotics",
    clientSector: "Logistics & Warehousing",
    image: "https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=800&q=80",
    tags: ["FANUC M-410iC", "Cognex 3D Vision", "Ethernet/IP", "Safety PLe"],
    objective: "Automate end-of-line corrugated box stacking across 4 concurrent conveyor feeds with dynamic barcode verification and slip-sheet placement.",
    deliverables: [
      "2x FANUC M-410iC heavy payload articulated robotic arms",
      "Custom pneumatic vacuum EOAT with integrated slip-sheet gripper",
      "Cognex In-Sight 3D area camera inspection for package skew",
      "Full perimeter safety cage with optical light curtains"
    ],
    metrics: "32 Boxes/Minute • Elimination of Ergonomic Repetitive Injuries",
    timeline: "10 Weeks"
  },
  {
    id: "iiot-chemical-telemetry",
    title: "Plant-Wide Edge IoT & Telemetry for Chemical Processing",
    category: "Industrial IoT",
    clientSector: "Chemicals & Petrochemical",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    tags: ["MQTT Sparkplug B", "Edge Gateway", "Modbus TCP", "AWS IoT Core"],
    objective: "Deploy non-invasive sensor telemetry across 48 distillation reactors and pump skids to detect cavitation and thermal anomalies before failure.",
    deliverables: [
      "Ruggedized Advantech DIN-rail Edge Gateways with TLS encryption",
      "High-frequency vibration and ultrasonic bearing temperature sensors",
      "Real-time MQTT telemetry streamed to Grafana executive dashboards",
      "Automated SMS/Email incident dispatch for maintenance techs"
    ],
    metrics: "$340K Avoided Downtime • 99.98% Telemetry Packet Reliability",
    timeline: "6 Weeks"
  },
  {
    id: "pharma-cleanroom-hvac",
    title: "Pharma Cleanroom Class-1000 Automation & BMS Integration",
    category: "Factory Automation",
    clientSector: "Pharmaceuticals",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80",
    tags: ["21 CFR Part 11", "Siemens S7-1500", "BACnet IP", "Validation Protocols"],
    objective: "Engineered strict differential pressure and humidity control loops compliant with FDA 21 CFR Part 11 audit trails.",
    deliverables: [
      "Validated GAMP 5 software lifecycle documentation",
      "Tamper-proof electronic signature logging for setpoint adjustments",
      "Redundant damper actuators with fail-safe spring returns",
      "Continuous historical trend archive with automated regulatory reports"
    ],
    metrics: "100% FDA Compliance • Zero Pressure Deviations in 18 Months",
    timeline: "16 Weeks"
  },
  {
    id: "servo-press-retrofit",
    title: "600-Ton Hydraulic Stamping Press Digital Retrofit",
    category: "Control Panels",
    clientSector: "Automotive Stamping",
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    tags: ["Mitsubishi Servo", "ISO 13849 Cat 4", "Hydraulic Proportional Valves"],
    objective: "Replaced obsolete 1990s relay panel with precision proportional hydraulic servo control and modern category 4 dual-channel safety monitoring.",
    deliverables: [
      "Custom stainless steel operator console with IP65 15\" touch interface",
      "Proportional valve closed-loop pressure profiling down to ±0.5 bar",
      "Dual monitored safety hydraulic dump valves with optical muting",
      "Cut cycle turnaround time by 18% with smoother tonnage curve"
    ],
    metrics: "18% Cycle Time Reduction • 10-Year Extended Machine Lifespan",
    timeline: "5 Weeks"
  }
];

export const clientTestimonials = [
  {
    id: "test-1",
    quote: "CloudAxis Engineering delivered our bottling line migration ahead of our shutdown window. Their Siemens TIA architecture and custom panel fabrication were the cleanest our maintenance team had ever seen.",
    author: "Marcus Vance",
    role: "Director of Plant Operations",
    company: "Apex Liquid Packaging Corp.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    tag: "Factory Automation & SCADA"
  },
  {
    id: "test-2",
    quote: "Our UL 508A specifications were rigorous and required tight spatial footprints. CloudAxis provided 3D EPLAN simulations before building, and every panel passed inspection on day one.",
    author: "Elena Rostova",
    role: "Chief Automation Systems Engineer",
    company: "Vanguard Battery Technologies",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    tag: "UL 508A Control Panels"
  },
  {
    id: "test-3",
    quote: "The robotic palletizing cell CloudAxis installed reduced our end-of-line bottlenecks to zero. When we had a field sensor query at 2 AM on a Sunday, their tier-3 support engineer was on remote diagnostics within 10 minutes.",
    author: "David K. Henderson",
    role: "VP of Manufacturing & Logistics",
    company: "Tri-State Distribution Skids",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    tag: "Robotics & Field Engineering"
  }
];

export const engineeringProcess = [
  {
    step: "01",
    title: "System Concept & P&ID Audit",
    desc: "Detailed site survey, sensor load calculation, functional safety analysis, and architecture schematics."
  },
  {
    step: "02",
    title: "EPLAN & Logic Development",
    desc: "3D panel modeling, wire schedule generation, PLC state machine routines, and HMI/SCADA wireframing."
  },
  {
    step: "03",
    title: "UL 508A Fabrication & FAT",
    desc: "Precision in-house cabinet assembly, torque checks, insulation resistance testing, and live signal simulation."
  },
  {
    step: "04",
    title: "Plant Commissioning & SAT",
    desc: "Rigorous field I/O loop check, machinery dry-runs, safety validation, operator training, and 24/7 go-live support."
  }
];
