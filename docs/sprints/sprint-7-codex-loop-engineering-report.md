# Sprint 7 Codex Loop Engineering Report

Date: 2026-07-04  
Owner: H Sing  
Supervisor: Maxink  
Implementation agent: Codex  
Branch: `codex/workflow-loop-engineering`

## Situation

The repo already had sprint supervision notes and earlier sprint reports, but no dedicated `docs/codex` workflow package. H Sing clarified the real scope: this loop is about **Maxink, Hermes, and Codex** working more efficiently together, not about external cloud workspaces.

## Action

- Created `docs/codex/README.md` to define the ledger -> task package -> branch -> Codex work -> Maxink verification -> Hermes/handoff log -> PR/merge loop.
- Created `docs/codex/task-template.md` with required task package fields.
- Created `docs/codex/project-ledger.json` as a sanitized starter ledger for `singclaw-app`.
- Created `docs/codex/handoff-log.md` with the sprint 7 handoff entry.
- Added `scripts/validate-codex-ledger.mjs` and `npm run validate:codex-ledger` for local JSON/field validation.

## Evidence

```bash
npm run validate:codex-ledger
# result: PASS docs/codex/project-ledger.json
```

No deploys, secret access, or external infrastructure changes are required for this sprint.

## Risk

- The ledger is a workflow seed, not a full project management database.
- Codex `complete` is not sufficient proof; Maxink must verify files, diff, and command evidence.
- Hermes should receive durable summaries only after Maxink verification.

## Next

Maxink/H Sing should review the Codex loop package. For the next local task, create a filled task package from `docs/codex/task-template.md`, confirm ownership in `docs/codex/project-ledger.json`, run Codex on a branch, verify output, then write a handoff summary for Hermes.
