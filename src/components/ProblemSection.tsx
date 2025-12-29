import { AlertTriangle, DollarSign, Clock, TrendingDown, PhoneOff } from "lucide-react";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ScrollReveal";

const problems = [
  {
    icon: DollarSign,
    title: "High Team Costs",
    description: "Maintaining human calling teams drains resources with salaries, training, and turnover.",
  },
  {
    icon: PhoneOff,
    title: "Inconsistent Follow-ups",
    description: "Leads slip through the cracks when follow-ups are poor or inconsistent.",
  },
  {
    icon: Clock,
    title: "No 24/7 Coverage",
    description: "Missing calls outside business hours means losing potential customers.",
  },
  {
    icon: TrendingDown,
    title: "Low Conversion Rates",
    description: "Leads come in but fail to convert due to delayed or ineffective responses.",
  },
];

export const ProblemSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal variant="fade-up" className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-muted-foreground">The Challenge</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            What Problem Does This Solve?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Traditional phone operations are expensive, unreliable, and can't scale.
          </p>
        </ScrollReveal>

        <ScrollRevealGroup
          variant="fade-up"
          staggerDelay={100}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                <problem.icon className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{problem.title}</h3>
              <p className="text-muted-foreground text-sm">{problem.description}</p>
            </div>
          ))}
        </ScrollRevealGroup>

        <ScrollReveal variant="fade-up" delay={400} className="mt-12 text-center">
          <p className="text-lg text-foreground">
            <span className="text-primary font-semibold">The solution?</span> AI voice agents that maintain natural, 
            human-like conversations at scale.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};
