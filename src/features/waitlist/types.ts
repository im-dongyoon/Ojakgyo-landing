/** `useActionState`로 폼과 Server Action이 주고받는 상태 */
export type WaitlistState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export const initialWaitlistState: WaitlistState = { status: "idle" };

/** 폼 필드 이름. 폼과 파서가 같은 이름을 쓰도록 한곳에 둔다. */
export const WAITLIST_FIELDS = {
  email: "email",
  /** 사람에게는 숨기는 필드. 값이 있으면 봇으로 본다. */
  honeypot: "company",
} as const;
