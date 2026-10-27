import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Underwriting Automation | Leo Pisha",
  description:
    "Instant quote-to-bind underwriting automation for motor, property, and SME lines. Risk scoring, straight-through processing, and exception routing for Kenyan insurers.",
  keywords: [
    "underwriting automation Kenya",
    "insurance underwriting automation",
    "instant quote-to-bind Kenya",
    "insurance automation consultant Kenya",
  ],
  openGraph: {
    title: "Underwriting Automation | Leo Pisha",
    description:
      "Instant quote-to-bind underwriting automation for motor, property, and SME lines. Risk scoring, straight-through processing, and exception routing.",
    type: "website",
    url: "https://www.leopisha.co.ke/services/underwriting-automation",
  },
  alternates: {
    canonical: "https://www.leopisha.co.ke/services/underwriting-automation",
  },
};

export default function UnderwritingAutomationPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Underwriting Automation",
    provider: {
      "@type": "Organization",
      name: "Leo Pisha",
      url: "https://www.leopisha.co.ke",
    },
    areaServed: "KE",
    audience: {
      "@type": "Audience",
      audienceType: "Insurance companies, brokers, and TPAs in Kenya",
    },
    description:
      "Instant quote-to-bind underwriting automation for motor, property, and SME lines. Risk scoring, straight-through processing, and exception routing.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.leopisha.co.ke/" },
              { "@type": "ListItem", position: 2, name: "Services", item: "https://www.leopisha.co.ke/services" },
              { "@type": "ListItem", position: 3, name: "Underwriting Automation", item: "https://www.leopisha.co.ke/services/underwriting-automation" },
            ],
          }),
        }}
      />
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h1 className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl text-foreground mb-5">
            Underwriting Automation for Kenyan Insurers
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-10">
            Instant quote-to-bind underwriting automation for motor, property, and SME lines. Leo
            Pisha helps Kenyan insurers implement risk scoring, straight-through processing, and
            exception routing to reduce underwriting turnaround from days to minutes.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">The problem</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Underwriting review queues grow when decisions depend on manual coordination</li>
                <li>Risk scoring is inconsistent when done by hand across different underwriters</li>
                <li>Policy issuance delays frustrate brokers and customers</li>
                <li>Manual risk assessment misses patterns that automation would catch</li>
              </ul>
            </div>

            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">What we automate</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Risk scoring models</li>
                <li>Straight-through processing (STP) workflows</li>
                <li>Exception routing and management</li>
                <li>Broker portal and adjuster dashboard</li>
                <li>Reinsurance reporting</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Step-by-step workflow</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Application submitted via broker portal</li>
                <li>Risk score calculated automatically from application data</li>
                <li>Standard risks approved straight-through</li>
                <li>Complex risks routed to underwriter with supporting data</li>
                <li>Policy issued and bound once decision is made</li>
              </ul>
            </div>

            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Outcomes</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Quote-to-bind in minutes, not days</li>
                <li>Reduced manual underwriting effort</li>
                <li>Consistent risk decisions</li>
                <li>Faster policy issuance</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-card border border-border-soft rounded-2xl p-8 lg:p-10">
            <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Frequently asked questions</h3>
            <div className="space-y-4">
              <div className="border-b border-border/70 pb-4">
                <p className="font-medium text-foreground">Which underwriting tasks can be automated?</p>
                <p className="mt-2 text-sm text-muted-foreground">Risk scoring, data validation, document verification, and straight-through approval for standard risks. Complex risks still route to human underwriters with all supporting data attached.</p>
              </div>
              <div className="border-b border-border/70 pb-4">
                <p className="font-medium text-foreground">Will automation replace underwriters?</p>
                <p className="mt-2 text-sm text-muted-foreground">No. Automation handles routine decisions and data collection. Underwriters focus on complex risks that need judgment — with all the information they need in front of them.</p>
              </div>
              <div className="border-b border-border/70 pb-4">
                <p className="font-medium text-foreground">How long does underwriting automation take to implement?</p>
                <p className="mt-2 text-sm text-muted-foreground">Most teams see a working underwriting automation in 1-2 weeks. We start with a diagnosis to identify the highest-impact manual steps.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="https://calendly.com/leopishaagency/new-meeting">
              <button className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-on-primary rounded-2xl font-medium hover:bg-primary/90 transition-colors">
                Book a Discovery Call
              </button>
            </Link>
            <Link href="/case-studies">
              <button className="inline-flex items-center justify-center px-8 py-3.5 border border-border-soft rounded-2xl font-medium text-foreground hover:border-accent/50 hover:bg-accent/5 hover:text-accent transition-colors">
                View Case Studies
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
