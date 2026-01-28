import * as crypto from "crypto";

const DEFAULT_SECRET = "dev-secret-change-me";
const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 дней

function base64url(input: Buffer): string {
  return input
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function hmac(data: string): string {
  const secret = process.env.WEB_AUTH_SECRET || DEFAULT_SECRET;
  return base64url(crypto.createHmac("sha256", secret).update(data).digest());
}

export function issueToken(): string {
  const ts = Date.now().toString(10);
  const rnd = base64url(crypto.randomBytes(18));
  const payload = `${ts}.${rnd}`;
  const sig = hmac(payload);
  return `${payload}.${sig}`;
}

export function verifyToken(token: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [tsStr, rnd, sig] = parts;
  if (!tsStr || !rnd || !sig) return false;

  const ts = Number(tsStr);
  if (!Number.isFinite(ts)) return false;
  if (Date.now() - ts > TOKEN_TTL_MS) return false;

  const payload = `${tsStr}.${rnd}`;
  const expected = hmac(payload);

  try {
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, 64);
  return `${base64url(salt)}.${base64url(hash)}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [saltB64, hashB64] = stored.split(".");
  if (!saltB64 || !hashB64) return false;
  const salt = Buffer.from(
    saltB64.replaceAll("-", "+").replaceAll("_", "/"),
    "base64"
  );
  const hash = Buffer.from(
    hashB64.replaceAll("-", "+").replaceAll("_", "/"),
    "base64"
  );
  const computed = crypto.scryptSync(password, salt, hash.length);
  try {
    return crypto.timingSafeEqual(hash, computed);
  } catch {
    return false;
  }
}
