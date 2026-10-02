/* Pure helpers for news / useful article URLs and summaries.
   Kept free of server imports so Client Components (the list cards)
   can use them without bundling the Supabase client. */

export type ArticleKind = "news" | "useful";

/** The URL segment for a post: its slug, or its id when none is set. */
export function articleKey(post: { id: string; slug?: string | null }): string {
  return post.slug || post.id;
}

/** Public path of a post, e.g. /useful/20261002-1a2b3c4d */
export function articlePath(
  kind: ArticleKind,
  post: { id: string; slug?: string | null },
): string {
  return `/${kind}/${articleKey(post)}`;
}

/** Plain-text summary for meta descriptions and list cards. */
export function excerptOf(
  post: { excerpt?: string | null; body: string | null },
  max = 120,
): string {
  const src = (post.excerpt || post.body || "").replace(/\s+/g, " ").trim();
  return src.length > max ? `${src.slice(0, max)}…` : src;
}
