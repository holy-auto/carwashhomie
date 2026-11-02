/* Server-side data access for LINE members and their collections.
   Uses the service-role client (bypasses RLS) — import ONLY from route
   handlers, never a Client Component. */

import { cookies } from "next/headers";
import { getServiceClient, isSupabaseWritable } from "@/lib/supabase";
import { MEMBER_COOKIE, readMemberToken } from "@/lib/member-auth";
import type { LineProfile } from "@/lib/line";

/** The logged-in member's LINE user id (from the signed cookie), or null. */
export async function currentMemberId(): Promise<string | null> {
  const token = cookies().get(MEMBER_COOKIE)?.value;
  return readMemberToken(token);
}

export async function upsertMember(
  profile: LineProfile,
  isFriend: boolean,
): Promise<void> {
  if (!isSupabaseWritable) return;
  const supabase = getServiceClient();
  await supabase.from("members").upsert(
    {
      line_user_id: profile.sub,
      display_name: profile.name ?? null,
      picture_url: profile.picture ?? null,
      is_friend: isFriend,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "line_user_id" },
  );
}

export type MemberInfo = {
  lineUserId: string;
  displayName: string | null;
  pictureUrl: string | null;
  isFriend: boolean;
};

export async function getMember(lineUserId: string): Promise<MemberInfo | null> {
  if (!isSupabaseWritable) return null;
  const supabase = getServiceClient();
  const { data } = await supabase
    .from("members")
    .select("line_user_id, display_name, picture_url, is_friend")
    .eq("line_user_id", lineUserId)
    .maybeSingle();
  if (!data) return null;
  return {
    lineUserId: data.line_user_id,
    displayName: data.display_name,
    pictureUrl: data.picture_url,
    isFriend: data.is_friend,
  };
}

/** The member's collected card codes. */
export async function getMemberCollection(lineUserId: string): Promise<string[]> {
  if (!isSupabaseWritable) return [];
  const supabase = getServiceClient();
  const { data } = await supabase
    .from("user_collections")
    .select("card_code")
    .eq("line_user_id", lineUserId);
  return (data ?? []).map((r) => r.card_code as string);
}

/** Set of published card codes, to validate what can be collected. */
async function publishedCodes(): Promise<Set<string>> {
  const supabase = getServiceClient();
  const { data } = await supabase
    .from("collectible_cards")
    .select("code")
    .eq("published", true);
  return new Set((data ?? []).map((r) => r.code as string));
}

/** Add one or more cards to a member's collection (dedup, published only).
    Returns the member's full collection afterward. */
export async function addMemberCards(
  lineUserId: string,
  codes: string[],
): Promise<string[]> {
  if (!isSupabaseWritable) return [];
  const supabase = getServiceClient();
  const valid = await publishedCodes();
  const rows = Array.from(new Set(codes))
    .filter((c) => valid.has(c))
    .map((code) => ({ line_user_id: lineUserId, card_code: code }));
  if (rows.length > 0) {
    await supabase
      .from("user_collections")
      .upsert(rows, { onConflict: "line_user_id,card_code", ignoreDuplicates: true });
  }
  return getMemberCollection(lineUserId);
}
