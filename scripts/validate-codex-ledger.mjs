#!/usr/bin/env node

import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ledgerPath = path.join(repoRoot, 'docs', 'codex', 'project-ledger.json')

const requiredProjectFields = [
  'projectKey',
  'localRepoPath',
  'githubRemote',
  'authoritativeWorkspaceNotes',
  'tencentCloudBoundaryNote',
  'currentChatTaskOwnershipNote',
  'verificationStatus',
  'nextHandoff',
]

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

const raw = await readFile(ledgerPath, 'utf8')
const ledger = JSON.parse(raw)

assert(ledger && typeof ledger === 'object' && !Array.isArray(ledger), 'Ledger must be a JSON object.')
assert(Array.isArray(ledger.projects), 'Ledger must include a projects array.')

const singclaw = ledger.projects.find(project => project.projectKey === 'singclaw-app')
assert(singclaw, 'Ledger must include projectKey singclaw-app.')

for (const field of requiredProjectFields) {
  assert(Object.hasOwn(singclaw, field), `singclaw-app is missing ${field}.`)
}

assert(Array.isArray(singclaw.authoritativeWorkspaceNotes), 'authoritativeWorkspaceNotes must be an array.')
assert(singclaw.authoritativeWorkspaceNotes.length > 0, 'authoritativeWorkspaceNotes must not be empty.')
assert(typeof singclaw.verificationStatus === 'object', 'verificationStatus must be an object.')
assert(typeof singclaw.nextHandoff === 'object', 'nextHandoff must be an object.')

console.log('PASS docs/codex/project-ledger.json')
