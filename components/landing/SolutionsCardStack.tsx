"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Brain, GitBranch, Zap, Cloud, ArrowRight, BarChart3, PieChart, TrendingUp, Activity, ShieldCheck } from "lucide-react";

// Solution Data - Exported to be used by parent for left column content
export const solutions = [
    {
        id: 1,
        icon: FileText,
        title: "Loan Origination",
        description: "End-to-end loan application workflows with automated KYC, document verification, and credit scoring.",
        gradient: "from-orange-400 to-amber-500",
        visualIcon: FileText,
        stats: "30% Faster processing"
    },
    {
        id: 2,
        icon: Brain,
        title: "AI-Powered Matching",
        description: "Smart borrower-lender matchmaking using trained ML models to enhance decision-making and efficiency.",
        gradient: "from-orange-500 to-red-500",
        visualIcon: Brain,
        stats: "95% Match accuracy"
    },
    {
        id: 3,
        icon: GitBranch,
        title: "Intelligent Routing",
        description: "Priority-based lead distribution and deep API integration with role-based access management.",
        gradient: "from-amber-400 to-orange-500",
        visualIcon: GitBranch,
        stats: "Real-time routing"
    },
    {
        id: 4,
        icon: Zap,
        title: "Built for Speed",
        description: "Plug-and-play integration reducing setup time from weeks to days with modular architecture.",
        gradient: "from-orange-500 to-yellow-500",
        visualIcon: Zap,
        stats: "< 200ms Latency"
    },
    {
        id: 5,
        icon: Cloud,
        title: "Flexible Deployment",
        description: "Deploy as secure Cloud SaaS, On-Premise, or custom hybrid solutions for enterprise needs.",
        gradient: "from-amber-500 to-orange-400",
        visualIcon: Cloud,
        stats: "99.99% Uptime"
    },
];

const initialCards = [
    { id: 1, contentId: 1 },
    { id: 2, contentId: 2 },
    { id: 3, contentId: 3 },
];

const positionStyles = [
    { scale: 1, y: 0, opacity: 1, zIndex: 3 },
    { scale: 0.94, y: -25, opacity: 0.6, zIndex: 2 },
    { scale: 0.88, y: -50, opacity: 0.3, zIndex: 1 },
];

// Animation now moves UPWARDS (negative Y) and scales slightly
const exitAnimation = {
    y: -400,
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.6, ease: [0.32, 0, 0.67, 0] as any }
};

const enterAnimation = {
    y: 50,
    scale: 0.8,
    opacity: 0,
    zIndex: 0
};

