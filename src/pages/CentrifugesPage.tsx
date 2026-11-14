import React from 'react';
import { motion } from 'motion/react';
import { PageId, ProductItem } from '../types';
import { PRODUCTS, CENTRONIC_IMAGES } from '../data/productsData';
import { COMPANY_DETAILS } from '../data/companyData';
import {
  RotateCw,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Plus,
  Check,
  Mail,
  FileDown,
  Sparkles,
  AlertCircle,
  Clock,
  Gauge,
  Activity
} from 'lucide-react';

interface CentrifugesPageProps {
  onSelectProduct: (product: ProductItem) => void;
  onAddToQuote: (product: ProductItem) => void;
  onEnquireProduct: (product: ProductItem) => void;
  isInQuote: (productId: string) => boolean;
  onNavigate: (page: PageId) => void;
  onOpenCatalogue: () => void;
}

export const CentrifugesPage: React.FC<CentrifugesPageProps> = ({
  onSelectProduct,
  onAddToQuote,
  onEnquireProduct,
  isInQuote,
  onNavigate,
  onOpenCatalogue
}) => {
  const centrifugeProducts = PRODUCTS.filter((p) => p.category === 'centrifuges');

  const categories = [
    {
      title: 'Benchtop Low Speed',
      desc: 'Compact laboratory centrifugation solution for routine applications.',
      product: centrifugeProducts.find((p) => p.id === 'centrifuge-benchtop-low-speed'),
      highlight: 'Routine Clinical Chemistry & Urinalysis'
    },
    {
      title: 'Benchtop High Speed',
      desc: 'Designed for laboratory workflows requiring higher-speed centrifugation.',
      product: centrifugeProducts.find((p) => p.id === 'centrifuge-benchtop-high-speed'),
      highlight: 'Molecular Pelleting & Research'
    },
    {
      title: 'Floor Model Low/High Speed',
      desc: 'A floor-standing centrifugation solution for laboratories requiring larger-scale equipment.',
      product: centrifugeProducts.find((p) => p.id === 'centrifuge-floor-model'),
      highlight: 'High-Volume Diagnostic & Hospital Laboratories'
    },
    {
      title: 'Blood Bank Centrifuge — Upcoming',
      desc: 'An upcoming addition to the Centronic Medical centrifuge portfolio.',
      product: centrifugeProducts.find((p) => p.id === 'centrifuge-blood-bank'),
      highlight: 'Blood Component Separation & Transfusion Medicine',
      isUpcoming: true
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* Centrifuges Hero Header */}
      <section className="bg-slate-900 text-white py-16 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#6366f115_1px,transparent_1px),linear-gradient(to_bottom,#6366f115_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 text-xs font-semibold border border-indigo-800">
                <RotateCw className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                <span>Laboratory Equipment Division</span>
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Laboratory Centrifuges
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Centronic Medical's laboratory centrifuge portfolio is designed to support laboratory workflows requiring reliable and consistent centrifugation across diagnostic laboratories, hospitals, and research facilities.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
                >
                  Consult Equipment Engineer
                </button>
                <button
                  onClick={onOpenCatalogue}
                  className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/20 transition-all cursor-pointer"
                >
                  Download Equipment Compendium
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shadow-lg">
                <img
                  src={CENTRONIC_IMAGES.centrifuge}
                  alt="Centronic Laboratory Centrifuge"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-4/3 object-cover"
                />
                <div className="p-4 bg-slate-900 border-t border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                  <span>Centronic Medical India Engineering</span>
                  <span className="text-indigo-400 font-semibold">Brushless Quiet Drive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Categories Section */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Centrifugation Spectrum
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Available Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Engineered with an emphasis on smooth acceleration profiles, vibration suppression, digital safety interlocks, and durable laboratory housings.
            </p>
          </div>

          {/* 4 Centrifuge Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat, idx) => {
              const product = cat.product;
              const inQuote = product ? isInQuote(product.id) : false;

              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all duration-300 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase text-indigo-600 font-mono">
                            Category 0{idx + 1}
                          </span>
                          {cat.isUpcoming && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase tracking-wide">
                              Upcoming Addition
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mt-1">
                          {cat.title}
                        </h3>
                      </div>

                      <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                        <RotateCw className="w-5 h-5" />
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {cat.desc}
                    </p>

                    <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-1">
                      <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                        Primary Target Scope:
                      </span>
                      <p>{cat.highlight}</p>
                    </div>

                    {product && (
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <span className="text-xs font-bold text-slate-800 block">
                          Key Engineering Highlights:
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-600">
                          {product.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2">
                              <span className="text-indigo-600 font-bold">•</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Bottom Actions */}
                  {product && (
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Detailed Card</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onAddToQuote(product)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                            inQuote
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'border border-slate-300 bg-white text-slate-700 hover:border-indigo-400 hover:text-indigo-700'
                          }`}
                        >
                          {inQuote ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          <span>{inQuote ? 'Added to RFQ' : 'Add to RFQ'}</span>
                        </button>

                        <button
                          onClick={() => onEnquireProduct(product)}
                          className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-xs transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Enquire</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Important Technical Specifications Notice (Respecting Prompt's Mandate) */}
          <div className="p-6 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h4 className="font-bold text-sm text-amber-900">
                Technical Specifications Advisory
              </h4>
              <p className="leading-relaxed text-amber-800">
                Centronic Medical India provides these centrifuge categories with customized rotor adapters, bucket options, and digital interfaces. Technical parameters such as exact RPM, RCF, tube capacity, rotor configurations, and chassis dimensions are confirmed based on laboratory application requirements and upon formal catalogue release.
              </p>
              <p className="font-semibold text-amber-900">
                To request specific rotor configurations or custom tube bucket adapters, please contact our technical sales team directly at <strong>+91 9999333447</strong> or <strong>info.centronic@yahoo.com</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Design Philosophy for Centrifuges */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Safety & Mechanical Integrity
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Centrifugation Engineering Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Electronic Safety Lid Lock
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated interlock prevents lid opening during rotor acceleration or rotation. Automatic power cutoff triggers immediately upon detection of imbalance.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                <Gauge className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Dynamic Airflow Cooling
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aero-engineered ventilation channels direct air away from the centrifuge bowl, mitigating ambient friction heating to protect sensitive biological analytes.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Acoustic & Vibration Damping
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Heavy-gauge chassis and precision-balanced rotor drives suppress harmonic resonance, maintaining quiet operational environments in busy diagnostic labs.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Need guidance selecting the right centrifuge for your diagnostic center?
              </h4>
              <p className="text-xs text-slate-500">
                Our Faridabad technical engineering desk is available to assist with rotor selection and capacity planning.
              </p>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shrink-0 cursor-pointer shadow-xs transition-colors"
            >
              Request Centrifuge Quotation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
