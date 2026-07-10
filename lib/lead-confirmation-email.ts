import { Resend } from 'resend';

interface LeadConfirmationInput {
    contactName?: string;
    email?: string;
    businessName?: string;
}

const REPLY_TO = 'support@finlot.ai';
const LOGO_URL = 'https://www.finlot.ai/logo.png';

function buildHtml(firstName: string, businessName: string): string {
    return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e4e4e7;">
          <tr>
            <td style="background-color:#000000;padding:22px 32px;">
              <img src="${LOGO_URL}" width="135" alt="Finlot" style="display:block;border:0;height:auto;line-height:100%;outline:none;text-decoration:none;" />
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <h1 style="margin:0 0 16px;font-size:22px;font-weight:600;color:#111827;">Thank you, ${firstName}!</h1>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#4b5563;">
                We've received your business loan enquiry for <strong style="color:#111827;">${businessName}</strong>.
              </p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#4b5563;">
                Our business lending team will review your details and get back to you within <strong style="color:#111827;">24 hours</strong>.
              </p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#4b5563;">
                If you have any questions in the meantime, just reply to this email and we'll be happy to help.
              </p>
              <div style="border-top:1px solid #e4e4e7;padding-top:20px;">
                <p style="margin:0;font-size:14px;color:#6b7280;">Warm regards,</p>
                <p style="margin:4px 0 0;font-size:14px;font-weight:600;color:#111827;">The Finlot Team</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color:#fafafa;padding:20px 32px;border-top:1px solid #e4e4e7;">
              <p style="margin:0;font-size:12px;line-height:1.5;color:#9ca3af;">
                You're receiving this email because you submitted a business loan enquiry at finlot.ai.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildText(firstName: string, businessName: string): string {
    return [
        `Thank you, ${firstName}!`,
        ``,
        `We've received your business loan enquiry for ${businessName}.`,
        ``,
        `Our business lending team will review your details and get back to you within 24 hours.`,
        ``,
        `If you have any questions in the meantime, just reply to this email and we'll be happy to help.`,
        ``,
        `Warm regards,`,
        `The Finlot Team`,
        ``,
        `You're receiving this email because you submitted a business loan enquiry at finlot.ai.`,
    ].join('\n');
}

/**
 * Sends a confirmation email to the borrower. Best-effort: never throws to the
 * caller, so a mail failure cannot break the lead-capture flow. Returns true on
 * a successful send, false if skipped or failed (with the reason logged).
 */
export async function sendLeadConfirmationEmail(input: LeadConfirmationInput): Promise<boolean> {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !fromEmail) {
        console.warn('Resend is not configured (RESEND_API_KEY / RESEND_FROM_EMAIL); skipping confirmation email');
        return false;
    }

    if (!input.email || input.email.trim() === '') {
        return false;
    }

    const firstName = (input.contactName || '').trim().split(/\s+/)[0] || 'there';
    const businessName = (input.businessName || '').trim() || 'your business';

    try {
        const resend = new Resend(apiKey);
        const { error } = await resend.emails.send({
            from: `Finlot <${fromEmail}>`,
            to: input.email.trim(),
            replyTo: REPLY_TO,
            subject: "We've received your business loan enquiry — Finlot",
            html: buildHtml(firstName, businessName),
            text: buildText(firstName, businessName),
        });

        if (error) {
            console.error('Resend confirmation email failed:', error);
            return false;
        }

        return true;
    } catch (err) {
        console.error('Unexpected error sending confirmation email:', err);
        return false;
    }
}
