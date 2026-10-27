import { Metadata } from "next";
import { CaseStudiesIndex } from "@/components/case-studies/CaseStudiesIndex";

export const metadata: Metadata = {
  title: "Insurance Automation Case Studies | Leo Pisha",
  description:
    "Real results from insurance leaders who automated their claims, underwriting, and customer operations. See how we reduced processing times and improved outcomes.",
  keywords: [
    "insurance automation case studies Kenya",
    "claims automation case studies Kenya",
    "insurance automation results Kenya",
  ],
  openGraph: {
    title: "Insurance Automation Case Studies | Leo Pisha",
    description:
      "Real results from insurance leaders who automated their claims, underwriting, and customer operations.",
    type: "website",
    url: "https://www.leopisha.co.ke/case-studies",
  },
  alternates: {
    canonical: "https://www.leopisha.co.ke/case-studies",
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesIndex />;
}