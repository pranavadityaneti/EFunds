# ERRORS.md — lessons from debugging this project

## Gain AI (hicaliber) lead webhook integration — 2026-07-06

**What didn't work:**
1. Following the vendor's sample payload literally. Their sample showed
   `"needs": "funds_needed"`, but their live validator expects a field
   *named* `funds_needed` — the sample had key/value flipped. Every
   submission failed with 400 "missing expected paths: funds_needed".
2. Trusting the env var as pasted. The Vercel `BUSINESS_LOAN_WEBHOOK_URL`
   value was missing the trailing slash. Their endpoint 301-redirects
   slash-less URLs, and Node fetch converts the redirected POST into a
   bodyless GET → upstream 405 → 502 to the borrower. Local worked
   (slash present in .env.local), production failed.

**What worked:**
- Probing their validator with deliberately incomplete payloads (returns
  the full list of expected paths without creating a lead) — safe way to
  discover their real schema: `name, email, phone, business_name,
  business_pan, loan_amount, monthly_turnover, funds_needed,
  campaign.source`.
- Normalizing the env value in code (trim, strip quotes, ensure trailing
  slash) instead of asking for a re-paste — closes the whole class.
- Logging upstream status + body on forward failure so Vercel function
  logs show the real cause.

**Remember next time:**
- Never trust a vendor's sample payload — probe the live validator with
  an empty body first; the error message lists the actual expected schema.
- Test the deployed environment, not just local, before declaring an
  integration done — env var formatting differences are invisible locally.
- `business_gst` is NOT in Gain's expected paths — it passes through
  unmapped. Ask Gain to map it if GST capture matters.

## Local tests that pass for reasons prod doesn't have — Docket RLS on RDS — 2026-07-16

**What didn't work:**
1. Proving tenant isolation locally. `withTenant()` runs `set local role
   docket_app` on every tenant-scoped query, and it worked perfectly on
   the laptop for weeks. On RDS it fails outright:
   `permission denied to set role "docket_app"` — which would have broken
   every leads/contacts/workflows request in production.
   The local DB role (`pranavaditya`) is a **superuser**, and a superuser
   can `SET ROLE` to anything. The local test was measuring the superuser,
   not the design. RDS gives no superuser (only `rdsadmin`), so nothing
   masked it there.
2. My stated reason for why it *should* work was wrong: I claimed "in PG16+
   the creator is auto-granted membership on roles it creates, which is
   what makes SET ROLE work for a non-superuser." Half true and dangerous.
   PG16 added `createrole_self_grant`, which **defaults to empty** — the
   creator gets `admin_option=t` but `set_option=f`. It can *administer*
   the role but not *become* it. Reasoning from memory produced a
   confident, wrong model that survived until a real non-superuser tested it.
3. (Same session, separate trap.) Creating the role via psql with the
   password in a `DO $$ … $$` block. psql does **not** interpolate
   `:'vars'` inside dollar-quoted strings, so the password reached the
   server as the literal `:'owner_pass'` → `syntax error at or near ":"`.

**What worked:**
- Running the test **on RDS, as the actual non-superuser**, in a
  transaction that ROLLBACKs — replicating prod topology exactly (owner
  creates the table → `SET ROLE` app role → check scoping). Cost minutes,
  caught a total outage. Verified clean afterwards (0 probe roles/tables).
- Reading the catalog instead of trusting docs/memory:
  `SELECT admin_option, inherit_option, set_option FROM pg_auth_members …`
  showed `set_option=f` immediately and settled the root cause.
- Reading **drizzle's source** (`pg-core/dialect.js:62`) rather than
  assuming: it applies migrations purely by timestamp and **never compares
  the stored hash**. So editing an already-applied migration silently
  changes a fresh prod DB while leaving local untouched. Confirmed that a
  new migration (0004), not an edit to 0002, was the correct fix.
- `GRANT docket_app TO CURRENT_USER WITH SET TRUE, INHERIT FALSE;` —
  `CURRENT_USER` resolves to the migration runner, which is also the API's
  role (both read `DATABASE_URL`), so one line is correct in every env with
  no environment-specific SQL.
