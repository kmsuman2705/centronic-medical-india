import React, { useState, useMemo } from 'react';
import { COMPANY_DETAILS } from '../data/companyData';
import { PRODUCTS, CATEGORY_INFO } from '../data/productsData';
import { ProductCategory, ProductItem } from '../types';
import {
  X,
  Download,
  Printer,
  FileCheck,
  CheckCircle2,
  Building,
  Phone,
  Mail,
  ShieldCheck,
  Layers,
  Sparkles,
  Search,
  CheckSquare,
  Square,
  ArrowRight,
  Filter,
  Check,
  Info
} from 'lucide-react';

interface CatalogueDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (productId: string) => void;
}

export const CatalogueDownloadModal: React.FC<CatalogueDownloadModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [activeCatalogueId, setActiveCatalogueId] = useState<'master' | 'cassetteX' | 'centrifuges' | 'safepath'>('master');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase().trim();
      return (
        product.name.toLowerCase().includes(query) ||
        product.categoryLabel.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.series && product.series.toLowerCase().includes(query)) ||
        product.shortDesc.toLowerCase().includes(query) ||
        product.features.some((f) => f.toLowerCase().includes(query)) ||
        product.specs.some(
          (s) =>
            s.label.toLowerCase().includes(query) ||
            s.value.toLowerCase().includes(query)
        )
      );
    });
  }, [searchQuery, selectedCategory]);

  const toggleSelectProduct = (productId: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const selectAllFiltered = () => {
    const allFilteredIds = filteredProducts.map((p) => p.id);
    const union = Array.from(new Set([...selectedProductIds, ...allFilteredIds]));
    setSelectedProductIds(union);
  };

  const clearSelection = () => {
    setSelectedProductIds([]);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const handleSimulatedDownload = () => {
    setDownloadSuccess(true);
    let catalogueContent = '';
    let filename = 'Centronic_Medical_India_Catalogue_2025.txt';

    const selectedProductsList = PRODUCTS.filter((p) =>
      selectedProductIds.includes(p.id)
    );
    const isCustom = selectedProductsList.length > 0;

    if (isCustom) {
      filename = `Centronic_Selected_Products_Catalogue_${selectedProductsList.length}_items.txt`;
      catalogueContent = `CENTRONIC MEDICAL INDIA PRIVATE LIMITED
CUSTOM TECHNICAL PRODUCT COMPENDIUM & INQUIRY SPECIFICATIONS
Generated on: ${new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
Headquarters: ${COMPANY_DETAILS.registeredOffice.address}
Manufacturing Plant: ${COMPANY_DETAILS.manufacturingPlant.address}
Official Contact: ${COMPANY_DETAILS.contactPerson} | Phone: ${COMPANY_DETAILS.phone} | Email: ${COMPANY_DETAILS.email}
Website: centronicmedical.com

=======================================================
CUSTOM SELECTED PRODUCTS (${selectedProductsList.length} ITEMS)
=======================================================

${selectedProductsList
  .map(
    (p, idx) => `
[${String(idx + 1).padStart(2, '0')}] ${p.name.toUpperCase()} (${p.series || 'CMI Series'})
Category: ${p.categoryLabel}
Overview: ${p.shortDesc}

Key Technical Features:
${p.features.map((f) => `  • ${f}`).join('\n')}

Specifications & Parameters:
${p.specs.map((s) => `  - ${s.label}: ${s.value}`).join('\n')}

Packaging & Presentation:
  ${p.packaging || 'Standard laboratory packing'}
-------------------------------------------------------`
  )
  .join('\n')}

=======================================================
Manufacturing & Quality Standards:
- Precision -> Consistency -> Reliability
- Make in India Aligned | IMT Faridabad Facility
- Solvent Resistant Formulations (Formalin, Xylene, Alcohols)
- For direct quotes or bulk distributorship inquiries:
  Phone: ${COMPANY_DETAILS.phone} | Email: ${COMPANY_DETAILS.email}
=======================================================
`;
    } else if (activeCatalogueId === 'cassetteX') {
      const link = document.createElement('a');
      link.href = '/assets/aistudio/CassetteX-Original-File_changes_1802_9cdfe06b.pdf';
      link.download = 'CassetteX_Official_Catalogue.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
      return;
    } else if (activeCatalogueId === 'centrifuges') {
      filename = 'Centronic_Laboratory_Centrifuges_Rotors_Catalogue.txt';
      catalogueContent = `CENTRONIC MEDICAL INDIA PRIVATE LIMITED - CENTRIFUGES CATALOGUE
Official Technical Compendium for Laboratory Centrifuges & Matched Rotors
Plant: Plot No.837, Sector-69, Zone-7, IMT (HSIIDC), Faridabad, Haryana - 121004
Registered Office: Plot No 914, Sector 7, Block - C, Faridabad 121006
Email: infocmifd@yahoo.com | salescmifd@yahoo.com

=======================================================
MODEL: UNIVERSAL COMPACT 6S / 24T / 96X2
=======================================================
- Microprocessor control, brushless motor (maintenance free, no powder pollution).
- Flexible axle direct drive system, smooth operation, small vibration.
- Max Speed: 5000rpm | Max RCF: 4420 x g | Max Capacity: 4 x 180ml
- Time Range: 0~99min | Temperature control: <= 55°C | Net Weight: 32KG
- Electric lid lock, compact design, speed and imbalance protection.

MATCHED ROTORS & ACCESSORIES:
- Swing out rotor (N061377): 4000 rpm, 16x10/15ml, 2150 x g
- Angle Rotor (N030607): 5000 rpm, 12x15ml, 3080 x g
- Angle Rotor (N030611): 5000 rpm, 6x50ml, 2850 x g
- Angle Rotor (N030640): 5000 rpm, 4x50ml, 2520 x g
- Angle Rotor (N030613): 5000 rpm, 4x100ml, 2630 x g
- Swing out rotor (N061377): 5000 rpm, 4x50ml, 4420 x g
- Swing out rotor (N061377): 5000 rpm, 4x100ml, 4420 x g
- Microplate Rotor (N031364): 4000 rpm, 2x2x96 well, 2020 x g
- Rotor Models: CMIF504, CMIS96X2, CMIFMICRO12, CMIFX8, CMIS16, CMIS24/48.
=======================================================`;
    } else if (activeCatalogueId === 'safepath') {
      filename = 'SafePath_LBC_Cytology_Microscope_Slides_Catalogue.txt';
      catalogueContent = `CENTRONIC MEDICAL INDIA PRIVATE LIMITED / CARE MEDICAL DEVICES LTD.
SAFEPATH(TM) LIQUID-BASED CYTOLOGY & MICROSCOPE SLIDES CATALOGUE
Headquarters: Faridabad, Haryana, India

=======================================================
SAFEPATH(TM) LBC & CYTOLOGY SYSTEM
=======================================================
1. Cervix-Brush Sampling Device
- Effective cervical smear sampling device, evaluated by gynecologists. Reduces unsatisfactory smears by 50%.
- Substantially increases endocervical cells sampling and optimal Pap smear specimens.

2. Cell Preservative Fluid
- Brush head proceeds directly into fluid ensuring collection of cells. Fast fixing, preservation for 4 weeks at room temperature. Non-hazardous ethanol-based solution.

3. Precoated Slides & Staining Solutions
- Precleaned and precoated, ready to use. White frosted and frosted ends available. Guaranteed quality staining solutions.

4. Adhesive / Positively Charged Microscope Slides
- Made from high quality pure water white glass, positively charged. Excellent for histology and cytology specimen samples.
- Thickness tolerance +/- 0.5mm, ground 90° edges, clipped 45°. Package: 50 Pcs/Box.
=======================================================`;
    } else {
      filename = 'Centronic_Medical_India_Catalogue_2025.txt';
      catalogueContent = `CENTRONIC MEDICAL INDIA PRIVATE LIMITED
LABORATORY EQUIPMENT & DIAGNOSTIC CONSUMABLES
Headquarters: ${COMPANY_DETAILS.registeredOffice.address}
Manufacturing Plant: ${COMPANY_DETAILS.manufacturingPlant.address}
Contact: ${COMPANY_DETAILS.contactPerson} | Phone: ${COMPANY_DETAILS.phone} | Email: ${COMPANY_DETAILS.email}
Website: centronicmedical.com

=======================================================
COMPLETE PRODUCT SUMMARY DIRECTORY (2025-2026)
=======================================================

01. LABORATORY CENTRIFUGES
- Benchtop Low Speed Centrifuge (Routine diagnostics, serum/plasma)
- Benchtop High Speed Centrifuge (High RCF pelleting, molecular)
- Floor Model Low/High Speed Centrifuge (High volume clinical & hospital)
- Blood Bank Centrifuge (Upcoming addition)

02. TISSUE PROCESSING & EMBEDDING CASSETTES
- 102 Series: 45° writing angle, 5.0x1.0mm perforations, P.O.M. polymer. Pkg: 250/box, 4000/ctn
- 104 Series: 35° writing angle for Leica/Sakura printers, 0.9x0.9mm pores. Pkg: 250/box, 4000/ctn, sleeve/tape packs
- 106 Series: Two-component separable construction for repeated opening/closing
- 122 Series Biopsy: Internal retention ring, 0.5x0.5mm micro-pores
- 123 & 124 Series Biopsy: 0.6x0.6mm apertures with dual side ventilation
- Tissue Embedding Rings & O-Rings: Standard microtome chuck compatible

03. STAINLESS STEEL EMBEDDING MOULDS (HIGH LUSTER POLISH)
- SSM 7x7 mm
- SSM 15x15 mm
- SSM 24x24 mm
- SSM 30x24 mm
- SSM 37x24 mm

04. HISTOLOGY MICROTOME BLADES
- High Profile: PTFE coated, rigid for fibrous and harder specimens (50 blades/dispenser)
- Low Profile: PTFE coated, ultra-honed for thin 2-4 micron biopsy ribbons (50 blades/dispenser)

05. TISSUE PROCESSING MATERIALS
- Histology Paraffin Wax: 56°C-58°C melting range pastilles
- Tissue Freezing Medium / OCT Compound: Cryostat sectioning medium (-10°C to -30°C)

06. CYTOLOGY SOLUTIONS & LBC KITS
- Gynaecological Cytology Preservation Solution (Pap & LBC)
- Non-Gynaecological Cytology Solution (FNA, urine, sputum, effusions)
- Liquid Based Cytology (LBC) Collection Kits (Vial + Cervical Broom + Bag)

=======================================================
Quality Philosophy: Precision -> Consistency -> Reliability
Make in India Aligned | ISO Management Principles
=======================================================
`;
    }

    const blob = new Blob([catalogueContent], {
      type: 'text/plain;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const isFilteringActive = searchQuery.trim() !== '' || selectedCategory !== 'all';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              CMI
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Official Product Catalogue & Technical Directory
              </h2>
              <p className="text-xs text-slate-500">
                Centronic Medical India Private Limited • Laboratory Equipment & Consumables
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close catalogue modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Catalogue Preview */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Official Catalogues Selection */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Select Official Catalogue Document</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'master', title: 'Master Compendium', subtitle: 'All Products (2025-26)' },
                { id: 'cassetteX', title: 'CassetteX™ Consumables', subtitle: 'Embedding Cassettes & Moulds' },
                { id: 'centrifuges', title: 'Lab Centrifuges & Rotors', subtitle: 'Universal Compact Series' },
                { id: 'safepath', title: 'SafePath™ LBC & Slides', subtitle: 'Cytology & Microscope Slides' },
              ].map((cat) => {
                const isActive = activeCatalogueId === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCatalogueId(cat.id as any);
                      if (cat.id === 'cassetteX') setSelectedCategory('histology');
                      else if (cat.id === 'centrifuges') setSelectedCategory('centrifuges');
                      else if (cat.id === 'safepath') setSelectedCategory('cytology');
                      else setSelectedCategory('all');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                      isActive
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-300'
                        : 'bg-slate-50 hover:bg-white text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${isActive ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-700'}`}>
                        {cat.id === 'master' ? 'Full' : 'PDF Cat'}
                      </span>
                      {isActive && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">{cat.title}</div>
                      <div className={`text-[10px] mt-0.5 truncate ${isActive ? 'text-indigo-100' : 'text-slate-500'}`}>{cat.subtitle}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Download Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-xl p-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg border border-slate-800">
            <div className="space-y-1 max-w-lg">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-900/80 text-[11px] font-semibold text-indigo-200 border border-indigo-700/60">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                Comprehensive 2025–2026 Edition
              </div>
              <h3 className="text-xl font-extrabold tracking-tight">
                Centronic Medical India Product Compendium
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Complete specifications, cassette perforation diagrams, mould dimensions, packaging quantities, and manufacturing certifications.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full md:w-auto">
              <button
                id="catalogue-download-button"
                onClick={handleSimulatedDownload}
                className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>
                  {selectedProductIds.length > 0
                    ? `Download Selected (${selectedProductIds.length})`
                    : 'Download Catalogue'}
                </span>
              </button>
              <button
                id="catalogue-print-button"
                onClick={handlePrint}
                className="px-3.5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs flex items-center justify-center gap-1.5 border border-white/20 transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Catalogue</span>
              </button>
            </div>
          </div>

          {downloadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {selectedProductIds.length > 0
                  ? `Technical specification sheet for ${selectedProductIds.length} selected product(s) downloaded successfully!`
                  : 'Full catalogue compendium downloaded successfully! You can also save or print this document anytime.'}
              </span>
            </div>
          )}

          {/* Interactive Search & Filter Section */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Search className="w-4 h-4 text-indigo-600" />
                <span>Filter Products for Download or Inquiry</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                {selectedProductIds.length > 0 && (
                  <span className="text-indigo-700 font-bold bg-indigo-100/70 px-2 py-0.5 rounded-md text-[11px]">
                    {selectedProductIds.length} selected
                  </span>
                )}
                <span className="text-slate-500 text-[11px]">
                  Showing {filteredProducts.length} of {PRODUCTS.length} products
                </span>
              </div>
            </div>

            {/* Search Input Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                id="catalogue-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name, series, or category (e.g. 104 Cassette, Centrifuge, Mould, Wax)..."
                className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  id="catalogue-search-clear"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                id="category-pill-all"
                onClick={() => setSelectedCategory('all')}
                className={`px-2.5 py-1 rounded-md font-medium shrink-0 transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                All Disciplines ({PRODUCTS.length})
              </button>
              {Object.entries(CATEGORY_INFO).map(([catKey, catInfo]) => {
                const count = PRODUCTS.filter((p) => p.category === catKey).length;
                const isSelected = selectedCategory === catKey;
                return (
                  <button
                    key={catKey}
                    id={`category-pill-${catKey}`}
                    onClick={() => setSelectedCategory(catKey)}
                    className={`px-2.5 py-1 rounded-md font-medium shrink-0 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {catInfo.title.split(' ')[0]} ({count})
                  </button>
                );
              })}
            </div>

            {/* Selection & Batch Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200 text-[11px]">
              <div className="flex items-center gap-3">
                <button
                  onClick={selectAllFiltered}
                  className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline cursor-pointer flex items-center gap-1"
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>Select All Shown ({filteredProducts.length})</span>
                </button>
                {selectedProductIds.length > 0 && (
                  <button
                    onClick={clearSelection}
                    className="text-slate-500 hover:text-slate-700 font-medium hover:underline cursor-pointer"
                  >
                    Clear Selection
                  </button>
                )}
              </div>

              {isFilteringActive && (
                <button
                  id="catalogue-clear-filters"
                  onClick={handleClearFilters}
                  className="text-slate-500 hover:text-slate-700 font-medium hover:underline cursor-pointer"
                >
                  Reset Search & Category
                </button>
              )}
            </div>
          </div>

          {/* Active Filtered Results View */}
          {isFilteringActive ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Matching Products ({filteredProducts.length})</span>
                </h4>
                <span className="text-[11px] text-slate-500">
                  Select checkbox for download or click product to inquire
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="p-8 text-center rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center mx-auto text-slate-400">
                    <Search className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-800">
                      No products matched your search
                    </h5>
                    <p className="text-xs text-slate-500 mt-1">
                      Try searching with broader terms like &quot;cassette&quot;, &quot;centrifuge&quot;, &quot;mould&quot;, or &quot;wax&quot;.
                    </p>
                  </div>
                  <button
                    onClick={handleClearFilters}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium cursor-pointer"
                  >
                    Clear Search Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {filteredProducts.map((product) => {
                    const isChecked = selectedProductIds.includes(product.id);
                    return (
                      <div
                        key={product.id}
                        id={`product-item-${product.id}`}
                        className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                          isChecked
                            ? 'border-indigo-500 bg-indigo-50/50 shadow-xs'
                            : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-xs'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <label className="flex items-start gap-2.5 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleSelectProduct(product.id)}
                                className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4 border-slate-300 cursor-pointer"
                              />
                              <div>
                                <h5 className="text-xs font-bold text-slate-900 leading-tight">
                                  {product.name}
                                </h5>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-100">
                                    {product.categoryLabel}
                                  </span>
                                  {product.series && (
                                    <span className="text-[10px] font-mono text-slate-500">
                                      {product.series}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </label>
                          </div>

                          <p className="text-[11px] text-slate-600 leading-snug line-clamp-2 pl-6.5">
                            {product.shortDesc}
                          </p>
                        </div>

                        <div className="pl-6.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                          <button
                            onClick={() => toggleSelectProduct(product.id)}
                            className={`text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                              isChecked
                                ? 'text-indigo-700 font-bold'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {isChecked ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-indigo-600" />
                                <span>Selected for Download</span>
                              </>
                            ) : (
                              <span>Select for Download</span>
                            )}
                          </button>

                          <button
                            onClick={() => onSelectProduct?.(product.id)}
                            className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 hover:underline cursor-pointer"
                            title="View complete specifications and submit inquiry"
                          >
                            <span>Inquire & Specs</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* Default Portfolio Breakdown with Interactive Selection and Inquiries */
            <div className="space-y-6 pt-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Portfolio Breakdown ({PRODUCTS.length} Products Across 6 Disciplines)
                </h4>
                <span className="text-xs text-slate-500 font-medium">
                  IMT Faridabad Plant
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(CATEGORY_INFO).map(([key, info]) => {
                  const categoryProducts = PRODUCTS.filter((p) => p.category === key);
                  return (
                    <div
                      key={key}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-indigo-300 hover:shadow-xs transition-all space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">
                          {info.title}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {categoryProducts.length} Items
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">
                        {info.description}
                      </p>
                      <ul className="text-[11px] text-slate-700 space-y-1.5 pt-1.5 border-t border-slate-200">
                        {categoryProducts.map((p) => {
                          const isChecked = selectedProductIds.includes(p.id);
                          return (
                            <li
                              key={p.id}
                              className="flex items-center justify-between gap-2 p-1 rounded-md hover:bg-slate-100/80 transition-colors"
                            >
                              <label className="flex items-center gap-2 cursor-pointer truncate">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => toggleSelectProduct(p.id)}
                                  className="rounded text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 border-slate-300 cursor-pointer shrink-0"
                                />
                                <span className="truncate hover:text-indigo-700 font-medium">
                                  {p.name}
                                </span>
                              </label>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {p.series || 'CMI'}
                                </span>
                                <button
                                  onClick={() => onSelectProduct?.(p.id)}
                                  className="text-[10px] text-indigo-600 hover:text-indigo-800 font-bold px-1.5 py-0.5 rounded hover:bg-indigo-50 transition-colors cursor-pointer"
                                  title="Inquire about this product"
                                >
                                  Inquire →
                                </button>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Corporate & Regulatory Info */}
              <div className="bg-slate-100 rounded-xl p-4 border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>Manufacturing & Regulatory Traceability</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Centronic Medical India operates under disciplined standard operating procedures adhering to ISO-based quality guidelines. Raw polymer resins undergo solvent exposure tests (Formalin, Xylene, Alcohols) and thermal cycling to guarantee zero distortion during tissue processor runs.
                </p>
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <strong>Headquarters:</strong> {COMPANY_DETAILS.registeredOffice.address}
                  </div>
                  <div>
                    <strong>Manufacturing Plant:</strong> {COMPANY_DETAILS.manufacturingPlant.address}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Need bulk OEM customized packaging or special dimensions?</span>
            {selectedProductIds.length > 0 && (
              <span className="font-bold text-indigo-700">
                ({selectedProductIds.length} items selected)
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {selectedProductIds.length > 0 && (
              <button
                onClick={handleSimulatedDownload}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Selected ({selectedProductIds.length})</span>
              </button>
            )}
            <a
              href={`mailto:${COMPANY_DETAILS.email}`}
              className="text-indigo-600 font-bold hover:underline"
            >
              Contact Technical Sales →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
