/* Lightweight single-admin authentication for the /admin panel.

   There is exactly one editor (the shop owner), so instead of a full
   user system we gate the panel behind one password (ADMIN_PASSWORD)
   and remember the login with an HMAC-signed, httpOnly cookie signed
   with ADMIN_SESSION_SECRET.

   Everything here uses the Web Crypto API so it runs in both the
   Node and Edge runtimes (middleware runs on Edge). */

export const ADMIN_COOKIE = "cwh_admin";

/* Bumping this string invalidates every existing session cookie. */
const SESSION_PAYLOAD = "carwashhomie-admin-v1";

const encoder = new TextEncoder();

async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return [...new Uint8Array(sig)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Constant-time comparison of two hex strings. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/** The cookie value to set after a successful password login. */
export async function createSessionToken(secret: string): Promise<string> {
  return hmacHex(secret, SESSION_PAYLOAD);
}

/** Validate a session cookie against the configured secret. */
export async function isValidSession(
  token: string | undefined | null,
  secret: string | undefined,
): Promise<boolean> {
  if (!token || !secret) return false;
  const expected = await hmacHex(secret, SESSION_PAYLOAD);
  return timingSafeEqual(token, expected);
}

/** Compare a submitted password against the configured one safely. */
export function passwordMatches(
  submitted: string,
  expected: string | undefined,
): boolean {
  if (!expected) return false;
  // Pad to equal length to keep the comparison constant-time-ish.
  if (submitted.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= submitted.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}
