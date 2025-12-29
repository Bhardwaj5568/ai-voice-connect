import { Suspense, lazy } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { ProductShowcase3D } from "@/components/ProductShowcase3D";
import { IndustriesSection } from "@/components/IndustriesSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TrustSection } from "@/components/TrustSection";
import { FounderSection } from "@/components/FounderSection";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { VoiceAgent } from "@/components/VoiceAgent";

const Scene3D = lazy(() => import("@/components/Scene3D").then(m => ({ default: m.Scene3D })));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
      
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ProductShowcase3D />
        <IndustriesSection />
        <ServicesSection />
        <TrustSection />
        <FounderSection />
        <WhatsAppCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <VoiceAgent />
    </div>
  );
};

export default Index;
