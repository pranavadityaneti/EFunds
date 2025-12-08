import LandingNavbar from '@/components/landing/LandingNavbar';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import StatsSection from '@/components/landing/StatsSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CTASection from '@/components/landing/CTASection';
import LandingFooter from '@/components/landing/LandingFooter';

export default function LandingPage() {
    return (
        <main className="bg-[#0a0a1a] min-h-screen overflow-x-hidden">
            <LandingNavbar />
            <HeroSection />
            <div id="features">
                <FeaturesSection />
            </div>
            <div id="how-it-works">
                <HowItWorksSection />
            </div>
            <StatsSection />
            <div id="testimonials">
                <TestimonialsSection />
            </div>
            <CTASection />
            <LandingFooter />
        </main>
    );
}
