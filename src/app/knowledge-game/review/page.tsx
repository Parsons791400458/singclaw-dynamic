import Link from 'next/link'
import ReviewForm from '../ReviewForm'
import { getKnowledgeGameSnapshot } from '@/lib/knowledge-game/store'

export const dynamic = 'force-dynamic'

const reviewRhythms = [
  {
    title: '每日 10 分钟',
    body: '清空输入队列，判断哪些只是原石，哪些值得升级为 Wiki 卡。',
  },
  {
    title: '每周主题复盘',
    body: '挑一个主题，看哪些卡被反复调用，哪些应升级为 SOP、模板或判断框架。',
  },
  {
    title: '每月体系整理',
    body: '做一次升降级：上提通用层、下沉存档、淘汰噪音，并修订分类规则。',
  },
]

export default async function KnowledgeReviewPage() {
  const snapshot = await getKnowledgeGameSnapshot()
  const dueCards = snapshot.cards
    .filter(card => card.reviewDueAt)
    .sort((a, b) => String(a.reviewDueAt).localeCompare(String(b.reviewDueAt)))
    .slice(0, 6)

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#07111f,#111827_48%,#17120b)] text-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.4em] text-cyan-200/70">Review Station</div>
            <h1 className="mt-4 text-5xl font-black">复盘补给站</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
              复盘不是怀旧，是回答保留、升级、淘汰、行动四件事。每次复盘都会推动卡片状态和 XP。
            </p>
          </div>
          <Link href="/knowledge-game" className="rounded-full border border-cyan-300/50 px-5 py-3 text-sm font-bold text-cyan-100 transition hover:bg-cyan-300 hover:text-slate-950">
            返回总控台
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {reviewRhythms.map(item => (
            <div key={item.title} className="rounded-3xl border border-slate-700/80 bg-slate-950/60 p-5">
              <h2 className="text-xl font-black">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <ReviewForm />

          <div className="rounded-3xl border border-slate-700/80 bg-slate-950/70 p-5">
            <div className="text-xs font-bold uppercase tracking-[0.35em] text-slate-500">Due Cards</div>
            <h2 className="mt-2 text-2xl font-black">优先复盘卡</h2>
            <div className="mt-5 space-y-3">
              {dueCards.map(card => (
                <Link key={card.id} href={`/knowledge-game/cards?theme=${encodeURIComponent(card.theme)}`} className="block rounded-2xl border border-slate-800 bg-white/[0.03] p-4 transition hover:border-cyan-300/50">
                  <div className="flex items-center justify-between gap-4">
                    <div className="font-bold">{card.title}</div>
                    <span className="rounded-full bg-cyan-300 px-3 py-1 text-xs font-black text-slate-950">{card.status}</span>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">{card.reviewDueAt ? card.reviewDueAt.slice(0, 10) : '未设置'} · {card.theme}</div>
                </Link>
              ))}
              {dueCards.length === 0 && <div className="rounded-2xl bg-white/[0.03] p-4 text-sm text-slate-400">暂无待复盘卡片。</div>}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-amber-300/20 bg-amber-950/20 p-5">
          <div className="text-xs font-bold uppercase tracking-[0.35em] text-amber-200/70">Recent Reviews</div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {snapshot.reviews.slice(0, 4).map(review => (
              <div key={review.id} className="rounded-2xl bg-black/20 p-4">
                <div className="text-sm font-bold">{review.focus}</div>
                <p className="mt-2 text-sm leading-6 text-amber-50/70">{review.output}</p>
                <div className="mt-3 text-xs text-amber-100/50">{review.reviewType} · {review.createdAt.slice(0, 10)}</div>
              </div>
            ))}
            {snapshot.reviews.length === 0 && <div className="text-sm text-amber-100/60">还没有复盘记录，先完成一次每日 10 分钟复盘。</div>}
          </div>
        </div>
      </section>
    </div>
  )
}
