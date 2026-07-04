# Sprint 7 Codex Instruction — Codex Loop Engineering

Owner: H Sing
Supervisor: Maxink
Implementation agent: Codex
Repo: `C:\Users\宇宙无敌小仙女本仙\Documents\Singclaw\singclaw-dynamic`
Branch: `codex/workflow-loop-engineering`
Date: 2026-07-04

## Goal

Implement a lightweight, version-controlled Codex workflow system so future Codex tasks are simpler, smaller, verifiable, and synced across local Codex, local OpenClaw/Maxink, Hermes, and Tencent Cloud OpenClaw.

This is documentation + template + small tooling only. Do not build app features in this sprint.

## Context

H Sing wants to use Codex more efficiently across many threads/projects. Current issues found from local analysis:

1. Codex threads are fragmented across many project directories.
2. Codex `complete` is not reliable; some tasks complete without files.
3. Long threads become hard to resume and verify.
4. Local/cloud workspace ownership can be confused, e.g. SingClaw chat belongs to Tencent Cloud OpenClaw main workspace, not local Codex.
5. Failures/aborts/usage-limit events need explicit handoff records.

## Required output

Create or update these files:

1. `docs/codex/README.md`
   - Explain the Codex loop: ledger -> task package -> branch -> Codex work -> OpenClaw verification -> handoff log -> PR/merge.
   - Include rules for Git/GitHub usage.
   - Include security rules: never commit secrets/tokens/runtime state.

2. `docs/codex/task-template.md`
   - A reusable Codex task package template.
   - Must include fields: projectKey, canonical repo/path, authoritative workspace, branch, goal, non-goals, must-read docs, allowed files, forbidden actions, deliverables, verification commands, report path, handoff owner.

3. `docs/codex/project-ledger.json`
   - Sanitized starter ledger.
   - Include at least projectKey `singclaw-app`.
   - Include local repo path, GitHub remote, authoritative workspace notes, Tencent Cloud boundary note, current chat task ownership note, verification status, next handoff.
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
- No push.
- No Tencent Cloud access.
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
4. Recommended next step for Maxink/H Sing.
