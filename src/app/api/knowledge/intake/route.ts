import { NextRequest, NextResponse } from 'next/server'
import { createIntakeCard } from '@/lib/knowledge-game/store'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = await createIntakeCard({
      title: typeof body.title === 'string' ? body.title : undefined,
      content: typeof body.content === 'string' ? body.content : '',
      sourceType: typeof body.sourceType === 'string' ? body.sourceType : 'manual',
      sourceUri: typeof body.sourceUri === 'string' ? body.sourceUri : undefined,
      role: typeof body.role === 'string' ? body.role : undefined,
      tags: Array.isArray(body.tags) ? body.tags.filter((tag: unknown) => typeof tag === 'string') : undefined,
    })

    return NextResponse.json({ ok: true, ...result })
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 })
  }
}
