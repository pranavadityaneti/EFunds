"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Shield, Zap, QrCode, Users, LayoutDashboard, Puzzle } from "lucide-react";

interface Product {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ElementType;
    color: string;
    content: {
        title: string;
        details: string[];
    };
}

const products: Product[] = [
    {
        id: "eis",
        title: "EIS",
        subtitle: "Employment & Income Verification",
        description: "Verify employment and income seamlessly with our advanced verification services.",
        icon: Shield,
        color: "text-blue-600",
        content: {
            title: "Identity & Income Simplified",
            details: [
                "Instant Income Verification.",
                "Employment History Checks.",
                "Tax Return Analysis.",
                "Bank Statement Parsing."
            ]
        }
    },
    {
        id: "los",
        title: "LOS",
        subtitle: "Loan Origination System",
        description: "End-to-end loan lifecycle management from application to disbursement.",
        icon: Zap,
        color: "text-purple-600",
        content: {
            title: "Automate Your Lending",
            details: [
                "Customizable Workflows.",
                "Automated Underwriting.",
                "Document Management.",
                "Digital Disbursement."
            ]
        }
    },
    {
        id: "qr",
        title: "QR Solutions",
        subtitle: "Merchant & Payment Solutions",
        description: "Empower merchants with instant QR code payment and financing solutions.",
        icon: QrCode,
        color: "text-green-600",
        content: {
            title: "Scan to Scale",
            details: [
                "Dynamic QR Generation.",
                "Instant Settlements.",
                "Merchant Financing Integration.",
                "Transaction Analytics."
            ]
        }
    },
    {
        id: "dsa",
        title: "DSA Automation",
        subtitle: "Partner Management",
        description: "Streamline your Direct Selling Agent network with payout automation.",
        icon: Users,
        color: "text-orange-600",
        content: {
            title: "Empower Your Network",
            details: [
                "Agent Onboarding.",
                "Commission Tracking.",
                "Real-time Payouts.",
                "Performance Dashboards."
            ]
        }
    },
    {
        id: "crm",
        title: "CRM",
        subtitle: "Customer Relationship Management",
        description: "Manage leads, customers, and interactions in one unified platform.",
        icon: LayoutDashboard,
        color: "text-indigo-600",
        content: {
            title: "Know Your Customer",
            details: [
                "Lead Management.",
                "Customer 360 View.",
                "Ticket & Support System.",
                "Engagement Automation."
            ]
        }
    },
    {
        id: "plugplay",
        title: "Plug and Play",
        subtitle: "API & Widget Integrations",
        description: "Integrate our lending modules directly into your existing platforms.",
        icon: Puzzle,
        color: "text-pink-600",
        content: {
            title: "Seamless Integration",
            details: [
                "Restful APIs.",
                "Embeddable Widgets.",
                "White-label Solutions.",
                "Developer-first Documentation."
            ]
        }
    }
];

export default function B2BProducts() {
    const [activeTab, setActiveTab] = useState(products[0].id);

    const activeProduct = products.find(p => p.id === activeTab) || products[0];

    return (
        <section className="w-full bg-white pb-24 text-black overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="mb-12">
                    <h2 className="text-xl font-medium tracking-wide text-gray-900">Our Products -</h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                    {/* Left Column: Navigation List */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-6">
                        {products.map((product) => (
                            <button
                                key={product.id}
                                onClick={() => setActiveTab(product.id)}
                                className={`group text-left transition-all duration-300 relative pl-0`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className={`text-2xl md:text-4xl font-serif leading-tight transition-colors duration-300 ${activeTab === product.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                        {product.title}
                                    </span>
                                    {activeTab === product.id && (
                                        <motion.div
                                            layoutId="activeArrow"
                                            className="text-blue-600"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        >
                                            <ArrowRight size={28} />
                                        </motion.div>
                                    )}
                                </div>
                                <div className={`text-sm md:text-base font-sans mt-1 transition-all duration-300 ${activeTab === product.id ? 'text-gray-600 opacity-100 h-auto' : 'text-gray-300 opacity-0 h-0 overflow-hidden'}`}>
                                    {product.subtitle}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Right Column: Visual Preview */}
                    <div className="w-full lg:w-2/3 h-[500px] md:h-[600px] relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProduct.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="w-full h-full bg-blue-50 rounded-[3rem] p-8 md:p-12 flex flex-col justify-between overflow-hidden relative"
                            >
                                {/* Abstract Background Decoration */}
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60" />
                                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-100 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-60" />

                                {/* Content Overlay */}
                                <div className="relative z-10 max-w-lg">
                                    <activeProduct.icon className={`w-12 h-12 ${activeProduct.color} mb-6`} />
                                    <h3 className="text-3xl md:text-5xl font-serif text-gray-900 mb-6 leading-tight">
                                        {activeProduct.content.title}
                                    </h3>
                                    <ul className="space-y-4">
                                        {activeProduct.content.details.map((detail, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-lg text-gray-600">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* 3D Abstract Visual Placeholder at bottom right */}
                                <div className="absolute bottom-0 right-0 w-full md:w-2/3 h-1/2 md:h-full pointer-events-none">
                                    {/* This would be the 3D asset from the reference. Using a placeholder gradient shape. */}
                                    <div className="w-full h-full relative">
                                        <div className="absolute bottom-0 right-0 w-[120%] h-[120%] bg-gradient-to-tl from-white/80 via-transparent to-transparent z-20" /> {/* Fade out */}
                                        <img
                                            src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2680&auto=format&fit=crop"
                                            alt="3D Abstract"
                                            className="w-full h-full object-cover object-bottom opacity-80 mix-blend-multiply"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
