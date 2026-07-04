// /chat — SINGCLAW-MVP 聊天页 (S3)
// 调 /api/mvp-chat → FastAPI → OpenClaw agent
// session_id 存 localStorage，多轮复用
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
  const [stage, setStage] = useState('idle')
  const listRef = useRef<HTMLDivElement>(null)

  // Init session
  useEffect(() => {
    let id = ''
    try { id = localStorage.getItem(SESSION_KEY) || '' } catch { /* SSR / disabled */ }
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
  }, [turns.length, busy])

  async function send() {
    const text = input.trim()
    if (!text || busy) return
    setInput('')
    const u: Turn = { role: 'user', text, ts: Date.now() }
    setTurns((t) => [...t, u])
    setBusy(true)
    setStage('sending')
    try {
      const res = await fetch('/api/mvp-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, session_id: sessionId }),
      })
      setStage('parsing')
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setTurns((t) => [...t, {
          role: 'system',
          text: `error: HTTP ${res.status} ${typeof data === 'object' ? JSON.stringify(data) : ''}`,
          ts: Date.now(),
        }])
        return
      }
      const reply = (data && typeof data === 'object' && 'reply' in data) ? String(data.reply || '') : '(empty reply)'
      const elapsed = (data && typeof data === 'object' && 'elapsed_sec' in data) ? Number(data.elapsed_sec) : undefined
      setTurns((t) => [...t, {
        role: 'agent',
        text: reply,
        ts: Date.now(),
        meta: { session_id: data?.session_id, elapsed_sec: elapsed, raw_len: data?.raw_len },
      }])
      // Sync session_id from server (may rotate)
      if (data?.session_id && data.session_id !== sessionId) {
        setSessionId(data.session_id)
        try { localStorage.setItem(SESSION_KEY, data.session_id) } catch { /* ignore */ }
      }
      setStage('idle')
    } catch (e) {
      setTurns((t) => [...t, {
        role: 'system',
        text: 'network error: ' + (e instanceof Error ? e.message : String(e)),
        ts: Date.now(),
      }])
      setStage('idle')
    } finally {
      setBusy(false)
    }
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
          SingClaw Chat (MVP)
        </h1>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-1 rounded bg-gray-800 text-gray-300">
            session: <code>{sessionId || '...'}</code>
          </span>
          <button
            onClick={reset}
            className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300"
            type="button"
          >新会话</button>
        </div>
      </div>

      <div
        ref={listRef}
        className="flex-1 overflow-y-auto rounded-2xl bg-gray-900/60 border border-gray-800 p-4 space-y-3"
      >
        {turns.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            <p className="text-lg mb-2">👋 你好</p>
            <p className="text-sm">问点啥都行。MiniMax M3 模型，约 100-140s 给你回复。</p>
          </div>
        )}
        {turns.map((t, i) => (
          <div key={i} className={`flex ${t.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={
                'max-w-[80%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap break-words ' +
                (t.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : t.role === 'agent'
                  ? 'bg-gray-800 text-gray-100'
                  : 'bg-yellow-900/40 text-yellow-300 border border-yellow-700/50')
              }
            >
              {t.role === 'agent' && (
                <div className="text-xs text-gray-400 mb-1 flex gap-2">
                  <span>agent</span>
                  {typeof t.meta?.elapsed_sec === 'number' && (
                    <span>· {Number(t.meta.elapsed_sec).toFixed(1)}s</span>
                  )}
                </div>
              )}
              {t.text}
            </div>
          </div>
        ))}
        {busy && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-gray-800 text-gray-400 text-sm">
              <span className="inline-block animate-pulse">
                {stage === 'sending' ? '发送中…' : '解析中…'}
              </span>
              <span className="ml-2 inline-block">⏳</span>
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
        <button
          onClick={send}
          disabled={busy || !input.trim()}
          className="px-6 py-2 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium"
        >
          发送
        </button>
      </div>
      <p className="mt-2 text-center text-xs text-gray-500">
        S3 stub · 公网 API via <code>/v1/mvp/chat</code> · 单 turn 100-140s
      </p>
    </div>
  )
}