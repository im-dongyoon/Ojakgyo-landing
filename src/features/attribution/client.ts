import type { AttributionInput } from "./types";

/** 브라우저에서 현재 주소의 쿼리와 이전 페이지 주소를 읽는다 */
export function readAttribution(): AttributionInput {
  return { search: window.location.search, referrer: document.referrer };
}
