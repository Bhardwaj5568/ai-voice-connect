import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Sparkles } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/917792848355?text=Hi%2C%20I%27m%20interested%20in%20AI%20Voice%20Calling%20solutions%20for%20my%20business.";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-500/15 rounded-full blur-[100px]" />
      
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
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Powered by Advanced AI Technology</span>
          </div>

          {/* Main Headline */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="text-foreground">AI Voice Calling Agents for</span>
            <br />
            <span className="text-gradient">Sales, Support & Operations</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            Automate your inbound and outbound calls with human-like AI agents. 
            Qualify leads, book appointments, and provide 24/7 support—without expanding your team.
          </p>

          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
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

          {/* Stats */}
          <div 
            className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/30 animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">24/7</div>
              <div className="text-sm text-muted-foreground mt-1">Availability</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">50%</div>
              <div className="text-sm text-muted-foreground mt-1">Cost Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">3x</div>
              <div className="text-sm text-muted-foreground mt-1">More Conversions</div>
            </div>
          </div>
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
