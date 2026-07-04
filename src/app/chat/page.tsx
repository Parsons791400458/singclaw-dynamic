// /chat — SINGCLAW-MVP 聊天页 (S6 SSE stream)
// 通过 /api/mvp-proxy (stream=true) 走 SSE，前端 EventSource 消费
'use client'

import { useEffect, useRef, useState } from 'react'

type Turn = {
  role: 'user' | 'agent' | 'system'
  text: string
  ts: number
  meta?: Record<string, unknown>
}

const SESSION_KEY = 'singclaw-mvp-session-id'

function newSessionId(): string {
  return 'web-' + Math.random().toString(36).slice(2, 10)
}

export default function ChatPage() {
  const [sessionId, setSessionId] = useState<string>('')
  const [turns, setTurns] = useState<Turn[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [stage, setStage] = useState('idle') // idle | streaming | done | error
  const [streamPreview, setStreamPreview] = useState('') // live preview while streaming
  const listRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  // Init session
  useEffect(() => {
    let id = ''
    try { id = localStorage.getItem(SESSION_KEY) || '' } catch { /* ignore */ }
    if (!id) {
      id = newSessionId()
      try { localStorage.setItem(SESSION_KEY, id) } catch { /* ignore */ }
    }
    setSessionId(id)
  }, [])

  // Auto-scroll
  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [turns.length, busy, streamPreview])

  async function send() {
    const text = input.trim()
    if (!text || busy) return
    setInput('')
    const u: Turn = { role: 'user', text, ts: Date.now() }
    setTurns((t) => [...t, u])
    setBusy(true)
    setStage('streaming')
    setStreamPreview('')

    // SSE via fetch + ReadableStream (EventSource doesn't support POST)
    const ctrl = new AbortController()
    abortRef.current = ctrl
    try {
      const res = await fetch('/api/mvp-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, session_id: sessionId, stream: true }),
        signal: ctrl.signal,
      })
      if (!res.ok || !res.body) {
        const t = await res.text().catch(() => '')
        setTurns((prev) => [...prev, { role: 'system', text: `error: HTTP ${res.status} ${t.slice(0, 200)}`, ts: Date.now() }])
        setStage('error')
        return
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder('utf-8')
      let buf = ''
      let finalReply = ''
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        buf += decoder.decode(value, { stream: true })
        // SSE: events separated by \n\n, fields by \n
        let idx
        while ((idx = buf.indexOf('\n\n')) !== -1) {
          const event = buf.slice(0, idx)
          buf = buf.slice(idx + 2)
          // parse
          let name = 'message'
          let data = ''
          for (const line of event.split('\n')) {
            if (line.startsWith('event:')) name = line.slice(6).trim()
            else if (line.startsWith('data:')) data += line.slice(5).trim()
          }
          if (!data) continue
          try {
            const obj = JSON.parse(data)
            if (name === 'chunk' && typeof obj.text === 'string') {
              finalReply = obj.text
              setStreamPreview(finalReply)
            } else if (name === 'done') {
              finalReply = (typeof obj.reply === 'string') ? obj.reply : finalReply
              setTurns((prev) => [...prev, {
                role: 'agent',
                text: finalReply,
                ts: Date.now(),
                meta: { session_id: obj.session_id, elapsed_sec: obj.elapsed_sec, chunks: obj.chunks, streamed: true },
              }])
              if (obj.session_id && obj.session_id !== sessionId) {
                setSessionId(obj.session_id)
                try { localStorage.setItem(SESSION_KEY, obj.session_id) } catch { /* ignore */ }
              }
              setStage('done')
            } else if (name === 'error') {
              setTurns((prev) => [...prev, { role: 'system', text: `stream error: ${JSON.stringify(obj)}`, ts: Date.now() }])
              setStage('error')
            }
          } catch {
            // not JSON, ignore
          }
        }
      }
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') {
        setTurns((prev) => [...prev, { role: 'system', text: 'request aborted', ts: Date.now() }])
      } else {
        setTurns((prev) => [...prev, {
          role: 'system',
          text: 'network error: ' + (e instanceof Error ? e.message : String(e)),
          ts: Date.now(),
        }])
      }
      setStage('error')
    } finally {
      setStreamPreview('')
      setBusy(false)
      abortRef.current = null
    }
  }

  function abort() {
    abortRef.current?.abort()
  }

  function reset() {
    const id = newSessionId()
    setSessionId(id)
    try { localStorage.setItem(SESSION_KEY, id) } catch { /* ignore */ }
    setTurns([])
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          SingClaw Chat (MVP) · SSE
        </h1>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-1 rounded bg-gray-800 text-gray-300">
            session: <code>{sessionId || '...'}</code>
          </span>
          <button onClick={reset} className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300" type="button">新会话</button>
        </div>
      </div>

      <div ref={listRef} className="flex-1 overflow-y-auto rounded-2xl bg-gray-900/60 border border-gray-800 p-4 space-y-3">
        {turns.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            <p className="text-lg mb-2">👋 你好</p>
            <p className="text-sm">问点啥都行。minimax M3，约 30-110s 流式回复。</p>
          </div>
        )}
        {turns.map((t, i) => (
          <div key={i} className={`flex ${t.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={
              'max-w-[80%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap break-words ' +
              (t.role === 'user' ? 'bg-blue-600 text-white' :
               t.role === 'agent' ? 'bg-gray-800 text-gray-100' :
               'bg-yellow-900/40 text-yellow-300 border border-yellow-700/50')
            }>
              {t.role === 'agent' && (
                <div className="text-xs text-gray-400 mb-1 flex gap-2">
                  <span>agent</span>
                  {typeof t.meta?.elapsed_sec === 'number' && (
                    <span>· {Number(t.meta.elapsed_sec).toFixed(1)}s</span>
                  )}
                  {t.meta?.chunks !== undefined && <span>· {String(t.meta.chunks)} chunks</span>}
                </div>
              )}
              {t.text}
            </div>
          </div>
        ))}
        {busy && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-gray-800 text-gray-100 text-sm">
              <div className="text-xs text-gray-400 mb-1">agent · streaming…</div>
              <span>{streamPreview || '⏳ 等待 agent...'}</span>
              <span className="ml-1 inline-block animate-pulse">▍</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              send()
            }
          }}
          disabled={busy}
          placeholder={busy ? 'agent 思考中…' : '说点什么，按 Enter 发送，Shift+Enter 换行'}
          rows={2}
          className="flex-1 rounded-2xl bg-gray-900 border border-gray-700 px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none disabled:opacity-50"
        />
        {busy ? (
          <button onClick={abort} className="px-6 py-2 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-medium">取消</button>
        ) : (
          <button onClick={send} disabled={!input.trim()} className="px-6 py-2 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium">发送</button>
        )}
      </div>
      <p className="mt-2 text-center text-xs text-gray-500">
        S6 SSE · 流式 chunk 推送 · 真 turn 30-110s
      </p>
    </div>
  )
}