- For psql: drop the DO block. `SELECT 'CREATE ROLE …' WHERE NOT EXISTS (…)
  \gexec` then `ALTER ROLE … PASSWORD :'owner_pass'` — idempotent, and
  interpolation works outside dollar-quotes.

**Remember next time:**
- **A local test only proves what the local privileges allow.** Before
  trusting any local proof about permissions, RLS, or roles, ask: *is the
  local role a superuser?* (`SELECT rolsuper FROM pg_roles WHERE rolname =
  current_user;`) If yes, the test proves nothing about RDS — RDS has no
  superuser. This is the **second** time a green check came from a broken
  test (the first: a reachability check using `timeout`, absent on macOS,
  where `||` printed a false success). **A green check from a broken test
  is worse than no test.**
- Creating a role does NOT let you become it. Grant `SET` explicitly, and
  be explicit about `INHERIT` too — `WITH SET TRUE` alone leaves INHERIT
  defaulting to the member's `rolinherit`, granting more than intended.
- Never edit a migration that has already been applied anywhere. Drizzle
  won't re-run it locally but a fresh DB gets the new version — the exact
  local/prod divergence that hides bugs like this. Append a new migration.
- Verify permission models against the real target with the real role,
  in a rolled-back transaction. It is cheap and it is the only proof.
- Also noted (not fixed): no `.env` exists in the docket repo and
  `drizzle.config.ts` falls back to a `postgres` role that doesn't exist
  locally — `DATABASE_URL` must be exported per command. A fresh clone will
  hit a confusing connection error.

## Deploying a pnpm workspace artifact to Elastic Beanstalk — Docket — 2026-07-16

**What didn't work:**
1. `pnpm deploy --filter=@docket/api --prod --legacy` then zip → EB deploy
   aborted in StageApplication:
   `chown /var/app/staging/node_modules/.pnpm/node_modules/@docket/api:
   no such file or directory`.
   `pnpm deploy` leaves one link in the virtual store pointing back at the
   workspace source (`-> ../../../../../../apps/api`). On the build machine
   it resolves, so the artifact looks fine, reports **zero broken symlinks**,
   and boots when tested in place. Extracted anywhere else it dangles, and
   EB recursively chowns the staged bundle — a dangling link is fatal.
   The README's claim of "internal, relative symlinks only" was wrong.
2. Shipping a Mac-built artifact to a Linux server. `@node-rs/argon2` is a
   native module with one prebuilt binary per platform as **optional deps**;
   pnpm installs only the one matching the installing machine. The artifact
   carried `argon2-darwin-arm64` to a `linux-x64` box → crash-loop on boot:
   `Cannot find module './argon2.linux-x64-gnu.node'`, systemd gave up after
   6 restarts, environment red. argon2 is the password hasher — the API can
   neither hash nor verify a password without it, so **login is dead**.
3. Putting `supportedArchitectures` in **package.json** under a `pnpm` key.
   pnpm 11 silently ignores it there. **This is the SECOND time this exact
   trap has hit this repo** — the first was `onlyBuiltDependencies` (pnpm 10)
   vs `allowBuilds` (pnpm 11). Wrong location = no error, no warning, no effect.
4. `pnpm install` and even `pnpm install --force` after fixing the location:
   both reported **"Already up to date"** and fetched nothing.
   `node_modules/.modules.yaml` does not record architectures, so pnpm sees no
   work to do. The exit code was 0 and the binary still wasn't there.
5. Checking artifact module resolution with
   `require.resolve(m, { paths: [artifactDir] })` → reported `postgres` and
   `@node-rs/argon2` MODULE_NOT_FOUND and I briefly called the artifact broken.
   **It wasn't.** `@docket/db` is a symlink into `.pnpm`; resolution walked up
   from the *symlink* path, not the realpath where the sibling node_modules
   lives. Node follows realpath at runtime, so the test measured something the
   runtime never does. A false alarm, retracted.

**What worked:**
- `pnpm config list` — shows what pnpm **actually reads**. This is the one
  reliable way to tell a real setting from a silently-ignored one. If the key
  isn't in that output, pnpm isn't using it, regardless of how right it looks.
