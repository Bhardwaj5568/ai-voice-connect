import { Building, Stethoscope, ShoppingBag, Headphones, Target, Calendar, GraduationCap, Store } from "lucide-react";

const industries = [
  {
    icon: Building,
    title: "Real Estate",
    description: "Lead calling, inquiry follow-ups, site visit scheduling",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    description: "Appointment booking, medical triage, reminders",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce & D2C",
    description: "Order confirmations, COD verification, delivery support",
    color: "from-orange-500/20 to-amber-500/20",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "Inbound support, knowledge-base resolution",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: Target,
    title: "Sales Teams",
    description: "Outbound sales, lead scoring, appointment setting",
    color: "from-red-500/20 to-rose-500/20",
  },
  {
    icon: Calendar,
    title: "Appointment Services",
    description: "Booking, availability checks, rescheduling",
    color: "from-indigo-500/20 to-violet-500/20",
  },
  {
    icon: GraduationCap,
    title: "EdTech & Coaching",
    description: "Lead qualification, demo booking, payment reminders",
    color: "from-teal-500/20 to-cyan-500/20",
  },
  {
    icon: Store,
    title: "Local Businesses",
    description: "Missed call recovery, 24/7 answering, inquiry handling",
    color: "from-yellow-500/20 to-amber-500/20",
  },
];

export const IndustriesSection = () => {
  return (
    <section id="industries" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Building className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Industries We Serve</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Built for High-Demand Niches
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Industries that understand the value of every phone call choose AI voice agents.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <div
              key={industry.title}
              className="glass-card rounded-2xl p-6 hover:border-primary/30 hover:scale-105 transition-all duration-300 group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${industry.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <industry.icon className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{industry.title}</h3>
              <p className="text-muted-foreground text-sm">{industry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
