"use client";

import { motion } from "framer-motion";

// 1. Timer Icon (Approvals in Minutes)
export const TimerIcon = () => {
    return (
        <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Clock Face */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full rounded-full border-4 border-orange-500/30 bg-gray-900/50 backdrop-blur-sm shadow-xl flex items-center justify-center relative"
            >
                {/* Ticks */}
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-3 bg-gray-600 rounded-full"
                        style={{
                            top: "10px",
                            left: "50%",
                            marginLeft: "-2px",
                            transformOrigin: "50% 54px", // (32 * 4 / 2) - padding roughly
                            transform: `rotate(${i * 30}deg)`
                        }}
                    />
                ))}

                {/* Minute Hand Animation */}
                <motion.div
                    className="absolute w-1 h-12 bg-orange-500 rounded-full origin-bottom"
                    style={{ bottom: "50%", left: "calc(50% - 2px)" }}
                    initial={{ rotate: 0 }}
                    whileInView={{ rotate: 360 * 2 + 30 }} // Spin twice then land on 1 o'clock (5 mins)
                    transition={{ duration: 2, ease: "circOut", delay: 0.2 }}
                />

                {/* Center Dot */}
                <div className="w-3 h-3 bg-white rounded-full z-10" />
            </motion.div>

            {/* "5 Min" Label Floating */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute -bottom-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
            >
                5 Mins
            </motion.div>
        </div>
    );
};

// 2. Shield Icon (Security)
export const ShieldIcon = () => {
    return (
        <div className="w-24 h-24 relative flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-full h-full text-orange-500" fill="none" stroke="currentColor" strokeWidth="1.5">
                <motion.path
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            </svg>
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="absolute text-white"
            >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
            </motion.div>
        </div>
    );
};

// 3. Network/Handshake Icon (Choice - 50+ Partners)
export const NetworkIcon = () => {
    const nodes = [0, 1, 2, 3, 4]; // Satellite nodes
    return (
        <div className="w-32 h-32 relative flex items-center justify-center">
            {/* Central Node */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 z-10"
            >
                <BuildingIcon className="w-6 h-6 text-white" />
            </motion.div>

            {/* Satellite Nodes */}
            {nodes.map((_, i) => {
                const angle = (i * 360) / nodes.length;
                const radius = 45;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                    <motion.div
                        key={i}
                        className="absolute"
                        initial={{ opacity: 0, x: 0, y: 0 }}
                        whileInView={{ opacity: 1, x, y }}
                        transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                    >
                        {/* Connecting Line */}
                        <motion.div
                            className="absolute bg-orange-500/20 h-0.5 origin-left"
                            style={{
                                width: radius,
                                top: "50%",
                                left: "50%",
                                transform: `rotate(${angle + 180}deg)`,
                                zIndex: -1
                            }}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
                        />
                        <div className="w-6 h-6 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center shadow-sm">
                            <div className="w-2 h-2 bg-orange-400 rounded-full" />
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

// 4. Transparency Icon (Zero Hidden Charges)
export const TransparencyIcon = () => {
    return (
        <div className="w-24 h-24 relative flex items-center justify-center">
            {/* Document */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-20 bg-white/10 border border-white/20 rounded-lg p-2 flex flex-col gap-1.5 backdrop-blur-sm"
            >
                {[80, 60, 90, 40].map((w, i) => (
                    <motion.div
                        key={i}
                        className="h-1.5 bg-gray-500/30 rounded-full"
                        style={{ width: `${w}%` }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${w}%` }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    />
                ))}
            </motion.div>

            {/* Magnifying Glass Revealing "0%" */}
            <motion.div
                initial={{ scale: 0, x: 20, y: 20 }}
                whileInView={{ scale: 1, x: 10, y: 10 }}
                transition={{ delay: 1, type: "spring" }}
                className="absolute w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
            >
                <span className="text-white font-bold text-sm">0%</span>
            </motion.div>
        </div>
    );
};


function BuildingIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
    )
}
