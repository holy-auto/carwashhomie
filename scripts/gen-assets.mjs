#!/usr/bin/env node
/* One-shot asset generator — derives favicons, app icons, an
   optimized WebP logo and a 1200x630 OG image from public/logo.png.
   Run with `node scripts/gen-assets.mjs`. */

import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const src = resolve(root, "public/logo.png");

async function write(target, buf) {
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, buf);
  console.log("  →", target.replace(root + "/", ""));
}

async function main() {
  console.log("Generating assets from", src);

  // ── Optimized logo (WebP, trimmed) ──────────────────────────────
  const baseLogo = sharp(src).resize(512, 512, { fit: "contain" });
  await write(
    resolve(root, "public/logo.webp"),
    await baseLogo.clone().webp({ quality: 88 }).toBuffer(),
  );

  // ── App-router icon conventions ─────────────────────────────────
  // app/icon.png — 512x512, used for /icon
  await write(
    resolve(root, "app/icon.png"),
    await sharp(src).resize(512, 512).png({ compressionLevel: 9 }).toBuffer(),
  );
  // app/apple-icon.png — 180x180, iOS home-screen
  await write(
    resolve(root, "app/apple-icon.png"),
    await sharp(src)
      .resize(180, 180, { fit: "contain", background: "#1a0f08" })
      .flatten({ background: "#1a0f08" })
      .png()
      .toBuffer(),
  );
  // public/favicon.ico — via a 32x32 PNG (browsers accept PNG in .ico slot)
  await write(
    resolve(root, "public/favicon.ico"),
    await sharp(src).resize(32, 32).png().toBuffer(),
  );

  // ── Open Graph card (1200x630, midnight bg, logo centered) ──────
  const ogBg = { r: 26, g: 15, b: 8, alpha: 1 }; // bg-midnight
  const logoOnDark = await sharp(src)
    .resize(520, 520, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await write(
    resolve(root, "public/og-image.png"),
    await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 4,
        background: ogBg,
      },
    })
      .composite([
        {
          input: logoOnDark,
          top: Math.round((630 - 520) / 2),
          left: Math.round((1200 - 520) / 2),
        },
      ])
      .png({ compressionLevel: 9 })
      .toBuffer(),
  );

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
