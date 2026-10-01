# HP構成・SEO・MEO・LLMO 実装ガイド（再利用テンプレート）

> 「車の美容外科 Car Wash Homies」サイトで実装した **デザイン以外の構成要素**
> （情報設計・技術構成・SEO・MEO・LLMO・CMS・運用）を、他の店舗サイト／
> 中小企業サイト制作でそのまま流用できる形にまとめたものです。
>
> - 対象スタック：Next.js 14（App Router）+ TypeScript + Supabase + Vercel
> - 想定業種：実店舗を持つローカルビジネス（サロン・整備・クリニック・飲食など）

---

## 0. 結論（まず押さえる10項目）

| # | 項目 | 実装のキモ | 実装ファイル |
|---|---|---|---|
| 1 | 店舗情報の一元管理 | NAP（名前・住所・電話）や営業時間を **1ファイルに集約**し、全ページ・構造化データ・フッターがそこを参照 | `lib/constants.ts` |
| 2 | メタデータのヘルパー化 | `pageMetadata()` で title / description / canonical / OGP / Twitter を **1行で統一生成** | `lib/constants.ts` |
| 3 | タイトル設計 | `title.template` で「ページ名 \| 店名」を自動付与。勝負ページだけ `absoluteTitle` で地域キーワード入りの完全タイトルに | `app/layout.tsx` |
| 4 | 構造化データ（全ページ） | `LocalBusiness`（業種サブタイプ）を layout に1つ。住所・営業時間・SNS・代表者・登録番号 | `components/JsonLd.tsx` |
| 5 | パンくず構造化データ | 全下層ページに `BreadcrumbList` | `components/Breadcrumbs.tsx` |
| 6 | FAQ構造化データ | 画面表示のFAQと **同じ配列** から `FAQPage` を出力（LLMO の主力） | `components/FaqJsonLd.tsx` |
| 7 | robots / sitemap | Next.js の `robots.ts` / `sitemap.ts` で自動生成。管理画面・API は disallow | `app/robots.ts`, `app/sitemap.ts` |
| 8 | 見出し構造 | **1ページ1つの h1**、セクションは h2、カードは h3 | 各 `components/*.tsx` |
| 9 | MEO 連携 | NAP をサイト・GBP・SNS で完全一致。地図は座標ではなく **住所文字列で埋め込み** | `components/Access.tsx` |
| 10 | CMS + フォールバック | Supabase から公開行を読み、未設定・0件時は組み込みデフォルトを表示（空ページを作らない） | `lib/content.ts` |

---

## 1. サイト構成（情報設計）

### 1-1. ページ構成とURL設計

URL は **短い英単語・小文字・階層なし** で統一。日本語URLは使わない。

| URL | ページ | 役割（検索意図） | sitemap priority | changeFrequency |
|---|---|---|---|---|
| `/` | トップ | 指名検索・「地域＋業種」のメイン受け皿 | 1.0 | weekly |
| `/concept` | コンセプト | 差別化・信頼（E-E-A-T の Experience） | 0.8 | monthly |
| `/menu` | メニュー・料金 | 「業種＋料金」「サービス名」検索 | 0.9 | monthly |
| `/brands` | 取扱いブランド | 「ブランド名＋地域」「◯◯ 代理店」検索 | 0.8 | monthly |
| `/gallery` | 症例・施工事例 | 実績訴求・画像検索・お客様の声 | 0.8 | weekly |
| `/news` | お知らせ | 鮮度シグナル・キャンペーン | 0.6 | weekly |
| `/useful` | お役立ち情報（コラム） | 情報検索（ロングテール）流入 | 0.6 | weekly |
| `/doctor` | 代表者・スタッフ紹介 | E-E-A-T（Expertise / Authoritativeness） | 0.7 | monthly |
| `/reservation` | 予約・問い合わせ | CV（コンバージョン）地点 | 0.9 | monthly |
| `/access` | アクセス | MEO連動・「地域名＋店名」「行き方」 | 0.7 | yearly |
| `/privacy` | プライバシーポリシー | 信頼性・法令対応 | 0.3 | yearly |
| `/legal` | 特定商取引法に基づく表記 | 信頼性・法令対応 | 0.3 | yearly |
| `/admin` | 管理画面 | **noindex 扱い**（robots で disallow） | — | — |

