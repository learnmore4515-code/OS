import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Missing Document & KYC Reminder Automation | Leo Pisha",
  description:
    "Stop chasing clients for missing insurance documents. Automated KYC reminders, claims document follow-ups, and document tracking for Kenyan insurance teams. Reduce manual chasing and speed up claims processing.",
  keywords: [
    "missing document automation Kenya",
    "claims document tracking Kenya",
    "KYC reminder automation insurance",
    "insurance document follow-up automation",
    "missing documents insurance Kenya",
  ],
  openGraph: {
    title: "Missing Document & KYC Reminder Automation | Leo Pisha",
    description:
      "Stop chasing clients for missing insurance documents. Automated KYC reminders, claims document follow-ups, and document tracking for Kenyan insurance teams.",
    type: "website",
    url: "https://www.leopisha.co.ke/services/missing-documents-automation",
  },
  alternates: {
    canonical: "https://www.leopisha.co.ke/services/missing-documents-automation",
  },
};

export default function MissingDocumentsAutomationPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Missing Document & KYC Reminder Automation",
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
      "Automated KYC reminders, claims document follow-ups, and document tracking for Kenyan insurance teams. Reduce manual chasing and speed up claims processing.",
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
              { "@type": "ListItem", position: 3, name: "Missing Document & KYC Reminder Automation", item: "https://www.leopisha.co.ke/services/missing-documents-automation" },
            ],
          }),
        }}
      />
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h1 className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl text-foreground mb-5">
            Missing Document & KYC Reminder Automation
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-10">
            Stop chasing clients for missing insurance documents. Leo Pisha helps Kenyan insurance
            teams automate KYC reminders, claims document follow-ups, and document tracking — so
            claims move faster and your team stops spending hours on manual chasing.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">The problem</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Claims stall waiting on missing KYC or supporting documents</li>
                <li>Staff spend hours chasing clients by phone and email</li>
                <li>No clear view of which claims are blocked on documents</li>
                <li>Follow-ups are inconsistent or forgotten</li>
                <li>Clients respond slowly because reminders are not structured</li>
              </ul>
            </div>

            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">What we automate</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Document request and reminder workflows</li>
                <li>KYC document collection reminders</li>
                <li>Claims document tracking and status visibility</li>
                <li>Escalation routing for overdue documents</li>
                <li>Client communication templates and scheduling</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Outcomes</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Faster document collection from clients</li>
                <li>Reduced manual chasing and follow-up time</li>
                <li>Fewer stalled claims waiting on paperwork</li>
                <li>Consistent, timely follow-ups</li>
                <li>Claims processed faster with fewer delays</li>
              </ul>
            </div>

            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Example workflow</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Claim opened — missing documents identified</li>
                <li>Automated reminder sent to client</li>
                <li>Follow-up escalates if no response</li>
                <li>Document received — claim moves forward</li>
                <li>Team notified only when action is needed</li>
              </ul>
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