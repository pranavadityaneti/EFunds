'use client';

import { FileDown, Sparkles } from 'lucide-react';

export default function ReportsBanner() {
    const previousMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('default', { month: 'long' });

    return (
        <div className="grid grid-cols-2 gap-4 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            {/* Banner 1: Download Report */}
            <div
                className="relative overflow-hidden rounded-2xl p-6"
                style={{
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)',
                }}
            >
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-white/60 rounded-xl">
                            <FileDown className="w-5 h-5 text-amber-700" />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-amber-900 mb-2">{previousMonth} Report</h3>
                    <p className="text-sm text-amber-800/80 mb-4">
                        Download your monthly loan performance report with detailed analytics.
                    </p>
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-900 text-white font-medium text-sm rounded-xl hover:bg-amber-800 transition-all duration-200 hover:-translate-y-0.5">
                        <FileDown className="w-4 h-4" />
                        Download Report
                    </button>
                </div>

                {/* Decorative shapes */}
                <div className="absolute right-4 top-4 w-20 h-20 rounded-full bg-white/20" />
                <div className="absolute right-12 bottom-4 w-12 h-12 rounded-full bg-amber-600/20" />
            </div>

            {/* Banner 2: AI Custom Report */}
            <div
                className="relative overflow-hidden rounded-2xl p-6"
                style={{
                    background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 50%, #d8b4fe 100%)',
                }}
            >
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-white/60 rounded-xl">
                            <Sparkles className="w-5 h-5 text-purple-700" />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-purple-900 mb-2">Custom AI Report</h3>
                    <p className="text-sm text-purple-800/80 mb-4">
                        Customize your report with AI and get insights tailored to your needs.
                    </p>
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-900 text-white font-medium text-sm rounded-xl hover:bg-purple-800 transition-all duration-200 hover:-translate-y-0.5">
                        <Sparkles className="w-4 h-4" />
                        Generate with AI
                    </button>
                </div>

                {/* Decorative shapes */}
                <div className="absolute right-4 top-4 w-20 h-20 rounded-full bg-white/20" />
                <div className="absolute right-12 bottom-4 w-12 h-12 rounded-full bg-purple-600/20" />
            </div>
        </div>
    );
}
