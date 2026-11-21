import Image from "next/image";

import mockupMatch from "@/assets/landing/mockup-match.png";
import profileDesktop from "@/assets/landing/profile-desktop.png";
import profileMobile from "@/assets/landing/profile-mobile.png";
import { WaitlistTrigger } from "@/features/waitlist/waitlist-dialog";

import type { LandingCopy } from "./copy/types";
import { Chip, Container, PhoneFrame } from "./ui";

/** 상단바 + 첫 화면. 분홍 그라데이션 배경을 함께 쓴다. */
export function Hero({
  header,
  hero,
}: Pick<LandingCopy, "header" | "hero">) {
  return (
    <div className="bg-gradient-to-b from-hero to-white lg:bg-[length:100%_720px] lg:bg-no-repeat lg:pb-10">
      <header>
        <Container className="flex h-[60px] items-center justify-between lg:h-[70px]">
          <p className="text-[18px] font-medium lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.4px]">
            {header.logo}
          </p>
          <WaitlistTrigger className="rounded-[8px] bg-pink px-[14px] py-2 text-[13px] font-semibold text-white lg:rounded-[10px] lg:px-5 lg:py-[10px] lg:text-[15px]">
            {header.cta}
          </WaitlistTrigger>
        </Container>
      </header>

      <section aria-labelledby="hero-title">
        <Container className="flex flex-col gap-[18px] pb-10 pt-7 lg:max-w-[1180px] lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:pb-0 lg:pt-[50px]">
          <div className="flex flex-col gap-[18px] lg:w-[477px] lg:gap-[35px]">
            <Chip>{hero.chip}</Chip>
            <h1
              id="hero-title"
              className="text-[34px] font-bold leading-[1.3] lg:text-[60px] lg:leading-[72px] lg:tracking-[-1.8px]"
            >
              {hero.title}
            </h1>
            <p className="text-[17px] font-medium leading-[1.5] text-grey5 lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.4px]">
              {hero.body}
            </p>
            <div className="flex flex-col items-center gap-[10px] lg:items-start lg:gap-3">
              <WaitlistTrigger className="w-full rounded-[14px] bg-pink px-5 py-[18px] text-[18px] font-bold text-white lg:w-auto lg:px-9 lg:text-[20px]">
                {hero.cta}
              </WaitlistTrigger>
              <p className="text-center text-[14px] font-medium text-grey4 lg:text-left lg:text-[16px]">
                {hero.helper}
              </p>
            </div>
          </div>

          <HeroMockup hero={hero} />
        </Container>
      </section>
    </div>
  );
}

function HeroMockup({ hero }: Pick<LandingCopy, "hero">) {
  return (
    <div className="relative mx-auto h-[430px] w-full max-w-[335px] shrink-0 lg:mx-0 lg:h-[560px] lg:w-[500px] lg:max-w-none">
      <div className="absolute left-[60px] top-0 lg:left-[170px]">
        <PhoneFrame src={mockupMatch} alt={hero.mockupAlt} size="hero" preload />
      </div>

      <div className="absolute left-0 top-[356px] flex items-center gap-[10px] rounded-[16px] bg-white py-3 pl-3 pr-[18px] shadow-float-sm lg:top-[430px] lg:gap-[14px] lg:rounded-[20px] lg:py-4 lg:pl-4 lg:pr-6 lg:shadow-float">
        <Image src={profileMobile} alt="" className="size-10 lg:hidden" />
        <Image src={profileDesktop} alt="" className="hidden size-[52px] lg:block" />
        <div className="flex flex-col gap-[2px] whitespace-nowrap lg:gap-1">
          <p className="text-[14px] font-bold text-ink lg:text-[16px]">
            {hero.noteTitle}
          </p>
          <p className="text-[13px] font-medium text-grey5 lg:text-[15px]">
            {hero.noteBody}
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute left-[268px] top-14 flex size-11 items-center justify-center rounded-full bg-pink text-[20px] font-bold text-white shadow-device-sm lg:left-[440px] lg:top-[70px] lg:size-14 lg:text-[26px] lg:shadow-device"
      >
        ♥
      </div>
    </div>
  );
}