**ポイント**
- 「お知らせ（news）」と「お役立ち情報（useful）」を **別コンテンツ枠** に分ける。
  お知らせ＝鮮度・店舗情報、お役立ち＝検索流入用コラム、と目的が違うため。
- 狙いたいクエリが明確なもの（例：「Adam's Polishes 埼玉 施工代理店」）は
  **専用ページを1つ作る**（`/brands`）。既存ページの一部に埋めるより順位が付きやすい。
- 法務ページ（プライバシー・特商法）は SEO 的価値は低いが、
  信頼性シグナルとしてフッターから必ずリンクする。

### 1-2. ナビゲーション構成

| 場所 | 内容 |
|---|---|
| ヘッダー（Navbar） | 主要ページ全て + 右端に予約CTAボタン（常設） |
| フッター | サイトマップ的リンク一覧 / 住所・営業時間・定休日 / 電話（`tel:`リンク） / SNS（Instagram・X・LINE） / インボイス登録番号 / プライバシー・特商法 |
| ページ下部 | 各ページの最後に「無料カウンセリングを予約」CTA セクション |

- 内部リンクは全て `next/link` の `<Link>` を使う（クロール可能な `<a href>` が出る）。
- 予約導線は「ヘッダー常設ボタン」「ヒーローCTA」「各ページ末尾CTA」の3箇所以上。
- 管理画面 `/admin` では `ChromeGate` でヘッダー・フッターを非表示にする。

### 1-3. ディレクトリ構成

```
app/
  layout.tsx           # サイト共通メタデータ・フォント・JSON-LD(LocalBusiness)
  page.tsx             # トップ
  <route>/page.tsx     # 各下層ページ（metadata + Breadcrumbs + コンポーネント）
  robots.ts            # robots.txt 自動生成
  sitemap.ts           # sitemap.xml 自動生成
  icon.png / apple-icon.png   # ファビコン（App Router のファイル規約）
  admin/...            # 管理画面（middleware で保護）
  api/
    contact/route.ts   # 問い合わせフォーム送信（Edge Runtime + Resend）
    admin/...          # CMS 書き込み API（service-role、middleware で保護）
components/
  JsonLd.tsx           # LocalBusiness 構造化データ
  Breadcrumbs.tsx      # BreadcrumbList 構造化データ
  FaqJsonLd.tsx        # FAQPage 構造化データ
  <Section>.tsx        # 各ページの中身
lib/
  constants.ts         # 店舗情報(BUSINESS)・サイト情報(SITE)・pageMetadata()
  content.ts           # Supabase 読み取り + デフォルトコンテンツ
  supabase.ts          # Supabase クライアント
  auth.ts              # 管理画面セッション署名・検証
middleware.ts          # /admin, /api/admin の認証ガード
scripts/gen-assets.mjs # ロゴから favicon / OGP画像 / WebP を一括生成
```

**下層ページの標準形（コピペ用）**

```tsx
// app/<route>/page.tsx
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";
import { pageMetadata } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "ページ名",
  description: "120字前後。地域名＋業種＋強み＋行動喚起を自然な文で。",
  path: "/route",
  keywords: ["主要KW", "サービス名", "市区町村", "地域名"],
});

export default function Page() {
  return (
    <div className="pt-20">
      <Breadcrumbs
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "ページ名", path: "/route" },
        ]}
      />
      <Section /> {/* この中に h1 を1つだけ */}
    </div>
  );
}
```

CMS のデータを表示するページには `export const dynamic = "force-dynamic";` を付け、
管理画面での更新が即時反映されるようにする。

---

## 2. 店舗情報の一元管理（SEO・MEO・LLMO 共通の土台）

**最重要。** NAP（Name / Address / Phone）や営業時間がページごとに微妙に違うと、
Google も LLM も「どれが正しい情報か」判断できず評価が分散する。

