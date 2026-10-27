import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Automation Diagnosis | Leo Pisha",
  description:
    "Workflow diagnosis for Kenyan insurance teams. Leo Pisha maps your workflows, quantifies the cost of manual work, and delivers a prioritized automation roadmap with ROI projections.",
  keywords: [
    "insurance workflow diagnosis Kenya",
    "insurance process audit Kenya",
    "insurance automation diagnosis Kenya",
    "insurance automation consultant Kenya",
  ],
  openGraph: {
    title: "Automation Diagnosis | Leo Pisha",
    description:
      "Workflow diagnosis for Kenyan insurance teams. Leo Pisha maps your workflows, quantifies the cost of manual work, and delivers a prioritized automation roadmap with ROI projections.",
    type: "website",
    url: "https://www.leopisha.co.ke/services/automation-diagnosis",
  },
  alternates: {
    canonical: "https://www.leopisha.co.ke/services/automation-diagnosis",
  },
};

export default function AutomationDiagnosisPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Automation Diagnosis",
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
      "Workflow diagnosis for Kenyan insurance teams. Leo Pisha maps your workflows, quantifies the cost of manual work, and delivers a prioritized automation roadmap with ROI projections.",
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
              { "@type": "ListItem", position: 3, name: "Automation Diagnosis", item: "https://www.leopisha.co.ke/services/automation-diagnosis" },
            ],
          }),
        }}
      />
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h1 className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl text-foreground mb-5">
            Automation Diagnosis for Insurance Workflows
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-10">
            Leo Pisha maps your workflows, quantifies the cost of manual work, and delivers a
            prioritized roadmap with ROI projections. The first step to automation is knowing where
            your process drag lives.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">The problem</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Workflows slow down but no one knows exactly where</li>
                <li>Manual work costs time but no one has measured it</li>
                <li>Automation efforts start without knowing which steps matter most</li>
                <li>Teams disagree on where the biggest delays happen</li>
              </ul>
            </div>

            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">What we diagnose</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Claims processing workflows</li>
                <li>Underwriting turnaround bottlenecks</li>
                <li>Customer response delays</li>
                <li>Manual data entry and rework</li>
                <li>System integration gaps</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Step-by-step workflow</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Map your current workflow step by step</li>
                <li>Measure time and cost of each manual step</li>
                <li>Identify bottlenecks and error-prone steps</li>
                <li>Prioritize automation by impact and effort</li>
                <li>Deliver roadmap with ROI projections</li>
              </ul>
            </div>

            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">What you get</h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed">
                <li>Process audit report</li>
                <li>ROI model</li>
                <li>Automation roadmap</li>
                <li>Quick-win identification</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-card border border-border-soft rounded-2xl p-8 lg:p-10">
            <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Frequently asked questions</h3>
            <div className="space-y-4">
              <div className="border-b border-border/70 pb-4">
                <p className="font-medium text-foreground">How long does a workflow diagnosis take?</p>
                <p className="mt-2 text-sm text-muted-foreground">1-2 weeks. We observe your current process, interview your team, and quantify where time is lost.</p>
              </div>
              <div className="border-b border-border/70 pb-4">
                <p className="font-medium text-foreground">Do I need to automate everything at once?</p>
                <p className="mt-2 text-sm text-muted-foreground">No. The diagnosis identifies quick wins — small automations with high impact — so you can start small and expand.</p>
              </div>
              <div className="border-b border-border/70 pb-4">
                <p className="font-medium text-foreground">What if I'm not sure automation is right for us?</p>
                <p className="mt-2 text-sm text-muted-foreground">The diagnosis tells you whether automation is the right fix, or whether a simpler process change would work better. No obligation to proceed.</p>
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
