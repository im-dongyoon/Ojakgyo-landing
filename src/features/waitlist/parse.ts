import { WAITLIST_FIELDS, type WaitlistErrorCode } from "./types";

export type WaitlistEntry = { name: string; phone: string };

export type ParsedWaitlistForm =
  | { kind: "ok"; entry: WaitlistEntry }
  | { kind: "bot" }
  | { kind: "invalid"; code: WaitlistErrorCode };

const MAX_NAME_LENGTH = 50;
// 010 외에 아직 쓰는 011 · 016 · 017 · 018 · 019도 받는다
const MOBILE_PATTERN = /^01[016789]\d{7,8}$/;

/** 이름: 앞뒤 공백을 떼고, 안쪽 연속 공백은 하나로 줄인다 */
export function normalizeName(raw: string): string {
  return raw.trim().replace(/\s+/g, " ");
}

/** 휴대폰 번호: 숫자만 남기고 +82 국가번호는 0으로 바꾼다. 형식이 틀리면 null */
export function normalizePhone(raw: string): string | null {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("82")) digits = `0${digits.slice(2)}`;
  return MOBILE_PATTERN.test(digits) ? digits : null;
}

function getString(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
}

export function parseWaitlistForm(formData: FormData): ParsedWaitlistForm {
  if (getString(formData, WAITLIST_FIELDS.honeypot).length > 0) {
    return { kind: "bot" };
  }

  const name = normalizeName(getString(formData, WAITLIST_FIELDS.name));
  if (name.length === 0) {
    return { kind: "invalid", code: "name_required" };
  }
  if (name.length > MAX_NAME_LENGTH) {
    return { kind: "invalid", code: "name_too_long" };
  }

  const rawPhone = getString(formData, WAITLIST_FIELDS.phone);
  if (rawPhone.trim().length === 0) {
    return { kind: "invalid", code: "phone_required" };
  }
  const phone = normalizePhone(rawPhone);
  if (phone === null) {
    return { kind: "invalid", code: "phone_invalid" };
  }

  if (formData.get(WAITLIST_FIELDS.agree) === null) {
    return { kind: "invalid", code: "consent_required" };
  }

  return { kind: "ok", entry: { name, phone } };
}
