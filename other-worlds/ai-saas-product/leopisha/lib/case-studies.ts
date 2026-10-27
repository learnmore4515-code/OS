export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  headline: string;
  outcome: string;
  metric: { label: string; value: string };
  videoPreview: string;
  poster: string;
  featured: boolean;
  challenge?: string;
  solution?: string;
  approach?: string[];
  results?: { label: string; value: string }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
  technologies?: string[];
  timeline?: string;
}

export const caseStudies: CaseStudy[] = [];

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
  return caseStudies.find((cs) => cs.slug === slug);
};

export const getFeaturedCaseStudies = (): CaseStudy[] => {
  return caseStudies.filter((cs) => cs.featured);
};

export const getAllCaseStudySlugs = (): string[] => {
  return caseStudies.map((cs) => cs.slug);
};
