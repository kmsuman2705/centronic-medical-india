import React, { useState } from 'react';
import { ProductItem } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import {
  X,
  CheckCircle2,
  Package,
  FileDown,
  Mail,
  Plus,
  Check,
  Building,
  Printer,
  Sparkles,
  ExternalLink,
  Bot,
  Scale,
  Share2
} from 'lucide-react';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onEnquire: (product: ProductItem) => void;
  onAddToQuote: (product: ProductItem) => void;
  isInQuote: boolean;
  onAskMedicalBuddy?: (product: ProductItem) => void;
  onCompareWithBuddy?: (product: ProductItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onEnquire,
  onAddToQuote,
  isInQuote,
  onAskMedicalBuddy,
  onCompareWithBuddy
}) => {
  const [showSpecSheet, setShowSpecSheet] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'shared' | 'copied'>('idle');

  if (!product) return null;

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?product=${encodeURIComponent(product.id)}`;
    const shareData = {
      title: `${product.name} | Centronic Medical India`,
      text: `Check out ${product.name} (${product.categoryLabel}) from Centronic Medical India: ${product.shortDesc}`,
      url: shareUrl
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
        setShareStatus('shared');
        setTimeout(() => setShareStatus('idle'), 2500);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          await copyLinkToClipboard(shareUrl);
        }
      }
    } else {
      await copyLinkToClipboard(shareUrl);
    }
  };

  const copyLinkToClipboard = async (url: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 2500);
    } catch {
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
              {product.categoryLabel}
            </span>
            {product.isUpcoming && (
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 uppercase tracking-wide">
                Upcoming Addition
              </span>
            )}
            {product.series && (
              <span className="text-xs font-mono text-slate-500 font-medium">
                {product.series}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              id="product-share-header-btn"
              onClick={handleShare}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                shareStatus !== 'idle'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-200/60'
              }`}
              title={
                shareStatus === 'copied'
                  ? 'Product link copied to clipboard!'
                  : shareStatus === 'shared'
                  ? 'Product link shared!'
                  : 'Share product via Web Share'
              }
              aria-label="Share product"
            >
              {shareStatus !== 'idle' ? (
                <Check className="w-5 h-5 text-emerald-600" />
              ) : (
                <Share2 className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
              aria-label="Close product view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Share Status Banner */}
        {shareStatus !== 'idle' && (
          <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-800 px-6 py-2 text-xs font-medium flex items-center justify-between animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {shareStatus === 'shared'
                  ? 'Product shared successfully!'
                  : 'Direct product link copied to clipboard! You can now send it to your contacts.'}
              </span>
            </div>
            <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
              Web Share
            </span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-8">
          {/* Main Top Section: Image & Summary */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Product Image */}
            <div className="md:col-span-5 bg-slate-50 rounded-xl p-3 border border-slate-200/70 flex flex-col items-center">
              <div className="w-full aspect-4/3 rounded-lg overflow-hidden bg-white shadow-inner flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-3 w-full flex items-center justify-between text-[11px] text-slate-500 px-1">
                <span>Centronic Medical India</span>
                <span className="font-semibold text-indigo-600">Genuine OEM</span>
              </div>
            </div>

            {/* Product Title & Short Desc */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {product.name}
                </h2>
                <p className="text-sm font-medium text-indigo-600 mt-1">
                  Precision Laboratory Diagnostics & Consumables
                </p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {product.shortDesc}
              </p>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60 text-xs text-slate-700 leading-relaxed">
                <p>{product.fullDesc}</p>
              </div>

              {/* Formats or Applications chips */}
              {product.applications && product.applications.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Target Applications:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.applications.map((app, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Key Features & Engineering Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.features.map((feat, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200/70 text-xs text-slate-700 leading-snug"
                >
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications Table */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">
              Technical Specifications & Configurations
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <tbody>
                  {product.specs.map((spec, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}
                    >
                      <td className="py-2.5 px-4 font-semibold text-slate-700 w-1/3 border-b border-slate-100">
                        {spec.label}
                      </td>
                      <td className="py-2.5 px-4 text-slate-900 border-b border-slate-100 font-medium">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Packaging Details */}
          {product.packaging && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <Package className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block mb-0.5">
                  Standard Laboratory Packaging
                </span>
                <p className="text-sm font-semibold text-slate-800">
                  {product.packaging}
                </p>
                {product.formats && (
                  <p className="text-xs text-slate-600 mt-1">
                    Available formats: {product.formats.join(' • ')}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Spec Sheet Preview Drawer if toggled */}
          {showSpecSheet && (
            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <Printer className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Product Specification Sheet — Centronic Medical India
                  </span>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-2.5 py-1 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3 h-3" />
                  Print / Save PDF
                </button>
              </div>
              <div className="text-xs text-slate-600 space-y-2 font-mono">
                <p><strong>Item:</strong> {product.name} ({product.series || 'CMI-STD'})</p>
                <p><strong>Manufacturer:</strong> Centronic Medical India Pvt. Ltd. (IMT Faridabad)</p>
                <p><strong>Category:</strong> {product.categoryLabel}</p>
                <p><strong>Standard Packaging:</strong> {product.packaging || 'Consult catalogue'}</p>
                <p><strong>Compliance:</strong> ISO Guidelines, Laboratory Grade Medical Consumable</p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSpecSheet(!showSpecSheet)}
              className="px-3.5 py-2 rounded-lg border border-slate-200 text-slate-700 hover:text-indigo-700 hover:border-indigo-300 hover:bg-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-indigo-600" />
              <span>{showSpecSheet ? 'Hide Spec Sheet' : 'Download Spec Sheet'}</span>
            </button>

            {onAskMedicalBuddy && (
              <button
                onClick={() => {
                  onClose();
                  onAskMedicalBuddy(product);
                }}
                className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                title="Ask Medical Buddy AI technical specs about this product"
              >
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ask Medical Buddy</span>
              </button>
            )}

            {onCompareWithBuddy && (
              <button
                onClick={() => {
                  onClose();
                  onCompareWithBuddy(product);
                }}
                className="px-3.5 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Compare this product against other equipment"
              >
                <Scale className="w-3.5 h-3.5 text-indigo-600" />
                <span>Compare</span>
              </button>
            )}

            <button
              onClick={() => onAddToQuote(product)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isInQuote
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'border border-slate-300 bg-white text-slate-800 hover:border-indigo-400 hover:text-indigo-700'
              }`}
            >
              {isInQuote ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Added to RFQ</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to RFQ List</span>
                </>
              )}
            </button>

            {/* Web Share Action Button */}
            <button
              id="product-share-footer-btn"
              onClick={handleShare}
              className={`px-3.5 py-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                shareStatus !== 'idle'
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                  : 'border-slate-200 text-slate-700 hover:text-indigo-700 hover:border-indigo-300 hover:bg-white'
              }`}
              title="Share product with contacts via Web Share API or copy link"
            >
              {shareStatus === 'copied' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Link Copied!</span>
                </>
              ) : shareStatus === 'shared' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Shared!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                onClose();
                onEnquire(product);
              }}
              className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Enquire for This Product</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
