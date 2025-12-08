'use client';

import { CheckCircle, LucideIcon } from 'lucide-react';

interface HeroBannerProps {
    title: string;
    subtitle: string;
    badges?: string[];
    icon?: LucideIcon;
}

export default function HeroBanner({
    title,
    subtitle,
    badges = [],
    icon: Icon
}: HeroBannerProps) {
    return (
        <div
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl h-40 sm:h-48 lg:h-56 mb-4 sm:mb-6 opacity-0 animate-fadeInUp"
            style={{
                background: 'linear-gradient(135deg, #f48b3b 0%, #e67a2a 50%, #d86a1a 100%)',
            }}
        >
            {/* Content */}
            <div className="relative z-10 p-4 sm:p-6 lg:p-8 h-full flex flex-col justify-center max-w-full sm:max-w-[70%] lg:max-w-[55%]">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">{title}</h1>
                <p className="text-sm sm:text-base text-white/80 mb-2 sm:mb-4 line-clamp-2">{subtitle}</p>

                {/* Badges - hidden on small mobile */}
                {badges.length > 0 && (
                    <div className="hidden sm:flex items-center gap-3 lg:gap-4 flex-wrap">
                        {badges.map((badge, index) => (
                            <div key={index} className="flex items-center gap-1.5 text-white/90">
                                <CheckCircle className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                                <span className="text-xs lg:text-sm font-medium">{badge}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Premium Icon with Glassmorphism - hidden on mobile */}
            <div className="hidden sm:flex absolute right-0 top-0 bottom-0 w-[35%] lg:w-[45%] pointer-events-none overflow-hidden items-center justify-center">
                {Icon && (
                    <div className="relative mr-4 lg:mr-12">
                        {/* Glassmorphism background */}
                        <div
                            className="w-20 h-20 lg:w-32 lg:h-32 rounded-2xl lg:rounded-3xl flex items-center justify-center"
                            style={{
                                background: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                            }}
                        >
                            <Icon className="w-10 h-10 lg:w-16 lg:h-16 text-white drop-shadow-lg" strokeWidth={1.5} />
                        </div>

                        {/* Decorative ring - hidden on tablet */}
                        <div
                            className="hidden lg:block absolute -inset-4 rounded-[2rem] opacity-30"
                            style={{
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                            }}
                        />
                    </div>
                )}

                {/* Premium abstract decorative elements */}
                <div
                    className="absolute -right-16 -top-16 w-40 lg:w-64 h-40 lg:h-64 rounded-full opacity-20"
                    style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)' }}
                />
                <div
                    className="absolute right-10 lg:right-20 -bottom-16 lg:-bottom-20 w-32 lg:w-48 h-32 lg:h-48 rounded-full opacity-15"
                    style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)' }}
                />

                {/* Floating elements - hidden on tablet */}
                <div className="hidden lg:block absolute right-8 top-6 text-white/30 text-2xl">✦</div>
                <div className="hidden lg:block absolute right-32 top-10 text-white/20 text-xl">✦</div>
                <div className="hidden lg:block absolute right-12 bottom-8 text-white/25 text-lg">✦</div>
            </div>

            {/* Subtle bottom gradient overlay */}
            <div
                className="absolute bottom-0 left-0 right-0 h-12 lg:h-16 pointer-events-none"
                style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.1) 0%, transparent 100%)'
                }}
            />
        </div>
    );
}
