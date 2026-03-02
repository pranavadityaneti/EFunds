"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, CheckCircle2, FileText, Smartphone, User, Mail, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

interface DocumentRequirement {
    id: string;
    label: string;
    description: string;
}

const DOCUMENT_MAP: Record<string, DocumentRequirement[]> = {
    "Business Loans": [
        { id: "gst", label: "GST Returns", description: "Last 6 months GST filings" },
        { id: "bank_statement", label: "Bank Statement", description: "Last 6 months current account statement" },
        { id: "business_kyc", label: "Business KYC", description: "PAN, Aadhaar, and Incorporation certificate" }
    ],
    "Vehicle Loan": [
        { id: "income_proof", label: "Income Proof", description: "Latest 3 months salary slips or ITR" },
        { id: "bank_statement", label: "Bank Statement", description: "Last 3 months savings account statement" },
        { id: "kyc", label: "Identity & Address Proof", description: "Aadhaar and PAN card" }
    ],
    "Gold Loan": [
        { id: "kyc", label: "Identity & Address Proof", description: "Aadhaar and PAN card" }
    ],
    "Home Loan": [
        { id: "salary_slip", label: "Salary Slips", description: "Latest 3 months salary slips" },
        { id: "property_docs", label: "Property Documents", description: "Agreement of sale or allotment letter" },
        { id: "itr", label: "ITR / Form 16", description: "Last 2 years income tax returns" }
    ],
    "Loan On Demand": [
        { id: "kyc", label: "Identity & Address Proof", description: "Aadhaar and PAN card" },
        { id: "bank_statement", label: "Bank Statement", description: "Last 3 months savings account statement" }
    ],
    "Loan Against Mutual Funds": [
        { id: "mf_statement", label: "MF Statement", description: "Latest CAS or holding statement" },
        { id: "kyc", label: "Identity & Address Proof", description: "Aadhaar and PAN card" }
    ],
    "Education Loan": [
        { id: "admission_letter", label: "Admission Letter", description: "Letter from the educational institution" },
        { id: "fee_structure", label: "Fee Structure", description: "Detailed fee breakdown from college" },
        { id: "academic_records", label: "Academic Records", description: "10th, 12th, and Graduation marksheets" }
    ],
    "Bill Discounting": [
        { id: "invoices", label: "Unpaid Invoices", description: "Copies of invoices to be discounted" },
        { id: "business_kyc", label: "Business KYC", description: "PAN and GST registration copy" }
    ],
    "Credit Card": [
        { id: "income_proof", label: "Income Proof", description: "Salary slips or ITR" },
        { id: "kyc", label: "Identity & Address Proof", description: "Aadhaar and PAN card" }
    ],
    "General Inquiry": [
        { id: "kyc", label: "Basic KYC", description: "Aadhaar or PAN card for identification" }
    ]
};

interface LGFormProps {
    isOpen: boolean;
    onClose: () => void;
    loanType: string;
}

export default function LGForm({ isOpen, onClose, loanType }: LGFormProps) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({ name: "", mobile: "", email: "" });
    const [files, setFiles] = useState<Record<string, File>>({});

    const requirements = DOCUMENT_MAP[loanType] || DOCUMENT_MAP["General Inquiry"];

    const isStep1Valid = formData.name.trim() !== "" && formData.mobile.trim() !== "" && formData.email.trim() !== "";
    const isStep2Valid = requirements.every(req => !!files[req.id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFiles(prev => ({ ...prev, [id]: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isStep2Valid) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const handleNext = () => {
        if (isStep1Valid) {
            setStep(2);
        }
    };

    const resetForm = () => {
        setStep(1);
        setIsSuccess(false);
        setFormData({ name: "", mobile: "", email: "" });
        setFiles({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={resetForm}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                {/* Modal */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
                >
                    {/* Header Overlay Gradient */}
                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />

                    <div className="relative p-8 lg:p-12">
                        {/* Close Button */}
                        <button
                            onClick={resetForm}
                            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        {!isSuccess ? (
                            <div className="space-y-8">
                                {/* Header */}
                                <div>
                                    <div className="flex items-center gap-2 text-orange-500 font-semibold mb-2">
                                        <ShieldCheck size={18} />
                                        <span className="text-xs uppercase tracking-widest">Secure Application</span>
                                    </div>
                                    <h2 className="text-3xl lg:text-4xl font-bold text-white">
                                        {loanType === "General Inquiry" ? "Get Started" : `Apply for ${loanType}`}
                                    </h2>
                                    <p className="text-white/40 mt-2">Complete the steps below to initialize your application.</p>
                                </div>

                                {/* Stepper */}
                                <div className="flex gap-2">
                                    <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 1 ? "bg-orange-500" : "bg-white/10"}`} />
                                    <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 2 ? "bg-orange-500" : "bg-white/10"}`} />
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {step === 1 ? (
                                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                                                        <User size={14} /> Full Name*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        placeholder="John Doe"
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                                                        <Smartphone size={14} /> Mobile Number*
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="mobile"
                                                        required
                                                        value={formData.mobile}
                                                        onChange={handleInputChange}
                                                        placeholder="+91 98765 43210"
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                                                    <Mail size={14} /> Email Address*
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="john@example.com"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                disabled={!isStep1Valid}
                                                className="w-full py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                                            >
                                                Next Step
                                                <ArrowRight size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                            <div className="space-y-4">
                                                <h4 className="text-white font-semibold">Upload Required Documents*</h4>
                                                <p className="text-xs text-white/40 -mt-2">All documents are mandatory to proceed.</p>
                                                <div className="grid gap-4">
                                                    {requirements.map((req) => (
                                                        <div key={req.id} className="relative group">
                                                            <div className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${files[req.id] ? "bg-orange-500/10 border-orange-500/30" : "bg-white/5 border-white/10 group-hover:bg-white/10"}`}>
                                                                <div className="flex items-center gap-3">
                                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${files[req.id] ? "bg-orange-500 text-white" : "bg-white/10 text-white/60"}`}>
                                                                        {files[req.id] ? <CheckCircle2 size={20} /> : <FileText size={20} />}
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-sm font-bold text-white">{req.label}*</div>
                                                                        <div className="text-xs text-white/40">{files[req.id] ? files[req.id].name : req.description}</div>
                                                                    </div>
                                                                </div>
                                                                <label className="cursor-pointer">
                                                                    <input
                                                                        type="file"
                                                                        className="hidden"
                                                                        required
                                                                        onChange={(e) => handleFileChange(req.id, e)}
                                                                    />
                                                                    <div className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors">
                                                                        {files[req.id] ? "Change" : "Upload"}
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex gap-4 pt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setStep(1)}
                                                    className="flex-1 py-4 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/5 transition-colors"
                                                >
                                                    Back
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting || !isStep2Valid}
                                                    className="flex-[2] py-4 bg-orange-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <Loader2 size={18} className="animate-spin" />
                                                            Submitting...
                                                        </>
                                                    ) : (
                                                        "Submit Application"
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </div>
                        ) : (
                            <div className="py-12 text-center space-y-6 animate-in zoom-in-95 duration-500">
                                <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-orange-500/20">
                                    <CheckCircle2 size={48} className="text-white" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold text-white">Application Received</h2>
                                    <p className="text-white/40 max-w-sm mx-auto">
                                        Thank you for your interest. Our representative will contact you on your mobile number within 24 hours.
                                    </p>
                                </div>
                                <button
                                    onClick={resetForm}
                                    className="px-12 py-4 bg-white/10 text-white rounded-2xl font-bold hover:bg-white/20 transition-colors"
                                >
                                    Done
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
