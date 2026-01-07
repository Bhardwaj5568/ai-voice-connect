import { lazy, Suspense } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { ProductShowcase3D } from "@/components/ProductShowcase3D";
import { ServicesSection } from "@/components/ServicesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { PricingSection } from "@/components/PricingSection";
import { ROICalculator } from "@/components/ROICalculator";
import { IntegrationsSection } from "@/components/IntegrationsSection";
import { TrustSection } from "@/components/TrustSection";
import { FAQSection } from "@/components/FAQSection";
import { FounderSection } from "@/components/FounderSection";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ScrollProgress } from "@/components/ScrollProgress";

const Scene3D = lazy(() => import("@/components/Scene3D").then(module => ({ default: module.Scene3D })));

const Embed = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      <main className="scroll-snap-container">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ProductShowcase3D />
        <ServicesSection />
        <HowItWorksSection />
        <IndustriesSection />
        <CaseStudiesSection />
        <TestimonialsSection />
        <PricingSection />
        <ROICalculator />
        <IntegrationsSection />
        <TrustSection />
        <FAQSection />
        <FounderSection />
        <WhatsAppCTA />
      </main>

      <FloatingWhatsApp />
    </div>
  );
};

export default Embed;
