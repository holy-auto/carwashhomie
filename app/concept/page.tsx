import About from "@/components/About";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "当院のコンセプト",
  description:
    "車の美容外科のコンセプト・診察方針。塗装状態・使用環境・年式を診断し、車両ごとに最適な施術計画をご提案します。",
  path: "/concept",
  keywords: [
    "車の美容外科",
    "コンセプト",
    "診察方針",
    "塗装診断",
    "コーティング",
    "さいたま市",
    "岩槻",
  ],
});

export default function ConceptPage() {
  return (
    <div className="pt-20">
      <Breadcrumbs
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "当院のコンセプト", path: "/concept" },
        ]}
      />
      <About />
    </div>
  );
}
