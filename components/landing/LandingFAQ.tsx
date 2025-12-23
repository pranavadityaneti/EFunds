"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        question: "What is Efunds?",
        answer:
            "Efunds is a comprehensive lending infrastructure platform that enables businesses to launch and scale their lending operations. We provide APIs, dashboards, and tools for loan origination, processing, disbursement, and collection.",
    },
    {
        question: "How quickly can I integrate with Efunds?",
        answer:
            "Most partners complete their integration within 2-4 weeks. Our plug-and-play APIs and detailed documentation make it easy to get started. We also provide dedicated technical support throughout the integration process.",
    },
    {
        question: "What types of loans does the platform support?",
        answer:
            "Efunds supports multiple loan products including personal loans, business loans, credit lines, BNPL (Buy Now Pay Later), and customized loan products. You can configure loan terms, interest rates, and eligibility criteria based on your requirements.",
    },
    {
        question: "Is Efunds compliant with RBI regulations?",
        answer:
            "Yes, Efunds is fully compliant with all applicable RBI guidelines and regulations. We maintain the highest standards of regulatory compliance and data security to protect both lenders and borrowers.",
    },
    {
        question: "What kind of support do you offer?",
        answer:
            "We provide 24/7 technical support, dedicated account managers, comprehensive documentation, and regular training sessions. Our team is committed to ensuring your success on the platform.",
    },
    {
        question: "How does pricing work?",
        answer:
            "Our pricing is flexible and based on your business model. We offer transaction-based pricing, subscription plans, and custom enterprise agreements. Contact us for a personalized quote based on your requirements.",
    },
];

export default function LandingFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 lg:py-40 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* Left Column: Header */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="sticky top-24"
                        >
                            <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
                                Any questions? <br />
                                <span className="text-gray-900/90">We got you.</span>
                            </h2>

                            <p className="text-lg text-gray-500 mb-10 leading-relaxed max-w-md">
                                Don&apos;t worry, we won&apos;t keep you waiting. Our team is here to help you get started and answer any queries about our lending infrastructure.
                            </p>

                            <a
                                href="#contact"
                                className="inline-flex items-center text-blue-600 font-bold hover:text-blue-700 transition-colors gap-2 group"
                            >
                                More FAQs
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Column: Accordion */}
                    <div className="lg:col-span-7">
                        <div className="divide-y divide-gray-200">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="py-6 first:pt-0 last:pb-0"
                                >
                                    <button
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        className="w-full flex items-center justify-between text-left group"
                                    >
                                        <span className={`text-xl font-bold transition-colors duration-300 ${openIndex === index ? 'text-gray-900' : 'text-gray-900 font-bold group-hover:text-blue-600'}`}>
                                            {faq.question}
                                        </span>
                                        <div className="flex-shrink-0 ml-4 w-6 h-6 flex items-center justify-center relative">
                                            <div className="absolute w-4 h-[2px] bg-gray-900" />
                                            <motion.div
                                                animate={{ rotate: openIndex === index ? 0 : 90, opacity: openIndex === index ? 0 : 1 }}
                                                className="absolute w-4 h-[2px] bg-gray-900"
                                            />
                                        </div>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {openIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                            >
                                                <div className="pt-6 text-lg text-gray-500 leading-relaxed max-w-2xl">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
