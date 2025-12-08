'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section
            ref={sectionRef}
            className="relative py-24 bg-gradient-to-b from-[#1a1a3a] to-[#0f0f2a] overflow-hidden"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f48b3b]/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#f48b3b]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#fbbf24]/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-[#f48b3b]/10 border border-[#f48b3b]/20 text-[#f48b3b]">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-medium">Start Your Journey Today</span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Ready to Find Your{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f48b3b] to-[#fbbf24]">
                            Perfect Loan?
                        </span>
                    </h2>

                    <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Join thousands of Indians who've saved lakhs by comparing loan offers on Efunds. It takes just 2 minutes to get started.
                    </p>

                    {/* CTA Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#f48b3b] to-[#f97316] text-white text-lg font-semibold rounded-2xl shadow-lg shadow-[#f48b3b]/30 hover:shadow-xl hover:shadow-[#f48b3b]/40 transition-all duration-300"
                    >
                        Get Started — It's Free
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                    {/* Trust note */}
                    <p className="mt-6 text-sm text-gray-500">
                        No credit score impact • 100% Free • Takes 2 minutes
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
