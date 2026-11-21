import type { LandingCopy } from "./types";

/** 한국어 랜딩 문구 (Figma "동윤 작업용 오작교 · 데스크톱 웹" 기준) */
export const ko: LandingCopy = {
  locale: "ko",
  header: { logo: "오작교", cta: "자기소개 등록하기" },
  hero: {
    chip: "65세 이상을 위한 인연 찾기",
    title: (
      <>
        인생 2막,
        <br />
        설레는 인연을 만나요
      </>
    ),
    body: (
      <>
        가까이 사는 분께 쪽지와 번호를 건네고,
        <br />
        전화로 천천히 알아가보세요.
      </>
    ),
    cta: "자기소개 등록하기",
    helper: "사진 한 장과 이름, 나이만 있으면 시작할 수 있어요",
    mockupAlt: "오작교 앱의 이웃 소개 화면",
    noteTitle: "김영수님이 쪽지를 보냈어요",
    noteBody: "“같이 산책하실래요?”",
  },
  flow: {
    title: "인연은 이렇게 이어져요",
    items: [
      { title: "자기소개 등록하기", body: "사진 한 장과 이름, 나이를 적어요" },
      { title: "쪽지와 번호 건네기", body: "마음에 드는 분께 짧은 쪽지를 보내요" },
      { title: "전화하고 만나기", body: "통화가 잘 맞으면 가까운 곳에서 만나요" },
    ],
  },
  story: {
    chip: "오작교가 시작된 이유",
    title: (
      <>
        나이가 들어도
        <br />
        설렘은 그대로니까요
      </>
    ),
    lead: (
      <>
        새로운 인연을 만나고 싶어도
        <br />
        먼저 말을 건네기는 쉽지 않아요
      </>
    ),
    body: (
      <>
        오작교는 65세 이상 어르신이 쪽지와 번호를 건네고,
        <br className="hidden lg:inline" />
        {" "}전화로 이야기 나눈 뒤 가까운 곳에서 만나도록 이어드려요
      </>
    ),
  },
  steps: {
    chip: "이용 안내",
    title: (
      <>
        세 단계로 이어지는
        <br className="lg:hidden" /> 첫 만남
      </>
    ),
    items: [
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
        alt: "오작교 앱의 받은 요청 화면",
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
        alt: "오작교 앱의 근처 장소 화면",
      },
    ],
  },
  places: {
    chip: "데이트 장소",
    title: (
      <>
        두 분이 함께 갈 곳을
        <br />
        찾아보세요
      </>
    ),
    body: (
      <>
        가게 사진과 위치, 받을 수 있는 혜택을
        <br className="hidden lg:inline" />
        {" "}한눈에 볼 수 있어요
      </>
    ),
    store: {
      name: "다정카페",
      meta: "예시 가게 · 지도 보기 ↗",
      imageAlt: "다정카페 실내 사진",
      perkLabel: "제휴 혜택",
      perk: "두 분 방문 시 음료 10% 할인",
    },
  },
  faq: {
    chip: "이용 안내",
    title: "자주 묻는 질문",
    items: [
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
    ],
  },
  finalCta: {
    title: (
      <>
        오작교에서
        <br className="lg:hidden" /> 새 인연을 시작해보세요
      </>
    ),
    body: "사진 한 장과 이름, 나이만 있으면 돼요",
    cta: "자기소개 등록하기",
  },
  waitlist: {
    title: "자기소개 등록하기",
    description: (
      <>
        오작교가 문을 열면 가장 먼저 알려드릴게요.
        <br />
        이름과 휴대폰 번호를 남겨주세요.
      </>
    ),
    nameLabel: "이름",
    namePlaceholder: "홍길동",
    phoneLabel: "휴대폰 번호",
    phonePlaceholder: "010-1234-5678",
    consentLabel: "개인정보 수집 · 이용에 동의합니다 (필수)",
    consentDetails: [
      "수집 항목: 이름, 휴대폰 번호",
      "이용 목적: 오작교 서비스 출시 안내",
      "보유 기간: 출시 안내 후 파기",
    ],
    submit: "신청하기",
    submitting: "보내는 중…",
    successTitle: "신청이 완료됐어요",
    successBody: (
      <>
        오작교가 문을 열면 남겨주신 번호로
        <br />
        가장 먼저 알려드릴게요.
      </>
    ),
    successConfirm: "확인",
    close: "닫기",
    errors: {
      name_required: "이름을 입력해 주세요.",
      name_too_long: "이름이 너무 길어요.",
      phone_required: "휴대폰 번호를 입력해 주세요.",
      phone_invalid: "휴대폰 번호를 확인해 주세요.",
      consent_required: "개인정보 수집 · 이용에 동의해 주세요.",
      server_error: "잠시 후 다시 시도해 주세요.",
    },
  },
};
