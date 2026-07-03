import LandingHeader from "@/components/landing/LandingHeader";
import B2BLeadForm from "@/components/b2b/B2BLeadForm";
import LandingFooter from "@/components/landing/LandingFooter";

export default function BusinessLoanEnquiryPage() {
    return (
        <main className="min-h-screen bg-white">
            <section className="relative w-full bg-black pt-32 pb-8">
                <div className="absolute top-0 w-full z-50">
                    <LandingHeader />
                </div>
            </section>

            <B2BLeadForm />

            <LandingFooter />
        </main>
    );
}
