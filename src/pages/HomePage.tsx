import React from 'react';
import { PageId, ProductItem, ProductCategory } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import { PRODUCTS, CENTRONIC_IMAGES, CATEGORY_INFO } from '../data/productsData';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  Download,
  Sparkles,
  Layers,
  Award,
  Factory,
  Check,
  ChevronLeft,
  ChevronRight,
  Microscope,
  RotateCw,
  FlaskConical,
  Eye,
  Plus,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectProduct: (product: ProductItem) => void;
  onAddToQuote: (product: ProductItem) => void;
  onOpenCatalogue: () => void;
  onOpenMeetingModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProduct,
  onAddToQuote,
  onOpenCatalogue,
  onOpenMeetingModal
}) => {
  const featuredProducts = PRODUCTS.slice(0, 6);

  const heroSlides = [
    {
      image: CENTRONIC_IMAGES.hero,
      title: 'Modern Diagnostic Laboratory',
      subtitle: 'Engineered for high-volume routine clinical & pathology workflows.',
      badge: 'Faridabad Hub',
      tag: 'NCR, India',
    },
    {
      image: CENTRONIC_IMAGES.cleanroom,
      title: 'Precision Cleanroom Production',
      subtitle: 'Robotic injection moulding ensuring tight dimensional tolerances.',
      badge: 'Manufacturing',
      tag: 'ISO Principles',
    },
    {
      image: CENTRONIC_IMAGES.centrifuge,
      title: 'Laboratory Centrifuges & Drives',
      subtitle: 'Smooth brushless motor damping with precision electronic safety locks.',
      badge: 'Equipment Line',
      tag: 'Quiet Damping',
    },
    {
      image: CENTRONIC_IMAGES.histology,
      title: 'Histology & Biopsy Cassettes',
      subtitle: 'Modified P.O.M. polymer formulation resistant to histological solvents.',
      badge: 'Consumables',
      tag: 'Make in India',
    },
    {
      image: CENTRONIC_IMAGES.qualityLab,
      title: 'Multi-Stage Quality Inspection',
      subtitle: 'Micron-level visual & thermal checks verifying batch-to-batch integrity.',
      badge: 'Testing QA',
      tag: 'Batch Certified',
    },
  ];

  const [currentHeroSlide, setCurrentHeroSlide] = React.useState(0);
  const [isSlidePaused, setIsSlidePaused] = React.useState(false);

  React.useEffect(() => {
    if (isSlidePaused) return;
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isSlidePaused, heroSlides.length]);

  const heroCards = [
    {
      title: 'Laboratory Centrifuges',
      desc: 'Reliable centrifugation solutions designed for modern laboratory workflows.',
      linkPage: 'centrifuges' as PageId,
      image: CENTRONIC_IMAGES.centrifuge,
      badge: 'Equipment'
    },
    {
      title: 'Histology Consumables',
      desc: 'Precision-focused products for tissue processing, embedding and specimen handling.',
      linkPage: 'histology' as PageId,
      image: CENTRONIC_IMAGES.histology,
      badge: 'Pathology'
    },
    {
      title: 'Cytology Solutions',
      desc: 'Solutions supporting gynaecological and non-gynaecological cytology workflows.',
      linkPage: 'histology' as PageId,
      image: CENTRONIC_IMAGES.cytology,
      badge: 'Diagnostic'
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* ========================================================================= */}
      {/* HERO SECTION                                                             */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-12 pb-24 lg:pt-16 lg:pb-28">
        {/* Subtle decorative grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#6366f115_1px,transparent_1px),linear-gradient(to_bottom,#6366f115_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Ambient glow */}
        <div className="absolute -top-32 right-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content (7 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-200 text-xs font-semibold backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Make in India • Faridabad Manufacturing Facility</span>
              </div>

              {/* Headings */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Precision in Every <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-white">
                    Laboratory Workflow
                  </span>
                </h1>
                <p className="text-base sm:text-lg font-semibold text-indigo-300 tracking-wide">
                  Laboratory Equipment & Diagnostic Consumables
                </p>
              </div>

              {/* Subtitle Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                Centronic Medical India Private Limited is an India-based manufacturer of laboratory equipment and diagnostic consumables, delivering reliable solutions for diagnostic laboratories, hospitals, medical colleges and research institutions.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  id="hero-explore-products-btn"
                  onClick={() => onNavigate('products')}
                  className="px-6 py-3.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {onOpenMeetingModal && (
                  <button
                    id="hero-fix-meeting-btn"
                    onClick={onOpenMeetingModal}
                    className="px-5 py-3.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-bold shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-slate-950" />
                    <span>Fix a Meeting</span>
                  </button>
                )}

                <button
                  id="hero-contact-us-btn"
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm font-semibold border border-white/20 backdrop-blur-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Contact Us</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={onOpenCatalogue}
                  className="px-4 py-3.5 rounded-lg text-indigo-300 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95 transition-transform duration-150"
                >
                  <Download className="w-4 h-4" />
                  <span style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', fontSize: '16px' }}>Download Catalogue</span>
                </button>
              </div>

              {/* Quick Pillars pill bar */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Precision Engineering</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>ISO-Based Principles</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Direct OEM Supply</span>
                </div>
              </div>
            </motion.div>

            {/* Hero Right Visual (5 cols) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div 
                className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 bg-slate-900 group aspect-4/3 sm:aspect-auto sm:h-[420px]"
                onMouseEnter={() => setIsSlidePaused(true)}
                onMouseLeave={() => setIsSlidePaused(false)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentHeroSlide}
                    src={heroSlides[currentHeroSlide].image}
                    alt={heroSlides[currentHeroSlide].title}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 1.08, filter: 'blur(3px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.96, filter: 'blur(2px)' }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-slate-950/20 pointer-events-none" />

                {/* Top slide controls & indicators */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2 bg-slate-950/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/80 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold text-slate-200">
                      0{currentHeroSlide + 1} / 0{heroSlides.length}
                    </span>
                    <span className="text-[10px] text-slate-400 border-l border-slate-700 pl-2">
                      {heroSlides[currentHeroSlide].badge}
                    </span>
                  </div>

                  {/* Navigation dots */}
                  <div className="flex items-center gap-1.5 bg-slate-950/75 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-slate-700/80 shadow-xs">
                    {heroSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentHeroSlide(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === currentHeroSlide
                            ? 'w-5 bg-indigo-400 shadow-xs shadow-indigo-500/50'
                            : 'w-1.5 bg-slate-600 hover:bg-slate-400'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Arrows */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                      className="w-7 h-7 rounded-full bg-slate-950/75 hover:bg-slate-800 backdrop-blur-md border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Previous image"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length)}
                      className="w-7 h-7 rounded-full bg-slate-950/75 hover:bg-slate-800 backdrop-blur-md border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Next image"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                
                {/* Float Card on Image with animated slide info */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-xs text-slate-200 z-10">
                  <div className="flex items-center justify-between font-bold text-white mb-1">
                    <span className="flex items-center gap-1.5">
                      <Factory className="w-4 h-4 text-indigo-400" />
                      {heroSlides[currentHeroSlide].title}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-600 text-white font-semibold shadow-xs">
                      {heroSlides[currentHeroSlide].tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    {heroSlides[currentHeroSlide].subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ========================================================================= */}
          {/* HERO HIGHLIGHT CARDS                                                     */}
          {/* ========================================================================= */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {heroCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                onClick={() => onNavigate(card.linkPage)}
                className="group p-5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-950/80 px-2.5 py-1 rounded-md border border-indigo-800/60">
                      {card.badge}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-indigo-600 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-semibold group-hover:underline">
                  <span>View Specifications</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ABOUT CENTRONIC MEDICAL                                                  */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Box (5 cols) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Industrial Base & Footprint
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    National Capital Region (NCR)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Centronic Medical operates dedicated manufacturing and registered facilities in <strong>Faridabad, Haryana</strong>, providing high-precision laboratory infrastructure with domestic agility and global compliance.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                      Registered Office
                    </span>
                    <p className="font-semibold text-slate-800">
                      Sector 7C, Faridabad
                    </p>
                    <span className="text-[11px] text-slate-500">Haryana 121006</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-indigo-50 border border-indigo-100 text-xs">
                    <span className="text-[10px] uppercase font-bold text-indigo-700 block mb-1">
                      Manufacturing Plant
                    </span>
                    <p className="font-semibold text-slate-900">
                      Sector 69, IMT Faridabad
                    </p>
                    <span className="text-[11px] text-slate-600">Industrial Model Township</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Manufacturing Direct</span>
                  <span className="font-semibold text-indigo-600">ISO-Based Quality Principles</span>
                </div>
              </div>
            </div>

            {/* About Text (7 cols) */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  About Centronic Medical
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Engineering Reliable Solutions for Modern Laboratories
                </h2>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <p>
                  Centronic Medical India Private Limited is headquartered in <strong>Faridabad, Haryana</strong>, within the National Capital Region (NCR).
                </p>
                <p>
                  Our focus is on manufacturing laboratory equipment and diagnostic consumables with an emphasis on <strong>precision engineering, material reliability, user safety and consistent performance</strong>.
                </p>
                <p>
                  From laboratory centrifuges to histology and cytology consumables, our growing product portfolio is designed to support routine and high-volume diagnostic environments.
                </p>
              </div>

              {/* 4 Pillars Mini-Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  { title: 'Precision', desc: 'Meticulous engineering' },
                  { title: 'Reliability', desc: 'Consistent performance' },
                  { title: 'Safety', desc: 'Operator protection' },
                  { title: 'Durability', desc: 'Solvent resistance' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white border border-slate-200 text-center shadow-xs">
                    <div className="text-xs font-bold text-slate-900">{item.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{item.desc}</div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  id="about-learn-more-btn"
                  onClick={() => onNavigate('about')}
                  className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PRODUCT CATEGORIES SHOWCASE                                              */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Our Product Portfolio
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Comprehensive Laboratory & Pathology Solutions
              </h2>
              <p className="text-sm text-slate-600">
                Centronic Medical offers a growing range of laboratory and pathology products.
              </p>
            </div>

            <button
              onClick={() => onNavigate('products')}
              className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer self-start md:self-end"
            >
              <span>View Full Directory ({PRODUCTS.length} Products)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 6 Product Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'Laboratory Centrifuges',
                items: [
                  'Benchtop Low Speed Centrifuge',
                  'Benchtop High Speed Centrifuge',
                  'Floor Model Low/High Speed Centrifuge',
                  'Blood Bank Centrifuge — Upcoming'
                ],
                page: 'centrifuges' as PageId
              },
              {
                num: '02',
                title: 'Tissue Processing & Embedding Cassettes',
                items: [
                  '102 Tissue Embedding Cassette',
                  '104 Tissue Embedding Cassette',
                  '106 Tissue Embedding Cassette',
                  '122 Tissue Embedding Cassette',
                  '123 Tissue Embedding Cassette',
                  'Embedding Ring'
                ],
                page: 'histology' as PageId
              },
              {
                num: '03',
                title: 'Stainless Steel Embedding Moulds',
                items: [
                  'Mould 7 × 7',
                  'Mould 15 × 15',
                  'Mould 24 × 24',
                  'Mould 30 × 24',
                  'Mould 37 × 24'
                ],
                page: 'histology' as PageId
              },
              {
                num: '04',
                title: 'Histology Microtome Blades',
                items: [
                  'High Profile Microtome Blades',
                  'Low Profile Microtome Blades',
                  'PTFE Coated Cutting Facet',
                  'Integrated Used-Blade Compartment'
                ],
                page: 'histology' as PageId
              },
              {
                num: '05',
                title: 'Tissue Processing Materials',
                items: [
                  'Tissue Embedding Paraffin Wax (56°C–58°C)',
                  'Tissue Freezing Medium / OCT Compound',
                  'Polymer-enriched for smooth ribboning',
                  'Residue-free cryostat matrix'
                ],
                page: 'histology' as PageId
              },
              {
                num: '06',
                title: 'Cytology Solutions',
                items: [
                  'Gynaecological Cytology Preservative',
                  'Non-Gynaecological Cytology Preservative',
                  'Liquid Based Cytology (LBC) Kits',
                  'Cervical Broom Collection Consumables'
                ],
                page: 'histology' as PageId
              }
            ].map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group p-6 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded">
                      {cat.num}
                    </span>
                    <span className="text-xs text-slate-400 group-hover:text-indigo-600 transition-colors">
                      CMI Portfolio
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    {cat.title}
                  </h3>

                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {cat.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80">
                  <button
                    onClick={() => onNavigate(cat.page)}
                    className="w-full py-2 rounded-lg bg-white group-hover:bg-indigo-50 border border-slate-200 group-hover:border-indigo-300 text-xs font-semibold text-slate-700 group-hover:text-indigo-700 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Explore {cat.title.split('&')[0].trim()}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FEATURED PRODUCTS SHOWCASE                                               */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Selected Catalogue Highlights
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Diagnostic Equipment & Consumables
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Click any product to inspect detailed engineering features, dimensions, packaging configurations, and download specification sheets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, pIdx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: pIdx * 0.08 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div className="p-5 space-y-4">
                  {/* Image container */}
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="w-full aspect-4/3 rounded-lg overflow-hidden bg-slate-100 cursor-pointer relative"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs">
                        {product.categoryLabel}
                      </span>
                    </div>
                    {product.isUpcoming && (
                      <div className="absolute top-2.5 right-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white">
                          Upcoming
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer leading-snug"
                    >
                      {product.name}
                    </h3>
                    {product.series && (
                      <span className="text-[11px] font-mono text-slate-500">
                        {product.series}
                      </span>
                    )}
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {product.shortDesc}
                    </p>
                  </div>

                  {/* Quick specs pill */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {product.specs.slice(0, 2).map((s, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded"
                      >
                        <strong>{s.label}:</strong> {s.value}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card footer actions */}
                <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>

                  <button
                    onClick={() => onAddToQuote(product)}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add to RFQ</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => onNavigate('products')}
              className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all shadow-xs"
            >
              Browse Complete Catalogue ({PRODUCTS.length} Products)
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* WHY CHOOSE CENTRONIC MEDICAL                                             */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Value & Assurance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Laboratories Choose Centronic
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Combining domestic Indian manufacturing agility with international medical device benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPANY_DETAILS.whyChoosePoints.map((item, wIdx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: wIdx * 0.08 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 transition-all duration-300 space-y-3 shadow-xs"
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
              </motion.div>
            ))}

            {/* Sixth highlight card: Philosophy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: 0.4 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-6 rounded-xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 border border-slate-800 text-white space-y-3 flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-2">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-indigo-900 text-indigo-200 uppercase tracking-wider">
                  Core Triad
                </span>
                <h3 className="text-base font-bold text-white">
                  Manufacturing Philosophy
                </h3>
                <p className="text-xs text-indigo-200 font-semibold tracking-wide">
                  Precision → Consistency → Reliability
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our objective is to provide laboratory products that customers can depend on in routine and high-volume diagnostic environments.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <button
                  onClick={() => onNavigate('quality')}
                  className="text-xs font-semibold text-indigo-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Read Quality & Compliance</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* VISION & JOURNEY FORWARD                                                  */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Our Corporate Vision
              </span>
              <blockquote className="text-lg sm:text-xl font-medium text-slate-100 leading-relaxed border-l-4 border-indigo-500 pl-4">
                "{COMPANY_DETAILS.vision}"
              </blockquote>
              <div className="pt-2">
                <p className="text-xs text-slate-400">
                  Building the future of laboratory manufacturing with technical discipline, ethical business practices, and long-term customer partnerships.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-800/80 rounded-xl p-6 border border-slate-700/80 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Building the Future</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                From a focused manufacturing base in Faridabad to a growing portfolio serving diagnostic networks across India and emerging markets:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-200">
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-700">• Innovation</div>
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-700">• Quality Excellence</div>
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-700">• Responsible Mfg</div>
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-700">• Long-Term Partner</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CONTACT / ENQUIRY CTA SECTION                                            */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-slate-800">
            {/* Background elements */}
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-2xl" />

            <div className="relative max-w-3xl space-y-6">
              <span className="px-3 py-1 rounded-full bg-indigo-900/80 text-indigo-200 text-xs font-semibold border border-indigo-700/60">
                Partner with Centronic Medical India
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Let's Build Better Laboratory Solutions Together
              </h2>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Whether you are looking for laboratory centrifuges, histology consumables, tissue embedding products, or cytology solutions, connect directly with our Faridabad technical sales and manufacturing team.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-900/60 flex items-center justify-center text-indigo-300 border border-indigo-700/50">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block">Direct Line</span>
                    <a href={`tel:${COMPANY_DETAILS.phoneRaw}`} className="font-bold text-white hover:underline text-sm">
                      {COMPANY_DETAILS.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-900/60 flex items-center justify-center text-indigo-300 border border-indigo-700/50">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block">Sales Inquiry</span>
                    <a href={`mailto:${COMPANY_DETAILS.email}`} className="font-bold text-white hover:underline text-sm">
                      {COMPANY_DETAILS.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                {onOpenMeetingModal && (
                  <button
                    onClick={onOpenMeetingModal}
                    className="px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-slate-950" />
                    <span>Fix a Meeting (1-on-1)</span>
                  </button>
                )}
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3 rounded-lg bg-white text-slate-900 hover:bg-slate-100 font-semibold text-xs shadow-xs transition-all cursor-pointer"
                >
                  Contact Us & Request Quote
                </button>
                <a
                  href={COMPANY_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
