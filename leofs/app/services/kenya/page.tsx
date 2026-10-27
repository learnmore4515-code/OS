import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Insurance Automation Consultant Kenya | Leo Pisha",
  description:
    "Leo Pisha helps insurance teams in Kenya automate claims, underwriting, and customer operations. Kenya-based insurance workflow automation consulting. Book a free consultation.",
  keywords: [
    "insurance automation consultant Kenya",
    "insurance automation Nairobi",
    "claims automation Kenya",
    "underwriting automation Kenya",
    "insurance operations consultant Kenya",
  ],
  openGraph: {
    title: "Insurance Automation Consultant Kenya | Leo Pisha",
    description:
      "Leo Pisha helps insurance teams in Kenya automate claims, underwriting, and customer operations.",
    type: "website",
    url: "https://www.leopisha.co.ke/services/kenya",
  },
  alternates: {
    canonical: "https://www.leopisha.co.ke/services/kenya",
  },
};

export default function KenyaPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    serviceType: "Insurance automation consulting",
    provider: {
      "@type": "Organization",
      name: "Leo Pisha",
      url: "https://www.leopisha.co.ke",
    },
    areaServed: "KE",
    hasOfferedCatalog: {
      "@type": "OfferCatalog",
      name: "Insurance automation services",
      itemOffered: [
        { "@type": "Service", name: "Automation Diagnosis" },
        { "@type": "Service", name: "Claims Processing Automation" },
        { "@type": "Service", name: "Underwriting Automation" },
        { "@type": "Service", name: "Customer Operations Automation" },
        { "@type": "Service", name: "Fraud Detection & Prevention" },
        { "@type": "Service", name: "Managed Automation Operations" },
        { "@type": "Service", name: "Missing Document & KYC Reminder Automation" },
        { "@type": "Service", name: "Insurance Renewal Reminder Automation" },
      ],
    },
    description:
      "Leo Pisha helps insurance teams in Kenya automate claims, underwriting, and customer operations. Workflow diagnosis, automation design, build, and handover.",
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
              { "@type": "ListItem", position: 3, name: "Insurance Automation Consultant Kenya", item: "https://www.leopisha.co.ke/services/kenya" },
            ],
          }),
        }}
      />
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h1 className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl text-foreground mb-5">
            Insurance Automation Consultant for Kenya
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-10">
            Leo Pisha helps businesses automate claims, underwriting, and customer operations.
            Leo Pisha is Kenya-based and serves businesses across Nairobi, Mombasa, Kisumu, and
            beyond. Workflow diagnosis, automation design, build, and handover — all with a deep
            understanding of the Kenyan insurance market.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Why Kenya-based matters</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>We understand Kenyan insurance workflows</li>
                <li>Local team, responsive support</li>
                <li>Built for Kenyan regulatory context</li>
                <li>Timezone-aligned with your team</li>
              </ul>
            </div>

            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">What we automate</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Claims processing automation</li>
                <li>Underwriting automation</li>
                <li>Customer operations automation</li>
                <li>Fraud detection & prevention</li>
                <li>Missing document & KYC reminder automation</li>
                <li>Insurance renewal reminder automation</li>
                <li>Workflow diagnosis & automation roadmap</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="https://calendly.com/leopishaagency/new-meeting">
              <button className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-on-primary rounded-2xl font-medium hover:bg-primary/90 transition-colors">
                Book a Free Consultation
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
