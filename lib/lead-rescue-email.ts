import { Resend } from 'resend';

/**
 * The safety net for enquiries the vendor webhook refuses.
 *
 * WHY THIS EXISTS
 * The business-loan form forwards each enquiry to a partner webhook and stores
 * it nowhere else. When that webhook is unreachable or misconfigured (it
 * returned 404 for every submission on 28 Jul 2026), the borrower saw a generic
 * failure and their details vanished — no database row, no inbox, nothing to
 * follow up. A lead the business already earned should never be lost because a
 * third party is down.
 *
 * So: when the forward fails, the enquiry is emailed to the team instead. Every
 * field the borrower typed is in the mail, so it can be worked by hand and
 * re-entered later. Best-effort by construction — this function never throws,
 * because it runs on the failure path and must not create a second failure.
 */

export interface LeadRescueInput {
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
    /** Why the forward failed — the upstream status, or a thrown error. */
    failureReason: string;
}

const FIELD_LABELS: [keyof LeadRescueInput, string][] = [
    ['businessName', 'Business name'],
    ['contactName', 'Contact person'],
    ['phone', 'Phone'],
    ['email', 'Email'],
    ['businessPan', 'Business PAN'],
    ['businessGst', 'Business GSTIN'],
    ['loanAmount', 'Loan amount required'],
    ['turnover', 'Monthly turnover'],
    ['message', 'Funding needs'],
    ['campaignSource', 'Source'],
];

function rows(input: LeadRescueInput): [string, string][] {
    return FIELD_LABELS.map(([key, label]) => {
        const value = input[key];
        return [label, value && String(value).trim() !== '' ? String(value) : '—'] as [string, string];
    });
}

/** HTML-escape: these values are borrower input and land in an email body. */
function esc(s: string): string {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function buildHtml(input: LeadRescueInput): string {
    const cells = rows(input)
        .map(
            ([label, value]) =>
                `<tr><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7;color:#6b7280;font-size:13px;white-space:nowrap;">${esc(label)}</td>` +
                `<td style="padding:8px 12px;border-bottom:1px solid #e4e4e7;color:#111827;font-size:14px;font-weight:500;">${esc(value)}</td></tr>`,
        )
        .join('');
    return `<!DOCTYPE html>
<html><body style="margin:0;padding:24px;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;border:1px solid #e4e4e7;overflow:hidden;">
    <tr><td style="background:#b91c1c;padding:16px 20px;">
      <div style="color:#fff;font-size:15px;font-weight:700;">Action needed: enquiry could not be forwarded</div>
    </td></tr>
    <tr><td style="padding:20px;">
      <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#4b5563;">
        A business loan enquiry was submitted on finlot.ai but could not be delivered to the partner system.
        <strong style="color:#111827;">The borrower's details are below — follow up manually and re-enter the lead once the integration is working.</strong>
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${cells}</table>
      <p style="margin:16px 0 0;font-size:12px;color:#9ca3af;">Failure reason: ${esc(input.failureReason)}</p>
    </td></tr>
  </table>
</body></html>`;
}

function buildText(input: LeadRescueInput): string {
    return [
        'ACTION NEEDED: a business loan enquiry could not be forwarded to the partner system.',
        "The borrower's details are below — follow up manually and re-enter the lead once the integration is working.",
        '',
        ...rows(input).map(([label, value]) => `${label}: ${value}`),
        '',
        `Failure reason: ${input.failureReason}`,
    ].join('\n');
}

/**
 * Email a failed enquiry to the team. Returns true if the mail was accepted,
 * false if it was skipped or failed (reason logged). Never throws.
 */
export async function sendLeadRescueEmail(input: LeadRescueInput): Promise<boolean> {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    // Where rescued leads go. Falls back to the support inbox rather than
    // silently dropping them if the dedicated variable was never set.
    const to = (process.env.LEAD_ALERT_EMAIL || 'support@finlot.ai').trim();

    if (!apiKey || !fromEmail) {
        // Loud: this is the failure path's failure path. The enquiry is now
        // only recoverable from the platform logs below.
        console.error(
            'LEAD LOST — Resend not configured, cannot rescue enquiry. Full payload: ' +
                JSON.stringify(input),
        );
        return false;
    }

    try {
        const resend = new Resend(apiKey);
        const { error } = await resend.emails.send({
            from: `Finlot Website <${fromEmail}>`,
            to,
            replyTo: input.email?.trim() || undefined,
            subject: `Action needed: enquiry not forwarded — ${input.businessName?.trim() || 'Unknown business'}`,
            html: buildHtml(input),
            text: buildText(input),
        });
        if (error) {
            console.error(
                'LEAD LOST — rescue email failed: ' +
                    (error.message ?? String(error)) +
                    ' | Full payload: ' +
                    JSON.stringify(input),
            );
            return false;
        }
        return true;
    } catch (err) {
        console.error('LEAD LOST — unexpected error sending rescue email: ' + String(err) + ' | Full payload: ' + JSON.stringify(input));
        return false;
    }
}
