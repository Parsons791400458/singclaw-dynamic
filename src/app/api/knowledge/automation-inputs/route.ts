import { NextRequest, NextResponse } from 'next/server'
import { importAutomationCandidates, listAutomationCandidates } from '@/lib/knowledge-game/automation'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const limit = Number(req.nextUrl.searchParams.get('limit') || 30)
    const candidates = await listAutomationCandidates(Number.isFinite(limit) ? limit : 30)

    return NextResponse.json({
      ok: true,
      candidates,
    })
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const result = await importAutomationCandidates({
      sourceUris: Array.isArray(body.sourceUris)
        ? body.sourceUris.filter((uri: unknown) => typeof uri === 'string')
        : undefined,
      limit: typeof body.limit === 'number' ? body.limit : undefined,
    })

    return NextResponse.json({
      ok: true,
      ...result,
    })
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 })
  }
}
