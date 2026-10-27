"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: "diagnosis",
    title: "Automation Diagnosis",
    description: "We map your workflows, quantify the cost of manual work, and deliver a prioritized roadmap with ROI projections.",
    icon: "search",
    deliverables: ["Process audit report", "ROI model", "Automation roadmap", "Quick-win identification"],
    timeline: "1-2 weeks",
    featured: true,
  },
  {
    id: "claims-automation",
    title: "Claims Processing Automation",
    description: "End-to-end claims automation from FNOL to settlement. Document ingestion, AI extraction, triage, and auto-approval.",
    icon: "file-check",
    deliverables: ["n8n workflows", "AI document processing", "Triage engine", "Adjuster dashboard", "IRA compliance logging"],
    timeline: "1-2 weeks",
    featured: true,
  },
  {
    id: "underwriting-automation",
    title: "Underwriting Automation",
    description: "Instant quote-to-bind for motor, property, and SME lines. Risk scoring, straight-through processing, exception routing.",
    icon: "shield-check",
    deliverables: ["Risk scoring models", "Broker portal", "STP workflows", "Exception handling", "Reinsurance reporting"],
    timeline: "1-2 weeks",
    featured: true,
  },
  {
    id: "customer-ops",
    title: "Customer Operations Automation",
    description: "24/7 member support via WhatsApp and portal. Eligibility checks, claims status, benefits, provider search.",
    icon: "message-circle",
    deliverables: ["WhatsApp bot", "RAG knowledge base", "Self-service portal", "Smart escalation", "Analytics dashboard"],
    timeline: "1-2 weeks",
    featured: true,
  },
  {
    id: "fraud-detection",
    title: "Fraud Detection & Prevention",
    description: "AI-powered fraud scoring at claim intake. Network analysis, anomaly detection, investigator case management.",
    icon: "alert-triangle",
    deliverables: ["Fraud scoring models", "Network analysis", "Investigator workspace", "Case management", "SAR automation"],
    timeline: "1-2 weeks",
    featured: false,
  },
  {
    id: "retainer",
    title: "Managed Automation Operations",
    description: "We run and optimize your automations. Monthly reviews, proactive improvements, priority support. You own the IP.",
    icon: "cpu",
    deliverables: ["Monthly performance reports", "Proactive optimizations", "Priority support", "SLA monitoring", "Capacity planning"],
    timeline: "1-2 weeks",
    featured: false,
  },
  {
    id: "customer-ops-automation",
    title: "Customer Operations Automation",
    description: "24/7 member support via WhatsApp and portal. Eligibility checks, claims status, benefits, provider search.",
    icon: "message-circle",
    deliverables: ["WhatsApp bot", "RAG knowledge base", "Self-service portal", "Smart escalation", "Analytics dashboard"],
    timeline: "1-2 weeks",
    featured: false,
  },
  {
    id: "missing-documents-automation",
    title: "Missing Document & KYC Reminder Automation",
    description: "Automated KYC reminders, claims document follow-ups, and document tracking. Stop chasing clients and speed up claims processing.",
    icon: "file-check",
    deliverables: ["Document reminder workflows", "KYC document tracking", "Escalation routing", "Client communication templates"],
    timeline: "1-2 weeks",
    featured: false,
  },
  {
    id: "insurance-renewal-automation",
    title: "Insurance Renewal Reminder Automation",
    description: "Automated renewal reminders, policy expiry tracking, and renewal follow-up workflows. Improve retention and reduce lapsed policies.",
    icon: "alert-triangle",
    deliverables: ["Renewal reminder workflows", "Policy expiry tracking", "Renewal follow-up scheduling", "Retention reporting"],
    timeline: "1-2 weeks",
    featured: false,
  },
];

const icons: Record<string, React.ReactNode> = {
  search: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  "file-check": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  "shield-check": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  "message-circle": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  "alert-triangle": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  cpu: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 16l4-16M6 12a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0zM14 8a2 2 0 11-4 0 2 2 0 014 0zm0 8a2 2 0 11-4 0 2 2 0 014 0zM4 8a2 2 0 11-4 0 2 2 0 014 0zm0 8a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
};

