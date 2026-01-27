import B2CHero from "@/components/b2c/B2CHero";
import B2CProductsCarousel from "@/components/b2c/B2CProductsCarousel";
import B2CWhyChooseUs from "@/components/b2c/B2CWhyChooseUs";
import LandingFooter from "@/components/landing/LandingFooter";


export default function CustomersPage() {
    return (
        <main className="min-h-screen bg-[#0A0A0A]">
            <B2CHero />

            <B2CProductsCarousel />

            <B2CWhyChooseUs />

            <LandingFooter />
        </main>
    );
}
