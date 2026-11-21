import { VisitTracker } from "@/features/attribution/visit-tracker";
import { DatePlaces } from "@/features/landing/date-places";
import { Faq } from "@/features/landing/faq";
import { FinalCta } from "@/features/landing/final-cta";
import { Flow } from "@/features/landing/flow";
import { Hero } from "@/features/landing/hero";
import { Steps } from "@/features/landing/steps";
import { Story } from "@/features/landing/story";
import { WaitlistDialogProvider } from "@/features/waitlist/waitlist-dialog";

export default function Home() {
  return (
    <WaitlistDialogProvider>
      <VisitTracker locale="ko" />
      <Hero />
      {/* 데스크톱은 섹션 사이 80px 간격, 모바일은 섹션별 여백을 쓴다 */}
      <main className="lg:flex lg:flex-col lg:gap-20 lg:pt-10">
        <Flow />
        <Story />
        <Steps />
        <DatePlaces />
        <Faq />
        <FinalCta />
      </main>
    </WaitlistDialogProvider>
  );
}
