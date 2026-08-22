# Codex Task Package Template

Copy this template into a sprint instruction or task-specific file before starting Codex implementation.

## Task package

- projectKey:
- canonical repo/path:
- owner / supervisor:
- branch:
- goal:
- non-goals:
- must-read docs:
- allowed files:
- forbidden actions:
- deliverables:
- verification commands:
- report path:
- handoff owner:

## Context

Explain the current state, why the task matters, and what prior evidence Codex should trust. Keep this short and concrete.

## Acceptance criteria

- [ ] Scope stayed within allowed files.
- [ ] Required deliverables exist.
- [ ] Verification commands pass or blockers are documented.
- [ ] Sprint report or handoff note is written.
- [ ] No secrets or runtime state were committed.

## Example: Codex loop engineering

- projectKey: `singclaw-app`
- canonical repo/path: `C:\Users\<local-user>\Documents\Singclaw\singclaw-dynamic`
- owner / supervisor: `Maxink for H Sing`
- branch: `codex/workflow-loop-engineering`
- goal: `Create a small version-controlled Codex workflow package.`
- non-goals: `No app features, no production deploy, no secret handling.`
- must-read docs: `docs/codex/README.md`, `docs/codex/project-ledger.json`, relevant sprint instruction
- allowed files: `docs/codex/**`, `docs/sprints/*-report.md`, optional local validation script files
- forbidden actions: `git push without approval`, deploy, secret printing, unrelated app runtime code changes
- deliverables: `docs/codex/README.md`, `docs/codex/task-template.md`, `docs/codex/project-ledger.json`, `docs/codex/handoff-log.md`, sprint report
- verification commands: `npm run validate:codex-ledger`
- report path: `docs/sprints/sprint-7-codex-loop-engineering-report.md`
- handoff owner: `Maxink / Hermes / H Sing`
