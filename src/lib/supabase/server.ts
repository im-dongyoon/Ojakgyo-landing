import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | undefined;

/**
 * 서버 전용 Supabase 클라이언트. secret 키를 쓰므로 행 단위 보안을 통과한다.
 * 공개 API 권한은 모두 닫혀 있어서 DB 쓰기는 이 클라이언트로만 한다 (docs/decisions/0001-waitlist.md).
 */
export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL, SUPABASE_SECRET_KEY 환경 변수가 필요합니다. .env.example을 참고하세요.",
    );
  }

  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
