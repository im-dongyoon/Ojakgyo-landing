"use client";

import { useActionState } from "react";

import { joinWaitlist } from "./actions";
import { initialWaitlistState, WAITLIST_FIELDS } from "./types";

/** 동작만 갖춘 폼. 스타일 · 문구는 디자인 작업 때 채운다. */
export function WaitlistForm() {
  const [state, formAction, pending] = useActionState(
    joinWaitlist,
    initialWaitlistState,
  );

  if (state.status === "success") {
    return <p role="status">신청이 완료됐어요.</p>;
  }

  return (
    <form action={formAction}>
      <label htmlFor="waitlist-email">이메일</label>
      <input
        id="waitlist-email"
        name={WAITLIST_FIELDS.email}
        type="email"
        autoComplete="email"
        required
      />

      {/* honeypot: 사람에게는 보이지 않고 봇만 채운다 */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <input
          name={WAITLIST_FIELDS.honeypot}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button type="submit" disabled={pending}>
        {pending ? "신청 중…" : "신청하기"}
      </button>

      <p aria-live="polite">
        {state.status === "error" ? state.message : null}
      </p>
    </form>
  );
}
