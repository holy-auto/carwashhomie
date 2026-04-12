import type { Metadata } from "next";
import { Playfair_Display, Monoton, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const monoton = Monoton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-monoton",
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CarWashHomie — 愛車にも、美容整形を。| The Auto Aesthetic Clinic",
  description:
    "ローライダー専門の洗車・ディテーリングクリニック。愛車に極上の『美容施術』を。ガラスコーティング、鉄粉除去、磨き、フルディテーリングまで、ホーミーの流儀で仕上げます。",
  keywords: [
    "洗車",
    "ローライダー",
    "ディテーリング",
    "ガラスコーティング",
    "カーケア",
    "美容外科",
  ],
  openGraph: {
    title: "CarWashHomie — 愛車にも、美容整形を。",
    description:
      "ローライダー × 美容外科コンセプトの次世代カーディテーリングサロン。",
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
      className={`${playfair.variable} ${monoton.variable} ${notoSansJp.variable}`}
    >
      <body className="font-body bg-cream text-midnight antialiased">
        {children}
      </body>
    </html>
  );
}
