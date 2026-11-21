import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

/** 둥근 꼬리표. 분홍 배경 섹션 위에서는 흰색을 쓴다. */
export function Chip({
  tone = "pink",
  children,
}: {
  tone?: "pink" | "white";
  children: ReactNode;
}) {
  const toneClass = tone === "pink" ? "bg-pink text-white" : "bg-white text-black";
  return (
    <span
      className={`${toneClass} inline-flex w-fit items-center rounded-full px-3 py-[5px] text-[13px] font-semibold lg:px-[15px] lg:text-[15px] lg:leading-[21px] lg:tracking-[-0.15px]`}
    >
      {children}
    </span>
  );
}

/** 앱 화면을 담는 휴대폰 틀 */
export function PhoneFrame({
  src,
  alt,
  size,
  preload,
}: {
  src: StaticImageData;
  alt: string;
  /** hero: 300×521 / step: 250×434 (데스크톱 기준) */
  size: "hero" | "step";
  preload?: boolean;
}) {
  const frameClass =
    size === "hero"
      ? "h-[400px] w-[230px] rounded-[30px] p-[6px] shadow-device-sm lg:h-[521px] lg:w-[300px] lg:rounded-[39px] lg:p-2 lg:shadow-device"
      : "h-[400px] w-[230px] rounded-[30px] p-[6px] shadow-device-sm lg:h-[434px] lg:w-[250px] lg:rounded-[33px] lg:p-[7px] lg:shadow-device";
  const screenClass =
    size === "hero"
      ? "rounded-[24px] lg:rounded-[31px]"
      : "rounded-[24px] lg:rounded-[26px]";

  return (
    <div className={`${frameClass} shrink-0 overflow-hidden bg-device`}>
      <Image
        src={src}
        alt={alt}
        preload={preload}
        sizes={size === "hero" ? "(min-width: 1024px) 284px, 218px" : "(min-width: 1024px) 236px, 218px"}
        className={`${screenClass} size-full object-cover`}
      />
    </div>
  );
}

/** 섹션 공통 가로 폭. 데스크톱 1440 기준 좌우 120px 여백 */
export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1240px] px-5 ${className}`}>
      {children}
    </div>
  );
}
