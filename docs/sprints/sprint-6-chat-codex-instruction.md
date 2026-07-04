# Sprint 6 Codex Instruction — SingClaw Chat Context Audit + Local Chat MVP

Owner: H Sing
Supervisor: Maxink
Implementation agent: Codex
Repo: `C:\Users\宇宙无敌小仙女本仙\Documents\Singclaw\singclaw-dynamic`
Domain: `app.singclaw.xyz`
Date: 2026-07-04

## Why this task exists

H Sing says SingClaw is currently developing the chat feature. Maxink checked local Codex sessions and the local repo:

- Local Codex history has many SingClaw/app.singclaw.xyz tasks, but no clear dedicated chat-feature task.
- Local repo currently has no obvious `/chat` page or chat API route.
- H Sing also says Tencent Cloud OpenClaw main workspace may be developing `app.singclaw.xyz`, but **do not access Tencent Cloud OpenClaw** from this task. Treat cloud work as user-reported parallel context only.

Your first job is to determine whether you understand the available local context completely enough to continue safely.

## Must read first

- `README.md`
- `docs/prd-app-singclaw-c-user-trading-companion.md`
- `docs/sprints/codex-supervision-protocol.md`
- `docs/sprints/sprint-0-baseline-audit.md`
- `docs/sprints/sprint-1-stabilization.md`
- `docs/sprints/sprint-2-daily-trading-desk-mvp.md`
- `docs/sprints/sprint-3-execution-risk-loop.md`
- `docs/sprints/sprint-4-codex-instruction.md`
- Current app routes under `src/app`
- Existing storage/auth helpers under `src/lib`

## Product framing

SingClaw is a consumer daily trading learning companion, not a guaranteed-profit signal terminal.

The chat feature should support the same product promise:

> Spend 10 minutes a day with SingClaw to understand market opportunities, risk reminders, learning tasks, and a risk-first trading plan before acting.

Chat must be risk-first and educational. It must not provide direct financial advice or promise returns.

## Chat MVP target, if local context is sufficient

Implement a safe local-first Chat MVP:

1. Route: `/chat`
   - Auth-compatible like existing dashboard patterns.
   - Graceful demo/local mode when Clerk/Supabase env is missing.
   - Consumer-facing UI, mobile usable.

2. UX
   - Message list with user and SingClaw assistant messages.
   - Composer input.
   - Starter prompts such as:
     - “帮我用风险优先方式看今天市场”
     - “把我的交易想法转成 preflight checklist”
     - “我该怎么复盘这笔模拟交易？”
   - Clear disclaimer: educational/risk-review assistant, not financial advice.

3. Backend / persistence
   - Prefer existing project patterns.
   - If Supabase schema for chat does not exist, use local `.data` fallback and document migration needed.
   - Do not put runtime data in `public/`.
   - Do not commit secrets.
   - Do not call external paid LLM APIs unless existing project config clearly supports it. If no LLM config, use a deterministic placeholder assistant reply that teaches the expected risk-first format.

4. Navigation
   - Add a discoverable entry point from dashboard or main nav if the existing pattern supports it.

5. Evidence
   - Run the smallest meaningful checks available: `npm run lint` and/or `npm run build` if feasible.
   - Write a sprint report: `docs/sprints/sprint-6-chat-context-audit-and-mvp.md`.

## If context is NOT sufficient

Do not hallucinate cloud state. Still produce:

- `docs/sprints/sprint-6-chat-context-audit-and-mvp.md`
- Explicit section: `Context completeness verdict`
- What is missing
- What local implementation was safe to do, if any
- What needs Tencent Cloud read-only verification before merge/sync

## Hard constraints

- No production deploy.
- No push.
- No Tencent Cloud access.
- No destructive cleanup.
- No secrets in files or output.
- Keep changes PR-sized.

## Final answer required

Return:

1. Whether Codex understood the context fully / partially / not enough.
2. Files changed.
3. Verification result.
4. Blockers and next handoff for Maxink/H Sing.
