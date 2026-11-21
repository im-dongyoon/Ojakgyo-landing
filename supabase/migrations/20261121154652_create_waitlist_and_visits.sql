-- 랜딩 웨이팅리스트와 유입 집계. 결정 배경: docs/decisions/0001-waitlist.md
-- 쓰기는 서버의 secret 키로만 한다. 공개 API(anon · authenticated)에는 아무 권한도 주지 않는다.

-- 방문 기록: 페이지를 열 때마다 한 줄
create table public.visits (
  id bigint generated always as identity primary key,
  visitor_id uuid not null,
  source text not null check (char_length(source) between 1 and 100),
  medium text check (char_length(medium) <= 100),
  campaign text check (char_length(campaign) <= 100),
  referrer text check (char_length(referrer) <= 100),
  created_at timestamptz not null default now()
);

create index visits_created_at_idx on public.visits (created_at);

-- 웨이팅리스트 신청
create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  name text not null
    check (char_length(name) between 1 and 50 and name = btrim(name)),
  -- 숫자만 남긴 휴대폰 번호 (예: 01012345678)
  phone text not null check (phone ~ '^01[016789][0-9]{7,8}$'),
  visitor_id uuid,
  source text not null check (char_length(source) between 1 and 100),
  medium text check (char_length(medium) <= 100),
  campaign text check (char_length(campaign) <= 100),
  referrer text check (char_length(referrer) <= 100),
  created_at timestamptz not null default now()
);

create unique index waitlist_phone_key on public.waitlist (phone);

-- 경로별 누적 집계
create view public.inflow_by_source
with (security_invoker = true) as
with v as (
  select source, count(*) as visits, count(distinct visitor_id) as visitors
  from public.visits
  group by source
),
w as (
  select source, count(*) as signups
  from public.waitlist
  group by source
)
select
  coalesce(v.source, w.source) as source,
  coalesce(v.visits, 0) as visits,
  coalesce(v.visitors, 0) as visitors,
  coalesce(w.signups, 0) as signups,
  round(100.0 * coalesce(w.signups, 0) / nullif(v.visitors, 0), 1) as conversion_pct
from v
full join w on w.source = v.source
order by visitors desc, signups desc;

-- 날짜(한국 시간)별 · 경로별 집계
create view public.inflow_daily
with (security_invoker = true) as
with v as (
  select
    (created_at at time zone 'Asia/Seoul')::date as day,
    source,
    count(*) as visits,
    count(distinct visitor_id) as visitors
  from public.visits
  group by 1, 2
),
w as (
  select
    (created_at at time zone 'Asia/Seoul')::date as day,
    source,
    count(*) as signups
  from public.waitlist
  group by 1, 2
)
select
  coalesce(v.day, w.day) as day,
  coalesce(v.source, w.source) as source,
  coalesce(v.visits, 0) as visits,
  coalesce(v.visitors, 0) as visitors,
  coalesce(w.signups, 0) as signups
from v
full join w on w.day = v.day and w.source = v.source
order by day desc, visitors desc;

-- 행 단위 보안은 켜되 정책은 만들지 않는다 (secret 키만 통과)
alter table public.visits enable row level security;
alter table public.waitlist enable row level security;

-- 이 프로젝트는 public 스키마의 새 객체에 anon · authenticated 권한을 자동으로 준다. 모두 걷어 낸다.
revoke all on table public.visits, public.waitlist from anon, authenticated;
revoke all on table public.inflow_by_source, public.inflow_daily from anon, authenticated;
revoke all on sequence public.visits_id_seq from anon, authenticated;
