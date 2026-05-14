'use client'
import { useState } from 'react'

const stages = [
  { icon: '🥚', name: '虾卵阶段', desc: '学习基础知识，完成新手任务', unlocked: true },
  { icon: '🦐', name: '幼虾阶段', desc: '掌握36计前9计，解锁进化', unlocked: false },
  { icon: '🌊', name: '成虾阶段', desc: '掌握36计前18计，开始收集', unlocked: false },
  { icon: '👑', name: '虾王阶段', desc: '全部36计精通，终极进化', unlocked: false },
]

const skillSlots = Array.from({ length: 36 }, (_, i) => ({
  num: i + 1,
  unlocked: i < 3,
  title: ['瞒天过海', '围魏救赵', '借刀杀人', '以逸待劳', '趁火打劫', '声东击西', '无中生有', '暗度陈仓', '隔岸观火', '笑里藏刀', '李代桃僵', '顺手牵羊', '打草惊蛇', '借尸还魂', '调虎离山', '欲擒故纵', '抛砖引玉', '擒贼擒王', '釜底抽薪', '浑水摸鱼', '金蝉脱壳', '关门捉贼', '远交近攻', '假道伐虢', '偷梁换柱', '指桑骂槐', '假痴不癫', '上屋抽梯', '树上开花', '反客为主', '美人计', '空城计', '反间计', '苦肉计', '连环计', '走为上'][i],
}))

export default function GamePage() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-teal-600/5 to-transparent" />
        <div className="relative z-10">
          <div className="text-7xl mb-4">🦐</div>
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">ShrimpFi</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-3">
            用真实养虾知识养数字虾。进化、收集、分享、成就。
          </p>
          <p className="text-sm text-gray-500 mb-8">Built on Base · 36计驱动的趣味养成游戏</p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">📖 36计养成</span>
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">🏆 成就系统</span>
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">🔗 On Base</span>
          </div>
        </div>
      </section>

      {/* Stages */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">📈 进化阶段</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stages.map((s, i) => (
            <div key={s.name} className={`p-6 rounded-xl text-center transition ${s.unlocked ? 'bg-emerald-500/5 border border-emerald-500/20' : 'bg-gray-900/40 border border-gray-800 opacity-60'}`}>
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="font-bold text-sm mb-1">{s.name}</h3>
              <p className="text-xs text-gray-400">{s.desc}</p>
              {s.unlocked && <span className="inline-block mt-2 text-xs text-emerald-400">✅ 已解锁</span>}
              {!s.unlocked && <span className="inline-block mt-2 text-xs text-gray-500">🔒 未解锁</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="border-t border-gray-800 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-center">📖 技能解锁问答</h2>
          <p className="text-gray-400 mb-8 text-center text-sm">通过养虾36计的问答测试，解锁新技能</p>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2">
            {skillSlots.map(s => (
              <div key={s.num} className={`p-2 rounded-lg text-center text-xs transition ${s.unlocked ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-gray-800/50 text-gray-600 border border-gray-800'}`}>
                <div className="font-bold">{s.num}</div>
                <div className="truncate mt-0.5">{s.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Subscribe */}
      <section className="border-t border-gray-800 py-16 px-4">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">📧 订阅上线通知</h2>
          <p className="text-gray-400 text-sm mb-6">GameFi 功能开发中，订阅获取第一时间上线通知</p>
          {subscribed ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              ✅ 订阅成功！上线后会通知你
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="输入邮箱地址"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition" />
              <button type="submit" className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-semibold transition">
                订阅
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-800 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center p-10 rounded-3xl bg-gradient-to-br from-emerald-600/10 to-teal-600/10 border border-gray-800">
          <h2 className="text-2xl font-bold mb-4">🎮 GameFi 即将上线</h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            养虾36计是游戏的核心知识体系。先学习36计，游戏上线后即可快速上手。
          </p>
          <a href="/blog/36" className="inline-block px-8 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-full font-semibold transition">
            先学36计 →
          </a>
        </div>
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
        </div>
        <p>© 2026 SingClaw · 养虾方法论 × 在线游戏 · Built on <a href="https://base.org" target="_blank" rel="noopener" className="text-emerald-400 hover:opacity-70 transition">Base</a></p>
      </footer>
    </div>
  )
}
