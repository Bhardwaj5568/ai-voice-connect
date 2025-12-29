import { useEffect, useState } from "react";

export const ParallaxBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large gradient orb - top right */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-20"
        style={{
          top: -200 + scrollY * 0.1,
          right: -200 + mousePosition.x,
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* Medium gradient orb - bottom left */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-15"
        style={{
          bottom: -100 + scrollY * -0.05,
          left: -150,
          background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)",
          transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* Small floating orbs */}
      <div 
        className="absolute w-32 h-32 rounded-full opacity-30"
        style={{
          top: 300 + scrollY * 0.2,
          left: "20%",
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
          transform: `translate(${mousePosition.x * 0.8}px, ${mousePosition.y * 0.8}px)`,
          transition: "transform 0.2s ease-out",
        }}
      />

      <div 
        className="absolute w-24 h-24 rounded-full opacity-25"
        style={{
          top: 600 + scrollY * 0.15,
          right: "15%",
          background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)",
          transform: `translate(${mousePosition.x * -0.6}px, ${mousePosition.y * -0.6}px)`,
          transition: "transform 0.2s ease-out",
        }}
      />

      <div 
        className="absolute w-20 h-20 rounded-full opacity-20"
        style={{
          top: 1200 + scrollY * 0.25,
          left: "60%",
          background: "radial-gradient(circle, hsl(var(--warning)) 0%, transparent 70%)",
          transform: `translate(${mousePosition.x * 1.2}px, ${mousePosition.y * 1.2}px)`,
          transition: "transform 0.2s ease-out",
        }}
      />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
