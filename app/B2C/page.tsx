"use client";

import { useState } from "react";
import B2CHero from "@/components/b2c/B2CHero";
import B2CProductsCarousel from "@/components/b2c/B2CProductsCarousel";
import B2CWhyChooseUs from "@/components/b2c/B2CWhyChooseUs";
import LandingFooter from "@/components/landing/LandingFooter";
import LGForm from "@/components/b2c/LGForm";

export default function CustomersPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState("General Inquiry");

    const openForm = (loanType: string = "General Inquiry") => {
        setSelectedLoan(loanType);
        setIsFormOpen(true);
    };

    return (
        <main className="min-h-screen bg-[#0A0A0A]">
            <B2CHero onGetStarted={() => openForm("General Inquiry")} />

            <B2CProductsCarousel onCardClick={(title) => openForm(title)} />

            <B2CWhyChooseUs />

            <LandingFooter />

            <LGForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                loanType={selectedLoan}
            />
        </main>
    );
}
