// /api/mvp-proxy — S5 BFF for SINGCLAW-MVP chat (renamed from /api/mvp-chat to dodge Next.js Server Action interceptor)
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 300

const ADAPTER_URL = process.env.SINGCLAW_ADAPTER_URL || 'https://app.singclaw.xyz/v1/mvp/chat'
const DEFAULT_CODE = process.env.MVP_DEFAULT_CODE || 'mvp-dev-bypass-2026'

export async function POST(req: NextRequest) {
  let body: unknown
  try { body = await req.json() } catch { return NextResponse.json({ error: 'invalid_json' }, { status: 400 }) }
  const { message, session_id, stream } = (body as Record<string, unknown>) || {}
  if (typeof message !== 'string' || message.length === 0) {
    return NextResponse.json({ error: 'message_required' }, { status: 400 })
  }
  if (stream === true) {
    return NextResponse.json({ error: 'streaming_not_in_s3', note: 'use /v1/mvp/chat/stream directly' }, { status: 501 })
  }

  const clientCode = req.headers.get('x-mvp-code') || ''
  const code = clientCode || DEFAULT_CODE

  const upstream = await fetch(ADAPTER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${code}`, 'X-MVP-Code': code },
    body: JSON.stringify({ message, session_id }),
    cache: 'no-store',
  }).catch(() => null as unknown as Response)

  if (!upstream) {
    return NextResponse.json({ error: 'adapter_unreachable', detail: 'Failed to reach ' + ADAPTER_URL }, { status: 502 })
  }
  const text = await upstream.text()
  return new NextResponse(text, {
    status: upstream.status,
    headers: { 'Content-Type': upstream.headers.get('content-type') || 'application/json' },
  })
}

export async function GET() {
  return NextResponse.json({ ok: true, stage: 'S5-BFF-mvp-proxy' })
}
