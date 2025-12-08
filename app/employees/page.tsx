'use client';

import DataTable, { Column } from '@/components/DataTable';
import HeroBanner from '@/components/HeroBanner';
import { Eye, Users } from 'lucide-react';

interface Employee {
    id: string;
    name: string;
    mobile: string;
    altMobile: string;
    email: string;
    createdDate: string;
    status: string;
}

const mockEmployees: Employee[] = [
    { id: 'DIGI-EMP00496', name: 'KASHIVOJWALA VAMSHI', mobile: '9885544335', altMobile: '7799003230', email: 'vamshi47@gmail.com', createdDate: '05/12/2025', status: 'Active' },
    { id: 'DIGI-EMP00495', name: 'VADDEVAN ANJANEYULU', mobile: '8074985009', altMobile: '9000233883', email: 'anji.vaddevan@gmail.com', createdDate: '03/12/2025', status: 'Active' },
    { id: 'DIGI-EMP00494', name: 'NARAGONI MAHESH', mobile: '7780761778', altMobile: '9533563462', email: 'mahesh.naragoni@gmail...', createdDate: '03/12/2025', status: 'Active' },
    { id: 'DIGI-EMP00493', name: 'CHINTHA GANESH KUMAR', mobile: '8897050878', altMobile: '8142890109', email: 'chinthaganesh48@gmail.c...', createdDate: '02/12/2025', status: 'Active' },
    { id: 'DIGI-EMP00492', name: 'KAMBAMPATI NARSIMHA', mobile: '9666105245', altMobile: '9063905245', email: 'kambampatinarsimha688...', createdDate: '02/12/2025', status: 'Active' },
    { id: 'DIGI-EMP00491', name: 'PRAKASH REDDY', mobile: '9876543210', altMobile: '8765432109', email: 'prakash.r@company.com', createdDate: '01/12/2025', status: 'Active' },
    { id: 'DIGI-EMP00490', name: 'SUNITHA DEVI', mobile: '8765432109', altMobile: '7654321098', email: 'sunitha.d@company.com', createdDate: '30/11/2025', status: 'Inactive' },
];

const columns: Column<Employee>[] = [
    { key: 'id', header: 'Employee-ID', render: (item) => <span className="text-orange-600 font-medium">{item.id}</span> },
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

export default function EmployeesPage() {
    return (
        <div>
            <HeroBanner
                title="Employees"
                subtitle="Manage your team members and their performance"
                badges={['Team Management', 'Performance Tracking']}
                icon={Users}
            />
            <DataTable
                title=""
                columns={columns}
                data={mockEmployees}
                searchPlaceholder="Search employees..."
                actionButton={{
                    label: 'Onboard Employee',
                    onClick: () => console.log('Onboard employee clicked'),
                }}
            />
        </div>
    );
}
