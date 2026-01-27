"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Calculator, ChevronRight, Building2, MapPin, Loader2, Info, AlertTriangle } from "lucide-react";
import Link from 'next/link';

// --- Types & Interfaces ---

type BankRule = {
    bankName: string;
    id: string;
    minAge: number;
    maxAge: number;
    minSalary: number;
    minCibil: number;
    roi: number;
    allowUnlisted: boolean;
};

type CalculatorState = {
    age: number | "";
    grossSalary: number | "";
    currentEMI: number | "";
    bureauScore: number;
    loanAmount: number | "";
    companyName: string;
    companyCategory: string; // Store CAT A, "Listed", or "" (Empty implies unlisted/custom)
    pincode: string;
    isPincodeServiceable: boolean;
};

// --- Configuration ---
const GENERIC_SLABS = [
    { maxSalary: 25000, foir: 0.50 },
    { maxSalary: 50000, foir: 0.60 },
    { maxSalary: 100000, foir: 0.65 },
];
// Generic fallback logic if specific bank salary slabs aren't available
// The BRE sheet mainly gives min salary, so we will use generic slabs for FOIR calculation.

const BUREAU_SCORES = [600, 650, 700, 750, 800, 850];
const DEFAULT_TENURE_YEARS = 5;

// --- Helper Functions ---
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount);
};

const calculateEMI = (principal: number, rate: number, years: number) => {
    const r = rate / 12 / 100;
    const n = years * 12;
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
};

// --- Component ---

