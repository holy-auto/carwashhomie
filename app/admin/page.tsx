import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";
import { isSupabaseWritable } from "@/lib/supabase";

const cards = [
  {
    href: "/admin/gallery",
    title: "施術事例",
    desc: "Before / After 写真と説明を追加・編集します。",
  },
  {
    href: "/admin/news",
    title: "お知らせ・更新",
    desc: "最新情報やキャンペーンを投稿します。",
  },
  {
    href: "/admin/testimonials",
    title: "お客様の声",
    desc: "レビューを追加・編集します。",
  },
];

export default function AdminHome() {
  return (
    <>
      <AdminNav />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="font-display text-3xl mb-2">コンテンツ管理</h1>
        <p className="text-midnight/60 mb-8">
          編集した内容はすぐにサイトに反映されます。
        </p>

        {!isSupabaseWritable && (
          <div className="mb-8 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Supabase が未設定のため、保存できません。環境変数
            <code className="mx-1">SUPABASE_SERVICE_ROLE_KEY</code>
            などを設定してください。
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-3">
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="block rounded-2xl border border-midnight/10 bg-white p-6 hover:shadow-lg hover:border-sunset transition"
            >
              <h2 className="font-display text-xl mb-2">{c.title}</h2>
              <p className="text-sm text-midnight/60">{c.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
