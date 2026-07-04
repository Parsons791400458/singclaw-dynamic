// /api/mvp-chat — BFF for SINGCLAW-MVP chat
// Forwards to FastAPI Adapter on 127.0.0.1:8000 (via nginx public path)
// S3 — H Sing @syberh
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 300 // 5 min — match FastAPI timeout

const ADAPTER_URL =
  process.env.SINGCLAW_ADAPTER_URL ||
  'https://app.singclaw.xyz/v1/mvp/chat'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }
  const { message, session_id, stream } = (body as Record<string, unknown>) || {}
  if (typeof message !== 'string' || message.length === 0) {
    return NextResponse.json({ error: 'message_required' }, { status: 400 })
  }
  if (stream === true) {
    return NextResponse.json(
      { error: 'streaming_not_in_s3', note: 'Use /v1/mvp/chat directly for non-streaming. SSE lands in S3.5.' },
      { status: 501 },
    )
  }

  const upstream = await fetch(ADAPTER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, session_id }),
    // Node fetch has no per-request timeout; rely on maxDuration
    cache: 'no-store',
  }).catch((err) => {
    return null as unknown as Response
  })

  if (!upstream) {
    return NextResponse.json(
      { error: 'adapter_unreachable', detail: 'Failed to reach FastAPI Adapter at ' + ADAPTER_URL },
      { status: 502 },
    )
  }

  const text = await upstream.text()
  let json: unknown = null
  try { json = JSON.parse(text) } catch { /* pass raw */ }

  return new NextResponse(typeof json === 'object' ? JSON.stringify(json) : text, {
    status: upstream.status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}

export async function GET() {
  return NextResponse.json({ ok: true, stage: 'S3-BFF-stub', upstream: ADAPTER_URL })
}