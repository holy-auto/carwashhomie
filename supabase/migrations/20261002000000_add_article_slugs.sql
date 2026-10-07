-- Article detail pages: /news/<slug> and /useful/<slug>.
-- Adds a URL slug to both article tables and backfills existing rows
-- as <publish date in JST>-<first 8 hex of id>, matching the format
-- the admin API generates for new posts (lib/admin-resources.ts).
-- The updated_at triggers are paused during the backfill so the
-- sitemap's lastmod keeps reflecting real content edits.

alter table public.news_posts add column if not exists slug text;
alter table public.useful_articles add column if not exists slug text;

alter table public.news_posts disable trigger trg_news_posts_updated_at;
update public.news_posts
   set slug = to_char(coalesce(published_at, created_at) at time zone 'Asia/Tokyo', 'YYYYMMDD')
              || '-' || substr(replace(id::text, '-', ''), 1, 8)
 where slug is null;
alter table public.news_posts enable trigger trg_news_posts_updated_at;

alter table public.useful_articles disable trigger trg_useful_articles_updated_at;
update public.useful_articles
   set slug = to_char(coalesce(published_at, created_at) at time zone 'Asia/Tokyo', 'YYYYMMDD')
              || '-' || substr(replace(id::text, '-', ''), 1, 8)
 where slug is null;
alter table public.useful_articles enable trigger trg_useful_articles_updated_at;

create unique index if not exists news_posts_slug_key on public.news_posts (slug);
create unique index if not exists useful_articles_slug_key on public.useful_articles (slug);

alter table public.news_posts
  add constraint news_posts_slug_format
  check (slug is null or slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$');
alter table public.useful_articles
  add constraint useful_articles_slug_format
  check (slug is null or slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$');
