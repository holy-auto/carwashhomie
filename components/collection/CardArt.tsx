"use client";

import type { CSSProperties } from "react";
import type { CollectibleCard } from "@/lib/content";
import { rarityMeta } from "@/lib/collection";

/* Presentational collectible-card face, styled after the Greed Island
   card reference: a black border, a glitter-foil frame around each part
   (number/name/code bar, illustration, description), coloured by
   rarity. `revealed={false}` renders the silhouette. */

const CREAM = "#f3e8ca";

export default function CardArt({
  card,
  revealed = true,
}: {
  card: CollectibleCard;
  revealed?: boolean;
}) {
  const r = rarityMeta(card.rarity);
  const accent = card.accent_color || "#2b3550";
  const vars = { ["--cf-a"]: r.foilA, ["--cf-b"]: r.foilB } as CSSProperties;

  return (
    <div
      className="relative w-full rounded-lg p-1 select-none"
      style={{
        ...vars,
        background: "#0b0c10",
        boxShadow: revealed
          ? `inset 0 0 0 1px rgba(255,255,255,0.06), 0 6px 18px -8px ${r.glow}90`
          : "inset 0 0 0 1px rgba(255,255,255,0.05)",
      }}
    >
      {/* number | name | code */}
      <div className="cardframe">
        <div
          className="flex items-stretch rounded-[3px] overflow-hidden"
          style={{ background: CREAM }}
        >
          <span
            className="font-crt text-[13px] leading-none px-1.5 py-1 tabular-nums font-bold text-[#1a1206] border-r"
            style={{ borderColor: "rgba(0,0,0,0.3)" }}
          >
            {card.card_number ?? "—"}
          </span>
          <span
            className="flex-1 text-center font-pixel-jp text-[10px] leading-none px-1 py-1.5 truncate text-[#1a1206]"
            title={card.name}
          >
            {revealed ? card.name : "？？？"}
          </span>
          <span
            className="font-crt text-[11px] leading-none px-1.5 py-1 font-bold text-[#1a1206] border-l"
            style={{ borderColor: "rgba(0,0,0,0.3)" }}
          >
            {card.code}
          </span>
        </div>
      </div>

      {/* illustration */}
      <div className="cardframe mt-1">
        <div className="relative aspect-[4/3] rounded-[3px] overflow-hidden">
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
                  ? `radial-gradient(ellipse at 50% 38%, ${accent} 0%, ${accent}cc 45%, #090c14 100%)`
                  : "repeating-linear-gradient(135deg,#141a2b 0 10px,#0d1220 10px 20px)",
              }}
            />
          )}

          {revealed && (
            <div className="foil absolute inset-0 opacity-[0.18] mix-blend-screen pointer-events-none" />
          )}
          {revealed && (
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/25 via-transparent to-white/10" />
          )}

          {!revealed && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-chunky text-4xl text-chrome/25">？</span>
            </div>
          )}

          {card.instant_reward && revealed && (
            <span
              className="absolute top-1.5 right-1.5 rounded-full bg-black/75 text-[8px] font-bold tracking-wider px-1.5 py-0.5 border"
              style={{ color: r.glow, borderColor: `${r.frame}90` }}
            >
              ★特典
            </span>
          )}
          <span
            className="absolute bottom-1.5 left-1.5 rounded px-1.5 py-0.5 text-[8px] font-bold tracking-wider shadow"
            style={{ background: r.frame, color: "#0b0c10" }}
          >
            {r.label}
          </span>
        </div>
      </div>

      {/* description / hint */}
      <div className="cardframe mt-1">
        <div
          className="rounded-[3px] px-2 py-1.5 min-h-[3.4rem]"
          style={{ background: CREAM }}
        >
          {revealed ? (
            <p className="text-[#241a0a] text-[10.5px] leading-snug font-readable whitespace-pre-wrap">
              {card.description || card.name}
            </p>
          ) : (
            <p className="text-[#241a0a]/60 text-[10.5px] leading-snug font-readable">
              {card.hint || "まだ見つかっていないカード。サイトのどこかを探してみよう。"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
