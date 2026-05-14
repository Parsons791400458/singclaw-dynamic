'use client'

const guideCards = [
  { num: '01 · 定位', title: '心法库，不是技巧库', desc: '36计给你具体方法，24章经给你判断框架。方法会过时，原则不会。当你不确定该不该做一件事时，回来翻经。' },
  { num: '02 · 结构', title: '每一章独立成篇', desc: '每章都围绕一个核心原则展开，包含：为什么需要这条原则、原则是什么、怎么落地、常见误区。' },
  { num: '03 · 与36计的关系', title: '策略 × 原则 = 完整系统', desc: '36计是"术"，24章经是"道"。只有术没有道，容易走偏；只有道没有术，落不了地。' },
  { num: '04 · 读法建议', title: '先读立命章', desc: '立命章是整部经的总纲。如果只读一章，读这一章。它回答的是最根本的问题：一只虾为什么需要有使命。' },
]

const chapters = [
  { num: '第一章', name: '立命章', recommended: true },
  { num: '第二章', name: '人设章', recommended: false },
  { num: '第三章', name: '记忆章', recommended: false },
  { num: '第四章', name: '协同章', recommended: false },
  { num: '第五章', name: '复盘章', recommended: false },
  { num: '第六章', name: '边界章', recommended: false },
  { num: '第七章', name: '节律章', recommended: false },
  { num: '第八章', name: '容错章', recommended: false },
  { num: '第九章', name: '精进章', recommended: false },
  { num: '第十章', name: '取舍章', recommended: false },
  { num: '第十一章', name: '观察章', recommended: false },
  { num: '第十二章', name: '信任章', recommended: false },
  { num: '第十三章', name: '工具章', recommended: false },
  { num: '第十四章', name: '表达章', recommended: false },
  { num: '第十五章', name: '耐心章', recommended: false },
  { num: '第十六章', name: '自驱章', recommended: false },
  { num: '第十七章', name: '守拙章', recommended: false },
  { num: '第十八章', name: '破局章', recommended: false },
  { num: '第十九章', name: '敬畏章', recommended: false },
  { num: '第二十章', name: '传承章', recommended: false },
  { num: '第二十一章', name: '共生章', recommended: false },
  { num: '第二十二章', name: '归零章', recommended: false },
  { num: '第二十三章', name: '格局章', recommended: false },
  { num: '第二十四章', name: '终局章', recommended: false },
]

export default function Blog24Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/8 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-purple-400 mb-4">原则 · 认知 · 修炼</div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">虾24章经</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            如果说养虾36计解决的是<strong className="text-white">"遇到问题时用什么策略"</strong>，<br/>
            那么虾24章经解决的是<strong className="text-white">"长期成长中应建立什么原则"</strong>。
          </p>
        </div>
      </section>

      {/* Reading Guide */}
      <section className="border-t border-gray-800 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">阅读指南</div>
          <h2 className="text-4xl font-black mb-3 tracking-tight">经不是用来翻的，<br/>是用来修的。</h2>
          <p className="text-gray-400 mb-8">每一章不是知识点，而是一条长期需要反复回来看的原则。</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guideCards.map(c => (
              <div key={c.num} className="p-6 rounded-2xl bg-white/[0.03] border border-gray-800">
                <div className="text-xs uppercase tracking-widest text-purple-400 mb-3">{c.num}</div>
                <h3 className="font-bold text-lg mb-2">{c.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Catalog */}
      <section className="border-t border-gray-800 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">完整目录</div>
          <h2 className="text-4xl font-black mb-3 tracking-tight">24 章全览</h2>
          <p className="text-gray-400 mb-8">已上线的可以直接点进去。经是活的，会随着实践不断修订。</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-800 rounded-xl overflow-hidden">
            {chapters.map(ch => (
              <a key={ch.num} href="#" className="flex justify-between items-center p-5 bg-gray-950 hover:bg-white/[0.03] transition group">
                <span className="font-semibold group-hover:text-purple-400 transition">{ch.num} · {ch.name}</span>
                <div className="flex items-center gap-2">
                  {ch.recommended && <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-500/12 text-green-400">推荐</span>}
                  <span className="text-xs text-green-400">● 已上线</span>
                </div>
              </a>
            ))}
          </div>

          {/* 36 vs 24 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-gray-800">
              <h3 className="font-bold text-lg mb-3">36计 vs 24章经</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><strong className="text-white">36计</strong>：策略、方法、应对问题 → "术"</li>
                <li><strong className="text-white">24章经</strong>：原则、认知、修炼心法 → "道"</li>
                <li>两者组合才像完整的养虾成长系统</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-gray-800">
              <h3 className="font-bold text-lg mb-3">为什么是 24 章</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>24 这个数字本身有节气感、有体系感</li>
                <li>天然适合做章节式展开和长期连载</li>
                <li>不多不少，刚好覆盖养虾成长的主要维度</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-800 py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-4">下一步</div>
          <h2 className="text-4xl font-black mb-3 tracking-tight">看完心法，<br/>再看策略。</h2>
          <p className="text-gray-400 mb-8">24章经给你原则，36计给你方法。道术合一，才能真正把虾养好。</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/blog/36" className="px-6 py-3 bg-gradient-to-r from-blue-400 to-cyan-400 text-gray-900 rounded-full font-bold hover:opacity-90 transition">进入养虾36计</a>
            <a href="/" className="px-6 py-3 border border-gray-700 rounded-full font-semibold hover:border-gray-500 transition">返回首页</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-10 px-4 text-center text-gray-500 text-sm">
        <p>© 2026 SingClaw · 虾24章经</p>
      </footer>
    </div>
  )
}
