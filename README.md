# Ojakgyo Landing

Next.js 16 (App Router) + Supabase. 랜딩 모달로 웨이팅리스트(이름 · 휴대폰 번호)를 받고, 방문과 신청의 유입 경로를 DB에 남긴다.

## 시작하기

```bash
pnpm install
cp .env.example .env.local   # SUPABASE_URL · SUPABASE_SECRET_KEY 입력
pnpm dev
```

secret 키는 서버에서만 쓴다. 이름에 `NEXT_PUBLIC_`을 붙이지 않는다.

## DB

마이그레이션은 `supabase/migrations/`에 있다. 원격 프로젝트에 적용:

```bash
pnpm exec supabase login
pnpm exec supabase link --project-ref <project-ref>
pnpm exec supabase db push
```

| 객체 | 내용 |
| --- | --- |
| `waitlist` | 신청 (이름 · 휴대폰 번호 · 유입 경로) |
| `visits` | 방문 기록 (페이지를 열 때마다 한 줄) |
| `inflow_by_source` | 경로별 방문 수 · 방문자 수 · 신청 수 · 전환율 |
| `inflow_daily` | 날짜(한국 시간)별 · 경로별 같은 숫자 |

전부 Supabase 대시보드 Table Editor에서 본다. 공개 API(publishable 키)로는 읽을 수도 쓸 수도 없다.

### 유입 경로를 나누려면

광고 · 게시물 링크에 `utm_source`를 붙인다. 없으면 이전 페이지 도메인, 그것도 없으면 `direct`로 잡힌다.

```
https://<도메인>/?utm_source=instagram&utm_medium=story&utm_campaign=launch
```

## 구조

| 경로 | 역할 |
| --- | --- |
| `src/features/waitlist/parse.ts` | 폼 해석 · 이름 · 번호 정리 (순수 함수) |
| `src/features/waitlist/actions.ts` | `joinWaitlist` Server Action |
| `src/features/waitlist/waitlist-form.tsx` | 폼 (스타일 없음) |
| `src/features/waitlist/waitlist-modal.tsx` | `<dialog>` 모달 (스타일 없음) |
| `src/features/attribution/parse.ts` | 유입 경로 해석 (순수 함수) |
| `src/features/attribution/server.ts` | 방문자 ID 쿠키 · 요청 호스트 읽기 |
| `src/features/attribution/actions.ts` | `recordVisit` Server Action |
| `src/features/attribution/visit-tracker.tsx` | 페이지 열 때 방문 기록 |
| `src/lib/supabase/server.ts` | 서버 전용 Supabase 클라이언트 (secret 키) |

권한 · 중복 처리 · 유입 집계 방식은 [`docs/decisions/0001-waitlist.md`](docs/decisions/0001-waitlist.md)에 있다.

## 스크립트

- `pnpm typecheck` — 라우트 타입 생성 + `tsc --noEmit`
- `pnpm lint`
- `pnpm build`
