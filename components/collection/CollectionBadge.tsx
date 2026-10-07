"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCollection } from "@/components/collection/CollectionProvider";

/* Small always-on progress badge → link to /book. Hidden on the admin
   panel, and until there is at least one published card to collect. */

export default function CollectionBadge() {
  const pathname = usePathname();
  const { loaded, total } = useCollection();

  const hidden =
    !loaded ||
    total === 0 ||
    pathname?.startsWith("/admin") ||
    pathname === "/book";

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 z-40"
        >
          <Link
            href="/book"
            className="flex items-center gap-2 rounded-full bg-midnight/90 backdrop-blur-md border-2 border-sunset/50 shadow-sunset-glow pl-3 pr-4 py-2 hover:border-sunset transition-colors"
            aria-label="カードブックを開く"
          >
            <span className="text-lg leading-none">📖</span>
            <span className="font-pixel-jp text-[11px] tracking-wider text-sunset">
              ブック
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
