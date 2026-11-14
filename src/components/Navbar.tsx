import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  FileText,
  ShoppingBag,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Plus,
  Calendar,
  Bot,
  Scale,
  Globe
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  quoteCount: number;
  onOpenQuoteModal: () => void;
  onOpenCatalogueModal: () => void;
  onOpenMeetingModal: () => void;
  onOpenMedicalBuddy?: () => void;
  onOpenCompareModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  quoteCount,
  onOpenQuoteModal,
  onOpenCatalogueModal,
  onOpenMeetingModal,
  onOpenMedicalBuddy,
  onOpenCompareModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: t('home') },
    { id: 'about', label: t('aboutUs') },
    { id: 'products', label: t('products') },
    { id: 'centrifuges', label: t('labCentrifuges') },
    { id: 'histology', label: t('histologyCytology') },
    { id: 'quality', label: t('qualityManufacturing') },
    { id: 'contact', label: t('contactUs') }
  ];

  const handleNavClick = (page: PageId) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-indigo-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('makeInIndia')}</span>
            </span>
            <span className="hidden sm:inline-block text-slate-600">|</span>
            <div className="hidden md:flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{t('location')}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <a
              href={`tel:${COMPANY_DETAILS.phoneRaw}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-semibold text-slate-200" style={{ fontFamily: 'Verdana' }}>{COMPANY_DETAILS.phone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenCatalogueModal}
              className="hidden lg:inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium hover:underline cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t('downloadCatalogue')}</span>
            </button>
            <span className="hidden lg:inline-block text-slate-600">|</span>
            <button
              onClick={onOpenMeetingModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 hover:text-amber-200 font-bold border border-amber-400/30 transition-colors cursor-pointer text-xs"
              title="Schedule a 1-on-1 technical or procurement session"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('fixMeeting')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-2.5'
            : 'bg-white border-b border-slate-200 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo Branding */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-xs border border-indigo-500/30 group-hover:scale-105 transition-transform">
              <Plus className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                CENTRONIC
                <span className="text-indigo-600 ml-1.5 text-sm sm:text-base font-bold uppercase tracking-wider">
                  MEDICAL
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-slate-500 font-semibold mt-0.5">
                India Private Limited
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-indigo-700 font-semibold'
                      : 'text-slate-700 hover:text-indigo-600'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 bg-indigo-50 border border-indigo-200/80 rounded-lg -z-10 shadow-2xs"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Actions & RFQ Cart */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Medical Buddy AI Floating/Launcher Quick Button */}
            {onOpenMedicalBuddy && (
              <button
                onClick={onOpenMedicalBuddy}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 hover:from-slate-800 hover:to-indigo-900 text-white border border-indigo-500/50 text-xs font-bold shadow-xs hover:border-indigo-400 transition-all cursor-pointer group"
                title="Open Medical Buddy AI Assistant"
              >
                <Bot className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Ask Medical Buddy</span>
              </button>
            )}

            {/* Fix a Meeting Button */}
            <button
              onClick={onOpenMeetingModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 border border-amber-300 transition-all text-xs font-bold cursor-pointer"
              title="Schedule a 1-on-1 technical or procurement session"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>Fix a Meeting</span>
            </button>

            {/* Quote Request Basket */}
            <button
              id="header-quote-basket-btn"
              onClick={onOpenQuoteModal}
              className="relative flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-slate-700 hover:text-indigo-700 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all text-xs font-semibold cursor-pointer"
              title="View your Product RFQ / Quote Inquiries"
            >
              <ShoppingBag className="w-4 h-4 text-indigo-600" />
              <span className="hidden md:inline">Request Quote</span>
              {quoteCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {quoteCount}
                </span>
              )}
            </button>

            {/* Direct Contact Button */}
            <button
              onClick={() => handleNavClick('contact')}
              className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold tracking-wide shadow-xs hover:shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Enquire</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenMeetingModal}
              className="p-2 text-amber-700 hover:text-amber-800"
              title="Fix a Meeting"
            >
              <Calendar className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenQuoteModal}
              className="relative p-2 text-slate-700 hover:text-indigo-600"
              aria-label="View Quotation items"
            >
              <ShoppingBag className="w-5 h-5 text-indigo-600" />
              {quoteCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center">
                  {quoteCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-indigo-600 cursor-pointer focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="space-y-1 pb-3 border-b border-slate-100">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                  currentPage === item.id
                    ? 'text-indigo-700 bg-indigo-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          {/* Medical Buddy AI Button in Mobile Drawer */}
          {onOpenMedicalBuddy && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMedicalBuddy();
              }}
              className="w-full mt-2 py-2.5 rounded-lg bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-xs font-bold tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-xs border border-indigo-500/50"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Ask Medical Buddy AI (Specs & Compare)</span>
            </button>
          )}

          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCatalogueModal();
              }}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
            >
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Catalogue</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>RFQ List ({quoteCount})</span>
            </button>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenMeetingModal();
            }}
            className="w-full mt-2 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Calendar className="w-4 h-4" />
            <span>Fix a Meeting (1-on-1 Consultation)</span>
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className="w-full mt-2 py-2.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold tracking-wide text-center"
          >
            Contact & Consultation
          </button>
        </div>
      )}
    </header>
  );
};
