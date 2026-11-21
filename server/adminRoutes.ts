import fs from 'fs';
import path from 'path';
import { Router, type NextFunction, type Request, type Response } from 'express';
import multer from 'multer';
import { CATEGORY_INFO } from '../src/data/productsData';
import type { ProductItem, ProductCategory } from '../src/types';
import { loginHandler, logoutHandler, requireAdmin, sessionHandler } from './adminAuth';
import {
  DOCUMENTS_DIR,
  IMAGES_DIR,
  assertSafeFileName,
  listStoredFiles,
  makeStoredName,
  readCatalog,
  resolveInside,
  saveCatalog,
} from './catalogStore';

const router = Router();

const IMAGE_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/bmp']);
const DOC_MIME = new Set(['application/pdf', 'application/octet-stream']);

function storageFor(dir: string) {
  return multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, dir),
    filename: (_req, file, cb) => cb(null, makeStoredName(file.originalname)),
  });
}

const imageUpload = multer({
  storage: storageFor(IMAGES_DIR),
  limits: { fileSize: 12 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (IMAGE_MIME.has(file.mimetype)) cb(null, true);
    else cb(new Error('Only JPEG, PNG, WebP, GIF, AVIF and BMP images are allowed.'));
  },
});

const documentUpload = multer({
  storage: storageFor(DOCUMENTS_DIR),
  limits: { fileSize: 40 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    const isPdf = DOC_MIME.has(file.mimetype) || path.extname(file.originalname).toLowerCase() === '.pdf';
    if (isPdf) cb(null, true);
    else cb(new Error('Only PDF files are allowed.'));
  },
});

function singleUpload(upload: multer.Multer) {
  return (req: Request, res: Response, next: NextFunction) => {
    upload.single('file')(req, res, (err: unknown) => {
      if (err) {
        const message = err instanceof Error ? err.message : 'Upload failed.';
        return res.status(400).json({ error: message });
      }
      next();
    });
  };
}

function headOf(filePath: string, length = 12): Buffer {
  const buffer = Buffer.alloc(length);
  try {
    const fd = fs.openSync(filePath, 'r');
    fs.readSync(fd, buffer, 0, length, 0);
    fs.closeSync(fd);
  } catch {
    /* treated as invalid below */
  }
  return buffer;
}

function looksLikeImage(filePath: string): boolean {
  const h = headOf(filePath);
  const text = h.toString('latin1');
  return (
    h[0] === 0xff && h[1] === 0xd8 && h[2] === 0xff ||
    text.slice(0, 4) === '\u0089PNG' ||
    text.slice(0, 3) === 'GIF' ||
    (text.slice(0, 4) === 'RIFF' && text.slice(8, 12) === 'WEBP') ||
    text.slice(0, 2) === 'BM' ||
    text.slice(4, 8) === 'ftyp'
  );
}

function looksLikePdf(filePath: string): boolean {
  return headOf(filePath, 5).toString('latin1') === '%PDF-';
}

function removeIfExists(filePath: string) {
  fs.rmSync(filePath, { force: true });
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim() : fallback;
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string').map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

function asSpecs(value: unknown): { label: string; value: string }[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is Record<string, unknown> => !!item && typeof item === 'object')
    .map((item) => ({ label: asString(item.label), value: asString(item.value) }))
    .filter((item) => item.label || item.value);
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70) || 'product';
}

function normalizeProduct(body: Record<string, unknown>, existing?: ProductItem): ProductItem {
  const name = asString(body.name, existing?.name || '');
  if (!name) throw new Error('Product name is required.');

  const requestedCategory = asString(body.category, existing?.category || 'consumables') as ProductCategory;
  const category = requestedCategory in CATEGORY_INFO ? requestedCategory : ('consumables' as ProductCategory);

  const products = readCatalog().products;
  let id = asString(body.id, existing?.id || '') || slugify(name);
  if (!existing || existing.id !== id) {
    const taken = new Set(products.map((p) => p.id));
    if (taken.has(id)) {
      let suffix = 2;
      while (taken.has(`${id}-${suffix}`)) suffix += 1;
      id = `${id}-${suffix}`;
    }
  }

  return {
    id,
    name,
    series: asString(body.series, existing?.series || '') || undefined,
    category,
    categoryLabel: asString(body.categoryLabel, existing?.categoryLabel || CATEGORY_INFO[category].title),
    shortDesc: asString(body.shortDesc, existing?.shortDesc || ''),
    fullDesc: asString(body.fullDesc, existing?.fullDesc || ''),
    features: asStringArray(body.features ?? existing?.features),
    specs: asSpecs(body.specs ?? existing?.specs),
    packaging: asString(body.packaging, existing?.packaging || '') || undefined,
    image: asString(body.image, existing?.image || ''),
    isUpcoming: body.isUpcoming === true || body.isUpcoming === 'true' || body.isUpcoming === 'on',
    applications: asStringArray(body.applications ?? existing?.applications),
    formats: asStringArray(body.formats ?? existing?.formats),
  };
}

// --- Public authentication endpoints -------------------------------------------------
router.post('/login', loginHandler);
router.post('/logout', logoutHandler);
router.get('/session', sessionHandler);

// Everything below this line requires an authenticated admin session.
router.use(requireAdmin);

// --- Full catalog --------------------------------------------------------------------
router.get('/catalog', (_req, res) => {
  res.json(readCatalog());
});

