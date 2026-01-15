"use client";

import { motion } from "framer-motion";
import { Building2, User, Users, DollarSign, Zap, BarChart3, FileText, Shield, Clock, TrendingUp, Smartphone } from "lucide-react";

interface FeatureItemProps {
    icon: React.ReactNode;
    text: string;
}

function FeatureItem({ icon, text }: FeatureItemProps) {
    return (
        <div className="flex items-center gap-3 transition-colors duration-300 group-hover:text-white/90 text-zinc-600">
            <span className="group-hover:text-white/80 text-[#f97316]">{icon}</span>
            <span className="text-sm font-medium">{text}</span>
        </div>
    );
}

interface BusinessCardProps {
    icon: React.ReactNode;
    bgGraphic: React.ReactNode;
    title: string;
    subtitle: string;
    description: string;
    features: { icon: React.ReactNode; text: string }[];
    onClick?: () => void;
}

function BusinessCard({
    icon,
    bgGraphic,
    title,
    subtitle,
    description,
    features,
    onClick,
}: BusinessCardProps) {
    return (
        <motion.div
            className="relative flex flex-col p-8 rounded-3xl overflow-hidden cursor-pointer group min-h-[500px] border-2 border-transparent transition-all duration-300 bg-gray-100 hover:bg-[#f97316] hover:shadow-2xl hover:shadow-orange-500/20 max-w-sm mx-auto w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            onClick={onClick}
        >
            {/* Background Graphic (Top Right) */}
            <div className="absolute top-4 right-4 text-zinc-900/5 group-hover:text-white/10 transition-colors duration-300 transform scale-150 origin-top-right pointer-events-none">
                {bgGraphic}
            </div>

            {/* Icon */}
            <div className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-white shadow-sm group-hover:bg-white/20 group-hover:shadow-none transition-all duration-300">
                <div className="text-[#f97316] group-hover:text-white transition-colors duration-300">
                    {icon}
                </div>
            </div>

            {/* Title & Subtitle */}
            <div className="relative z-10 mb-4">
                <h3 className="text-2xl md:text-3xl font-bold text-[#f97316] group-hover:text-white mb-2 transition-colors duration-300">
                    {title}
                </h3>
                <p className="text-zinc-500 group-hover:text-white/80 text-sm font-medium transition-colors duration-300">
                    {subtitle}
                </p>
            </div>

            {/* Description */}
            <p className="relative z-10 text-zinc-600 group-hover:text-white/90 text-base leading-relaxed mb-8 transition-colors duration-300">
                {description}
            </p>

            {/* CTA Button */}
            {/* CTA Button */}
            {/* CTA Button */}
            <div
                className="relative z-10 w-full py-4 rounded-xl font-bold text-base mb-8 transition-all duration-300 bg-white text-[#f97316] border border-[#f97316]/20 shadow-sm group-hover:bg-white group-hover:text-[#f97316] group-hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] text-center"
            >
                Learn More
            </div>

            {/* Features List */}
            <div className="relative z-10 space-y-4 mt-auto border-t border-zinc-200 group-hover:border-white/20 pt-6 transition-colors duration-300">
                {features.map((feature, index) => (
                    <FeatureItem key={index} icon={feature.icon} text={feature.text} />
                ))}
            </div>
        </motion.div>
    );
}

import { useRouter } from "next/navigation";

export default function LandingBusinessCards() {
    const router = useRouter();

    const handleB2BClick = () => {
        router.push("/B2B");
    };

    const handleB2CClick = () => {
        router.push("/B2C");
    };

    const b2bFeatures = [
        { icon: <Users className="w-4 h-4" />, text: "Dedicated Relationship Manager" },
        { icon: <DollarSign className="w-4 h-4" />, text: "Competitive Commission Rates" },
        { icon: <Clock className="w-4 h-4" />, text: "Same-day Payout Processing" },
        { icon: <BarChart3 className="w-4 h-4" />, text: "Real-time Performance Dashboard" },
    ];

    const b2cFeatures = [
        { icon: <Zap className="w-4 h-4" />, text: "Instant Loan Approval" },
        { icon: <FileText className="w-4 h-4" />, text: "Minimal Documentation" },
        { icon: <DollarSign className="w-4 h-4" />, text: "Transparent Interest Rates" },
        { icon: <Shield className="w-4 h-4" />, text: "100% Secure & Confidential" },
    ];

    return (
        <section className="py-16 lg:py-24 bg-zinc-950">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 bg-white/5 text-gray-400 rounded-full text-sm font-medium mb-4 uppercase tracking-widest">
                        Our Solutions
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Choose Your Path
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Whether you&apos;re a business partner or an individual customer,
                        we have the right lending solution for you.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 gap-8 justify-center items-stretch max-w-4xl mx-auto">
                    {/* B2B Card */}
                    <BusinessCard
                        icon={<Building2 className="w-8 h-8" strokeWidth={1.5} />}
                        bgGraphic={<TrendingUp className="w-48 h-48" strokeWidth={1} />}
                        title="For Partners"
                        subtitle="DSAs & Business Partners"
                        description="Scale your lending business with Efunds. Fast onboarding, dedicated support, and competitive payouts."
                        features={b2bFeatures}
                        onClick={handleB2BClick}
                    />

                    {/* B2C Card */}
                    <BusinessCard
                        icon={<User className="w-8 h-8" strokeWidth={1.5} />}
                        bgGraphic={<Smartphone className="w-48 h-48" strokeWidth={1} />}
                        title="For Customers"
                        subtitle="Individual Borrowers"
                        description="Quick loans with minimal paperwork. Transparent rates, flexible terms, and instant approval decisions."
                        features={b2cFeatures}
                        onClick={handleB2CClick}
                    />
                </div>
            </div>
        </section>
    );
}
