/* Content layer for the marketing site.

   Public pages call these helpers from Server Components. Each one
   reads PUBLISHED rows from Supabase; if Supabase isn't configured
   yet, or no rows exist, it returns the built-in defaults so the
   site never looks empty. The admin panel writes through the
   /api/admin route handlers instead. */

import { getPublicClient } from "@/lib/supabase";

export type GalleryCase = {
  id: string;
  code: string | null;
  title: string;
  model: string | null;
  service: string | null;
  before_note: string | null;
  after_note: string | null;
  before_image_url: string | null;
  after_image_url: string | null;
  before_color: string | null;
  after_color: string | null;
  sort_order: number;
  published: boolean;
};

export type NewsPost = {
  id: string;
  title: string;
  body: string | null;
  image_url: string | null;
  published: boolean;
  published_at: string;
};

export type BodyCoating = {
  id: string;
  code: string | null;
  class_label: string | null;
  rank: number;
  name: string;
  price: string | null;
  duration: string | null;
  /** One feature per line. */
  features: string | null;
  tag: string | null;
  sort_order: number;
  published: boolean;
};

export type WashService = {
  id: string;
  code: string | null;
  name: string;
  subtitle: string | null;
  description: string | null;
  price: string | null;
  note: string | null;
  icon: string | null;
  tag: string | null;
  sort_order: number;
  published: boolean;
};

export type Testimonial = {
  id: string;
  author_name: string;
  car_model: string | null;
  treatment: string | null;
  rating: number;
  title: string | null;
  body: string;
  sort_order: number;
  published: boolean;
};

/** お役立ち情報（ブログ=お知らせとは別のコンテンツ枠）。 */
export type UsefulArticle = {
  id: string;
  title: string;
  category: string | null;
  excerpt: string | null;
  body: string | null;
  image_url: string | null;
  sort_order: number;
  published: boolean;
  published_at: string;
};

/** 内装コーティング料金表の1行（車種 × 施工範囲）。 */
export type InteriorCoating = {
  id: string;
  car_type: string;
  price_driver: string | null;
  price_pair: string | null;
  price_full: string | null;
  sort_order: number;
  published: boolean;
};

/** 内装オプション / ガラスコーティング 共通の料金行。 */
export type PriceLine = {
  id: string;
  label: string;
  price: string | null;
  note: string | null;
  sort_order: number;
  published: boolean;
};

/** ホイールコーティング料金行（group_label でグループ表示）。 */
export type WheelCoating = PriceLine & {
  group_label: string | null;
};

/* ─────────────────────────── Defaults ─────────────────────────── */

/** Shown until the client adds their own cases in the admin panel. */
export const DEFAULT_CASES: GalleryCase[] = [
  {
    id: "default-1",
    code: "CASE-01",
    title: "塗装くすみの改善",
    model: "施行車両",
    service: "磨き + ガラスコーティング",
    before_note: "塗装のくすみ・水垢が目立つ状態。年式相応の経年劣化。",
    after_note: "鏡面仕上げで深みのある艶が復活。コーティングで長期保護。",
    before_image_url: null,
    after_image_url: null,
    before_color: "#5a4a3a",
    after_color: "#ff6b1a",
    sort_order: 1,
    published: true,
  },
  {
    id: "default-2",
    code: "CASE-02",
    title: "ボディの艶感復元",
    model: "施行車両",
    service: "研磨 + セラミックコーティング",
    before_note: "経年劣化と洗車傷による塗装面の白ボケ。光沢感の低下。",
    after_note:
      "研磨で傷を除去し、セラミックコーティングで新車以上の仕上がりに。",
    before_image_url: null,
    after_image_url: null,
    before_color: "#6b5847",
    after_color: "#ffb347",
    sort_order: 2,
    published: true,
  },
  {
    id: "default-3",
    code: "CASE-03",
    title: "ヘッドライト黄ばみ除去",
    model: "施行車両",
    service: "ヘッドライトリペア",
    before_note: "紫外線による黄ばみ・くすみで透明感を失った状態。",
    after_note: "クリアな透明感と明るさが完全復活。夜間の視認性も向上。",
    before_image_url: null,
    after_image_url: null,
    before_color: "#3d3028",
    after_color: "#e8e8ec",
    sort_order: 3,
    published: true,
  },
];

