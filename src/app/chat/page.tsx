// /chat — SingClaw MVP 企业级 chat (S8)
// Markdown 渲染 + 真 token 流 + session 列表 + 自动滚动 + 输入体验
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

type Turn = {
  role: 'user' | 'agent' | 'system'
  text: string
  ts: number
  meta?: {
    elapsed_sec?: number
    chunks?: number
    first_token_at?: number
    session_id?: string
    mode?: string
    streamed?: boolean
  }
}

type SessionItem = {
  id: string
  title: string
  created: number
  updated: number
  turnCount: number
}

const SESSION_KEY = 'singclaw-mvp-session-id'
const SESSIONS_KEY = 'singclaw-mvp-sessions'
const PREF_KEY = 'singclaw-mvp-prefs'

type Prefs = {
  markdown: boolean
  theme: 'dark' | 'light'
  modelLabel: string
}

function newSessionId(): string {
  return 'web-' + Math.random().toString(36).slice(2, 10) + '-' + Date.now().toString(36).slice(-4)
}

function loadSessions(): SessionItem[] {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY)
    if (!raw) return []
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr : []
  } catch { return [] }
}

function saveSessions(arr: SessionItem[]) {
  try { localStorage.setItem(SESSIONS_KEY, JSON.stringify(arr.slice(0, 50))) } catch { /* ignore */ }
}

function loadPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(PREF_KEY)
    if (raw) return { markdown: true, theme: 'dark', modelLabel: 'SingClaw MVP · minimax M3', ...JSON.parse(raw) }
  } catch { /* ignore */ }
  return { markdown: true, theme: 'dark', modelLabel: 'SingClaw MVP · minimax M3' }
}

function savePrefs(p: Prefs) {
  try { localStorage.setItem(PREF_KEY, JSON.stringify(p)) } catch { /* ignore */ }
}

