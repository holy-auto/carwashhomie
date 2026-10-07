import Link from "next/link";
import { BUSINESS } from "@/lib/constants";
import { formatDate } from "@/lib/format";
import ArticleBodyCards from "@/components/collection/ArticleBodyCards";

/* Single-post layout shared by /news/<slug> and /useful/<slug>.
   Server Component: the whole article is in the initial HTML so
   crawlers and LLM answer engines read it without running JS.
   `dark` matches the お知らせ list, `light` the お役立ち情報 list. */

type Props = {
  theme: "dark" | "light";
  /** Small English label above the title (e.g. "News"). */
  eyebrow: string;
  title: string;
  category?: string | null;
  publishedAt: string;
  updatedAt?: string | null;
  image?: string | null;
  lead?: string | null;
  body?: string | null;
  /** Show the director as the author (E-E-A-T) — for editorial posts. */
  showAuthor?: boolean;
  /** Hide one random collectible card somewhere in the body (お役立ち記事). */
  huntCards?: boolean;
  back: { href: string; label: string };
};

const THEMES = {
  dark: {
    section: "bg-midnight grain",
    eyebrow: "text-chrome/60",
    rule: "bg-chrome/20",
    title: "text-cream",
    meta: "text-chrome/60",
    lead: "text-sunset",
    body: "text-chrome/85",
    card: "border-sunset/20 bg-gradient-to-b from-midnight-50/20 to-midnight-100/40",
    link: "text-chrome/70 hover:text-sunset",
    divider: "border-chrome/10",
  },
  light: {
    section: "bg-cream",
    eyebrow: "text-midnight/50",
    rule: "bg-midnight/30",
    title: "text-midnight",
    meta: "text-midnight/50",
    lead: "text-sunset/90",
    body: "text-midnight/80",
    card: "border-midnight/10 bg-white shadow-clinic",
    link: "text-midnight/60 hover:text-sunset",
    divider: "border-midnight/10",
  },
} as const;

export default function ArticleDetail({
  theme,
  eyebrow,
  title,
  category,
  publishedAt,
  updatedAt,
  image,
  lead,
  body,
  showAuthor,
  huntCards,
  back,
}: Props) {
  const t = THEMES[theme];
  const published = formatDate(publishedAt);
  const updated = formatDate(updatedAt);
  const showUpdated = updated && updated !== published;

  return (
    <section className={`relative py-20 md:py-28 overflow-hidden ${t.section}`}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-sunset/[0.08] rounded-full blur-3xl pointer-events-none" />

      <article className="relative max-w-3xl mx-auto px-6 lg:px-12">
        <header className="mb-10">
          <div
            className={`inline-flex items-center gap-3 text-[9px] tracking-[0.3em] uppercase font-pixel mb-4 ${t.eyebrow}`}
          >
            <div className={`w-8 h-[1px] ${t.rule}`} />
            {eyebrow}
          </div>

          <h1
            className={`font-display text-[1.75rem] md:text-4xl leading-snug mb-5 ${t.title}`}
          >
            {title}
          </h1>

          <div
            className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-xs ${t.meta}`}
          >
            {category && (
              <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-sunset text-midnight">
                {category}
              </span>
            )}
            {published && (
              <span>
                公開日 <time dateTime={publishedAt}>{published}</time>
              </span>
            )}
            {showUpdated && updatedAt && (
              <span>
                更新日 <time dateTime={updatedAt}>{updated}</time>
              </span>
            )}
            {showAuthor && (
              <span>
                執筆：
                <Link href="/doctor" className="underline underline-offset-2 hover:text-sunset">
                  院長 {BUSINESS.operator}（{BUSINESS.operatorTitle}）
                </Link>
              </span>
            )}
          </div>
        </header>

        <div className={`rounded-2xl border p-6 md:p-10 ${t.card}`}>
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={title}
              className="w-full rounded-xl mb-8 border border-sunset/10"
            />
          )}

          {lead && (
            <p
              className={`text-base md:text-lg font-semibold leading-relaxed mb-6 font-readable ${t.lead}`}
            >
              {lead}
            </p>
          )}

          {body && (
            <div
              className={`text-sm md:text-base leading-loose whitespace-pre-wrap font-readable ${t.body}`}
            >
              {huntCards ? <ArticleBodyCards text={body} /> : body}
            </div>
          )}
        </div>

        <footer
          className={`mt-10 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-6 ${t.divider}`}
        >
          <Link href={back.href} className={`text-sm transition-colors ${t.link}`}>
            ← {back.label}
          </Link>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/menu" className={`text-sm transition-colors ${t.link}`}>
              施術メニュー・料金を見る
            </Link>
            <Link href="/reservation" className="btn-90s justify-center !inline-flex">
              <span className="w-2 h-2 rounded-full bg-midnight animate-pulse" />
              無料カウンセリングを予約
              <span>▶</span>
            </Link>
          </div>
        </footer>
      </article>
    </section>
  );
}
