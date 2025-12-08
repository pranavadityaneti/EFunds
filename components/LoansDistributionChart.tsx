'use client';

import { useState } from 'react';
import { loansDistribution } from '@/lib/loan-mock-data';

export default function LoansDistributionChart() {
    const data = loansDistribution;
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Premium color palette with gradient pairs [main, light]
    const colorPairs = [
        ['#3b82f6', '#93c5fd'], // Blue
        ['#6366f1', '#a5b4fc'], // Indigo
        ['#22c55e', '#86efac'], // Green
        ['#10b981', '#6ee7b7'], // Emerald
        ['#f59e0b', '#fcd34d'], // Amber
        ['#6b7280', '#d1d5db'], // Gray
        ['#ef4444', '#fca5a5'], // Red
    ];

    // Calculate arc positions
    const radius = 120;
    const strokeWidth = 20;
    const gap = 0; // No gap between segments
    const centerX = 150;
    const centerY = 150;

    // Calculate total angle available (360 - gaps)
    const totalGapDegrees = gap * data.length;
    const availableDegrees = 360 - totalGapDegrees;

    // Calculate arc data
    let currentAngle = -90; // Start from top
    const arcs = data.map((item, index) => {
        const percentage = item.value / total;
        const sweepAngle = percentage * availableDegrees;
        const startAngle = currentAngle;
        const endAngle = startAngle + sweepAngle;
        currentAngle = endAngle + gap;

        return {
            ...item,
            startAngle,
            endAngle,
            percentage: (percentage * 100).toFixed(0),
            colors: colorPairs[index % colorPairs.length],
        };
    });

    // Convert degrees to radians and create arc path
    const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
        const rad = (angle * Math.PI) / 180;
        return {
            x: cx + r * Math.cos(rad),
            y: cy + r * Math.sin(rad),
        };
    };

    const createArcPath = (startAngle: number, endAngle: number, r: number) => {
        const start = polarToCartesian(centerX, centerY, r, startAngle);
        const end = polarToCartesian(centerX, centerY, r, endAngle);
        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

        return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
    };

    const hoveredData = hoveredIndex !== null ? arcs[hoveredIndex] : null;

    return (
        <div className="bg-white rounded-2xl p-6 transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-1 opacity-0 animate-fadeInUp stagger-2" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Loans Distribution</h3>

            <div className="flex flex-col items-center">
                {/* SVG Chart */}
                <div className="relative">
                    <svg width="300" height="300" viewBox="0 0 300 300">
                        <defs>
                            {arcs.map((arc, index) => (
                                <linearGradient
                                    key={`gradient-${index}`}
                                    id={`arcGradient-${index}`}
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="100%"
                                >
                                    <stop offset="0%" stopColor={arc.colors[0]} />
                                    <stop offset="100%" stopColor={arc.colors[1]} />
                                </linearGradient>
                            ))}
                        </defs>

                        {/* Arc segments */}
                        {arcs.map((arc, index) => (
                            <path
                                key={index}
                                d={createArcPath(arc.startAngle, arc.endAngle, radius)}
                                fill="none"
                                stroke={`url(#arcGradient-${index})`}
                                strokeWidth={strokeWidth}
                                strokeLinecap="butt"
                                className="transition-all duration-300 cursor-pointer"
                                style={{
                                    filter: hoveredIndex === index ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' : 'none',
                                    transform: hoveredIndex === index ? 'scale(1.02)' : 'scale(1)',
                                    transformOrigin: 'center',
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            />
                        ))}

                        {/* Center text */}
                        <g>
                            {hoveredData ? (
                                <>
                                    <text
                                        x={centerX}
                                        y={centerY - 15}
                                        textAnchor="middle"
                                        className="fill-gray-500 text-sm"
                                        style={{ fontSize: '14px' }}
                                    >
                                        {hoveredData.name}
                                    </text>
                                    <text
                                        x={centerX}
                                        y={centerY + 15}
                                        textAnchor="middle"
                                        className="fill-gray-900 font-bold"
                                        style={{ fontSize: '24px' }}
                                    >
                                        <tspan className="fill-current" style={{ fill: hoveredData.colors[0] }}>• </tspan>
                                        {hoveredData.value} [{hoveredData.percentage}%]
                                    </text>
                                </>
                            ) : (
                                <>
                                    <text
                                        x={centerX}
                                        y={centerY - 10}
                                        textAnchor="middle"
                                        className="fill-gray-500"
                                        style={{ fontSize: '14px' }}
                                    >
                                        Total
                                    </text>
                                    <text
                                        x={centerX}
                                        y={centerY + 20}
                                        textAnchor="middle"
                                        className="fill-gray-900 font-bold"
                                        style={{ fontSize: '28px' }}
                                    >
                                        {total}
                                    </text>
                                </>
                            )}
                        </g>
                    </svg>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-3 justify-center mt-2">
                    {arcs.map((arc, index) => (
                        <div
                            key={index}
                            className={`flex items-center gap-2 px-2 py-1 rounded-lg cursor-pointer transition-all ${hoveredIndex === index ? 'bg-gray-100' : ''
                                }`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ background: `linear-gradient(135deg, ${arc.colors[0]}, ${arc.colors[1]})` }}
                            />
                            <span className="text-xs text-gray-600 font-medium">{arc.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
