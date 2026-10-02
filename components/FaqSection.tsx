"use client";

import { motion } from "framer-motion";
import type { FaqItem } from "@/components/FaqJsonLd";

/* Visible FAQ block. Always render it from the SAME array passed to
   <FaqJsonLd> (see lib/faqs.ts) — structured data must match what
   visitors can read on the page. */
export default function FaqSection({
  faqs,
  heading = "よくあるご質問",
}: {
  faqs: FaqItem[];
  heading?: string;
}) {
  if (faqs.length === 0) return null;

  return (
    <section className="relative py-20 md:py-28 bg-cream overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sunset/[0.04] rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 text-midnight/50 text-[9px] tracking-[0.3em] uppercase font-pixel mb-4">
            <div className="w-8 h-[1px] bg-midnight/30" />
            FAQ
            <div className="w-8 h-[1px] bg-midnight/30" />
          </div>
          <h2 className="font-display text-2xl md:text-4xl text-midnight leading-tight">
            {heading}
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: Math.min(idx * 0.06, 0.3) }}
              className="bg-white border border-midnight/10 rounded-2xl p-6 shadow-clinic"
            >
              <h3 className="flex items-start gap-3 font-display text-base md:text-lg text-midnight mb-3 leading-snug">
                <span className="text-sunset shrink-0">Q.</span>
                {faq.question}
              </h3>
              <p className="flex items-start gap-3 text-midnight/70 text-sm leading-relaxed">
                <span className="text-midnight/40 font-bold shrink-0">A.</span>
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
