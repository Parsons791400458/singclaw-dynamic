# Codex Workflow Loop

This folder defines the lightweight Codex workflow package for SingClaw local work. It is meant to make each future Codex task small, inspectable, and handoff-ready across local Codex, local OpenClaw/Maxink, Hermes, and Tencent Cloud OpenClaw without mixing workspace ownership.

## Loop

1. Ledger
   - Start from `docs/codex/project-ledger.json`.
   - Confirm the `projectKey`, canonical repo/path, authoritative workspace, Tencent Cloud boundary, current ownership note, verification status, and next handoff.
   - If the ledger says the task belongs to Tencent Cloud OpenClaw, stop local implementation and write a handoff note instead.

2. Task package
   - Create a copy of `docs/codex/task-template.md` for the specific task or paste the completed template into the sprint instruction.
   - Keep the package explicit: goal, non-goals, allowed files, forbidden actions, deliverables, checks, report path, and handoff owner.
   - A task package must be small enough to review in one pull request.

3. Branch
   - Work on the named branch from the task package.
   - Use one branch per coherent task package.
   - Do not mix unrelated cleanup, feature work, or generated runtime state into the branch.

4. Codex work
   - Read the must-read docs first.
   - Edit only allowed files.
   - Keep changes minimal and version-controlled.
   - Record any blocked, aborted, or usage-limit state in the handoff log before ending the task.

5. OpenClaw verification
   - Run only the verification commands listed in the task package unless the supervisor approves more.
   - For this local repo, verification should be local and non-destructive by default.
   - Do not use Tencent Cloud OpenClaw from local Codex unless a future instruction explicitly grants that access.

6. Handoff log
   - Append to `docs/codex/handoff-log.md`.
   - Include what changed, why, how to verify, risks, and the next owner/action.
   - Handoffs are required for completed work, blocked work, aborted work, and usage-limit events.

7. PR/merge
   - After local verification, prepare a concise PR summary and risk note.
   - Maxink/H Sing decide whether to push, open a PR, merge, deploy, or sync to another workspace.
   - Codex does not push, merge, deploy, or mutate production unless explicitly instructed.

## Git and GitHub Rules

- Use local git status/diff commands to understand scope before final reporting.
- Do not run `git push`, create remote branches, open pull requests, merge branches, rewrite history, or delete branches unless explicitly instructed.
- Do not use GitHub or external services when the task can be completed with local repository state.
- Keep commits, if requested, focused on the task package deliverables.
- Do not stage or commit unrelated user changes.
- Do not include local runtime output, build caches, `.env*` files, tokens, logs with secrets, or machine-specific state.
- Every PR-ready handoff should list files changed, verification commands, known risks, and the recommended next step.

## Security Rules

- Never commit secrets, API keys, tokens, database URLs, cookies, private SSH material, or runtime state.
- Never print secrets into Codex chat, handoff notes, reports, screenshots, or logs.
- Keep environment values in local `.env.local` or approved deployment secret stores only.
- Sanitize personal paths or cloud workspace references when exact values are not required for review.
- Treat Tencent Cloud OpenClaw as a separate authoritative workspace boundary unless the task package explicitly says otherwise.
- If a task needs secret-backed verification, stop and hand off the exact requirement to Maxink/H Sing instead of attempting access.
