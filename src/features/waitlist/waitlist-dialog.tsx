"use client";

import {
  createContext,
  type ReactNode,
  use,
  useCallback,
  useRef,
} from "react";

import { WaitlistForm } from "./waitlist-form";

const OpenWaitlistContext = createContext<(() => void) | null>(null);

/** 페이지에 모달 하나를 두고, 어느 버튼에서든 열 수 있게 한다 */
export function WaitlistDialogProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = useCallback(() => dialogRef.current?.showModal(), []);

  return (
    <OpenWaitlistContext value={open}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="waitlist-title"
        // 바깥(배경)을 누르면 닫는다
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto w-[calc(100%-40px)] max-w-[440px] rounded-[20px] bg-white p-0 text-black shadow-float backdrop:bg-black/50"
      >
        <div className="relative px-6 pb-7 pt-8 lg:px-8 lg:pb-8 lg:pt-10">
          <form method="dialog" className="absolute right-3 top-3">
            <button
              type="submit"
              aria-label="닫기"
              className="flex size-11 items-center justify-center rounded-full text-[28px] leading-none text-grey5 hover:bg-grey1"
            >
              ×
            </button>
          </form>
          <WaitlistForm />
        </div>
      </dialog>
    </OpenWaitlistContext>
  );
}

/** 웨이팅리스트 모달을 여는 버튼 */
export function WaitlistTrigger({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const open = use(OpenWaitlistContext);
  if (!open) {
    throw new Error("WaitlistTrigger는 WaitlistDialogProvider 안에서 써야 합니다.");
  }

  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
