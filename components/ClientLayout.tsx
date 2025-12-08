'use client';

import Sidebar, { SidebarProvider, useSidebar } from '@/components/Sidebar';

function MainContent({ children }: { children: React.ReactNode }) {
    const { isCollapsed } = useSidebar();

    return (
        <main
            className={`flex-1 p-6 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-72'
                }`}
        >
            {children}
        </main>
    );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="min-h-screen flex">
                <Sidebar />
                <MainContent>{children}</MainContent>
            </div>
        </SidebarProvider>
    );
}
