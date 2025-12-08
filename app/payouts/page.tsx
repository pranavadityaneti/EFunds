'use client';

import DataTable, { Column } from '@/components/DataTable';
import HeroBanner from '@/components/HeroBanner';
import { Wallet } from 'lucide-react';

interface Payout {
    id: string;
    partnerId: string;
    partnerName: string;
    amount: string;
    status: string;
    processedDate: string;
    bank: string;
}

const mockPayouts: Payout[] = [
    { id: 'PO0001245', partnerId: 'DIGI0007360', partnerName: 'SHARATH', amount: '₹12,500', status: 'Completed', processedDate: '08/12/2025', bank: 'HDFC Bank' },
    { id: 'PO0001244', partnerId: 'DIGI0007358', partnerName: 'NAVEEN SINGH', amount: '₹8,750', status: 'Completed', processedDate: '07/12/2025', bank: 'ICICI Bank' },
    { id: 'PO0001243', partnerId: 'DIGI0007355', partnerName: 'GAMINI ANJAIAH', amount: '₹15,000', status: 'Processing', processedDate: '07/12/2025', bank: 'SBI' },
    { id: 'PO0001242', partnerId: 'DIGI0007350', partnerName: 'RAJENDRAN', amount: '₹6,250', status: 'Completed', processedDate: '06/12/2025', bank: 'Axis Bank' },
    { id: 'PO0001241', partnerId: 'DIGI0007348', partnerName: 'BHANU CHANDU', amount: '₹9,800', status: 'Failed', processedDate: '06/12/2025', bank: 'HDFC Bank' },
    { id: 'PO0001240', partnerId: 'DIGI0007345', partnerName: 'PRAKASH REDDY', amount: '₹22,000', status: 'Completed', processedDate: '05/12/2025', bank: 'Kotak' },
];

const columns: Column<Payout>[] = [
    { key: 'id', header: 'Payout ID', render: (item) => <span className="text-orange-600 font-medium">{item.id}</span> },
    { key: 'partnerId', header: 'Partner ID' },
    { key: 'partnerName', header: 'Partner Name', render: (item) => <span className="text-blue-600">{item.partnerName}</span> },
    { key: 'amount', header: 'Amount', render: (item) => <span className="font-semibold text-gray-900">{item.amount}</span> },
    {
        key: 'status',
        header: 'Status',
        render: (item) => {
            const colors: Record<string, string> = {
                'Completed': 'bg-green-100 text-green-700',
                'Processing': 'bg-orange-100 text-orange-700',
                'Failed': 'bg-red-100 text-red-700',
            };
            return (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[item.status] || 'bg-gray-100 text-gray-700'}`}>
                    {item.status}
                </span>
            );
        }
    },
    { key: 'processedDate', header: 'Processed Date' },
    { key: 'bank', header: 'Bank' },
];

export default function PayoutsPage() {
    return (
        <div>
            <HeroBanner
                title="Payouts"
                subtitle="Track all partner payouts and transactions"
                badges={['Secure Payments', 'Fast Processing']}
                icon={Wallet}
            />
            <DataTable
                title=""
                columns={columns}
                data={mockPayouts}
                searchPlaceholder="Search payouts..."
                showExport={true}
                showFilters={true}
            />
        </div>
    );
}
