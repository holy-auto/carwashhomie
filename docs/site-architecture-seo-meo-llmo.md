# HP構成・SEO・MEO・LLMO 実装ガイド v2（再利用テンプレート）

> 「車の美容外科 Car Wash Homies」サイトで実装した **デザイン以外の構成要素**
> （情報設計・技術構成・SEO・MEO・LLMO・CMS・運用）を、他の店舗サイト／
> 中小企業サイト制作でそのまま流用できる形にまとめたものです。
>
> - 対象スタック：Next.js 14（App Router）+ TypeScript + Supabase + Vercel
> - 想定業種：実店舗を持つローカルビジネス（サロン・整備・クリニック・飲食など）
>
> **v2 の変更点**：v1 で「改善ポイント」に挙げていた次の4つを、
> 最初から組み込む **標準仕様** として本文に取り込みました。
>
> | # | v1 の課題 | v2 の標準仕様 | 該当章 |
> |---|---|---|---|
> | 1 | 定休日の二重管理（構造化データに営業曜日を直書き） | `closedDays` を1か所で持ち、営業曜日・表示文言・JSON-LD をすべて自動生成 | 2, 3-6 |
> | 2 | sitemap の更新日が常に「アクセスした時刻」 | 静的ページは固定日付、CMSページ・記事は DB の `updated_at` を使用 | 3-5, 6 |
> | 3 | お知らせ・お役立ち情報に個別ページがない | `/news/[slug]`・`/useful/[slug]` + `BlogPosting` 構造化データ + sitemap 自動追加 | 3-10 |
> | 4 | `llms.txt` がなく、FAQ が1ページのみ | `/llms.txt` を自動生成、FAQ を `lib/faqs.ts` で一元管理して主要ページに展開 | 5 |

---

## 0. 結論（まず押さえる12項目）

| # | 項目 | 実装のキモ | 実装ファイル |
|---|---|---|---|
| 1 | 店舗情報の一元管理 | NAP（名前・住所・電話）・営業時間・**定休日** を1ファイルに集約。表示文言も構造化データもそこから生成 | `lib/constants.ts` |
| 2 | メタデータのヘルパー化 | `pageMetadata()` で title / description / canonical / OGP / Twitter を1行で統一生成（記事用の `type: "article"` にも対応） | `lib/constants.ts` |
| 3 | タイトル設計 | `title.template` で「ページ名 \| 店名」を自動付与。勝負ページだけ `absoluteTitle` で地域キーワード入りの完全タイトルに | `app/layout.tsx` |
| 4 | 構造化データ（全ページ） | `LocalBusiness`（業種サブタイプ）を layout に1つ。営業曜日は定休日から自動計算 | `components/JsonLd.tsx` |
| 5 | パンくず構造化データ | 全下層ページ・記事ページに `BreadcrumbList` | `components/Breadcrumbs.tsx` |
| 6 | FAQ の一元管理 | ページ別 FAQ を `lib/faqs.ts` に集約し、画面表示・`FAQPage` JSON-LD・`llms.txt` の3か所に同じデータを出す | `lib/faqs.ts`, `components/FaqJsonLd.tsx` |
| 7 | robots / sitemap | 管理画面・API は disallow。sitemap の更新日は **実データの更新日時** | `app/robots.ts`, `app/sitemap.ts` |
| 8 | 見出し構造 | 1ページ1つの h1、セクションは h2、カードは h3 | 各 `components/*.tsx` |
| 9 | 記事の個別ページ | コラム・お知らせを1記事1URLで公開し、`BlogPosting` 構造化データを付与 | `app/useful/[slug]`, `app/news/[slug]` |
| 10 | MEO 連携 | NAP をサイト・GBP・SNS で完全一致。地図は座標ではなく住所文字列で埋め込み | `components/Access.tsx` |
| 11 | llms.txt | 店舗の基本情報・主要ページ・FAQ・記事一覧を AI 向けの Markdown で自動配信 | `app/llms.txt/route.ts` |
| 12 | CMS + フォールバック | Supabase から公開行を読み、未設定・0件時は組み込みデフォルトを表示 | `lib/content.ts` |

---

## 1. サイト構成（情報設計）

### 1-1. ページ構成とURL設計

URL は **短い英単語・小文字・階層は最大2段** で統一。日本語URLは使わない。

| URL | ページ | 役割（検索意図） | sitemap priority | changeFrequency |
|---|---|---|---|---|
| `/` | トップ | 指名検索・「地域＋業種」のメイン受け皿 | 1.0 | weekly |
| `/concept` | コンセプト | 差別化・信頼（E-E-A-T の Experience） | 0.8 | monthly |
| `/menu` | メニュー・料金 | 「業種＋料金」「サービス名」検索 | 0.9 | monthly |
| `/brands` | 取扱いブランド | 「ブランド名＋地域」「◯◯ 代理店」検索 | 0.8 | monthly |
| `/gallery` | 症例・施工事例 | 実績訴求・画像検索・お客様の声 | 0.8 | weekly |
| `/news` | お知らせ一覧 | 鮮度シグナル・キャンペーン | 0.6 | weekly |
| `/news/[slug]` | お知らせ個別 | キャンペーン名・イベント名での検索 | 0.5 | monthly |
| `/useful` | お役立ち情報一覧 | コラムの入口 | 0.6 | weekly |
| `/useful/[slug]` | お役立ち情報個別 | **情報検索（細かいキーワード）からの流入の本命** | 0.6 | monthly |
| `/doctor` | 代表者・スタッフ紹介 | E-E-A-T（Expertise / Authoritativeness） | 0.7 | monthly |
| `/reservation` | 予約・問い合わせ | CV（コンバージョン）地点 | 0.9 | monthly |
| `/access` | アクセス | MEO連動・「地域名＋店名」「行き方」 | 0.7 | yearly |
| `/privacy` | プライバシーポリシー | 信頼性・法令対応 | 0.3 | yearly |
| `/legal` | 特定商取引法に基づく表記 | 信頼性・法令対応 | 0.3 | yearly |
| `/llms.txt` | AI向けサイト案内 | LLMO（sitemap には載せない） | — | — |
| `/admin` | 管理画面 | 検索対象外（robots で disallow） | — | — |

**ポイント**
- 「お知らせ（news）」と「お役立ち情報（useful）」は **別コンテンツ枠**。
  お知らせ＝鮮度・店舗情報、お役立ち＝検索流入用コラム、と目的が違う。
