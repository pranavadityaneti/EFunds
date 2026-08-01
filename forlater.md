# forlater.md — Deferred Work Queue

Items Pranav has explicitly said "not now" to. Do not re-introduce these into current
scope without his say-so. Read at the start of every session; surface the top items.

---

## Active queue

### 1. Docket strategic pivot — "make it ours" (nav restructure + SaaS repositioning + bets)
- **What & why:** Reposition Docket from a Gain-replica into its own **SaaS product for external
  lenders** — guided/opinionated, meaningful restructure (keep capabilities, our own IA/flows).
  Full spec in `docs/docket-product-bets.html` (companion: `docs/gain-parity-audit.html`).
- **Scope (large / multi-phase):**
  - **Nav restructure** — from Gain's 8 channel-centric modules → ~7 outcome-centric surfaces:
    Home · Pipeline (leads + unified borrower File) · Contacts · Documents · AI Workforce
    (de-silo Calling/WhatsApp/Email) · Growth · Compliance + settings (Integrations/Team/
    Workspace/Billing). Collapses ~35 screens → ~7.
  - **Bet: India-DPI-native** — Account Aggregator, DigiLocker, Aadhaar/Video-KYC, eSign,
    UPI Autopay/e-NACH, Bureau/PAN/GST, OCEN/ULI; "Integrations" becomes a DPI control panel.
  - **Bet: Agentic document engine** — auto classify → extract → validate borrower docs,
    exception-only human review; smart blueprints; first-class "Documents" surface.
  - **Compliance-as-a-product** — KFS engine (RBI DLD 2025), audit trail, consent ledger,
    data-localization, grievance flow.
  - **QR device-handoff** — desktop→phone QR for doc upload/Video-KYC/e-sign; self-serve &
    partner-attributed QR; QR/UPI payment-data credit signal.
  - **Unified borrower File** (de-silo channels) + **multi-tenant SaaS platform** (workspace
    switch, white-label, no-code builder, usage billing, blueprint marketplace).
  - **AI model stack** — model-agnostic router; Opus 4.8 brain / Sonnet 5 volume / Haiku 4.5
    voice-loop (product runtime) + Sarvam/Bhashini for Indian-language speech.
- **Status:** DEFERRED by Pranav (12 Jul 2026) — "save the entire strategic pivot to later."
- **Carved out & proceeding NOW (not deferred):** the reimagined **Home = guided
  next-best-action cockpit** (Bet 1). Only this piece is in current scope.
- **Originated-from:** 12 Jul 2026 session — Gain parity audit → product-direction pivot.

---


### 3. Docket — QR / walk-in document capture (hospital front-desk pattern)
- **What & why:** In-person entry point: front desk shows a QR, the subject scans and uploads from
  their phone there and then. Relevant to hospitals (patient intake at the counter), and any
  walk-in context — branch visits, campus admissions desks, vendor onboarding at an office.
- **Why it's separate from the core:** Docket's primary intake is conversational (WhatsApp + email
  to a per-tenant number/address, AI consolidates). QR is a *different* entry point — no prior
  contact details needed, the subject is physically present, and it likely needs a lightweight
  web upload surface, which the WhatsApp/email flow does not.
- **Status:** DEFERRED by Pranav (18 Jul 2026) — "Save in forlater.md" when reviewing entry points
  per industry.
- **Originated-from:** 18 Jul 2026 session — mapping document-collection entry points across
  industries for the Docket platform pivot.

---

### 4. Docket — third-party document submission (spouse / parent / agent on the subject's behalf)
- **What & why:** A document arrives from a number/email that is NOT the one registered on the case
  — a spouse, parent, CA, or agent sending for the subject. Common in Indian lending and education
  (a parent submits for a student). v1 REJECTS these: data must come from the registered phone or
  email only.
- **Scope when actioned:** a way to authorise an additional sender per case (verified, audited, and
  consented), plus the AI matching rules to accept them. Security-sensitive — an unverified third
  party sending KYC is an obvious impersonation vector, so this needs a real design, not a relaxed
  matching rule.
