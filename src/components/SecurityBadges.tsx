import { Shield, Lock, CheckCircle, Award } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "SOC 2 Type II",
    description: "Certified",
  },
  {
    icon: Lock,
    title: "GDPR",
    description: "Compliant",
  },
  {
    icon: CheckCircle,
    title: "HIPAA",
    description: "Compliant",
  },
  {
    icon: Award,
    title: "ISO 27001",
    description: "Certified",
  },
];

export const SecurityBadges = () => {
  return (
    <section className="py-12 border-y border-border/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium">
            Enterprise Security
          </p>
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <badge.icon className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{badge.title}</div>
                <div className="text-xs text-muted-foreground">{badge.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
