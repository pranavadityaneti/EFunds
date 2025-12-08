'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, CheckCircle, Banknote } from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: FileText,
        title: 'Fill Your Details',
        description: 'Enter basic information like loan amount, income, and purpose. Takes just 2 minutes.',
        color: '#f48b3b',
    },
    {
        number: '02',
        icon: CheckCircle,
        title: 'Get Matched',
        description: 'Our AI matches you with the best offers from 50+ lenders based on your profile.',
        color: '#22c55e',
    },
    {
        number: '03',
        icon: Banknote,
        title: 'Get Funded',
        description: 'Choose your preferred offer, complete verification, and receive funds in your account.',
        color: '#3b82f6',
    },
];

export default function HowItWorksSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section
            ref={sectionRef}
            className="relative py-24 bg-[#0f0f2a] overflow-hidden"
        >
            {/* Background grid pattern */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-[#f48b3b] bg-[#f48b3b]/10 rounded-full">
                        How It Works
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Get Your Loan in{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f48b3b] to-[#fbbf24]">
                            3 Simple Steps
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        No branch visits, no paperwork hassles. Everything happens online.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="relative">
                    {/* Connection Line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#f48b3b] via-[#22c55e] to-[#3b82f6] transform -translate-y-1/2 z-0" />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="relative"
                            >
                                {/* Card */}
                                <div className="relative z-10 bg-[#1a1a3a] border border-white/10 rounded-3xl p-8 text-center hover:border-white/20 transition-all duration-300">
                                    {/* Step Number */}
                                    <div
                                        className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                                        style={{ backgroundColor: step.color }}
                                    >
                                        {step.number}
                                    </div>

                                    {/* Icon */}
                                    <div
                                        className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center mt-4"
                                        style={{ backgroundColor: `${step.color}20` }}
                                    >
                                        <step.icon className="w-10 h-10" style={{ color: step.color }} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-semibold text-white mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-400">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
