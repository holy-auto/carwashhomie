import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import ArticleDetail from "@/components/ArticleDetail";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import PinStripe from "@/components/PinStripe";
import { pageMetadata } from "@/lib/constants";
import {
  articleKey,
  articlePath,
  excerptOf,
  getUsefulArticleByKey,
} from "@/lib/content";

// Always reflect the latest edits made in the admin panel.
export const dynamic = "force-dynamic";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getUsefulArticleByKey(params.slug);
  if (!article) {
    return { title: "記事が見つかりません", robots: { index: false } };
  }
  return pageMetadata({
    title: article.title,
    description: excerptOf(article),
    path: articlePath("useful", article),
    keywords: article.category ? [article.category, "お役立ち情報"] : undefined,
    article: {
      image: article.image_url,
      publishedTime: article.published_at,
      modifiedTime: article.updated_at ?? undefined,
    },
  });
}

export default async function UsefulArticlePage({ params }: Props) {
  const article = await getUsefulArticleByKey(params.slug);
  if (!article) notFound();

  // A post reached by its id once it has a slug → one canonical URL.
  if (params.slug !== articleKey(article)) {
    permanentRedirect(articlePath("useful", article));
  }

  const path = articlePath("useful", article);

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
      <ArticleDetail
        theme="light"
        eyebrow="Useful Tips"
        title={article.title}
        category={article.category}
        publishedAt={article.published_at}
        updatedAt={article.updated_at}
        image={article.image_url}
        lead={article.excerpt}
        body={article.body}
        showAuthor
        huntCards
        back={{ href: "/useful", label: "お役立ち情報一覧へ戻る" }}
      />
      <PinStripe />
    </div>
  );
}
