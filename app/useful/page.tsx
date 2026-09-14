import Useful from "@/components/Useful";
import PinStripe from "@/components/PinStripe";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/constants";
import { getUsefulArticles } from "@/lib/content";

// Always reflect the latest articles edited in the admin panel.
export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "お役立ち情報",
  description:
    "洗車・コーティング・メンテナンスにまつわる豆知識やお手入れのコツを、車の美容外科 Car Wash Homies がお届けします。",
  path: "/useful",
  keywords: [
    "お役立ち情報",
    "洗車のコツ",
    "コーティング",
    "メンテナンス",
    "車のお手入れ",
    "さいたま市",
    "岩槻",
  ],
});

export default async function UsefulPage() {
  const articles = await getUsefulArticles();

  return (
    <div className="pt-20">
      <Breadcrumbs
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "お役立ち情報", path: "/useful" },
        ]}
      />
      <Useful articles={articles} />
      <PinStripe />
    </div>
  );
}
