/* LINE Login (OAuth 2.1 / OpenID Connect) helpers.

   Configured via env — the feature stays inert (login hidden) until the
   shop creates a LINE Login channel and sets these:
     LINE_LOGIN_CHANNEL_ID
     LINE_LOGIN_CHANNEL_SECRET
   All network calls go server-side only (never ship the secret).

   Docs: https://developers.line.biz/en/docs/line-login/ */

const CHANNEL_ID = process.env.LINE_LOGIN_CHANNEL_ID;
const CHANNEL_SECRET = process.env.LINE_LOGIN_CHANNEL_SECRET;

/** True when LINE Login is configured and the button can be shown. */
export const isLineConfigured = Boolean(CHANNEL_ID && CHANNEL_SECRET);

export type LineProfile = {
  sub: string; // LINE user id (stable per channel)
  name?: string;
  picture?: string;
};

/** Build the authorize URL the browser is redirected to. */
export function authorizeUrl(opts: {
  redirectUri: string;
  state: string;
  /** Prompt the user to add the linked official account as a friend. */
  addFriend?: boolean;
}): string {
  const p = new URLSearchParams({
    response_type: "code",
    client_id: CHANNEL_ID ?? "",
    redirect_uri: opts.redirectUri,
    state: opts.state,
    scope: "profile openid",
  });
  if (opts.addFriend) p.set("bot_prompt", "aggressive");
  return `https://access.line.me/oauth2/v2.1/authorize?${p.toString()}`;
}

type TokenResponse = {
  access_token: string;
  id_token: string;
  refresh_token?: string;
  expires_in?: number;
};

/** Exchange the authorization code for tokens. */
export async function exchangeToken(
  code: string,
  redirectUri: string,
): Promise<TokenResponse> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: CHANNEL_ID ?? "",
    client_secret: CHANNEL_SECRET ?? "",
  });
  const res = await fetch("https://api.line.me/oauth2/v2.1/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`LINE token exchange failed: ${res.status} ${await res.text()}`);
  }
  return (await res.json()) as TokenResponse;
}

/** Verify the id_token with LINE and return the profile (sub/name/picture). */
export async function verifyIdToken(idToken: string): Promise<LineProfile> {
  const body = new URLSearchParams({
    id_token: idToken,
    client_id: CHANNEL_ID ?? "",
  });
  const res = await fetch("https://api.line.me/oauth2/v2.1/verify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`LINE id_token verify failed: ${res.status} ${await res.text()}`);
  }
  const data = (await res.json()) as {
    sub: string;
    name?: string;
    picture?: string;
  };
  if (!data.sub) throw new Error("LINE id_token has no sub");
  return { sub: data.sub, name: data.name, picture: data.picture };
}

/** Whether the user is a friend of the linked official account. */
export async function getFriendshipStatus(accessToken: string): Promise<boolean> {
  try {
    const res = await fetch("https://api.line.me/friendship/v1/status", {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { friendFlag?: boolean };
    return Boolean(data.friendFlag);
  } catch {
    return false;
  }
}
