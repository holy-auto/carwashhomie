"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "ログインに失敗しました。");
        return;
      }
      const from = search.get("from") || "/admin";
      router.replace(from);
      router.refresh();
    } catch {
      setError("通信に失敗しました。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-midnight/10 p-8"
      >
        <h1 className="font-display text-2xl text-midnight mb-1">管理画面</h1>
        <p className="text-sm text-midnight/60 mb-6">
          Car Wash Homies コンテンツ管理
        </p>

        <label className="block text-sm font-medium mb-2" htmlFor="password">
          パスワード
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-midnight/20 px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-sunset"
          required
        />

        {error && (
          <p className="text-sm text-red-600 mb-4" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-sunset text-midnight font-bold py-2.5 hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "確認中…" : "ログイン"}
        </button>
      </form>
    </div>
  );
}
