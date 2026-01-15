import B2BHero from "@/components/b2b/B2BHero";
import B2BContent from "@/components/b2b/B2BContent";
import LandingFooter from "@/components/landing/LandingFooter";
import LandingHeader from "@/components/landing/LandingHeader";

export default function B2BPage() {
    return (
        <main className="min-h-screen bg-black">
            <div className="absolute top-0 w-full z-50">
                <LandingHeader />
            </div>

            <B2BHero />

            <B2BContent />

            <LandingFooter />
        </main>
    );
}
