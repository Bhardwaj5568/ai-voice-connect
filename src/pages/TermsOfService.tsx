import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="glass-card rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <FileText className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  Terms of Service
                </h1>
                <p className="text-muted-foreground">Last updated: January 2024</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using AIVocal services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">2. Description of Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  AIVocal provides AI-powered voice agent solutions for businesses, including but not limited to automated customer service, sales assistance, appointment scheduling, and lead qualification services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">3. Account Registration</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>You must provide accurate and complete registration information</li>
                  <li>You are responsible for maintaining the security of your account</li>
                  <li>You must be at least 18 years old to use our services</li>
                  <li>One person or entity may not maintain multiple accounts</li>
                  <li>You are responsible for all activities under your account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">4. Acceptable Use</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You agree not to use our services to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit harmful, offensive, or illegal content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt our services</li>
                  <li>Engage in fraudulent or deceptive practices</li>
                  <li>Make unsolicited calls in violation of telemarketing laws</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">5. Payment Terms</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Fees are billed in advance on a monthly or annual basis</li>
                  <li>All fees are non-refundable unless otherwise stated</li>
                  <li>We reserve the right to modify pricing with 30 days notice</li>
                  <li>Overdue payments may result in service suspension</li>
                  <li>Usage-based charges are billed at the end of each billing cycle</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">6. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content, features, and functionality of our services are owned by AIVocal and are protected by international copyright, trademark, and other intellectual property laws. You retain ownership of your data and content uploaded to our platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">7. Service Level Agreement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We strive to maintain 99.9% uptime for our services. In the event of downtime exceeding our SLA commitments, eligible customers may receive service credits as outlined in their enterprise agreement.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by law, AIVocal shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability shall not exceed the amount paid by you in the twelve months preceding the claim.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">9. Indemnification</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to indemnify and hold harmless AIVocal from any claims, damages, or expenses arising from your use of our services, violation of these terms, or infringement of any third-party rights.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">10. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Either party may terminate the service agreement with 30 days written notice. We may suspend or terminate your access immediately for violations of these terms. Upon termination, you may request export of your data within 30 days.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">11. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed by the laws of India. Any disputes shall be resolved in the courts of Mumbai, India, unless otherwise agreed in your enterprise agreement.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">12. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-muted/30 rounded-xl">
                  <p className="text-foreground font-medium">AIVocal Legal Team</p>
                  <p className="text-muted-foreground">Email: legal@aivocal.online</p>
                  <p className="text-muted-foreground">Phone: +91 8386802004</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
