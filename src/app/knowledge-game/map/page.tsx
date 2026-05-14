import Link from 'next/link'
import { getKnowledgeGameSnapshot } from '@/lib/knowledge-game/store'
import { KNOWLEDGE_THEMES } from '@/lib/knowledge-game/types'

export const dynamic = 'force-dynamic'

const islandCopy: Record<string, { title: string; tone: string; body: string }> = {
  '00_通用知识体系': {
    title: '万象灯塔岛',
    tone: 'from-amber-300/20 to-stone-900',
    body: '学习法、复盘法、信息处理、思考系统，都在这里沉淀成通用能力。',
  },
  '01_交易信号系统': {
    title: '风控礁石群',
    tone: 'from-red-300/20 to-stone-900',
    body: '交易策略、风险保护线、仓位和复盘，不求刺激，先求活下来。',
  },
  '02_信息差猎手': {
    title: '信号雾港',
    tone: 'from-sky-300/20 to-stone-900',
    body: '信息源、平台机制、内容机会和变现线索，在这里被筛成高信号。',
  },
  '03_SingClaw基建': {
    title: '机械星坞',
    tone: 'from-emerald-300/20 to-stone-900',
    body: 'Agent、自动化、部署、飞书发布链路和外脑工程能力。',
  },
  '04_职业变现库': {
    title: '职业金矿',
    tone: 'from-yellow-300/20 to-stone-900',
    body: '简历、面试、项目包装、服务设计和职业策略，最终服务变现。',
  },
  '05_生活与兴趣': {
    title: '生活花园',
    tone: 'from-lime-300/20 to-stone-900',
    body: '健康、生活质量、宠物、旅行和长期兴趣，帮系统保留人的温度。',
  },
}

export default async function KnowledgeMapPage() {
  const snapshot = await getKnowledgeGameSnapshot()

  return (
    <div className="min-h-screen bg-slate-950 text-stone-50">
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.4em] text-cyan-200/70">Adventure Map</div>
            <h1 className="mt-4 text-5xl font-black">知识星图地图</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
              六座岛屿对应 Hermes/飞书知识体系主题。每座岛都展示卡片数量、掌握度和下一关入口。
            </p>
          </div>
          <Link href="/knowledge-game" className="rounded-full border border-cyan-300/50 px-5 py-3 text-sm font-bold text-cyan-100 transition hover:bg-cyan-300 hover:text-slate-950">
            返回总控台
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {KNOWLEDGE_THEMES.map((theme, index) => {
            const cards = snapshot.cards.filter(card => card.theme === theme)
            const mastered = cards.filter(card => card.status === 'Mastered').length
            const reviewed = cards.filter(card => card.status === 'Reviewed' || card.status === 'Mastered').length
            const nextQuest = snapshot.quests[index % snapshot.quests.length]
            const copy = islandCopy[theme]

            return (
              <div key={theme} className={`rounded-[2rem] border border-white/10 bg-gradient-to-br ${copy.tone} p-6 shadow-xl shadow-black/30`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.28em] text-white/50">{theme}</div>
                    <h2 className="mt-3 text-2xl font-black">{copy.title}</h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl font-black">{index + 1}</div>
                </div>
                <p className="mt-4 min-h-16 text-sm leading-6 text-white/70">{copy.body}</p>
                <div className="mt-5 grid grid-cols-3 gap-2">
                  <div className="rounded-2xl bg-black/20 p-3">
                    <div className="text-xl font-black">{cards.length}</div>
                    <div className="text-xs text-white/50">卡片</div>
                  </div>
                  <div className="rounded-2xl bg-black/20 p-3">
                    <div className="text-xl font-black">{reviewed}</div>
                    <div className="text-xs text-white/50">复盘</div>
                  </div>
                  <div className="rounded-2xl bg-black/20 p-3">
                    <div className="text-xl font-black">{mastered}</div>
                    <div className="text-xs text-white/50">掌握</div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link href={`/knowledge-game/cards?theme=${encodeURIComponent(theme)}`} className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/20">
                    查看岛屿卡片
                  </Link>
                  {nextQuest && (
                    <Link href={`/knowledge-game/quests/${nextQuest.id}`} className="rounded-full bg-white px-4 py-2 text-xs font-black text-slate-950 transition hover:bg-cyan-100">
                      下一关：{nextQuest.title}
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
