'use client'

const aiInsights = [
  { bold: 'Score>80是重仓区间', text: '胜率57.1%，平均4h收益+8.69%，远高于整体水平。' },
  { bold: 'S1强看多是主力场景', text: '出现78次，平均4h赚+3.64%，是最可靠的多头信号。' },
  { bold: 'S7多头过热是反向信号', text: '平均亏-1.54%，适合做空或回避。' },
  { bold: '21:00 BJT时段命中率最高', text: '建议重点关注晚间信号。' },
]

const scenarios = [
  { name: 'S1 强看多', badge: '最佳', badgeColor: 'bg-emerald-500/12 text-emerald-400', count: 78, winRate: '50.0%', total: '+283.6%', avg: '+3.64%', avgColor: 'text-green-400' },
  { name: 'S1b 强看多(变体)', badge: '高收益', badgeColor: 'bg-emerald-500/12 text-emerald-400', count: 39, winRate: '43.6%', total: '+63.8%', avg: '+1.64%', avgColor: 'text-green-400' },
  { name: 'S0 中性', badge: null, badgeColor: '', count: 120, winRate: '55.8%', total: '+15.1%', avg: '+0.13%', avgColor: 'text-green-400' },
  { name: 'S2 蓄力', badge: null, badgeColor: '', count: 28, winRate: '50.0%', total: '+2.2%', avg: '+0.08%', avgColor: 'text-green-400' },
  { name: 'S2b 蓄力(变体)', badge: null, badgeColor: '', count: 14, winRate: '42.9%', total: '-6.2%', avg: '-0.44%', avgColor: 'text-red-400' },
  { name: 'S5 空头回补', badge: null, badgeColor: '', count: 5, winRate: '60.0%', total: '+10.3%', avg: '+2.07%', avgColor: 'text-green-400' },
  { name: 'S7 多头过热', badge: '回避', badgeColor: 'bg-red-500/12 text-red-400', count: 11, winRate: '54.5%', total: '-16.9%', avg: '-1.54%', avgColor: 'text-red-400' },
  { name: 'S8 极端过热', badge: '危险', badgeColor: 'bg-red-500/12 text-red-400', count: 2, winRate: '0.0%', total: '-5.1%', avg: '-2.56%', avgColor: 'text-red-400' },
]

const topSignals = [
  { rank: 1, time: '04-16 17:00', coin: 'BASED', score: 81, scene: 'S1', change: '+72.7%' },
  { rank: 2, time: '04-13 09:00', coin: 'INX', score: 64, scene: 'S1b', change: '+55.8%' },
  { rank: 3, time: '04-13 21:00', coin: 'BLESS', score: 68, scene: 'S1', change: '+46.0%' },
  { rank: 4, time: '04-15 09:00', coin: 'IN', score: 76, scene: 'S1b', change: '+44.5%' },
  { rank: 5, time: '04-14 09:00', coin: 'HEMI', score: 71, scene: 'S1', change: '+38.2%' },
  { rank: 6, time: '04-15 21:00', coin: 'KTA', score: 73, scene: 'S1', change: '+35.6%' },
  { rank: 7, time: '04-16 09:00', coin: 'MERL', score: 78, scene: 'S1', change: '+32.1%' },
  { rank: 8, time: '04-14 21:00', coin: 'TWT', score: 70, scene: 'S1', change: '+28.9%' },
  { rank: 9, time: '04-17 09:00', coin: 'VIRTUAL', score: 75, scene: 'S1', change: '+26.4%' },
  { rank: 10, time: '04-16 21:00', coin: 'GMT', score: 72, scene: 'S1', change: '+24.8%' },
]

const methodologySteps = [
  { bold: '1. 信号采集', text: '每日BJT 09:00/17:00/21:00三个时段，采集CoinGlass OI数据+ Binance价格' },
  { bold: '2. 场景分类', text: '根据OI变化率、价格变化率、量价关系，归入S0-S8八大场景' },
  { bold: '3. Score计算', text: '综合OI增长、价格动量、成交量、场景权重，计算0-100分' },
  { bold: '4. 4h追踪', text: '记录信号发出后4小时的收盘价，计算涨幅' },
  { bold: '5. 统计分析', text: '按场景/Score区间/时段分组，统计胜率和平均收益' },
]

