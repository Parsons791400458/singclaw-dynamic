# Codex Supervision Protocol — app.singclaw.xyz

Owner: Maxink supervising Codex for H Sing.

## Operating Rule

Codex works one sprint at a time. It must not jump ahead, push, deploy, delete large files, rewrite history, rotate secrets, or touch production infrastructure unless Maxink explicitly instructs after H Sing approval.

## Required Codex Output Per Sprint

1. Situation: what repo/app state it found.
2. Action: exact files changed or inspected.
3. Evidence: lint/build/test/smoke result.
4. Risk: blockers, secrets, deployment uncertainty.
5. Next: recommended next sprint instruction.

## Hard Constraints

- No `git push`.
- No production deploy.
- No PM2/server restart.
- No secret printing.
- No destructive cleanup.
- Do not write runtime data into `public/`.
- Keep changes small and reviewable.

## Current Sprint Queue

- Sprint 0: Baseline audit and release slicing.
- Sprint 1: Stabilize local build and auth/data foundation.
- Sprint 2: Daily Trading Desk MVP.
- Sprint 3: Reports and market brief loop.
- Sprint 4: Knowledge mission / game loop.
- Sprint 5: Production readiness package.