```ts
// lib/constants.ts
export const BUSINESS = {
  nameJa: "車の美容外科 Car Wash Homies",   // GBPの登録名と完全一致させる
  nameEn: "Car Wash Homies",
  tagline: "車の寿命を延ばし、価値を守る",

  phone: "048-606-4977",                     // 表示用
  phoneTel: "0486064977",                    // tel: リンク用
  email: "...",
  instagramUrl: "...", xHandle: "...", xUrl: "...", lineUrl: "...",

  postalCode: "339-0021",
  addressLine: "埼玉県さいたま市岩槻区末田2421-2",
  addressRegion: "埼玉県",                   // 構造化データ用に分割して持つ
  addressLocality: "さいたま市岩槻区",
  streetAddress: "末田2421-2",

  hours: "10:00 — 19:00",
  hoursNote: "火曜日",                       // 定休日
  openingHoursSpec: [{ opens: "10:00", closes: "19:00" }],
  registrationNumber: "T...",               // 適格請求書発行事業者登録番号

  operator: "中山 春香",                     // 代表者（E-E-A-T）
  operatorTitle: "二級自動車整備士",          // 資格
} as const;

export const SITE = {
  url: "https://example.com",               // 末尾スラッシュなし
  name: BUSINESS.nameJa,
  description: "…",                         // サイト全体の基本 description
  ogImage: "/og-image.png",
  locale: "ja_JP",
} as const;
```

**ルール**
- 住所・電話・営業時間をコンポーネント内に直書きしない。必ず `BUSINESS` を参照。
- 住所は「表示用の1行」と「構造化データ用の分割（都道府県／市区町村／番地）」の両方を持つ。
- 電話番号は「表示用（ハイフンあり）」と「`tel:` 用（数字のみ）」を分けて持つ。
- 定休日・営業時間を変えたら **このファイルだけ** 直せば全ページ・JSON-LD に反映される状態にする
  （→ 後述「改善ポイント」も参照）。

---

## 3. SEO

### 3-1. サイト共通メタデータ（`app/layout.tsx`）

```ts
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),            // 相対URL(canonical/OGP)の基準
  title: {
    default: "さいたま市のボディコーティング専門店 | 車の美容外科 Car Wash Homies",
    template: "%s | 車の美容外科 Car Wash Homies",
  },
  description: SITE.description,
  keywords: [...],
  authors: [{ name: BUSINESS.operator }],
  creator: BUSINESS.nameJa,
  publisher: BUSINESS.nameJa,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "ja_JP", url, siteName, title, description,
               images: [{ url: SITE.ogImage, width: 1200, height: 630, alt }] },
  twitter: { card: "summary_large_image", title, description, images, creator: "@handle" },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true,
                 "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" },
           { url: "/icon.png", type: "image/png", sizes: "512x512" }],
    apple: { url: "/apple-icon.png", sizes: "180x180" },
  },
  formatDetection: { telephone: true, address: true, email: true },
};
```

- `<html lang="ja">` を必ず指定。
- `max-snippet: -1` / `max-image-preview: large` で、検索結果・AI Overview に
  長い抜粋と大きい画像を使ってもらえるようにする。

### 3-2. ページ別メタデータ（`pageMetadata()` ヘルパー）

