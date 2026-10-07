/* Client-safe helpers for the card collection feature.
   No server imports here — used by Client Components (provider,
   card art, book). The card master itself is fetched from the public
   /api/cards route; progress is kept per-device in localStorage. */

import type { CollectibleCard } from "@/lib/content";

/** localStorage key holding the guest's collected card codes. */
export const STORAGE_KEY = "chw:collection:v1";

/** Soft "try before you register" ceiling. Beyond this we nudge the
    visitor toward LINE membership (Phase 1b) to keep collecting across
    devices. In Phase 1a collecting still works locally. */
export const GUEST_LIMIT = 3;

/* ─────────────────────────── Rarity ─────────────────────────── */

export type RarityMeta = {
  label: string;
  /** Foil frame / border colour. */
  frame: string;
  /** Soft glow colour. */
  glow: string;
  /** Description-box border colour. */
  edge: string;
  /** Glitter-foil gradient stops (dark → light) for the framed parts. */
  foilA: string;
  foilB: string;
};

const RARITY: Record<string, RarityMeta> = {
  N: { label: "N", frame: "#d4af37", glow: "#f4e4a1", edge: "#b8962e", foilA: "#9c7a2f", foilB: "#ffe9a8" },
  R: { label: "R", frame: "#4a90d9", glow: "#a9cdf2", edge: "#2f6fb0", foilA: "#1f4e8a", foilB: "#cfe6ff" },
  SR: { label: "SR", frame: "#2fae8f", glow: "#9fe6d2", edge: "#1e8a70", foilA: "#166a57", foilB: "#b6f0dd" },
  SS: { label: "SS", frame: "#c02a4a", glow: "#f2a9bd", edge: "#8f1f38", foilA: "#7a1330", foilB: "#ffb3c6" },
};

export function rarityMeta(rarity: string | null | undefined): RarityMeta {
  const key = (rarity || "N").toUpperCase();
  return RARITY[key] ?? RARITY.N;
}

/* ─────────────────────────── Progress ─────────────────────────── */

/** Sum of count_weight over the collected (still-published) cards. */
export function weightedPoints(
  cards: CollectibleCard[],
  collected: Set<string>,
): number {
  let sum = 0;
  for (const c of cards) {
    if (collected.has(c.code)) sum += Number(c.count_weight) || 0;
  }
  // Avoid floating dust like 1.4999999.
  return Math.round(sum * 100) / 100;
}

export type Milestone = {
  points: number;
  title: string;
  /** Short line describing the reward (kept generic — details TBD with owner). */
  reward: string;
};

/* マイルストーン（重みの合計＝ポイントで判定）。特典の中身はオーナーと
   要検討のため、まずは「LINEショップカードで受け取り」への導線として
   一般的な文言にしておく（数値の割引などは入れない）。 */
export const MILESTONES: Milestone[] = [
  { points: 2, title: "ブロンズ", reward: "はじめての特典をLINEショップカードで受け取り" },
  { points: 4, title: "シルバー", reward: "次のご来店で使える特典をLINEでご案内" },
  { points: 7, title: "ゴールド", reward: "コンプ間近！特別特典をLINEショップカードで" },
];

export function reachedMilestones(points: number): Milestone[] {
  return MILESTONES.filter((m) => points >= m.points);
}

export function nextMilestone(points: number): Milestone | null {
  return MILESTONES.find((m) => points < m.points) ?? null;
}
