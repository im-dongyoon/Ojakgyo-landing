-- 영어 랜딩(/en) 추가. 결정 배경: docs/decisions/0001-waitlist.md

-- 어느 언어 페이지에서 왔는지 남긴다. 기존 행은 모두 한국어 페이지에서 온 것이다.
alter table public.visits
  add column locale text not null default 'ko' check (locale in ('ko', 'en'));
alter table public.waitlist
  add column locale text not null default 'ko' check (locale in ('ko', 'en'));

-- 한국 휴대폰은 기존처럼 010… 꼴이다. 해외 번호(E.164, +국가번호…)는 영어 페이지 신청만 받는다.
alter table public.waitlist drop constraint waitlist_phone_check;
alter table public.waitlist add constraint waitlist_phone_check check (
  phone ~ '^01[016789][0-9]{7,8}$'
  or (locale = 'en' and phone ~ '^\+[1-9][0-9]{7,14}$')
);

-- 집계 뷰를 언어별로 나눈다. 맨 앞에 칸을 더해야 해서 지우고 다시 만든다.
drop view public.inflow_by_source;
drop view public.inflow_daily;

create view public.inflow_by_source
with (security_invoker = true) as
with v as (
  select locale, source, count(*) as visits, count(distinct visitor_id) as visitors
  from public.visits
  group by locale, source
),
w as (
  select locale, source, count(*) as signups
  from public.waitlist
  group by locale, source
)
select
  coalesce(v.locale, w.locale) as locale,
  coalesce(v.source, w.source) as source,
  coalesce(v.visits, 0) as visits,
  coalesce(v.visitors, 0) as visitors,
  coalesce(w.signups, 0) as signups,
  round(100.0 * coalesce(w.signups, 0) / nullif(v.visitors, 0), 1) as conversion_pct
from v
full join w on w.locale = v.locale and w.source = v.source
order by locale, visitors desc, signups desc;

create view public.inflow_daily
with (security_invoker = true) as
with v as (
  select
    (created_at at time zone 'Asia/Seoul')::date as day,
    locale,
    source,
    count(*) as visits,
    count(distinct visitor_id) as visitors
  from public.visits
  group by 1, 2, 3
),
w as (
  select
    (created_at at time zone 'Asia/Seoul')::date as day,
    locale,
    source,
    count(*) as signups
  from public.waitlist
  group by 1, 2, 3
)
select
  coalesce(v.day, w.day) as day,
  coalesce(v.locale, w.locale) as locale,
  coalesce(v.source, w.source) as source,
  coalesce(v.visits, 0) as visits,
  coalesce(v.visitors, 0) as visitors,
  coalesce(w.signups, 0) as signups
from v
full join w on w.day = v.day and w.locale = v.locale and w.source = v.source
order by day desc, locale, visitors desc;

-- 다시 만든 뷰에도 기본 권한이 붙으므로 다시 걷어 낸다
revoke all on table public.inflow_by_source, public.inflow_daily from anon, authenticated;