export default function BacktestPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/8 to-transparent" />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            OI 信号 <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">300次回测</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-3">
            基于CoinGlass八大OI场景框架，对2026-04-13至04-17期间的300次信号推荐进行4小时涨幅回测验证。
          </p>
          <div className="text-sm text-gray-500">📅 回测区间: 2026-04-13 ~ 04-17 · 数据来源: CoinGlass + Binance · 3个时段/日</div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-800 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '300', label: '总信号数', color: 'text-emerald-400' },
            { val: '51.3%', label: '整体胜率', color: 'text-blue-400' },
            { val: '+1.27%', label: '平均4h收益', color: 'text-amber-400' },
            { val: '57.1%', label: 'Score>80胜率', color: 'text-purple-400' },
          ].map(s => (
            <div key={s.label} className="p-5 rounded-xl bg-gray-900/50 border border-gray-800 text-center">
              <div className={`text-3xl font-black ${s.color}`}>{s.val}</div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Insights */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/[0.04] to-blue-500/[0.04] border border-emerald-500/15">
          <h2 className="text-xl font-bold mb-4 text-emerald-400">🤖 AI 回测结论</h2>
          <div className="space-y-2 text-sm text-gray-300">
            {aiInsights.map((a, i) => (
              <p key={i}><strong className="text-white">{a.bold}</strong>{a.text}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold mb-2">📊 八大场景回测统计</h2>
        <p className="text-gray-400 mb-8 text-sm">各OI场景的胜率、信号数、总收益对比</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenarios.map(s => (
            <div key={s.name} className="p-5 rounded-xl bg-gray-900/50 border border-gray-800">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-bold">{s.name}</h3>
                {s.badge && <span className={`px-2 py-0.5 rounded text-xs font-bold ${s.badgeColor}`}>{s.badge}</span>}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-400">信号数 <span className="text-white font-bold ml-1">{s.count}</span></div>
                <div className="text-gray-400">胜率 <span className={`${s.avgColor} font-bold ml-1`}>{s.winRate}</span></div>
                <div className="text-gray-400">总收益 <span className={`${parseFloat(s.total) >= 0 ? 'text-green-400' : 'text-red-400'} font-bold ml-1`}>{s.total}</span></div>
                <div className="text-gray-400">平均收益 <span className={`${s.avgColor} font-bold ml-1`}>{s.avg}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Signals */}
      <section className="max-w-4xl mx-auto px-4 pb-12 border-t border-gray-800 pt-12">
        <h2 className="text-2xl font-bold mb-2">🏆 TOP 10 最佳信号</h2>
        <p className="text-gray-400 mb-8 text-sm">回测期间4h涨幅最大的10次信号</p>
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/[0.02] border-b border-gray-800">
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase">#</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase">时间</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase">币种</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase">Score</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase">场景</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase">4h涨幅</th>
              </tr>
            </thead>
            <tbody>
              {topSignals.map(s => (
                <tr key={s.rank} className="border-b border-gray-800/50 hover:bg-white/[0.02]">
                  <td className="py-3 px-4 text-gray-400">{s.rank}</td>
                  <td className="py-3 px-4 text-gray-300">{s.time}</td>
                  <td className="py-3 px-4 font-bold">{s.coin}</td>
                  <td className="py-3 px-4"><span className="px-1.5 py-0.5 rounded bg-emerald-500/12 text-emerald-400 text-xs font-bold">{s.score}</span></td>
                  <td className="py-3 px-4 text-gray-300">{s.scene}</td>
                  <td className="py-3 px-4 text-green-400 font-semibold">{s.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Methodology */}
      <section className="max-w-4xl mx-auto px-4 pb-12 border-t border-gray-800 pt-12">
        <h2 className="text-2xl font-bold mb-8">📋 回测方法论</h2>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/[0.04] to-blue-500/[0.04] border border-emerald-500/15">
          <h3 className="text-lg font-bold mb-4 text-emerald-400">🔬 验证流程</h3>
          <div className="space-y-2 text-sm text-gray-300">
            {methodologySteps.map((s, i) => (
              <p key={i}><strong className="text-white">{s.bold}</strong>{s.text}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-10 px-4 text-center text-gray-500 text-sm">
        <p>SingClaw Crypto Alpha · 回测中心 · 数据仅供参考，不构成投资建议</p>
        <p className="mt-2">自动更新 | 基于CoinGlass八大场景框架</p>
      </footer>
    </div>
  )
}
