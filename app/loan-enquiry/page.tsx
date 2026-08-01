import type { Metadata } from "next";
import LandingHeader from "@/components/landing/LandingHeader";
import B2BLeadForm from "@/components/b2b/B2BLeadForm";
import LandingFooter from "@/components/landing/LandingFooter";

/**
 * The Docket-wired twin of /business-loan-enquiry: identical form, but the
 * submission creates a case in Docket (subject + checklist + the initial
 * document-request email) instead of going to the partner CRM.
 *
 * Deliberately unlisted: no nav link anywhere and noindex below — it is
 * reached by typing the URL. Used for demos and for tenants running Docket.
 */
export const metadata: Metadata = {
  title: "Loan Enquiry | Finlot",
  robots: { index: false, follow: false },
};

export default function LoanEnquiryPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative w-full bg-black pt-32 pb-8">
        <div className="absolute top-0 w-full z-50">
          <LandingHeader />
        </div>
      </section>

      <B2BLeadForm endpoint="/api/leads/loan-enquiry" />

      <LandingFooter />
    </main>
  );
}
