# Ojakgyo Landing

Next.js 16 (App Router) + Supabase. 랜딩에서 모달로 웨이팅리스트 이메일만 받는다.

## 시작하기

```bash
pnpm install
cp .env.example .env.local   # Supabase URL · publishable 키 입력
pnpm dev
```

## DB

마이그레이션은 `supabase/migrations/`에 있다. 원격 프로젝트에 적용:

```bash
pnpm exec supabase login
pnpm exec supabase link --project-ref <project-ref>
pnpm exec supabase db push
```

신청 목록은 Supabase 대시보드 Table Editor의 `waitlist`에서 본다. anon 키로는 조회할 수 없다.

## 구조

| 경로 | 역할 |
| --- | --- |
| `src/features/waitlist/parse.ts` | 폼 파싱 · 이메일 정규화 (순수 함수) |
| `src/features/waitlist/actions.ts` | `joinWaitlist` Server Action |
| `src/features/waitlist/waitlist-form.tsx` | 폼 (스타일 없음) |
| `src/features/waitlist/waitlist-modal.tsx` | `<dialog>` 모달 (스타일 없음) |
| `src/lib/supabase/server.ts` | 서버 전용 Supabase 클라이언트 |
| `supabase/migrations/` | `waitlist` 테이블 · RLS |

권한 · 중복 처리 같은 결정은 [`docs/decisions/0001-waitlist.md`](docs/decisions/0001-waitlist.md)에 있다.

## 스크립트

- `pnpm typecheck` — 라우트 타입 생성 + `tsc --noEmit`
- `pnpm lint`
- `pnpm build`
