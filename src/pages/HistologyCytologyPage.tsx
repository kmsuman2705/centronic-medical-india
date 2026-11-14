import React, { useState } from 'react';
import { PageId, ProductItem } from '../types';
import { PRODUCTS, CENTRONIC_IMAGES } from '../data/productsData';
import { COMPANY_DETAILS } from '../data/companyData';
import {
  Layers,
  FlaskConical,
  Sparkles,
  Package,
  Eye,
  Plus,
  Check,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Table,
  ArrowRight,
  Printer
} from 'lucide-react';

interface HistologyCytologyPageProps {
  onSelectProduct: (product: ProductItem) => void;
  onAddToQuote: (product: ProductItem) => void;
  onEnquireProduct: (product: ProductItem) => void;
  isInQuote: (productId: string) => boolean;
  onNavigate: (page: PageId) => void;
}

export const HistologyCytologyPage: React.FC<HistologyCytologyPageProps> = ({
  onSelectProduct,
  onAddToQuote,
  onEnquireProduct,
  isInQuote,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'cassettes' | 'moulds' | 'blades-materials' | 'cytology'>('cassettes');

  const cassettes = PRODUCTS.filter((p) => p.category === 'cassettes');
  const moulds = PRODUCTS.filter((p) => p.category === 'moulds');
  const bladesAndMaterials = PRODUCTS.filter(
    (p) => p.category === 'blades' || p.category === 'processing-materials'
  );
  const cytology = PRODUCTS.filter((p) => p.category === 'cytology');

  const mouldDimensions = [
    { size: '7 × 7 mm', code: 'SSM-0707', use: 'Small biopsy, needle cores, skin punches' },
    { size: '15 × 15 mm', code: 'SSM-1515', use: 'Medium biopsy, endoscopic, small resections' },
    { size: '24 × 24 mm', code: 'SSM-2424', use: 'Standard routine surgical pathology sections' },
    { size: '30 × 24 mm', code: 'SSM-3024', use: 'Elongated tissues, appendix, vessel segments' },
    { size: '37 × 24 mm', code: 'SSM-3724', use: 'Large resections, tumor margin mappings' }
  ];

  return (
    <div className="w-full bg-white">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#6366f115_1px,transparent_1px),linear-gradient(to_bottom,#6366f115_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 text-xs font-semibold border border-indigo-800">
            <FlaskConical className="w-3.5 h-3.5 text-indigo-400" />
            <span>Diagnostic Pathology & Histopathology Consumables</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Histology & Cytology Solutions
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            From high-grade P.O.M. tissue embedding cassettes with calibrated writing angles to mirror-polished stainless steel base moulds, microtome blades, paraffin wax, OCT medium, and Liquid Based Cytology (LBC) kits.
          </p>

          {/* Navigation Pill Tabs */}
          <div className="pt-4 flex flex-wrap gap-2">
            {[
              { id: 'cassettes', label: 'Tissue Embedding Cassettes' },
              { id: 'moulds', label: 'Stainless Steel Moulds (5 Sizes)' },
              { id: 'blades-materials', label: 'Blades, Paraffin & OCT' },
              { id: 'cytology', label: 'Cytology & LBC Kits' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-xs font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Tabbed Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* ========================================================================= */}
        {/* CASSETTES TAB                                                            */}
        {/* ========================================================================= */}
        {activeTab === 'cassettes' && (
          <div className="space-y-12">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Histology Specimen Handling
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Tissue Processing & Embedding Cassettes
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Precision molded from solvent-resistant Polyoxymethylene (P.O.M.) polymer to withstand harsh histopathological reagents, histology processing chemicals, and molten paraffin.
              </p>
            </div>

            {/* Individual Cassette Showcase Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {cassettes.map((item) => {
                const inQuote = isInQuote(item.id);
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all p-6 sm:p-7 flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                            {item.series || 'Series'}
                          </span>
                          <h3 className="text-lg font-bold text-slate-900 mt-1.5 leading-snug">
                            {item.name}
                          </h3>
                        </div>

                        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.shortDesc}
                      </p>

                      {/* Key features list */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Engineered Features:
                        </span>
                        {item.features.map((feat, fIdx) => (
                          <div key={fIdx} className="text-xs text-slate-700 flex items-start gap-2">
                            <span className="text-indigo-600 font-bold">•</span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Packaging badge */}
                      {item.packaging && (
                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                          <Package className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                              Packaging Configuration
                            </span>
                            <span>{item.packaging}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onSelectProduct(item)}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Full Specs</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onAddToQuote(item)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                            inQuote
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'border border-slate-300 bg-white text-slate-700 hover:border-indigo-400 hover:text-indigo-700'
                          }`}
                        >
                          {inQuote ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          <span>{inQuote ? 'Added' : 'Add to RFQ'}</span>
                        </button>

                        <button
                          onClick={() => onEnquireProduct(item)}
                          className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-xs transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Enquire</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAINLESS STEEL MOULDS TAB                                               */}
        {/* ========================================================================= */}
        {activeTab === 'moulds' && (
          <div className="space-y-12">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Precision Metal Forming
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Stainless Steel Embedding Moulds
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Manufactured from surgical-grade polished stainless steel with mirror-finished internal corners for effortless paraffin block de-moulding and high thermal conductivity.
              </p>
            </div>

            {/* Quick Dimensions Comparison Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Available Cavity Dimensions & Applications
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Pack of 12 pcs / box
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100/70 text-slate-700 font-bold border-b border-slate-200">
                      <th className="py-3 px-6">Model Code</th>
                      <th className="py-3 px-6">Cavity Size (W × L)</th>
                      <th className="py-3 px-6">Recommended Specimen Application</th>
                      <th className="py-3 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mouldDimensions.map((m, idx) => {
                      const mouldProd = moulds[idx];
                      return (
                        <tr key={idx} className="hover:bg-indigo-50/40 transition-colors">
                          <td className="py-3.5 px-6 font-mono font-bold text-indigo-600">
                            {m.code}
                          </td>
                          <td className="py-3.5 px-6 font-semibold text-slate-900">
                            {m.size}
                          </td>
                          <td className="py-3.5 px-6 text-slate-600">
                            {m.use}
                          </td>
                          <td className="py-3.5 px-6 text-right">
                            {mouldProd && (
                              <button
                                onClick={() => onSelectProduct(mouldProd)}
                                className="px-3 py-1 bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-800 rounded font-semibold text-[11px] transition-colors cursor-pointer"
                              >
                                View Specs
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Individual Mould Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {moulds.map((mould) => (
                <div
                  key={mould.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {mould.series}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {mould.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {mould.shortDesc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => onSelectProduct(mould)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                    >
                      Specifications
                    </button>
                    <button
                      onClick={() => onAddToQuote(mould)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 shadow-xs cursor-pointer transition-colors"
                    >
                      Add to RFQ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BLADES & MATERIALS TAB                                                   */}
        {/* ========================================================================= */}
        {activeTab === 'blades-materials' && (
          <div className="space-y-12">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Precision Microtomy & Reagents
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Microtome Blades, Paraffin Wax & OCT Medium
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Engineered for silky, chatter-free ribboning, zero tissue compression, and reliable cryostat sectioning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {bladesAndMaterials.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                          {item.series}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 mt-1">
                          {item.name}
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.shortDesc}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Features:
                      </span>
                      {item.features.map((feat, i) => (
                        <div key={i} className="text-xs text-slate-700 flex items-start gap-2">
                          <span className="text-indigo-600 font-bold">•</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {item.packaging && (
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
                        <Package className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span>{item.packaging}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => onSelectProduct(item)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                    >
                      View Specs Sheet
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onAddToQuote(item)}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:border-indigo-400 hover:text-indigo-700 text-xs font-semibold cursor-pointer transition-colors"
                      >
                        Add to RFQ
                      </button>
                      <button
                        onClick={() => onEnquireProduct(item)}
                        className="px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 shadow-xs cursor-pointer transition-colors"
                      >
                        Enquire
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CYTOLOGY TAB                                                             */}
        {/* ========================================================================= */}
        {activeTab === 'cytology' && (
          <div className="space-y-12">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Cellular Diagnostics & Screening
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Cytology Solutions & LBC Kits
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Preserving intact cellular morphology for gynaecological and non-gynaecological diagnostic examinations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cytology.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-full aspect-4/3 rounded-lg overflow-hidden bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 inline-block">
                      {item.series}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => onSelectProduct(item)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                    >
                      Specifications
                    </button>
                    <button
                      onClick={() => onAddToQuote(item)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 shadow-xs cursor-pointer transition-colors"
                    >
                      Add to RFQ
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Note regarding specs as per prompt */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <p>
                <strong>Catalogue Note:</strong> Additional chemical formulations, buffer variations, and automated cytocentrifuge vials are available on consultative request for hospital networks and mass screening diagnostic programs.
              </p>
            </div>
          </div>
        )}

        {/* Global CTA Banner */}
        <div className="p-8 rounded-xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800 shadow-sm">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white">
              Need Custom Mold Tooling or Specialized OEM Printing?
            </h4>
            <p className="text-xs text-slate-300">
              Centronic Medical India accommodates customized cassette branding, tape-sleeved loading, and custom packaging.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shrink-0 transition-colors cursor-pointer shadow-xs"
          >
            Speak with Manufacturing Desk
          </button>
        </div>
      </div>
    </div>
  );
};
