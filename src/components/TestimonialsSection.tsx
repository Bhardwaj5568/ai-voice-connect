import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "AIVocal transformed our sales operations. We've seen a 3x increase in qualified leads while reducing our operational costs by 45%.",
    author: "Sarah Chen",
    role: "VP of Sales",
    company: "TechCorp Industries",
    rating: 5,
    avatar: "SC",
  },
  {
    quote: "The AI voice agents are indistinguishable from human agents. Our customer satisfaction scores have never been higher.",
    author: "Michael Rodriguez",
    role: "Head of Customer Success",
    company: "GlobalSoft Solutions",
    rating: 5,
    avatar: "MR",
  },
  {
    quote: "We handle 10x more support calls now without adding headcount. The ROI was visible within the first month.",
    author: "Emily Watson",
    role: "CEO",
    company: "InnovateLabs",
    rating: 5,
    avatar: "EW",
  },
];

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

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className="glass-card rounded-3xl p-8 card-3d animate-fade-up"
              style={{ animationDelay: `${0.15 * index}s` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground text-lg leading-relaxed mb-8">
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
          ))}
        </div>
      </div>
    </section>
  );
};
