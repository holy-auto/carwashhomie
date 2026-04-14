import Doctor from "@/components/Doctor";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "院長紹介",
  description:
    "院長 中山春香（二級自動車整備士）。整備・磨き・コーティングの実務経験約9年、SNSでも情報発信中。",
  path: "/doctor",
  keywords: [
    "院長紹介",
    "中山春香",
    "二級自動車整備士",
    "女性整備士",
    "コーティング技術者",
    "さいたま市",
    "岩槻",
  ],
});

export default function DoctorPage() {
  return (
    <div className="pt-20">
      <Breadcrumbs
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "院長紹介", path: "/doctor" },
        ]}
      />
      <Doctor />
    </div>
  );
}
