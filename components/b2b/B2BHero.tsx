"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function B2BHero() {
    return (
        <section className="relative w-full min-h-screen bg-white text-black overflow-hidden flex flex-col pt-32 pb-20">

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Main Headline */}
                <div className="max-w-5xl mx-auto text-center mb-12">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1]">
                        Transforming <br />
                        <span className="font-serif italic text-gray-800">Finance, </span>
                        <span className="text-blue-600 font-serif italic relative inline-block">
                            One
                            <svg className="absolute -top-6 -right-12 w-16 h-16 text-blue-500 hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                                <path d="M10 50 Q 50 10 90 50" strokeWidth="2" fill="none" />
                                <path d="M85 45 L 90 50 L 85 55" strokeWidth="2" fill="none" />
                            </svg>
                        </span> <br />
                        <span className="font-serif italic">Innovation</span> at a Time.
                    </h1>
                </div>

                {/* CTA & Logos */}
                <div className="flex flex-col items-center gap-12 mb-24">
                    <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 group">
                        Open a finance
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale">
                        {/* Placeholder Logos - using text for simplicity based on reference or simple svgs */}
                        {['Outreach', 'attentive', 'PayPal', 'afterpay', 'splunk>', 'stripe'].map((logo) => (
                            <span key={logo} className="text-xl font-bold font-serif text-gray-400">{logo}</span>
                        ))}
                    </div>
                </div>

                {/* Visual Placeholder (Purple Abstract) */}
                <div className="relative w-full h-[400px] md:h-[600px] bg-gray-100 rounded-[3rem] overflow-hidden mb-24">
                    {/* Placeholder for the 3D ripple/wave */}
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-100 to-white flex items-center justify-center">
                        <div className="w-[800px] h-[800px] bg-purple-300/30 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                        <div className="w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        {/* We can use a real image if provided, for now CSS art/gradient to mimic the 'ripple' */}
                        <div className="w-full h-full relative" style={{
                            background: 'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.1) 0%, rgba(255,255,255,0) 70%)',
                            boxShadow: 'inset 0 0 100px rgba(255,255,255,0.8)'
                        }}></div>
                        <img
                            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                            alt="Abstract 3D Shape"
                            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply"
                        />
                    </div>
                </div>

                {/* Bottom Content */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight mb-6">
                        The fintech company aims to disrupt conventional financial systems and processes - <span className="text-gray-400">leveraging cutting-edge technologies and creative solutions</span> to address various pain points <span className="font-sans font-bold">and challenges</span> <span className="text-blue-500">within the industry.</span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl">
                        By adopting a progressive approach, they seek to improve the overall efficiency, accessibility, and transparency of financial services.
                    </p>
                </div>

            </div>
        </section>
    );
}
