import { useEffect, useRef } from 'react';

interface VoiceWaveformProps {
  isActive: boolean;
  color?: string;
  barCount?: number;
}

export const VoiceWaveform = ({ 
  isActive, 
  color = 'hsl(var(--primary))',
  barCount = 5 
}: VoiceWaveformProps) => {
  const barsRef = useRef<HTMLDivElement[]>([]);
  const animationRef = useRef<number>();
  
  useEffect(() => {
    if (!isActive) {
      barsRef.current.forEach(bar => {
        if (bar) bar.style.height = '4px';
      });
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }
    
    const animate = () => {
      barsRef.current.forEach((bar, index) => {
        if (bar) {
          // Create varying heights with offset timing
          const time = Date.now() / 100;
          const offset = index * 0.8;
          const height = 4 + Math.sin(time + offset) * 12 + Math.random() * 8;
          bar.style.height = `${Math.max(4, Math.min(28, height))}px`;
        }
      });
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  return (
    <div className="flex items-center justify-center gap-1 h-8">
      {Array.from({ length: barCount }).map((_, index) => (
        <div
          key={index}
          ref={el => { if (el) barsRef.current[index] = el; }}
          className="w-1 rounded-full transition-all duration-75"
          style={{
            backgroundColor: color,
            height: '4px',
          }}
        />
      ))}
    </div>
  );
};
