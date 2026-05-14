import { NextRequest, NextResponse } from 'next/server'
import { recordReview } from '@/lib/knowledge-game/store'
import { KNOWLEDGE_THEMES, REVIEW_TYPES, type KnowledgeTheme, type ReviewType } from '@/lib/knowledge-game/types'

export const dynamic = 'force-dynamic'

function asReviewType(value: unknown): ReviewType {
  return REVIEW_TYPES.includes(value as ReviewType) ? value as ReviewType : 'daily'
}

function asTheme(value: unknown): KnowledgeTheme | undefined {
  return KNOWLEDGE_THEMES.includes(value as KnowledgeTheme) ? value as KnowledgeTheme : undefined
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = await recordReview({
      reviewType: asReviewType(body.reviewType),
      theme: asTheme(body.theme),
      focus: typeof body.focus === 'string' ? body.focus : '',
      output: typeof body.output === 'string' ? body.output : '',
      cardIds: Array.isArray(body.cardIds) ? body.cardIds.filter((id: unknown) => typeof id === 'string') : undefined,
    })

    return NextResponse.json({ ok: true, ...result })
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 })
  }
}
