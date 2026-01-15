"use client";

import React from "react";
import { motion } from "framer-motion";
import { TimerIcon, TransparencyIcon, NetworkIcon, ShieldIcon } from "./B2CIcons";

export default function B2CWhyChooseUs() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <span className="text-orange-500 font-medium tracking-wider uppercase text-sm mb-4 block">Why Choose Us</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        Practical financial solutions to help you move <span className="italic font-serif text-orange-500">faster.</span>
                    </h2>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">

                    {/* Large Feature Card - Paperless/Timer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-3 bg-black rounded-[2rem] overflow-hidden shadow-xl flex flex-col md:flex-row relative group"
                    >
                        {/* Animation Side (Left) */}
                        <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden bg-gradient-to-br from-gray-900 to-black flex items-center justify-center border-r border-white/5">
                            <div className="relative z-10 scale-150">
                                <TimerIcon />
                            </div>
                            {/* Decorative background glow */}
                            <div className="absolute inset-0 bg-orange-500/5 blur-3xl rounded-full transform scale-75" />
                        </div>

                        {/* Content Side (Right) */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                            <span className="inline-block px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-xs font-semibold text-orange-400 w-fit mb-6">
                                Strategy
                            </span>
                            <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                                Paperless Process, <br /> Approvals in Minutes
                            </h3>
                            <p className="text-gray-400 leading-relaxed mb-8">
                                Forget the piles of paperwork. Our fully digital journey ensures your loan application flies through the system, getting you funds when you need them. No branch visits, no physical forms.
                            </p>
                            <div className="flex items-center gap-2 text-sm font-medium text-white">
                                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                Instant Processing
                            </div>
                        </div>
                    </motion.div>

                    {/* Small Card 1 - Transparency */}
                    <BentoCard
                        tag="Transparency"
                        icon={<TransparencyIcon />}
                        headline="Zero Hidden Charges"
                        desc="We believe in complete clarity. What you see is exactly what you pay. No surprises."
                        delay={0.1}
                    />

                    {/* Small Card 2 - Choice */}
                    <BentoCard
                        tag="Choice"
                        icon={<NetworkIcon />}
                        headline="50+ Banking Partners"
                        desc="We compare across top banks and NBFCs to get you the lowest interest rates available."
                        delay={0.2}
                    />

                    {/* Small Card 3 - Security */}
                    <BentoCard
                        tag="Security"
                        icon={<ShieldIcon />}
                        headline="Bank-Grade Encryption"
                        desc="Your data is protected with the same global security standards used by major financial institutions."
                        delay={0.3}
                    />

                </div>
            </div>
        </section>
    );
}

const BentoCard = ({ tag, headline, desc, icon, delay }: { tag: string, headline: string, desc: string, icon: React.ReactNode, delay: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="bg-black rounded-[2rem] overflow-hidden shadow-lg border border-white/5 flex flex-col group h-full relative"
        >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[50px] rounded-full" />

            {/* Animation Top */}
            <div className="h-48 relative overflow-hidden shrink-0 flex items-center justify-center z-10 border-b border-white/5 bg-white/2">
                {icon}
            </div>

            {/* Content Bottom */}
            <div className="p-8 flex flex-col grow z-10">
                <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs font-semibold text-gray-400 w-fit mb-4">
                    {tag}
                </span>
                <h4 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-orange-500 transition-colors">
                    {headline}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                    {desc}
                </p>
            </div>
        </motion.div>
    );
}
