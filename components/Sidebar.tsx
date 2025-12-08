'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, createContext, useContext, useEffect } from 'react';
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    Users,
    UserCheck,
    DollarSign,
    FileCheck,
    Bell,
    TrendingUp,
    Settings,
    LogOut,
    Menu,
    X,
    HelpCircle
} from 'lucide-react';

// Create context for sidebar state
const SidebarContext = createContext<{
    isCollapsed: boolean;
    isMobileOpen: boolean;
    toggleSidebar: () => void;
    toggleMobile: () => void;
    closeMobile: () => void;
}>({
    isCollapsed: false,
    isMobileOpen: false,
    toggleSidebar: () => { },
    toggleMobile: () => { },
    closeMobile: () => { },
});

export const useSidebar = () => useContext(SidebarContext);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Close mobile menu on route change
    const pathname = usePathname();
    useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname]);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <SidebarContext.Provider value={{
            isCollapsed,
            isMobileOpen,
            toggleSidebar: () => setIsCollapsed(!isCollapsed),
            toggleMobile: () => setIsMobileOpen(!isMobileOpen),
            closeMobile: () => setIsMobileOpen(false),
        }}>
            {children}
        </SidebarContext.Provider>
    );
}

// Mobile Header Component
export function MobileHeader() {
    const { toggleMobile } = useSidebar();

    return (
        <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#f48b3b] rounded-xl flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-900">EFundzz</span>
            </div>
            <button
                onClick={toggleMobile}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
                <Menu className="w-6 h-6 text-gray-600" />
            </button>
        </div>
    );
}

export default function Sidebar() {
    const pathname = usePathname();
    const { isCollapsed, isMobileOpen, toggleSidebar, closeMobile } = useSidebar();

    const navItems = [
        { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/leads', icon: TrendingUp, label: 'Leads' },
        { href: '/applications', icon: FileText, label: 'Applications' },
        { href: '/partners', icon: Briefcase, label: 'Partners' },
        { href: '/employees', icon: Users, label: 'Employees' },
        { href: '/managers', icon: UserCheck, label: 'Managers' },
        { href: '/payouts', icon: DollarSign, label: 'Payouts' },
        { href: '/payout-requests', icon: FileCheck, label: 'Payout Requests' },
        { href: '/notifications', icon: Bell, label: 'Notifications' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
                    onClick={closeMobile}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed left-0 top-0 h-full bg-white border-r border-gray-100 flex flex-col z-50 transition-all duration-300
                    ${isCollapsed ? 'w-20' : 'w-72'}
                    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0
                `}
            >
                {/* Logo and Toggle */}
                <div className={`flex items-center gap-3 py-5 ${isCollapsed ? 'px-4 justify-center' : 'px-6 justify-between'}`}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#f48b3b] rounded-xl flex items-center justify-center flex-shrink-0">
                            <DollarSign className="w-5 h-5 text-white" />
                        </div>
                        {!isCollapsed && (
                            <span className="text-lg font-semibold text-gray-900">
                                EFundzz
                            </span>
                        )}
                    </div>

                    {/* Desktop Toggle */}
                    {!isCollapsed && (
                        <button
                            onClick={toggleSidebar}
                            className="hidden lg:block p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Collapse sidebar"
                        >
                            <Menu className="w-5 h-5 text-gray-500" />
                        </button>
                    )}

                    {/* Mobile Close Button */}
                    <button
                        onClick={closeMobile}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Collapsed state toggle (desktop only) */}
                {isCollapsed && (
                    <button
                        onClick={toggleSidebar}
                        className="hidden lg:block mx-auto mb-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Expand sidebar"
                    >
                        <Menu className="w-5 h-5 text-gray-500" />
                    </button>
                )}

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-150 ${isCollapsed ? 'lg:justify-center' : ''
                                    } ${isActive
                                        ? 'bg-orange-50 text-orange-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                title={isCollapsed ? item.label : undefined}
                            >
                                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-orange-500' : 'text-gray-400'}`} />
                                {(!isCollapsed || isMobileOpen) && <span className={isCollapsed ? 'lg:hidden' : ''}>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Contact & FAQs - Above User Section */}
                <div className="px-3 py-2 border-t border-gray-100">
                    <Link
                        href="/contact"
                        className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-150 ${isCollapsed ? 'lg:justify-center' : ''
                            } ${pathname === '/contact'
                                ? 'bg-orange-50 text-orange-600'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        title={isCollapsed ? 'Contact & FAQs' : undefined}
                    >
                        <HelpCircle className={`w-5 h-5 flex-shrink-0 ${pathname === '/contact' ? 'text-orange-500' : 'text-gray-400'}`} />
                        {(!isCollapsed || isMobileOpen) && <span className={isCollapsed ? 'lg:hidden' : ''}>Contact & FAQs</span>}
                    </Link>
                </div>

                {/* User Profile Section */}
                <div className="px-3 py-4 border-t border-gray-100">
                    <div className={`flex items-center gap-3 px-3 py-2 ${isCollapsed ? 'lg:justify-center' : ''}`}>
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                            D
                        </div>
                        {(!isCollapsed || isMobileOpen) && (
                            <div className={`flex-1 min-w-0 ${isCollapsed ? 'lg:hidden' : ''}`}>
                                <p className="text-sm font-medium text-gray-900 truncate">Demo User</p>
                                <p className="text-xs text-gray-500">Admin</p>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons - Stacked Vertically */}
                    <div className="flex flex-col gap-1 mt-2">
                        <Link
                            href="/settings"
                            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors ${isCollapsed ? 'lg:justify-center' : ''
                                } ${pathname?.startsWith('/settings') ? 'bg-orange-50 text-orange-600' : ''}`}
                            title={isCollapsed ? 'Settings' : undefined}
                        >
                            <Settings className="w-4 h-4" />
                            {(!isCollapsed || isMobileOpen) && <span className={isCollapsed ? 'lg:hidden' : ''}>Settings</span>}
                        </Link>
                        <button
                            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ${isCollapsed ? 'lg:justify-center' : ''
                                }`}
                            title={isCollapsed ? 'Sign Out' : undefined}
                        >
                            <LogOut className="w-4 h-4" />
                            {(!isCollapsed || isMobileOpen) && <span className={isCollapsed ? 'lg:hidden' : ''}>Sign Out</span>}
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
