# SESSION_LOG.md — Finlot project

## 2026-07-12 — Gain analysis → in-house platform master plan

**Context carried in:** finlot.ai live site (EFunds repo) with working Gain webhook
(new pipe uid-vazL3…), Resend confirmation email live (support@updates.finlot.ai),
ERRORS.md has the webhook debugging lessons.

**This session:**
1. Read Gain Enterprise Deck (18pp) + walked Finlot's live Gain tenant
   (efundzz.hicaliber.net) read-only; produced `docs/gain-analysis-and-project-plan.html`
   (10 sections: platform map, integration state, gap analysis, 8-phase activation plan).
   Key findings: webhook ingestion works; "Business Loan" workflow PENDING (automation off);
   Blueprints active for 3 of 4 constitutions (LLP missing); Finlot has no LOS/LMS of its own.
2. **CEO/Director mandate:** build a Gain-class platform in-house (AI workforce for loan
   origination, CRM, cloud contact centre, WhatsApp/email agents, doc validation engine,
   workflow builder). Produced `docs/finlot-ai-workforce-platform-project-plan.html`
   (16 sections, validated HTML): three-horizon strategy (own-use engine → parity → SaaS),
   build-vs-buy per layer (buy telephony/BSP/KYC/LLM; build orchestration/CRM/UI),
   TS monorepo stack (Next.js + NestJS + Postgres RLS + BullMQ), data model, AI layer
   (Opus 4.8 docs/validation, Haiku 4.5 voice loop, Sonnet 5 batch — verified pricing),
   14-vendor integration matrix, internal API surface, P0/P1/P2 parity checklist vs Gain,
   7 phases (~40 weeks to parity v1), cost model ₹1.2–2.3 Cr (vs Gain's ₹2–5 Cr benchmark),
   DPDP/RBI/TRAI compliance section, risk register, 6 decisions for CEO/Director.

**Open threads:**
- CEO/Director decisions pending (§16 of the plan): budget/team, Gain ToS review,
  H3 commitment, voice vendor posture, pilot risk %, platform branding.
- Vendor quotes needed (Phase 0): Exotel/Ozonetel, WhatsApp BSP, Vapi/Bolna, Karza/Surepass, Perfios.
- Gain side: business_gst still unmapped in their pipe; test leads to purge; LLP blueprint missing.
- Resend env vars are set in Vercel; confirmation email verified live.

**Domain split shipped (PR #8, merged + deployed + verified live):** next.config.ts host-based
redirects — docket.finlot.ai = dashboard (root → /CRMdashboard), www.finlot.ai = marketing site;
dashboard routes bounce off www→docket, marketing routes off docket→www; /api/* never redirected
(lead pipeline verified intact on both hosts). Note: docket currently serves the EXISTING demo
dashboard (mock data, no backend) — interim only. Decision recorded: salvage the design system
(Sidebar/DataTable/HeroBanner/charts/teal theme), build the real Gain-parity platform as its OWN
app per the master plan, repoint docket at it later. Platform scaffold HELD pending §16 decisions
(Gain ToS/contract conflict review + budget) — the legal gate must clear before building a competitor.

**Files this session:** docs/gain-analysis-and-project-plan.html (new),
docs/finlot-ai-workforce-platform-project-plan.html (new),
docs/finlot-ai-workforce-platform-project-plan.pdf (new — 25pp, rendered via headless Chrome
from the HTML; regenerate with the same command if the HTML changes), SESSION_LOG.md (new).
Nothing committed to git this session; docs/ currently untracked.

## 2026-07-12 (cont.) — Phase 0 GREENLIT → Docket platform scaffolded

**Legal gate cleared by user:** "The agreement and budgets are cleared way in advance.
Development is late to the party, let's catch up." → the §16 hold is lifted; Phase 0 scaffolding
authorised. Product name for the platform: **Docket** (matches the docket.finlot.ai host).

**New repo (separate from EFunds/finlot.ai):** `/Users/pranavaditya/projects/docket/`
- pnpm workspace monorepo (`apps/*`, `packages/*`); `apps/web` = Next.js 16.2.10 dashboard app
  (React 19, Tailwind v4, Turbopack), shadcn/ui installed (13 components), themed to Finlot teal
  (`--primary` deep teal #0d9488 for buttons/active, `--ring`/`--chart-1`/`--sidebar-ring` bright
  teal #30d5c8 for accents) in both :root and .dark.
- Shell built: `components/app-sidebar.tsx` (Gain-parity nav — Overview / CRM / Engage /
  Origination / Automation, Review-Queue badge), `app/layout.tsx` (SidebarProvider + sticky
  header), `app/page.tsx` ("Command centre" dashboard — 4 KPI cards, pipeline table, campaign
  health; MOCK data, no backend yet).
- Dev server verified running (localhost:3000, 200) and screenshotted — teal theme + sidebar +
  KPIs render correctly. tsc clean.
- **Committed to git** (local only): `git init` + initial commit "chore: scaffold Docket
  platform…" (41 tracked files, node_modules gitignored). No GitHub remote yet.

**pnpm friction resolved (see ERRORS.md):** ignored-builds (sharp, unrs-resolver) made pnpm
exit 1 → fixed via `pnpm rebuild sharp unrs-resolver`; builds now approved so `pnpm dev` works.
`.npmrc` has `verify-deps-before-run=false`. Env linter keeps re-injecting a harmless `allowBuilds`
placeholder into pnpm-workspace.yaml — pnpm ignores it.

**Leads screen + design-system pass (uncommitted, verified in browser):**
- `app/leads/page.tsx` (new) — first Gain-parity screen: stage-filter pills w/ live counts,
  search, full pipeline table (14 mock leads, ₹ Indian format, owner avatars, stage badges).
- Sidebar is now route-aware (`app-sidebar.tsx`): next/link via base-ui `render` prop (NOT
  Radix `asChild` — this shadcn build is @base-ui/`useRender`), active state from usePathname;
  unbuilt items inert+dimmed so nothing 404s. New `components/app-header.tsx` = dynamic page title.
- **Fonts/icons/spacing (user-requested):** body font → **Google Sans Flex** via next/font/google
  (verified in next font-data.json; self-hosted). App icons → **Material Symbols Outlined** via
  Google Fonts `<link>` in root `<head>` (next/font doesn't carry it) + reusable
  `components/ui/icon.tsx` (`<Icon name size fill weight/>`, FILL axis for active nav). Replaced
  ALL lucide usages in nav/header/dashboard/leads. Sidebar spaced out (h-9 items, gap-1.5/gap-3).
- **BUG CAUGHT + FIXED (Times fallback):** globals.css applied `font-sans` to `html`, but the
  next/font `--font-sans` var is set on `body` → html/body computed to **Times serif** the whole
  time (incl. earlier scaffold screens). Fix: apply `font-sans` on `body` (same element as the
  var). Verified: body/h1/td now computedStyle = "Google Sans Flex". Root-cause fix, not a patch.
- Verified live: both screens render (Google Sans + Material Symbols glyphs, not ligature text),
  no console errors, stage filter works (Docs pending → 2 rows), no Dashboard regression. tsc clean.

**Open threads (Docket):**
- Uncommitted: Leads screen + font/icon/spacing pass — awaiting Pranav's approval to commit.
- No GitHub remote yet — offer to create `docket` repo + push (git-based Vercel deploy later).
- Material Symbols loads from Google CDN (runtime dep) — could self-host later for offline/perf.
- Next screens: SUPERSEDED by the parity audit below — restructure sidebar to Gain's 8 modules first.
- Carryover from earlier: Gain business_gst mapping, LLP blueprint, purge Gain test leads.

## 2026-07-12 (cont.) — Gain parity audit (full field-by-field re-inventory)

**Trigger:** Pranav — "check the Gain dashboard again, cross-verify we aren't missing anything…
must not miss even a single letter or a field" (re: Leads + all screens).

**Method:** Read-only walkthrough of the live Gain tenant (efundzz.hicaliber.net, logged in as
IT Admin) via claude-in-chrome. Walked all 8 nav groups / ~35 screens + top bar. No mutations.

**Deliverable:** `docs/gain-parity-audit.html` (7 sections: exec summary, full nav parity matrix,
Leads deep-dive w/ exact 8-field schema + 12 stages, screen-by-screen inventory, missing concepts,
proposed corrected structure, data flags/typos). HTML per house rule.

**Headline finding — our Docket sidebar is structurally WRONG vs Gain:**
- Gain's 8 top-level modules: Dashboard · Contacts · **Human Resource** · **Sales** · Calling ·
  Whatsapp · Email · **Integrations**. NO "CRM/Engage/Origination/Automation" grouping.
- Leads & Partners live under **Sales** (not "CRM"). Blueprints live under **Integrations**
  (not "Origination"). Our invented "Documents / Review Queue / Workflows / Campaigns" don't exist.
- Missing whole modules: **Human Resource** (Employee + RBAC Hierarchy), **Integrations**
  (Pipes/Plugins/Tags/Blueprints), **Sales→Auctions**.
- **Calling = 15-screen cloud contact centre** (Assistants, Agent Attempts, Inbound/Transfer
  Dashboards, Inbound Analytics, Queues, Queue Monitor, Skills, Agent Skills, Routing Rules,
  Inbound Numbers, Voice Menu, Disposition Codes, Recording, Supervisor). We have 1 flat item.
- **Leads = 6-view workspace** (All Leads / Action / Board / List / Dashboard / Settings) +
  **workflow selector** + **configurable 8-field schema** + **12-stage board** (Pending →
  entity-specific Doc Collection → Follow up/Auto Follow-Up → Human Escalated → Not Interested/
  Not Picked/No Answer → Completed → Missing PanCard). Our stage pills are hardcoded & wrong.

**Exact Business-Loan lead schema (8 fields):** pan_number(text,PAN regex), company_name(text),
loan_amount(number), loan_type(dropdown: SME Term Loan/LAP/Working Capital/Top-up),
entity_type(dropdown: Proprietorship/Partnership/Private Limited/Public Limited/LLP),
source(dropdown: "Protal"[sic]/Whatsapp/Email/Referral/Website/Other), monthly_turnover(number),
funds_needed(textarea). NO GST field. name/email/phone = base Contact identity.

**Data flags:** "Protal" typo in Gain source enum; agent name "Bussines" typo; business_gst
unmapped; LLP+Public-Ltd blueprints missing (only PVT LTD/Partnership/Proprietorship exist);
Business Loan workflow route = Pending; Pipes sync jobs 10 w/ 4 failures.

**Our webhook confirmed in Gain:** Integrations→Pipes Route Graph = Webhook "Lead Intake" →
Dataset "Lead Intake Payload" → Route "Active ingestion" (active) → Workflow "Business Loan" (Pending).

**Recommendation (awaiting Pranav):** restructure Docket sidebar to Gain's 8 modules; rework the
Leads screen (Sales group + workflow selector + real 12-stage configurable board + true fields
incl. Loan Type/Entity Type). Retire invented items. Build order P0=Contacts+Leads, then P1 modules.

## 2026-07-12 (cont.) — Parity fixes landed: 3 commits + Leads reworked

**Committed to docket (3 separate commits, per Pranav):** 9ca9bf5 feat: Leads screen + route-aware
sidebar; bb5cf7b style: Google Sans Flex + Material Symbols; ff59b09 refactor: sidebar → Gain's
8-module nav. (Grouped so each tree is self-consistent; final verified state at HEAD. Working tree clean.)

**Sidebar restructured** to Gain's 8 modules as collapsible groups (Dashboard, Contacts, Human
Resource, Sales, Calling[15], Whatsapp, Email, Integrations); Leads/Partners under Sales, Blueprints
under Integrations; unbuilt items inert/dimmed; auto-expands the active group. tsc clean, verified.

**Leads screen reworked to Gain parity (UNCOMMITTED — awaiting approval):** `app/leads/page.tsx`
rewritten — 6 view tabs (All Leads/Action/Board/List/Dashboard/Settings), workflow selector
(Business Loan + Create New Workflow), toolbar (Search/Updated At/Download/Filters/Refresh),
All Leads table with REAL fields (Loan Type, Entity, Source) + REAL 12 stages color-coded, Board
= 12-stage kanban, Settings surfaces the 8 schema keys. "Portal" typo corrected (vs Gain's "Protal").
Verified in browser: All Leads, Board, Settings, workflow dropdown all render; no console errors; tsc clean.
- STILL MOCK/next increments: +Lead create form (the 8 fields), functional sort/filter/export,
  List/Action/Dashboard views (currently informative placeholders), real backend/data.

## 2026-07-12 (cont.) — Strategic pivot deferred · Home cockpit + wired +Lead form

**Pivot:** Pranav — stop cloning Gain, make Docket its own SaaS (external lenders · guided/
opinionated · meaningful restructure · everything fair game + AI/QR/DPI feature layer). Ran web
research → `docs/docket-product-bets.html` (3 starting bets: Guided cockpit+NBA, India-DPI-native,
Agentic doc engine; AI model stack; Gain→ours nav proposal). Then Pranav: "save the entire pivot
to later, only use the reimagined Home." → **entire pivot banked in `forlater.md`**; Home carved out.

**Committed to docket:** `6fe3369 feat: reimagine Home as a guided next-best-action cockpit` —
app/page.tsx reworked into: "Needs you now" NBA queue (prioritised, one-click next action per
item), AI-workforce pulse (autonomous work + escalations), pipeline KPI strip. Replaces the passive
KPI/table dashboard. Nav label still "Dashboard" (rename deferred with the nav restructure).

**+Lead form WIRED (uncommitted — awaiting approval):** `app/leads/page.tsx` — lifted leads to
state; `CreateLeadDialog` = centered modal (new `components/ui/dialog.tsx`, base-ui Dialog — Pranav
asked to switch from the initial right-side slide-over/Sheet to a centered modal), sectioned
Borrower/Loan ask, real 8 fields, inline validation (name/company/amount required, PAN regex),
opinionated defaults. Creating
a lead prepends it to the pipeline at stage "Pending" (owner Demo Admin). Verified live: created
"Meena Krishnan" → appears top of All Leads + Board Pending column (count 3); empty submit shows
required errors. tsc clean, no console errors. NOTE: no persistence (reload resets — mock, no backend).
- Fixed a self-introduced bug pre-tsc: stray `"Auto-Follow-Up"` (hyphen) key in STAGE_TONE that
  isn't a valid Stage (`"Auto Follow-Up"` has a space) — would've failed as an excess property.

## 2026-07-16 — D3 cont.: docket_owner on RDS · the SET ROLE bug · migration 0004

**Bootstrapped `docket_owner` on RDS** via SSM against instance `i-04e2f22fc0f6a86d4` (script runs
on the box; contains ARNs only, no credentials — both passwords fetched from Secrets Manager by the
instance and never printed). Secret `docket/prod/db-owner` created earlier with a locally generated
32-char password. Role verified: connects, `superuser=false`. RDS has no superuser but `rdsadmin`.
- Took 2 attempts → **ERRORS.md-worthy**: psql does NOT interpolate `:'vars'` inside dollar-quoted
  (`$$ … $$`) blocks, so the password reached the server as the literal `:'owner_pass'` →
  `syntax error at or near ":"`. Fixed by dropping the DO block: `SELECT 'CREATE ROLE …' WHERE NOT
  EXISTS (…) \gexec` then `ALTER ROLE … PASSWORD :'owner_pass'` (idempotent, interpolation works
  outside dollar-quotes).

**FOUND A PROD-BREAKING BUG — the whole reason for the detour.** `SET ROLE docket_app` is DENIED on
RDS. `withTenant()` runs `set local role docket_app` on every tenant-scoped query, so every
leads/contacts/workflows request would have failed with `permission denied to set role`.
- **Root cause:** since PG16, a CREATEROLE non-superuser that creates a role is auto-granted
  `admin_option=t` but `set_option=f` — `createrole_self_grant` defaults to empty. It can
  *administer* docket_app but not *become* it. Confirmed from `pg_auth_members` on RDS.
- **My earlier claim was WRONG** ("PG16+ auto-grants the creator membership, that's what makes
  SET ROLE work"). Local passed only because `pranavaditya` is a superuser and can SET ROLE to
  anything. **Second time this session a local test passed for a reason absent in prod.**
- **Model itself is sound** — proven on RDS in rolled-back transactions replicating prod topology
  (owner owns table → SET ROLE app role): owner sees 2, tenant-a 1, tenant-b 1, **unset tenant 0
  (fails closed)**. Verified RDS clean afterwards: 0 probe roles, 0 probe tables, `public` still 0 tables.

**Committed to docket (2 separate commits, per Pranav):**
- `788234e fix(db): grant the connection role SET on docket_app so RLS can engage` — new migration
  `0004_app_role_set_grant.sql`: `GRANT docket_app TO CURRENT_USER WITH SET TRUE, INHERIT FALSE;`
  New migration, NOT an edit to 0002 — **verified from drizzle source** (`pg-core/dialect.js:62`)
  that it applies purely by timestamp and never compares the stored hash, so editing an applied
  migration silently changes fresh-prod while leaving local untouched. `CURRENT_USER` = migration
  runner = the API's role (both read DATABASE_URL) → docket_owner on prod, dev user locally.
  `INHERIT FALSE` explicit: audit caught that `SET TRUE` alone left INHERIT defaulting to the
  member's `rolinherit` (granted more than needed).
- `7d7a124 build(db): add a production migration runner` — `packages/db/src/migrate.ts` +
  `migrate:prod` script (drizzle-kit is a devDep stripped by `pnpm deploy --prod`).

**Applied 0004 to local dev DB** (explicitly approved): 4→5 migrations, grant landed
`set_option=t, inherit_option=f, admin_option=f`. Re-ran → idempotent (5→5, grant not duplicated).
tsc clean. Working tree clean except untracked `.claude/`.
- Noted en route: no `.env` exists anywhere; `drizzle.config.ts` falls back to a `postgres` role that
  does NOT exist locally — `DATABASE_URL` must be exported per command. Local runner/owner is
  `pranavaditya`. Latent trap for a fresh clone; NOT touched.

**Open / flagged, not touched:**
- `DbService.admin` bypasses RLS by design (auth needs cross-tenant lookup) → any future query using
  `db.admin` instead of `withTenant` silently sees all tenants — fail-open for new code. Pranav's call.
- **D4 gap:** the real 0000–0004 chain has NOT run on RDS. Current proof is by analogy (hand-built
  probe replicating prod topology), not end-to-end. D4 = deploy + migrate as docket_owner.
- Seed question unresolved: seed creates tenant "Finlot (Demo)" + `admin@finlot.ai` /
  `DocketAdmin!2026` — not acceptable for prod.
- Known gaps: throttler in-memory (needs Redis before scale-out); login returns 201 not 200; token
  in localStorage not httpOnly cookie.
- OCR / document-type-segregation direction: Pranav awaiting reply from his contact. Related to the
  deferred "Agentic document engine" bet in `forlater.md`.

**Infra state (all verified):** RDS `docket-prod` available/private/encrypted, PG 17.10, 0 public
tables. EB `docket-api-prod` Ready/Green (sample app) at
`docket-api-prod.eba-putfjesi.ap-south-1.elasticbeanstalk.com`. RDS SG allows 5432 only from EB SG
`sg-0cf71f2c06526d957` (`fromCIDR: []`). SSM Online. ~$45/month. Account: Finlot `771650096408`.

## 2026-07-16 (cont.) — D4.1: production tenant provisioning (no demo seed)

**Pranav's decisions:** skip the demo seed · tenant = **Finlot / finlot / internal** (not "Finlot
(Demo)" / trial) · admin password **generated by Claude straight into Secrets Manager, Pranav reads
it from the AWS console** (never printed) · Business Loan workflow config **kept verbatim**.

**Surfaced before acting — "skip the seed" wholesale would have shipped a broken prod.** seed.ts does
6 inserts; only 3 are demo identity (tenant/user/membership). The other 3 — Business Loan workflow,
12 stages, 8-field lead config — are real product config. Without them
`GET /workflows/business-loan/stages` throws NotFound, the Leads screen has no stages, and there is
no UI to create a workflow ("Create New Workflow" is still mock). Split the two concerns instead.

**Also flagged:** BOTH `seed.ts` and `set-admin-password.ts` `console.log` the plaintext password.
On the EB instance via SSM that lands in SSM command output → CloudTrail/S3. Neither is prod-safe.

**Committed to docket:** `2f1cb4f feat(db): provision the production tenant without the demo seed`
- NEW `packages/db/src/bootstrap.ts` — env-driven, **refuses to start without ADMIN_PASSWORD** (no
  default password path exists), logs only counts + slug, one transaction, idempotent. Existing user
  keeps its password (re-run never silently resets credentials) EXCEPT when password_hash is NULL
  (the invited-but-not-activated case the schema documents).
- NEW `packages/db/src/business-loan-config.ts` — STAGES + LEAD_FIELDS moved **verbatim** from
  seed.ts (verified byte-identical bar the `export`). Needed because seed.ts runs `main()` on import,
  so bootstrap.ts cannot import its constants in place; a second copy would drift.
- MOD `packages/db/src/seed.ts` — import swap ONLY (rule-7 flagged before touching; dev-only file).
- MOD `packages/db/package.json` — `bootstrap:prod`.

**AUDIT FOUND A REAL BUG IN THE NEW CODE (fixed before commit):** the workflow lookup filtered on
`slug` alone; the unique constraint is `(tenant_id, slug)`. Bootstrap runs as the **owner role which
bypasses RLS**, so — unlike the identical query inside `withTenant()` — nothing scopes it. With a
second tenant it could attach stages to the wrong tenant's workflow. **This is exactly the fail-open
`db.admin` hazard flagged earlier the same day, and it reproduced in my own new code within the
hour** — evidence the concern is real, not theoretical.

**Idempotency is checked-in-code, not structural:** `workflow_stages` and `lead_configs` have NO
unique constraint (only indexes), so `onConflictDoNothing` has no conflict target — a blind re-insert
would silently duplicate all 12 stages. Guarded with explicit existence checks.
- **Flagged, NOT done:** adding unique constraints would make this structural. Schema migration
  affecting other features → Pranav's call.

**Verified on a THROWAWAY db** (`docket_bootstrap_test`, created + migrated 0000→0004 from empty —
mirrors what fresh prod will do; real dev db never touched, confirmed 2 tenants/12 stages/5
migrations intact afterwards). Guard refuses without ADMIN_PASSWORD ✓. Full provision from empty ✓.
**3 runs (incl. one with a different password) → counts stayed 1/1/1/1/12/1 — no duplicates** ✓.
**Password NOT reset on re-run — proven cryptographically: original verifies, second does not** ✓.
argon2id ✓, wrong password rejected ✓. tsc clean. Throwaway db dropped afterwards (approved).

**Nothing touched AWS in D4.1** — prod DB still has 0 tables, migrations not yet run.

**D4 remaining:** build+deploy artifact to EB → run migrations as docket_owner (**needs explicit
confirmation**) → generate admin password into Secrets Manager `docket/prod/admin-bootstrap` (policy
`docket-read-db-secret` already covers `docket/prod/*`) → run bootstrap (**needs confirmation**) →
**prove SET ROLE + RLS on the real leads table as docket_owner** (the end-to-end proof still
outstanding; today's is by analogy) → Pranav retrieves password from console → log in.

## 2026-07-16 (cont.) — D4.2: API artifact built + DEPLOYED to EB (Green)

**Pranav's decision:** secrets via **EB env properties now**, Secrets Manager before borrower data
→ logged as `forlater.md` item 2 with an explicit trigger (before ANY borrower data, or before
anyone else gets AWS access — whichever first). Rotate docket_owner pw + JWT secret at that point.

**DEPLOYED. EB `docket-api-prod` = Ready/Green, version `d4-2f1cb4f-linux-221551`.**
- `GET /health` → **200** `{"ok":true,"service":"docket-api"}` (through the ALB)
- `GET /leads` unauthenticated → **401** (auth guard live)
- `POST /auth/login` → **500**, and that is CORRECT right now: the `users` table doesn't exist
  because migrations haven't run. Not connectivity — see proof below.
- **PROVEN the API reaches RDS**: read DATABASE_URL from `/proc/<pid>/environ` of the running app
  and connected with it → `CONNECTED as docket_owner to docket | superuser=false`,
  `users table exists: false`. Necessary because drizzle reports BOTH "cannot connect" and
  "table missing" as `Failed query` — the app log cannot distinguish them.

**Env properties set (5 + health check):** NODE_ENV=production · API_PORT=**8080** ·
WEB_ORIGIN=https://docket.finlot.ai · DATABASE_URL (docket_owner, URL-encoded pw, built from
Secrets Manager, never printed) · JWT_SECRET (generated locally, 64 chars, never printed) ·
HealthCheckPath=**/health**.

**THREE deploy-breakers found — none catchable locally:**
1. **Dangling symlink → deploy aborted.** `pnpm deploy` leaves
   `node_modules/.pnpm/node_modules/@docket/api -> ../../../../../../apps/api` pointing OUTSIDE the
   bundle. Resolves on the Mac (workspace is right there) so the artifact looks perfect and reports
   **0 broken symlinks**; EB recursively chowns the staged bundle and dies:
   `chown /var/app/staging/.../@docket/api: no such file or directory`. README's "internal,
   relative symlinks only" claim was FALSE. → `scripts/prune-escaping-symlinks.mjs` (resolves
   targets, not existence; re-walks and exits non-zero if any survive).
2. **Mac ARM binary shipped to Linux x86.** `@node-rs/argon2` ships one prebuilt binary per platform
   as optional deps; pnpm fetches only the build machine's. Artifact carried `argon2-darwin-arm64`
   to a linux-x64 box → `Cannot find module './argon2.linux-x64-gnu.node'` → crash-loop, systemd
   quit after 6 restarts, env RED. argon2 is the password hasher → **login impossible**.
   → `supportedArchitectures` (os: darwin+linux, cpu: arm64+x64) in pnpm-workspace.yaml.
3. **pnpm config trap AGAIN (2nd time in this repo).** I put `supportedArchitectures` in
   package.json → **pnpm 11 silently ignores it there**, exactly like `onlyBuiltDependencies`
   (pnpm 10) vs `allowBuilds` (pnpm 11). Belongs in pnpm-workspace.yaml. AND: `pnpm install` and
   `pnpm install --force` BOTH said "Already up to date" and fetched nothing — `.modules.yaml`
   doesn't record architectures. Only `rm -rf node_modules && pnpm install` worked. I had written
   "needs --force" in the file comment; corrected it once proven false.

**Caught BEFORE deploying (would have gone red):** `API_PORT` defaults to 3333 but EB's nginx
proxies to **8080** → silent 502s. And the API has **no `/` route** (only `/health`) while EB's
HealthCheckPath was `/` → 404 → red. Both fixed as config, not code.

**A false alarm I raised and retracted:** I reported the artifact "broken — postgres and argon2
MODULE_NOT_FOUND". Wrong: my `require.resolve` walked the *symlink* path
(`node_modules/@docket/db/dist`) instead of the realpath inside `.pnpm`, where the sibling
node_modules lives. Node follows realpath at runtime. **The test was broken, not the artifact** —
same class as the superuser-RLS and macOS-`timeout` false signals, but crying wolf instead.
Proper test: execute the real entrypoints (`node dist/main.js` must fail on the ENV GUARD, not
MODULE_NOT_FOUND — reaching the guard proves every module loaded), and unzip into a clean dir with
no workspace above it.

**Committed to docket (2 separate commits — two distinct root causes, not bundled):**
- `e76230e fix(build): prune symlinks that escape the deployable artifact` (+ README correction)
- `1eb6ff6 fix(build): install native binaries for the EB target, not just this machine`
package.json reverted clean (wrong-location attempt), pnpm-lock.yaml unchanged (it already resolved
every platform — supportedArchitectures only affects materialization, so no version churn).

**ERRORS.md** — 3rd entry written, covering all of the above.

**FLAGGED, not fixed:** `.artifact/` is **70MB and NOT gitignored**, while the README instructs
creating it. A stray `git add -A` would stage 70MB of node_modules. One line in .gitignore —
awaiting Pranav's go-ahead.

**D4 remaining:** D4.3 run migrations as docket_owner (**needs explicit confirmation**) → generate
admin pw into Secrets Manager `docket/prod/admin-bootstrap` → run bootstrap (**needs
confirmation**) → **prove SET ROLE + RLS on the real leads table** (the end-to-end proof still
outstanding) → Pranav reads pw from AWS console → log in.

## 2026-07-16 (cont.) — D4.3: MIGRATIONS RUN ON PROD · tenant isolation PROVEN end-to-end

**`.artifact` gitignored** — `d9554f8 chore: ignore the deployable EB artifact` (70MB, README tells
you to create it, one stray `git add -A` stages the lot).

**MIGRATIONS APPLIED to docket-prod as docket_owner. Exit 0.**
- 8 tables: contacts, lead_configs, leads, memberships, tenants, users, workflow_stages, workflows
- 5 migrations recorded (0000→0004) · docket_app role created · **all tables owned by docket_owner** ✓
- RLS enabled on **7 of 8** — `users` deliberately has none (auth looks up by email before a tenant
  is known)
- 0004 grant present: two membership rows (0002's creator auto-grant `admin_option=t, set_option=f`
  + 0004's `set_option=t`) — union grants SET. Working as designed.

**BLOCKER FOUND — and it CORRECTED AN EARLIER FALSE GREEN OF MINE.** First migration attempt failed:
`no pg_hba.conf entry for host "172.31.32.120", user "docket_owner", database "docket", no
encryption` (28000, FATAL). **RDS `rds.force_ssl=1`** (system default, postgres17) and
**postgres.js does not use TLS by default**.
- **I had told Pranav "network + credentials are GOOD; the login 500 is the missing table". WRONG.**
  That test used **psql**, which negotiates TLS by default; the app uses **postgres.js**, which does
  not. I proved psql could connect, not that the app could. The deployed API could NOT reach the DB
  at all. **Third variant of the same mistake today — and the first to produce a confident false
  green.**
- Tested with the app's OWN driver: as-is → FAIL 28000 · `?sslmode=require` → **OK, encrypted=true,
  TLSv1.3, TLS_AES_256_GCM_SHA384** · `ssl:{ca}` w/ RDS CA bundle → OK verified · `verify-full`
  without the bundle → SELF_SIGNED_CERT_IN_CHAIN (RDS CA not in system trust store).
- **Pranav chose:** `sslmode=require` now, verify-full before borrower data → **added to
  `forlater.md` item 2** with the working recipe (CA bundle URL + `ssl:{ca,rejectUnauthorized:true}`
  in `packages/db/src/client.ts`; must be env-aware — local Postgres has no TLS).
- EB DATABASE_URL now carries `?sslmode=require`. Env re-applied, still Ready/Green.

**TENANT ISOLATION PROVEN — the real leads table, real 0000→0004 chain, real non-superuser on RDS.**
This is the end-to-end proof that was outstanding all day (previously only by analogy via a probe
table; the local "proof" was void because `pranavaditya` is a superuser).
- identity: docket_owner, **superuser=f** · owner_sees=2 (auth path, RLS bypassed by design)
- **`SET ROLE docket_app` → "running as: docket_app"** ✓ ← the 0004 fix, confirmed for real
- Alpha scoped → 1 (SME Term Loan only) · Beta scoped → 1 (LAP only)
- **Alpha reading a Beta lead BY EXPLICIT ID → 0** ✓
- **No tenant set → leads 0, tenants 0, workflows 0, contacts 0 — FAILS CLOSED** ✓
- **Cross-tenant INSERT → rejected**: `new row violates row-level security policy for table "leads"` ✓
- All in rolled-back transactions; verified nothing persisted (tenants 0, leads 0, workflows 0).

**A 4th self-measuring test, caught before reporting it as a failure.** Probe v1 showed
`alpha_sees=0` — looked like isolation was broken. It wasn't: after `SET ROLE docket_app` the probe
looked the tenant id up with `SELECT id FROM tenants WHERE slug=...`, but **tenants has RLS**, so as
docket_app with no tenant set it returned no rows → `set_config` got NULL → scoped to nothing → all
counts 0. The real app never does this (withTenant() takes the tenant id from the JWT, resolved on
the owner connection during auth). Fixed by capturing ids with `\gset` AS OWNER before switching
role. Also: **apostrophes inside `psql \echo` break parsing** ("unterminated quoted string") — the
truncated echo was the tell.

**FLAGGED, not fixed:** `users` has **no RLS** and 0002 grants docket_app SELECT on ALL TABLES →
**docket_app can read every user row (incl. password_hash) across all tenants**. The app doesn't do
this today (auth uses `db.admin`), but any future `withTenant()` query against `users` would.
Same family as the `db.admin` fail-open concern. Pranav's call.

**D4 remaining:** D4.4 generate admin pw → Secrets Manager `docket/prod/admin-bootstrap` → run
`bootstrap:prod` (**needs confirmation**) → Pranav reads pw from AWS console → log in.
Then D5: web → Vercel, repoint docket.finlot.ai, ACM cert + GoDaddy DNS.

## 2026-07-16 (cont.) — D4.4: PRODUCTION PROVISIONED · API FULLY WORKING END-TO-END

**Admin password generated straight into Secrets Manager** `docket/prod/admin-bootstrap`
(ARN `...secret:docket/prod/admin-bootstrap-4dKm9h`), 28 chars, alphanumeric + `-_.~`.
**Never printed, never in a command line, never in SSM output or CloudTrail.** Pranav retrieves it
from the AWS console. Payload: `{"username":"admin@finlot.ai","password":"..."}`.

**BOOTSTRAP RUN — production provisioned. Exit 0.**
- tenants=1 · users=1 · memberships=1 · workflows=1 · stages=12 · lead_configs=1
- Tenant: **Finlot | finlot | internal** (NOT the demo "Finlot (Demo)" / trial)
- Admin: **admin@finlot.ai | Pranav Aditya | hash_algo=argon2id** · membership role **owner**
- Workflow **Business Loan** — 12 stages, correct order (Pending → … → Missing PanCard)
- Lead config: **8 fields**
- The instance read the password from Secrets Manager itself; bootstrap.js logs only counts + slug.

**END-TO-END PROOF THROUGH THE REAL API (run on the instance so the password never left it):**
| test | result |
|---|---|
| login, wrong password | **401** — argon2 verify rejects |
| login, unknown email | **401, IDENTICAL message** — no account enumeration (DUMMY_HASH holds) |
| login, real password | **201 + token** (275 chars; keys: token, user, tenant, role) |
| authed `GET /leads` | **200 `[]`** |
| **`GET /workflows/business-loan/stages`** | **200 — 12 stages, Pending → Missing PanCard** |
| `GET /leads` w/ garbage token | **401** |

The stages call is the money shot: JWT auth → `withTenant()` → **SET ROLE docket_app** → RLS →
real rows. That exact path was broken this morning (0004) and would have 500'd every request.
Login returns **201** not 200 — known cosmetic gap, unchanged.

**A 5th self-inflicted test bug (app was innocent):** login test initially returned 400 —
I wrote `python3 -c '…' PW="$PW"`, which makes PW **argv[1]**, not an env var → `os.environ["PW"]`
KeyError → empty body → API correctly 400'd. Fixed to `PW="$PW" python3 -c '…'`. The API was right
every time.

**DOCKET API IS LIVE AND FUNCTIONAL IN PRODUCTION:**
`http://docket-api-prod.eba-putfjesi.ap-south-1.elasticbeanstalk.com` — Ready/Green.

**Note on the bootstrap secret:** there is **no change-password flow in the product yet**, so
`docket/prod/admin-bootstrap` remains the password of record — do NOT delete it until a password
change exists. `packages/db/src/set-admin-password.ts` can rotate it BUT it **prints the password
to stdout** → unusable on the instance as written.

**D4 COMPLETE.** Remaining → **D5**: web → Vercel · repoint `docket.finlot.ai` (currently a parked
`/CRMdashboard` page on Vercel) · ACM cert + GoDaddy DNS (authoritative NS: ns61/ns62.domaincontrol.com)
· API needs HTTPS + a real domain before the browser can call it (WEB_ORIGIN is already set to
`https://docket.finlot.ai`).

## 2026-07-16 (cont.) — CTO onboarding documentation

**Context:** Finlot has onboarded a consultant CTO. Pranav asked for extremely comprehensive docs on
the website, tech stack, git, Docket, + anything else needed for a clear picture.

**Delivered:** `docs/finlot-cto-onboarding.html` (~57KB, self-contained, HTML-first per global rule).
14 sections + TOC + print stylesheet. Every claim verified against working trees, live HTTP
endpoints, or AWS `771650096408` — nothing inferred. Marked unknowns AS unknown (cost estimate:
Cost Explorer not enabled; B2C form commercial impact: genuinely unquantified).

**Research:** 3 parallel Explore agents (Finlot website · Docket web frontend · git history both
repos) + my own verification of every high-severity claim before publishing.

**MAJOR FINDINGS (all newly discovered during this research):**
1. **`components/b2c/LGForm.tsx` SILENTLY DISCARDS EVERY B2C LEAD.** 655-line multi-step consumer
   form w/ document uploads. `handleSubmit` = `await new Promise(r => setTimeout(r, 2000))` then
   `setIsSuccess(true)`. **VERIFIED MYSELF: zero `fetch`, zero `/api/` calls in the entire file.**
   Borrower sees a success screen; lead + uploaded docs go nowhere. Live on /B2C since 2026-03.
   The B2B form (/business-loan-enquiry) DOES work — it's specifically the consumer path.
   **Commercial impact unquantified — recommended as the first thing to measure.**
2. **`docket.finlot.ai` = the LEGACY mock CRM (inside the Finlot repo), NOT Docket.** `/` 307s to
   `/CRMdashboard`. Real Docket dashboard (docket repo apps/web) has NO Vercel config, NOT deployed.
   The URL actively misrepresents what it serves.
3. **That legacy CRM is PUBLIC, UNAUTHENTICATED, INDEXABLE, showing PAN-shaped data.**
   /CRMdashboard /leads /employees /partners /payouts all → HTTP 200, no login. PANs (AOEPA7062H,
   APXPN0712L), mobiles. No robots meta, robots.txt 404, sitemap 404. **No auth code anywhere in
   the app.** GitHub repo `pranavadityaneti/EFunds` is **PUBLIC** (`isPrivate:false`).
   **ASKED PRANAV → he confirmed the data is FABRICATED. Not a breach.** Documented as a
   credibility/cleanup issue, not an incident.
4. **Docket repo has NO GIT REMOTE** — entire platform (schema/RLS/auth/API/deploy) on ONE laptop,
   no backup. Ranked the #1 risk. ~5 min to fix.
5. **Zero tests, zero CI in BOTH repos.** No .github anywhere. No test deps in any package.
6. Finlot README = untouched create-next-app boilerplate. Docket README = stale (documents the
   REPLACED teal palette; says `packages/` "coming next" when packages/db is central; never
   mentions apps/api).
7. shadcn is CONFIGURED BUT ABSENT in Finlot (no Radix/base-ui installed; components/ui has 1 dead
   file). Docket uses Base UI properly.
8. Login picks the FIRST membership arbitrarily (`.limit(1)`, no ordering) → multi-tenant users get
   a non-deterministic tenant, no switcher.
9. `/api/companies` sync-parses 8.2MB CSV per cold lambda, unauthenticated + unthrottled.
   `/api/bre-rules` exposes ~24 lenders' credit criteria publicly.
10. Git: Finlot 61 commits/9 identities/0 Claude co-author/75% empty bodies/8 PRs (last 15% only,
    all self-merged); Docket 31 commits/100% conventional/31/31 Claude co-authored/0 PRs. No tags
    in either. Bus factor 1 across all 92 commits.

**Doc verified in-browser:** all 14 sections render · **0 broken TOC anchors** · 14 tables ·
12 callouts · 7 diagrams · print rules present.
- **Found + fixed 2 real defects while verifying:** missing `<meta name="viewport">` (rendered
  zoomed-out at 980px on a 375px phone) and 4 tables overflowing the body horizontally (fixed via
  a mobile `table{display:block;overflow-x:auto}` rule).
- Note: `documentElement.scrollWidth`(390) > `clientWidth`(375) suggested horizontal overflow, but
  **empirically `window.scrollTo(500,0)` left scrollX at 0** — the metric was the scrollbar gutter,
  the page does NOT scroll sideways. Same lesson as the rest of the day: test the behaviour, not
  the proxy.

**NOT DONE / awaiting Pranav:** no remediation executed for any finding — the B2C form, the public
dashboard, the missing remote, and repo visibility are all untouched pending his decisions.

**Doc revisions (Pranav's edits):** removed §12 "How we work — AI-assisted development" (incl. the
five-self-measuring-tests callout), §14 "Open questions for you", the TLDR "this document does not
flatter us" paragraph, and the §3.1 "design system is a mirage" callout. Old §13 renumbered → §12.
Doc now 12 sections, 58KB (was 64KB). Verified: 0 broken anchors, HTML structurally valid
(0 stray/unclosed tags), TOC consistent.
- Asked before cutting: "point 12/14" was ambiguous between section numbers (1–14) and risk-register
  items (1–20). Pranav confirmed SECTIONS. Risk register still has all 20 items.
- NOTE for Pranav: the doc no longer discloses that Docket is LLM-written — but all 31 docket commits
  carry `Co-Authored-By: Claude Opus 4.8`, so the CTO will see it in `git log` on day one.

## 2026-07-17 — D5 begins: git remote + API HTTPS

**Git remote (critical risk #1 CLOSED):** created **PRIVATE** `github.com/pranavadityaneti/docket`,
pushed all 31 commits (master). Pre-push: verified NO secrets tracked and none in history (only
hardcoded cred is the dev-seed default `DocketAdmin!2026`; prod bootstrap has no default).
**Proved the backup by fresh-cloning** — 31 commits, full platform present, clone == working tree.
Docket no longer exists on one laptop only.

**API now on HTTPS at its own domain:**
- ACM cert for `api.docket.finlot.ai` FAILED with CAA_ERROR — `docket.finlot.ai` is a CNAME to
  Vercel, whose CAA (globalsign/letsencrypt/pki.goog/sectigo, NOT amazon) is inherited by all
  children. Unfixable under that host. → ERRORS.md.
- Pranav picked `docket-api.finlot.ai` (sibling of docket.finlot.ai; parent finlot.ai has no CAA).
- Cert ISSUED in ~40s once the (re-added) DNS records went live. ARN
  `...certificate/e6e3badb-eeb7-49a5-ad57-ef483d449e5f`, auto-renew, valid to 2027-01-31.
- HTTPS:443 listener added via **EB options** (aws:elbv2:listener:443, TLS13-1-2-2021-06);
  EB auto-opened 443 on the ALB SG. **VERIFIED: https://docket-api.finlot.ai/health → 200,
  TLS verify result 0 (trusted), cert CN=docket-api.finlot.ai issued by Amazon; bad-creds login → 401.**
- GoDaddy record adds took 2 tries (first save didn't land — same pattern as the earlier IAM policy).

**apps/web build VERIFIED** (`pnpm build` in apps/web): compiles, tsc passes, 4 routes + not-found,
all static. Reads `NEXT_PUBLIC_API_URL` (default localhost:3333) in lib/api.ts — for prod this
must be set to `https://docket-api.finlot.ai`.

**D5 remaining:** deploy apps/web to Vercel (monorepo root = apps/web; set NEXT_PUBLIC_API_URL) →
repoint docket.finlot.ai from the legacy mock CRM to the real Docket → set the API's WEB_ORIGIN to
the final dashboard origin.

## 2026-07-18 — D5 COMPLETE: Docket dashboard LIVE at docket.finlot.ai

**Vercel project** created from the (new, private) `docket` repo — Root Directory `apps/web`,
`NEXT_PUBLIC_API_URL=https://docket-api.finlot.ai`. Deployment Protection was ON by default
(every route 302'd to vercel.com/sso-api) → Pranav disabled it.

**Verified the build BEFORE the domain flip** (deliberate: no window where the public URL is broken):
- Site serves 200, title "Docket — Finlot", real wine/beige UI.
- **`https://docket-api.finlot.ai` confirmed baked into chunk `1kmt4i3udpfhb.js`; NO `localhost:3333`
  leak.** First curl-grep of 71 chunks found neither string (misleading — that chunk loads after
  initial paint); settled it by scanning every chunk from INSIDE the page via same-origin fetch.
- "Failed to fetch" on the preview URL was the EXPECTED CORS block (WEB_ORIGIN allows only
  docket.finlot.ai, not *.vercel.app). Not a bug.

**Pranav challenged the architecture** ("why a separate Vercel project, not part of Finlot?").
Answer: a Vercel project = exactly ONE git repo, and **EFunds is PUBLIC while docket is PRIVATE** —
merging would publish the platform source. Plus: blast radius (marketing site is revenue-critical
lead capture; Docket is 4 days old with no CI), apps/web belongs with apps/api + packages/db, and
npm-vs-pnpm / different Next / different UI stacks. Noted the real cost (domain config split across
projects = exactly the cutover friction) and that if consolidating, the correct direction is moving
the MARKETING site into the docket monorepo, not the reverse. Flagged as a CTO question.

**Pre-cutover safety check:** the Finlot repo redirects 11 dashboard routes from www → docket.
Only `/contact` and `/settings` are linked from marketing pages, and **`www.finlot.ai/contact`
already 404s today** (307 → docket.finlot.ai/contact → 404). So the cutover broke nothing new.
- **PRE-EXISTING BUG FOUND (flagged, not fixed):** `components/b2b/B2BFAQ.tsx:53` has
  `<a href="/contact">` on the LIVE /B2B page → dead link. Basic link-checking in CI would catch it.

**CUTOVER DONE** (Pranav: removed docket.finlot.ai from the Finlot Vercel project, added it to the
docket project → "Valid Configuration", no GoDaddy change needed).

**VERIFIED LIVE:**
| check | result |
|---|---|
| docket.finlot.ai/ , /login | **200** — real Docket, title "Docket — Finlot" |
| TLS | valid, CN=docket.finlot.ai (Let's Encrypt via Vercel), to 2026-10-10 |
| CORS from the real origin | **`access-control-allow-origin: https://docket.finlot.ai`** ✓ |
| **real-browser login, bogus creds** | **"Invalid email or password"** (401) — NOT "Failed to fetch" ✓ |

That 401 proves the FULL chain in a real browser: browser → docket.finlot.ai (Vercel) →
docket-api.finlot.ai (ACM TLS 1.3) → ALB → NestJS → CORS → argon2 → RLS-backed Postgres.

**RISK #5 CLOSED as a side effect:** the legacy unauthenticated mock CRM (PAN-shaped data, indexable)
is **no longer publicly reachable** — /CRMdashboard, /employees, /payouts all 404 on every host, and
docket.finlot.ai/leads now serves the auth-gated real Docket with **0 PAN/phone strings**.

**NOT done by me:** the real login with the actual admin password — Pranav does that himself from
Secrets Manager `docket/prod/admin-bootstrap`. I will not type his password into a form.

**D5 REMAINING (optional cleanup):** remove the now-dead host-split redirect rules from the Finlot
repo's next.config.ts (rules 1 & 3 are moot; rule 2 still bounces www dashboard paths at Docket).

## 2026-07-19 — Docket pivot: Change 1 (industry-agnostic core) COMMITTED

**STRATEGIC REFRAME from Pranav.** Docket is NOT a B2B loan tool — it is a **document-collection
platform for any industry**: all loan types, colleges collecting from students, CAs from clients,
insurers, recruiters, hospitals, procurement. Must be extensible to new verticals as a *feature*.

**THE USP (Pranav corrected my model — I had it wrong):** it is NOT a subject portal. The subject
never learns new software. Per-tenant dedicated WhatsApp number + email address; the AI messages
them; **they reply with documents on WhatsApp AND/OR email, mixed, over days**; the AI consolidates
and classifies everything into one case. Missing/wrong/not-theirs → AI WhatsApp nudge (L1) → if
silent, an **AI voice bot calls them**. The dashboard is staff-only. I had designed a "universal
subject portal" — the exact opposite of the USP. Killed before it was built.

**Answers captured (see the Q&A in-session):** BYO integrations — tenants bring their own WhatsApp
(Wati/Gupshup/AiSensy/Interakt/Twilio/360dialog/Meta) AND their own email (Gmail/Outlook/Zoho/
Hostinger/anything); tenant owns the number/address, Docket never provisions; email is
tenant-branded, never a docket.finlot.ai address; matching by Case ID + registered phone/email;
wrong-owner documents auto-rejected strictly (with a confidence band → uncertain goes to staff);
English only v1; 24h/24h/24h escalation ladder, tenant-customisable; consent language at intake +
they have a compliance position on the voice bot; email AND WhatsApp both first; start with Loans;
after collection, staff download AND push onward (LOS/Gain/SIS) via generic webhook + API.
**Cross-pollination:** reuse documents across a subject's cases — but ONLY identity-stable ones
(PAN/Aadhaar/degree), never time-bound (bank statements, payslips) or case-specific. Needs
`reusable` + `validity_days` on each checklist item.

**Decisions:** vocabulary = **Case** (neutral across lending/education/audit; "File" collides with
document files). Reference format = **DKT-7F3K2M**. Deferred to forlater: QR/walk-in (item 3),
third-party senders — spouse/parent (item 4), multi-language (item 5).

**BUILD ORDER agreed:** 1 core model ✅ · 2 document requirements + documents · 3 storage (S3) ·
4 subject-side channels + entry-point adapters · 5 AI (setup blueprints, then doc classification).

**COMMITTED `3994efa refactor(db,api,web): make the core model industry-agnostic`** — pushed to
the private remote. leads→cases, lead_configs→field_configs, 4 lending columns → cases.data,
workflows.subject_label/case_label, contacts.kind + organisation + per-tenant email/phone indexes,
cases.reference (Crockford base32, no I/L/O/U — it gets READ ALOUD to the voice bot), API
/leads→/cases, new GET /workflows, web /leads→/cases.

**Migration 0005 hand-written, NOT generated** — drizzle-kit would emit DROP+CREATE which
**silently destroys the RLS policies** from 0001. ALTER TABLE RENAME carries them. Also renamed all
9 indexes/constraints (they do NOT follow a rename; drizzle would read `leads_*_fk` on table
`cases` as drift and drop/recreate every FK).

**Migration made data-safe after finding it would FAIL on a non-empty table** (dev had 4 rows):
values carried into `data` before the columns drop; `reference` added nullable → backfilled →
constrained. Proven on a pg_dump clone of real dev data: 4/4 rows preserved.

**FOUR DEFECTS FOUND IN AUDIT AND FIXED BEFORE COMMIT:**
1. **Retry loop was dead code, TWICE OVER** (critical). (a) A failed statement aborts the whole
   PG transaction → the retry hit 25P02, not a retry. (b) **drizzle wraps errors: `err.code` is
   `undefined`, SQLSTATE lives at `err.cause.code`** — so the 23505 check could never match even
   with a savepoint. Fixed with a nested drizzle tx (real SAVEPOINT/ROLLBACK TO) + `pgErrorCode()`
   reading both levels. **Proven by forcing 2 real collisions.**
2. `contacts.kind` could never be 'organisation' (inferred from `!input.name`, but name is
   required) → caller now declares it.
3. `listStages()` still defaulted to `"business-loan"` → added `GET /workflows`, slug now required.
4. `normaliseCaseReference()` mangled bare DKT-prefixed codes (D,K,T are all in the alphabet).

**Process note:** I launched an 18-agent adversarial audit workflow; Pranav stopped it for burning
credits. **All four defects came from my own direct testing against a live Postgres, not from the
agents.** Lesson: verify empirically first; reserve fan-out for genuinely parallel work.

**Local dev DB migrated** (backup at scratchpad/docket-dev-backup-20260719-013111.sql). 4 cases
intact with references. **PRODUCTION UNTOUCHED** — still old code + old schema, consistent.

**OPEN:**
- **Migration SQL + RLS never independently audited** — my own empirical evidence only (policies
  present, no stale names, no drift, data preserved). A single focused review of 0005 is cheap.
- `subject_label` on the existing workflow is `Contact`, not `Borrower` — bootstrap never
  overwrites existing config. Prod will do the same on deploy. Needs a decision.
- Deploy ordering for prod (migrate vs deploy first) not yet planned.

## 2026-07-19 (cont.) — Change 2: the document model — COMMITTED

**`e4d90fd feat(db): document requirements and documents — the collection model`** (pushed).

**Two new tables:**
- `document_requirements` — the checklist per workflow. Config, not user data (an AI blueprint
  writes it; a tenant admin edits it). Key columns: `reusable` + `validity_days` (the
  cross-pollination rule — reuse a PAN forever, NEVER a stale bank statement) and `condition`
  (gate an item on cases.data, e.g. Partnership Deed only for a partnership).
- `documents` — what actually arrived. `requirement_id` NULLABLE on purpose (an unclassifiable
  file must be captured for a human, not dropped) · `source_channel` + `source_identifier`
  (whatsapp/email/upload/import/api + the number/address it came from) · `checksum`
  (same file across two channels) · `reused_from_id` (provenance when carried over) ·
  `status` includes **`needs_review` distinct from `rejected`** — the confidence band Pranav
  agreed: AI rejects only when confident, parks for a human when unsure.

**⚠ THE SHARP EDGE — RLS IS NOT AUTOMATIC ON NEW TABLES.** 0002's `ALTER DEFAULT PRIVILEGES`
means docket_app gets full DML on new tables the instant they exist (VERIFIED: both came up with
SELECT/INSERT/UPDATE/DELETE already attached). But a new table has RLS *disabled* and ignores
every policy. Without the explicit ENABLE + CREATE POLICY at the foot of 0006, the app role would
read **every tenant's PAN cards and bank statements**. Grants arrive by default; isolation must be
asked for. This is the single most important thing to remember when adding any future table.

**Also hardened:** CHECK constraints on status + source_channel in the DB (not just TS);
`documents.requirement_id` is ON DELETE **SET NULL** not CASCADE — deleting a checklist item must
never delete files a borrower already sent.

**Business-Loan blueprint gained a real 13-item checklist** (replaces the dashboard's hardcoded
DOC_HINTS): 2 conditional on entity_type, 9 reusable-but-time-limited, 2 identity docs reusable
forever.

**Two modelling errors I made and caught in my own code before any migration ran:** `required`
and `reusable` written as `text` columns instead of `boolean`; `reused_from_id` left as a bare
uuid with NO foreign key (a dangling pointer). Both fixed.

**Verified from empty:** RLS enabled+policied on both new tables; EVERY tenant_id table protected
(only `users` exempt by design) · isolation proven with a lender and a college side by side
(lender sees its PAN not the student's marksheet; cross-tenant by-id = 0; unset tenant = 0 on both
tables) · conditions resolve (Proprietorship 11, Partnership 12, Pvt Ltd/LLP 12) · **reuse rule
holds: 200-day-old bank statement w/ 90-day validity NOT reusable, PAN at same age IS** · check
constraints reject bad status/channel/duplicate key · bootstrap idempotent (2nd run inserts 0) ·
drizzle-kit check clean · all 3 packages typecheck+build.

**Dev DB migrated** (backup: scratchpad/docket-dev-backup-20260719-081904.sql). 4 cases + 6
contacts intact, migrations 6→7, 13 requirements populated, password untouched. Checklist resolves
against real cases: Priya (Pvt Ltd) & Validation Test (LLP) → 12 docs; Ravi & Stage Test Co
(Proprietorship) → 11.

**PRODUCTION now TWO migrations behind (0005, 0006)** — still old code + old schema, consistent.

**KNOWN DUPLICATION (deliberate, close in Change 4):** the dashboard still renders its own
hardcoded `DOC_HINTS`; the real checklist is in the DB. They will diverge. UI deliberately not
wired until storage exists (wiring it twice is waste).

**NEXT — Change 3: storage.** S3 in the Finlot account + presigned uploads, then the API surface
for documents. Then Change 4 (UI) and Change 5 (WhatsApp/email intake + AI).

## 2026-07-19 (cont.) — Change 3a COMMITTED + product/architecture spec written

**`55ad113 feat(api): document upload, the case checklist, and staff review`** (pushed).

**Storage driver interface** (local disk now, S3 in 3b) deliberately shaped around PRESIGNED
uploads — client asks for an upload target and PUTs there. For S3 that's a signed URL and the file
never touches our server; for local it's an API route guarded by a **single-use, short-lived ticket
that names the key** (so a caller can't choose where bytes land). Shaping it otherwise = rewriting
the client the day we move to S3. `put()` exists alongside for server-side ingestion (WhatsApp/email
have no browser to hand a URL to).

**Object keys tenant-first** — `tenants/{t}/cases/{c}/{doc}` — so an S3 bucket policy can enforce
isolation independently of Postgres RLS. User filename deliberately NOT in the key.

**4 endpoints:** `GET /cases/:id/checklist` (THE core read — conditions resolved server-side so
dashboard/WhatsApp bot/voice bot can never disagree) · `POST /cases/:id/documents` (begin) ·
`POST /documents/:id/complete` (confirm — size+SHA256 read from STORAGE, not trusted from client) ·
`PATCH /documents/:id` (review; acceptance stamps expiry from the requirement's validity window).

**TWO REAL BUGS found while testing:**
1. **NestJS installs express.json() globally → consumes the request stream.** A borrower uploading a
   `.json` file would get a **0-byte document, silently, with a success response.** Fixed: global
   parsers disabled, re-applied to every path EXCEPT `/uploads`.
2. **`requirementId` was `@IsString()`** → `""` or any malformed value reached Postgres and 500'd
   instead of 400ing. Now `@IsUUID()`. (Found via my own sloppy test using an unset shell var —
   sloppiness that exposed a genuine hole.)
Also a DI error at boot: DocumentsModule didn't import StorageModule.

**Prod guard:** env REFUSES to boot with `STORAGE_DRIVER=local` in production — otherwise a
misconfigured deploy writes borrower KYC to an EC2 filesystem that vanishes on next release.

**Verified end-to-end** against live API+DB: checklist 11 items (Proprietorship) vs 12 (LLP) ·
uploaded file stored **byte-identical** (sha256 match both sides) · PAN accepted → no expiry, bank
statement (90d) → expires in 89 days · reject-without-reason/complete-without-file/maxFiles all 400
with usable messages · upload tickets single-use · unknown case 404, unauthenticated 401.
All test documents deleted afterwards; dev DB back to 4 cases / 0 documents.

**DOC WRITTEN: `docs/docket-product-architecture.html`** (59KB, 18 sections, ~4,500 words).
Covers: thesis · 7 industries + the tenant/case/subject/documents mapping · full end-to-end flow
diagram · entry-point adapters · collection & the 24/24/24 escalation ladder · inbound routing and
the hard matching cases · checklist engine w/ conditions · document reuse (identity vs time-bound vs
case-specific) · **the 4 distinct AI products** (setup blueprints / document classification /
conversational chaser / voice) incl. the draft-then-approve rule · channel integrations (BYO
WhatsApp + BYO email, IMAP/SMTP first, template/24h-window constraints) · data model · tenant
isolation incl. the 3 known gaps · tech stack · dashboard state · **honest built-vs-designed
inventory** · roadmap · open decisions · deferred queue.
- Design: Docket's own wine/beige identity; Newsreader + IBM Plex Sans/Mono; status chips
  (Built/Partial/Designed/Deferred) as the structural spine — 23 Built vs 25 Designed, which is the
  honest ratio and the point of the document.
- Verified: 18 sections, 18 TOC links, **0 broken anchors**, 17 tables, 5 diagrams, all 3 fonts
  genuinely loaded (no silent fallback), HTML structurally valid (0 stray/unclosed), 4 theme token
  blocks, print + reduced-motion + focus-visible all present.
- NOTE: the browser measurement API reported `viewport: 0` (pane collapsed) so width/overflow
  numbers from it were meaningless — verified structurally + visually instead. Screenshots go blank
  at deep scroll on very long docs (same as the CTO onboarding doc).

**NEXT: Change 3b** — S3 driver + bucket provisioning (encryption, tenant-prefixed keys, lifecycle).
**GATE:** forlater item 2 (secrets → Secrets Manager, rotate creds, TLS verify-full) is triggered by
storage going live with real data — pull it forward rather than build on top of it.

## 2026-07-19 (cont.) — Change 3b: S3 storage COMMITTED (`e6eea38`)

**AWS provisioned in 771650096408 / ap-south-1:**
- **KMS customer-managed key** `alias/docket-documents` (`395c3308-db42-4b37-a1de-c0edea24ab49`),
  **annual rotation enabled**. Chose SSE-KMS over SSE-S3 deliberately: only KMS answers "which
  principal decrypted this, when" in CloudTrail and can be revoked by disabling the key. **Had to be
  decided now — changing bucket encryption later does NOT re-encrypt existing objects.**
- **Bucket `docket-documents-771650096408`**: all 4 public-access blocks ON · versioning ON ·
  SSE-KMS default + **Bucket Key** (cuts KMS request cost ~99%) · bucket policy denies non-TLS AND
  denies any PUT not declaring `aws:kms` · lifecycle → Infrequent Access at 90d, noncurrent versions
  expire 90d, **NO object expiry** (retention still undecided — deliberately not encoding a deletion
  policy nobody agreed).
- **IAM inline `docket-documents-s3`** on `aws-elasticbeanstalk-ec2-role`: Put/Get/Delete on
  `bucket/tenants/*`, ListBucket on the bucket, and kms GenerateDataKey/Decrypt/DescribeKey on
  **that one key only**.

**Code:** `apps/api/src/storage/s3.ts` implements the 3a interface unchanged → **zero client
changes**. Credentials from the EB instance role via the default provider chain (nothing to leak).
Encryption headers are **signed AND returned** to the client — they must travel together or you get
an opaque SignatureDoesNotMatch. `head()` reads back + hashes rather than trusting S3's ETag (ETag
is MD5 only for single-part *unencrypted* uploads; neither for KMS objects). env refuses to boot
with `STORAGE_DRIVER=s3` and no `S3_BUCKET`.

**VERIFIED against the real bucket — the guards REJECT, not just the happy path:**
anonymous GET → 403 · plain-HTTP GET → 403 (TLS policy) · **AES256 PUT → AccessDenied "explicit deny
in a resource-based policy"**. End-to-end on the S3 driver: presigned URL → browser PUT direct to S3
(200) → confirm read back **5024 bytes + matching SHA-256 FROM S3** → checklist shows `received`.
Stored object reports `aws:kms` + our key ARN + BucketKey true. Local disk still the default.

**MY OWN FALSE VERIFICATION, caught:** first S3 test returned a **localhost** upload URL. Cause: my
`pkill` pattern didn't match the running API, so the new S3-configured process hit **3×
EADDRINUSE** and never bound — every request went to the OLD local-driver process. Killed by port
instead. *A green result from the wrong process* — the same class of trap as the superuser-RLS and
psql-vs-driver false greens. **Kill by port, not by pattern.**

**OVERSTATEMENT CORRECTED (mine):** I had written — in both `storage.ts` and §11 of the spec — that
tenant-first object keys give "a second, independent boundary alongside Postgres RLS". They do NOT:
with a single application principal they give auditability and make per-tenant IAM enforcement
*possible later*. **RLS is the boundary.** Fixed in both places.

**Cleanup:** bucket empty (0 versions, 0 delete markers), dev DB back to 4 cases / 0 documents.
**Cost:** ~$1/mo KMS key + cents of storage.

**NEXT:** Change 4 (dashboard: checklist UI, exceptions queue, per-workflow vocabulary; also closes
the hardcoded DOC_HINTS duplication) — OR pull `forlater` item 2 forward first.
**GATE STANDS:** the API is NOT yet deployed with S3. That deploy is the moment forlater item 2
triggers (secrets → Secrets Manager, rotate creds, TLS verify-full). Cheaper before than retrofitted
after real documents exist.

## 2026-07-19 (cont.) — forlater item 2 DONE + PRODUCTION DEPLOYED & MIGRATED

**Committed `b4aa78a feat(api,db): secrets from Secrets Manager, and full TLS verification to RDS`.**

**SECRETS.** EB env properties are readable in plaintext by anyone with
`elasticbeanstalk:DescribeConfigurationSettings`. API now reads DATABASE_URL + JWT_SECRET from
`docket/prod/app` via `APP_SECRET_ID`.
- **The mechanism is a boot-order trick, not a rewrite:** config/env validates at IMPORT time and
  app.module reads env.jwtSecret at MODULE SCOPE. So `main.ts` hydrates secrets first, then imports
  env and AppModule **dynamically**. A static import would evaluate them before Secrets Manager was
  consulted → dies on a missing DATABASE_URL that was actually available. **Verified in the compiled
  CJS that the requires really are deferred** (`await Promise.resolve().then(()=>require(...))`).
- Env values win over the secret (dev/tests need no AWS creds; operator escape hatch). Only
  DATABASE_URL + JWT_SECRET accepted from a secret; anything else ignored.
- **Proven before deploying:** API booted with NEITHER secret in env, and the issued JWT's signature
  **cryptographically matched** the Secrets Manager value.

**TLS verify-full.** `sslmode=require` encrypts without checking WHO is on the other end. Now
verifies against the Amazon RDS CA + hostname. CA bundle **embedded as a .ts constant** (swc doesn't
copy .pem into dist; a boot-time network fetch is a boot-time failure mode). Applied only when host
ends `.rds.amazonaws.com` — local Postgres has no TLS, and a rule devs must disable gets disabled in
prod too. Lookalike host correctly NOT treated as RDS. **migrate.ts shares the posture.**
- **Proven on the instance with a CONTROL:** verify-full OK against real RDS; the same connection
  **without** the CA correctly REFUSED. (A passing test that would pass anyway proves nothing.)

**PRODUCTION CUTOVER (all 6 steps, approved):**
0. Rollback captured: EB env JSON (with values) + previous version label. **RDS snapshot taken.**
1. Created `docket/prod/app`; rotated docket_owner password (32ch) + JWT secret (64ch); both written
   to Secrets Manager. `docket/prod/db-owner` kept in step. Neither value ever printed or passed as
   a shell arg — the instance read the new password FROM the secret to apply it.
2. `ALTER ROLE docket_owner PASSWORD` on the instance → immediately proven: **"connected as
   docket_owner over TLSv1.3"** with verify-full.
3. Deployed `item2-e6eea38-213357`. Env GAINED APP_SECRET_ID/STORAGE_DRIVER/S3_BUCKET/S3_KMS_KEY_ID/
   AWS_REGION, **LOST DATABASE_URL + JWT_SECRET** (`--options-to-remove`). Ready/Green.
   Artifact checks from ERRORS.md all passed (linux argon2 present, 7 migrations, 0 dangling symlinks).
4. **MIGRATED PRODUCTION**: 5 → 7. Tables now cases/documents/document_requirements/field_configs +
   the rest. **9 RLS policies. RLS on documents = true.** 0 rows lost (prod was empty).
5. Bootstrap: **13 document requirements inserted**; admin password left unchanged.
6. **VERIFIED LIVE:** /health 200 TLS verify=0 · **EB query for DATABASE_URL/JWT_SECRET returns `[]`** ·
   login OK with rotated creds · created case **DKT-V26J2X** · LLP checklist = **12 items incl.
   incorporation_certificate** · presigned upload → S3 200 → confirm **4033 bytes, checksum matched** ·
   object stored `aws:kms` with our key + BucketKey.

**Cleaned up:** prod back to cases=0 documents=0 contacts=0, **requirements=13** (kept — that's config).
S3 bucket emptied. RDS snapshot retained.

**forlater item 2 → moved to "Done — archived".**

**PRODUCTION IS NOW:** code `e6eea38` + schema v7 + S3/KMS storage + secrets by reference + TLS
verify-full. The gate that blocked real borrower data is CLEARED.

**NEXT: Change 4** — dashboard (checklist UI, exceptions queue, per-workflow vocabulary; closes the
hardcoded DOC_HINTS duplication). Then Change 5 (email + WhatsApp intake), then the AI.

---

## 2026-07-20 — Change 4a: case detail screen (checklist, upload, review)

**Status:** Built and verified locally. NOT committed — awaiting Pranav's approval.

### What was built
- **New route `apps/web/app/cases/[id]/page.tsx`** — per-case checklist: progress summary,
  per-item status, upload, accept/reject-with-reason, unmatched-files section.
- **New client functions** in `apps/web/lib/api.ts`: `getCase`, `getChecklist`,
  `uploadDocument` (3-step), `reviewDocument`.
- **Cases table rows are now links** to the case (keyboard reachable, Enter to open).
- **Creating a case now lands on its checklist** instead of returning to the table.
- **`DOC_HINTS` deleted** (~105 lines of hardcoded per-entity document lists). Replaced by
  a pointer to the real checklist — previewing it client-side would mean re-implementing
  the server's condition evaluation and having two answers to the same question.
- **Vocabulary wired** — the four hardcoded "Borrower" strings now read the workflow's
  `subjectLabel`.

### Scope deviation (flagged, not silent)
Change 4a was scoped "no API changes". Two gaps made that impossible to do correctly:
there was no `GET /cases/:id`, and the case list never said which workflow a case belongs
to. Building the header off `listCases()` + `workflows[0]` would have reintroduced exactly
the hardcoded-default bug already fixed in `listStages`. Added **`GET /cases/:id`**, which
joins the workflow and returns its vocabulary with the case. Same feature, one endpoint.

### Bugs found and fixed
1. **`PUT /uploads/:token` 404** (pre-existing, from Change 3b). The local storage driver
   advertises `PUT`; the controller mapped `POST`. Local uploads were broken for any client
   honouring the contract. Fixed to `@Put` so local mirrors S3's real verb. See ERRORS.md.
2. **A failed refresh blanked a working screen.** `setError` + a `error || !detail` render
   guard meant one transient blip after a successful load replaced the whole checklist with
   an error card. Now distinguishes "never loaded" (error card) from "reload failed" (banner).
3. **Enter on the row's "Case actions" button navigated away** instead of opening the menu —
   `stopPropagation` was on click only, not keydown.
4. **`role="link"` rows hijacked Space**, which is the page-scroll key. Enter only now.

### Open — needs Pranav's decision, NOT fixed
- **A rejected document permanently blocks its checklist slot.** `maxFiles` counts rows
  regardless of status, and there is no delete endpoint, so rejecting a blurry Aadhaar means
  nobody can ever upload a good one. This is a workflow dead-end and the most serious of the
  three. Needs a "remove document" action.
- **An abandoned upload leaves a reservation that makes the checklist lie.** A row is created
  before the bytes land with `status: 'received'`, so the item reads "Received" when nothing
  arrived — and it consumes a `maxFiles` slot. Reservations should not count as documents.
- **Workflow vocabulary was never backfilled.** Migration 0005 added `subject_label`/
  `case_label` with defaults and no backfill from `business-loan-config.ts`, so every
  workflow (local AND production) reads "Contact"/"Case" rather than "Borrower"/
  "Application". The wiring is correct; the data is not. Needs a backfill — production
  requires explicit approval.

### Verified
`tsc --noEmit` clean (web + api), `next build` clean, and driven through the real browser:
upload (523 bytes sent, 523 read back from storage), accept (progress 0→1 of 10), reject
(empty-reason guard blocks, reason persists and displays), failed-refresh banner, and the
404 error card. All test documents and storage files removed; 4 original cases untouched.

---

## 2026-07-20 — Rejection dead-end fix (follow-on to Change 4a)

**Status:** Built and verified locally. NOT committed.

### Root cause
`maxFiles` was enforced by counting *rows*, on the stated reasoning that "a rejected file
still occupies a slot until someone removes it". No remove action was ever built, so that
reasoning never completed: rejecting the only permitted copy made the item permanently
unfillable. Reject a blurry Aadhaar → nobody can ever upload a clear one.

### The fix
Introduced one shared predicate, `occupiesSlot()` — a slot is held by a file that is still
a candidate (accepted / received / needs_review). Rejected, expired, and reservations whose
bytes never landed do NOT hold slots. Deliberately kept SEPARATE from `rollUpStatus()`: a
rejected document must keep *showing* as rejected (the signal staff act on) while no longer
*blocking* the replacement it asks for.

Also exposed `canUpload` / `slotsUsed` on each checklist item, so the web client stops
re-deriving the rule from `documents.length` — that duplicate would have greyed out the
upload button on a rejected item the API would happily accept.

### Two holes my own fix opened — found in audit, both proven reachable, both closed
Capacity had only ever been checked at `beginUpload`, which was safe only while "row exists"
meant "slot used". Once occupancy became a predicate that changes over a document's life,
one up-front check was no longer enough:
1. **Concurrent completes** — two uploads reserved before either finished; neither held a
   slot at reservation time, so both completed and pushed the item to 2/1.
2. **Un-rejecting** — reviewing a rejected document back to accepted after its replacement
   had taken the slot, reaching 2/1.

Closed by extracting `assertSlotFree()` and applying it at every transition INTO occupancy:
`beginUpload` (fail-fast), `completeUpload` (authoritative — deletes the refused object so
no orphan bytes remain), and `review` (only the un-reject transition; a normal
received→accepted review is untouched).

### Verified
Reject → replace → accept works; limit still enforced at 1/1; rejected file and its reason
still visible; abandoned reservation no longer blocks a retry; both exploits now return 400
with a message naming the fix ("Reject the existing one first…"); undoing a *mistaken*
rejection while the slot is free still succeeds; refused upload leaves no bytes on disk.
`tsc --noEmit` clean (api + web), `next build` clean. Test data removed, 4 cases untouched.

### Still open (unchanged)
- The reservation **display** half: a row created before bytes land still reads "Received"
  on the item roll-up. Occupancy no longer counts it, but `rollUpStatus` still does.
- Abandoned reservations accumulate as rows with no bytes; no sweeper job exists.
- Workflow vocabulary backfill ("Contact/Case" → "Borrower/Application"), prod included.

---

## 2026-07-21 — Production deploy (Docket) — HEAD 58e1bcf

**Deployed and verified.** Prod API `docket-api-prod` moved item2-e6eea38-213357 → deploy-58e1bcf-023423.

Shipped everything since the last cutover: case detail screen, rejection dead-end fix,
document removal, vocabulary backfill, nav rebuild, tab collapse, leads→workflow wording,
and the real Overview endpoint.

### Sequence run
1. RDS snapshot `docket-prod-predeploy-58e1bcf` (available) — rollback point.
2. Built artifact per `.artifact/api/README.md` (pnpm deploy --prod --legacy → prune symlinks
   → verified Linux argon2 binary + migrations 0007/0008 in bundle + boot test) → zip → S3
   `elasticbeanstalk-ap-south-1-771650096408/docket-api/deploy-58e1bcf-023423.zip`.
3. create-application-version + update-environment → waited environment-updated → Ready/Green.
4. Migrations 0007+0008 via SSM (AWS-RunShellScript) on instance i-04e2f22fc0f6a86d4 — RDS is
   private, so migrations MUST run from inside the VPC. Secret DATABASE_URL from docket/prod/app.
5. Verified via SSM DB query: documents.deleted_at/deleted_by/deletion_reason present,
   documents_case_live_idx present, workflows = Borrower/Application.
6. Verified live API: /overview /cases/:id /checklist and DELETE /documents/:id all 401
   (were 404); /health ok; docket.finlot.ai 200.

### Blocker hit + resolved
Claude Code auto-mode classifier blocked all `aws` mutating calls mid-deploy. Pranav granted
Bash permission for aws; resumed cleanly. Artifact + snapshot were already staged, so no rework.

### Rollback (if needed)
- API: `aws elasticbeanstalk update-environment --profile finlot --region ap-south-1 --environment-name docket-api-prod --version-label item2-e6eea38-213357`
- DB: restore snapshot `docket-prod-predeploy-58e1bcf` (0008 is additive/nullable so unlikely needed).

### Not done
- Authenticated end-to-end test of prod /overview — needs the prod admin password (rotated at
  cutover, not held here). Schema check + 401s are the proof; Pranav to spot-check by logging in.
- Snapshot `docket-prod-predeploy-58e1bcf` left in place as the rollback; delete once confident.

---

## 2026-07-21 — Vercel deploys unblocked; web live again

**Resolved.** docket.finlot.ai serves `build bab16f8` — current with master. The
web had been stuck on a Jul 18 build for two days.

**Root cause:** Vercel blocked every push because the commit author's email did
not resolve to a GitHub account with access to the project. On Hobby, a private
repo only deploys commits authored by the project owner.

**Three attempts, and what each taught:**
1. `sowfreyr@gmail.com` (repo-local override) → GitHub `sneti2021`, which lacks
   contributing access. This was the original break.
2. `ideayemedia@gmail.com` (the Vercel account's login email) → blocked with a
   DIFFERENT message: "could not be matched to a GitHub account". A Vercel login
   is not a GitHub identity — two separate checks.
3. `63978595+pranavadityaneti@users.noreply.github.com` → **Ready in 39s.** The
   ID-prefixed GitHub noreply always resolves; taken from the identity the
   Finlot repo deploys with successfully today.

Also found: an empty commit never triggers a Vercel deployment (my `f6b737f`
vanished without creating one), so it looks identical to being blocked.

**Now live** (all 404 for two days, now 200): `/cases`, `/cases/[id]` checklist,
`/forgot`, `/reset`, the rebuilt sidebar, the real Overview, document removal,
workflow vocabulary. API + DB were already current.

**Hardening kept:** build marker (commit SHA) rendered in the sidebar AND on the
login page pre-auth — the reason this took so long to notice is that nothing
announced staleness. `apps/web/vercel.json` versions the build config. The
commit-identity requirement is documented in the docket README.

**Corrected my own errors:** I asserted three wrong diagnoses before verifying
(auto-deploy working; the Finlot repo serving the host; Pro being required).
Each came from inference rather than direct evidence. Logged in ERRORS.md.

**Still open:** RESEND_API_KEY + RESEND_FROM_EMAIL in the `docket/prod/app`
secret (reset emails no-op until then, logging a warning), then restart the API
so it re-reads secrets at boot.

---

## 2026-07-22 — WhatsApp webhook receiver (built, tested, NOT deployed)

**AWS accounts (for the record):** MY EMI = 759992628096 (Org payer), FINLOT =
771650096408 (Docket deploy target). Never 854408056396.

**What was built (docket repo, apps/api):**
- `src/channels/whatsapp-webhook.ts` (new) — `WhatsappService` +
  `WhatsappWebhookController`. GET verify handshake (global verify token),
  POST receiver with X-Hub-Signature-256 HMAC verification (per-tenant app
  secret, looked up by phone_number_id), two-step Graph media download,
  case matching (DKT ref in caption/text → sender phone last-10 → else skip),
  checksum dedup, stores docs with sourceChannel 'whatsapp'. Always 200 to Meta.
- `src/config/env.ts` — `whatsappVerifyToken`, `graphApiVersion` (default v21.0).
- `src/config/secrets.ts` — allow `WHATSAPP_VERIFY_TOKEN` from Secrets Manager.
- `src/main.ts` — capture raw request body for `/webhooks/*` (needed for HMAC)
  while still parsing, so @Body() keeps working.
- `src/channels/channels.ts` — `CreateWhatsappChannelDto`,
  `ChannelsService.createWhatsapp`, `POST /channels/whatsapp`, module wiring.

**Verify token generated:** docket-bf8e95ed316940dde74db739

**Tested:** tsc --noEmit clean. 18/18 self-contained logic tests pass
(signature accept/reject incl. tamper/wrong-secret/missing/no-prefix/no-rawbody;
GET verify accept/reject; real seal/open credential round-trip incl. wrong-key
rejection + no-plaintext-leak; DKT regex; phone last-10 normalisation).

**Known limitation:** dedup is check-then-insert (not atomic) — prevents
duplicates from Meta's spaced retries (the real case) but not two perfectly
simultaneous deliveries. Meta retries minutes apart, so practical risk ~nil.

**NOT done (needs Pranav):** deploy to EB + add WHATSAPP_VERIFY_TOKEN to
`docket/prod/app` secret + restart. Then Meta webhook config (step 5) can pass.
Awaiting from Pranav: phone number ID, access token, app secret (sent securely).

### Deploy — 22 Jul 2026, ~13:36 IST — WhatsApp webhook LIVE in production

**Version:** `deploy-5cecbf2-wa-133602` — EB `docket-api-prod`, Status Ready / Health Green.
Label carries `-wa-` because the WhatsApp code was **still uncommitted** at deploy time
(HEAD was 5cecbf2, same sha as the previously-running build — a plain `deploy-5cecbf2-*`
label would have been indistinguishable from the old one).

**Sequence run:**
1. Confirmed account 771650096408 (finlot profile) + prod Ready/Green beforehand.
2. `WHATSAPP_VERIFY_TOKEN` merged into `docket/prod/app` via file pipeline — all 5 pre-existing
   keys preserved (verified by listing key names post-write); temp files deleted.
   Secret written BEFORE deploy so the new version boots with it present.
3. `pnpm --filter @docket/api build` → `pnpm deploy --prod --legacy` → prune-escaping-symlinks
   → zip (18M) → S3 → create-application-version → update-environment.
4. Verified linux-x64-gnu argon2 binary present in the bundle (the known Mac→Linux trap).

**Permissions note:** the auto-mode classifier blocked `aws secretsmanager put-secret-value`
and would have blocked the EB writes. Pranav chose a **scoped** allow-rule; created
`docket/.claude/settings.local.json` listing only the specific aws subcommands the deploy
needs (no blanket `aws:*`, no delete/iam/rds).

**Verified in prod (curl):**
- `GET /health` → 200 `{"ok":true,"service":"docket-api"}`
- `GET /webhooks/whatsapp` correct token → echoes challenge, 200 ✅
- `GET /webhooks/whatsapp` wrong token → 403 ✅
- `GET /webhooks/whatsapp` no params → 403 ✅
- `POST /webhooks/whatsapp` unsigned forged body → 200 `EVENT_RECEIVED`, no action ✅

**NOT yet proven:** the HMAC signature *rejection* path end-to-end, because no whatsapp
channel row exists yet — the forged POST was dropped at the "no channel for phone_number_id"
stage, before signature checking. Signature enforcement gets its real test once the channel
is registered.

**Meta app state (Pranav's side):** test number +1 (555) 188-8857,
Phone Number ID 1245401561986264, WABA ID 1374539067974108.
Access token NOT yet generated; app secret not yet collected.

**Next:** Pranav generates token + adds himself as recipient + grabs app secret → register the
channel via a terminal command (secrets never enter chat) → configure Meta webhook with
callback `https://docket-api.finlot.ai/webhooks/whatsapp` → send first real document.

**Still uncommitted in docket repo:** whatsapp-webhook.ts (new), channels.ts, env.ts,
secrets.ts, main.ts, .claude/. Deployed but not committed — commit after E2E verification.

### Audit fixes — 22 Jul 2026 — M1/M4/M2 committed (NOT yet deployed)

Post-deploy audit of 6098e7c found 4 moderate issues; Pranav approved fixing
M1/M4/M2 now, deferring M3 (async ACK) to forlater.md item 7. Also queued
item 8: email poller trusts spoofable From header (pre-existing sibling).

- e1b574b M1: signature failure now sets lastError on every targeted channel
  (was server-log only — a wrong app secret was invisible in the dashboard).
- 724ad37 M4: cap 100 changes per delivery (forged 1MB body could otherwise
  buy thousands of unauthenticated channel lookups pre-signature).
- 79377c9 M2: check Graph metadata file_size before fetching media binary
  (WhatsApp allows 100MB; full buffering before the size check risked OOM).
  Post-download check kept as belt-and-braces.

tsc --noEmit exit 0 after each commit. Diff re-audit findings:
- M1 self-heals: a successful ingest clears lastError, so an attacker who
  somehow knows a phone_number_id can only cause transient false alarms.
- M2 typeof check fails safe on NaN/string file_size (post-check still guards).
- Known residual: per-request work now bounded but endpoint still unthrottled
  (low priority — verify token brute force infeasible at 31 random chars).

**PROD IS STILL RUNNING deploy-5cecbf2-wa-133602 (= 6098e7c, pre-fixes).**
Redeploy needed to ship e1b574b..79377c9 — awaiting Pranav's confirmation.

### Deploy — 22 Jul 2026, ~15:00 IST — audit fixes M1/M4/M2 LIVE

**Version:** `deploy-79377c9-145940` — Ready / Green. Tree was clean at 79377c9,
so the label is a plain sha this time. All three fixes grep-verified inside the
compiled bundle before upload; argon2 linux-x64-gnu binary confirmed present.
No secret changes needed. Post-deploy curl checks: health 200, handshake echoes
on correct token, 403 on wrong token, unsigned forged POST → EVENT_RECEIVED
no-action. `CI=true pnpm install` run after `pnpm deploy` per ERRORS.md — 369ms,
workspace healthy, tsc exit 0.

**Prod now runs the fully audited WhatsApp intake. Remaining before first real
document:** Pranav's Meta values (token, app secret, recipient allow-listed) →
register channel via terminal (secrets never in chat) → Meta webhook config →
send test document.

### 23 Jul 2026 — Insure Lender Dynamics group profile drafted

Pranav shared the My EMI context brief and named the parent group: Finlot and
My EMI are separate companies under **Insure Lender Dynamics**. Drafted
`docs/insure-lender-dynamics-group-profile.html` (HTML-first per global rule):
group-at-a-glance, structure diagram, group thesis, both company profiles,
Docket product section, shared-DNA section, and a consolidated
"open items to confirm" table. All legal/licensing/ownership facts are marked
[TO CONFIRM] — nothing invented; internal-only notes are styled to drop out of
print/PDF automatically. Saved the group structure to persistent memory.
WhatsApp channel setup still pending Pranav's Meta values (token, app secret,
recipient allow-listing) — unchanged since last entry.

### 23 Jul 2026 — WhatsApp channel registration PARKED (forlater item 9)

Pranav doesn't have the Meta token/app secret yet. Queued as forlater.md item 9
with the full 5-step resume plan (token → recipient → app secret → channel
registration via hidden-prompt terminal command → Meta webhook config → E2E
document test). Recommended going straight to a System User token when resumed,
which absorbs item 6 (temp-token swap). Server side needs nothing more: prod
runs deploy-79377c9-145940, webhook live + verified, verify token in secret.
Timing note: demo ~29 Jul, WhatsApp is must-have — flagged not to leave it to
demo eve. Also drafted the two-paragraph ILD blurb in chat (no file).

### Deploy — 24 Jul 2026 — document nudges LIVE (API) + migration 0011

Feature: automated document requests & reminders (commits 22b72f5..ce2ad53).
- API `deploy-ce2ad53-220334` → EB docket-api-prod Ready/Green.
- Migration 0011 (case_messages + cases.nudges_paused_at) applied via SSM on
  i-04e2f22fc0f6a86d4 (DATABASE_URL fetched from Secrets Manager on the box,
  never printed). Verified: table exists, rls=true, column present,
  tenant_isolation policy attached.
- Verify script gotchas (ERRORS-worthy, minor): SQL template backticks trigger
  shell command-substitution inside `node -e "..."` — write the JS to a file via
  a quoted heredoc instead; and @docket/db is "type":"module" so an ad-hoc
  check file must be .cjs to use require(). `postgres` only resolves from inside
  the @docket/db package dir.
- CI=true pnpm install run locally after the bundle (workspace repair).

**REMAINING (needs Pranav):** (a) git push origin master (12 commits) → Vercel
web deploy of the case-screen UI; (b) prod E2E (create case with real email →
confirm request arrives → reply with PDF → lands). Web intentionally not pushed
yet — new case screen calls endpoints only present on the just-deployed API.

### 26 Jul 2026 — Document nudges E2E PROVEN on production (Step 0 complete)

- Pushed 12 commits (5cecbf2..ce2ad53) → Vercel deployed, build marker ce2ad53
  verified live on docket.finlot.ai.
- Minted 1h admin token on the EB instance via SSM (secret never left the box).
- Case DKT-6VWW1H created (sowfreyr@gmail.com) → initial request auto-sent ✓.
  Pranav asked to switch address → paused nudges on DKT-6VWW1H (first real use
  of the Pause feature) and created DKT-VV38HE (pranav@myemipay.com).
- case_messages row: initial | email | sent. Checklist resolved 11 real items.
- Pranav replied with an image attachment → manual poll: fetched 1, imported 1,
  unmatched 0 → "Screenshot 2026-07-18 at 11.25.05 PM.png" on the case,
  status received, sourceChannel email, unclassified slot (expected — no
  auto-placement yet, that is feature 3 on the list).
- FULL LOOP LIVE: create case → borrower auto-asked by email → borrower replies
  → document lands on the case. No portal anywhere.
- DKT-VV38HE reminders left ACTIVE deliberately: if its docs stay missing, the
  3-day reminder should fire — which will verify the "auto reminder" QA row
  currently marked In progress.

### 26 Jul 2026 — Step 3 COMPLETE: multi-industry live in prod

Part C (573e9f8): Cases-screen workflow picker made real (was a cosmetic mock).
Selection drives cases/stages/vocabulary, persists in localStorage, create
dialog passes the slug (the create-side sibling of BUG-01). Hidden for
single-workflow tenants. VISUALLY verified on a local 2-workflow stack:
switch, vocabulary swap, reload persistence, switch-back. Test workflow
deleted; local DB left exactly as found. En route CONFIRMED QA BUG-04: case
table columns (Loan Type/Amount/Entity) are hardcoded and leak into
non-lending workflows.

Parts A+B (c1beb4b): packages/db/scripts/seed-demo.cjs — idempotent, born-
paused demo cases, TENANT_SLUG disambiguation, no fake document rows.
Tested twice on a throwaway clone (docket_seed_test, dropped after):
run1 creates wf+6 cases, run2 skips all, unpaused=0 both times. NOTE: local
dev docket DB does NOT have 0011 applied (throwaway needed it manually).

Prod run via SSM: tenant "Finlot", workflowCreated=true, 6 cases, unpaused=0.
Pushed → Vercel build c1beb4b live. Prod API verified: 2 workflows
(Borrower/Application + Student/Admission), business-loan 6 cases (2 E2E +
3 demo + 1 older?), college-admissions 3 demo cases at 3 different stages.

### 27 Jul 2026 — Step 2 (unmatched documents inbox) DEPLOYED to production

Commits 4073d54 (table+migration 0012), 4b7fbcd (capture in both intakes),
c54752c (triage API), 6f99139 (Needs attention screen).

Deploy: API `deploy-6f99139-165935` Ready/Green → migration 0012 applied via SSM
("Migrations up to date") → verified on prod RDS: unmatched_documents exists,
rls=true, storage_key column present, tenant_isolation policy attached →
pushed, Vercel live on build 6f99139. CI=true pnpm install run locally after
the bundle (ERRORS.md step).

Live checks: /health 200 · GET /unmatched with admin token → 200 [] (empty, as
expected — no unmatched arrivals yet) · unauthenticated → 401.

Pre-deploy verification (browser, local stack + throwaway DB, then dropped):
assign filed the doc onto the chosen checklist slot reusing the SAME storage
key, kept original channel/sender/receivedAt, stamped assigned_case_id +
assigned_document_id + resolved_by; slot list correctly excluded an already
filled PAN slot; discard recorded reason, kept the file, created no document;
empty state renders. Real local dev DB confirmed untouched.

**BUG-02 (High) on the QA sheet is now genuinely fixed — pending the live
E2E proof (email from an unknown sender → appears in Needs attention).**

### 27 Jul 2026 — BUG-04 + Board fix DEPLOYED (config-driven case columns)

Chosen approach: Option C (show_in_table flag on FieldDef). Commits 1d42fc6
(flag + migration 0013), 0c45384 (GET /workflows returns fields), d315e89
(table + board render from config).

**Board bug found during Part C testing was worse than the QA sheet said:**
BoardView iterated a HARDCODED list of the 12 Business Loan stage names, so on
any non-lending workflow it drew columns the tenant lacks AND every case fell
through the name filter and vanished. Two causes, both fixed (board iterates
real stages; toStage no longer clamps unknown names to "Pending").

Deploy: API `deploy-d315e89-203956` Ready/Green → migration 0013 applied via SSM
→ prod API verified serving business-loan [Loan Amount (₹)[inr], Loan Type,
Entity Type] and college-admissions [Course applied, Entrance exam] → pushed,
Vercel live on build d315e89. CI=true pnpm install run after bundle.

Browser-verified pre-deploy on a throwaway clone (dropped; dev DB untouched):
both workflows, table columns + board columns + card fields all correct, all 3
admissions cases visible on the board (previously zero).

**REMAINING in this leak class:** the create-case dialog still hardcodes 9
lending fields (PAN, entity type, loan amount, monthly turnover…). Documented in
the cases/page.tsx header. Creating a case from the College Admissions view will
show loan fields — flagged to Pranav as its own task, not yet scoped.

### 28 Jul 2026 — Finlot marketing site: enquiry form fix SHIPPED (b27005a)

Pranav reported www.finlot.ai/business-loan-enquiry would not submit. Diagnosis
(live browser + safe empty-body API probe, no lead created): the API was fine;
client validators ran on RAW input, so "+91 98765 43210" (the form's own
placeholder format!), leading-zero numbers, and comma amounts left the submit
button silently disabled. type="number" on amount also swallowed pasted
"5,00,000" into an empty string.

Fix in components/b2b/B2BLeadForm.tsx: normalise-then-validate (phone
prefix/space handling, PAN/GST space strip, comma strip), submit the
NORMALISED values (Gain + confirmation email get clean data), amount to
text+inputMode=numeric with a hint, and a consent hint when it is the only
blocker. Browser-verified locally on all cases; no test lead fired at any
point. Pushed to main → Vercel (identity confirmed deploy-safe).

### 28 Jul 2026 (cont.) — Enquiry lead-loss safety net SHIPPED (46fdcd1)

After the validation fix, Pranav's real submission still failed. Diagnosed with
a deliberately-rejectable probe (no lead created): **upstream Gain webhook
returns 404**. Route + env var are fine; the partner endpoint URL is wrong/moved.
ROOT CAUSE IS EXTERNAL — Pranav to check BUSINESS_LOAN_WEBHOOK_URL in Vercel
with Gain. Suspect: the route force-appends a trailing slash (added earlier per
ERRORS.md when Gain 301'd slash-less URLs); if Gain changed routing that slash
may now 404.

Bigger issue this exposed: enquiries were stored NOWHERE, so every failure lost
a real lead silently. New lib/lead-rescue-email.ts + route wiring: all three
failure paths (unconfigured / non-2xx / unreachable) email the full enquiry to
LEAD_ALERT_EMAIL (default support@finlot.ai), return success to the borrower
(a human genuinely has their details), and still send the borrower's
acknowledgement. Unrecoverable case returns 502 and logs "LEAD LOST" + full
payload. Borrower input HTML-escaped.

Verified locally both paths (rescue 200 captured:manual with 404 logged;
Resend-disabled 502 + LEAD LOST log). No real inbox touched — used Resend's
delivered@resend.dev sink. Build clean, pushed to main.

**ACTION FOR PRANAV:** set LEAD_ALERT_EMAIL in Vercel (or rescued leads go to
support@finlot.ai), and fix the Gain webhook URL.

### 30 Jul 2026 — AI classifier: review + fixes (Tasks 1-3 + review fixes)

Built (not yet deployed): cac0eaf classifier module, dd05729 wiring into all
three arrival paths + migration 0014, b87e951 suggestion UI, 61f1b57 review fixes.

**Adversarial review** (7 independent reviewers + per-finding adversarial
verification): 12 confirmed, 0 refuted, 20 unverified. Report saved to
`docs/docket-ai-classifier-code-review.html`.

**Fixed in 61f1b57 (A/C/D/E/F):**
- A (HIGH, found independently by 4 of 7 reviewers): processCase re-classified
  every still-unplaced doc on EVERY new arrival — O(n^2) OpenAI calls, and it
  silently overrode staff (dismissed suggestions returned; a suggestion could
  flip mid-review so "File it" filed to an unapproved slot). Fixed with an
  atomic CLAIM (single UPDATE whose WHERE is both eligibility test and lock);
  claim is permanent. DELIBERATE: no auto-retry on error — doc stays in
  Unmatched files (fail-soft) because retry is what caused the loop.
- C: prompt injection defence + fenced untrusted PDF text.
- D: vision detail low -> high (it exists to read fine print).
- E: max_tokens -> max_completion_tokens (verified against installed SDK types).
- F: MIN_PDF_TEXT_CHARS 40 -> 250 (hybrid PDFs were judged on cover sheets).

15 tests (4 new). Each new test PROVEN to fail against the old code before
acceptance. Claim verified exactly-once against real Postgres.

**Deferred -> forlater item 11:** defect B (slot-capacity write-skew race),
manual reclassify action, and the 20 unverified findings — notably unpdf's CJS
build possibly breaking Indic-script PDFs.

**NOT DEPLOYED.** Next: Task 4 = deploy (migration 0014 + API + Vercel) and the
live test with a real photo. Local demo stack was left running on :3000/:3333
against throwaway DB docket_demo for Pranav to click through.

### 31 Jul 2026 — AI CLASSIFIER LIVE AND PROVEN IN PRODUCTION

Task 4 complete. API `deploy-c88275a-231127` Ready/Green, migration 0014
applied+verified (5 cols + CHECK), Vercel `build 16dfe9b`.

**E2E PROOF:** emailed IMG_7742.jpg (synthetic PAN-card image, meaningless
filename) to documents@finlot.ai with DKT-VV38HE in subject. Result on prod:
  PAN Card <- IMG_7742.jpg | autoFiled:true
             | read as "Permanent Account Number Card" | confidence: high
Filename ignored; content read; auto-filed to the right slot with no human.

**Two production bugs found and fixed during the deploy:**
1. Stored OPENAI_API_KEY began with char code 27 (ESC) — a bracketed-paste
   marker (ESC[200~) captured when pasting into the shell prompt. .trim() left
   it (ESC isn't whitespace); undici rejected the auth header; the SDK reported
   only "Connection error." Network was never at fault (curl to api.openai.com
   from the instance: 401 in 13ms, public IP present).
   FIX c88275a: hydrateSecrets now sanitises EVERY secret (ANSI CSI + all
   C0/C1 control chars) and warns by key name when it repairs one.
2. msg() hid the cause chain — the real error ("invalid authorization header",
   UND_ERR_INVALID_ARG) was 2 levels down in .cause. Now flattened.
Then hit OpenAI 429 (no credits) — Pranav added credits, retest passed.

**Note:** documents from the failed attempts (3x IMG_4821, IMG_9903, the old
Screenshot) will NEVER be classified — the claim is permanent and there is no
auto-retry by design. Makes the case for the queued "reclassify" action.

**STILL OUTSTANDING:** Pranav should re-store OPENAI_API_KEY cleanly (the
sanitiser rescues it every boot but the stored value is still polluted) — type
`read -rs "K?key: "`, ENTER, then paste.

### 31 Jul 2026 (later) — MODEL SWITCH + PRODUCT DOC + OPTION A SPIKE: GO

**Model bench (sequential, per Pranav):** same 8 docs, byte-identical inputs,
production prompt/schema imported from deployed dist. Score /7 readable docs:
  gpt-4o-mini 5 · gpt-4.1-mini 6 · gpt-4.1 7 · gpt-5-mini 7
gpt-4o-mini bills images ~5x the tokens of newer models (138k vs ~24k for the
set) — it was the least accurate AND more expensive than gpt-5-mini. Both
baseline errors (PPF passbook→photograph, 26AS→ITR) vanish two rungs up.

**SWITCHED PROD TO gpt-5-mini:** OPENAI_MODEL added to docket/prod/app secret
(was unset → env.ts default gpt-4o-mini). EB restart 06:02:28 UTC; boot log
confirms OPENAI_MODEL now loads; env Ready/Green. No code change needed.

**Product overview doc** (marketing/dev/testing/analytics audience, cost +
status sections cut per Pranav): docs/docket-product-overview.html, commit
3e83f62, pushed. Copy on Desktop.

**Option A spike on the EB instance — GO:**
- @napi-rs/canvas prebuilt binary works (x86_64, Node 22), installed in
  /tmp/raster-spike (left in place), zero system packages.
- Deployed unpdf 1.8 renderPageAsImage works with `canvasImport` option
  (NOT `canvas`); its internal resolver can't see foreign node_modules, so
  the module must be passed in.
- Adi PAN.pdf (the scanned PDF prod refuses): page 1 → 811KB PNG in 2.8s →
  gpt-5-mini via production prompt → applicant_pan [HIGH], read the PAN
  number off the scan. 2,433 tokens (~Rs 0.07) — cheaper than a photo.
**Build scope agreed to include a reclassify path** — classifiedAt claim is
permanent, so rasterization alone would never touch the existing backlog.

### 31 Jul 2026 (later still) — TASKS 1+2 BUILT, ADVERSARIAL AUDIT, HIGH BUG FIXED PRE-DEPLOY

Task 1 (committed 1e64819): scanned PDFs rasterised (unpdf+@napi-rs/canvas,
2 pages, scale 2) into the vision route. Adjacent fixes, both measured live:
max_completion_tokens 300->2000 (gpt-5-mini reasoning ate the whole 300 cap,
EVERY answer empty since the model switch — caught before any doc arrived);
timeout 30->60s. supportedArchitectures already covers linux-x64-gnu (checked
physically in .pnpm).

Task 2 (uncommitted): POST /documents/:id/reclassify (ClassifyController in
classify module — reverse import is a cycle) + Reclassify button on unmatched
files. Clears claim+stale reading in one guarded UPDATE, classifies
immediately (NO periodic sweep exists — correction to the approved plan; the
backlog gets woken by calling reclassify per stuck doc post-deploy).

Pranav-ordered comprehensive audit found:
- HIGH (fixed): MediaBox memory bomb. 450-byte PDF declaring 8000pt page ->
  RSS 138MB->1.17GB at fixed scale 2 (60000pt would be a 57.6GB alloc = OOM
  kill of the single-instance API, remotely triggerable by emailed PDF; the
  15MB input cap can't catch it — bomb is a DECLARED DIMENSION, not bytes).
  Fix: MAX_RASTER_PIXELS=16MP budget, scale adapts per page
  (rasterScaleFor). Re-test: both bombs render bounded 4000x4000, ~240MB RSS.
- MEDIUM (fixed): one corrupt page discarded the readable one -> per-page
  fail-soft, refuse only if nothing rendered.
- Hardening: 10/min throttle on reclassify (only endpoint where a click
  spends money) — proven live: 10x pass then 429,429. Guard order proven:
  401 before everything, throttle counts only authed calls.
- No-defect checks: reserved uploads (storageKey null until landed — guard
  correct), reclassify/confirm race serialised, double-click single-winner,
  RLS scoping, filed docs untouchable, corrupt/encrypted/zero-page refusals,
  text path untouched, Next build clean.
- Disclosed residuals: dashboard-uploaded unfiled docs never auto-classify
  (pre-existing; button now covers manually); >15MB single-page PNG refusal;
  nginx-60s-vs-model-60s rare 504-while-succeeding.

### 31 Jul 2026 (round 2 verification) — ONE MORE BUG FOUND+FIXED, ARTIFACT PROVEN

Pranav ordered a second adversarial pass ("prove there are more errors").
Found:
- MEDIUM (fixed, both ends): REJECTED documents could be auto-filed. review()
  accepts unfiled docs (API-level), and neither reclassify's guard nor the
  stamp-phase re-check looked at status — so a doc staff marked unusable
  could be filed into a slot by the machine. Fix: reclassify WHERE excludes
  status='rejected'; stamp phase honours a rejection that lands mid-flight
  (stamps the reading, never files/suggests). PROVEN by scripted-fake-DB
  harness: on pre-hardening dist the test FAILS (autoFiled:true on rejected
  row); on hardened dist it passes. Old-code-fails discipline observed.
Proven, no defect:
- THE DEPLOY ARTIFACT (first time ever tested): pnpm deploy --legacy + prune
  script -> bundle in scratch. All 6 canvas platform binaries present incl.
  linux-x64-gnu; unpdf paired; zero escaping symlinks; raster suite AND API
  boot run FROM INSIDE the bundle (no workspace above) — ERRORS.md's
  definitive artifact test. Workspace repaired (CI=true pnpm install, 364ms).
- classify() e2e on compiled dist w/ mocked OpenAI (9 checks): 2 PNG parts
  detail:high, "2 pages" label, strict closed-enum schema, cap/timeout
  actually reach the SDK, corrupt PDF skips with ZERO model calls, image
  route regression, out-of-enum answer -> error.
- Applier stamp-phase normal path still auto-files on high (regression).
Disclosed: throttle is per-IP (office NAT shares 10/min); harnesses test the
SWC dist (what ships), tsc covers the TS level.

### 1 Aug 2026 — DEPLOYED: SCANNED-PDF CLASSIFICATION + RECLASSIFY LIVE, BACKLOG CLEARED

Commits 1e64819 + 60bcf28 pushed. Deploy hit ONE snag, fixed and logged to
ERRORS.md: zip without -y materialises pnpm symlinks -> tslib
MODULE_NOT_FOUND crash-loop (353MB zip was the tell). Re-zipped -qry (112MB,
713 symlinks) -> Ready/Green, /health 200, boot log shows all 8 secrets +
reclassify route. Web build 60bcf28 live on Vercel.

BACKLOG WAKE-UP (real deployed endpoint, JWT minted on-instance): 7 stuck
docs found, 7/7 HTTP 201:
- DKT-6H75Z2 Adi PAN.pdf -> "PAN card (Income Tax Department PAN)" [high]
  AUTO-FILED into PAN Card. The scanned-PDF raster path proven in prod
  end-to-end on the document that started it all (10.2s round trip).
- DKT-1041Y9 Adi PAN.pdf x2 + DKT-VV38HE IMG_4821 x2, IMG_9903: all read
  correctly [high], demoted to SUGGESTIONS because the PAN slots are already
  occupied — the slot-full-never-overflow rule doing its job.
- Screenshot: honest no-match [high], left for a human.
Discovered during deploy prep: apps/api/test/*.mjs exist (my earlier search
missed non-.spec names) — all 28 pass. Run with:
  node --conditions development --import @swc-node/register/esm-register test/<f>.mjs

### 1 Aug 2026 — PHASE 1 LIVE: WEBSITE FORM -> DOCKET CASE (Eswar demo prep)

Docket 6c8af5b: POST /intake/enquiry — x-intake-key (constant-time, 503
unconfigured/fail-closed, 401 proven live), 20/min throttle, email-or-phone
required, reuses CasesService.create (now exported) so intake cases get
reference retry + first stage + auto initial nudge. INTAKE_API_KEY +
INTAKE_TENANT_SLUG in Secrets Manager (generated in-pipe, never displayed;
instance role correctly DENIED PutSecretValue — wrote via admin profile).
EB deploy-6c8af5b-055446 Green (zip -qry chain + sanity checks used).

Finlot 9709eaa: /loan-enquiry (noindex, unlisted, URL-only) + B2BLeadForm
endpoint prop + /api/leads/loan-enquiry route (same rescue-email pattern).
Vercel env DOCKET_INTAKE_KEY/URL set by Pranav (clipboard one-liner;
first attempt went into wrong project+fields — nothing saved, no leak).

REHEARSAL PROVEN E2E: form POST -> {"success":true} (Docket path, not
rescue) -> case DKT-MVWJY9, stage Pending, source Website, contact with
both routing keys, all data fields mapped (pan/gst/amount/turnover/notes)
-> case_messages: initial/email/sent "Documents needed — Finlot —
DKT-MVWJY9" to pranav@myemipay.com. Log: IntakeController created case.

NEXT: Phase 2 (tabs: Overview/Checklist/Activity + Calls placeholder),
Phase 3 (comments+events migration), Phase 4 (conversations), Phase 5
(calls v1).

### 1 Aug 2026 — PHASE 2 LIVE: CASE TABS (Overview/Checklist/Activity/Calls-soon)

Docket web 41ac72d on Vercel. Web-only, no API change, no migration.
- Overview: subject card, case card, Details card — custom data fields
  (loan_amount etc.) DISPLAYED FOR THE FIRST TIME, Rs-formatted en-IN.
- Checklist: unchanged content, still the default tab.
- Activity: client-derived timeline (newest first) — case created,
  landed files with AI reading+confidence riding the arrival event
  (no invented timestamps; real event log = Phase 3), sends with
  failures red. Old Requests-sent card absorbed into it.
- Calls: visible tab, "soon" pill, honest placeholder (per Pranav).
Pixels NOT verified by me (no dashboard login) — Pranav's first click is
the visual pass; /loan-enquiry lesson noted in report.
Loan-enquiry page sidebar bug earlier: fixed d55a2d8 (publicRoutes
allow-list), inversion queued as forlater item 12.
NEXT: Phase 3 (case_events migration: comments + stage/review events),
Phase 4 (conversations), Phase 5 (calls v1).

### 1 Aug 2026 — PHASE 3 LIVE: CASE JOURNAL (comments + events), MIGRATION 0016 ON PROD

Docket 478dc39. case_events table: comments (pinnable to a checklist item
via requirement_id) + system events (stage_changed, document_reviewed
written in the SAME tx as the change). author_name denormalised — journal
survives account deletion. DB CHECK refuses blank comments.

Pre-deploy proof on throwaway dev-DB clone (dropped after): migration
applied, RLS probe (acme sees 0/writes nothing), 201/201/400/400/401
guard chain on comments, stage event with real names, NO event on
same-stage move, reject event pinned w/ reason. Suites 15+13 pass.

PROD: EB deploy-478dc39-070113 Green, health 200. Migration 0016 via SSM
— verified: table exists, journal 1785650000000, RLS enabled,
tenant_isolation policy. (SSM command REPORTED Failed — that was my
broken inline verify one-liner, not the migrator; clean re-verify green.)
Web 478dc39 on Vercel; live /events probe 401 (mapped+guarded).

UI: Notes button per checklist item, case-note composer + journal merged
into Activity tab (real authors/timestamps).
REMAINING: Phase 4 (conversations — message-text storage + tab),
Phase 5 (calls v1 manual log + recording upload). Pixels = Pranav's pass.

### 1 Aug 2026 — PHASE 4 LIVE: CONVERSATIONS (words kept), MIGRATION 0017 ON PROD

Docket 5880414. Core fix: both channels DROPPED inbound text (email
returned early without attachments; WA skipped non-media). Now
conversation_messages keeps the words; partial unique index on
(tenant,channel,external_id) dedupes Meta redelivery/poller races.
GET /cases/:id/conversation merges inbound + case_messages outbound at
read time. Web: Conversations tab (chat bubbles, channel filters,
failures marked, honest WA empty state).

Pre-deploy proof through REAL compiled ingest paths on throwaway clone:
synthesized RFC822 + Meta payloads — text-only email kept (was dropped),
Message-ID replay deduped, attachment import unharmed, WA text kept +
wamid replay deduped, RLS blind, merged HTTP thread oldest-first.
Suites 15+13.

PROD: EB deploy-5880414-072755 Green, health 200. Migration 0017
verified (table, journal 1785700000000, RLS, dedup index). Web 5880414
live. Probe /conversation 401 (mapped+guarded).
REMAINING: Phase 5 (Calls v1 — manual log + recording upload).

### 1 Aug 2026 — REFRESH CONTROL + 15s AUTO-REFRESH (b615cfe, be6abf4)

Pranav asked how long documents take to reflect. Measured from code:
mailbox cron EVERY_MINUTE (0-60s, ~30s avg) + ingest 2-5s -> file VISIBLE
unfiled; then classification fire-and-forget, SEQUENTIAL per doc ~5-15s
each -> file lands in its slot. One doc ~45s typical / ~90s worst; nine
docs in one mail, the last ~2-2.5 min. BUT the page fetched on mount and
never again — most of the "slowness" was a screen not listening.

b615cfe: RefreshControl (button + "Updated Ns ago", ticking) in the
Document checklist header; replaced the page-header Refresh so both share
in-flight state.
be6abf4: auto-refresh every 15s while a case is open. Guards: skip when
tab hidden; skip while an action is in flight (busyId/uploading/nudging/
pausing/refreshing via ref written in an effect, not during render —
eslint caught the anti-pattern); background polls never clear actionError
and never raise one.

Browser-verified both: doc inserted behind the UI appeared with ZERO
clicks; API killed -> failing polls silent, checklist intact, age label
honestly froze at "1m ago". Note: the automation pane reports
visibilityState=hidden, so the visibility guard blocks polling there —
had to override it to exercise the feature (guard itself thereby proven).
tsc caught refresh being passed directly as onClick (click event would
land in the opts param).

### 1 Aug 2026 — EDITABLE CASE DETAILS LIVE (77b5ed1), MIGRATION 0018 ON PROD

PATCH /cases/:id — first ever way to edit a case (only stage existed).
Updates contact name/org/email/phone + workflow data fields; journal line
written in the SAME transaction; data MERGED not replaced; emptied fields
sent as null so values can be CLEARED. Migration 0018 adds the
details_changed event kind (drop+re-add CHECK).

Web: Edit details on Overview. Field renderer + validator extracted to
components/case-fields.tsx and SHARED with the New Case dialog — a value
valid on create cannot be invalid on edit. Overview now shows config
labels ("Loan Amount (Rs)") not humanised keys. Two earned warnings:
email/phone are routing keys; checklist rebuilds from these answers.

Browser-verified on throwaway clone (dropped): config labels; blank name
refused with workflow's noun; bad PAN caught by config regex; save
persisted all 6 fields; journal recorded old->new + author; entity_type
LLP->Partnership REBUILT the checklist (incorporation out, partnership
deed in); no-op edit wrote NO journal line. Suites 15+13.

PROD: EB deploy-77b5ed1-101542 Green, health 200. Migration 0018 verified
(journal 1785760000000, constraint allows details_changed). Web 77b5ed1
live. PATCH probe 401 (mapped+guarded).

NOT editable by design: reference (quoted in the subject's existing email
thread), workflow (checklist already built), created date, stage and
reminders (own endpoints, own audit lines).

### 1 Aug 2026 — CONTACTS / WORKFLOWS / CHANNELS SCREENS LIVE (4502fe2)

Pranav thought the Overview was mocked. VERIFIED IT IS NOT: queried prod
— 15 cases / 13 docs awaiting decision matched the screen exactly, and
overview.ts derives every figure from rows using the same
requirementApplies + rollUpStatus the checklist uses. What made it FEEL
mocked: 8 of 12 nav items disabled.

Built the three whose APIs already existed:
- Contacts: /contacts page + API enriched with caseCount/lastCaseAt via
  LEFT JOIN (zero-case contacts still listed). Searchable. Missing
  email/phone shown as "— none" (they are the routing keys).
- Workflows: vocabulary, stages in pipeline order w/ tones, all field
  defs. Read-only and says so explicitly.
- Channels: address, enabled, last checked, last error IN FULL, and
  "Check now" (email only — WhatsApp is pushed by Meta, button would
  lie). Credentials never rendered (API returns SAFE_COLUMNS).

Browser-verified: contacts search 1 of 5 on organisation match; workflow
stages real (Pending -> Proprietorship Documents Collection -> ...);
Check now reset 13s -> 0s and surfaced a REAL failure
(CHANNEL_SECRET_KEY unset locally) — the error path proved itself
unprompted.

PROD: EB deploy-4502fe2-105003 Green, health 200; web 4502fe2 live.
STILL DEAD in nav: Conversations, Follow-ups, Calls, Integrations, Team
(5 of 12). Conversations/Follow-ups have data but need cross-case
endpoints; Team needs an API; Calls = forlater #13; Integrations undecided.

### 1 Aug 2026 — CONVERSATIONS + FOLLOW-UPS LIVE (9d660d4)

New ActivityModule: GET /conversations (one row per case with any
message; inbound conversation_messages + outbound case_messages merged at
read time, later wins) and GET /follow-ups (cases owing required docs,
never-asked first then longest-waiting). Follow-ups reuses the
scheduler's OWN rule (3-day interval, 3 max) so screen and cron cannot
disagree, and requirementApplies + rollUpStatus so checklist/Overview/
follow-ups agree on "outstanding".

UI: Conversations — "You:" prefix on our side, "Their turn" badge when
the newest is inbound, channel filters. Follow-ups — per-row status
(unreachable/paused/never asked/reminders spent/due/waiting) + "Ask now"
that chases without opening the case (hidden when unreachable).

Verified live on seeded data: merge + ordering correct; 3 never-asked
above a 9-day-old; adding an email flipped Unreachable -> Never asked and
enabled Ask now; send reported "Nothing was sent — no-channel" honestly.
Suites 15+13. EB deploy-9d660d4-112134 Green; both probes 401.

NAV NOW: 10 of 12 live. Dead: Calls (forlater #13), Integrations
(undecided).
NEXT ASK FROM PRANAV: multi-select + bulk download/delete/share/modify on
Contacts, Cases and others — NOT started; delete is destructive with no
API and needs his decisions first (see report).

### 1 Aug 2026 — MULTI-SELECT + CSV (3aedb7e) AND SOFT DELETE (6d64a6f) LIVE; MIGRATION 0019 ON PROD

3aedb7e — bulk-select.tsx shared across Cases + Contacts. Selection is
narrowed to VISIBLE rows at render (not fixed in an effect), so an action
can never touch a filtered-out row. CSV: proper quoting, formula-injection
guard ('=CMD() -> \'=CMD()), CRLF, UTF-8 BOM; columns follow the workflow's
own fields/vocabulary. Cases toolbar Download was a decoration — now real;
removed dead Updated At / Filters.

6d64a6f — SOFT delete only. Migration 0019: deleted_at/deleted_by on cases
+ contacts, partial live indexes, 'deleted'/'restored' journal kinds. The
hard part was reads: ALL 25 queries touching cases/contacts now exclude
deleted rows, incl. BOTH inbound matchers (a deleted case must not swallow
a borrower's email — verified matchCase returns null), the nudge cron,
classify, overview, follow-ups, conversations, unmatched-assign.
Contacts with live cases are REFUSED (not cascaded, not orphaned). Bulk
endpoints return per-id outcomes. Confirmation loads real consequences from
the server and requires typing DELETE.

Verified pre-deploy on a clone: gone from 6 surfaces + 404s, data/journal/
deleted_by survive, double-delete idempotent, restore works with both acts
journaled, contact refusal correct; browser: confirm disabled until DELETE
typed exactly, delete completed and list refreshed 4->3.

DEPLOY NOTE: `aws s3 cp` reported success twice while uploading NOTHING
(head-object 404). Had to use `aws s3api put-object` and verify with
head-object before create-application-version. Trust head-object, not cp's
exit code. Logged to ERRORS.md.

PROD: EB deploy-6d64a6f-v2 Green, health 200; migration 0019 verified
(4 columns, 2 partial indexes, constraint, 15 cases still live); web
6d64a6f; /cases/delete probe 401.
KNOWN GAP: no "Deleted items" screen — restore is API-only for now.
