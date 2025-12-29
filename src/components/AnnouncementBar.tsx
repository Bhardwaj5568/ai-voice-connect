import { Sparkles, X } from "lucide-react";
import { useState } from "react";

export const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border-b border-border/30">
      <div className="container mx-auto px-4 py-2.5">
        <div className="flex items-center justify-center gap-2 text-sm">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-muted-foreground">
            <span className="font-semibold text-foreground">New:</span> AI Voice Agents now support 25+ languages
          </span>
          <span className="hidden sm:inline text-primary hover:underline cursor-pointer font-medium">
            Learn more →
          </span>
        </div>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
