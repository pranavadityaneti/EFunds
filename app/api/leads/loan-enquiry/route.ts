import { NextResponse } from 'next/server';
import { sendLeadConfirmationEmail } from '@/lib/lead-confirmation-email';
import { sendLeadRescueEmail, type LeadRescueInput } from '@/lib/lead-rescue-email';

/**
 * The Docket-wired twin of /api/leads/business-loan: same fields, same
 * never-lose-a-lead promise, but the enquiry becomes a Docket CASE — subject,
 * checklist, and the initial document-request email, all in one call.
 *
 * DOCKET_INTAKE_URL + DOCKET_INTAKE_KEY live in Vercel env; the key is sent in
 * the x-intake-key header and never reaches the browser.
 */

interface LoanEnquiryRequest {
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

const REQUIRED_FIELDS: (keyof LoanEnquiryRequest)[] = [
    'contactName',
    'email',
    'phone',
    'businessName',
    'businessPan',
    'businessGst',
    'loanAmount',
];

export async function POST(request: Request) {
    let body: LoanEnquiryRequest;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const missing = REQUIRED_FIELDS.filter((field) => !body[field] || String(body[field]).trim() === '');
    if (missing.length > 0) {
        return NextResponse.json({ error: `Missing required fields: ${missing.join(', ')}` }, { status: 400 });
    }

    // Same promise as the partner-CRM route: a failure to reach Docket emails
    // the enquiry to the team and still tells the borrower it is captured —
    // because it is. Only "rescue also failed" is reported as an error.
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

    const rescue = async (failureReason: string) => {
        const rescued = await sendLeadRescueEmail(rescuePayload(failureReason));
        if (!rescued) {
            return NextResponse.json({ error: 'Failed to submit lead' }, { status: 502 });
        }
        await sendLeadConfirmationEmail({
            contactName: body.contactName,
            email: body.email,
            businessName: body.businessName,
        });
        return NextResponse.json({ success: true, captured: 'manual' });
    };

    const intakeUrl = process.env.DOCKET_INTAKE_URL?.trim();
    const intakeKey = process.env.DOCKET_INTAKE_KEY?.trim();
    if (!intakeUrl || !intakeKey) {
        console.error('DOCKET_INTAKE_URL / DOCKET_INTAKE_KEY not configured');
        return rescue('Docket intake is not configured');
    }

    try {
        const upstream = await fetch(intakeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-intake-key': intakeKey,
            },
            body: JSON.stringify({
                name: body.contactName,
                email: body.email,
                phone: body.phone,
                organisation: body.businessName,
                pan: body.businessPan,
                gst: body.businessGst,
                loanAmount: body.loanAmount,
                turnover: body.turnover || undefined,
                message: body.message?.trim() || undefined,
            }),
        });

        if (!upstream.ok) {
            const detail = await upstream.text().catch(() => '');
            console.error(`Docket intake failed with status ${upstream.status}: ${detail.slice(0, 500)}`);
            return rescue(`Docket intake returned ${upstream.status}`);
        }

        // Case created — Docket itself emails the document request, so the
        // borrower hears from the lender's own address. The confirmation mail
        // here stays best-effort, same as the sibling route.
        await sendLeadConfirmationEmail({
            contactName: body.contactName,
            email: body.email,
            businessName: body.businessName,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error forwarding loan enquiry to Docket:', error);
        return rescue(`Could not reach Docket intake: ${String(error)}`);
    }
}
