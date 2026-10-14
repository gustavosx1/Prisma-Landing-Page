create table if not exists public.events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  type text not null check (type in ('visit', 'download_click')),
  visitor_id text not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  store text check (store in ('play', 'appstore')),
  user_agent text,
  country text,
  constraint events_store_only_for_downloads
    check (store is null or type = 'download_click')
);

create index if not exists events_utm_campaign_type_idx
  on public.events (utm_campaign, type);

alter table public.events enable row level security;