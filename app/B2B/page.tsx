import B2BHero from "@/components/b2b/B2BHero";
import LandingFooter from "@/components/landing/LandingFooter";
import LandingHeader from "@/components/landing/LandingHeader";

export default function B2BPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="bg-white sticky top-0 z-50">
                <LandingHeader />
            </div>

            <B2BHero />

            <LandingFooter />
        </main>
    );
}
