import { Chip, Container } from "./ui";

const FAQ = [
  {
    q: "누가 이용할 수 있나요?",
    a: "오작교는 새로운 인연을 찾는 65세 이상 어르신을 위한 서비스예요",
  },
  {
    q: "컴퓨터에서도 사람을 만날 수 있나요?",
    a: "휴대폰 카메라로 소개 페이지의 QR을 찍으면 모바일에서 시작할 수 있어요",
    // 모바일 시안에는 없는 질문
    desktopOnly: true,
  },
  {
    q: "번호는 어떻게 전달하나요?",
    a: "쪽지를 보내면 내 번호가 함께 전해지고, 받은 분이 전화 걸기를 누르면 통화할 수 있어요",
  },
  {
    q: "내 번호가 아무에게나 보이나요?",
    a: "내 번호는 내가 쪽지를 보낸 분께만 전해져요. 사는 동네는 보이지 않고 거리만 보여요",
  },
];

/** 자주 묻는 질문 */
export function Faq() {
  return (
    <section aria-labelledby="faq-title">
      <Container className="flex flex-col gap-3 pb-5 pt-10 lg:flex-row lg:items-start lg:justify-between lg:gap-10 lg:p-0 lg:px-5">
        <div className="flex flex-col gap-3 lg:gap-[15px]">
          <Chip>이용 안내</Chip>
          <h2
            id="faq-title"
            className="text-[26px] font-bold lg:whitespace-nowrap lg:text-[44px] lg:leading-[60px] lg:tracking-[-0.88px]"
          >
            자주 묻는 질문
          </h2>
        </div>
        <dl className="flex flex-col gap-3 lg:w-[753px] lg:shrink">
          {FAQ.map((item) => (
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
