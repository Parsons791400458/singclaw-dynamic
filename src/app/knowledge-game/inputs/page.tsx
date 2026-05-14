import Link from 'next/link'
import AutomationImportPanel from './AutomationImportPanel'
import { listAutomationCandidates } from '@/lib/knowledge-game/automation'

export const dynamic = 'force-dynamic'

export default async function KnowledgeInputsPage() {
  const candidates = await listAutomationCandidates(40)
  const importedCount = candidates.filter(candidate => candidate.alreadyImported).length

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#04111d,#0f172a_48%,#0b1120)] text-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.4em] text-sky-200/70">Auto Inputs</div>
            <h1 className="mt-4 text-5xl font-black">自动知识输入</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
              这里是 Phase 2 的入口：把 Hermes、本地 Markdown 和项目文档转成可筛选候选，再由你一键导入知识卡。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/knowledge-game/cards" className="rounded-full border border-sky-300/50 px-5 py-3 text-sm font-bold text-sky-100 transition hover:bg-sky-300 hover:text-slate-950">
              查看卡片库
            </Link>
            <Link href="/knowledge-game" className="rounded-full border border-slate-600 px-5 py-3 text-sm font-bold text-slate-100 transition hover:border-sky-300">
              返回总控台
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-5">
            <div className="text-3xl font-black">{candidates.length}</div>
            <div className="mt-1 text-sm text-slate-400">扫描候选</div>
          </div>
          <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-5">
            <div className="text-3xl font-black">{importedCount}</div>
            <div className="mt-1 text-sm text-slate-400">已导入</div>
          </div>
          <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-5">
            <div className="text-3xl font-black">{Math.max(candidates.length - importedCount, 0)}</div>
            <div className="mt-1 text-sm text-slate-400">待选择</div>
          </div>
        </div>

        <div className="mt-8">
          <AutomationImportPanel candidates={candidates} />
        </div>
      </section>
    </div>
  )
}
