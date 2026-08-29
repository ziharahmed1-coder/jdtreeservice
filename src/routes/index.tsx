import { createFileRoute } from "@tanstack/react-router";

import { SiteNav } from "@/components/SiteNav";
import { CustomCursor } from "@/components/CustomCursor";
import { Hero } from "@/components/Hero";
import { AboveBelow } from "@/components/AboveBelow";
import { RootSection } from "@/components/RootSection";
import { Services } from "@/components/Services";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Method } from "@/components/Method";
import { Trust } from "@/components/Trust";
import { CinematicCTA } from "@/components/CinematicCTA";
import { QuoteFlow } from "@/components/QuoteFlow";
import { SiteFooter } from "@/components/SiteFooter";

const TITLE = "JD Tree Service — Rooted in Care. Built to Last.";
const DESC =
  "Professional tree removal, trimming, stump grinding and 24/7 storm damage response for your property. Free estimates from licensed, insured arborists.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative bg-background">
      <CustomCursor />
      <SiteNav />
      <Hero />
      <AboveBelow />
      <RootSection />
      <Services />
      <BeforeAfter />
      <Method />
      <Trust />
      <CinematicCTA />
      <QuoteFlow />
      <SiteFooter />
    </main>
  );
}
