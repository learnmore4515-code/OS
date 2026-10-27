import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Insurance Renewal Reminder Automation | Leo Pisha",
  description:
    "Stop losing renewals to missed follow-ups. Automated insurance renewal reminders, policy expiry tracking, and renewal follow-up workflows for Kenyan insurers. Improve retention and reduce lapsed policies.",
  keywords: [
    "insurance renewal reminders automation Kenya",
    "insurance renewal automation Kenya",
    "policy expiry reminder automation",
    "insurance renewal follow-up Kenya",
    "insurance broker retention automation",
  ],
  openGraph: {
    title: "Insurance Renewal Reminder Automation | Leo Pisha",
    description:
      "Stop losing renewals to missed follow-ups. Automated insurance renewal reminders, policy expiry tracking, and renewal follow-up workflows for Kenyan insurers.",
    type: "website",
    url: "https://www.leopisha.co.ke/services/insurance-renewal-automation",
  },
  alternates: {
    canonical: "https://www.leopisha.co.ke/services/insurance-renewal-automation",
  },
};

export default function InsuranceRenewalAutomationPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Insurance Renewal Reminder Automation",
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
      "Automated insurance renewal reminders, policy expiry tracking, and renewal follow-up workflows for Kenyan insurers. Improve retention and reduce lapsed policies.",
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
              { "@type": "ListItem", position: 3, name: "Insurance Renewal Reminder Automation", item: "https://www.leopisha.co.ke/services/insurance-renewal-automation" },
            ],
          }),
        }}
      />
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h1 className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl text-foreground mb-5">
            Insurance Renewal Reminder Automation
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-10">
            Stop losing renewals to missed follow-ups. Leo Pisha helps Kenyan insurance teams
            automate renewal reminders, policy expiry tracking, and renewal follow-up workflows —
            improving retention and reducing lapsed policies.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">The problem</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Policies lapse because renewal reminders are missed or manual</li>
                <li>No clear view of upcoming renewals across the book</li>
                <li>Renewal follow-ups depend on individual memory</li>
                <li>Clients renew elsewhere because they were not reminded in time</li>
                <li>Retention suffers without a structured renewal process</li>
              </ul>
            </div>

            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">What we automate</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Policy expiry date tracking and alerts</li>
                <li>Automated renewal reminder sequences</li>
                <li>Renewal follow-up scheduling and routing</li>
                <li>Expiry risk flagging and prioritization</li>
                <li>Client renewal communication templates</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Outcomes</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Higher renewal retention rates</li>
                <li>Fewer lapsed policies</li>
                <li>Consistent, timely renewal reminders</li>
                <li>Less manual tracking and follow-up work</li>
                <li>Better visibility into upcoming renewals</li>
              </ul>
            </div>

            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Example workflow</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Policy renewal date approaches</li>
                <li>Automated reminder sent to client</li>
                <li>Follow-up scheduled if no response</li>
                <li>Escalation to broker if still unresolved</li>
                <li>Policy renewed — or flagged for intervention</li>
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