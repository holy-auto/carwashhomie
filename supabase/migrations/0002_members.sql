-- カードコレクション Phase 1b：LINEログイン会員化のスキーマ。
--
-- members            … LINEログインした会員（line_user_id が本人キー）
-- user_collections   … 会員が取得したカード（本人ごと・サーバー保存）
--
-- RLS を有効化し anon/authenticated のポリシーは置かない（＝公開クライアント
-- からは一切読めない）。読み書きは service-role（/api のサーバー側）経由のみ。
-- 設計: docs/card-collection-gamification.md §7

create table if not exists public.members (
  line_user_id text primary key,              -- LINEログインの sub（本人ID）
  display_name text,
  picture_url  text,
  is_friend    boolean not null default false, -- 公式アカウント友だちか
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table public.members enable row level security;

create table if not exists public.user_collections (
  id            uuid primary key default gen_random_uuid(),
  line_user_id  text not null references public.members(line_user_id) on delete cascade,
  card_code     text not null,
  collected_at  timestamptz not null default now(),
  unique (line_user_id, card_code)
);

create index if not exists user_collections_line_user_id_idx
  on public.user_collections (line_user_id);

alter table public.user_collections enable row level security;

-- RLS ポリシーは意図的に作成しない（service-role のみアクセス可）。
