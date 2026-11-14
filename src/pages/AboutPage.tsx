import React from 'react';
import { PageId } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import {
  Building2,
  Factory,
  ShieldCheck,
  CheckCircle2,
  Users,
  Compass,
  TrendingUp,
  Target,
  ArrowRight,
  Sparkles,
  MapPin,
  Cpu,
  Layers,
  FlaskConical
} from 'lucide-react';
import { motion } from 'motion/react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenCatalogue: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenCatalogue }) => {
  const expertiseItems = [
    {
      title: 'Laboratory Centrifuges',
      desc: 'Benchtop low speed, benchtop high speed, floor standing, and blood bank units.',
      icon: <Cpu className="w-5 h-5 text-indigo-600" />
    },
    {
      title: 'Tissue Processing & Embedding Cassettes',
      desc: '102, 104 (M117), 106, 122 biopsy retention ring, and 123/124 biopsy cassettes.',
      icon: <Layers className="w-5 h-5 text-indigo-600" />
    },
    {
      title: 'Stainless Steel Tissue Embedding Moulds',
      desc: 'Precision surgical stainless steel moulds in 7×7, 15×15, 24×24, 30×24, and 37×24 mm.',
      icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />
    },
    {
      title: 'Histology Microtome Blades',
      desc: 'High profile and low profile PTFE coated blades for chatter-free microtomy.',
      icon: <Sparkles className="w-5 h-5 text-indigo-600" />
    },
    {
      title: 'Liquid Based Cytology (LBC) Kits',
      desc: 'Monolayer thin-prep diagnostic kits, collection vials, and cervical broom devices.',
      icon: <FlaskConical className="w-5 h-5 text-indigo-600" />
    },
    {
      title: 'Tissue Processing Materials',
      desc: 'Purified histology paraffin wax and optimal cutting temperature (OCT) compound.',
      icon: <Layers className="w-5 h-5 text-indigo-600" />
    },
    {
      title: 'Histology & Cytology Consumables',
      desc: 'Integrated solutions supporting specimen fixation, processing, and microscopy.',
      icon: <Building2 className="w-5 h-5 text-indigo-600" />
    }
  ];

  const teamDisciplines = [
    { name: 'Product Development', desc: 'Continuous design optimization, CAD mold engineering, and ergonomic styling.' },
    { name: 'Manufacturing Operations', desc: 'Controlled injection molding, high-finish metal forming, and cleanroom assembly.' },
    { name: 'Quality Assurance', desc: 'Solvent resistance testing, micro-tolerance dimensional checks, and batch traceability.' },
    { name: 'Sales & Client Engineering', desc: 'Consultative guidance, dealer partnerships, and diagnostic institution support.' }
  ];

  return (
    <div className="w-full bg-white">
      {/* Page Header */}
      <section className="bg-slate-900 text-white py-16 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#6366f115_1px,transparent_1px),linear-gradient(to_bottom,#6366f115_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 text-xs font-semibold border border-indigo-800">
            <span>Faridabad, NCR • Make in India</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            About Centronic Medical India
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Delivering globally competitive, high-quality laboratory solutions that support accuracy, efficiency and consistency in modern laboratory workflows.
          </p>
        </div>
      </section>

      {/* Main Company Story Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6 text-sm text-slate-700 leading-relaxed">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block">
                Our Story & Commitment
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Precision-Driven Manufacturing from the Heart of India's NCR
              </h2>

              <p>
                <strong>Centronic Medical India Private Limited</strong> is an India-based manufacturer of laboratory equipment and diagnostic consumables, headquartered in <strong>Faridabad, Haryana</strong>.
              </p>

              <p>
                Established with the objective of delivering globally competitive, high-quality laboratory solutions, Centronic Medical serves diagnostic laboratories, hospitals, medical colleges and research institutions across India and emerging international markets.
              </p>

              <p>
                We combine engineering expertise, controlled manufacturing processes and customer-focused product development to provide solutions that support <strong>accuracy, efficiency and consistency</strong> in modern laboratory workflows.
              </p>

              <div className="p-5 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs space-y-2 text-slate-800">
                <span className="font-bold text-indigo-900 block uppercase tracking-wider text-[11px]">
                  Core Foundation
                </span>
                <p>
                  Our products are developed with deliberate attention to <strong>precision engineering, material reliability and user safety</strong>. We empower diagnostic teams with equipment and consumables that maintain strict reproducibility test after test.
                </p>
              </div>
            </div>

            {/* Right Card: Location details */}
            <div className="lg:col-span-5 bg-slate-50 rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                  CMI
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Centronic Medical India Pvt. Ltd.
                  </h3>
                  <span className="text-xs text-slate-500">
                    Industrial Model Township (IMT) Hub
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-indigo-600 block">
                    Registered Corporate Office
                  </span>
                  <p className="text-slate-800 font-medium">
                    {COMPANY_DETAILS.registeredOffice.address}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-indigo-600 block">
                    Manufacturing Operations Facility
                  </span>
                  <p className="text-slate-800 font-medium">
                    {COMPANY_DETAILS.manufacturingPlant.address}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500">Contact Person:</span>
                <span className="font-bold text-slate-800">{COMPANY_DETAILS.contactPerson}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Expertise */}
      <section className="py-16 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Manufacturing Spectrum
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Core Expertise
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Our core expertise includes the direct manufacturing, precision injection molding, and supply of:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {expertiseItems.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition-all space-y-2.5"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Laboratories Choose Centronic */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Competitive Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Laboratories Choose Centronic
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPANY_DETAILS.whyChoosePoints.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-wider">
                    {item.badge}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team & Culture */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Team & Culture
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Driven by Technical Expertise & Collaborative Values
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Centronic Medical is supported by a multidisciplinary team working collaboratively across all stages of production and client support.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                We collaborate directly with laboratory professionals, distributors and healthcare institutions to better understand real-world diagnostic challenges and continuously improve product usability and performance.
              </p>

              <div className="pt-4 border-t border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  Our Cultural Anchors
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-200">
                  <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700">
                    • Technical Discipline
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700">
                    • Ethical Business Practices
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700">
                    • Customer Collaboration
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700">
                    • Long-Term Partnerships
                  </div>
                </div>
              </div>
            </div>

            {/* Disciplines */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {teamDisciplines.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2"
                >
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Journey Forward */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Vision Block */}
          <div className="p-8 sm:p-10 rounded-xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-lg space-y-4 border border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Corporate Vision Statement
            </span>
            <blockquote className="text-lg sm:text-xl font-medium text-slate-100 leading-relaxed border-l-4 border-indigo-500 pl-4">
              "{COMPANY_DETAILS.vision}"
            </blockquote>
          </div>

          {/* Journey Forward */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Future Trajectory
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Building the Future of Laboratory Manufacturing
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                From a focused manufacturing base to a growing portfolio serving multiple diagnostic segments, Centronic Medical continues to expand its capabilities, product offerings and market reach.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                We remain dedicated to supporting laboratories with products designed around today's needs and tomorrow's expectations.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-wrap gap-2.5">
              {[
                'Innovation & Tooling',
                'Quality Excellence',
                'Responsible Manufacturing',
                'Product Expansion',
                'Long-Term Partnerships'
              ].map((pill, i) => (
                <div
                  key={i}
                  className="px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 shadow-xs"
                >
                  ✓ {pill}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Interested in reviewing our catalogue or discussing distribution?
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenCatalogue}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:text-indigo-700 hover:border-indigo-300 text-xs font-semibold cursor-pointer transition-colors"
              >
                Catalogue Overview
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors"
              >
                Contact Sales Office
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
