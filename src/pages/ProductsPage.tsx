import React, { useState, useMemo } from 'react';
import { PageId, ProductItem, ProductCategory } from '../types';
import { PRODUCTS, CATEGORY_INFO } from '../data/productsData';
import {
  Search,
  Filter,
  Package,
  Eye,
  Plus,
  Check,
  Download,
  Mail,
  ChevronRight,
  SlidersHorizontal,
  Sparkles,
  FileSpreadsheet
} from 'lucide-react';

interface ProductsPageProps {
  onSelectProduct: (product: ProductItem) => void;
  onAddToQuote: (product: ProductItem) => void;
  onEnquireProduct: (product: ProductItem) => void;
  isInQuote: (productId: string) => boolean;
  onOpenCatalogue: () => void;
  onNavigate: (page: PageId) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onSelectProduct,
  onAddToQuote,
  onEnquireProduct,
  isInQuote,
  onOpenCatalogue,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories: { id: string; label: string; count: number }[] = [
    { id: 'all', label: 'All Products', count: PRODUCTS.length },
    { id: 'centrifuges', label: 'Laboratory Centrifuges', count: PRODUCTS.filter(p => p.category === 'centrifuges').length },
    { id: 'cassettes', label: 'Embedding Cassettes', count: PRODUCTS.filter(p => p.category === 'cassettes').length },
    { id: 'biopsy', label: 'Biopsy Cassettes', count: PRODUCTS.filter(p => p.category === 'biopsy').length },
    { id: 'moulds', label: 'Embedding Moulds', count: PRODUCTS.filter(p => p.category === 'moulds').length },
    { id: 'consumables', label: 'Histology Consumables', count: PRODUCTS.filter(p => p.category === 'consumables').length },
    { id: 'blades', label: 'Microtome Blades', count: PRODUCTS.filter(p => p.category === 'blades').length },
    { id: 'processing-materials', label: 'Processing Materials', count: PRODUCTS.filter(p => p.category === 'processing-materials').length },
    { id: 'cytology', label: 'Cytology Solutions', count: PRODUCTS.filter(p => p.category === 'cytology').length }
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        (item.series && item.series.toLowerCase().includes(query)) ||
        item.shortDesc.toLowerCase().includes(query) ||
        item.fullDesc.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query) ||
        item.features.some((f) => f.toLowerCase().includes(query)) ||
        (item.applications && item.applications.some((a) => a.toLowerCase().includes(query))) ||
        (item.packaging && item.packaging.toLowerCase().includes(query)) ||
        (item.formats && item.formats.some((fmt) => fmt.toLowerCase().includes(query))) ||
        (item.specs && item.specs.some((s) => s.label.toLowerCase().includes(query) || s.value.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Top Banner */}
      <section className="bg-slate-900 text-white py-12 sm:py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-1">
                Centronic Medical India • Complete Product Portfolio
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Laboratory Equipment & Diagnostic Consumables
              </h1>
              <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                Explore our full spectrum of laboratory centrifuges, tissue processing cassettes, base moulds, microtome blades, paraffin wax, OCT medium, and cytology solutions.
              </p>
            </div>

            <button
              onClick={onOpenCatalogue}
              className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-xs shrink-0 self-start md:self-auto cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Full Catalogue</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Filter and Search Bar Controls */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products, series (e.g. 102, Leica, M117, mould, OCT)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:border-indigo-600 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* View Mode Toggle & Total Count */}
            <div className="flex items-center justify-between w-full md:w-auto gap-4">
              <span className="text-xs text-slate-500">
                Showing <strong className="text-slate-900">{filteredProducts.length}</strong> products
              </span>

              <div className="flex items-center gap-1 border border-slate-200 rounded-lg p-1 bg-slate-50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white text-indigo-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-indigo-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-lg text-xs whitespace-nowrap transition-all cursor-pointer font-medium ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-700 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Display */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200 space-y-3">
            <p className="text-sm font-semibold text-slate-800">
              No products found matching "{searchQuery}"
            </p>
            <p className="text-xs text-slate-500">
              Try searching with broader terms or clear your search query.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold hover:bg-indigo-100 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* ========================================================================= */
          /* GRID VIEW                                                                 */
          /* ========================================================================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const inQuote = isInQuote(product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-5 space-y-4">
                    {/* Top image */}
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

                    {/* Content */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3
                          onClick={() => onSelectProduct(product)}
                          className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer leading-snug"
                        >
                          {product.name}
                        </h3>
                      </div>

                      {product.series && (
                        <span className="inline-block text-[11px] font-mono text-slate-500 font-semibold bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                          {product.series}
                        </span>
                      )}

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {product.shortDesc}
                      </p>
                    </div>

                    {/* Features Snippet */}
                    <div className="space-y-1 pt-2 border-t border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Key Features:
                      </span>
                      {product.features.slice(0, 2).map((feat, i) => (
                        <div key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                          <span className="text-indigo-600 font-bold">•</span>
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Packaging */}
                    {product.packaging && (
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-700 flex items-start gap-2">
                        <Package className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1 font-medium">{product.packaging}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="text-xs font-semibold text-slate-700 hover:text-indigo-600 flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Specifications</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onAddToQuote(product)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                          inQuote
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'border border-slate-300 bg-white text-slate-700 hover:border-indigo-400 hover:text-indigo-700'
                        }`}
                        title={inQuote ? 'Added to RFQ' : 'Add to RFQ List'}
                      >
                        {inQuote ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        <span>{inQuote ? 'Added' : 'RFQ'}</span>
                      </button>

                      <button
                        onClick={() => onEnquireProduct(product)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Enquire</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ========================================================================= */
          /* LIST VIEW                                                                 */
          /* ========================================================================= */
          <div className="space-y-4">
            {filteredProducts.map((product) => {
              const inQuote = isInQuote(product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                          {product.categoryLabel}
                        </span>
                        {product.series && (
                          <span className="text-xs font-mono text-slate-500">
                            {product.series}
                          </span>
                        )}
                        {product.isUpcoming && (
                          <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                            Upcoming
                          </span>
                        )}
                      </div>
                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="text-base font-bold text-slate-900 hover:text-indigo-600 cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                        {product.shortDesc}
                      </p>
                      {product.packaging && (
                        <p className="text-[11px] text-slate-500 pt-1">
                          <strong>Standard Packaging:</strong> {product.packaging}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto justify-end shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="px-3.5 py-2 rounded-lg border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 text-xs font-semibold cursor-pointer transition-colors"
                    >
                      View Specs
                    </button>
                    <button
                      onClick={() => onAddToQuote(product)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        inQuote
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'border border-slate-300 bg-white text-slate-700 hover:border-indigo-400 hover:text-indigo-700'
                      }`}
                    >
                      {inQuote ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      <span>{inQuote ? 'In Quote' : 'Add to RFQ'}</span>
                    </button>
                    <button
                      onClick={() => onEnquireProduct(product)}
                      className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Enquire</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick Links To Dedicated Sections */}
        <div className="p-6 rounded-xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800 shadow-sm">
          <div>
            <h4 className="text-base font-bold text-white">
              Looking for Specialized Deep Dives?
            </h4>
            <p className="text-xs text-indigo-200 mt-0.5">
              Visit our dedicated engineering showcases for detailed workflows and diagrams.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('centrifuges')}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              Laboratory Centrifuges Page
            </button>
            <button
              onClick={() => onNavigate('histology')}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer border border-white/20"
            >
              Histology & Cytology Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
