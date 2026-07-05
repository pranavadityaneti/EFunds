import { NextResponse } from 'next/server';

interface BusinessLoanLeadRequest {
    contactName?: string;
    email?: string;
    phone?: string;
    businessName?: string;
    businessPan?: string;
    businessGst?: string;
    loanAmount?: string;
    turnover?: string;
    campaignSource?: string;
}

const REQUIRED_FIELDS: (keyof BusinessLoanLeadRequest)[] = [
    'contactName',
    'email',
    'phone',
    'businessName',
    'businessPan',
    'businessGst',
    'loanAmount',
];

export async function POST(request: Request) {
    let body: BusinessLoanLeadRequest;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const missing = REQUIRED_FIELDS.filter((field) => !body[field] || String(body[field]).trim() === '');
    if (missing.length > 0) {
        return NextResponse.json({ error: `Missing required fields: ${missing.join(', ')}` }, { status: 400 });
    }

    const webhookUrl = process.env.BUSINESS_LOAN_WEBHOOK_URL;
    if (!webhookUrl) {
        console.error('BUSINESS_LOAN_WEBHOOK_URL is not configured');
        return NextResponse.json({ error: 'Lead submission is not configured' }, { status: 500 });
    }

    const vendorPayload = {
        name: body.contactName,
        email: body.email,
        phone: body.phone,
        business_name: body.businessName,
        business_pan: body.businessPan,
        business_gst: body.businessGst,
        loan_amount: body.loanAmount,
        monthly_turnover: body.turnover || '',
        needs: 'funds_needed',
        campaign: {
            source: body.campaignSource || 'website',
        },
    };

    try {
        const upstreamResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vendorPayload),
        });

        if (!upstreamResponse.ok) {
            console.error(`Business loan webhook forward failed with status ${upstreamResponse.status}`);
            return NextResponse.json({ error: 'Failed to submit lead' }, { status: 502 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error forwarding business loan lead:', error);
        return NextResponse.json({ error: 'Failed to submit lead' }, { status: 502 });
    }
}