```ts
export function pageMetadata({ title, absoluteTitle, description, path, keywords }) {
  const fullTitle = absoluteTitle ? title : `${title} | ${BUSINESS.nameJa}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,  // template の二重付与を防ぐ
    description,
    keywords,
    alternates: { canonical: path },                     // 全ページ自己参照canonical
    openGraph: { type: "website", locale, url: `${SITE.url}${path}`, siteName,
                 title: fullTitle, description, images: [...] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images, creator },
  };
}
```

**ハマりどころ（実際に修正した不具合）**
- 各ページで `title: "施術メニュー | 店名"` と書くと、layout の template と合わさって
  「施術メニュー | 店名 | 店名」と **二重付与** される。
  → 通常ページは `title: "施術メニュー"` だけ渡し、template に任せる。
- 「地域名を前に出した完全なタイトル」を使いたいページだけ `absoluteTitle: true`。

### 3-3. title / description の書き方

| 種類 | ルール | 例 |
|---|---|---|
| トップ title | 「地域 + 業種（専門店）\| ブランド名」。地域KWを左に置く | `さいたま市のボディコーティング専門店 \| 車の美容外科 Car Wash Homies` |
| 勝負ページ title | 狙うクエリをそのまま先頭に | `Adam's Polishes 埼玉 施工代理店｜取扱いブランド` |
| アクセス title | 「アクセス・店舗情報 \| 地域 + 業種 + 店名」 | `アクセス・店舗情報 \| 岩槻のボディコーティング専門店 Car Wash Homies` |
| 通常ページ title | ページ名のみ（template が店名を付ける） | `施術メニュー` |
| description | 100〜130字目安。①地域 ②業種 ③強み・差別化 ④行動喚起。自然な日本語文 | 「埼玉県さいたま市でボディコーティングをお考えなら…ご体感ください。」 |
| アクセス description | 最寄りIC・駅、所要時間、駐車場の有無を入れる | 「東北自動車道『岩槻IC』より車で約10分。大型車も対応可能な駐車スペースを完備…」 |

- keywords メタは現在の Google ではほぼ無視されるが、**ページごとの狙いKWを明文化する
  設計メモ** として各ページに残している（他の検索エンジン・社内の意思統一用）。
- ほぼ全ページの keywords に「市区町村名」「地域名」を入れて、地域性を一貫させる。

### 3-4. 見出し構造

- **1ページに h1 は1つだけ**。トップはヒーローの「車の美容外科」、下層はページタイトル。
- セクション見出しは h2、カード・FAQ の質問は h3。
- 同じコンポーネントをトップと下層で使い回す場合は、`level` prop で h1/h2 を切り替える。

```tsx
const Heading = (level === 1 ? "h1" : "h2") as "h1" | "h2";
```

### 3-5. robots.txt / sitemap.xml

```ts
// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
```

```ts
// app/sitemap.ts
const routes = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/menu", priority: 0.9, changeFrequency: "monthly" },
  // ...（1-1 の表のとおり）
];
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: `${SITE.url}${r.path}`, lastModified: new Date(), ...r }));
}
```

- 新しいページを追加したら **sitemap.ts への追記を忘れない**（チェックリスト化推奨）。
- 公開後は Google Search Console / Bing Webmaster Tools に sitemap を送信。

### 3-6. 構造化データ（JSON-LD）一覧

| スキーマ | 出力場所 | 目的 |
|---|---|---|
| `AutomotiveBusiness`（LocalBusiness のサブタイプ） | `app/layout.tsx` → 全ページ | 店舗の正式情報。ナレッジパネル・ローカル検索・LLMの事実ソース |
| `BreadcrumbList` | 全下層ページ | 検索結果にパンくず表示 |
| `FAQPage` | `/brands`（FAQ のあるページ） | FAQリッチリザルト / LLM が引用しやすい Q&A |