- 一覧ページだけでは1ページに複数テーマが混ざり、どのキーワードでも評価されにくい。
  **1記事1URL** にすると記事ごとに title・description・見出しを最適化できる。
- 狙いたいクエリが明確なもの（例：「Adam's Polishes 埼玉 施工代理店」）は **専用ページを1つ作る**。
- 法務ページ（プライバシー・特商法）はフッターから必ずリンクする（信頼性シグナル）。

### 1-2. ナビゲーション構成

| 場所 | 内容 |
|---|---|
| ヘッダー（Navbar） | 主要ページ全て + 右端に予約CTAボタン（常設） |
| フッター | サイトマップ的リンク一覧 / 住所・営業時間・定休日 / 電話（`tel:`リンク） / SNS / インボイス登録番号 / プライバシー・特商法 |
| ページ下部 | 各ページの最後に予約 CTA セクション |
| 記事ページ下部 | 一覧へ戻るリンク・関連記事・関連メニューへのリンク・予約 CTA |

- 内部リンクは全て `next/link` の `<Link>`（クロール可能な `<a href>` が出る）。
- 予約導線は「ヘッダー常設ボタン」「ヒーローCTA」「各ページ末尾CTA」の3箇所以上。
- 記事からメニュー・予約ページへ内部リンクを張り、**集客記事 → 来店** の動線を作る。

### 1-3. ディレクトリ構成

```
app/
  layout.tsx              # サイト共通メタデータ・フォント・JSON-LD(LocalBusiness)
  page.tsx                # トップ
  <route>/page.tsx        # 各下層ページ（metadata + Breadcrumbs + FAQ + コンポーネント）
  news/[slug]/page.tsx    # お知らせ個別
  useful/[slug]/page.tsx  # お役立ち情報個別
  robots.ts               # robots.txt 自動生成
  sitemap.ts              # sitemap.xml 自動生成（DB の更新日時を使用）
  llms.txt/route.ts       # llms.txt 自動生成
  icon.png / apple-icon.png
  admin/...               # 管理画面（middleware で保護）
  api/
    contact/route.ts      # 問い合わせフォーム送信（Edge Runtime + Resend）
    admin/...             # CMS 書き込み API（service-role、middleware で保護）
components/
  JsonLd.tsx              # LocalBusiness 構造化データ
  Breadcrumbs.tsx         # BreadcrumbList 構造化データ
  FaqJsonLd.tsx           # FAQPage 構造化データ
  FaqSection.tsx          # FAQ の画面表示（全ページ共通）
  ArticleJsonLd.tsx       # BlogPosting 構造化データ
  <Section>.tsx           # 各ページの中身
lib/
  constants.ts            # BUSINESS / SITE / 営業日ヘルパー / pageMetadata()
  faqs.ts                 # ページ別 FAQ（画面・JSON-LD・llms.txt 共通）
  routes.ts               # 静的ページ一覧（sitemap・llms.txt 共通）
  content.ts              # Supabase 読み取り + デフォルトコンテンツ
  supabase.ts / auth.ts
middleware.ts             # /admin, /api/admin の認証ガード
scripts/gen-assets.mjs    # ロゴから favicon / OGP画像 / WebP を一括生成
```

**下層ページの標準形（コピペ用）**

```tsx
// app/<route>/page.tsx
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqJsonLd from "@/components/FaqJsonLd";
import FaqSection from "@/components/FaqSection";
import Section from "@/components/Section";
import { pageMetadata } from "@/lib/constants";
import { FAQS } from "@/lib/faqs";

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
      <FaqJsonLd faqs={FAQS.route} />
      <Section />                      {/* この中に h1 を1つだけ */}
      <FaqSection faqs={FAQS.route} /> {/* 画面の FAQ（JSON-LD と同じデータ） */}
    </div>
  );
}
```

CMS のデータを表示するページには `export const dynamic = "force-dynamic";` を付け、
管理画面での更新が即時反映されるようにする。

---

## 2. 店舗情報の一元管理（SEO・MEO・LLMO 共通の土台）

**最重要。** NAP（Name / Address / Phone）や営業時間・定休日がページごとに違うと、
Google も LLM も「どれが正しい情報か」判断できず評価が分散する。
**定休日も含めて「ここを1か所直せば全部変わる」状態** にする。

```ts
// lib/constants.ts

/* 曜日マスタ。schema.org の dayOfWeek（英語）と画面表示（日本語）を対応させる。 */
export const WEEKDAYS = [
  { en: "Monday", ja: "月" },
  { en: "Tuesday", ja: "火" },
  { en: "Wednesday", ja: "水" },
  { en: "Thursday", ja: "木" },
  { en: "Friday", ja: "金" },
  { en: "Saturday", ja: "土" },
  { en: "Sunday", ja: "日" },
] as const;
export type Weekday = (typeof WEEKDAYS)[number]["en"];

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

  /* 営業時間・定休日 ── 変更はこの3行だけ */
  opens: "10:00",
  closes: "19:00",
  closedDays: ["Tuesday"] as readonly Weekday[],

  registrationNumber: "T...",               // 適格請求書発行事業者登録番号
  operator: "中山 春香",                     // 代表者（E-E-A-T）
  operatorTitle: "二級自動車整備士",          // 資格
} as const;

/* ── 営業日ヘルパー（表示・JSON-LD・llms.txt・FAQ が全部これを使う） ── */

/** 営業している曜日（英語）。JSON-LD の dayOfWeek にそのまま渡す。 */
export function openDays(): Weekday[] {
  return WEEKDAYS.map((d) => d.en).filter((d) => !BUSINESS.closedDays.includes(d));
}

/** 「火曜日」「火曜日・水曜日」のような定休日表示。定休日なしなら「年中無休」。 */
export function closedDaysLabel(): string {
  if (BUSINESS.closedDays.length === 0) return "年中無休";
  return BUSINESS.closedDays
    .map((en) => `${WEEKDAYS.find((d) => d.en === en)!.ja}曜日`)
    .join("・");
}

/** 「10:00 — 19:00」 */
export const hoursLabel = `${BUSINESS.opens} — ${BUSINESS.closes}`;

export const SITE = {
  url: "https://example.com",               // 末尾スラッシュなし
  name: BUSINESS.nameJa,
  description: "…",
  ogImage: "/og-image.png",
  locale: "ja_JP",
} as const;
```

