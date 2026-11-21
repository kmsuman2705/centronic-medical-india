import { Check, Copy, FileText, Loader2, Trash2, UploadCloud } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { api, type DocumentFile } from './api';
import { EmptyState, PanelHeading, Spinner, formatBytes } from './ui';

export default function DocumentsPanel({ notify }: { notify: (kind: 'success' | 'error', message: string) => void }) {
  const [files, setFiles] = useState<DocumentFile[]>([]);
  const [activeUrl, setActiveUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    try {
      const data = await api.documents();
      setFiles([...data.builtIn, ...data.files]);
      setActiveUrl(data.activeUrl);
    } catch (error) {
      notify('error', error instanceof Error ? error.message : 'Could not load catalogue documents.');
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    void load();
  }, [load]);

  async function upload(file: File) {
    setUploading(true);
    try {
      await api.uploadDocument(file);
      notify('success', 'Catalogue PDF uploaded.');
      await load();
    } catch (error) {
      notify('error', error instanceof Error ? error.message : 'Could not upload PDF.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  async function remove(file: DocumentFile) {
    if (!window.confirm(`Delete "${file.name}"? This cannot be undone.`)) return;
    try {
      await api.deleteDocument(file.name);
      notify('success', 'Catalogue PDF deleted.');
      await load();
    } catch (error) {
      notify('error', error instanceof Error ? error.message : 'Could not delete PDF.');
    }
  }

  async function activate(file: DocumentFile) {
    try {
      await api.activateDocument(file.url);
      setActiveUrl(file.url);
      notify('success', 'Active catalogue updated. Refresh the public site to apply it.');
    } catch (error) {
      notify('error', error instanceof Error ? error.message : 'Could not set active catalogue.');
    }
  }

  async function copyUrl(url: string) {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${url}`);
      notify('success', 'PDF URL copied.');
    } catch {
      window.prompt('Copy this PDF URL:', `${window.location.origin}${url}`);
    }
  }

  return (
    <div>
      <PanelHeading
        title="Catalogue PDFs"
        description="Upload, replace and delete the downloadable catalogue files. Choose which PDF visitors download from the website."
      />

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          const file = event.dataTransfer.files?.[0];
          if (file) void upload(file);
        }}
        className={`mb-8 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
          dragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 bg-white'
        }`}
      >
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {uploading ? <Loader2 className="h-6 w-6 animate-spin" /> : <UploadCloud className="h-6 w-6" />}
        </div>
        <p className="font-semibold text-slate-800">{uploading ? 'Uploading…' : 'Drop a catalogue PDF here'}</p>
        <p className="mt-1 text-sm text-slate-500">PDF only · up to 40 MB</p>
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          <FileText className="h-4 w-4" /> Choose PDF
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={(event) => event.target.files?.[0] && void upload(event.target.files[0])}
        />
      </div>

      <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">Available catalogues ({files.length})</h3>
      {loading ? (
        <Spinner />
      ) : files.length === 0 ? (
        <EmptyState title="No catalogue PDFs" description="Upload a PDF to make it available for download." />
      ) : (
        <div className="space-y-3">
          {files.map((file) => {
            const isActive = file.url === activeUrl;
            return (
              <div
                key={file.url + file.name}
                className={`flex flex-wrap items-center gap-4 rounded-xl border bg-white p-4 shadow-sm ${isActive ? 'border-emerald-300 bg-emerald-50/40' : 'border-slate-200'}`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate font-semibold text-slate-800">{file.name}</p>
                    {isActive && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-emerald-700">
                        <Check className="h-3 w-3" /> Active
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {file.size ? formatBytes(file.size) : 'Bundled file'} · {new Date(file.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {!isActive && (
                    <button
                      onClick={() => void activate(file)}
                      className="rounded-lg border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
                    >
                      Make active
                    </button>
                  )}
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Preview
                  </a>
                  <button
                    onClick={() => void copyUrl(file.url)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Copy className="h-3.5 w-3.5" /> Copy URL
                  </button>
                  <button
                    onClick={() => void remove(file)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
