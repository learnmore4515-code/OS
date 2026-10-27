import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Workflow Automation for Small Businesses in Kenya | Leo Pisha",
  description:
    "Practical workflows Kenyan small businesses can automate — lead follow-ups, document collection, approvals, reporting — and how to decide when automation helps versus staying manual.",
  keywords: [
    "workflow automation Kenya",
    "small business automation Kenya",
    "business process automation Kenya",
  ],
  openGraph: {
    title: "Workflow Automation for Small Businesses in Kenya | Leo Pisha",
    description:
      "Practical workflows Kenyan small businesses can automate — lead follow-ups, document collection, approvals, reporting.",
    type: "website",
    url: "https://www.leopisha.co.ke/resources/workflow-automation-small-business",
  },
  alternates: {
    canonical: "https://www.leopisha.co.ke/resources/workflow-automation-small-business",
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.leopisha.co.ke/" },
    { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.leopisha.co.ke/resources" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Workflow Automation for Small Businesses in Kenya",
      item: "https://www.leopisha.co.ke/resources/workflow-automation-small-business",
    },
  ],
};

const article = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline:
    "Workflow Automation for Small Businesses in Kenya: A Practical Guide",
  description:
    "Practical workflows Kenyan small businesses can automate — lead follow-ups, document collection, approvals, reporting — and how to decide when automation helps versus staying manual.",
  publisher: {
    "@type": "Organization",
    name: "Leo Pisha",
    url: "https://www.leopisha.co.ke",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.leopisha.co.ke/resources/workflow-automation-small-business",
  },
};

export default function WorkflowAutomationSmallBusinessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <section className="section-padding bg-background">
        <div className="container-custom max-w-3xl">
          <h1 className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
            Workflow Automation for Small Businesses in Kenya
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-10">
            Running a small business often means wearing every hat at once. You answer inquiries,
            chase documents, follow up on payments, compile reports, and answer the same admin
            questions day after day. None of that is the reason you started the business.
          </p>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-12">
            Workflow automation isn't about replacing your team or buying expensive software. It's
            about finding the repetitive steps that eat your time and handing them to a dependable
            process — so you and your team can focus on the work that actually grows the business.
          </p>

          <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-foreground mb-4">
            Workflows worth automating
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            These are the everyday tasks that tend to consume small-business time:
          </p>
          <ul className="space-y-4 text-muted-foreground text-base leading-relaxed mb-12 list-disc pl-6">
            <li>
              <strong>Lead follow-ups.</strong> When a prospective customer messages you on WhatsApp
              or submits a form, a fast reply often decides whether you win the work. An automated
              flow can acknowledge the inquiry immediately, share basic information, and route the
              lead to the right person — without someone typing the same reply repeatedly.
            </li>
            <li>
              <strong>Document collection.</strong> Onboarding a client, gathering IDs, agreements,
              or receipts usually means emailing back and forth for the same file. An automated flow
              can send reminders, track what has been received, and flag what is still missing.
            </li>
            <li>
              <strong>Approvals.</strong> Expense claims, leave requests, and purchase orders can be
              routed to the right person, with the decision recorded and the requester notified —
              instead of sitting forgotten in an inbox.
            </li>
            <li>
              <strong>Reporting.</strong> Weekly sales summaries and activity reports can be pulled
              together and sent on a schedule, rather than compiled by hand every Friday.
            </li>
            <li>
              <strong>Repetitive admin.</strong> Appointment reminders, payment-due notices, and
              status updates are predictable, rules-based messages that do not need a person to send
              them each time.
            </li>
          </ul>

          <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-foreground mb-4">
            When automation helps — and when it does not
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">
                Automate when
              </h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed list-disc pl-6">
                <li>The task repeats the same way every time.</li>
                <li>The rules are clear and easy to explain.</li>
                <li>Mistakes cost time or money.</li>
                <li>The volume pulls someone away from higher-value work.</li>
              </ul>
            </div>
            <div className="bg-card border border-border-soft rounded-2xl p-7 lg:p-9">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">
                Stay manual when
              </h3>
              <ul className="space-y-3 text-muted-foreground text-base leading-relaxed list-disc pl-6">
                <li>The task needs judgment, nuance, or a personal relationship.</li>
                <li>It happens rarely enough that setting up automation takes longer than doing it.</li>
                <li>The process is still changing and you have not settled on how it should work.</li>
              </ul>
            </div>
          </div>

          <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-foreground mb-4">
            Implementation considerations
          </h2>
          <ul className="space-y-4 text-muted-foreground text-base leading-relaxed list-disc pl-6 mb-12">
            <li>
              <strong>Reliability.</strong> An automation should fail safely — if it breaks, it
              should alert a person, not silently drop work.
            </li>
            <li>
              <strong>Human oversight.</strong> Automation handles the routine; a person handles the
              exceptions. Anything unusual should be routed to a human.
            </li>
            <li>
              <strong>Privacy.</strong> Customer and employee data should be handled carefully. In
              Kenya, the Data Protection Act sets expectations for how personal data is collected,
              stored, and shared — automation should not loosen those standards.
            </li>
            <li>
              <strong>Maintenance.</strong> Workflows need reviewing. When your process changes, the
              automation should change too — otherwise it becomes brittle and creates more work than
              it saves.
            </li>
          </ul>

          <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-foreground mb-4">
            How to start
          </h2>
          <ol className="space-y-4 text-muted-foreground text-base leading-relaxed list-decimal pl-8 mb-12">
            <li>Pick one repetitive task that happens at least weekly.</li>
            <li>Map the steps exactly as they happen today.</li>
            <li>Decide which steps are rules-based and which need a person.</li>
            <li>Automate the smallest valuable piece first.</li>
            <li>Review after a few weeks and adjust.</li>
          </ol>

          <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-foreground mb-4">
            How Leo Pisha approaches it
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-6">
            Generic automation vendors sell tools and leave you to figure out the workflows. Leo
            Pisha focuses on practical implementation — mapping your actual process, building it,
            and handing it over. For Kenyan insurance businesses, that implementation also draws on
            insurance-domain experience across claims, underwriting, renewals, and customer
            operations. For other small businesses, the same disciplined approach applies without
            forcing insurance into every conversation.
          </p>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-10">
            Not sure where to start? Begin with an <Link href="/services/automation-diagnosis">Automation Diagnosis</Link> — we map your process, quantify the manual work, and deliver a prioritized roadmap before you commit to a build.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="https://calendly.com/leopishaagency/new-meeting">
              <button className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-on-primary rounded-2xl font-medium hover:bg-primary/90 transition-colors">
                Book a Discovery Call
              </button>
            </Link>
            <Link href="/services/automation-diagnosis">
              <button className="inline-flex items-center justify-center px-8 py-3.5 border border-border-soft rounded-2xl font-medium text-foreground hover:border-accent/50 hover:bg-accent/5 hover:text-accent transition-colors">
                Learn About Diagnosis
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
