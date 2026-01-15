"use client";

import { motion, AnimatePresence } from "framer-motion";
import AnimatedGradientBackground from "./AnimatedGradientBackground";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import LandingHeader from "./LandingHeader";

function FlipWords({ words, className, currentClassName }: { words: string[]; className?: string; currentClassName?: string }) {
    const [index, setIndex] = useState(0);

    // Rotate words every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [words.length]);

    return (
        <div className={`relative inline-block h-[1.2em] overflow-hidden align-bottom ${className}`}>
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={words[index]}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{
                        y: { type: "spring", stiffness: 50, damping: 20 },
                        opacity: { duration: 0.2 }
                    }}
                    className={`block ${currentClassName}`}
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}

export default function LandingHero() {
    return (
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
            {/* Animated Gradient Background */}
            <AnimatedGradientBackground
                startingGap={100}
                Breathing={true}
                breathingRange={5}
                animationSpeed={0.03}
                topOffset={20}
                gradientPosition="50% 100%"
                gradientColors={["#fb923c", "#f97316", "#ea580c", "#000000", "#000000"]}
                gradientStops={[0, 25, 50, 75, 100]}
                enableSunrise={true}
            />

            <LandingHeader />

            {/* Hero Content */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-6 lg:px-12">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8 border border-white/20">
                            🚀 Revolutionizing Lending Infrastructure
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight"
                    >
                        Finance Made Simple.
                        <br />
                        <span className="text-white">
                            Empowering{" "}
                            <FlipWords
                                words={["Every Dream", "Your Growth", "Every Future", "Your Business", "Every Goal"]}
                                currentClassName="text-white"
                                className="inline-block"
                            />
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10"
                    >
                        Empower your lending business with our seamless infrastructure.
                        Connect, configure, and start disbursing loans in minutes, not months.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <a
                            href="#contact"
                            className="group bg-black hover:bg-zinc-900 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-orange-500/25 border border-white/10"
                        >
                            Start Lending Today
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </a>
                        <a
                            href="#features"
                            className="text-white/80 hover:text-white px-8 py-4 rounded-full text-lg font-medium transition-colors border border-white/20 hover:border-white/40"
                        >
                            Learn More
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="relative z-10 flex justify-center pb-8"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
                >
                    <motion.div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
