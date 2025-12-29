import { ArrowRight, TrendingUp, Clock, DollarSign, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";

const caseStudies = [
  {
    company: "TechCorp Industries",
    logo: "TC",
    industry: "Technology",
    color: "from-blue-500 to-cyan-400",
    headline: "Reduced support costs by 67%",
    description: "Implemented AI voice agents to handle tier-1 support calls, freeing up human agents for complex issues.",
    metrics: [
      { label: "Cost Reduction", value: "67%", icon: DollarSign },
      { label: "Response Time", value: "-85%", icon: Clock },
      { label: "CSAT Score", value: "94%", icon: TrendingUp },
    ],
    quote: "AIVocal transformed our entire support operation in just 3 weeks.",
    author: "Sarah Chen, VP of Operations",
  },
  {
    company: "GlobalHealth Systems",
    logo: "GH",
    industry: "Healthcare",
    color: "from-emerald-500 to-green-400",
    headline: "3x increase in appointment bookings",
    description: "AI agents now handle all appointment scheduling and reminders, reducing no-shows by 45%.",
    metrics: [
      { label: "Bookings", value: "3x", icon: Users },
      { label: "No-shows", value: "-45%", icon: Clock },
      { label: "Staff Hours Saved", value: "120/week", icon: TrendingUp },
    ],
    quote: "Our staff can now focus on patient care instead of phone calls.",
    author: "Dr. Michael Rodriguez, CMO",
  },
  {
    company: "FinanceFirst Bank",
    logo: "FF",
    industry: "Financial Services",
    color: "from-amber-500 to-orange-400",
    headline: "10x call handling capacity",
    description: "Scaled customer service from 500 to 5,000+ daily calls without adding headcount.",
    metrics: [
      { label: "Call Capacity", value: "10x", icon: Users },
      { label: "Wait Time", value: "-92%", icon: Clock },
      { label: "Annual Savings", value: "$2.4M", icon: DollarSign },
    ],
    quote: "The ROI was visible within the first month of deployment.",
    author: "Emily Watson, CEO",
  },
];

export const CaseStudiesSection = () => {
  return (
    <section id="case-studies" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-enterprise opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Case Studies</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Real Results from Real Companies
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how industry leaders are transforming their operations with AI voice agents.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <ScrollReveal key={study.company} variant="fade-up" delay={index * 150}>
              <div
                className="glass-card rounded-3xl overflow-hidden card-3d group"
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${study.color} p-6`}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl">
                      {study.logo}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{study.company}</h3>
                      <span className="text-white/80 text-sm">{study.industry}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="text-xl font-bold text-foreground mb-3">
                    {study.headline}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {study.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {study.metrics.map((metric) => (
                      <div 
                        key={metric.label}
                        className="text-center p-3 rounded-xl bg-muted/30 border border-border/50"
                      >
                        <metric.icon className="w-4 h-4 mx-auto mb-1 text-primary" />
                        <div className="text-lg font-bold text-foreground">{metric.value}</div>
                        <div className="text-xs text-muted-foreground">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="border-l-2 border-primary pl-4 mb-4">
                    <p className="text-sm text-muted-foreground italic">"{study.quote}"</p>
                    <cite className="text-xs text-foreground font-medium not-italic mt-2 block">
                      — {study.author}
                    </cite>
                  </blockquote>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between group-hover:bg-primary/10 transition-colors"
                  >
                    Read Full Case Study
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
