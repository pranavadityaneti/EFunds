import LandingHero from "@/components/landing/LandingHero";
import LandingSolutions from "@/components/landing/LandingSolutions";
import LandingFeatures from "@/components/landing/LandingFeatures";
import LandingAudience from "@/components/landing/LandingAudience";
import LandingAbout from "@/components/landing/LandingAbout";
import LandingBusinessCards from "@/components/landing/LandingBusinessCards";
import LandingFAQ from "@/components/landing/LandingFAQ";
import LandingContact from "@/components/landing/LandingContact";
import LandingFooter from "@/components/landing/LandingFooter";

export default function LandingPage() {
    return (
        <main>
            <LandingHero />
            <LandingAbout />
            <LandingBusinessCards />
            <LandingSolutions />
            <LandingFeatures />
            <LandingAudience />
            <LandingFAQ />
            <LandingContact />
            <LandingFooter />
        </main>

    );
}
