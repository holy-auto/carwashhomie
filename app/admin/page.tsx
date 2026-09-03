import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";
import { isSupabaseWritable } from "@/lib/supabase";

const cards = [
  {
    href: "/admin/menu-body",
    title: "メニュー：ボディコーティング",
    desc: "コーティング料金プランを追加・編集します。",
  },
  {
    href: "/admin/menu-wash",
    title: "メニュー：洗車サービス",
    desc: "洗車メニューを追加・編集します。全て非公開にすると欄ごと非表示になります。",
  },
  {
    href: "/admin/menu-interior",
    title: "メニュー：内装コーティング料金表",
    desc: "車種ごとの内装コーティング料金（運転席／助手席／前後）を編集します。",
  },
  {
    href: "/admin/menu-interior-options",
    title: "メニュー：内装オプション",
    desc: "3列シート・クリーニングなど内装オプションの料金を編集します。",
  },
  {
    href: "/admin/menu-glass",
    title: "メニュー：ガラスコーティング",
    desc: "フロント・全面などガラスコーティングの料金を編集します。",
  },
  {
    href: "/admin/menu-wheel",
    title: "メニュー：ホイールコーティング",
    desc: "ホイールコーティングの料金をグループごとに編集します。",
  },
  {
    href: "/admin/menu-b2b",
    title: "メニュー：業者様向けご依頼",
    desc: "技術講習・中古車両仕上げなど、業者様向け項目を追加・編集します。",
  },
  {
    href: "/admin/menu-brands",
    title: "メニュー：取り扱いブランド",
    desc: "取り扱い施工・販売ブランドを追加・編集します。",
  },
  {
    href: "/admin/gallery",
    title: "症例カルテ",
    desc: "Before / After 写真と説明を追加・編集します。",
  },
  {
    href: "/admin/news",
    title: "お知らせ・更新",
    desc: "最新情報やキャンペーンを投稿します。",
  },
  {
    href: "/admin/useful",
    title: "ホームケア処方箋",
    desc: "ブログとは別に、洗車・メンテのセルフケア記事を掲載します。",
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