function SolutionVisual({ contentId, gradient }: { contentId: number; gradient: string }) {
    switch (contentId) {
        case 1: // Loan Origination
            return (
                <div className="relative w-full h-32 flex items-center justify-center">
                    <div className="relative w-24 h-32 bg-gray-50 rounded-lg border border-gray-200 flex flex-col p-3 gap-2 overflow-hidden shadow-sm shadow-orange-500/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "80%" }}
                            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
                            className="h-1.5 bg-orange-200 rounded-full"
                        />
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "60%" }}
                            transition={{ duration: 0.8, delay: 0.1, repeat: Infinity, repeatDelay: 1 }}
                            className="h-1.5 bg-orange-100 rounded-full"
                        />
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "70%" }}
                            transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, repeatDelay: 1 }}
                            className="h-1.5 bg-orange-50 rounded-full"
                        />
                        <div className="mt-auto flex justify-between">
                            <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                                <ShieldCheck className="w-4 h-4 text-orange-500" />
                            </div>
                            <div className="w-8 h-8 rounded-md bg-green-500/10 flex items-center justify-center">
                                <div className="w-4 h-2 bg-green-500 rounded-sm" />
                            </div>
                        </div>
                        {/* Scanning effect */}
                        <motion.div
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-0.5 bg-orange-400/30 blur-[1px] z-10"
                        />
                    </div>
                </div>
            );
        case 2: // AI Matching
            return (
                <div className="relative w-full h-32 flex items-center justify-center">
                    <div className="relative w-40 h-24">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 rounded-full bg-orange-400"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.3, 1, 0.3],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                }}
                                style={{
                                    left: `${20 + (i % 3) * 30}%`,
                                    top: `${20 + Math.floor(i / 3) * 50}%`,
                                }}
                            />
                        ))}
                        <svg className="absolute inset-0 w-full h-full">
                            <motion.path
                                d="M 40 40 L 80 40 L 120 80 L 40 80 Z"
                                fill="none"
                                stroke="url(#line-gradient)"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                                animate={{ strokeDashoffset: [0, -20] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                            <defs>
                                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#f97316" stopOpacity="0" />
                                    <stop offset="50%" stopColor="#f97316" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center backdrop-blur-sm border border-orange-500/20">
                            <Brain className="w-6 h-6 text-orange-500" />
                        </div>
                    </div>
                </div>
            );
        case 3: // Intelligent Routing
            return (
                <div className="relative w-full h-32 flex items-center justify-center px-8">
                    <div className="w-full flex justify-between items-center relative gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200">
                            <Activity className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="flex-1 h-[2px] bg-gray-100 relative overflow-hidden">
                            <motion.div
                                animate={{ left: ["-20%", "120%"] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center border border-orange-100">
                                <TrendingUp className="w-5 h-5 text-orange-500" />
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 opacity-50">
                                <PieChart className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            );
        case 4: // Built for Speed
            return (
                <div className="relative w-full h-32 flex items-center justify-center">
                    <div className="w-48 h-12 bg-gray-50 rounded-full border border-gray-100 flex items-center px-1 overflow-hidden relative">
                        <motion.div
                            initial={{ width: "10%" }}
                            animate={{ width: ["10%", "95%", "95%", "10%"] }}
                            transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
                            className="h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-end px-3 shadow-lg shadow-orange-500/20"
                        >
                            <Zap className="w-5 h-5 text-white fill-white" />
                        </motion.div>
                        <div className="absolute right-6 text-[10px] font-bold text-gray-300 tracking-widest uppercase">FAST</div>
                    </div>
                </div>
            );
        case 5: // Flexible Deployment
            return (
                <div className="relative w-full h-32 flex items-center justify-center">
                    <div className="relative w-32 h-32">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border border-dashed border-gray-200 rounded-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-3xl bg-white shadow-xl shadow-orange-500/10 border border-orange-50/50 flex items-center justify-center">
                                <Cloud className="w-8 h-8 text-orange-500" />
                            </div>
                        </div>
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0"
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white shadow-md border border-gray-100 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-sm bg-orange-400" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            );
        default:
            return null;
    }
}

function CardContent({ contentId }: { contentId: number }) {
    // Find solution by 1-based ID
    const data = solutions.find((s) => s.id === contentId) || solutions[0];
    const Icon = data.icon;

    return (
        <div className="flex h-full w-full flex-col relative bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border border-gray-100/50">
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />

            {/* Top Content */}
            <div className="p-10 pb-4 flex flex-col items-center text-center z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${data.gradient} flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20 ring-4 ring-white`}>
                    <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{data.title}</h3>
                <div className="px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Solution {data.id.toString().padStart(2, '0')}</p>
                </div>
            </div>

            {/* Middle Visual Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-transparent via-gray-50/30 to-transparent">
                <SolutionVisual contentId={data.id} gradient={data.gradient} />

                {/* Stat Badge */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                        {data.stats}
                    </span>
                </motion.div>
            </div>

            {/* Bottom Section */}
            <div className="p-8 pt-0 mt-auto text-center">
                <div className="h-[2px] w-12 bg-gray-100 mx-auto rounded-full" />
            </div>
        </div>
    );
}

function AnimatedCard({
    card,
    index,
}: {
    card: { id: number; contentId: number };
    index: number;
}) {
    const style = positionStyles[index];

    return (
        <motion.div
            layout
            key={card.id}
            initial={index === 2 ? enterAnimation : false}
            animate={{
                y: style.y,
                scale: style.scale,
                opacity: style.opacity,
                zIndex: style.zIndex,
            }}
            exit={exitAnimation}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                mass: 1.2
            }}
            style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                left: 0,
                right: 0,
                margin: "0 auto",
                transformOrigin: "bottom center", // Change to bottom center for more natural stacking
            }}
            className="group will-change-transform"
        >
            <CardContent contentId={card.contentId} />
        </motion.div>
    );
}

interface SolutionsCardStackProps {
    onIndexChange?: (index: number) => void;
}

export default function SolutionsCardStack({ onIndexChange }: SolutionsCardStackProps) {
    const [cards, setCards] = useState(initialCards);
    const [nextId, setNextId] = useState(4); // For React keys

    // Auto-cycle effect
    useEffect(() => {
        const interval = setInterval(() => {
            handleCycle();
        }, 5000); // 5 seconds cycle

        return () => clearInterval(interval);
    }, [cards]); // Re-set interval when cards change to avoid double skips

    const handleCycle = () => {
        setCards((prevCards) => {
            const topCard = prevCards[0];
            const lastCard = prevCards[prevCards.length - 1];

            // Cycle logic: 1->2->3->4->5->1
            const nextContentId = (lastCard.contentId % 5) + 1;

            // Calculate next active index for parent (The card that WILL BE revealed)
            // If top card is leaving, the next one (index 1) becomes active
            const nextActiveContentId = prevCards[1].contentId;

            if (onIndexChange) {
                // We use a timeout to sync better with animation
                setTimeout(() => onIndexChange(nextActiveContentId - 1), 200);
            }

            const newCard = { id: nextId, contentId: nextContentId };
            setNextId((prev) => prev + 1);

            // Remove top card and push new one
            return [...prevCards.slice(1), newCard];
        });
    };

    return (
        <div className="flex flex-col items-center justify-center w-full py-10 relative">
            {/* Gradient glow behind the stack */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/20 blur-[100px] -z-10 rounded-full" />

            {/* Card Stack Container */}
            <div className="relative w-full max-w-[340px] h-[480px]">
                <AnimatePresence mode="popLayout">
                    {cards.map((card, index) => (
                        <AnimatedCard
                            key={card.id}
                            card={card}
                            index={index}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* Manual control (Optional, keeping for accessibility/testing) */}
            <button
                onClick={handleCycle}
                className="sr-only"
                aria-label="Next Solution"
            >
                Next
            </button>
        </div>
    );
}
