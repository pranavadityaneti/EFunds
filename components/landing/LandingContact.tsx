"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function LandingContact() {
    return (
        <section id="contact" className="py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-2 bg-[#f97316]/20 text-[#fb923c] rounded-full text-sm font-medium mb-4">
                            Get Started
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Ready to Transform
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#fb923c]">
                                Your Lending Business?
                            </span>
                        </h2>
                        <p className="text-lg text-gray-400 mb-10 leading-relaxed">
                            Get in touch with our team to learn how Efunds can help you
                            launch and scale your lending operations. We&apos;re here to answer
                            your questions and provide a personalized demo.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#f97316]/20 flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-[#f97316]" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Email Us</div>
                                    <a href="mailto:contact@efunds.in" className="text-white hover:text-[#f97316] transition-colors font-medium">
                                        contact@efunds.in
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#f97316]/20 flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-[#f97316]" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Call Us</div>
                                    <a href="tel:+919876543210" className="text-white hover:text-[#f97316] transition-colors font-medium">
                                        +91 98765 43210
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#f97316]/20 flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-[#f97316]" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Visit Us</div>
                                    <span className="text-white font-medium">
                                        Bangalore, India
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">
                            Send us a message
                        </h3>
                        <form className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#f97316] transition-colors"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#f97316] transition-colors"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#f97316] transition-colors"
                                    placeholder="john@company.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#f97316] transition-colors"
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">
                                    Message
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#f97316] transition-colors resize-none"
                                    placeholder="Tell us about your lending requirements..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#f97316] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white py-4 rounded-xl font-semibold transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group"
                            >
                                Send Message
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
