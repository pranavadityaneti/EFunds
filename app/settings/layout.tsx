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
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4 sm:mb-6 transition-colors"
            >
                <ChevronLeft className="w-4 h-4" />
                Back to Dashboard
            </Link>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                {/* Settings Sidebar - Horizontal on mobile, vertical on desktop */}
                <div className="w-full lg:w-64 flex-shrink-0">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Settings</h1>
                    <nav className="flex lg:flex-col gap-2 lg:space-y-1 overflow-x-auto pb-2 lg:pb-0">
                        {settingsNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${isActive
                                        ? 'bg-[#f48b3b] text-white'
                                        : 'text-gray-600 hover:bg-gray-100 bg-gray-50 lg:bg-transparent'
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 lg:w-5 lg:h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                    {children}
                </div>
            </div>
        </div>
    );
}
