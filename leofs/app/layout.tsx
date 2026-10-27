import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.leopisha.co.ke"),
  title: "Leo Pisha | Workflow Automation Agency",
  description: "Leo Pisha is a workflow automation agency helping businesses improve operations through claims, underwriting, and client response automation. Workflow diagnosis, automation build, and handover. Book a free consultation.",
  keywords: ["insurance workflow automation", "claims automation", "underwriting automation", "insurance operations consultant", "insurance automation Kenya"],
  authors: [{ name: "Leo Pisha" }],
  creator: "Leo Pisha",
  publisher: "Leo Pisha",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://www.leopisha.co.ke",
    siteName: "Leopisha",
    title: "Leo Pisha | Workflow Automation Agency",
    description: "Leo Pisha is a workflow automation agency helping businesses improve operations through claims, underwriting, and client response automation. Workflow diagnosis, automation build, and handover. Book a free consultation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leo Pisha | Workflow Automation Agency",
    description: "Leo Pisha is a workflow automation agency helping businesses improve operations through claims, underwriting, and client response automation. Workflow diagnosis, automation build, and handover. Book a free consultation.",
  },
  verification: {
    google: "ngWTpi7kVz8a18rC-EC0IXPpUEWa8lJ_dsD0V666Hr8",
  },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Leo Pisha",
  url: "https://www.leopisha.co.ke",
  description:
    "Workflow automation agency helping businesses improve operations through claims, underwriting, and customer response automation. Workflow diagnosis, automation design, build, and handover.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "KE",
  },
  areaServed: "KE",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hello@leopisha.com",
  },
  sameAs: ["https://www.instagram.com/leopisha_/"],
  hasOfferedCatalog: {
    "@type": "OfferCatalog",
    name: "Insurance automation services",
    itemOffered: [
      { "@type": "Service", name: "Automation Diagnosis", url: "https://www.leopisha.co.ke/services/automation-diagnosis" },
      { "@type": "Service", name: "Claims Processing Automation", url: "https://www.leopisha.co.ke/services/claims-automation" },
      { "@type": "Service", name: "Underwriting Automation", url: "https://www.leopisha.co.ke/services/underwriting-automation" },
      { "@type": "Service", name: "Customer Operations Automation", url: "https://www.leopisha.co.ke/services/customer-operations-automation" },
      { "@type": "Service", name: "Fraud Detection & Prevention", url: "https://www.leopisha.co.ke/services/fraud-detection-prevention" },
      { "@type": "Service", name: "Managed Automation Operations", url: "https://www.leopisha.co.ke/services/managed-automation-operations" },
      { "@type": "Service", name: "Missing Document & KYC Reminder Automation", url: "https://www.leopisha.co.ke/services/missing-documents-automation" },
      { "@type": "Service", name: "Insurance Renewal Reminder Automation", url: "https://www.leopisha.co.ke/services/insurance-renewal-automation" },
    ],
  },
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Leo Pisha",
  url: "https://www.leopisha.co.ke",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF9" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0A09" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
