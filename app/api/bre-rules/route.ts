import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

// Define the Bank Rule structure
export type BankRule = {
    bankName: string;
    id: string; // generated slug
    minAge: number;
    maxAge: number;
    minSalary: number;
    minCibil: number;
    roi: number;
    allowUnlisted: boolean;
    category?: string; // e.g. "Top Tier Bank", "Mid-Tier NBFC" from header row mostly
};

let rulesCache: BankRule[] = [];


const parseMoney = (val: string) => {
    if (!val) return 0;

    // Normalize: lowercase
    const clean = val.toLowerCase();

    // Strategy: Find all numbers in the string
    // Matches: "25", "25.5", "40,000"
    const matches = clean.match(/(\d+(?:,\d+)*(?:\.\d+)?)\s*k?/g);

    if (!matches) return 0;

    // Parse all numbers found
    const values = matches.map(m => {
        let numStr = m.replace(/,/g, '').replace('k', '');
        let num = parseFloat(numStr);
        if (m.includes('k')) {
            num *= 1000;
        } else if (num < 1000 && num > 0) {
            // Heuristic for "35" -> 35000 (if it's a salary field context, usually > 10000)
            num *= 1000;
        }
        return num;
    });

    // If multiple values (e.g. "Listed 25k / unlisted 30k"), take the MAX for safety
    return Math.max(...values);
}

const parsePercentage = (val: string) => {
    if (!val) return 10.5; // Default fallback
    return parseFloat(val.replace('%', ''));
}

const parseAge = (val: string) => {
    if (!val) return 0;
    return parseInt(val.replace(/[^0-9]/g, ''));
}


const loadRules = () => {
    if (rulesCache.length > 0) return;

    try {
        const filePath = path.join(process.cwd(), 'data', 'bre-rules.csv');
        const fileContent = fs.readFileSync(filePath, 'utf8');

        // The CSV structure is Transposed compared to normal data.
        // Columns are Banks, Rows are Parameters.
        // We need to parse it row by row, but access columns dynamically.

        const { data, meta } = Papa.parse(fileContent, {
            header: true,
            skipEmptyLines: true,
        });

        // data is array of objects: { "Parameter": "Age (Min)", "IDFC BANK": "21", ... }
        // We need to pivot this to: [ { bankName: "IDFC BANK", minAge: 21 ... } ]

        // 1. Identify Bank Columns (Exclude "Parameter", "Criteria / Definition", "Purpose...", "Example Partner...")
        const allColumns = meta.fields || [];
        const ignoredCols = ["Parameter", "Criteria / Definition", "Purpose for Risk Underwriting", "Example Partner 1 (Top Tier Bank)", "Example Partner 2 (Mid-Tier NBFC)"];
        const bankColumns = allColumns.filter(col => !ignoredCols.includes(col) && col.trim() !== "");

        const bankRules: Record<string, Partial<BankRule>> = {};

        // Initialize bank objects
        bankColumns.forEach(bank => {
            bankRules[bank] = {
                bankName: bank,
                id: bank.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, ''),
            };
        });

        // Iterate rows and populate bank rules
        data.forEach((row: any) => {
            const param = row['Parameter']?.trim();
            if (!param) return;

            bankColumns.forEach(bank => {
                const value = row[bank];
                // Map parameters to fields
                if (param.includes('Age (Min)')) {
                    bankRules[bank].minAge = parseAge(value);
                } else if (param.includes('Age (Max)')) {
                    bankRules[bank].maxAge = parseAge(value);
                } else if (param.includes('Minimum Monthly Net Income')) {
                    bankRules[bank].minSalary = parseMoney(value);
                } else if (param.includes('Rate of Interest')) {
                    bankRules[bank].roi = parsePercentage(value);
                } else if (param.includes('Non listed companies acceptable')) {
                    bankRules[bank].allowUnlisted = value?.toLowerCase().includes('yes');
                } else if (param.includes('CIBIL Score (Min)')) {
                    // Extract number from "700 above" -> 700
                    bankRules[bank].minCibil = parseInt(value?.replace(/[^0-9]/g, '') || "700");
                }
            });
        });

        rulesCache = Object.values(bankRules) as BankRule[];
        console.log(`Loaded ${rulesCache.length} bank rules`);

    } catch (error) {
        console.error("Error loading BRE rules:", error);
    }
};

export async function GET() {
    loadRules();
    return NextResponse.json({ rules: rulesCache });
}
