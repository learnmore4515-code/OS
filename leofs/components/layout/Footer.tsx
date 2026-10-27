import Link from "next/link";
import { cn } from "@/lib/utils";

const footerLinks = {
  Company: [
    { name: "About", href: "/about" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Services", href: "/services" },
  ],
  Resources: [
    { name: "Book a Call", href: "https://calendly.com/leopishaagency/new-meeting" },
    { name: "About the Practice", href: "/about" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Workflow automation for small businesses", href: "/resources/workflow-automation-small-business" },
  ],
  Connect: [
    { name: "Email", href: "mailto:hello@leopisha.com", external: false },
    { name: "Book a Session", href: "https://calendly.com/leopishaagency/new-meeting", external: true },
    { name: "Case Studies", href: "/case-studies", external: false },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border-soft bg-muted/20" role="contentinfo">
      <div className="container-custom py-16 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-14">
          <div className="col-span-2 md:col-span-1 lg:col-span-2 max-w-xs">
            <Link href="/" className="flex items-center gap-2.5 mb-7" aria-label="Leo Pisha Home">
              <span className="font-heading font-bold text-2xl sm:text-3xl text-foreground tracking-tight">Leo Pisha</span>
              <span className="w-2.5 h-2.5 rounded-full bg-accent/70" aria-hidden="true" />
            </Link>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 max-w-sm">
              Leo Pisha is a workflow automation agency helping businesses improve operations through claims, underwriting, and client response automation.
            </p>
            <div className="flex items-center gap-4" role="list" aria-label="Social links">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-card border border-border-soft flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 hover:shadow-lg transition-all duration-300 ease-out-expo"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-card border border-border-soft flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 hover:shadow-lg transition-all duration-300 ease-out-expo"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-9.839L0 2.25h3.26l6.448 8.192 7.124-9.486 1.964 2.44z"/>
                </svg>
              </a>
              <a
                href="mailto:hello@leopisha.com"
                className="w-10 h-10 rounded-xl bg-card border border-border-soft flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 hover:shadow-lg transition-all duration-300 ease-out-expo"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          <nav aria-label="Company links">
            <h3 className="font-heading font-semibold text-foreground mb-5">Company</h3>
            <ul className="space-y-3.5" role="list">
              {footerLinks.Company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium relative inline-block after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resources">
            <h3 className="font-heading font-semibold text-foreground mb-5">Resources</h3>
            <ul className="space-y-3.5" role="list">
              {footerLinks.Resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium relative inline-block after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Connect">
            <h3 className="font-heading font-semibold text-foreground mb-5">Connect</h3>
            <ul className="space-y-3.5" role="list">
              {footerLinks.Connect.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium relative inline-block after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 pt-10 border-t border-border-soft flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground/70 text-sm">
            © {new Date().getFullYear()} Leo Pisha. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-sm text-muted-foreground/70">
            <Link href="/about" className="hover:text-foreground transition-colors duration-300 font-medium">About</Link>
            <Link href="https://calendly.com/leopishaagency/new-meeting" className="hover:text-foreground transition-colors duration-300 font-medium">Book</Link>
            <Link href="/case-studies" className="hover:text-foreground transition-colors duration-300 font-medium">Case Studies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}