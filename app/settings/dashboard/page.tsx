'use client';

import { useState } from 'react';
import { Check, Sun, Moon } from 'lucide-react';

export default function DashboardSettingsPage() {
    const [settings, setSettings] = useState({
        theme: 'light',
        defaultPage: 'dashboard',
        emailNotifications: true,
        pushNotifications: true,
        dateFormat: 'DD/MM/YYYY',
        currency: 'INR',
    });

    const handleToggle = (key: keyof typeof settings) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <div className="opacity-0 animate-fadeInUp">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Dashboard Settings</h2>
                <p className="text-gray-500 mt-1">Customize your dashboard experience</p>
            </div>

            <div className="max-w-2xl space-y-8">
                {/* Theme Selection */}
                <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h3>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setSettings(prev => ({ ...prev, theme: 'light' }))}
                            className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${settings.theme === 'light'
                                    ? 'border-[#f48b3b] bg-orange-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <Sun className={`w-5 h-5 ${settings.theme === 'light' ? 'text-[#f48b3b]' : 'text-gray-400'}`} />
                            <span className={`font-medium ${settings.theme === 'light' ? 'text-[#f48b3b]' : 'text-gray-600'}`}>Light</span>
                        </button>
                        <button
                            onClick={() => setSettings(prev => ({ ...prev, theme: 'dark' }))}
                            className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${settings.theme === 'dark'
                                    ? 'border-[#f48b3b] bg-orange-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <Moon className={`w-5 h-5 ${settings.theme === 'dark' ? 'text-[#f48b3b]' : 'text-gray-400'}`} />
                            <span className={`font-medium ${settings.theme === 'dark' ? 'text-[#f48b3b]' : 'text-gray-600'}`}>Dark</span>
                        </button>
                    </div>
                </div>

                {/* Default Page */}
                <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Default Landing Page</h3>
                    <select
                        value={settings.defaultPage}
                        onChange={(e) => setSettings(prev => ({ ...prev, defaultPage: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f48b3b]/20 focus:border-[#f48b3b] transition-all"
                    >
                        <option value="dashboard">Dashboard</option>
                        <option value="leads">Leads</option>
                        <option value="applications">Applications</option>
                        <option value="partners">Partners</option>
                    </select>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">Email Notifications</p>
                                <p className="text-sm text-gray-500">Receive updates via email</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleToggle('emailNotifications')}
                                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${settings.emailNotifications ? 'bg-[#f48b3b]' : 'bg-gray-200'
                                    }`}
                            >
                                <span
                                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${settings.emailNotifications ? 'translate-x-7' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">Push Notifications</p>
                                <p className="text-sm text-gray-500">Receive browser push notifications</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleToggle('pushNotifications')}
                                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${settings.pushNotifications ? 'bg-[#f48b3b]' : 'bg-gray-200'
                                    }`}
                            >
                                <span
                                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${settings.pushNotifications ? 'translate-x-7' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Regional Settings */}
                <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Settings</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                            <select
                                value={settings.dateFormat}
                                onChange={(e) => setSettings(prev => ({ ...prev, dateFormat: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f48b3b]/20 focus:border-[#f48b3b] transition-all"
                            >
                                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                            <select
                                value={settings.currency}
                                onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f48b3b]/20 focus:border-[#f48b3b] transition-all"
                            >
                                <option value="INR">INR (₹)</option>
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#f48b3b] text-white font-medium rounded-xl hover:bg-[#e07a2a] transition-colors">
                    <Check className="w-4 h-4" />
                    Save Settings
                </button>
            </div>
        </div>
    );
}
