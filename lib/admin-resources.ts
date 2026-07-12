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
    label: "施術事例",
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
    label: "メニュー：洗車サービス",
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