**ルール**
- 住所・電話・営業時間・定休日をコンポーネントや JSON-LD に直書きしない。必ず `BUSINESS` かヘルパーを参照。
  - フッター・アクセスページ：`{hoursLabel}（{closedDaysLabel()}定休）`
  - 構造化データ：`dayOfWeek: openDays()`
  - FAQ・llms.txt：テンプレート文字列で `closedDaysLabel()` を埋め込む
- 住所は「表示用の1行」と「構造化データ用の分割（都道府県／市区町村／番地）」の両方を持つ。
- 電話番号は「表示用（ハイフンあり）」と「`tel:` 用（数字のみ）」を分けて持つ。
- 曜日によって営業時間が違う業種は、`opens/closes` の代わりに
  `schedule: [{ days: ["Saturday","Sunday"], opens: "09:00", closes: "18:00" }, ...]`
  の形で持ち、JSON-LD の `openingHoursSpecification` を複数出力する。
- 年末年始・臨時休業は `specialOpeningHoursSpecification`（JSON-LD）と GBP の「特別営業時間」で別管理。

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

記事ページでも使えるよう、`article`（画像・公開日時・更新日時）を受け取れる形にしておく。
`article` を渡すと OGP の type が `article` になり、記事のアイキャッチが OGP 画像になる。

```ts
export function pageMetadata({
  title, absoluteTitle, description, path, keywords, article,
}: {
  title: string;
  absoluteTitle?: boolean;
  description: string;
  path: string;
  keywords?: readonly string[];
  article?: {
    image?: string | null;        // 記事のアイキャッチ（なければ共通OGP）
    publishedTime: string;        // ISO 8601
    modifiedTime?: string;
  };
}) {
  const fullTitle = absoluteTitle ? title : `${title} | ${BUSINESS.nameJa}`;
  const images = article?.image
    ? [{ url: article.image, alt: title }]
    : [{ url: SITE.ogImage, width: 1200, height: 630, alt: BUSINESS.nameJa }];
  return {
    title: absoluteTitle ? { absolute: title } : title,  // template の二重付与を防ぐ
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: path },                     // 全ページ自己参照canonical
    openGraph: {
      locale: SITE.locale, url: `${SITE.url}${path}`, siteName: BUSINESS.nameJa,
      title: fullTitle, description, images,
      ...(article
        ? { type: "article" as const, publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime, authors: [BUSINESS.operator] }
        : { type: "website" as const }),
    },
    twitter: { card: "summary_large_image" as const, title: fullTitle, description,
               images: images.map((i) => i.url), creator: `@${BUSINESS.xHandle}` },
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
| 記事 title | 記事タイトルのみ（template が店名を付ける）。狙うキーワードを前半に、32字前後 | `雨の日の洗車はアリ？コーティング車のお手入れのコツ` |
| description | 100〜130字目安。①地域 ②業種 ③強み・差別化 ④行動喚起 | 「埼玉県さいたま市でボディコーティングをお考えなら…」 |
| 記事 description | 管理画面の「抜粋」を使う。未入力なら本文先頭120字を自動で切り出す | — |
| アクセス description | 最寄りIC・駅、所要時間、駐車場の有無を入れる | 「東北自動車道『岩槻IC』より車で約10分…」 |

- keywords メタは現在の Google ではほぼ無視されるが、**ページごとの狙いKWを明文化する
  設計メモ** として残す（他の検索エンジン・社内の意思統一用）。
- ほぼ全ページの keywords に「市区町村名」「地域名」を入れて地域性を一貫させる。

### 3-4. 見出し構造

- **1ページに h1 は1つだけ**。トップはヒーロー、下層はページタイトル、記事は記事タイトル。
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

- `userAgent: "*"` で AI のクローラー（GPTBot / OAI-SearchBot / ClaudeBot / PerplexityBot /
  Google-Extended など）も許可される。**LLMO を狙うなら個別に disallow しない**。

**sitemap の更新日（lastModified）は「本当に内容が変わった日時」にする。**
毎回 `new Date()` を入れると全ページが常に「今更新された」扱いになり、
Google は lastmod を信用しなくなる（＝更新を検知してもらいにくくなる）。

| ページの種類 | lastModified の決め方 |
|---|---|
| 静的ページ（コンセプト・アクセス・法務など） | `lib/routes.ts` に固定日付を書き、**内容を変えたコミットで一緒に更新**する |
| CMS で中身が変わるページ（メニュー・事例・ブランド・一覧） | 関係するテーブルの `updated_at` の最大値 |
| 記事の個別ページ | その記事の `updated_at` |
| 日付が分からないとき | **lastModified を出さない**（間違った日付より無い方がよい） |

```ts
// lib/routes.ts ── sitemap と llms.txt で共有する静的ページ一覧
export type StaticRoute = {
  path: string;
  title: string;                 // llms.txt で使う
  summary: string;               // llms.txt で使う（1行説明）
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  updated?: string;              // 静的ページ：内容を変えた日（YYYY-MM-DD）
  tables?: readonly string[];    // CMSページ：中身を持つテーブル
};

