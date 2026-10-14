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

-- One reporting view for every creator and video. Use utm_campaign as the
-- creator/campaign key and utm_content as the video key. The 'all' store row
-- reports across both stores; other rows break the same campaign down by store.
create or replace view public.v_creator_video_store_analytics
with (security_invoker = true) as
with campaigns as (
  select distinct utm_source, utm_medium, utm_campaign, utm_content
  from public.events
  where utm_campaign is not null
    and type in ('visit', 'download_click')
),
visits as (
  select
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    count(distinct visitor_id) as visitors
  from public.events
  where type = 'visit'
    and utm_campaign is not null
  group by utm_source, utm_medium, utm_campaign, utm_content
),
downloads as (
  select
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    count(distinct visitor_id) as downloaders
  from public.events
  where type = 'download_click'
    and utm_campaign is not null
  group by utm_source, utm_medium, utm_campaign, utm_content
),
downloads_by_store as (
  select
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    store,
    count(distinct visitor_id) as downloaders
  from public.events
  where type = 'download_click'
    and store in ('play', 'appstore')
    and utm_campaign is not null
  group by utm_source, utm_medium, utm_campaign, utm_content, store
),
metrics as (
  select
    c.utm_source,
    c.utm_medium,
    c.utm_campaign,
    c.utm_content,
    'all'::text as store,
    coalesce(v.visitors, 0) as visitors,
    coalesce(d.downloaders, 0) as downloaders
  from campaigns c
  left join visits v
    on v.utm_source is not distinct from c.utm_source
    and v.utm_medium is not distinct from c.utm_medium
    and v.utm_campaign is not distinct from c.utm_campaign
    and v.utm_content is not distinct from c.utm_content
  left join downloads d
    on d.utm_source is not distinct from c.utm_source
    and d.utm_medium is not distinct from c.utm_medium
    and d.utm_campaign is not distinct from c.utm_campaign
    and d.utm_content is not distinct from c.utm_content

  union all

  select
    d.utm_source,
    d.utm_medium,
    d.utm_campaign,
    d.utm_content,
    d.store,
    coalesce(v.visitors, 0) as visitors,
    d.downloaders
  from downloads_by_store d
  left join visits v
    on v.utm_source is not distinct from d.utm_source
    and v.utm_medium is not distinct from d.utm_medium
    and v.utm_campaign is not distinct from d.utm_campaign
    and v.utm_content is not distinct from d.utm_content
)
select
  utm_source,
  utm_medium,
  utm_campaign,
  utm_content,
  store,
  visitors,
  downloaders as distinct_downloaders,
  round(100.0 * downloaders / nullif(visitors, 0), 1) as conversion_rate_pct
from metrics;