"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Minus } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "How fast is the employment verification process (EIS)?",
        answer: "Our EIS checks are near-instantaneous for digital records and typically complete within 2-4 hours for manual verifications, ensuring you can onboard applicants without delay."
    },
    {
        question: "Can I integrate the LOS modules with my existing CRM?",
        answer: "Yes, our LOS features a modular 'Plug and Play' architecture. You can integrate specific modules via our REST APIs directly into Salesforce, Zoho, or any custom CRM you currently use."
    },
    {
        question: "How do you ensure data security for B2B partners?",
        answer: "We adhere to bank-grade security protocols, including AES-256 encryption at rest and in transit. We are SOC 2 Type II compliant and regularly undergo third-party penetration testing."
    },
    {
        question: "Is the payout automation for DSAs real-time?",
        answer: "Yes. Once a loan is disbursed and the commission is triggered, our system processes the payout instantly to the agent's linked bank account, complete with automated invoice generation."
    },
    {
        question: "What kind of technical support do you offer for API integration?",
        answer: "We provide dedicated technical account managers and 24/7 developer support. You'll also get access to our comprehensive sandbox environment and detailed API documentation to speed up your integration."
    }
];

export default function B2BFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="w-full bg-white py-24 px-6 lg:px-12">
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    {/* Left Column: Header & Context */}
                    <div className="lg:w-1/3 pt-4">
                        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight leading-[1.1] mb-8">
                            Any questions? <br />
                            <span className="text-gray-900">We got you.</span>
                        </h2>

                        <p className="text-gray-500 text-lg leading-relaxed mb-8">
                            From integration details to security standards, we're here to help you build better financial products.
                        </p>

                        <a href="/contact" className="inline-flex items-center gap-2 text-orange-500 font-medium hover:gap-3 transition-all group">
                            Contact Support
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    {/* Right Column: Accordion */}
                    <div className="lg:w-2/3">
                        <div className="divide-y divide-gray-200">
                            {faqs.map((faq, index) => (
                                <div key={index} className="py-6 first:pt-0">
                                    <button
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        className="w-full flex items-start justify-between gap-4 text-left group"
                                    >
                                        <span className={`text-xl font-medium transition-colors ${openIndex === index ? 'text-orange-500' : 'text-gray-900 group-hover:text-gray-600'}`}>
                                            {faq.question}
                                        </span>
                                        <span className={`flex-shrink-0 ml-4 p-1 rounded-full border transition-colors ${openIndex === index ? 'border-orange-500 text-orange-500' : 'border-gray-200 text-gray-400 group-hover:border-gray-400'}`}>
                                            {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                                        </span>
                                    </button>

                                    <AnimatePresence>
                                        {openIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <p className="pt-4 pr-12 text-gray-500 leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