export const STATIC_ROUTES: StaticRoute[] = [
  { path: "/", title: "トップ", summary: "…", priority: 1.0, changeFrequency: "weekly",
    updated: "2026-10-01" },
  { path: "/menu", title: "施術メニュー・料金", summary: "…", priority: 0.9,
    changeFrequency: "monthly",
    tables: ["body_coatings", "wash_services", "interior_coatings", "interior_options",
             "glass_coatings", "wheel_coatings", "b2b_services"] },
  { path: "/gallery", title: "症例カルテ", summary: "…", priority: 0.8,
    changeFrequency: "weekly", tables: ["gallery_cases", "testimonials"] },
  { path: "/brands", title: "取扱いブランド", summary: "…", priority: 0.8,
    changeFrequency: "monthly", tables: ["brands"] },
  { path: "/news", title: "お知らせ", summary: "…", priority: 0.6,
    changeFrequency: "weekly", tables: ["news_posts"] },
  { path: "/useful", title: "お役立ち情報", summary: "…", priority: 0.6,
    changeFrequency: "weekly", tables: ["useful_articles"] },
  { path: "/access", title: "アクセス", summary: "…", priority: 0.7,
    changeFrequency: "yearly", updated: "2026-09-01" },
  // ...
];
```

```ts
// lib/content.ts ── テーブルの最終更新日時（公開行のみ）
export async function getLastModified(tables: readonly string[]): Promise<Date | undefined> {
  const supabase = getPublicClient();
  if (!supabase) return undefined;
  const dates = await Promise.all(
    tables.map(async (table) => {
      const { data } = await supabase
        .from(table)
        .select("updated_at")
        .eq("published", true)
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      return data?.updated_at ? new Date(data.updated_at) : undefined;
    }),
  );
  const valid = dates.filter((d): d is Date => !!d);
  return valid.length ? new Date(Math.max(...valid.map((d) => d.getTime()))) : undefined;
}
```

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { STATIC_ROUTES } from "@/lib/routes";
import { getLastModified, getNewsPosts, getUsefulArticles } from "@/lib/content";

export const revalidate = 3600; // 1時間ごとに再生成（毎リクエストDBを叩かない）

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = await Promise.all(
    STATIC_ROUTES.map(async (r) => ({
      url: `${SITE.url}${r.path}`,
      lastModified: r.tables ? await getLastModified(r.tables)
                  : r.updated ? new Date(r.updated) : undefined,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
  );

  const [news, useful] = await Promise.all([getNewsPosts(), getUsefulArticles()]);
  const articleEntries = [
    ...news.map((p) => ({ url: `${SITE.url}/news/${p.slug}`, lastModified: new Date(p.updated_at),
                          changeFrequency: "monthly" as const, priority: 0.5 })),
    ...useful.map((a) => ({ url: `${SITE.url}/useful/${a.slug}`, lastModified: new Date(a.updated_at),
                            changeFrequency: "monthly" as const, priority: 0.6 })),
  ];

  return [...staticEntries, ...articleEntries];
}
```

- 新しい静的ページを追加したら `lib/routes.ts` に1行追加するだけで sitemap と llms.txt の両方に載る。
- 公開後は Google Search Console / Bing Webmaster Tools に sitemap を送信。

### 3-6. 構造化データ（JSON-LD）一覧

| スキーマ | 出力場所 | 目的 |
|---|---|---|
| `AutomotiveBusiness`（LocalBusiness のサブタイプ） | `app/layout.tsx` → 全ページ | 店舗の正式情報。ナレッジパネル・ローカル検索・LLMの事実ソース |
| `BreadcrumbList` | 全下層ページ・記事ページ | 検索結果にパンくず表示 |
| `FAQPage` | FAQ のある全ページ | AI 検索・LLM が引用しやすい Q&A（※） |
| `BlogPosting` | 記事の個別ページ | 記事の著者・公開日・更新日・発行元を明示 |

※ Google は 2023年以降、FAQ リッチリザルト（検索結果の FAQ 折りたたみ表示）を
政府・医療系サイトに限定している。店舗サイトでは見た目の変化は期待せず、
**検索エンジン・AI に Q&A を正確に理解させる目的** で出力する。

実装はすべて「`<script type="application/ld+json">` を出すだけの Server Component」。

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>
```

**LocalBusiness（営業曜日は定休日から自動生成）**

```tsx
// components/JsonLd.tsx
import { BUSINESS, SITE, openDays } from "@/lib/constants";

const schema = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",          // 業種に合わせて変更（下表）
  "@id": `${SITE.url}/#business`,         // 他スキーマから参照する固定ID
  name: BUSINESS.nameJa,
  alternateName: BUSINESS.nameEn,
  legalName: BUSINESS.nameJa,
  slogan: BUSINESS.tagline,
  description: SITE.description,
  url: SITE.url,
  image: `${SITE.url}${SITE.ogImage}`,
  logo: `${SITE.url}/logo.png`,
  telephone: "+81-48-606-4977",           // 国際表記
  priceRange: "¥¥",
  taxID: BUSINESS.registrationNumber,     // インボイス登録番号（実在性シグナル）
  address: {
    "@type": "PostalAddress",
    postalCode: BUSINESS.postalCode,
    addressCountry: "JP",
    addressRegion: BUSINESS.addressRegion,
    addressLocality: BUSINESS.addressLocality,
    streetAddress: BUSINESS.streetAddress,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: openDays(),              // ← 直書きしない。closedDays から自動計算
      opens: BUSINESS.opens,
      closes: BUSINESS.closes,
    },
  ],
  sameAs: [BUSINESS.instagramUrl, BUSINESS.xUrl, BUSINESS.lineUrl],
  founder: { "@type": "Person", name: BUSINESS.operator, jobTitle: BUSINESS.operatorTitle },
  brand: DEFAULT_BRANDS.map((b) => ({ "@type": "Brand", name: b.name })),
};
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
- **日本語フォント（Noto Sans JP）は `preload: false` + 使うウェイトだけ指定**（CLS・LCP対策）。
- ロゴ等は `next/image`（`priority` はファーストビューのみ）。WebP 版も用意。
- オープニングアニメーションは `prefers-reduced-motion` を尊重し、
  同一セッションの2回目以降は `sessionStorage` でスキップ。
- Google Map の iframe は `loading="lazy"`。
- 問い合わせ API は Edge Runtime（外部 fetch 1回だけなのでコールドスタートが速い）。
- sitemap・llms.txt は `revalidate` でキャッシュし、アクセスのたびに DB を叩かない。

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

### 3-10. 記事の個別ページ（`/useful/[slug]`・`/news/[slug]`）

細かいキーワード（「コーティング 雨 洗車」「新車 コーティング いつ」など）で集客するには
**1記事1URL** が必須。一覧ページは各記事の「タイトル・日付・抜粋・続きを読むリンク」だけにする。

**URL（slug）のルール**
- 半角英小文字・数字・ハイフンのみ（例：`/useful/rainy-day-car-wash`）。
- 管理画面に「URL（スラッグ）」欄を用意し、空欄なら `YYYYMMDD-xxxxxxxx`（公開日＋ID先頭8文字）を自動採番。
- **公開後は変更しない**。どうしても変えるときは旧URL → 新URLへ 301 リダイレクトを設定。

