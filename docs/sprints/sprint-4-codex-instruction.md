# Codex Sprint 4 Instruction — Dashboard Copy Cleanup + Execution Review Prompt

You are optimizing `app.singclaw.xyz` in the local repo only.

Repository root:
`C:\Users\宇宙无敌小仙女本仙\Documents\Singclaw\singclaw-dynamic`

## Hard boundaries

Do NOT:
- push, deploy, restart PM2, touch production, or change DNS/server settings
- print, copy, or modify secrets from `.env.local` or any real env file
- add payment / subscription / external market API integration
- expand reports, knowledge-game, unrelated pages, or unrelated refactors
- apply Supabase migrations or touch a live database
- delete Sprint 1 auth/demo-mode foundation
- break Sprint 2/3 dashboard behavior
- use PowerShell direct `npm`; use `cmd /c npm run lint` and `cmd /c npm run build`

## Must read first

Read these files before editing:
- `docs/prd-app-singclaw-c-user-trading-companion.md`
- `docs/sprints/codex-supervision-protocol.md`
- `docs/sprints/sprint-2-daily-trading-desk-mvp.md`
- `docs/sprints/sprint-3-execution-risk-loop.md`
- `src/components/TradingMissionDesk.tsx`
- `src/lib/trading-desk.ts`
- `src/lib/trading-plans-store.ts`
- `src/app/api/trading-plans/route.ts`

## Sprint 4 goal

Make `/dashboard` more demo-ready and trustworthy after Sprint 3:

> A C-user can understand the page in clean Chinese, mark whether a plan is executed/cancelled, and be prompted to write a short review note without the app claiming live market connectivity.

This sprint is polish + small closure loop, not a feature expansion.

## Scope allowed

You may modify only files directly needed for this goal, likely:
- `src/components/TradingMissionDesk.tsx`
- `src/lib/trading-desk.ts`
- `docs/sprints/sprint-4-dashboard-copy-review-loop.md`

Avoid API/store/migration changes unless a build-breaking issue is found. Do not modify `reports` or `knowledge-game`.

## Required product changes

1. Chinese copy / mojibake cleanup on `/dashboard`
   - Fix obvious garbled Chinese or unreadable copy in dashboard-related data and component text.
   - Prioritize user-visible text in `TradingMissionDesk.tsx` and `trading-desk.ts`.
   - Keep copy concise, beginner-friendly, and truthful.
   - Do not over-rewrite the whole page; clean the highest-impact visible copy only.

2. Execution review prompt
   - When status is `executed` or `cancelled`, make `reviewNote` visibly important.
   - Add a small prompt/label telling the user to write: result, mistake, next action.
   - Do not hard-block saving if review note is missing, but show a clear reminder.
   - Recent plan card should show review note preview if present.

3. Status-specific guidance
   - Add a short status helper text near the status selector:
     - draft: still thinking
     - planned: ready but not executed
     - executed: record what happened
     - cancelled: record why not acting was correct/incorrect
   - Keep the labels in Chinese.

4. Data source trust wording
   - Confirm no `connected` label remains in dashboard data/source copy unless it refers to actual app infrastructure, not market APIs.
   - Keep source statuses as manual/simulated/reference-only.

## Required engineering constraints

- Keep TypeScript types explicit.
- Avoid large rewrites; prefer small edits with minimal blast radius.
- Maintain Clerk/demo compatibility from Sprint 1.
- Preserve localStorage fallback behavior and Sprint 3 status behavior.
- Do not introduce new dependencies.

## Verification required

Run exactly:
- `cmd /c npm run lint`
- `cmd /c npm run build`

If either fails, fix before reporting done.

## Required report

Create:
`docs/sprints/sprint-4-dashboard-copy-review-loop.md`

Report must include:
- files changed
- copy cleanup summary
- execution review prompt behavior
- confirmation that data source copy is truthful / no misleading connected market-source label
- lint/build results
- manual smoke checklist for `/dashboard`
- known risks / Sprint 5 recommendation

Stop after Sprint 4. Do not start Sprint 5.
