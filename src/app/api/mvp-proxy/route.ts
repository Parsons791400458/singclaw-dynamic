// /api/mvp-proxy — BFF for SINGCLAW-MVP chat (S6 SSE-aware)
// Forwards to FastAPI Adapter on 127.0.0.1:8000 (via nginx public path)
// Both non-streaming JSON (legacy) and SSE (stream=true).
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 300

const ADAPTER_URL = process.env.SINGCLAW_ADAPTER_URL || 'https://app.singclaw.xyz/v1/mvp/chat'
const ADAPTER_STREAM_URL = ADAPTER_URL.replace('/v1/mvp/chat', '/v1/mvp/chat/stream')
const DEFAULT_CODE = process.env.MVP_DEFAULT_CODE || 'mvp-dev-bypass-2026'

export async function POST(req: NextRequest) {
  let body: unknown
  try { body = await req.json() } catch { return NextResponse.json({ error: 'invalid_json' }, { status: 400 }) }
  const { message, session_id, stream } = (body as Record<string, unknown>) || {}
  if (typeof message !== 'string' || message.length === 0) {
    return NextResponse.json({ error: 'message_required' }, { status: 400 })
  }
  const clientCode = req.headers.get('x-mvp-code') || ''
  const code = clientCode || DEFAULT_CODE

  if (stream === true) {
    // SSE relay
    const upstream = await fetch(ADAPTER_STREAM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${code}`, 'X-MVP-Code': code },
      body: JSON.stringify({ message, session_id }),
      cache: 'no-store',
      // @ts-expect-error Node 18 fetch supports duplex
      duplex: 'half',
    }).catch(() => null as unknown as Response)
    if (!upstream || !upstream.body) {
      return NextResponse.json({ error: 'adapter_unreachable' }, { status: 502 })
    }
    return new NextResponse(upstream.body, {
      status: upstream.status,
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    })
  }

  // Legacy non-stream
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
  return NextResponse.json({ ok: true, stage: 'S6-BFF-mvp-proxy', supports_stream: true })
}