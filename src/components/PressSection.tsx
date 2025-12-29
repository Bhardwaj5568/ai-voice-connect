import { Newspaper, ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const pressLogos = [
  { name: "TechCrunch", logo: "TC" },
  { name: "Forbes", logo: "F" },
  { name: "Wired", logo: "W" },
  { name: "VentureBeat", logo: "VB" },
  { name: "The Verge", logo: "TV" },
  { name: "Inc.", logo: "Inc" },
];

const pressMentions = [
  {
    outlet: "TechCrunch",
    logo: "TC",
    headline: "AIVocal raises $50M to revolutionize enterprise voice AI",
    date: "Dec 2024",
    link: "#",
  },
  {
    outlet: "Forbes",
    logo: "F",
    headline: "The Future of Customer Service: How AI Voice Agents Are Changing Everything",
    date: "Nov 2024",
    link: "#",
  },
  {
    outlet: "Wired",
    logo: "W",
    headline: "These AI Voice Agents Sound So Human, You Can't Tell the Difference",
    date: "Oct 2024",
    link: "#",
  },
];

export const PressSection = () => {
  return (
    <section className="py-16 relative overflow-hidden border-y border-border/30">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
              <Newspaper className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">As Seen In</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Press Logos */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-12">
            {pressLogos.map((press) => (
              <div 
                key={press.name}
                className="flex items-center gap-2 text-muted-foreground/60 hover:text-foreground transition-colors group cursor-pointer"
              >
                <span className="text-2xl md:text-3xl font-display font-bold tracking-tight">
                  {press.name}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Featured Press Mentions */}
        <ScrollReveal variant="fade-up" delay={0.2}>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pressMentions.map((mention, index) => (
              <a
                key={index}
                href={mention.link}
                className="glass-card rounded-2xl p-6 group hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary font-bold text-sm">
                    {mention.logo}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-foreground">{mention.outlet}</span>
                    <span className="text-xs text-muted-foreground block">{mention.date}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed line-clamp-2">
                  {mention.headline}
                </p>
                <div className="flex items-center gap-1 mt-4 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Read Article <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
