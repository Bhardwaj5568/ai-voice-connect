import { Phone, Mail, Linkedin, Twitter, Instagram, Youtube, Globe, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const footerLinks = {
  products: {
    title: "Products",
    links: [
      { label: "Voice AI Agents", href: "#services", isExternal: true },
      { label: "Call Analytics", href: "#", isExternal: true },
      { label: "CRM Integration", href: "#integrations", isExternal: true },
      { label: "API Access", href: "#", isExternal: true },
      { label: "Enterprise Suite", href: "#pricing", isExternal: true },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "#about", isExternal: true },
      { label: "Press Kit", href: "#", isExternal: true },
      { label: "Partners", href: "#", isExternal: true },
      { label: "Contact", href: "#contact", isExternal: true },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#", isExternal: true },
      { label: "Blog", href: "#", isExternal: true },
      { label: "Case Studies", href: "#case-studies", isExternal: true },
      { label: "Webinars", href: "#", isExternal: true },
      { label: "Help Center", href: "#faq", isExternal: true },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy", isExternal: false },
      { label: "Terms of Service", href: "/terms-of-service", isExternal: false },
      { label: "Cookie Policy", href: "/cookie-policy", isExternal: false },
      { label: "GDPR Compliance", href: "/gdpr-compliance", isExternal: false },
      { label: "Security", href: "/security", isExternal: false },
    ],
  },
};

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];


export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-background to-muted/30 border-t border-border/30">
      {/* Newsletter Section */}
      <div className="border-b border-border/30">
        <div className="container mx-auto px-4 py-12">
          <div className="glass-card rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                Stay ahead of the curve
              </h3>
              <p className="text-muted-foreground">
                Get the latest AI voice technology insights delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-3">
              <div className="relative flex-1 md:w-72">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <Button 
                type="submit" 
                variant="hero" 
                size="lg"
                className="shrink-0"
              >
                {isSubscribed ? (
                  <span className="flex items-center gap-2">
                    <span className="text-success">✓</span> Subscribed!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Subscribe <Send className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold text-foreground">AIVocal</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Enterprise-grade AI voice agents that transform customer interactions. 
              Trusted by 500+ companies worldwide to deliver exceptional experiences at scale.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-muted/50 hover:bg-primary/20 hover:text-primary border border-border/50 flex items-center justify-center text-muted-foreground transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Remote First */}
            <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                100% Remote
              </h4>
              <p className="text-xs text-muted-foreground">
                We operate fully online, serving clients worldwide with our distributed team.
              </p>
            </div>
          </div>

          {/* Links Columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1 group"
                      >
                        {link.label}
                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1 group"
                      >
                        {link.label}
                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>© 2024 AIVocal.online. All rights reserved.</span>
              <span className="hidden md:inline">|</span>
              <span className="hidden md:inline">Built with AI for AI.</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="tel:+918386802004" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" />
                +91 8386802004
              </a>
              <a href="mailto:contact@voiceai.agency" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" />
                contact@voiceai.agency
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
