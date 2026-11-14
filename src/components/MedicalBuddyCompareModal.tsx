import React, { useState, useEffect } from 'react';
import {
  X,
  Scale,
  Bot,
  Sparkles,
  Calendar,
  Phone,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  ArrowRightLeft,
  ChevronRight,
  ShieldCheck,
  Building2,
  RefreshCw,
  Sliders,
  Plus
} from 'lucide-react';
import { PRODUCTS } from '../data/productsData';
import { COMPANY_DETAILS } from '../data/companyData';
import { ProductItem } from '../types';

interface MedicalBuddyCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductA?: ProductItem | null;
  initialProductB?: ProductItem | null;
  onOpenMeetingModal: (topic?: string) => void;
  onAddToQuote?: (product: ProductItem) => void;
}

const COMPARISON_PRESETS = [
  {
    title: 'Low Speed vs. High Speed Centrifuges',
    desc: 'Routine diagnostic separation vs. molecular DNA/RNA pelleting',
    idA: 'centrifuge-benchtop-low-speed',
    idB: 'centrifuge-benchtop-high-speed'
  },
  {
    title: 'Biopsy Cassettes vs. Tissue Embedding Cassettes',
    desc: '0.9mm micro-pores for core biopsies vs. slotted macro tissue exchange',
    idA: 'cassette-biopsy-detachable',
    idB: 'cassette-tissue-embedding'
  },
  {
    title: 'Benchtop High Speed vs. Floor Model Centrifuge',
    desc: 'Compact bench space vs. continuous high-throughput hospital capacity',
    idA: 'centrifuge-benchtop-high-speed',
    idB: 'centrifuge-floor-model'
  },
  {
    title: 'SS Base Moulds vs. Plastic Embedding Rings',
    desc: 'Reusable SS 304 paraffin moulds vs. disposable microtome chuck rings',
    idA: 'moulds-stainless-steel-base',
    idB: 'rings-disposable-embedding'
  }
];

