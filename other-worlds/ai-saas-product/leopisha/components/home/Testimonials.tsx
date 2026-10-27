"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/Card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const principles = [
  {
    title: "Focus on the handoff, not just the delay",
    body: "In insurance operations, the visible slowdown is often just the symptom. The real issue is usually in the handoff from one person, queue, or tool to the next.",
  },
  {
    title: "Built for what your team can actually use",
    body: "A workflow is only useful if your team can rely on it after launch. Handover, visibility, and clarity matter just as much as the build.",
  },
  {
    title: "The work should remove friction, not add complexity",
    body: "The goal is not more automation language. The goal is a process that moves faster, responds better, and is easier to trust internally.",
  },
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Testimonials() {
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
      ref={sectionRef}
      className="section-padding bg-background"
      aria-labelledby="expertise-heading"
    >
      <div className="container-custom">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
          <div>
            <div data-animate="entry" className="section-kicker">How I look at the problem</div>
            <h2 id="expertise-heading" data-animate="entry" className="mt-6 section-title max-w-xl">
              What I pay attention to when I look at an insurance workflow.
            </h2>
            <p data-animate="entry" className="mt-6 max-w-xl section-body">
              I look for the repeated steps, handoffs, and delays that keep slowing the team down and making response harder than it should be.
            </p>

            <div data-animate="entry" className="mt-10 premium-surface p-7 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">What that means</p>
              <p className="mt-4 font-heading text-3xl leading-tight text-foreground lg:text-[2.35rem]">
                Most workflow problems show up first as slow response, missed follow-up, or too much manual work. That is usually where I start.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {principles.map((item) => (
              <Card key={item.title} data-animate="entry" className="rounded-[1.5rem] border-border/75 bg-card/92 shadow-sm">
                <div className="p-7 lg:p-8">
                  <h3 className="font-heading text-3xl leading-tight text-foreground">{item.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
