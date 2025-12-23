import { MessageSquare, Clock, Plug, Globe } from "lucide-react";

const trustFactors = [
  {
    icon: MessageSquare,
    title: "Human-like Conversations",
    description: "Natural voice interactions that your customers won't distinguish from human agents.",
  },
  {
    icon: Clock,
    title: "Always-On Availability",
    description: "Never miss a call again with 24/7/365 automated answering and support.",
  },
  {
    icon: Plug,
    title: "Easy Integration",
    description: "Seamlessly connects with your existing systems, CRMs, and workflows.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Designed for businesses worldwide with multi-language support.",
  },
];

export const TrustSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Businesses Trust Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reliable, scalable, and designed for enterprise-grade performance.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustFactors.map((factor, index) => (
            <div
              key={factor.title}
              className="text-center group"
            >
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/10 to-cyan-500/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:glow-sm transition-all duration-300">
                <factor.icon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{factor.title}</h3>
              <p className="text-muted-foreground text-sm">{factor.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
