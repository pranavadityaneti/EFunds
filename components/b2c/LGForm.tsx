"use client";

import React, { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, CheckCircle2, FileText, Smartphone, User, Mail, ShieldCheck, ArrowRight, Loader2, Home, Landmark, Briefcase, FileSignature, CheckSquare } from "lucide-react";

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

// --- New Constants for Property Loans ---
const IDENTITY_PROOFS = ["Passport", "Driving License", "Aadhaar Card", "Ration Card"];
const ADDRESS_PROOFS = ["Passport", "Aadhaar Card", "Driving License", "Ration Card", "Utility Bill"];

interface LGFormProps {
    isOpen: boolean;
    onClose: () => void;
    loanType: string;
}

export default function LGForm({ isOpen, onClose, loanType }: LGFormProps) {
    const isPropertyLoan = loanType === "Home Loan" || loanType === "Loan Against Property";
    const isBusinessLoan = loanType === "Business Loans";
    const maxSteps = (isPropertyLoan || isBusinessLoan) ? 4 : 2;

    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // --- State: General Details (Step 1) ---
    const [formData, setFormData] = useState({ name: "", mobile: "", email: "" });
    const isStep1Valid = formData.name.trim() !== "" && formData.mobile.trim() !== "" && formData.email.trim() !== "";

    // --- State: Standalone Files (Non-Property Loans Step 2) ---
    const [files, setFiles] = useState<Record<string, File>>({});

    // --- State: Business Details (Business Loans Step 1) ---
    const [businessData, setBusinessData] = useState({
        businessName: "",
        constitutionType: "Proprietorship",
        gstNumber: "",
        vintage: "",
        turnover: "",
        loanAmount: ""
    });
    const isStep1BusinessValid = formData.name.trim() !== "" && formData.mobile.trim() !== "" && formData.email.trim() !== "" && 
        !!businessData.businessName && !!businessData.gstNumber && !!businessData.vintage && !!businessData.turnover && !!businessData.loanAmount;

    const [houseProofConfirm, setHouseProofConfirm] = useState(false);

    // --- State: Property Details (Property Loans Step 2) ---
    const [propertyData, setPropertyData] = useState({
        propertyValue: "",
        downPayment: "",
        loanAmount: "",
        builderName: "",
        propertyType: "Under Construction" // Default
    });
    const isStep2PropertyValid = !!propertyData.propertyValue && !!propertyData.loanAmount && !!propertyData.builderName;

    // --- State: KYC Uploads (Property Loans Step 3) ---
    const [kycConfig, setKycConfig] = useState({
        sameDocument: false,
        idType: "Aadhaar Card",
        addressType: "Aadhaar Card"
    });
    const isStep3KYCValid = kycConfig.sameDocument
        ? !!files["kyc_combined"]
        : !!files["kyc_id"] && !!files["kyc_address"];

    // --- State: Financial Uploads (Property Loans Step 4) ---
    const [employmentType, setEmploymentType] = useState<"Salaried" | "Self-Employed">("Salaried");

    const financialRequirements = useMemo(() => {
        if (employmentType === "Salaried") {
            return [
                { id: "fin_payslips", label: "Pay Slips", desc: "Last 3 months" },
                { id: "fin_bank", label: "Bank Statement", desc: "Last 6 months" },
                // ITR is optional, not enforcing in validation
            ];
        } else {
            return [
                { id: "fin_itr", label: "ITR", desc: "Last 2 years" },
                { id: "fin_bank", label: "Bank Statement", desc: "Last 6–12 months" },
                { id: "fin_business", label: "Business Proof", desc: "Registration, GST, etc." },
            ];
        }
    }, [employmentType]);

    const isStep4FinancialValid = financialRequirements.every(req => !!files[req.id]);

    const isBusinessStep3Valid = !!files["bus_gst"] && !!files["bus_bank"] && !!files["bus_itr"];
    const isBusinessStep4Valid = !!files["bus_house_proof"] && houseProofConfirm;

    // --- Actions ---
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPropertyData(prev => ({ ...prev, [name]: value }));
    };

    const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBusinessData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorMsg("");
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Only enforce 1MB and PDF/Image if we are in property flow
            // But let's apply it globally for safety, as requested for KYC.
            if (isPropertyLoan || isBusinessLoan) {
                if (file.size > 1024 * 1024) {
                    setErrorMsg("File size must be less than 1MB");
                    e.target.value = ''; // clear
                    return;
                }
                const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
                if (!allowedTypes.includes(file.type)) {
                    setErrorMsg("Only PDF, JPG, or PNG files are allowed");
                    e.target.value = ''; // clear
                    return;
                }
            }

            setFiles(prev => ({ ...prev, [id]: file }));
        }
    };

    const validateStandardRequirements = () => {
        const requirements = DOCUMENT_MAP[loanType] || DOCUMENT_MAP["General Inquiry"];
        return requirements.every(req => !!files[req.id]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation based on path
        if (!isPropertyLoan && !isBusinessLoan && !validateStandardRequirements()) return;
        if (isPropertyLoan && !isStep4FinancialValid) return;
        if (isBusinessLoan && !isBusinessStep4Valid) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const handleNext = () => {
        if (step === 1) {
            if (isBusinessLoan && isStep1BusinessValid) setStep(2);
            else if (!isBusinessLoan && isStep1Valid) setStep(2);
        }
        else if (step === 2) {
            if (isPropertyLoan && isStep2PropertyValid) setStep(3);
            else if (isBusinessLoan && isStep3KYCValid) setStep(3);
        }
        else if (step === 3) {
            if (isPropertyLoan && isStep3KYCValid) setStep(4);
            else if (isBusinessLoan && isBusinessStep3Valid) setStep(4);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const resetForm = () => {
        setStep(1);
        setIsSuccess(false);
        setErrorMsg("");
        setFormData({ name: "", mobile: "", email: "" });
        setBusinessData({ businessName: "", constitutionType: "Proprietorship", gstNumber: "", vintage: "", turnover: "", loanAmount: "" });
        setHouseProofConfirm(false);
        setPropertyData({ propertyValue: "", downPayment: "", loanAmount: "", builderName: "", propertyType: "Under Construction" });
        setKycConfig({ sameDocument: false, idType: "Aadhaar Card", addressType: "Aadhaar Card" });
        setFiles({});
        setEmploymentType("Salaried");
        onClose();
    };

    if (!isOpen) return null;

    // --- Render Helpers ---

    const renderFileUpload = (id: string, label: string, desc: string, required: boolean = true) => (
        <div key={id} className="relative group">
            <div className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${files[id] ? "bg-orange-500/10 border-orange-500/30" : "bg-white/5 border-white/10 group-hover:bg-white/10"}`}>
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 min-w-10 rounded-xl flex items-center justify-center ${files[id] ? "bg-orange-500 text-white" : "bg-white/10 text-white/60"}`}>
                        {files[id] ? <CheckCircle2 size={20} /> : <FileText size={20} />}
                    </div>
                    <div>
                        <div className="text-sm font-bold text-white max-w-[200px] truncate" title={label}>{label}{required && '*'}</div>
                        <div className="text-xs text-white/40 max-w-[200px] truncate" title={files[id] ? files[id].name : desc}>
                            {files[id] ? files[id].name : desc}
                        </div>
                    </div>
                </div>
                <label className="cursor-pointer">
                    <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg" onChange={(e) => handleFileChange(id, e)} />
                    <div className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors whitespace-nowrap">
                        {files[id] ? "Change" : "Upload"}
                    </div>
                </label>
            </div>
        </div>
    );

    const renderStep1 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                        <User size={14} /> Full Name*
                    </label>
                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                        <Smartphone size={14} /> Mobile Number*
                    </label>
                    <input type="tel" name="mobile" required value={formData.mobile} onChange={handleInputChange} placeholder="+91 98765 43210" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors" />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                    <Mail size={14} /> Email Address*
                </label>
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors" />
            </div>
            <button type="button" onClick={handleNext} disabled={!isStep1Valid} className="w-full py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed">
                Next Step <ArrowRight size={18} />
            </button>
        </div>
    );

    const renderStandardStep2 = () => {
        const reqs = DOCUMENT_MAP[loanType] || DOCUMENT_MAP["General Inquiry"];
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-4">
                    <h4 className="text-white font-semibold">Upload Required Documents*</h4>
                    <p className="text-xs text-white/40 -mt-2">All documents are mandatory to proceed.</p>
                    <div className="grid gap-4">
                        {reqs.map(req => renderFileUpload(req.id, req.label, req.description))}
                    </div>
                </div>
                <div className="flex gap-4 pt-4">
                    <button type="button" onClick={handleBack} className="flex-1 py-4 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/5 transition-colors">Back</button>
                    <button type="submit" disabled={isSubmitting || !validateStandardRequirements()} className="flex-[2] py-4 bg-orange-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed">
                        {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Submitting...</> : "Submit Application"}
                    </button>
                </div>
            </div>
        );
    };

    const renderPropertyStep2 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-4">
                <h4 className="text-white font-semibold">Property Details*</h4>
                <p className="text-xs text-white/40 -mt-2">Provide basic information about the property.</p>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/60 flex items-center gap-2"><Landmark size={14} /> Property Value*</label>
                        <input type="number" name="propertyValue" required value={propertyData.propertyValue} onChange={handlePropertyChange} placeholder="e.g. 5000000" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/60 flex items-center gap-2"><Briefcase size={14} /> Down Payment (Optional)</label>
                        <input type="number" name="downPayment" value={propertyData.downPayment} onChange={handlePropertyChange} placeholder="e.g. 1000000" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60 flex items-center gap-2"><Landmark size={14} /> Loan Amount Required*</label>
                    <input type="number" name="loanAmount" required value={propertyData.loanAmount} onChange={handlePropertyChange} placeholder="e.g. 4000000" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/60 flex items-center gap-2"><User size={14} /> Builder / Seller Name*</label>
                        <input type="text" name="builderName" required value={propertyData.builderName} onChange={handlePropertyChange} placeholder="e.g. Prestige Group" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/60 flex items-center gap-2"><Home size={14} /> Property Type*</label>
                        <select name="propertyType" value={propertyData.propertyType} onChange={handlePropertyChange} className="w-full bg-[#18181b] border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors appearance-none">
                            <option value="Under Construction">Under Construction</option>
                            <option value="Ready to Move">Ready to Move</option>
                            <option value="Resale">Resale</option>
                        </select>
                    </div>
                </div>

            </div>
            <div className="flex gap-4 pt-4">
                <button type="button" onClick={handleBack} className="flex-1 py-4 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/5 transition-colors">Back</button>
                <button type="button" onClick={handleNext} disabled={!isStep2PropertyValid} className="flex-[2] bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed">
                    Next Step <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );

    const renderKYCUploadStep = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-4">
                <h4 className="text-white font-semibold">KYC Documents Upload*</h4>
                <p className="text-xs text-white/40 -mt-2">Format: PDF/JPG/PNG (Max 1MB). Single doc upload available.</p>
                {errorMsg && <div className="text-red-400 text-xs bg-red-400/10 p-2 rounded-lg">{errorMsg}</div>}

                <label className="flex items-center gap-3 cursor-pointer p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${kycConfig.sameDocument ? 'bg-orange-500 border-orange-500' : 'border-white/30'}`}>
                        {kycConfig.sameDocument && <CheckSquare size={14} className="text-white" />}
                    </div>
                    <span className="text-sm text-white font-medium">Use same document for Identity and Address Proof</span>
                    <input type="checkbox" className="hidden" checked={kycConfig.sameDocument} onChange={(e) => {
                        setKycConfig(prev => ({ ...prev, sameDocument: e.target.checked }));
                        // Clear related files to avoid invisible invalid state
                        const newFiles = { ...files };
                        delete newFiles["kyc_combined"]; delete newFiles["kyc_id"]; delete newFiles["kyc_address"];
                        setFiles(newFiles);
                    }} />
                </label>

                {kycConfig.sameDocument ? (
                    <div className="space-y-3">
                        <label className="text-sm text-white/60">Select Combined Proof Document</label>
                        <select value={kycConfig.idType} onChange={(e) => setKycConfig(prev => ({ ...prev, idType: e.target.value }))} className="w-full bg-[#18181b] border border-white/10 rounded-xl px-4 py-3 text-white appearance-none">
                            {IDENTITY_PROOFS.filter(p => ADDRESS_PROOFS.includes(p)).map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        {renderFileUpload("kyc_combined", `Upload ${kycConfig.idType}`, "Max 1MB (PDF/JPG/PNG)")}
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="space-y-3 relative z-20">
                            <label className="text-sm text-white/60">Identity Proof Type</label>
                            <select value={kycConfig.idType} onChange={(e) => setKycConfig(prev => ({ ...prev, idType: e.target.value }))} className="w-full bg-[#18181b] border border-white/10 rounded-xl px-4 py-3 text-white appearance-none">
                                {IDENTITY_PROOFS.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                            {renderFileUpload("kyc_id", `Upload ${kycConfig.idType}`, "Max 1MB (PDF/JPG/PNG)")}
                        </div>
                        <div className="space-y-3 relative z-10">
                            <label className="text-sm text-white/60">Address Proof Type</label>
                            <select value={kycConfig.addressType} onChange={(e) => setKycConfig(prev => ({ ...prev, addressType: e.target.value }))} className="w-full bg-[#18181b] border border-white/10 rounded-xl px-4 py-3 text-white appearance-none">
                                {ADDRESS_PROOFS.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                            {renderFileUpload("kyc_address", `Upload ${kycConfig.addressType}`, "Max 1MB (PDF/JPG/PNG)")}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex gap-4 pt-4">
                <button type="button" onClick={handleBack} className="flex-1 py-4 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/5 transition-colors">Back</button>
                <button type="button" onClick={handleNext} disabled={!isStep3KYCValid} className="flex-[2] bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed">
                    Next Step <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );

    const renderPropertyStep4 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-4">
                <h4 className="text-white font-semibold flex items-center justify-between">
                    Financial Documents*
                </h4>
                {errorMsg && <div className="text-red-400 text-xs bg-red-400/10 p-2 rounded-lg">{errorMsg}</div>}

                {/* Employment Type Toggle */}
                <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
                    <button
                        type="button"
                        onClick={() => setEmploymentType("Salaried")}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${employmentType === "Salaried" ? "bg-orange-500 text-white shadow-lg" : "text-white/40 hover:text-white"}`}
                    >
                        Salaried
                    </button>
                    <button
                        type="button"
                        onClick={() => setEmploymentType("Self-Employed")}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${employmentType === "Self-Employed" ? "bg-orange-500 text-white shadow-lg" : "text-white/40 hover:text-white"}`}
                    >
                        Self-Employed
                    </button>
                </div>

                {/* Mandatory Financial Uploads */}
                <div className="grid gap-4 mt-4">
                    {financialRequirements.map(req => renderFileUpload(req.id, req.label, req.desc))}
                    {employmentType === "Salaried" && renderFileUpload("fin_itr_optional", "ITR Returns (Optional)", "Last 2 years", false)}
                </div>

                {/* Optional Property Uploads */}
                <h5 className="text-white/60 text-sm font-medium pt-4 border-t border-white/10">Property Documents (Optional)</h5>
                <div className="grid gap-4">
                    {renderFileUpload("prop_sale_agreement", "Sale Agreement", "Scanned copy", false)}
                    {renderFileUpload("prop_demand_letter", "Builder Demand Letter", "Scanned copy", false)}
                </div>

            </div>
            <div className="flex gap-4 pt-4">
                <button type="button" onClick={handleBack} className="flex-1 py-4 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/5 transition-colors">Back</button>
                <button type="submit" disabled={isSubmitting || !isStep4FinancialValid} className="flex-[2] py-4 bg-orange-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed">
                    {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Submitting...</> : "Submit Application"}
                </button>
            </div>
        </div>
    );

    const renderBusinessStep1 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                        <User size={14} /> Full Name*
                    </label>
                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                        <Smartphone size={14} /> Mobile Number*
                    </label>
                    <input type="tel" name="mobile" required value={formData.mobile} onChange={handleInputChange} placeholder="+91 98765 43210" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors" />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                    <Mail size={14} /> Email Address*
                </label>
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors" />
            </div>
            
            <div className="pt-4 border-t border-white/10 mt-6">
                <h4 className="text-white font-semibold mb-4">Business Details*</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/60 flex items-center gap-2"><Briefcase size={14} /> Business Name*</label>
                        <input type="text" name="businessName" required value={businessData.businessName} onChange={handleBusinessChange} placeholder="e.g. Acme Corp" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/60 flex items-center gap-2"><Briefcase size={14} /> Constitution Type*</label>
                        <select name="constitutionType" value={businessData.constitutionType} onChange={handleBusinessChange} className="w-full bg-[#18181b] border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors appearance-none">
                            <option value="Proprietorship">Proprietorship</option>
                            <option value="Partnership">Partnership</option>
                            <option value="Pvt Ltd">Pvt Ltd</option>
                            <option value="LLP">LLP</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/60 flex items-center gap-2"><FileSignature size={14} /> GST Number*</label>
                        <input type="text" name="gstNumber" required value={businessData.gstNumber} onChange={handleBusinessChange} placeholder="e.g. 29ABCDE1234F1Z5" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors uppercase" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/60 flex items-center gap-2"><Briefcase size={14} /> Business Vintage*</label>
                        <input type="text" name="vintage" required value={businessData.vintage} onChange={handleBusinessChange} placeholder="e.g. 5 Years" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/60 flex items-center gap-2"><Landmark size={14} /> Annual Turnover*</label>
                        <input type="text" name="turnover" required value={businessData.turnover} onChange={handleBusinessChange} placeholder="e.g. 10000000" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/60 flex items-center gap-2"><Landmark size={14} /> Loan Amount Required*</label>
                        <input type="number" name="loanAmount" required value={businessData.loanAmount} onChange={handleBusinessChange} placeholder="e.g. 5000000" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors" />
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <button type="button" onClick={handleNext} disabled={!isStep1BusinessValid} className="w-full py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed">
                    Next Step <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );

    const renderBusinessStep3 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-4">
                <h4 className="text-white font-semibold flex items-center justify-between">
                    Financial Documents*
                </h4>
                <p className="text-xs text-white/40 -mt-2">Provide the following business financials.</p>
                {errorMsg && <div className="text-red-400 text-xs bg-red-400/10 p-2 rounded-lg">{errorMsg}</div>}

                <div className="grid gap-4 mt-4">
                    {renderFileUpload("bus_gst", "GST Returns*", "Last 12 months")}
                    {renderFileUpload("bus_bank", "Bank Statements*", "Last 12 months (All Accounts)")}
                    {renderFileUpload("bus_itr", "ITR Returns (Audited)*", "Last 2 years")}
                </div>

                <h5 className="text-white/60 text-sm font-medium pt-4 border-t border-white/10">Additional Documents (Optional)</h5>
                <div className="grid gap-4">
                    {renderFileUpload("bus_sanction", "Existing Sanction Letters", "If Available", false)}
                </div>
            </div>
            <div className="flex gap-4 pt-4">
                <button type="button" onClick={handleBack} className="flex-1 py-4 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/5 transition-colors">Back</button>
                <button type="button" onClick={handleNext} disabled={!isBusinessStep3Valid} className="flex-[2] bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed">
                    Next Step <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );

    const renderBusinessStep4 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-4">
                <h4 className="text-white font-semibold flex items-center justify-between">
                    Own House Proof*
                </h4>
                <p className="text-xs text-white/40 -mt-2">Upload document showing house owned by applicant or father.</p>
                {errorMsg && <div className="text-red-400 text-xs bg-red-400/10 p-2 rounded-lg">{errorMsg}</div>}

                <div className="text-xs text-white/60 mb-2">
                    Accepted: Property Tax Receipt, Sale Deed Copy, Electricity Bill, or Any Govt Property Record.
                </div>
                
                <div className="grid gap-4">
                    {renderFileUpload("bus_house_proof", "House Proof Document*", "Max 1MB (PDF/JPG/PNG)")}
                </div>

                <label className="flex items-start gap-3 cursor-pointer p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors mt-4">
                    <div className={`w-5 h-5 mt-0.5 rounded border flex-shrink-0 flex items-center justify-center ${houseProofConfirm ? 'bg-orange-500 border-orange-500' : 'border-white/30'}`}>
                        {houseProofConfirm && <CheckSquare size={14} className="text-white" />}
                    </div>
                    <span className="text-sm text-white font-medium">I confirm house ownership is in my name / father’s name*</span>
                    <input type="checkbox" className="hidden" checked={houseProofConfirm} onChange={(e) => setHouseProofConfirm(e.target.checked)} />
                </label>

            </div>
            <div className="flex gap-4 pt-4">
                <button type="button" onClick={handleBack} className="flex-1 py-4 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/5 transition-colors">Back</button>
                <button type="submit" disabled={isSubmitting || !isBusinessStep4Valid} className="flex-[2] py-4 bg-orange-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed">
                    {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Submitting...</> : "Submit Application"}
                </button>
            </div>
        </div>
    );

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={resetForm} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />
                    <div className="relative p-6 lg:p-10">
                        <button onClick={resetForm} className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                            <X size={20} />
                        </button>
                        {!isSuccess ? (
                            <div className="space-y-8">
                                <div>
                                    <div className="flex items-center gap-2 text-orange-500 font-semibold mb-2">
                                        <ShieldCheck size={18} />
                                        <span className="text-xs uppercase tracking-widest">Secure Application</span>
                                    </div>
                                    <h2 className="text-3xl lg:text-4xl font-bold text-white pr-10">
                                        {loanType === "General Inquiry" ? "Get Started" : `Apply for ${loanType}`}
                                    </h2>
                                    <p className="text-white/40 mt-2">Complete the {maxSteps} steps below to initialize your application.</p>
                                </div>

                                {/* Dynamic Stepper */}
                                <div className="flex gap-2">
                                    {Array.from({ length: maxSteps }).map((_, i) => (
                                        <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${step >= i + 1 ? "bg-orange-500" : "bg-white/10"}`} />
                                    ))}
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {step === 1 && !isBusinessLoan && renderStep1()}
                                    {step === 1 && isBusinessLoan && renderBusinessStep1()}
                                    {step === 2 && !isPropertyLoan && !isBusinessLoan && renderStandardStep2()}
                                    {step === 2 && isPropertyLoan && renderPropertyStep2()}
                                    {step === 2 && isBusinessLoan && renderKYCUploadStep()}
                                    {step === 3 && isPropertyLoan && renderKYCUploadStep()}
                                    {step === 3 && isBusinessLoan && renderBusinessStep3()}
                                    {step === 4 && isPropertyLoan && renderPropertyStep4()}
                                    {step === 4 && isBusinessLoan && renderBusinessStep4()}
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
                                <button onClick={resetForm} className="px-12 py-4 bg-white/10 text-white rounded-2xl font-bold hover:bg-white/20 transition-colors">
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
