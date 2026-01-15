"use client";

import React from "react";
import { motion } from "framer-motion";

export default function B2CWhyChooseUs() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <span className="text-orange-500 font-medium tracking-wider uppercase text-sm mb-4 block">Why Choose Us</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        Practical financial solutions to help you move <span className="italic font-serif text-orange-500">faster.</span>
                    </h2>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">

                    {/* Large Feature Card - Spans 2 Columns on Desktop */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-3 bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row relative group"
                    >
                        {/* Image Side (Left) */}
                        <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop"
                                alt="Paperless Process"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/10" />
                        </div>

                        {/* Content Side (Right) */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                            <span className="inline-block px-4 py-1.5 bg-gray-100 rounded-full text-xs font-semibold text-gray-600 w-fit mb-6">
                                Strategy
                            </span>
                            <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                                Paperless Process, <br /> Approvals in Minutes
                            </h3>
                            <p className="text-gray-500 leading-relaxed mb-8">
                                Forget the piles of paperwork. Our fully digital journey ensures your loan application flies through the system, getting you funds when you need them. No branch visits, no physical forms.
                            </p>
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                                <div className="w-2 h-2 rounded-full bg-orange-500" />
                                5 min process
                            </div>
                        </div>
                    </motion.div>

                    {/* Small Card 1 - Transparency */}
                    <BentoCard
                        tag="Transparency"
                        title="The Real Cost of Bad Design (It's Zero)"
                        headline="Zero Hidden Charges"
                        desc="We believe in complete clarity. What you see is exactly what you pay. No surprises."
                        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop"
                        delay={0.1}
                    />

                    {/* Small Card 2 - Choice */}
                    <BentoCard
                        tag="Choice"
                        headline="50+ Banking Partners"
                        desc="We compare across top banks and NBFCs to get you the lowest interest rates available."
                        image="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=600&auto=format&fit=crop" // Handshake / Partnership
                        delay={0.2}
                    />

                    {/* Small Card 3 - Security */}
                    <BentoCard
                        tag="Security"
                        headline="Bank-Grade Encryption"
                        desc="Your data is protected with the same global security standards used by major financial institutions."
                        image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600&auto=format&fit=crop" // Security / Tech
                        delay={0.3}
                    />

                </div>
            </div>
        </section>
    );
}

const BentoCard = ({ tag, headline, desc, image, delay }: { tag: string, headline: string, desc: string, image: string, delay: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col group h-full"
        >
            {/* Image Top */}
            <div className="h-48 relative overflow-hidden shrink-0">
                <span className="absolute top-4 right-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                    {tag}
                </span>
                <img
                    src={image}
                    alt={headline}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>

            {/* Content Bottom */}
            <div className="p-8 flex flex-col grow">
                <h4 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-orange-600 transition-colors">
                    {headline}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                    {desc}
                </p>
            </div>
        </motion.div>
    );
}
