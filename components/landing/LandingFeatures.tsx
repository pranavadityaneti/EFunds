"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Wallet, Globe, Zap, Users, Clock } from "lucide-react";

// API Code Animation - Shows plug-and-play integration
function ApiCodeAnimation() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev + 1) % 4);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const codeLines = [
        { text: "const efundz = new EFundz();", delay: 0 },
        { text: "await efundz.connect();", delay: 1 },
        { text: "const loan = await efundz.submit(data);", delay: 2 },
        { text: "// ✓ Loan submitted!", delay: 3 },
    ];

    return (
        <div className="flex items-center justify-center h-full">
            <div className="font-mono text-xs sm:text-sm space-y-2 w-full">
                {codeLines.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                            opacity: step >= i ? 1 : 0.3,
                            x: step >= i ? 0 : -10,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`${step >= i ? "text-[#f97316]" : "text-gray-600"
                            } ${i === 3 ? "text-green-400" : ""}`}
                    >
                        {line.text}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// Dashboard Animation - Shows real-time analytics
function DashboardAnimation() {
    const [layout, setLayout] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setLayout((prev) => (prev + 1) % 3);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const layouts = ["grid-cols-2", "grid-cols-3", "grid-cols-1"];

    return (
        <div className="h-full flex items-center justify-center">
            <motion.div
                className={`grid ${layouts[layout]} gap-1.5 w-full max-w-[140px]`}
                layout
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        className="bg-[#f97316]/30 rounded-md h-8 w-full"
                        layout
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                ))}
            </motion.div>
        </div>
    );
}

// Speed Indicator - Shows quick disbursals
function SpeedIndicator() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="h-10 flex items-center justify-center overflow-hidden relative w-full">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loader"
                            className="h-8 w-24 bg-white/10 rounded"
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: [0.4, 0.7, 0.4] }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    ) : (
                        <motion.span
                            key="text"
                            initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                            className="text-3xl md:text-4xl font-sans font-bold text-[#f97316]"
                        >
                            Same Day
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
            <span className="text-sm text-gray-400">Disbursal Time</span>
            <div className="w-full max-w-[120px] h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-[#f97316] to-[#fb923c] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: loading ? 0 : "100%" }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, mass: 1 }}
                />
            </div>
        </div>
    );
}

