import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

export const LoadingSplash = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    // Hide splash after animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500 ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Animated Logo */}
        <div className="relative">
          {/* Outer ring */}
          <div className="absolute inset-0 w-24 h-24 rounded-2xl border-2 border-primary/30 animate-ping" />
          
          {/* Main logo */}
          <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center animate-pulse">
            <Phone className="w-10 h-10 text-primary-foreground" />
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 w-24 h-24 rounded-2xl bg-primary/50 blur-xl opacity-50" />
        </div>

        {/* Brand name with typing effect */}
        <div className="flex items-center gap-1">
          <span className="text-3xl font-display font-bold text-foreground">
            AIVocal
          </span>
          <span className="text-3xl font-display font-bold text-primary animate-pulse">
            .
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full transition-all duration-200 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Loading text */}
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading enterprise AI...
        </p>
      </div>
    </div>
  );
};
