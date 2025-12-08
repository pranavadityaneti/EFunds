'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { applicationLoans } from '@/lib/loan-mock-data';

export default function ApplicationLoansChart() {
    const data = applicationLoans;

    return (
        <div className="bg-white rounded-2xl p-6 transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-1 opacity-0 animate-fadeInUp stagger-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Application Loans</h3>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 5, right: 20, left: 10, bottom: 50 }}
                    >
                        <defs>
                            <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#22c55e" stopOpacity={1} />
                                <stop offset="100%" stopColor="#4ade80" stopOpacity={0.8} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="0" stroke="#f3f4f6" horizontal={true} vertical={false} />
                        <XAxis
                            dataKey="type"
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            stroke="#6B7280"
                            style={{ fontSize: '12px' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} axisLine={false} tickLine={false} />
                        <Tooltip
                            cursor={{ fill: 'rgba(34, 197, 94, 0.05)' }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm">
                                            <p className="font-medium">{payload[0].payload.type}</p>
                                            <p className="text-gray-300">
                                                {payload[0].value} loans
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="count" fill="url(#greenGradient)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
