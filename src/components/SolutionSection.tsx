import { CheckCircle, Zap, Bot, Calendar, Bell, Database } from "lucide-react";

const capabilities = [
  {
    icon: Bot,
    title: "Intelligent Conversations",
    description: "Handle both inbound and outbound calls with natural, context-aware responses.",
  },
  {
    icon: CheckCircle,
    title: "Lead Qualification",
    description: "Qualify leads with intelligent follow-up questions and score them automatically.",
  },
  {
    icon: Calendar,
    title: "Appointment Booking",
    description: "Book and manage appointments automatically, syncing with your calendar.",
  },
  {
    icon: Bell,
    title: "Reminders & Follow-ups",
    description: "Send timely reminders and follow-ups to reduce no-shows.",
  },
  {
    icon: Database,
    title: "CRM Integration",
    description: "Update CRMs and internal systems automatically after every call.",
  },
  {
    icon: Zap,
    title: "Instant Scaling",
    description: "Scale from 10 to 10,000 calls without adding headcount.",
  },
];

export const SolutionSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">The Solution</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How AI Voice Agents Help
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reliability, speed, and scalability without increasing your headcount.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability, index) => (
            <div
              key={capability.title}
              className="glass-card rounded-2xl p-6 hover:border-primary/30 hover:glow-sm transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <capability.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{capability.title}</h3>
              <p className="text-muted-foreground text-sm">{capability.description}</p>
            </div>
          ))}
        </div>

        {/* Value Proposition */}
        <div className="mt-16 glass-card rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Why Choose an Agency Over Software?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">No need for custom software development time or funding</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Focus on execution and business outcomes, not tech</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Ready-to-use solutions without technical complexity</span>
                </li>
              </ul>
            </div>
            <div className="text-center md:text-right">
              <div className="inline-block">
                <div className="text-5xl md:text-6xl font-bold text-gradient mb-2">Pay for</div>
                <div className="text-4xl md:text-5xl font-bold text-foreground">Results</div>
                <p className="text-muted-foreground mt-4">Not tools. Not seats. Just outcomes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
