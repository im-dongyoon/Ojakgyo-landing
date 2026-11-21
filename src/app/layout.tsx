import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

// 가게 카드 예시만 Noto Sans KR을 쓴다 (Figma 기준)
const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "오작교 · 65세 이상을 위한 인연 찾기",
  description:
    "가까이 사는 분께 쪽지와 번호를 건네고, 전화로 천천히 알아가보세요. 인생 2막, 설레는 인연을 만나요.",
};

export const viewport: Viewport = {
  themeColor: "#fff0f4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
