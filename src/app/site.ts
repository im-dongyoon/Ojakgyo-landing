import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";

// 가게 카드 예시만 Noto Sans KR을 쓴다 (Figma 기준)
export const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: false,
});

/** 절대 주소가 필요한 메타데이터(hreflang 등)의 기준 주소 */
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

/** 언어별 페이지를 서로 알려 준다 (검색엔진용 hreflang) */
export const sharedMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    languages: { ko: "/", en: "/en", "x-default": "/" },
  },
};

export const sharedViewport: Viewport = {
  themeColor: "#fff0f4",
};
