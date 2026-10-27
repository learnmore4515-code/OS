import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Managed Automation Operations | Leo Pisha",
  description:
    "Leo Pisha runs and optimizes your automations. Monthly reviews, proactive improvements, priority support. You own the IP. Managed automation operations for Kenyan insurance teams.",
  keywords: [
    "managed automation operations Kenya",
    "insurance automation retainer Kenya",
    "managed insurance automation services",
  ],
  openGraph: {
    title: "Managed Automation Operations | Leo Pisha",
    description:
      "Leo Pisha runs and optimizes your automations. Monthly reviews, proactive improvements, priority support. You own the IP.",
    type: "website",
    url: "https://www.leopisha.co.ke/services/managed-automation-operations",
  },
  alternates: {
    canonical: "https://www.leopisha.co.ke/services/managed-automation-operations",
  },
};

export default function ManagedAutomationOperationsPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Managed Automation Operations",
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
      "Leo Pisha runs and optimizes your automations. Monthly reviews, proactive improvements, priority support. You own the IP.",
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
              { "@type": "ListItem", position: 3, name: "Managed Automation Operations", item: "https://www.leopisha.co.ke/services/managed-automation-operations" },
            ],
          }),
        }}
      />
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h1 className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl text-foreground mb-5">
            Managed Automation Operations for Kenyan Insurers
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-10">
            Leo Pisha runs and optimizes your automations. Monthly reviews, proactive improvements,
            priority support. You own the IP — Leo Pisha keeps your automations running and improving.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">The problem</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Automations break when processes change</li>
                <li>No one owns ongoing optimization</li>
                <li>Small issues become big problems before anyone notices</li>
                <li>Internal teams lack time to maintain automations</li>
              </ul>
            </div>

            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">What we manage</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Monthly reviews</li>
                <li>Proactive automations improvements</li>
                <li>Priority support</li>
                <li>SLA monitoring</li>
                <li>Capacity planning</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Step-by-step workflow</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Monthly review of all automations</li>
                <li>Performance metrics reviewed against targets</li>
                <li>Improvements identified and deployed</li>
                <li>Proactive fixes before issues impact operations</li>
              </ul>
            </div>

            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Outcomes</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Automations that keep performing</li>
                <li>No in-house ops burden</li>
                <li>Continuous improvement</li>
                <li>You own the IP</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-card border border-border-soft rounded-2xl p-8 lg:p-10">
            <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Frequently asked questions</h3>
            <div className="space-y-4">
              <div className="border-b border-border/70 pb-4">
                <p className="font-medium text-foreground">Do I own the automations?</p>
                <p className="mt-2 text-sm text-muted-foreground">Yes. You own the IP. We manage and optimize, but the automations belong to you.</p>
              </div>
              <div className="border-b border-border/70 pb-4">
                <p className="font-medium text-foreground">How often do reviews happen?</p>
                <p className="mt-2 text-sm text-muted-foreground">Monthly. We review performance, identify improvements, and deploy updates.</p>
              </div>
              <div className="border-b border-border/70 pb-4">
                <p className="font-medium text-foreground">What if something breaks?</p>
                <p className="mt-2 text-sm text-muted-foreground">Priority support is included. We monitor automations proactively and fix issues before they impact your operations.</p>
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