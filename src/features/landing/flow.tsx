import type { LandingCopy } from "./copy/types";
import { Container } from "./ui";

/** 인연은 이렇게 이어져요 */
export function Flow({ copy }: { copy: LandingCopy["flow"] }) {
  return (
    <section aria-labelledby="flow-title">
      <Container className="flex flex-col gap-4 pb-5 pt-10 lg:gap-[30px] lg:p-0 lg:px-5">
        <h2
          id="flow-title"
          className="text-[24px] font-bold lg:text-[32px] lg:leading-[38px] lg:tracking-[-0.64px]"
        >
          {copy.title}
        </h2>
        <ol className="flex flex-col gap-4 lg:grid lg:max-w-[1190px] lg:grid-cols-3 lg:gap-[25px]">
          {copy.items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-[10px] rounded-[20px] border border-grey2 px-[22px] py-5 lg:px-[30px] lg:py-[25px]"
            >
              <p className="text-[20px] font-bold leading-8 tracking-[-0.4px] lg:text-[22px] lg:tracking-[-0.44px]">
                {item.title}
              </p>
              <p className="text-[16px] leading-6 tracking-[-0.16px] text-grey5">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
