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
    // S7: fast-path direct to LLM provider (skip OpenClaw CLI plugin load)
    const upstream = await fetch(ADAPTER_STREAM_URL.replace('/v1/mvp/chat/stream', '/v1/mvp/chat/fast'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${code}`, 'X-MVP-Code': code },
      body: JSON.stringify({ message, session_id }),
      cache: 'no-store',
    }).catch(() => null as unknown as Response)
    if (!upstream || !upstream.body) {
      return NextResponse.json({ error: 'adapter_unreachable' }, { status: 502 })
    }
    // S9.5.2-D-bugfix2 — 包装 upstream.body 为 TransformStream, 逐块拉 (yield upstream.body.getReader().read())
    // Next.js 14+ NextResponse 不能直接 pipe Web ReadableStream (needs duplex: 'half' which type doesn't allow),
    // 否则 SSE 流 server-side 被消费但 client 永远收不到 EOF/done, busy state 卡死.
    const upstreamReader = upstream.body.getReader()
    const wrappedStream = new ReadableStream({
      async pull(controller) {
        try {
          const { value, done } = await upstreamReader.read()
          if (done) {
            controller.close()
            return
          }
          controller.enqueue(value)
        } catch (e) {
          controller.error(e)
        }
      },
      cancel(reason) {
        upstreamReader.cancel(reason).catch(() => { /* ignore */ })
      },
    })
    return new NextResponse(wrappedStream, {
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

export async function GET(req: NextRequest) {
  const action = req.nextUrl.searchParams.get('action') || ''
  const sessionId = req.nextUrl.searchParams.get('session_id') || ''
  const code = req.headers.get('x-mvp-code') || DEFAULT_CODE

  if (action === 'history' && sessionId) {
    // S8: load session history from adapter
    const upstream = await fetch(`https://app.singclaw.xyz/v1/mvp/sessions/${encodeURIComponent(sessionId)}/history?limit=50`, {
      headers: { 'Authorization': `Bearer ${code}`, 'X-MVP-Code': code },
      cache: 'no-store',
    }).catch(() => null as unknown as Response)
    if (!upstream) {
      return NextResponse.json({ turns: [] })
    }
    const text = await upstream.text()
    try {
      const data = JSON.parse(text)
      return NextResponse.json(data)
    } catch {
      return NextResponse.json({ turns: [], raw: text.slice(0, 200) })
    }
  }

  if (action === 'tools' && sessionId) {
    // S9.5.2-C: load tool_call history for 🔧 卡片渲染
    const limit = Math.min(parseInt(req.nextUrl.searchParams.get('limit') || '50', 10) || 50, 200)
    const upstream = await fetch(`https://app.singclaw.xyz/v1/mvp/sessions/${encodeURIComponent(sessionId)}/tools?limit=${limit}`, {
      headers: { 'Authorization': `Bearer ${code}`, 'X-MVP-Code': code },
      cache: 'no-store',
    }).catch(() => null as unknown as Response)
    if (!upstream) {
      return NextResponse.json({ tool_calls: [], count: 0 })
    }
    const text = await upstream.text()
    try {
      const data = JSON.parse(text)
      return NextResponse.json(data)
    } catch {
      return NextResponse.json({ tool_calls: [], count: 0, raw: text.slice(0, 200) })
    }
  }

  return NextResponse.json({ ok: true, stage: 'S9.5.2-C-BFF-mvp-proxy', supports_stream: true, supports_history: true, supports_tools: true })
}