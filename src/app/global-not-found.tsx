import type { Metadata } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

// 언어별 루트 레이아웃을 따로 두면 공통 404를 만들 레이아웃이 없어서 이 파일로 그린다.
export const metadata: Metadata = {
  title: "오작교 · 페이지를 찾을 수 없어요",
};

export default function GlobalNotFound() {
  return (
    <html lang="ko" className="antialiased">
      <body className="flex min-h-dvh flex-col items-center justify-center gap-4 px-5 text-center">
        <p className="text-[20px] font-medium">오작교</p>
        <h1 className="text-[26px] font-bold leading-[1.35]">
          페이지를 찾을 수 없어요
        </h1>
        <p lang="en" className="text-[16px] text-grey5">
          This page doesn’t exist.
        </p>
        <div className="mt-2 flex gap-3">
          {/* 루트 레이아웃이 달라 전체 새로고침으로 이동하므로 <a>를 쓴다 */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" className="rounded-[12px] bg-pink px-5 py-3 text-[16px] font-bold text-white">
            처음으로
          </a>
          <a href="/en" className="rounded-[12px] border border-grey2 px-5 py-3 text-[16px] font-bold">
            English
          </a>
        </div>
      </body>
    </html>
  );
}
