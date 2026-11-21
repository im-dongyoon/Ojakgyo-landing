export const LOCALES = ["ko", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ko";

/** 폼 · 액션 인자로 들어온 값을 언어로 좁힌다. 모르는 값은 기본 언어로 본다. */
export function toLocale(value: unknown): Locale {
  return LOCALES.find((locale) => locale === value) ?? DEFAULT_LOCALE;
}
