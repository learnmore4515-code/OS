"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CaseStudy } from "@/lib/case-studies";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CaseStudyDetailProps {
  caseStudy: CaseStudy;
}

export function CaseStudyDetail({ caseStudy }: CaseStudyDetailProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const resultRefs = useRef<(HTMLDivElement | null)[]>([]);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // GSAP Scroll Animations
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      // Hero animation
      gsap.fromTo(
        section.querySelectorAll('[data-animate="hero"]'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.15,
        }
      );

      // Results cards
      gsap.fromTo(
        resultRefs.current.filter(Boolean) as HTMLDivElement[],
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: section.querySelector('[data-results]'),
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Testimonial
      gsap.fromTo(
        testimonialRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: testimonialRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Approach items
      gsap.fromTo(
        section.querySelectorAll('[data-animate="approach"]'),
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: section.querySelector('[data-approach]'),
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <article ref={sectionRef} className="min-h-screen" aria-labelledby="case-study-title">
      {/* Hero Section */}
      <header className="relative min-h-[60vh] sm:min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <img
            src={caseStudy.poster}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />
        </div>

        <div className="container-custom relative z-10 pb-16 sm:pb-24">
          <div className="max-w-4xl">
            <div data-animate="hero" className="mb-6 flex flex-wrap items-center gap-3">
              <span className="px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium">
                {caseStudy.industry}
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium">
                {caseStudy.timeline}
              </span>
            </div>

            <h1
              id="case-study-title"
              data-animate="hero"
              className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6"
            >
              {caseStudy.headline}
            </h1>

            <p data-animate="hero" className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
              {caseStudy.outcome}
            </p>

            <div data-animate="hero" className="flex flex-wrap items-center gap-4">
              <Link href="https://calendly.com/leopishaagency/new-meeting">
                <Button size="lg" className="min-w-[200px]">
                  Start Your Project
                </Button>
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 text-white/80 font-medium hover:text-white transition-colors duration-300 px-4 py-3 rounded-xl border border-white/20 hover:border-white/30 hover:bg-white/5"
              >
                ← Back to All Cases
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Key Results */}
      <section className="section-padding bg-background" data-results>
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
            {caseStudy.results?.map((result, index) => (
              <div
                ref={(el) => {
                  resultRefs.current[index] = el;
                }}
                key={result.label}
                className="text-center p-6 lg:p-8 bg-card border border-border-soft rounded-2xl"
              >
                <div className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-3 leading-tight">
                  {result.value}
                </div>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-medium">
                  {result.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="section-padding bg-muted/30 border-y border-border-soft">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-5">
                The Challenge
              </span>
              <h2 className="font-heading font-medium text-3xl sm:text-4xl text-foreground mb-6 leading-tight">
                Why They Needed Change
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>

            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-5">
                The Solution
              </span>
              <h2 className="font-heading font-medium text-3xl sm:text-4xl text-foreground mb-6 leading-tight">
                What We Built
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      {caseStudy.approach && caseStudy.approach.length > 0 && (
        <section className="section-padding bg-background" data-approach>
          <div className="container-custom">
            <header className="max-w-2xl mx-auto text-center mb-14 lg:mb-20">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-5">
                Our Approach
              </span>
              <h2 className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl text-foreground mb-5">
                How We Delivered
              </h2>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudy.approach.map((item, index) => (
                <div
                  key={index}
                  data-animate="approach"
                  className="p-6 lg:p-8 bg-card border border-border-soft rounded-2xl opacity-0"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technologies */}
      {caseStudy.technologies && caseStudy.technologies.length > 0 && (
        <section className="py-16 lg:py-20 bg-muted/30 border-y border-border-soft">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h3 className="font-heading font-medium text-2xl sm:text-3xl text-foreground mb-4">
                Technology Stack
              </h3>
              <p className="text-muted-foreground">
                Production-grade tools. No vendor lock-in. You own everything.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {caseStudy.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-5 py-2.5 rounded-full bg-card border border-border-soft text-sm font-medium text-foreground/80 hover:border-accent/50 hover:text-accent transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {caseStudy.testimonial && (
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div
              ref={testimonialRef}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-primary border border-border rounded-2xl p-8 lg:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" aria-hidden="true" />
                <div className="relative z-10">
                  <svg className="w-12 h-12 text-accent/30 mb-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.431.989-3.995 3.636-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.431.989-3.995 3.636-3.995 5.849h3.983v10h-9.983z"/>
                  </svg>
                  <blockquote className="text-white/90 text-xl sm:text-2xl lg:text-3xl leading-relaxed mb-8 font-light">
                    "{caseStudy.testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <img
                      src={caseStudy.testimonial.avatar}
                      alt=""
                      className="w-14 h-14 rounded-full object-cover border-2 border-accent/30"
                    />
                    <div>
                      <p className="font-heading font-medium text-white">{caseStudy.testimonial.author}</p>
                      <p className="text-white/60 text-sm">{caseStudy.testimonial.role}, {caseStudy.client}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-primary border-t border-border">
        <div className="container-custom text-center">
          <h2 className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl text-on-primary mb-6">
            Ready for Your Own Case Study?
          </h2>
          <p className="text-on-primary/70 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Start with a zero-risk pilot. See results in weeks, not months. No commitment until you're convinced.
          </p>
          <Link href="https://calendly.com/leopishaagency/new-meeting">
            <Button size="xl" variant="secondary" className="min-w-[280px]">
              Book a Strategy Call
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </Link>
        </div>
      </section>
    </article>
  );
}