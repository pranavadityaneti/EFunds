"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck, Clock, TrendingUp, AlertCircle } from "lucide-react";

const TRUST_POINTS = [
    { icon: ShieldCheck, text: "Bank-grade data security" },
    { icon: Clock, text: "Callback within 24 hours" },
    { icon: TrendingUp, text: "Funding up to ₹5 Crore" },
];

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const GST_REGEX = /^\d{2}[A-Z]{5}\d{4}[A-Z][A-Z\d]Z[A-Z\d]$/;

/*
 * Validation runs on NORMALISED values, never on raw keystrokes. People type
 * phone numbers the way our own placeholder shows them ("+91 98765 43210"),
 * amounts with commas, and GSTINs with stray spaces — rejecting those formats
 * silently disabled the submit button and cost real enquiries. Normalise first,
 * validate second, and submit the normalised value so downstream (Gain webhook,
 * confirmation email) always receives clean data.
 */

/** "+91 98765 43210" / "091..." / "91..." / dashes → bare 10-digit number. */
const normalisePhone = (raw: string): string => {
    let p = raw.replace(/[\s\-()]/g, "");
    if (p.startsWith("+91")) p = p.slice(3);
    else if (p.startsWith("91") && p.length === 12) p = p.slice(2);
    else if (p.startsWith("0") && p.length === 11) p = p.slice(1);
    return p;
};
/** Uppercase and drop every space — covers paste artefacts in PAN/GSTIN. */
const normaliseCode = (raw: string): string => raw.toUpperCase().replace(/\s/g, "");
/** "5,00,000" / "5 00 000" → "500000". */
const normaliseAmount = (raw: string): string => raw.replace(/[,\s]/g, "");

const initialFormState = {
    businessName: "",
    contactName: "",
    phone: "",
    email: "",
    businessPan: "",
    businessGst: "",
    loanAmount: "",
    turnover: "",
    message: "",
};

export default function B2BLeadForm() {
    const [formData, setFormData] = useState(initialFormState);
    const [consent, setConsent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [campaignSource, setCampaignSource] = useState("website");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const utmSource = params.get("utm_source");
        if (utmSource) setCampaignSource(utmSource);
    }, []);

    const panValid = PAN_REGEX.test(normaliseCode(formData.businessPan));
    const gstValid = GST_REGEX.test(normaliseCode(formData.businessGst));
    const phoneValid = /^[6-9]\d{9}$/.test(normalisePhone(formData.phone));
    const amountValid = /^[1-9]\d*$/.test(normaliseAmount(formData.loanAmount));

    const fieldsValid =
        formData.businessName.trim() !== "" &&
        formData.contactName.trim() !== "" &&
        phoneValid &&
        formData.email.trim() !== "" &&
        panValid &&
        gstValid &&
        amountValid;
    const isValid = fieldsValid && consent;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUppercaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value.toUpperCase() }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) return;

        setIsSubmitting(true);
        setErrorMsg("");

        try {
            const response = await fetch("/api/leads/business-loan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    // Normalised, so Gain and the confirmation email always get
                    // clean values regardless of how they were typed.
                    phone: normalisePhone(formData.phone),
                    businessPan: normaliseCode(formData.businessPan),
                    businessGst: normaliseCode(formData.businessGst),
                    loanAmount: normaliseAmount(formData.loanAmount),
                    turnover: normaliseAmount(formData.turnover),
                    campaignSource,
                }),
            });

            if (!response.ok) {
                throw new Error("Submission failed");
            }

            setIsSuccess(true);
        } catch {
            setErrorMsg("Something went wrong submitting your enquiry. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData(initialFormState);
        setConsent(false);
        setIsSuccess(false);
        setErrorMsg("");
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
                                        {formData.phone.trim() !== "" && !phoneValid && (
                                            <p className="text-xs text-red-500 mt-1">Enter a valid 10-digit Indian mobile number</p>
                                        )}
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
                                        <label htmlFor="lead-businessPan" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Business PAN*
                                        </label>
                                        <input
                                            id="lead-businessPan"
                                            type="text"
                                            name="businessPan"
                                            required
                                            maxLength={10}
                                            value={formData.businessPan}
                                            onChange={handleUppercaseChange}
                                            placeholder="e.g. ABCDE1234F"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all uppercase"
                                        />
                                        {formData.businessPan.trim() !== "" && !panValid && (
                                            <p className="text-xs text-red-500 mt-1">Enter a valid 10-character PAN</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="lead-businessGst" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Business GSTIN*
                                        </label>
                                        <input
                                            id="lead-businessGst"
                                            type="text"
                                            name="businessGst"
                                            required
                                            maxLength={15}
                                            value={formData.businessGst}
                                            onChange={handleUppercaseChange}
                                            placeholder="e.g. 29ABCDE1234F1Z5"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all uppercase"
                                        />
                                        {formData.businessGst.trim() !== "" && !gstValid && (
                                            <p className="text-xs text-red-500 mt-1">Enter a valid 15-character GSTIN</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="lead-loanAmount" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Loan Amount Required (₹)*
                                        </label>
                                        {/* type="text": a number input silently swallows pasted
                                            values like "5,00,000" into an empty string. Commas
                                            and spaces are normalised away instead. */}
                                        <input
                                            id="lead-loanAmount"
                                            type="text"
                                            inputMode="numeric"
                                            name="loanAmount"
                                            required
                                            value={formData.loanAmount}
                                            onChange={handleChange}
                                            placeholder="e.g. 500000"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                        />
                                        {formData.loanAmount.trim() !== "" && !amountValid && (
                                            <p className="text-xs text-red-500 mt-1">Numbers only, e.g. 500000</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="lead-turnover" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Monthly Turnover (₹)
                                        </label>
                                        <input
                                            id="lead-turnover"
                                            type="text"
                                            inputMode="numeric"
                                            name="turnover"
                                            value={formData.turnover}
                                            onChange={handleChange}
                                            placeholder="Optional - e.g. 100000"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                        />
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
                                {/* Once every field is valid, an unticked consent box is the
                                    only thing keeping the button disabled — say so, or the
                                    button just looks broken. */}
                                {fieldsValid && !consent && (
                                    <p className="text-xs text-red-500 -mt-2">
                                        Tick the box above to enable the button.
                                    </p>
                                )}

                                {errorMsg && (
                                    <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                                        <AlertCircle size={16} className="shrink-0" />
                                        {errorMsg}
                                    </div>
                                )}

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