export default function ChatPage() {
  const [sessionId, setSessionId] = useState<string>('')
  const [turns, setTurns] = useState<Turn[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [stage, setStage] = useState('idle')
  const [streamPreview, setStreamPreview] = useState('')
  const [sessions, setSessions] = useState<SessionItem[]>([])
  const [showSidebar, setShowSidebar] = useState(false)
  const [prefs, setPrefs] = useState<Prefs>({ markdown: true, theme: 'dark', modelLabel: 'SingClaw MVP · minimax M3' })
  const [showSettings, setShowSettings] = useState(false)
  const [firstTokenAt, setFirstTokenAt] = useState<number | null>(null)
  const [turnStart, setTurnStart] = useState<number>(0)
  const listRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const firstTokenAtRef = useRef<number | null>(null)

  // Init
  useEffect(() => {
    const p = loadPrefs()
    setPrefs(p)
    const list = loadSessions()
    setSessions(list)
    let id = ''
    try { id = localStorage.getItem(SESSION_KEY) || '' } catch { /* ignore */ }
    if (!id || !list.find((s) => s.id === id)) {
      id = newSessionId()
      const fresh: SessionItem = { id, title: '新会话', created: Date.now(), updated: Date.now(), turnCount: 0 }
      const next = [fresh, ...list]
      setSessions(next)
      saveSessions(next)
      try { localStorage.setItem(SESSION_KEY, id) } catch { /* ignore */ }
    }
    setSessionId(id)
  }, [])

  // Auto-scroll only if user near bottom
  useEffect(() => {
    const el = listRef.current
    if (!el) return
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 200
    if (nearBottom) el.scrollTop = el.scrollHeight
  }, [turns.length, busy, streamPreview])

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 200) + 'px'
  }, [input])

  function switchToSession(id: string) {
    if (id === sessionId) { setShowSidebar(false); return }
    if (busy) { abortRef.current?.abort() }
    setSessionId(id)
    setTurns([])
    setStage('idle')
    setStreamPreview('')
    try { localStorage.setItem(SESSION_KEY, id) } catch { /* ignore */ }
    setShowSidebar(false)
    // Try to load history from server
    fetch(`/api/mvp-proxy?action=history&session_id=${encodeURIComponent(id)}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data && Array.isArray(data.turns)) {
          setTurns(data.turns.map((t: any) => ({ role: t.role, text: t.content, ts: t.created_at * 1000, meta: t.meta })))
        }
      })
      .catch(() => { /* silent */ })
  }

  function startNewSession() {
    if (busy) { abortRef.current?.abort() }
    const id = newSessionId()
    setSessionId(id)
    setTurns([])
    setStage('idle')
    setStreamPreview('')
    try { localStorage.setItem(SESSION_KEY, id) } catch { /* ignore */ }
    const fresh: SessionItem = { id, title: '新会话', created: Date.now(), updated: Date.now(), turnCount: 0 }
    const next = [fresh, ...sessions]
    setSessions(next)
    saveSessions(next)
    setShowSidebar(false)
  }

  function deleteSession(id: string, e: React.MouseEvent) {
    e.stopPropagation()
    const next = sessions.filter((s) => s.id !== id)
    setSessions(next)
    saveSessions(next)
    if (id === sessionId) startNewSession()
  }

  function updateSessionsList(turnCount: number, firstUserText?: string) {
    setSessions((prev) => {
      const next = prev.map((s) => {
        if (s.id !== sessionId) return s
        const title = s.title === '新会话' && firstUserText
          ? firstUserText.slice(0, 28).replace(/\n/g, ' ')
          : s.title
        return { ...s, title, updated: Date.now(), turnCount }
      })
      saveSessions(next)
      return next
    })
  }

  async function send() {
    const text = input.trim()
    if (!text || busy) return
    setInput('')
    const u: Turn = { role: 'user', text, ts: Date.now() }
    setTurns((t) => [...t, u])
    setBusy(true)
    setStage('connecting')
    setStreamPreview('')
    setFirstTokenAt(null)
    firstTokenAtRef.current = null
    const t0 = Date.now()
    setTurnStart(t0)

    updateSessionsList(turns.length + 2, text)

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
        setTurns((prev) => [...prev, { role: 'system', text: `HTTP ${res.status} — ${t.slice(0, 200) || 'connection failed'}`, ts: Date.now() }])
        setStage('error')
        setBusy(false)
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
        let idx
        while ((idx = buf.indexOf('\n\n')) !== -1) {
          const event = buf.slice(0, idx)
          buf = buf.slice(idx + 2)
          let name = 'message'
          let data = ''
          for (const line of event.split('\n')) {
            if (line.startsWith('event:')) name = line.slice(6).trim()
            else if (line.startsWith('data:')) data += line.slice(5).trim()
          }
          if (!data) continue
          try {
            const obj = JSON.parse(data)
            if (name === 'delta' && typeof obj.text === 'string') {
              finalReply += obj.text
              setStreamPreview(finalReply)
              if (firstTokenAtRef.current === null) {
                const ft = (Date.now() - t0) / 1000
                firstTokenAtRef.current = ft
                setFirstTokenAt(ft)
                setStage('streaming')
              }
            } else if (name === 'chunk' && typeof obj.text === 'string') {
              finalReply = obj.text
              setStreamPreview(finalReply)
            } else if (name === 'first_token') {
              if (typeof obj.at === 'number') {
                firstTokenAtRef.current = obj.at
                setFirstTokenAt(obj.at)
                setStage('streaming')
              }
            } else if (name === 'status' && typeof obj.phase === 'string') {
              setStage(obj.phase)
            } else if (name === 'heartbeat') {
              // no-op
            } else if (name === 'done') {
              finalReply = (typeof obj.reply === 'string') ? obj.reply : finalReply
              setTurns((prev) => [...prev, {
                role: 'agent',
                text: finalReply,
                ts: Date.now(),
                meta: {
                  elapsed_sec: obj.elapsed_sec,
                  chunks: obj.chunks,
                  first_token_at: obj.first_token_at ?? firstTokenAt ?? undefined,
                  session_id: obj.session_id,
                  mode: obj.mode,
                  streamed: true,
                },
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
            // not JSON
          }
        }
      }
      // Fallback: if stream ended but we have content and no done event was received,
      // emit the agent turn anyway so user sees the reply.
      if (finalReply.trim() && stage !== 'done') {
        setTurns((prev) => [...prev, {
          role: 'agent',
          text: finalReply,
          ts: Date.now(),
          meta: {
            elapsed_sec: (Date.now() - t0) / 1000,
            chunks: undefined,
            first_token_at: firstTokenAtRef.current ?? undefined,
            session_id: sessionId,
            mode: 'fast',
            streamed: true,
            fallback_emitted: true,
          },
        }])
        setStage('done')
      }
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') {
        setTurns((prev) => [...prev, { role: 'system', text: '已取消', ts: Date.now() }])
      } else {
        setTurns((prev) => [...prev, {
          role: 'system',
          text: '网络错误: ' + (e instanceof Error ? e.message : String(e)),
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

  function abort() { abortRef.current?.abort() }

  function togglePref<K extends keyof Prefs>(k: K, v: Prefs[K]) {
    const next = { ...prefs, [k]: v }
    setPrefs(next)
    savePrefs(next)
  }

  const stageLabel = useMemo(() => {
    switch (stage) {
      case 'idle': return '就绪'
      case 'connecting': return '连接中…'
      case 'loading_plugins': return '加载插件…'
      case 'plugins_loaded': return '插件就绪'
      case 'llm_thinking': return '思考中…'
      case 'streaming': return firstTokenAt ? `streaming · 首 token ${firstTokenAt.toFixed(1)}s` : 'streaming…'
      case 'done': return '已完成'
      case 'error': return '出错了'
      default: return stage
    }
  }, [stage, firstTokenAt])

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-950 text-gray-100">
      {/* Sidebar */}
      {showSidebar && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setShowSidebar(false)} />
          <aside className="fixed md:relative z-50 w-72 h-full bg-gray-900 border-r border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-800">
              <button
                onClick={startNewSession}
                className="w-full px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium"
              >
                + 新会话
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {sessions.length === 0 && (
                <p className="text-xs text-gray-500 text-center mt-8 px-4">还没有会话记录</p>
              )}
              {sessions.map((s) => (
                <div
                  key={s.id}
                  onClick={() => switchToSession(s.id)}
                  className={
                    'group flex items-center justify-between gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm mb-1 ' +
                    (s.id === sessionId ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800/60')
                  }
                >
                  <div className="flex-1 min-w-0">
                    <div className="truncate font-medium">{s.title || '新会话'}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {s.turnCount} 条 · {new Date(s.updated).toLocaleDateString()}
                    </div>
                  </div>
                  <button
                    onClick={(e) => deleteSession(s.id, e)}
                    className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 text-xs px-1"
                    aria-label="delete"
                  >✕</button>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-800 text-xs text-gray-500">
              <div>SingClaw MVP</div>
              <div>minimax M3 · 思考模型</div>
            </div>
          </aside>
        </>
      )}

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-800 bg-gray-900/40 backdrop-blur">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="md:hidden text-gray-400 hover:text-white px-2"
              aria-label="menu"
            >☰</button>
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="hidden md:block text-gray-400 hover:text-white px-2"
              aria-label="menu"
            >☰</button>
            <div className="min-w-0">
              <h1 className="text-base font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent truncate">
                SingClaw Chat
              </h1>
              <div className="text-xs text-gray-500 truncate">{prefs.modelLabel}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-800 text-gray-400 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> live
            </span>
            <span className="hidden md:inline px-2 py-1 rounded bg-gray-800 text-gray-400 text-xs">
              <code>{sessionId.slice(0, 16)}…</code>
            </span>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs"
              aria-label="settings"
            >⚙</button>
            <button
              onClick={startNewSession}
              className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs"
            >新会话</button>
          </div>
        </header>

        {/* Settings dropdown */}
        {showSettings && (
          <div className="absolute right-4 top-14 z-30 w-64 rounded-lg bg-gray-900 border border-gray-700 shadow-xl p-4 text-sm">
            <h3 className="font-medium mb-3 text-gray-200">偏好设置</h3>
            <label className="flex items-center justify-between mb-3">
              <span className="text-gray-300">Markdown 渲染</span>
              <input
                type="checkbox"
                checked={prefs.markdown}
                onChange={(e) => togglePref('markdown', e.target.checked)}
                className="w-4 h-4"
              />
            </label>
            <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-800">
              MVP 阶段 · 数据存浏览器本地<br />
              跨 session 偏好保留
            </p>
          </div>
        )}

        {/* Messages */}
        <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mx-auto max-w-3xl space-y-6">
            {turns.length === 0 && (
              <div className="text-center text-gray-500 mt-20">
                <div className="text-5xl mb-4">👋</div>
                <p className="text-xl mb-2 text-gray-300">你好</p>
                <p className="text-sm mb-6">SingClaw 智能助手 · minimax M3 · 真流式</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl mx-auto text-left">
                  {[
                    '帮我用一句话解释 Singleton 模式',
                    '写一个 Python 快速排序',
                    '对比 React 和 Vue 的核心差异',
                    '给我 3 个提高专注力的建议',
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => setInput(q)}
                      className="px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-300 text-sm text-left transition"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {turns.map((t, i) => (
              <div key={i} className={'flex ' + (t.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={'max-w-[85%] '}>
                  {t.role === 'agent' && (
                    <div className="flex items-center gap-2 mb-1 text-xs text-gray-500">
                      <span className="font-medium text-gray-400">SingClaw</span>
                      {typeof t.meta?.first_token_at === 'number' && (
                        <span>· 首 token {Number(t.meta.first_token_at).toFixed(1)}s</span>
                      )}
                      {typeof t.meta?.elapsed_sec === 'number' && (
                        <span>· 总 {Number(t.meta.elapsed_sec).toFixed(1)}s</span>
                      )}
                      {t.meta?.chunks !== undefined && <span>· {String(t.meta.chunks)} chunks</span>}
                    </div>
                  )}
                  {t.role === 'system' && (
                    <div className="flex items-center gap-2 mb-1 text-xs text-yellow-500">
                      <span>⚠ system</span>
                    </div>
                  )}
                  <div className={
                    'rounded-2xl px-4 py-3 text-sm leading-relaxed ' +
                    (t.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : t.role === 'agent'
                      ? 'bg-gray-800 text-gray-100'
                      : 'bg-yellow-900/30 text-yellow-200 border border-yellow-700/40')
                  }>
                    {t.role === 'agent' && prefs.markdown ? (
                      <div className="prose prose-invert prose-sm max-w-none prose-pre:bg-gray-950 prose-pre:border prose-pre:border-gray-700 prose-code:before:hidden prose-code:after:hidden prose-code:bg-gray-700/50 prose-code:px-1 prose-code:rounded">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                          {t.text || '*(空)*'}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap break-words">{t.text}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {busy && (
              <div className="flex justify-start">
                <div className="max-w-[85%]">
                  <div className="flex items-center gap-2 mb-1 text-xs text-gray-500">
                    <span className="font-medium text-gray-400">SingClaw</span>
                    <span>· {stageLabel}</span>
                  </div>
                  <div className="rounded-2xl px-4 py-3 bg-gray-800 text-gray-100 text-sm leading-relaxed">
                    {streamPreview ? (
                      prefs.markdown ? (
                        <div className="prose prose-invert prose-sm max-w-none">
                          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                            {streamPreview + ' ▍'}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap">{streamPreview}<span className="animate-pulse">▍</span></div>
                      )
                    ) : (
                      <span className="inline-flex items-center gap-1 text-gray-400">
                        <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-gray-800 bg-gray-900/40 backdrop-blur px-4 py-4">
          <div className="mx-auto max-w-3xl">
            <div className="flex gap-3 items-end">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send()
                  }
                }}
                disabled={busy}
                placeholder={busy ? `${stageLabel}…` : '问点啥都行 · Enter 发送 · Shift+Enter 换行'}
                rows={1}
                className="flex-1 rounded-2xl bg-gray-800 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none disabled:opacity-60 max-h-48"
              />
              {busy ? (
                <button
                  onClick={abort}
                  className="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white text-sm font-medium shrink-0"
                >取消</button>
              ) : (
                <button
                  onClick={send}
                  disabled={!input.trim()}
                  className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-medium shrink-0"
                >发送</button>
              )}
            </div>
            <div className="mt-2 flex justify-between items-center text-xs text-gray-600">
              <span>Enter 发送 · Shift+Enter 换行</span>
              <span>{input.length} / 4000</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}