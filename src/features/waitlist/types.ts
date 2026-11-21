/** 서버가 돌려주는 오류 코드. 문구는 화면이 언어에 맞게 고른다. */
export type WaitlistErrorCode =
  | "name_required"
  | "name_too_long"
  | "phone_required"
  | "phone_invalid"
  | "consent_required"
  | "server_error";

/** `useActionState`로 폼과 Server Action이 주고받는 상태 */
export type WaitlistState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; code: WaitlistErrorCode };

export const initialWaitlistState: WaitlistState = { status: "idle" };

/** 폼 필드 이름. 폼과 파서가 같은 이름을 쓰도록 한곳에 둔다. */
export const WAITLIST_FIELDS = {
  name: "name",
  phone: "phone",
  /** 개인정보 수집 · 이용 동의 체크박스 */
  agree: "agree",
  /** 신청한 페이지의 언어 (`ko` · `en`) */
  locale: "locale",
  /** 사람에게는 숨기는 필드. 값이 있으면 봇으로 본다. */
  honeypot: "company",
} as const;