```ts
// lib/content.ts
export async function getUsefulArticleBySlug(slug: string): Promise<UsefulArticle | null> {
  const supabase = getPublicClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("useful_articles")
    .select("*")
    .eq("published", true)
    .eq("slug", slug)
    .maybeSingle();
  if (error) console.error("getUsefulArticleBySlug:", error.message);
  return (data as UsefulArticle) ?? null;
}

/** 抜粋が空のとき本文先頭から description を作る。 */
export function excerptOf(a: { excerpt: string | null; body: string | null }, max = 120) {
  const src = (a.excerpt || a.body || "").replace(/\s+/g, " ").trim();
  return src.length > max ? `${src.slice(0, max)}…` : src;
}
```

```tsx
// app/useful/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import ArticleView from "@/components/ArticleView";
import { pageMetadata } from "@/lib/constants";
import { excerptOf, getUsefulArticleBySlug } from "@/lib/content";

export const dynamic = "force-dynamic";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getUsefulArticleBySlug(params.slug);
  if (!article) return { title: "記事が見つかりません", robots: { index: false } };
  return pageMetadata({
    title: article.title,
    description: excerptOf(article),
    path: `/useful/${article.slug}`,
    article: {
      image: article.image_url,
      publishedTime: article.published_at,
      modifiedTime: article.updated_at ?? undefined,
    },
  });
}

export default async function UsefulArticlePage({ params }: Props) {
  const article = await getUsefulArticleBySlug(params.slug);
  if (!article) notFound();                       // 存在しない slug は 404

  const path = `/useful/${article.slug}`;
  return (
    <div className="pt-20">
      <Breadcrumbs
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "お役立ち情報", path: "/useful" },
          { name: article.title, path },
        ]}
      />
      <ArticleJsonLd
        path={path}
        headline={article.title}
        description={excerptOf(article)}
        image={article.image_url}
        datePublished={article.published_at}
        dateModified={article.updated_at}
      />
      <ArticleView article={article} />  {/* h1=記事タイトル、本文、関連記事、予約CTA */}
    </div>
  );
}
```

```tsx
// components/ArticleJsonLd.tsx
import { BUSINESS, SITE } from "@/lib/constants";

export default function ArticleJsonLd(props: {
  path: string; headline: string; description: string;
  image?: string | null; datePublished: string; dateModified?: string;
}) {
  const url = `${SITE.url}${props.path}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    headline: props.headline,
    description: props.description,
    image: [props.image ?? `${SITE.url}${SITE.ogImage}`],
    datePublished: props.datePublished,
    dateModified: props.dateModified ?? props.datePublished,
    inLanguage: "ja",
    author: {                                   // E-E-A-T：書いた人の資格を明示
      "@type": "Person",
      name: BUSINESS.operator,
      jobTitle: BUSINESS.operatorTitle,
      url: `${SITE.url}/doctor`,
    },
    publisher: { "@id": `${SITE.url}/#business` }, // LocalBusiness を参照
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

**記事ページのチェック項目**
- [ ] h1 は記事タイトル1つ。本文の小見出しは h2
- [ ] 公開日・更新日を画面にも表示（`<time dateTime>`）
- [ ] 著者（代表者）名と資格を表示し、紹介ページ `/doctor` へリンク
- [ ] 記事末尾に「関連記事」「関連メニュー（`/menu`）」「予約 CTA」
- [ ] アイキャッチ画像に alt（未設定なら記事タイトル）
- [ ] 存在しない slug・非公開記事は 404（`notFound()`）
- [ ] 一覧ページ・sitemap・llms.txt に自動で載る

`/news/[slug]` も同じ構成で、パンくずを「ホーム > お知らせ > 記事名」にする。

---

## 4. MEO（Googleビジネスプロフィール / ローカル検索）

### 4-1. サイト側の実装

| 施策 | 実装内容 |
|---|---|
| NAP の完全一致 | `BUSINESS` 定数で一元管理。GBP・SNS・ポータルサイトと **表記を1文字単位で揃える** |
| 営業時間・定休日の一致 | `closedDays` を変えるとフッター・アクセス・JSON-LD・FAQ・llms.txt が全部変わる。**同じ日に GBP も更新** |
| LocalBusiness 構造化データ | 住所を分割、電話を国際表記、営業時間、`sameAs` で SNS と紐付け |
| アクセスページ | 住所・営業時間・定休日・電話・地図・行き方（車／電車）・駐車場情報を1ページに集約 + アクセス FAQ |
| 地図の埋め込み | **座標ではなく住所文字列でジオコーディング**（座標ハードコードで別地点を表示していた不具合を修正済み） |
| ルート案内リンク | `https://www.google.com/maps/dir/?api=1&destination=<住所>` |
| 地域キーワード | title / description / 本文 / FAQ / 記事に「市区町村名」「地区名」「最寄りIC・駅」を自然に含める |
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
- [ ] 「最新情報」投稿に `/news/[slug]` の記事URLを貼る（サイトと GBP を相互リンク）
- [ ] 口コミへの返信（サイトの「お客様の声」と相互に活用）
- [ ] 年末年始・臨時休業は GBP の「特別営業時間」で登録
- [ ] SNS プロフィールにも同じ NAP とサイト URL

---

## 5. LLMO（AI検索・生成AI回答への最適化）

ChatGPT・Perplexity・Google AI Overview・Gemini などが **「埼玉で Adam's Polishes の施工ができる店は？」
のような質問に答えるとき、自社を正確に引用してもらう** ための設計。

### 5-1. 基本方針

| 施策 | 内容 | なぜ効くか |
|---|---|---|
| FAQ の三重出力 | 同じ FAQ データから「画面の FAQ」「FAQPage JSON-LD」「llms.txt」を生成 | LLM は Q&A 形式を引用しやすい。3か所が常に一致するので矛盾が起きない |
| 自己完結した回答文 | 回答の中に **店名・地域・住所・アクセス** を毎回含める（「当店」で済ませない） | 1つの回答だけが抜き出されても意味が通る |
| 狙うクエリを質問文に | ユーザーが AI に聞く文そのものを質問にする | 質問文と生成AIへのプロンプトがマッチしやすい |
| 全ページにエンティティ情報 | LocalBusiness JSON-LD に `brand`・`founder`・`slogan`・`taxID`・`sameAs` | 「誰が・どこで・何を扱う事業者か」を明示 |
| 専用ページ化 | 重要事実を専用ページで断定的に明言 | 曖昧な記述より断定的な一文の方が引用される |
| 代表者情報（E-E-A-T） | 資格・実務年数・実績・SNS を明記。記事の著者にも紐付け | 専門性・信頼性の根拠を AI が拾える |
| 事業者の実在性 | インボイス登録番号・特商法表記・プライバシーポリシー | 実在する事業者であるシグナル |
| 文章はテキストで | 料金・住所・FAQ は画像化せず HTML テキストで出す | 画像内の文字は LLM が読めない／読み違える |
| AI クローラーを拒否しない | robots.txt で GPTBot・ClaudeBot・PerplexityBot 等をブロックしない | ブロックすると AI 検索の引用元候補から外れる |
| llms.txt | サイトの要点を AI 向け Markdown で1ファイルにまとめる | AI がサイト全体を巡回しなくても正確な要点を取れる |

