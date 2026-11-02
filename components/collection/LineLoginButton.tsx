"use client";

import { useCollection } from "@/components/collection/CollectionProvider";

/* LINE login / membership control. Hidden unless LINE Login is
   configured. Logged out → "LINEではじめる"; logged in → name + logout.
   Logging in merges this device's guest cards into the account and keeps
   them across devices. */

export default function LineLoginButton({
  variant = "block",
}: {
  variant?: "block" | "inline";
}) {
  const { lineEnabled, member, login, logout } = useCollection();

  if (!lineEnabled) return null;

  if (member) {
    return (
      <div
        className={
          variant === "block"
            ? "flex items-center justify-center gap-3 text-[13px]"
            : "flex items-center gap-2 text-xs"
        }
      >
        <span className="text-[#3b2918]">
          {member.displayName ? `${member.displayName} さん` : "会員"}でログイン中
        </span>
        <button
          type="button"
          onClick={() => logout()}
          className="rounded-full border border-[#a9843f]/60 px-3 py-1 text-[#6a5133] hover:bg-[#efe3c3]/60 transition"
        >
          ログアウト
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => login()}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#06C755] text-white font-bold px-5 py-2.5 shadow hover:brightness-95 transition w-full"
      aria-label="LINEでログイン・会員登録"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 5.73 2 10.3c0 4.1 3.78 7.53 8.9 8.17.35.07.82.23.94.53.1.27.07.69.03.96l-.15.92c-.05.27-.22 1.06.93.58 1.15-.48 6.2-3.65 8.46-6.25C22.5 13.7 23 12.07 23 10.3 23 5.73 18.52 2 12 2z"/>
      </svg>
      LINEではじめる / ログイン
    </button>
  );
}
