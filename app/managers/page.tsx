'use client';

import DataTable, { Column } from '@/components/DataTable';
import HeroBanner from '@/components/HeroBanner';
import { Crown } from 'lucide-react';

interface Manager {
    id: string;
    name: string;
    mobile: string;
    email: string;
    designation: string;
}

const mockManagers: Manager[] = [
    { id: 'DIGI-EMP00409', name: 'TEST DEMO', mobile: '7569397733', email: 'test34@gmail.com', designation: 'AssistantManager' },
    { id: 'DIGI-EMP00286', name: 'SUBRATA SHARMA', mobile: '9177156408', email: 'saradamani@stardigiloan...', designation: 'LocationManager' },
    { id: 'DIGI-EMP00179', name: 'JAYA KRISHNA', mobile: '8801209715', email: 'Jai.krishna@stardigiloans....', designation: 'Location Manager' },
    { id: 'DIGI-EMP00046', name: 'T POORNACHARYULU', mobile: '9640840994', email: 'poorna.t@stardigiloans.co...', designation: 'LocationManager' },
    { id: 'DIGI-EMP00297', name: 'P PARDHASARADHI REDDY', mobile: '8142799991', email: 'pardha.reddy@stardigiloa...', designation: 'LocationManager' },
    { id: 'DIGI-EMP00150', name: 'VENKAT RAO', mobile: '9876543210', email: 'venkat.rao@company.com', designation: 'RegionalManager' },
    { id: 'DIGI-EMP00125', name: 'ANJALI SHARMA', mobile: '8765432109', email: 'anjali.sharma@company.com', designation: 'AssistantManager' },
];

const columns: Column<Manager>[] = [
    { key: 'id', header: 'Employee-ID', render: (item) => <span className="text-orange-600 font-medium">{item.id}</span> },
    { key: 'name', header: 'Full Name', render: (item) => <span className="text-blue-600">{item.name}</span> },
    { key: 'mobile', header: 'Mobile' },
    { key: 'email', header: 'Email' },
    { key: 'designation', header: 'Designation' },
];

export default function ManagersPage() {
    return (
        <div>
            <HeroBanner
                title="Manager Details"
                subtitle="View and manage your management team"
                badges={['Leadership', 'Team Oversight']}
                icon={Crown}
            />
            <DataTable
                title=""
                columns={columns}
                data={mockManagers}
                searchPlaceholder="Search..."
                actionButton={{
                    label: 'Onboard Manager',
                    onClick: () => console.log('Onboard manager clicked'),
                }}
            />
        </div>
    );
}
