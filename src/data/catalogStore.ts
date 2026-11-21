import type { ProductItem } from '../types';
import { CATALOGUE_CONFIG, CENTRONIC_IMAGES, PRODUCTS } from './productsData';

interface CatalogPayload {
  products?: ProductItem[];
  images?: Record<string, string>;
  cataloguePdfUrl?: string;
}

/**
 * Hydrates the bundled catalog data from the admin-managed JSON store before the
 * React tree renders. PRODUCTS / CENTRONIC_IMAGES / CATALOGUE_CONFIG are exported
 * as live bindings from productsData.ts, so mutating them in place updates every
 * component that imports them without requiring a refactor across the app.
 */
export async function hydrateCatalog(): Promise<void> {
  try {
    const response = await fetch('/api/catalog', { cache: 'no-store' });
    if (!response.ok) return;

    const payload = (await response.json()) as CatalogPayload;

    if (Array.isArray(payload.products)) {
      PRODUCTS.splice(0, PRODUCTS.length, ...payload.products);
    }
    if (payload.images && typeof payload.images === 'object') {
      Object.keys(CENTRONIC_IMAGES).forEach((key) => delete CENTRONIC_IMAGES[key as keyof typeof CENTRONIC_IMAGES]);
      Object.assign(CENTRONIC_IMAGES, payload.images);
    }
    if (typeof payload.cataloguePdfUrl === 'string' && payload.cataloguePdfUrl) {
      CATALOGUE_CONFIG.pdfUrl = payload.cataloguePdfUrl;
    }
  } catch (error) {
    // The site stays fully functional with the bundled data if the API is unavailable.
    console.warn('[catalog] Falling back to bundled catalog data:', error);
  }
}
