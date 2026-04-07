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
