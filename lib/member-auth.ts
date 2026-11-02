/* Member session for LINE-logged-in collectors.

   A signed, httpOnly cookie carries the LINE user id so server routes
   can trust who the request is for without a DB round-trip. Signed with
   MEMBER_SESSION_SECRET (falls back to ADMIN_SESSION_SECRET). Uses Web
   Crypto so it runs on both Node and Edge runtimes. */

export const MEMBER_COOKIE = "cwh_member";

const encoder = new TextEncoder();

function secret(): string | undefined {
  return process.env.MEMBER_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET;
}

/** URL-safe base64 of a UTF-8 string. */
function b64url(input: string): string {
  const bytes = encoder.encode(input);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64url(input: string): string {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  const bin = atob(input.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function hmacHex(key: string, message: string): Promise<string> {
  const k = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", k, encoder.encode(message));
  return [...new Uint8Array(sig)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Create the cookie value for a logged-in member. */
export async function createMemberToken(lineUserId: string): Promise<string> {
  const s = secret();
  if (!s) throw new Error("MEMBER_SESSION_SECRET is not configured");
  const payload = b64url(lineUserId);
  const sig = await hmacHex(s, payload);
  return `${payload}.${sig}`;
}

/** Return the LINE user id from a valid cookie, or null. */
export async function readMemberToken(
  token: string | undefined | null,
): Promise<string | null> {
  const s = secret();
  if (!token || !s) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = await hmacHex(s, payload);
  if (!timingSafeEqual(sig, expected)) return null;
  try {
    return fromB64url(payload);
  } catch {
    return null;
  }
}
