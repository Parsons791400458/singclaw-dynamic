'use client'

import { useState } from 'react'
import { KNOWLEDGE_THEMES, type KnowledgeTheme, type ReviewType } from '@/lib/knowledge-game/types'

export default function ReviewForm() {
  const [reviewType, setReviewType] = useState<ReviewType>('daily')
  const [theme, setTheme] = useState<KnowledgeTheme | ''>('')
  const [focus, setFocus] = useState('今天输入队列里哪些内容值得升级？')
  const [output, setOutput] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function submitReview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/knowledge/review', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          reviewType,
          theme: theme || undefined,
          focus,
          output,
        }),
      })
      const json = await response.json()

      if (!json.ok) {
        throw new Error(json.error || '复盘提交失败')
      }

      setMessage(`复盘完成，当前等级 Lv.${json.progress.level}，XP ${json.progress.xp}`)
      setOutput('')
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submitReview} className="rounded-3xl border border-cyan-300/20 bg-slate-950/80 p-5 shadow-2xl shadow-cyan-950/20">
      <div className="grid gap-3 md:grid-cols-3">
        <label className="text-sm text-slate-300">
          复盘节奏
          <select
            value={reviewType}
            onChange={event => setReviewType(event.target.value as ReviewType)}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-cyan-300"
          >
            <option value="daily">每日 10 分钟</option>
            <option value="weekly">每周主题复盘</option>
            <option value="monthly">每月体系整理</option>
          </select>
        </label>
        <label className="text-sm text-slate-300 md:col-span-2">
          主题
          <select
            value={theme}
            onChange={event => setTheme(event.target.value as KnowledgeTheme | '')}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-cyan-300"
          >
            <option value="">全部主题</option>
            {KNOWLEDGE_THEMES.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
      </div>
      <label className="mt-4 block text-sm text-slate-300">
        复盘问题
        <input
          required
          value={focus}
          onChange={event => setFocus(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-cyan-300"
        />
      </label>
      <label className="mt-4 block text-sm text-slate-300">
        本轮输出
        <textarea
          required
          value={output}
          onChange={event => setOutput(event.target.value)}
          placeholder="保留什么、升级什么、淘汰什么？下一步行动是什么？"
          className="mt-2 min-h-36 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 leading-6 text-slate-100 outline-none focus:border-cyan-300"
        />
      </label>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          disabled={loading}
          className="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? '复盘写入中...' : '完成复盘并升级卡片'}
        </button>
        {message && <span className="text-sm text-cyan-100">{message}</span>}
      </div>
    </form>
  )
}
