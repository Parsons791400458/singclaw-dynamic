# Codex Sprint 3 Instruction — Trading Plan Execution Loop + Risk Guardrails

You are optimizing `app.singclaw.xyz` in the local repo only.

Repository root:
`C:\Users\宇宙无敌小仙女本仙\Documents\Singclaw\singclaw-dynamic`

## Hard boundaries

Do NOT:
- push, deploy, restart PM2, touch production, or change DNS/server settings
- print, copy, or modify secrets from `.env.local` or any real env file
- add payment / subscription / external market API integration
- expand reports, knowledge-game, unrelated pages, or unrelated refactors
- delete existing user-facing Sprint 1 auth/demo-mode foundation
- use PowerShell direct `npm`; use `cmd /c npm run lint` and `cmd /c npm run build`

## Must read first

Read these files before editing:
- `docs/prd-app-singclaw-c-user-trading-companion.md`
- `docs/sprints/codex-supervision-protocol.md`
- `docs/sprints/sprint-0-baseline-audit.md`
- `docs/sprints/sprint-1-stabilization.md`
- `docs/sprints/sprint-2-daily-trading-desk-mvp.md`
- `src/components/TradingMissionDesk.tsx`
- `src/lib/trading-desk.ts`
- `src/app/api/trading-plans/route.ts`

## Sprint 3 goal

Implement the smallest useful C-user loop after Sprint 2:

> A user can save a daily trading plan, see a clear execution status, understand whether risk is acceptable before saving, and review recent plans without the UI pretending that external market APIs are already connected.

## Scope allowed

You may modify only files directly needed for this goal, likely:
- `src/components/TradingMissionDesk.tsx`
- `src/lib/trading-desk.ts`
- `src/app/api/trading-plans/route.ts` only if a small backwards-compatible payload/status field is needed
- `docs/sprints/sprint-3-execution-risk-loop.md`

## Required product changes

1. Plan execution status
   - Add a simple execution status concept for plans: `draft`, `planned`, `executed`, `cancelled`.
   - In the dashboard form, let the user choose status with clear Chinese labels.
   - Recent plan cards should display the status label.
   - Keep backwards compatibility for old plans without status; default to `planned` or `draft` consistently.

2. Risk guardrail before save
   - Add front-end risk validation before saving:
     - risk percent <= 0: invalid
     - risk percent > 2: warn as aggressive / requires explicit confirmation field or visible warning
     - account size <= 0: invalid
     - missing symbols/opportunity/risk/invalidation: invalid
   - Keep it educational, not blocking all aggressive plans unless required fields are missing.
   - Show the calculated risk budget and a concise warning/ok state.

3. Truthful data source labels
   - Do not label Binance / OKX / Coinglass / CMC etc as `connected` unless the app actually uses live external APIs.
   - Rename/adjust status values and UI copy so the page truthfully says current data is manual/simulated/planned/reference-only.
   - This is important for trust and investor/customer demos.

4. Recent plans usability
   - Keep the Sprint 2 recent plans list.
   - Add one lightweight filter or grouping only if simple and low risk (e.g. show latest 5 + status badge). Do not build a full search/filter system in this sprint.

## Required engineering constraints

- Keep TypeScript types explicit.
- Avoid large rewrites; prefer small edits with minimal blast radius.
- Maintain Clerk/demo compatibility from Sprint 1.
- Preserve localStorage fallback behavior.
- Do not introduce new dependencies.

## Verification required

Run exactly:
- `cmd /c npm run lint`
- `cmd /c npm run build`

If either fails, fix before reporting done.

## Required report

Create:
`docs/sprints/sprint-3-execution-risk-loop.md`

Report must include:
- files changed
- summary of execution status behavior
- summary of risk validation rules
- data source truth-labeling changes
- lint/build results
- manual smoke checklist for `/dashboard`
- known risks / Sprint 4 recommendation

Stop after Sprint 3. Do not start Sprint 4.
