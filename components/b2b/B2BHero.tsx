"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function B2BHero() {
    return (
        <section className="relative w-full min-h-screen bg-black text-white overflow-hidden flex flex-col pt-32 pb-20">

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Main Headline */}
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] text-white">
                        Transforming <span className="font-serif italic text-gray-400">Finance, </span>
                        One <span className="font-serif italic text-blue-500">Innovation</span> at a Time.
                    </h1>
                </div>

                {/* Visual Placeholder (Purple Abstract) */}
                <div className="relative w-full max-w-4xl mx-auto h-[300px] md:h-[500px] bg-gray-900 rounded-[3rem] overflow-hidden mb-20 border border-white/10">
                    {/* Placeholder for the 3D ripple/wave */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
                        <div className="w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                        <div className="w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        {/* We can use a real image if provided, for now CSS art/gradient to mimic the 'ripple' */}
                        <div className="w-full h-full relative" style={{
                            background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, rgba(0,0,0,0) 70%)',
                            boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)'
                        }}></div>
                        <img
                            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                            alt="Abstract 3D Shape"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen grayscale contrast-125"
                        />
                    </div>
                </div>

                {/* Bottom Content */}
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-6">
                        The fintech company aims to disrupt conventional financial systems and processes - <span className="text-gray-500">leveraging cutting-edge technologies and creative solutions</span> to address various pain points <span className="font-sans font-bold">and challenges</span> <span className="text-blue-500">within the industry.</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        By adopting a progressive approach, they seek to improve the overall efficiency, accessibility, and transparency of financial services.
                    </p>
                </div>

            </div>
        </section>
    );
}
