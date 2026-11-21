"use client";

import { useActionState } from "react";

import { readAttribution } from "@/features/attribution/client";
import { ATTRIBUTION_FIELDS } from "@/features/attribution/types";

import { joinWaitlist } from "./actions";
import { initialWaitlistState, WAITLIST_FIELDS } from "./types";

/** 동작만 갖춘 폼. 스타일 · 문구는 디자인 작업 때 채운다. */
export function WaitlistForm() {
  const [state, formAction, pending] = useActionState(
    joinWaitlist,
    initialWaitlistState,
  );

  // 제출할 때 유입 정보를 함께 싣는다
  const submit = (formData: FormData) => {
    const { search, referrer } = readAttribution();
    formData.set(ATTRIBUTION_FIELDS.search, search);
    formData.set(ATTRIBUTION_FIELDS.referrer, referrer);
    formAction(formData);
  };

  if (state.status === "success") {
    return <p role="status">신청이 완료됐어요.</p>;
  }

  return (
    <form action={submit}>
      <label htmlFor="waitlist-name">이름</label>
      <input
        id="waitlist-name"
        name={WAITLIST_FIELDS.name}
        type="text"
        autoComplete="name"
        maxLength={50}
        required
      />

      <label htmlFor="waitlist-phone">휴대폰 번호</label>
      <input
        id="waitlist-phone"
        name={WAITLIST_FIELDS.phone}
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        placeholder="010-1234-5678"
        required
      />

      <label>
        <input name={WAITLIST_FIELDS.agree} type="checkbox" required />
        개인정보 수집 · 이용에 동의합니다 (필수)
      </label>

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
