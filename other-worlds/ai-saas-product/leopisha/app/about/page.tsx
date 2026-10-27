import { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About Leo Pisha | Workflow Automation Agency",
  description:
    "Leo Pisha is a workflow automation agency helping businesses improve operations through claims, underwriting, and client response automation.",
  keywords: [
    "insurance operations consultant Kenya",
    "insurance workflow consultant Kenya",
    "insurance automation consultant Kenya",
  ],
  openGraph: {
    title: "About Leo Pisha | Insurance Operations Automation",
    description: "Leo Pisha is an insurance automation practice built around workflow bottlenecks, not generic AI talk.",
    type: "website",
    url: "https://www.leopisha.co.ke/about",
  },
  alternates: {
    canonical: "https://www.leopisha.co.ke/about",
  },
};

export default function AboutRoute() {
  return <AboutPage />;
}