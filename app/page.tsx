import LandingHero from "@/components/landing/LandingHero";
import LandingSolutions from "@/components/landing/LandingSolutions";
import LoanEligibilityCalculator from "@/components/landing/LoanEligibilityCalculator";
import LandingFeatures from "@/components/landing/LandingFeatures";

import LandingAbout from "@/components/landing/LandingAbout";
import LandingBusinessCards from "@/components/landing/LandingBusinessCards";
import LandingFAQ from "@/components/landing/LandingFAQ";

import LandingFooter from "@/components/landing/LandingFooter";

export default function LandingPage() {
    return (
        <main>
            <LandingHero />
            <LandingAbout />
            <LandingBusinessCards />
            <LoanEligibilityCalculator />
            <LandingSolutions />
            <LandingFeatures />

            <LandingFAQ />

            <LandingFooter />
        </main>

    );
}
