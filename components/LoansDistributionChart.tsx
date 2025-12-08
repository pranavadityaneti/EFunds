'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { loansDistribution } from '@/lib/loan-mock-data';

export default function LoansDistributionChart() {
    const data = loansDistribution;
    const total = data.reduce((sum, item) => sum + item.value, 0);

    // Softer, more harmonious color palette
    const colors = ['#f97316', '#a855f7', '#3b82f6', '#22c55e', '#eab308', '#06b6d4', '#ef4444'];

    return (
        <div className="bg-white rounded-2xl p-6 transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-1 opacity-0 animate-fadeInUp stagger-2" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Loans Distribution</h3>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={90}
                            paddingAngle={3}
                            dataKey="value"
                            strokeWidth={0}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0];
                                    const percentage = ((data.value as number / total) * 100).toFixed(1);
                                    return (
                                        <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm">
                                            <p className="font-medium">{data.name}</p>
                                            <p className="text-gray-300">
                                                {data.value} ({percentage}%)
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            content={({ payload }) => (
                                <div className="flex flex-wrap gap-4 justify-center mt-4">
                                    {payload?.map((entry, index) => (
                                        <div key={`legend-${index}`} className="flex items-center gap-2">
                                            <div
                                                className="w-2.5 h-2.5 rounded-full"
                                                style={{ backgroundColor: entry.color }}
                                            />
                                            <span className="text-xs text-gray-600 font-medium">{entry.value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
