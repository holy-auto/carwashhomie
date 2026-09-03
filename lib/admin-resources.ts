/* Whitelist of editable resources for the admin API.

   Keyed by the URL segment (/api/admin/<resource>). Only the columns
   listed in `fields` are accepted from the client, which keeps the
   generic route handlers safe from arbitrary column writes. */

export type ResourceConfig = {
  table: string;
  /** Columns the client may write (create/update). */
  fields: readonly string[];
  /** Numeric columns — coerced from strings/blanks. */
  numericFields?: readonly string[];
  /** Boolean columns — coerced from checkbox values. */
  booleanFields?: readonly string[];
  order: { column: string; ascending: boolean };
  /** Automatic numbering for the display-order column.

     When the client leaves the column blank, the API fills it in:
     - "start" → the row goes to the FRONT (blog-like content, so a
       new post shows up first without touching the older ones).
     - "end"   → the row is appended after the current last row
       (menus and other hand-curated lists). */
  autoNumber?: { column: string; position: "start" | "end" };
  /** Human label used in the UI. */
  label: string;
};

export const RESOURCES: Record<string, ResourceConfig> = {
  gallery: {
    table: "gallery_cases",
    fields: [
      "code",
      "title",
      "model",
      "service",
      "before_note",
      "after_note",
      "before_image_url",
      "after_image_url",
      "before_color",
      "after_color",
      "sort_order",
      "published",
    ],
    numericFields: ["sort_order"],
    booleanFields: ["published"],
    order: { column: "sort_order", ascending: true },
    autoNumber: { column: "sort_order", position: "start" },
    label: "症例カルテ",
  },
  news: {
    table: "news_posts",
    fields: ["title", "body", "image_url", "published", "published_at"],
    booleanFields: ["published"],
    order: { column: "published_at", ascending: false },
    label: "お知らせ・更新",
  },
  "menu-body": {
    table: "body_coatings",
    fields: [
      "code",
      "class_label",
      "rank",
      "name",
      "price",
      "duration",
      "features",
      "tag",
      "sort_order",
      "published",
    ],
    numericFields: ["rank", "sort_order"],
    booleanFields: ["published"],
    order: { column: "sort_order", ascending: true },
    autoNumber: { column: "sort_order", position: "end" },
    label: "メニュー：ボディコーティング",
  },
  "menu-wash": {
    table: "wash_services",
    fields: [
      "code",
      "name",
      "subtitle",
      "description",
      "price",
      "note",
      "icon",
      "tag",
      "sort_order",
      "published",
    ],
    numericFields: ["sort_order"],
    booleanFields: ["published"],
    order: { column: "sort_order", ascending: true },
    autoNumber: { column: "sort_order", position: "end" },
    label: "メニュー：洗車サービス",
  },
  useful: {
    table: "useful_articles",
    fields: [
      "title",
      "category",
      "excerpt",
      "body",
      "image_url",
      "sort_order",
      "published",
      "published_at",
    ],
    numericFields: ["sort_order"],
    booleanFields: ["published"],
    order: { column: "sort_order", ascending: true },
    autoNumber: { column: "sort_order", position: "start" },
    label: "ホームケア処方箋",
  },
  "menu-interior": {
    table: "interior_coatings",
    fields: [
      "car_type",
      "price_driver",
      "price_pair",
      "price_full",
      "sort_order",
      "published",
    ],
    numericFields: ["sort_order"],
    booleanFields: ["published"],
    order: { column: "sort_order", ascending: true },
    autoNumber: { column: "sort_order", position: "end" },
    label: "メニュー：内装コーティング料金表",
  },
  "menu-interior-options": {
    table: "interior_options",
    fields: ["label", "price", "note", "sort_order", "published"],
    numericFields: ["sort_order"],
    booleanFields: ["published"],
    order: { column: "sort_order", ascending: true },
    autoNumber: { column: "sort_order", position: "end" },
    label: "メニュー：内装オプション",
  },
  "menu-glass": {
    table: "glass_coatings",
    fields: ["label", "price", "note", "sort_order", "published"],
    numericFields: ["sort_order"],
    booleanFields: ["published"],
    order: { column: "sort_order", ascending: true },
    autoNumber: { column: "sort_order", position: "end" },
    label: "メニュー：ガラスコーティング",
  },
  "menu-wheel": {
    table: "wheel_coatings",
    fields: ["group_label", "label", "price", "note", "sort_order", "published"],
    numericFields: ["sort_order"],
    booleanFields: ["published"],
    order: { column: "sort_order", ascending: true },
    autoNumber: { column: "sort_order", position: "end" },
    label: "メニュー：ホイールコーティング",
  },
  "menu-b2b": {
    table: "b2b_services",
    fields: ["title", "subtitle", "sort_order", "published"],
    numericFields: ["sort_order"],
    booleanFields: ["published"],
    order: { column: "sort_order", ascending: true },
    autoNumber: { column: "sort_order", position: "end" },
    label: "メニュー：業者様向けご依頼",
  },
  "menu-brands": {
    table: "brands",
    fields: ["name", "region", "label", "sort_order", "published"],
    numericFields: ["sort_order"],
    booleanFields: ["published"],
    order: { column: "sort_order", ascending: true },
    autoNumber: { column: "sort_order", position: "end" },
    label: "メニュー：取り扱いブランド",
  },
  testimonials: {
    table: "testimonials",
    fields: [
      "author_name",
      "car_model",
      "treatment",
      "rating",
      "title",
      "body",
      "sort_order",
      "published",
    ],
    numericFields: ["rating", "sort_order"],
    booleanFields: ["published"],
    order: { column: "sort_order", ascending: true },
    autoNumber: { column: "sort_order", position: "end" },
    label: "お客様の声",
  },
};

export function getResource(name: string): ResourceConfig | null {
  return Object.prototype.hasOwnProperty.call(RESOURCES, name)
    ? RESOURCES[name]
    : null;
}

/** Pick + coerce only the whitelisted fields from a request body. */
export function sanitizeBody(
  cfg: ResourceConfig,
  body: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const field of cfg.fields) {
    if (!(field in body)) continue;
    let value = body[field];

    if (cfg.numericFields?.includes(field)) {
      if (value === "" || value === null || value === undefined) {
        value = null;
      } else {
        const n = Number(value);
        value = Number.isFinite(n) ? n : null;
      }
    } else if (cfg.booleanFields?.includes(field)) {
      value = value === true || value === "true" || value === "on";
    } else if (typeof value === "string") {
      const trimmed = value.trim();
      value = trimmed === "" ? null : trimmed;
    }

    out[field] = value;
  }
  return out;
}

/* ── Auto numbering ───────────────────────────────────────────────
   The 表示順 field is optional in the admin form: when it is left
   blank the API assigns the next number itself (see lib/admin-sort). */

/** Create: a missing OR blank value means "number it for me". */
export function needsAutoNumberOnCreate(
  cfg: ResourceConfig,
  values: Record<string, unknown>,
): boolean {
  const column = cfg.autoNumber?.column;
  if (!column) return false;
  return values[column] == null;
}

/** Update: only a value the editor explicitly cleared is re-numbered —
    a column that was not sent at all must stay untouched. */
export function needsAutoNumberOnUpdate(
  cfg: ResourceConfig,
  values: Record<string, unknown>,
): boolean {
  const column = cfg.autoNumber?.column;
  if (!column) return false;
  return column in values && values[column] == null;
}
