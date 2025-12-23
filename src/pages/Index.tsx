import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TrustSection } from "@/components/TrustSection";
import { FounderSection } from "@/components/FounderSection";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <IndustriesSection />
        <ServicesSection />
        <TrustSection />
        <FounderSection />
        <WhatsAppCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
