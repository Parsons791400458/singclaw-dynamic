# Codex Task Package Template

Copy this template into a sprint instruction or a task-specific file before starting Codex implementation.

## Task Package

- projectKey:
- canonical repo/path:
- authoritative workspace:
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

## Filled Example

- projectKey: `singclaw-app`
- canonical repo/path: `C:\Users\<local-user>\Documents\Singclaw\singclaw-dynamic`
- authoritative workspace: `local Codex for repo documentation; Tencent Cloud OpenClaw remains separate unless explicitly authorized`
- branch: `codex/workflow-loop-engineering`
- goal: `Create a small version-controlled Codex workflow package.`
- non-goals: `No app features, no production deploy, no cloud access, no secret handling.`
- must-read docs: `docs/codex/README.md`, `docs/codex/project-ledger.json`, relevant sprint instruction
- allowed files: `docs/codex/**`, `docs/sprints/*-report.md`, optional local validation script files
- forbidden actions: `git push`, deploy, Tencent Cloud access, secret printing, app runtime code changes
- deliverables: `docs/codex/README.md`, `docs/codex/task-template.md`, `docs/codex/project-ledger.json`, `docs/codex/handoff-log.md`, sprint report
- verification commands: `node -e "JSON.parse(require('fs').readFileSync('docs/codex/project-ledger.json','utf8')); console.log('project-ledger.json OK')"`, optional `npm run validate:codex-ledger`
- report path: `docs/sprints/sprint-7-codex-loop-engineering-report.md`
- handoff owner: `Maxink / H Sing`

## Completion Checklist

- Ledger checked before work started.
- Must-read docs read.
- Only allowed files changed.
- Forbidden actions avoided.
- Verification commands run or explicitly skipped with reason.
- Handoff log updated.
- Sprint report updated.
- Final response includes files changed, verification result, risks/blockers, and recommended next step.
