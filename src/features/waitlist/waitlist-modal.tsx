"use client";

import { useRef } from "react";

import { WaitlistForm } from "./waitlist-form";

/** 네이티브 <dialog>로 띄우는 웨이팅리스트 모달. 스타일은 디자인 작업 때 채운다. */
export function WaitlistModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button type="button" onClick={() => dialogRef.current?.showModal()}>
        웨이팅리스트 신청
      </button>

      <dialog ref={dialogRef} aria-labelledby="waitlist-title">
        <h2 id="waitlist-title">웨이팅리스트</h2>
        <WaitlistForm />
        <form method="dialog">
          <button type="submit">닫기</button>
        </form>
      </dialog>
    </>
  );
}