実装はすべて「`<script type="application/ld+json">` を出すだけの Server Component」。

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>
```

**LocalBusiness の項目（実装済み）**

```jsonc
{
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",          // 業種に合わせて変更（下表）
  "@id": "https://example.com/#business", // 他スキーマから参照できる固定ID
  "name": "...", "alternateName": "...", "legalName": "...",
  "slogan": "...", "description": "...",
  "url": "...", "image": "...(OGP画像)", "logo": ".../logo.png",
  "telephone": "+81-48-606-4977",         // 国際表記
  "priceRange": "¥¥",
  "taxID": "T...",                        // インボイス登録番号（実在性シグナル）
  "address": { "@type": "PostalAddress", "postalCode", "addressCountry": "JP",
               "addressRegion", "addressLocality", "streetAddress" },
  "openingHoursSpecification": [{ "@type": "OpeningHoursSpecification",
               "dayOfWeek": ["Monday", ...], "opens": "10:00", "closes": "19:00" }],
  "sameAs": ["Instagram URL", "X URL", "LINE URL"],   // 同一事業者のSNSを紐付け
  "founder": { "@type": "Person", "name": "...", "jobTitle": "資格名" },
  "brand": [{ "@type": "Brand", "name": "取扱いブランド" }, ...]
}
```

**業種別 `@type` 早見表**

| 業種 | @type |
|---|---|
| 洗車・整備・コーティング | `AutomotiveBusiness` / `AutoRepair` / `AutoWash` |
| 美容室・ネイル・エステ | `HairSalon` / `NailSalon` / `BeautySalon` / `DaySpa` |
| 飲食店 | `Restaurant` / `CafeOrCoffeeShop` / `BarOrPub` |
| 医療・歯科 | `MedicalClinic` / `Dentist` |
| 士業 | `LegalService` / `AccountingService` |
| 工務店・リフォーム | `HomeAndConstructionBusiness` / `GeneralContractor` |
| 小売 | `Store` 系（`ClothingStore` など） |

### 3-7. パフォーマンス（Core Web Vitals）

- フォントは `next/font/google` で自己ホスト、全て `display: "swap"`。
- **日本語フォント（Noto Sans JP）は `preload: false` + 使うウェイトだけ指定**。
  巨大なサブセットのプリロードを避け、CLS とLCP悪化を防ぐ。
- ロゴ等は `next/image`（`priority` はファーストビューのみ）。WebP 版も用意。
- オープニングアニメーションは `prefers-reduced-motion` を尊重し、
  同一セッションの2回目以降は `sessionStorage` でスキップ（離脱・LCP対策）。
- Google Map の iframe は `loading="lazy"`。
- 問い合わせ API は Edge Runtime（外部 fetch 1回だけなのでコールドスタートが速い）。

### 3-8. アクセシビリティ（SEO にも効くもの）

- 画像には必ず `alt`（CMS 画像は記事タイトルを alt に流用）。
- 装飾 SVG は `aria-hidden="true"`、アイコンのみのリンクは `aria-label`。
- フォームは `<label htmlFor>` と `id` を対応させ、`autoComplete` と `aria-required` を付与。
- iframe には `title` 属性（例：「店名 アクセスマップ」）。

### 3-9. OGP画像・アイコン生成

`scripts/gen-assets.mjs`（sharp 使用）で `public/logo.png` 1枚から以下を一括生成：

| 出力 | サイズ | 用途 |
|---|---|---|
| `public/favicon.ico` | 多サイズ | ブラウザタブ |
| `app/icon.png` | 512×512 | PWA / 検索結果のファビコン |
| `app/apple-icon.png` | 180×180 | iOS ホーム画面 |
| `public/og-image.png` | 1200×630 | SNS シェア・OGP |
| `public/logo.webp` | — | 軽量ロゴ |

```bash
node scripts/gen-assets.mjs
```

---

## 4. MEO（Googleビジネスプロフィール / ローカル検索）

サイト側でできる MEO 対策と、サイト外（GBP）で揃えるべき項目に分けて管理する。

### 4-1. サイト側の実装

| 施策 | 実装内容 |
|---|---|
| NAP の完全一致 | `BUSINESS` 定数で一元管理。GBP・SNS・ポータルサイトと **表記を1文字単位で揃える**（「末田2421-2」「2421番地2」などの揺れを作らない） |
| LocalBusiness 構造化データ | 住所を分割、電話を国際表記、営業時間、`sameAs` で SNS と紐付け |
| アクセスページ | 住所・営業時間・定休日・電話・地図・行き方（車／電車）・駐車場情報を1ページに集約 |
| 地図の埋め込み | **座標ではなく住所文字列でジオコーディング**（座標ハードコードで別地点を表示していた不具合を修正済み） |
| ルート案内リンク | `https://www.google.com/maps/dir/?api=1&destination=<住所>` で「ここへ行く」を提供 |
| 地域キーワード | title / description / 本文 / FAQ に「市区町村名」「地区名」「最寄りIC・駅」を自然に含める |
| 電話リンク | `tel:` リンク + `formatDetection.telephone: true` |
| フッターの店舗情報 | 全ページに住所・営業時間・定休日・電話を表示 |

