import type { Metadata } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "../globals.css";

import { notoSansKr, sharedMetadata, sharedViewport } from "../site";

// 언어마다 루트 레이아웃을 따로 둔다. <html lang>이 맞아야 번역 제안 · 화면 읽기가 제대로 동작한다.
export const metadata: Metadata = {
  ...sharedMetadata,
  title: "오작교 · 65세 이상을 위한 인연 찾기",
  description:
    "가까이 사는 분께 쪽지와 번호를 건네고, 전화로 천천히 알아가보세요. 인생 2막, 설레는 인연을 만나요.",
  alternates: { ...sharedMetadata.alternates, canonical: "/" },
};

export const viewport = sharedViewport;

export default function KoreanRootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
