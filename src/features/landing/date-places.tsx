import Image from "next/image";

import storeDajeong from "@/assets/landing/store-dajeong.png";

import type { LandingCopy } from "./copy/types";
import { Chip, Container } from "./ui";

/** 데이트 장소 */
export function DatePlaces({ copy }: { copy: LandingCopy["places"] }) {
  return (
    <section aria-labelledby="places-title">
      <Container className="py-5 lg:py-0">
        <div className="flex flex-col gap-[14px] rounded-[20px] bg-grey1 px-5 py-7 lg:max-w-[1169px] lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-[60px] lg:pl-10 lg:pr-16">
          <div className="flex flex-col gap-[14px] lg:w-[376px] lg:gap-[15px]">
            <Chip tone="white">{copy.chip}</Chip>
            <h2
              id="places-title"
              className="text-[24px] font-bold leading-[1.35] lg:text-[44px] lg:leading-[60px] lg:tracking-[-0.88px]"
            >
              {copy.title}
            </h2>
            <p className="text-[15px] font-medium leading-[1.55] text-grey5 lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.4px]">
              {copy.body}
            </p>
          </div>
          <StoreCard store={copy.store} />
        </div>
      </Container>
    </section>
  );
}

/** 앱의 가게 카드 예시 (Figma에서 Noto Sans KR 사용) */
function StoreCard({ store }: { store: LandingCopy["places"]["store"] }) {
  return (
    <div className="w-full overflow-hidden rounded-[16px] bg-white font-noto leading-[1.5] lg:mt-[18px] lg:w-[470px] lg:shrink-0">
      <div className="flex items-center gap-[17px] p-[19px] pr-0">
        <Image
          src={storeDajeong}
          alt={store.imageAlt}
          sizes="104px"
          className="h-[86px] w-[104px] shrink-0 rounded-[8px] object-cover"
        />
        {/* 좁은 화면에서 안내 줄이 잘리지 않고 줄바꿈되게 한다 (영어 문구가 더 길다) */}
        <div className="flex min-w-0 flex-col gap-1">
          <p className="text-[22px] font-bold tracking-[-0.44px] text-ink">{store.name}</p>
          <p className="text-[15px] tracking-[-0.3px] text-grey5">{store.meta}</p>
        </div>
      </div>
      <div className="flex h-14 items-center gap-3 whitespace-nowrap bg-grey6 pl-[19px] text-[16px] tracking-[-0.32px] text-white">
        <p className="font-bold">{store.perkLabel}</p>
        <p>{store.perk}</p>
      </div>
    </div>
  );
}