export const MedicalBuddyCompareModal: React.FC<MedicalBuddyCompareModalProps> = ({
  isOpen,
  onClose,
  initialProductA,
  initialProductB,
  onOpenMeetingModal,
  onAddToQuote
}) => {
  const [productA, setProductA] = useState<ProductItem>(
    initialProductA || PRODUCTS[0]
  );
  const [productB, setProductB] = useState<ProductItem>(
    initialProductB || PRODUCTS[1]
  );
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'matrix' | 'ai'>('ai');

  // Update selection if passed via props
  useEffect(() => {
    if (initialProductA) setProductA(initialProductA);
    if (initialProductB) setProductB(initialProductB);
  }, [initialProductA, initialProductB]);

  // Run AI comparison whenever products change
  const fetchAiComparison = async (p1: ProductItem, p2: ProductItem) => {
    setIsLoadingAnalysis(true);
    try {
      const res = await fetch('/api/medical-buddy/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product1: p1, product2: p2 })
      });

      if (!res.ok) throw new Error('Comparison API error');
      const data = await res.json();
      setAiAnalysis(data.analysis || '');
    } catch (err) {
      console.error('Failed to get AI comparison:', err);
      // Fallback comparative text
      setAiAnalysis(`### 🔬 Medical Buddy Comparative Analysis: ${p1.name} vs. ${p2.name}

#### 1. Core Engineering Focus
- **${p1.name}**: Engineered with specialized features for **${p1.shortDesc}**.
- **${p2.name}**: Tailored specifically for **${p2.shortDesc}**.

#### 2. Workflow & Lab Suitability
- Choose **${p1.name}** when your workflow demands dedicated protocol optimization and target sample protection.
- Choose **${p2.name}** when operating higher routine throughput or requiring versatile operational profiles.

#### 3. Procurement Verdict & Consultation
Both models adhere to Centronic Medical India's ISO-based manufacturing and batch consistency controls. Connect with our technical team (+91 9999333447) to discuss specific rotor configurations or sample evaluations.

[ACTION:FIX_MEETING:${p1.name} vs ${p2.name} Evaluation]`);
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  useEffect(() => {
    if (isOpen && productA && productB) {
      fetchAiComparison(productA, productB);
    }
  }, [isOpen, productA.id, productB.id]);

  if (!isOpen) return null;

  const handleSwap = () => {
    const temp = productA;
    setProductA(productB);
    setProductB(temp);
  };

  const handleSelectPreset = (preset: typeof COMPARISON_PRESETS[0]) => {
    const p1 = PRODUCTS.find((p) => p.id === preset.idA);
    const p2 = PRODUCTS.find((p) => p.id === preset.idB);
    if (p1 && p2) {
      setProductA(p1);
      setProductB(p2);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-slate-950 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                  Medical Buddy • AI Product Comparison Studio
                </h2>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/60">
                  Precision AI Engine
                </span>
              </div>
              <p className="text-xs text-slate-300">
                In-depth technical specification, workflow fit, and engineering evaluation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenMeetingModal(`${productA.name} vs ${productB.name} Consultation`)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Fix a Meeting</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close comparison studio"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Presets Pill Bar */}
        <div className="bg-slate-900 px-5 py-2.5 border-b border-slate-800 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">Popular Comparisons:</span>
          {COMPARISON_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(preset)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                productA.id === preset.idA && productB.id === preset.idB
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {preset.title}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Selectors Row */}
          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
            {/* Product A Selector Card */}
            <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-4 relative">
              <span className="absolute -top-2.5 left-4 px-2 py-0.5 rounded text-[10px] font-black uppercase bg-indigo-600 text-white tracking-wider">
                Product A
              </span>
              <div className="mt-1">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select First Product:
                </label>
                <select
                  value={productA.id}
                  onChange={(e) => {
                    const found = PRODUCTS.find((p) => p.id === e.target.value);
                    if (found) setProductA(found);
                  }}
                  className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-indigo-600"
                >
                  {PRODUCTS.map((p) => (
                    <option key={`a-${p.id}`} value={p.id}>
                      {p.name} ({p.series || p.categoryLabel})
                    </option>
                  ))}
                </select>
              </div>

              {/* Mini preview */}
              <div className="mt-3 flex items-center gap-3">
                <img
                  src={productA.image}
                  alt={productA.name}
                  className="w-14 h-14 object-cover rounded-lg border border-slate-200 shrink-0"
                />
                <div className="text-xs">
                  <div className="font-bold text-slate-900">{productA.name}</div>
                  <div className="text-indigo-600 font-semibold">{productA.series || productA.categoryLabel}</div>
                  <div className="text-slate-500 line-clamp-1">{productA.shortDesc}</div>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="md:col-span-1 flex justify-center">
              <button
                onClick={handleSwap}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-indigo-50 border border-slate-300 text-slate-700 hover:text-indigo-600 flex items-center justify-center transition-transform hover:rotate-180 duration-300 cursor-pointer shadow-xs"
                title="Swap Products"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Product B Selector Card */}
            <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-4 relative">
              <span className="absolute -top-2.5 left-4 px-2 py-0.5 rounded text-[10px] font-black uppercase bg-cyan-600 text-white tracking-wider">
                Product B
              </span>
              <div className="mt-1">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Second Product:
                </label>
                <select
                  value={productB.id}
                  onChange={(e) => {
                    const found = PRODUCTS.find((p) => p.id === e.target.value);
                    if (found) setProductB(found);
                  }}
                  className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-cyan-600"
                >
                  {PRODUCTS.map((p) => (
                    <option key={`b-${p.id}`} value={p.id}>
                      {p.name} ({p.series || p.categoryLabel})
                    </option>
                  ))}
                </select>
              </div>

              {/* Mini preview */}
              <div className="mt-3 flex items-center gap-3">
                <img
                  src={productB.image}
                  alt={productB.name}
                  className="w-14 h-14 object-cover rounded-lg border border-slate-200 shrink-0"
                />
                <div className="text-xs">
                  <div className="font-bold text-slate-900">{productB.name}</div>
                  <div className="text-cyan-700 font-semibold">{productB.series || productB.categoryLabel}</div>
                  <div className="text-slate-500 line-clamp-1">{productB.shortDesc}</div>
                </div>
              </div>
            </div>
          </div>

          {/* View Mode Toggle: AI Evaluation vs Spec Matrix */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('ai')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'ai'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Medical Buddy AI Evaluation</span>
              </button>

              <button
                onClick={() => setActiveTab('matrix')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'matrix'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Side-by-Side Spec Matrix</span>
              </button>
            </div>

            <button
              onClick={() => fetchAiComparison(productA, productB)}
              disabled={isLoadingAnalysis}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAnalysis ? 'animate-spin' : ''}`} />
              <span>Regenerate AI Analysis</span>
            </button>
          </div>

          {/* TAB 1: AI Evaluation */}
          {activeTab === 'ai' && (
            <div className="bg-gradient-to-br from-indigo-50/50 via-white to-cyan-50/30 border border-indigo-100 rounded-2xl p-5 shadow-xs">
              {isLoadingAnalysis ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-3">
                  <div className="w-10 h-10 rounded-full border-3 border-indigo-600 border-t-transparent animate-spin"></div>
                  <div className="text-sm font-bold text-slate-800">
                    Medical Buddy is executing deep engineering comparison...
                  </div>
                  <div className="text-xs text-slate-500">
                    Evaluating motor dynamics, materials, workflow tiers, and clinical compatibility.
                  </div>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none text-slate-800 space-y-4">
                  {aiAnalysis.split('\n').map((line, i) => {
                    if (line.startsWith('### ')) {
                      return (
                        <h3 key={i} className="text-base sm:text-lg font-black text-slate-950 mt-4 mb-2 flex items-center gap-2">
                          <Bot className="w-5 h-5 text-indigo-600" />
                          <span>{line.replace('### ', '')}</span>
                        </h3>
                      );
                    }
                    if (line.startsWith('#### ')) {
                      return (
                        <h4 key={i} className="text-sm font-extrabold text-indigo-950 mt-3 mb-1">
                          {line.replace('#### ', '')}
                        </h4>
                      );
                    }
                    if (line.startsWith('- ') || line.startsWith('* ')) {
                      return (
                        <div key={i} className="flex items-start gap-2 pl-2 text-xs sm:text-sm text-slate-700 my-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                          <span>{line.substring(2)}</span>
                        </div>
                      );
                    }
                    if (line.includes('[ACTION:FIX_MEETING')) {
                      return null; // Handle via bottom banner
                    }
                    if (line.trim() === '') return <div key={i} className="h-1" />;
                    return (
                      <p key={i} className="text-xs sm:text-sm leading-relaxed my-1">
                        {line}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Side-by-Side Spec Matrix */}
          {activeTab === 'matrix' && (
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-3 w-1/3 font-bold border-r border-slate-800">Specification Attribute</th>
                    <th className="p-3 w-1/3 font-bold border-r border-slate-800 text-indigo-300">
                      {productA.name}
                    </th>
                    <th className="p-3 w-1/3 font-bold text-cyan-300">
                      {productB.name}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-white">
                    <td className="p-3 font-semibold text-slate-700 bg-slate-50">Category</td>
                    <td className="p-3 font-medium text-slate-900">{productA.categoryLabel}</td>
                    <td className="p-3 font-medium text-slate-900">{productB.categoryLabel}</td>
                  </tr>

                  <tr className="bg-white">
                    <td className="p-3 font-semibold text-slate-700 bg-slate-50">Series / Model Code</td>
                    <td className="p-3 font-medium text-indigo-700 font-mono">{productA.series || 'Standard'}</td>
                    <td className="p-3 font-medium text-cyan-700 font-mono">{productB.series || 'Standard'}</td>
                  </tr>

                  <tr className="bg-white">
                    <td className="p-3 font-semibold text-slate-700 bg-slate-50">Primary Application</td>
                    <td className="p-3 text-slate-600">{productA.shortDesc}</td>
                    <td className="p-3 text-slate-600">{productB.shortDesc}</td>
                  </tr>

                  <tr className="bg-white">
                    <td className="p-3 font-semibold text-slate-700 bg-slate-50">Key Engineering Features</td>
                    <td className="p-3 text-slate-700">
                      <ul className="list-disc pl-4 space-y-1">
                        {productA.features.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-3 text-slate-700">
                      <ul className="list-disc pl-4 space-y-1">
                        {productB.features.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>

                  <tr className="bg-white">
                    <td className="p-3 font-semibold text-slate-700 bg-slate-50">Packaging Standard</td>
                    <td className="p-3 text-slate-600">{productA.packaging || 'Standard Packaging'}</td>
                    <td className="p-3 text-slate-600">{productB.packaging || 'Standard Packaging'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Direct Actions & Scheduling Strip */}
          <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-sm text-white">
                  Schedule Consultation for {productA.name} & {productB.name}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Discuss custom rotor pairings, OEM branding, or factory sample testing with our technical team.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
              <button
                onClick={() => onOpenMeetingModal(`${productA.name} vs ${productB.name} Technical Review`)}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Fix a Meeting Now</span>
              </button>

              <a
                href={COMPANY_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Coordinator</span>
              </a>

              {onAddToQuote && (
                <button
                  onClick={() => {
                    onAddToQuote(productA);
                    onAddToQuote(productB);
                  }}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Both to RFQ Quote</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-slate-100 px-5 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span>Manufacturing Facility: IMT Faridabad, Haryana, India</span>
          </div>
          <div>
            Direct Contact: <strong>{COMPANY_DETAILS.contactPerson}</strong> ({COMPANY_DETAILS.phone})
          </div>
        </div>
      </div>
    </div>
  );
};
