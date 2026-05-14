'use client'
import { useState } from 'react'

const coinData = [
  { coin: 'GOOGLUSDT', score: 82, price: '0.2847', chg24h: 8.3, oiChange: '+12.4%', volume: '$4.2M', scene: 'S1', status: '持仓' },
  { coin: 'SPELLUSDT', score: 78, price: '0.0001856', chg24h: 12.1, oiChange: '+8.7%', volume: '$2.8M', scene: 'S1', status: '持仓' },
  { coin: 'CHIPUSDT', score: 75, price: '0.0745', chg24h: 5.2, oiChange: '+3.1%', volume: '$1.5M', scene: 'S2', status: '观察' },
  { coin: 'BASEDUSDT', score: 72, price: '0.1445', chg24h: 11.8, oiChange: '+6.5%', volume: '$3.1M', scene: 'S1', status: '观察' },
  { coin: 'ENJUSDT', score: 70, price: '0.0312', chg24h: 3.4, oiChange: '+2.1%', volume: '$1.8M', scene: 'S2', status: '新增' },
  { coin: 'GWEIUSDT', score: 68, price: '0.1134', chg24h: 9.7, oiChange: '+15.2%', volume: '$5.6M', scene: 'S1b', status: '预警' },
  { coin: 'PENGUUSDT', score: 65, price: '0.009623', chg24h: 4.8, oiChange: '+1.8%', volume: '$2.1M', scene: 'S2', status: '观察' },
  { coin: 'AGTUSDT', score: 62, price: '0.01789', chg24h: 7.3, oiChange: '+4.2%', volume: '$1.9M', scene: 'S2', status: '观察' },
  { coin: 'RAVEUSDT', score: 58, price: '0.8534', chg24h: -2.1, oiChange: '-5.3%', volume: '$3.4M', scene: 'S0', status: '观察' },
  { coin: 'MERLUSDT', score: 55, price: '0.04012', chg24h: 1.2, oiChange: '+0.8%', volume: '$1.2M', scene: 'S0', status: '新增' },
]

const scenes = [
  { id: 'S1', label: 'S1 强看多', color: 'text-green-400' },
  { id: 'S1b', label: 'S1b 强看多变体', color: 'text-orange-400' },
  { id: 'S2', label: 'S2 蓄力', color: 'text-amber-400' },
  { id: 'S0', label: 'S0 中性', color: 'text-gray-400' },
  { id: 'S5', label: 'S5 空头回补', color: 'text-blue-400' },
  { id: 'S7', label: 'S7 多头过热', color: 'text-red-400' },
]

const statusColors: Record<string, string> = {
  '持仓': 'bg-emerald-500/12 text-emerald-400',
  '观察': 'bg-purple-500/12 text-purple-400',
  '新增': 'bg-amber-500/12 text-amber-400',
  '预警': 'bg-red-500/12 text-red-400',
}

const chainHistory = [
  { time: '04-27 16:00 BJT', scene: 'S1', score: 78, oiChange: '+12.4%', priceChange: '+3.2%', note: 'OI持续增加，大户偏多，确认看多' },
  { time: '04-27 08:00 BJT', scene: 'S2', score: 65, oiChange: '+5.1%', priceChange: '+1.1%', note: '蓄力中，OI微增，观察是否突破' },
  { time: '04-26 20:00 BJT', scene: 'S2', score: 58, oiChange: '+2.3%', priceChange: '+0.5%', note: '初步蓄力信号，OI开始回升' },
]

