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

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config });
    const findPage = async (locale: 'de' | 'en') => {
      const { docs } = await payload.find({
        collection: "pages",
        where: { slug: { equals: "home" } },
        locale,
        depth: 0,
        limit: 1,
      });
      return docs[0] as { meta?: { title?: string | null; description?: string | null } } | undefined;
    };
    let page = await findPage('de');
    if (!page?.meta?.title && !page?.meta?.description) {
      page = await findPage('en');
    }
    if (page?.meta?.title || page?.meta?.description) {
      const title = page.meta?.title ?? "Blogtec";
      const description = page.meta?.description ?? undefined;
      return {
        title: { absolute: title },
        description,
        alternates: { canonical: '/de', languages: { 'de': '/de', 'en': '/' } },
        openGraph: { title, description, url: "https://blogtec.io/de" },
      };
    }
  } catch {}
  return {
    title: { absolute: "Blogtec – Marketing Leistungen, einfach ausgelagert." },
    description: "SEO, Google-Ads, Design und Entwicklung mit hervorragender Flexibilität und Zuverlässigkeit.",
    alternates: { canonical: '/de', languages: { 'de': '/de', 'en': '/' } },
    openGraph: { url: "https://blogtec.io/de" },
  };
}

export default function HomeDe() {
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
