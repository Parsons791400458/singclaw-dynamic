import { NextResponse } from 'next/server'
import { getKnowledgeGameSnapshot } from '@/lib/knowledge-game/store'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const snapshot = await getKnowledgeGameSnapshot()

    return NextResponse.json({
      ok: true,
      storage: snapshot.storage,
      cards: snapshot.cards,
      sources: snapshot.sources,
      quests: snapshot.quests,
      reviews: snapshot.reviews,
      progress: snapshot.progress,
    })
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }
}
