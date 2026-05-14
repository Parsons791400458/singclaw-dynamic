import { NextRequest, NextResponse } from 'next/server'
import { recordQuestRun } from '@/lib/knowledge-game/store'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = await recordQuestRun({
      questId: typeof body.questId === 'string' ? body.questId : '',
      cardId: typeof body.cardId === 'string' ? body.cardId : undefined,
      result: typeof body.result === 'string' ? body.result : 'completed',
      notes: typeof body.notes === 'string' ? body.notes : undefined,
    })

    return NextResponse.json({ ok: true, ...result })
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 })
  }
}
