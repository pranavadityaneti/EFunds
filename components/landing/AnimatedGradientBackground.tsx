"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

interface AnimatedGradientBackgroundProps {
    startingGap?: number;
    Breathing?: boolean;
    gradientColors?: string[];
    gradientStops?: number[];
    animationSpeed?: number;
    breathingRange?: number;
    containerStyle?: React.CSSProperties;
    containerClassName?: string;
    topOffset?: number;
    enableSunrise?: boolean;
}

const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({
    startingGap = 125,
    Breathing = false,
    gradientColors = [
        "#0A0A0A",
        "#f97316",
        "#fb923c",
        "#fdba74",
        "#fed7aa",
        "#fff7ed",
        "#ffffff"
    ],
    gradientStops = [30, 45, 55, 65, 75, 85, 100],
    animationSpeed = 0.02,
    breathingRange = 5,
    containerStyle = {},
    topOffset = 0,
    containerClassName = "",
    gradientPosition = "50% 20%",
    enableSunrise = false,
}) => {
    if (gradientColors.length !== gradientStops.length) {
        throw new Error(
            `GradientColors and GradientStops must have the same length.`
        );
    }

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let animationFrame: number;
        let width = startingGap;
        let directionWidth = 1;

        // Sunrise animation state
        let sunriseOffset = enableSunrise ? 50 : 0; // Start 50% lower than target

        const animateGradient = () => {
            if (width >= startingGap + breathingRange) directionWidth = -1;
            if (width <= startingGap - breathingRange) directionWidth = 1;

            if (!Breathing) directionWidth = 0;
            width += directionWidth * animationSpeed;

            // Handle Sunrise
            if (enableSunrise && sunriseOffset > 0) {
                sunriseOffset -= 0.3; // Rise speed
                if (sunriseOffset < 0) sunriseOffset = 0;
            }

            const gradientStopsString = gradientStops
                .map((stop, index) => `${gradientColors[index]} ${stop}%`)
                .join(", ");

            // Parse position to apply offset
            // Assumes format "X% Y%"
            let currentGradientPosition = gradientPosition;
            if (enableSunrise && sunriseOffset > 0) {
                const parts = gradientPosition.split(" ");
                if (parts.length === 2 && parts[1].includes("%")) {
                    const x = parts[0];
                    const yVal = parseFloat(parts[1]);
                    currentGradientPosition = `${x} ${yVal + sunriseOffset}%`;
                }
            }

            const gradient = `radial-gradient(${width}% ${width + topOffset}% at ${currentGradientPosition}, ${gradientStopsString})`;

            if (containerRef.current) {
                containerRef.current.style.background = gradient;
            }

            animationFrame = requestAnimationFrame(animateGradient);
        };

        animationFrame = requestAnimationFrame(animateGradient);

        return () => cancelAnimationFrame(animationFrame);
    }, [startingGap, Breathing, gradientColors, gradientStops, animationSpeed, breathingRange, topOffset, gradientPosition, enableSunrise]);

    return (
        <motion.div
            key="animated-gradient-background"
            initial={{
                opacity: 0,
                scale: 1.5,
            }}
            animate={{
                opacity: 1,
                scale: 1,
                transition: {
                    duration: 2,
                    ease: [0.25, 0.1, 0.25, 1],
                },
            }}
            className={`absolute inset-0 overflow-hidden pointer-events-none ${containerClassName}`}
            style={{
                // maskImage: "linear-gradient(to bottom, transparent 0%, black 40%)",
                // WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 40%)",
            }}
        >
            <div
                ref={containerRef}
                style={containerStyle}
                className="absolute inset-0 transition-transform"
            />
        </motion.div>
    );
};

export default AnimatedGradientBackground;