### 5-2. FAQ の一元管理と全ページ展開

FAQ はページ内に直書きせず、`lib/faqs.ts` にページ別でまとめる。
回答には `BUSINESS` やヘルパーを埋め込み、**住所・定休日を変えたら FAQ も自動で変わる** ようにする。

```ts
// lib/faqs.ts
import { BUSINESS, closedDaysLabel, hoursLabel } from "@/lib/constants";

export type FaqItem = { question: string; answer: string };

export const FAQS = {
  /* トップ：店の正体・強み・地域 */
  top: [
    {
      question: `${BUSINESS.nameJa}はどんなお店ですか？`,
      answer: `${BUSINESS.addressLocality}にあるボディコーティング専門店です。…`,
    },
  ],

  /* メニュー：料金・時間・選び方 */
  menu: [
    { question: "ボディコーティングの料金はいくらですか？",
      answer: `${BUSINESS.nameJa}のボディコーティングは【◯◯円〜】です。車のサイズ・塗装状態により…` },
    { question: "施工にはどれくらい時間がかかりますか？",
      answer: "【メニュー名】で【◯日】が目安です。…" },
    { question: "どのコーティングを選べばいいかわかりません。",
      answer: "無料カウンセリングで塗装状態と使用環境を診断し、最適なメニューをご提案します。" },
  ],

  /* アクセス：場所・駐車場・営業日 */
  access: [
    { question: `${BUSINESS.nameJa}の場所はどこですか？`,
      answer: `〒${BUSINESS.postalCode} ${BUSINESS.addressLine}です。東北自動車道「岩槻IC」より車で約10分です。` },
    { question: "駐車場はありますか？",
      answer: `${BUSINESS.nameJa}は店舗前に駐車スペースがあり、大型車も駐車できます。` },
    { question: "営業時間と定休日を教えてください。",
      answer: `営業時間は${hoursLabel}、定休日は${closedDaysLabel()}です。` },
    { question: "電車で行けますか？",
      answer: "東武アーバンパークライン「岩槻駅」からお車で約10分です。" },
  ],

  /* 予約：方法・費用・キャンセル */
  reservation: [
    { question: "予約はどうすればいいですか？",
      answer: `お電話（${BUSINESS.phone}）・公式LINE・Instagram DM・Webフォームから受け付けています。` },
    { question: "相談だけでも大丈夫ですか？",
      answer: `はい。${BUSINESS.nameJa}では無料カウンセリングを行っています。` },
  ],

  /* ブランド：代理店・取扱い・購入 */
  brands: [ /* 既存の /brands の FAQ を移す */ ],
} satisfies Record<string, FaqItem[]>;

/** llms.txt 用：全ページの FAQ をまとめて返す（重複質問は除外）。 */
export function allFaqs(): FaqItem[] {
  const seen = new Set<string>();
  return Object.values(FAQS).flat().filter((f) => !seen.has(f.question) && seen.add(f.question));
}
```

**料金・期間の FAQ は CMS のデータから組み立てる**：メニューの料金表を管理画面で変えたときに
FAQ の回答だけ古い金額のまま残らないよう、`menuFaqs(bodyCoatings)` のように
料金表のデータを受け取って回答文を作る関数にする（固定の配列にしない）。

**ページ別の FAQ 配置**

| ページ | 置く FAQ | 狙う AI への質問 |
|---|---|---|
| `/`（トップ） | 店の概要・強み・対応エリア | 「さいたま市でおすすめのコーティング店は？」 |
| `/menu` | 料金・施工時間・選び方・持ち込み可否 | 「ボディコーティングの相場は？」「何日かかる？」 |
| `/brands` | 代理店・取扱いブランド・製品購入 | 「埼玉で Adam's Polishes の施工ができる店は？」 |
| `/access` | 場所・駐車場・営業時間・定休日・最寄り駅 | 「Car Wash Homies の定休日は？」「駐車場ある？」 |
| `/reservation` | 予約方法・相談の可否・キャンセル | 「予約方法は？」「相談だけでもいい？」 |
| `/gallery`（任意） | 施工事例の見方・対応できる症状 | 「水垢は落とせる？」 |

**FAQ の書き方ルール**
1. 1ページ3〜6問。回答は1〜3文。
2. 回答の主語に **店名** を入れる（「当店では」ではなく「Car Wash Homies では」）。
3. 数字（料金・時間・距離）は具体的に。曖昧な「お気軽に」だけの回答は書かない。
4. 画面に表示する FAQ と JSON-LD は **必ず同じ配列** から出す（JSON-LD だけの FAQ はガイドライン違反）。

**質問の5パターン**
1. **指名・事実確認型**：「◯◯は△△の代理店ですか？」→「はい。…」
2. **地域探索型**：「【地域】で◯◯できる店は？」→ 店名＋住所＋アクセス
3. **購入・利用条件型**：「施工なしで購入だけできますか？」
4. **比較・選び方型**：「ブランドごとの使い分けは？」
5. **料金・時間型**：「料金はいくら？施工時間は？」

### 5-3. llms.txt

`/llms.txt` は「AI 向けのサイト案内」を Markdown で置くファイル（llmstxt.org で提案されている形式）。
すべての AI が読む保証はないが、**作るコストが小さく、内容は全部既存データから自動生成できる** ので標準で入れる。

**形式**
- `#` 店名 → `>` 1〜2行の要約 → `##` セクションごとにリンク付きの箇条書き
- 書くのは **事実だけ**（宣伝文句や誇張は書かない）
- 秘密情報（管理画面URL・API・個人の連絡先以外のメール等）は書かない

