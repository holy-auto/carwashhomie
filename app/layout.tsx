import type { Metadata } from "next";
import {
  Playfair_Display,
  UnifrakturMaguntia,
  Noto_Sans_JP,
  Press_Start_2P,
  VT323,
  Bungee,
  DotGothic16,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const blackletter = UnifrakturMaguntia({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-blackletter",
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
});

// 90s / Y2K display fonts
const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});

const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-crt",
  display: "swap",
});

const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-chunky",
  display: "swap",
});

// Pixel-style Japanese (16px DotGothic) for kana/kanji 90s vibe
const dotGothic = DotGothic16({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "車の美容外科 | Car Wash Homies — ただのコーティング屋さんじゃない",
  description:
    "埼玉県さいたま市岩槻区の車の美容外科 Car Wash Homies。塗装状態・使用環境・年式を診断し、車両ごとに最適な施術計画をご提案。コーティング・洗車・磨きなど、車の寿命を延ばし価値を守る施術をご提供します。",
  keywords: [
    "車の美容外科",
    "カーウォッシュホーミーズ",
    "コーティング",
    "洗車",
    "ディテーリング",
    "さいたま市",
    "岩槻",
    "ガラスコーティング",
  ],
  openGraph: {
    title: "車の美容外科 | Car Wash Homies",
    description:
      "ただのコーティング屋さんじゃない、車の美容外科です。車の寿命を延ばし、価値を守る。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${playfair.variable} ${blackletter.variable} ${notoSansJp.variable} ${pressStart.variable} ${vt323.variable} ${bungee.variable} ${dotGothic.variable}`}
    >
      <body className="font-body bg-cream text-midnight antialiased">
        <Navbar />
        <main className="relative overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
