"use server";

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
    return { status: "error", message: parsed.message };
  }

  try {
    // returning 없이 insert한다. anon에는 select 권한이 없다.
    const { error } = await getSupabase()
      .from("waitlist")
      .insert({ email: parsed.email });

    // 이미 등록된 이메일도 성공으로 응답한다 (docs/decisions/0001-waitlist.md)
    if (error && error.code !== UNIQUE_VIOLATION) {
      console.error("[waitlist] insert failed", error);
      return {
        status: "error",
        message: "잠시 후 다시 시도해 주세요.",
      };
    }
  } catch (err) {
    console.error("[waitlist] unexpected error", err);
    return { status: "error", message: "잠시 후 다시 시도해 주세요." };
  }

  return { status: "success" };
}
