// HMAC-signed admin session cookie.
// Works in both Node (server actions) and Edge (middleware) via Web Crypto.

const COOKIE_NAME = "panchratna-admin";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "admin";
// Used only if ADMIN_AUTH_SECRET is not set. Don't ship this to production.
const FALLBACK_SECRET = "panchratna-dev-insecure-change-me";

export const ADMIN_COOKIE_NAME = COOKIE_NAME;

export function adminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || DEFAULT_USERNAME,
    password: process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD,
  };
}

function getSecret() {
  return process.env.ADMIN_AUTH_SECRET || FALLBACK_SECRET;
}

function base64UrlEncode(input: Uint8Array | string): string {
  const bytes =
    typeof input === "string" ? new TextEncoder().encode(input) : input;
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function base64UrlDecode(input: string): string {
  let s = input.replaceAll("-", "+").replaceAll("_", "/");
  while (s.length % 4) s += "=";
  return atob(s);
}

async function hmac(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );
  return base64UrlEncode(new Uint8Array(sig));
}

export async function createAdminToken(username: string): Promise<string> {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = base64UrlEncode(`${username}:${expiresAt}`);
  const sig = await hmac(payload);
  return `${payload}.${sig}`;
}

export type AdminSession = { username: string; expiresAt: number };

export async function verifyAdminToken(
  token: string | undefined,
): Promise<AdminSession | null> {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = await hmac(payload);
  if (expected !== sig) return null;
  try {
    const decoded = base64UrlDecode(payload);
    const idx = decoded.lastIndexOf(":");
    if (idx < 0) return null;
    const username = decoded.slice(0, idx);
    const expiresAt = Number(decoded.slice(idx + 1));
    if (!username || !expiresAt || Date.now() > expiresAt) return null;
    return { username, expiresAt };
  } catch {
    return null;
  }
}

export const ADMIN_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  secure: process.env.NODE_ENV === "production",
  maxAge: Math.floor(SESSION_TTL_MS / 1000),
};
