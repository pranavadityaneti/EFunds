'use client';

import Sidebar, { SidebarProvider, useSidebar, MobileHeader } from '@/components/Sidebar';

function MainContent({ children }: { children: React.ReactNode }) {
    const { isCollapsed } = useSidebar();

    return (
        <>
            {/* Mobile Header */}
            <MobileHeader />

            {/* Main content with responsive margins */}
            <main
                className={`
                    transition-all duration-300 min-h-screen
                    pt-16 lg:pt-0
                    px-4 sm:px-6 lg:px-8
                    pb-8
                    ${isCollapsed ? 'lg:ml-20' : 'lg:ml-72'}
                `}
            >
                <div className="py-6 lg:py-8">
                    {children}
                </div>
            </main>
        </>
    );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <Sidebar />
            <MainContent>{children}</MainContent>
        </SidebarProvider>
    );
}
