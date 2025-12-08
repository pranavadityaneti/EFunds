'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
    { value: 50000, suffix: '+', label: 'Happy Customers' },
    { value: 500, suffix: 'Cr+', label: 'Loans Disbursed' },
    { value: 50, suffix: '+', label: 'Partner Banks' },
    { value: 4.8, suffix: '★', label: 'App Rating', decimals: 1 },
];

function AnimatedCounter({
    value,
    suffix = '',
    decimals = 0
}: {
    value: number;
    suffix?: string;
    decimals?: number;
}) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(current);
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isInView, value]);

    return (
        <span ref={ref}>
            {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}{suffix}
        </span>
    );
}

export default function StatsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section
            ref={sectionRef}
            className="relative py-24 bg-gradient-to-b from-[#0f0f2a] to-[#1a1a3a] overflow-hidden"
        >
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#f48b3b]/10 rounded-full blur-3xl -translate-y-1/2" />
            <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#3b82f6]/10 rounded-full blur-3xl -translate-y-1/2" />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-[#f48b3b] bg-[#f48b3b]/10 rounded-full">
                        Our Impact
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Numbers That{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f48b3b] to-[#fbbf24]">
                            Speak
                        </span>
                    </h2>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
                        >
                            <p className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f48b3b] to-[#fbbf24] mb-2">
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                            </p>
                            <p className="text-gray-400 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
