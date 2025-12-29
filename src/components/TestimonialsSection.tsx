import { useState } from "react";
import { Quote, Star, Play, Pause, Volume2, VolumeX } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const videoTestimonials = [
  {
    id: 1,
    quote: "AIVocal transformed our sales operations. We've seen a 3x increase in qualified leads while reducing our operational costs by 45%.",
    author: "Sarah Chen",
    role: "VP of Sales",
    company: "TechCorp Industries",
    rating: 5,
    avatar: "SC",
    videoThumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=450&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metrics: { leads: "+300%", costs: "-45%", time: "2 weeks" },
  },
  {
    id: 2,
    quote: "The AI voice agents are indistinguishable from human agents. Our customer satisfaction scores have never been higher.",
    author: "Michael Rodriguez",
    role: "Head of Customer Success",
    company: "GlobalSoft Solutions",
    rating: 5,
    avatar: "MR",
    videoThumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=450&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metrics: { satisfaction: "+42%", response: "-80%", nps: "92" },
  },
  {
    id: 3,
    quote: "We handle 10x more support calls now without adding headcount. The ROI was visible within the first month.",
    author: "Emily Watson",
    role: "CEO",
    company: "InnovateLabs",
    rating: 5,
    avatar: "EW",
    videoThumbnail: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=450&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metrics: { calls: "10x", headcount: "0", roi: "30 days" },
  },
  {
    id: 4,
    quote: "Implementation was seamless. Within 48 hours, our AI agents were handling complex customer inquiries flawlessly.",
    author: "David Park",
    role: "CTO",
    company: "FinanceFlow",
    rating: 5,
    avatar: "DP",
    videoThumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metrics: { setup: "48 hrs", accuracy: "98%", languages: "12" },
  },
];

const VideoCard = ({ testimonial }: { testimonial: typeof videoTestimonials[0] }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="glass-card rounded-3xl overflow-hidden">
      {/* Video Section */}
      <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20">
        {!isPlaying ? (
          <>
            <img
              src={testimonial.videoThumbnail}
              alt={`${testimonial.author} testimonial`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-background/40 backdrop-blur-sm flex items-center justify-center">
              <Button
                onClick={() => setIsPlaying(true)}
                className="w-20 h-20 rounded-full bg-primary hover:bg-primary/90 shadow-2xl hover:scale-110 transition-all duration-300"
              >
                <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
              </Button>
            </div>
            {/* Metrics overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex gap-2">
              {Object.entries(testimonial.metrics).map(([key, value]) => (
                <div
                  key={key}
                  className="glass-card px-3 py-1.5 rounded-full text-xs font-semibold"
                >
                  <span className="text-primary">{value}</span>
                  <span className="text-muted-foreground ml-1 capitalize">{key}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="relative w-full h-full">
            <iframe
              src={`${testimonial.videoUrl}?autoplay=1&rel=0`}
              title={`${testimonial.author} video testimonial`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <Button
              onClick={() => setIsPlaying(false)}
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 rounded-full bg-background/80 backdrop-blur-sm"
            >
              <Pause className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 lg:p-8">
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-warning text-warning" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-foreground text-lg leading-relaxed mb-6">
          "{testimonial.quote}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
            {testimonial.avatar}
          </div>
          <div>
            <div className="font-semibold text-foreground">{testimonial.author}</div>
            <div className="text-sm text-muted-foreground">
              {testimonial.role}, {testimonial.company}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TestimonialsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-mesh opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Quote className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Customer Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Loved by Industry Leaders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how businesses are transforming their operations with AI voice agents.
          </p>
        </div>

        {/* Video Testimonials Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {videoTestimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/2">
                <VideoCard testimonial={testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="relative left-0 translate-x-0 translate-y-0" />
            <CarouselNext className="relative right-0 translate-x-0 translate-y-0" />
          </div>
        </Carousel>

        {/* Stats Banner */}
        <div className="mt-16 glass-card rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Video Reviews</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Would Recommend</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">G2 Leader</div>
              <div className="text-sm text-muted-foreground">2024 Award</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