- Clean install (`rm -rf node_modules && pnpm install`) to apply
  `supportedArchitectures`. Then verify by **listing the binary**, not by the
  exit code: `ls node_modules/.pnpm | grep argon2` must show `linux-x64-gnu`.
- Detecting escaping symlinks by **resolving the target** and comparing against
  the artifact root — never by testing existence, which passes on the build box.
  `scripts/prune-escaping-symlinks.mjs` prunes then re-walks and exits non-zero
  if any survive.
- Testing the artifact by **executing its real entrypoints** rather than
  inspecting it: `node dist/main.js` with no env must fail on the env guard
  (`Missing required environment variable: DATABASE_URL`). Reaching the guard
  proves every module loaded; a missing module throws MODULE_NOT_FOUND first.
- Unzipping the bundle into a clean directory with no workspace above it and
  running it there — the only local test that models the instance.
- Reading `/proc/<pid>/environ` of the running app and connecting with its own
  DATABASE_URL. drizzle reports BOTH "cannot connect" and "table missing" as
  `Failed query`, so the app log cannot distinguish them; this can.
- `/var/log/eb-engine.log` (deploy/staging failures) vs `/var/log/web.stdout.log`
  (the app's own crash) — different files, different failures. Both via SSM.

**Remember next time:**
- **A Mac cannot build a Linux artifact by default.** Any native module
  (argon2, sharp, esbuild, swc, lightningcss…) ships per-platform binaries and
  pnpm fetches only this machine's. Check before deploying:
  `ls node_modules/.pnpm | grep -E "linux|darwin"`.
- **pnpm 11 settings live in `pnpm-workspace.yaml`, not `package.json`.** Has
  now cost this repo twice. Verify with `pnpm config list` before believing a
  setting is active.
- **"Already up to date" is not proof.** Neither is exit code 0. Verify the
  artifact of the change (the file, the binary, the row), not the command's
  success.
- An **existence check on a symlink is meaningless on the build machine** —
  resolve the target and compare against the root.
- **Before declaring something broken, check the test.** The MODULE_NOT_FOUND
  false alarm was my resolver walking symlink paths instead of realpaths. Same
  lesson as the superuser RLS test and the macOS `timeout` check, in the other
  direction: a broken test can cry wolf as easily as it can wave a bug through.
- EB deploy needs config the app can't infer: `API_PORT=8080` (nginx proxies to
  8080; our default 3333 = silent 502s) and `HealthCheckPath=/health` (the API
  has no `/` route; EB probes `/` by default → 404 → red).

## ACM cert under a Vercel-fronted subdomain fails with CAA_ERROR — 2026-07-17

**What didn't work:**
- Requested an ACM cert for `api.docket.finlot.ai` (Docket API on AWS EB). DNS validation
  record was added at GoDaddy, byte-perfect (verified against the authoritative NS). ACM
  still went `FAILED` after ~5 min with `FailureReason: CAA_ERROR` — unusually fast, which
  is itself the tell (a real DNS-propagation wait sits at PENDING for hours, not fails).
- Root cause: `docket.finlot.ai` is a **CNAME to Vercel**. Per RFC 8659, when the requested
  name has no CAA, the CA climbs the tree; `api.docket.finlot.ai` → parent `docket.finlot.ai`
  → and because that's a CNAME to Vercel, the CAA set resolves to **Vercel's**:
  `issue "globalsign.com" / "letsencrypt.org" / "pki.goog" / "sectigo.com"` — **Amazon is
  not on the list**, so ACM is forbidden from issuing.
- **Unfixable by retry.** You can't add a CAA record at `docket.finlot.ai` because a CNAME
  can't coexist with other records at the same name. So NO name under `docket.finlot.ai` can
  ever get an AWS cert while that host points at Vercel.

**What worked:**
- Moved the API to `docket-api.finlot.ai` — a sibling of `docket.finlot.ai`, not a child.
  Its parent is `finlot.ai`, which has **no CAA at all** (verified empty at every level:
  the name, finlot.ai, and the `ai` TLD). ACM then issued in **~40 seconds** once the
  record was live.
