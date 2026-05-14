'use client'

import { useState } from 'react'

type CardOption = {
  id: string
  title: string
}

type QuestRunPanelProps = {
  questId: string
  cards: CardOption[]
}

export default function QuestRunPanel({ questId, cards }: QuestRunPanelProps) {
  const [cardId, setCardId] = useState(cards[0]?.id || '')
  const [notes, setNotes] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function submitRun(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/knowledge/quest-runs', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          questId,
          cardId: cardId || undefined,
          notes,
        }),
      })
      const json = await response.json()

      if (!json.ok) {
        throw new Error(json.error || '闯关记录失败')
      }

      setMessage(`闯关完成，获得 ${json.run.xpEarned} XP，当前 Lv.${json.progress.level}`)
      setNotes('')
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submitRun} className="rounded-3xl border border-emerald-300/20 bg-emerald-950/20 p-5">
      <label className="block text-sm text-emerald-100">
        选择本次闯关知识卡
        <select
          value={cardId}
          onChange={event => setCardId(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-emerald-700/60 bg-stone-950 px-4 py-3 text-stone-100 outline-none focus:border-emerald-300"
        >
          {cards.length === 0 && <option value="">暂无可选卡片</option>}
          {cards.map(card => <option key={card.id} value={card.id}>{card.title}</option>)}
        </select>
      </label>
      <label className="mt-4 block text-sm text-emerald-100">
        闯关记录
        <textarea
          value={notes}
          onChange={event => setNotes(event.target.value)}
          placeholder="写下你如何理解、输出或应用这张卡。Boss 战要写清适用边界。"
          className="mt-2 min-h-32 w-full rounded-2xl border border-emerald-700/60 bg-stone-950 px-4 py-3 leading-6 text-stone-100 outline-none focus:border-emerald-300"
        />
      </label>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          disabled={loading || cards.length === 0}
          className="rounded-full bg-emerald-300 px-5 py-2.5 text-sm font-bold text-emerald-950 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? '结算中...' : '完成本关'}
        </button>
        {message && <span className="text-sm text-emerald-100">{message}</span>}
      </div>
    </form>
  )
}
