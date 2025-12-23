import { Button } from "@/components/ui/button";
import { MessageCircle, Clock, ArrowRight } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/917792848355?text=Hi%2C%20I%27m%20interested%20in%20AI%20Voice%20Calling%20solutions%20for%20my%20business.";

export const WhatsAppCTA = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500" />
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '32px 32px'
              }}
            />
            
            <div className="relative z-10 p-8 md:p-12 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                <Clock className="w-4 h-4 text-white" />
                <span className="text-sm text-white font-medium">24/7 Available</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-white/90 max-w-xl mx-auto mb-8">
                Chat with us on WhatsApp and get an instant response from our team. 
                Let's discuss how AI voice agents can transform your business.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild variant="whatsapp" size="xl" className="bg-white text-green-600 hover:bg-white/90">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
                <p className="text-white/80 text-sm">
                  <span className="font-semibold">+91 7792848355</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