/** Shown until the client adds their own testimonials. */
export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "default-1",
    author_name: "K.T 様",
    car_model: "レクサス RX",
    treatment: "ガラスコーティング",
    rating: 5,
    title: "もう他のお店には戻れません",
    body: "新車購入時にコーティングをお願いしました。仕上がりの艶感が全く違います。カウンセリングも丁寧で、塗装状態をしっかり説明してくれるのが安心。美容外科というコンセプト、まさにその通りの施術でした。",
    sort_order: 1,
    published: true,
  },
  {
    id: "default-2",
    author_name: "M.S 様",
    car_model: "BMW 5シリーズ",
    treatment: "磨き + セラミックコーティング",
    rating: 5,
    title: "ボディの透明感が別物",
    body: "3年落ちのくすみが気になっていましたが、施術後は新車以上の輝き。駐車場で自分の車を二度見するようになりました。院長の仕事は本当に丁寧で芸術的です。",
    sort_order: 2,
    published: true,
  },
  {
    id: "default-3",
    author_name: "Y.H 様",
    car_model: "トヨタ アルファード",
    treatment: "室内クリーニング + コーティング",
    rating: 5,
    title: "家族全員で感動",
    body: "子供の食べこぼしで汚れていた室内が完全復活。ボディもピカピカに。「これ本当に同じ車？」と妻にも驚かれました。定期的にお世話になります！",
    sort_order: 3,
    published: true,
  },
];

/** Shown only while Supabase is not configured (local dev). Once the
    DB is wired up, the seeded rows there are the source of truth. */
export const DEFAULT_BODY_COATINGS: BodyCoating[] = [
  {
    id: "default-1",
    code: "RECON100",
    class_label: "1st Class",
    rank: 3,
    name: "ボディコーティング",
    price: "198,000円〜",
    duration: "4日〜",
    features: "長期保護\n高耐久・高光沢\nダメージ耐性向上",
    tag: "最高グレード",
    sort_order: 1,
    published: true,
  },
  {
    id: "default-2",
    code: "RECON80",
    class_label: "2nd Class",
    rank: 2,
    name: "ボディコーティング",
    price: "77,000円〜",
    duration: "1〜2日",
    features: "美観維持・回復\n車両日常使用向け\n耐酸性",
    tag: "人気",
    sort_order: 2,
    published: true,
  },
  {
    id: "default-3",
    code: "RECON50",
    class_label: "3rd Class",
    rank: 1,
    name: "ボディコーティング",
    price: "33,000円〜77,000円",
    duration: "1〜2日",
    features: "簡易コーティング\n1年耐久\nメンテナンス次第で持続可能",
    tag: null,
    sort_order: 3,
    published: true,
  },
];

/* The interior / glass / wheel price sections are always meant to be
   visible, so these built-in defaults are used whenever Supabase is
   not configured OR the table is empty. Once the client edits rows in
   the admin panel, those rows become the source of truth. The values
   mirror the rows seeded into Supabase. */

export const DEFAULT_INTERIOR_COATINGS: InteriorCoating[] = [
  { id: "default-1", car_type: "軽自動車", price_driver: "17,600円〜", price_pair: "29,700円〜", price_full: "41,800円〜", sort_order: 1, published: true },
  { id: "default-2", car_type: "小型車", price_driver: "23,100円〜", price_pair: "35,200円〜", price_full: "59,400円〜", sort_order: 2, published: true },
  { id: "default-3", car_type: "中型車", price_driver: "29,700円〜", price_pair: "53,900円〜", price_full: "83,600円〜", sort_order: 3, published: true },
  { id: "default-4", car_type: "高級車・外車等", price_driver: "35,200円〜", price_pair: "59,400円〜", price_full: "93,500円〜", sort_order: 4, published: true },
];

export const DEFAULT_INTERIOR_OPTIONS: PriceLine[] = [
  { id: "default-1", label: "3列シート", price: "23,100円〜", note: "※ハイエースなど", sort_order: 1, published: true },
  { id: "default-2", label: "コンビネーションシート", price: "+8,800円〜", note: null, sort_order: 2, published: true },
  { id: "default-3", label: "クリーニング", price: "2,200円〜/脚", note: null, sort_order: 3, published: true },
  { id: "default-4", label: "ドアトリム（1枚）", price: "7,150円〜", note: null, sort_order: 4, published: true },
  { id: "default-5", label: "センターコンソール", price: "5,940円〜", note: null, sort_order: 5, published: true },
  { id: "default-6", label: "ハンドル", price: "8,360円〜", note: null, sort_order: 6, published: true },
  { id: "default-7", label: "車内クリーニング", price: "22,000円〜", note: "ブロワー・ケミカル洗浄等", sort_order: 7, published: true },
  { id: "default-8", label: "車内清掃", price: "5,500円〜", note: "一般的な掃除機・窓拭き・パネル拭き", sort_order: 8, published: true },
];

export const DEFAULT_GLASS_COATINGS: PriceLine[] = [
  { id: "default-1", label: "フロントガラスのみ", price: "16,500円〜", note: "※サイズが大きい場合＋α", sort_order: 1, published: true },
  { id: "default-2", label: "全面", price: "33,000円〜", note: "※サイズが大きい場合／枚数が多い場合＋α", sort_order: 2, published: true },
];

