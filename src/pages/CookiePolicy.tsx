import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Cookie, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CookiePolicy = () => {
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
                <Cookie className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  Cookie Policy
                </h1>
                <p className="text-muted-foreground">Last updated: January 2024</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">1. What Are Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">2. How We Use Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  AIVocal uses cookies for the following purposes:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>To ensure our website functions properly</li>
                  <li>To remember your preferences and settings</li>
                  <li>To analyze website traffic and usage patterns</li>
                  <li>To personalize your experience</li>
                  <li>To improve our services based on user behavior</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">3. Types of Cookies We Use</h2>
                
                <div className="space-y-6">
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <h3 className="text-lg font-medium text-foreground mb-2">Essential Cookies</h3>
                    <p className="text-muted-foreground text-sm">
                      Required for basic website functionality. These cannot be disabled as they are necessary for the site to work properly.
                    </p>
                  </div>

                  <div className="p-4 bg-muted/30 rounded-xl">
                    <h3 className="text-lg font-medium text-foreground mb-2">Performance Cookies</h3>
                    <p className="text-muted-foreground text-sm">
                      Help us understand how visitors interact with our website by collecting anonymous information about page visits and traffic sources.
                    </p>
                  </div>

                  <div className="p-4 bg-muted/30 rounded-xl">
                    <h3 className="text-lg font-medium text-foreground mb-2">Functional Cookies</h3>
                    <p className="text-muted-foreground text-sm">
                      Remember your preferences such as language, region, and display settings to provide a personalized experience.
                    </p>
                  </div>

                  <div className="p-4 bg-muted/30 rounded-xl">
                    <h3 className="text-lg font-medium text-foreground mb-2">Marketing Cookies</h3>
                    <p className="text-muted-foreground text-sm">
                      Used to track visitors across websites to display relevant advertisements. These are placed by third-party advertising partners.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">4. Third-Party Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may use third-party services that set their own cookies, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Google Analytics - for website analytics</li>
                  <li>HubSpot - for marketing automation</li>
                  <li>Intercom - for customer support chat</li>
                  <li>LinkedIn - for social media integration</li>
                  <li>Facebook Pixel - for advertising measurement</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">5. Managing Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You can control and manage cookies in several ways:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Browser settings: Most browsers allow you to refuse or delete cookies</li>
                  <li>Cookie consent banner: Use our cookie preferences center when visiting our site</li>
                  <li>Third-party opt-out tools: Visit the respective platforms to manage their cookies</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Please note that disabling certain cookies may affect the functionality of our website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">6. Cookie Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The retention period for cookies varies depending on their purpose. Session cookies are deleted when you close your browser, while persistent cookies may remain for up to 2 years or until manually deleted.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">7. Updates to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">8. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about our use of cookies, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-muted/30 rounded-xl">
                  <p className="text-foreground font-medium">AIVocal Privacy Team</p>
                  <p className="text-muted-foreground">Email: privacy@aivocal.online</p>
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

export default CookiePolicy;
