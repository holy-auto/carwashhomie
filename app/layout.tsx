import type { Metadata } from "next";
import { Playfair_Display, UnifrakturMaguntia, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

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
      className={`${playfair.variable} ${blackletter.variable} ${notoSansJp.variable}`}
    >
      <body className="font-body bg-cream text-midnight antialiased">
        {children}
      </body>
    </html>
  );
}
