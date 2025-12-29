import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Sparkles } from "lucide-react";
import { AnimatedStats } from "@/components/AnimatedStats";
import { ScrollReveal } from "@/components/ScrollReveal";

const WHATSAPP_LINK = "https://wa.me/917792848355?text=Hi%2C%20I%27m%20interested%20in%20AI%20Voice%20Calling%20solutions%20for%20my%20business.";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/15 rounded-full blur-[100px]" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <ScrollReveal variant="fade-down" delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">Powered by Advanced AI Technology</span>
            </div>
          </ScrollReveal>

          {/* Main Headline */}
          <ScrollReveal variant="fade-up" delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-tight mb-6">
              <span className="text-foreground">AI Voice Calling Agents for</span>
              <br />
              <span className="text-gradient animate-shimmer bg-[length:200%_100%]">Sales, Support & Operations</span>
            </h1>
          </ScrollReveal>

          {/* Subheadline */}
          <ScrollReveal variant="fade-up" delay={200}>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Automate your inbound and outbound calls with human-like AI agents. 
              Qualify leads, book appointments, and provide 24/7 support—without expanding your team.
            </p>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal variant="fade-up" delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="hero" size="xl">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5" />
                  Request a Demo
                </a>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  Talk to an Expert
                </a>
              </Button>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal variant="fade-up" delay={400}>
            <div className="mt-20 pt-8 border-t border-border/30">
              <AnimatedStats />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
