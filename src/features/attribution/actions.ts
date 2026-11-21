"use server";

import { toLocale } from "@/lib/locale";
import { getSupabase } from "@/lib/supabase/server";

import { toAttributionInput } from "./parse";
import { attributionFrom, getOrCreateVisitorId } from "./server";

/** 페이지 방문 한 번을 기록한다. 실패해도 화면에는 영향을 주지 않는다. */
export async function recordVisit(
  search: unknown,
  referrer: unknown,
  locale: unknown,
) {
  try {
    const attribution = await attributionFrom(
      toAttributionInput(search, referrer),
    );
    const visitorId = await getOrCreateVisitorId();

    const { error } = await getSupabase()
      .from("visits")
      .insert({ visitor_id: visitorId, locale: toLocale(locale), ...attribution });
    if (error) console.error("[visits] insert failed", error);
  } catch (err) {
    console.error("[visits] unexpected error", err);
  }
}