export default function LoanEligibilityCalculator() {
    const [inputs, setInputs] = useState<CalculatorState>({
        age: "",
        grossSalary: "",
        currentEMI: "",
        bureauScore: 750,
        loanAmount: "",
        companyName: "",
        companyCategory: "",
        pincode: "",
        isPincodeServiceable: false,
    });

    const [showResults, setShowResults] = useState(false);

    // Bank Rules State
    const [bankRules, setBankRules] = useState<BankRule[]>([]);
    const [isLoadingRules, setIsLoadingRules] = useState(true);

    // Autocomplete State
    const [companySuggestions, setCompanySuggestions] = useState<{ name: string, category: string }[]>([]);
    const [isSearchingCompany, setIsSearchingCompany] = useState(false);
    const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Pincode Validation State
    const [pincodeStatus, setPincodeStatus] = useState<"idle" | "loading" | "valid" | "invalid">("idle");
    const [pincodeLocation, setPincodeLocation] = useState<string>("");

    // --- Load Rules on Mount ---
    useEffect(() => {
        const fetchRules = async () => {
            try {
                const res = await fetch('/api/bre-rules');
                const data = await res.json();
                if (data.rules) {
                    setBankRules(data.rules);
                }
            } catch (e) {
                console.error("Failed to load BRE rules", e);
            } finally {
                setIsLoadingRules(false);
            }
        };
        fetchRules();
    }, []);

    // --- Search Company ---
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (inputs.companyName.length >= 3 && showCompanyDropdown) {
                setIsSearchingCompany(true);
                try {
                    const res = await fetch(`/api/companies?query=${encodeURIComponent(inputs.companyName)}`);
                    const data = await res.json();
                    setCompanySuggestions(data.results || []);
                } catch (e) {
                    console.error("Failed to fetch companies", e);
                } finally {
                    setIsSearchingCompany(false);
                }
            } else {
                setCompanySuggestions([]);
            }
        }, 300); // Debounce

        return () => clearTimeout(timeoutId);
    }, [inputs.companyName, showCompanyDropdown]);

    // Handle click outside dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowCompanyDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // --- Validate Pincode ---
    const validatePincode = async (code: string) => {
        if (code.length !== 6) {
            setPincodeStatus("idle");
            setInputs(prev => ({ ...prev, isPincodeServiceable: false }));
            return;
        }

        setPincodeStatus("loading");
        try {
            const res = await fetch(`/api/pincode?pincode=${code}`);
            const data = await res.json();

            if (data.found && data.serviceable) {
                setPincodeStatus("valid");
                setPincodeLocation(`${data.city}, ${data.state}`);
                setInputs(prev => ({ ...prev, isPincodeServiceable: true }));
            } else {
                setPincodeStatus("invalid");
                setPincodeLocation(data.found ? "Service Unavailable" : "Invalid Pincode");
                setInputs(prev => ({ ...prev, isPincodeServiceable: false }));
            }
        } catch (e) {
            console.error("Pincode check failed", e);
            setPincodeStatus("invalid");
        }
    };

    const handleInputChange = (field: keyof CalculatorState, value: string | number) => {
        setInputs((prev) => ({ ...prev, [field]: value }));
        if (field === 'companyName') {
            setShowCompanyDropdown(true);
            // Reset category if user types manually -> implies unlisted
            setInputs(prev => ({ ...prev, companyName: value as string, companyCategory: "" }));
        }
        if (field === 'pincode') {
            if (String(value).length === 6) {
                validatePincode(String(value));
            } else {
                setPincodeStatus("idle");
            }
        }
    };

    const selectCompany = (company: { name: string, category: string }) => {
        setInputs(prev => ({
            ...prev,
            companyName: company.name,
            companyCategory: company.category || "Listed"
        }));
        setShowCompanyDropdown(false);
    };

    const results = useMemo(() => {
        const salary = Number(inputs.grossSalary) || 0;
        const existingEMI = Number(inputs.currentEMI) || 0;
        const requestedLoan = Number(inputs.loanAmount) || 0;
        const age = Number(inputs.age) || 0;
        const score = inputs.bureauScore;
        const isListed = !!inputs.companyCategory; // Present means selected from DB

        if (!salary || !requestedLoan || !bankRules.length) return [];

        return bankRules.map((bank) => {
            // 1. Check Score
            if (score < bank.minCibil) {
                return { bank, eligible: false, reason: `Min Score ${bank.minCibil}`, maxLoan: 0, foirUsed: 0, emi: 0, isRequestCovered: false };
            }
            // 2. Check Age
            if (age < bank.minAge || (bank.maxAge > 0 && age > bank.maxAge)) {
                return { bank, eligible: false, reason: `Age ${bank.minAge}-${bank.maxAge}`, maxLoan: 0, foirUsed: 0, emi: 0, isRequestCovered: false };
            }
            // 3. Check Min Salary
            if (salary < bank.minSalary) {
                return { bank, eligible: false, reason: `Min Salary ${formatCurrency(bank.minSalary)}`, maxLoan: 0, foirUsed: 0, emi: 0, isRequestCovered: false };
            }
            // 4. Check Listed/Unlisted
            if (!isListed && !bank.allowUnlisted) {
                return { bank, eligible: false, reason: "Listed Company Reqd", maxLoan: 0, foirUsed: 0, emi: 0, isRequestCovered: false };
            }

            // 5. Calculate Metrics
            const newEMI = calculateEMI(requestedLoan, bank.roi, DEFAULT_TENURE_YEARS);
            const totalObligation = existingEMI + newEMI;

            // FOIR Logic (Generic)
            let foirLimit = 0.50; // Default base
            for (const slab of GENERIC_SLABS) {
                if (salary <= slab.maxSalary) {
                    foirLimit = slab.foir;
                    break;
                }
            }
            if (salary > 100000) foirLimit = 0.75;

            const maxAllowedEMI = salary * foirLimit;
            const availableEMI = maxAllowedEMI - existingEMI;
            let maxLoanAmount = 0;
            if (availableEMI > 0) {
                const r = bank.roi / 12 / 100;
                const n = DEFAULT_TENURE_YEARS * 12;
                maxLoanAmount = (availableEMI * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
            }

            const isEligible = totalObligation <= maxAllowedEMI && availableEMI > 0;
            const maxCalculated = maxLoanAmount > 0 ? maxLoanAmount : 0;
            const isRequestCovered = maxCalculated >= requestedLoan;

            return {
                bank,
                eligible: isEligible,
                maxLoan: maxCalculated,
                foirUsed: (totalObligation / salary) * 100,
                reason: isEligible ? "Eligible" : "Exceeds Income Ratio",
                emi: newEMI,
                isRequestCovered
            };
        })
            .filter(r => r.eligible) // FILTER: Show only eligible offers
            .sort((a, b) => {
                // Sort by Max Loan desc
                return b.maxLoan - a.maxLoan;
            });
    }, [inputs, bankRules]);

    const isFormValid = inputs.age && inputs.grossSalary && inputs.loanAmount && inputs.companyName && inputs.pincode && inputs.isPincodeServiceable;

    return (
        <section className="py-20 bg-gray-50 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-50/50 skew-x-12 translate-x-32" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="mb-12 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Check Your <span className="text-[#f97316]">Loan Eligibility</span>
                    </h2>
                    <p className="text-gray-500">
                        Find out estimated eligibility across multiple banks instantly. No credit score impact.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-stretch">
                    {/* INPUT SECTION */}
                    <div className="lg:col-span-5 bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 h-fit">
                        <div className="space-y-5">
                            {/* Company Name with Autocomplete */}
                            <div className="relative" ref={dropdownRef}>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Company Name
                                </label>
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={inputs.companyName}
                                        onFocus={() => setShowCompanyDropdown(true)}
                                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f97316] focus:border-[#f97316] outline-none transition-all font-semibold text-gray-900 placeholder:text-gray-300"
                                        placeholder="Search Company..."
                                    />
                                    {isSearchingCompany && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                                        </div>
                                    )}
                                </div>

                                {/* Dropdown */}
                                {showCompanyDropdown && inputs.companyName.length >= 3 && companySuggestions.length > 0 && (
                                    <div className="absolute z-20 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                                        {companySuggestions.map((company, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => selectCompany(company)}
                                                className="w-full text-left px-4 py-3 hover:bg-orange-50 transition-colors border-b border-gray-50 last:border-0"
                                            >
                                                <div className="font-semibold text-gray-900 text-sm">{company.name}</div>
                                                <div className="text-xs text-gray-400">{company.category}</div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {!inputs.companyCategory && inputs.companyName.length > 3 && !showCompanyDropdown && (
                                    <p className="text-xs text-amber-600 mt-1 ml-1 flex items-center gap-1">
                                        <Info className="w-3 h-3" /> Unlisted Company (NBFC offers only)
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Salary */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Net Salary
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                                        <input
                                            type="number"
                                            value={inputs.grossSalary}
                                            onChange={(e) => handleInputChange("grossSalary", e.target.value)}
                                            className="w-full pl-6 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f97316] focus:border-[#f97316] outline-none font-semibold text-gray-900 placeholder:text-gray-300 text-sm"
                                            placeholder="50000"
                                        />
                                    </div>
                                </div>
                                {/* Existing EMI */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Total EMI
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                                        <input
                                            type="number"
                                            value={inputs.currentEMI}
                                            onChange={(e) => handleInputChange("currentEMI", e.target.value)}
                                            className="w-full pl-6 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f97316] focus:border-[#f97316] outline-none font-semibold text-gray-900 placeholder:text-gray-300 text-sm"
                                            placeholder="15000"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Loan Amount */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Desired Loan Amount
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                                    <input
                                        type="number"
                                        value={inputs.loanAmount}
                                        onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                                        className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f97316] focus:border-[#f97316] outline-none transition-all font-semibold text-gray-900 placeholder:text-gray-300"
                                        placeholder="e.g. 500000"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Age */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                                    <input
                                        type="number"
                                        value={inputs.age}
                                        onChange={(e) => handleInputChange("age", e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f97316] focus:border-[#f97316] outline-none font-semibold text-gray-900 placeholder:text-gray-300"
                                        placeholder="28"
                                    />
                                </div>
                                {/* Bureau Score */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">CIBIL Score</label>
                                    <div className="relative">
                                        <select
                                            value={inputs.bureauScore}
                                            onChange={(e) => handleInputChange("bureauScore", Number(e.target.value))}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f97316] focus:border-[#f97316] outline-none font-semibold text-gray-900 appearance-none"
                                        >
                                            {BUREAU_SCORES.map(score => <option key={score} value={score}>{score}</option>)}
                                            <option value={850}>850+</option>
                                        </select>
                                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Pincode with Live Validation */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Current Pincode
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={inputs.pincode}
                                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                                        maxLength={6}
                                        className={`w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 outline-none transition-all font-semibold text-gray-900 placeholder:text-gray-300
                                            ${pincodeStatus === 'invalid' ? 'border-red-300 focus:border-red-500 focus:ring-red-100' :
                                                pincodeStatus === 'valid' ? 'border-green-300 focus:border-green-500 focus:ring-green-100' :
                                                    'border-gray-200 focus:border-[#f97316] focus:ring-[#f97316]'}`}
                                        placeholder="e.g. 560001"
                                    />
                                    {pincodeStatus === 'loading' && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            <Loader2 className="w-4 h-4 text-[#f97316] animate-spin" />
                                        </div>
                                    )}
                                    {pincodeStatus === 'valid' && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        </div>
                                    )}
                                </div>
                                {/* Validation Message */}
                                {pincodeLocation && (
                                    <div className={`text-xs mt-1.5 font-medium ml-1 ${pincodeStatus === 'valid' ? 'text-green-600' : 'text-red-500'}`}>
                                        {pincodeLocation}
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => setShowResults(true)}
                                disabled={!isFormValid || isLoadingRules}
                                className={`w-full py-4 mt-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg text-white
                                    ${isFormValid && !isLoadingRules
                                        ? "bg-gray-900 hover:bg-gray-800 shadow-gray-200 hover:shadow-xl hover:-translate-y-0.5"
                                        : "bg-gray-300 cursor-not-allowed text-gray-500"}`}
                            >
                                {isLoadingRules ? <Loader2 className="w-5 h-5 animate-spin" /> : <Calculator className="w-5 h-5" />}
                                Check Eligibility
                            </button>
                        </div>
                    </div>

                    {/* RESULTS SECTION - Scrollable */}
                    <div className="lg:col-span-7 h-full flex flex-col">
                        {showResults ? (
                            <div className="flex flex-col h-full bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 w-full relative">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 pb-4 border-b border-gray-100"
                                >
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Estimated Offers</h3>
                                        <p className="text-sm text-gray-500">Based on your shared details.</p>
                                    </div>
                                    <span className="mt-2 sm:mt-0 text-xs font-semibold text-[#f97316] bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100 shadow-sm">
                                        {inputs.companyCategory ? "Listed Company Profile" : "General Profile"}
                                    </span>
                                </motion.div>

                                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3 mb-4 max-h-[450px]">
                                    {results.length > 0 ? (results.map((result, index) => (
                                        <motion.div
                                            key={result.bank.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className={`relative group bg-white rounded-2xl p-5 border-2 transition-all hover:shadow-md border-green-50 hover:border-green-200`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 bg-orange-50 text-[#f97316]`}>
                                                        {result.bank.bankName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 text-base">{result.bank.bankName}</h4>

                                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                                                            {result.isRequestCovered ? (
                                                                <div className="flex items-center gap-1.5 text-green-700 text-xs font-bold bg-green-50 px-2 py-0.5 rounded-md border border-green-100 w-fit">
                                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                                    Within Eligibility Limit
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center gap-1.5 text-amber-600 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100 w-fit">
                                                                    <AlertTriangle className="w-3.5 h-3.5" />
                                                                    Income Limit Reached
                                                                </div>
                                                            )}
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="text-right shrink-0">
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Max Estimate</p>
                                                    <h5 className={`text-xl font-extrabold text-gray-900`}>
                                                        {formatCurrency(result.maxLoan)}
                                                    </h5>
                                                </div>
                                            </div>


                                            <div className="mt-4 pt-3 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3">
                                                <div className="text-xs text-gray-400">
                                                    EMI (5 Yrs): <span className="font-bold text-gray-600">{formatCurrency(result.emi)}</span> / mo
                                                </div>
                                                <Link href="/B2C" className="w-full sm:w-auto">
                                                    <button className="w-full sm:w-auto text-xs font-bold bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-[#f97316] hover:shadow-lg transition-all flex items-center justify-center gap-2">
                                                        Apply Now <ChevronRight className="w-3.5 h-3.5" />
                                                    </button>
                                                </Link>
                                            </div>

                                        </motion.div>
                                    ))) : (
                                        <div className="text-center py-10 text-gray-500">
                                            No eligible offers at this time based on the detailed bank criteria.
                                            <br /><span className="text-xs">Try increasing the tenure or checking for a Co-Applicant.</span>
                                        </div>
                                    )}
                                </div>

                                {/* Disclaimer */}
                                <div className="mt-auto pt-4 border-t border-gray-100 text-[10px] text-gray-400 leading-relaxed text-center">
                                    <p>
                                        <span className="font-bold">Disclaimer:</span> This is an indicative estimate based on your inputs. Actual eligibility, interest rates, and loan terms will vary based on detailed verification of your credit profile and individual bank policies. EMI is estimated for a standard 5-year tenure.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
                                <div className="w-16 h-16 bg-white rounded-full shadow-lg shadow-orange-100 flex items-center justify-center mb-6">
                                    <Building2 className="w-8 h-8 text-gray-300" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Ready to check offers?</h4>
                                <p className="text-gray-500 max-w-sm">
                                    Enter your details on the left, including your company and pincode, to see valid offers.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
