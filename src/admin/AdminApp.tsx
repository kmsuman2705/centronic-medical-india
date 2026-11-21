import {
  ExternalLink,
  FileText,
  Images,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Package,
  RefreshCw,
} from 'lucide-react';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { COMPANY_DETAILS } from '../data/companyData';
import DocumentsPanel from './DocumentsPanel';
import ImagesPanel from './ImagesPanel';
import ProductsPanel from './ProductsPanel';
import { api } from './api';
import { Spinner, Toast, type ToastState } from './ui';

type Tab = 'overview' | 'images' | 'products' | 'catalogues';

const NAV: { id: Tab; label: string; icon: typeof Images; description: string }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, description: 'Quick summary' },
  { id: 'images', label: 'Images', icon: Images, description: 'Upload & delete' },
  { id: 'products', label: 'Products', icon: Package, description: 'Catalog entries' },
  { id: 'catalogues', label: 'Catalogue PDFs', icon: FileText, description: 'Downloadable files' },
];

export default function AdminApp() {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [tab, setTab] = useState<Tab>('overview');
  const [toast, setToast] = useState<ToastState | null>(null);

  const notify = useCallback((kind: 'success' | 'error', message: string) => {
    setToast({ kind, message });
    window.setTimeout(() => setToast(null), 4200);
  }, []);

  useEffect(() => {
    api.session()
      .then((data) => setAuthenticated(data.authenticated))
      .catch(() => setAuthenticated(false))
      .finally(() => setChecking(false));
  }, []);

  async function signIn(event: FormEvent) {
    event.preventDefault();
    setSigningIn(true);
    setLoginError('');
    try {
      await api.login(password);
      setAuthenticated(true);
      setPassword('');
      notify('success', 'Signed in to the content manager.');
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Could not sign in.');
    } finally {
      setSigningIn(false);
    }
  }

  async function signOut() {
    try {
      await api.logout();
    } finally {
      setAuthenticated(false);
      setTab('overview');
    }
  }

  if (checking) {
    return <div className="min-h-screen bg-slate-50"><Spinner label="Checking session…" /></div>;
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300">
              <LockKeyhole className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold text-white">Content Manager</h1>
            <p className="mt-1 text-sm text-slate-400">{COMPANY_DETAILS.shortName}</p>
          </div>
          <form onSubmit={signIn} className="rounded-2xl bg-white p-7 shadow-2xl">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Admin password</span>
              <input
                type="password"
                autoFocus
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter admin password"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </label>
            {loginError && (
              <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{loginError}</p>
            )}
            <button
              type="submit"
              disabled={signingIn || !password}
              className="mt-5 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {signingIn ? 'Signing in…' : 'Sign in'}
            </button>
            <p className="mt-5 text-center text-xs text-slate-400">
              Set <code className="rounded bg-slate-100 px-1 py-0.5">ADMIN_PASSWORD</code> in your .env file.
            </p>
          </form>
        </div>
        <Toast toast={toast} onClose={() => setToast(null)} />
      </div>
    );
  }

  const active = NAV.find((item) => item.id === tab)!;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Toast toast={toast} onClose={() => setToast(null)} />

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-slate-900 px-4 py-6 lg:flex">
        <div className="mb-8 px-3">
          <p className="text-lg font-bold leading-tight text-white">Centronic<span className="text-indigo-400">.</span></p>
          <p className="mt-1 text-xs font-medium uppercase tracking-widest text-slate-500">Content Manager</p>
        </div>
        <nav className="flex-1 space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === tab;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                  isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/40' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>
                  <span className="block text-sm font-semibold">{item.label}</span>
                  <span className={`block text-[11px] ${isActive ? 'text-indigo-200' : 'text-slate-500'}`}>{item.description}</span>
                </span>
              </button>
            );
          })}
        </nav>
        <div className="border-t border-slate-800 pt-4">
          <a href="/" className="mb-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white">
            <ExternalLink className="h-4 w-4" /> View website
          </a>
          <button onClick={() => void signOut()} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-rose-300 hover:bg-slate-800">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 shadow-sm lg:px-9">
          <div className="flex items-center gap-3 lg:hidden">
            <span className="text-base font-bold text-slate-900">Centronic Admin</span>
          </div>
          <div className="hidden lg:block">
            <h1 className="text-lg font-bold text-slate-900">{active.label}</h1>
            <p className="text-xs text-slate-500">{active.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden gap-1 sm:flex lg:hidden">
              {NAV.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${item.id === tab ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button onClick={() => void signOut()} className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 lg:hidden" aria-label="Sign out">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-5 py-8 lg:px-9">
          {tab === 'overview' && <Overview onNavigate={setTab} notify={notify} />}
          {tab === 'images' && <ImagesPanel notify={notify} />}
          {tab === 'products' && <ProductsPanel notify={notify} />}
          {tab === 'catalogues' && <DocumentsPanel notify={notify} />}
        </main>
      </div>
    </div>
  );
}

function Overview({ onNavigate, notify }: { onNavigate: (tab: Tab) => void; notify: (kind: 'success' | 'error', message: string) => void }) {
  const [counts, setCounts] = useState<{ products: number; images: number; documents: number } | null>(null);

  useEffect(() => {
    Promise.all([api.catalog(), api.images(), api.documents()])
      .then(([catalog, images, documents]) =>
        setCounts({
          products: catalog.products.length,
          images: images.files.length,
          documents: documents.files.length + documents.builtIn.length,
        })
      )
      .catch((error) => notify('error', error instanceof Error ? error.message : 'Could not load summary.'));
  }, [notify]);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back</h2>
        <p className="mt-1 text-sm text-slate-500">Manage the images, products and catalogue files shown on the public website.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Products', value: counts?.products, icon: Package, tab: 'products' as Tab, tint: 'bg-indigo-50 text-indigo-600' },
          { label: 'Uploaded images', value: counts?.images, icon: Images, tab: 'images' as Tab, tint: 'bg-emerald-50 text-emerald-600' },
          { label: 'Catalogue PDFs', value: counts?.documents, icon: FileText, tab: 'catalogues' as Tab, tint: 'bg-amber-50 text-amber-600' },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <button key={card.label} onClick={() => onNavigate(card.tab)} className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${card.tint}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{card.value ?? '—'}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">{card.label}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="flex items-center gap-2 font-bold text-slate-900">
          <RefreshCw className="h-4 w-4 text-indigo-600" /> How changes appear on the website
        </h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-600">
          <li>Upload an image in <strong>Images</strong>, then copy its URL or assign it to a website slot.</li>
          <li>Use that URL in a product, or add / edit products in <strong>Products</strong>.</li>
          <li>Upload a PDF in <strong>Catalogue PDFs</strong> and click <strong>Make active</strong>.</li>
          <li>Refresh the public website — it loads the latest saved catalog on every page load.</li>
        </ol>
        <a href="/" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          Open the website <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
