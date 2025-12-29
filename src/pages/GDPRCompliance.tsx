import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Scale, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const GDPRCompliance = () => {
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
                <Scale className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  GDPR Compliance
                </h1>
                <p className="text-muted-foreground">Last updated: January 2024</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">Our Commitment to GDPR</h2>
                <p className="text-muted-foreground leading-relaxed">
                  AIVocal is committed to protecting the privacy and security of personal data in accordance with the General Data Protection Regulation (GDPR). This page outlines how we comply with GDPR requirements and your rights as a data subject.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">Data Controller Information</h2>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <p className="text-foreground font-medium">AIVocal Technologies Pvt. Ltd.</p>
                  <p className="text-muted-foreground">Data Protection Officer: privacy@aivocal.online</p>
                  <p className="text-muted-foreground">Address: Mumbai, India</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">Your Rights Under GDPR</h2>
                <div className="grid gap-4">
                  {[
                    { title: "Right to Access", desc: "You can request a copy of all personal data we hold about you" },
                    { title: "Right to Rectification", desc: "You can request correction of inaccurate personal data" },
                    { title: "Right to Erasure", desc: "You can request deletion of your personal data (\"right to be forgotten\")" },
                    { title: "Right to Restrict Processing", desc: "You can request limitation of how we process your data" },
                    { title: "Right to Data Portability", desc: "You can request your data in a machine-readable format" },
                    { title: "Right to Object", desc: "You can object to processing based on legitimate interests" },
                    { title: "Rights Related to Automated Decision-Making", desc: "You have rights regarding automated profiling decisions" },
                  ].map((right) => (
                    <div key={right.title} className="flex gap-3 p-4 bg-muted/30 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-foreground font-medium">{right.title}</h3>
                        <p className="text-muted-foreground text-sm">{right.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">Legal Basis for Processing</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We process personal data based on the following legal grounds:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong className="text-foreground">Consent:</strong> Where you have given explicit consent</li>
                  <li><strong className="text-foreground">Contract:</strong> Where processing is necessary to fulfill our service agreement</li>
                  <li><strong className="text-foreground">Legal Obligation:</strong> Where we are required by law to process data</li>
                  <li><strong className="text-foreground">Legitimate Interests:</strong> Where we have a legitimate business interest that does not override your rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">Data Processing Activities</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 text-foreground">Purpose</th>
                        <th className="text-left py-3 text-foreground">Legal Basis</th>
                        <th className="text-left py-3 text-foreground">Retention</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border/50">
                        <td className="py-3">Service delivery</td>
                        <td className="py-3">Contract</td>
                        <td className="py-3">Duration of contract</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3">Marketing communications</td>
                        <td className="py-3">Consent</td>
                        <td className="py-3">Until withdrawn</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3">Analytics</td>
                        <td className="py-3">Legitimate interest</td>
                        <td className="py-3">26 months</td>
                      </tr>
                      <tr>
                        <td className="py-3">Legal compliance</td>
                        <td className="py-3">Legal obligation</td>
                        <td className="py-3">As required by law</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">International Data Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  When we transfer personal data outside the EEA, we ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by the European Commission, or transfers to countries with adequacy decisions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">Data Protection Measures</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and penetration testing</li>
                  <li>Employee training on data protection</li>
                  <li>Access controls and authentication measures</li>
                  <li>Incident response procedures</li>
                  <li>Data Processing Agreements with all vendors</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">Exercising Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To exercise any of your GDPR rights, please contact our Data Protection Officer:
                </p>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <p className="text-foreground font-medium">Data Subject Access Request</p>
                  <p className="text-muted-foreground">Email: privacy@aivocal.online</p>
                  <p className="text-muted-foreground">Response time: Within 30 days</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">Supervisory Authority</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you are not satisfied with how we handle your data, you have the right to lodge a complaint with a supervisory authority. For EU residents, you can contact your local Data Protection Authority.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GDPRCompliance;
