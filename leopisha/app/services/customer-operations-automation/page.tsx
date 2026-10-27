import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Customer Operations Automation | Leo Pisha",
  description:
    "24/7 member support automation via WhatsApp and portal. Eligibility checks, claims status, benefits, provider search. Kenyan insurance teams serve members faster with less manual effort.",
  keywords: [
    "customer operations automation Kenya",
    "insurance customer service automation Kenya",
    "insurance member support automation",
  ],
  openGraph: {
    title: "Customer Operations Automation | Leo Pisha",
    description:
      "24/7 member support automation via WhatsApp and portal. Eligibility checks, claims status, benefits, provider search.",
    type: "website",
    url: "https://www.leopisha.co.ke/services/customer-operations-automation",
  },
  alternates: {
    canonical: "https://www.leopisha.co.ke/services/customer-operations-automation",
  },
};

export default function CustomerOperationsAutomationPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Customer Operations Automation",
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
      "24/7 member support automation via WhatsApp and portal. Eligibility checks, claims status, benefits, provider search.",
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
              { "@type": "ListItem", position: 3, name: "Customer Operations Automation", item: "https://www.leopisha.co.ke/services/customer-operations-automation" },
            ],
          }),
        }}
      />
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h1 className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl text-foreground mb-5">
            Customer Operations Automation for Kenyan Insurers
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-10">
            24/7 member support automation via WhatsApp and portal. Leo Pisha helps Kenyan insurers
            automate eligibility checks, claims status, benefits, and provider search — so members
            get answers faster and your team handles less manual work.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">The problem</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Members call or message with the same questions repeatedly</li>
                <li>Call center queues grow during renewal and claims seasons</li>
                <li>Staff spend hours answering eligibility and coverage questions</li>
                <li>Members wait on hold or for email responses</li>
              </ul>
            </div>

            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">What we automate</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>24/7 member support via WhatsApp</li>
                <li>Member self-service portal</li>
                <li>Eligibility and benefits checks</li>
                <li>Claims status inquiries</li>
                <li>Provider search and directory</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Step-by-step workflow</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Member sends message via WhatsApp or portal</li>
                <li>Automation identifies intent and retrieves member data</li>
                <li>Eligibility, benefits, or claims status answered instantly</li>
                <li>Complex queries routed to human agent with context</li>
                <li>Interaction logged for follow-up and improvement</li>
              </ul>
            </div>

            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Outcomes</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>24/7 member support without more staff</li>
                <li>Reduced call center volume</li>
                <li>Faster member response times</li>
                <li>Higher member satisfaction</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-card border border-border-soft rounded-2xl p-8 lg:p-10">
            <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Frequently asked questions</h3>
            <div className="space-y-4">
              <div className="border-b border-border/70 pb-4">
                <p className="font-medium text-foreground">Can automation handle complex member questions?</p>
                <p className="mt-2 text-sm text-muted-foreground">Routine questions are answered instantly. Complex questions are routed to a human agent with full conversation context, so members never repeat themselves.</p>
              </div>
              <div className="border-b border-border/70 pb-4">
                <p className="font-medium text-foreground">What channels are supported?</p>
                <p className="mt-2 text-sm text-muted-foreground">WhatsApp, member portal, and web chat — all connected to the same member data and conversation history.</p>
              </div>
              <div className="border-b border-border/70 pb-4">
                <p className="font-medium text-foreground">Is member data secure?</p>
                <p className="mt-2 text-sm text-muted-foreground">Yes. Member data is handled in accordance with Kenyan data protection requirements, with access controls and audit trails.</p>
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
