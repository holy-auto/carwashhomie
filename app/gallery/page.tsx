import BeforeAfter from "@/components/BeforeAfter";
import Testimonials from "@/components/Testimonials";
import PinStripe from "@/components/PinStripe";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "施術事例",
  description:
    "Before / Afterで見る施術事例。塗装くすみ・水垢・小傷など、診断と処置の実例をご紹介。お客様の声も掲載。",
  path: "/gallery",
  keywords: [
    "施術事例",
    "Before After",
    "コーティング事例",
    "磨き事例",
    "洗車ビフォーアフター",
    "お客様の声",
    "さいたま市",
    "岩槻",
  ],
});

export default function GalleryPage() {
  return (
    <div className="pt-20">
      <Breadcrumbs
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "施術事例", path: "/gallery" },
        ]}
      />
      <BeforeAfter />
      <PinStripe />
      <Testimonials />
    </div>
  );
}
