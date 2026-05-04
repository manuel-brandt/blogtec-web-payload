import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogoBar from "@/components/LogoBar";
import StatsBar from "@/components/StatsBar";
import ServicesSection from "@/components/ServicesSection";
import LinkCenterSection from "@/components/LinkCenterSection";
import OutsourcingSection from "@/components/OutsourcingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ResourcesSection from "@/components/ResourcesSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "pages",
      where: { slug: { equals: "home" } },
      depth: 0,
      limit: 1,
    });
    const page = docs[0] as { meta?: { title?: string | null; description?: string | null } } | undefined;
    if (page?.meta?.title || page?.meta?.description) {
      return {
        title: page.meta?.title ?? undefined,
        description: page.meta?.description ?? undefined,
        openGraph: {
          title: page.meta?.title ?? undefined,
          description: page.meta?.description ?? undefined,
          url: "https://blogtec.io",
          siteName: "Blogtec",
        },
      };
    }
  } catch {}
  return {
    title: "Blogtec - Marketing Leistungen, einfach ausgelagert.",
    description:
      "SEO, Google-Ads, Design und Entwicklung mit hervorragender Flexibilität und Zuverlässigkeit. Outsorce your marketing with Blogtec.",
    openGraph: {
      title: "Blogtec - Marketing Leistungen, einfach ausgelagert.",
      description:
        "SEO, Google-Ads, Design und Entwicklung mit hervorragender Flexibilität und Zuverlässigkeit.",
      url: "https://blogtec.io",
      siteName: "Blogtec",
    },
  };
}

export default function Home() {
  return (
    <main>
      <AnnouncementBar />
      <Navbar />
      <HeroSection />
      <LogoBar />
      <StatsBar />
      <ServicesSection />
      <LinkCenterSection />
      <OutsourcingSection />
      <CtaSection />
      <TestimonialsSection />
      <ResourcesSection />
      <Footer />
    </main>
  );
}
