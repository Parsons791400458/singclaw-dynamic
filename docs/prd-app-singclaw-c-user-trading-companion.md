# PRD: app.singclaw.xyz — C端每日交易学习与复盘 App

- Owner: H Sing
- Execution supervisor: Maxink
- Implementation agent: Codex
- Repo: `Parsons791400458/singclaw-dynamic`
- Local path: `C:\Users\宇宙无敌小仙女本仙\Documents\Singclaw\singclaw-dynamic`
- Domain: `https://app.singclaw.xyz`
- Created: 2026-06-18
- Status: Draft v0.1 for sprint execution

## 1. Product Positioning

`app.singclaw.xyz` should evolve from an internal/enterprise-like operations console into a consumer-facing daily trading learning companion.

The app is not a “guaranteed profit signal terminal”. It should help small-fund users build a repeatable trading process:

1. Understand today’s market context.
2. Identify opportunity and risk in plain language.
3. Convert curiosity into a risk-first plan.
4. Practice through paper trade / preflight checklist.
5. Review behavior and mistakes over time.

## 2. Target Users

### Primary v1 user

Retail crypto learners with roughly `1,000–10,000 USDT` trading capital who want:

- a daily market briefing;
- structured opportunity/risk explanation;
- a low-friction trading plan template;
- learning missions and review reminders;
- less impulsive decision-making.

### User psychology

Users may say they want “low risk, high profit”. The app must translate this desire into explicit risk budgeting, invalidation conditions, and review discipline.

## 3. Core Product Promise

> Spend 10 minutes a day with SingClaw to understand market opportunities, risk reminders, learning tasks, and a risk-first trading plan before acting.

## 4. Non-Goals / Guardrails

- Do not promise certain returns.
- Do not present output as direct financial advice.
- Do not require perfect real-time institutional data before validating the daily loop.
- Do not write runtime/user data into `public/`.
- Do not commit secrets.
- Do not deploy to production without explicit human approval.

## 5. V1 Core User Journey

### New user

1. User opens app.
2. User signs up / signs in through Clerk.
3. App creates or updates user profile in Supabase.
4. User lands on `/dashboard` daily desk.
5. User sees:
   - today’s opportunity map;
   - today’s risk reminders;
   - one main learning/review mission;
   - relevant calendar/instrument events;
   - trading plan form.
6. User enters account size and risk percent.
7. App computes max loss in USDT.
8. User saves a trading plan.
9. User returns later to record execution/review notes.

### Returning user

1. User opens dashboard.
2. App shows today’s desk plus recent plan/review history.
3. App nudges unfinished review tasks.
4. Weekly review aggregates repeated behavior patterns.

## 6. MVP Feature Scope

### Must-have

- Clerk auth works for new sign-up/sign-in.
- `/dashboard` is protected when Clerk is configured.
- Demo/local mode is graceful when Clerk/Supabase env is missing.
- Supabase persists:
  - app users;
  - cron reports;
  - trading plans;
  - review notes or plan review fields.
- Daily Trading Desk is readable and consumer-facing.
- Trading plan form computes risk budget:
  - account size USDT;
  - risk percent;
  - max loss USDT;
  - risk label (`training`, `aggressive`, etc.).
- `/reports` can read legacy reports plus new storage.
- Local dev works with `.data/` fallback.
- Lint/build pass.

### Should-have

- Knowledge/game mission entry point connected to dashboard.
- Watchlist fields with 1–3 symbols.
- Recent saved plans visible on dashboard.
- Clear empty states and error states.
- Simple mobile-first UI polish.

### Later

- Exchange data integrations.
- Weekly behavior review.
- Personalized risk profile.
- Paid advanced summaries.
- A-share / US stock expansion.

## 7. Data Model Requirements

Minimum durable tables:

- `app_users`
  - Clerk user id
  - email/name/avatar
  - created/updated timestamps
- `cron_reports`
  - report date/source/title/content/metadata
