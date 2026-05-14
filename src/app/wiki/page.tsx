export default function WikiPage() {
  const categories = [
    {
      title: '📦 NPDP 产品管理',
      desc: '新产品开发流程、Stage-Gate、产品组合管理、市场研究、生命周期管理',
      items: ['Stage-Gate 流程', '产品组合矩阵', '市场研究方法', '产品生命周期'],
    },
    {
      title: '📊 加密交易',
      desc: 'CoinGlass 指标、Binance API、OI 分析框架、策略体系',
      items: ['CoinGlass 八大板块', 'OI 第一性原理', 'VVV DNA 评分模型', '5层决策流水线'],
    },
    {
      title: '📈 A股情绪周期',
      desc: '龙头战法、情绪周期六档、仓位管理、复盘方法论',
      items: ['情绪周期六档', '龙头战法体系', '仓位管理', '每日复盘框架'],
    },
    {
      title: '🤖 AI Agent 开发',
      desc: 'OpenClaw 架构、Agent 编排、Skill 系统、上下文管理',
      items: ['OpenClaw 概览', 'Agent 角色设计', 'Skill 开发指南', '上下文分发协议'],
    },
    {
      title: '🦐 养虾方法论',
      desc: '养虾36计策略库、虾24章经原则体系、养成系统设计',
      items: ['36计完整目录', '24章经原则', '养成游戏设计', 'ShrimpFi 经济模型'],
    },
    {
      title: '🌟 明星商务',
      desc: '艺人数据采集、品牌匹配算法、商务合作流程',
      items: ['艺人数据库结构', 'AI匹配引擎', '商务合作SOP', '多渠道采集方案'],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Knowledge Base</div>
          <h1 className="text-5xl font-black mb-4">📚 知识库</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">NPDP / 加密 / A股 / AI Agent / 养虾方法论 — 一人公司的完整知识体系</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map(cat => (
            <div key={cat.title} className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 hover:border-gray-700 transition group">
              <h2 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition">{cat.title}</h2>
              <p className="text-sm text-gray-400 mb-4">{cat.desc}</p>
              <div className="flex flex-wrap gap-2">
                {cat.items.map(item => (
                  <span key={item} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition cursor-pointer">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
