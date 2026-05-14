'use client'

const strategies = [
  {
    id: 1,
    name: '海龟突破',
    nameEn: 'Turtle Breakout',
    type: '突破',
    color: 'from-amber-500 to-orange-500',
    badgeColor: 'bg-amber-500/12 text-amber-400',
    icon: '🐢',
    desc: '经典的唐奇安通道突破策略。20周期高点做多，10周期低点平仓。',
    logic: 'Donchian Channel 20/10突破',
    performance: {
      trades: 9,
      winRate: 56,
      profitFactor: '42.40',
      totalPnl: '+174.7%',
      accountReturn: '+26.3%',
      balance: '$12,634',
      sharpe: 1.85,
      maxDD: '7.2%',
    },
    labResult: '🥇 最佳：盈亏比 42:1，9笔交易赚26.3%，抓住主升浪',
    tags: ['趋势跟踪', '低频率', '高盈亏比', 'LAB最优'],
    bestFor: '单边暴涨/暴跌行情',
    worstFor: '震荡市/假突破',
  },
  {
    id: 2,
    name: 'EMA趋势跟踪',
    nameEn: 'EMA Trend Following',
    type: '趋势',
    color: 'from-blue-500 to-cyan-500',
    badgeColor: 'bg-blue-500/12 text-blue-400',
    icon: '📈',
    desc: 'EMA9/20/50多头排列做多，死叉平仓。稳健的趋势跟踪策略。',
    logic: 'EMA9 > EMA20 > EMA50 做多',
    performance: {
      trades: 52,
      winRate: 65,
      profitFactor: '3.24',
      totalPnl: '+128.9%',
      accountReturn: '+20.9%',
      balance: '$12,088',
      sharpe: 1.62,
      maxDD: '8.0%',
    },
    labResult: '🥈 稳健：65%胜率，52笔交易中吃到了大部分涨幅',
    tags: ['趋势跟踪', '高频', '稳定', '胜率最高'],
    bestFor: '趋势明确的行情',
    worstFor: '快速反转行情',
  },
  {
    id: 3,
    name: '量价突破',
    nameEn: 'Volume-Price Breakout',
    type: '突破',
    color: 'from-emerald-500 to-green-500',
    badgeColor: 'bg-emerald-500/12 text-emerald-400',
    icon: '💹',
    desc: '放量(>2x均量) + 价格突破20周期高点时做多。',
    logic: '20周期高点 + 成交量>2x均量',
    performance: {
      trades: 17,
      winRate: 65,
      profitFactor: '3.62',
      totalPnl: '+124.9%',
      accountReturn: '+20.2%',
      balance: '$12,015',
      sharpe: 1.58,
      maxDD: '15.6%',
    },
    labResult: '🥉 高效：17笔交易赚20.2%，盈亏比 3.62',
    tags: ['突破', '量价共振', '高效率'],
    bestFor: '放量突破行情',
    worstFor: '缩量假突破',
  },
  {
    id: 4,
    name: 'ATR自适应止损',
    nameEn: 'ATR Adaptive Stop',
    type: '风控',
    color: 'from-purple-500 to-pink-500',
    badgeColor: 'bg-purple-500/12 text-purple-400',
    icon: '🛡️',
    desc: '用ATR动态计算止损止盈位。15min涨幅>3%且放量入场。',
    logic: 'ATR*2止损 / ATR*3止盈',
    performance: {
      trades: 18,
      winRate: 67,
      profitFactor: '2.43',
      totalPnl: '+120.6%',
      accountReturn: '+19.4%',
      balance: '$11,943',
      sharpe: 1.45,
      maxDD: '14.4%',
    },
    labResult: '⭐ 风控最优：67%胜率，自适应高波动环境',
    tags: ['风控', '自适应', '高胜率'],
    bestFor: '高波动/趋势行情',
    worstFor: '低波动震荡',
  },
  {
    id: 5,
    name: '时间序列动量',
    nameEn: 'Time Series Momentum',
    type: '动量',
    color: 'from-indigo-500 to-violet-500',
    badgeColor: 'bg-indigo-500/12 text-indigo-400',
    icon: '⚡',
    desc: '4小时涨幅>5%时做多，动量反转时平仓。',
    logic: '4h涨幅>5%入场，动量反转平仓',
    performance: {
      trades: 9,
      winRate: 78,
      profitFactor: '2.10',
      totalPnl: '+119.2%',
      accountReturn: '+19.1%',
      balance: '$11,915',
      sharpe: 1.52,
      maxDD: '10.8%',
    },
    labResult: '⭐ 最高胜率：78%，平均盈利19.7%',
    tags: ['动量', '高胜率', '少而精'],
    bestFor: '强动量延续行情',
    worstFor: '动量快速衰减',
  },
  {
    id: 6,
    name: '双策略切换',
    nameEn: 'Dual Strategy Switch',
    type: '组合',
    color: 'from-teal-500 to-blue-500',
    badgeColor: 'bg-teal-500/12 text-teal-400',
    icon: '🔄',
    desc: '趋势模式(EMA多头)和均值回归模式(RSI超卖)自动切换。',
    logic: 'EMA多头排列 OR RSI<30 入场',
    performance: {
      trades: 9,
      winRate: 78,
      profitFactor: '2.10',
      totalPnl: '+119.2%',
      accountReturn: '+19.1%',
      balance: '$11,915',
      sharpe: 1.52,
      maxDD: '13.3%',
    },
    labResult: '⭐ 自适应：趋势+反转双模式覆盖',
    tags: ['组合', '自适应', '高胜率'],
    bestFor: '混合行情(趋势+震荡)',
    worstFor: '单一模式持续失效',
  },
  {
    id: 7,
    name: 'MA20趋势跟踪',
    nameEn: 'MA20 Trend',
    type: '趋势',
    color: 'from-sky-500 to-blue-500',
    badgeColor: 'bg-sky-500/12 text-sky-400',
    icon: '📊',
    desc: '价格突破MA20做多，跌破MA20平仓。最简单的趋势策略。',
    logic: '价格上穿MA20做多，下穿平仓',
    performance: {
      trades: 19,
      winRate: 63,
      profitFactor: '2.26',
      totalPnl: '+99.1%',
      accountReturn: '+15.7%',
      balance: '$11,567',
      sharpe: 1.28,
      maxDD: '10.1%',
    },
    labResult: '⭐ 简单有效：19笔交易赚15.7%',
    tags: ['简单', '趋势', '经典'],
    bestFor: '中长期趋势',
    worstFor: '频繁穿越均线的震荡',
  },
  {
    id: 8,
    name: '布林带突破',
    nameEn: 'Bollinger Band Breakout',
    type: '突破',
    color: 'from-orange-500 to-red-500',
    badgeColor: 'bg-orange-500/12 text-orange-400',
    icon: '📉',
    desc: '价格突破布林带上轨做多，跌破中轨平仓。',
    logic: '突破BB上轨做多，跌破中轨平仓',
    performance: {
      trades: 65,
      winRate: 49,
      profitFactor: '3.27',
      totalPnl: '+93.0%',
      accountReturn: '+14.6%',
      balance: '$11,463',
      sharpe: 1.15,
      maxDD: '5.2%',
    },
    labResult: '⚠️ 高频但收益一般：65笔交易仅赚14.6%',
    tags: ['突破', '高频', '假突破多'],
    bestFor: '波动率扩张行情',
    worstFor: '窄幅震荡',
  },
  {
    id: 9,
    name: 'RSI均值回归',
    nameEn: 'RSI Mean Reversion',
    type: '反转',
    color: 'from-rose-500 to-pink-500',
    badgeColor: 'bg-rose-500/12 text-rose-400',
    icon: '🔀',
    desc: 'RSI<30超卖买入，RSI>70超卖卖出。',
    logic: 'RSI<30买入，RSI>70卖出',
    performance: {
      trades: 32,
      winRate: 53,
      profitFactor: '1.50',
      totalPnl: '+43.9%',
      accountReturn: '+6.6%',
      balance: '$10,658',
      sharpe: 0.65,
      maxDD: '7.2%',
    },
    labResult: '❌ 不适合暴涨：反转策略在单边行情中必输',
    tags: ['反转', '均值回归', '震荡市'],
    bestFor: '震荡/均值回归行情',
    worstFor: '单边暴涨/暴跌',
  },
]

