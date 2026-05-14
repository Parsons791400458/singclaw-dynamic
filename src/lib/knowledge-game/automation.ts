import fs from 'fs/promises'
import path from 'path'
import { classifyKnowledgeInput } from './classify'
import { createIntakeCard, getKnowledgeGameSnapshot } from './store'
import type { AutomationCandidate, AutomationImportInput } from './types'

const DEFAULT_SCAN_ROOTS = [
  'C:\\hermes\\knowledge_system_v2',
  path.join(process.cwd(), 'docs'),
]

const SKIP_DIRS = new Set([
  '.git',
  '.next',
  'node_modules',
  '.data',
  'public',
  'dist',
  'build',
])

type DirectoryEntry = {
  name: string
  isDirectory(): boolean
  isFile(): boolean
}

function configuredRoots() {
  const raw = process.env.KNOWLEDGE_GAME_SCAN_ROOTS
  if (!raw?.trim()) {
    return DEFAULT_SCAN_ROOTS
  }

  return raw
    .split(';')
    .map(item => item.trim())
    .filter(Boolean)
}

function normalizePathForId(filePath: string) {
  return Buffer.from(filePath, 'utf8').toString('base64url')
}

function firstHeading(content: string) {
  const heading = content
    .split(/\r?\n/)
    .map(line => line.trim())
    .find(line => /^#\s+/.test(line))

  return heading?.replace(/^#\s+/, '').trim()
}

function excerpt(content: string) {
  return content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 1200)
}

async function pathExists(target: string) {
  try {
    await fs.access(target)
    return true
  } catch {
    return false
  }
}

async function listMarkdownFiles(root: string, maxFiles = 120) {
  const files: string[] = []

  if (!(await pathExists(root))) {
    return files
  }

  const stack = [root]

  while (stack.length && files.length < maxFiles) {
    const current = stack.pop()!
    let children: DirectoryEntry[]

    try {
      children = await fs.readdir(current, { withFileTypes: true })
    } catch {
      continue
    }

    for (const child of children) {
      const fullPath = path.join(current, child.name)
      if (child.isDirectory()) {
        if (!SKIP_DIRS.has(child.name)) {
          stack.push(fullPath)
        }
        continue
      }

      if (child.isFile() && child.name.toLowerCase().endsWith('.md')) {
        files.push(fullPath)
      }
    }
  }

  return files
}

export async function listAutomationCandidates(limit = 30): Promise<AutomationCandidate[]> {
  const snapshot = await getKnowledgeGameSnapshot()
  const importedUris = new Set(snapshot.sources.map(source => source.sourceUri).filter(Boolean))
  const roots = configuredRoots()
  const allFiles = (await Promise.all(roots.map(root => listMarkdownFiles(root)))).flat()
  const uniqueFiles = Array.from(new Set(allFiles))

  const stats = await Promise.all(
    uniqueFiles.map(async filePath => {
      try {
        const stat = await fs.stat(filePath)
        return { filePath, stat }
      } catch {
        return null
      }
    }),
  )

  const recentFiles = stats
    .flatMap(item => (item ? [item] : []))
    .filter(item => item.stat.size > 80)
    .sort((a, b) => b.stat.mtimeMs - a.stat.mtimeMs)
    .slice(0, limit)

  const candidates: AutomationCandidate[] = []

  for (const item of recentFiles) {
    try {
      const content = await fs.readFile(item.filePath, 'utf8')
      const cleanExcerpt = excerpt(content)

      if (!cleanExcerpt) {
        continue
      }

      const title = firstHeading(content) || path.basename(item.filePath, path.extname(item.filePath))
      const classification = classifyKnowledgeInput({
        title,
        content: cleanExcerpt,
        sourceType: 'markdown-auto-scan',
        sourceUri: item.filePath,
      })

      candidates.push({
        id: normalizePathForId(item.filePath),
        title: classification.title,
        sourceType: 'markdown-auto-scan',
        sourceUri: item.filePath,
        excerpt: cleanExcerpt,
        size: item.stat.size,
        modifiedAt: item.stat.mtime.toISOString(),
        suggestedTheme: classification.theme,
        suggestedDikiwLevel: classification.dikiwLevel,
        suggestedBloomType: classification.bloomType,
        tags: classification.tags,
        alreadyImported: importedUris.has(item.filePath),
      })
    } catch {
      // Ignore unreadable markdown files; the scan is intentionally best-effort.
    }
  }

  return candidates
}

export async function importAutomationCandidates(input: AutomationImportInput = {}) {
  const candidates = await listAutomationCandidates(Math.max(input.limit || 30, 30))
  const wantedUris = input.sourceUris?.length ? new Set(input.sourceUris) : null
  const selected = candidates
    .filter(candidate => !candidate.alreadyImported)
    .filter(candidate => !wantedUris || wantedUris.has(candidate.sourceUri))
    .slice(0, input.limit || 5)

  const imported = []

  for (const candidate of selected) {
    const result = await createIntakeCard({
      title: candidate.title,
      content: candidate.excerpt,
      sourceType: candidate.sourceType,
      sourceUri: candidate.sourceUri,
      tags: candidate.tags,
    })
    imported.push({
      sourceUri: candidate.sourceUri,
      card: result.card,
      storage: result.storage,
    })
  }

  return {
    scanned: candidates.length,
    imported,
  }
}
