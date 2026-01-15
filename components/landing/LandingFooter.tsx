"use client";

import { motion } from "framer-motion";

const footerLinks = {
    consumerLoans: [
        { name: "Personal Loan", href: "#" },
        { name: "Education Loan", href: "#" },
        { name: "Vehicle Loan", href: "#" },
        { name: "Loans on demand", href: "#" },
        { name: "Loans against mutual funds", href: "#" },
    ],
    corporateLoans: [
        { name: "Business Loan", href: "#" },
        { name: "Bill Discounting", href: "#" },
        { name: "Quick Business Loan", href: "#" },
    ],
    products: [
        { name: "EIS", href: "#" },
        { name: "LOS", href: "#" },
        { name: "QR Solutions", href: "#" },
        { name: "CRM", href: "#" },
        { name: "DSA Automation", href: "#" },
        { name: "API Integrations", href: "#" },
    ],
    legal: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms and Conditions", href: "/terms-and-conditions" },
        { name: "RBI Sachet", href: "https://sachet.rbi.org.in/?brand=EF" },
        { name: "Settings and Cookies", href: "#" },
    ],
};

export default function LandingFooter() {
    return (
        <footer className="relative bg-white pt-20 pb-10 overflow-hidden">
            {/* CTA Section */}
            <div className="w-full px-6 lg:px-12 mb-20">
                <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-b from-orange-50 to-white py-24 px-6 text-center shadow-2xl shadow-orange-500/10 border border-orange-100">
                    {/* Subtle Gradients */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/40 blur-[100px] -z-10 rounded-full translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100/30 blur-[100px] -z-10 rounded-full -translate-x-1/2 translate-y-1/2" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
                            Ready to Transform <br className="hidden sm:block" />
                            Your Lending Business?
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Join over 50+ partners who are scaling their operations with Efunds.
                            Experience seamless integration, real-time analytics, and instant disbursals.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <button className="px-8 py-4 bg-[#f97316] text-white rounded-2xl font-bold text-lg hover:bg-[#ea580c] transition-all shadow-xl shadow-orange-500/20 hover:scale-105">
                                Start Lending
                            </button>
                            <button className="px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all hover:border-gray-300">
                                Contact Sales
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Footer Card */}
            <div className="w-full px-6 lg:px-12">
                <div className="relative rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] p-12 lg:p-16 overflow-hidden">
                    {/* Subtle Pale Orange Glow */}
                    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-orange-100/40 blur-[80px] -z-10 rounded-full" />

                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
                        {/* Left: Brand & Newsletter */}
                        <div className="lg:col-span-3 flex flex-col items-start">
                            <img src="/footer-logo.png" alt="Efunds" className="h-10 w-auto object-contain mb-10" />

                            <p className="text-gray-900 font-bold mb-4">Stay updated with Efunds.</p>
                            <div className="relative flex items-center mb-6">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full h-14 pl-6 pr-32 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/50 transition-all"
                                />
                                <button className="absolute right-1.5 top-1.5 bottom-1.5 px-6 bg-gray-900 text-white rounded-[14px] font-bold text-sm hover:bg-black transition-colors">
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-[13px] text-gray-400 leading-relaxed">
                                Subscribe to our newsletter to receive the latest updates, industry insights, and platform improvements.
                            </p>
                        </div>

                        {/* Right: Links */}
                        <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-8 lg:pl-12">
                            <div>
                                <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">Consumer Loans</h4>
                                <ul className="space-y-4">
                                    {footerLinks.consumerLoans.map((link) => (
                                        <li key={link.name}><a href={link.href} className="text-[15px] font-medium text-gray-600 hover:text-[#f97316] transition-colors">{link.name}</a></li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">Corporate Loans</h4>
                                <ul className="space-y-4">
                                    {footerLinks.corporateLoans.map((link) => (
                                        <li key={link.name}><a href={link.href} className="text-[15px] font-medium text-gray-600 hover:text-[#f97316] transition-colors">{link.name}</a></li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">Products</h4>
                                <ul className="space-y-4">
                                    {footerLinks.products.map((link) => (
                                        <li key={link.name}><a href={link.href} className="text-[15px] font-medium text-gray-600 hover:text-[#f97316] transition-colors">{link.name}</a></li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">Legal</h4>
                                <div className="mb-4 text-[13px] text-gray-500 leading-relaxed">
                                    Committed to transparency and compliance. Review our policies below.
                                </div>
                                <ul className="space-y-4">
                                    {footerLinks.legal.map((link) => (
                                        <li key={link.name}><a href={link.href} className="text-[15px] font-medium text-gray-600 hover:text-[#f97316] transition-colors">{link.name}</a></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-[14px] text-gray-400">
                        © {new Date().getFullYear()} efundzz, med. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