export const DEFAULT_WHEEL_COATINGS: WheelCoating[] = [
  { id: "default-1", group_label: "お車についている状態", label: "新車 4本", price: "22,000円〜", note: "下地処理あり", sort_order: 1, published: true },
  { id: "default-2", group_label: "お車についている状態", label: "中古 4本", price: "要相談", note: "※脱着希望の場合は別途", sort_order: 2, published: true },
  { id: "default-3", group_label: "ホイール持ち込み（表裏施工）", label: "新品 4本", price: "33,000円〜", note: "下地処理あり", sort_order: 3, published: true },
  { id: "default-4", group_label: "ホイール持ち込み（表裏施工）", label: "中古 4本", price: "状態により要相談", note: null, sort_order: 4, published: true },
];

/* Fetchers below are called from `force-dynamic` Server Components so
   the client's edits appear right away rather than on next deploy. */

/* ─────────────────────────── Fetchers ─────────────────────────── */

export async function getGalleryCases(): Promise<GalleryCase[]> {
  const supabase = getPublicClient();
  if (!supabase) return DEFAULT_CASES;

  const { data, error } = await supabase
    .from("gallery_cases")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getGalleryCases:", error.message);
    return DEFAULT_CASES;
  }
  return data && data.length > 0 ? (data as GalleryCase[]) : DEFAULT_CASES;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = getPublicClient();
  if (!supabase) return DEFAULT_TESTIMONIALS;

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getTestimonials:", error.message);
    return DEFAULT_TESTIMONIALS;
  }
  return data && data.length > 0
    ? (data as Testimonial[])
    : DEFAULT_TESTIMONIALS;
}

/* For the /menu page the DB is the source of truth: what's published
   in the admin panel is exactly what shows on the site. An empty list
   hides the section instead of resurrecting hard-coded defaults. */

export async function getBodyCoatings(): Promise<BodyCoating[]> {
  const supabase = getPublicClient();
  if (!supabase) return DEFAULT_BODY_COATINGS;

  const { data, error } = await supabase
    .from("body_coatings")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getBodyCoatings:", error.message);
    return DEFAULT_BODY_COATINGS;
  }
  return (data ?? []) as BodyCoating[];
}

export async function getWashServices(): Promise<WashService[]> {
  const supabase = getPublicClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("wash_services")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getWashServices:", error.message);
    return [];
  }
  return (data ?? []) as WashService[];
}

export async function getNewsPosts(): Promise<NewsPost[]> {
  const supabase = getPublicClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("news_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("getNewsPosts:", error.message);
    return [];
  }
  return (data ?? []) as NewsPost[];
}

/* お役立ち情報 — お知らせ（ブログ）とは別枠のコンテンツ。公開行が
   無ければ空配列を返し、ページ側で「準備中」を表示する。 */
export async function getUsefulArticles(): Promise<UsefulArticle[]> {
  const supabase = getPublicClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("useful_articles")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("published_at", { ascending: false });

  if (error) {
    console.error("getUsefulArticles:", error.message);
    return [];
  }
  return (data ?? []) as UsefulArticle[];
}

/* Interior / glass / wheel price sections are always visible: an empty
   or unconfigured table falls back to the built-in defaults so the
   /menu page never loses these blocks. */

export async function getInteriorCoatings(): Promise<InteriorCoating[]> {
  const supabase = getPublicClient();
  if (!supabase) return DEFAULT_INTERIOR_COATINGS;

  const { data, error } = await supabase
    .from("interior_coatings")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getInteriorCoatings:", error.message);
    return DEFAULT_INTERIOR_COATINGS;
  }
  return data && data.length > 0
    ? (data as InteriorCoating[])
    : DEFAULT_INTERIOR_COATINGS;
}

export async function getInteriorOptions(): Promise<PriceLine[]> {
  const supabase = getPublicClient();
  if (!supabase) return DEFAULT_INTERIOR_OPTIONS;

  const { data, error } = await supabase
    .from("interior_options")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getInteriorOptions:", error.message);
    return DEFAULT_INTERIOR_OPTIONS;
  }
  return data && data.length > 0
    ? (data as PriceLine[])
    : DEFAULT_INTERIOR_OPTIONS;
}

export async function getGlassCoatings(): Promise<PriceLine[]> {
  const supabase = getPublicClient();
  if (!supabase) return DEFAULT_GLASS_COATINGS;

  const { data, error } = await supabase
    .from("glass_coatings")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getGlassCoatings:", error.message);
    return DEFAULT_GLASS_COATINGS;
  }
  return data && data.length > 0
    ? (data as PriceLine[])
    : DEFAULT_GLASS_COATINGS;
}

export async function getWheelCoatings(): Promise<WheelCoating[]> {
  const supabase = getPublicClient();
  if (!supabase) return DEFAULT_WHEEL_COATINGS;

  const { data, error } = await supabase
    .from("wheel_coatings")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getWheelCoatings:", error.message);
    return DEFAULT_WHEEL_COATINGS;
  }
  return data && data.length > 0
    ? (data as WheelCoating[])
    : DEFAULT_WHEEL_COATINGS;
}
