"use client";

import type { CollectibleCard } from "@/lib/content";
import { rarityMeta } from "@/lib/collection";

/* Presentational collectible-card face. Layout follows the Greed
   Island-style reference: a top bar (number / name / code), a middle
   illustration, and a foil-framed description box at the bottom.
   `revealed={false}` renders the silhouette used for not-yet-collected
   cards in the book. */

export default function CardArt({
  card,
  revealed = true,
}: {
  card: CollectibleCard;
  revealed?: boolean;
}) {
  const r = rarityMeta(card.rarity);
  const accent = card.accent_color || "#2b3550";

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden select-none"
      style={{
        border: `2px solid ${r.frame}`,
        background: "#0d1220",
        boxShadow: revealed
          ? `0 0 0 1px rgba(0,0,0,0.4), 0 6px 20px -6px ${r.glow}80`
          : "0 4px 14px -8px rgba(0,0,0,0.6)",
      }}
    >
      {/* Top bar: number | name | code */}
      <div
        className="flex items-stretch text-midnight"
        style={{ background: r.frame }}
      >
        <span className="font-crt text-[13px] leading-none px-2 py-1 tabular-nums font-bold">
          {card.card_number ?? "—"}
        </span>
        <span
          className="flex-1 text-center font-pixel-jp text-[10px] leading-none px-1 py-1.5 truncate border-x"
          style={{ borderColor: "rgba(0,0,0,0.25)" }}
          title={card.name}
        >
          {revealed ? card.name : "？？？"}
        </span>
        <span className="font-crt text-[11px] leading-none px-2 py-1 font-bold">
          {card.code}
        </span>
      </div>

      {/* Middle: illustration or accent colour */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {revealed && card.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.image_url}
            alt={card.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: revealed
                ? `radial-gradient(ellipse at 50% 40%, ${accent} 0%, ${accent}cc 45%, #0a0e1a 100%)`
                : "repeating-linear-gradient(135deg,#141a2b 0 10px,#0d1220 10px 20px)",
            }}
          />
        )}

        {/* thin holographic sheen for collected cards */}
        {revealed && (
          <div className="foil absolute inset-0 opacity-20 mix-blend-screen pointer-events-none" />
        )}

        {!revealed && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-chunky text-4xl text-chrome/25">？</span>
          </div>
        )}

        {card.instant_reward && revealed && (
          <span className="absolute top-1.5 right-1.5 rounded-full bg-midnight/85 text-[8px] font-bold tracking-wider px-1.5 py-0.5 border" style={{ color: r.glow, borderColor: `${r.frame}80` }}>
            ★特典
          </span>
        )}
        <span
          className="absolute bottom-1.5 left-1.5 rounded px-1.5 py-0.5 text-[8px] font-bold tracking-wider"
          style={{ background: r.frame, color: "#0d1220" }}
        >
          {r.label}
        </span>
      </div>

      {/* Bottom: description (foil-framed) or hint when hidden */}
      <div className="p-1.5" style={{ background: "#0d1220" }}>
        <div
          className="rounded-md px-2.5 py-2 min-h-[3.5rem] bg-cream/95"
          style={{ border: `1.5px solid ${r.edge}` }}
        >
          {revealed ? (
            <p className="text-midnight text-[10.5px] leading-snug font-readable whitespace-pre-wrap">
              {card.description || card.name}
            </p>
          ) : (
            <p className="text-midnight/55 text-[10.5px] leading-snug font-readable">
              {card.hint || "まだ見つかっていないカード。サイトのどこかを探してみよう。"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
