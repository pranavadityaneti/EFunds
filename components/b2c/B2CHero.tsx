"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Unsplash Image URLs for "Faces of India" / Diverse Professionals theme
const row1 = [
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop", // Woman Professional
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop", // Man Suit
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop", // Woman Smile
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop", // Man Corporate
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop", // Loop
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
];

const row2 = [
    "https://images.unsplash.com/photo-1595152226875-9c17df37648f?q=80&w=400&auto=format&fit=crop", // Woman Saree/Formal
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop", // Man Smiling
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=400&auto=format&fit=crop", // Woman Smart Casual
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop", // Man Portrait
    "https://images.unsplash.com/photo-1595152226875-9c17df37648f?q=80&w=400&auto=format&fit=crop", // Loop
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
];

const row3 = [
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop", // Woman Business
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop", // Man Portrait
    "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=400&auto=format&fit=crop", // Woman Professional
    "https://images.unsplash.com/photo-1563223552-30d01309cc5b?q=80&w=400&auto=format&fit=crop", // Man Casual
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop", // Loop
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
];

export default function B2CHero() {
    return (
        <section className="relative min-h-screen bg-[#0A0A0A] overflow-hidden flex flex-col lg:flex-row items-center">

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full grid lg:grid-cols-2 gap-12 h-full py-32 lg:py-0">

                {/* Left Side: Text Content */}
                <div className="flex flex-col justify-center max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full text-orange-400 text-sm font-medium mb-6">
                            For Everyone
                        </span>

                        <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
                            Empowering <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">
                                Every Dream.
                            </span>
                        </h1>

                        <p className="text-lg text-white/60 mb-10 leading-relaxed">
                            Whether it's for education, a new home, or a personal milestone,
                            we connect you with the right financial partners to make it happen.
                            Simple, fast, and transparent.
                        </p>

                        <div className="flex gap-4">
                            <a
                                href="#apply"
                                className="group bg-white text-black px-8 py-4 rounded-full text-lg font-bold transition-all hover:bg-gray-200 hover:scale-105 flex items-center gap-2"
                            >
                                Get Started
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Marquee Animation */}
                <div className="relative h-[600px] flex gap-6 overflow-hidden mask-gradient-sides">
                    {/* Vertical or Horizontal? The request said "Moves Left to Right" implies horizontal rows. 
                        But the layout reference usually has columns for a side-by-side view. 
                        Let's do Tilted Columns or Rows.
                        If "Text aligned with images", and "moves left to right", standard horizontal marquee is best.
                        However, if they are side-by-side, maybe vertical scrolling columns look better?
                        Let's stick to the prompt: "moves from left to right".
                        This suggests HORIZONTAL rows.
                    */}

                    <div className="absolute inset-0 flex flex-col justify-center gap-6 rotate-[-5deg] scale-110 opacity-80 hover:opacity-100 transition-opacity duration-500">
                        {/* Row 1: Left to Right */}
                        <MarqueeRow images={row1} direction="left" speed={20} />

                        {/* Row 2: Right to Left */}
                        <MarqueeRow images={row2} direction="right" speed={25} />

                        {/* Row 3: Left to Right */}
                        <MarqueeRow images={row3} direction="left" speed={22} />
                    </div>

                    {/* Overlay to fade edges */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A] z-20 pointer-events-none" />
                </div>
            </div>
        </section>
    );
}

const MarqueeRow = ({ images, direction, speed }: { images: string[], direction: "left" | "right", speed: number }) => {
    return (
        <div className="flex gap-6 overflow-hidden w-full">
            <motion.div
                className="flex gap-6 flex-shrink-0"
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {[...images, ...images].map((src, idx) => (
                    <div
                        key={idx}
                        className="relative w-40 h-56 flex-shrink-0 bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
                    >
                        {/* 
                           Using a colored placeholder for now if image fails. 
                           Ideally would use Next/Image but plain img is easier for quick proto.
                        */}
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            {/* <img src={src} alt="User" className="w-full h-full object-cover" /> */}
                            <span className="text-white/20 text-xs">User {idx}</span>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
