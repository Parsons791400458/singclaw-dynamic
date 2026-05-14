export default function TeamPage() {
  const roles = [
    { name: '柯维', role: 'COO · 首席运营官', desc: '任务拆解 / 排优先级 / 分配 / 跟踪 / 验收', color: 'text-blue-400', emoji: '📋' },
    { name: '小链', role: '全栈开发工程师', desc: 'SingClaw 动态平台 / Next.js / API 集成', color: 'text-emerald-400', emoji: '💻' },
    { name: '小测', role: 'QA 质量保障', desc: '三级质量门 / 冒烟测试 / 回归检测', color: 'text-purple-400', emoji: '🧪' },
    { name: '小美', role: 'UI/UX 设计师', desc: '视觉诊断 / 设计系统 / 用户体验优化', color: 'text-pink-400', emoji: '🎨' },
    { name: '小虾编', role: '内容主编', desc: '内容策划 / 养虾36计 / 24章经 / 思享录', color: 'text-amber-400', emoji: '✍️' },
    { name: '小SEO', role: '搜索引擎优化', desc: 'SEO 诊断 / 标签优化 / 内链建设 / JSON-LD', color: 'text-green-400', emoji: '🔍' },
    { name: '小采', role: '数据采集', desc: 'Binance 行情 / CoinGlass OI / 恐贪指数采集', color: 'text-cyan-400', emoji: '📡' },
    { name: '小验', role: '数据校验', desc: 'Ticker 校验 / 异常检测 / 数据健康监控', color: 'text-orange-400', emoji: '✅' },
    { name: '小运', role: '社区运营', desc: 'ShrimpFi 社区 / Twitter / 即刻 / 小红书', color: 'text-indigo-400', emoji: '📱' },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Agent Team</div>
          <h1 className="text-5xl font-black mb-4">👥 团队介绍</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">SingClaw AI Agent 团队 — 9 个角色各司其职，协同运营四大产品线</p>
        </div>

        {/* Org Chart */}
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-gray-800 text-center">
          <div className="text-sm text-gray-400 mb-2">组织架构</div>
          <div className="text-lg">
            <span className="text-blue-400 font-bold">柯维（COO）</span>
            <span className="text-gray-600 mx-3">→</span>
            <span className="text-gray-400">小链 · 小测 · 小美 · 小虾编 · 小SEO · 小采 · 小验 · 小运</span>
          </div>
          <div className="text-xs text-gray-500 mt-3">1 人类创始人 + 9 AI Agent + 57+ Cron + 4 条产品线</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map(r => (
            <div key={r.name} className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 hover:border-gray-700 transition group">
              <div className="text-3xl mb-3">{r.emoji}</div>
              <h2 className="text-lg font-bold mb-1">{r.name}</h2>
              <p className={`${r.color} text-sm font-semibold mb-2`}>{r.role}</p>
              <p className="text-gray-500 text-xs">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '20+', label: 'AI Agent 总数', color: 'text-blue-400' },
            { val: '57+', label: 'Cron 定时任务', color: 'text-emerald-400' },
            { val: '4', label: '产品线', color: 'text-purple-400' },
            { val: '24/7', label: '自动运转', color: 'text-amber-400' },
          ].map(s => (
            <div key={s.label} className="p-5 rounded-xl bg-gray-900/40 border border-gray-800 text-center">
              <div className={`text-3xl font-black ${s.color}`}>{s.val}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
