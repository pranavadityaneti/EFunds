'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { bankData } from '@/lib/loan-mock-data';

export default function BankWiseChart() {
    const data = bankData;

    return (
        <div className="bg-white rounded-2xl p-6 transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-1 opacity-0 animate-fadeInUp stagger-5" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Bank-wise Applications</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 10, left: 0, bottom: 60 }}
                    >
                        <defs>
                            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                                <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.8} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="0" stroke="#f3f4f6" horizontal={true} vertical={false} />
                        <XAxis
                            dataKey="bank"
                            angle={-45}
                            textAnchor="end"
                            height={70}
                            interval={0}
                            stroke="#6B7280"
                            style={{ fontSize: '11px' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} axisLine={false} tickLine={false} />
                        <Tooltip
                            cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm">
                                            <p className="font-medium">{payload[0].payload.bank}</p>
                                            <p className="text-gray-300">
                                                {payload[0].value} applications
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="applications" fill="url(#blueGradient)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