- **Status:** DEFERRED by Pranav (18 Jul 2026) — "To start with, this is not allowed… But save the
  idea to forlater.md".
- **Originated-from:** 18 Jul 2026 session — inbound matching rules for the conversational
  document-collection model.

---

### 5. Docket — multi-language WhatsApp / voice (Hindi, Tamil, Telugu, Marathi, …)
- **What & why:** v1 is **English only**. India is multilingual and the subjects being chased for
  documents are often most comfortable in a regional language — this materially affects response
  rates, which is the whole point of the product. Applies to WhatsApp copy, AI nudges, and the
  voice bot.
- **Scope when actioned:** localised template sets (each needs its own Meta approval per WABA),
  language detection on inbound, and a multilingual voice stack (Sarvam / Bhashini were noted in
  the master plan for Indian-language speech).
- **Status:** DEFERRED by Pranav (18 Jul 2026) — "English only to start with… save forlater.md".
- **Originated-from:** 18 Jul 2026 session — conversational document-collection brief.

---

### 6. Docket — swap WhatsApp temporary token for a permanent System User token
- **What & why:** The Meta **temporary access token** from WhatsApp → API Setup expires in
  **24 hours**. It is fine for proving the intake pipeline works, but the demo is ~1 week out,
  so it *will* be dead by then and inbound media downloads will start failing with a 401
  (surfaced on the channel's `lastError`). The real fix is a **System User token** from
  Business Settings → System Users, which does not expire.
- **Scope when actioned:** create System User in the Meta Business portfolio, assign the app +
  WABA assets, generate a token with `whatsapp_business_messaging` +
  `whatsapp_business_management`, then update the stored channel credential (re-seal via the
  channels API — no code change needed, the credential is just re-encrypted).
- **Status:** FLAGGED by Claude (22 Jul 2026) — not yet actioned. **Must be done before the demo.**
- **Originated-from:** 22 Jul 2026 session — WhatsApp channel setup.

---

### 7. Docket — WhatsApp webhook: ACK immediately, process async (audit M3)
- **What & why:** The webhook awaits media download + S3 + DB before returning 200 to Meta.
  Worst case per message is ~45s of fetch timeouts; Meta expects a fast response, treats slow
  ones as failures, re-delivers, and can throttle/disable a persistently slow webhook. Fine at
  demo scale (one small PDF ≈ 1–2s); a real liability at volume.
- **Scope when actioned:** return `EVENT_RECEIVED` immediately after signature verification;
  push ingestion onto an in-process queue (or SQS later). Checksum dedup already makes
  redelivery-during-processing safe.
- **Status:** DEFERRED (22 Jul 2026) — audit finding M3; Pranav approved fixing M1/M4/M2 now
  and queueing this one past the demo.
- **Originated-from:** 22 Jul 2026 session — WhatsApp intake audit.

---

### 8. Docket — email intake trusts the spoofable From header (audit sibling)
- **What & why:** The email poller's fallback match maps the sender's `From` address to a
  contact's most recent case. `From` is spoofable — someone who knows a contact's email could
  file a document onto that contact's case. WhatsApp does not share this hole (Meta
  authenticates senders). Pre-existing in the email poller, NOT introduced by the WhatsApp work.
- **Scope when actioned:** check SPF/DKIM/DMARC authentication results from the receiving
  mailbox headers before honouring a From-based match (Gmail exposes `Authentication-Results`);
  unauthenticated senders fall through to "left for a human", same as no-match.
- **Status:** FLAGGED by Claude (22 Jul 2026) — queued per no-scope-creep rule.
- **Originated-from:** 22 Jul 2026 session — WhatsApp intake audit, class-of-failure sweep.

---

### 9. Docket — register the prod WhatsApp channel + Meta webhook + first E2E document
- **What & why:** The server side is DONE and live (`deploy-79377c9-145940`): webhook receiver
  deployed, audited, hardened; verify handshake proven in prod. What remains is entirely on the
  Meta side + one registration call. Pranav does not have the token/app secret ready yet
  (23 Jul 2026) — parked on his word.
