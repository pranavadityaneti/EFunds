'use client';

import { CheckCircle, AlertCircle, Info, Clock, Bell as BellIcon } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';

interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'success' | 'warning' | 'info' | 'pending';
    time: string;
    read: boolean;
}

const mockNotifications: Notification[] = [
    { id: '1', title: 'New Lead Assigned', message: 'Lead DL0002448 has been assigned to partner SHARATH', type: 'info', time: '2 minutes ago', read: false },
    { id: '2', title: 'Payout Approved', message: 'Payout request PR0002149 for ₹12,000 has been approved', type: 'success', time: '15 minutes ago', read: false },
    { id: '3', title: 'Loan Disbursed', message: 'Application SP-PL-00000604 has been successfully disbursed', type: 'success', time: '1 hour ago', read: false },
    { id: '4', title: 'Document Pending', message: 'Lead DL0002446 requires additional documents', type: 'warning', time: '2 hours ago', read: true },
    { id: '5', title: 'New Partner Onboarded', message: 'Partner GAMINI ANJAIAH (DIGI0007363) has been successfully onboarded', type: 'success', time: '3 hours ago', read: true },
    { id: '6', title: 'Payout Processing', message: 'Payout PO0001243 is currently being processed', type: 'pending', time: '4 hours ago', read: true },
    { id: '7', title: 'Application Rejected', message: 'Application SP-PL-00000603 has been rejected by the financier', type: 'warning', time: '5 hours ago', read: true },
];

const iconMap = {
    success: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
    warning: { icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-50' },
    info: { icon: Info, color: 'text-blue-500', bg: 'bg-blue-50' },
    pending: { icon: Clock, color: 'text-gray-500', bg: 'bg-gray-50' },
};

export default function NotificationsPage() {
    const unreadCount = mockNotifications.filter(n => !n.read).length;

    return (
        <div>
            <HeroBanner
                title="Notifications"
                subtitle="Stay updated with the latest activities and alerts"
                badges={['Real-time', 'Never Miss Updates']}
                icon={BellIcon}
            />

            <div className="space-y-4 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                {/* Header */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
                    </p>
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                        Mark all as read
                    </button>
                </div>

                {/* Notifications List */}
                <div className="bg-white rounded-2xl overflow-hidden transition-all duration-200" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
                    {mockNotifications.map((notification, index) => {
                        const { icon: Icon, color, bg } = iconMap[notification.type];
                        return (
                            <div
                                key={notification.id}
                                className={`flex items-start gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors cursor-pointer ${!notification.read ? 'bg-rose-50/30' : ''
                                    }`}
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className={`p-2 rounded-xl ${bg}`}>
                                    <Icon className={`w-5 h-5 ${color}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <p className={`text-sm font-medium text-gray-900 ${!notification.read ? 'font-semibold' : ''}`}>
                                            {notification.title}
                                        </p>
                                        <span className="text-xs text-gray-400 whitespace-nowrap">{notification.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-0.5">{notification.message}</p>
                                </div>
                                {!notification.read && (
                                    <div className="w-2 h-2 rounded-full bg-rose-500 mt-2"></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
