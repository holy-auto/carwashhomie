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

export type MemberInfo = {
  lineUserId: string;
  displayName: string | null;
  pictureUrl: string | null;
  isFriend: boolean;
};

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
  // membership (Phase 1b)
  lineEnabled: boolean;
  member: MemberInfo | null;
  login: (returnTo?: string) => void;
  logout: () => void;
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
  const [lineEnabled, setLineEnabled] = useState(false);
  const [member, setMember] = useState<MemberInfo | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const memberRef = useRef(false); // latest "is logged in" for callbacks

  const toast = useCallback((message: string) => {
    setToastMsg(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 3200);
  }, []);

  // Load cards + membership + collection on mount.
  useEffect(() => {
    let cancelled = false;
    const guest = readStored();
    setCollected(guest);

    async function init() {
      // Card master (public).
      try {
        const r = await fetch("/api/cards", { cache: "no-store" });
        const j = r.ok ? await r.json() : { cards: [] };
        if (!cancelled) setCards((j.cards ?? []) as CollectibleCard[]);
      } catch {
        /* inert */
      }

      // Membership.
      try {
        const r = await fetch("/api/me", { cache: "no-store" });
        const j = r.ok ? await r.json() : { lineEnabled: false, member: null };
        if (cancelled) return;
        setLineEnabled(Boolean(j.lineEnabled));
        if (j.member) {
          setMember(j.member as MemberInfo);
          memberRef.current = true;
          // Merge any guest cards into the account, then use the server
          // collection as the source of truth.
          const res = await fetch("/api/me/collection", {
            method: guest.length ? "POST" : "GET",
            headers: guest.length ? { "Content-Type": "application/json" } : undefined,
            body: guest.length ? JSON.stringify({ codes: guest }) : undefined,
            cache: "no-store",
          });
          if (!cancelled && res.ok) {
            const { codes } = (await res.json()) as { codes: string[] };
            setCollected(codes);
            writeStored(codes);
          }
        }
      } catch {
        /* membership optional */
      } finally {
        if (!cancelled) setLoaded(true);
      }
    }
    init();
    return () => {
      cancelled = true;
    };
  }, []);

  // One-time login result toast.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search);
    const login = p.get("login");
    if (!login) return;
    if (login === "ok") toast("LINEでログインしました");
    else if (login === "error") toast("ログインに失敗しました。もう一度お試しください");
    // strip the params from the URL
    p.delete("login");
    p.delete("reason");
    const qs = p.toString();
    window.history.replaceState(
      {},
      "",
      window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash,
    );
  }, [toast]);

  const cardsByCode = useMemo(() => {
    const map: Record<string, CollectibleCard> = {};
    for (const c of cards) map[c.code] = c;
    return map;
  }, [cards]);

  const collectedSet = useMemo(() => new Set(collected), [collected]);
  const has = useCallback((code: string) => collectedSet.has(code), [collectedSet]);

  const collect = useCallback((code: string) => {
    setCollected((prev) => {
      if (prev.includes(code)) return prev;
      const nextCodes = [...prev, code];
      writeStored(nextCodes);
      return nextCodes;
    });
    // Persist to the account when logged in.
    if (memberRef.current) {
      fetch("/api/me/collection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
        cache: "no-store",
      }).catch(() => {});
    }
  }, []);

  const login = useCallback((returnTo?: string) => {
    const back =
      returnTo ||
      (typeof window !== "undefined"
        ? window.location.pathname + window.location.search
        : "/book");
    window.location.href = `/api/line/login?returnTo=${encodeURIComponent(back)}`;
  }, []);

  const logout = useCallback(() => {
    fetch("/api/line/logout", { method: "POST" })
      .catch(() => {})
      .finally(() => {
        memberRef.current = false;
        setMember(null);
        toast("ログアウトしました");
      });
  }, [toast]);

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
      // Only nudge guests to register; members already persist server-side.
      overGuestLimit: loaded && !member && collectedCount >= GUEST_LIMIT,
      toast,
      lineEnabled,
      member,
      login,
      logout,
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
      member,
      lineEnabled,
      login,
      logout,
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
