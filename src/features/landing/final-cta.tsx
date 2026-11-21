import { WaitlistTrigger } from "@/features/waitlist/waitlist-dialog";

import { Container } from "./ui";

/** 마지막 등록 유도 */
export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title">
      <Container className="pb-12 pt-7 lg:pb-[120px] lg:pt-0">
        <div className="flex flex-col gap-3 rounded-[20px] bg-ink px-6 py-8 text-white lg:max-w-[1169px] lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-10 lg:py-[60px]">
          <div className="flex flex-col gap-3 lg:gap-[15px]">
            <h2
              id="final-cta-title"
              className="text-[24px] font-bold leading-[1.35] lg:text-[44px] lg:leading-[60px] lg:tracking-[-0.88px]"
            >
              오작교에서
              <br className="lg:hidden" /> 새 인연을 시작해보세요
            </h2>
            <p className="text-[15px] font-medium lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.4px]">
              사진 한 장과 이름, 나이만 있으면 돼요
            </p>
          </div>
          <WaitlistTrigger className="mt-5 w-full shrink-0 rounded-[12px] bg-pink px-5 py-4 text-[17px] font-bold text-white lg:mt-0 lg:w-auto lg:rounded-[14px] lg:px-10 lg:py-5 lg:text-[20px]">
            자기소개 등록하기
          </WaitlistTrigger>
        </div>
      </Container>
    </section>
  );
}
