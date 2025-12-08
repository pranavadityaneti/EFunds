'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { User, Settings as SettingsIcon, ChevronLeft } from 'lucide-react';

const settingsNavItems = [
    { href: '/settings/profile', icon: User, label: 'Profile' },
    { href: '/settings/dashboard', icon: SettingsIcon, label: 'Dashboard Settings' },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-[80vh]">
            {/* Back to Dashboard */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
            >
                <ChevronLeft className="w-4 h-4" />
                Back to Dashboard
            </Link>

            <div className="flex gap-8">
                {/* Settings Sidebar */}
                <div className="w-64 flex-shrink-0">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
                    <nav className="space-y-1">
                        {settingsNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                            ? 'bg-[#f48b3b] text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
}
