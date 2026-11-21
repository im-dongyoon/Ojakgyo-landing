import type { ReactNode } from "react";

import type { WaitlistErrorCode } from "./types";

/** 신청 모달 문구. 언어마다 하나씩 둔다. */
export type WaitlistCopy = {
  title: string;
  description: ReactNode;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  consentLabel: string;
  consentDetails: string[];
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: ReactNode;
  successConfirm: string;
  close: string;
  errors: Record<WaitlistErrorCode, string>;
};
