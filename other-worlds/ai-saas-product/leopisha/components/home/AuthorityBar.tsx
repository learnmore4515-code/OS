"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const bottlenecks = [
  {
    title: "Claims response",
    body: "Files sit too long between teams, status updates slow down, and service quality drops long before anyone calls it a process problem.",
  },
  {
    title: "Underwriting turnaround",
    body: "Quote and review cycles drag when too many decisions and follow-ups still rely on people chasing the next step manually.",
  },
  {
    title: "Client follow-through",
    body: "The real issue is often not one task, but the chain of missed follow-ups that turns internal friction into a customer-facing delay.",
  },
];

const fitSignals = [
  "Broker-led teams under pressure",
  "Owner-led firms with process drag",
  "Operations teams feeling manual load",
  "Insurance workflows ready for cleanup",
];

export function AuthorityBar() {
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
            start: "top 82%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-y border-border/70 bg-card/55 py-20"
      aria-labelledby="authority-heading"
    >
      <div className="container-custom">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
          <div>
            <div data-animate="entry" className="section-kicker">Where operations usually break</div>
            <h2 id="authority-heading" data-animate="entry" className="mt-6 section-title max-w-xl">
              Insurance teams usually know the symptom first. The site should make the cause feel obvious.
            </h2>
            <p data-animate="entry" className="mt-6 section-body max-w-xl">
              The strongest first signal is not hype. It is recognising the exact places where process drag turns into slower service, delayed response, and operational strain.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {bottlenecks.map((item) => (
              <article key={item.title} data-animate="entry" className="premium-surface p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Bottleneck</p>
                <h3 className="mt-4 font-heading text-2xl text-foreground">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div data-animate="entry" className="mt-10 premium-surface flex flex-col gap-6 p-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Who this is for</p>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Leo Pisha is for insurance businesses already feeling the cost of manual workflow drag and looking for a serious operator to help clean up the process.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {fitSignals.map((signal) => (
              <span key={signal} className="rounded-full border border-border/80 bg-background/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-foreground/72">
                {signal}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
