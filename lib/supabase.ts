/* Supabase client factories.

   - The PUBLIC (anon) client is safe to use anywhere; Row Level
     Security limits it to published rows only.
   - The SERVICE client uses the service-role key and bypasses RLS.
     It must ONLY ever run server-side (route handlers). Never import
     it into a Client Component.

   Every getter returns `null` when the relevant environment
   variables are missing so the site still builds and renders its
   built-in fallback content before Supabase is wired up. */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Storage bucket holding client-uploaded photos. */
export const MEDIA_BUCKET = process.env.SUPABASE_MEDIA_BUCKET || "media";

/** True when the public (read) side is configured. */
export const isSupabaseConfigured = Boolean(url && anonKey);

/** True when server-side writes (admin panel) are possible. */
export const isSupabaseWritable = Boolean(url && serviceKey);

/** Anonymous, read-only client. `null` if not configured. */
export function getPublicClient(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Service-role client for server-side writes. Throws if missing. */
export function getServiceClient(): SupabaseClient {
  if (!url || !serviceKey) {
    throw new Error(
      "Supabase service role is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
