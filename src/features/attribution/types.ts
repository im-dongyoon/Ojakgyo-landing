/** 브라우저에서 읽어 서버로 보내는 원본 값 */
export type AttributionInput = {
  /** `location.search` (예: `?utm_source=instagram`) */
  search: string;
  /** `document.referrer` */
  referrer: string;
};

/** DB에 저장하는 유입 정보 */
export type Attribution = {
  /** utm_source → referrer 도메인 → `direct` 순으로 정한 유입 경로 */
  source: string;
  medium: string | null;
  campaign: string | null;
  /** referrer 도메인 (앞의 `www.` 등은 뗀 값) */
  referrer: string | null;
};

/** 폼에 실어 보낼 때 쓰는 필드 이름 */
export const ATTRIBUTION_FIELDS = {
  search: "attr_search",
  referrer: "attr_referrer",
} as const;

export const DIRECT_SOURCE = "direct";