const twoYearResults = [
  { strategy: '海龟突破', coin: 'BTCUSDT', trades: 281, winRate: '33.5%', totalPnl: '+129', maxDD: '3.4%', profitFactor: '2.12' },
  { strategy: '海龟突破', coin: 'ETHUSDT', trades: 273, winRate: '31.1%', totalPnl: '+25', maxDD: '4.4%', profitFactor: '2.23' },
  { strategy: '量价突破', coin: 'BTCUSDT', trades: 25, winRate: '44.0%', totalPnl: '+456', maxDD: '4.9%', profitFactor: '1.74' },
  { strategy: '时间序列动量', coin: 'BTCUSDT', trades: 40, winRate: '42.5%', totalPnl: '+361', maxDD: '5.0%', profitFactor: '1.68' },
  { strategy: '布林带突破', coin: 'DOGEUSDT', trades: 91, winRate: '30.8%', totalPnl: '+441', maxDD: '5.2%', profitFactor: '2.85' },
  { strategy: 'EMA趋势跟踪', coin: 'DOGEUSDT', trades: 247, winRate: '26.3%', totalPnl: '+385', maxDD: '8.2%', profitFactor: '3.02' },
  { strategy: 'EMA趋势跟踪', coin: 'AVAXUSDT', trades: 221, winRate: '30.8%', totalPnl: '+212', maxDD: '6.9%', profitFactor: '2.37' },
  { strategy: '时间序列动量', coin: 'DOGEUSDT', trades: 143, winRate: '38.5%', totalPnl: '+234', maxDD: '10.8%', profitFactor: '1.65' },
  { strategy: '双策略切换', coin: 'BTCUSDT', trades: 85, winRate: '48.2%', totalPnl: '+410', maxDD: '5.4%', profitFactor: '1.30' },
  { strategy: 'RSI均值回归', coin: 'BTCUSDT', trades: 304, winRate: '61.8%', totalPnl: '+167', maxDD: '3.0%', profitFactor: '0.68' },
]

