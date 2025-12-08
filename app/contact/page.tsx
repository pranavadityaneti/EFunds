'use client';

import { useState } from 'react';
import { Mail, Phone, Plus, Minus, Send, MessageCircle } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';

const faqs = {
    general: [
        { q: 'How do I add a new lead?', a: 'Navigate to the Leads page and click on "Add Lead" button. Fill in the required details including name, contact information, and loan type. The system will automatically assign a Lead ID.' },
        { q: 'What is the payout process?', a: 'Payouts are processed after loan disbursement. Partners can request payouts from the Payout Requests section. Once approved by the admin, the amount is transferred to the registered bank account within 2-3 business days.' },
        { q: 'How can I track my applications?', a: 'Go to the Applications page to view all your submitted applications. Each application shows its current status, from submission to approval. You can filter by status, date, or loan type.' },
        { q: 'What documents are required for partner onboarding?', a: 'Partners need to provide: PAN Card, Aadhaar Card, Bank Account Details, and a signed partnership agreement. Additional documents may be required based on the partnership tier.' },
    ],
    technical: [
        { q: 'How do I integrate the API?', a: 'Our API documentation is available at the developer portal. You will need an API key which can be generated from Settings > API Access. Contact the tech team for integration support.' },
        { q: 'What if I face login issues?', a: 'First, try resetting your password using the "Forgot Password" link. If the issue persists, clear your browser cache and cookies. For continued problems, contact tech support.' },
        { q: 'How do I export data?', a: 'Most pages have an "Export" button that allows you to download data in CSV format. For bulk exports or custom reports, use the Reports section or contact support.' },
        { q: 'Is there a mobile app available?', a: 'Yes, our mobile app is available for both iOS and Android. Partners can track leads, check payouts, and receive notifications on the go.' },
    ],
};

export default function ContactPage() {
    const [selectedTeam, setSelectedTeam] = useState<'tech' | 'business'>('tech');
    const [openFaq, setOpenFaq] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', { ...formData, team: selectedTeam });
        alert('Your message has been sent! Our team will get back to you soon.');
    };

    return (
        <div>
            <HeroBanner
                title="Contact & FAQs"
                subtitle="Get help from our team or find answers in our FAQ section"
                badges={['24/7 Support', 'Quick Response']}
                icon={MessageCircle}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div className="bg-white rounded-2xl p-6 opacity-0 animate-fadeInUp" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)', animationDelay: '0.1s' }}>
                    <div className="mb-6">
                        <span className="text-xs font-semibold text-[#f48b3b] uppercase tracking-wider">CONTACT</span>
                        <h2 className="text-2xl font-bold text-gray-900 mt-1">Get in <span className="italic">touch</span></h2>
                        <p className="text-gray-500 mt-2">Receive expert guidance to resolve any issues or queries.</p>
                    </div>

                    {/* Team Toggle */}
                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={() => setSelectedTeam('tech')}
                            className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition-all ${selectedTeam === 'tech'
                                ? 'bg-[#f48b3b] text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Tech Support
                        </button>
                        <button
                            onClick={() => setSelectedTeam('business')}
                            className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition-all ${selectedTeam === 'business'
                                ? 'bg-[#f48b3b] text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Business Development
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name</label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f48b3b]/20 focus:border-[#f48b3b] transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f48b3b]/20 focus:border-[#f48b3b] transition-all"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                            <input
                                type="tel"
                                placeholder="Your phone number"
                                value={formData.phone}
                                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f48b3b]/20 focus:border-[#f48b3b] transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                            <textarea
                                placeholder="Type something here"
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f48b3b]/20 focus:border-[#f48b3b] transition-all resize-none"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#374151] text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
                        >
                            <Send className="w-4 h-4" />
                            Send Message
                        </button>
                    </form>

                    {/* Contact Info */}
                    <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-100">
                        <a href="mailto:support@efundzz.com" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#f48b3b]">
                            <Mail className="w-4 h-4" />
                            support@efundzz.com
                        </a>
                        <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#f48b3b]">
                            <Phone className="w-4 h-4" />
                            +91 98765 43210
                        </a>
                    </div>
                </div>

                {/* FAQs */}
                <div className="opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                    <div className="mb-6">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">FREQUENTLY ASKED QUESTIONS</span>
                        <h2 className="text-2xl font-bold text-gray-900 mt-1">Frequently asked <span className="italic">questions</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* General FAQs */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">General</h3>
                            {faqs.general.map((faq, index) => {
                                const key = `general-${index}`;
                                const isOpen = openFaq === key;
                                return (
                                    <div
                                        key={key}
                                        className={`bg-white rounded-xl border-l-4 transition-all ${isOpen ? 'border-l-[#f48b3b]' : 'border-l-gray-200'
                                            }`}
                                        style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}
                                    >
                                        <button
                                            onClick={() => setOpenFaq(isOpen ? null : key)}
                                            className="w-full flex items-center justify-between p-4 text-left"
                                        >
                                            <span className="text-sm font-medium text-gray-900 pr-4">{faq.q}</span>
                                            <span className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isOpen ? 'bg-[#f48b3b] text-white' : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                                            </span>
                                        </button>
                                        {isOpen && (
                                            <div className="px-4 pb-4">
                                                <p className="text-sm text-gray-600">{faq.a}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Technical FAQs */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Technical</h3>
                            {faqs.technical.map((faq, index) => {
                                const key = `technical-${index}`;
                                const isOpen = openFaq === key;
                                return (
                                    <div
                                        key={key}
                                        className={`bg-white rounded-xl border-l-4 transition-all ${isOpen ? 'border-l-[#f48b3b]' : 'border-l-gray-200'
                                            }`}
                                        style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}
                                    >
                                        <button
                                            onClick={() => setOpenFaq(isOpen ? null : key)}
                                            className="w-full flex items-center justify-between p-4 text-left"
                                        >
                                            <span className="text-sm font-medium text-gray-900 pr-4">{faq.q}</span>
                                            <span className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isOpen ? 'bg-[#f48b3b] text-white' : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                                            </span>
                                        </button>
                                        {isOpen && (
                                            <div className="px-4 pb-4">
                                                <p className="text-sm text-gray-600">{faq.a}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
