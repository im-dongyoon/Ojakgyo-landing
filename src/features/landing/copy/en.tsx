import type { LandingCopy } from "./types";

/**
 * 영어 랜딩 문구 (/en). 한국어 문구를 옮기되 직역하지 않고 자연스러운 영어로 썼다.
 * 영어는 한 줄이 길어서, 모바일에서는 강제 줄바꿈 대신 자연스럽게 흐르도록
 * `<br className="hidden lg:inline" />`를 주로 쓴다.
 */
export const en: LandingCopy = {
  locale: "en",
  header: { logo: "Ojakgyo", cta: "Introduce yourself" },
  hero: {
    chip: "Dating for people 65+",
    title: (
      <>
        A new chapter,
        <br />
        a new connection
      </>
    ),
    body: (
      <>
        Pass a note and your number to someone nearby,
        <br className="hidden lg:inline" />
        {" "}then get to know each other over the phone.
      </>
    ),
    cta: "Introduce yourself",
    helper: "All you need is a photo, your name, and your age",
    mockupAlt: "Ojakgyo app screen introducing someone nearby",
    noteTitle: "Youngsoo sent you a note",
    noteBody: "“Shall we take a walk?”",
  },
  flow: {
    title: "How a connection begins",
    items: [
      { title: "Introduce yourself", body: "Add a photo, your name, and your age" },
      { title: "Send a note and number", body: "Send a short note to someone you like" },
      { title: "Call, then meet", body: "If the call goes well, meet somewhere nearby" },
    ],
  },
  story: {
    chip: "Why we built Ojakgyo",
    title: (
      <>
        Butterflies
        <br />
        never get old
      </>
    ),
    lead: (
      <>
        You’d love to meet someone new,
        <br />
        but saying hello first isn’t easy
      </>
    ),
    body: (
      <>
        Ojakgyo helps people 65 and over pass along a note and a number,
        <br className="hidden lg:inline" />
        {" "}talk on the phone, then meet somewhere close to home
      </>
    ),
  },
  steps: {
    chip: "Getting started",
    title: (
      <>
        Three steps to
        <br className="lg:hidden" /> a first meeting
      </>
    ),
    items: [
      {
        label: "01 · Reach out",
        title: (
          <>
            Send a note
            <br />
            to someone you like
          </>
        ),
        detail: "See the photos, ages, and distances of people nearby",
        emphasis: "Your number goes along with your note",
        alt: "Ojakgyo app screen for writing a note",
      },
      {
        label: "02 · Call",
        title: (
          <>
            Get to know
            <br />
            each other by voice
          </>
        ),
        detail: (
          <>
            Check who sent you a note in Requests.
            <br className="hidden lg:inline" />
            {" "}If you feel a connection, tap Call.
          </>
        ),
        emphasis: "Talk on the phone, not in a chat app",
        alt: "Ojakgyo app screen listing received requests",
      },
      {
        label: "03 · Meet",
        title: (
          <>
            A first date
            <br />
            at a nearby tea house
          </>
        ),
        detail: (
          <>
            If the call went well,
            <br className="hidden lg:inline" />
            {" "}browse tea houses and cafés that suit you both
          </>
        ),
        emphasis: "Each place card shows its visit perks",
        alt: "Ojakgyo app screen showing places nearby",
      },
    ],
  },
  places: {
    chip: "Date spots",
    title: (
      <>
        Find a place
        <br />
        to go together
      </>
    ),
    body: (
      <>
        See photos, locations, and perks
        <br className="hidden lg:inline" />
        {" "}all at a glance
      </>
    ),
    store: {
      name: "Dajeong Café",
      meta: "Sample place · View map ↗",
      imageAlt: "Inside Dajeong Café",
      perkLabel: "Partner perk",
      perk: "10% off drinks for two",
    },
  },
  faq: {
    chip: "Questions",
    title: "Common questions",
    items: [
      {
        q: "Who can use Ojakgyo?",
        a: "Ojakgyo is for people 65 and over who’d like to meet someone new",
      },
      {
        q: "Can I meet people from a computer?",
        a: "Scan the QR code on the intro page with your phone camera to get started on mobile",
        desktopOnly: true,
      },
      {
        q: "How is my number shared?",
        a: "Your number goes along with your note. When they tap Call, you’re connected by phone",
      },
      {
        q: "Can anyone see my number?",
        a: "Only the people you send a note to receive your number. Your neighborhood stays hidden — only the distance is shown",
      },
    ],
  },
  finalCta: {
    title: (
      <>
        Start something new
        <br className="lg:hidden" /> on Ojakgyo
      </>
    ),
    body: "All you need is a photo, your name, and your age",
    cta: "Introduce yourself",
  },
  waitlist: {
    title: "Introduce yourself",
    description: (
      <>
        We’ll let you know as soon as Ojakgyo opens.
        <br />
        Leave your name and mobile number.
      </>
    ),
    nameLabel: "Name",
    namePlaceholder: "Jane Smith",
    phoneLabel: "Mobile number",
    phonePlaceholder: "+1 555 123 4567",
    consentLabel: "I agree to the collection and use of my personal information (required)",
    consentDetails: [
      "Collected: name, mobile number",
      "Purpose: letting you know when Ojakgyo launches",
      "Retention: deleted after the launch notice",
    ],
    submit: "Sign up",
    submitting: "Sending…",
    successTitle: "You’re on the list",
    successBody: (
      <>
        We’ll reach out to the number you left
        <br />
        as soon as Ojakgyo opens.
      </>
    ),
    successConfirm: "OK",
    close: "Close",
    errors: {
      name_required: "Please enter your name.",
      name_too_long: "That name is too long.",
      phone_required: "Please enter your mobile number.",
      phone_invalid: "Please check your number and include the country code (e.g. +1 555 123 4567).",
      consent_required: "Please agree to the collection and use of your information.",
      server_error: "Something went wrong. Please try again in a moment.",
    },
  },
};
