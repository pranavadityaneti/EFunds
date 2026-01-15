"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, QrCode, Users, LayoutDashboard, Puzzle } from "lucide-react";

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
    // Duplicate products for seamless loop
    const carouselItems = [...products, ...products];

    return (
        <section className="w-full bg-white pb-24 overflow-hidden">
            <div className="w-full">
                <div className="container mx-auto px-6 lg:px-12 mb-12">
                    <h2 className="text-xl font-medium tracking-wide text-gray-900">Our Products -</h2>
                </div>

                <div className="relative w-full overflow-hidden">
                    {/* Gradient Masks for smooth fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    <motion.div
                        className="flex gap-8 w-max"
                        animate={{ x: "-50%" }}
                        transition={{
                            ease: "linear",
                            duration: 20, // 20s for full scroll
                            repeat: Infinity,
                        }}
                        style={{ width: "max-content" }} // Ensure container fits all items
                    >
                        {carouselItems.map((product, index) => (
                            <div
                                key={`${product.id}-${index}`}
                                className="group relative w-[350px] md:w-[400px] h-[320px] rounded-[2.5rem] overflow-hidden p-8 flex flex-col justify-between shrink-0 transition-transform hover:scale-[1.02]"
                                style={{
                                    // Brand Colors: Dark card with Orange accents
                                    background: 'linear-gradient(145deg, #18181b 0%, #09090b 100%)', // Zinc 900 to 950
                                    border: '1px solid rgba(234, 88, 12, 0.2)' // Orange border opacity
                                }}
                            >
                                {/* Content */}
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-semibold text-white mb-3">
                                        {product.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed max-w-[90%] group-hover:text-gray-300 transition-colors">
                                        {product.description}
                                    </p>
                                </div>

                                {/* CTA Button */}
                                <button className="relative z-10 w-fit text-orange-500 bg-orange-500/10 hover:bg-orange-500/20 backdrop-blur-sm px-6 py-3 rounded-xl text-sm font-medium flex items-center gap-2 transition-all group-hover:pl-8 border border-orange-500/20">
                                    {product.cta}
                                    <ArrowRight size={16} />
                                </button>

                                {/* Decorative Icon/Visual */}
                                <div className="absolute right-[-20px] bottom-[-20px] opacity-20 group-hover:opacity-30 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12">
                                    <product.icon
                                        size={180}
                                        className="text-orange-500"
                                        strokeWidth={1}
                                    />
                                </div>

                                {/* Inner Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
