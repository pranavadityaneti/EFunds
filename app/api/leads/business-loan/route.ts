import { NextResponse } from 'next/server';
import { sendLeadConfirmationEmail } from '@/lib/lead-confirmation-email';

interface BusinessLoanLeadRequest {
    contactName?: string;
    email?: string;
    phone?: string;
    businessName?: string;
    businessPan?: string;
    businessGst?: string;
    loanAmount?: string;
    turnover?: string;
    message?: string;
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

    const rawWebhookUrl = process.env.BUSINESS_LOAN_WEBHOOK_URL;
    if (!rawWebhookUrl || rawWebhookUrl.trim() === '') {
        console.error('BUSINESS_LOAN_WEBHOOK_URL is not configured');
        return NextResponse.json({ error: 'Lead submission is not configured' }, { status: 500 });
    }

    // The vendor endpoint 301-redirects URLs without a trailing slash, which
    // turns the POST into a GET and drops the body. Normalize pasted values.
    let webhookUrl = rawWebhookUrl.trim().replace(/^["']+|["']+$/g, '');
    if (!webhookUrl.endsWith('/')) {
        webhookUrl += '/';
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
        funds_needed: body.message?.trim() || 'Business loan enquiry',
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
            const upstreamBody = await upstreamResponse.text().catch(() => '');
            console.error(`Business loan webhook forward failed with status ${upstreamResponse.status}: ${upstreamBody.slice(0, 500)}`);
            return NextResponse.json(
                { error: 'Failed to submit lead', upstreamStatus: upstreamResponse.status },
                { status: 502 }
            );
        }

        // Lead is captured. Send a confirmation email as a best-effort side
        // effect — a mail failure must not fail the submission the borrower made.
        await sendLeadConfirmationEmail({
            contactName: body.contactName,
            email: body.email,
            businessName: body.businessName,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error forwarding business loan lead:', error);
        return NextResponse.json({ error: 'Failed to submit lead' }, { status: 502 });
    }
}
