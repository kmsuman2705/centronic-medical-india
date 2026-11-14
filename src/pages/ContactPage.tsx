import React, { useState } from 'react';
import { COMPANY_DETAILS } from '../data/companyData';
import { PRODUCTS } from '../data/productsData';
import { ProductItem } from '../types';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Building,
  Factory,
  Copy,
  Check,
  ExternalLink,
  Clock,
  ShieldCheck,
  MessageSquare,
  Calendar
} from 'lucide-react';

interface ContactPageProps {
  prefilledProduct?: ProductItem | null;
  onClearPrefilledProduct?: () => void;
  onOpenMeetingModal?: (topic?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  prefilledProduct,
  onClearPrefilledProduct,
  onOpenMeetingModal
}) => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    designation: '',
    email: '',
    phone: '',
    city: '',
    inquiryType: 'Commercial Quotation',
    productCategory: prefilledProduct ? prefilledProduct.categoryLabel : 'All Categories',
    message: prefilledProduct
      ? `Hello, I would like to request pricing, minimum order quantities, and sample availability for ${prefilledProduct.name} (${prefilledProduct.series || ''}).`
      : ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copiedAddr, setCopiedAddr] = useState<'reg' | 'plant' | null>(null);

  const handleCopy = (type: 'reg' | 'plant', text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddr(type);
    setTimeout(() => setCopiedAddr(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#6366f115_1px,transparent_1px),linear-gradient(to_bottom,#6366f115_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 text-xs font-semibold border border-indigo-800">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
            <span>Direct Manufacturer Communication</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Let's Build Better Laboratory Solutions Together
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Whether you are looking for laboratory centrifuges, histology consumables, tissue embedding products or cytology solutions, connect directly with the Centronic Medical team.
          </p>

          {onOpenMeetingModal && (
            <div className="pt-2">
              <button
                onClick={() => onOpenMeetingModal()}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>Fix a 1-on-1 Meeting / Technical Consultation</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Form and Location Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info & Address Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Fix a Meeting Highlight Card */}
            {onOpenMeetingModal && (
              <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent rounded-xl p-5 border border-amber-300/80 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>Need an In-Depth Discussion?</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                    Live Slot
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fix a scheduled technical session or Faridabad plant visit directly with our technical team. Pick your preferred date, time slot, and product focus.
                </p>
                <button
                  onClick={() => onOpenMeetingModal()}
                  className="w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Fix a Meeting Now</span>
                </button>
              </div>
            )}

            {/* Primary Contact Details Card */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Direct Line & Representative
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Centronic Medical India Pvt. Ltd.
                </h3>
              </div>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      Contact Person
                    </span>
                    <span className="text-sm font-bold text-slate-900 block">
                      {COMPANY_DETAILS.contactPerson}
                    </span>
                    <span className="text-slate-500">Executive & Technical Sales Management</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      Telephone / WhatsApp
                    </span>
                    <a
                      href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                      className="text-sm font-bold text-indigo-600 hover:text-indigo-700 block"
                    >
                      {COMPANY_DETAILS.phone}
                    </a>
                    <a
                      href={COMPANY_DETAILS.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline inline-block mt-0.5 font-semibold"
                    >
                      Chat on WhatsApp →
                    </a>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      Official Inquiries
                    </span>
                    <a
                      href={`mailto:${COMPANY_DETAILS.email}`}
                      className="text-sm font-bold text-indigo-600 hover:text-indigo-700 block break-all"
                    >
                      {COMPANY_DETAILS.email}
                    </a>
                    <span className="text-slate-500">Quick turnaround within 4 hours</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      Business Hours
                    </span>
                    <span className="font-semibold text-slate-800 block">
                      {COMPANY_DETAILS.businessHours}
                    </span>
                    <span className="text-slate-500">National Capital Region (NCR)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Cards */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Official Locations
              </span>

              {/* Registered Office */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                    {COMPANY_DETAILS.registeredOffice.title}
                  </span>
                  <button
                    onClick={() => handleCopy('reg', COMPANY_DETAILS.registeredOffice.address)}
                    className="text-[11px] text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer font-medium"
                  >
                    {copiedAddr === 'reg' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedAddr === 'reg' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {COMPANY_DETAILS.registeredOffice.address}
                </p>
              </div>

              {/* Manufacturing Plant */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Factory className="w-3.5 h-3.5 text-indigo-600" />
                    {COMPANY_DETAILS.manufacturingPlant.title}
                  </span>
                  <button
                    onClick={() => handleCopy('plant', COMPANY_DETAILS.manufacturingPlant.address)}
                    className="text-[11px] text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer font-medium"
                  >
                    {copiedAddr === 'plant' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedAddr === 'plant' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {COMPANY_DETAILS.manufacturingPlant.address}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    Inquiry Transmitted Successfully
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Your inquiry regarding {formData.productCategory} has been assigned to our technical sales team at Centronic Medical India.
                  </p>
                  <p className="text-xs text-slate-500">
                    We will review your requirements and respond via <strong>{formData.email}</strong> or <strong>{formData.phone}</strong> promptly.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors cursor-pointer shadow-xs"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                      Send an Inquiry or Request a Quotation
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Direct manufacturer pricing, sample requests, and distribution inquiries.
                    </p>
                  </div>

                  {prefilledProduct && (
                    <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center justify-between text-xs text-indigo-950">
                      <span>Inquiring about: <strong>{prefilledProduct.name}</strong></span>
                      {onClearPrefilledProduct && (
                        <button
                          type="button"
                          onClick={onClearPrefilledProduct}
                          className="text-xs text-indigo-600 underline hover:text-indigo-800 cursor-pointer font-medium"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. A. K. Verma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Organization / Diagnostic Lab / Hospital *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Max Healthcare / SRL Diagnostics"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Official Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. procurement@lab.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Contact Phone / Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        City & State *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. New Delhi, Bengaluru, Chandigarh"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Primary Product of Interest
                      </label>
                      <select
                        value={formData.productCategory}
                        onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none bg-white"
                      >
                        <option value="All Categories">All Product Categories</option>
                        <option value="Laboratory Centrifuges">Laboratory Centrifuges (Benchtop / Floor / Blood Bank)</option>
                        <option value="Tissue Processing & Embedding Cassettes">Tissue Embedding Cassettes (102, 104, 106, 122, 123)</option>
                        <option value="Stainless Steel Embedding Moulds">Stainless Steel Embedding Moulds (7×7 to 37×24 mm)</option>
                        <option value="Histology Microtome Blades">Histology Microtome Blades (High & Low Profile)</option>
                        <option value="Tissue Processing Materials">Paraffin Wax & Cryostat OCT Compound</option>
                        <option value="Cytology Solutions">Cytology Solutions & LBC Kits</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Inquiry Intent
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        'Commercial Quotation',
                        'Sample Request',
                        'Dealership / Distribution',
                        'Custom OEM Printing'
                      ].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, inquiryType: type })}
                          className={`p-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                            formData.inquiryType === type
                              ? 'bg-indigo-600 text-white border-indigo-600 font-semibold shadow-xs'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Detailed Message / Requirements
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please mention estimated order volumes, delivery location, instrument model requirements, or specific cassette cassette printer models (e.g. Sakura, Leica)..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Direct OEM Manufacturer Support • Privacy Protected</span>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto px-8 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{submitting ? 'Submitting Inquiry...' : 'Submit Inquiry'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
