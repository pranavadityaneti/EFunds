"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TrendingUp, Eye, ShieldCheck } from "lucide-react";
import { useRef } from "react";

const valueProps = [
    {
        icon: TrendingUp,
        title: "Faster Lending, Smarter Scaling",
        description:
            "Accelerate loan approvals and reduce processing delays with intelligent automation. Scale your operations with omni-channel sourcing and multi-layered partner networks.",
        gradient: "from-orange-500 to-amber-500",
    },
    {
        icon: Eye,
        title: "Complete Control & Visibility",
        description:
            "Get a complete 360° view of your entire lending operation. Track leads, monitor partner performance, and analyse team productivity through configurable real-time dashboards.",
        gradient: "from-amber-500 to-yellow-500",
    },
    {
        icon: ShieldCheck,
        title: "Compliant & Secure",
        description:
            "Be compliance-ready from day one with end-to-end data encryption, PII masking, and comprehensive audit trails. Stay ahead of regulations with secure, trustful operations.",
        gradient: "from-orange-400 to-red-500",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: "easeOut" as const,
        },
    },
};

function ValueCard({ prop, index }: { prop: typeof valueProps[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
        stiffness: 300,
        damping: 30,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
        stiffness: 300,
        damping: 30,
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) / rect.width);
        mouseY.set((e.clientY - centerY) / rect.height);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            variants={cardVariants}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative"
        >
            {/* Glassmorphism Card */}
            <div className="relative p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200/50 hover:border-orange-300/50 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-100/30 h-full">
                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-400/0 via-transparent to-amber-400/0 group-hover:from-orange-400/10 group-hover:to-amber-400/10 transition-all duration-500 pointer-events-none" />

                {/* Icon */}
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${prop.gradient} flex items-center justify-center mb-6 shadow-lg`}
                >
                    <prop.icon className="w-7 h-7 text-white" />

                    {/* Pulse effect */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3,
                        }}
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${prop.gradient}`}
                    />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#f97316] transition-colors duration-300">
                    {prop.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                    {prop.description}
                </p>
            </div>
        </motion.div>
    );
}

export default function LandingValueProps() {
    return (
        <section className="py-24 lg:py-32 bg-gradient-to-b from-white via-orange-50/30 to-white relative overflow-hidden">
            {/* Floating particles background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, 15, 0],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                        className="absolute w-2 h-2 rounded-full bg-orange-300/40"
                        style={{
                            left: `${15 + i * 15}%`,
                            top: `${20 + (i % 3) * 25}%`,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Speed, Clarity, Trust.
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#fb923c]">
                            At Scale.
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Efunds lets you scale faster, gain full visibility, and stay fully
                        compliant—all in one seamless platform powered by AI, with zero technical overhead.
                    </p>
                </motion.div>

                {/* Value Props Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {valueProps.map((prop, index) => (
                        <ValueCard key={prop.title} prop={prop} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
