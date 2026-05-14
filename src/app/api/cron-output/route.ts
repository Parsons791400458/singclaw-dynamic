import { NextRequest, NextResponse } from 'next/server'
import { listCronReports, saveCronReport } from '@/lib/reports'

export const dynamic = 'force-dynamic'

function getBearerToken(req: NextRequest) {
  const authorization = req.headers.get('authorization')

  if (!authorization) {
    return null
  }

  const match = authorization.match(/^Bearer\s+(.+)$/i)
  return match?.[1] || null
}

function isAuthorizedCronPost(req: NextRequest) {
  const expectedToken = process.env.CRON_OUTPUT_TOKEN

  if (!expectedToken) {
    return true
  }

  const providedToken = req.headers.get('x-cron-output-token') || getBearerToken(req)
  return providedToken === expectedToken
}

export async function POST(req: NextRequest) {
  try {
    if (!isAuthorizedCronPost(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { agent, report, date } = body

    if (typeof agent !== 'string' || !agent.trim()) {
      return NextResponse.json({ error: 'Missing agent' }, { status: 400 })
    }

    if (report === undefined || report === null || report === '') {
      return NextResponse.json({ error: 'Missing report' }, { status: 400 })
    }

    if (date !== undefined && typeof date !== 'string') {
      return NextResponse.json({ error: 'date must be a string' }, { status: 400 })
    }

    const saved = await saveCronReport({
      agent: agent.trim(),
      report,
      date,
    })

    return NextResponse.json({
      ok: true,
      storage: saved.storage,
      file: saved.file,
      report: saved.report,
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const reports = await listCronReports()
    return NextResponse.json({ reports })
  } catch (e: any) {
    return NextResponse.json({ error: e.message, reports: [] }, { status: 500 })
  }
}