- **Pre-flight the CAA chain before requesting**, and **verify the DNS record is live on the
  authoritative NS before letting ACM poll** — don't spend a validation attempt on an absent
  or CAA-blocked record.
- Diagnose CAA with `dig CAA <name> @1.1.1.1` at EVERY level, NOT `dig +short CAA` (which
  follows the CNAME and shows the target, hiding the real answer).

**Remember next time:**
- Any AWS/ACM cert under a **Vercel-fronted** (or any third-party-CNAME'd) subdomain will hit
  CAA_ERROR. Put AWS-served names on a branch whose parents have no restrictive CAA.
- `CAA_ERROR` that arrives fast is a config wall, not a wait — stop polling and fix the tree.
- Add the HTTPS listener via **EB options** (`aws:elbv2:listener:443`), never `elbv2`
  directly — EB manages the ALB and reverts direct listener/SG edits on the next update.
  Going through EB also opened 443 on the ALB security group automatically.

---

## Verifying a UI flow: a rendered row is not proof the write worked (2026-07-20)

**Context:** Change 4a — building the Docket case-detail checklist screen and testing an
upload end-to-end through the real browser.

**What didn't work:**
- The first upload returned `PUT /uploads/:token → 404`. The local storage driver's
  `requestUpload()` advertises `method: "PUT"`, but `LocalUploadController` mapped
  `@Post(":token")`. Any client that honours the returned contract 404s. This was
  invisible to the earlier Change 3b testing because (a) the local route was exercised
  by a hand-written `curl -X POST`, which ignores the advertised method, and (b) the S3
  path uploads to Amazon and never touches this route at all.
- **Worse: I nearly declared it fixed on the strength of a rendered row.** After the fix
  the screen showed "pan-card-test.pdf · Received", so it looked like it had worked. It
  had not — that row was the *dead reservation* left behind by the failed 404 attempt.
  The retry had actually been rejected with `400 maxFiles`. The only thing that revealed
  this was reading the API's own fields: `uploaded: false, sizeBytes: null`.

**What worked:**
- Assert on the values the SERVER read back, not on what the page renders. The check that
  actually proved it was `sizeBytes: 523` matching the 523 bytes sent — a number that can
  only exist if the bytes reached storage and were hashed back.
- Deleting the orphan row first, so the retry ran against clean state instead of silently
  hitting a different error path.

**Remember next time:**
- This is the SIXTH time in this project a green signal measured something the runtime
  doesn't do (superuser RLS · symlink resolver · psql-vs-postgres.js TLS · RLS probe
  scoping itself to nothing · stale process on a port · now a stale DB row). The pattern
  is always the same: **the observation was real, but it was not observing the thing.**
  Before believing a pass, ask "what would this look like if the feature were broken?" —
  if the answer is "the same", it is not a test.
- When a driver/interface advertises a method, verb, or URL, the route must accept exactly
  that. Accepting both verbs papers over the contract drift; make the two agree instead.
- Clear test artefacts BETWEEN attempts, not just at the end. A leftover row from attempt
  one is what made attempt two lie.

---

## Vercel deploys silently "Blocked" by a local git identity override — Docket — 2026-07-21

**Symptom:** docket.finlot.ai served a build from Jul 18. Every push for two days
appeared to succeed (git push fine, GitHub fine) but nothing reached production.
No error anywhere we were looking.

**What didn't work — two wrong diagnoses I asserted before verifying:**
1. "The web auto-deployed and is ahead of the API." Inferred purely from a
   `server: Vercel` response header. Wrong — nothing had deployed at all.
2. "docket.finlot.ai is served by the Finlot repo." Inferred from route overlap
   (`/leads` and `/settings` 200, `/cases` 404). Wrong — both repos happen to
   have `/leads` and `/settings`, so the overlap proved nothing.