export default function StrategyCenterPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/8 via-purple-600/5 to-transparent" />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">策略中心</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            9大量化策略 · 2年历史回测 · 每日更新
          </p>
          <p className="text-sm text-gray-500 mt-2">
            基于 Binance USDT 永续合约 15min K线 | 仓位模型：单笔15%复利
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a href="/strategies/docs" className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-sm text-blue-400 hover:bg-blue-600/30 transition">
              📄 查看完整技术文档
            </a>
          </div>
        </div>
      </section>

      {/* Strategy Cards */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold mb-8">🎯 9大策略 LABUSDT 实盘回测</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map((s) => (
            <div key={s.id} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{s.icon}</span>
                <div>
                  <h3 className="text-lg font-bold">{s.name}</h3>
                  <p className="text-xs text-gray-500">{s.nameEn}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4">{s.desc}</p>
              <div className="bg-gray-800/50 rounded-lg px-3 py-2 mb-4">
                <p className="text-xs text-gray-500">核心逻辑</p>
                <p className="text-sm font-mono text-blue-400">{s.logic}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-800/30 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500">交易数</p>
                  <p className="text-lg font-bold">{s.performance.trades}</p>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500">胜率</p>
                  <p className="text-lg font-bold">{s.performance.winRate}%</p>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500">盈亏比</p>
                  <p className="text-lg font-bold">{s.performance.profitFactor}</p>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500">账户收益</p>
                  <p className="text-lg font-bold text-green-400">{s.performance.accountReturn}</p>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-lg px-3 py-2 mb-4">
                <p className="text-xs text-gray-500">LAB实战结果</p>
                <p className="text-sm text-gray-300">{s.labResult}</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {s.tags.map(t => (
                  <span key={t} className={`text-xs px-2 py-1 rounded-full ${s.badgeColor}`}>{t}</span>
                ))}
              </div>
              <div className="space-y-1 text-xs text-gray-500">
                <p>✅ 最适合: {s.bestFor}</p>
                <p>❌ 最不适: {s.worstFor}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ranking Table */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold mb-6">🏆 LABUSDT 策略排名</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="text-left py-3 px-4">排名</th>
                <th className="text-left py-3 px-4">策略</th>
                <th className="text-center py-3 px-4">交易数</th>
                <th className="text-center py-3 px-4">胜率</th>
                <th className="text-center py-3 px-4">盈亏比</th>
                <th className="text-center py-3 px-4">账户收益</th>
                <th className="text-right py-3 px-4">最终余额</th>
              </tr>
            </thead>
            <tbody>
              {strategies.map((s, i) => (
                <tr key={s.id} className="border-b border-gray-800/50 hover:bg-gray-900/30 transition">
                  <td className="py-3 px-4">
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                  </td>
                  <td className="py-3 px-4 font-bold">{s.icon} {s.name}</td>
                  <td className="text-center py-3 px-4">{s.performance.trades}</td>
                  <td className="text-center py-3 px-4">{s.performance.winRate}%</td>
                  <td className="text-center py-3 px-4">{s.performance.profitFactor}</td>
                  <td className="text-center py-3 px-4 text-green-400 font-bold">{s.performance.accountReturn}</td>
                  <td className="text-right py-3 px-4 font-mono">{s.performance.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2-Year Backtest */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold mb-6">📊 2年历史回测 Top 10 (2024-05 ~ 2026-05)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="text-left py-3 px-4">策略</th>
                <th className="text-left py-3 px-4">币种</th>
                <th className="text-center py-3 px-4">交易数</th>
                <th className="text-center py-3 px-4">胜率</th>
                <th className="text-center py-3 px-4">总盈亏</th>
                <th className="text-center py-3 px-4">最大回撤</th>
                <th className="text-center py-3 px-4">盈亏比</th>
                <th className="text-center py-3 px-4">收益率</th>
              </tr>
            </thead>
            <tbody>
              {twoYearResults.map((r, i) => (
                <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-900/30 transition">
                  <td className="py-3 px-4 font-bold">{r.strategy}</td>
                  <td className="py-3 px-4 font-mono text-blue-400">{r.coin}</td>
                  <td className="text-center py-3 px-4">{r.trades}</td>
                  <td className="text-center py-3 px-4">{r.winRate}</td>
                  <td className="text-center py-3 px-4 text-green-400 font-bold">{r.totalPnl}</td>
                  <td className="text-center py-3 px-4 text-red-400">{r.maxDD}</td>
                  <td className="text-center py-3 px-4">{r.profitFactor}</td>
                  <td className="text-center py-3 px-4">{r.profitFactor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Strategy Selection Guide */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold mb-6">🧭 策略选择指南</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 text-green-400">📈 趋势行情</h3>
            <ul className="space-y-2 text-gray-300">
              <li>🥇 海龟突破 — 盈亏比最高，适合长趋势</li>
              <li>🥈 EMA趋势跟踪 — 胜率最高，稳健</li>
              <li>🥉 量价突破 — 效率高，假信号少</li>
            </ul>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">📊 震荡行情</h3>
            <ul className="space-y-2 text-gray-300">
              <li>🥇 RSI均值回归 — 高胜率，适合区间交易</li>
              <li>🥈 布林带突破 — 波动率收缩后突破</li>
              <li>🥉 双策略切换 — 自适应趋势/震荡</li>
            </ul>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 text-red-400">🔥 暴涨暴跌</h3>
            <ul className="space-y-2 text-gray-300">
              <li>🥇 海龟突破 — 抓住主升浪，盈亏比42:1</li>
              <li>🥈 时间序列动量 — 动量延续，78%胜率</li>
              <li>⚠️ 避免 RSI均值回归 — 单边行情中必输</li>
            </ul>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-400">💡 新手推荐</h3>
            <ul className="space-y-2 text-gray-300">
              <li>🥇 MA20趋势跟踪 — 最简单有效</li>
              <li>🥈 EMA趋势跟踪 — 稳健，胜率高</li>
              <li>🥉 ATR自适应止损 — 风控最好</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 每日回测指南 */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">🔄 每日回测指南</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">如何使用</h3>
              <ol className="space-y-2 text-gray-300 text-sm">
                <li className="flex gap-2"><span className="text-blue-400 font-bold">1.</span> 每天给 AI 一个币种符号（如 LABUSDT）</li>
                <li className="flex gap-2"><span className="text-blue-400 font-bold">2.</span> AI 自动用全部9个策略回测该币种</li>
                <li className="flex gap-2"><span className="text-blue-400 font-bold">3.</span> 生成回测报告并更新到本页面</li>
                <li className="flex gap-2"><span className="text-blue-400 font-bold">4.</span> 对比各策略表现，选择最优策略</li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">回测参数</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>📊 K线周期: 15分钟</li>
                <li>💰 初始资金: $10,000</li>
                <li>📈 仓位: 单笔15%复利</li>
                <li>🛑 止损: 8% 硬性止损</li>
                <li>🎯 止盈: 20% 硬性止盈</li>
                <li>📅 数据范围: 最近300根K线（约3天）</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
            <p className="text-gray-400 text-sm">
              💡 <strong>完整技术文档</strong>：每个策略的详细计算公式、入场/出场条件、Excel公式示例，请访问 
              <a href="/strategies/docs" className="text-blue-400 hover:underline"> /strategies/docs</a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="max-w-7xl mx-auto px-4 pb-20 text-center">
        <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-8">
          <p className="text-gray-400 text-sm">
            ⚠️ 历史回测不代表未来表现 | 所有策略基于15%仓位模型 | 最大回撤基于2024-2026数据
          </p>
          <p className="text-gray-500 text-xs mt-2">
            数据生成时间: 2026-05-02 | 分析师: AI策略团队 | 最后更新: LABUSDT 回测
          </p>
        </div>
      </section>
    </div>
  )
}
