"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";

const navigation = [
  { name: "Focus areas", href: "/#what-i-fix" },
  { name: "Delivery process", href: "/#how-i-work" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    gsap.fromTo(
      header,
      { y: -24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "expo.out",
      }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-sticky transition-all duration-300 ease-out-expo",
        scrolled
          ? "border-b border-border/70 bg-background/92 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
      role="banner"
    >
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex h-[4.75rem] items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Leo Pisha Home">
            <span className="font-heading text-3xl font-semibold tracking-tight text-foreground">Leo Pisha</span>
            <span className="hidden h-5 w-px bg-border sm:block" aria-hidden="true" />
            <span className="hidden text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground sm:block">Workflow automation agency</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="https://calendly.com/leopishaagency/new-meeting">
              <Button size="sm">Book a consultation</Button>
            </Link>
          </div>

          <button
            className="rounded-xl border border-border/80 bg-card/70 p-2.5 text-foreground transition-colors duration-200 hover:bg-muted md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>

        <div
          id="mobile-menu"
          className={cn(
            "overflow-hidden transition-all duration-300 ease-out-expo md:hidden",
            mobileMenuOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
          )}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="premium-surface flex flex-col gap-2 p-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-xl px-3 py-3 text-base font-medium text-foreground transition-colors duration-200 hover:bg-muted/60"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-2 border-t border-border/70 pt-3">
              <Link href="https://calendly.com/leopishaagency/new-meeting" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Book a consultation</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
