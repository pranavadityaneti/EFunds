import B2CHero from "@/components/b2c/B2CHero";
import B2CProductsCarousel from "@/components/b2c/B2CProductsCarousel";
import B2CWhyChooseUs from "@/components/b2c/B2CWhyChooseUs";
import LandingFooter from "@/components/landing/LandingFooter";
import LandingAudience from "@/components/landing/LandingAudience";

export default function CustomersPage() {
    return (
        <main className="min-h-screen bg-[#0A0A0A]">
            {/* Header: Absolute Overlay */}
            <header className="absolute top-0 w-full z-50 py-6 px-6 lg:px-12 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Logo - Ensuring it's visible on dark bg */}
                    <a href="/">
                        <img src="/logo.png" alt="Efunds" className="h-8 w-auto object-contain" />
                    </a>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <a href="/" className="text-white/80 hover:text-white font-medium text-sm transition-colors">Home</a>
                    <a href="#" className="text-white/80 hover:text-white font-medium text-sm transition-colors">Products</a>
                    <a href="#" className="text-white/80 hover:text-white font-medium text-sm transition-colors">About</a>
                    <a href="/auth/login" className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">Login</a>
                </div>
            </header>

            <B2CHero />

            <B2CProductsCarousel />

            <B2CWhyChooseUs />

            {/* Dark theme audience section */}
            <div className="bg-white">
                <LandingAudience />
            </div>

            <LandingFooter />
        </main>
    );
}
