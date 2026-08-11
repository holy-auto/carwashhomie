"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BUSINESS } from "@/lib/constants";
import { useCollection } from "@/components/collection/CollectionProvider";
import { MILESTONES } from "@/lib/collection";
import type { CollectibleCard } from "@/lib/content";
import styles from "@/components/collection/CollectionBook.module.css";

/* 収集手帳（/book）。参照デザインを当サイトのデータ（getCards / provider の
   localStorage 取得状況 / マイルストーン）に接続した版。左＝端末（選択カードを
   セット→走査線でLOADING→内容表示）、右＝羊皮紙のホルダー。 */

const ALL = "すべて";
const LOAD_MS = 720;
const num = (c: CollectibleCard) => `No.${c.card_number ?? "—"}`;

export default function Book() {
  const {
    loaded,
    cards,
    has,
    total,
    collectedCount,
    points,
    reached,
    next,
    overGuestLimit,
  } = useCollection();

  const [series, setSeries] = useState<string>(ALL);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const seriesList = useMemo(() => {
    const set = new Set<string>();
    for (const c of cards) if (c.series) set.add(c.series);
    return [ALL, ...Array.from(set)];
  }, [cards]);

  const shown = useMemo(
    () => (series === ALL ? cards : cards.filter((c) => c.series === series)),
    [cards, series],
  );

  const selectedCard = cards.find((c) => c.code === selectedCode) ?? null;
  const selectedOwned = selectedCard ? has(selectedCard.code) : false;

  // "set + scan" whenever the shown card changes
  useEffect(() => {
    if (!selectedCode) return;
    setLoading(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setLoading(false), LOAD_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [selectedCode]);

  function select(code: string) {
    setSelectedCode(code);
  }

  function step(d: number) {
    if (shown.length === 0) return;
    const i = shown.findIndex((c) => c.code === selectedCode);
    const nextI = i < 0 ? 0 : (i + d + shown.length) % shown.length;
    setSelectedCode(shown[nextI].code);
  }

  const progressPct =
    total === 0 ? 0 : Math.round((collectedCount / total) * 100);
  const target = next?.points ?? (MILESTONES[MILESTONES.length - 1]?.points || 1);
  const remaining = Math.max(0, Math.round((target - points) * 10) / 10);
  const topReward = reached[reached.length - 1] ?? null;

  return (
    <div
      className="px-3 py-10 md:py-14"
      style={{
        background:
          "radial-gradient(circle at 50% -10%, rgba(152,83,31,0.16), transparent 36rem), linear-gradient(180deg, #1b0e08 0%, #0e0805 100%)",
      }}
    >
      <section className={styles.stage} aria-label="収集手帳">
        <header className={styles.bookHeader}>
          <div className={styles.headerPlaque}>収集手帳</div>
          <div className={styles.headerEnglish}>
            <span aria-hidden="true">◆</span>
            COLLECTION BOOK
            <span aria-hidden="true">◆</span>
          </div>
        </header>

        <div className={styles.bookShell}>
          {/* ── 左：端末 ── */}
          <section className={styles.devicePage} aria-label="カードスロット">
            <div className={styles.deviceFrame}>
              <div className={styles.deviceCrest} aria-hidden="true">
                <span>✦</span>
              </div>

              <div className={styles.displayWindow}>
                <div className={styles.scanlines} aria-hidden="true" />

                <AnimatePresence>
                  {loading && (
                    <motion.div
                      key="scan"
                      className={styles.scanSweep}
                      initial={{ top: "-8%", opacity: 0 }}
                      animate={{ top: ["-8%", "104%"], opacity: [0, 1, 1, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: LOAD_MS / 1000, ease: "linear" }}
                    />
                  )}
                </AnimatePresence>

                {!selectedCard ? (
                  <EmptyScreen />
                ) : loading ? (
                  <div className={styles.loadingBox}>
                    <p className={styles.loadingText}>▶ NOW LOADING…</p>
                    <div className={styles.loadingTrack}>
                      <motion.span
                        style={{ display: "block", height: "100%", background: "#38dfd3" }}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: LOAD_MS / 1000, ease: "linear" }}
                      />
                    </div>
                    <p className={styles.loadingMeta}>{num(selectedCard)} ・ {selectedCard.code}</p>
                  </div>
                ) : (
                  <SelectedCardScreen card={selectedCard} owned={selectedOwned} />
                )}
              </div>

              <div className={styles.slotLabel}>
                <span>◆</span>
                CARD SLOT
                <span>◆</span>
              </div>

              <div className={styles.slotArea}>
                {selectedCard ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedCard.code}
                      className={styles.slotCard}
                      data-owned={selectedOwned}
                      initial={{ y: -34, opacity: 0, scale: 0.95 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: 26, opacity: 0 }}
                      transition={{ duration: 0.34, ease: [0.33, 1, 0.68, 1] }}
                    >
                      <span className={styles.slotNumber}>{num(selectedCard)}</span>
                      <span className={styles.slotTitle}>
                        {selectedOwned ? selectedCard.name : "LOCKED"}
                      </span>
                      <span className={styles.slotSigil} aria-hidden="true">✦</span>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className={styles.slotCardPlaceholder}>
                    <span className={styles.slotSigil} aria-hidden="true">✦</span>
                  </div>
                )}
              </div>

              <div className={styles.deviceControls}>
                <div className={styles.dialWrap} aria-hidden="true">
                  <div className={styles.dialOuter}>
                    <div className={styles.dialInner} />
                  </div>
                </div>

                <div className={styles.statusPanel}>
                  <StatusRow label="電源" active />
                  <StatusRow label="接続" active={loaded} />
                </div>

                <DPad onPrev={() => step(-1)} onNext={() => step(1)} disabled={shown.length === 0} />
              </div>
            </div>
          </section>

          <div className={styles.binding} aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className={styles.bindingRing} />
            ))}
          </div>

          {/* ── 右：ホルダー ── */}
          <section className={styles.parchmentPage} aria-label="コレクション一覧">
            <div className={styles.parchmentInner}>
              <div className={styles.progressCard}>
                <div className={styles.progressHeader}>
                  <span>あつめた枚数</span>
                  <strong>
                    {collectedCount}/{total}
                  </strong>
                </div>
                <div
                  className={styles.progressTrack}
                  role="progressbar"
                  aria-label="カード収集率"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progressPct}
                >
                  <span style={{ width: `${progressPct}%` }} />
                </div>
                <p>
                  {next
                    ? <>次の「<strong>{next.title}</strong>」まであと {remaining} ポイント</>
                    : "全マイルストーン達成！コンプリートを目指そう。"}
                </p>

                {topReward && (
                  <a
                    className={styles.rewardButton}
                    href={BUSINESS.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🎁 {topReward.title}特典を受け取る
                    <small>{topReward.reward}（LINEで提示・店頭でお渡し）</small>
                  </a>
                )}
              </div>

              {overGuestLimit && (
                <div className={styles.guestNote}>
                  いまはこの端末にカードを保存しています。LINE連携（会員登録）で機種変更後も引き継げるようになります（近日公開）。
                </div>
              )}

              {seriesList.length > 1 && (
                <div className={styles.tabs} role="tablist" aria-label="カードシリーズ">
                  {seriesList.map((s) => (
                    <button
                      key={s}
                      type="button"
                      role="tab"
                      aria-selected={series === s}
                      className={series === s ? styles.tabActive : styles.tab}
                      onClick={() => setSeries(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {!loaded ? (
                <div className={styles.emptyCategory}>読み込み中…</div>
              ) : total === 0 ? (
                <div className={styles.emptyCategory}>
                  カードは現在準備中です。もうしばらくお待ちください。
                </div>
              ) : (
                <div className={styles.cardGrid}>
                  {shown.map((card) => {
                    const owned = has(card.code);
                    const selected = selectedCode === card.code;
                    return (
                      <button
                        key={card.id}
                        type="button"
                        className={styles.collectionCard}
                        data-owned={owned}
                        data-selected={selected}
                        onClick={() => select(card.code)}
                        aria-label={`${num(card)} ${owned ? card.name : "未取得カード"}`}
                      >
                        <span className={styles.cardCrown} aria-hidden="true">♛</span>
                        <span className={styles.cardNumber}>{num(card)}</span>
                        <span className={styles.cardDivider} />
                        <span className={styles.cardMystery} aria-hidden="true">
                          {owned ? "✦" : "?"}
                        </span>
                        <strong className={styles.cardTitle}>
                          {owned ? card.name : "未取得"}
                        </strong>
                        <span className={styles.cardHint}>
                          {owned ? card.description : card.hint}
                        </span>
                        <span className={styles.cardCategory}>
                          {card.category || card.series || ""}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </div>

        <p className={styles.footerHint}>
          カードは施術事例・お役立ち情報のページに潜んでいます。読みながら探して、集めたカードをここで開いてください。
        </p>
      </section>
    </div>
  );
}

function EmptyScreen() {
  return (
    <div className={styles.screenContent}>
      <span className={styles.screenEyebrow}>NO CARD</span>
      <span className={styles.screenOrnament} aria-hidden="true">◆</span>
      <p>
        右のホルダーでカードを選ぶと、
        <br />
        スロットにセットされて内容が表示されます。
      </p>
    </div>
  );
}

function SelectedCardScreen({
  card,
  owned,
}: {
  card: CollectibleCard;
  owned: boolean;
}) {
  return (
    <div className={`${styles.screenContent} flicker`}>
      <span className={styles.screenEyebrow}>{owned ? num(card) : "LOCKED CARD"}</span>
      <span className={styles.screenOrnament} aria-hidden="true">◆</span>
      <h2 className={styles.screenTitle}>{owned ? card.name : num(card)}</h2>
      <p>{owned ? card.description : card.hint}</p>
      <span className={styles.screenMeta}>{card.category || card.series || ""}</span>
    </div>
  );
}

function StatusRow({ label, active }: { label: string; active?: boolean }) {
  return (
    <div className={styles.statusRow}>
      <span>{label}</span>
      <span className={styles.statusLight} data-active={active} aria-hidden="true" />
    </div>
  );
}

function DPad({
  onPrev,
  onNext,
  disabled,
}: {
  onPrev: () => void;
  onNext: () => void;
  disabled: boolean;
}) {
  return (
    <div className={styles.dpad}>
      <button
        type="button"
        onClick={onPrev}
        disabled={disabled}
        aria-label="前のカード"
        className={`${styles.dpadKey} ${styles.dpadUp} ${styles.dpadButton}`}
      >
        ▲
      </button>
      <button
        type="button"
        onClick={onPrev}
        disabled={disabled}
        aria-label="前のカード"
        className={`${styles.dpadKey} ${styles.dpadLeft} ${styles.dpadButton}`}
      >
        ◀
      </button>
      <span className={styles.dpadCenter} aria-hidden="true" />
      <button
        type="button"
        onClick={onNext}
        disabled={disabled}
        aria-label="次のカード"
        className={`${styles.dpadKey} ${styles.dpadRight} ${styles.dpadButton}`}
      >
        ▶
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={disabled}
        aria-label="次のカード"
        className={`${styles.dpadKey} ${styles.dpadDown} ${styles.dpadButton}`}
      >
        ▼
      </button>
    </div>
  );
}
