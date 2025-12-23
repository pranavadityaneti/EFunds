"use client";

import { motion } from "framer-motion";
import { Handshake, Building2, Rocket, Landmark } from "lucide-react";

const audiences = [
    {
        icon: Handshake,
        title: "DSA",
        fullName: "Direct Selling Agents",
        description:
            "Manage loan applications efficiently, track commissions, and access multiple lenders from a single platform.",
        gradient: "from-emerald-400 to-teal-500",
        bgGradient: "from-emerald-50 to-teal-50",
    },
    {
        icon: Building2,
        title: "NBFC",
        fullName: "Non-Banking Financial Companies",
        description:
            "Scale your lending operations with automated workflows, partner management, and real-time portfolio analytics.",
        gradient: "from-blue-400 to-indigo-500",
        bgGradient: "from-blue-50 to-indigo-50",
    },
    {
        icon: Rocket,
        title: "Fintech",
        fullName: "Digital Lending Startups",
        description:
            "Build digital-first lending products with our plug-and-play APIs. Go live in days, not months.",
        gradient: "from-purple-400 to-pink-500",
        bgGradient: "from-purple-50 to-pink-50",
    },
    {
        icon: Landmark,
        title: "Co-operative Banks",
        fullName: "Regional Banking Partners",
        description:
            "Modernize your loan processes while maintaining the trust and personal touch your customers expect.",
        gradient: "from-orange-400 to-amber-500",
        bgGradient: "from-orange-50 to-amber-50",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut" as const,
        },
    },
};

export default function LandingAudience() {
    return (
        <section className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Smart Lending.
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#fb923c]">
                            Simplified for Everyone.
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Efunds brings omnichannel automation and intelligence to lending
                        intermediaries of all sizes—from large Banks, Fintechs, Cooperative Banks,
                        NBFCs, and even Credit Societies, LSPs or DSAs.
                    </p>
                </motion.div>

                {/* Audience Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {audiences.map((audience, index) => (
                        <motion.div
                            key={audience.title}
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                scale: 1.02,
                                transition: { duration: 0.3 }
                            }}
                            className="group relative"
                        >
                            <div className={`relative p-6 rounded-3xl bg-gradient-to-br ${audience.bgGradient} border border-gray-100 hover:border-orange-200 transition-all duration-500 hover:shadow-xl h-full overflow-hidden`}>
                                {/* Background decoration */}
                                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 transform translate-x-8 -translate-y-8">
                                    <audience.icon className="w-full h-full" />
                                </div>

                                {/* Icon */}
                                <motion.div
                                    whileHover={{ rotate: 5, scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${audience.gradient} flex items-center justify-center mb-5 shadow-lg`}
                                >
                                    <audience.icon className="w-8 h-8 text-white" />
                                </motion.div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <h3 className={`text-2xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r ${audience.gradient}`}>
                                        {audience.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-3 font-medium">
                                        {audience.fullName}
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {audience.description}
                                    </p>
                                </div>

                                {/* Hover border glow */}
                                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}>
                                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${audience.gradient} opacity-10`} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-500 mb-4">
                        Not sure which solution fits you best?
                    </p>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 text-[#f97316] hover:text-[#ea580c] font-semibold transition-colors group"
                    >
                        Talk to our experts
                        <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            →
                        </motion.span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
