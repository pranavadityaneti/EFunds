'use client';

import DataTable, { Column } from '@/components/DataTable';
import HeroBanner from '@/components/HeroBanner';
import { Eye, Handshake } from 'lucide-react';

interface Partner {
    id: string;
    name: string;
    mobile: string;
    altMobile: string;
    email: string;
    createdDate: string;
    status: string;
}

const mockPartners: Partner[] = [
    { id: 'DIGI0007363', name: 'GAMINI ANJAIAH', mobile: '7330743907', altMobile: 'N/A', email: 'N/A', createdDate: '08/12/2025', status: 'Active' },
    { id: 'DIGI0007362', name: 'NAVEEN SINGH SINGH', mobile: '7827903557', altMobile: '8810443872', email: '123naveensingh@gmail.c...', createdDate: '08/12/2025', status: 'Active' },
    { id: 'DIGI0007361', name: 'RAJENDRAN KAVIPRIYA', mobile: '9677324464', altMobile: '9677324494', email: 'kavipriya160486@gmail.c...', createdDate: '08/12/2025', status: 'Active' },
    { id: 'DIGI0007360', name: 'SHARATH', mobile: '7337366262', altMobile: 'N/A', email: 'sharath007@gmail.com', createdDate: '08/12/2025', status: 'Active' },
    { id: 'DIGI0007359', name: 'BHANU CHANDU', mobile: '9154812739', altMobile: 'N/A', email: 'N/A', createdDate: '07/12/2025', status: 'Active' },
    { id: 'DIGI0007358', name: 'RAVI TEJA', mobile: '9876543210', altMobile: '8765432109', email: 'ravi.teja@gmail.com', createdDate: '06/12/2025', status: 'Active' },
    { id: 'DIGI0007357', name: 'SURESH KUMAR', mobile: '8765432109', altMobile: 'N/A', email: 'suresh.k@gmail.com', createdDate: '05/12/2025', status: 'Inactive' },
];

const columns: Column<Partner>[] = [
    { key: 'id', header: 'Partner-ID', render: (item) => <span className="text-orange-600 font-medium">{item.id}</span> },
    { key: 'name', header: 'Full Name', render: (item) => <span className="text-blue-600">{item.name}</span> },
    { key: 'mobile', header: 'Mobile' },
    { key: 'altMobile', header: 'Alt Mobile' },
    { key: 'email', header: 'Email' },
    { key: 'createdDate', header: 'Created Date' },
    {
        key: 'viewQR',
        header: 'View QR',
        render: () => (
            <button className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors">
                <Eye className="w-4 h-4 text-blue-600" />
            </button>
        )
    },
    {
        key: 'status',
        header: 'Status',
        render: (item) => (
            <span className={`font-medium ${item.status === 'Active' ? 'text-green-600' : 'text-gray-500'}`}>
                {item.status}
            </span>
        )
    },
];

export default function PartnersPage() {
    return (
        <div>
            <HeroBanner
                title="Partners"
                subtitle="Manage your partner network and collaborations"
                badges={['Verified Partners', 'Quick Onboarding']}
                icon={Handshake}
            />
            <DataTable
                title=""
                columns={columns}
                data={mockPartners}
                searchPlaceholder="Let's make your partner search an effortless journey"
                showExport={true}
                actionButton={{
                    label: 'Onboard Partner',
                    onClick: () => console.log('Onboard partner clicked'),
                }}
            />
        </div>
    );
}
