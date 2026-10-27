import { Metadata } from "next";
import { ServicesPage } from "@/components/services/ServicesPage";

export const metadata: Metadata = {
  title: "Workflow Automation Services | Leo Pisha",
  description:
    "Leo Pisha is a workflow automation agency helping businesses improve operations through claims, underwriting, and customer response automation. Workflow diagnosis, build, and handover.",
  openGraph: {
    title: "Insurance Automation Services | Leo Pisha",
    description:
      "Insurance automation services for claims processing, underwriting operations, customer response, and fraud prevention. From workflow diagnosis to build and handover.",
    type: "website",
    url: "https://www.leopisha.co.ke/services",
  },
  alternates: {
    canonical: "https://www.leopisha.co.ke/services",
  },
};

export default function ServicesRoute() {
  return <ServicesPage />;
}