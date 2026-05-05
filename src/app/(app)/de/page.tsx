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
import { getAlternates } from "@/lib/alternates";

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
      return docs[0] as { noIndex?: boolean | null; meta?: { title?: string | null; description?: string | null } } | undefined;
    };
    const primaryPage = await findPage('de');
    // noIndex is locale-specific — always check the DE value, before any content fallback
    if (primaryPage?.noIndex) {
      return { robots: { index: false, follow: false }, alternates: getAlternates('/de') };
    }
    let page = primaryPage;
    if (!page?.meta?.title && !page?.meta?.description) {
      page = await findPage('en');
    }
    const metaTitle = page?.meta?.title?.trim() || null;
    const metaDescription = page?.meta?.description?.trim() || null;
    if (metaTitle || metaDescription) {
      const title = metaTitle ?? "Blogtec";
      const description = metaDescription ?? undefined;
      return {
        title: { absolute: title },
        description,
        alternates: getAlternates('/de'),
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
      <AnnouncementBar locale="de" />
      <Navbar />
      <HeroSection locale="de" />
      <LogoBar locale="de" />
      <StatsBar locale="de" />
      <ServicesSection locale="de" />
      <LinkCenterSection locale="de" />
      <OutsourcingSection locale="de" />
      <CtaSection locale="de" />
      <TestimonialsSection locale="de" />
      <ResourcesSection locale="de" />
      <Footer />
    </main>
  );
}
