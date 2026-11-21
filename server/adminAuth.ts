import crypto from 'crypto';
import type { NextFunction, Request, Response } from 'express';

const COOKIE_NAME = 'cmi_admin_session';
const SESSION_MS = 8 * 60 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const LOCK_MS = 15 * 60 * 1000;

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'centronic2026';
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  crypto.createHash('sha256').update(`centronic-admin-fallback:${ADMIN_PASSWORD}`).digest('hex');

if (!process.env.ADMIN_PASSWORD) {
  console.warn('[admin] ADMIN_PASSWORD is not set - using the default password. Set it in .env before going live.');
}

interface Attempt {
  count: number;
  lockedUntil: number;
}
const attempts = new Map<string, Attempt>();

function clientKey(req: Request): string {
  return req.ip || req.socket.remoteAddress || 'unknown';
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
}

function createToken(): { token: string; expiresAt: number } {
  const expiresAt = Date.now() + SESSION_MS;
  const payload = Buffer.from(JSON.stringify({ exp: expiresAt, v: 1 })).toString('base64url');
  return { token: `${payload}.${sign(payload)}`, expiresAt };
}

function isValidToken(token?: string): boolean {
  if (!token || typeof token !== 'string') return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { exp: number; v: number };
    return parsed.v === 1 && typeof parsed.exp === 'number' && parsed.exp > Date.now();
  } catch {
    return false;
  }
}

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.COOKIE_SECURE === 'true',
    path: '/',
    maxAge: SESSION_MS,
  };
}

export function loginHandler(req: Request, res: Response) {
  const key = clientKey(req);
  const now = Date.now();
  const attempt = attempts.get(key);

  if (attempt && attempt.lockedUntil > now) {
    const minutes = Math.ceil((attempt.lockedUntil - now) / 60000);
    return res.status(429).json({ error: `Too many attempts. Try again in ${minutes} minute(s).` });
  }

  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  const submitted = Buffer.from(password);
  const expected = Buffer.from(ADMIN_PASSWORD);
  const matches =
    submitted.length === expected.length && crypto.timingSafeEqual(submitted, expected);

  if (!matches) {
    const next = attempt && attempt.lockedUntil <= now ? { count: 0, lockedUntil: 0 } : attempt || { count: 0, lockedUntil: 0 };
    next.count += 1;
    if (next.count >= MAX_ATTEMPTS) {
      next.lockedUntil = now + LOCK_MS;
      next.count = 0;
      attempts.set(key, next);
      return res.status(429).json({ error: 'Too many attempts. Access locked for 15 minutes.' });
    }
    attempts.set(key, next);
    return res.status(401).json({ error: 'Incorrect password.', remaining: MAX_ATTEMPTS - next.count });
  }

  attempts.delete(key);
  const { token, expiresAt } = createToken();
  res.cookie(COOKIE_NAME, token, cookieOptions());
  return res.json({ ok: true, expiresAt });
}

export function logoutHandler(_req: Request, res: Response) {
  res.clearCookie(COOKIE_NAME, { httpOnly: true, sameSite: 'lax', secure: process.env.COOKIE_SECURE === 'true', path: '/' });
  res.json({ ok: true });
}

export function sessionHandler(req: Request, res: Response) {
  const token = req.cookies?.[COOKIE_NAME] || parseCookieHeader(req.headers.cookie);
  if (!isValidToken(token)) {
    return res.json({ authenticated: false });
  }
  return res.json({ authenticated: true });
}

function parseCookieHeader(header?: string): string | undefined {
  if (!header) return undefined;
  for (const part of header.split(';')) {
    const [name, ...rest] = part.trim().split('=');
    if (name === COOKIE_NAME) return rest.join('=');
  }
  return undefined;
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[COOKIE_NAME] || parseCookieHeader(req.headers.cookie);
  if (!isValidToken(token)) {
    return res.status(401).json({ error: 'Admin session expired. Please sign in again.' });
  }
  next();
}
