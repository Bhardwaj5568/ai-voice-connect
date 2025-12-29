import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Building2 } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/917792848355?text=Hi%2C%20I%27m%20interested%20in%20AI%20Voice%20Calling%20solutions%20for%20my%20business.";

const plans = [
  {
    name: "Starter",
    icon: Zap,
    description: "Perfect for small businesses getting started with AI voice",
    monthlyPrice: 299,
    yearlyPrice: 249,
    features: [
      "Up to 500 calls/month",
      "1 AI voice agent",
      "Basic analytics",
      "Email support",
      "CRM integration",
      "Call recording",
    ],
    popular: false,
  },
  {
    name: "Professional",
    icon: Sparkles,
    description: "For growing businesses that need more power and flexibility",
    monthlyPrice: 799,
    yearlyPrice: 649,
    features: [
      "Up to 2,500 calls/month",
      "5 AI voice agents",
      "Advanced analytics & reporting",
      "Priority support",
      "Custom voice training",
      "Webhook integrations",
      "Multi-language support",
      "Appointment scheduling",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Building2,
    description: "For large organizations with custom requirements",
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      "Unlimited calls",
      "Unlimited AI agents",
      "Dedicated success manager",
      "Custom AI training",
      "SLA guarantees",
      "On-premise deployment",
      "Custom integrations",
      "Advanced security features",
      "White-label options",
    ],
    popular: false,
  },
];

export const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-enterprise" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Simple Pricing</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Transparent pricing that scales with your business. No hidden fees.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 rounded-full bg-secondary transition-colors"
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full bg-primary transition-transform ${
                  isYearly ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
              Yearly
              <span className="ml-2 text-xs text-success font-semibold">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 transition-all duration-500 animate-fade-up ${
                plan.popular
                  ? "glass-card border-primary/50 scale-105 shadow-2xl shadow-primary/10"
                  : "glass-card hover:border-primary/30"
              }`}
              style={{ animationDelay: `${0.15 * index}s` }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold">
                  Most Popular
                </div>
              )}

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-6">
                <plan.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Header */}
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                {plan.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                {plan.monthlyPrice ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-display font-bold text-foreground">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                ) : (
                  <div className="text-4xl font-display font-bold text-gradient">
                    Custom
                  </div>
                )}
              </div>

              {/* CTA */}
              <Button
                asChild
                variant={plan.popular ? "hero" : "outline"}
                size="lg"
                className="w-full mb-8"
              >
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  {plan.monthlyPrice ? "Get Started" : "Contact Sales"}
                </a>
              </Button>

              {/* Features */}
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
