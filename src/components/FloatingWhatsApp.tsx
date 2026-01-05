import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

const WHATSAPP_LINK = "https://wa.me/917792848355?text=Hi%2C%20I%27m%20interested%20in%20AI%20Voice%20Calling%20solutions%20for%20my%20business.";

export const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Show button after a short delay for smooth entrance
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 transition-all duration-500 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
      aria-label="Chat on WhatsApp"
    >
      {/* Tooltip */}
      <span
        className={`hidden md:block bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        }`}
      >
        Chat with us! 💬
      </span>

      {/* Button */}
      <div
        className={`relative w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isHovered ? "scale-110 rotate-12" : "scale-100"
        }`}
        style={{
          boxShadow: isHovered
            ? "0 8px 40px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.3)"
            : "0 4px 20px rgba(34, 197, 94, 0.4)",
        }}
      >
        {/* Pulse ring animation */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
        <span className="absolute inset-0 rounded-full bg-green-400 animate-pulse opacity-20" />
        
        {/* Icon */}
        <MessageCircle
          className={`w-8 h-8 text-white relative z-10 transition-transform duration-300 ${
            isHovered ? "scale-110" : ""
          }`}
        />
      </div>
    </a>
  );
};
