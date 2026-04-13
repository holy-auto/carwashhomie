import type { Metadata } from "next";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "当院のコンセプト | 車の美容外科 Car Wash Homies",
  description:
    "車の美容外科のコンセプト・診察方針。塗装状態・使用環境・年式を診断し、車両ごとに最適な施術計画をご提案します。",
};

export default function ConceptPage() {
  return (
    <div className="pt-20">
      <About />
    </div>
  );
}
