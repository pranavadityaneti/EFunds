'use client';

import { useState } from 'react';
import { Camera, Trash2, Check } from 'lucide-react';

export default function ProfilePage() {
    const [formData, setFormData] = useState({
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo.user@efundzz.com',
        phone: '+91 98765 43210',
        showPhone: true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="opacity-0 animate-fadeInUp">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
                <p className="text-gray-500 mt-1">Manage your profile settings</p>
            </div>

            <div className="flex gap-8">
                {/* Form Section */}
                <div className="flex-1">
                    {/* Profile Photo */}
                    <div className="mb-8">
                        <h3 className="text-sm font-medium text-gray-700 mb-4">Your Profile Photo</h3>
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-2xl">
                                D
                            </div>
                            <div className="flex gap-2">
                                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#f48b3b] text-white font-medium text-sm rounded-xl hover:bg-[#e07a2a] transition-colors">
                                    <Camera className="w-4 h-4" />
                                    Change Photo
                                </button>
                                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-50 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                    Remove
                                </button>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Add your photo. Recommended size is 256×256px</p>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f48b3b]/20 focus:border-[#f48b3b] transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f48b3b]/20 focus:border-[#f48b3b] transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <div className="flex gap-3">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#f48b3b]/20 focus:border-[#f48b3b] transition-all"
                                    readOnly
                                />
                                <button className="px-4 py-3 bg-white border border-gray-200 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-50 transition-colors">
                                    Change
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f48b3b]/20 focus:border-[#f48b3b] transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, showPhone: !prev.showPhone }))}
                                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${formData.showPhone ? 'bg-[#f48b3b]' : 'bg-gray-200'
                                    }`}
                            >
                                <span
                                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${formData.showPhone ? 'translate-x-7' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                            <span className="text-sm text-gray-600">Show phone number publicly</span>
                        </div>

                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#f48b3b] text-white font-medium rounded-xl hover:bg-[#e07a2a] transition-colors mt-4">
                            <Check className="w-4 h-4" />
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Info Card */}
                <div className="w-80 flex-shrink-0">
                    <div className="bg-purple-50 rounded-2xl p-6 relative overflow-hidden">
                        <h3 className="text-lg font-semibold text-purple-900 mb-2">Build Trust!</h3>
                        <p className="text-sm text-purple-700/80 mb-4">
                            Your photo will appear on emails and appointment booking pages.
                            This helps partners recognize you and builds confidence.
                        </p>
                        <div className="absolute -right-4 -bottom-4 w-32 h-32 opacity-20">
                            <svg viewBox="0 0 100 100" className="w-full h-full fill-purple-400">
                                <circle cx="50" cy="50" r="40" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
