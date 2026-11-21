import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";

import mockupNote from "@/assets/landing/mockup-note.png";
import mockupPlaces from "@/assets/landing/mockup-places.png";
import mockupRequests from "@/assets/landing/mockup-requests.png";

import { Chip, Container, PhoneFrame } from "./ui";

type Step = {
  label: string;
  title: ReactNode;
  detail: ReactNode;
  emphasis: string;
  image: StaticImageData;
  alt: string;
  /** 데스크톱에서 휴대폰 화면을 왼쪽에 둔다 */
  imageFirst?: boolean;
};

const STEPS: Step[] = [
  {
    label: "01 · 마음 전하기",
    title: (
      <>
        마음에 드는 분께
        <br />
        쪽지를 건네요
      </>
    ),
    detail: "가까이 사는 분들의 사진과 나이, 거리를 볼 수 있어요",
    emphasis: "쪽지를 보내면 내 번호가 함께 전해져요",
    image: mockupNote,
    alt: "오작교 앱의 쪽지 쓰기 화면",
  },
  {
    label: "02 · 전화하기",
    title: (
      <>
        목소리로 먼저
        <br />
        알아가요
      </>
    ),
    detail: (
      <>
        받은 요청에서 쪽지를 보낸 분을 확인해요
        <span className="lg:hidden">.</span>
        <br className="hidden lg:inline" />
        {" "}마음이 가면 전화 걸기를 눌러보세요
      </>
    ),
    emphasis: "채팅 대신 익숙한 전화로 이야기해요",
    image: mockupRequests,
    alt: "오작교 앱의 받은 요청 화면",
    imageFirst: true,
  },
  {
    label: "03 · 만나기",
    title: (
      <>
        첫 데이트는
        <br />
        가까운 찻집에서
      </>
    ),
    detail: (
      <>
        통화가 잘 맞았다면
        <br className="hidden lg:inline" />
        {" "}두 분이 함께 가기 좋은 찻집과 카페를 살펴보세요
      </>
    ),
    emphasis: "장소 카드에서 가게별 방문 혜택을 확인할 수 있어요",
    image: mockupPlaces,
    alt: "오작교 앱의 근처 장소 화면",
  },
];

/** 세 단계로 이어지는 첫 만남 */
export function Steps() {
  return (
    <section aria-labelledby="steps-title">
      <Container className="lg:flex lg:max-w-[1180px] lg:flex-col lg:items-center lg:gap-[60px]">
        <div className="flex flex-col items-center gap-3 pb-5 pt-10 lg:gap-[15px] lg:p-0">
          <Chip>이용 안내</Chip>
          <h2
            id="steps-title"
            className="text-center text-[26px] font-bold leading-[1.35] lg:text-[44px] lg:leading-[60px] lg:tracking-[-0.88px]"
          >
            세 단계로 이어지는
            <br className="lg:hidden" /> 첫 만남
          </h2>
        </div>

        <ol className="flex w-full flex-col lg:gap-[50px]">
          {STEPS.map((step) => (
            <li
              key={step.label}
              className={`flex flex-col gap-3 pb-5 pt-9 lg:items-center lg:justify-between lg:gap-10 lg:p-0 ${
                step.imageFirst ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              <div className="flex flex-col gap-3 lg:w-[500px] lg:gap-[15px]">
                <Chip>{step.label}</Chip>
                <h3 className="text-[26px] font-bold leading-[1.35] lg:text-[44px] lg:leading-[60px] lg:tracking-[-0.88px]">
                  {step.title}
                </h3>
                <p className="text-[16px] font-medium leading-[1.55] text-grey5 lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.4px]">
                  {step.detail}
                </p>
                <p className="text-[16px] font-medium leading-[1.55] text-ink lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.4px]">
                  {step.emphasis}
                </p>
              </div>
              <div className="flex justify-center pb-6 pt-4 lg:p-0">
                <PhoneFrame src={step.image} alt={step.alt} size="step" />
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
