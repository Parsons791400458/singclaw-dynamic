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
    rounds?: number
    tools_enabled?: boolean
    tool_skipped?: boolean
    turn_id?: number  // S9.5.2-D: DB rowid for tool_calls attachment
  }
  // S9.5.2-C — tool 调用历史 (本 turn 中 LLM 调用了什么工具)
  tool_calls?: ToolCall[]
}

type ToolCall = {
  round: number
  name: string  // 'web_search' | 'python_exec' | ...
  args: Record<string, any>
  result?: string
  error?: string
  elapsed_sec?: number
  // UI state (前端本地，不从后端来)
  expanded?: boolean
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

// S9.2: retry policy
const MAX_RETRIES = 3
const RETRY_DELAYS_MS = [1000, 2000, 4000]
const TRANSIENT_STATUS = new Set([502, 503, 504, 429])

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
  // S9.5.2-C — 当前 turn 中累积的 tool_call (done 时附到 agent turn)
  const currentToolCallsRef = useRef<ToolCall[]>([])

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
    // S9.5.2-D — 并行 fetch history + tools, merge tool_calls 到对应 agent turn
    Promise.all([
      fetch(`/api/mvp-proxy?action=history&session_id=${encodeURIComponent(id)}`).then((r) => r.ok ? r.json() : null).catch(() => null),
      fetch(`/api/mvp-proxy?action=tools&session_id=${encodeURIComponent(id)}&limit=200`).then((r) => r.ok ? r.json() : null).catch(() => null),
    ]).then(([historyData, toolsData]) => {
      const turns: Turn[] = []
      if (historyData && Array.isArray(historyData.turns)) {
        for (const t of historyData.turns) {
          turns.push({
            role: t.role,
            text: t.content,
            ts: (t.created_at || t.ts) * 1000,
            meta: { ...(t.meta || {}), turn_id: t.id },
          })
        }
      }
      // Merge tool_calls: 按 turn_id 分组挂到对应 agent turn
      if (toolsData && Array.isArray(toolsData.tool_calls)) {
        const toolsByTurn: Record<string, ToolCall[]> = {}
        for (const tc of toolsData.tool_calls) {
          const k = String(tc.turn_id || '')
          if (!k) continue
          if (!toolsByTurn[k]) toolsByTurn[k] = []
          toolsByTurn[k].push({
            round: tc.round,
            name: tc.name,
            args: tc.args || {},
            result: tc.result,
            error: tc.error,
            elapsed_sec: tc.elapsed_sec,
            expanded: false,
          })
        }
        for (const turn of turns) {
          const tid = turn.meta?.turn_id
          if (tid && toolsByTurn[String(tid)]) {
            turn.tool_calls = toolsByTurn[String(tid)]
            turn.meta = { ...(turn.meta || {}), rounds: toolsByTurn[String(tid)].length + 1 }
          }
        }
      }
      setTurns(turns)
    })
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
    currentToolCallsRef.current = []  // S9.5.2-C: 重置本 turn 的 tool_calls 累积
    const t0 = Date.now()
    setTurnStart(t0)

    updateSessionsList(turns.length + 2, text)

    // S9.2: retry with exponential backoff for transient errors
    let attempt = 0
    let lastError: { kind: 'http' | 'network'; detail: string } | null = null

    while (attempt <= MAX_RETRIES) {
      if (attempt > 0) {
        const delay = RETRY_DELAYS_MS[Math.min(attempt - 1, RETRY_DELAYS_MS.length - 1)]
        setStage(`重试 ${attempt}/${MAX_RETRIES} (${delay}ms 后)`)
        await new Promise<void>((resolve) => {
          const t = setTimeout(resolve, delay)
          abortRef.current?.signal.addEventListener('abort', () => { clearTimeout(t); resolve() }, { once: true })
        })
        if (abortRef.current?.signal.aborted) return
      }

      const result = await _sendAttempt(text, t0)
      if (result.kind === 'ok') return
      if (result.kind === 'abort') return
      if (result.kind === 'client_error') {
        setStage('error')
        setBusy(false)
        return
      }
      if (result.kind === 'transient') {
        lastError = { kind: 'http', detail: result.detail || '' }
        attempt++
        // Compute next delay for status message
        const nextDelay = RETRY_DELAYS_MS[Math.min(attempt - 1, RETRY_DELAYS_MS.length - 1)]
        if (result.detail?.includes('429')) {
          setStage(`请求过快 · ${nextDelay}ms 后重试 (${attempt}/${MAX_RETRIES})`)
        } else {
          setStage(`重试 ${attempt}/${MAX_RETRIES} (${nextDelay}ms 后)`)
        }
        continue
      }
      if (result.kind === 'network') {
        lastError = { kind: 'network', detail: result.detail || '' }
        attempt++
        continue
      }
    }
    // exhausted retries
    setTurns((prev) => [...prev, {
      role: 'system',
      text: `${MAX_RETRIES} 次重试后仍失败: ${lastError?.detail || 'unknown error'}. 点 ↻ 重发或检查网络.`,
      ts: Date.now(),
    }])
    setStage('error')
    setBusy(false)
  }

  async function _sendAttempt(text: string, t0: number): Promise<
    | { kind: 'ok' }
    | { kind: 'abort' }
    | { kind: 'client_error'; detail: string }
    | { kind: 'transient'; detail: string }
    | { kind: 'network'; detail: string }
  > {
    const ctrl = new AbortController()
    abortRef.current = ctrl
    let res: Response | null = null
    try {
      res = await fetch('/api/mvp-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, session_id: sessionId, stream: true }),
        signal: ctrl.signal,
      })
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') return { kind: 'abort' }
      return { kind: 'network', detail: e instanceof Error ? e.message : String(e) }
    }
    if (!res.ok) {
      const t = await res.text().catch(() => '')
      if (TRANSIENT_STATUS.has(res.status)) {
        return { kind: 'transient', detail: `HTTP ${res.status} ${t.slice(0, 100)}` }
      }
      // client error — surface immediately, no retry
      setTurns((prev) => [...prev, { role: 'system', text: `HTTP ${res!.status} — ${t.slice(0, 200) || 'request failed'}`, ts: Date.now() }])
      return { kind: 'client_error', detail: `HTTP ${res.status}` }
    }
    if (!res.body) {
      return { kind: 'network', detail: 'empty response body' }
    }
    const reader = res.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let buf = ''
    let finalReply = ''
    let doneEmitted = false
    let streamError: string | null = null
    try {
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
            } else if (name === 'tool_call') {
              // S9.5.2-C — 累积 LLM 调用工具事件
              currentToolCallsRef.current = [
                ...currentToolCallsRef.current,
                {
                  round: currentToolCallsRef.current.length + 1,
                  name: String(obj.name || '?'),
                  args: (obj.args && typeof obj.args === 'object') ? obj.args : {},
                  expanded: false,
                },
              ]
            } else if (name === 'tool_result') {
              // S9.5.2-C — 补充最近一次 tool_call 的 result / error / elapsed
              const arr = currentToolCallsRef.current
              if (arr.length > 0) {
                const last = arr[arr.length - 1]
                arr[arr.length - 1] = {
                  ...last,
                  result: typeof obj.result === 'string' ? obj.result : (last.result || ''),
                  error: typeof obj.error === 'string' ? obj.error : (last.error || ''),
                  elapsed_sec: typeof obj.elapsed === 'number' ? obj.elapsed : last.elapsed_sec,
                }
              }
            } else if (name === 'status' && typeof obj.phase === 'string') {
              setStage(obj.phase)
            } else if (name === 'heartbeat') {
              // no-op
            } else if (name === 'done') {
              doneEmitted = true
              finalReply = (typeof obj.reply === 'string') ? obj.reply : finalReply
              setTurns((prev) => [...prev, {
                role: 'agent',
                text: finalReply,
                ts: Date.now(),
                meta: {
                  elapsed_sec: obj.elapsed_sec,
                  chunks: obj.chunks,
                  first_token_at: obj.first_token_at ?? firstTokenAtRef.current ?? undefined,
                  session_id: obj.session_id,
                  mode: obj.mode,
                  streamed: true,
                  rounds: obj.rounds,
                  tools_enabled: obj.tools_enabled,
                  tool_skipped: obj.tool_skipped,
                  turn_id: typeof obj.turn_id === 'number' ? obj.turn_id : undefined,  // S9.5.2-D
                },
                tool_calls: currentToolCallsRef.current.length > 0
                  ? [...currentToolCallsRef.current]
                  : undefined,
              }])
              if (obj.session_id && obj.session_id !== sessionId) {
                setSessionId(obj.session_id)
                try { localStorage.setItem(SESSION_KEY, obj.session_id) } catch { /* ignore */ }
              }
              setStage('done')
            } else if (name === 'error') {
              streamError = JSON.stringify(obj)
            }
          } catch {
            // not JSON
          }
        }
      }
      // Fallback: if stream ended but we have content and no done event was received,
      // emit the agent turn anyway so user sees the reply.
      if (finalReply.trim() && !doneEmitted) {
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
          tool_calls: currentToolCallsRef.current.length > 0
            ? [...currentToolCallsRef.current]
            : undefined,
        }])
        setStage('done')
      }
      if (streamError && !finalReply.trim()) {
        // upstream reported error and we have nothing to show — retryable
        return { kind: 'transient', detail: streamError }
      }
      return { kind: 'ok' }
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') return { kind: 'abort' }
      return { kind: 'network', detail: e instanceof Error ? e.message : String(e) }
    }
  }

  function abort() {
    abortRef.current?.abort()
    setStreamPreview('')
    setBusy(false)
    setStage('done')
  }

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
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-300">主题</span>
              <span className="text-xs text-gray-500" title="亮色主题需要重启应用完整生效, MVP 阶段">暗色 (固定)</span>
            </div>
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
                      {typeof t.meta?.rounds === 'number' && t.meta.rounds > 1 && (
                        <span>· 🔧 {String(t.meta.rounds - 1)} tool call{String(t.meta.rounds - 1) === '1' ? '' : 's'}</span>
                      )}
                      {t.meta?.tool_skipped && (
                        <span className="text-yellow-500">· ⚠️ tool 跳过</span>
                      )}
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
                    {t.role === 'agent' && t.tool_calls && t.tool_calls.length > 0 && (
                      <ToolCallCard calls={t.tool_calls} />
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

// S9.5.2-C — 🔧 tool call 折叠/展开卡片
function ToolCallCard({ calls }: { calls: ToolCall[] }) {
  const [open, setOpen] = useState(false)
  const hasError = calls.some((c) => c.error)
  return (
    <div className="mt-3 border-t border-gray-700/60 pt-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={
          'flex items-center gap-2 text-xs font-mono transition ' +
          (hasError ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-400 hover:text-gray-200')
        }
      >
        <span>{open ? '▼' : '▶'}</span>
        <span>🔧 {calls.length} tool call{calls.length === 1 ? '' : 's'}</span>
        {hasError && <span className="text-yellow-500">⚠ 有拦截</span>}
        <span className="text-gray-600">
          {calls
            .map((c) => `${c.name} ${c.elapsed_sec !== undefined ? c.elapsed_sec.toFixed(1) + 's' : ''}`.trim())
            .join(' · ')}
        </span>
      </button>
      {open && (
        <div className="mt-2 space-y-2">
          {calls.map((c, i) => (
            <div key={i} className="rounded-lg bg-gray-900/70 border border-gray-700/40 p-2 text-xs font-mono">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-blue-400">#{c.round} {c.name}</span>
                {typeof c.elapsed_sec === 'number' && (
                  <span className="text-gray-500">· {c.elapsed_sec.toFixed(2)}s</span>
                )}
                {c.error ? (
                  <span className="text-yellow-400">· ⚠ error</span>
                ) : c.result ? (
                  <span className="text-green-500">· ✓ ok</span>
                ) : null}
              </div>
              <div className="text-gray-400 mb-1">
                <span className="text-gray-500">args:</span> {JSON.stringify(c.args, null, 0)}
              </div>
              {c.error ? (
                <pre className="text-yellow-300 whitespace-pre-wrap break-words max-h-40 overflow-auto">{c.error}</pre>
              ) : c.result ? (
                <pre className="text-gray-300 whitespace-pre-wrap break-words max-h-40 overflow-auto">{c.result}</pre>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}