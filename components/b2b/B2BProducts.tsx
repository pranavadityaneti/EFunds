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
    return (
        <section className="w-full bg-white pb-24 px-6 lg:px-12">
            <div className="container mx-auto">
                <div className="mb-12">
                    <h2 className="text-xl font-medium tracking-wide text-gray-900">Our Products -</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative h-[320px] rounded-[2.5rem] overflow-hidden p-8 flex flex-col justify-between transition-transform hover:scale-[1.02]"
                            style={{
                                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', // Blue to Darker Blue
                                boxShadow: '0 20px 40px -10px rgba(37, 99, 235, 0.3)'
                            }}
                        >
                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-2xl font-semibold text-white mb-3">
                                    {product.title}
                                </h3>
                                <p className="text-blue-100 text-sm leading-relaxed max-w-[80%]">
                                    {product.description}
                                </p>
                            </div>

                            {/* CTA Button */}
                            <button className="relative z-10 w-fit text-white bg-blue-600/30 hover:bg-blue-600/50 backdrop-blur-sm px-6 py-3 rounded-xl text-sm font-medium flex items-center gap-2 transition-all group-hover:pl-8 border border-white/10">
                                {product.cta}
                                <ArrowRight size={16} />
                            </button>

                            {/* Decorative Icon/Visual */}
                            <div className="absolute right-[-20px] bottom-[-20px] opacity-90 transition-transform group-hover:scale-110 group-hover:-rotate-12 duration-500">
                                {/* Use a large lucide icon as placeholder for 3D visual, or an img tag if actual assets exist */}
                                <product.icon
                                    size={180}
                                    className="text-white/20"
                                    strokeWidth={1}
                                />
                                {/* Overlay a subtle gradient on the icon to make it feel more dimensional */}
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 to-transparent mix-blend-overlay rounded-full" />
                            </div>

                            {/* Inner Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
