import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Lock, ArrowLeft, Shield, Server, Key, Eye, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Security = () => {
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
                <Lock className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  Security
                </h1>
                <p className="text-muted-foreground">Enterprise-grade security for your data</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">Our Security Commitment</h2>
                <p className="text-muted-foreground leading-relaxed">
                  At AIVocal, security is not just a feature—it is foundational to everything we build. We implement industry-leading security practices to ensure your data and communications are protected at all times.
                </p>
              </section>

              {/* Security Certifications */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">Certifications & Compliance</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { name: "SOC 2 Type II", status: "Certified" },
                    { name: "ISO 27001", status: "Certified" },
                    { name: "GDPR", status: "Compliant" },
                    { name: "HIPAA", status: "Compliant" },
                    { name: "PCI DSS", status: "Level 1" },
                    { name: "CCPA", status: "Compliant" },
                  ].map((cert) => (
                    <div key={cert.name} className="p-4 bg-muted/30 rounded-xl text-center">
                      <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                      <p className="text-foreground font-medium">{cert.name}</p>
                      <p className="text-sm text-muted-foreground">{cert.status}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Security Features */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">Security Features</h2>
                <div className="grid gap-4">
                  {[
                    {
                      icon: Shield,
                      title: "End-to-End Encryption",
                      desc: "All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Voice calls are encrypted end-to-end.",
                    },
                    {
                      icon: Server,
                      title: "Secure Infrastructure",
                      desc: "Our infrastructure is hosted on SOC 2 certified cloud providers with multiple availability zones and automatic failover.",
                    },
                    {
                      icon: Key,
                      title: "Access Controls",
                      desc: "Role-based access control (RBAC), multi-factor authentication (MFA), and single sign-on (SSO) support for enterprise customers.",
                    },
                    {
                      icon: Eye,
                      title: "Monitoring & Logging",
                      desc: "24/7 security monitoring, intrusion detection systems, and comprehensive audit logs for all system activities.",
                    },
                    {
                      icon: AlertTriangle,
                      title: "Incident Response",
                      desc: "Dedicated security team with documented incident response procedures and regular disaster recovery testing.",
                    },
                  ].map((feature) => (
                    <div key={feature.title} className="flex gap-4 p-4 bg-muted/30 rounded-xl">
                      <feature.icon className="w-6 h-6 text-primary shrink-0" />
                      <div>
                        <h3 className="text-foreground font-medium mb-1">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Data Protection */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">Data Protection</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Regular automated backups with point-in-time recovery</li>
                  <li>Data isolation between customer environments</li>
                  <li>Secure data deletion upon contract termination</li>
                  <li>Data residency options for regulatory compliance</li>
                  <li>Anonymization and pseudonymization where applicable</li>
                </ul>
              </section>

              {/* Vulnerability Management */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">Vulnerability Management</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Regular penetration testing by third-party security firms</li>
                  <li>Automated vulnerability scanning of all systems</li>
                  <li>Bug bounty program for responsible disclosure</li>
                  <li>Rapid patching process for critical vulnerabilities</li>
                  <li>Secure software development lifecycle (SDLC)</li>
                </ul>
              </section>

              {/* Employee Security */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">Employee Security</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Background checks for all employees</li>
                  <li>Mandatory security awareness training</li>
                  <li>Principle of least privilege access</li>
                  <li>Secure workstation policies</li>
                  <li>Regular security policy reviews</li>
                </ul>
              </section>

              {/* Report Vulnerability */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">Report a Vulnerability</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We appreciate the security research community and encourage responsible disclosure of potential vulnerabilities.
                </p>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <p className="text-foreground font-medium">Security Team</p>
                  <p className="text-muted-foreground">Email: security@aivocal.online</p>
                  <p className="text-muted-foreground">PGP Key: Available upon request</p>
                </div>
              </section>

              {/* Security Resources */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">Security Resources</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <h3 className="text-foreground font-medium mb-2">Security Whitepaper</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Detailed documentation of our security architecture and practices.
                    </p>
                    <Link to="#" className="text-primary hover:underline text-sm">
                      Download PDF →
                    </Link>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <h3 className="text-foreground font-medium mb-2">Trust Center</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Access our compliance documents and security certifications.
                    </p>
                    <Link to="#" className="text-primary hover:underline text-sm">
                      Visit Trust Center →
                    </Link>
                  </div>
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

export default Security;
