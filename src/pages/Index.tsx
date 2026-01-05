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

import { ROICalculator } from "@/components/ROICalculator";
import { PricingSection } from "@/components/PricingSection";
import { TrustSection } from "@/components/TrustSection";
import { SecurityBadges } from "@/components/SecurityBadges";
import { FAQSection } from "@/components/FAQSection";
import { FounderSection } from "@/components/FounderSection";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";


import { ScrollProgress } from "@/components/ScrollProgress";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { PressSection } from "@/components/PressSection";
import { LiveActivityFeed } from "@/components/LiveActivityFeed";

import { ParallaxBackground } from "@/components/ParallaxBackground";
import { ComparisonSlider } from "@/components/ComparisonSlider";

const Scene3D = lazy(() => import("@/components/Scene3D").then(m => ({ default: m.Scene3D })));

const Index = () => {
  return (
    <div className="min-h-screen bg-background scroll-snap-container">
      
      <ScrollProgress />
      <ParallaxBackground />
      
      {/* 3D Background */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
      
      <AnnouncementBar />
      <Navbar />
      <main>
        <section className="scroll-snap-section">
          <HeroSection />
        </section>
        <section className="scroll-snap-section-auto">
          <ClientLogos />
        </section>
        <section className="scroll-snap-section">
          <ProblemSection />
        </section>
        <section className="scroll-snap-section">
          <SolutionSection />
        </section>
        <section className="scroll-snap-section">
          <ProductShowcase3D />
        </section>
        <section className="scroll-snap-section">
          <HowItWorksSection />
        </section>
        <section className="scroll-snap-section">
          <ComparisonSlider />
        </section>
        <section className="scroll-snap-section">
          <IndustriesSection />
        </section>
        <section className="scroll-snap-section">
          <ServicesSection />
        </section>
        <section className="scroll-snap-section">
          <IntegrationsSection />
        </section>
        <section className="scroll-snap-section">
          <CaseStudiesSection />
        </section>
        <section className="scroll-snap-section-auto">
          <PressSection />
        </section>
        <section className="scroll-snap-section">
          <ROICalculator />
        </section>
        <section className="scroll-snap-section">
          <PricingSection />
        </section>
        <section className="scroll-snap-section-auto">
          <TrustSection />
        </section>
        <section className="scroll-snap-section-auto">
          <SecurityBadges />
        </section>
        <section className="scroll-snap-section">
          <FAQSection />
        </section>
        <section className="scroll-snap-section">
          <FounderSection />
        </section>
        <section className="scroll-snap-section">
          <WhatsAppCTA />
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
      
      <LiveActivityFeed />
    </div>
  );
};

export default Index;