- **Scope when actioned (~10 min once values are in hand):**
  1. Meta → WhatsApp → API Setup: **Generate token**; add Pranav's mobile as test recipient
     (verification code); App settings → Basic → copy **App secret**. Keep both OUT of chat.
  2. **Recommended:** skip the 24-hour temporary token — create a **System User token** directly
     (Business Settings → System Users; assign app + WABA; scopes `whatsapp_business_messaging`
     + `whatsapp_business_management`). Doing this absorbs item 6 entirely.
  3. Claude hands a terminal command with hidden prompts → registers the channel via
     `POST /channels/whatsapp` (address, phoneNumberId `1245401561986264`, token, app secret —
     credentials sealed at rest, never in transcript).
  4. Meta → webhook config: callback `https://docket-api.finlot.ai/webhooks/whatsapp`,
     verify token `docket-bf8e95ed316940dde74db739`, subscribe to **messages**.
  5. Send a real document to test number +1 (555) 188-8857 with the case ref in the caption →
     confirm it lands on the case; this also gives the HMAC accept-path its first real proof.
- **Known state:** WABA ID `1374539067974108`; prod secret already carries WHATSAPP_VERIFY_TOKEN;
  0 cases in prod (create one before the E2E test).
- **Timing risk:** WhatsApp is a MUST-HAVE for the demo (~29 Jul). Do not leave this to demo eve —
  Meta business verification or token quirks need slack to resolve.
- **Status:** DEFERRED by Pranav (23 Jul 2026) — "I do not have the token and app secret ready."
- **Originated-from:** 22–23 Jul 2026 sessions — WhatsApp channel build/deploy.

---

### 10. Docket — nudge reminder cron: bound the scan at scale
- **What & why:** `NudgeService.reminderScan` (hourly) selects ALL active, contactable cases
  with no `LIMIT`, and for each complete-but-active case does one `checklist()` read per tick
  that then skips as "complete". Correct and invisible at demo scale (~0 prod cases), but at
  thousands of idle cases it is wasted queries every hour. Budget caps *sends* (50), not the
  *scan*.
- **Scope when actioned:** add a materialised "outstanding requirement count" (or a
  `nudges_complete_at` marker) on the case, updated on document accept/reject/remove, so the
  cron can filter complete cases in SQL; and/or paginate the candidate scan with a cursor.
- **Status:** FLAGGED by Claude (24 Jul 2026) during Task 4 audit; Pranav approved queueing.
- **Originated-from:** 24 Jul 2026 session — document-nudges feature (Task 4).

---

### 11. Docket — AI classifier: deferred review findings (defect B + 20 unverified)
- **What & why:** The 30 Jul adversarial review (`docs/docket-ai-classifier-code-review.html`)
  confirmed 12 findings. Five were fixed in `61f1b57`. These remain:
  - **Defect B (medium): slot-capacity race.** `assertSlotFree` locks only the subject
    document's row, so two simultaneous auto-files (or an auto-file racing a human upload)
    can both see a free slot and exceed `maxFiles` — classic write-skew. The claim fix in
    61f1b57 shrinks the window considerably but does not close it. Fix: lock the requirement
    (or case) row for the capacity check, or a partial unique index on occupancy.
  - **Manual "reclassify" action.** 61f1b57 deliberately does NOT retry a failed
    classification (retry is what reintroduced the unbounded loop). A document whose
    classification errored stays unclassified forever. A staff-triggered reclassify, or a
    bounded attempts counter, is the honest way to add retry back.
  - **20 unverified findings** listed in the report's final appendix — NOT adversarially
    checked, may contain false positives. The one worth early attention: unpdf 1.8.0's CJS
    build appears to ship a broken `import.meta.resolve` transform, so cMap/font defaults
    never load and **CID-font (Indic-script) PDFs silently classify as "scanned"** — which
    matters more for this product than most. Others: OpenAI refusal field never read,
    base64 inflation vs the 20MB image limit, missing index on
    `documents.suggested_requirement_id`, `auto_filed` going stale-true after requirement
    deletion, tenant-authored labels as a second injection surface.
