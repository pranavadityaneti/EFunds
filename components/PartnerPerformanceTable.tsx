'use client';

import { partnerPerformance, formatCurrency, formatNumber } from '@/lib/loan-mock-data';
import { Users, UserPlus, TrendingUp, Clock, DollarSign } from 'lucide-react';

export default function PartnerPerformanceTable() {
    const data = partnerPerformance;

    const metrics = [
        {
            label: 'Total Partners',
            value: formatNumber(data.totalPartnerCount),
            icon: Users,
        },
        {
            label: 'Sub-Partners',
            value: formatNumber(data.totalSubPartnersCount),
            icon: Users,
        },
        {
            label: 'New Partners',
            value: formatNumber(data.newlyOnboardedPartners),
            icon: UserPlus,
        },
        {
            label: 'Partner Leads',
            value: formatNumber(data.totalLeadsFromPartners),
            icon: TrendingUp,
        },
        {
            label: 'Pending Approval',
            value: formatNumber(data.pendingApprovalPartners),
            icon: Clock,
        },
        {
            label: 'Total Disbursed',
            value: formatCurrency(data.totalDisbursedAmount),
            icon: DollarSign,
        },
    ];

    return (
        <div className="bg-white rounded-2xl p-6 transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-1 opacity-0 animate-fadeInUp stagger-4" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Partner Analytics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {metrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                        <div key={index} className="text-center group">
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gray-50 mb-3 transition-all duration-200 group-hover:bg-orange-50 group-hover:scale-110">
                                <Icon className="w-5 h-5 text-gray-500 transition-colors group-hover:text-orange-500" />
                            </div>
                            <p className="text-2xl font-semibold text-gray-900 mb-1">{metric.value}</p>
                            <p className="text-xs text-gray-500">{metric.label}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
