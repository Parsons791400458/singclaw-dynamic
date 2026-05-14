import { execFile } from 'child_process'
import { promisify } from 'util'
import { NextRequest, NextResponse } from 'next/server'
import { recordFeishuPublishRequest } from '@/lib/knowledge-game/store'

export const dynamic = 'force-dynamic'

const execFileAsync = promisify(execFile)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = await recordFeishuPublishRequest({
      title: typeof body.title === 'string' ? body.title : undefined,
      notes: typeof body.notes === 'string' ? body.notes : undefined,
      cardIds: Array.isArray(body.cardIds) ? body.cardIds.filter((id: unknown) => typeof id === 'string') : undefined,
    })

    if (process.env.HERMES_FEISHU_PUBLISH_ENABLED !== 'true') {
      return NextResponse.json({
        ok: true,
        executed: false,
        reason: 'HERMES_FEISHU_PUBLISH_ENABLED is not true; request recorded only.',
        ...result,
      })
    }

    const python = process.env.HERMES_PYTHON || 'python'
    const script = process.env.HERMES_FEISHU_SCRIPT || result.hermesScript

    await execFileAsync(python, [script], {
      timeout: 120000,
      windowsHide: true,
    })

    return NextResponse.json({
      ok: true,
      executed: true,
      script,
      ...result,
    })
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }
}
