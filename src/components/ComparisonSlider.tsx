import { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Bot, User, Clock, DollarSign, TrendingUp, CheckCircle, XCircle, Minus } from "lucide-react";

const comparisonData = {
  traditional: {
    title: "Traditional Call Centers",
    icon: User,
    color: "from-orange-500 to-red-500",
    metrics: [
      { label: "Cost per Call", value: "$8-15", trend: "high" },
      { label: "Wait Time", value: "5-15 min", trend: "high" },
      { label: "Availability", value: "Business Hours", trend: "low" },
      { label: "Scalability", value: "Limited", trend: "low" },
      { label: "Consistency", value: "Variable", trend: "low" },
      { label: "Languages", value: "1-3", trend: "low" },
    ],
  },
  ai: {
    title: "AI Voice Agents",
    icon: Bot,
    color: "from-primary to-cyan-400",
    metrics: [
      { label: "Cost per Call", value: "$0.50-2", trend: "low" },
      { label: "Wait Time", value: "0 seconds", trend: "low" },
      { label: "Availability", value: "24/7/365", trend: "high" },
      { label: "Scalability", value: "Unlimited", trend: "high" },
      { label: "Consistency", value: "Perfect", trend: "high" },
      { label: "Languages", value: "50+", trend: "high" },
    ],
  },
};

export const ComparisonSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const getTrendIcon = (trend: string, isAI: boolean) => {
    if (isAI) {
      return trend === "high" 
        ? <CheckCircle className="w-4 h-4 text-success" />
        : <CheckCircle className="w-4 h-4 text-success" />;
    } else {
      return trend === "high" 
        ? <XCircle className="w-4 h-4 text-destructive" />
        : <XCircle className="w-4 h-4 text-destructive" />;
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Compare Solutions</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Traditional vs AI-Powered
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See why leading companies are switching to AI voice agents.
            </p>
          </div>
        </ScrollReveal>

        {/* Comparison Cards */}
        <ScrollReveal variant="fade-up" delay={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Traditional */}
              <div className="glass-card rounded-3xl overflow-hidden">
                <div className={`bg-gradient-to-r ${comparisonData.traditional.color} p-6`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{comparisonData.traditional.title}</h3>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {comparisonData.traditional.metrics.map((metric) => (
                    <div key={metric.label} className="flex items-center justify-between py-3 border-b border-border/30 last:border-0">
                      <span className="text-muted-foreground">{metric.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{metric.value}</span>
                        {getTrendIcon(metric.trend, false)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI */}
              <div className="glass-card rounded-3xl overflow-hidden border-2 border-primary/30 relative">
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    Recommended
                  </span>
                </div>
                <div className={`bg-gradient-to-r ${comparisonData.ai.color} p-6`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{comparisonData.ai.title}</h3>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {comparisonData.ai.metrics.map((metric) => (
                    <div key={metric.label} className="flex items-center justify-between py-3 border-b border-border/30 last:border-0">
                      <span className="text-muted-foreground">{metric.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary">{metric.value}</span>
                        {getTrendIcon(metric.trend, true)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-12 glass-card rounded-2xl p-8 text-center">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-success" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-foreground">85%</div>
                    <div className="text-sm text-muted-foreground">Cost Reduction</div>
                  </div>
                </div>
                <div className="w-px h-12 bg-border hidden md:block" />
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-foreground">100%</div>
                    <div className="text-sm text-muted-foreground">Faster Response</div>
                  </div>
                </div>
                <div className="w-px h-12 bg-border hidden md:block" />
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-foreground">10x</div>
                    <div className="text-sm text-muted-foreground">Scalability</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
