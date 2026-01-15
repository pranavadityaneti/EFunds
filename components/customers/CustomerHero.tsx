"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, CheckCircle2, Shield, Zap } from "lucide-react";
import Image from "next/image";

export default function CustomerHero() {
    return (
        <section className="bg-white">
            <div className="bg-[#0A0A0A] w-full rounded-b-[3rem] relative overflow-hidden text-white min-h-[980px] flex items-center">
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/5 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-20">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
                        {/* Left Column: Content */}
                        <div className="max-w-xl">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-orange-400 text-sm font-medium mb-8">
                                    <Zap className="w-4 h-4 fill-orange-400" />
                                    Instant Approval
                                </span>
                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
                                    Unlock Your Full <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                                        Financial Potential
                                    </span>
                                </h1>
                                <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-lg">
                                    Get instant personal loans with zero paperwork.
                                    Our AI-driven platform ensures the best rates and fastest disbursals, tailored just for you.
                                </p>

                                <div className="flex flex-wrap gap-4 items-center">
                                    <button className="px-8 py-4 bg-[#f97316] text-white rounded-full font-bold text-lg hover:bg-[#ea580c] transition-all shadow-lg shadow-orange-500/25 flex items-center gap-2 group">
                                        Get the App
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                                        Learn More
                                    </button>
                                </div>

                                <div className="mt-12 flex items-center gap-12">
                                    <div>
                                        <div className="text-3xl font-bold text-white mb-1">4.8</div>
                                        <div className="flex items-center gap-1 text-orange-400 mb-1">
                                            <Star className="w-4 h-4 fill-orange-400" />
                                            <Star className="w-4 h-4 fill-orange-400" />
                                            <Star className="w-4 h-4 fill-orange-400" />
                                            <Star className="w-4 h-4 fill-orange-400" />
                                            <Star className="w-4 h-4 fill-orange-400" />
                                        </div>
                                        <div className="text-sm text-gray-500">Rating on AppStore</div>
                                    </div>
                                    <div className="w-px h-12 bg-white/10" />
                                    <div>
                                        <div className="text-3xl font-bold text-white mb-1">700k+</div>
                                        <div className="text-sm text-gray-500">Active Users</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column: Phone Mockup */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative mx-auto w-[300px] h-[600px] bg-black rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden">
                                {/* Notch */}
                                <div className="absolute top-0 inset-x-0 h-6 bg-black z-20 rounded-b-3xl">
                                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-900 rounded-full" />
                                </div>

                                {/* Screen Content - Recreated based on image */}
                                <div className="relative h-full bg-[#050505] text-white flex flex-col">
                                    {/* Top Section: Icon & Header */}
                                    <div className="flex-1 flex flex-col items-center pt-12 px-6">
                                        <div className="w-32 h-32 relative mb-6">
                                            {/* Abstract illustration of Cash/Coins using Lucide & CSS */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-16 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-lg transform -rotate-12 shadow-lg border-2 border-white/20 z-10" />
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-16 bg-gradient-to-tr from-green-300 to-emerald-500 rounded-lg transform -rotate-6 shadow-lg border-2 border-white/20 z-20" />
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-16 bg-gradient-to-tr from-emerald-300 to-green-500 rounded-lg transform rotate-0 shadow-xl border-2 border-white/20 z-30 flex items-center justify-center">
                                                <span className="text-emerald-900 font-bold text-xl">₹</span>
                                            </div>
                                            {/* Coins */}
                                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full border-2 border-yellow-200 z-40 shadow-lg flex items-center justify-center text-yellow-700 font-bold">₹</div>
                                            <div className="absolute -bottom-2 right-4 w-10 h-10 bg-yellow-500 rounded-full border-2 border-yellow-200 z-30 shadow-lg" />
                                        </div>

                                        <h3 className="text-2xl font-bold text-center mb-1">Personal loan</h3>
                                        <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase text-center mb-8">
                                            AT INTEREST RATE STARTING 12.75% P.A.
                                        </p>
                                    </div>

                                    {/* Bottom Card: Calculator */}
                                    <div className="bg-white rounded-t-[2rem] p-6 pb-8 text-gray-900">
                                        <h4 className="text-lg font-bold text-center mb-1">How much do you need?</h4>
                                        <p className="text-gray-500 text-xs text-center mb-6">Select your loan amount</p>

                                        <div className="text-center mb-2">
                                            <span className="text-3xl font-bold text-[#f97316]">₹9,00,000</span>
                                        </div>
                                        <p className="text-center text-[10px] text-gray-500 font-medium mb-6">
                                            EMI starting from ₹30,216/month
                                        </p>

                                        {/* Slider */}
                                        <div className="flex items-center justify-between text-xs font-bold text-gray-400 mb-2">
                                            <span>₹10K</span>
                                            <span>₹9L</span>
                                        </div>
                                        <div className="relative h-2 bg-gray-100 rounded-full mb-8">
                                            <div className="absolute left-0 top-0 bottom-0 w-[70%] bg-[#f97316] rounded-full" />
                                            <div className="absolute left-[70%] top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-[#f97316] rounded-full shadow-md flex items-center justify-center">
                                                <div className="w-1.5 h-1.5 bg-[#f97316] md:hidden" /> {/* Arrows icon simplified */}
                                                <div className="hidden md:flex gap-0.5">
                                                    <div className="w-0 h-0 border-y-[3px] border-y-transparent border-r-[4px] border-r-[#f97316]" />
                                                    <div className="w-0 h-0 border-y-[3px] border-y-transparent border-l-[4px] border-l-[#f97316]" />
                                                </div>
                                            </div>
                                        </div>

                                        <button className="w-full py-4 bg-black text-white rounded-xl font-bold text-sm hover:bg-gray-900 transition-colors shadow-lg shadow-gray-200 mb-4">
                                            APPLY NOW
                                        </button>

                                        {/* Consent checkboxes simplified */}
                                        <div className="space-y-3">
                                            <div className="flex gap-3">
                                                <div className="w-4 h-4 rounded border border-gray-300 flex-shrink-0 mt-0.5" />
                                                <p className="text-[9px] text-gray-400 leading-tight">
                                                    I hereby consent and authorize Efunds to access my credit information... <span className="text-blue-500">read more</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hand/Shadow Context (Optional or Stylized) */}
                            <div className="absolute -inset-10 bg-orange-500/20 blur-[80px] -z-10 rounded-full" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
