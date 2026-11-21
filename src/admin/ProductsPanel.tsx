import { Pencil, Plus, Save, Search, Trash2, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { CATEGORY_INFO } from '../data/productsData';
import type { ProductCategory, ProductItem } from '../types';
import { api } from './api';
import { EmptyState, PanelHeading, Spinner } from './ui';

function blankProduct(): ProductItem {
  return {
    id: '',
    name: '',
    series: '',
    category: 'consumables',
    categoryLabel: CATEGORY_INFO.consumables.title,
    shortDesc: '',
    fullDesc: '',
    features: [],
    specs: [],
    packaging: '',
    image: '',
    isUpcoming: false,
    applications: [],
    formats: [],
  };
}

function lines(value: string): string[] {
  return value.split('\n').map((line) => line.trim()).filter(Boolean);
}

function parseSpecs(value: string): { label: string; value: string }[] {
  return lines(value).map((line) => {
    const index = line.indexOf(':');
    return index === -1
      ? { label: line, value: '' }
      : { label: line.slice(0, index).trim(), value: line.slice(index + 1).trim() };
  });
}

interface DraftState {
  product: ProductItem;
  features: string;
  specs: string;
  applications: string;
  formats: string;
}

function toDraft(product: ProductItem): DraftState {
  return {
    product: { ...product },
    features: product.features.join('\n'),
    specs: product.specs.map((spec) => `${spec.label}: ${spec.value}`).join('\n'),
    applications: (product.applications || []).join('\n'),
    formats: (product.formats || []).join('\n'),
  };
}

export default function ProductsPanel({ notify }: { notify: (kind: 'success' | 'error', message: string) => void }) {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [draft, setDraft] = useState<DraftState | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const [productData, imageData] = await Promise.all([api.catalog(), api.images()]);
      setProducts(productData.products);
      const urls = imageData.files.map((file) => file.url);
      setImageUrls(Array.from(new Set([...urls, ...Object.values(imageData.slots)])));
    } catch (error) {
      notify('error', error instanceof Error ? error.message : 'Could not load products.');
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products;
    return products.filter((product) =>
      [product.name, product.series, product.categoryLabel, product.shortDesc]
        .some((value) => (value || '').toLowerCase().includes(term))
    );
  }, [products, search]);

  function openEditor(product?: ProductItem) {
    setIsNew(!product);
    setDraft(toDraft(product ? { ...product } : blankProduct()));
  }

  function patchProduct(changes: Partial<ProductItem>) {
    setDraft((current) => (current ? { ...current, product: { ...current.product, ...changes } } : current));
  }

  async function save() {
    if (!draft) return;
    if (!draft.product.name.trim()) {
      notify('error', 'Product name is required.');
      return;
    }
    const payload: Partial<ProductItem> = {
      ...draft.product,
      features: lines(draft.features),
      specs: parseSpecs(draft.specs),
      applications: lines(draft.applications),
      formats: lines(draft.formats),
    };
    setSaving(true);
    try {
      if (isNew) {
        await api.createProduct(payload);
        notify('success', 'Product created. Refresh the public site to see it.');
      } else {
        await api.updateProduct(draft.product.id, payload);
        notify('success', 'Product updated. Refresh the public site to see the changes.');
      }
      setDraft(null);
      await load();
    } catch (error) {
      notify('error', error instanceof Error ? error.message : 'Could not save product.');
    } finally {
      setSaving(false);
    }
  }

  async function remove(product: ProductItem) {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    try {
      await api.deleteProduct(product.id);
      notify('success', 'Product deleted.');
      await load();
    } catch (error) {
      notify('error', error instanceof Error ? error.message : 'Could not delete product.');
    }
  }

  return (
    <div>
      <PanelHeading
        title="Product catalog"
        description="Add, edit and delete products shown on the website. Changes are saved to data/catalog.json and appear on the public site after a refresh."
        action={
          <button
            onClick={() => openEditor()}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" /> Add product
          </button>
        }
      />

      <div className="mb-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products…"
          className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
        />
        <span className="whitespace-nowrap text-xs font-semibold text-slate-400">{filtered.length} shown</span>
      </div>

      {loading ? (
        <Spinner />
      ) : filtered.length === 0 ? (
        <EmptyState title="No products found" description="Add a product or clear your search." />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="hidden px-4 py-3 md:table-cell">Category</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/70">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {product.image ? (
                        <img src={product.image} alt="" className="h-10 w-10 shrink-0 rounded-lg bg-slate-100 object-cover" />
                      ) : (
                        <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-100" />
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-800">{product.name}</p>
                        <p className="truncate text-xs text-slate-500">{product.series || product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                      {product.categoryLabel}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditor(product)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => void remove(product)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {draft && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="my-6 w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{isNew ? 'Add product' : `Edit: ${draft.product.name}`}</h3>
                <p className="text-xs text-slate-500">Use one item per line for lists and “Label: Value” for specifications.</p>
              </div>
              <button onClick={() => setDraft(null)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-5 px-6 py-6 sm:grid-cols-2">
              <Field label="Product name *">
                <input className={inputClass} value={draft.product.name} onChange={(e) => patchProduct({ name: e.target.value })} />
              </Field>
              <Field label="Series / model">
                <input className={inputClass} value={draft.product.series || ''} onChange={(e) => patchProduct({ series: e.target.value })} />
              </Field>
              <Field label="Category">
                <select
                  className={inputClass}
                  value={draft.product.category}
                  onChange={(e) => {
                    const category = e.target.value as ProductCategory;
                    patchProduct({ category, categoryLabel: CATEGORY_INFO[category].title });
                  }}
                >
                  {Object.entries(CATEGORY_INFO).map(([key, info]) => (
                    <option key={key} value={key}>{info.title}</option>
                  ))}
                </select>
              </Field>
              <Field label="Category label">
                <input className={inputClass} value={draft.product.categoryLabel} onChange={(e) => patchProduct({ categoryLabel: e.target.value })} />
              </Field>
              <Field label="Product image URL" wide>
                <input className={inputClass} value={draft.product.image || ''} onChange={(e) => patchProduct({ image: e.target.value })} placeholder="/uploads/images/… or /images/…" />
                {imageUrls.length > 0 && (
                  <select
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600"
                    value=""
                    onChange={(e) => e.target.value && patchProduct({ image: e.target.value })}
                  >
                    <option value="">— Pick from image library —</option>
                    {imageUrls.map((url) => (
                      <option key={url} value={url}>{decodeURIComponent(url.split('/').pop() || url)}</option>
                    ))}
                  </select>
                )}
              </Field>
              <Field label="Short description" wide>
                <input className={inputClass} value={draft.product.shortDesc} onChange={(e) => patchProduct({ shortDesc: e.target.value })} />
              </Field>
              <Field label="Full description" wide>
                <textarea className={`${inputClass} min-h-24`} value={draft.product.fullDesc} onChange={(e) => patchProduct({ fullDesc: e.target.value })} />
              </Field>
              <Field label="Features (one per line)" wide>
                <textarea className={`${inputClass} min-h-24`} value={draft.features} onChange={(e) => setDraft({ ...draft, features: e.target.value })} />
              </Field>
              <Field label="Specifications (Label: Value per line)" wide>
                <textarea className={`${inputClass} min-h-24`} value={draft.specs} onChange={(e) => setDraft({ ...draft, specs: e.target.value })} />
              </Field>
              <Field label="Applications (one per line)">
                <textarea className={`${inputClass} min-h-20`} value={draft.applications} onChange={(e) => setDraft({ ...draft, applications: e.target.value })} />
              </Field>
              <Field label="Formats (one per line)">
                <textarea className={`${inputClass} min-h-20`} value={draft.formats} onChange={(e) => setDraft({ ...draft, formats: e.target.value })} />
              </Field>
              <Field label="Packaging">
                <input className={inputClass} value={draft.product.packaging || ''} onChange={(e) => patchProduct({ packaging: e.target.value })} />
              </Field>
              <label className="flex items-end gap-2 pb-2 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={draft.product.isUpcoming || false}
                  onChange={(e) => patchProduct({ isUpcoming: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600"
                />
                Mark as upcoming
              </label>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button onClick={() => setDraft(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Cancel
              </button>
              <button
                onClick={() => void save()}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                <Save className="h-4 w-4" /> {saving ? 'Saving…' : 'Save product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100';

function Field({ label, children, wide }: { label: string; children: ReactNode; wide?: boolean }) {
  return (
    <label className={`block ${wide ? 'sm:col-span-2' : ''}`}>
      <span className="mb-1.5 block text-xs font-semibold text-slate-700">{label}</span>
      {children}
    </label>
  );
}
