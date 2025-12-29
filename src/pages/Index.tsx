import { Suspense, lazy } from "react";
import { Navbar } from "@/components/Navbar";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { HeroSection } from "@/components/HeroSection";
import { ClientLogos } from "@/components/ClientLogos";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { ProductShowcase3D } from "@/components/ProductShowcase3D";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { ServicesSection } from "@/components/ServicesSection";
import { IntegrationsSection } from "@/components/IntegrationsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ROICalculator } from "@/components/ROICalculator";
import { PricingSection } from "@/components/PricingSection";
import { TrustSection } from "@/components/TrustSection";
import { SecurityBadges } from "@/components/SecurityBadges";
import { FAQSection } from "@/components/FAQSection";
import { FounderSection } from "@/components/FounderSection";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { VoiceAgent } from "@/components/VoiceAgent";
import { ScrollProgress } from "@/components/ScrollProgress";

const Scene3D = lazy(() => import("@/components/Scene3D").then(m => ({ default: m.Scene3D })));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      
      {/* 3D Background */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
      
      <AnnouncementBar />
      <Navbar />
      <main>
        <HeroSection />
        <ClientLogos />
        <ProblemSection />
        <SolutionSection />
        <ProductShowcase3D />
        <HowItWorksSection />
        <IndustriesSection />
        <ServicesSection />
        <IntegrationsSection />
        <TestimonialsSection />
        <ROICalculator />
        <PricingSection />
        <TrustSection />
        <SecurityBadges />
        <FAQSection />
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
