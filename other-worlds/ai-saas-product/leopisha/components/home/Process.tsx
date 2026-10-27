"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    number: "01",
    title: "Diagnose the drag",
    description: "We look at the workflow as it actually runs and identify where the delay or friction is being created.",
    deliverables: ["Workflow diagnosis", "Operational notes", "Priority bottleneck"],
  },
  {
    number: "02",
    title: "Design the fix",
    description: "The fix is scoped around the exact process problem, the practical workflow, and what your team will need to run it confidently.",
    deliverables: ["Solution design", "Scope outline", "Risk view"],
  },
  {
    number: "03",
    title: "Build and hand over",
    description: "The finished system should move faster, feel cleaner, and be understood by the people who have to rely on it after launch.",
    deliverables: ["Working workflow", "Documentation", "Handover"],
  },
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Process() {
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
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how-i-work"
      ref={sectionRef}
      className="section-padding bg-muted/30"
      aria-labelledby="process-heading"
    >
      <div className="container-custom">
        <div className="max-w-3xl">
          <div data-animate="entry" className="section-kicker">How I work</div>
          <h2 id="process-heading" data-animate="entry" className="mt-6 section-title">
            How I work.
          </h2>
          <p data-animate="entry" className="mt-6 max-w-2xl section-body">
            Leo Pisha starts by finding where the process is slowing down. The work is scoped around the part of the workflow that is actually causing the delay.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {steps.map((step) => (
            <article key={step.number} data-animate="entry" className="premium-surface flex h-full flex-col p-7 lg:p-8">
              <div className="flex items-center justify-between border-b border-border/70 pb-5">
                <span className="font-heading text-4xl text-foreground">{step.number}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Engagement step</span>
              </div>
              <h3 className="mt-6 font-heading text-3xl leading-tight text-foreground">{step.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{step.description}</p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {step.deliverables.map((deliverable) => (
                  <span key={deliverable} className="rounded-full border border-border/70 bg-background/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-foreground/75">
                    {deliverable}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div data-animate="entry" className="mt-10 flex flex-col gap-4 rounded-[1.5rem] border border-border/75 bg-background/80 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <p className="text-sm font-medium text-foreground">The first conversation is about the workflow, not the tool.</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">That keeps the work practical and tied to the real problem inside the business.</p>
          </div>
          <Link href="https://calendly.com/leopishaagency/new-meeting" className="text-sm font-semibold uppercase tracking-[0.18em] text-accent transition-colors duration-200 hover:text-accent/85">
            Book a consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
