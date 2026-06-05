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
