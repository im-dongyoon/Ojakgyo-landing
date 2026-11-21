import "server-only";

import { cookies, headers } from "next/headers";

import { resolveAttribution } from "./parse";
import type { Attribution, AttributionInput } from "./types";

const VISITOR_COOKIE = "oj_vid";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** 쿠키의 방문자 ID. 없거나 이상하면 null */
export async function readVisitorId(): Promise<string | null> {
  const value = (await cookies()).get(VISITOR_COOKIE)?.value;
  return value && UUID_PATTERN.test(value) ? value : null;
}

/** 방문자 ID를 읽고, 없으면 새로 만들어 쿠키에 둔다. Server Action 안에서만 부를 수 있다. */
export async function getOrCreateVisitorId(): Promise<string> {
  const existing = await readVisitorId();
  if (existing) return existing;

  const id = crypto.randomUUID();
  (await cookies()).set(VISITOR_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_YEAR_SECONDS,
  });
  return id;
}

/** 요청 호스트를 기준으로 유입 경로를 정한다 */
export async function attributionFrom(
  input: AttributionInput,
): Promise<Attribution> {
  const host = (await headers()).get("host");
  return resolveAttribution(input, host);
}
