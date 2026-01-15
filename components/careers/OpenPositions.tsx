"use client";

import { motion } from "framer-motion";
import { jobPositions } from "@/lib/jobs-data";
import { MapPin, DollarSign, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function OpenPositions() {
    return (
        <section className="py-20 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Currently open positions</h2>
                    <div className="w-20 h-1 bg-gray-200 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {jobPositions.map((job, index) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href={`/careers/${job.id}`}
                                className="group block h-full bg-white border border-gray-100 rounded-2xl p-8 hover:border-gray-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-black transition-colors">{job.title}</h3>
                                        <span className="text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full inline-block">{job.type}</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-45 transition-all duration-300">
                                        <ArrowUpRight size={20} />
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-8 line-clamp-2 text-sm leading-relaxed">
                                    {job.description}
                                </p>

                                <div className="flex items-center gap-6 mt-auto text-sm font-medium text-gray-900 border-t border-gray-50 pt-6">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-gray-400" />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <DollarSign size={16} className="text-gray-400" />
                                        {job.salary}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
