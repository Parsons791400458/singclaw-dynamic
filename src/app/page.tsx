'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const features = [
  { icon: '📊', title: 'Crypto 分析', desc: '实时行情、信号追踪、Paper Trading', href: '/crypto' },
  { icon: '🤖', title: 'AI 资讯', desc: '每日 AI 行业情报，5 分钟速览', href: '/blog' },
  { icon: '⭐', title: '明星匹配', desc: '品牌×艺人智能匹配引擎', href: '/stars/match' },
  { icon: '🎮', title: '游戏互动', desc: 'ShrimpFi GameFi 平台', href: '/game' },
  { icon: '📚', title: '知识库', desc: 'NPDP / 加密 / A股 知识体系', href: '/wiki' },
  { icon: '🧠', title: 'Agent 网络', desc: '20+ AI Agent 7×24h 运转', href: '/agents' },
]

export default function Home() {
  const [market, setMarket] = useState<{btc: number | null, fng: string | null}>({ btc: null, fng: null })
  
  useEffect(() => {
    // Fetch BTC price
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
      .then(r => r.json())
      .then(d => setMarket(prev => ({ ...prev, btc: d?.bitcoin?.usd })))
      .catch(() => {})
    
    // Fetch Fear & Greed Index
    fetch('https://api.alternative.me/fng/?limit=1')
      .then(r => r.json())
      .then(d => setMarket(prev => ({ ...prev, fng: d?.data?.[0]?.value })))
      .catch(() => {})
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 px-4 text-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10" />
        
        <div className="relative">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              SingClaw
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4 leading-relaxed">
            AI Agent 驱动的内容与数据平台
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
            从数据到洞察，从洞察到行动。20+ 智能体 7×24 小时运转，覆盖加密市场、AI 情报、品牌营销。
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-medium transition">
              开始使用
            </Link>
            <Link href="/login" className="px-8 py-3 border border-gray-600 hover:border-gray-400 rounded-full font-medium transition">
              登录
            </Link>
          </div>
        </div>
      </section>

      {/* Live Market Data */}
      <section className="max-w-5xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* BTC Price */}
          <div className="p-6 rounded-2xl bg-gray-900/80 border border-gray-800 text-center">
            <div className="text-3xl mb-2">₿</div>
            <div className="text-sm text-gray-400 mb-1">BTC 价格</div>
            <div className="text-2xl font-bold text-white">
              {market.btc ? `$${market.btc.toLocaleString()}` : '加载中...'}
            </div>
          </div>
          
          {/* Fear & Greed */}
          <div className="p-6 rounded-2xl bg-gray-900/80 border border-gray-800 text-center">
            <div className="text-3xl mb-2">😱</div>
            <div className="text-sm text-gray-400 mb-1">恐惧与贪婪指数</div>
            <div className="text-2xl font-bold">
              {market.fng ? (
                <span className={
                  Number(market.fng) < 25 ? 'text-red-400' :
                  Number(market.fng) < 45 ? 'text-orange-400' :
                  Number(market.fng) < 55 ? 'text-yellow-400' :
                  'text-green-400'
                }>
                  {market.fng}
                </span>
              ) : '加载中...'}
            </div>
          </div>

          {/* Platform Stats */}
          <div className="p-6 rounded-2xl bg-gray-900/80 border border-gray-800 text-center">
            <div className="text-3xl mb-2">🤖</div>
            <div className="text-sm text-gray-400 mb-1">AI Agent 运转中</div>
            <div className="text-2xl font-bold text-blue-400">20+</div>
          </div>
        </div>
      </section>

      {/* Platform Stats Bar */}
      <section className="max-w-5xl mx-auto px-4 mb-16">
        <div className="flex flex-wrap justify-center gap-8 text-center">
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">57+</div>
            <div className="text-sm text-gray-400 mt-1">Cron 定时任务</div>
          </div>
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">4</div>
            <div className="text-sm text-gray-400 mt-1">产品线并行</div>
          </div>
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">7×24h</div>
            <div className="text-sm text-gray-400 mt-1">不间断运转</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-center mb-10">六大核心能力</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(f => (
            <Link key={f.title} href={f.href}
              className="p-6 rounded-2xl bg-gray-900/80 border border-gray-800 hover:border-blue-500/50 transition group hover:bg-gray-900">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 pb-20 text-center">
        <div className="p-10 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-gray-800">
          <h3 className="text-2xl font-bold mb-4">准备好开始了？</h3>
          <p className="text-gray-400 mb-6">
            免费注册，体验 AI Agent 驱动的内容与数据平台
          </p>
          <Link href="/register" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-medium transition">
            立即注册
          </Link>
        </div>
      </section>
    </div>
  )
}
