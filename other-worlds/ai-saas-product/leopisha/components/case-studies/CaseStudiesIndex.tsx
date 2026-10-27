"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CaseStudiesIndex() {
  return (
    <section className="section-padding bg-background" aria-labelledby="case-studies-heading">
      <div className="container-custom">
        <div className="max-w-3xl">
          <div className="section-kicker">Case studies</div>
          <h1 id="case-studies-heading" className="mt-6 section-title">
            Client case studies are not public yet.
          </h1>
          <p className="mt-6 max-w-2xl section-body">
            Leo Pisha is still building its first client proof. Until those engagements are complete and permission is given, this page stays honest about where the brand is today.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="premium-surface p-7 lg:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">What you can expect instead</p>
            <h2 className="mt-4 font-heading text-3xl leading-tight text-foreground">A direct conversation about where your workflow is slowing down.</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              If you are dealing with delays in claims flow, underwriting turnaround, or customer follow-up, the fastest way to assess fit is through a focused consultation rather than placeholder proof.
            </p>
          </div>

          <div className="premium-surface p-7 lg:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">What will appear here later</p>
            <ul className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
              <li>Named client context where permission is given</li>
              <li>The workflow problem that needed fixing</li>
              <li>The automation intervention that changed it</li>
              <li>The measurable shift in speed, follow-through, or service quality</li>
            </ul>
          </div>
        </div>

        <div className="mt-14">
          <Link href="https://calendly.com/leopishaagency/new-meeting">
            <Button size="xl">Book a consultation</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
