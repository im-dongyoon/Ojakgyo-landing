import { Container } from "./ui";

const FLOW = [
  { title: "자기소개 등록하기", body: "사진 한 장과 이름, 나이를 적어요" },
  { title: "쪽지와 번호 건네기", body: "마음에 드는 분께 짧은 쪽지를 보내요" },
  { title: "전화하고 만나기", body: "통화가 잘 맞으면 가까운 곳에서 만나요" },
];

/** 인연은 이렇게 이어져요 */
export function Flow() {
  return (
    <section aria-labelledby="flow-title">
      <Container className="flex flex-col gap-4 pb-5 pt-10 lg:gap-[30px] lg:p-0 lg:px-5">
        <h2
          id="flow-title"
          className="text-[24px] font-bold lg:text-[32px] lg:leading-[38px] lg:tracking-[-0.64px]"
        >
          인연은 이렇게 이어져요
        </h2>
        <ol className="flex flex-col gap-4 lg:grid lg:max-w-[1190px] lg:grid-cols-3 lg:gap-[25px]">
          {FLOW.map((item) => (
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
