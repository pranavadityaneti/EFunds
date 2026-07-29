import { NextResponse } from 'next/server';
import { sendLeadConfirmationEmail } from '@/lib/lead-confirmation-email';
import { sendLeadRescueEmail, type LeadRescueInput } from '@/lib/lead-rescue-email';

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

    /**
     * The enquiry is captured either way.
     *
     * Every path below that fails to reach the partner system emails the
     * enquiry to the team instead, and reports success to the borrower —
     * because from their side it IS captured: a human has their details and
     * will call. Telling them "something went wrong" when we hold the lead
     * only invites a duplicate submission, or loses the enquiry entirely.
     * Only a genuinely unrecoverable case (rescue mail also failed) is
     * reported as a failure.
     */
    const rescuePayload = (failureReason: string): LeadRescueInput => ({
        contactName: body.contactName,
        email: body.email,
        phone: body.phone,
        businessName: body.businessName,
        businessPan: body.businessPan,
        businessGst: body.businessGst,
        loanAmount: body.loanAmount,
        turnover: body.turnover,
        message: body.message,
        campaignSource: body.campaignSource,
        failureReason,
    });

    /** Rescue, then answer the borrower honestly about what we could do. */
    const rescue = async (failureReason: string) => {
        const rescued = await sendLeadRescueEmail(rescuePayload(failureReason));
        if (!rescued) {
            // Nothing holds this enquiry now except the logs. Say so.
            return NextResponse.json({ error: 'Failed to submit lead' }, { status: 502 });
        }
        // Held by the team. Confirm to the borrower, and send them the same
        // acknowledgement they would have received on the happy path.
        await sendLeadConfirmationEmail({
            contactName: body.contactName,
            email: body.email,
            businessName: body.businessName,
        });
        return NextResponse.json({ success: true, captured: 'manual' });
    };

    const rawWebhookUrl = process.env.BUSINESS_LOAN_WEBHOOK_URL;
    if (!rawWebhookUrl || rawWebhookUrl.trim() === '') {
        console.error('BUSINESS_LOAN_WEBHOOK_URL is not configured');
        return rescue('BUSINESS_LOAN_WEBHOOK_URL is not configured');
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
            return rescue(`Partner webhook returned ${upstreamResponse.status}`);
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
        // The partner system was unreachable (DNS, TLS, timeout). Same promise
        // as every other failure: the enquiry is not lost.
        console.error('Error forwarding business loan lead:', error);
        return rescue(`Could not reach the partner webhook: ${String(error)}`);
    }
}