```ts
// app/llms.txt/route.ts
import { BUSINESS, SITE, closedDaysLabel, hoursLabel } from "@/lib/constants";
import { STATIC_ROUTES } from "@/lib/routes";
import { allFaqs } from "@/lib/faqs";
import { getBrands, getUsefulArticles } from "@/lib/content";

export const revalidate = 3600; // 1時間キャッシュ

export async function GET() {
  const [brands, articles] = await Promise.all([getBrands(), getUsefulArticles()]);

  const lines = [
    `# ${BUSINESS.nameJa}`,
    "",
    `> ${SITE.description}`,
    "",
    "## 基本情報",
    `- 正式名称: ${BUSINESS.nameJa}（${BUSINESS.nameEn}）`,
    `- 業種: ボディコーティング・カーディテーリング専門店`,
    `- 所在地: 〒${BUSINESS.postalCode} ${BUSINESS.addressLine}`,
    `- 営業時間: ${hoursLabel}`,
    `- 定休日: ${closedDaysLabel()}`,
    `- 電話: ${BUSINESS.phone}`,
    `- 代表: ${BUSINESS.operator}（${BUSINESS.operatorTitle}）`,
    `- 取扱いブランド: ${brands.map((b) => b.name).join("、")}`,
    `- 適格請求書発行事業者登録番号: ${BUSINESS.registrationNumber}`,
    `- 予約・相談: ${SITE.url}/reservation`,
    "",
    "## 主要ページ",
    ...STATIC_ROUTES.map((r) => `- [${r.title}](${SITE.url}${r.path}): ${r.summary}`),
    "",
    "## よくある質問",
    ...allFaqs().flatMap((f) => [`### ${f.question}`, f.answer, ""]),
    "## お役立ち情報（最新20件）",
    ...articles.slice(0, 20).map((a) => `- [${a.title}](${SITE.url}/useful/${a.slug})`),
    "",
    "## Optional",
    `- [Instagram](${BUSINESS.instagramUrl})`,
    `- [X](${BUSINESS.xUrl})`,
    `- [公式LINE](${BUSINESS.lineUrl})`,
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
```

- `app/llms.txt/route.ts` というフォルダ名で `/llms.txt` として配信される。
- `middleware.ts` の matcher（`/admin`・`/api/admin`）にかからないので認証は不要。
- sitemap には載せない（HTML ページではないため）。
- 公開後、ブラウザで `https://<ドメイン>/llms.txt` を開き、営業時間・定休日が正しいか確認する。

---

## 6. CMS（クライアント自身で更新できる仕組み）

### 6-1. 構成

| 要素 | 実装 |
|---|---|
| データ | Supabase（Postgres）。各テーブルに `published`（公開フラグ）・`sort_order`（表示順）・`created_at`・**`updated_at`** |
| 公開ページ | Server Component から **公開行のみ** を anon キーで読み取り（RLS で公開行の SELECT のみ許可） |
| フォールバック | Supabase 未設定・エラー・0件のときは `lib/content.ts` のデフォルトデータを表示 |
| 即時反映 | CMS を読むページは `export const dynamic = "force-dynamic"` |
| 管理画面 | `/admin`（パスワードログイン、署名付きセッション Cookie） |
| 書き込み | `/api/admin/*` 経由で service-role キーを使用（**ブラウザに秘密鍵を出さない**） |
| 認証ガード | `middleware.ts` で `/admin/*` と `/api/admin/*` を保護 |
| 画像 | Supabase Storage の公開バケット `media`。アップロード前にブラウザ側で圧縮 |
| 表示順 | 空欄で保存すると自動採番（コラム系は先頭、メニュー系は末尾） |
| 記事 URL | 記事テーブルに `slug`（一意）。空欄なら自動採番 |

### 6-2. 必須カラムの追加 SQL（全テーブル共通）

`updated_at` は **DB のトリガーで自動更新** する（アプリ側で入れ忘れても正しい日時になる）。

```sql
-- 1) updated_at を自動更新する関数（1回だけ作成）
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 2) 各テーブルに updated_at とトリガーを追加（テーブルごとに繰り返す）
alter table useful_articles add column if not exists updated_at timestamptz not null default now();
create trigger useful_articles_updated_at
  before update on useful_articles
  for each row execute function set_updated_at();

-- 3) 記事テーブルに slug（URL用）を追加
alter table useful_articles add column if not exists slug text;
update useful_articles
  set slug = to_char(published_at, 'YYYYMMDD') || '-' || substr(id::text, 1, 8)
  where slug is null;
alter table useful_articles alter column slug set not null;
create unique index if not exists useful_articles_slug_key on useful_articles (slug);
-- news_posts も同様。あわせて lib/content.ts の NewsPost / UsefulArticle 型に slug・updated_at を追加する
```

### 6-3. 管理対象コンテンツ（例）

症例カルテ / お知らせ / お役立ち情報 / メニュー各種（コーティング・洗車・内装・ガラス・ホイール・業者向け）/
取扱いブランド / お客様の声

- 記事系（お知らせ・お役立ち情報）の編集フォームには「タイトル」「URL（スラッグ）」「抜粋（description 用・120字）」
  「本文」「アイキャッチ画像」「公開日時」「公開する」を置く。
- 抜粋欄には「検索結果に表示される説明文です」と入力のヒントを出す。

### 6-4. 環境変数

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
- [ ] URL を英小文字・短く・階層は最大2段で設計
- [ ] お知らせ（鮮度）とコラム（検索流入）を別枠にし、どちらも1記事1URL
- [ ] ページ別の FAQ（各3〜6問）を洗い出す

