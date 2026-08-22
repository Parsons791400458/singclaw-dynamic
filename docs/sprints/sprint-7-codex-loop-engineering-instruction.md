# Sprint 7 Codex Instruction — Codex Loop Engineering

Owner: H Sing
Supervisor: Maxink
Implementation agent: Codex
Repo: `C:\Users\<local-user>\Documents\Singclaw\singclaw-dynamic`
Branch: `codex/workflow-loop-engineering`
Date: 2026-07-04

## Goal

Implement a lightweight, version-controlled Codex workflow system so future Codex tasks are simpler, smaller, verifiable, and synced across **Maxink, Hermes, and Codex**.

This is documentation + template + small tooling only. Do not build app features in this sprint.

## Context

H Sing wants to use Codex more efficiently across many threads/projects. Current issues found from local analysis:

1. Codex threads are fragmented across many project directories.
2. Codex `complete` is not reliable; some tasks complete without files.
3. Long threads become hard to resume and verify.
4. Maxink, Hermes, and Codex need explicit handoff records instead of relying on chat memory.
5. Failures/aborts/usage-limit events need explicit continuation records.

## Required output

Create or update these files:

1. `docs/codex/README.md`
   - Explain the Codex loop: ledger -> task package -> branch -> Codex work -> Maxink verification -> Hermes/handoff log -> PR/merge.
   - Include rules for Git/GitHub usage.
   - Include security rules: never commit secrets/tokens/runtime state.

2. `docs/codex/task-template.md`
   - A reusable Codex task package template.
   - Must include fields: projectKey, canonical repo/path, owner/supervisor, branch, goal, non-goals, must-read docs, allowed files, forbidden actions, deliverables, verification commands, report path, handoff owner.

3. `docs/codex/project-ledger.json`
   - Sanitized starter ledger.
   - Include at least projectKey `singclaw-app`.
   - Include local repo path, GitHub remote, workflow owners, verification status, next handoff.
   - No secrets.

4. `docs/codex/handoff-log.md`
   - Initial handoff entry for this sprint.
   - Include what changed, why, how to verify, and next step.

5. `docs/sprints/sprint-7-codex-loop-engineering-report.md`
   - Sprint report with Situation / Action / Evidence / Risk / Next.

Optional if simple and low-risk:

6. Add a tiny npm script or node script to validate `docs/codex/project-ledger.json` is valid JSON. Only do this if it fits existing repo style and does not add dependencies.

## Hard constraints

- No production deploy.
- No push unless Maxink/H Sing approves after verification.
- No external infrastructure access.
- No external network calls unless needed for existing local package commands.
- No secrets.
- Do not touch app runtime code unless necessary for optional validation script.
- Keep changes small and reviewable.

## Verification

Run the smallest meaningful checks:

- JSON parse check for `docs/codex/project-ledger.json`.
- If you add an npm script, run it.
- Do not run long or destructive commands.

## Final response required

Return:

1. Files changed.
2. Verification commands and result.
3. Risks/blockers.
4. Recommended next step for Maxink/H Sing/Hermes.
