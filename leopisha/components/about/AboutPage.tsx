"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

const principles = [
  {
    title: "Insurance workflows first",
    body: "I focus on the operational bottlenecks that slow claims, underwriting, and customer response before they turn into bigger business problems.",
  },
  {
    title: "Practical automation",
    body: "The goal is not to add complexity. The goal is to reduce manual drag and leave behind a workflow your team can actually use.",
  },
  {
    title: "Clear handover",
    body: "When the work is done, the process should be documented, understandable, and easier for the business to rely on.",
  },
];

export function AboutPage() {
  return (
    <section className="min-h-screen bg-background pt-28 pb-24" aria-labelledby="about-heading">
      <div className="container-custom">
        <div className="max-w-4xl">
          <div className="section-kicker">About Leo Pisha</div>
          <h1 id="about-heading" className="mt-8 max-w-4xl font-heading text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Leo Pisha is a workflow automation agency helping businesses improve operations.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Leo Pisha helps businesses reduce process drag in claims, underwriting, and client response. Work starts with diagnosis, continues through implementation, and ends with a workflow the business can understand and use.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {principles.map((item) => (
            <article key={item.title} className="premium-surface p-7 lg:p-8">
              <h2 className="font-heading text-3xl leading-tight text-foreground">{item.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 max-w-4xl premium-surface p-7 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Why this exists</p>
          <p className="mt-5 text-lg leading-relaxed text-foreground">
            Insurance teams usually feel the symptoms of a broken workflow before they can clearly name the cause. Delays show up in response time, queues get longer, follow-up breaks, and clients feel the friction. Leo Pisha exists to look closely at those workflows and rebuild the parts that are slowing the business down.
          </p>
        </div>

        <div className="mt-16">
          <Link href="https://calendly.com/leopishaagency/new-meeting">
            <Button size="xl">Book a consultation</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
