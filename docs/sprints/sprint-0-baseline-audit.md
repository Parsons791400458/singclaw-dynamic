# Sprint 0 Baseline Audit — app.singclaw.xyz

- Supervisor: Maxink
- Implementation agent attempted: Codex CLI session `019ed735-c99b-7182-aead-d49940e24385`
- Repo: `Parsons791400458/singclaw-dynamic`
- Local path: `C:\Users\宇宙无敌小仙女本仙\Documents\Singclaw\singclaw-dynamic`
- Date: 2026-06-18
- Scope: audit only; no push; no deployment; no production/server changes.

## 1. Situation

The app has evolved beyond the older cron/report dashboard into a larger consumer-facing trading/knowledge product shape. The local working tree contains many uncommitted changes: auth migration, dashboard rebuild, Supabase storage, trading plan APIs, knowledge-game routes, sprint/PRD docs, and deployment/env cleanup.

The repository currently builds successfully locally, but it is not release-ready because the working tree is large, production deployment status is unproven, and many user-facing Chinese strings appear mojibake/encoding-corrupted in source output.

## 2. Current Git Working Tree Summary

Current branch: `master`.

Latest committed baseline observed earlier: `ee978a4 🤖 NPDP周复盘自动部署 W20: 首页重构/登录注册优化/Navbar重构/Supabase移除/Bn-Alpha更新 2026-05-14 10:04 CST`.

`git status --short` shows:

```text
 M .env.local.example
 D .env.production
 M .gitignore
 M README.md
 M ecosystem.config.js
 D middleware.ts
 M package.json
 M src/app/api/cron-output/route.ts
 M src/app/dashboard/page.tsx
 M src/app/layout.tsx
 D src/app/login/page.tsx
 D src/app/register/page.tsx
 M src/components/Footer.tsx
 M src/components/Navbar.tsx
?? .env.production.example
?? docs/
?? scripts/
?? src/app/api/knowledge/
?? src/app/api/trading-plans/
?? src/app/knowledge-game/
?? src/app/login/[[...sign-in]]/
?? src/app/register/[[...sign-up]]/
?? src/components/AuthConfigNotice.tsx
?? src/components/AuthPageShell.tsx
?? src/components/TradingMissionDesk.tsx
?? src/lib/
?? src/middleware.ts
?? supabase/
```

Interpretation:

- This is not a small patch; it should be sliced before commit/deploy.
- `.env.production` is intentionally deleted from tracked active config and replaced by `.env.production.example`.
- Middleware moved from root `middleware.ts` to `src/middleware.ts`.
- Login/register moved from simple pages to Clerk catch-all routes.
- Many new product/data modules are currently untracked.

## 3. Source File Map

### Product / planning docs

- `docs/product-reframe.md`: previous product direction notes.
- `docs/prd-app-singclaw-c-user-trading-companion.md`: current PRD for C-end daily trading companion.
- `docs/sprints/codex-supervision-protocol.md`: sprint-by-sprint Codex guardrails.
- `docs/openclaw-singclaw-task-ledger.md`, `docs/openclaw-singclaw-task-registry.json`: large OpenClaw task evidence/import artifacts.

### Auth

- `src/app/layout.tsx`: global app shell and Clerk provider behavior.
- `src/middleware.ts`: Clerk middleware now in the expected `src/` location.
- `src/app/login/[[...sign-in]]/page.tsx`: Clerk SignIn page.
- `src/app/register/[[...sign-up]]/page.tsx`: Clerk SignUp page.
- `src/components/AuthConfigNotice.tsx`: graceful notice when Clerk env is missing.
- `src/components/AuthPageShell.tsx`: shared auth page UI shell.
- `src/lib/authAppearance.ts`: Clerk UI appearance config.

### Dashboard / daily trading desk