- **Status:** DEFERRED (30 Jul 2026) — Pranav approved fixing A/C/D/E/F only.
- **Originated-from:** 30 Jul 2026 adversarial review of the AI classifier.

---

## In progress

_(none)_

---

## Done — archived

### 2. Move Docket prod secrets from EB env properties → Secrets Manager
- **What & why:** `DATABASE_URL` (contains the `docket_owner` DB password) and `JWT_SECRET` are set
  as **Elastic Beanstalk environment properties**. They are encrypted at rest, but any IAM principal
  with `elasticbeanstalk:DescribeConfigurationSettings` (or EB console read) sees them in **plaintext**.
  Acceptable today: solo account, no borrower data in the DB yet. Not acceptable once Docket holds
  real borrower PII under RBI rules, or once staff/auditors have AWS access.
- **Scope:** change `apps/api/src/config/env.ts` to fetch `DATABASE_URL` + `JWT_SECRET` from Secrets
  Manager at boot (async env loading in the NestJS bootstrap path). The plumbing is already half
  built — the EB instance role has proven Secrets Manager read access, and policy
  `docket-read-db-secret` already covers `docket/prod/*`. Then **rotate the `docket_owner` password
  and the JWT secret**, since both will have sat in EB config.
- **Status:** DEFERRED by Pranav (16 Jul 2026) — chose "EB env properties now, Secrets Manager
  before borrower data" so D4 (deploy + migrate + bootstrap) isn't blocked on a boot-path refactor.
- **ALSO in this item — verify the RDS server certificate.** `DATABASE_URL` carries
  `?sslmode=require`: traffic IS encrypted (TLS 1.3, TLS_AES_256_GCM_SHA384) but the server
  certificate is NOT verified, so anything already inside the VPC could impersonate RDS. Proven
  working on the instance 16 Jul: download the RDS CA bundle
  (`https://truststore.pki.rds.amazonaws.com/ap-south-1/ap-south-1-bundle.pem`, 3 certs) and pass
  `ssl: { ca, rejectUnauthorized: true }` to `postgres()` in `packages/db/src/client.ts` →
  connects, verified. Needs env-aware handling: local Postgres has no TLS, so this must not apply
  in dev. Deferred with the same trigger, since it is the same "harden before borrower data" pass.
- **Trigger to action this:** before ANY real borrower data lands, or before anyone else gets AWS
  access — whichever comes first.
- **Originated-from:** 16 Jul 2026 session — D4.2, deciding how secrets reach the API on EB.
- **STATUS: DONE — 19 Jul 2026.** Secrets moved to `docket/prod/app` (read at boot via
  `APP_SECRET_ID`); `DATABASE_URL` and `JWT_SECRET` REMOVED from EB environment properties
  (verified: querying EB for them returns `[]`). docket_owner password and JWT secret both
  rotated. Database TLS moved from `sslmode=require` to full certificate verification against the
  embedded Amazon RDS CA bundle — proven against real RDS, with a control showing it is correctly
  refused without the CA. Migration runner shares the same posture.

---


## 12. Marketing repo: invert ClientLayout's publicRoutes allow-list
- **What:** `components/ClientLayout.tsx` wraps EVERY route in the old CRM
  dashboard sidebar unless the path is on a hardcoded `publicRoutes` list.
  Every new public/marketing page silently renders inside the CRM chrome
  until someone remembers the list — bit us on 1 Aug when the new
  `/loan-enquiry` page shipped wearing the dashboard sidebar (fixed by
  adding it to the list, commit d55a2d8).
- **Why deferred:** the solid fix inverts the default (dashboard routes are
  the exception, marketing is the default — matching the host-split model
  in next.config.ts), which touches CRM feature territory and needs its own
  test pass. Not on demo day.
- **Scope:** components/ClientLayout.tsx; verify every /CRMdashboard, leads,
  applications, partners, employees, managers, payouts, notifications route
  still gets the shell, and every marketing page doesn't.
- **Status:** Active queue. **Date:** 1 Aug 2026.
- **Originated-from:** Phase 1 of the Eswar demo build (loan-enquiry page).
