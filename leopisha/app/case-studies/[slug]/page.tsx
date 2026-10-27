import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyDetail } from "@/components/case-studies/CaseStudyDetail";
import { getCaseStudyBySlug, getAllCaseStudySlugs } from "@/lib/case-studies";

export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found | Leopisha",
    };
  }

  return {
    title: `${caseStudy.headline} | ${caseStudy.client} | Leopisha`,
    description: caseStudy.outcome,
    openGraph: {
      title: `${caseStudy.headline} | ${caseStudy.client}`,
      description: caseStudy.outcome,
      type: "website",
      images: [
        {
          url: caseStudy.poster,
          width: 1200,
          height: 630,
          alt: `${caseStudy.client} - ${caseStudy.headline}`,
        },
      ],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyDetail caseStudy={caseStudy} />;
}