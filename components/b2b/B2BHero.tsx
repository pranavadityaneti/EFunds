"use client";

import { motion } from "framer-motion";

export default function B2BHero() {
    return (
        <section className="relative w-full bg-black text-white overflow-hidden flex flex-col pt-32 pb-0">

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Main Headline - Left Aligned & Smaller */}
                <div className="max-w-7xl mx-auto text-left mb-16">
                    <h1 className="text-4xl md:text-6xl font-medium tracking-tight leading-[1.1] text-white">
                        Transforming <span className="font-serif italic text-gray-400">Finance, </span> <br className="hidden md:block" />
                        One <span className="font-serif italic text-blue-500">Innovation</span> at a Time.
                    </h1>
                </div>

                {/* Banner Image - Full Width of Container (max-w-7xl) - Aligned with logo/nav */}
                <div className="relative w-full max-w-7xl mx-auto h-[300px] md:h-[500px] bg-gray-900 rounded-t-[3rem] overflow-hidden border-t border-x border-white/10">
                    {/* Placeholder for the 3D ripple/wave */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
                        <div className="w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                        <div className="w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

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

                {/* Visual note: The rounded-t-[3rem] makes it look like it's emerging from bottom. 
                    The white section below will meet it perfectly if we don't have bottom padding here.
                */}

            </div>
        </section>
    );
}
