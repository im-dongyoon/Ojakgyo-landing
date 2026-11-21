import { WaitlistTrigger } from "@/features/waitlist/waitlist-dialog";

import type { LandingCopy } from "./copy/types";
import { Container } from "./ui";

/** 마지막 등록 유도 */
export function FinalCta({ copy }: { copy: LandingCopy["finalCta"] }) {
  return (
    <section aria-labelledby="final-cta-title">
      <Container className="pb-12 pt-7 lg:pb-[120px] lg:pt-0">
        <div className="flex flex-col gap-3 rounded-[20px] bg-ink px-6 py-8 text-white lg:max-w-[1169px] lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-10 lg:py-[60px]">
          <div className="flex flex-col gap-3 lg:gap-[15px]">
            <h2
              id="final-cta-title"
              className="text-[24px] font-bold leading-[1.35] lg:text-[44px] lg:leading-[60px] lg:tracking-[-0.88px]"
            >
              {copy.title}
            </h2>
            <p className="text-[15px] font-medium lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.4px]">
              {copy.body}
            </p>
          </div>
          <WaitlistTrigger className="mt-5 w-full shrink-0 rounded-[12px] bg-pink px-5 py-4 text-[17px] font-bold text-white lg:mt-0 lg:w-auto lg:rounded-[14px] lg:px-10 lg:py-5 lg:text-[20px]">
            {copy.cta}
          </WaitlistTrigger>
        </div>
      </Container>
    </section>
  );
}
