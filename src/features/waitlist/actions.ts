"use server";

import { toAttributionInput } from "@/features/attribution/parse";
import { attributionFrom, readVisitorId } from "@/features/attribution/server";
import { ATTRIBUTION_FIELDS } from "@/features/attribution/types";
import { getSupabase } from "@/lib/supabase/server";

import { parseWaitlistForm } from "./parse";
import type { WaitlistState } from "./types";

const UNIQUE_VIOLATION = "23505";

export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const parsed = parseWaitlistForm(formData);

  // 봇에게는 성공처럼 보이게 하고 저장하지 않는다
  if (parsed.kind === "bot") return { status: "success" };
  if (parsed.kind === "invalid") {
    return { status: "error", code: parsed.code };
  }

  try {
    const attribution = await attributionFrom(
      toAttributionInput(
        formData.get(ATTRIBUTION_FIELDS.search),
        formData.get(ATTRIBUTION_FIELDS.referrer),
      ),
    );
    const visitorId = await readVisitorId();

    const { error } = await getSupabase()
      .from("waitlist")
      .insert({ ...parsed.entry, ...attribution, visitor_id: visitorId });

    // 이미 신청한 번호도 완료로 응답한다 (docs/decisions/0001-waitlist.md)
    if (error && error.code !== UNIQUE_VIOLATION) {
      console.error("[waitlist] insert failed", error);
      return { status: "error", code: "server_error" };
    }
  } catch (err) {
    console.error("[waitlist] unexpected error", err);
    return { status: "error", code: "server_error" };
  }

  return { status: "success" };
}
