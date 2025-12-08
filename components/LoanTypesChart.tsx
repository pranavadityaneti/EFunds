'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { loanTypes } from '@/lib/loan-mock-data';

export default function LoanTypesChart() {
    const data = loanTypes;

    return (
        <div className="bg-white rounded-2xl p-6 transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-1 opacity-0 animate-fadeInUp stagger-3" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Loan Types</h3>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                        <defs>
                            <linearGradient id="orangeGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#f97316" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#fb923c" stopOpacity={1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="0" stroke="#f3f4f6" horizontal={true} vertical={false} />
                        <XAxis type="number" stroke="#9CA3AF" style={{ fontSize: '12px' }} axisLine={false} tickLine={false} />
                        <YAxis
                            type="category"
                            dataKey="name"
                            width={130}
                            stroke="#6B7280"
                            style={{ fontSize: '12px' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(249, 115, 22, 0.05)' }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm">
                                            <p className="font-medium">{payload[0].payload.name}</p>
                                            <p className="text-gray-300">
                                                {payload[0].value} applications
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="applications" fill="url(#orangeGradient)" radius={[0, 6, 6, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
