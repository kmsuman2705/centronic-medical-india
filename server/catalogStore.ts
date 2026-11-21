import fs from 'fs';
import path from 'path';
import { PRODUCTS, CENTRONIC_IMAGES } from '../src/data/productsData';
import type { ProductItem } from '../src/types';

export const ROOT = process.cwd();
export const DATA_DIR = path.join(ROOT, 'data');
export const UPLOADS_DIR = path.join(ROOT, 'uploads');
export const IMAGES_DIR = path.join(UPLOADS_DIR, 'images');
export const DOCUMENTS_DIR = path.join(UPLOADS_DIR, 'documents');

const CATALOG_FILE = path.join(DATA_DIR, 'catalog.json');

export const DEFAULT_CATALOGUE_PDF =
  '/assets/aistudio/CassetteX-Original-File_changes_1802_9cdfe06b.pdf';

export interface StoredDocument {
  name: string;
  url: string;
  size: number;
  uploadedAt: string;
  builtIn?: boolean;
}

export interface CatalogData {
  products: ProductItem[];
  images: Record<string, string>;
  cataloguePdfUrl: string;
  documents: StoredDocument[];
  updatedAt: string;
}

export interface StoredFile {
  name: string;
  url: string;
  size: number;
  uploadedAt: string;
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function seedCatalog(): CatalogData {
  return {
    products: clone(PRODUCTS),
    images: clone(CENTRONIC_IMAGES),
    cataloguePdfUrl: DEFAULT_CATALOGUE_PDF,
    documents: [
      {
        name: path.basename(DEFAULT_CATALOGUE_PDF),
        url: DEFAULT_CATALOGUE_PDF,
        size: 0,
        uploadedAt: new Date().toISOString(),
        builtIn: true,
      },
    ],
    updatedAt: new Date().toISOString(),
  };
}

export function ensureStorage(): void {
  for (const dir of [DATA_DIR, IMAGES_DIR, DOCUMENTS_DIR]) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(CATALOG_FILE)) {
    fs.writeFileSync(CATALOG_FILE, JSON.stringify(seedCatalog(), null, 2), 'utf8');
  }
}

export function readCatalog(): CatalogData {
  try {
    const parsed = JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf8')) as Partial<CatalogData>;
    return {
      products: Array.isArray(parsed.products) ? parsed.products : [],
      images: parsed.images && typeof parsed.images === 'object' ? parsed.images : {},
      cataloguePdfUrl:
        typeof parsed.cataloguePdfUrl === 'string' ? parsed.cataloguePdfUrl : '',
      documents: Array.isArray(parsed.documents) ? parsed.documents : [],
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : '',
    };
  } catch {
    const fresh = seedCatalog();
    fs.writeFileSync(CATALOG_FILE, JSON.stringify(fresh, null, 2), 'utf8');
    return fresh;
  }
}

let writeChain: Promise<void> = Promise.resolve();

export async function saveCatalog(data: CatalogData): Promise<void> {
  data.updatedAt = new Date().toISOString();
  const task = writeChain.then(async () => {
    const tmp = `${CATALOG_FILE}.tmp`;
    await fs.promises.writeFile(tmp, JSON.stringify(data, null, 2), 'utf8');
    await fs.promises.rm(CATALOG_FILE, { force: true });
    await fs.promises.rename(tmp, CATALOG_FILE);
  });
  writeChain = task.catch(() => undefined);
  return task;
}

export function publicCatalog() {
  const data = readCatalog();
  return {
    products: data.products,
    images: data.images,
    cataloguePdfUrl: data.cataloguePdfUrl,
    updatedAt: data.updatedAt,
  };
}

export function assertSafeFileName(name: string): string {
  const base = path.basename(name || '');
  if (!base || base === '.' || base === '..' || base.startsWith('.')) {
    throw new Error('Invalid file name');
  }
  return base;
}

export function resolveInside(dir: string, name: string): string {
  const base = assertSafeFileName(name);
  const root = path.resolve(dir);
  const target = path.resolve(root, base);
  if (target !== root && !target.startsWith(root + path.sep)) {
    throw new Error('Invalid file path');
  }
  return target;
}

export function listStoredFiles(dir: string, urlPrefix: string): StoredFile[] {
  return fs
    .readdirSync(dir)
    .filter((name) => fs.statSync(path.join(dir, name)).isFile())
    .map((name) => {
      const stat = fs.statSync(path.join(dir, name));
      return {
        name,
        url: `${urlPrefix}/${encodeURIComponent(name)}`,
        size: stat.size,
        uploadedAt: stat.birthtime.toISOString(),
      };
    })
    .sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
}

export function makeStoredName(originalName: string): string {
  const ext = path.extname(originalName || '').toLowerCase();
  const stem =
    path
      .basename(originalName || 'file', ext)
      .normalize('NFKD')
      .replace(/[^a-zA-Z0-9\u0900-\u097F]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'file';
  return `${stem}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}${ext}`;
}

export function hasSignature(filePath: string, signature: string): boolean {
  try {
    const fd = fs.openSync(filePath, 'r');
    const buffer = Buffer.alloc(signature.length);
    fs.readSync(fd, buffer, 0, signature.length, 0);
    fs.closeSync(fd);
    return buffer.toString('latin1') === signature;
  } catch {
    return false;
  }
}
