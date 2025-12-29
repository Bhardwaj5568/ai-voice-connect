import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

type AnimationVariant = 
  | "fade-up" 
  | "fade-down" 
  | "fade-left" 
  | "fade-right" 
  | "zoom-in" 
  | "zoom-out"
  | "flip-up"
  | "flip-down";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

const variantStyles: Record<AnimationVariant, { initial: string; visible: string }> = {
  "fade-up": {
    initial: "opacity-0 translate-y-12",
    visible: "opacity-100 translate-y-0",
  },
  "fade-down": {
    initial: "opacity-0 -translate-y-12",
    visible: "opacity-100 translate-y-0",
  },
  "fade-left": {
    initial: "opacity-0 translate-x-12",
    visible: "opacity-100 translate-x-0",
  },
  "fade-right": {
    initial: "opacity-0 -translate-x-12",
    visible: "opacity-100 translate-x-0",
  },
  "zoom-in": {
    initial: "opacity-0 scale-90",
    visible: "opacity-100 scale-100",
  },
  "zoom-out": {
    initial: "opacity-0 scale-110",
    visible: "opacity-100 scale-100",
  },
  "flip-up": {
    initial: "opacity-0 rotate-x-12",
    visible: "opacity-100 rotate-x-0",
  },
  "flip-down": {
    initial: "opacity-0 -rotate-x-12",
    visible: "opacity-100 rotate-x-0",
  },
};

export const ScrollReveal = ({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 700,
  className,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollReveal({ threshold, triggerOnce: once });
  const styles = variantStyles[variant];

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        isVisible ? styles.visible : styles.initial,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Staggered children reveal component
interface ScrollRevealGroupProps {
  children: ReactNode[];
  variant?: AnimationVariant;
  staggerDelay?: number;
  duration?: number;
  className?: string;
  childClassName?: string;
  threshold?: number;
}

export const ScrollRevealGroup = ({
  children,
  variant = "fade-up",
  staggerDelay = 100,
  duration = 700,
  className,
  childClassName,
  threshold = 0.1,
}: ScrollRevealGroupProps) => {
  const { ref, isVisible } = useScrollReveal({ threshold });
  const styles = variantStyles[variant];

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn(
            "transition-all ease-out",
            isVisible ? styles.visible : styles.initial,
            childClassName
          )}
          style={{
            transitionDuration: `${duration}ms`,
            transitionDelay: `${index * staggerDelay}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
