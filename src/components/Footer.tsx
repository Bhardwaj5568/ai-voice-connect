import { Phone, Mail, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">AIVocal</span>
          </div>

          {/* Links */}
          <div className="flex items-center justify-center gap-6">
            <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Services
            </a>
            <a href="#industries" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Industries
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              About Us
            </a>
          </div>

          {/* Contact */}
          <div className="flex items-center justify-end gap-4">
            <a 
              href="tel:+918386802004" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              +91 8386802004
            </a>
            <a
              href="mailto:contact@voiceai.agency"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/30 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 AIVocal.online. All rights reserved. | Built with AI for AI.
          </p>
        </div>
      </div>
    </footer>
  );
};
