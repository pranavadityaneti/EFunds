'use client';

import DataTable, { Column } from '@/components/DataTable';
import HeroBanner from '@/components/HeroBanner';
import { TrendingUp } from 'lucide-react';

interface Lead {
    id: string;
    name: string;
    mobile: string;
    pan: string;
    createdDate: string;
    leadStatus: string;
    payoutStatus: string;
    loanType: string;
    partnerId: string;
    partnerName: string;
}

const mockLeads: Lead[] = [
    { id: 'DL0002448', name: 'ABHISHEK', mobile: '9853838739', pan: 'AOEPA7062H', createdDate: '08/12/2025', leadStatus: 'Details Pending', payoutStatus: 'Not Initiated', loanType: 'N/A', partnerId: 'DIGI0007360', partnerName: 'SHARATH' },
    { id: 'DL0002447', name: 'TEST ONE', mobile: '8186929555', pan: 'MOLPK1234E', createdDate: '08/12/2025', leadStatus: 'Disbursed', payoutStatus: 'Approved', loanType: 'Personal Loan', partnerId: 'DIGI0007360', partnerName: 'SHARATH' },
    { id: 'DL0002446', name: 'TEST', mobile: '8282737278', pan: 'AAKPE8656T', createdDate: '08/12/2025', leadStatus: 'Details Pending', payoutStatus: 'Not Initiated', loanType: 'N/A', partnerId: 'DIGI0007360', partnerName: 'SHARATH' },
    { id: 'DL0002445', name: 'NAVEEN KUMAR', mobile: '9597896080', pan: 'APXPN0712L', createdDate: '08/12/2025', leadStatus: 'Details Pending', payoutStatus: 'Not Initiated', loanType: 'N/A', partnerId: 'DIGI0000001', partnerName: 'N/A' },
    { id: 'DL0002444', name: 'SANGAYYA', mobile: '9739187447', pan: 'GPNPS1907G', createdDate: '07/12/2025', leadStatus: 'Details Pending', payoutStatus: 'Not Initiated', loanType: 'Personal Loan', partnerId: 'DIGI0007338', partnerName: 'NAGARAJ' },
    { id: 'DL0002443', name: 'RAMESH KUMAR', mobile: '8976543210', pan: 'BKLPN1234H', createdDate: '07/12/2025', leadStatus: 'Under Process', payoutStatus: 'Pending', loanType: 'Business Loan', partnerId: 'DIGI0007335', partnerName: 'PRIYA' },
    { id: 'DL0002442', name: 'SURESH REDDY', mobile: '7654321098', pan: 'CNOPS5678K', createdDate: '06/12/2025', leadStatus: 'Approved', payoutStatus: 'Initiated', loanType: 'Personal Loan', partnerId: 'DIGI0007332', partnerName: 'VIKRAM' },
];

const columns: Column<Lead>[] = [
    { key: 'id', header: 'Lead ID', render: (item) => <span className="text-orange-600 font-medium">{item.id}</span> },
    { key: 'name', header: 'Name', render: (item) => <span className="text-blue-600">{item.name}</span> },
    { key: 'mobile', header: 'Mobile' },
    { key: 'pan', header: 'PAN' },
    { key: 'createdDate', header: 'Created Date' },
    {
        key: 'leadStatus',
        header: 'Lead Status',
        render: (item) => {
            const colors: Record<string, string> = {
                'Disbursed': 'bg-green-100 text-green-700',
                'Approved': 'bg-blue-100 text-blue-700',
                'Under Process': 'bg-orange-100 text-orange-700',
                'Details Pending': 'bg-gray-100 text-gray-700',
            };
            return (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[item.leadStatus] || 'bg-gray-100 text-gray-700'}`}>
                    {item.leadStatus}
                </span>
            );
        }
    },
    { key: 'payoutStatus', header: 'Payout Status' },
    { key: 'loanType', header: 'Loan Type' },
    { key: 'partnerId', header: 'Partner ID' },
    { key: 'partnerName', header: 'Partner Name' },
];

export default function LeadsPage() {
    return (
        <div>
            <HeroBanner
                title="Leads"
                subtitle="Manage and track all your loan leads in one place"
                badges={['Real-time Tracking', 'Smart Filters']}
                icon={TrendingUp}
            />
            <DataTable
                title=""
                columns={columns}
                data={mockLeads}
                searchPlaceholder="Search leads in DigiLoans CRM"
                showFilters={true}
                showExport={true}
            />
        </div>
    );
}
