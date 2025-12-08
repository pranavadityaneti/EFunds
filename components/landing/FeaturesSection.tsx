'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Shield, Zap, Users } from 'lucide-react';

const features = [
    {
        icon: Search,
        title: 'Compare All Lenders',
        description: 'Access offers from 50+ banks and NBFCs in one place. Compare rates, terms, and eligibility instantly.',
        color: '#f48b3b',
    },
    {
        icon: Shield,
        title: 'No Credit Impact',
        description: 'Check your eligibility without affecting your credit score. Soft inquiries only.',
        color: '#22c55e',
    },
    {
        icon: Zap,
        title: 'Instant Approval',
        description: 'Get pre-approved offers in minutes. No lengthy paperwork or branch visits required.',
        color: '#3b82f6',
    },
    {
        icon: Users,
        title: 'Expert Support',
        description: 'Our loan advisors help you choose the best offer and guide you through the process.',
        color: '#a855f7',
    },
];

export default function FeaturesSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section
            ref={sectionRef}
            className="relative py-24 bg-gradient-to-b from-[#1a1a3a] to-[#0f0f2a] overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f48b3b]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#3b82f6]/5 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-[#f48b3b] bg-[#f48b3b]/10 rounded-full">
                        Features
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Everything You Need to{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f48b3b] to-[#fbbf24]">
                            Borrow Smart
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Our platform makes finding the perfect loan simple, fast, and transparent.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10"
                        >
                            {/* Icon */}
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                                style={{ backgroundColor: `${feature.color}20` }}
                            >
                                <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#f48b3b] transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Hover gradient */}
                            <div
                                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at top left, ${feature.color}10 0%, transparent 50%)`
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
