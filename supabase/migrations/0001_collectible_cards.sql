-- カードコレクション（ゲーミフィケーション）Phase 1a のスキーマ。
--
-- 既存テーブル（gallery_cases など）と同じ流儀に合わせる：
--   * id uuid pk / created_at・updated_at timestamptz default now()
--   * RLS 有効、anon/authenticated は published = true の行のみ SELECT 可
--   * 書き込みは service-role（/api/admin）経由で RLS をバイパス
--
-- 設計ドキュメント: docs/card-collection-gamification.md

-- ─────────────────────────── カードマスタ ───────────────────────────
create table if not exists public.collectible_cards (
  id             uuid primary key default gen_random_uuid(),
  code           text not null unique,          -- 右上コード（例 G-400）。取得判定のキー
  card_number    integer,                        -- 左上の大きな番号（図鑑No.）
  name           text not null,                  -- カード名（中央）
  rarity         text not null default 'N',      -- N / R / SR / SS（枠色の出し分け）
  category       text,                           -- 分類（洗車・コーティング…）
  description    text,                           -- 下段の説明＝ブックで読める洗車お役立ち要約
  hint           text,                           -- 未取得時に出す「ありそうな場所」ヒント
  image_url      text,                           -- 中段イラスト（未設定なら accent_color で描画）
  accent_color   text,                           -- 画像なし時の背景色
  count_weight   numeric not null default 1,     -- コンプ/マイルストーンでの重み（易しいカードは < 1）
  instant_reward boolean not null default false, -- 単体で特典が出るか（SS 等）
  series         text,                           -- セット名（季節/キャンペーン等）
  sort_order     integer not null default 0,
  published      boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

alter table public.collectible_cards enable row level security;

drop policy if exists "public read published collectible_cards" on public.collectible_cards;
create policy "public read published collectible_cards"
  on public.collectible_cards
  for select
  to anon, authenticated
  using (published = true);

-- ─────────── 既存コンテンツへのカード「設置」（1記事1枚が基本） ───────────
alter table public.gallery_cases   add column if not exists card_code text;
alter table public.useful_articles add column if not exists card_code text;

-- ─────────────────────────── シードデータ ───────────────────────────
-- 文言・番号はプレースホルダ。管理画面（/admin/cards）から差し替え可能。
insert into public.collectible_cards
  (code, card_number, name, rarity, category, description, hint, accent_color, count_weight, instant_reward, series, sort_order)
values
  ('WASH-01', 101, '洗車の基本', 'N', '洗車',
   '洗車は上から下へ。足回りは最後に洗うと、砂やホコリを塗装面に広げずに済みます。',
   'お役立ち情報の記事のどこかに光っています。', '#2f9e9e', 0.5, false, '洗車の基本', 1),
  ('WASH-02', 102, '拭き上げのコツ', 'N', '洗車',
   '拭き上げは吸水性の高いマイクロファイバーで。押し当てるように水分を取ると洗車キズを防げます。',
   'お役立ち情報の記事のどこかに光っています。', '#3a7ca5', 0.5, false, '洗車の基本', 2),
  ('CASE-01', 201, '塗装くすみの改善', 'R', 'コーティング',
   '磨き＋コーティングで、くすんだ塗装面に深い艶が戻ります。施術事例をチェック。',
   '施術事例（Before/After）のページを探してみて。', '#e8791a', 1, false, '施工ノウハウ', 3),
  ('CASE-02', 202, 'ヘッドライト再生', 'R', 'メンテナンス',
   '黄ばみは研磨とコート再施工でクリアに。夜間の視認性も向上します。',
   '施術事例（Before/After）のページを探してみて。', '#c94f4f', 1, false, '施工ノウハウ', 4),
  ('SEASON-SS', 1, '支配者からの招待', 'SS', 'イベント',
   '隠しカード。見つけたあなたに、ちょっとしたごほうびを。',
   'サイトのどこかに、ひっそりと。', '#7b1f3a', 1, true, 'シークレット', 5)
on conflict (code) do nothing;
