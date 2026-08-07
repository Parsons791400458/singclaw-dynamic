# Codex Workflow Loop

This folder defines the lightweight Codex workflow package for local SingClaw work. It is meant to make each future Codex task small, inspectable, and handoff-ready across **Maxink, Hermes, and Codex**.

## Operating loop

1. Ledger
   - Start from `docs/codex/project-ledger.json`.
   - Confirm the `projectKey`, canonical repo/path, owner, verification status, and next handoff.
   - If the ledger says context is missing, stop implementation and write a handoff note instead of guessing.

2. Task package
   - Create a filled task package from `docs/codex/task-template.md`.
   - Keep the task to one repo, one goal, and a small set of deliverables.
   - Include must-read docs, allowed files, forbidden actions, verification commands, and the report path.

3. Branch
   - Work on a named branch such as `codex/<projectKey>-<task>`.
   - Do not work directly on `master` for Codex implementation tasks.

4. Codex work
   - Codex executes only the task package.
   - Codex should not expand scope, push, deploy, print secrets, or mutate production state.

5. Maxink verification
   - Maxink checks the diff, confirms files exist, runs the listed verification commands, and inspects the sprint report.
   - `complete` from Codex is not accepted as proof by itself.

6. Hermes memory / handoff
   - Append durable decisions and handoff notes to `docs/codex/handoff-log.md`.
   - When useful, Maxink can pass the summarized handoff to Hermes for longer-term memory and orchestration context.

7. PR / merge
   - Maxink/H Sing decide whether to push, open a PR, merge, or continue another sprint.
   - Codex does not push, merge, or deploy unless explicitly instructed.

## Git and GitHub rules

- Commit code, docs, task templates, sanitized ledgers, and verification reports.
- Do not commit secrets, tokens, cookies, database URLs, `.env.local`, local caches, build outputs, or runtime state.
- Use one branch per task package.
- Use PRs when the change should become project standard.
- Keep commits reviewable and tied to a sprint report or handoff note.

## Security rules

- Never print secrets into Codex chat, handoff notes, reports, screenshots, or logs.
- Sanitize personal paths when exact local usernames are not required for review.
- If a task needs secret-backed verification, stop and hand off the exact requirement to Maxink/H Sing instead of attempting access.

## Done means

A Codex task is done only when all are true:

- The task package scope was followed.
- Files changed are listed.
- Verification commands and results are recorded.
- Risks/blockers are explicit.
- `docs/codex/handoff-log.md` or a sprint report contains the next step.
