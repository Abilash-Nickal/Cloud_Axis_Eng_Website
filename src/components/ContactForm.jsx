import React, { useState, useRef } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  FileText, 
  X, 
  Headphones,
  ShieldCheck,
  Building
} from 'lucide-react';
import { companyInfo } from '../data/industrialData';

export default function ContactForm({ preselectedService }) {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    workEmail: '',
    phone: '',
    serviceRequired: preselectedService || 'Turnkey Automation',
    projectScope: '',
    timeline: 'Within 1-3 Months',
  });

  const [attachedFiles, setAttachedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  // Update if preselectedService prop changes
  React.useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, serviceRequired: preselectedService }));
    }
  }, [preselectedService]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(f => ({
        name: f.name,
        size: (f.size / 1024).toFixed(1) + ' KB'
      }));
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName || !formData.workEmail || !formData.organization) {
      setErrorMsg('Please complete all required fields (Name, Organization, and Work Email).');
      return;
    }

    setIsSubmitting(true);

    // Simulate instant engineering quote ticket generation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({
        ticketId: `CAX-${Math.floor(100000 + Math.random() * 900000)}`,
        name: formData.fullName,
        service: formData.serviceRequired,
        email: formData.workEmail,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }, 900);
  };

  const resetForm = () => {
    setSubmittedData(null);
    setFormData({
      fullName: '',
      organization: '',
      workEmail: '',
      phone: '',
      serviceRequired: 'Turnkey Automation',
      projectScope: '',
      timeline: 'Within 1-3 Months',
    });
    setAttachedFiles([]);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#0B0F19] text-white relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-600/10 border border-red-500/30 text-xs font-mono text-red-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span>ENGINEERING CONSULTATION & RFP SUBMISSION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Rajdhani'] tracking-tight text-white">
            Request an <span className="text-red-500">Engineering Quote</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-3">
            Submit your P&ID, electrical requirements, or plant automation objectives for direct review by our senior controls engineering team.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Office Details & Embedded Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl">
              <h3 className="text-xl font-bold font-['Rajdhani'] text-white mb-6 flex items-center gap-2">
                <Building className="w-5 h-5 text-red-500" />
                <span>CloudAxis Engineering HQ</span>
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-red-500 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400 uppercase">Panel Shop & Engineering Office</div>
                    <div className="text-slate-200 mt-0.5">{companyInfo.address}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-red-500 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400 uppercase">Direct RFP Inquiries</div>
                    <a href={`mailto:${companyInfo.email}`} className="text-red-400 hover:underline mt-0.5 block">
                      {companyInfo.email}
                    </a>
                    <a href={`mailto:${companyInfo.supportEmail}`} className="text-xs text-slate-400 hover:text-slate-300 mt-0.5 block">
                      Support: {companyInfo.supportEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-red-500 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400 uppercase">Phone & Plant Emergency</div>
                    <div className="text-slate-200 mt-0.5 font-mono">{companyInfo.phone}</div>
                    <div className="text-xs text-slate-400 font-mono">Direct: {companyInfo.directLine}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-red-500 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400 uppercase">Operational Shift Windows</div>
                    <div className="text-slate-200 mt-0.5">{companyInfo.hours}</div>
                  </div>
                </div>
              </div>

              {/* 24/7 SLA Guarantee */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-mono uppercase">Guaranteed SLA Response</div>
                  <div className="text-xs text-slate-400">All preliminary RFPs receive an engineering callback within 4 hours.</div>
                </div>
              </div>
            </div>

            {/* Embedded Responsive Google Map Placeholder */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
              <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  Detroit Engineering Center & Panel Shop
                </span>
                <span className="text-emerald-400">GEO: 42.3314° N, 83.0458° W</span>
              </div>
              <div className="relative h-60 w-full bg-slate-950 flex items-center justify-center">
                {/* Styled industrial map frame */}
                <iframe
                  title="CloudAxis Location"
                  className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-70"
                  src="https://maps.google.com/maps?q=Detroit,%20MI&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded border border-slate-700 text-xs font-mono text-slate-200">
                  Visitors by Appointment • ISO Cleanroom & Panel Bay
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive RFP Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              
              {/* Form Header */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
                <div>
                  <h3 className="text-2xl font-bold font-['Rajdhani'] text-white">
                    Submit Project Specifications
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill out the technical requirements below to initiate your RFP.
                  </p>
                </div>
                <div className="hidden sm:block text-right">
                  <span className="text-[10px] font-mono text-red-400 bg-red-950/40 border border-red-500/20 px-2.5 py-1 rounded">
                    FORM SECURE • TLS 1.3
                  </span>
                </div>
              </div>

              {/* Instant Submission Feedback State */}
              {submittedData ? (
                <div className="py-8 text-center space-y-6 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold font-['Rajdhani'] text-white">
                      RFP Specifications Successfully Received!
                    </h4>
                    <p className="text-sm text-slate-300 max-w-lg mx-auto">
                      Thank you, <span className="text-white font-semibold">{submittedData.name}</span>. Your engineering request has been assigned directly to our Lead Automation Systems Architect.
                    </p>
                  </div>

                  {/* Receipt Box */}
                  <div className="max-w-md mx-auto rounded-xl bg-slate-950 border border-slate-800 p-5 text-left font-mono text-xs space-y-2.5">
                    <div className="flex justify-between pb-2 border-b border-slate-800 text-slate-400">
                      <span>RFP REFERENCE TICKET:</span>
                      <span className="text-red-400 font-bold">{submittedData.ticketId}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Target Discipline:</span>
                      <span className="font-semibold text-white">{submittedData.service}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Confirmation Email Sent:</span>
                      <span className="text-white">{submittedData.email}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Expected Callback Window:</span>
                      <span className="text-emerald-400 font-semibold">&lt; 4 Hours</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={resetForm}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Submit Another Scope / Reset Form
                    </button>
                  </div>
                </div>
              ) : (
                /* Main Interactive Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMsg && (
                    <div className="p-3.5 rounded-lg bg-red-950/60 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Row 1: Full Name & Organization */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-300">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Robert Miller"
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-300">
                        Organization / Plant Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        placeholder="e.g. Apex Industrial Systems"
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Work Email & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-300">
                        Work Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleInputChange}
                        placeholder="robert@company.com"
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-300">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service Required & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-300">
                        Service Required <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="serviceRequired"
                        value={formData.serviceRequired}
                        onChange={handleInputChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                      >
                        <option value="Turnkey Automation">Turnkey Automation & SCADA</option>
                        <option value="Electrical Control Panel Fabrication">Electrical Control Panel Design & UL 508A</option>
                        <option value="PLC & SCADA Systems">PLC/SCADA Programming & Migration</option>
                        <option value="Robotic Automation & Motion Control">Robotics & Multi-Axis Motion</option>
                        <option value="Industrial IoT & Telemetry">Industrial IoT & Edge Telemetry</option>
                        <option value="Machine Retrofitting & Safety Compliance">Machine Retrofit & Safety Compliance</option>
                        <option value="Plant Maintenance & SLA Support">Emergency Plant Maintenance & Support</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-300">
                        Target Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                      >
                        <option value="Immediate / Emergency Shutdown">Immediate / Plant Emergency</option>
                        <option value="Within 1-3 Months">Within 1 - 3 Months</option>
                        <option value="3-6 Months">3 - 6 Months</option>
                        <option value="Q3/Q4 Budgeting">Fiscal Year Budgeting</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Project Scope Textarea */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-300">
                      Project Scope & Target Specifications
                    </label>
                    <textarea
                      rows={3}
                      name="projectScope"
                      value={formData.projectScope}
                      onChange={handleInputChange}
                      placeholder="Outline target line speeds, existing PLC models (e.g. Siemens S7 or ControlLogix), number of I/O points, or custom panel dimensions..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    />
                  </div>

                  {/* Row 5: File Upload Dummy Zone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-300">
                      Attach Schematics, P&ID or RFP Documents
                    </label>
                    
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      multiple
                      className="hidden"
                      id="rfp-file-input"
                    />

                    <div 
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      className="border-2 border-dashed border-slate-800 hover:border-red-500/60 rounded-xl p-5 text-center cursor-pointer bg-slate-950/60 hover:bg-slate-950 transition-colors group"
                    >
                      <Upload className="w-7 h-7 text-slate-500 group-hover:text-red-500 mx-auto mb-2 transition-colors" />
                      <div className="text-xs font-medium text-slate-300">
                        <span className="text-red-400 font-semibold">Click to upload</span> or drag and drop files here
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 font-mono">
                        Attach P&ID, electrical schematics (PDF, DWG, ZIP, STEP) up to 50MB
                      </div>
                    </div>

                    {/* Attached files preview list */}
                    {attachedFiles.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        {attachedFiles.map((file, i) => (
                          <div 
                            key={i} 
                            className="flex items-center justify-between bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <FileText className="w-4 h-4 text-red-500 shrink-0" />
                              <span className="truncate text-slate-200">{file.name}</span>
                              <span className="text-slate-400 shrink-0">({file.size})</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(i)}
                              className="text-slate-500 hover:text-red-400 p-1"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#E51A1A] hover:bg-[#D6181F] disabled:opacity-70 text-white font-bold py-3.5 px-6 rounded-lg shadow-xl shadow-red-900/30 flex items-center justify-center gap-2 transition-all duration-200 active:scale-98"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Processing Engineering Scope...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Engineering Scope for Review</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono pt-1 text-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Non-Disclosure Agreement (NDA) automatically applies to all uploaded schematics.</span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
