'use client'

import { useState } from 'react'
import type { AutomationCandidate } from '@/lib/knowledge-game/types'

type AutomationImportPanelProps = {
  candidates: AutomationCandidate[]
}

export default function AutomationImportPanel({ candidates }: AutomationImportPanelProps) {
  const importable = candidates.filter(candidate => !candidate.alreadyImported)
  const [selected, setSelected] = useState<string[]>(importable.slice(0, 5).map(candidate => candidate.sourceUri))
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  function toggle(uri: string) {
    setSelected(current => (
      current.includes(uri)
        ? current.filter(item => item !== uri)
        : [...current, uri]
    ))
  }

  async function importSelected() {
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/knowledge/automation-inputs', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          sourceUris: selected,
          limit: selected.length,
        }),
      })
      const json = await response.json()

      if (!json.ok) {
        throw new Error(json.error || '导入失败')
      }

      setMessage(`已导入 ${json.imported.length} 条自动输入，扫描候选 ${json.scanned} 条。`)
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-3xl border border-sky-300/20 bg-slate-950/75 p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.35em] text-sky-200/70">Automation Queue</div>
          <h2 className="mt-2 text-2xl font-black">自动输入候选</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            默认扫描 Hermes 知识系统和项目 docs，只导入摘要与来源路径，不复制长文全文。
          </p>
        </div>
        <button
          type="button"
          disabled={loading || selected.length === 0}
          onClick={importSelected}
          className="rounded-full bg-sky-300 px-5 py-2.5 text-sm font-black text-slate-950 transition hover:bg-sky-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? '导入中...' : `导入 ${selected.length} 条`}
        </button>
      </div>

      {message && <div className="mt-4 rounded-2xl border border-sky-300/20 bg-sky-950/40 p-3 text-sm text-sky-100">{message}</div>}

      <div className="mt-5 space-y-3">
        {candidates.map(candidate => (
          <label
            key={candidate.id}
            className={`block rounded-2xl border p-4 transition ${
              candidate.alreadyImported
                ? 'border-emerald-300/20 bg-emerald-950/20 opacity-70'
                : selected.includes(candidate.sourceUri)
                  ? 'border-sky-300/60 bg-sky-950/30'
                  : 'border-slate-800 bg-white/[0.03] hover:border-sky-300/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                disabled={candidate.alreadyImported}
                checked={selected.includes(candidate.sourceUri)}
                onChange={() => toggle(candidate.sourceUri)}
                className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-slate-50">{candidate.title}</h3>
                  {candidate.alreadyImported && <span className="rounded-full bg-emerald-300 px-2 py-0.5 text-xs font-black text-emerald-950">已导入</span>}
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{candidate.excerpt}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-white/5 px-3 py-1 text-slate-300">{candidate.suggestedTheme}</span>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-slate-300">{candidate.suggestedDikiwLevel}</span>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-slate-300">{candidate.suggestedBloomType}</span>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-slate-300">{candidate.modifiedAt.slice(0, 10)}</span>
                </div>
                <div className="mt-2 truncate text-xs text-slate-500">{candidate.sourceUri}</div>
              </div>
            </div>
          </label>
        ))}
        {candidates.length === 0 && (
          <div className="rounded-2xl border border-slate-800 bg-white/[0.03] p-4 text-sm text-slate-400">
            暂无自动输入候选。可以设置 `KNOWLEDGE_GAME_SCAN_ROOTS`，用分号分隔多个 Markdown 根目录。
          </div>
        )}
      </div>
    </div>
  )
}
