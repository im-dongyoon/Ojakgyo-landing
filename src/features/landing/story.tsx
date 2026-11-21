import { Chip, Container } from "./ui";

/** 오작교가 시작된 이유 */
export function Story() {
  return (
    <section aria-labelledby="story-title">
      <Container className="py-5 lg:py-0">
        <div className="flex flex-col gap-[14px] rounded-[20px] bg-pink-soft-mobile px-6 py-8 lg:max-w-[1169px] lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:bg-pink-soft lg:px-10 lg:py-20">
          <div className="flex flex-col gap-[14px] lg:w-[376px] lg:gap-[15px]">
            <Chip tone="white">오작교가 시작된 이유</Chip>
            <h2
              id="story-title"
              className="text-[26px] font-bold leading-[1.35] lg:text-[44px] lg:leading-[60px] lg:tracking-[-0.88px]"
            >
              나이가 들어도
              <br />
              설렘은 그대로니까요
            </h2>
          </div>
          <div className="flex flex-col gap-[14px] lg:gap-5">
            <p className="text-[17px] font-bold leading-[1.45] text-ink lg:text-[22px] lg:leading-8 lg:tracking-[-0.44px]">
              새로운 인연을 만나고 싶어도
              <br />
              먼저 말을 건네기는 쉽지 않아요
            </p>
            <p className="text-[15px] font-medium leading-[1.55] text-grey5 lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.4px]">
              오작교는 65세 이상 어르신이 쪽지와 번호를 건네고,
              <br className="hidden lg:inline" />
              {" "}전화로 이야기 나눈 뒤 가까운 곳에서 만나도록 이어드려요
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
