'use client'

import { useState } from 'react'

export default function KnowledgeIntakePanel() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function submitIntake(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/knowledge/intake', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          sourceType: 'manual',
        }),
      })
      const json = await response.json()

      if (!json.ok) {
        throw new Error(json.error || '知识输入失败')
      }

      setMessage(`已铸成知识卡：${json.card.title}，主题：${json.card.theme}`)
      setTitle('')
      setContent('')
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submitIntake} className="rounded-3xl border border-amber-300/20 bg-stone-950/80 p-5 shadow-2xl shadow-amber-950/20">
      <div className="mb-4">
        <div className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/70">Input Dock</div>
        <h2 className="mt-2 text-2xl font-black text-stone-50">今日知识输入</h2>
        <p className="mt-2 text-sm leading-6 text-stone-400">
          粘贴一条材料，系统会用确定性规则先完成主题、DIKIW 和 Bloom 类型分流。
        </p>
      </div>
      <input
        value={title}
        onChange={event => setTitle(event.target.value)}
        placeholder="标题，可留空"
        className="mb-3 w-full rounded-2xl border border-stone-700 bg-stone-900 px-4 py-3 text-sm text-stone-100 outline-none transition focus:border-amber-300"
      />
      <textarea
        required
        value={content}
        onChange={event => setContent(event.target.value)}
        placeholder="输入一条学习法、交易复盘、职业材料或灵感..."
        className="min-h-36 w-full rounded-2xl border border-stone-700 bg-stone-900 px-4 py-3 text-sm leading-6 text-stone-100 outline-none transition focus:border-amber-300"
      />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          disabled={loading}
          className="rounded-full bg-amber-300 px-5 py-2.5 text-sm font-bold text-stone-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? '铸卡中...' : '自动分流并铸卡'}
        </button>
        {message && <span className="text-sm text-amber-100">{message}</span>}
      </div>
    </form>
  )
}
