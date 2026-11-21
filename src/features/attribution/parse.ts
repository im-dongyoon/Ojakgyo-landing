import { type Attribution, type AttributionInput, DIRECT_SOURCE } from "./types";

const MAX_INPUT_LENGTH = 2048;
const MAX_VALUE_LENGTH = 100;
// 같은 서비스의 다른 하위 도메인을 하나로 묶는다 (l.instagram.com → instagram.com)
const HOST_PREFIX = /^(www|m|l|lm|mobile)\./;

function clean(value: string | null): string | null {
  if (value === null) return null;
  const trimmed = value.trim().toLowerCase().slice(0, MAX_VALUE_LENGTH);
  return trimmed.length > 0 ? trimmed : null;
}

function hostOf(url: string): string | null {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return null;
  }
}

export function normalizeHost(host: string): string {
  return host.toLowerCase().replace(HOST_PREFIX, "");
}

/**
 * 유입 경로를 정한다. utm_source → referrer 도메인 → direct 순.
 * @param selfHost 우리 사이트 호스트. 사이트 안에서 이동한 referrer는 무시한다.
 */
export function resolveAttribution(
  input: AttributionInput,
  selfHost: string | null,
): Attribution {
  const params = new URLSearchParams(input.search.slice(0, MAX_INPUT_LENGTH));
  const utmSource = clean(params.get("utm_source"));
  const medium = clean(params.get("utm_medium"));
  const campaign = clean(params.get("utm_campaign"));

  const rawHost = hostOf(input.referrer.slice(0, MAX_INPUT_LENGTH));
  const isSelf =
    rawHost !== null &&
    selfHost !== null &&
    normalizeHost(rawHost) === normalizeHost(selfHost.split(":")[0]);
  const referrer =
    rawHost && !isSelf ? clean(normalizeHost(rawHost)) : null;

  return {
    source: utmSource ?? referrer ?? DIRECT_SOURCE,
    medium,
    campaign,
    referrer,
  };
}

/** 폼 · 액션 인자로 들어온 값을 문자열로 좁힌다. 서버 액션 인자는 믿을 수 없다. */
export function toAttributionInput(search: unknown, referrer: unknown): AttributionInput {
  return {
    search: typeof search === "string" ? search : "",
    referrer: typeof referrer === "string" ? referrer : "",
  };
}
