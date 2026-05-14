'use client'

const guideCards = [
  { num: '01 · 结构', title: '每一计的统一框架', desc: '5 Why（连追根因）→ What（定义）→ Detail What（展开）→ So What（意义）→ How（举一反三）。不管读哪一计，结构都一样。' },
  { num: '02 · 命名', title: '名字不改，解释全改', desc: '三十六计的原名自带记忆点和传播性。我们不改名字，但每一计的解释都完全重写，贴合"养虾/Agent养成"场景。' },
  { num: '03 · 读法', title: '先挑感兴趣的，再系统读', desc: '不用从第一计读到最后一计。先挑你当前最需要的场景进去看，再回到目录横向补齐。' },
]

const sets = [
  { name: '第一套 · 胜战计', items: ['第一计 · 瞒天过海', '第二计 · 围魏救赵', '第三计 · 借刀杀人', '第四计 · 以逸待劳', '第五计 · 趁火打劫', '第六计 · 声东击西'] },
  { name: '第二套 · 敌战计', items: ['第七计 · 无中生有', '第八计 · 暗渡陈仓', '第九计 · 隔岸观火', '第十计 · 笑里藏刀', '第十一计 · 李代桃僵', '第十二计 · 顺手牵羊'] },
  { name: '第三套 · 攻战计', items: ['第十三计 · 打草惊蛇', '第十四计 · 借尸还魂', '第十五计 · 调虎离山', '第十六计 · 欲擒故纵', '第十七计 · 抛砖引玉', '第十八计 · 擒贼擒王'] },
  { name: '第四套 · 混战计', items: ['第十九计 · 釜底抽薪', '第二十计 · 浑水摸鱼', '第二十一计 · 金蝉脱壳', '第二十二计 · 关门捉贼', '第二十三计 · 远交近攻', '第二十四计 · 假道伐虢'] },
  { name: '第五套 · 并战计', items: ['第二十五计 · 偷梁换柱', '第二十六计 · 指桑骂槐', '第二十七计 · 假痴不癫', '第二十八计 · 上屋抽梯', '第二十九计 · 树上开花', '第三十计 · 反客为主'] },
  { name: '第六套 · 败战计', items: ['第三十一计 · 美人计', '第三十二计 · 空城计', '第三十三计 · 反间计', '第三十四计 · 苦肉计', '第三十五计 · 连环计', '第三十六计 · 走为上计'] },
]

const featured = [
  { set: '败战计 · 第三十一计', title: '美人计', desc: '给虾一个清晰、稳定、吸引人的"人设+灵魂"。这是所有养虾动作的起点——没有好的 SOUL.md，后面一切都会漂移。' },
  { set: '攻战计 · 第十七计', title: '抛砖引玉', desc: '先喂一个结构化的"砖头"，让虾吐出更高价值的"玉"。核心不是让虾自己悟，而是你先示范什么叫好输入。' },
  { set: '胜战计 · 第三计', title: '借刀杀人', desc: '不要让主虾单打独斗。学会借工具、借子Agent、借外部系统完成分工协作——这才是真正的系统养虾。' },
]

export default function Blog36Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/8 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-blue-400 mb-4">phase 1 · 主线内容模块</div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">养虾36计</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            沿用真实三十六计原名，解释完全贴合<strong className="text-white">养虾 / Agent 养成</strong>语境。<br/>
            每一计都不是一句标题，而是一篇按统一框架展开的方法论。
          </p>
        </div>
      </section>

      {/* Reading Guide */}
      <section className="border-t border-gray-800 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">阅读指南</div>
          <h2 className="text-4xl font-black mb-3 tracking-tight">先读这三段，<br/>再进入任何一计。</h2>
          <p className="text-gray-400 mb-8">理解这套内容的结构和读法，比直接翻开某一计更重要。</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {guideCards.map(c => (
              <div key={c.num} className="p-6 rounded-2xl bg-white/[0.03] border border-gray-800">
                <div className="text-xs uppercase tracking-widest text-blue-400 mb-3">{c.num}</div>
                <h3 className="font-bold text-lg mb-2">{c.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="border-t border-gray-800 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">精选推荐</div>
          <h2 className="text-4xl font-black mb-3 tracking-tight">如果只读三篇，<br/>先读这三计。</h2>
          <p className="text-gray-400 mb-8">它们分别覆盖了养虾最核心的三个层面：人设设计、输入质量、系统协作。</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featured.map(f => (
              <a key={f.title} href="#" className="block p-6 rounded-2xl bg-white/[0.04] border border-gray-800 hover:border-blue-500/20 hover:translate-y-[-4px] transition group">
                <div className="text-xs uppercase tracking-widest text-cyan-400 mb-2">{f.set}</div>
                <h3 className="font-bold text-xl mb-2 group-hover:text-blue-400 transition">{f.title} <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-500/12 text-green-400">推荐</span></h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                <span className="inline-block mt-3 text-sm font-bold text-blue-400">进入详情 →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Full Catalog */}
      <section className="border-t border-gray-800 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">完整目录</div>
          <h2 className="text-4xl font-black mb-3 tracking-tight">全部36计</h2>
          <p className="text-gray-400 mb-8">按传统六套分组。全部36计已上线，点击任意一计进入详情。</p>

          {sets.map(set => (
            <div key={set.name} className="mb-8">
              <div className="flex items-baseline gap-4 pb-3 mb-1 border-b border-gray-800">
                <span className="text-xs uppercase tracking-widest text-blue-400">{set.name.split(' · ')[0]}</span>
                <span className="text-xl font-bold">{set.name.split(' · ')[1]}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-800 rounded-xl overflow-hidden">
                {set.items.map(item => (
                  <a key={item} href="#" className="flex justify-between items-center p-5 bg-gray-950 hover:bg-white/[0.03] transition group">
                    <span className="font-semibold group-hover:text-blue-400 transition">{item}</span>
                    <span className="text-xs text-green-400">● 已上线</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-800 py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-4">下一步</div>
          <h2 className="text-4xl font-black mb-3 tracking-tight">看完策略，<br/>再看心法。</h2>
          <p className="text-gray-400 mb-8">36计解决&apos;遇到问题时用什么策略&apos;，虾24章经解决&apos;长期成长中建立什么原则&apos;。</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/blog/24" className="px-6 py-3 bg-gradient-to-r from-blue-400 to-cyan-400 text-gray-900 rounded-full font-bold hover:opacity-90 transition">进入虾24章经</a>
            <a href="/" className="px-6 py-3 border border-gray-700 rounded-full font-semibold hover:border-gray-500 transition">返回首页</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-10 px-4 text-center text-gray-500 text-sm">
        <p>© 2026 SingClaw · 养虾36计</p>
      </footer>
    </div>
  )
}
