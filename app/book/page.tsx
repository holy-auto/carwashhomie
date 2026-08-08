import Book from "@/components/collection/Book";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "カードブック",
  description:
    "サイトに潜むコレクションカードを集めて、洗車のお役立ち情報とごほうびをコンプリート。集めたカードはこのブックで確認できます。",
  path: "/book",
  keywords: ["カードブック", "コレクション", "洗車", "ゲーム", "特典"],
});

export default function BookPage() {
  return (
    <div className="pt-20">
      <Breadcrumbs
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "カードブック", path: "/book" },
        ]}
      />
      <Book />
    </div>
  );
}
