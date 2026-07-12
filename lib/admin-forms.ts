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
    defaults: { published: true, sort_order: 0 },
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
        name: "sort_order",
        label: "表示順",
        type: "number",
        help: "小さいほど上に表示されます。",
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
    defaults: { published: true, rank: 1, sort_order: 0, name: "ボディコーティング" },
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
        help: "小さいほど左（先）に表示されます。",
      },
      { name: "published", label: "公開する", type: "checkbox" },
    ],
  },
  "menu-wash": {
    key: "menu-wash",
    label: "メニュー：洗車サービス",
    titleField: "name",
    subtitleField: "price",
    defaults: { published: true, sort_order: 0 },
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
        help: "小さいほど先に表示されます。",
      },
      {
        name: "published",
        label: "公開する",
        type: "checkbox",
        help: "公開中のメニューが1件もない場合、洗車サービスの欄ごとサイトから非表示になります。",
      },
    ],
  },
  testimonials: {
    key: "testimonials",
    label: "お客様の声",
    titleField: "author_name",
    subtitleField: "title",
    defaults: { published: true, rating: 5, sort_order: 0 },
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
        help: "小さいほど先に表示されます。",
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
