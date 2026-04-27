import Link from 'next/link'

export default function Home() {
  const features = [
    { icon: '📊', title: 'Crypto 分析', desc: '实时行情、信号追踪、Paper Trading', href: '/crypto' },
    { icon: '🤖', title: 'AI 资讯', desc: '每日 AI 行业情报，5 分钟速览', href: '/blog' },
    { icon: '⭐', title: '明星匹配', desc: '品牌×艺人智能匹配引擎', href: '/stars/match' },
    { icon: '🎮', title: '游戏互动', desc: 'ShrimpFi GameFi 平台', href: '/game' },
    { icon: '📚', title: '知识库', desc: 'NPDP / 加密 / A股 知识体系', href: '/wiki' },
    { icon: '🧠', title: 'Agent 网络', desc: '20+ AI Agent 7×24h 运转', href: '/agents' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            SingClaw
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          AI Agent 驱动的内容与数据平台<br />
          从数据到洞察，从洞察到行动
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/register" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-medium transition">
            开始使用
          </Link>
          <Link href="/login" className="px-8 py-3 border border-gray-600 hover:border-gray-400 rounded-full font-medium transition">
            登录
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(f => (
            <Link key={f.title} href={f.href}
              className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-600 transition group">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
