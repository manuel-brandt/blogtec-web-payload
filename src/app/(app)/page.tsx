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
    // Try German first (default locale), then English — picks up whichever locale the editor saved in
    const findPage = async (locale: 'de' | 'en') => {
      const { docs } = await payload.find({
        collection: 'pages',
        where: { slug: { equals: 'home' } },
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
        openGraph: { title, description, url: "https://blogtec.io" },
      };
    }
  } catch {}
  const fallbackTitle = "Blogtec – Marketing Leistungen, einfach ausgelagert.";
  const fallbackDesc =
    "SEO, Google-Ads, Design und Entwicklung mit hervorragender Flexibilität und Zuverlässigkeit. Outsorce your marketing with Blogtec.";
  return {
    title: { absolute: fallbackTitle },
    description: fallbackDesc,
    openGraph: { title: fallbackTitle, description: fallbackDesc, url: "https://blogtec.io" },
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
