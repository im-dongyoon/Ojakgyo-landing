import { type Locale, toLocale } from "@/lib/locale";

import { WAITLIST_FIELDS, type WaitlistErrorCode } from "./types";

export type WaitlistEntry = { name: string; phone: string };

export type ParsedWaitlistForm =
  | { kind: "ok"; entry: WaitlistEntry }
  | { kind: "bot" }
  | { kind: "invalid"; code: WaitlistErrorCode };

const MAX_NAME_LENGTH = 50;
// 010 외에 아직 쓰는 011 · 016 · 017 · 018 · 019도 받는다
const KR_MOBILE_PATTERN = /^01[016789]\d{7,8}$/;
// E.164: 국가번호 포함 최대 15자리. 너무 짧은 값은 걸러낸다.
const E164_DIGITS_PATTERN = /^[1-9]\d{7,14}$/;
const KR_COUNTRY_CODE = "82";

/** 한국어 페이지는 한국 휴대폰만, 영어 페이지는 해외 번호까지 받는다 */
const ALLOW_INTERNATIONAL: Record<Locale, boolean> = { ko: false, en: true };

/** 이름: 앞뒤 공백을 떼고, 안쪽 연속 공백은 하나로 줄인다 */
export function normalizeName(raw: string): string {
  return raw.trim().replace(/\s+/g, " ");
}

/** 82로 시작하는 숫자열을 국내 형식(010…)으로 바꾼다. 82 뒤에 0을 붙여 적은 경우도 받는다. */
function fromKoreanCountryCode(digits: string): string {
  const rest = digits.slice(KR_COUNTRY_CODE.length);
  return rest.startsWith("0") ? rest : `0${rest}`;
}

/**
 * 휴대폰 번호를 저장 형식으로 바꾼다. 형식이 틀리거나 받지 않는 번호면 null.
 * - 한국 휴대폰: `01012345678` (`+82 10…`, `8210…`로 적어도 같은 꼴)
 * - 그 밖의 나라: `allowInternational`일 때만 받는다. `+14155550123` 같은 E.164로,
 *   `+` 또는 `00`으로 시작해야 한다.
 */
export function normalizePhone(
  raw: string,
  { allowInternational }: { allowInternational: boolean },
): string | null {
  const trimmed = raw.trim();
  const digits = trimmed.replace(/\D/g, "");
  const international = trimmed.startsWith("+") || trimmed.startsWith("00");

  if (international) {
    const withCountry = trimmed.startsWith("00") ? digits.slice(2) : digits;
    if (withCountry.startsWith(KR_COUNTRY_CODE)) {
      const domestic = fromKoreanCountryCode(withCountry);
      return KR_MOBILE_PATTERN.test(domestic) ? domestic : null;
    }
    return allowInternational && E164_DIGITS_PATTERN.test(withCountry)
      ? `+${withCountry}`
      : null;
  }

  const domestic = digits.startsWith(KR_COUNTRY_CODE)
    ? fromKoreanCountryCode(digits)
    : digits;
  return KR_MOBILE_PATTERN.test(domestic) ? domestic : null;
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
  const locale = toLocale(formData.get(WAITLIST_FIELDS.locale));
  const phone = normalizePhone(rawPhone, {
    allowInternational: ALLOW_INTERNATIONAL[locale],
  });
  if (phone === null) {
    return { kind: "invalid", code: "phone_invalid" };
  }

  if (formData.get(WAITLIST_FIELDS.agree) === null) {
    return { kind: "invalid", code: "consent_required" };
  }

  return { kind: "ok", entry: { name, phone } };
}
