import Link from 'next/link'
import KnowledgeIntakePanel from './KnowledgeIntakePanel'
import { dikiwArtifactLabel, KNOWLEDGE_STATUSES, statusOrder } from '@/lib/knowledge-game/types'
import { getKnowledgeGameSnapshot } from '@/lib/knowledge-game/store'

export const dynamic = 'force-dynamic'

const phaseCards = [
  {
    phase: 'Phase 1',
    title: '方法论底座',
    body: '角色、学习飞轮、知识漏洞、计划、输入、沉淀、复盘与实战已经被沉淀为种子卡。',
  },
  {
    phase: 'Phase 2',
    title: '正式知识输入',
    body: '任何手动灵感、PDF 摘要、Hermes 缓存或飞书材料，先经 DIKIW 和主题分流再入库。',
  },
  {
    phase: 'Phase 3',
    title: '冒险闯关玩法',
    body: '卡片是道具，复盘是补给，输出和实战是 Boss 战，目标是把知识真正用起来。',
  },
]

export default async function KnowledgeGamePage() {
  const snapshot = await getKnowledgeGameSnapshot()
  const totalCards = snapshot.cards.length
  const masteredCards = snapshot.cards.filter(card => card.status === 'Mastered').length
  const reviewedCards = snapshot.cards.filter(card => card.status === 'Reviewed' || card.status === 'Mastered').length
  const averageMastery = totalCards
    ? Math.round(snapshot.cards.reduce((sum, card) => sum + card.masteryScore, 0) / totalCards)
    : 0
  const nextReview = snapshot.cards
    .filter(card => card.reviewDueAt)
    .sort((a, b) => String(a.reviewDueAt).localeCompare(String(b.reviewDueAt)))[0]
  const strongestCard = [...snapshot.cards].sort((a, b) => statusOrder[b.status] - statusOrder[a.status])[0]

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#3f2f14_0,#0c0a09_36%,#020617_100%)] text-stone-50">
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.45em] text-amber-300/80">Knowledge Star Map</div>
          <h1 className="mt-5 max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
            知识星图冒险
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-300">
            把《建立知识体系，一年顶别人十年》的方法论变成一套可玩的外脑：自动输入、DIKIW 铸卡、定期复盘、输出实战，最后打败“知识绑架者”。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/knowledge-game/map" className="rounded-full bg-amber-300 px-5 py-3 text-sm font-black text-stone-950 transition hover:bg-amber-200">
              进入星图地图
            </Link>
            <Link href="/knowledge-game/inputs" className="rounded-full border border-sky-300/60 px-5 py-3 text-sm font-bold text-sky-100 transition hover:bg-sky-300 hover:text-slate-950">
              自动输入队列
            </Link>
            <Link href="/knowledge-game/cards" className="rounded-full border border-stone-500 px-5 py-3 text-sm font-bold text-stone-100 transition hover:border-amber-300 hover:text-amber-100">
              查看知识卡
            </Link>
            <Link href="/knowledge-game/review" className="rounded-full border border-cyan-300/50 px-5 py-3 text-sm font-bold text-cyan-100 transition hover:bg-cyan-300 hover:text-slate-950">
              去复盘站
            </Link>
            <Link href="/knowledge-game/feishu" className="rounded-full border border-rose-300/50 px-5 py-3 text-sm font-bold text-rose-100 transition hover:bg-rose-300 hover:text-rose-950">
              飞书发布队列
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-amber-300/20 bg-stone-950/70 p-6 shadow-2xl shadow-amber-950/40">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-stone-400">当前冒险者</div>
              <div className="mt-2 text-4xl font-black">Lv.{snapshot.progress.level}</div>
            </div>
            <div className="rounded-2xl bg-amber-300 px-4 py-3 text-right text-stone-950">
              <div className="text-xs font-bold uppercase tracking-widest">XP</div>
              <div className="text-2xl font-black">{snapshot.progress.xp}</div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/5 p-4">
              <div className="text-2xl font-black">{totalCards}</div>
              <div className="mt-1 text-xs text-stone-400">知识卡</div>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <div className="text-2xl font-black">{reviewedCards}</div>
              <div className="mt-1 text-xs text-stone-400">已复盘</div>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <div className="text-2xl font-black">{masteredCards}</div>
              <div className="mt-1 text-xs text-stone-400">已掌握</div>
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-stone-700 bg-stone-900/80 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500">Mastery</div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-stone-800">
              <div className="h-full rounded-full bg-gradient-to-r from-amber-300 to-emerald-300" style={{ width: `${averageMastery}%` }} />
            </div>
            <div className="mt-2 text-sm text-stone-300">平均熟练度 {averageMastery}%</div>
          </div>
          {nextReview && (
            <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-950/30 p-4 text-sm leading-6 text-cyan-100">
              下次优先复盘：{nextReview.title}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-10 md:grid-cols-3">
        {phaseCards.map(card => (
          <div key={card.phase} className="rounded-3xl border border-stone-700/80 bg-stone-950/60 p-5">
            <div className="text-xs font-bold uppercase tracking-[0.35em] text-amber-300/70">{card.phase}</div>
            <h2 className="mt-3 text-xl font-black">{card.title}</h2>
            <p className="mt-3 text-sm leading-6 text-stone-400">{card.body}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-14 lg:grid-cols-[0.95fr_1.05fr]">
        <KnowledgeIntakePanel />

        <div className="rounded-3xl border border-stone-700/80 bg-stone-950/70 p-5">
          <div className="text-xs font-bold uppercase tracking-[0.35em] text-stone-500">Game Loop</div>
          <h2 className="mt-2 text-2xl font-black">知识升级路线</h2>
          <div className="mt-5 space-y-3">
            {KNOWLEDGE_STATUSES.map((status, index) => {
              const count = snapshot.cards.filter(card => card.status === status).length
              return (
                <div key={status} className="flex items-center gap-4 rounded-2xl border border-stone-800 bg-white/[0.03] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-300 font-black text-stone-950">{index + 1}</div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold">{status}</div>
                    <div className="text-sm text-stone-500">{count} 张卡在此阶段</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {strongestCard && (
        <section className="mx-auto max-w-7xl px-4 pb-16">
          <div className="rounded-[2rem] border border-emerald-300/20 bg-emerald-950/20 p-6">
            <div className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-200/70">Boss Ready Card</div>
            <h2 className="mt-3 text-3xl font-black">{strongestCard.title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-emerald-50/80">{strongestCard.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-emerald-300 px-3 py-1 font-bold text-emerald-950">{strongestCard.status}</span>
              <span className="rounded-full border border-emerald-300/40 px-3 py-1 text-emerald-100">{dikiwArtifactLabel[strongestCard.dikiwLevel]}</span>
              <span className="rounded-full border border-emerald-300/40 px-3 py-1 text-emerald-100">{strongestCard.bloomType}</span>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
