import Link from 'next/link'
import { getKnowledgeGameSnapshot } from '@/lib/knowledge-game/store'
import {
  BLOOM_TYPES,
  DIKIW_LEVELS,
  KNOWLEDGE_STATUSES,
  KNOWLEDGE_THEMES,
  dikiwArtifactLabel,
  type BloomType,
  type DikiwLevel,
  type KnowledgeStatus,
  type KnowledgeTheme,
} from '@/lib/knowledge-game/types'

export const dynamic = 'force-dynamic'

type CardsPageProps = {
  searchParams?: {
    theme?: string
    status?: string
    dikiw?: string
    bloom?: string
  }
}

function asTheme(value?: string): KnowledgeTheme | undefined {
  return KNOWLEDGE_THEMES.includes(value as KnowledgeTheme) ? value as KnowledgeTheme : undefined
}

function asStatus(value?: string): KnowledgeStatus | undefined {
  return KNOWLEDGE_STATUSES.includes(value as KnowledgeStatus) ? value as KnowledgeStatus : undefined
}

function asDikiw(value?: string): DikiwLevel | undefined {
  return DIKIW_LEVELS.includes(value as DikiwLevel) ? value as DikiwLevel : undefined
}

function asBloom(value?: string): BloomType | undefined {
  return BLOOM_TYPES.includes(value as BloomType) ? value as BloomType : undefined
}

function filterHref(key: string, value: string) {
  return `/knowledge-game/cards?${key}=${encodeURIComponent(value)}`
}

export default async function KnowledgeCardsPage({ searchParams }: CardsPageProps) {
  const snapshot = await getKnowledgeGameSnapshot()
  const theme = asTheme(searchParams?.theme)
  const status = asStatus(searchParams?.status)
  const dikiw = asDikiw(searchParams?.dikiw)
  const bloom = asBloom(searchParams?.bloom)
  const cards = snapshot.cards.filter(card => {
    if (theme && card.theme !== theme) return false
    if (status && card.status !== status) return false
    if (dikiw && card.dikiwLevel !== dikiw) return false
    if (bloom && card.bloomType !== bloom) return false
    return true
  })

  return (
    <div className="min-h-screen bg-stone-950 text-stone-50">
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.4em] text-amber-300/70">Wiki Cards</div>
            <h1 className="mt-4 text-5xl font-black">知识卡片库</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-400">
              这里展示 DIKIW、Bloom 类型、角色、主题、复盘时间和 Feishu URL。卡片不是收藏品，是闯关道具。
            </p>
          </div>
          <Link href="/knowledge-game" className="rounded-full border border-amber-300/50 px-5 py-3 text-sm font-bold text-amber-100 transition hover:bg-amber-300 hover:text-stone-950">
            返回总控台
          </Link>
        </div>

        <div className="mt-8 grid gap-3 rounded-3xl border border-stone-800 bg-stone-900/40 p-4 lg:grid-cols-4">
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-stone-500">主题</div>
            <div className="flex flex-wrap gap-2">
              {KNOWLEDGE_THEMES.map(item => (
                <Link key={item} href={filterHref('theme', item)} className={`rounded-full px-3 py-1.5 text-xs transition ${theme === item ? 'bg-amber-300 text-stone-950' : 'bg-white/5 text-stone-300 hover:bg-white/10'}`}>
                  {item.replace(/^\d+_/, '')}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-stone-500">状态</div>
            <div className="flex flex-wrap gap-2">
              {KNOWLEDGE_STATUSES.map(item => (
                <Link key={item} href={filterHref('status', item)} className={`rounded-full px-3 py-1.5 text-xs transition ${status === item ? 'bg-cyan-300 text-slate-950' : 'bg-white/5 text-stone-300 hover:bg-white/10'}`}>
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-stone-500">DIKIW</div>
            <div className="flex flex-wrap gap-2">
              {DIKIW_LEVELS.map(item => (
                <Link key={item} href={filterHref('dikiw', item)} className={`rounded-full px-3 py-1.5 text-xs transition ${dikiw === item ? 'bg-emerald-300 text-emerald-950' : 'bg-white/5 text-stone-300 hover:bg-white/10'}`}>
                  {dikiwArtifactLabel[item]}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-stone-500">Bloom</div>
            <div className="flex flex-wrap gap-2">
              {BLOOM_TYPES.map(item => (
                <Link key={item} href={filterHref('bloom', item)} className={`rounded-full px-3 py-1.5 text-xs transition ${bloom === item ? 'bg-lime-300 text-lime-950' : 'bg-white/5 text-stone-300 hover:bg-white/10'}`}>
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {cards.map(card => (
            <article key={card.id} className="rounded-[2rem] border border-stone-800 bg-stone-900/50 p-6 transition hover:border-amber-300/50">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-amber-300 px-3 py-1 font-black text-stone-950">{card.status}</span>
                <span className="rounded-full bg-white/5 px-3 py-1 text-stone-300">{dikiwArtifactLabel[card.dikiwLevel]} · {card.dikiwLevel}</span>
                <span className="rounded-full bg-white/5 px-3 py-1 text-stone-300">{card.bloomType}</span>
              </div>
              <h2 className="mt-4 text-2xl font-black">{card.title}</h2>
              <p className="mt-3 text-sm leading-7 text-stone-400">{card.summary}</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl bg-black/20 p-4">
                  <div className="text-xs text-stone-500">角色 / 主题</div>
                  <div className="mt-1 text-sm font-bold">{card.role}</div>
                  <div className="mt-1 text-xs text-stone-400">{card.theme}</div>
                </div>
                <div className="rounded-2xl bg-black/20 p-4">
                  <div className="text-xs text-stone-500">复盘 / 熟练度</div>
                  <div className="mt-1 text-sm font-bold">{card.reviewDueAt ? card.reviewDueAt.slice(0, 10) : '未设置'}</div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-stone-800">
                    <div className="h-full rounded-full bg-gradient-to-r from-amber-300 to-emerald-300" style={{ width: `${card.masteryScore}%` }} />
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm leading-6 text-stone-300">
                <span className="font-bold text-stone-100">行动建议：</span>{card.actionSuggestion || '补一次输出或复盘。'}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {card.tags.map(tag => <span key={tag} className="rounded-full border border-stone-700 px-3 py-1 text-xs text-stone-400">#{tag}</span>)}
              </div>
              {card.feishuUrl && (
                <a href={card.feishuUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-bold text-cyan-200 hover:text-cyan-100">
                  打开飞书文档
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
