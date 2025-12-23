"use client";

import { motion } from "framer-motion";

const footerLinks = {
    carePlans: [
        { name: "Sexual Health", href: "#" },
        { name: "Weight Loss", href: "#" },
        { name: "Travel Kit", href: "#" },
    ],
    learn: [
        { name: "Blogs", href: "#" },
        { name: "Research & Education", href: "#" },
        { name: "Certifications", href: "#" },
    ],
    about: [
        { name: "Providers", href: "#" },
        { name: "About Us", href: "#" },
    ],
    support: [
        { name: "FAQ's", href: "#faq" },
        { name: "Contact Us", href: "#contact" },
    ],
    legal: [
        { name: "Terms & Conditions", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Risk & Benefits", href: "#" },
        { name: "Telehealth Consent", href: "#" },
        { name: "Prescription Policy", href: "#" },
    ],
};

export default function LandingFooter() {
    return (
        <footer className="relative bg-white pt-20 pb-10 overflow-hidden">
            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20">
                <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-b from-blue-50 to-white py-24 px-6 text-center">
                    {/* Subtle Gradients */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/50 blur-[100px] -z-10 rounded-full translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/30 blur-[100px] -z-10 rounded-full -translate-x-1/2 translate-y-1/2" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                            Ready to Take Control <br className="hidden sm:block" />
                            of Your Lending?
                        </h2>
                        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
                            Discover our suite of enterprise-grade tools designed to accelerate your lending operations and enhance borrower experiences.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
                                Start Now
                            </button>
                            <button className="px-8 py-4 bg-white border border-gray-100 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all">
                                Contact Us
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Footer Card */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="relative rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] p-12 lg:p-16 overflow-hidden">
                    {/* Subtle Pale Orange Glow */}
                    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-orange-100/40 blur-[80px] -z-10 rounded-full" />

                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
                        {/* Left: Brand & Newsletter */}
                        <div className="lg:col-span-4 flex flex-col">
                            <img src="/logo.png" alt="Efunds" className="h-10 w-auto object-contain mb-10 grayscale opacity-80" />

                            <p className="text-gray-900 font-bold mb-4">Sign up to receive our news.</p>
                            <div className="relative flex items-center mb-6">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full h-14 pl-6 pr-32 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all"
                                />
                                <button className="absolute right-1.5 top-1.5 bottom-1.5 px-6 bg-gray-900 text-white rounded-[14px] font-bold text-sm hover:bg-black transition-colors">
                                    Submit
                                </button>
                            </div>
                            <p className="text-[13px] text-gray-400 leading-relaxed">
                                By subscribing you agree to with our Privacy Policy and provide consent to receive updates from our company.
                            </p>
                        </div>

                        {/* Right: Links */}
                        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:pl-12">
                            <div>
                                <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-6">Care Plans</h4>
                                <ul className="space-y-4">
                                    {footerLinks.carePlans.map((link) => (
                                        <li key={link.name}><a href={link.href} className="text-[15px] font-medium text-gray-600 hover:text-blue-600 transition-colors">{link.name}</a></li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-6">Learn</h4>
                                <ul className="space-y-4">
                                    {footerLinks.learn.map((link) => (
                                        <li key={link.name}><a href={link.href} className="text-[15px] font-medium text-gray-600 hover:text-blue-600 transition-colors">{link.name}</a></li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-6">About</h4>
                                <ul className="space-y-4">
                                    {footerLinks.about.map((link) => (
                                        <li key={link.name}><a href={link.href} className="text-[15px] font-medium text-gray-600 hover:text-blue-600 transition-colors">{link.name}</a></li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-6">Support</h4>
                                <ul className="space-y-4">
                                    {footerLinks.support.map((link) => (
                                        <li key={link.name}><a href={link.href} className="text-[15px] font-medium text-gray-600 hover:text-blue-600 transition-colors">{link.name}</a></li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-6">Legal</h4>
                                <ul className="space-y-4">
                                    {footerLinks.legal.map((link) => (
                                        <li key={link.name}><a href={link.href} className="text-[15px] font-medium text-gray-600 hover:text-blue-600 transition-colors">{link.name}</a></li>
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
