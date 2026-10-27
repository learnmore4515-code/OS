"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { gsap } from "gsap";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const hero = heroRef.current;
      if (!hero) return;

      gsap.fromTo(
        hero.querySelectorAll('[data-animate="fade-up"]'),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.75,
          ease: "expo.out",
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-primary pt-32 pb-24 text-on-primary sm:pt-36 lg:pt-40 lg:pb-32"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 opacity-50 premium-grid" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgb(216_192_138_/_0.18),_transparent_42%)]" aria-hidden="true" />
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent" aria-hidden="true" />

      <div className="container-custom relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-end">
          <div className="max-w-4xl">
            <div
              data-animate="fade-up"
              className="section-kicker border-white/10 bg-white/5 text-on-primary/70"
            >
              Insurance workflow automation
            </div>

            <h1
              id="hero-heading"
              data-animate="fade-up"
              className="mt-8 max-w-4xl font-heading text-4xl leading-[1] tracking-tight text-on-primary sm:text-5xl lg:text-[4.5rem] xl:text-[5rem]"
            >
              Leo Pisha helps businesses improve operations through workflow automation.
            </h1>

            <p
              data-animate="fade-up"
              className="mt-8 max-w-2xl text-lg leading-relaxed text-on-primary/72 sm:text-xl"
            >
              When claims are slow, underwriting takes too long, or follow-up slips, Leo Pisha helps businesses fix the workflow behind it and automate the steps that keep wasting time.
            </p>

            <div
              data-animate="fade-up"
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link href="https://calendly.com/leopishaagency/new-meeting">
                <Button size="xl" className="min-w-[240px]">
                  Book a consultation
                </Button>
              </Link>
              <Link
                href="#how-i-work"
                className="inline-flex items-center text-sm font-semibold uppercase tracking-[0.18em] text-on-primary/68 transition-colors duration-200 hover:text-on-primary"
              >
                See how I work
              </Link>
            </div>

            <div
              data-animate="fade-up"
              className="mt-10 grid gap-4 text-sm text-on-primary/68 sm:grid-cols-3"
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="font-medium text-on-primary">Claims and underwriting first</p>
                <p className="mt-1 text-on-primary/62">That is usually where manual work costs the most time and creates the most friction.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="font-medium text-on-primary">Built around your workflow</p>
                <p className="mt-1 text-on-primary/62">I start with the part of the process that is breaking, then design the automation around that.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="font-medium text-on-primary">Made to be used after launch</p>
                <p className="mt-1 text-on-primary/62">The handover matters. Your team should know what is running, what it does, and why it is there.</p>
              </div>
            </div>
          </div>

          <aside
            data-animate="fade-up"
            className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-7 text-left text-on-primary shadow-2xl shadow-black/20 backdrop-blur-sm lg:p-8"
          >
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/65 to-transparent" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-soft">Where Leo Pisha looks first</p>
            <h2 className="mt-5 font-heading text-[1.7rem] leading-tight text-on-primary sm:text-[2rem]">
              Where the work gets stuck, who is waiting on it, and what the client ends up feeling.
            </h2>
            <div className="mt-8 space-y-5 text-sm text-on-primary/70">
              <div className="border-l border-accent/40 pl-4">
                <p className="font-medium text-on-primary">Claims that wait for the next step</p>
                <p className="mt-1">Documents move, teams wait, and response time stretches longer than it should.</p>
              </div>
              <div className="border-l border-accent/40 pl-4">
                <p className="font-medium text-on-primary">Underwriting that depends on back-and-forth</p>
                <p className="mt-1">The queue gets longer when too much of the work still depends on people chasing updates by hand.</p>
              </div>
              <div className="border-l border-accent/40 pl-4">
                <p className="font-medium text-on-primary">Client requests that fall through the cracks</p>
                <p className="mt-1">What looks like a service problem from the outside is often a workflow problem inside the business.</p>
              </div>
            </div>
            <div className="mt-8 rounded-2xl border border-white/10 bg-black/10 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-on-primary/45">Consultation focus</p>
              <p className="mt-3 text-base leading-relaxed text-on-primary/78">
                In the first session, we map the delay, identify the repeated manual steps, and decide whether automation is the right fix.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
