'use client';

import DataTable, { Column } from '@/components/DataTable';
import HeroBanner from '@/components/HeroBanner';
import { ClipboardCheck } from 'lucide-react';

interface PayoutRequest {
    id: string;
    partnerId: string;
    partnerName: string;
    amount: string;
    requestDate: string;
    status: string;
    leadId: string;
}

const mockPayoutRequests: PayoutRequest[] = [
    { id: 'PR0002150', partnerId: 'DIGI0007363', partnerName: 'GAMINI ANJAIAH', amount: '₹5,500', requestDate: '08/12/2025', status: 'Pending', leadId: 'DL0002448' },
    { id: 'PR0002149', partnerId: 'DIGI0007360', partnerName: 'SHARATH', amount: '₹12,000', requestDate: '08/12/2025', status: 'Approved', leadId: 'DL0002447' },
    { id: 'PR0002148', partnerId: 'DIGI0007355', partnerName: 'NAVEEN SINGH', amount: '₹8,250', requestDate: '07/12/2025', status: 'Pending', leadId: 'DL0002445' },
    { id: 'PR0002147', partnerId: 'DIGI0007350', partnerName: 'RAJENDRAN', amount: '₹6,800', requestDate: '07/12/2025', status: 'Rejected', leadId: 'DL0002442' },
    { id: 'PR0002146', partnerId: 'DIGI0007348', partnerName: 'BHANU CHANDU', amount: '₹9,500', requestDate: '06/12/2025', status: 'Approved', leadId: 'DL0002440' },
    { id: 'PR0002145', partnerId: 'DIGI0007345', partnerName: 'PRAKASH REDDY', amount: '₹15,750', requestDate: '05/12/2025', status: 'Processing', leadId: 'DL0002438' },
];

const columns: Column<PayoutRequest>[] = [
    { key: 'id', header: 'Request ID', render: (item) => <span className="text-orange-600 font-medium">{item.id}</span> },
    { key: 'partnerId', header: 'Partner ID' },
    { key: 'partnerName', header: 'Partner Name', render: (item) => <span className="text-blue-600">{item.partnerName}</span> },
    { key: 'leadId', header: 'Lead ID' },
    { key: 'amount', header: 'Amount', render: (item) => <span className="font-semibold text-gray-900">{item.amount}</span> },
    { key: 'requestDate', header: 'Request Date' },
    {
        key: 'status',
        header: 'Status',
        render: (item) => {
            const colors: Record<string, string> = {
                'Approved': 'bg-green-100 text-green-700',
                'Pending': 'bg-yellow-100 text-yellow-700',
                'Processing': 'bg-blue-100 text-blue-700',
                'Rejected': 'bg-red-100 text-red-700',
            };
            return (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[item.status] || 'bg-gray-100 text-gray-700'}`}>
                    {item.status}
                </span>
            );
        }
    },
];

export default function PayoutRequestsPage() {
    return (
        <div>
            <HeroBanner
                title="Payout Requests"
                subtitle="Manage and approve payout requests from partners"
                badges={['Quick Approvals', 'Transparent']}
                icon={ClipboardCheck}
            />
            <DataTable
                title=""
                columns={columns}
                data={mockPayoutRequests}
                searchPlaceholder="Search payout requests..."
                showFilters={true}
            />
        </div>
    );
}
