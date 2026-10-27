import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fraud Detection & Prevention | Leo Pisha",
  description:
    "AI-powered fraud detection for Kenyan insurers. Fraud scoring at claim intake, network analysis, anomaly detection, and investigator case management. Stop fraud before it pays out.",
  keywords: [
    "fraud detection insurance Kenya",
    "insurance fraud prevention automation",
    "claims fraud detection Kenya",
  ],
  openGraph: {
    title: "Fraud Detection & Prevention | Leo Pisha",
    description:
      "AI-powered fraud detection for Kenyan insurers. Fraud scoring at claim intake, network analysis, anomaly detection, and investigator case management.",
    type: "website",
    url: "https://www.leopisha.co.ke/services/fraud-detection-prevention",
  },
  alternates: {
    canonical: "https://www.leopisha.co.ke/services/fraud-detection-prevention",
  },
};

export default function FraudDetectionPreventionPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Fraud Detection & Prevention",
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
      "AI-powered fraud detection for Kenyan insurers. Fraud scoring at claim intake, network analysis, anomaly detection, and investigator case management.",
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
              { "@type": "ListItem", position: 3, name: "Fraud Detection & Prevention", item: "https://www.leopisha.co.ke/services/fraud-detection-prevention" },
            ],
          }),
        }}
      />
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h1 className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl text-foreground mb-5">
            Fraud Detection & Prevention for Kenyan Insurers
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-10">
            AI-powered fraud detection at claim intake. Leo Pisha helps Kenyan insurers implement
            fraud scoring, network analysis, anomaly detection, and investigator case management —
            stopping fraud before it pays out.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">The problem</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Fraudulent claims slip through without systematic detection</li>
                <li>Investigators spend time on low-risk claims instead of high-risk ones</li>
                <li>Fraud patterns go unnoticed across claims data</li>
                <li>No structured way to track and manage investigation outcomes</li>
              </ul>
            </div>

            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">What we detect</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Fraud scoring at claim intake</li>
                <li>Network analysis and link detection</li>
                <li>Anomaly detection across claims</li>
                <li>Investigator case management</li>
                <li>SAR (Suspicious Activity Report) automation</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Step-by-step workflow</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Claim submitted — fraud score calculated instantly</li>
                <li>High-risk claims flagged for investigator review</li>
                <li>Network analysis finds related suspicious claims</li>
                <li>Investigator manages case through resolution</li>
                <li>SAR filed automatically when thresholds met</li>
              </ul>
            </div>

            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Outcomes</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Early fraud detection at intake</li>
                <li>Reduced fraudulent payouts</li>
                <li>Faster investigation cycles</li>
                <li>Lower combined ratio</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-card border border-border-soft rounded-2xl p-8 lg:p-10">
            <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Frequently asked questions</h3>
            <div className="space-y-4">
              <div className="border-b border-border/70 pb-4">
                <p className="font-medium text-foreground">What types of fraud does the system detect?</p>
                <p className="mt-2 text-sm text-muted-foreground">False claims, inflated claims, duplicate claims, staged accidents, and organized fraud rings detected through network analysis.</p>
              </div>
              <div className="border-b border-border/70 pb-4">
                <p className="font-medium text-foreground">Does fraud detection replace investigators?</p>
                <p className="mt-2 text-sm text-muted-foreground">No. Automation flags suspicious claims for investigation. Investigators make the final determination with all evidence in one place.</p>
              </div>
              <div className="border-b border-border/70 pb-4">
                <p className="font-medium text-foreground">How quickly does fraud detection work?</p>
                <p className="mt-2 text-sm text-muted-foreground">Fraud scoring happens at claim intake — before a claim is approved. Suspicious claims are flagged immediately, not weeks later.</p>
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
