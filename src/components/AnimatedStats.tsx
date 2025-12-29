import { useEffect, useState, useRef } from "react";

interface StatProps {
  value: string;
  label: string;
  suffix?: string;
  prefix?: string;
}

const AnimatedNumber = ({ value, prefix = "", suffix = "" }: { value: string; prefix?: string; suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), numericValue);
      
      if (value.includes("M")) {
        setDisplayValue((current / 1000000).toFixed(1) + "M");
      } else if (value.includes("K")) {
        setDisplayValue(Math.round(current / 1000) + "K");
      } else if (value.includes("%")) {
        setDisplayValue(current + "%");
      } else if (value.includes("x")) {
        setDisplayValue(current + "x");
      } else if (value.includes("/")) {
        setDisplayValue(value);
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

  return (
    <div ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gradient">
      {prefix}{displayValue}{suffix}
    </div>
  );
};

const stats: StatProps[] = [
  { value: "24/7", label: "Availability" },
  { value: "50%", label: "Cost Reduction" },
  { value: "3x", label: "More Conversions" },
  { value: "10M+", label: "Calls Handled" },
];

export const AnimatedStats = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="text-center p-6 rounded-2xl glass-card-hover animate-fade-up"
          style={{ animationDelay: `${0.1 * index}s` }}
        >
          <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
          <div className="text-sm text-muted-foreground mt-3 font-medium uppercase tracking-wide">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};
