import B2BHero from "@/components/b2b/B2BHero";
import B2BContent from "@/components/b2b/B2BContent";
import B2BProducts from "@/components/b2b/B2BProducts";
import B2BFeatures from "@/components/b2b/B2BFeatures";
import B2BFAQ from "@/components/b2b/B2BFAQ";
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

            <B2BProducts />

            <B2BFeatures />

            <B2BFAQ />

            <LandingFooter />
        </main>
    );
}
