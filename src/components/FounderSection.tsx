import { Linkedin, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import founderImage from "@/assets/founder-neeraj.jpg";

export const FounderSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-[200px_1fr] gap-8 items-center">
              {/* Founder Image */}
              <div className="flex justify-center md:justify-start">
                <div className="relative">
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2 border-primary/30 glow">
                    <img 
                      src={founderImage} 
                      alt="Neeraj Sharma - Founder & CEO" 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                    <Linkedin className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
              </div>

              {/* Founder Info */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Jaipur, Rajasthan, India</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Neeraj Sharma
                </h3>
                <p className="text-primary font-medium mb-4">Founder & CEO</p>
                <p className="text-muted-foreground mb-6">
                  I started this agency because I believe AI should be practical, not complicated. 
                  My focus is on delivering real business outcomes—not just selling tools. 
                  I work with businesses worldwide to implement AI voice solutions that actually work.
                </p>
                <Button asChild variant="outline" size="default">
                  <a 
                    href="https://www.linkedin.com/in/neerajsharma" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-4 h-4" />
                    Connect on LinkedIn
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
