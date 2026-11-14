import React from 'react';
import { PageId } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import {
  ShieldCheck,
  Factory,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  Target,
  Award,
  Search,
  Check,
  Building,
  Microscope
} from 'lucide-react';

interface QualityManufacturingPageProps {
  onNavigate: (page: PageId) => void;
  onOpenCatalogue: () => void;
}

export const QualityManufacturingPage: React.FC<QualityManufacturingPageProps> = ({
  onNavigate,
  onOpenCatalogue
}) => {
  const operationsPillars = [
    {
      title: 'Process Standardization',
      desc: 'Controlled tooling, computerized injection cycle times, and automated temperature regulation to preserve polymer stability.',
      badge: 'SOP Controlled'
    },
    {
      title: 'Traceability & Consistency',
      desc: 'Batch-coded production lots enabling full backward traceability from final packaging down to polymer resin certificate of analysis.',
      badge: 'Lot Tracking'
    },
    {
      title: 'Continuous Quality Improvement',
      desc: 'Structured feedback loops with pathology laboratories, evaluating chemical resistance, lid lock endurance, and printing readability.',
      badge: 'Kaizen / QA'
    },
    {
      title: 'Regulatory & Customer Requirements',
      desc: 'Adherence to international diagnostic consumable norms, solvent endurance standards, and hospital procurement specifications.',
      badge: 'Compliance'
    }
  ];

  const qualityStages = [
    {
      step: '01',
      title: 'Virgin Polymer Resin Qualification',
      desc: 'High-purity P.O.M. (Polyoxymethylene) polymers and surgical grade stainless steels undergo purity and tensile checks.'
    },
    {
      step: '02',
      title: 'Precision Tooling & Molding',
      desc: 'Micro-tolerance multi-cavity injection molds guarantee sharp perforations (down to 0.5 mm) and clean deburred edges.'
    },
    {
      step: '03',
      title: 'Chemical & Solvent Bath Stress Testing',
      desc: 'Sample lots endure extended exposure to Xylene, Formalin, Reagent Alcohol, and liquid Paraffin at 60°C to verify zero warping.'
    },
    {
      step: '04',
      title: 'Automated Printer Compatibility Audit',
      desc: 'Angle calibration checks on 35° and 45° writing faces to guarantee crisp readability on Leica, Sakura, and thermal cassette printers.'
    },
    {
      step: '05',
      title: 'Cleanroom Packaging & Final Inspection',
      desc: 'Packaged in dust-free dispenser cartons with batch tracking identifiers before dispatch from our IMT Faridabad facility.'
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#6366f115_1px,transparent_1px),linear-gradient(to_bottom,#6366f115_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 text-xs font-semibold border border-indigo-800">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Make in India • ISO Management Principles</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Quality Built Into Every Stage
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            As a Make in India-aligned organization, Centronic Medical is committed to strengthening domestic manufacturing while working toward international quality expectations.
          </p>
        </div>
      </section>

      {/* Manufacturing Philosophy Section */}
      <section className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Core Guiding Doctrine
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Our Manufacturing Philosophy
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                From raw material selection through final inspection, quality is integrated into every stage of manufacturing.
              </p>
            </div>

            {/* Triad Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2 relative shadow-xs hover:border-indigo-300 transition-colors">
                <span className="text-xs font-mono font-bold text-indigo-600">STAGE 01</span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Precision
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Micron-level accuracy in mold design, exact perforation dimensions, and reproducible thermal tolerances.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2 relative shadow-xs hover:border-indigo-300 transition-colors">
                <span className="text-xs font-mono font-bold text-indigo-600">STAGE 02</span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Consistency
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Controlled polymer formulations guaranteeing batch-to-batch uniformity, ensuring seamless fits in laboratory instruments.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2 relative shadow-xs hover:border-indigo-300 transition-colors">
                <span className="text-xs font-mono font-bold text-indigo-600">STAGE 03</span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Reliability
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Products that laboratory technicians and pathologists can depend upon during high-stakes biopsy and diagnostic workloads.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 italic">
              "Our objective is to provide laboratory products that customers can depend on in routine and high-volume diagnostic environments."
            </div>
          </div>
        </div>
      </section>

      {/* 4 Operations Pillars */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Operational Focus
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Four Pillars of Operational Excellence
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Every production cycle at our Faridabad manufacturing plant is anchored to these four essential criteria:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {operationsPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-wider">
                    {pillar.badge}
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Control Stages */}
      <section className="py-16 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Inspection Protocols
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Quality Assurance Inspection Stages
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Rigorous checkpoints from raw resin compounding through final cleanroom packaging.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {qualityStages.map((stage, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 hover:border-indigo-300 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  {stage.step}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMT Faridabad Facility Snapshot */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Manufacturing Facility
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Industrial Model Township (IMT) Faridabad
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Centronic Medical India operates from Plot No. 837, Sector 69, Zone-07, IMT Faridabad, Haryana – 121004.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Positioned in Haryana's premier industrial corridor with seamless logistics connectivity to Delhi Airport, inland container depots, and pan-India transport arteries.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
                >
                  Schedule a Factory Discussion / Facility Visit
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-xl border border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2 font-bold text-sm text-indigo-400">
                <Factory className="w-5 h-5" />
                <span>Manufacturing Plant Specifications</span>
              </div>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="border-b border-slate-800 pb-2">
                  <span className="text-slate-400 block">Location:</span>
                  <span className="font-semibold text-white">Sector 69, Zone-07, IMT Faridabad</span>
                </div>
                <div className="border-b border-slate-800 pb-2">
                  <span className="text-slate-400 block">Capacities:</span>
                  <span className="font-semibold text-white">High-volume injection molding & steel forming</span>
                </div>
                <div className="border-b border-slate-800 pb-2">
                  <span className="text-slate-400 block">Traceability:</span>
                  <span className="font-semibold text-white">100% Lot-wise batch identification</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Make in India:</span>
                  <span className="font-semibold text-white">Domestic self-reliance with global standards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
