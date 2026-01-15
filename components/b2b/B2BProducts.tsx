"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, Shield, Zap, QrCode, Users, LayoutDashboard, Puzzle } from "lucide-react";

interface Product {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    cta: string;
}

const products: Product[] = [
    {
        id: "eis",
        title: "EIS",
        description: "Verify employment and income seamlessly with advanced services.",
        icon: Shield,
        cta: "Learn more"
    },
    {
        id: "los",
        title: "LOS",
        description: "End-to-end loan lifecycle management from application to disbursement.",
        icon: Zap,
        cta: "Learn more"
    },
    {
        id: "qr",
        title: "QR Solutions",
        description: "Empower merchants with instant QR code payment and financing solutions.",
        icon: QrCode,
        cta: "Explore solutions"
    },
    {
        id: "dsa",
        title: "DSA Automation",
        description: "Streamline your Direct Selling Agent network with payout automation.",
        icon: Users,
        cta: "Automate payouts"
    },
    {
        id: "crm",
        title: "CRM",
        description: "Manage leads, customers, and interactions in one unified platform.",
        icon: LayoutDashboard,
        cta: "View features"
    },
    {
        id: "plugplay",
        title: "Plug and Play",
        description: "Integrate our lending modules directly into your existing platforms.",
        icon: Puzzle,
        cta: "Start integration"
    }
];

export default function B2BProducts() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 600; // Approx card width
            const currentScroll = scrollContainerRef.current.scrollLeft;
            scrollContainerRef.current.scrollTo({
                left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="w-full bg-white pb-24 overflow-hidden">
            <div className="w-full">
                <div className="container mx-auto px-6 lg:px-12 mb-12 flex justify-between items-end">
                    <h2 className="text-xl font-medium tracking-wide text-gray-900">Our Products -</h2>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => scroll('left')}
                            className="p-3 rounded-full border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-colors text-gray-600"
                            aria-label="Scroll left"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-3 rounded-full border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-colors text-gray-600"
                            aria-label="Scroll right"
                        >
                            <ArrowRight size={24} />
                        </button>
                    </div>
                </div>

                <div className="relative w-full">
                    {/* Gradient Masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    <div
                        ref={scrollContainerRef}
                        className="flex gap-8 overflow-x-auto pb-8 hide-scrollbar px-6 lg:px-12 snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="group relative w-[550px] md:w-[600px] h-[350px] rounded-[2.5rem] overflow-hidden p-10 flex flex-col justify-between shrink-0 transition-all duration-500 snap-center border border-gray-100 bg-white hover:border-orange-500/0 hover:shadow-2xl hover:shadow-orange-500/20"
                            >
                                {/* Hover Gradient Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                                {/* Content */}
                                <div className="relative z-10">
                                    <h3 className="text-3xl font-semibold text-gray-900 group-hover:text-white mb-4 transition-colors duration-300">
                                        {product.title}
                                    </h3>
                                    <p className="text-gray-500 text-base leading-relaxed max-w-[85%] group-hover:text-white/90 transition-colors duration-300">
                                        {product.description}
                                    </p>
                                </div>

                                {/* CTA Button */}
                                <button className="relative z-10 w-fit text-orange-600 bg-orange-50 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl text-base font-medium flex items-center gap-2 transition-all duration-300 group-hover:pl-10 border border-orange-100">
                                    {product.cta}
                                    <ArrowRight size={20} />
                                </button>

                                {/* Decorative Icon/Visual */}
                                <div className="absolute right-[-40px] bottom-[-40px] opacity-10 group-hover:opacity-20 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12 z-0">
                                    <product.icon
                                        size={240}
                                        className="text-orange-500 group-hover:text-white transition-colors duration-500"
                                        strokeWidth={1}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
