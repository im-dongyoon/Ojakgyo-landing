import type { Metadata } from "next";
import type { ReactNode } from "react";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "../globals.css";

import { notoSansKr, sharedMetadata, sharedViewport } from "../site";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "Ojakgyo · Dating for people 65+",
  description:
    "Pass a note and your number to someone nearby, then get to know each other over the phone. A new chapter, a new connection.",
  alternates: { ...sharedMetadata.alternates, canonical: "/en" },
};

export const viewport = sharedViewport;

export default function EnglishRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${notoSansKr.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