```ts
const MAP_QUERY = encodeURIComponent(`〒${BUSINESS.postalCode} ${BUSINESS.addressLine}`);
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${MAP_QUERY}&hl=ja&z=16&output=embed`;
const MAP_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`;
```

### 4-2. サイト外（GBP 側）チェックリスト

- [ ] ビジネス名をサイトの `BUSINESS.nameJa` と完全一致
- [ ] 住所・電話・営業時間・定休日をサイトと一致（定休日変更時はサイトと同日に更新）
- [ ] ウェブサイト URL に `SITE.url` を登録（予約URLは `/reservation`）
- [ ] カテゴリ（メイン＋サブ）を構造化データの `@type` と整合
- [ ] サービス・料金を `/menu` と一致させて登録
- [ ] 写真（外観・内観・施工 Before/After）を定期投稿
- [ ] 「最新情報」投稿をサイトの `/news` と連動して投稿
- [ ] 口コミへの返信（サイトの「お客様の声」と相互に活用）
- [ ] Instagram / X / LINE などの SNS プロフィールにも同じ NAP とサイトURL

---

## 5. LLMO（AI検索・生成AI回答への最適化）

ChatGPT・Perplexity・Google AI Overview・Gemini などが **「埼玉で Adam's Polishes の施工ができる店は？」
のような質問に答えるとき、自社を正確に引用してもらう** ための設計。

### 5-1. 実装済みの施策

| 施策 | 内容 | なぜ効くか |
|---|---|---|
| FAQ の二重出力 | 同じ `FAQS` 配列から「画面のFAQセクション」と「FAQPage JSON-LD」を両方生成 | LLM は Q&A 形式を引用しやすい。画面とデータが一致するので矛盾が起きない |
| 自己完結した回答文 | 回答の中に **店名・地域・住所・アクセス** を毎回含める（「当店」で済ませない） | 1つの回答だけが抜き出されても意味が通る |
| 狙うクエリを質問文に | 「埼玉県内で Adam's Polishes の正規施工を受けられる店舗はどこですか？」のように、ユーザーが AI に聞く文そのものを質問にする | 質問文と生成AIへのプロンプトがマッチしやすい |
| 全ページにエンティティ情報 | LocalBusiness JSON-LD に `brand`・`founder`・`slogan`・`taxID`・`sameAs` | 「誰が・どこで・何を扱う事業者か」をクローラーに明示 |
| 専用ページ化 | 「◯◯ 埼玉 施工代理店」のような重要事実を専用ページ（`/brands`）で明言 | 曖昧な記述より断定的な一文の方が引用される |
| 代表者情報（E-E-A-T） | 院長紹介ページで国家資格・実務年数・実績・SNS を明記。JSON-LD の `founder` にも資格 | 専門性・信頼性の根拠を AI が拾える |
| 事業者の実在性 | インボイス登録番号・特商法表記・プライバシーポリシー | 実在する事業者であるシグナル |
| 文章はテキストで | 重要情報（料金・住所・FAQ）は画像化せず HTML テキストで出す | 画像内の文字は LLM が読めない／読み違える |

**FAQ 実装パターン（コピペ用）**

```tsx
// app/<route>/page.tsx
const FAQS: FaqItem[] = [
  {
    question: "【地域】で【サービス/ブランド】を受けられる店舗はどこですか？",
    answer: "【住所】の【店名】が【事実】です。【アクセス】【駐車場】で【地域】各地からご来店いただけます。",
  },
  // 5問前後。各回答は1〜3文、店名と地域を含めて自己完結させる
];

export default async function Page() {
  return (
    <>
      <FaqJsonLd faqs={FAQS} />          {/* 構造化データ */}
      <Section faqs={FAQS} />            {/* 画面表示（同じ配列） */}
    </>
  );
}
```

### 5-2. FAQ の作り方（質問の選び方）

