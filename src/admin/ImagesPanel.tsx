import { Copy, ImagePlus, Loader2, Trash2, UploadCloud } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CENTRONIC_IMAGES } from '../data/productsData';
import { api, type ImageFile } from './api';
import { EmptyState, PanelHeading, Spinner, formatBytes } from './ui';

const SLOT_LABELS: Record<string, string> = {
  hero: 'Homepage hero',
  centrifuge: 'Centrifuge equipment',
  histology: 'Histology cassettes',
  cassette102: 'CassetteX-102',
  cassette104: 'CassetteX-104',
  cassette106: 'CassetteX-106',
  cassette122: 'CassetteX-122',
  cassette104Biopsy: 'CassetteX-104 biopsy',
  cassetteOr310: 'CassetteX O-rings',
  cassetteSsMoulds: 'Stainless steel moulds',
  cytology: 'Cytology kits',
  cleanroom: 'Cleanroom / manufacturing',
  qualityLab: 'Quality laboratory',
};

function labelFor(slot: string) {
  return SLOT_LABELS[slot] || slot.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
}

function absoluteUrl(url: string) {
  return `${window.location.origin}${url}`;
}

export default function ImagesPanel({ notify }: { notify: (kind: 'success' | 'error', message: string) => void }) {
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [slots, setSlots] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    try {
      const data = await api.images();
      setFiles(data.files);
      setSlots(data.slots);
    } catch (error) {
      notify('error', error instanceof Error ? error.message : 'Could not load images.');
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    void load();
  }, [load]);

  async function upload(selected: FileList | File[]) {
    const list = Array.from(selected);
    if (!list.length) return;
    setUploading(true);
    let uploaded = 0;
    for (const file of list) {
      try {
        await api.uploadImage(file);
        uploaded += 1;
      } catch (error) {
        notify('error', `${file.name}: ${error instanceof Error ? error.message : 'upload failed'}`);
      }
    }
    setUploading(false);
    if (uploaded) notify('success', `${uploaded} image${uploaded > 1 ? 's' : ''} uploaded.`);
    await load();
    if (inputRef.current) inputRef.current.value = '';
  }

  async function remove(file: ImageFile) {
    if (!window.confirm(`Delete "${file.name}"? This cannot be undone.`)) return;
    try {
      await api.deleteImage(file.name);
      notify('success', 'Image deleted.');
      await load();
    } catch (error) {
      notify('error', error instanceof Error ? error.message : 'Could not delete image.');
    }
  }

  async function copyUrl(url: string) {
    try {
      await navigator.clipboard.writeText(absoluteUrl(url));
      notify('success', 'Image URL copied.');
    } catch {
      window.prompt('Copy this image URL:', absoluteUrl(url));
    }
  }

  async function assignSlot(slot: string, url: string) {
    const previous = slots[slot];
    setSlots((current) => ({ ...current, [slot]: url }));
    try {
      await api.setImageSlot(slot, url);
      notify('success', `${labelFor(slot)} updated.`);
    } catch (error) {
      setSlots((current) => ({ ...current, [slot]: previous }));
      notify('error', error instanceof Error ? error.message : 'Could not update slot.');
    }
  }

  const slotNames = Array.from(new Set([...Object.keys(CENTRONIC_IMAGES), ...Object.keys(slots)]));
  const imageOptions = Array.from(new Set([...files.map((f) => f.url), ...Object.values(slots)])).filter(Boolean);

  return (
    <div>
      <PanelHeading
        title="Image library"
        description="Upload product and website images, copy their public URLs, assign them to website slots, or delete them. Files are stored on the server under uploads/images."
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
          void upload(event.dataTransfer.files);
        }}
        className={`mb-8 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
          dragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 bg-white'
        }`}
      >
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {uploading ? <Loader2 className="h-6 w-6 animate-spin" /> : <UploadCloud className="h-6 w-6" />}
        </div>
        <p className="font-semibold text-slate-800">{uploading ? 'Uploading…' : 'Drop images here to upload'}</p>
        <p className="mt-1 text-sm text-slate-500">JPEG, PNG, WebP, GIF, AVIF or BMP · up to 12 MB each</p>
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-60"
        >
          <ImagePlus className="h-4 w-4" /> Choose images
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif,image/bmp"
          multiple
          className="hidden"
          onChange={(event) => event.target.files && void upload(event.target.files)}
        />
      </div>

      <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">Uploaded images ({files.length})</h3>
      {loading ? (
        <Spinner />
      ) : files.length === 0 ? (
        <EmptyState title="No images uploaded yet" description="Use the uploader above to add your first image." />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {files.map((file) => (
            <div key={file.name} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="h-36 overflow-hidden bg-slate-100">
                <img src={file.url} alt={file.name} className="h-full w-full object-cover transition group-hover:scale-105" />
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-semibold text-slate-800" title={file.name}>{file.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">{formatBytes(file.size)}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => void copyUrl(file.url)}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-2 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Copy className="h-3.5 w-3.5" /> Copy URL
                  </button>
                  <button
                    onClick={() => void remove(file)}
                    className="inline-flex items-center justify-center rounded-lg border border-rose-200 px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                    aria-label={`Delete ${file.name}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Website image slots</h3>
        <p className="mt-1 text-sm text-slate-500">Choose which image is used in each area of the storefront.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {slotNames.map((slot) => (
            <label key={slot} className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-700">{labelFor(slot)}</span>
              <select
                value={slots[slot] || ''}
                onChange={(event) => void assignSlot(slot, event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">— Use bundled default —</option>
                {imageOptions.map((url) => (
                  <option key={url} value={url}>{decodeURIComponent(url.split('/').pop() || url)}</option>
                ))}
                {slots[slot] && !imageOptions.includes(slots[slot]) && (
                  <option value={slots[slot]}>{decodeURIComponent(slots[slot].split('/').pop() || slots[slot])} (current)</option>
                )}
              </select>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
