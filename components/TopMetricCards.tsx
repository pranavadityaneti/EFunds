'use client';

import { TrendingUp, TrendingDown, DollarSign, Users, FileText, Percent } from 'lucide-react';
import { topMetrics, formatCurrency, formatNumber } from '@/lib/loan-mock-data';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

// Mini chart data
const leadsChartData = [
    { value: 30 }, { value: 45 }, { value: 35 }, { value: 55 }, { value: 40 }, { value: 60 }, { value: 50 }, { value: 70 }, { value: 65 }, { value: 80 }
];

const loansChartData = [
    { value: 20 }, { value: 35 }, { value: 45 }, { value: 40 }, { value: 55 }, { value: 50 }, { value: 65 }, { value: 60 }, { value: 75 }, { value: 85 }
];

interface SmallCardProps {
    title: string;
    value: string;
    change: number;
    icon: React.ComponentType<{ className?: string }>;
    delay: number;
}

function SmallCard({ title, value, change, icon: Icon, delay }: SmallCardProps) {
    const isPositive = change >= 0;

    return (
        <div
            className="bg-white rounded-2xl p-4 transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-1 opacity-0 animate-fadeInUp"
            style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)', animationDelay: `${delay}s` }}
        >
            <div className="flex items-center justify-between mb-2">
                <Icon className="w-4 h-4 text-gray-400" />
                <div className={`flex items-center gap-0.5 text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(change)}%
                </div>
            </div>
            <p className="text-xl font-semibold text-gray-900 tracking-tight">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{title}</p>
        </div>
    );
}

interface MainCardProps {
    title: string;
    value: string;
    change: number;
    subtitle: string;
    bgColor: string;
    chartColor: string;
    chartData: { value: number }[];
    delay: number;
}

function MainCard({ title, value, change, subtitle, bgColor, chartColor, chartData, delay }: MainCardProps) {
    const isPositive = change >= 0;

    return (
        <div
            className={`${bgColor} rounded-2xl p-6 flex-1 relative overflow-hidden transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-1 opacity-0 animate-fadeInUp min-h-[180px]`}
            style={{ animationDelay: `${delay}s` }}
        >
            {/* Content */}
            <div className="relative z-10">
                <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                <p className="text-3xl font-bold text-gray-900 tracking-tight mb-1">{value}</p>
                <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {Math.abs(change)}%
                    </div>
                    <span className="text-sm text-gray-500">{subtitle}</span>
                </div>
            </div>

            {/* Larger Chart - Bottom portion of card */}
            <div className="absolute bottom-0 left-0 right-0 h-24">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id={`gradient-${title.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={chartColor} stopOpacity={0.5} />
                                <stop offset="100%" stopColor={chartColor} stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={chartColor}
                            strokeWidth={2.5}
                            fill={`url(#gradient-${title.replace(/\s/g, '')})`}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default function TopMetricCards() {
    const metrics = topMetrics;
    const conversionRate = ((metrics.approvedPayouts / metrics.totalLeadsThisMonth) * 100).toFixed(1);

    const smallCards = [
        {
            title: 'Total Payouts',
            value: formatCurrency(metrics.totalPayoutsThisMonth),
            change: metrics.payoutsChange,
            icon: DollarSign,
        },
        {
            title: 'Payout Cases',
            value: formatNumber(metrics.payoutCases),
            change: metrics.payoutCasesChange,
            icon: FileText,
        },
        {
            title: 'Active Partners',
            value: formatNumber(metrics.totalPartners),
            change: metrics.partnersChange,
            icon: Users,
        },
        {
            title: 'Conversion Rate',
            value: `${conversionRate}%`,
            change: 5.2,
            icon: Percent,
        },
    ];

    return (
        <div className="flex gap-4">
            {/* Main Cards Section - 2 cards side by side */}
            <div className="flex gap-4 flex-[2]">
                <MainCard
                    title="Total Leads"
                    value={formatNumber(metrics.totalLeadsThisMonth)}
                    change={metrics.totalLeadsChange}
                    subtitle="this month"
                    bgColor="bg-orange-50"
                    chartColor="#f97316"
                    chartData={leadsChartData}
                    delay={0.05}
                />
                <MainCard
                    title="Approved Loans"
                    value={formatCurrency(metrics.totalApprovedLoanAmount)}
                    change={metrics.approvedLoanChange}
                    subtitle="this month"
                    bgColor="bg-green-50"
                    chartColor="#22c55e"
                    chartData={loansChartData}
                    delay={0.1}
                />
            </div>

            {/* Small Cards Section - 2x2 Grid */}
            <div className="grid grid-cols-2 gap-4 flex-1">
                {smallCards.map((card, index) => (
                    <SmallCard key={index} {...card} delay={0.15 + index * 0.05} />
                ))}
            </div>
        </div>
    );
}
