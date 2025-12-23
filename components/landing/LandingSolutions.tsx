"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SolutionsCardStack, { solutions } from "./SolutionsCardStack";
import { ArrowRight } from "lucide-react";

export default function LandingSolutions() {
    const [activeIndex, setActiveIndex] = useState(0);

    const activeSolution = solutions[activeIndex];

    return (
        <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-orange-100 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-50 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                {/* Section Header - Centered */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-[#f97316] text-xs font-bold uppercase tracking-widest mb-6">
                        <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse" />
                        Platform Solutions
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        Powering the Future of <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-orange-400">Digital Lending</span>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Discover our suite of enterprise-grade tools designed to accelerate your lending operations and enhance borrower experiences.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left Column: Dynamic Content */}
                    <div className="relative">
                        {/* Progress Bar & Counter */}
                        <div className="mb-12 flex items-center gap-6">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-tighter mb-1">Current</span>
                                <span className="text-4xl font-extrabold text-gray-900 tabular-nums">
                                    {String(activeIndex + 1).padStart(2, '0')}
                                </span>
                            </div>

                            <div className="h-1 flex-1 bg-gray-100 rounded-full relative overflow-hidden">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 5, ease: "linear" }}
                                    style={{ originX: 0 }}
                                    className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-[#f97316] to-orange-400"
                                />
                            </div>

                            <div className="flex flex-col text-right">
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-tighter mb-1">Total</span>
                                <span className="text-4xl font-extrabold text-gray-300 tabular-nums text-right">
                                    {String(solutions.length).padStart(2, '0')}
                                </span>
                            </div>
                        </div>

                        {/* Title & Description with Animation */}
                        <div className="min-h-[280px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.23, 1, 0.32, 1]
                                    }}
                                >
                                    <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                        {activeSolution.title}
                                    </h3>
                                    <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                                        {activeSolution.description}
                                    </p>

                                    <div className="flex flex-wrap gap-4">
                                        <button className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all hover:shadow-xl hover:shadow-gray-200 group">
                                            Integrate Now
                                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                        </button>
                                        <button className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-50 transition-all">
                                            View Documentation
                                        </button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Column: Animated Card Stack */}
                    <div className="relative flex justify-center lg:justify-end">
                        {/* Decorative background circle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-50/50 rounded-full blur-[80px] -z-10" />
                        <SolutionsCardStack onIndexChange={setActiveIndex} />
                    </div>
                </div>
            </div>
        </section>
    );
}
