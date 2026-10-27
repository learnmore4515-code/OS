"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const areas = [
  {
    title: "Claims workflows",
    problem: "Too many handoffs, too much waiting, and not enough visibility into where the file actually stalled.",
    outcome: "Faster movement, cleaner routing, and less manual chasing between teams.",
  },
  {
    title: "Underwriting operations",
    problem: "Review queues grow when too many decisions and follow-ups still rely on manual coordination.",
    outcome: "Sharper turnaround, better workflow discipline, and less drag on brokers and internal teams.",
  },
  {
    title: "Customer response",
    problem: "The client feels every delay when internal status, follow-up, and information flow are inconsistent.",
    outcome: "Quicker answers, stronger follow-through, and a workflow that supports service instead of slowing it.",
  },
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FeaturedCaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelectorAll('[data-animate="entry"]'),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="what-i-fix"
      ref={sectionRef}
      className="section-padding bg-background"
      aria-labelledby="what-i-fix-heading"
    >
      <div className="container-custom">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div data-animate="entry" className="section-kicker">What I help fix</div>
            <h2 id="what-i-fix-heading" data-animate="entry" className="mt-6 section-title">
              The work is not AI for insurance. It is fixing the workflows where manual drag is already hurting the business.
            </h2>
            <p data-animate="entry" className="mt-6 max-w-2xl section-body">
              The value is not in adding more software language. It is in identifying the broken operational chain and rebuilding it into something faster, cleaner, and easier to run.
            </p>
          </div>
          <div data-animate="entry">
            <Link href="https://calendly.com/leopishaagency/new-meeting">
              <Button variant="outline" size="lg">Discuss your bottleneck</Button>
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {areas.map((area) => (
            <Card key={area.title} data-animate="entry" className="h-full overflow-hidden rounded-[1.5rem] border-border/80 bg-card/92 p-0 shadow-sm">
              <div className="border-b border-border/70 px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Focus area</p>
                <h3 className="mt-3 font-heading text-3xl leading-tight text-foreground">{area.title}</h3>
              </div>

              <div className="px-6 py-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Where it usually breaks</p>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{area.problem}</p>
                </div>

                <div className="mt-8 border-t border-border/70 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">What better looks like</p>
                  <p className="mt-3 text-base leading-relaxed text-foreground">{area.outcome}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