export function ServicesPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
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

      // Header
      gsap.fromTo(
        section.querySelectorAll('[data-animate="header"]'),
        { y: 30 },
        {
          y: 0,
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Service cards
      gsap.fromTo(
        cardRefs.current.filter(Boolean) as HTMLElement[],
        { y: 50, scale: 0.97 },
        {
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: section.querySelector('[data-services-grid]'),
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // CTA
      gsap.fromTo(
        section.querySelector('[data-animate="cta"]'),
        { y: 30 },
        {
          y: 0,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section.querySelector('[data-animate="cta"]'),
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-background"
      aria-labelledby="services-heading"
    >
      <div className="container-custom">
        <header className="max-w-2xl mx-auto text-center mb-14 lg:mb-20">
          <span
            data-animate="header"
            className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-5"
          >
            What We Do
          </span>
          <h1
            id="services-heading"
            data-animate="header"
            className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl text-foreground mb-5"
          >
            Insurance Automation Services for Claims, Underwriting & Client Operations
          </h1>
          <h2 data-animate="header" className="font-heading font-semibold text-xl sm:text-2xl text-foreground mb-5">
            Insurance Automation Services for Kenyan Insurance Teams
          </h2>
          <p
            data-animate="header"
            className="text-muted-foreground text-lg sm:text-xl leading-relaxed"
          >
            From diagnosis to production to ongoing operations. Every engagement starts with a zero-risk pilot.
          </p>
        </header>

        <div
          data-services-grid
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-9"
          role="list"
        >
          {services.map((service, index) => (
            <article
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              key={service.id}
              className={cn(
                "relative overflow-hidden",
                service.featured && "ring-1 ring-accent/30"
              )}
            >
              {service.featured && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" aria-hidden="true" />
              )}

              <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9 h-full flex flex-col">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 text-accent">
                  {icons[service.icon]}
                </div>

                <h3 className="font-heading font-semibold text-2xl text-foreground mb-4 leading-snug">
                  {service.title}
                </h3>

                <p className="text-muted-foreground text-base leading-relaxed mb-7 flex-1">
                  {service.description}
                </p>

                <div className="space-y-3 mb-7">
                  {service.deliverables.map((deliverable, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm text-muted-foreground"
                    >
                      <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{deliverable}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-4 pt-6 border-t border-border-soft">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground font-medium">Timeline</span>
                    <span className="font-medium text-foreground">{service.timeline}</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" aria-hidden="true" />
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 lg:mt-24" data-animate="cta">
          <Card variant="elevated" padding="xl" className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2.5 text-accent font-medium mb-5">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" aria-hidden="true" />
              <span>Zero-Risk Pilot Available</span>
            </div>
            <h3 className="font-heading font-medium text-3xl sm:text-4xl text-foreground mb-4">
              Not Sure Where to Start?
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Begin with an Automation Diagnosis. We'll audit your operations, quantify the opportunity,
              and deliver a roadmap — all before you commit to a build.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="https://calendly.com/leopishaagency/new-meeting">
                <Button size="lg" className="min-w-[220px]">
                  Book a Discovery Call
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button variant="outline" size="lg" className="min-w-[220px] border-border-soft hover:border-accent/50 hover:bg-accent/5 hover:text-accent">
                  View Our Work
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Process Reminder */}
        <div className="mt-20 lg:mt-24">
          <div className="bg-muted/30 border border-border-soft rounded-2xl p-8 lg:p-12">
            <h3 className="font-heading font-medium text-2xl sm:text-3xl text-center text-foreground mb-10">
              How We Work Together
            </h3>
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  number: "01",
                  title: "Diagnose",
                  description: "1-2 weeks. Process audit, ROI model, prioritized roadmap. You decide what to build.",
                },
                {
                  number: "02",
                  title: "Build",
                  description: "1-2 weeks. We build in n8n with full transparency. You see every workflow, every decision point.",
                },
                {
                  number: "03",
                  title: "Operate",
                  description: "1-2 weeks. You own the system; we maintain it. Monthly reviews ensure it keeps delivering.",
                },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-5 shadow-lg">
                    <span className="font-heading font-bold text-2xl lg:text-3xl text-on-primary">{step.number}</span>
                  </div>
                  <h4 className="font-heading font-semibold text-xl text-foreground mb-3">{step.title}</h4>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}