'use client';

import Link from 'next/link';
import { DollarSign, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const footerLinks = {
    product: [
        { label: 'Personal Loans', href: '#' },
        { label: 'Business Loans', href: '#' },
        { label: 'Home Loans', href: '#' },
        { label: 'Education Loans', href: '#' },
    ],
    company: [
        { label: 'About Us', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Press', href: '#' },
    ],
    support: [
        { label: 'Help Center', href: '#' },
        { label: 'Contact Us', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
    ],
};

const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Instagram, href: '#' },
];

export default function LandingFooter() {
    return (
        <footer className="relative bg-[#0a0a1a] border-t border-white/10">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#f48b3b] to-[#fbbf24] rounded-xl flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">EFunds</span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-xs">
                            Find the best loan offers from 50+ banks and NBFCs. Compare, apply, and get funded faster.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <a href="mailto:support@efunds.in" className="flex items-center gap-3 text-gray-400 hover:text-[#f48b3b] transition-colors">
                                <Mail className="w-4 h-4" />
                                support@efunds.in
                            </a>
                            <a href="tel:+919876543210" className="flex items-center gap-3 text-gray-400 hover:text-[#f48b3b] transition-colors">
                                <Phone className="w-4 h-4" />
                                +91 98765 43210
                            </a>
                            <div className="flex items-start gap-3 text-gray-400">
                                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                                <span>Hitech City, Hyderabad, Telangana 500081</span>
                            </div>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Products</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-gray-400 hover:text-[#f48b3b] transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-gray-400 hover:text-[#f48b3b] transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Support</h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-gray-400 hover:text-[#f48b3b] transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © 2024 EFunds. All rights reserved.
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#f48b3b] hover:border-[#f48b3b]/30 transition-all"
                            >
                                <social.icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
