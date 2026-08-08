"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CollectibleCard } from "@/lib/content";
import {
  GUEST_LIMIT,
  STORAGE_KEY,
  weightedPoints,
  reachedMilestones,
  nextMilestone,
  type Milestone,
} from "@/lib/collection";

type CollectionContextValue = {
  cards: CollectibleCard[];
  cardsByCode: Record<string, CollectibleCard>;
  collected: string[];
  collectedSet: Set<string>;
  has: (code: string) => boolean;
  collect: (code: string) => void;
  loaded: boolean;
  total: number;
  collectedCount: number;
  points: number;
  reached: Milestone[];
  next: Milestone | null;
  overGuestLimit: boolean;
  toast: (message: string) => void;
};

const CollectionContext = createContext<CollectionContextValue | null>(null);

export function useCollection(): CollectionContextValue {
  const ctx = useContext(CollectionContext);
  if (!ctx) {
    throw new Error("useCollection must be used within a CollectionProvider");
  }
  return ctx;
}

function readStored(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed?.codes)) {
      return parsed.codes.filter((c: unknown): c is string => typeof c === "string");
    }
  } catch {
    /* ignore malformed storage */
  }
  return [];
}

function writeStored(codes: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ codes, updatedAt: new Date().toISOString() }),
    );
  } catch {
    /* storage full / disabled — collection just won't persist */
  }
}

export default function CollectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cards, setCards] = useState<CollectibleCard[]>([]);
  const [collected, setCollected] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load persisted collection + card master on mount (client only).
  useEffect(() => {
    setCollected(readStored());
    let cancelled = false;
    fetch("/api/cards", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { cards: [] }))
      .then((j) => {
        if (!cancelled) setCards((j.cards ?? []) as CollectibleCard[]);
      })
      .catch(() => {
        /* offline / not configured — feature stays inert */
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const toast = useCallback((message: string) => {
    setToastMsg(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 3200);
  }, []);

  const cardsByCode = useMemo(() => {
    const map: Record<string, CollectibleCard> = {};
    for (const c of cards) map[c.code] = c;
    return map;
  }, [cards]);

  const collectedSet = useMemo(() => new Set(collected), [collected]);

  const has = useCallback((code: string) => collectedSet.has(code), [collectedSet]);

  const collect = useCallback(
    (code: string) => {
      setCollected((prev) => {
        if (prev.includes(code)) return prev;
        const nextCodes = [...prev, code];
        writeStored(nextCodes);
        return nextCodes;
      });
    },
    [],
  );

  // Progress is computed against PUBLISHED cards only, so unpublished /
  // deleted codes lingering in storage don't inflate the count.
  const publishedCodes = useMemo(() => new Set(cards.map((c) => c.code)), [cards]);
  const collectedCount = useMemo(
    () => collected.filter((c) => publishedCodes.has(c)).length,
    [collected, publishedCodes],
  );
  const points = useMemo(
    () => weightedPoints(cards, collectedSet),
    [cards, collectedSet],
  );

  const value: CollectionContextValue = useMemo(
    () => ({
      cards,
      cardsByCode,
      collected,
      collectedSet,
      has,
      collect,
      loaded,
      total: cards.length,
      collectedCount,
      points,
      reached: reachedMilestones(points),
      next: nextMilestone(points),
      overGuestLimit: loaded && collectedCount >= GUEST_LIMIT,
      toast,
    }),
    [
      cards,
      cardsByCode,
      collected,
      collectedSet,
      has,
      collect,
      loaded,
      collectedCount,
      points,
      toast,
    ],
  );

  return (
    <CollectionContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-x-0 bottom-24 z-[60] flex justify-center px-4 pointer-events-none"
          >
            <div className="pointer-events-auto rounded-full bg-midnight text-cream px-5 py-2.5 text-sm font-bold shadow-sunset-glow border border-sunset/40">
              {toastMsg}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </CollectionContext.Provider>
  );
}
