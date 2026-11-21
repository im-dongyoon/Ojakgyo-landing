import type { LandingCopy } from "./copy/types";
import { Chip, Container } from "./ui";

/** 오작교가 시작된 이유 */
export function Story({ copy }: { copy: LandingCopy["story"] }) {
  return (
    <section aria-labelledby="story-title">
      <Container className="py-5 lg:py-0">
        <div className="flex flex-col gap-[14px] rounded-[20px] bg-pink-soft-mobile px-6 py-8 lg:max-w-[1169px] lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:bg-pink-soft lg:px-10 lg:py-20">
          <div className="flex flex-col gap-[14px] lg:w-[376px] lg:gap-[15px]">
            <Chip tone="white">{copy.chip}</Chip>
            <h2
              id="story-title"
              className="text-[26px] font-bold leading-[1.35] lg:text-[44px] lg:leading-[60px] lg:tracking-[-0.88px]"
            >
              {copy.title}
            </h2>
          </div>
          <div className="flex flex-col gap-[14px] lg:gap-5">
            <p className="text-[17px] font-bold leading-[1.45] text-ink lg:text-[22px] lg:leading-8 lg:tracking-[-0.44px]">
              {copy.lead}
            </p>
            <p className="text-[15px] font-medium leading-[1.55] text-grey5 lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.4px]">
              {copy.body}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
