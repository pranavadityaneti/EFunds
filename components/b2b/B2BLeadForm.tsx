"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck, Clock, TrendingUp } from "lucide-react";

const LOAN_AMOUNT_OPTIONS = [
    "Up to ₹10 Lakhs",
    "₹10 Lakhs - ₹50 Lakhs",
    "₹50 Lakhs - ₹1 Crore",
    "₹1 Crore+",
];

const TURNOVER_OPTIONS = [
    "Below ₹1 Lakh / month",
    "₹1 Lakh - ₹5 Lakhs / month",
    "₹5 Lakhs - ₹25 Lakhs / month",
    "₹25 Lakhs+ / month",
];

const TRUST_POINTS = [
    { icon: ShieldCheck, text: "Bank-grade data security" },
    { icon: Clock, text: "Callback within 24 hours" },
    { icon: TrendingUp, text: "Funding up to ₹5 Crore" },
];

const initialFormState = {
    businessName: "",
    contactName: "",
    phone: "",
    email: "",
    loanAmount: "",
    turnover: "",
    message: "",
};

export default function B2BLeadForm() {
    const [formData, setFormData] = useState(initialFormState);
    const [consent, setConsent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const isValid =
        formData.businessName.trim() !== "" &&
        formData.contactName.trim() !== "" &&
        formData.phone.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.loanAmount !== "" &&
        consent;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) return;

        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const resetForm = () => {
        setFormData(initialFormState);
        setConsent(false);
        setIsSuccess(false);
    };

    return (
        <section className="w-full bg-zinc-50 py-20 border-y border-zinc-100">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left: Copy */}
                    <div>
                        <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
                            Business Loan Enquiry
                        </span>
                        <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mt-3 mb-4 leading-tight">
                            Need funding to grow your business?
                        </h2>
                        <p className="text-gray-500 text-base md:text-lg max-w-md mb-10">
                            Share a few details about your business and our lending specialists
                            will reach out with a customized loan offer.
                        </p>

                        <div className="space-y-4">
                            {TRUST_POINTS.map(({ icon: Icon, text }) => (
                                <div key={text} className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-zinc-100 shrink-0">
                                        <Icon className="text-orange-500 w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Form Card */}
                    <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm p-8 md:p-10">
                        {!isSuccess ? (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="lead-businessName" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Business Name*
                                        </label>
                                        <input
                                            id="lead-businessName"
                                            type="text"
                                            name="businessName"
                                            required
                                            value={formData.businessName}
                                            onChange={handleChange}
                                            placeholder="e.g. Acme Traders"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lead-contactName" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Contact Person*
                                        </label>
                                        <input
                                            id="lead-contactName"
                                            type="text"
                                            name="contactName"
                                            required
                                            value={formData.contactName}
                                            onChange={handleChange}
                                            placeholder="Your full name"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="lead-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Phone Number*
                                        </label>
                                        <input
                                            id="lead-phone"
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 98765 43210"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lead-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Business Email*
                                        </label>
                                        <input
                                            id="lead-email"
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@business.com"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="lead-loanAmount" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Loan Amount Required*
                                        </label>
                                        <select
                                            id="lead-loanAmount"
                                            name="loanAmount"
                                            required
                                            value={formData.loanAmount}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all appearance-none bg-white"
                                        >
                                            <option value="" disabled>Select amount</option>
                                            {LOAN_AMOUNT_OPTIONS.map((opt) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="lead-turnover" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Monthly Turnover
                                        </label>
                                        <select
                                            id="lead-turnover"
                                            name="turnover"
                                            value={formData.turnover}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all appearance-none bg-white"
                                        >
                                            <option value="">Select turnover (optional)</option>
                                            {TURNOVER_OPTIONS.map((opt) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="lead-message" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Tell us about your funding needs
                                    </label>
                                    <textarea
                                        id="lead-message"
                                        name="message"
                                        rows={3}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Optional - e.g. purpose of loan, timeline"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
                                    />
                                </div>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        required
                                        checked={consent}
                                        onChange={(e) => setConsent(e.target.checked)}
                                        className="mt-0.5 w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500/20 shrink-0"
                                    />
                                    <span className="text-xs text-gray-500">
                                        I agree to be contacted by Finlot regarding my business loan enquiry.
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" /> Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Request a Callback <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="py-8 text-center space-y-5">
                                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-orange-500/20">
                                    <CheckCircle2 size={40} className="text-white" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-medium text-gray-900">Thank you!</h3>
                                    <p className="text-gray-500 max-w-xs mx-auto">
                                        Our business lending team will reach out to you within 24 hours.
                                    </p>
                                </div>
                                <button
                                    onClick={resetForm}
                                    className="px-8 py-3 bg-zinc-100 text-gray-900 rounded-2xl font-bold hover:bg-zinc-200 transition-colors"
                                >
                                    Submit Another Enquiry
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
