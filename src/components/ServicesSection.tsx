import { PhoneOutgoing, PhoneIncoming, Bell, Settings } from "lucide-react";

const services = [
  {
    icon: PhoneOutgoing,
    title: "AI Outbound Calling",
    description: "Proactive lead outreach with dynamic conversations and intelligent objection handling.",
    features: ["Lead outreach at scale", "Dynamic conversation flows", "Smart objection handling", "Real-time lead scoring"],
  },
  {
    icon: PhoneIncoming,
    title: "AI Inbound Handling",
    description: "24/7 call answering with appointment booking and comprehensive customer support.",
    features: ["24/7 availability", "Appointment booking", "Customer support", "Call routing & triage"],
  },
  {
    icon: Bell,
    title: "Follow-up & Reminders",
    description: "Reduce no-shows with automated payment reminders and demo follow-ups.",
    features: ["No-show prevention", "Payment reminders", "Demo follow-ups", "Confirmation calls"],
  },
  {
    icon: Settings,
    title: "CRM & Integrations",
    description: "Seamless syncing with Google Sheets, CRMs, and webhook workflows.",
    features: ["Google Sheets sync", "CRM integration", "Webhook workflows", "Custom API connections"],
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Settings className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Our Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Core Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI voice solutions tailored to your business needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="glass-card rounded-3xl p-8 hover:border-primary/30 hover:glow-sm transition-all duration-300 group"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
