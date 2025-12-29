import { Settings, Mic, Zap, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Settings,
    title: "Configure Your Agent",
    description: "Define your AI agent's personality, scripts, and conversation flows using our intuitive visual builder.",
  },
  {
    number: "02",
    icon: Mic,
    title: "Train & Customize",
    description: "Upload your knowledge base and fine-tune responses. The AI learns your business context instantly.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Go Live",
    description: "Connect your phone systems and start handling calls immediately. No coding required.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Optimize & Scale",
    description: "Monitor performance, analyze conversations, and continuously improve with AI-powered insights.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-mesh opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Simple Process</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get your AI voice agents up and running in four simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection line - desktop only */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50" />
          
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative animate-fade-up"
              style={{ animationDelay: `${0.15 * index}s` }}
            >
              {/* Step number */}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
                <span className="text-xl font-display font-bold text-primary-foreground">
                  {step.number}
                </span>
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-display font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
