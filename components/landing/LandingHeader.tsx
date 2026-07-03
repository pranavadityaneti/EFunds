"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
    { name: "Loans", href: "/B2C" },
    { name: "Products", href: "/B2B" },
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
                        alt="Finlot Logo"
                        className="h-14 w-auto object-contain"
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
                            href="/business-loan-enquiry"
                            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 shadow-lg shadow-orange-500/20 cursor-pointer"
                        >
                            Business Loan Enquiry
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
                                    href="/business-loan-enquiry"
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-full text-sm font-medium transition-all text-center cursor-pointer"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Business Loan Enquiry
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