### 実装
- [ ] `lib/constants.ts` に `BUSINESS`（`opens`・`closes`・`closedDays` を含む）/ `SITE` / 営業日ヘルパー / `pageMetadata()`
- [ ] 営業時間・定休日の表示と JSON-LD がヘルパー経由になっているか（直書き0件）
- [ ] `app/layout.tsx` に `metadataBase`・title template・OGP・Twitter・robots・icons・`lang="ja"`
- [ ] LocalBusiness JSON-LD（業種サブタイプ、`dayOfWeek: openDays()`）を layout に配置
- [ ] 全下層ページに `pageMetadata()` と `Breadcrumbs`
- [ ] `lib/faqs.ts` を作り、トップ・メニュー・アクセス・予約・（ブランド）に FAQ 表示 + `FaqJsonLd`
- [ ] 1ページ1 h1
- [ ] `lib/routes.ts` に静的ページ一覧（`updated` または `tables`）
- [ ] `app/robots.ts`（管理画面・API を disallow、AI クローラーは許可）
- [ ] `app/sitemap.ts`（DB の `updated_at` を使用、記事URLを自動追加、`revalidate` 付き）
- [ ] 記事の個別ページ（`[slug]`）+ `ArticleJsonLd` + 3階層パンくず + 404 処理
- [ ] `app/llms.txt/route.ts`
- [ ] `scripts/gen-assets.mjs` で favicon / OGP 画像を生成
- [ ] 日本語フォントは `preload: false` + 使用ウェイトのみ
- [ ] 画像 alt、装飾 SVG の aria-hidden、フォームの label
- [ ] アクセスページ：住所文字列で地図埋め込み・ルート案内リンク・駐車場・最寄りIC/駅
- [ ] プライバシーポリシー・特商法ページ（フッターからリンク）
- [ ] CMS：公開フラグ・表示順・`updated_at` トリガー・記事の `slug`・フォールバック・middleware 保護

### 公開後
- [ ] Search Console / Bing Webmaster Tools に登録し sitemap 送信
- [ ] sitemap.xml を開き、lastmod がページごとに違う日付になっているか確認
- [ ] リッチリザルトテスト・スキーマバリデーターで JSON-LD（LocalBusiness / Breadcrumb / FAQPage / BlogPosting）を検証
- [ ] `/llms.txt` を開き、営業時間・定休日・住所が正しいか確認
- [ ] GBP の NAP・営業時間・URL をサイトと一致させる
- [ ] SNS プロフィールに同じ NAP とサイト URL
- [ ] PageSpeed Insights で CWV を確認
- [ ] 主要な生成AI（ChatGPT / Perplexity / Gemini）で「地域＋業種」「店名＋定休日」などを質問し、回答に出るか・内容が正しいかを月1回確認

### 定休日・営業時間を変えるとき（運用手順）
1. `lib/constants.ts` の `opens` / `closes` / `closedDays` を変更
2. `lib/routes.ts` の `/access` の `updated` を当日に変更
3. デプロイ後、フッター・`/access`・`/llms.txt`・JSON-LD（ページのソース）を確認
4. 同じ日に GBP・Instagram・LINE のプロフィールも更新

---

## 9. 今後の改善候補（v2 でも未対応のもの）

| # | 項目 | 現状 | 推奨 |
|---|---|---|---|
| 1 | 緯度経度 | 構造化データに座標なし | `geo: { "@type": "GeoCoordinates", latitude, longitude }` と `hasMap`（GBP の地図URL）を追加 |
| 2 | 対応エリア | 未指定 | `areaServed` に市区町村を列挙（出張対応がある業種は特に） |
| 3 | メニューの構造化データ | 未出力 | `/menu` に `OfferCatalog` / `Service` + `Offer`（価格）を出力 |
| 4 | 口コミの構造化データ | 未出力 | 自社サイトに載せた自社への口コミ（LocalBusiness への `Review`/`AggregateRating`）は Google のレビュー スニペット対象外（self-serving reviews）。無理にマークアップせず、GBP の口コミ獲得・返信を優先 |
| 5 | 代表者の Person スキーマ | `founder` に名前と資格のみ | `/doctor` に `Person`（`jobTitle`・`hasCredential`・`sameAs`・`worksFor` で `@id` 参照）を追加。記事の `author` からも同じ `@id` を参照 |
| 6 | `WebSite` スキーマ | 未出力 | `WebSite`（`name`・`url`・`publisher` で `#business` 参照）を layout に追加 |
| 7 | ページ別 OGP 画像 | 記事以外は共通の1枚 | 主要ページは個別 OGP 画像（`opengraph-image.tsx` で動的生成も可） |
| 8 | 電話番号の国際表記 | 文字列置換で生成 | `BUSINESS.phoneIntl: "+81-48-606-4977"` として定数で持つ |
| 9 | 記事本文の書式 | プレーンテキスト（改行のみ） | Markdown 対応にして本文中の h2・リスト・表を使えるようにする（AI にも構造が伝わる） |
| 10 | llms-full.txt | 未設置 | 記事本文まで含めた `/llms-full.txt` を追加（記事数が増えてから） |

---

## 10. このサイト（carwashhomies.com）での適用状況

v2 の4項目は、このサイトに次のファイルで実装済み。他の案件ではここをコピー元にする。

| 項目 | 実装ファイル |
|---|---|
| 定休日の一元化 | `lib/constants.ts`（`closedDays`・`openDays()`・`closedDaysLabel()`・`hoursLabel`）→ `components/JsonLd.tsx`・`Footer.tsx`・`Access.tsx`・`Tokusho.tsx` |
| sitemap の更新日 | `lib/routes.ts`（静的ページの `updated` / CMS ページの `tables`）、`lib/content.ts` の `getLastModified()`、`app/sitemap.ts` |
| 記事の個別ページ | `app/news/[slug]/page.tsx`・`app/useful/[slug]/page.tsx`・`components/ArticleDetail.tsx`・`components/ArticleJsonLd.tsx`・`lib/articles.ts` |
| 記事の slug | DB：`supabase/migrations/20261002000000_add_article_slugs.sql`／管理画面：`lib/admin-forms.ts`（URL欄）・`lib/admin-resources.ts`（`prepareSlug()`） |
| FAQ の一元管理・展開 | `lib/faqs.ts`・`components/FaqSection.tsx`（トップ・メニュー・ブランド・アクセス・予約） |
| llms.txt | `app/llms.txt/route.ts` |

**slug まわりの仕様**
- URL は `/news/<slug>`・`/useful/<slug>`。slug がない記事は ID で表示し、slug があるのに ID の URL で来たら slug の URL へ 308 リダイレクト（URL を1つに統一）。
- 管理画面で URL 欄を空欄のまま新規保存すると `公開日-ランダム8文字`（例：`20261002-1a2b3c4d`）を自動で付ける。
- 編集時に URL 欄を空にしても、既存の URL は消さない（リンク切れ防止）。
- 重複した slug で保存しようとすると「このURL（スラッグ）は既に使われています」と表示する。

