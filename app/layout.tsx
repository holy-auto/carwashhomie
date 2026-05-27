import type { Metadata, Viewport } from "next";
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
import FloatingLineCTA from "@/components/FloatingLineCTA";
import JsonLd from "@/components/JsonLd";
import { SITE, BUSINESS } from "@/lib/constants";

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

/* Noto Sans JP — body / readable Japanese. `preload: false`
   prevents Next.js from trying to preload a massive subset file;
   `display: swap` keeps text visible while the Japanese glyphs
   stream in. Limit to the weights actually used on the site to
   cut CLS from late-loading Japanese characters. */
const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
  display: "swap",
  preload: false,
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
  metadataBase: new URL(SITE.url),
  title: {
    default:
      "車の美容外科 | Car Wash Homies — さいたま市岩槻区のコーティング・洗車・磨き専門店",
    template: "%s | 車の美容外科 Car Wash Homies",
  },
  description: SITE.description,
  applicationName: BUSINESS.nameJa,
  category: "automotive",
  keywords: [
    "車の美容外科",
    "カーウォッシュホーミーズ",
    "Car Wash Homies",
    "コーティング",
    "ガラスコーティング",
    "セラミックコーティング",
    "車磨き",
    "ポリッシュ",
    "鉄粉除去",
    "ヘッドライト 黄ばみ 除去",
    "手洗い洗車",
    "ディテーリング",
    "内装クリーニング",
    "車内クリーニング",
    "さいたま市",
    "岩槻",
    "岩槻区",
    "末田",
    "岩槻IC",
    "大宮",
    "春日部",
    "越谷",
    "蓮田",
    "上尾",
    "埼玉 コーティング",
    "女性整備士",
    "二級自動車整備士",
  ],
  authors: [{ name: BUSINESS.operator, url: `${SITE.url}/doctor` }],
  creator: BUSINESS.nameJa,
  publisher: BUSINESS.nameJa,
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: BUSINESS.nameJa,
    title: "車の美容外科 | Car Wash Homies",
    description:
      "ただのコーティング屋さんじゃない、車の美容外科です。車の寿命を延ばし、価値を守る。",
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: BUSINESS.nameJa,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "車の美容外科 | Car Wash Homies",
    description:
      "ただのコーティング屋さんじゃない、車の美容外科です。車の寿命を延ばし、価値を守る。",
    images: [SITE.ogImage],
    creator: `@${BUSINESS.xHandle}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: { url: "/apple-icon.png", sizes: "180x180" },
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FF6B1A" },
    { media: "(prefers-color-scheme: dark)", color: "#1A0F08" },
  ],
  colorScheme: "light dark",
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
        <JsonLd />
        <Navbar />
        <main className="relative overflow-x-hidden">{children}</main>
        <Footer />
        <FloatingLineCTA />
      </body>
    </html>
  );
}