1. **指名・事実確認型**：「◯◯は△△の代理店ですか？」→「はい。…」
2. **地域探索型**：「【地域】で◯◯できる店は？」→ 店名＋住所＋アクセス
3. **購入・利用条件型**：「施工なしで購入だけできますか？」
4. **比較・選び方型**：「ブランドごとの使い分けは？」
5. **料金・時間型**：「料金はいくら？施工時間は？」（`/menu` 向け）

---

## 6. CMS（クライアント自身で更新できる仕組み）

SEO/LLMO は「更新され続けること」が前提なので、店舗側が自分で更新できる仕組みを標準装備する。

### 6-1. 構成

| 要素 | 実装 |
|---|---|
| データ | Supabase（Postgres）。各テーブルに `published`（公開フラグ）と `sort_order`（表示順） |
| 公開ページ | Server Component から **公開行のみ** を anon キーで読み取り（RLS で公開行の SELECT のみ許可） |
| フォールバック | Supabase 未設定・エラー・0件のときは `lib/content.ts` のデフォルトデータを表示 |
| 即時反映 | CMS を読むページは `export const dynamic = "force-dynamic"` |
| 管理画面 | `/admin`（パスワードログイン、署名付きセッション Cookie） |
| 書き込み | `/api/admin/*` 経由で service-role キーを使用（**ブラウザに秘密鍵を出さない**） |
| 認証ガード | `middleware.ts` で `/admin/*` と `/api/admin/*` を保護（ページはログインへリダイレクト、API は 401） |
| 画像 | Supabase Storage の公開バケット `media`。アップロード前にブラウザ側で圧縮 |
| 表示順 | 空欄で保存すると自動採番（コラム系は先頭、メニュー系は末尾） |

### 6-2. 管理対象コンテンツ（例）

症例カルテ / お知らせ / お役立ち情報 / メニュー各種（コーティング・洗車・内装・ガラス・ホイール・業者向け）/
取扱いブランド / お客様の声

### 6-3. 環境変数

```bash
NEXT_PUBLIC_SUPABASE_URL=        # 公開してよい
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # 公開してよい
SUPABASE_SERVICE_ROLE_KEY=       # 秘密（NEXT_PUBLIC を付けない）
SUPABASE_MEDIA_BUCKET=media
ADMIN_PASSWORD=                  # 管理画面パスワード
ADMIN_SESSION_SECRET=            # openssl rand -hex 32
RESEND_API_KEY=                  # 問い合わせメール送信（秘密）
RESEND_FROM=                     # 任意：送信元
```

---

## 7. 問い合わせ・予約導線（CV）

| 項目 | 実装 |
|---|---|
| 送信方式 | フォーム → `/api/contact`（Edge Runtime）→ Resend API → 店舗メール |
| スパム対策 | ハニーポット項目（`botcheck`）。入力があれば成功を装って破棄 |
| バリデーション | サーバー側で必須項目（名前・メール・電話・車種）をチェック |
| 代替導線 | 電話（`tel:`）・Instagram DM・公式LINE を並列で提示 |
| 送信ドメイン | Resend で独自ドメインを DNS 認証（SPF/DKIM）し、迷惑メール判定を回避 |

---

## 8. 新規サイト制作時のチェックリスト

### 設計
- [ ] 狙う検索クエリをページごとに決める（「地域＋業種」「サービス名＋料金」「ブランド＋地域」等）
- [ ] 重要クエリは専用ページを用意
- [ ] URL を英小文字・短く・階層なしで設計
- [ ] お知らせ（鮮度）とコラム（検索流入）を別枠に

