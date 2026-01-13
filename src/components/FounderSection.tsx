import { Linkedin, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import founderImage from "@/assets/founder-neeraj.jpg";
import cofounderImage from "@/assets/cofounder-chandrabhan.jpg";

const founders = [
  {
    name: "Neeraj Sharma",
    role: "Founder & CEO",
    image: founderImage,
    location: "Jaipur, Rajasthan, India",
    linkedin: "https://www.linkedin.com/in/neeraj-sharma-42834b167/",
    bio: "I started this agency because I believe AI should be practical, not complicated. My focus is on delivering real business outcomes—not just selling tools. I work with businesses worldwide to implement AI voice solutions that actually work."
  },
  {
    name: "Chandrabhan",
    role: "Co-Founder",
    image: cofounderImage,
    location: "India",
    linkedin: "https://www.linkedin.com/in/chandrabhan1802/",
    bio: "Passionate about leveraging AI to transform businesses. I focus on building strategic partnerships and ensuring our clients get the best AI voice solutions tailored to their needs."
  }
];

export const FounderSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal variant="zoom-in">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-foreground mb-12">
              Meet Our Team
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-8">
            {founders.map((founder, index) => (
              <ScrollReveal key={founder.name} variant="zoom-in" delay={index * 0.1}>
                <div className="glass-card rounded-3xl p-8 h-full">
                  <div className="flex flex-col items-center text-center">
                    {/* Founder Image */}
                    <div className="relative mb-6">
                      <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border-2 border-primary/30 glow">
                        <img 
                          src={founder.image} 
                          alt={`${founder.name} - ${founder.role}`} 
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                        <Linkedin className="w-5 h-5 text-primary-foreground" />
                      </div>
                    </div>

                    {/* Founder Info */}
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{founder.location}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-1">
                      {founder.name}
                    </h3>
                    <p className="text-primary font-medium mb-4">{founder.role}</p>
                    <p className="text-muted-foreground mb-6 text-sm">
                      {founder.bio}
                    </p>
                    <Button asChild variant="outline" size="default">
                      <a 
                        href={founder.linkedin} 
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
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
