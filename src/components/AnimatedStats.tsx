import { useEffect, useState, useRef } from "react";
import { Clock, TrendingDown, TrendingUp, Phone } from "lucide-react";

interface StatProps {
  value: string;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const AnimatedNumber = ({ 
  value, 
  isVisible 
}: { 
  value: string; 
  isVisible: boolean;
}) => {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isVisible) return;

    // Handle special cases
    if (value === "24/7") {
      const chars = ["2", "24", "24/", "24/7"];
      let step = 0;
      const timer = setInterval(() => {
        setDisplayValue(chars[step]);
        step++;
        if (step >= chars.length) clearInterval(timer);
      }, 200);
      return () => clearInterval(timer);
    }

    const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
    const duration = 2000;
    const steps = 50;
    const increment = numericValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), numericValue);
      
      if (value.includes("M")) {
        setDisplayValue(current >= 1000000 ? (current / 1000000).toFixed(0) + "M" : Math.round(current / 100000) / 10 + "M");
      } else if (value.includes("%")) {
        setDisplayValue(current + "%");
      } else if (value.toLowerCase().includes("x")) {
        setDisplayValue(current + "X");
      } else {
        setDisplayValue(current.toString());
      }

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return displayValue;
};

const stats: StatProps[] = [
  { 
    value: "24/7", 
    label: "Availability",
    description: "Always on, never misses a call",
    icon: Clock,
    color: "from-blue-500 to-cyan-400"
  },
  { 
    value: "50%+", 
    label: "Cost Reduction",
    description: "Lower operational expenses",
    icon: TrendingDown,
    color: "from-green-500 to-emerald-400"
  },
  { 
    value: "3X", 
    label: "Conversion Rate",
    description: "Higher lead to customer ratio",
    icon: TrendingUp,
    color: "from-purple-500 to-pink-400"
  },
  { 
    value: "10M+", 
    label: "Calls Handled",
    description: "And counting every day",
    icon: Phone,
    color: "from-orange-500 to-amber-400"
  },
];

export const AnimatedStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`relative text-center p-6 lg:p-8 rounded-3xl glass-card overflow-hidden group transition-all duration-500 hover:scale-105 ${
              isVisible ? "animate-fade-up opacity-100" : "opacity-0"
            }`}
            style={{ animationDelay: `${0.15 * index}s` }}
          >
            {/* Background gradient on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
            
            {/* Icon */}
            <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
              <Icon className="w-7 h-7 text-white" />
            </div>

            {/* Animated Number */}
            <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-2">
              <AnimatedNumber value={stat.value} isVisible={isVisible} />
            </div>

            {/* Label */}
            <div className="text-base font-semibold text-foreground mb-1">
              {stat.label}
            </div>

            {/* Description */}
            <div className="text-sm text-muted-foreground">
              {stat.description}
            </div>

            {/* Decorative ring */}
            <div className={`absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
          </div>
        );
      })}
    </div>
  );
};
