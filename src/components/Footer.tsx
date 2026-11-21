import React from 'react';
import { PageId } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Globe2,
  ExternalLink,
  Download,
  Calendar
} from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
  onOpenCatalogueModal: () => void;
  onOpenMeetingModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentPage,
  onOpenCatalogueModal,
  onOpenMeetingModal
}) => {
  const handleNav = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Brand & Description (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/brand/centronic-logo.png"
                alt="Centronic Medical India Private Limited"
                className="h-10 sm:h-12 w-auto max-w-[230px] object-contain object-left brightness-0 invert"
              />
            </div>

            <p className="text-sm text-slate-300 font-medium">
              Laboratory Equipment & Diagnostic Consumables
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An India-based manufacturer committed to precision engineering, material reliability, user safety and consistent performance for diagnostic laboratories, hospitals, medical colleges and research institutions.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-indigo-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Make in India
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-indigo-300 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                ISO Aligned
              </span>
            </div>

            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Motto</p>
              <p className="text-sm font-semibold text-slate-100 italic mt-0.5">
                "{COMPANY_DETAILS.motto}"
              </p>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ArrowUpRight className="w-3 h-3 text-indigo-400" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ArrowUpRight className="w-3 h-3 text-indigo-400" />
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ArrowUpRight className="w-3 h-3 text-indigo-400" />
                  <span>Products</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('centrifuges')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ArrowUpRight className="w-3 h-3 text-indigo-400" />
                  <span>Laboratory Centrifuges</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('histology')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ArrowUpRight className="w-3 h-3 text-indigo-400" />
                  <span>Histology & Cytology</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('quality')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ArrowUpRight className="w-3 h-3 text-indigo-400" />
                  <span>Quality & Manufacturing</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ArrowUpRight className="w-3 h-3 text-indigo-400" />
                  <span>Contact Us</span>
                </button>
              </li>
              <li className="pt-2 space-y-2">
                {onOpenMeetingModal && (
                  <button
                    onClick={onOpenMeetingModal}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold transition-colors border border-amber-500/40 cursor-pointer"
                  >
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>Fix a Meeting (1-on-1)</span>
                  </button>
                )}
                <button
                  onClick={onOpenCatalogueModal}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-950/60 hover:bg-indigo-900 text-indigo-200 text-xs font-medium transition-colors border border-indigo-800/60 cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>Brochure / Catalogue</span>
                </button>
                <a
                  href="/documents/cmipl-company-letterhead.docx"
                  download
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium transition-colors border border-slate-700 cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>Official Letterhead (DOCX)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Product Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Product Categories
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleNav('centrifuges')}>
                • Laboratory Centrifuges (Benchtop & Floor)
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleNav('histology')}>
                • Tissue Embedding Cassettes (102, 104, 106)
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleNav('histology')}>
                • Biopsy Cassettes (122 Ring & 123/124)
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleNav('histology')}>
                • Stainless Steel Moulds (7×7 to 37×24 mm)
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleNav('histology')}>
                • Histology Microtome Blades (High & Low)
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleNav('histology')}>
                • Tissue Paraffin Wax & Cryostat OCT
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleNav('histology')}>
                • Cytology Solutions & LBC Kits
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleNav('histology')}>
                • Tissue Embedding O-Rings
              </li>
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Headquarters & Plant
            </h3>

            <div className="space-y-3 text-xs text-slate-400">
              <div>
                <span className="text-[11px] font-bold uppercase text-slate-300 block mb-0.5">
                  Contact Person
                </span>
                <span className="text-slate-100 font-semibold">{COMPANY_DETAILS.contactPerson}</span>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase text-slate-300 block mb-0.5">
                  Direct Line & WhatsApp
                </span>
                <a
                  href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                  className="text-indigo-400 hover:text-indigo-300 font-bold block"
                >
                  {COMPANY_DETAILS.phone}
                </a>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase text-slate-300 block mb-0.5">
                  Official Email
                </span>
                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="text-slate-200 hover:text-white underline block"
                >
                  {COMPANY_DETAILS.email}
                </a>
              </div>

              <div className="pt-1">
                <span className="text-[11px] font-bold uppercase text-slate-300 block mb-0.5">
                  Registered Office
                </span>
                <p className="text-[11px] text-slate-400 leading-snug">
                  {COMPANY_DETAILS.registeredOffice.address}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase text-slate-300 block mb-0.5">
                  Manufacturing Plant
                </span>
                <p className="text-[11px] text-slate-400 leading-snug">
                  {COMPANY_DETAILS.manufacturingPlant.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Centronic Medical India Private Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Faridabad, Haryana, India</span>
            <span>•</span>
            <span className="text-slate-400">{COMPANY_DETAILS.website}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
