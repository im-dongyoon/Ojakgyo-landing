import type { LandingCopy } from "./copy/types";
import { Chip, Container } from "./ui";

/** 자주 묻는 질문 */
export function Faq({ copy }: { copy: LandingCopy["faq"] }) {
  return (
    <section aria-labelledby="faq-title">
      <Container className="flex flex-col gap-3 pb-5 pt-10 lg:flex-row lg:items-start lg:justify-between lg:gap-10 lg:p-0 lg:px-5">
        <div className="flex flex-col gap-3 lg:gap-[15px]">
          <Chip>{copy.chip}</Chip>
          <h2
            id="faq-title"
            className="text-[26px] font-bold lg:whitespace-nowrap lg:text-[44px] lg:leading-[60px] lg:tracking-[-0.88px]"
          >
            {copy.title}
          </h2>
        </div>
        <dl className="flex flex-col gap-3 lg:w-[753px] lg:shrink">
          {copy.items.map((item) => (
            <div
              key={item.q}
              className={`flex-col gap-[10px] rounded-[20px] border border-grey2 p-5 lg:px-[30px] ${
                item.desktopOnly ? "hidden lg:flex" : "flex"
              }`}
            >
              <dt className="text-[18px] font-bold leading-8 tracking-[-0.36px] lg:text-[22px] lg:tracking-[-0.44px]">
                {item.q}
              </dt>
              <dd className="text-[15px] leading-[1.5] tracking-[-0.15px] text-grey5 lg:text-[16px] lg:leading-6 lg:tracking-[-0.16px]">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
