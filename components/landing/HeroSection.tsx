'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import 3D scene to avoid SSR issues
const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false });

export default function HeroSection() {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (heroRef.current) {
            gsap.fromTo(
                heroRef.current.querySelectorAll('.animate-in'),
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }
            );
        }
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a1a] via-[#0f0f2a] to-[#1a1a3a]"
        >
            {/* 3D Background */}
            <Scene3D className="opacity-60" />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a1a]/80 via-transparent to-[#0a0a1a]/80 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0f0f2a] to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="animate-in inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-[#f48b3b]/10 border border-[#f48b3b]/20 text-[#f48b3b]"
                >
                    <span className="w-2 h-2 rounded-full bg-[#f48b3b] animate-pulse" />
                    <span className="text-sm font-medium">Trusted by 10,000+ Users</span>
                </motion.div>

                {/* Main Headline */}
                <h1 className="animate-in text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                    Find the Best{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f48b3b] to-[#fbbf24]">
                        Loan Offers
                    </span>
                    <br />
                    Instantly
                </h1>

                {/* Subheadline */}
                <p className="animate-in text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                    Efunds helps you compare loan offers, check eligibility, and apply online in minutes — with zero hassle and complete transparency.
                </p>

                {/* Tagline */}
                <p className="animate-in text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-10">
                    Borrow Better.
                </p>

                {/* CTA Buttons */}
                <div className="animate-in flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <button className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#f48b3b] to-[#f97316] text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-[#f48b3b]/30 transition-all duration-300 transform hover:scale-105">
                        Get Started
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-medium rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <Play className="w-5 h-5" />
                        See How It Works
                    </button>
                </div>

                {/* Trust Indicators */}
                <div className="animate-in flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm">
                    {['Compare 50+ Lenders', 'No Credit Score Impact', 'Get Offers in Minutes'].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-[#f48b3b]" />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-2 text-gray-500">
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-2"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
