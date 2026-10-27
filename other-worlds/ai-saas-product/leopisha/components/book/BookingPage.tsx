"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import {
  BOOKING_FORM_DEFAULTS,
  BOOKING_ROLE_OPTIONS,
  BOOKING_SERVICE_OPTIONS,
  bookingSchema,
  type BookingFormValues,
} from "@/lib/booking";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TRUST_POINTS = [
  "No hard pitch",
  "You leave with a clear opportunity assessment",
  "We confirm within 24 hours",
];

const CALL_OUTCOMES = [
  "The one workflow costing your team the most time right now",
  "Whether Leopisha should diagnose, build, or operate with you",
  "What a zero-risk pilot would look like in your environment",
];

const NEXT_STEPS = [
  {
    title: "We review your request",
    description: "We read the process context before we reply, so the first call starts at the bottleneck, not at introductions.",
  },
  {
    title: "We confirm your slot",
    description: "You get a response within 24 hours with the next step, the right contact, and the call format.",
  },
  {
    title: "You leave with a plan",
    description: "We map the workflow, the likely ROI, and whether a pilot is worth doing now, later, or not at all.",
  },
];

interface BookingError {
  field: keyof BookingFormValues | string;
  message: string;
}

export function BookingPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isValid },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    mode: "onChange",
    defaultValues: BOOKING_FORM_DEFAULTS,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelectorAll('[data-animate="intro"]'),
        { y: 28 },
        {
          y: 0,
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.1,
        }
      );

      gsap.fromTo(
        section.querySelectorAll('[data-animate="module"]'),
        { y: 28 },
        {
          y: 0,
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: section.querySelector('[data-booking-module]'),
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        section.querySelectorAll('[data-animate="next-step"]'),
        { y: 24 },
        {
          y: 0,
          duration: 0.7,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: section.querySelector('[data-next-steps]'),
            start: "top 84%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const onSubmit = async (values: BookingFormValues) => {
    clearErrors();
    setSubmitStatus("idle");
    setSubmitError(null);

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        if (Array.isArray(result.errors)) {
          for (const error of result.errors as BookingError[]) {
            if (error.field in BOOKING_FORM_DEFAULTS) {
              setError(error.field as keyof BookingFormValues, { message: error.message });
            }
          }
        }

        setSubmitStatus("error");
        setSubmitError(result.error || "Could not submit your request. Please try again or email hello@leopisha.com.");
        return;
      }

      setSubmitStatus("success");
      reset(BOOKING_FORM_DEFAULTS);

      if (prefersReducedMotion) return;

      const successPanel = sectionRef.current?.querySelector('[data-animate="success"]');
      if (successPanel) {
        gsap.fromTo(
          successPanel,
          { y: 20, scale: 0.98 },
          {
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "expo.out",
          }
        );
      }
    } catch {
      setSubmitStatus("error");
      setSubmitError("Could not submit your request. Please try again or email hello@leopisha.com.");
    }
  };

  return (
    <section ref={sectionRef} className="bg-background pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24 lg:pb-32" aria-labelledby="booking-heading">
      <div className="container-custom">
        <header className="max-w-4xl mx-auto text-center mb-12 lg:mb-16">
          <span data-animate="intro" className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-5">
            Book a Strategy Call
          </span>
          <h1
            id="booking-heading"
            data-animate="intro"
            className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-5 text-balance"
          >
            Bring Us the Process Slowing Your Team Down Most
          </h1>
          <p data-animate="intro" className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto text-balance">
            This call is for insurance teams that already know manual work is costing them time. We will map the bottleneck,
            show what automation would actually change, and tell you honestly whether a pilot is worth doing.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {TRUST_POINTS.map((point) => (
              <div
                key={point}
                data-animate="intro"
                className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-card px-4 py-2 text-sm text-foreground/80 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-accent/70" aria-hidden="true" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </header>

        <div data-booking-module className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.9fr)] lg:items-start">
          <Card
            data-animate="module"
            variant="elevated"
            padding="xl"
            className="bg-card border border-border-soft shadow-xl"
          >
            <CardHeader className="mb-8">
              <CardTitle className="text-2xl sm:text-3xl">Request Your Strategy Call</CardTitle>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Takes about 2 minutes. We reply within 24 hours.
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input label="Full Name" error={errors.name?.message} {...register("name")} required />
                  <Input label="Company Name" error={errors.company?.message} {...register("company")} required />
                  <Input label="Work Email" type="email" error={errors.email?.message} {...register("email")} required />
                  <Input label="Phone" type="tel" error={errors.phone?.message} {...register("phone")} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="role" className="block text-sm font-medium text-foreground">
                      Your Role
                      <span className="text-destructive ml-1" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="role"
                      className={cn(
                        "w-full px-5 py-3.5 rounded-xl border bg-background text-foreground",
                        "transition-all duration-300 ease-out-expo",
                        "focus:outline-none focus:ring-0 focus:border-accent focus:shadow-[0_0_0_3px_var(--color-ring-soft)]/20",
                        "disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-muted/50",
                        "hover:border-muted-foreground/40 border-border-soft",
                        errors.role && "border-destructive focus:border-destructive"
                      )}
                      aria-invalid={errors.role ? "true" : "false"}
                      aria-describedby={errors.role ? "role-error" : undefined}
                      {...register("role")}
                    >
                      {BOOKING_ROLE_OPTIONS.map((role) => (
                        <option key={`role-${role.value || "placeholder"}`} value={role.value} disabled={role.value === ""}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                    {errors.role && (
                      <p id="role-error" className="mt-2 text-sm text-destructive flex items-center gap-1" role="alert">
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                        </svg>
                        {errors.role.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="service" className="block text-sm font-medium text-foreground">
                      Service of Interest
                      <span className="text-destructive ml-1" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="service"
                      className={cn(
                        "w-full px-5 py-3.5 rounded-xl border bg-background text-foreground",
                        "transition-all duration-300 ease-out-expo",
                        "focus:outline-none focus:ring-0 focus:border-accent focus:shadow-[0_0_0_3px_var(--color-ring-soft)]/20",
                        "disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-muted/50",
                        "hover:border-muted-foreground/40 border-border-soft",
                        errors.service && "border-destructive focus:border-destructive"
                      )}
                      aria-invalid={errors.service ? "true" : "false"}
                      aria-describedby={errors.service ? "service-error" : undefined}
                      {...register("service")}
                    >
                      {BOOKING_SERVICE_OPTIONS.map((service) => (
                        <option key={`service-${service.value || "placeholder"}`} value={service.value} disabled={service.value === ""}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p id="service-error" className="mt-2 text-sm text-destructive flex items-center gap-1" role="alert">
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                        </svg>
                        {errors.service.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input label="Booking Date" type="date" error={errors.bookingDate?.message} {...register("bookingDate")} required />
                  <Input label="Booking Time" type="time" error={errors.bookingTime?.message} {...register("bookingTime")} required />
                </div>

                <Textarea
                  label="What process should we look at?"
                  placeholder="Describe the workflow, the bottleneck, and what the manual work is costing your team right now."
                  rows={5}
                  error={errors.message?.message}
                  helperText="Optional, but useful. The more specific you are, the sharper the first call will be."
                  {...register("message")}
                />

                <div className="pt-6 border-t border-border-soft">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      <p>30-minute call. No obligation. If email is easier, use <a className="text-accent hover:underline" href="mailto:hello@leopisha.com">hello@leopisha.com</a>.</p>
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting || !isValid}
                      loading={isSubmitting}
                      className="w-full sm:w-auto sm:min-w-[220px]"
                    >
                      Confirm Booking
                    </Button>
                  </div>
                </div>
              </form>

              <div className="mt-8" aria-live="polite">
                {submitStatus === "success" && (
                  <div
                    data-animate="success"
                    className="rounded-2xl border border-accent/30 bg-accent/10 px-6 py-6 sm:px-8 sm:py-7 text-left"
                  >
                    <div className="flex items-center gap-2.5 text-accent font-medium mb-3">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" aria-hidden="true" />
                      <span>Booking confirmed</span>
                    </div>
                    <h3 className="font-heading font-medium text-2xl text-foreground mb-3">
                      Your session has been saved and added to the calendar
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      You should receive a calendar invite shortly at the email address you provided.
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      If you do not see a confirmation, check spam or email <a className="text-accent hover:underline" href="mailto:hello@leopisha.com">hello@leopisha.com</a>.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-6 py-5 text-left" role="alert">
                    <h3 className="font-heading font-medium text-xl text-foreground mb-2">Submission error</h3>
                    <p className="text-destructive leading-relaxed">
                      {submitError || "Could not submit your request. Please try again or email hello@leopisha.com."}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-5 lg:sticky lg:top-28">
            <Card data-animate="module" variant="subtle" padding="lg">
              <CardHeader className="mb-4">
                <CardTitle className="text-xl sm:text-2xl">What happens on the call</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {CALL_OUTCOMES.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                      <span className="mt-2 w-2 h-2 rounded-full bg-accent/70 flex-shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card data-animate="module" variant="subtle" padding="lg" className="bg-muted/40">
              <CardHeader className="mb-4">
                <CardTitle className="text-xl sm:text-2xl">Who this is for</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Insurance brokers, underwriters, claims teams, customer ops leaders, and operators who already feel manual work dragging throughput down.
                </p>
                <div className="rounded-xl border border-border-soft bg-card px-4 py-4 text-sm text-foreground/80 leading-relaxed">
                  Best fit: one painful workflow, real internal ownership, and a team that wants clarity before buying anything.
                </div>
              </CardContent>
            </Card>

            <Card data-animate="module" variant="subtle" padding="lg">
              <CardHeader className="mb-4">
                <CardTitle className="text-xl sm:text-2xl">Quiet proof</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="rounded-xl border border-border-soft bg-card px-4 py-3 text-foreground/80">Zero-risk pilot structure</div>
                  <div className="rounded-xl border border-border-soft bg-card px-4 py-3 text-foreground/80">You own the workflows and data</div>
                  <div className="rounded-xl border border-border-soft bg-card px-4 py-3 text-foreground/80">Kenya-based team, global standards</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <section data-next-steps className="mt-12 lg:mt-16 rounded-[2rem] border border-border-soft bg-muted/30 px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="max-w-2xl mb-8">
            <span data-animate="next-step" className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              What happens next
            </span>
            <h2 data-animate="next-step" className="font-heading font-medium text-3xl sm:text-4xl text-foreground mb-3">
              Clear next steps, not pressure
            </h2>
            <p data-animate="next-step" className="text-muted-foreground leading-relaxed">
              If there is a strong fit, we tell you how a pilot would work. If there is not, we tell you that too.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {NEXT_STEPS.map((step, index) => (
              <div key={step.title} data-animate="next-step" className="rounded-2xl border border-border-soft bg-card px-5 py-5">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 font-heading font-semibold text-lg">
                  {index + 1}
                </div>
                <h3 className="font-heading font-medium text-xl text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
