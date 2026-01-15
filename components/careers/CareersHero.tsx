"use client";

import { motion } from "framer-motion";

// Placeholder avatars - using unsplash distinct faces
const avocados = [
    { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop", x: "15%", y: "20%", delay: 0 },
    { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop", x: "80%", y: "15%", delay: 1 },
    { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop", x: "25%", y: "65%", delay: 2 },
    { src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop", x: "70%", y: "70%", delay: 0.5 },
    { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop", x: "50%", y: "10%", delay: 1.5 },
    { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop", x: "10%", y: "50%", delay: 2.5 },
    { src: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop", x: "85%", y: "45%", delay: 1.2 },
];

export default function CareersHero() {
    return (
        <section className="relative w-full h-[600px] overflow-hidden rounded-[2rem] mx-auto max-w-[95%] lg:max-w-7xl mt-6 lg:mt-10">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-200 via-orange-100 to-orange-400 opacity-90" />

            {/* Noise overlay texture for that 'grainy' look from reference */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

            {/* Floating Avatars */}
            {avocados.map((avatar, i) => (
                <motion.div
                    key={i}
                    className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-white/30 shadow-lg"
                    style={{ left: avatar.x, top: avatar.y }}
                    initial={{ y: 0 }}
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: avatar.delay
                    }}
                >
                    <img src={avatar.src} alt="Team member" className="w-full h-full object-cover" />
                </motion.div>
            ))}

            {/* Central Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-sm"
                >
                    Search for your next job
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white/90 text-lg md:text-xl max-w-lg font-medium drop-shadow-sm"
                >
                    When you're searching for a job, there are a few things you can do to get the most out of your search
                </motion.p>
            </div>
        </section>
    );
}
