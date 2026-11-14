import React, { useState, useEffect } from 'react';
import { PageId, ProductItem, QuoteCartItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuoteRequestModal } from './components/QuoteRequestModal';
import { CatalogueDownloadModal } from './components/CatalogueDownloadModal';
import { FixMeetingModal } from './components/FixMeetingModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { CentrifugesPage } from './pages/CentrifugesPage';
import { HistologyCytologyPage } from './pages/HistologyCytologyPage';
import { QualityManufacturingPage } from './pages/QualityManufacturingPage';
import { ContactPage } from './pages/ContactPage';
import { MedicalBuddyWidget } from './components/MedicalBuddyWidget';
import { MedicalBuddyCompareModal } from './components/MedicalBuddyCompareModal';
import { PRODUCTS } from './data/productsData';
import { COMPANY_DETAILS } from './data/companyData';
import { ShoppingBag, MessageCircle, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageProvider } from './i18n/LanguageContext';
import { Toast, ToastNotification } from './components/Toast';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isCatalogueModalOpen, setIsCatalogueModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [meetingModalTopic, setMeetingModalTopic] = useState<string | undefined>(undefined);
  const [contactPrefilledProduct, setContactPrefilledProduct] = useState<ProductItem | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [toast, setToast] = useState<ToastNotification | null>(null);

  const handleMeetingBooked = (refId: string, topic: string) => {
    setToast({
      id: Date.now().toString(),
      type: 'meeting',
      title: `Meeting Request Confirmed (${refId})`,
      subtitle: `Topic: ${topic}. Our engineering team will contact you shortly.`
    });
    setIsMeetingModalOpen(false);
  };

  // Medical Buddy AI & Product Compare States
  const [isMedicalBuddyOpen, setIsMedicalBuddyOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [compareProductA, setCompareProductA] = useState<ProductItem | null>(null);
  const [compareProductB, setCompareProductB] = useState<ProductItem | null>(null);

  const handleOpenMeetingModal = (topic?: string) => {
    setMeetingModalTopic(topic);
    setIsMeetingModalOpen(true);
  };

  const handleOpenCompareModal = (product1?: ProductItem, product2?: ProductItem) => {
    if (product1) setCompareProductA(product1);
    if (product2) setCompareProductB(product2);
    setIsCompareModalOpen(true);
  };

  const handleAskMedicalBuddy = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsMedicalBuddyOpen(true);
  };

  // Quote cart state with localStorage persistence
  const [quoteItems, setQuoteItems] = useState<QuoteCartItem[]>(() => {
    try {
      const saved = localStorage.getItem('centronic_rfq_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('centronic_rfq_items', JSON.stringify(quoteItems));
    } catch {
      // storage unavailable or quota exceeded
    }
  }, [quoteItems]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check for shared product in URL query or hash
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const urlProductId = searchParams.get('product');
      const hash = window.location.hash;
      const hashProductId = hash.startsWith('#product-') ? hash.replace('#product-', '') : null;
      const targetId = urlProductId || hashProductId;

      if (targetId) {
        const product = PRODUCTS.find((p) => p.id === targetId);
        if (product) {
          setSelectedProduct(product);
        }
      }
    } catch {
      // ignore URL parsing error in constrained environments
    }
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: ProductItem) => {
    setSelectedProduct(product);
  };

  const handleSelectProductById = (productId: string) => {
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) {
      setSelectedProduct(found);
    }
  };

  const isInQuote = (productId: string): boolean => {
    return quoteItems.some((item) => item.product.id === productId);
  };

  const handleAddToQuote = (product: ProductItem) => {
    if (isInQuote(product.id)) {
      // Remove if already added (toggle action)
      setQuoteItems((prev) => prev.filter((item) => item.product.id !== product.id));
    } else {
      // Add new item
      setQuoteItems((prev) => [
        ...prev,
        {
          product,
          notes: 'Standard OEM packaging, formal quotation requested'
        }
      ]);
      setToast({
        id: Date.now().toString(),
        type: 'rfq',
        title: product.name,
        subtitle: 'Added to RFQ / Quotation Inquiry list'
      });
    }
  };

  const handleRemoveQuoteItem = (productId: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleUpdateQuoteNote = (productId: string, note: string) => {
    setQuoteItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, notes: note } : item
      )
    );
  };

  const handleClearQuote = () => {
    setQuoteItems([]);
  };

  const handleEnquireProduct = (product: ProductItem) => {
    setContactPrefilledProduct(product);
    setSelectedProduct(null);
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white">
      {/* Top Header & Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={handleNavigate}
        quoteCount={quoteItems.length}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        onOpenCatalogueModal={() => setIsCatalogueModalOpen(true)}
        onOpenMeetingModal={() => handleOpenMeetingModal()}
        onOpenMedicalBuddy={() => setIsMedicalBuddyOpen(true)}
        onOpenCompareModal={() => handleOpenCompareModal()}
      />

      {/* Main Routed Page Content with smooth transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {currentPage === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onSelectProduct={handleSelectProduct}
                onAddToQuote={handleAddToQuote}
                onOpenCatalogue={() => setIsCatalogueModalOpen(true)}
                onOpenMeetingModal={() => handleOpenMeetingModal()}
              />
            )}

            {currentPage === 'about' && (
              <AboutPage
                onNavigate={handleNavigate}
                onOpenCatalogue={() => setIsCatalogueModalOpen(true)}
              />
            )}

            {currentPage === 'products' && (
              <ProductsPage
                onSelectProduct={handleSelectProduct}
                onAddToQuote={handleAddToQuote}
                onEnquireProduct={handleEnquireProduct}
                isInQuote={isInQuote}
                onOpenCatalogue={() => setIsCatalogueModalOpen(true)}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'centrifuges' && (
              <CentrifugesPage
                onSelectProduct={handleSelectProduct}
                onAddToQuote={handleAddToQuote}
                onEnquireProduct={handleEnquireProduct}
                isInQuote={isInQuote}
                onNavigate={handleNavigate}
                onOpenCatalogue={() => setIsCatalogueModalOpen(true)}
              />
            )}

            {currentPage === 'histology' && (
              <HistologyCytologyPage
                onSelectProduct={handleSelectProduct}
                onAddToQuote={handleAddToQuote}
                onEnquireProduct={handleEnquireProduct}
                isInQuote={isInQuote}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'quality' && (
              <QualityManufacturingPage
                onNavigate={handleNavigate}
                onOpenCatalogue={() => setIsCatalogueModalOpen(true)}
              />
            )}

            {currentPage === 'contact' && (
              <ContactPage
                prefilledProduct={contactPrefilledProduct}
                onClearPrefilledProduct={() => setContactPrefilledProduct(null)}
                onOpenMeetingModal={(topic) => handleOpenMeetingModal(topic)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Global Footer */}
      <Footer
        setCurrentPage={handleNavigate}
        onOpenCatalogueModal={() => setIsCatalogueModalOpen(true)}
        onOpenMeetingModal={() => handleOpenMeetingModal()}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        {/* Floating RFQ Cart Indicator */}
        {quoteItems.length > 0 && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsQuoteModalOpen(true)}
            className="pointer-events-auto px-4 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-2.5 font-bold text-xs cursor-pointer border border-indigo-500 transition-transform active:scale-95"
            title="Review RFQ List"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-amber-400 text-slate-900 text-[10px] font-black flex items-center justify-center">
                {quoteItems.length}
              </span>
            </div>
            <span>View RFQ List ({quoteItems.length})</span>
          </motion.button>
        )}

        {/* Floating WhatsApp Quick Connect */}
        <a
          href={COMPANY_DETAILS.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl flex items-center gap-2 font-bold text-xs cursor-pointer transition-transform active:scale-95"
          title="Connect with Us on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span className="hidden sm:inline">Connect with Us</span>
        </a>

        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="pointer-events-auto w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white shadow-md flex items-center justify-center cursor-pointer transition-colors backdrop-blur-xs"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Modals & Floating Assistants */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onEnquire={handleEnquireProduct}
        onAddToQuote={handleAddToQuote}
        isInQuote={selectedProduct ? isInQuote(selectedProduct.id) : false}
        onAskMedicalBuddy={handleAskMedicalBuddy}
        onCompareWithBuddy={(prod) => handleOpenCompareModal(prod)}
      />

      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        quoteItems={quoteItems}
        onRemoveItem={handleRemoveQuoteItem}
        onUpdateNote={handleUpdateQuoteNote}
        onClearAll={handleClearQuote}
      />

      <CatalogueDownloadModal
        isOpen={isCatalogueModalOpen}
        onClose={() => setIsCatalogueModalOpen(false)}
        onSelectProduct={(id) => {
          setIsCatalogueModalOpen(false);
          handleSelectProductById(id);
        }}
      />

      <FixMeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        preselectedTopic={meetingModalTopic}
        onMeetingBooked={handleMeetingBooked}
      />

      <Toast
        toast={toast}
        onClose={() => setToast(null)}
        onViewAction={() => {
          const type = toast?.type;
          setToast(null);
          if (type === 'rfq') {
            setIsQuoteModalOpen(true);
          } else if (type === 'meeting') {
            setIsMeetingModalOpen(true);
          }
        }}
      />

      {/* Floating Medical Buddy AI Assistant Widget */}
      <MedicalBuddyWidget
        isOpen={isMedicalBuddyOpen}
        onToggle={() => setIsMedicalBuddyOpen(!isMedicalBuddyOpen)}
        onOpenMeetingModal={handleOpenMeetingModal}
        onOpenCompareModal={handleOpenCompareModal}
        currentProduct={selectedProduct}
      />

      {/* High-Tech Product Comparison Modal */}
      <MedicalBuddyCompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        initialProductA={compareProductA}
        initialProductB={compareProductB}
        onOpenMeetingModal={handleOpenMeetingModal}
        onAddToQuote={handleAddToQuote}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
