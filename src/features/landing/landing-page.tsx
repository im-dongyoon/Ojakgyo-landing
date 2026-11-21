import { VisitTracker } from "@/features/attribution/visit-tracker";
import { WaitlistDialogProvider } from "@/features/waitlist/waitlist-dialog";

import type { LandingCopy } from "./copy/types";
import { DatePlaces } from "./date-places";
import { Faq } from "./faq";
import { FinalCta } from "./final-cta";
import { Flow } from "./flow";
import { Hero } from "./hero";
import { Steps } from "./steps";
import { Story } from "./story";

/** 랜딩 한 벌. 언어마다 문구만 바꿔 같은 화면을 그린다. */
export function LandingPage({ copy }: { copy: LandingCopy }) {
  return (
    <WaitlistDialogProvider copy={copy.waitlist} locale={copy.locale}>
      <VisitTracker locale={copy.locale} />
      <Hero header={copy.header} hero={copy.hero} />
      {/* 데스크톱은 섹션 사이 80px 간격, 모바일은 섹션별 여백을 쓴다 */}
      <main className="lg:flex lg:flex-col lg:gap-20 lg:pt-10">
        <Flow copy={copy.flow} />
        <Story copy={copy.story} />
        <Steps copy={copy.steps} />
        <DatePlaces copy={copy.places} />
        <Faq copy={copy.faq} />
        <FinalCta copy={copy.finalCta} />
      </main>
    </WaitlistDialogProvider>
  );
}
