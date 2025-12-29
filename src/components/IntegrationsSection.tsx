import { Plug } from "lucide-react";

const integrations = [
  { name: "Salesforce", category: "CRM" },
  { name: "HubSpot", category: "CRM" },
  { name: "Pipedrive", category: "CRM" },
  { name: "Zoho", category: "CRM" },
  { name: "Google Calendar", category: "Calendar" },
  { name: "Calendly", category: "Calendar" },
  { name: "Twilio", category: "Voice" },
  { name: "RingCentral", category: "Voice" },
  { name: "Slack", category: "Communication" },
  { name: "Microsoft Teams", category: "Communication" },
  { name: "Zapier", category: "Automation" },
  { name: "Make", category: "Automation" },
];

export const IntegrationsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Plug className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Integrations</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Works With Your Stack
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Seamlessly connect with the tools you already use.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {integrations.map((integration, index) => (
            <div
              key={integration.name}
              className="glass-card rounded-2xl p-6 text-center hover:border-primary/40 hover:scale-105 transition-all duration-300 cursor-pointer animate-fade-up group"
              style={{ animationDelay: `${0.05 * index}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                <span className="text-lg font-bold text-primary">
                  {integration.name.charAt(0)}
                </span>
              </div>
              <div className="font-semibold text-foreground text-sm mb-1">
                {integration.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {integration.category}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Don't see your tool?{" "}
            <span className="text-primary hover:underline cursor-pointer font-medium">
              Request an integration →
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