- `trade_plans`
  - user id
  - market
  - symbols
  - opportunity
  - risk
  - invalidation
  - action mode
  - account size USDT
  - risk percent
  - max loss USDT
  - status
  - review note
  - created/updated timestamps

Implementation should keep schema migrations in `supabase/migrations/` and storage logic behind `src/lib/*` or route handlers.

## 8. UX Principles

- C端、任务化、可读；不要像企业后台。
- 每天只给用户一个主行动：read / plan / review.
- 风险先于收益；任何 plan 都要显示最大损失。
- 少用复杂术语；必要时提供一句话解释。
- Mobile usable by default.

## 9. Engineering Principles

- Small PR-sized changes.
- One sprint at a time.
- No production deploy/push unless explicitly approved.
- Every sprint must include:
  - changed files summary;
  - lint/build result;
  - manual smoke checklist;
  - known blockers.
- Secrets stay in env, never in git.
- Runtime data must not be stored in `public/`.

## 10. Sprint Roadmap

### Sprint 0 — Baseline audit and release slicing

Goal: freeze current state, identify safe change batches, and prevent broken deployment.

Deliverables:

- Current git working tree summary.
- Source file map: auth, dashboard, reports, trading plans, knowledge game, deployment config.
- Risk list:
  - secrets/env;
  - uncommitted changes;
  - broken routes;
  - data persistence gaps;
  - production deployment uncertainty.
- Proposed commit/sprint slicing.
- Validation commands to run for Sprint 1.

Acceptance:

- Report written to `docs/sprints/sprint-0-baseline-audit.md`.
- No production deploy.
- No push.
- No destructive cleanup.

### Sprint 1 — Stabilize local build and auth/data foundation

Goal: make the app reliably build and run locally with graceful demo mode and real env mode.

Deliverables:

- `npm run lint` pass.
- `npm run build` pass.
- Clerk routes work or show clear env notice.
- Dashboard does not crash without env.
- Supabase + `.data` fallback path verified.
- README env/setup updated if stale.

Acceptance:

- Evidence recorded in `docs/sprints/sprint-1-stabilization.md`.
- No secrets committed.
- No deployment.

### Sprint 2 — Daily Trading Desk MVP

Goal: turn `/dashboard` into the first valuable C端 daily workflow.

Deliverables:

- Clear daily opportunity/risk/mission layout.
- Trading plan create/save flow.
- Recent plans visible.
- Risk budget calculation visible.
- Error/empty/loading states.

Acceptance:

- Browser smoke screenshots or textual smoke report.
- Lint/build pass.

### Sprint 3 — Reports and market brief loop

Goal: connect reports/cron output to user-facing daily learning.

Deliverables:

- `/reports` readable as daily brief archive.
- Dashboard surfaces latest relevant report.
- Cron report storage path verified.
- Legacy reports remain readable.

Acceptance:

- API smoke test for report write/read.
- Lint/build pass.

### Sprint 4 — Knowledge mission / game loop

Goal: make learning missions feel like a product loop, not a static page.

Deliverables:

- Knowledge-game route integrated into dashboard CTA.
- One daily mission state.
- Completion/review note persisted.

Acceptance:

- User can enter, complete, and see state reflected.

### Sprint 5 — Production readiness package

Goal: prepare, but not execute, production deploy.

Deliverables:

- Deployment runbook.
- Required env checklist.
- Migration checklist.
- Rollback checklist.
- Production smoke checklist.

Acceptance:

- Human approval requested before push/deploy/server changes.

## 11. Current Known Context

Prior Codex work appears to have repaired auth/storage foundations locally, but production deployment is not proven closed. Current repo has many uncommitted changes; therefore the next step must be audit/slicing before more feature work.

## 12. Definition of Done for Each Sprint

A sprint is not done until all of the following are true:

- Files changed are listed.
- Verification commands and results are listed.
- User-facing behavior is described.
- Risks/blockers are explicit.
- Next sprint input is clear.
