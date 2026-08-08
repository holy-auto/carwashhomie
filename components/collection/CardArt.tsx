"use client";

import type { CSSProperties } from "react";
import type { CollectibleCard } from "@/lib/content";
import { rarityMeta } from "@/lib/collection";

/* Collectible-card face, closely following the Greed Island card:
   - a black double-framed header split into number | name | code
   - a thick black illustration frame with a thin cream keyline + gold pip
   - a cream description box wrapped in a glitter-foil frame (rarity-coloured)
   Fills its parent; always wrap in a 5/7 aspect box. */

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
      className="relative flex flex-col w-full h-full rounded-md p-[3px] select-none"
      style={{
        ...vars,
        background: "#0a0b0e",
        boxShadow: revealed
          ? `0 6px 18px -8px ${r.glow}90`
          : "inset 0 0 0 1px rgba(255,255,255,0.05)",
      }}
    >
      {/* header: number | name | code (black double frame, cream cells) */}
      <div
        className="shrink-0 rounded-[3px] border-[2.5px] border-black overflow-hidden"
        style={{ background: CREAM, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.25)" }}
      >
        <div className="flex items-stretch divide-x-[2.5px] divide-black">
          <span className="font-chunky text-[15px] leading-none px-2 py-1.5 tabular-nums text-black">
            {card.card_number ?? "—"}
          </span>
          <span
            className="flex-1 text-center font-pixel-jp text-[11px] leading-tight px-1 py-1.5 truncate text-black self-center"
            title={card.name}
          >
            {revealed ? card.name : "？？？"}
          </span>
          <span className="font-chunky text-[12px] leading-none px-2 py-1.5 text-black self-center">
            {card.code}
          </span>
        </div>
      </div>

      {/* illustration: thick black frame + thin cream keyline + gold pip */}
      <div
        className="mt-[3px] flex-1 min-h-0 rounded-[3px] border-[2.5px] border-black p-[2px]"
        style={{ background: "#0a0b0e" }}
      >
        <div
          className="relative h-full overflow-hidden"
          style={{ boxShadow: `inset 0 0 0 1.5px ${CREAM}` }}
        >
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
                  ? `radial-gradient(ellipse at 50% 40%, ${accent} 0%, ${accent}cc 45%, #090c14 100%)`
                  : "repeating-linear-gradient(135deg,#141a2b 0 10px,#0d1220 10px 20px)",
              }}
            />
          )}

          {/* subtle crosshatch + foil sheen like the printed card */}
          {revealed && (
            <>
              <div
                className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, rgba(0,0,0,0.5) 0 1px, transparent 1px 3px)",
                }}
              />
              <div className="foil absolute inset-0 opacity-[0.15] mix-blend-screen pointer-events-none" />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-white/10" />
            </>
          )}

          {!revealed && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-chunky text-4xl text-chrome/25">？</span>
            </div>
          )}

          {/* rarity chip */}
          <span
            className="absolute top-1 left-1 rounded px-1.5 py-0.5 text-[8px] font-bold tracking-wider shadow"
            style={{ background: r.frame, color: "#0a0b0e" }}
          >
            {r.label}
          </span>
          {card.instant_reward && revealed && (
            <span
              className="absolute top-1 right-1 rounded-full bg-black/75 text-[8px] font-bold tracking-wider px-1.5 py-0.5 border"
              style={{ color: r.glow, borderColor: `${r.frame}90` }}
            >
              ★特典
            </span>
          )}
          {/* gold pip (bottom-right coin) */}
          <span
            className="absolute bottom-1 right-1 w-4 h-4 rounded-full border border-black flex items-center justify-center text-[7px] font-bold text-[#5a3d0a]"
            style={{
              background: "radial-gradient(circle at 38% 32%, #ffe9a8, #c9a24b 70%)",
              boxShadow: "0 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            ★
          </span>
        </div>
      </div>

      {/* description: glitter-foil frame + cream box */}
      <div className="cardframe mt-[3px] shrink-0">
        <div
          className="rounded-[2px] px-2 py-1.5 min-h-[3.2rem]"
          style={{ background: CREAM }}
        >
          {revealed ? (
            <p className="text-black text-[9.5px] leading-snug font-readable whitespace-pre-wrap line-clamp-4">
              {card.description || card.name}
            </p>
          ) : (
            <p className="text-black/55 text-[9.5px] leading-snug font-readable line-clamp-3">
              {card.hint || "まだ見つかっていないカード。サイトのどこかを探してみよう。"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
