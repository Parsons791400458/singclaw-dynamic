import Link from 'next/link'
import FeishuPublishPanel from './FeishuPublishPanel'
import { getKnowledgeGameSnapshot } from '@/lib/knowledge-game/store'

export const dynamic = 'force-dynamic'

export default async function KnowledgeFeishuPage() {
  const snapshot = await getKnowledgeGameSnapshot()
  const pendingCards = snapshot.cards
    .filter(card => !card.feishuUrl)
    .map(card => ({ id: card.id, title: card.title }))
  const publishRequests = snapshot.sources
    .filter(source => source.sourceType === 'feishu_publish_request')
    .slice(0, 8)
  const publishedCards = snapshot.cards.filter(card => Boolean(card.feishuUrl))

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#190b12,#0f172a_48%,#0c0a09)] text-rose-50">
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.4em] text-rose-200/70">Publish Layer</div>
            <h1 className="mt-4 text-5xl font-black">飞书发布队列</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-rose-100/70">
              飞书仍是最终知识库层。这里负责把知识星图的卡片整理成发布请求，Hermes 发布脚本默认不自动执行。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/knowledge-game/cards" className="rounded-full border border-rose-300/50 px-5 py-3 text-sm font-bold text-rose-100 transition hover:bg-rose-300 hover:text-rose-950">
              查看卡片库
            </Link>
            <Link href="/knowledge-game" className="rounded-full border border-rose-100/20 px-5 py-3 text-sm font-bold text-rose-100 transition hover:border-rose-300">
              返回总控台
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-rose-100/10 bg-rose-950/20 p-5">
            <div className="text-3xl font-black">{pendingCards.length}</div>
            <div className="mt-1 text-sm text-rose-100/60">待发布卡片</div>
          </div>
          <div className="rounded-3xl border border-rose-100/10 bg-rose-950/20 p-5">
            <div className="text-3xl font-black">{publishRequests.length}</div>
            <div className="mt-1 text-sm text-rose-100/60">发布请求</div>
          </div>
          <div className="rounded-3xl border border-rose-100/10 bg-rose-950/20 p-5">
            <div className="text-3xl font-black">{publishedCards.length}</div>
            <div className="mt-1 text-sm text-rose-100/60">已有飞书链接</div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <FeishuPublishPanel cards={pendingCards} />

          <div className="rounded-3xl border border-rose-100/10 bg-rose-950/20 p-5">
            <div className="text-xs font-bold uppercase tracking-[0.35em] text-rose-200/70">Request Log</div>
            <h2 className="mt-2 text-2xl font-black">最近发布请求</h2>
            <div className="mt-5 space-y-3">
              {publishRequests.map(request => (
                <div key={request.id} className="rounded-2xl border border-rose-100/10 bg-black/20 p-4">
                  <div className="text-sm font-bold">{request.title}</div>
                  <div className="mt-2 text-xs leading-5 text-rose-100/50">{request.summary}</div>
                  <div className="mt-3 truncate text-xs text-rose-100/40">{request.sourceUri}</div>
                </div>
              ))}
              {publishRequests.length === 0 && (
                <div className="rounded-2xl border border-rose-100/10 bg-black/20 p-4 text-sm text-rose-100/60">
                  暂无发布请求。先选择待发布卡片生成一条请求。
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
