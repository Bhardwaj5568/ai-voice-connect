const logos = [
  { name: "TechCorp", text: "TechCorp" },
  { name: "InnovateLabs", text: "InnovateLabs" },
  { name: "GlobalSoft", text: "GlobalSoft" },
  { name: "NextGen AI", text: "NextGen AI" },
  { name: "CloudScale", text: "CloudScale" },
  { name: "DataFlow", text: "DataFlow" },
  { name: "SmartSystems", text: "SmartSystems" },
  { name: "FutureTech", text: "FutureTech" },
];

export const ClientLogos = () => {
  return (
    <section className="py-16 border-y border-border/20 bg-gradient-to-b from-transparent via-muted/5 to-transparent overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-sm text-muted-foreground uppercase tracking-widest font-medium">
          Trusted by industry leaders worldwide
        </p>
      </div>
      
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        {/* Scrolling logos */}
        <div className="flex animate-marquee">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 mx-12 flex items-center justify-center"
            >
              <div className="px-8 py-4 rounded-xl glass-card opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer">
                <span className="text-xl font-display font-bold text-gradient whitespace-nowrap">
                  {logo.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
