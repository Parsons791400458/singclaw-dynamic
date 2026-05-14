#!/usr/bin/env node

import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { access, mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const requireFromHere = createRequire(import.meta.url);

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsDir = path.join(repoRoot, 'docs');
const ledgerPath = path.join(docsDir, 'openclaw-singclaw-task-ledger.md');
const registryPath = path.join(docsDir, 'openclaw-singclaw-task-registry.json');

const openclawStateDir = process.env.OPENCLAW_STATE_DIR || 'C:\\openclaw-state';
const openclawWorkspaceDir = process.env.OPENCLAW_WORKSPACE_DIR || 'C:\\openclaw-workspace';

const sourcePaths = {
  runsSqlite: path.join(openclawStateDir, 'tasks', 'runs.sqlite'),
  cronJobs: path.join(openclawStateDir, 'cron', 'jobs.json'),
  neonUrl: path.join(openclawWorkspaceDir, 'tmp', 'neon.active.url'),
  reports: path.join(openclawWorkspaceDir, 'reports'),
  memory: path.join(openclawWorkspaceDir, 'memory'),
};

const terms = [
  'singclaw',
  'starclaw',
  'shrimp',
  'shrimpfi',
  'alpha',
  'no empty',
  'acceptance',
  'agent oa',
  'agent_topics',
  'agent_mailbox',
  'sla',
  'openclaw现状',
  '腾讯云openclaw',
  '泥鳅',
  '沟通',
  '交流',
  '小镇',
  '验收',
  '协作',
];

const keyNeonTaskIds = ['T-010', 'T-011', 'T-012', 'T-013', 'T-014', 'T-016', 'T-020', 'T-024'];
const keyRelatedTaskIds = [...keyNeonTaskIds, 'STARCLAW-20260520', 'T-027'];

const ownerProjectGroup = 'singclaw-dynamic project group';
const mergePolicy = 'read-only archive: source records are indexed here but not mutated';

const warnings = [];

async function main() {
  await mkdir(docsDir, { recursive: true });

  const [taskRuns, neon, cronJobs, scheduledTasks, evidenceCatalog] = await Promise.all([
    readOpenClawTaskRuns(),
    readNeon(),
    readCronJobs(),
    readScheduledTasks(),
    readEvidenceCatalog(),
  ]);

  const entries = [
    ...taskRuns.filter(isRelevantTaskRun).map(entryFromTaskRun),
    ...neon.tasks.map(entryFromNeonTask),
    ...neon.topics.map(entryFromNeonTopic),
    ...neon.mailbox.map(entryFromNeonMailbox),
    ...cronJobs.map(entryFromCronJob),
    ...scheduledTasks.filter(isRelevantScheduledTask).map(entryFromScheduledTask),
    ...entriesFromEvidence(evidenceCatalog),
    ...programSurfaceEntries(evidenceCatalog),
  ];

  const dedupedEntries = dedupeEntries(entries)
    .map((entry) => withEvidence(entry, evidenceCatalog))
    .sort(sortEntries);

  const registry = {
    generated_at: new Date().toISOString(),
    generated_by: 'scripts/import-openclaw-singclaw-tasks.mjs',
    owner_project_group: ownerProjectGroup,
    merge_policy: mergePolicy,
    source_paths: {
      runs_sqlite: sourcePaths.runsSqlite,
      cron_jobs: sourcePaths.cronJobs,
      neon_url: `${sourcePaths.neonUrl} (read only, value redacted)`,
      reports: sourcePaths.reports,
      memory: sourcePaths.memory,
    },
    schema: [
      'id',
      'source_system',
      'source_id',
      'source_status',
      'project_area',
      'project_status',
      'priority',
      'title',
      'owner_source',
      'owner_project_group',
      'created_at',
      'updated_at',
      'evidence_refs',
      'recommended_next_action',
      'merge_policy',
    ],
    counts: countEntries(dedupedEntries),
    warnings,
    entries: dedupedEntries,
  };

  await writeFile(registryPath, `${JSON.stringify(registry, null, 2)}\n`, 'utf8');
  await writeFile(ledgerPath, renderLedger(registry), 'utf8');

  console.log(`Wrote ${path.relative(repoRoot, registryPath)} (${dedupedEntries.length} entries)`);
  console.log(`Wrote ${path.relative(repoRoot, ledgerPath)}`);
  if (warnings.length) {
    console.log(`Warnings: ${warnings.length}`);
  }
}

async function readOpenClawTaskRuns() {
  if (!(await exists(sourcePaths.runsSqlite))) {
    warnings.push(`OpenClaw task runs DB not found: ${sourcePaths.runsSqlite}`);
    return [];
  }

  const python = String.raw`
import json
import os
import sqlite3
import sys

sys.stdout.reconfigure(encoding="utf-8")

path = os.environ["OPENCLAW_RUNS_SQLITE"]
terms = [term.lower() for term in json.loads(os.environ["SINGCLAW_TERMS_JSON"])]

conn = sqlite3.connect(f"file:{path}?mode=ro", uri=True)
conn.row_factory = sqlite3.Row
rows = conn.execute("""
  select
    task_id, runtime, task_kind, source_id, owner_key, agent_id, run_id, label,
    task, status, delivery_status, created_at, started_at, ended_at,
    last_event_at, error, progress_summary, terminal_summary, terminal_outcome
  from task_runs
  order by created_at desc
""").fetchall()
conn.close()

matched = []
for row in rows:
    item = dict(row)
    haystack = " ".join("" if value is None else str(value) for value in item.values()).lower()
    if any(term in haystack for term in terms):
        matched.append(item)

print(json.dumps(matched, ensure_ascii=False))
`;

  try {
    return await runJsonCommand('python', ['-c', python], {
      OPENCLAW_RUNS_SQLITE: sourcePaths.runsSqlite,
      SINGCLAW_TERMS_JSON: JSON.stringify(terms),
      PYTHONIOENCODING: 'utf-8',
    });
  } catch (error) {
    warnings.push(`Could not read OpenClaw task runs: ${error.message}`);
    return [];
  }
}

async function readNeon() {
  const empty = { tasks: [], topics: [], mailbox: [] };

  if (!(await exists(sourcePaths.neonUrl))) {
    warnings.push(`Neon URL file not found: ${sourcePaths.neonUrl}`);
    return empty;
  }

  let Client;
  try {
    ({ Client } = requireFromHere(path.join(openclawWorkspaceDir, 'node_modules', 'pg')));
  } catch (error) {
    warnings.push(`OpenClaw pg dependency not available: ${error.message}`);
    return empty;
  }

  let connectionString;
  try {
    connectionString = normalizeNeonConnectionString((await readFile(sourcePaths.neonUrl, 'utf8')).trim());
  } catch (error) {
    warnings.push(`Could not read Neon URL file: ${error.message}`);
    return empty;
  }

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  const patterns = terms.map((term) => `%${term.toLowerCase()}%`);
  const topicOwnerPatterns = ['%maxink%', '%niqiu%', '%泥鳅%'];
  const mailboxPatterns = [
    '%singclaw%',
    '%starclaw%',
    '%starclaw-20260520%',
    '%no empty%',
    '%sla%',
    '%openclaw现状%',
    '%腾讯云%',
    '%小镇%',
    '%泥鳅%',
    '%沟通%',
    '%协作%',
  ];

  try {
    await client.connect();

    const tasks = await client.query(
      `
        select id, title, type, priority, status, owner_agent, created_at, updated_at, output
        from task_queue
        where id = any($1::text[])
           or lower(concat_ws(' ', id, title, type, owner_agent, output, description, align_goal)) like any($2::text[])
        order by created_at desc
        limit 120
      `,
      [keyNeonTaskIds, patterns],
    );

    const topics = await client.query(
      `
        select id, title, status, owner_agent, current_round, max_round,
               created_at, updated_at, final_decision_id
        from agent_topics
        where lower(concat_ws(' ', id::text, title, owner_agent, status, objective, alignment_summary, prompt)) like any($1::text[])
           or (
             created_at >= timestamp with time zone '2026-05-18T00:00:00Z'
             and lower(concat_ws(' ', title, owner_agent)) like any($2::text[])
           )
        order by created_at desc
        limit 120
      `,
      [patterns, topicOwnerPatterns],
    );

    const mailbox = await client.query(
      `
        select id, thread_key, subject, from_agent, to_agent, status, requires_reply,
               related_task_id, priority, created_at, read_at, handled_at, deadline_at, escalation_at
        from agent_mailbox
        where lower(concat_ws(' ', id::text, thread_key, subject, from_agent, to_agent, related_task_id, body)) like any($1::text[])
           or related_task_id = any($2::text[])
        order by created_at desc
        limit 200
      `,
      [mailboxPatterns, keyRelatedTaskIds],
    );

    return {
      tasks: tasks.rows,
      topics: topics.rows,
      mailbox: mailbox.rows,
    };
  } catch (error) {
    warnings.push(`Could not read Neon task tables: ${error.message}`);
    return empty;
  } finally {
    await client.end().catch(() => {});
  }
}

async function readCronJobs() {
  if (!(await exists(sourcePaths.cronJobs))) {
    warnings.push(`OpenClaw cron jobs file not found: ${sourcePaths.cronJobs}`);
    return [];
  }

  try {
    const raw = await readFile(sourcePaths.cronJobs, 'utf8');
    const parsed = JSON.parse(raw);
    return (parsed.jobs || []).filter((job) => matchesTerms(JSON.stringify(job)));
  } catch (error) {
    warnings.push(`Could not read cron jobs: ${error.message}`);
    return [];
  }
}

async function readScheduledTasks() {
  const command = `
    Get-ScheduledTask |
      Where-Object { $_.TaskName -like '*OpenClaw*' -or $_.TaskPath -like '*OpenClaw*' } |
      ForEach-Object {
        $info = Get-ScheduledTaskInfo -TaskName $_.TaskName -TaskPath $_.TaskPath -ErrorAction SilentlyContinue
        [pscustomobject]@{
          TaskName = $_.TaskName
          TaskPath = $_.TaskPath
          State = $_.State.ToString()
          LastRunTime = $info.LastRunTime
          NextRunTime = $info.NextRunTime
          LastTaskResult = $info.LastTaskResult
        }
      } |
      ConvertTo-Json -Depth 4
  `;

  try {
    const result = await runJsonCommand('powershell', ['-NoProfile', '-Command', command]);
    if (!result) return [];
    return Array.isArray(result) ? result : [result];
  } catch (error) {
    warnings.push(`Could not read Windows scheduled tasks: ${error.message}`);
    return [];
  }
}

async function readEvidenceCatalog() {
  const dirs = [sourcePaths.reports, sourcePaths.memory];
  const catalog = [];

  for (const dir of dirs) {
    if (!(await exists(dir))) {
      warnings.push(`Evidence directory not found: ${dir}`);
      continue;
    }

    const files = await listMarkdownFiles(dir);
    for (const file of files) {
      try {
        const content = await readFile(file, 'utf8');
        if (!matchesTerms(`${file}\n${content}`)) continue;

        const fileStat = await stat(file);
        const title = firstMarkdownTitle(content) || path.basename(file);
        catalog.push({
          path: file,
          title,
          last_modified: fileStat.mtime.toISOString(),
          matched_terms: terms.filter((term) => `${file}\n${content}`.toLowerCase().includes(term.toLowerCase())),
        });
      } catch (error) {
        warnings.push(`Could not inspect evidence file ${file}: ${error.message}`);
      }
    }
  }

  return catalog.sort((a, b) => b.last_modified.localeCompare(a.last_modified)).slice(0, 80);
}

async function listMarkdownFiles(dir) {
  const results = [];
  const stack = [dir];

  while (stack.length) {
    const current = stack.pop();
    const children = await readdir(current, { withFileTypes: true });

    for (const child of children) {
      const fullPath = path.join(current, child.name);
      if (child.isDirectory()) {
        stack.push(fullPath);
      } else if (child.isFile() && child.name.toLowerCase().endsWith('.md')) {
        results.push(fullPath);
      }
    }
  }

  return results;
}

function entryFromTaskRun(row) {
  const text = [
    row.label,
    row.task,
    row.status,
    row.delivery_status,
    row.progress_summary,
    row.terminal_summary,
    row.error,
  ].filter(Boolean).join(' ');

  const sourceId = row.task_id || row.run_id || row.label || 'unknown';

  return normalizeEntry({
    id: `openclaw-run:${sourceId}`,
    source_system: 'openclaw_task_runs',
    source_id: sourceId,
    source_status: row.status || 'unknown',
    project_area: classifyProjectArea(text),
    project_status: mapProjectStatus('openclaw_task_runs', row.status),
    priority: inferPriority(text, row.status),
    title: row.label || trimToSentence(row.task) || sourceId,
    owner_source: row.owner_key || row.agent_id || 'unknown',
    created_at: toIso(row.created_at),
    updated_at: toIso(row.last_event_at || row.ended_at || row.started_at || row.created_at),
    evidence_refs: [sourcePaths.runsSqlite],
    recommended_next_action: recommendNextAction('openclaw_task_runs', row.status, text),
    details: compact({
      delivery_status: row.delivery_status,
      task_kind: row.task_kind,
      source_id: row.source_id,
      error: row.error,
      progress_summary: row.progress_summary,
      terminal_outcome: row.terminal_outcome,
    }),
  });
}

function isRelevantTaskRun(row) {
  const owner = String(row.owner_key || '');
  if (owner.startsWith('system:cron:')) return false;
  if (row.source_id === 'no-empty-talk-sla-check-5m') return false;

  const text = [
    row.label,
    row.task,
    row.source_id,
    row.progress_summary,
    row.terminal_summary,
    row.error,
  ].filter(Boolean).join(' ').toLowerCase();

  return [
    'singclaw',
    'starclaw',
    'acceptance',
    '小镇',
    'game',
    'no empty',
    'maxink',
    'niqiu',
    '泥鳅',
  ].some((term) => text.includes(term.toLowerCase()));
}

function entryFromNeonTask(row) {
  const text = [row.id, row.title, row.type, row.output, row.owner_agent, row.status].filter(Boolean).join(' ');

  return normalizeEntry({
    id: `neon-task:${row.id}`,
    source_system: 'neon_task_queue',
    source_id: row.id,
    source_status: row.status || 'unknown',
    project_area: classifyProjectArea(text),
    project_status: mapProjectStatus('neon_task_queue', row.status),
    priority: row.priority || inferPriority(text, row.status),
    title: row.title || row.id,
    owner_source: row.owner_agent || 'unknown',
    created_at: toIso(row.created_at),
    updated_at: toIso(row.updated_at || row.created_at),
    evidence_refs: ['Neon task_queue (connection value redacted)'],
    recommended_next_action: recommendNextAction('neon_task_queue', row.status, text),
    details: compact({
      type: row.type,
      output: row.output,
    }),
  });
}

function entryFromNeonTopic(row) {
  const text = [row.id, row.title, row.owner_agent, row.status].filter(Boolean).join(' ');

  return normalizeEntry({
    id: `neon-topic:${row.id}`,
    source_system: 'neon_agent_topics',
    source_id: row.id,
    source_status: row.status || 'unknown',
    project_area: classifyProjectArea(text),
    project_status: mapProjectStatus('neon_agent_topics', row.status),
    priority: row.status === 'BLOCKED' ? 'P0' : inferPriority(text, row.status),
    title: row.title || row.id,
    owner_source: row.owner_agent || 'unknown',
    created_at: toIso(row.created_at),
    updated_at: toIso(row.updated_at || row.created_at),
    evidence_refs: ['Neon agent_topics (connection value redacted)'],
    recommended_next_action: recommendNextAction('neon_agent_topics', row.status, text),
    details: compact({
      current_round: row.current_round,
      max_round: row.max_round,
      final_decision_id: row.final_decision_id,
    }),
  });
}

function entryFromNeonMailbox(row) {
  const text = [
    row.thread_key,
    row.subject,
    row.from_agent,
    row.to_agent,
    row.related_task_id,
    row.status,
  ].filter(Boolean).join(' ');

  return normalizeEntry({
    id: `neon-mailbox:${row.id}`,
    source_system: 'neon_agent_mailbox',
    source_id: row.id,
    source_status: row.status || 'unknown',
    project_area: classifyProjectArea(text),
    project_status: mapProjectStatus('neon_agent_mailbox', row.status, row.requires_reply),
    priority: row.priority || (row.requires_reply ? 'P0' : inferPriority(text, row.status)),
    title: row.subject || row.thread_key || row.id,
    owner_source: [row.from_agent, row.to_agent].filter(Boolean).join(' -> ') || 'unknown',
    created_at: toIso(row.created_at),
    updated_at: toIso(row.handled_at || row.read_at || row.created_at),
    evidence_refs: ['Neon agent_mailbox (connection value redacted)'],
    recommended_next_action: recommendNextAction('neon_agent_mailbox', row.status, text, row.requires_reply),
    details: compact({
      thread_key: row.thread_key,
      related_task_id: row.related_task_id,
      requires_reply: row.requires_reply,
      read_at: toIso(row.read_at),
      handled_at: toIso(row.handled_at),
      deadline_at: toIso(row.deadline_at),
      escalation_at: toIso(row.escalation_at),
    }),
  });
}

function entryFromCronJob(job) {
  const text = JSON.stringify(job);

  return normalizeEntry({
    id: `openclaw-cron:${job.id}`,
    source_system: 'openclaw_cron_jobs',
    source_id: job.id,
    source_status: job.enabled ? 'enabled' : 'disabled',
    project_area: classifyProjectArea(text),
    project_status: 'Operational Watch',
    priority: 'P0',
    title: job.name || job.id,
    owner_source: job.agentId || 'unknown',
    created_at: toIso(job.createdAtMs),
    updated_at: toIso(job.createdAtMs),
    evidence_refs: [sourcePaths.cronJobs],
    recommended_next_action: 'Verify whether this file-backed cron is actively loaded before relying on it for SLA enforcement.',
    details: compact({
      schedule: job.schedule,
      delivery: job.delivery,
      sessionTarget: job.sessionTarget,
      wakeMode: job.wakeMode,
    }),
  });
}

function isRelevantScheduledTask(task) {
  const text = `${task.TaskName || ''} ${task.TaskPath || ''}`;
  if (!/openclaw/i.test(text)) return false;
  return !/UsbDk Cleanup Reminder/i.test(text);
}

function entryFromScheduledTask(task) {
  const text = `${task.TaskName || ''} ${task.TaskPath || ''} ${task.LastTaskResult || ''}`;

  return normalizeEntry({
    id: `windows-scheduled-task:${task.TaskName}`,
    source_system: 'windows_scheduled_tasks',
    source_id: task.TaskName,
    source_status: task.State || 'unknown',
    project_area: classifyProjectArea(text),
    project_status: 'Operational Watch',
    priority: task.TaskName === 'OpenClaw-OA-Nightly-Sync' ? 'P0' : 'P1',
    title: task.TaskName,
    owner_source: 'Windows Task Scheduler',
    created_at: null,
    updated_at: stringifyDateLike(task.LastRunTime),
    evidence_refs: ['Windows Scheduled Tasks'],
    recommended_next_action: scheduledTaskRecommendation(task),
    details: compact({
      task_path: task.TaskPath,
      last_run_time: stringifyDateLike(task.LastRunTime),
      next_run_time: stringifyDateLike(task.NextRunTime),
      last_task_result: task.LastTaskResult,
    }),
  });
}

function entriesFromEvidence(evidenceCatalog) {
  return evidenceCatalog
    .filter((item) => /report|snapshot|alpha|acceptance|oa|risk|collab|singclaw|starclaw|shrimp/i.test(item.path))
    .slice(0, 40)
    .map((item) => {
      const text = `${item.path} ${item.title} ${(item.matched_terms || []).join(' ')}`;
      const projectStatus = /risk|blocked|plan|snapshot|progress/i.test(text) ? 'Needs Triage' : 'Archived Done';

      return normalizeEntry({
        id: `openclaw-evidence:${path.basename(item.path).replace(/[^a-zA-Z0-9._-]/g, '-')}`,
        source_system: item.path.includes(`${path.sep}memory${path.sep}`) ? 'openclaw_memory' : 'openclaw_report',
        source_id: item.path,
        source_status: 'evidence-file',
        project_area: classifyProjectArea(text),
        project_status: projectStatus,
        priority: projectStatus === 'Needs Triage' ? 'P1' : 'P2',
        title: item.title,
        owner_source: 'OpenClaw workspace',
        created_at: null,
        updated_at: item.last_modified,
        evidence_refs: [item.path],
        recommended_next_action: 'Use this file as source evidence during project-group triage; do not treat it as an upstream task state.',
        details: compact({
          matched_terms: item.matched_terms,
        }),
      });
    });
}

function programSurfaceEntries(evidenceCatalog) {
  const areas = [
    ['app-singclaw', ['app.singclaw', 'site', 'product surface']],
    ['starclaw', ['starclaw', 'star.singclaw']],
    ['shrimpfi', ['shrimpfi', 'shrimp']],
    ['alpha-scanner', ['alpha scanner', 'alpha-scanner', 'crypto alpha']],
    ['singclaw-town', ['singclaw town', 'singclaw小镇', '小镇']],
    ['agent-oa', ['acceptance center', 'oa', '验收']],
    ['collab-control', ['no empty', 'sla', '沟通', '协作']],
  ];

  return areas.flatMap(([area, areaTerms]) => {
    const refs = evidenceCatalog
      .filter((item) => {
        const text = `${item.path} ${item.title} ${(item.matched_terms || []).join(' ')}`.toLowerCase();
        return areaTerms.some((term) => text.includes(term.toLowerCase()));
      })
      .slice(0, 8)
      .map((item) => item.path);

    if (!refs.length) return [];

    return normalizeEntry({
      id: `project-program:${area}`,
      source_system: 'project_program_surface',
      source_id: `program:${area}`,
      source_status: 'evidence-detected',
      project_area: area,
      project_status: 'Needs Triage',
      priority: area === 'app-singclaw' || area === 'agent-oa' || area === 'collab-control' ? 'P0' : 'P1',
      title: `${area} project surface consolidated from OpenClaw evidence`,
      owner_source: 'OpenClaw workspace evidence',
      created_at: null,
      updated_at: null,
      evidence_refs: refs,
      recommended_next_action: 'Assign a current project-group owner and decide whether this surface becomes active delivery, watch-only, or archive.',
      details: compact({
        evidence_count: refs.length,
      }),
    });
  });
}

function normalizeEntry(entry) {
  return {
    id: sanitizeText(entry.id),
    source_system: sanitizeText(entry.source_system),
    source_id: sanitizeText(entry.source_id),
    source_status: sanitizeText(entry.source_status || 'unknown'),
    project_area: entry.project_area || 'app-singclaw',
    project_status: entry.project_status || 'Needs Triage',
    priority: entry.priority || 'P2',
    title: sanitizeText(entry.title || entry.source_id || entry.id),
    owner_source: sanitizeText(entry.owner_source || 'unknown'),
    owner_project_group: ownerProjectGroup,
    created_at: entry.created_at || null,
    updated_at: entry.updated_at || null,
    evidence_refs: [...new Set((entry.evidence_refs || []).map(sanitizeText))],
    recommended_next_action: sanitizeText(entry.recommended_next_action || 'Review in project-group triage.'),
    merge_policy: mergePolicy,
    details: entry.details || {},
  };
}

function withEvidence(entry, evidenceCatalog) {
  const text = `${entry.title} ${entry.source_id} ${entry.project_area}`.toLowerCase();
  const refs = evidenceCatalog
    .filter((item) => {
      const evidenceText = `${item.path} ${item.title} ${(item.matched_terms || []).join(' ')}`.toLowerCase();
      if (entry.project_area === 'starclaw' && evidenceText.includes('starclaw')) return true;
      if (entry.project_area === 'alpha-scanner' && evidenceText.includes('alpha')) return true;
      if (entry.project_area === 'shrimpfi' && evidenceText.includes('shrimp')) return true;
      if (entry.project_area === 'singclaw-town' && (evidenceText.includes('town') || evidenceText.includes('小镇'))) return true;
      if (entry.project_area === 'agent-oa' && (evidenceText.includes('acceptance') || evidenceText.includes('oa'))) return true;
      if (entry.project_area === 'collab-control' && (evidenceText.includes('sla') || evidenceText.includes('no empty') || evidenceText.includes('沟通'))) return true;
      return text.split(/\s+/).some((part) => part.length > 5 && evidenceText.includes(part));
    })
    .slice(0, 5)
    .map((item) => item.path);

  return {
    ...entry,
    evidence_refs: [...new Set([...entry.evidence_refs, ...refs])].slice(0, 8),
  };
}

function dedupeEntries(entries) {
  const map = new Map();
  for (const entry of entries) {
    if (!entry.id || map.has(entry.id)) continue;
    map.set(entry.id, entry);
  }
  return [...map.values()];
}

function sortEntries(a, b) {
  const statusRank = {
    Blocked: 0,
    'Retry Candidate': 1,
    'Needs Triage': 2,
    'Operational Watch': 3,
    'Archived Done': 4,
  };
  const priorityRank = { P0: 0, P1: 1, P2: 2, P3: 3, normal: 4 };
  return (
    (statusRank[a.project_status] ?? 9) - (statusRank[b.project_status] ?? 9) ||
    (priorityRank[a.priority] ?? 9) - (priorityRank[b.priority] ?? 9) ||
    String(b.updated_at || b.created_at || '').localeCompare(String(a.updated_at || a.created_at || '')) ||
    a.title.localeCompare(b.title)
  );
}

function classifyProjectArea(text) {
  const lower = String(text || '').toLowerCase();
  if (lower.includes('starclaw') || lower.includes('star.singclaw') || lower.includes('vercel')) return 'starclaw';
  if (lower.includes('shrimpfi') || lower.includes('shrimp')) return 'shrimpfi';
  if (lower.includes('alpha') || lower.includes('crypto')) return 'alpha-scanner';
  if (lower.includes('singclaw town') || lower.includes('小镇') || lower.includes('quest') || lower.includes('game')) return 'singclaw-town';
  if (lower.includes('acceptance') || lower.includes('oa') || lower.includes('验收')) return 'agent-oa';
  if (
    lower.includes('no empty') ||
    lower.includes('sla') ||
    lower.includes('agent_topics') ||
    lower.includes('mailbox') ||
    lower.includes('沟通') ||
    lower.includes('协作') ||
    lower.includes('交流') ||
    lower.includes('maxink') ||
    lower.includes('niqiu') ||
    lower.includes('泥鳅')
  ) {
    return 'collab-control';
  }
  return 'app-singclaw';
}

function mapProjectStatus(sourceSystem, sourceStatus, requiresReply = false) {
  const status = String(sourceStatus || '').toUpperCase();

  if (sourceSystem === 'openclaw_task_runs') {
    if (status === 'SUCCEEDED') return 'Archived Done';
    if (status === 'FAILED' || status === 'TIMED_OUT') return 'Retry Candidate';
    return 'Needs Triage';
  }

  if (sourceSystem === 'neon_agent_topics') {
    if (status === 'BLOCKED') return 'Blocked';
    if (status === 'CLOSED' || status === 'MERGED' || status === 'SUMMARIZED') return 'Archived Done';
    return 'Needs Triage';
  }

  if (sourceSystem === 'neon_agent_mailbox') {
    if (status === 'OPEN' && requiresReply) return 'Blocked';
    if (status === 'OPEN') return 'Needs Triage';
    if (status === 'HANDLED') return 'Archived Done';
    return 'Needs Triage';
  }

  if (status === 'BLOCKED') return 'Blocked';
  if (status === 'APPROVED' || status === 'OPEN') return 'Needs Triage';
  if (status === 'HANDLED' || status === 'CLOSED' || status === 'DONE') return 'Archived Done';
  return 'Needs Triage';
}

function inferPriority(text, status) {
  const lower = `${text || ''} ${status || ''}`.toLowerCase();
  if (lower.includes('p0') || lower.includes('blocked') || lower.includes('failed') || lower.includes('timed_out')) return 'P0';
  if (lower.includes('p1') || lower.includes('starclaw') || lower.includes('alpha')) return 'P1';
  return 'P2';
}

function recommendNextAction(sourceSystem, status, text, requiresReply = false) {
  const sourceStatus = String(status || '').toUpperCase();
  const lower = String(text || '').toLowerCase();

  if (sourceSystem === 'openclaw_task_runs') {
    if (sourceStatus === 'SUCCEEDED') return 'Keep as read-only evidence and link it when planning the active implementation.';
    if (sourceStatus === 'FAILED' || sourceStatus === 'TIMED_OUT') return 'Review failure context and decide whether to rerun under this project group.';
    return 'Triage this OpenClaw run and decide whether it is still active.';
  }

  if (sourceSystem === 'neon_agent_mailbox') {
    if (sourceStatus === 'OPEN' && requiresReply) return 'Treat as blocked communication; assign a project-group responder before closing the loop.';
    if (sourceStatus === 'OPEN') return 'Review whether the open message still requires action or can be archived.';
    return 'Keep as collaboration evidence.';
  }

  if (sourceSystem === 'neon_agent_topics') {
    if (sourceStatus === 'BLOCKED') return 'Convert the blocked topic into one explicit owner, next reply, and acceptance condition.';
    return 'Review topic outcome and decide whether it becomes an active project-group work item.';
  }

  if (sourceSystem === 'neon_task_queue') {
    if (lower.includes('schema') || lower.includes('migration')) return 'Draft migration plan in this repo first; do not mutate Neon until separately authorized.';
    if (sourceStatus === 'APPROVED') return 'Convert approved source task into an active project-group work item or archive with reason.';
    return 'Review task status during project-group triage.';
  }

  return 'Review in project-group triage.';
}

function scheduledTaskRecommendation(task) {
  if (task.TaskName === 'OpenClaw-OA-Nightly-Sync') {
    return 'Keep watching nightly sync health; latest source result is indexed here only.';
  }
  if (Number(task.LastTaskResult) !== 0) {
    return 'Check whether this scheduler still needs to run; do not restart or edit without separate authorization.';
  }
  return 'Keep as operational watch evidence.';
}

function renderLedger(registry) {
  const entries = registry.entries;
  const sections = [
    ['Blocked / Retry First', entries.filter((entry) => entry.project_status === 'Blocked' || entry.project_status === 'Retry Candidate'), null],
    ['Needs Triage', entries.filter((entry) => entry.project_status === 'Needs Triage'), null],
    ['Operational Watch', entries.filter((entry) => entry.project_status === 'Operational Watch'), null],
    ['Archived Evidence', entries.filter((entry) => entry.project_status === 'Archived Done'), 40],
  ];

  return [
    '# SingClaw OpenClaw Project-Group Task Ledger',
    '',
    `Generated at: ${registry.generated_at}`,
    '',
    `Merge policy: ${registry.merge_policy}`,
    '',
    'This ledger consolidates local OpenClaw, Neon, cron, Windows scheduler, memory, and report evidence into the SingClaw project group. Source systems are indexed read-only and were not mutated by the import.',
    '',
    '## Counts',
    '',
    renderCounts(registry.counts),
    '',
    '## Source Inputs',
    '',
    `- OpenClaw runs SQLite: \`${registry.source_paths.runs_sqlite}\``,
    `- OpenClaw cron jobs: \`${registry.source_paths.cron_jobs}\``,
    `- Neon operational tables: \`${registry.source_paths.neon_url}\``,
    `- Reports: \`${registry.source_paths.reports}\``,
    `- Memory: \`${registry.source_paths.memory}\``,
    '',
    ...sections.flatMap(([title, rows, limit]) => renderSection(title, rows, limit)),
    '## Warnings',
    '',
    ...(registry.warnings.length ? registry.warnings.map((warning) => `- ${warning}`) : ['- None']),
    '',
  ].join('\n');
}

function renderCounts(counts) {
  const lines = [
    '| Metric | Count |',
    '| --- | ---: |',
    `| Total entries | ${counts.total} |`,
  ];

  for (const [status, count] of Object.entries(counts.by_project_status)) {
    lines.push(`| ${escapeMarkdown(status)} | ${count} |`);
  }

  return lines.join('\n');
}

function renderSection(title, rows, limit = null) {
  if (!rows.length) {
    return [`## ${title}`, '', '_No entries._', ''];
  }

  const visibleRows = limit ? rows.slice(0, limit) : rows;
  const hiddenCount = rows.length - visibleRows.length;
  const table = [
    '| Status | Priority | Area | Source | Title | Source Owner | Next Action |',
    '| --- | --- | --- | --- | --- | --- | --- |',
    ...visibleRows.map((entry) => [
      entry.project_status,
      entry.priority,
      entry.project_area,
      `${entry.source_system}:${entry.source_id}`,
      entry.title,
      entry.owner_source,
      entry.recommended_next_action,
    ].map(escapeMarkdown).join(' | ')).map((row) => `| ${row} |`),
  ];

  return [
    `## ${title}`,
    '',
    ...(hiddenCount > 0 ? [`Showing ${visibleRows.length} of ${rows.length}. Full detail is in \`docs/openclaw-singclaw-task-registry.json\`.`, ''] : []),
    ...table,
    '',
  ];
}

function countEntries(entries) {
  return {
    total: entries.length,
    by_project_status: countBy(entries, 'project_status'),
    by_project_area: countBy(entries, 'project_area'),
    by_source_system: countBy(entries, 'source_system'),
  };
}

function countBy(entries, key) {
  return entries.reduce((acc, entry) => {
    acc[entry[key]] = (acc[entry[key]] || 0) + 1;
    return acc;
  }, {});
}

function compact(object) {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== null && value !== undefined && value !== ''),
  );
}

