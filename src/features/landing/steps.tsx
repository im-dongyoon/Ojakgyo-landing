import type { StaticImageData } from "next/image";

import mockupNote from "@/assets/landing/mockup-note.png";
import mockupPlaces from "@/assets/landing/mockup-places.png";
import mockupRequests from "@/assets/landing/mockup-requests.png";

import type { LandingCopy } from "./copy/types";
import { Chip, Container, PhoneFrame } from "./ui";

/** 단계별 앱 화면. imageFirst면 데스크톱에서 휴대폰 화면을 왼쪽에 둔다. */
const STEP_VISUALS: { image: StaticImageData; imageFirst?: boolean }[] = [
  { image: mockupNote },
  { image: mockupRequests, imageFirst: true },
  { image: mockupPlaces },
];

/** 세 단계로 이어지는 첫 만남 */
export function Steps({ copy }: { copy: LandingCopy["steps"] }) {
  return (
    <section aria-labelledby="steps-title">
      <Container className="lg:flex lg:max-w-[1180px] lg:flex-col lg:items-center lg:gap-[60px]">
        <div className="flex flex-col items-center gap-3 pb-5 pt-10 lg:gap-[15px] lg:p-0">
          <Chip>{copy.chip}</Chip>
          <h2
            id="steps-title"
            className="text-center text-[26px] font-bold leading-[1.35] lg:text-[44px] lg:leading-[60px] lg:tracking-[-0.88px]"
          >
            {copy.title}
          </h2>
        </div>

        <ol className="flex w-full flex-col lg:gap-[50px]">
          {copy.items.map((step, index) => {
            const visual = STEP_VISUALS[index];
            return (
              <li
                key={step.label}
                className={`flex flex-col gap-3 pb-5 pt-9 lg:items-center lg:justify-between lg:gap-10 lg:p-0 ${
                  visual.imageFirst ? "lg:flex-row-reverse" : "lg:flex-row"
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
                  <PhoneFrame src={visual.image} alt={step.alt} size="step" />
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
