import React, { useState } from 'react';
import { X, Send, CheckCircle2, Upload } from 'lucide-react';
import { companyDetails, servicesOffer } from '../data/cloudAxisData';

export default function QuoteModal({ isOpen, onClose, initialService }) {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    service: initialService || servicesOffer[0].title,
    scope: ''
  });

  const [attachedFile, setAttachedFile] = useState(null);
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedTicket(`CAX-RFP-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 700);
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        
        {/* Modal Header (Black & Red) */}
        <div className="bg-[#0B0F19] text-white p-5 flex items-center justify-between border-b-2 border-[#E51A1A]">
          <div>
            <h3 
              className="text-xl sm:text-2xl font-bold"
              style={{ fontFamily: "'Times New Roman', serif" }}
            >
              Request an <span className="text-[#E51A1A]">Engineering Quotation</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              Direct review by our Senior Industrial Automation Engineers
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {submittedTicket ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-100 text-[#E51A1A] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h4 
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "'Times New Roman', serif" }}
              >
                Engineering RFP Submitted!
              </h4>

              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Thank you, <strong className="text-gray-900">{formData.fullName}</strong>. Your project scope for <span className="text-[#E51A1A] font-semibold">{formData.service}</span> has been logged under:
              </p>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm max-w-xs mx-auto">
                <span className="text-gray-500 text-xs block">REFERENCE TICKET:</span>
                <span className="text-lg font-bold text-[#E51A1A]">{submittedTicket}</span>
              </div>

              <p className="text-xs text-gray-500">
                A confirmation has been sent to {formData.email}. Our engineering estimation department will contact you within 4 hours.
              </p>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="bg-[#E51A1A] hover:bg-black text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#E51A1A] focus:ring-1 focus:ring-[#E51A1A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Company / Plant *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Acme Industries"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#E51A1A] focus:ring-1 focus:ring-[#E51A1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="engineer@company.com"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#E51A1A] focus:ring-1 focus:ring-[#E51A1A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#E51A1A] focus:ring-1 focus:ring-[#E51A1A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Service Category
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#E51A1A]"
                >
                  {servicesOffer.map(s => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Project Details / Specifications
                </label>
                <textarea
                  rows={3}
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  placeholder="Describe your machinery, panel specs, PLC model, or conveyor layout..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#E51A1A]"
                />
              </div>

              {/* Schematic Attachment */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Attach Schematics / P&ID (Optional)
                </label>
                <label className="border border-dashed border-gray-300 hover:border-[#E51A1A] rounded-lg p-3 flex items-center justify-center gap-2 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <Upload className="w-4 h-4 text-gray-500" />
                  <span className="text-xs text-gray-600">
                    {attachedFile ? attachedFile : "Upload PDF, DWG, STEP or ZIP (Max 50MB)"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setAttachedFile(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#E51A1A] hover:bg-black disabled:opacity-60 text-white font-bold py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting Specifications...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Request for Quotation</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
