import type { Metadata } from "next";

import { AuthorityBar } from "@/components/home/AuthorityBar";
import { FeaturedCaseStudies } from "@/components/home/FeaturedCaseStudies";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";

export const metadata: Metadata = {
  title: "Leo Pisha | Workflow Automation Agency for Businesses",
  description:
    "Leo Pisha is a workflow automation agency helping businesses improve operations through claims, underwriting, and customer response automation. Book a free consultation.",
  keywords: [
    "insurance automation consultant Kenya",
    "claims automation Kenya",
    "underwriting automation Kenya",
    "insurance workflow automation Kenya",
    "insurance operations consultant Kenya",
  ],
  alternates: {
    canonical: "https://www.leopisha.co.ke/",
  },
  openGraph: {
    title: "Leo Pisha | Insurance Automation Consultant Kenya",
    description:
      "Leo Pisha helps insurance teams in Kenya automate claims, underwriting, and customer operations.",
    type: "website",
    url: "https://www.leopisha.co.ke/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AuthorityBar />
      <FeaturedCaseStudies />
      <Process />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
