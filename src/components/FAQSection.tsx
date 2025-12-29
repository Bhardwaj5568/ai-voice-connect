import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How realistic do the AI voice agents sound?",
    answer: "Our AI voice agents use advanced neural text-to-speech technology that produces natural, human-like conversations. Most callers cannot distinguish our AI agents from human agents. We offer multiple voice options and can even clone specific voices for brand consistency.",
  },
  {
    question: "How long does it take to set up?",
    answer: "Most businesses are up and running within 24-48 hours. Our team handles the initial configuration, integration with your existing systems, and agent training. We provide a dedicated onboarding specialist to ensure a smooth launch.",
  },
  {
    question: "Can the AI handle complex conversations?",
    answer: "Yes! Our AI agents are trained to handle multi-turn conversations, objection handling, appointment scheduling, and even escalation to human agents when needed. They can adapt to different scenarios and learn from each interaction.",
  },
  {
    question: "What integrations do you support?",
    answer: "We integrate with all major CRMs (Salesforce, HubSpot, Pipedrive), calendaring tools (Google Calendar, Calendly), communication platforms (Twilio, RingCentral), and support custom webhook integrations for any other tools you use.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We are SOC 2 Type II certified, GDPR compliant, and HIPAA compliant. All calls are encrypted end-to-end, and we offer data residency options for enterprise customers. We never use your data to train our models without explicit consent.",
  },
  {
    question: "What happens if the AI can't handle a situation?",
    answer: "Our AI agents are trained to recognize when to escalate to a human agent. You can set custom triggers for escalation, and the handoff is seamless. The human agent receives full context of the conversation so far.",
  },
  {
    question: "Can I customize the AI's personality and script?",
    answer: "Yes! You have full control over the AI's tone, personality, scripts, and responses. Our platform includes a visual conversation designer that lets you create and modify flows without any coding.",
  },
  {
    question: "What kind of ROI can I expect?",
    answer: "Our customers typically see 40-60% cost reduction in their call operations, 3x increase in lead qualification rates, and 24/7 availability. Most businesses see positive ROI within the first month of deployment.",
  },
];

export const FAQSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our AI voice agents.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-2xl px-6 border-0 overflow-hidden animate-fade-up"
                style={{ animationDelay: `${0.05 * index}s` }}
              >
                <AccordionTrigger className="text-left text-foreground font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
