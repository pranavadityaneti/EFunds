"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const stats = [
    { value: "₹500Cr+", label: "Loans Disbursed" },
    { value: "50+", label: "Lending Partners" },
    { value: "10K+", label: "Active Users" },
];

// Concentric Rings Component with Hover Effect
function ConcentricRings() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative w-full h-[450px] flex items-center justify-center cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Outer Ring (largest) - 10K+ Active Users */}
            <motion.div
                className="absolute w-[480px] h-[480px] rounded-full transition-all duration-300"
                style={{
                    background: isHovered
                        ? "radial-gradient(circle at 30% 30%, rgba(249,115,22,0.15) 0%, rgba(249,115,22,0.08) 50%, rgba(249,115,22,0.03) 100%)"
                        : "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)",
                    boxShadow: isHovered
                        ? "inset 0 0 60px rgba(249,115,22,0.15), 0 0 40px rgba(249,115,22,0.1)"
                        : "inset 0 0 60px rgba(255,255,255,0.08), 0 0 40px rgba(249,115,22,0.05)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                {/* Stat label - TOP RIGHT of outer ring */}
                <motion.div
                    className="absolute -top-2 right-4 text-right"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <div className="text-3xl lg:text-4xl font-bold text-white">{stats[2].value}</div>
                    <div className="text-sm text-gray-400 mt-1">{stats[2].label}</div>
                </motion.div>
            </motion.div>

            {/* Middle Ring - 50+ Partners */}
            <motion.div
                className="absolute w-[320px] h-[320px] rounded-full transition-all duration-300"
                style={{
                    background: isHovered
                        ? "radial-gradient(circle at 30% 30%, rgba(249,115,22,0.25) 0%, rgba(249,115,22,0.12) 50%, rgba(249,115,22,0.05) 100%)"
                        : "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%)",
                    boxShadow: isHovered
                        ? "inset 0 0 40px rgba(249,115,22,0.2), 0 0 30px rgba(249,115,22,0.15)"
                        : "inset 0 0 40px rgba(255,255,255,0.12), 0 0 30px rgba(249,115,22,0.08)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                {/* Stat label - RIGHT SIDE of middle ring */}
                <motion.div
                    className="absolute top-1/2 -right-28 -translate-y-1/2 text-left"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    <div className="text-2xl lg:text-3xl font-bold text-white">{stats[1].value}</div>
                    <div className="text-sm text-gray-400 mt-1">{stats[1].label}</div>
                </motion.div>
            </motion.div>

            {/* Inner Ring (smallest) - ₹500Cr+ */}
            <motion.div
                className="absolute w-[200px] h-[200px] rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                    background: isHovered
                        ? "radial-gradient(circle at 30% 30%, rgba(249,115,22,0.4) 0%, rgba(249,115,22,0.2) 50%, rgba(249,115,22,0.08) 100%)"
                        : "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.05) 100%)",
                    boxShadow: isHovered
                        ? "inset 0 0 30px rgba(249,115,22,0.3), 0 0 25px rgba(249,115,22,0.2)"
                        : "inset 0 0 30px rgba(255,255,255,0.18), 0 0 25px rgba(249,115,22,0.1)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                {/* Stat inside the inner ring */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                >
                    <div className="text-2xl lg:text-3xl font-bold text-white">{stats[0].value}</div>
                    <div className="text-xs text-gray-300 mt-1">{stats[0].label}</div>
                </motion.div>
            </motion.div>

            {/* Subtle animated glow */}
            <motion.div
                className="absolute w-[200px] h-[200px] rounded-full pointer-events-none"
                style={{
                    background: isHovered
                        ? "radial-gradient(circle, rgba(249,115,22,0.25) 0%, transparent 70%)"
                        : "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)",
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}

export default function LandingAbout() {
    return (
        <section id="about" className="py-16 lg:py-20 bg-zinc-950 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-gray-400 text-sm uppercase tracking-widest mb-6 block">
                            About Efunds
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Powering the Future of{" "}
                            <span className="text-[#f97316]">Digital Lending</span>
                        </h2>
                        <p className="text-lg lg:text-xl text-gray-400 leading-relaxed">
                            Efunds is India&apos;s leading lending infrastructure platform,
                            enabling seamless loan origination with a projected growth
                            trajectory of 35% CAGR.
                        </p>
                    </motion.div>

                    {/* Right Column - Concentric Rings */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <ConcentricRings />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