// Security Badge - Shows RBI compliance
function SecurityBadge() {
    const [shields, setShields] = useState([
        { id: 1, active: false, label: "RBI" },
        { id: 2, active: false, label: "SSL" },
        { id: 3, active: false, label: "256-bit" },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setShields((prev) => {
                const nextIndex = prev.findIndex((s) => !s.active);
                if (nextIndex === -1) {
                    return prev.map((s) => ({ ...s, id: Math.random(), active: false }));
                }
                return prev.map((s, i) =>
                    i === nextIndex ? { ...s, active: true } : s
                );
            });
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center h-full gap-3">
            {shields.map((shield) => (
                <motion.div
                    key={shield.id}
                    className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center gap-1 ${shield.active ? "bg-[#f97316]/20" : "bg-white/5"
                        }`}
                    animate={{ scale: shield.active ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Lock
                        className={`w-5 h-5 ${shield.active ? "text-[#f97316]" : "text-gray-600"
                            }`}
                    />
                    <span
                        className={`text-[10px] font-medium ${shield.active ? "text-white" : "text-gray-600"
                            }`}
                    >
                        {shield.label}
                    </span>
                </motion.div>
            ))}
        </div>
    );
}

// Global Network - Shows partner network
function PartnerNetwork() {
    const [pulses] = useState([0, 1, 2, 3, 4]);

    return (
        <div className="flex items-center justify-center h-full relative">
            <div className="relative z-10 flex flex-col items-center">
                <Users className="w-14 h-14 text-[#f97316]" />
                <span className="text-2xl font-bold text-white mt-2">50+</span>
                <span className="text-xs text-gray-400">Partners</span>
            </div>
            {pulses.map((pulse) => (
                <motion.div
                    key={pulse}
                    className="absolute w-16 h-16 border-2 border-[#f97316]/30 rounded-full"
                    initial={{ scale: 0.5, opacity: 1 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: pulse * 0.8,
                        ease: "easeOut",
                    }}
                />
            ))}
        </div>
    );
}

// Multi-Product Animation
function MultiProductAnimation() {
    const products = [
        { name: "Personal Loan", icon: "💰" },
        { name: "Business Loan", icon: "🏢" },
        { name: "Credit Line", icon: "💳" },
    ];
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % products.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [products.length]);

    return (
        <div className="flex items-center justify-center h-full gap-4">
            {products.map((product, i) => (
                <motion.div
                    key={product.name}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl ${activeIndex === i ? "bg-[#f97316]/20" : "bg-white/5"
                        }`}
                    animate={{
                        scale: activeIndex === i ? 1.1 : 1,
                        opacity: activeIndex === i ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <span className="text-2xl">{product.icon}</span>
                    <span
                        className={`text-[10px] font-medium ${activeIndex === i ? "text-white" : "text-gray-500"
                            }`}
                    >
                        {product.name}
                    </span>
                </motion.div>
            ))}
        </div>
    );
}

export default function LandingFeatures() {
    return (
        <section id="features" className="bg-zinc-950 px-6 py-24 lg:py-32">
            <div className="max-w-7xl w-full mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 bg-[#f97316]/10 text-[#f97316] rounded-full text-sm font-medium mb-4 uppercase tracking-widest">
                        Features
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                        Everything You Need to
                        <br />
                        <span className="text-[#f97316]">Scale Your Lending</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Our comprehensive platform provides all the tools and infrastructure
                        you need to launch and grow your lending business.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[200px]">
                    {/* 1. Instant Integration - Tall (2x2) */}
                    <motion.div
                        className="md:col-span-2 md:row-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col hover:border-[#f97316]/50 transition-colors cursor-pointer overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex-1">
                            <ApiCodeAnimation />
                        </div>
                        <div className="mt-4">
                            <h3 className="text-xl text-white font-semibold flex items-center gap-2">
                                <Zap className="w-5 h-5 text-[#f97316]" />
                                Instant Integration
                            </h3>
                            <p className="text-gray-400 text-sm mt-2">
                                Connect to our lending infrastructure in minutes with plug-and-play APIs.
                            </p>
                        </div>
                    </motion.div>

                    {/* 2. Real-Time Analytics - Standard (2x1) */}
                    <motion.div
                        className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col hover:border-[#f97316]/50 transition-colors cursor-pointer overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ scale: 0.98 }}
                    >
                        <div className="flex-1">
                            <DashboardAnimation />
                        </div>
                        <div className="mt-4">
                            <h3 className="text-xl text-white font-semibold">Real-Time Analytics</h3>
                            <p className="text-gray-400 text-sm mt-1">
                                Monitor your lending portfolio with live insights.
                            </p>
                        </div>
                    </motion.div>

                    {/* 3. Partner Network - Tall (2x2) */}
                    <motion.div
                        className="md:col-span-2 md:row-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col hover:border-[#f97316]/50 transition-colors cursor-pointer overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.15)" }}
                    >
                        <div className="flex-1 flex items-center justify-center">
                            <PartnerNetwork />
                        </div>
                        <div className="mt-auto relative z-20 bg-zinc-900/50 backdrop-blur-sm rounded-lg p-2">
                            <h3 className="text-xl text-white flex items-center gap-2 font-semibold">
                                <Globe className="w-5 h-5 text-[#f97316]" />
                                Partner Network
                            </h3>
                            <p className="text-gray-400 text-sm mt-1">
                                Access our extensive network of lending partners and DSAs across India.
                            </p>
                        </div>
                    </motion.div>

                    {/* 4. Quick Disbursals - Standard (2x1) */}
                    <motion.div
                        className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col hover:border-[#f97316]/50 transition-colors cursor-pointer overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 0.98 }}
                    >
                        <div className="flex-1">
                            <SpeedIndicator />
                        </div>
                        <div className="mt-4">
                            <h3 className="text-xl text-white font-semibold flex items-center gap-2">
                                <Clock className="w-5 h-5 text-[#f97316]" />
                                Quick Disbursals
                            </h3>
                            <p className="text-gray-400 text-sm mt-1">
                                Automated workflows for same-day approvals.
                            </p>
                        </div>
                    </motion.div>

                    {/* 5. Bank-Grade Security - Wide (3x1) */}
                    <motion.div
                        className="md:col-span-3 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col hover:border-[#f97316]/50 transition-colors cursor-pointer overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ scale: 0.98 }}
                    >
                        <div className="flex-1">
                            <SecurityBadge />
                        </div>
                        <div className="mt-4">
                            <h3 className="text-xl text-white flex items-center gap-2 font-semibold">
                                <Lock className="w-5 h-5 text-[#f97316]" />
                                Bank-Grade Security
                            </h3>
                            <p className="text-gray-400 text-sm mt-1">
                                Enterprise-level encryption with full RBI compliance built-in.
                            </p>
                        </div>
                    </motion.div>

                    {/* 6. Multi-Product Support - Wide (3x1) */}
                    <motion.div
                        className="md:col-span-3 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col hover:border-[#f97316]/50 transition-colors cursor-pointer overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 0.98 }}
                    >
                        <div className="flex-1">
                            <MultiProductAnimation />
                        </div>
                        <div className="mt-4">
                            <h3 className="text-xl text-white font-semibold flex items-center gap-2">
                                <Wallet className="w-5 h-5 text-[#f97316]" />
                                Multi-Product Support
                            </h3>
                            <p className="text-gray-400 text-sm mt-1">
                                Personal loans, business loans, credit lines – all from one platform.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