### 実装
- [ ] `lib/constants.ts` に `BUSINESS` / `SITE` / `pageMetadata()` を作成
- [ ] `app/layout.tsx` に `metadataBase`・title template・OGP・Twitter・robots・icons・`lang="ja"`
- [ ] LocalBusiness JSON-LD（業種サブタイプ）を layout に配置
- [ ] 全下層ページに `pageMetadata()` と `Breadcrumbs`
- [ ] FAQ のあるページは `FaqJsonLd` と画面表示を同じ配列から生成
- [ ] 1ページ1 h1
- [ ] `app/robots.ts`（管理画面・API を disallow）と `app/sitemap.ts`
- [ ] `scripts/gen-assets.mjs` で favicon / OGP 画像を生成
- [ ] 日本語フォントは `preload: false` + 使用ウェイトのみ
- [ ] 画像 alt、装飾 SVG の aria-hidden、フォームの label
- [ ] アクセスページ：住所文字列で地図埋め込み・ルート案内リンク・駐車場・最寄りIC/駅
- [ ] プライバシーポリシー・特商法ページ（フッターからリンク）
- [ ] CMS（必要なら）：公開フラグ・表示順・フォールバック・middleware 保護

### 公開後
- [ ] Search Console / Bing Webmaster Tools に登録し sitemap 送信
- [ ] リッチリザルトテスト・スキーマバリデーターで JSON-LD を検証
- [ ] GBP の NAP・営業時間・URL をサイトと一致させる
- [ ] SNS プロフィールに同じ NAP とサイト URL
- [ ] PageSpeed Insights で CWV を確認
- [ ] 主要な生成AI（ChatGPT / Perplexity / Gemini）で「地域＋業種」「店名」を質問し、回答に出るか・内容が正しいかを定期確認

---

## 9. 改善ポイント（このサイトで未対応・次の案件では最初から入れたいもの）

| # | 項目 | 現状 | 推奨 |
|---|---|---|---|
| 1 | 営業日の自動化 | JSON-LD の `dayOfWeek` が配列の直書き（定休日変更時に `constants.ts` とは別に修正が必要） | `BUSINESS` に `closedDays: ["Tuesday"]` を持たせ、全曜日から除外して生成 |
| 2 | 緯度経度 | 構造化データに座標なし | `geo: { "@type": "GeoCoordinates", latitude, longitude }` と `hasMap`（GBP の地図URL）を追加 |
| 3 | 対応エリア | 未指定 | `areaServed` に市区町村を列挙（出張対応がある業種は特に） |
| 4 | sitemap の更新日 | 全ページ `new Date()`（毎回「今」） | CMS ページは最新記事の更新日時、静的ページは固定日付を入れる |
| 5 | 記事の個別ページ | お知らせ・お役立ち情報が一覧ページのみ | `/useful/[slug]` などの個別URL + `Article`/`BlogPosting` JSON-LD + sitemap 動的追加（ロングテール流入の本命） |
| 6 | メニューの構造化データ | 未出力 | `/menu` に `OfferCatalog` / `Service` + `Offer`（価格）を出力 |
| 7 | 口コミの構造化データ | 未出力 | 自社サイトに載せた自社への口コミ（LocalBusiness への `Review`/`AggregateRating`）は Google のレビュー スニペット対象外（self-serving reviews）。無理にマークアップせず、GBP の口コミ獲得・返信を優先 |
| 8 | 代表者の Person スキーマ | `founder` に名前と資格のみ | `/doctor` に `Person`（`jobTitle`・`hasCredential`・`sameAs`・`worksFor` で `@id` 参照）を追加 |
| 9 | `WebSite` スキーマ | 未出力 | `WebSite`（`name`・`url`・`publisher` で `#business` 参照）を layout に追加 |
| 10 | `llms.txt` | 未設置 | `/llms.txt` に店舗概要・主要ページURL・FAQ要約を Markdown で置く（LLM 向けのサイト案内） |
| 11 | ページ別 OGP 画像 | 全ページ共通の1枚 | 主要ページは個別 OGP 画像（`opengraph-image.tsx` で動的生成も可） |
| 12 | FAQ の横展開 | `/brands` のみ | `/menu`（料金・時間）、`/access`（駐車場・最寄り駅）、`/reservation`（予約方法）にも FAQ を追加 |
| 13 | 電話番号の国際表記 | 文字列置換で生成 | `BUSINESS.phoneIntl: "+81-48-606-4977"` として定数で持つ |
