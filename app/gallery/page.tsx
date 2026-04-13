import type { Metadata } from "next";
import BeforeAfter from "@/components/BeforeAfter";
import Testimonials from "@/components/Testimonials";
import PinStripe from "@/components/PinStripe";

export const metadata: Metadata = {
  title: "施術事例 | 車の美容外科 Car Wash Homies",
  description:
    "Before / Afterで見る施術事例。塗装くすみ・水垢・小傷など、診断と処置の実例をご紹介。",
};

export default function GalleryPage() {
  return (
    <div className="pt-20">
      <BeforeAfter />
      <PinStripe />
      <Testimonials />
    </div>
  );
}
