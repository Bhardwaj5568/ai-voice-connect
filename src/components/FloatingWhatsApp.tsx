import { MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/917792848355?text=Hi%2C%20I%27m%20interested%20in%20AI%20Voice%20Calling%20solutions%20for%20my%20business.";

export const FloatingWhatsApp = () => {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 animate-pulse-glow"
      style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)' }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
};
