"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
    { name: "Loans", href: "#loans" },
    { name: "Products", href: "#products" },
    { name: "About Us", href: "#about" },
    { name: "Careers", href: "#careers" },
];

export default function LandingHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative z-50 px-6 lg:px-12 py-6"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="flex items-center gap-2">
                    <img
                        src="/logo.png"
                        alt="Efunds Logo"
                        className="h-10 w-auto object-contain"
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

                    <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
                        <a
                            href="/auth/register"
                            className="text-white/90 hover:text-white text-sm font-medium px-4 py-2 hover:bg-white/5 rounded-lg transition-all"
                        >
                            Join as a Partner
                        </a>
                        <a
                            href="/auth/login"
                            className="bg-black hover:bg-zinc-900 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 shadow-lg shadow-orange-500/20 border border-white/10"
                        >
                            Login
                        </a>
                    </div>
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
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
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
                            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/10">
                                <a
                                    href="/auth/register"
                                    className="text-white text-center py-2 px-4 rounded-lg hover:bg-white/5 font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Join as a Partner
                                </a>
                                <a
                                    href="/auth/login"
                                    className="bg-black hover:bg-zinc-900 text-white px-5 py-3 rounded-full text-sm font-medium transition-all text-center border border-white/10"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Login
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
