/* Central constants for business info — change once, propagate
   everywhere. Used across Navbar, Hero, Reservation, Access,
   Footer, tokusho, privacy, metadata / JSON-LD etc. */

export const BUSINESS = {
  /* Human-facing name */
  nameJa: "車の美容外科 Car Wash Homies",
  nameEn: "Car Wash Homies",
  tagline: "車の寿命を延ばし、価値を守る",

  /* Contact */
  phone: "048-606-4977",
  phoneTel: "0486064977", // for tel: links
  email: "japanesedetailergirl@gmail.com",
  instagramHandle: "japanese_detailer_girl",
  instagramUrl: "https://www.instagram.com/japanese_detailer_girl/",
  xHandle: "DetailerGirl",
  xUrl: "https://x.com/DetailerGirl",
  lineUrl: "https://lin.ee/TuZaUEi",

  /* Address */
  postalCode: "339-0021",
  addressLine: "埼玉県さいたま市岩槻区末田2421-2",
  addressRegion: "埼玉県",
  addressLocality: "さいたま市岩槻区",
  streetAddress: "末田2421-2",

  /* Approximate coordinates for 末田 2421-2 (岩槻区).
     Used by LocalBusiness JSON-LD `geo`. Fine-tune later
     with the exact pin from Google Business Profile. */
  latitude: 35.940,
  longitude: 139.712,
  mapUrl: "https://maps.google.com/?q=%E5%9F%BC%E7%8E%89%E7%9C%8C%E3%81%95%E3%81%84%E3%81%9F%E3%81%BE%E5%B8%82%E5%B2%A9%E6%A7%BB%E5%8C%BA%E6%9C%AB%E7%94%B02421-2",

  /* Hours / legal */
  hours: "10:00 — 19:00",
  hoursNote: "火曜日",
  openingHoursSpec: [{ opens: "10:00", closes: "19:00" }],
  closedDays: ["Tuesday"] as const,
  registrationNumber: "T8810011150208", // 適格請求書発行事業者登録番号

  /* Local SEO — area we accept customers from, primarily
     さいたま市 + 隣接エリア (車で来店可能な範囲). */
  areaServed: [
    "さいたま市",
    "岩槻区",
    "大宮区",
    "浦和区",
    "見沼区",
    "緑区",
    "春日部市",
    "越谷市",
    "蓮田市",
    "白岡市",
    "上尾市",
    "川口市",
    "草加市",
    "杉戸町",
    "宮代町",
  ] as const,
  paymentAccepted: ["現金", "クレジットカード", "銀行振込", "QRコード決済"] as const,
  currenciesAccepted: "JPY",

  /* Top-level service categories — surfaced in LocalBusiness
     `hasOfferCatalog` for richer search results. */
  services: [
    {
      name: "ガラスコーティング",
      desc: "塗装診断のうえ最適なガラス系コーティングをご提案。",
    },
    {
      name: "セラミックコーティング",
      desc: "硬度と耐候性を重視したセラミック系コーティング施術。",
    },
    {
      name: "磨き・研磨",
      desc: "微細傷・水垢・くすみを除去し本来の塗装に戻す研磨。",
    },
    {
      name: "手洗い洗車",
      desc: "高品質な手洗い洗車。鉄粉除去・室内清掃のオプションも対応。",
    },
    {
      name: "ヘッドライトリペア",
      desc: "黄ばみ・くもりを除去し透明感を回復させるヘッドライト処置。",
    },
    {
      name: "室内クリーニング",
      desc: "シート・天井・カーペットの汚れ・匂いを徹底洗浄。",
    },
  ] as const,

  /* Responsible person */
  operator: "中山 春香",
  operatorTitle: "二級自動車整備士",
} as const;

export const SITE = {
  url: "https://carwashhomies.com",
  name: BUSINESS.nameJa,
  description:
    "埼玉県さいたま市岩槻区の車の美容外科 Car Wash Homies。塗装状態・使用環境・年式を診断し、車両ごとに最適な施術計画をご提案。コーティング・洗車・磨きなど、車の寿命を延ばし価値を守る施術をご提供します。",
  ogImage: "/og-image.png",
  locale: "ja_JP",
} as const;

/* Build a standard Next.js `Metadata` object for a sub-page.
   Centralizes canonical URL, Open Graph, Twitter Card, and
   keyword tags so every page gets the same SEO treatment
   without duplicating boilerplate. */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
}) {
  const fullTitle = `${title} | ${BUSINESS.nameJa}`;
  return {
    title, // root-layout template adds the "| 車の美容外科..." suffix
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website" as const,
      locale: SITE.locale,
      url: `${SITE.url}${path}`,
      siteName: BUSINESS.nameJa,
      title: fullTitle,
      description,
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
      card: "summary_large_image" as const,
      title: fullTitle,
      description,
      images: [SITE.ogImage],
      creator: `@${BUSINESS.xHandle}`,
    },
  };
}