function matchesTerms(value) {
  const lower = String(value || '').toLowerCase();
  return terms.some((term) => lower.includes(term.toLowerCase()));
}

function trimToSentence(value) {
  if (!value) return '';
  const normalized = String(value).replace(/\s+/g, ' ').trim();
  return normalized.length > 120 ? `${normalized.slice(0, 117)}...` : normalized;
}

function firstMarkdownTitle(content) {
  const line = String(content || '').split(/\r?\n/).find((item) => /^#\s+/.test(item));
  return line ? line.replace(/^#\s+/, '').trim() : '';
}

function toIso(value) {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') {
    const ms = value > 100000000000 ? value : value * 1000;
    return new Date(ms).toISOString();
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toISOString();
}

function stringifyDateLike(value) {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'string') {
    const match = value.match(/^\/Date\((\d+)\)\/$/);
    if (match) return new Date(Number(match[1])).toISOString();
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toISOString();
  }
  return toIso(value);
}

function sanitizeText(value) {
  const text = String(value ?? '');
  return text
    .replace(/postgres(?:ql)?:\/\/[^\s)]+/gi, '[redacted-postgres-url]')
    .replace(/password=[^&\s]+/gi, 'password=[redacted]')
    .replace(/apikey[=:][^&\s]+/gi, 'apikey=[redacted]')
    .trim();
}

function normalizeNeonConnectionString(value) {
  try {
    const url = new URL(value);
    const sslMode = url.searchParams.get('sslmode');
    if (!sslMode || ['prefer', 'require', 'verify-ca'].includes(sslMode)) {
      url.searchParams.set('sslmode', 'verify-full');
    }
    return url.toString();
  } catch {
    return value.replace(/sslmode=(prefer|require|verify-ca)/i, 'sslmode=verify-full');
  }
}

function escapeMarkdown(value) {
  return sanitizeText(value)
    .replace(/\r?\n/g, '<br>')
    .replace(/\|/g, '\\|');
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function runJsonCommand(command, args, extraEnv = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      env: { ...process.env, ...extraEnv },
      windowsHide: true,
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', reject);
    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(stderr.trim() || `${command} exited with code ${code}`));
        return;
      }

      const trimmed = stdout.trim();
      if (!trimmed) {
        resolve(null);
        return;
      }

      try {
        resolve(JSON.parse(trimmed));
      } catch (error) {
        reject(new Error(`Could not parse JSON from ${command}: ${error.message}`));
      }
    });
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
