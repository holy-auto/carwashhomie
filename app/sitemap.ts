import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { STATIC_ROUTES } from "@/lib/routes";
import {
  articlePath,
  getLastModified,
  getNewsPosts,
  getUsefulArticles,
} from "@/lib/content";

/* Regenerate at most hourly instead of hitting Supabase per request. */
export const revalidate = 3600;

/** A post's lastmod: its own updated_at, else its publish date. */
function postDate(post: { updated_at?: string | null; published_at: string }) {
  const d = new Date(post.updated_at || post.published_at);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

/* lastmod is the date the content REALLY changed (see lib/routes.ts):
   fixed dates for hand-maintained pages, the newest DB updated_at for
   CMS pages and each article. Unknown → omitted, never "now". */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [staticEntries, news, useful] = await Promise.all([
    Promise.all(
      STATIC_ROUTES.map(async (r) => ({
        url: `${SITE.url}${r.path}`,
        lastModified: r.tables
          ? await getLastModified(r.tables)
          : r.updated
            ? new Date(r.updated)
            : undefined,
        changeFrequency: r.changeFrequency,
        priority: r.priority,
      })),
    ),
    getNewsPosts(),
    getUsefulArticles(),
  ]);

  const articleEntries: MetadataRoute.Sitemap = [
    ...news.map((post) => ({
      url: `${SITE.url}${articlePath("news", post)}`,
      lastModified: postDate(post),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...useful.map((article) => ({
      url: `${SITE.url}${articlePath("useful", article)}`,
      lastModified: postDate(article),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return [...staticEntries, ...articleEntries];
}
