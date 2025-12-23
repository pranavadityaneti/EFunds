"use client";

import { motion } from "framer-motion";
import AnimatedGradientBackground from "./AnimatedGradientBackground";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
];

export default function LandingHero() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <section className="relative min-h-screen flex flex-col overflow-hidden">
            {/* Animated Gradient Background */}
            <AnimatedGradientBackground
                startingGap={110}
                Breathing={true}
                breathingRange={8}
                animationSpeed={0.03}
                topOffset={20}
            />

            {/* Navigation */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative z-10 px-6 lg:px-12 py-6"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2">
                        <img
                            src="/logo.png"
                            alt="Efunds Logo"
                            className="h-10 w-auto object-contain brightness-0 invert"
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            className="bg-[#f97316] hover:bg-[#ea580c] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
                        >
                            Get Started
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/10 p-6"
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-white/80 hover:text-white transition-colors text-lg font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                className="bg-[#f97316] hover:bg-[#ea580c] text-white px-5 py-3 rounded-full text-sm font-medium transition-all text-center mt-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Get Started
                            </a>
                        </div>
                    </motion.div>
                )}
            </motion.nav>

            {/* Hero Content */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-6 lg:px-12">
                <div className="max-w-5xl mx-auto text-center">
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
                        className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-tight mb-6"
                    >
                        Plug, Play
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] via-[#fb923c] to-[#fdba74]">
                            and Lend
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
                            className="group bg-[#f97316] hover:bg-[#ea580c] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-orange-500/25"
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
