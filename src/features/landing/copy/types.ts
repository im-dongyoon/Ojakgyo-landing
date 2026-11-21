import type { ReactNode } from "react";

import type { WaitlistCopy } from "@/features/waitlist/copy";
import type { Locale } from "@/lib/locale";

/**
 * 랜딩 문구 한 벌. 줄바꿈이 화면 폭마다 다른 문구는 ReactNode로 두고
 * `<br className="hidden lg:inline" />`처럼 직접 적는다.
 */
export type LandingCopy = {
  locale: Locale;
  header: { logo: string; cta: string };
  hero: {
    chip: string;
    title: ReactNode;
    body: ReactNode;
    cta: string;
    helper: string;
    mockupAlt: string;
    noteTitle: string;
    noteBody: string;
  };
  flow: { title: string; items: { title: string; body: string }[] };
  story: { chip: string; title: ReactNode; lead: ReactNode; body: ReactNode };
  steps: {
    chip: string;
    title: ReactNode;
    /** 순서대로 01 · 02 · 03. 이미지와 배치는 steps.tsx가 정한다. */
    items: {
      label: string;
      title: ReactNode;
      detail: ReactNode;
      emphasis: string;
      alt: string;
    }[];
  };
  places: {
    chip: string;
    title: ReactNode;
    body: ReactNode;
    store: {
      name: string;
      meta: string;
      imageAlt: string;
      perkLabel: string;
      perk: string;
    };
  };
  faq: {
    chip: string;
    title: string;
    items: { q: string; a: string; desktopOnly?: boolean }[];
  };
  finalCta: { title: ReactNode; body: string; cta: string };
  waitlist: WaitlistCopy;
};