- `src/app/dashboard/page.tsx`: protected/demo dashboard entry.
- `src/components/TradingMissionDesk.tsx`: main C-end daily trading workflow component.
- `src/lib/trading-desk.ts`: static/productized daily desk data and product strategy.

### Trading plans

- `src/app/api/trading-plans/route.ts`: route handler for plan writes/reads.
- `src/lib/trading-plans-store.ts`: Supabase-first and local `.data` fallback persistence.
- `supabase/migrations/20260524000000_trading_desk.sql`: trading-desk related tables.
- `supabase/migrations/20260528000000_trade_plan_risk_budget.sql`: risk budget columns.

### Reports / cron output

- `src/app/api/cron-output/route.ts`: cron report write/read API.
- `src/app/reports/page.tsx`: report archive UI.
- `src/lib/reports.ts`: Supabase-first and `.data/reports` fallback storage.
- `supabase/migrations/20260519000000_app_core.sql`: `app_users` and `cron_reports`.

### Knowledge game

- `src/app/knowledge-game/`: knowledge mission/game pages.
- `src/app/api/knowledge/`: knowledge APIs.
- `src/lib/knowledge-game/`: storage, seed, classifier, automation, and type modules.

### Deployment / env

- `.env.local.example`: local env placeholders.
- `.env.production.example`: production env placeholders.
- `.gitignore`: env and local runtime data exclusions.
- `ecosystem.config.js`: PM2 config using env values instead of hard-coded secrets.
- `README.md`: local setup and PM2 production notes.

## 4. Verification Commands and Results

Codex attempted direct PowerShell `npm run lint`; it failed because Windows execution policy blocks `npm.ps1`:

```text
npm : 无法加载文件 C:\Program Files\nodejs\npm.ps1，因为在此系统上禁止运行脚本。
```

Using `cmd /c npm ...` works.

### Lint

Command:

```powershell
cmd /c npm run lint
```

Result:

```text
✔ No ESLint warnings or errors
```

### Build

Command:

```powershell
cmd /c npm run build
```

Result:

```text
✓ Compiled successfully
✓ Generating static pages (34/34)
```

Observed routes include:

- `/dashboard`
- `/api/trading-plans`
- `/api/cron-output`
- `/api/knowledge/*`
- `/knowledge-game/*`
- `/login/[[...sign-in]]`
- `/register/[[...sign-up]]`
- `/reports`

## 5. Risk List

### P0 — User-facing mojibake / encoding corruption

Many Chinese strings in visible pages/components appear as mojibake, e.g. navigation labels, login/register copy, knowledge-game pages, and some product text. Build/lint do not catch this, but it will make the product look broken to users.

Examples observed in files/output:

- `src/components/Navbar.tsx`
- `src/app/login/[[...sign-in]]/page.tsx`
- `src/app/register/[[...sign-up]]/page.tsx`
- `src/components/TradingMissionDesk.tsx`
- `src/lib/knowledge-game/types.ts`
- `src/app/knowledge-game/feishu/page.tsx`
- PRD file displayed mojibake when read by Codex/PowerShell, so tooling encoding must be handled carefully.

### P0 — Large unsliced working tree

There are too many modified/untracked files to safely deploy or commit as one blind batch. Split into logical commits/sprints.

### P0 — Production deployment not proven

`app.singclaw.xyz` DNS previously resolved to `43.156.239.53`, but there is no local evidence that current changes were pushed, built, migrated, PM2 restarted, or smoke-tested in production.

No production deployment should happen until Sprint 5 readiness checklist and explicit H Sing approval.

### P0 — Secrets/env safety

`.env.production` was removed and env examples were introduced. Good direction, but production env values and migration state must be verified without printing secrets.

Historical committed Clerk secret should be considered rotated/invalidated before production trust.

### P1 — Supabase schema drift risk

There are multiple migrations:

- `20260519000000_app_core.sql`
- `20260524000000_trading_desk.sql`
- `20260528000000_trade_plan_risk_budget.sql`
- likely additional knowledge-game migrations in `supabase/migrations/`

