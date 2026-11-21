"use client";

import { type FormEvent, startTransition, useActionState } from "react";

import { readAttribution } from "@/features/attribution/client";
import { ATTRIBUTION_FIELDS } from "@/features/attribution/types";
import type { Locale } from "@/lib/locale";

import { joinWaitlist } from "./actions";
import type { WaitlistCopy } from "./copy";
import { initialWaitlistState, WAITLIST_FIELDS } from "./types";

const inputClass =
  "h-14 w-full rounded-[12px] border border-grey2 bg-white px-4 text-[17px] text-ink outline-none placeholder:text-grey4 focus:border-pink focus:ring-2 focus:ring-pink/20";

export function WaitlistForm({
  copy,
  locale,
}: {
  copy: WaitlistCopy;
  locale: Locale;
}) {
  const [state, formAction, pending] = useActionState(
    joinWaitlist,
    initialWaitlistState,
  );

  // form action 대신 onSubmit으로 보낸다. 오류가 나도 입력한 값이 지워지지 않게 하려고.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { search, referrer } = readAttribution();
    formData.set(ATTRIBUTION_FIELDS.search, search);
    formData.set(ATTRIBUTION_FIELDS.referrer, referrer);
    formData.set(WAITLIST_FIELDS.locale, locale);
    startTransition(() => formAction(formData));
  };

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col gap-3 pt-2">
        <h2 id="waitlist-title" className="text-[24px] font-bold leading-[1.35]">
          {copy.successTitle}
        </h2>
        <p className="text-[17px] font-medium leading-[1.5] text-grey5">
          {copy.successBody}
        </p>
        <form method="dialog" className="mt-5">
          <button
            type="submit"
            className="h-14 w-full rounded-[14px] bg-pink text-[18px] font-bold text-white"
          >
            {copy.successConfirm}
          </button>
        </form>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <h2 id="waitlist-title" className="text-[24px] font-bold leading-[1.35]">
        {copy.title}
      </h2>
      <p className="mt-2 text-[16px] font-medium leading-[1.5] text-grey5">
        {copy.description}
      </p>

      <label htmlFor="waitlist-name" className="mt-6 text-[15px] font-semibold">
        {copy.nameLabel}
      </label>
      <input
        id="waitlist-name"
        name={WAITLIST_FIELDS.name}
        type="text"
        autoComplete="name"
        maxLength={50}
        placeholder={copy.namePlaceholder}
        required
        className={`${inputClass} mt-2`}
      />

      <label htmlFor="waitlist-phone" className="mt-4 text-[15px] font-semibold">
        {copy.phoneLabel}
      </label>
      {/* type="tel"만 쓴다. inputMode="numeric"은 일부 키보드에서 +를 못 쳐서 해외 번호를 막는다. */}
      <input
        id="waitlist-phone"
        name={WAITLIST_FIELDS.phone}
        type="tel"
        autoComplete="tel"
        placeholder={copy.phonePlaceholder}
        required
        className={`${inputClass} mt-2`}
      />

      <div className="mt-5 rounded-[12px] bg-grey1/60 p-4">
        <label className="flex items-start gap-3 text-[15px] font-semibold leading-[1.5]">
          <input
            name={WAITLIST_FIELDS.agree}
            type="checkbox"
            required
            className="mt-0.5 size-5 shrink-0 accent-pink"
          />
          {copy.consentLabel}
        </label>
        <ul className="mt-2 pl-8 text-[13px] leading-[1.6] text-grey5">
          {copy.consentDetails.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      {/* honeypot: 사람에게는 보이지 않고 봇만 채운다 */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <input
          name={WAITLIST_FIELDS.honeypot}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p aria-live="polite" className="mt-3 min-h-[22px] text-[15px] font-medium text-pink">
        {state.status === "error" ? copy.errors[state.code] : null}
      </p>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 h-14 w-full rounded-[14px] bg-pink text-[18px] font-bold text-white disabled:opacity-60"
      >
        {pending ? copy.submitting : copy.submit}
      </button>
    </form>
  );
}
