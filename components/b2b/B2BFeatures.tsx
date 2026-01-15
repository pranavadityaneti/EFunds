"use client";

import { motion } from "framer-motion";
import { BarChart3, Workflow, Zap, Database, Globe, Lock, Clock } from "lucide-react";

export default function B2BFeatures() {
    return (
        <section className="w-full bg-white py-24 px-6 lg:px-12">
            <div className="container mx-auto">
                <div className="mb-16">
                    <h2 className="text-xl font-medium tracking-wide text-gray-900 border-l-4 border-orange-500 pl-4">
                        Key Features
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[800px]">
                    {/* Card 1: Data Intelligence (Tall Left) */}
                    <div className="lg:col-span-1 h-[500px] lg:h-full bg-zinc-50 rounded-[2.5rem] p-8 md:p-12 border border-zinc-100 flex flex-col justify-between overflow-hidden relative group">
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <BarChart3 className="text-orange-500" />
                            </div>
                            <h3 className="text-3xl font-medium text-gray-900 mb-4">
                                Track what matters
                            </h3>
                            <p className="text-gray-500 leading-relaxed">
                                Stay focused with visual goal tracking across key areas of your operations. Real-time insights into agent performance and loan velocity.
                            </p>
                        </div>

                        {/* Heatmap Visual */}
                        <div className="w-full aspect-square bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 mt-8 relative overflow-hidden">
                            <div className="grid grid-cols-7 gap-2 h-full">
                                {Array.from({ length: 49 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="rounded-md bg-orange-500"
                                        initial={{ opacity: 0.1 }}
                                        animate={{
                                            opacity: [0.1, Math.random() * 0.8 + 0.2, 0.1]
                                        }}
                                        transition={{
                                            duration: Math.random() * 3 + 2,
                                            repeat: Infinity,
                                            delay: Math.random() * 2
                                        }}
                                    />
                                ))}
                            </div>
                            {/* Floating Tooltip Mockup */}
                            <motion.div
                                className="absolute top-1/2 left-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-xl"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                32 New Leads
                            </motion.div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-6 h-full">
                        {/* Card 2: Ecosystem (Top Right) */}
                        <div className="flex-1 bg-zinc-50 rounded-[2.5rem] p-8 md:p-12 border border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                            <div className="relative z-10 max-w-sm">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                    <Workflow className="text-orange-500" />
                                </div>
                                <h3 className="text-3xl font-medium text-gray-900 mb-4">
                                    Smarter workflows
                                </h3>
                                <p className="text-gray-500 leading-relaxed">
                                    Connect with 100+ financial partners instantly via our universal API ecosystem.
                                </p>
                            </div>

                            {/* Floating Icons Visual */}
                            <div className="relative w-64 h-64 flex-shrink-0">
                                {/* Central Node */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 bg-orange-500 rounded-3xl flex items-center justify-center shadow-lg shadow-orange-500/20 z-10">
                                        <Database className="text-white w-8 h-8" />
                                    </div>
                                </div>

                                {/* Orbiting Icons */}
                                {[Globe, Lock, Zap, Clock].map((Icon, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute top-1/2 left-1/2 w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-zinc-100"
                                        animate={{
                                            x: Math.cos(i * Math.PI / 2) * 80,
                                            y: Math.sin(i * Math.PI / 2) * 80,
                                        }}
                                        initial={{ x: 0, y: 0 }}
                                        // Adding a subtle localized float on top of the position
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <Icon className="w-5 h-5 text-gray-600" />
                                    </motion.div>
                                ))}
                                {/* Connecting Lines (SVG) */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                    {[0, 1, 2, 3].map(i => (
                                        <motion.line
                                            key={i}
                                            x1="50%" y1="50%"
                                            x2={50 + Math.cos(i * Math.PI / 2) * 35 + "%"}
                                            y2={50 + Math.sin(i * Math.PI / 2) * 35 + "%"}
                                            stroke="#fed7aa" // orange-200
                                            strokeWidth="2"
                                            strokeDasharray="4 4"
                                            animate={{ strokeDashoffset: [0, -8] }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                    ))}
                                </svg>
                            </div>
                        </div>

                        {/* Card 3: Automation (Bottom Right) */}
                        <div className="flex-1 bg-zinc-50 rounded-[2.5rem] p-8 md:p-12 border border-zinc-100 flex flex-col justify-between relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-3xl font-medium text-gray-900 mb-4">
                                    Progress you can see
                                </h3>
                                <p className="text-gray-500 leading-relaxed max-w-2xl">
                                    Visualize your track and keep the momentum with real-time updates. Automate underwriting and slash turnaround times.
                                </p>
                            </div>

                            {/* Timeline Visual */}
                            <div className="mt-8 relative">
                                <div className="flex justify-between text-xs font-semibold text-gray-400 mb-4 px-2">
                                    <span>JAN</span>
                                    <span>FEB</span>
                                    <span>MAR</span>
                                    <span>APR</span>
                                    <span>MAY</span>
                                </div>
                                <div className="space-y-4 relative">
                                    {/* Vertical Line */}
                                    <div className="absolute top-0 bottom-0 left-[65%] w-px bg-red-400/50 z-0 border-r border-dashed border-red-400" />
                                    <div className="absolute top-0 left-[65%] w-2 h-2 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 z-10" />

                                    {/* Bars */}
                                    {[
                                        { label: "Loan Application Process", width: "100%", color: "bg-green-500" },
                                        { label: "Document Verification", width: "80%", color: "bg-teal-500" },
                                        { label: "Credit Underwriting", width: "65%", color: "bg-blue-500" },
                                        { label: "Disbursement", width: "40%", color: "bg-purple-500" },
                                    ].map((item, i) => (
                                        <div key={i} className="relative">
                                            <div className="flex items-center gap-4">
                                                <motion.div
                                                    className={`h-10 rounded-xl ${item.color} flex items-center px-4 text-white text-sm font-medium whitespace-nowrap shadow-sm z-10`}
                                                    initial={{ width: "20%" }}
                                                    whileInView={{ width: item.width }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                                                >
                                                    {item.label}
                                                </motion.div>
                                                {/* Faded future bar */}
                                                <div className={`h-10 rounded-xl ${item.color} opacity-10 flex-1`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
