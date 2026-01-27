import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

// Cache the data in memory to avoid reading file on every request
// In a serverless environment (Vercel), this might be re-initialized occasionally, which is fine.
let companiesCache: any[] = [];

const loadCompanies = () => {
    if (companiesCache.length > 0) return;

    try {
        const filePath = path.join(process.cwd(), 'data', 'companies.csv');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = Papa.parse(fileContent, {
            header: true,
            skipEmptyLines: true,
        });
        companiesCache = data;
        console.log(`Loaded ${companiesCache.length} companies`);
    } catch (error) {
        console.error("Error loading companies csv:", error);
    }
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query || query.length < 3) {
        return NextResponse.json({ results: [] });
    }

    // Ensure data is loaded
    loadCompanies();

    const lowerQuery = query.toLowerCase();

    // Filter companies
    // Limit to top 20 for performance
    const results = companiesCache
        .filter((item: any) => item['COMPANY NAME']?.toLowerCase().includes(lowerQuery))
        .slice(0, 20)
        .map((item: any) => ({
            name: item['COMPANY NAME'],
            category: item['Category'] // e.g. "CAT A"
        }));

    return NextResponse.json({ results });
}
