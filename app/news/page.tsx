import News from "@/components/News";
import PinStripe from "@/components/PinStripe";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/constants";
import { getNewsPosts } from "@/lib/content";

// Always reflect the latest posts edited in the admin panel.
export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "お知らせ",
  description:
    "車の美容外科 Car Wash Homies の最新お知らせ・キャンペーン・営業案内。",
  path: "/news",
  keywords: ["お知らせ", "ニュース", "キャンペーン", "さいたま市", "岩槻"],
});

export default async function NewsPage() {
  const posts = await getNewsPosts();

  return (
    <div className="pt-20">
      <Breadcrumbs
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "お知らせ", path: "/news" },
        ]}
      />
      <News posts={posts} />
      <PinStripe />
    </div>
  );
}
