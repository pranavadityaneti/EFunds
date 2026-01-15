"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Banknote,
    Building2,
    Car,
    Coins,
    Home,
    Smartphone,
    TrendingUp,
    GraduationCap,
    FileText,
    CreditCard,
    ArrowUpRight
} from "lucide-react";

// Product Data with Icons and Expanded Descriptions
const products = [
    {
        title: "Personal Loans",
        desc: "Get instant funds for travel, weddings, medical emergencies, or any personal need with flexible repayment options.",
        icon: Banknote,
        color: "from-blue-500 to-cyan-400"
    },
    {
        title: "Business Loans",
        desc: "Scale your operations, purchase inventory, or expand your team with capital designed for business growth.",
        icon: Building2,
        color: "from-orange-500 to-amber-400"
    },
    {
        title: "Vehicle Loan",
        desc: "Drive home your dream car or bike today with our competitive interest rates and minimal documentation.",
        icon: Car,
        color: "from-red-500 to-rose-400"
    },
    {
        title: "Gold Loan",
        desc: "Unlock the value of your gold ornaments instantly for quick cash requirements with secure storage.",
        icon: Coins,
        color: "from-yellow-400 to-amber-200"
    },
    {
        title: "Home Loan",
        desc: "Make your dream home a reality with affordable housing finance, easy approvals, and long tenures.",
        icon: Home,
        color: "from-green-500 to-emerald-400"
    },
    {
        title: "Loan On Demand",
        desc: "Access a flexible line of credit where you only pay interest on the amount you utilize.",
        icon: Smartphone,
        color: "from-purple-500 to-violet-400"
    },
    {
        title: "Loan Against Mutual Funds",
        desc: "Leverage your investment portfolio to get funds without redeeming your mutual fund units.",
        icon: TrendingUp,
        color: "from-indigo-500 to-blue-400"
    },
    {
        title: "Education Loan",
        desc: "Fund your higher education in India or abroad with loans that cover tuition, accommodation, and more.",
        icon: GraduationCap,
        color: "from-pink-500 to-fuchsia-400"
    },
    {
        title: "Bill Discounting",
        desc: "Convert your unpaid invoices into immediate cash to maintain healthy working capital for your business.",
        icon: FileText,
        color: "from-teal-500 to-cyan-400"
    },
    {
        title: "Credit Card",
        desc: "Enjoy exclusive rewards, cashback, and lifestyle benefits with our wide range of premium credit cards.",
        icon: CreditCard,
        color: "from-gray-200 to-gray-400"
    }
];

export default function B2CProductsCarousel() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Section Title */}
            <div className="container mx-auto px-6 lg:px-12 mb-16 text-center">
                <span className="text-orange-500 font-medium tracking-wider uppercase text-sm mb-4 block">Our Solutions</span>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Find the Perfect <span className="text-orange-500">Fundzz</span></h2>
            </div>

            {/* Infinite Marquee Container */}
            <div className="relative w-full overflow-hidden mask-gradient-sides">
                <MarqueeRow products={products} direction="right" speed={40} />
            </div>
        </section>
    );
}

const MarqueeRow = ({ products, direction, speed }: { products: any[], direction: "left" | "right", speed: number }) => {
    return (
        <div className="flex gap-8 overflow-hidden w-full py-10">
            <motion.div
                className="flex gap-8 flex-shrink-0"
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {/* Seamless Loop: products + products */}
                {[...products, ...products].map((product, idx) => (
                    <Card key={idx} product={product} />
                ))}
            </motion.div>
        </div>
    );
}

const Card = ({ product }: { product: typeof products[0] }) => {
    const Icon = product.icon;

    return (
        <div className="relative w-[340px] h-[460px] flex-shrink-0 rounded-[2.5rem] overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-105">

            {/* Card Background: Dark Gradient + Noise */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black border border-white/5 rounded-[2.5rem]" />

            {/* Subtle Glow at top */}
            <div className={`absolute top-0 inset-x-0 h-40 bg-gradient-to-b ${product.color} opacity-10 blur-[60px] rounded-full -translate-y-20`} />

            {/* Content Container */}
            <div className="relative h-full flex flex-col items-center justify-center p-8 text-center z-10">

                {/* Icon Container with Glowing Circle Effect */}
                <div className="relative mb-8 group-hover:scale-110 transition-transform duration-300">
                    {/* Inner Glass Circle */}
                    <div className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center relative z-10 shadow-xl shadow-black/20">
                        <Icon className="text-white w-10 h-10" />
                    </div>

                    {/* Outer Glow Ring */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${product.color} blur-md opacity-40 group-hover:opacity-60 transition-opacity`} />

                    {/* Large Background Blur */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r ${product.color} blur-[60px] opacity-20`} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">{product.title}</h3>

                <p className="text-white/50 text-sm leading-relaxed max-w-[260px]">
                    {product.desc}
                </p>

                {/* Arrow Icon */}
                <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <ArrowUpRight className="text-white/60 w-5 h-5 group-hover:text-white transition-colors" />
                </div>

            </div>
        </div>
    );
}