// --- Images --------------------------------------------------------------------------
router.get('/images', (_req, res) => {
  res.json({ files: listStoredFiles(IMAGES_DIR, '/uploads/images'), slots: readCatalog().images });
});

router.post('/images', singleUpload(imageUpload), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image was uploaded.' });
  try {
    if (!looksLikeImage(req.file.path)) {
      removeIfExists(req.file.path);
      return res.status(400).json({ error: 'The uploaded file is not a valid image.' });
    }
    const file = {
      name: req.file.filename,
      url: `/uploads/images/${encodeURIComponent(req.file.filename)}`,
      size: req.file.size,
      uploadedAt: new Date().toISOString(),
    };
    res.status(201).json({ file });
  } catch (error) {
    removeIfExists(req.file.path);
    console.error('[admin] image upload failed:', error);
    res.status(500).json({ error: 'Could not save the uploaded image.' });
  }
});

router.delete('/images/:name', async (req, res) => {
  try {
    const name = assertSafeFileName(req.params.name);
    const target = resolveInside(IMAGES_DIR, name);
    removeIfExists(target);

    const data = readCatalog();
    let changed = false;
    for (const [slot, url] of Object.entries(data.images)) {
      if (decodeURIComponent(url).includes(name)) {
        delete data.images[slot];
        changed = true;
      }
    }
    data.products = data.products.map((product) => {
      if (decodeURIComponent(product.image || '').includes(name)) {
        changed = true;
        return { ...product, image: '' };
      }
      return product;
    });
    if (changed) await saveCatalog(data);

    res.json({ ok: true });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Could not delete image.' });
  }
});

router.patch('/images/slot', async (req, res) => {
  try {
    const slot = asString(req.body?.slot);
    const url = asString(req.body?.url);
    if (!slot || !url) return res.status(400).json({ error: 'slot and url are required.' });

    const data = readCatalog();
    data.images[slot] = url;
    await saveCatalog(data);
    res.json({ ok: true, slot, url });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Could not update image slot.' });
  }
});

// --- Catalogue PDF documents ---------------------------------------------------------
router.get('/documents', (_req, res) => {
  const data = readCatalog();
  res.json({
    files: listStoredFiles(DOCUMENTS_DIR, '/uploads/documents').map((file) => ({
      ...file,
      builtIn: false,
    })),
    builtIn: data.documents.filter((doc) => doc.builtIn),
    activeUrl: data.cataloguePdfUrl,
  });
});

router.post('/documents', singleUpload(documentUpload), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No PDF was uploaded.' });
  try {
    if (!looksLikePdf(req.file.path)) {
      removeIfExists(req.file.path);
      return res.status(400).json({ error: 'The uploaded file is not a valid PDF.' });
    }
    const data = readCatalog();
    const file = {
      name: req.file.filename,
      url: `/uploads/documents/${encodeURIComponent(req.file.filename)}`,
      size: req.file.size,
      uploadedAt: new Date().toISOString(),
      builtIn: false,
    };
    data.documents.push(file);
    if (!data.cataloguePdfUrl) data.cataloguePdfUrl = file.url;
    await saveCatalog(data);
    res.status(201).json({ file });
  } catch (error) {
    removeIfExists(req.file.path);
    console.error('[admin] document upload failed:', error);
    res.status(500).json({ error: 'Could not save the uploaded PDF.' });
  }
});

router.delete('/documents/:name', async (req, res) => {
  try {
    const name = assertSafeFileName(req.params.name);
    const data = readCatalog();
    const doc = data.documents.find((item) => item.name === name || decodeURIComponent(item.url).endsWith(name));
    if (!doc) return res.status(404).json({ error: 'Catalogue document not found.' });

    if (!doc.builtIn) removeIfExists(resolveInside(DOCUMENTS_DIR, name));
    data.documents = data.documents.filter((item) => item !== doc);
    if (data.cataloguePdfUrl === doc.url) {
      data.cataloguePdfUrl = data.documents[0]?.url || '';
    }
    await saveCatalog(data);
    res.json({ ok: true });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Could not delete document.' });
  }
});

router.patch('/documents/activate', async (req, res) => {
  try {
    const url = asString(req.body?.url);
    if (!url) return res.status(400).json({ error: 'url is required.' });
    const data = readCatalog();
    const exists = data.documents.some((doc) => doc.url === url || decodeURIComponent(doc.url) === decodeURIComponent(url));
    if (!exists) return res.status(404).json({ error: 'Document is not registered in the catalog.' });
    data.cataloguePdfUrl = url;
    await saveCatalog(data);
    res.json({ ok: true, url });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Could not activate document.' });
  }
});

// --- Products ------------------------------------------------------------------------
router.get('/products', (_req, res) => {
  res.json({ products: readCatalog().products });
});

router.post('/products', async (req, res) => {
  try {
    const product = normalizeProduct(req.body || {});
    const data = readCatalog();
    data.products.push(product);
    await saveCatalog(data);
    res.status(201).json({ product });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Could not create product.' });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const data = readCatalog();
    const index = data.products.findIndex((item) => item.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Product not found.' });
    const product = normalizeProduct(req.body || {}, data.products[index]);
    product.id = data.products[index].id;
    data.products[index] = product;
    await saveCatalog(data);
    res.json({ product });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Could not update product.' });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const data = readCatalog();
    const before = data.products.length;
    data.products = data.products.filter((item) => item.id !== req.params.id);
    if (data.products.length === before) return res.status(404).json({ error: 'Product not found.' });
    await saveCatalog(data);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Could not delete product.' });
  }
});

export default router;
