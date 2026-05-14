import fs from 'fs'
import path from 'path'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

export type CronReport = {
  agent: string
  report: unknown
  timestamp: string
  date: string
}

type SaveCronReportInput = {
  agent: string
  report: unknown
  date?: string
}

type SaveCronReportResult = {
  storage: 'supabase' | 'filesystem'
  report: CronReport
  file?: string
}

const FALLBACK_REPORTS_DIR = path.join(process.cwd(), '.data', 'reports')
const LEGACY_REPORTS_DIR = path.join(process.cwd(), 'public', 'data', 'reports')

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10)
}

function normalizeDate(date: string | undefined) {
  if (!date) {
    return todayIsoDate()
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error('date must use YYYY-MM-DD format')
  }

  return date
}

function safeFileSegment(value: string) {
  const safe = value.replace(/[^\w.-]+/g, '_').replace(/^\.+/, '')
  return safe || 'agent'
}

function normalizeSupabaseReport(row: any): CronReport {
  return {
    agent: row.agent,
    report: row.report,
    date: row.report_date || row.date,
    timestamp: row.updated_at || row.created_at || row.timestamp || new Date().toISOString(),
  }
}

function readJsonFile<T>(filePath: string, fallback: T): T {
  if (!fs.existsSync(filePath)) {
    return fallback
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T
  } catch {
    return fallback
  }
}

function writeFallbackReport(report: CronReport) {
  fs.mkdirSync(FALLBACK_REPORTS_DIR, { recursive: true })

  const fileName = `${safeFileSegment(report.agent)}-${report.date}.json`
  const filePath = path.join(FALLBACK_REPORTS_DIR, fileName)
  fs.writeFileSync(filePath, JSON.stringify(report, null, 2))

  const allPath = path.join(FALLBACK_REPORTS_DIR, 'all.json')
  let all = readJsonFile<CronReport[]>(allPath, [])
  const existingIdx = all.findIndex(item => item.agent === report.agent && item.date === report.date)

  if (existingIdx >= 0) {
    all[existingIdx] = report
  } else {
    all.push(report)
  }

  all = all
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    .slice(-100)

  fs.writeFileSync(allPath, JSON.stringify(all, null, 2))

  return fileName
}

function readFallbackReports() {
  const primary = readJsonFile<CronReport[]>(path.join(FALLBACK_REPORTS_DIR, 'all.json'), [])
  const legacy = readJsonFile<CronReport[]>(path.join(LEGACY_REPORTS_DIR, 'all.json'), [])
  const reports = new Map<string, CronReport>()

  for (const report of legacy) {
    reports.set(`${report.agent}:${report.date}`, report)
  }

  for (const report of primary) {
    reports.set(`${report.agent}:${report.date}`, report)
  }

  return Array.from(reports.values())
}

export async function saveCronReport(input: SaveCronReportInput): Promise<SaveCronReportResult> {
  const reportDate = normalizeDate(input.date)
  const timestamp = new Date().toISOString()
  const report: CronReport = {
    agent: input.agent,
    report: input.report,
    timestamp,
    date: reportDate,
  }

  const supabase = getSupabaseAdmin()

  if (supabase) {
    const { data, error } = await supabase
      .from('cron_reports')
      .upsert(
        {
          agent: report.agent,
          report: report.report,
          report_date: report.date,
          updated_at: timestamp,
        },
        { onConflict: 'agent,report_date' },
      )
      .select('agent, report, report_date, created_at, updated_at')
      .single()

    if (error) {
      throw new Error(`Supabase cron_reports write failed: ${error.message}`)
    }

    return {
      storage: 'supabase',
      report: normalizeSupabaseReport(data),
    }
  }

  const fileName = writeFallbackReport(report)

  return {
    storage: 'filesystem',
    report,
    file: fileName,
  }
}

export async function listCronReports(limit = 100): Promise<CronReport[]> {
  const supabase = getSupabaseAdmin()

  if (supabase) {
    const { data, error } = await supabase
      .from('cron_reports')
      .select('agent, report, report_date, created_at, updated_at')
      .order('updated_at', { ascending: false })
      .limit(limit)

    if (!error && data) {
      return data.map(normalizeSupabaseReport)
    }

    console.warn('Supabase cron_reports read failed; falling back to local reports.', error?.message)
  }

  return readFallbackReports()
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit)
}
