import CareersHero from "@/components/careers/CareersHero";
import OpenPositions from "@/components/careers/OpenPositions";
import LandingFooter from "@/components/landing/LandingFooter";


export default function CareersPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Reuse LandingHeader but maybe needs adjustment for light background? 
                Actually LandingHeader was designed for dark background in LandingHero.
                Let's wrap it in a black strip for now or adjust it.
                Based on previous usage, LandingHeader expects to sit on top of content.
                Let's put it absolute and ensure the Hero has padding top.
                Wait, LandingHero had it built in relative. 
                Wait, LandingHero had it built in relative.
                Let's use a wrapper div with neutral/dark bg for the header if needed,
                or just place it absolute over the body if the hero starts right away.
                The visual reference shows the sticky header usually or a header on top.
                Let's simply render it. Ideally it should be "Smart" about text color.
                For now, we'll assume the standard header works or wrap it in a stylized container.
            */}
            {/* LandingHeader is now integrated inside CareersHero for correct positioning */}
            <CareersHero />

            <OpenPositions />

            <div className="bg-white">
                <LandingFooter />
            </div>
        </main>
    );
}
