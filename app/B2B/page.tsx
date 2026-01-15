import CustomerHero from "@/components/customers/CustomerHero";
import LandingFooter from "@/components/landing/LandingFooter";
import LandingAudience from "@/components/landing/LandingAudience";

export default function B2BPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Navigation Placeholder */}
            <div className="absolute top-0 w-full z-50 py-6 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="Efunds" className="h-8 w-auto object-contain brightness-0" />
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="/" className="text-gray-600 hover:text-black font-medium text-sm">Home</a>
                        <a href="#" className="text-gray-600 hover:text-black font-medium text-sm">Products</a>
                        <a href="#" className="text-gray-600 hover:text-black font-medium text-sm">About</a>
                        <a href="/auth/login" className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium">Login</a>
                    </div>
                </div>
            </div>

            <div className="pt-24">
                {/* Reusing CustomerHero for now as placeholder, but can be customized later */}
                <CustomerHero />
            </div>

            <LandingAudience />

            <LandingFooter />
        </main>
    );
}
