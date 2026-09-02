/* Form schemas that drive the admin editor UI. Kept separate from
   the server-side write whitelist (admin-resources.ts) and free of
   any server imports so it is safe to use in Client Components. */

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "checkbox"
  | "image"
  | "color"
  | "datetime";

export type FormField = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  help?: string;
};

export type FormSchema = {
  key: string;
  label: string;
  /** Field used as the row title in the list view. */
  titleField: string;
  /** Optional secondary line in the list view. */
  subtitleField?: string;
  /** Default values applied when creating a new row. */
  defaults: Record<string, unknown>;
  fields: FormField[];
};

export const FORM_SCHEMAS: Record<string, FormSchema> = {
  gallery: {
    key: "gallery",
    label: "施術事例",
    titleField: "title",
    subtitleField: "service",
    defaults: { published: true },
    fields: [
      { name: "title", label: "タイトル", type: "text", placeholder: "塗装くすみの改善" },
      { name: "code", label: "事例番号", type: "text", placeholder: "CASE-01（任意）" },
      { name: "model", label: "車種", type: "text", placeholder: "施行車両 / レクサス RX など" },
      { name: "service", label: "施術内容", type: "text", placeholder: "磨き + ガラスコーティング" },
      {
        name: "before_image_url",
        label: "Before 画像",
        type: "image",
        help: "未設定の場合は下の Before カラーで表示されます。",
      },
      {
        name: "after_image_url",
        label: "After 画像",
        type: "image",
        help: "未設定の場合は下の After カラーで表示されます。",
      },
      { name: "before_note", label: "施術前メモ", type: "textarea" },
      { name: "after_note", label: "施術後メモ", type: "textarea" },
      { name: "before_color", label: "Before カラー（画像なし時）", type: "color" },
      { name: "after_color", label: "After カラー（画像なし時）", type: "color" },
      {
        name: "card_code",
        label: "潜ませるカード（コード）",
        type: "text",
        placeholder: "CASE-01（任意）",
        help: "コレクションカードのコードを入れると、この事例にカードが1枚出現します。",
      },
      {
        name: "sort_order",
        label: "表示順",
        type: "number",
        placeholder: "自動採番",
        help: "小さいほど上に表示されます。空欄のまま保存すると自動で採番され、新しいものが先頭に入ります。",
      },
      { name: "published", label: "公開する", type: "checkbox" },
    ],
  },
  news: {
    key: "news",
    label: "お知らせ・更新",
    titleField: "title",
    subtitleField: "published_at",
    defaults: { published: true },
    fields: [
      { name: "title", label: "タイトル", type: "text", placeholder: "年末年始の営業について" },
      { name: "body", label: "本文", type: "textarea", placeholder: "本文を入力…" },
      { name: "image_url", label: "画像", type: "image" },
      {
        name: "published_at",
        label: "公開日時",
        type: "datetime",
        help: "未来の日時にすると、その日付で並びます。",
      },
      { name: "published", label: "公開する", type: "checkbox" },
    ],
  },
  "menu-body": {
    key: "menu-body",
    label: "メニュー：ボディコーティング",
    titleField: "name",
    subtitleField: "price",
    defaults: { published: true, rank: 1, name: "ボディコーティング" },
    fields: [
      { name: "name", label: "メニュー名", type: "text", placeholder: "ボディコーティング" },
      { name: "class_label", label: "クラス表記", type: "text", placeholder: "1st Class / 2nd Class など" },
      { name: "code", label: "コード", type: "text", placeholder: "RECON100（任意）" },
      {
        name: "rank",
        label: "星の数（1〜3）",
        type: "number",
        help: "3にすると最上位グレードのデザイン（黒背景）で表示されます。",
      },
      { name: "price", label: "料金", type: "text", placeholder: "198,000円〜" },
      { name: "duration", label: "施工日数", type: "text", placeholder: "1〜2日" },
      {
        name: "features",
        label: "特徴",
        type: "textarea",
        placeholder: "長期保護\n高耐久・高光沢",
        help: "1行につき1つの特徴を入力してください。",
      },
      { name: "tag", label: "バッジ", type: "text", placeholder: "人気 / 最高グレード（任意）" },
      {
        name: "sort_order",
        label: "表示順",
        type: "number",
        placeholder: "自動採番",
        help: "小さいほど左（先）に表示されます。空欄のまま保存すると自動で採番され、末尾に追加されます。",
      },
      { name: "published", label: "公開する", type: "checkbox" },
    ],
  },
  "menu-wash": {
    key: "menu-wash",
    label: "メニュー：洗車サービス",
    titleField: "name",
    subtitleField: "price",
    defaults: { published: true },
    fields: [
      { name: "name", label: "メニュー名", type: "text", placeholder: "例: プレミアム洗車" },
      { name: "subtitle", label: "英語サブタイトル", type: "text", placeholder: "Simple Hand Wash（任意）" },
      { name: "code", label: "コード", type: "text", placeholder: "WS-001（任意）" },
      { name: "description", label: "説明文", type: "textarea" },
      { name: "price", label: "料金", type: "text", placeholder: "¥3,500〜" },
      { name: "note", label: "注記", type: "text", placeholder: "※問診にて価格変動のご相談あり（任意）" },
      { name: "icon", label: "アイコン絵文字", type: "text", placeholder: "🧽" },
      { name: "tag", label: "バッジ", type: "text", placeholder: "雨の日限定（任意）" },
      {
        name: "sort_order",
        label: "表示順",
        type: "number",
        placeholder: "自動採番",
        help: "小さいほど先に表示されます。空欄のまま保存すると自動で採番され、末尾に追加されます。",
      },
      {
        name: "published",
        label: "公開する",
        type: "checkbox",
        help: "公開中のメニューが1件もない場合、洗車サービスの欄ごとサイトから非表示になります。",
      },
    ],
  },
  useful: {
    key: "useful",
    label: "お役立ち情報",
    titleField: "title",
    subtitleField: "category",
    defaults: { published: true },
    fields: [
      { name: "title", label: "タイトル", type: "text", placeholder: "洗車キズを防ぐ正しい拭き上げ方" },
      { name: "category", label: "カテゴリ", type: "text", placeholder: "洗車のコツ / メンテナンス（任意）" },
      {
        name: "excerpt",
        label: "リード文（一覧の要約）",
        type: "textarea",
        placeholder: "一覧に表示される短い紹介文（任意）",
        help: "未入力の場合は本文の冒頭が使われます。",
      },
      { name: "body", label: "本文", type: "textarea", placeholder: "本文を入力…" },
      { name: "image_url", label: "画像", type: "image" },
      {
        name: "card_code",
        label: "潜ませるカード（コード）",
        type: "text",
        placeholder: "WASH-01（任意）",
        help: "コレクションカードのコードを入れると、この記事にカードが1枚出現します。",
      },
      {
        name: "published_at",
        label: "公開日時",
        type: "datetime",
        help: "未来の日時にすると、その日付で表示されます。",
      },
      {
        name: "sort_order",
        label: "表示順",
        type: "number",
        placeholder: "自動採番",
        help: "小さいほど先（上）に表示されます。同順の場合は新しい日付が先。空欄のまま保存すると自動で採番され、新しいものが先頭に入ります。",
      },
      { name: "published", label: "公開する", type: "checkbox" },
    ],
  },
  cards: {
    key: "cards",
    label: "コレクションカード",
    titleField: "name",
    subtitleField: "code",
    defaults: {
      published: true,
      rarity: "N",
      count_weight: 1,
      instant_reward: false,
      sort_order: 0,
    },
    fields: [
      { name: "name", label: "カード名", type: "text", placeholder: "洗車の基本" },
      { name: "code", label: "コード（取得判定のキー・右上表示）", type: "text", placeholder: "WASH-01" },
      {
        name: "card_number",
        label: "番号（左上・図鑑No.）",
        type: "number",
        placeholder: "101",
      },
      {
        name: "rarity",
        label: "レアリティ",
        type: "text",
        placeholder: "N / R / SR / SS",
        help: "N=ノーマル / R=レア / SR=限定 / SS=シークレット。枠の色が変わります。",
      },
      { name: "category", label: "カテゴリ", type: "text", placeholder: "洗車 / コーティング（任意）" },
      {
        name: "description",
        label: "説明（カード下段＝ブックで読める要約）",
        type: "textarea",
        placeholder: "洗車お役立ち要約を1〜3行で…",
      },
      {
        name: "hint",
        label: "未取得時のヒント",
        type: "textarea",
        placeholder: "「どのあたりにありそう」を案内（任意）",
      },
      {
        name: "image_url",
        label: "イラスト画像（中段）",
        type: "image",
        help: "未設定の場合は下のアクセントカラーで表示されます。",
      },
      { name: "accent_color", label: "アクセントカラー（画像なし時）", type: "color" },
      {
        name: "count_weight",
        label: "カウント重み",
        type: "number",
        help: "コンプ判定での重み。易しいカードは 0.5（＝2枚で1カウント）など小さく。",
      },
      {
        name: "instant_reward",
        label: "単体で特典（SS等）",
        type: "checkbox",
        help: "オンにすると、この1枚を取得した時点で特典対象になります。",
      },
      { name: "series", label: "シリーズ", type: "text", placeholder: "洗車の基本 / 季節限定（任意）" },
      {
        name: "sort_order",
        label: "表示順",
        type: "number",
        help: "小さいほど先（ブックの左上寄り）に表示されます。",
      },
      { name: "published", label: "公開する", type: "checkbox" },
    ],
  },
  "menu-interior": {
    key: "menu-interior",
    label: "メニュー：内装コーティング料金表",
    titleField: "car_type",
    subtitleField: "price_driver",
    defaults: { published: true },
    fields: [
      { name: "car_type", label: "車種", type: "text", placeholder: "軽自動車 / 小型車 / 中型車 など" },
      { name: "price_driver", label: "運転席のみ", type: "text", placeholder: "17,600円〜" },
      { name: "price_pair", label: "運転席＋助手席", type: "text", placeholder: "29,700円〜" },
      { name: "price_full", label: "前後の場合", type: "text", placeholder: "41,800円〜" },
      {
        name: "sort_order",
        label: "表示順",
        type: "number",
        placeholder: "自動採番",
        help: "小さいほど上の行に表示されます。空欄のまま保存すると自動で採番され、末尾に追加されます。",
      },
      { name: "published", label: "公開する", type: "checkbox" },
    ],
  },
  "menu-interior-options": {
    key: "menu-interior-options",
    label: "メニュー：内装オプション",
    titleField: "label",
    subtitleField: "price",
    defaults: { published: true },
    fields: [
      { name: "label", label: "項目名", type: "text", placeholder: "3列シート" },
      { name: "price", label: "料金", type: "text", placeholder: "23,100円〜" },
      { name: "note", label: "注記", type: "text", placeholder: "※ハイエースなど（任意）" },
      {
        name: "sort_order",
        label: "表示順",
        type: "number",
        placeholder: "自動採番",
        help: "小さいほど先に表示されます。空欄のまま保存すると自動で採番され、末尾に追加されます。",
      },
      { name: "published", label: "公開する", type: "checkbox" },
    ],
  },
  "menu-glass": {
    key: "menu-glass",
    label: "メニュー：ガラスコーティング",
    titleField: "label",
    subtitleField: "price",
    defaults: { published: true },
    fields: [
      { name: "label", label: "項目名", type: "text", placeholder: "フロントガラスのみ" },
      { name: "price", label: "料金", type: "text", placeholder: "16,500円〜" },
      { name: "note", label: "注記", type: "text", placeholder: "※サイズが大きい場合＋α（任意）" },
      {
        name: "sort_order",
        label: "表示順",
        type: "number",
        placeholder: "自動採番",
        help: "小さいほど先に表示されます。空欄のまま保存すると自動で採番され、末尾に追加されます。",
      },
      { name: "published", label: "公開する", type: "checkbox" },
    ],
  },
  "menu-wheel": {
    key: "menu-wheel",
    label: "メニュー：ホイールコーティング",
    titleField: "label",
    subtitleField: "group_label",
    defaults: { published: true },
    fields: [
      {
        name: "group_label",
        label: "グループ",
        type: "text",
        placeholder: "お車についている状態 / ホイール持ち込み（表裏施工）",
        help: "同じグループ名の項目がひとつの見出しにまとめて表示されます。",
      },
      { name: "label", label: "項目名", type: "text", placeholder: "新車 4本" },
      { name: "price", label: "料金", type: "text", placeholder: "22,000円〜 / 要相談 など" },
      { name: "note", label: "注記", type: "text", placeholder: "下地処理あり（任意）" },
      {
        name: "sort_order",
        label: "表示順",
        type: "number",
        placeholder: "自動採番",
        help: "小さいほど先に表示されます。グループもこの順で並びます。空欄のまま保存すると自動で採番され、末尾に追加されます。",
      },
      { name: "published", label: "公開する", type: "checkbox" },
    ],
  },
  "menu-b2b": {
    key: "menu-b2b",
    label: "メニュー：業者様向けご依頼",
    titleField: "title",
    subtitleField: "subtitle",
    defaults: { published: true },
    fields: [
      { name: "title", label: "項目名（日本語）", type: "text", placeholder: "技術講習依頼" },
      { name: "subtitle", label: "英語ラベル", type: "text", placeholder: "Training（任意）" },
      {
        name: "sort_order",
        label: "表示順",
        type: "number",
        placeholder: "自動採番",
        help: "小さいほど先に表示されます。空欄のまま保存すると自動で採番され、末尾に追加されます。",
      },
      { name: "published", label: "公開する", type: "checkbox" },
    ],
  },
  "menu-brands": {
    key: "menu-brands",
    label: "メニュー：取り扱いブランド",
    titleField: "name",
    subtitleField: "region",
    defaults: { published: true },
    fields: [
      { name: "name", label: "ブランド名", type: "text", placeholder: "Adam's Polishes" },
      { name: "region", label: "補足（産地・カテゴリ等）", type: "text", placeholder: "Premium Car Care, USA（任意）" },
      { name: "label", label: "バッジ", type: "text", placeholder: "埼玉 施工代理店（任意）" },
      {
        name: "sort_order",
        label: "表示順",
        type: "number",
        placeholder: "自動採番",
        help: "小さいほど先に表示されます。空欄のまま保存すると自動で採番され、末尾に追加されます。",
      },
      { name: "published", label: "公開する", type: "checkbox" },
    ],
  },
  testimonials: {
    key: "testimonials",
    label: "お客様の声",
    titleField: "author_name",
    subtitleField: "title",
    defaults: { published: true, rating: 5 },
    fields: [
      { name: "author_name", label: "お名前", type: "text", placeholder: "K.T 様" },
      { name: "car_model", label: "車種", type: "text", placeholder: "レクサス RX" },
      { name: "treatment", label: "受けた施術", type: "text", placeholder: "ガラスコーティング" },
      { name: "rating", label: "評価（1〜5）", type: "number" },
      { name: "title", label: "見出し", type: "text", placeholder: "もう他のお店には戻れません" },
      { name: "body", label: "本文", type: "textarea" },
      {
        name: "sort_order",
        label: "表示順",
        type: "number",
        placeholder: "自動採番",
        help: "小さいほど先に表示されます。空欄のまま保存すると自動で採番され、末尾に追加されます。",
      },
      { name: "published", label: "公開する", type: "checkbox" },
    ],
  },
};

export function getFormSchema(key: string): FormSchema | null {
  return Object.prototype.hasOwnProperty.call(FORM_SCHEMAS, key)
    ? FORM_SCHEMAS[key]
    : null;
}
