import type { ProductItem } from '../types';

export interface ImageFile {
  name: string;
  url: string;
  size: number;
  uploadedAt: string;
}

export interface DocumentFile extends ImageFile {
  builtIn?: boolean;
}

export interface AdminCatalog {
  products: ProductItem[];
  images: Record<string, string>;
  cataloguePdfUrl: string;
  documents: DocumentFile[];
  updatedAt: string;
}

export class ApiRequestError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(url: string, init: RequestInit = {}): Promise<T> {
  const isForm = init.body instanceof FormData;
  const response = await fetch(url, {
    credentials: 'same-origin',
    ...init,
    headers: {
      ...(init.body && !isForm ? { 'Content-Type': 'application/json' } : {}),
      ...(init.headers || {}),
    },
  });

  const raw = await response.text();
  let data: unknown = null;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    data = { error: raw || `Request failed (${response.status})` };
  }

  if (!response.ok) {
    const error = data as { error?: string };
    throw new ApiRequestError(error?.error || `Request failed (${response.status})`, response.status);
  }

  return data as T;
}

export const api = {
  session: () => request<{ authenticated: boolean }>('/api/admin/session'),
  login: (password: string) =>
    request<{ ok: boolean }>('/api/admin/login', { method: 'POST', body: JSON.stringify({ password }) }),
  logout: () => request<{ ok: boolean }>('/api/admin/logout', { method: 'POST' }),

  catalog: () => request<AdminCatalog>('/api/admin/catalog'),

  images: () =>
    request<{ files: ImageFile[]; slots: Record<string, string> }>('/api/admin/images'),
  uploadImage: (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return request<{ file: ImageFile }>('/api/admin/images', { method: 'POST', body: form });
  },
  deleteImage: (name: string) =>
    request<{ ok: boolean }>(`/api/admin/images/${encodeURIComponent(name)}`, { method: 'DELETE' }),
  setImageSlot: (slot: string, url: string) =>
    request<{ ok: boolean }>('/api/admin/images/slot', {
      method: 'PATCH',
      body: JSON.stringify({ slot, url }),
    }),

  documents: () =>
    request<{ files: DocumentFile[]; builtIn: DocumentFile[]; activeUrl: string }>('/api/admin/documents'),
  uploadDocument: (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return request<{ file: DocumentFile }>('/api/admin/documents', { method: 'POST', body: form });
  },
  deleteDocument: (name: string) =>
    request<{ ok: boolean }>(`/api/admin/documents/${encodeURIComponent(name)}`, { method: 'DELETE' }),
  activateDocument: (url: string) =>
    request<{ ok: boolean }>('/api/admin/documents/activate', {
      method: 'PATCH',
      body: JSON.stringify({ url }),
    }),

  createProduct: (product: Partial<ProductItem>) =>
    request<{ product: ProductItem }>('/api/admin/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),
  updateProduct: (id: string, product: Partial<ProductItem>) =>
    request<{ product: ProductItem }>(`/api/admin/products/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    }),
  deleteProduct: (id: string) =>
    request<{ ok: boolean }>(`/api/admin/products/${encodeURIComponent(id)}`, { method: 'DELETE' }),
};
