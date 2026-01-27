import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

let pincodeCache: any[] = [];
let pincodeMap: Map<string, any> = new Map();

const loadPincodes = () => {
    if (pincodeMap.size > 0) return;

    try {
        const filePath = path.join(process.cwd(), 'data', 'pincodes.csv');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = Papa.parse(fileContent, {
            header: true,
            skipEmptyLines: true,
        });

        pincodeCache = data;
        // Create a Map for O(1) lookup
        data.forEach((item: any) => {
            if (item.Pincode) {
                pincodeMap.set(String(item.Pincode).trim(), item);
            }
        });
        console.log(`Loaded ${pincodeMap.size} pincodes`);
    } catch (error) {
        console.error("Error loading pincodes csv:", error);
    }
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const pincode = searchParams.get('pincode');

    if (!pincode) {
        return NextResponse.json({ error: "Pincode required" }, { status: 400 });
    }

    loadPincodes();

    const data = pincodeMap.get(pincode.trim());

    if (!data) {
        return NextResponse.json({
            found: false,
            message: "Pincode not found in database"
        });
    }

    // Check serviceability
    // Based on user provided header "All Channels ( Salaried )" being "Live"
    const isServiceable = data['All Channels ( Salaried )'] === 'Live';

    return NextResponse.json({
        found: true,
        city: data.City,
        state: data.State,
        serviceable: isServiceable,
        // Return raw data flags for future bank specific logic
        details: {
            allChannels: data['All Channels ( Salaried )'],
            embedded: data['Embedded'],
            dsa: data['DSA SENP L2']
        }
    });
}
