import { WAITLIST_FIELDS } from "./types";

export type ParsedWaitlistForm =
  | { kind: "ok"; email: string }
  | { kind: "bot" }
  | { kind: "invalid"; message: string };

const MAX_EMAIL_LENGTH = 254;
// 형식 검증은 느슨하게 둔다. 실제로 받을 수 있는지는 메일을 보내 봐야 안다.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export function parseWaitlistForm(formData: FormData): ParsedWaitlistForm {
  const honeypot = formData.get(WAITLIST_FIELDS.honeypot);
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return { kind: "bot" };
  }

  const raw = formData.get(WAITLIST_FIELDS.email);
  if (typeof raw !== "string") {
    return { kind: "invalid", message: "이메일을 입력해 주세요." };
  }

  const email = normalizeEmail(raw);
  if (email.length === 0) {
    return { kind: "invalid", message: "이메일을 입력해 주세요." };
  }
  if (email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    return { kind: "invalid", message: "이메일 형식을 확인해 주세요." };
  }

  return { kind: "ok", email };
}
