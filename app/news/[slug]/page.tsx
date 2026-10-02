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
  getNewsPostByKey,
} from "@/lib/content";

// Always reflect the latest edits made in the admin panel.
export const dynamic = "force-dynamic";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getNewsPostByKey(params.slug);
  if (!post) {
    return { title: "お知らせが見つかりません", robots: { index: false } };
  }
  return pageMetadata({
    title: post.title,
    description: excerptOf(post),
    path: articlePath("news", post),
    article: {
      image: post.image_url,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at ?? undefined,
    },
  });
}

export default async function NewsPostPage({ params }: Props) {
  const post = await getNewsPostByKey(params.slug);
  if (!post) notFound();

  // A post reached by its id once it has a slug → one canonical URL.
  if (params.slug !== articleKey(post)) {
    permanentRedirect(articlePath("news", post));
  }

  const path = articlePath("news", post);

  return (
    <div className="pt-20">
      <Breadcrumbs
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "お知らせ", path: "/news" },
          { name: post.title, path },
        ]}
      />
      <ArticleJsonLd
        path={path}
        headline={post.title}
        description={excerptOf(post)}
        image={post.image_url}
        datePublished={post.published_at}
        dateModified={post.updated_at}
      />
      <ArticleDetail
        theme="dark"
        eyebrow="News"
        title={post.title}
        publishedAt={post.published_at}
        updatedAt={post.updated_at}
        image={post.image_url}
        body={post.body}
        back={{ href: "/news", label: "お知らせ一覧へ戻る" }}
      />
      <PinStripe />
    </div>
  );
}
