import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Claims Processing Automation | Leo Pisha",
  description:
    "End-to-end claims automation for Kenyan insurers — from FNOL to settlement. Document ingestion, AI extraction, triage, and auto-approval. Reduce claims processing from weeks to hours.",
  keywords: [
    "claims automation Kenya",
    "claims processing automation Kenya",
    "insurance claims automation",
    "insurance workflow automation Kenya",
  ],
  openGraph: {
    title: "Claims Processing Automation | Leo Pisha",
    description:
      "End-to-end claims automation from FNOL to settlement. Document ingestion, AI extraction, triage, and auto-approval. Reduce claims processing from weeks to hours.",
    type: "website",
    url: "https://www.leopisha.co.ke/services/claims-automation",
  },
  alternates: {
    canonical: "https://www.leopisha.co.ke/services/claims-automation",
  },
};

export default function ClaimsAutomationPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Claims Processing Automation",
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
      "End-to-end claims automation from FNOL to settlement. Document ingestion, AI extraction, triage, and auto-approval. Reduce claims processing from weeks to hours.",
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
              { "@type": "ListItem", position: 3, name: "Claims Processing Automation", item: "https://www.leopisha.co.ke/services/claims-automation" },
            ],
          }),
        }}
      />
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h1 className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl text-foreground mb-5">
            Claims Processing Automation for Kenyan Insurers
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-10">
            End-to-end claims automation from FNOL to settlement. Leo Pisha helps Kenyan insurance
            teams automate document ingestion, AI extraction, triage, and auto-approval — cutting
            claims processing from weeks to hours.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">The problem</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Claims slow down at handoffs between teams — FNOL, document review, triage, settlement</li>
                <li>Missing documents and incomplete information cause repeated follow-ups</li>
                <li>Manual data entry creates errors and slows settlement</li>
                <li>Customers wait weeks for claim outcomes they expect in days</li>
              </ul>
            </div>

            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">What we automate</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>FNOL (First Notice of Loss) intake</li>
                <li>Document ingestion and AI extraction</li>
                <li>Claims triage and routing</li>
                <li>Auto-approval for low-complexity claims</li>
                <li>Adjuster dashboard and case management</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Step-by-step workflow</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Claim reported via FNOL — details captured automatically</li>
                <li>Documents uploaded and extracted with AI</li>
                <li>Claim triaged and routed to the right adjuster</li>
                <li>Low-complexity claims auto-approved for settlement</li>
                <li>Adjuster manages complex claims end-to-end</li>
              </ul>
            </div>

            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Outcomes</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Claims processing from weeks to hours</li>
                <li>Reduced manual data entry</li>
                <li>Faster claim settlements</li>
                <li>Improved customer satisfaction</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-card border border-border-soft rounded-2xl p-8 lg:p-10">
            <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Frequently asked questions</h3>
            <div className="space-y-4">
              <div className="border-b border-border/70 pb-4">
                <p className="font-medium text-foreground">How long does claims automation take to implement?</p>
                <p className="mt-2 text-sm text-muted-foreground">Most insurance teams see a working automation in 1-2 weeks. We start with a diagnosis to identify the highest-impact manual steps, then build and hand over.</p>
              </div>
              <div className="border-b border-border/70 pb-4">
                <p className="font-medium text-foreground">Which claims types work best for automation?</p>
                <p className="mt-2 text-sm text-muted-foreground">Motor, property, and SME claims with straightforward documentation are the best candidates. Complex multi-party claims still need human adjuster oversight — we route those automatically.</p>
              </div>
              <div className="border-b border-border/70 pb-4">
                <p className="font-medium text-foreground">Do we need to replace our claims system?</p>
                <p className="mt-2 text-sm text-muted-foreground">No. Automation integrates with your existing claims management system and document storage. We connect to what you already use.</p>
              </div>
              <div className="border-b border-border/70 pb-4">
                <p className="font-medium text-foreground">Is customer data secure?</p>
                <p className="mt-2 text-sm text-muted-foreground">Yes. All document processing and data handling follows Kenyan data protection requirements. Customer data stays within your controlled environment.</p>
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
