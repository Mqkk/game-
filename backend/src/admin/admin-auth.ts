import * as crypto from "crypto";

const DEFAULT_SECRET = "dev-admin-secret-change-me";
const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 дней

function base64url(input: Buffer): string {
  return input
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function hmac(data: string): string {
  const secret = process.env.ADMIN_AUTH_SECRET || DEFAULT_SECRET;
  return base64url(crypto.createHmac("sha256", secret).update(data).digest());
}

export function issueAdminToken(): string {
  const ts = Date.now().toString(10);
  const rnd = base64url(crypto.randomBytes(18));
  const payload = `${ts}.${rnd}`;
  const sig = hmac(payload);
  return `${payload}.${sig}`;
}

export function verifyAdminToken(token: string): boolean {
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
