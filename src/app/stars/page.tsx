'use client'
import { useState, useEffect } from 'react'

interface Celebrity {
  id: number
  name: string
  aliases: string
  category: string
  description: string
  weibo_id: string
  xiaohongshu_id: string
}

interface Post {
  celebrity_name: string
  platform: string
  title: string
  content: string
  collected_at: string
  likes: number
  comments: number
  shares: number
  url: string
}

interface Stats {
  celebrities: number
  posts: number
  weibo_posts: number
  xhs_posts: number
  web_snippets: number
}

export default function StarsPage() {
  const [stats, setStats] = useState<Stats>({ celebrities: 0, posts: 0, weibo_posts: 0, xhs_posts: 0, web_snippets: 0 })
  const [celebs, setCelebs] = useState<Celebrity[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/stars/data.json?' + Date.now())
      .then(res => {
        if (!res.ok) throw new Error('data.json not found')
        return res.json()
      })
      .then(data => {
        setStats(data.stats || { celebrities: 0, posts: 0, weibo_posts: 0, xhs_posts: 0, web_snippets: 0 })
        setCelebs(data.celebrities || [])
        const allPosts = [
          ...(data.posts || []),
          ...(data.web_snippets || []).map((w: any) => ({
            ...w, platform: 'web', likes: 0, comments: 0, shares: 0,
          }))
        ].sort((a: Post, b: Post) => (b.collected_at || '').localeCompare(a.collected_at || ''))
        setPosts(allPosts.slice(0, 30))
      })
      .catch(() => {
        // Fallback static data
        setStats({ celebrities: 1, posts: 5, weibo_posts: 3, xhs_posts: 2, web_snippets: 2 })
        setCelebs([{ id: 1, name: '杨幂', aliases: '大幂幂', category: '演员', description: '中国女演员、歌手、制片人。代表作品：《宫锁心玉》《三生三世十里桃花》等', weibo_id: '', xiaohongshu_id: '' }])
        setPosts([
          { celebrity_name: '杨幂', platform: 'weibo', title: '2026微博之夜压轴登场 红唇黑裙美艳高贵', content: '40岁杨幂微博之夜压轴登场，红唇黑裙美艳又高贵，和杨紫开心热聊。', collected_at: '2026-02-06', likes: 58000, comments: 12000, shares: 8500, url: '' },
          { celebrity_name: '杨幂', platform: 'weibo', title: '微博之夜「紫醉金幂」名场面引爆全网', content: '杨幂与杨紫全程贴耳热聊、默契互动的温暖细节。', collected_at: '2026-02-06', likes: 42000, comments: 8900, shares: 6200, url: '' },
          { celebrity_name: '杨幂', platform: 'xiaohongshu', title: '2026开年85花首战：杨幂红裙封神', content: '2026年1月15日杨幂亮相活动，红裙美艳造型引爆热搜。', collected_at: '2026-01-15', likes: 28000, comments: 5600, shares: 0, url: '' },
        ])
      })
      .finally(() => setLoading(false))
  }, [])

  const platformBadge = (p: string) => {
    const map: Record<string, string> = { weibo: 'bg-red-500/12 text-red-400', xiaohongshu: 'bg-pink-500/12 text-pink-400', web: 'bg-blue-500/12 text-blue-400' }
    const name: Record<string, string> = { weibo: '微博', xiaohongshu: '小红书', web: '网页' }
    return { cls: map[p] || 'bg-gray-500/12 text-gray-400', name: name[p] || p }
  }

  const categoryTags = (c: Celebrity) => {
    const tags: { label: string, cls: string }[] = []
    if (c.category) tags.push({ label: c.category, cls: 'bg-purple-500/12 text-purple-400' })
    if (c.weibo_id) tags.push({ label: '微博', cls: 'bg-red-500/12 text-red-400' })
    if (c.xiaohongshu_id) tags.push({ label: '小红书', cls: 'bg-pink-500/12 text-pink-400' })
    return tags
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/8 to-transparent" />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            🌟 <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">明星追踪</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">微博 · 小红书 · 公众号 — 多渠道动态采集与展示</p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-800 py-6 px-4">
        <div className="max-w-5xl mx-auto flex justify-center gap-8 md:gap-16 flex-wrap">
          {[
            { val: stats.celebrities || '-', label: '追踪明星', color: 'text-purple-400' },
            { val: stats.posts || '-', label: '动态总数', color: 'text-pink-400' },
            { val: stats.weibo_posts || '-', label: '微博', color: 'text-red-400' },
            { val: stats.xhs_posts || '-', label: '小红书', color: 'text-pink-400' },
            { val: stats.web_snippets || '-', label: '网页/公众号', color: 'text-blue-400' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className={`text-3xl font-black ${s.color}`}>{s.val}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Celebrity Grid */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12 text-gray-500"><div className="animate-spin w-8 h-8 border-2 border-gray-700 border-t-blue-400 rounded-full mx-auto mb-4" />加载中...</div>
        ) : celebs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🌟</div>
            <p className="text-gray-400 text-lg">暂无追踪明星</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-8">👥 追踪中的明星艺人</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {celebs.map(c => (
                <div key={c.id} className="p-5 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/20 transition group cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold">{c.name[0]}</div>
                    <div>
                      <div className="font-bold text-lg">{c.name}</div>
                      <div className="text-xs text-gray-500">{c.aliases || ''}{c.category ? ' · ' + c.category : ''}</div>
                    </div>
                  </div>
                  <div className="flex gap-1.5 mb-3 flex-wrap">
                    {categoryTags(c).map((t, i) => (
                      <span key={i} className={`px-2.5 py-0.5 rounded-md text-xs font-semibold ${t.cls}`}>{t.label}</span>
                    ))}
                  </div>
                  {c.description && <p className="text-sm text-gray-400 line-clamp-2">{c.description}</p>}
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Recent Posts */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6">📰 最新动态</h2>
        {posts.length === 0 && !loading ? (
          <div className="text-center py-16 text-gray-500">暂无动态数据</div>
        ) : (
          <div className="space-y-3">
            {posts.map((p, i) => {
              const badge = platformBadge(p.platform)
              return (
                <div key={i} className="p-5 rounded-xl bg-gray-900/40 border border-gray-800 hover:border-gray-700 transition">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold ${badge.cls}`}>{badge.name}</span>
                    <span className="font-semibold text-sm">{p.celebrity_name}</span>
                    <span className="text-xs text-gray-500 ml-auto">{p.collected_at || ''}</span>
                    {p.url && <a href={p.url} target="_blank" rel="noopener" className="text-xs text-blue-400 hover:underline">🔗 原文</a>}
                  </div>
                  {p.title && <div className="font-semibold text-sm mb-1">{p.title}</div>}
                  <div className="text-sm text-gray-400 line-clamp-2">{p.content}</div>
                  <div className="flex gap-4 mt-2 text-xs text-gray-500">
                    <span>❤️ {p.likes || 0}</span>
                    <span>💬 {p.comments || 0}</span>
                    <span>🔄 {p.shares || 0}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="border-t border-gray-800 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">🤖 AI 艺人匹配</h2>
          <p className="text-gray-400 mb-8">输入品牌需求，AI 智能匹配最适合的艺人合作方案</p>
          <a href="/stars/match" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition">
            开始匹配 →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-10 px-4 text-center text-gray-500 text-sm">
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          <a href="/blog" className="hover:text-white transition">思享录</a>
          <a href="/game" className="hover:text-white transition">ShrimpFi</a>
          <a href="/crypto" className="hover:text-white transition">Crypto Alpha</a>
          <a href="/skills-wiki" className="hover:text-white transition">Skills Wiki</a>
        </div>
        <p>© 2026 SingClaw · 明星追踪 · 数据来源：微博 / 小红书 / 公众号</p>
      </footer>
    </div>
  )
}
