import Link from 'next/link'
import { notFound } from 'next/navigation'
import QuestRunPanel from './QuestRunPanel'
import { getKnowledgeGameSnapshot } from '@/lib/knowledge-game/store'
import { dikiwArtifactLabel, statusOrder } from '@/lib/knowledge-game/types'

export const dynamic = 'force-dynamic'

type QuestPageProps = {
  params: {
    id: string
  }
}

const questHints: Record<string, string[]> = {
  intake: ['这条材料解决什么问题？', '它值不值得上库？', '它应该进入哪个主题？'],
  understand: ['能否举出一个例子？', '能否用比喻解释？', '它和已有哪张卡有关？'],
  craft: ['核心观点是什么？', '行动建议是什么？', '下一次复盘什么时候发生？'],
  output: ['如果讲给小白，第一句话怎么说？', '听众会卡在哪里？', '你如何验证对方听懂了？'],
  practice: ['现实问题是什么？', '这张卡怎么指导行动？', '做完后怎么复盘？'],
  boss: ['什么时候该用这张卡？', '什么时候不该用？', '如果具体情况变了，判断如何改变？'],
}

export default async function QuestPage({ params }: QuestPageProps) {
  const snapshot = await getKnowledgeGameSnapshot()
  const quest = snapshot.quests.find(item => item.id === params.id)

  if (!quest) {
    notFound()
  }

  const eligibleCards = snapshot.cards
    .filter(card => card.theme === quest.theme)
    .filter(card => !quest.requiredStatus || statusOrder[card.status] >= statusOrder[quest.requiredStatus])
    .slice(0, 12)
  const featuredCard = eligibleCards[0]
  const hints = questHints[quest.questType] || questHints.intake

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#123329_0,#0c0a09_42%,#020617_100%)] text-stone-50">
      <section className="mx-auto max-w-6xl px-4 py-12">
        <Link href="/knowledge-game/map" className="text-sm font-bold text-emerald-200 transition hover:text-emerald-100">
          返回星图地图
        </Link>

        <div className="mt-6 rounded-[2.2rem] border border-emerald-300/20 bg-stone-950/70 p-7 shadow-2xl shadow-emerald-950/30">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.4em] text-emerald-200/70">{quest.questType} Quest</div>
              <h1 className="mt-4 text-5xl font-black">{quest.title}</h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-300">{quest.description}</p>
            </div>
            <div className="rounded-3xl bg-emerald-300 p-5 text-emerald-950">
              <div className="text-xs font-black uppercase tracking-widest">Reward</div>
              <div className="mt-2 text-3xl font-black">{quest.rewardXp} XP</div>
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-3xl border border-stone-700 bg-stone-900/70 p-5">
              <h2 className="text-xl font-black">通关提示</h2>
              <div className="mt-4 space-y-3">
                {hints.map((hint, index) => (
                  <div key={hint} className="flex gap-3 rounded-2xl bg-black/20 p-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-300 text-sm font-black text-emerald-950">{index + 1}</div>
                    <div className="text-sm leading-6 text-stone-300">{hint}</div>
                  </div>
                ))}
              </div>
            </div>

            <QuestRunPanel
              questId={quest.id}
              cards={eligibleCards.map(card => ({ id: card.id, title: card.title }))}
            />
          </div>
        </div>

        {featuredCard && (
          <div className="mt-8 rounded-[2rem] border border-stone-700 bg-stone-950/70 p-6">
            <div className="text-xs font-bold uppercase tracking-[0.35em] text-stone-500">Suggested Card</div>
            <h2 className="mt-3 text-3xl font-black">{featuredCard.title}</h2>
            <p className="mt-3 text-sm leading-7 text-stone-400">{featuredCard.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-emerald-300 px-3 py-1 font-black text-emerald-950">{featuredCard.status}</span>
              <span className="rounded-full bg-white/5 px-3 py-1 text-stone-300">{dikiwArtifactLabel[featuredCard.dikiwLevel]}</span>
              <span className="rounded-full bg-white/5 px-3 py-1 text-stone-300">{featuredCard.bloomType}</span>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
