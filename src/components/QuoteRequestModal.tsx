import React, { useState } from 'react';
import { QuoteCartItem, ProductItem } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import {
  X,
  Trash2,
  Send,
  CheckCircle,
  Building,
  Phone,
  Mail,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  quoteItems: QuoteCartItem[];
  onRemoveItem: (productId: string) => void;
  onUpdateNote: (productId: string, note: string) => void;
  onClearAll: () => void;
}

export const QuoteRequestModal: React.FC<QuoteRequestModalProps> = ({
  isOpen,
  onClose,
  quoteItems,
  onRemoveItem,
  onUpdateNote,
  onClearAll
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    city: '',
    inquiryType: 'pricing',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClearAll();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
              Request for Quotation (RFQ)
            </h2>
            <p className="text-xs text-slate-500">
              Submit your required products directly to Centronic Medical India technical sales.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Quotation Request Received!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName || 'Valued Partner'}</strong>. Your RFQ for {quoteItems.length} product(s) has been routed to our sales engineering team at Centronic Medical India.
              </p>
              <div className="bg-slate-50 rounded-xl p-4 max-w-md mx-auto text-xs text-slate-600 text-left border border-slate-200 space-y-1">
                <p><strong>Response Time:</strong> Within 4 business hours</p>
                <p><strong>Direct Helpline:</strong> {COMPANY_DETAILS.phone}</p>
                <p><strong>Email:</strong> {COMPANY_DETAILS.email}</p>
              </div>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  Done & Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Items List */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                    Selected Items ({quoteItems.length})
                  </h3>
                  {quoteItems.length > 0 && (
                    <button
                      onClick={onClearAll}
                      className="text-xs text-rose-600 hover:underline cursor-pointer"
                    >
                      Clear all items
                    </button>
                  )}
                </div>

                {quoteItems.length === 0 ? (
                  <div className="p-6 text-center rounded-xl bg-slate-50 border border-dashed border-slate-300 text-slate-500 text-xs">
                    <p>No products added yet. Browse our catalog and click "Add to RFQ" to request pricing on specific items.</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {quoteItems.map(({ product, quantityNote }) => (
                      <div
                        key={product.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-lg object-cover bg-white border border-slate-200 shrink-0"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">
                              {product.name}
                            </span>
                            <span className="text-[11px] text-indigo-600 font-medium">
                              {product.categoryLabel}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                          <input
                            type="text"
                            placeholder="Qty / Pack size (e.g. 10 cartons)"
                            value={quantityNote || ''}
                            onChange={(e) => onUpdateNote(product.id, e.target.value)}
                            className="px-2.5 py-1.5 rounded-md border border-slate-300 text-xs text-slate-800 bg-white w-48 focus:border-indigo-500 focus:outline-none"
                          />
                          <button
                            onClick={() => onRemoveItem(product.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Remove from list"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Information Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                  Your Organization & Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Rajesh Sharma / Procurement Officer"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Hospital / Diagnostic Lab / Institution *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Metro Diagnostics / Apollo Hospital"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. purchase@hospital.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City / State *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Delhi NCR, Mumbai, Hyderabad"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none bg-white"
                    >
                      <option value="pricing">Commercial Quotation & Volume Pricing</option>
                      <option value="sample">Sample Request / Evaluation</option>
                      <option value="dealership">Authorized Dealership / Distribution</option>
                      <option value="technical">Technical Specifications & Custom OEM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Specific Workflow Requirements or Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide any specific printer compatibility requirements (Leica/Sakura), routine volume requirements, or delivery schedule..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Manufacturer Direct Pricing • Faridabad, Haryana</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-2 shadow-xs hover:shadow transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Dispatching RFQ...' : 'Submit Quotation Request'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