**What worked — evidence instead of inference:**
- **Per-route `<title>` comparison.** Every route on the host returned
  `<title>Docket — Finlot</title>` (the docket repo's title) and the Finlot
  repo's `/CRMdashboard` 404'd. That identifies *which app* serves a host;
  route-name overlap does not.
- **Route presence brackets the build's age.** `/leads` 200 + `/cases` 404 dated
  the live build to before the leads→cases rename (3994efa) — within minutes,
  without any dashboard access.
- **Reading the Blocked deployment's own banner**, which stated the cause
  outright: *"the commit author did not have contributing access… The Hobby Plan
  does not support collaboration for private repositories."*
- **Diffing git identity between the working and broken repos.** Finlot: no local
  override, inherits `pranavadityaneti@users.noreply.github.com`, deploys fine.
  Docket: local override to `sowfreyr@gmail.com` → GitHub `sneti2021`, a
  collaborator not the project owner → every deploy Blocked.

**Root cause:** a repo-local `user.email` override. On Vercel's Hobby plan a
private repo only deploys commits authored by the project owner; a collaborator's
commits are refused *before the build starts*.

**Remember next time:**
- **"Blocked" is not a build failure.** Blocked deployments never build, so there
  are no build logs to read — looking for a broken build wastes the search. Check
  the deployment's status banner first; it names the cause.
- **`git config --local user.email` can silently kill deploys.** Check it matches
  the identity that owns the hosting project. `git log -1 --format=%ae` on a
  known-good deploy vs a failing one settles it in one command.
- **Vercel runs TWO separate checks, and confusing them cost three attempts:**
  (1) the commit email must resolve to a **GitHub account**; (2) that account
  must have contributing access to the project. `ideayemedia@gmail.com` is the
  *Vercel login* and matches no GitHub user — it failed check (1) with a
  different message ("could not be matched to a GitHub account"). A Vercel
  account email is not a GitHub identity.
- **What actually worked:** the ID-prefixed GitHub noreply
  `63978595+pranavadityaneti@users.noreply.github.com` — GitHub's canonical
  form, where the number is the account ID, so it always resolves. Found not by
  guessing but by reading the identity the sibling Finlot repo deploys with
  today (`git log -1 --format='%an <%ae>'` on a known-good repo).
- **An empty commit never triggers a deployment** — Vercel skips commits with no
  file changes, so `--allow-empty` to "force a rebuild" silently does nothing
  and looks identical to being blocked. Use a real change.
- Fixing it does not need a history rewrite: change the identity and push one
  correctly-authored commit with real content; the branch tip is what the check
  evaluates.
- **A stale production with no signal is the real defect.** Added a build marker
  (commit SHA from VERCEL_GIT_COMMIT_SHA) rendered on the login page — *pre-auth
  on purpose*, since the one time it mattered nobody could sign in to check.
  "Is prod current?" should cost one glance, not an investigation.

## `pnpm deploy --prod` breaks every `pnpm run`/`exec` in the workspace — Docket — 2026-07-22

**What didn't work:**
1. After building the EB artifact with
   `pnpm deploy --filter @docket/api --prod --legacy <OUT>`, every subsequent
   `pnpm --filter @docket/api exec tsc --noEmit` and `pnpm --filter @docket/api build`
   died before running anything:
   `[ERR_PNPM_ABORTED_REMOVE_MODULES_DIR_NO_TTY] Aborted removal of modules
   directory due to no TTY` … `Command failed with exit code 1: pnpm install --production`
   … `at runDepsStatusCheck`.
   The `--prod` deploy leaves pnpm's dep-status marker thinking the workspace is a
   *production* install, so the next `pnpm run` tries to reconcile and wants to
   purge `node_modules` — which it cannot do without a TTY.
2. Misreading it as a TYPE error. It is not. `tsc` never ran. Do not conclude the
   code is broken from this — the failure is entirely pnpm's pre-flight check.
3. `./node_modules/.bin/tsc` from the repo root — no such file. `tsc` is a
   per-package devDependency; it lives at `apps/api/node_modules/.bin/tsc`.

**What worked:**
- To verify types immediately without fighting pnpm:
  `cd apps/api && ./node_modules/.bin/tsc --noEmit`  → exit 0.
- To actually fix the workspace: `CI=true pnpm install`.
  `CI=true` is what authorises the non-TTY modules-dir handling. It completed in
  **372ms** reporting "Already up to date" and did NOT purge/refetch anything —
  it only reconciled the state marker. Both `pnpm exec tsc` and `pnpm build`
  worked again straight after. `pnpm-lock.yaml` untouched, repo stayed clean.

**What to remember next time:**
- Expect this after EVERY artifact build. `pnpm deploy --prod` is part of the
  Docket EB release path, so budget one `CI=true pnpm install` afterwards to put
  the workspace back into dev shape.
- The fix is cheap (sub-second) — it does NOT trigger the feared full reinstall.
  Do not talk yourself out of it fearing the argon2 architecture trap.
- BUT still verify the argon2 binaries by `ls`, never by exit code, exactly as
  pnpm-workspace.yaml says:
  `ls node_modules/.pnpm | grep argon2`  → must list `linux-x64-gnu`
  `find node_modules/.pnpm -name "argon2.linux-x64-gnu.node"` → must find the file.
  ("Already up to date" is the same message pnpm prints when it has silently
  fetched nothing, so the message alone proves nothing either way.)
- Production is never affected by this — the deploy artifact is already built and
  shipped by the time the workspace goes out of sync. It is a local-tooling issue only.

## EB bundle zipped without `-y` crash-loops the API (tslib MODULE_NOT_FOUND) — Docket — 2026-08-01

**What didn't work:**
- Rebuilt the EB bundle (pnpm deploy --legacy + prune, all verified) and zipped
  with `zip -qr`. Deploy went Ready but Red, /health 502, web.stdout.log
  crash-loop: `Cannot find module 'tslib'` required from @nestjs/common.
- Cause: without `-y`, zip FOLLOWS symlinks and materialises them. pnpm's
  layout depends on `node_modules/@nestjs/common` being a symlink INTO
  `.pnpm/...`, where tslib is a sibling. Materialised into a real directory,
  Node resolution walks up from the copy and never enters `.pnpm` — every
  transitive dep of every package breaks. The artifact even LOOKS fine
  (353MB vs the old 23MB was the tell).

**What worked:**
- `zip -qry` (store symlinks as symlinks): 112MB, 713 symlink entries,
  deploy green, /health 200.

**Remember next time:**
- The full bundle chain is: `npm run build` → `pnpm deploy --filter
  @docket/api --prod --legacy <OUT>` → `node scripts/prune-escaping-symlinks.mjs
  <OUT>` → `zip -qry` → s3 cp → create-application-version →
  update-environment. The `-y` is load-bearing.
- Sanity checks on the zip BEFORE deploying: `zipinfo <zip> | grep -c '^l'`
  (should be ~700, not 0) and size ~tens of MB, not hundreds.
- `CI=true pnpm install` after every bundle to repair the workspace.

## `aws s3 cp` reports success while uploading nothing — Docket — 2026-08-01

**What didn't work:**
- Deploying the API bundle: `aws s3 cp --no-progress <zip> s3://.../key.zip`
  exited 0 and printed no error, but `create-application-version` failed with
  `InvalidParameterCombination ... Unable to download from S3 location ...
  Reason: Not Found`. `s3api head-object` on the key returned **404**.
- Retried `aws s3 cp` a second time (backgrounded). It again printed nothing
  and the shell's own `echo "UPLOAD COMPLETE"` ran — yet head-object was
  still 404. Two apparently-successful uploads, zero bytes in the bucket.
  The local file was intact (105,573,613 bytes) and disk had space.

**What worked:**
- `aws s3api put-object --bucket <b> --key <k> --body <file>` — returned an
  ETag, and head-object then reported the exact byte count.

**Remember next time:**
- **Never trust `aws s3 cp`'s exit code for a deploy artifact.** Verify with
  `aws s3api head-object --bucket <b> --key <k> --query ContentLength` and
  compare against the local size BEFORE `create-application-version`.
- Large (~100MB) uploads over a slow link are where this bit; `put-object`
  does a single PUT and either works or errors honestly.
- Same lesson as the rest of this file: verify the ARTIFACT of the change,
  not the command's success.
