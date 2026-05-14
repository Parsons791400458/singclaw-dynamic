'use client'

import { useState } from 'react'

type PendingCard = {
  id: string
  title: string
}

type FeishuPublishPanelProps = {
  cards: PendingCard[]
}

export default function FeishuPublishPanel({ cards }: FeishuPublishPanelProps) {
  const [selected, setSelected] = useState<string[]>(cards.slice(0, 10).map(card => card.id))
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  function toggle(id: string) {
    setSelected(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  }

  async function requestPublish() {
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/knowledge/publish-feishu', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          title: '知识星图飞书发布队列',
          notes: '从知识星图飞书队列页面发起，仅记录发布请求；默认不直接执行 Hermes。',
          cardIds: selected,
        }),
      })
      const json = await response.json()

      if (!json.ok) {
        throw new Error(json.error || '发布请求失败')
      }

      setMessage(json.executed
        ? `已执行 Hermes 发布脚本：${json.script}`
        : `已记录发布请求，未执行脚本：${json.reason}`)
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-3xl border border-rose-300/20 bg-rose-950/20 p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.35em] text-rose-200/70">Feishu Queue</div>
          <h2 className="mt-2 text-2xl font-black">待发布知识卡</h2>
          <p className="mt-2 text-sm leading-6 text-rose-50/70">
            默认只记录发布请求，不直接执行 Hermes。需要真实发布时设置 `HERMES_FEISHU_PUBLISH_ENABLED=true`。
          </p>
        </div>
        <button
          type="button"
          disabled={loading || selected.length === 0}
          onClick={requestPublish}
          className="rounded-full bg-rose-300 px-5 py-2.5 text-sm font-black text-rose-950 transition hover:bg-rose-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? '排队中...' : `请求发布 ${selected.length} 张`}
        </button>
      </div>

      {message && <div className="mt-4 rounded-2xl border border-rose-300/20 bg-rose-950/50 p-3 text-sm text-rose-100">{message}</div>}

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {cards.map(card => (
          <label
            key={card.id}
            className={`rounded-2xl border p-4 transition ${
              selected.includes(card.id)
                ? 'border-rose-300/60 bg-rose-950/40'
                : 'border-white/10 bg-white/[0.03] hover:border-rose-300/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={selected.includes(card.id)}
                onChange={() => toggle(card.id)}
                className="mt-1 h-4 w-4 rounded border-rose-800 bg-rose-950"
              />
              <div className="text-sm font-bold text-rose-50">{card.title}</div>
            </div>
          </label>
        ))}
        {cards.length === 0 && <div className="text-sm text-rose-100/70">所有卡片都已有飞书链接，或当前没有卡片。</div>}
      </div>
    </div>
  )
}
