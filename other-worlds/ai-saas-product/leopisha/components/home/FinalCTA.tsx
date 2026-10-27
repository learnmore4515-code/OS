"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FinalCTA() {
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
      className="relative overflow-hidden bg-primary py-24 text-on-primary lg:py-32"
      aria-labelledby="final-cta-heading"
    >
      <div className="absolute inset-0 opacity-45 premium-grid" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgb(216_192_138_/_0.16),_transparent_45%)]" aria-hidden="true" />

      <div className="container-custom relative">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/5 px-8 py-10 backdrop-blur-sm lg:px-12 lg:py-14">
          <div data-animate="entry" className="section-kicker border-white/10 bg-white/5 text-on-primary/70">Book a focused consultation</div>
          <h2
            id="final-cta-heading"
            data-animate="entry"
            className="mt-8 max-w-3xl font-heading text-3xl leading-tight text-on-primary sm:text-4xl lg:text-5xl"
          >
            If manual workflow drag is already hurting response or service, this is where the conversation should start.
          </h2>
          <p
            data-animate="entry"
            className="mt-6 max-w-2xl text-lg leading-relaxed text-on-primary/72 sm:text-xl"
          >
            The consultation is for brokers, insurance owners, and operators who want a clearer view of where the process is slowing down and what a practical automation intervention would actually change.
          </p>

          <div data-animate="entry" className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="https://calendly.com/leopishaagency/new-meeting">
              <Button size="xl">Book a consultation</Button>
            </Link>
          </div>

          <div data-animate="entry" className="mt-10 grid gap-4 text-sm text-on-primary/66 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/12 px-5 py-4">
              <p className="font-medium text-on-primary">Built for serious operators</p>
              <p className="mt-1">Best for teams already feeling the cost of process friction in live workflows.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/12 px-5 py-4">
              <p className="font-medium text-on-primary">Focused on the bottleneck</p>
              <p className="mt-1">The first conversation is used to isolate where the slowdown sits and what the fix needs to achieve.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/12 px-5 py-4">
              <p className="font-medium text-on-primary">No generic automation pitch</p>
              <p className="mt-1">The conversation stays close to the workflow, the response problem, and the operating reality.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
