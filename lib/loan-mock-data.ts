// Mock data for Loan Dashboard

export interface TopMetrics {
    totalLeadsThisMonth: number;
    totalLeadsChange: number;
    totalApprovedLoanAmount: number;
    approvedLoanChange: number;
    totalPayoutsThisMonth: number;
    payoutsChange: number;
    approvedPayouts: number;
    approvedPayoutsChange: number;
    totalEmployees: number;
    employeesChange: number;
    totalPartners: number;
    partnersChange: number;
    payoutCases: number;
    payoutCasesChange: number;
}

export interface LoanDistribution {
    [key: string]: string | number;
    name: string;
    value: number;
    color: string;
}

export interface LoanType {
    [key: string]: string | number;
    name: string;
    applications: number;
}

export interface BankData {
    [key: string]: string | number;
    bank: string;
    applications: number;
}

export interface PartnerPerformance {
    totalPartnerCount: number;
    totalSubPartnersCount: number;
    newlyOnboardedPartners: number;
    totalLeadsFromPartners: number;
    pendingApprovalPartners: number;
    totalDisbursedAmount: number;
}

export interface ApplicationLoan {
    [key: string]: string | number;
    type: string;
    count: number;
}

export const topMetrics: TopMetrics = {
    totalLeadsThisMonth: 1247,
    totalLeadsChange: 12.5,
    totalApprovedLoanAmount: 45678900,
    approvedLoanChange: 8.3,
    totalPayoutsThisMonth: 2340000,
    payoutsChange: 15.2,
    approvedPayouts: 456,
    approvedPayoutsChange: 6.7,
    totalEmployees: 89,
    employeesChange: 4.2,
    totalPartners: 234,
    partnersChange: 9.8,
    payoutCases: 342,
    payoutCasesChange: -2.1,
};

export const loansDistribution: LoanDistribution[] = [
    { name: 'Approved', value: 245, color: '#10B981' },
    { name: 'Sent to Financier', value: 189, color: '#3B82F6' },
    { name: 'Under Process', value: 312, color: '#f18b3b' },
    { name: 'Details Received', value: 156, color: '#8B5CF6' },
    { name: 'Details Pending', value: 98, color: '#F59E0B' },
    { name: 'Disbursed', value: 421, color: '#059669' },
    { name: 'Rejected', value: 67, color: '#EF4444' },
];

export const loanTypes: LoanType[] = [
    { name: 'Personal Loans', applications: 456 },
    { name: 'Business Loans', applications: 312 },
    { name: 'Loan Against Property', applications: 234 },
    { name: 'Education Loans', applications: 189 },
    { name: 'Working Capital', applications: 167 },
    { name: 'Credit Loans', applications: 145 },
    { name: 'Gold Loans', applications: 123 },
    { name: 'Merchandise', applications: 98 },
];

export const bankData: BankData[] = [
    { bank: 'HDFC Bank', applications: 342 },
    { bank: 'Piramal', applications: 298 },
    { bank: 'Shriram', applications: 276 },
    { bank: 'Tata Capital', applications: 245 },
    { bank: 'Bandhan', applications: 198 },
    { bank: 'Kotak Mahindra', applications: 187 },
    { bank: 'YES Bank', applications: 156 },
    { bank: 'ICICI Bank', applications: 134 },
    { bank: 'Bajaj Finserv', applications: 112 },
    { bank: 'Others', applications: 176 },
];

export const partnerPerformance: PartnerPerformance = {
    totalPartnerCount: 234,
    totalSubPartnersCount: 567,
    newlyOnboardedPartners: 23,
    totalLeadsFromPartners: 892,
    pendingApprovalPartners: 12,
    totalDisbursedAmount: 128456700,
};

export const applicationLoans: ApplicationLoan[] = [
    { type: 'Personal Loan', count: 456 },
    { type: 'BL', count: 312 },
    { type: 'Loan Against Property', count: 234 },
    { type: 'Education', count: 189 },
    { type: 'CL', count: 145 },
    { type: 'PL', count: 123 },
];

export const formatCurrency = (amount: number): string => {
    if (amount >= 10000000) {
        return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(2)} L`;
    } else if (amount >= 1000) {
        return `₹${(amount / 1000).toFixed(2)} K`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatNumber = (num: number): string => {
    return num.toLocaleString('en-IN');
};