Need verify they compose cleanly in an empty Supabase project and match storage code expectations.

### P1 — Knowledge-game Feishu boundary

Knowledge-game code references a Hermes Feishu publish script path. Publishing must remain request/log only unless explicitly approved; no external Feishu writes should be triggered by normal app usage.

### P1 — Windows shell/tooling gotcha

Use `cmd /c npm run lint` and `cmd /c npm run build` from PowerShell/Codex on this host to avoid `npm.ps1` execution policy errors.

### P2 — Product scope creep

Dashboard, trading plans, reports, and knowledge-game are all active. Sprint work must stay narrow; otherwise the app will become a half-finished portal rather than a reliable daily trading loop.

## 6. Proposed Commit / Sprint Slicing

Do not commit yet until Sprint 1 validates the core visible product state.

Suggested future commit groups:

1. **docs/prd-supervision**
   - `docs/prd-app-singclaw-c-user-trading-companion.md`
   - `docs/sprints/codex-supervision-protocol.md`
   - `docs/sprints/sprint-0-baseline-audit.md`

2. **auth-env-foundation**
   - `.env.local.example`
   - `.env.production.example`
   - `.gitignore`
   - `ecosystem.config.js`
   - `src/middleware.ts`
   - `src/app/layout.tsx`
   - login/register catch-all routes
   - auth UI components/lib

3. **reports-supabase-fallback**
   - cron-output API
   - `src/lib/reports.ts`
   - reports page if changed
   - app core migration

4. **daily-trading-desk**
   - dashboard page
   - `TradingMissionDesk`
   - `src/lib/trading-desk.ts`
   - trading-plans API/store
   - trading desk/risk migrations

5. **knowledge-game-loop**
   - knowledge-game pages
   - knowledge APIs
   - knowledge-game lib and migrations

6. **openclaw-task-import-artifacts**
   - `scripts/import-openclaw-singclaw-tasks.mjs`
   - task ledger/registry docs
   - must review size and necessity before committing due to large JSON artifact.

7. **ui-copy-encoding-fix**
   - visible Chinese text fixes across nav/auth/dashboard/knowledge pages.
   - This should likely happen before any public demo.

## 7. Recommended Sprint 1 Instruction for Codex

Use this exact instruction for the next Codex pass:

> Execute Sprint 1 only: stabilize the local build/auth/data foundation for app.singclaw.xyz. Read `docs/prd-app-singclaw-c-user-trading-companion.md`, `docs/sprints/codex-supervision-protocol.md`, and `docs/sprints/sprint-0-baseline-audit.md`. Do not push, deploy, restart PM2, print secrets, or touch production. Keep changes small. Fix only core user-facing stabilization issues needed before a local demo: (1) visible mojibake/encoding-corrupted copy in Navbar, login/register auth pages, AuthConfigNotice/AuthPageShell, dashboard/TradingMissionDesk, README/env docs if needed; (2) any local auth/demo-mode route issues; (3) any obvious TypeScript/JSX issues discovered while inspecting these core surfaces. Do not expand features. Use `cmd /c npm run lint` and `cmd /c npm run build`. Write evidence to `docs/sprints/sprint-1-stabilization.md` including files changed, verification results, manual smoke checklist, remaining risks, and the exact next Sprint 2 recommendation.

## 8. Sprint 0 Acceptance

- PRD exists: `docs/prd-app-singclaw-c-user-trading-companion.md`.
- Codex supervision protocol exists: `docs/sprints/codex-supervision-protocol.md`.
- Sprint 0 audit exists: `docs/sprints/sprint-0-baseline-audit.md`.
- No push performed.
- No deployment performed.
- Verification evidence captured:
  - lint pass via `cmd /c npm run lint`;
  - build pass via `cmd /c npm run build`.

Sprint 0 is complete enough to start Sprint 1 under supervision.
