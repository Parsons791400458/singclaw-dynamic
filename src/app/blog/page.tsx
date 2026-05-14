'use client'
import { useState } from 'react'

interface Post {
  title: string
  excerpt: string
  date: string
  author: string
  tag: string
  tagLabel: string
  href: string
}

const posts: Post[] = [
  { title: '那个饭局上，我举着酒杯笑了两小时，回家路上哭了十分钟', excerpt: '你花了93.6%的社交时间，做不想做的事。开心本身就是目的。当你需要为&apos;开心&apos;找一个理由的时候，你已经不开心了。', date: '2026-04-17', author: '星哥', tag: 'social', tagLabel: '🟢 社交自由', href: '/blog/社交自由' },
  { title: '网球课第1课：正手框架与握拍基础', excerpt: '涛哥46年球龄的西班牙体系网球课第1课：正手核心框架1→2→3→4流程、45°拍面垂直对前、双反西方式握拍、单反转拍手腕调节。', date: '2026-04-22', author: '星哥', tag: 'tennis', tagLabel: '🎾 网球学习', href: '/blog/tennis-lesson1' },
  { title: 'AI写得慢？不用学了', excerpt: '搭了19个AI Agent的人，说了一句可能会得罪整个AI培训行业的话。真正的核心能力不是&apos;会用多少工具&apos;，而是&apos;知道哪些东西不需要做&apos;。', date: '2026-04-23', author: '星哥', tag: 'cognition', tagLabel: '🟣 认知觉醒', href: '/blog/AI写得慢不用学' },
  { title: '星哥的 2026-04-26 — 每日记录', excerpt: '2026-04-26 的对话、决策、团队产出与成长记录', date: '2026-04-26', author: '星哥', tag: 'journal', tagLabel: '📓 每日日志', href: '/blog/20260426' },
  { title: '星哥的 2026-04-25 — 每日记录', excerpt: '2026-04-25每日记录：8轮心跳巡检+数据治理管线R166~R168健康检查+ShrimpFi运维+14个Cron error诊断+Sprint #1进度追踪+市场状态回顾', date: '2026-04-25', author: '星哥', tag: 'journal', tagLabel: '📓 每日日志', href: '/blog/20260425' },
  { title: '网球课第2课：涛哥的架拍与分腿垫步', excerpt: '涛哥46年球龄的西班牙体系网球课第2课：架拍三要素、反手架拍、分腿垫步。细节决定上限，肌肉记忆靠高频重复。', date: '2026-04-24', author: '星哥', tag: 'tennis', tagLabel: '🎾 网球学习', href: '/blog/20260424' },
  { title: '星哥的 2026-04-23 — 每日记录', excerpt: 'NPDP Sprint#1 Retro完成率80.6%产出5项改进 | A股混沌期退潮末<2成仓位 | 数据治理管线R114三线全红诊断 | 20位明星39条动态采集 | 一人公司系统运维实录', date: '2026-04-23', author: '星哥', tag: 'journal', tagLabel: '📓 每日日志', href: '/blog/20260423' },
  { title: '星哥的 2026-04-22 — 每日记录', excerpt: '2026-04-22 的对话、决策、团队产出与成长记录', date: '2026-04-22', author: '星哥', tag: 'journal', tagLabel: '📓 每日日志', href: '/blog/20260422' },
]

const tagColors: Record<string, string> = {
  cognition: 'bg-blue-500/12 text-blue-400',
  social: 'bg-green-500/12 text-green-400',
  design: 'bg-amber-500/12 text-amber-400',
  growth: 'bg-purple-500/12 text-purple-400',
  journal: 'bg-orange-500/12 text-orange-400',
  tennis: 'bg-green-600/12 text-green-400',
}

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState('all')

  const filtered = activeTag === 'all' ? posts : posts.filter(p => p.tag === activeTag)

  const filterTags = [
    { key: 'all', label: '全部' },
    { key: 'cognition', label: '🔵 认知觉醒' },
    { key: 'social', label: '🟢 社交自由' },
    { key: 'design', label: '🟡 人生设计' },
    { key: 'growth', label: '🟣 成长系统' },
    { key: 'journal', label: '📓 每日日志' },
    { key: 'tennis', label: '🎾 网球学习' },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="py-24 px-4 text-center">
        <h1 className="text-4xl font-black mb-3">
          <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">思享录</span>
        </h1>
        <p className="text-gray-400 text-lg mb-8">交易·系统·人生设计·社交自由 —— 星哥的随笔与思考</p>

        {/* Filter bar */}
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {filterTags.map(t => (
            <button key={t.key} onClick={() => setActiveTag(t.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${activeTag === t.key ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30' : 'text-gray-400 border border-gray-800 hover:border-gray-600'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section className="max-w-3xl mx-auto px-4 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <div className="text-5xl mb-4">📝</div>
            <p>该分类暂无文章</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filtered.map((post, i) => (
              <a key={i} href={post.href}
                className="block p-6 rounded-2xl bg-gray-900/40 border border-gray-800 hover:border-gray-700 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-black/20 transition">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3 ${tagColors[post.tag] || 'bg-gray-500/12 text-gray-400'}`}>
                  {post.tagLabel}
                </span>
                <h2 className="text-xl font-bold mb-2 leading-snug">{post.title}</h2>
                <p className="text-sm text-gray-400 leading-relaxed mb-3 line-clamp-3">{post.excerpt}</p>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>📅 {post.date}</span>
                  <span>✍️ {post.author}</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-10 px-4 text-center text-gray-500 text-sm">
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          <a href="/blog/36" className="hover:text-white transition">养虾36计</a>
          <a href="/blog/24" className="hover:text-white transition">虾24章经</a>
          <a href="/blog" className="hover:text-white transition">思享录</a>
          <a href="/game" className="hover:text-white transition">ShrimpFi</a>
          <a href="/crypto" className="hover:text-white transition">Crypto Alpha</a>
          <a href="/stars" className="hover:text-white transition">明星追踪</a>
          <a href="/skills-wiki" className="hover:text-white transition">Skills Wiki</a>
          <a href="/opc-onboarding.html" className="hover:text-white transition">OPC 入门</a>
        </div>
        <p>© 2026 <a href="/" className="text-emerald-400 hover:opacity-70 transition">SingClaw</a> · 养虾方法论 × 在线游戏 · Built on <a href="https://base.org" target="_blank" rel="noopener" className="text-emerald-400 hover:opacity-70 transition">Base</a></p>
        <p className="mt-2 text-xs text-gray-600">@SingClaw</p>
      </footer>
    </div>
  )
}