export default function WatchlistPage() {
  const [filter, setFilter] = useState('all')
  const [sortKey, setSortKey] = useState<'score' | 'chg24h'>('score')

  const filtered = filter === 'all' ? coinData : coinData.filter(c => c.scene === filter)
  const sorted = [...filtered].sort((a, b) => b[sortKey] - a[sortKey])

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-600/8 via-purple-600/4 to-transparent" />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">观察池</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-3">
            拉链表结构 + OI场景判定，每4h自动更新，追踪高潜力币种
          </p>
          <div className="text-sm text-gray-500">📅 最后更新: 2026-04-27 20:23 (UTC+8) · CoinGlass OI数据 + Binance</div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-800 py-6 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { val: '10', label: '观察中', color: 'text-emerald-400' },
            { val: '2', label: '持仓中', color: 'text-emerald-400' },
            { val: '1', label: '新增', color: 'text-amber-400' },
            { val: '1', label: '预警', color: 'text-red-400' },
          ].map(s => (
            <div key={s.label} className="p-4 rounded-xl bg-gray-900/50 border border-gray-800 text-center">
              <div className={`text-2xl font-black ${s.color}`}>{s.val}</div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-2 flex-wrap mb-4">
          <button onClick={() => setFilter('all')} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${filter === 'all' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30' : 'text-gray-400 border border-gray-800 hover:border-gray-600'}`}>
            全部
          </button>
          {scenes.map(s => (
            <button key={s.id} onClick={() => setFilter(s.id)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${filter === s.id ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30' : 'text-gray-400 border border-gray-800 hover:border-gray-600'}`}>
              {s.label}
            </button>
          ))}
        </div>

        {/* Scene Legend */}
        <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-800 flex gap-3 flex-wrap text-xs mb-6">
          {scenes.map(s => (
            <span key={s.id} className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full bg-current ${s.color}`} />
              <span className="text-gray-400">{s.label}</span>
            </span>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/[0.02] border-b border-gray-800">
                <th className="py-3 px-3 text-left text-xs font-semibold text-gray-400 uppercase cursor-pointer hover:text-white" onClick={() => setSortKey('score')}>
                  币种 {sortKey === 'score' && '↓'}
                </th>
                <th className="py-3 px-3 text-left text-xs font-semibold text-gray-400 uppercase">场景</th>
                <th className="py-3 px-3 text-left text-xs font-semibold text-gray-400 uppercase cursor-pointer hover:text-white" onClick={() => setSortKey('chg24h')}>
                  24h涨幅 {sortKey === 'chg24h' && '↓'}
                </th>
                <th className="py-3 px-3 text-left text-xs font-semibold text-gray-400 uppercase hidden md:table-cell">OI变化</th>
                <th className="py-3 px-3 text-left text-xs font-semibold text-gray-400 uppercase hidden lg:table-cell">成交量</th>
                <th className="py-3 px-3 text-left text-xs font-semibold text-gray-400 uppercase">状态</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(c => (
                <tr key={c.coin} className="border-b border-gray-800/50 hover:bg-white/[0.02] transition">
                  <td className="py-3 px-3 font-bold">{c.coin}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold">{c.scene}</span>
                  </td>
                  <td className={`py-3 px-3 font-semibold ${c.chg24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>{c.chg24h >= 0 ? '+' : ''}{c.chg24h}%</td>
                  <td className="py-3 px-3 text-gray-300 hidden md:table-cell">{c.oiChange}</td>
                  <td className="py-3 px-3 text-gray-400 hidden lg:table-cell">{c.volume}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${statusColors[c.status] || ''}`}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Zipper History */}
      <section className="max-w-4xl mx-auto px-4 pb-12 border-t border-gray-800 pt-12">
        <h2 className="text-2xl font-bold mb-2">📜 拉链表历史</h2>
        <p className="text-gray-400 mb-8 text-sm">币种状态演变追踪（示例：GOOGLUSDT）</p>
        <div className="relative border-l-2 border-emerald-500/30 pl-6 space-y-6">
          {chainHistory.map((h, i) => (
            <div key={i} className="relative">
              <div className={`absolute -left-[31px] w-3 h-3 rounded-full border-2 border-emerald-500 bg-gray-950 ${i === 0 ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : ''}`} />
              <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-bold">{h.time}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold">{h.scene}</span>
                  <span className="text-xs text-gray-400">Score {h.score}</span>
                </div>
                <div className="text-xs text-gray-400 mb-1">OI: {h.oiChange} · 价格: {h.priceChange}</div>
                <div className="text-xs text-gray-300">{h.note}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-10 px-4 text-center text-gray-500 text-sm">
        <p>SingClaw Crypto Alpha · 观察池 · 数据仅供参考，不构成投资建议</p>
        <p className="mt-2">每4h自动更新 | 拉链表结构 · OI场景判定</p>
      </footer>
    </div>
  )
}
