-- 랜딩 웨이팅리스트. 결정 배경: docs/decisions/0001-waitlist.md

create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now(),
  -- 앱에서 정규화(trim + 소문자)한 값만 들어오도록 DB에서도 막는다
  constraint waitlist_email_normalized check (email = lower(btrim(email))),
  constraint waitlist_email_length check (char_length(email) between 3 and 254)
);

create unique index waitlist_email_key on public.waitlist (email);

alter table public.waitlist enable row level security;

-- 기본 권한을 걷어내고 anon에는 email 컬럼 insert만 준다
revoke all on table public.waitlist from anon, authenticated;
grant insert (email) on table public.waitlist to anon;

create policy "anon can join waitlist"
  on public.waitlist
  for insert
  to anon
  with check (true);
