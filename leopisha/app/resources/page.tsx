import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources | Leo Pisha",
  description:
    "Practical guides to help Kenyan businesses automate repetitive work and decide where automation fits — from workflow diagnosis to hands-on implementation.",
  openGraph: {
    title: "Resources | Leo Pisha",
    description:
      "Practical guides to help Kenyan businesses automate repetitive work and decide where automation fits.",
    type: "website",
    url: "https://www.leopisha.co.ke/resources",
  },
  alternates: {
    canonical: "https://www.leopisha.co.ke/resources",
  },
};

export default function ResourcesPage() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <h1 className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl text-foreground mb-5">
          Resources
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-12">
          Practical guides for Kenyan business owners who want to stop spending hours on repetitive
          admin and start running smoother operations.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <article className="bg-card border border-border-soft rounded-2xl p-8 lg:p-10">
            <h2 className="font-heading font-semibold text-xl text-foreground mb-3">
              Workflow Automation for Small Businesses in Kenya
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              Which everyday workflows are worth automating — lead follow-ups, document collection,
              approvals, reporting — and how to tell when a manual process is good enough.
            </p>
            <Link
              href="/resources/workflow-automation-small-business"
              className="text-accent font-medium hover:text-accent/90 transition-colors"
            >
              Read the guide &rarr;
            </Link>
          </article>
        </div>

        <div className="bg-muted/30 border border-border-soft rounded-2xl p-8 lg:p-12">
          <h2 className="font-heading font-semibold text-xl text-foreground mb-4">
            Where to start
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            Not sure which workflow to automate first? Begin with an Automation Diagnosis — we map
            your process, quantify the manual work, and give you a prioritized roadmap before you
            commit to a build.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="https://calendly.com/leopishaagency/new-meeting">
              <button className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-on-primary rounded-2xl font-medium hover:bg-primary/90 transition-colors">
                Book a Discovery Call
              </button>
            </Link>
            <Link href="/services/automation-diagnosis">
              <button className="inline-flex items-center justify-center px-8 py-3.5 border border-border-soft rounded-2xl font-medium text-foreground hover:border-accent/50 hover:bg-accent/5 hover:text-accent transition-colors">
                Learn About Diagnosis
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
