'use client';

import DataTable, { Column } from '@/components/DataTable';
import HeroBanner from '@/components/HeroBanner';
import { FileText } from 'lucide-react';

interface Application {
    id: string;
    name: string;
    mobile: string;
    status: string;
    createdDate: string;
    loanType: string;
    partnerId: string;
}

const mockApplications: Application[] = [
    { id: 'SP-PL-00000604', name: 'SUSHMITA LOKESH POOJARI', mobile: '8999374921', status: 'FINANCIER SELECTED', createdDate: '06/12/2025', loanType: 'PersonalLoan', partnerId: 'DIGI0007143' },
    { id: 'SP-PL-00000603', name: 'ROHIT KUMAR', mobile: '8434806068', status: 'REJECTED', createdDate: '05/12/2025', loanType: 'PersonalLoan', partnerId: 'DIGI0007351' },
    { id: 'SP-PL-00000602', name: 'VIKAS SAXENA', mobile: '8851780178', status: 'REJECTED', createdDate: '04/12/2025', loanType: 'PersonalLoan', partnerId: 'DIGI0007347' },
    { id: 'SP-PL-00000599', name: 'ARUNA KUMARI TOGARAPU', mobile: '9490435833', status: 'FINANCIER SELECTED', createdDate: '03/12/2025', loanType: 'PersonalLoan', partnerId: 'N/A' },
    { id: 'SP-PL-00000598', name: 'ARUNA KUMARI TOGARAPU', mobile: '9490435833', status: 'FINANCIER SELECTED', createdDate: '01/12/2025', loanType: 'PersonalLoan', partnerId: 'DIGI0007328' },
    { id: 'SP-PL-00000597', name: 'PRADEEP SHARMA', mobile: '9876543210', status: 'APPROVED', createdDate: '30/11/2025', loanType: 'BusinessLoan', partnerId: 'DIGI0007320' },
    { id: 'SP-PL-00000596', name: 'MEENA KUMARI', mobile: '8765432109', status: 'UNDER REVIEW', createdDate: '29/11/2025', loanType: 'PersonalLoan', partnerId: 'DIGI0007315' },
];

const columns: Column<Application>[] = [
    { key: 'id', header: 'Application ID', render: (item) => <span className="text-orange-600 font-medium">{item.id}</span> },
    { key: 'name', header: 'Name', render: (item) => <span className="text-blue-600">{item.name}</span> },
    { key: 'mobile', header: 'Mobile' },
    {
        key: 'status',
        header: 'Status',
        render: (item) => {
            const colors: Record<string, string> = {
                'FINANCIER SELECTED': 'bg-green-500 text-white',
                'APPROVED': 'bg-blue-500 text-white',
                'REJECTED': 'bg-red-500 text-white',
                'UNDER REVIEW': 'bg-orange-500 text-white',
            };
            return (
                <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${colors[item.status] || 'bg-gray-100 text-gray-700'}`}>
                    {item.status}
                </span>
            );
        }
    },
    { key: 'createdDate', header: 'Created Date' },
    { key: 'loanType', header: 'Loan Type' },
    { key: 'partnerId', header: 'Partner ID/Employ...' },
];

export default function ApplicationsPage() {
    return (
        <div>
            <HeroBanner
                title="Applications"
                subtitle="Track loan applications from submission to approval"
                badges={['Fast Processing', 'Status Updates']}
                icon={FileText}
            />
            <DataTable
                title=""
                columns={columns}
                data={mockApplications}
                searchPlaceholder="DigiLoans CRM"
                showFilters={true}
            />
        </div>
    );
}
