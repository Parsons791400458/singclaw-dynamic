'use client'
import { useState } from 'react'

const dnaItems = [
  { name: '通缩机制', score: 25, max: 25, color: 'from-emerald-500 to-teal-500', weight: 'burn+buyback 强=25 | 有 burn=15 | 全流通无通缩=6 | 持续解锁=0' },
  { name: '市值弹性', score: 20, max: 25, color: 'from-blue-500 to-indigo-500', weight: 'MC<$5000万=20 | <$1亿=16 | <$3亿=10 | <$5亿=6 | >$5亿=3' },
  { name: '真实产品', score: 15, max: 20, color: 'from-purple-500 to-pink-500', weight: '有用户+收入=15 | 有产品=10 | 测试网=7 | PPT=3' },
  { name: '赛道热度', score: 15, max: 20, color: 'from-amber-500 to-orange-500', weight: 'AI=15 | DePIN=13 | BTC生态=10 | GameFi=8 | 其他=5' },
  { name: 'OI 健康度', score: 10, max: 15, color: 'from-green-500 to-emerald-500', weight: 'OI/MC<15%=10 | <30%=7 | <50%=4 | >50%=1' },
  { name: '近期动量', score: 10, max: 15, color: 'from-orange-500 to-red-500', weight: '7d>+10%且有催化剂=10 | 微涨=6 | 横盘=3 | 暴涨>100%=2' },
  { name: '流通率', score: 10, max: 15, color: 'from-gray-400 to-gray-600', weight: '>80%=10 | >60%=8 | >40%=5 | >20%=3 | <20%=1' },
  { name: '催化剂', score: 5, max: 10, color: 'from-pink-500 to-rose-500', weight: '本周有重大事件=5 | 本月有=3 | 无=1' },
]

const checkItems = [
  { num: 1, title: '流通率 > 60%', detail: '低流通 = 未来大量解锁砸盘。', redline: '< 20% 直接 PASS。', pass: true },
  { num: 2, title: '单次解锁 < 流通量 2%', detail: '大额解锁 = 定时炸弹。', redline: '> 5% = 高危。HEMI 每月解锁 12.3%，8次全跌。', pass: true },
  { num: 3, title: 'OI/MC < 30%', detail: 'OI/市值 = 杠杆程度。', redline: '> 50% = 赌场结构，> 100% = 极端危险。HEMI 达到 125%。', pass: false },
  { num: 4, title: 'FDV/MC < 3倍', detail: '完全稀释估值 vs 当前市值。', redline: '> 5倍 = 未来严重稀释。', pass: true },
  { num: 5, title: 'Top 10 持仓 < 40%', detail: '头部集中度过高 = 控盘币。', redline: '> 80% = 庄家说了算。分仓特征（差异 < 1%）= 跑。', pass: false },
  { num: 6, title: 'TVL 稳定或增长', detail: '锁仓量 = 真实资金沉淀。', redline: '从高点跌 > 80% = 空心壳。HEMI TVL 从 $4.4亿暴跌 97%。', pass: true },
  { num: 7, title: 'DEX 流动性 > $500万', detail: '流动性太低 = 买得进卖不出。', redline: '< $100万 = 不参与。', pass: true },
  { num: 8, title: '有通缩/Buyback', detail: 'burn + buyback = 供应持续减少。VVV 模式：收入回购销毁 → 价格飞轮。', pass: true },
  { num: 9, title: '有真实产品和用户', detail: '能在 DefiLlama/DappRadar 查到真实使用数据。纯 PPT 项目 = 高危。', pass: true },
  { num: 10, title: '上线 > 6个月', detail: '新币波动极大。', redline: '< 3个月 + ICO后一路跌 = 不碰。', pass: true },
  { num: 11, title: '7天涨幅 < 100%', detail: '暴涨后追高 = 接盘。', redline: '> 100% 且无基本面催化剂 = 追高陷阱。', pass: true },
  { num: 12, title: '社交情绪 > -0.3', detail: '社区已放弃的项目很难起死回生。', redline: '< -0.5 = 市场已放弃。', pass: true },
]

const oiPrinciples = [
  { formula: 'OI ↑ + 价格 ↑', meaning: '新多头入场，看多确认', signal: '✅ 强看多', color: 'text-green-400', bg: 'bg-green-500/10' },
  { formula: 'OI ↑ + 价格 ↓', meaning: '新空头入场，看空确认', signal: '❌ 看空', color: 'text-red-400', bg: 'bg-red-500/10' },
  { formula: 'OI ↓ + 价格 ↑', meaning: '空头平仓，轧空反弹', signal: '⚠️ 短期反弹', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { formula: 'OI ↓ + 价格 ↓', meaning: '多头平仓，多头投降', signal: '💀 可能触底', color: 'text-amber-400', bg: 'bg-amber-500/10' },
]

const trendMatrix = [
  ['OI 稳步↑ + 价格↑ + 大户偏多 + 费率中性', '强看多', '★★★★★', 'text-green-400'],
  ['OI↑ + 价格横盘 + 大户偏多', '蓄力中，偏多', '★★★★☆', 'text-green-400'],
  ['OI↑ + 价格↓ + 大户偏空', '看空确认', '★★★★☆', 'text-red-400'],
  ['OI↓ + 价格↑ + 空头爆仓多', '轧空反弹（短期）', '★★★☆☆', 'text-amber-400'],
  ['OI↓ + 价格↓ + 多头爆仓多', '多头投降（可能触底）', '★★★☆☆', 'text-amber-400'],
  ['OI 暴增→回落 + 价格不涨', '假布局，看空', '★★★★☆', 'text-red-400'],
  ['费率极正(>0.05%) + OI高位', '多头过热，即将回调', '★★★★☆', 'text-red-400'],
  ['费率极负(<-0.05%) + OI低位', '空头过热，可能反弹', '★★★★☆', 'text-green-400'],
]

const longSignals = [
  'OI 稳步增加 + 价格涨',
  '费率中性或微负（未过热）',
  '大户多空比 > 1.5',
  '空头爆仓增加（逼空中）',
  '交易所余额减少（提币潮）',
  'FNG < 30（恐惧中买入）',
]

const runSignals = [
  'OI 暴增但价格不涨',
  '费率 > 0.1%（多头过热）',
  '散户极度看多（反向指标）',
  '多头爆仓激增',
  '交易所余额暴增（充币卖）',
  'FNG > 80（贪婪中卖出）',
]

const levCards = [
  { val: '3-5x', label: 'BTC / ETH 大盘', desc: '波动可控，趋势明确时可用', color: 'text-green-400' },
  { val: '2-3x', label: '中盘币 $1-10亿', desc: '波动较大，控制风险', color: 'text-green-400' },
  { val: '1-2x', label: '小盘币 $1千万-$1亿', desc: '波动极大，低杠杆或现货', color: 'text-amber-400' },
  { val: '1x', label: '微盘 / OI>50%', desc: '仅现货，杠杆 = 送钱', color: 'text-red-400' },
]

const rules = [
  { num: 1, text: '避雷清单先行 — 任何分析前先跑 12 项清单' },
  { num: 2, text: 'OI/MC > 50% 不开杠杆 — HEMI 6倍爆仓教训' },
  { num: 3, text: '不追涨 > 100% — ARIA -86% 暴跌教训' },
  { num: 4, text: '解锁前跑 — 解锁日前 3-5 天减仓' },
  { num: 5, text: '止损不动 — 设了就不改，不找借口' },
  { num: 6, text: '单笔最大亏损 8% — 超过就认错，不补仓' },
  { num: 7, text: '分仓 = 控盘币 — 持仓量差异 < 1% 直接跑' },
  { num: 8, text: 'OI暴增后回落 = 假布局 — 不是所有 OI 增加都是好事' },
]

const coinGlassRows = [
  ['🟢', 'Open Interest', '市场下了多少赌注？', '聚合OI · OI分布 · OI/MC', '参与热度 + 杠杆风险', 'text-emerald-400'],
  ['🔵', 'Funding Rate', '做多的成本多少？', '当前费率 · 累积费率 · 套利', '多空拥挤程度', 'text-blue-400'],
  ['🟣', 'Long/Short', '谁看多谁看空？', '散户比 · 大户账户比 · 大户持仓比', '聪明钱 vs 散户方向', 'text-purple-400'],
  ['🔴', 'Liquidation', '谁被迫出局了？', '爆仓历史 · 订单流 · 热力图', '清洗进度 + 磁铁效应', 'text-red-400'],
  ['🟡', 'Order Book', '谁在主动买卖？', '买卖深度 · 鲸鱼墙 · Taker比', '即时方向 + 支撑阻力', 'text-yellow-400'],
  ['🩷', 'Whale', '大钱在做什么？', '鲸鱼仓位 · 活跃指数', '聪明钱的具体操作', 'text-pink-400'],
  ['🟠', 'On-Chain + ETF', '钱从哪来到哪去？', '交易所余额 · 净流入 · ETF流', '中长期资金方向', 'text-orange-400'],
  ['⚪', 'Indicators', '市场情绪到几度？', 'FNG · RSI · Rainbow · Pi Cycle', '情绪极端值 = 反转信号', 'text-gray-400'],
]

const breakoutSteps = [
  { num: '1️⃣', title: '缩量筑底', desc: ['连续 3+ 根 4H 缩量', '价格不再创新低', 'OI 稳定不大跌', '大户 L/S > 1.3'] },
  { num: '2️⃣', title: '突破 + 放量确认', desc: ['单根 4H 涨幅 > 5%', '突破近 3 天高点', '成交量 > 前 3 根均量 2 倍', 'OI 同步增加'] },
  { num: '3️⃣', title: '入场执行', desc: ['放量确认后入场', '杠杆 2x（小盘）/ 3x（中盘）', '仓位 3-5% 总资金', '止损：筑底区低点 -3%'] },
  { num: '4️⃣', title: '持仓管理', desc: ['+20% 平 1/3', '+50% 平 1/3', '剩余追踪止损 -15%', '大阴线(-10%+)放量 = 跑'] },
]

const enjTimeline = [
  { date: '04/10', desc: '缩量筑底 $0.029  Vol $3-5M', tag: '观察期', color: 'text-amber-400' },
  { date: '04/11 12:00', desc: '+5.9% 突破', tag: '信号出现', color: 'text-emerald-400' },
  { date: '04/11 16:00', desc: '+1.1% 量 3x 放大', tag: '🎯 最佳上车 $0.030', color: 'text-emerald-400' },
  { date: '04/12 08:00', desc: '+22.7% 主升浪', tag: '已经涨了', color: 'text-gray-400' },
  { date: '04/12 16:00', desc: '洗盘回调 -8%', tag: '次佳上车 $0.035', color: 'text-blue-400' },
  { date: '04/13 08:00', desc: '+14.6% 二次突破', tag: '追高区', color: 'text-gray-400' },
  { date: '04/15 12:00', desc: '$0.078', tag: '+160%（从最佳上车算）', color: 'text-red-400' },
]

export default function CryptoPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-blue-600/10 to-purple-600/10" />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Crypto Alpha<br/>
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">5层分析决策系统</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            基于 CoinGlass 80+ 端点 + Binance API + 链上数据，从避雷到开仓到止盈，一套框架覆盖全流程。不靠感觉，靠数据。
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">📊 CoinGlass 22工具</span>
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">🔗 Binance 实时API</span>
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">🧠 第一性原理驱动</span>
          </div>
        </div>
      </section>

      {/* Flow Diagram */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Decision Pipeline</div>
          <h2 className="text-3xl font-bold mb-3">5 层决策流水线</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">每个币必须从第1层开始，逐层过关。任何一层不合格 = 停止分析。</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {[
            { num: '1', title: '避雷筛查', desc: '12项速查清单', color: 'from-red-500 to-orange-500' },
            { num: '2', title: '趋势判断', desc: 'OI + 费率 + 大户', color: 'from-amber-500 to-yellow-500' },
            { num: '3', title: '选币排序', desc: 'VVV DNA 评分', color: 'from-blue-500 to-indigo-500' },
            { num: '4', title: '开仓决策', desc: '方向 + 杠杆 + 仓位', color: 'from-emerald-500 to-teal-500' },
            { num: '5', title: '止盈止损', desc: '分批止盈 + ATR止损', color: 'from-purple-500 to-pink-500' },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="text-center px-2">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center font-black text-xl mx-auto mb-2`}>{s.num}</div>
                <div className="font-bold text-sm mb-1">{s.title}</div>
                <div className="text-xs text-gray-400">{s.desc}</div>
              </div>
              {i < 4 && <span className="text-2xl text-gray-700 mx-1 hidden md:block">→</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Layer 1: 避雷 */}
      <section className="border-t border-gray-800 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-4xl mb-3">🚨</div>
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Layer 1 · Gate Check</div>
            <h2 className="text-3xl font-bold mb-3">避雷筛查 · 12项速查</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">任何币在深度分析前必须先过这一关。3个以上红旗 = 直接 PASS。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {checkItems.map(item => (
              <div key={item.num} className={`p-5 rounded-xl border transition hover:bg-white/[0.02] ${item.pass ? 'border-gray-800 bg-gray-900/50' : 'border-red-900/30 bg-red-950/20'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${item.pass ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{item.num}</span>
                  <span className="font-bold text-sm">{item.title}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{item.detail} {item.redline && <span className="text-red-400 font-semibold">{item.redline}</span>}</p>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-xl bg-white/[0.03] border border-gray-800 text-center">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <span><span className="text-green-400 font-bold">🟢 0 红旗</span> = 安全</span>
              <span><span className="text-amber-400 font-bold">🟡 1-2 红旗</span> = 谨慎</span>
              <span><span className="text-red-400 font-bold">🔴 3-4 红旗</span> = 高危</span>
              <span><span className="font-bold">💀 5+ 红旗</span> = 别碰</span>
            </div>
          </div>
        </div>
      </section>

      {/* Layer 2: 趋势 */}
      <section className="border-t border-gray-800 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-4xl mb-3">📈</div>
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Layer 2 · Trend Analysis</div>
            <h2 className="text-3xl font-bold mb-3">中长期趋势判断</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">用 OI + 费率 + 大户方向 + 爆仓数据，判断未来 1-3 个月方向。</p>
          </div>

          <h3 className="text-xl font-bold mb-6">📊 OI 第一性原理</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {oiPrinciples.map((p, i) => (
              <div key={i} className="p-5 rounded-xl bg-gray-900/50 border border-gray-800 text-center">
                <div className="font-mono font-bold text-lg mb-2">{p.formula}</div>
                <div className="text-sm text-gray-400 mb-3">{p.meaning}</div>
                <span className={`text-sm font-bold px-3 py-1 rounded-lg ${p.bg} ${p.color}`}>{p.signal}</span>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold mb-6">🔍 趋势判断矩阵</h3>
          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/[0.02] border-b border-gray-800">
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase">信号组合</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase">判断</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase">置信度</th>
                </tr>
              </thead>
              <tbody>
                {trendMatrix.map((row, i) => (
                  <tr key={i} className="border-b border-gray-800/50 hover:bg-white/[0.02]">
                    <td className="py-3 px-4 text-gray-300">{row[0]}</td>
                    <td className={`py-3 px-4 font-semibold ${row[3]}`}>{row[1]}</td>
                    <td className="py-3 px-4 text-amber-400">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Layer 3: VVV DNA */}
      <section className="border-t border-gray-800 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-4xl mb-3">⚡</div>
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Layer 3 · Coin Scoring</div>
            <h2 className="text-3xl font-bold mb-3">VVV DNA 评分模型</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">在多个候选币中快速排序，找出最值得做的标的。满分 100，{'>'}70 入围，{'>'}80 优质。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dnaItems.map(d => (
              <div key={d.name} className="p-5 rounded-xl bg-gray-900/50 border border-gray-800">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold">{d.name}</span>
                  <span className="text-2xl font-black bg-gradient-to-r bg-clip-text text-transparent">{d.score}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 mb-2 overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${d.color} transition-all`} style={{ width: `${(d.score / d.max) * 100}%` }} />
                </div>
                <div className="text-xs text-gray-500">{d.weight}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Layer 4: 开仓 */}
      <section className="border-t border-gray-800 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-4xl mb-3">🎯</div>
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Layer 4 · Entry Decision</div>
            <h2 className="text-3xl font-bold mb-3">开仓决策 · 杠杆 · 仓位</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">全条件满足才开仓。杠杆大小由标的特征决定，不是由贪心决定。</p>
          </div>

          {/* Long/Run signals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 rounded-xl bg-green-500/[0.03] border border-green-500/15">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><span className="text-xl">✅</span> 做多信号（至少 4/6）</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {longSignals.map((s, i) => <li key={i} className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />{s}</li>)}
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-red-500/[0.03] border border-red-500/15">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><span className="text-xl">🔴</span> 跑路信号（至少 4/6）</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {runSignals.map((s, i) => <li key={i} className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />{s}</li>)}
              </ul>
            </div>
          </div>

          {/* Leverage */}
          <h3 className="text-xl font-bold mb-6">⚖️ 杠杆倍数指南</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {levCards.map((c, i) => (
              <div key={i} className="p-5 rounded-xl bg-gray-900/50 border border-gray-800 text-center">
                <div className={`text-3xl font-black mb-1 ${c.color}`}>{c.val}</div>
                <div className="text-sm font-semibold mb-2">{c.label}</div>
                <div className="text-xs text-gray-500">{c.desc}</div>
              </div>
            ))}
          </div>

          {/* Position sizing */}
          <h3 className="text-xl font-bold mb-6">📐 仓位计算</h3>
          <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 font-mono text-sm space-y-1">
            <div className="text-gray-500 mb-2">// 单笔仓位 = 总资金 × 风险系数</div>
            <div>VVV DNA &gt; 80 → <span className="text-emerald-400 font-bold">5-10%</span> 总资金</div>
            <div>VVV DNA 60-80 → <span className="text-blue-400 font-bold">3-5%</span> 总资金</div>
            <div>VVV DNA 50-60 → <span className="text-amber-400 font-bold">1-3%</span> 总资金</div>
            <div>VVV DNA &lt; 50 → <span className="text-red-400 font-bold">&lt; 1%</span> 总资金</div>
            <div className="text-gray-500 mt-3 mb-1">// 硬限制</div>
            <div>单币最大敞口: <span className="text-amber-400 font-bold">20%</span></div>
            <div>总敞口上限: <span className="text-red-400 font-bold">60%</span></div>
          </div>
        </div>
      </section>

      {/* Layer 5: 止盈止损 */}
      <section className="border-t border-gray-800 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-4xl mb-3">📐</div>
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Layer 5 · Exit Strategy</div>
            <h2 className="text-3xl font-bold mb-3">止盈止损 · 分批出场</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">设了就不改。纪律 &gt; 感觉。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* TP */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-green-400">✅ 分批止盈</h3>
              <div className="space-y-0">
                {[
                  { label: '入场价', pct: '$X', action: '建仓', color: 'bg-emerald-400', pctColor: 'text-gray-500' },
                  { label: '止盈 1', pct: '+15%', action: '平 1/3', color: 'bg-green-400', pctColor: 'text-green-400' },
                  { label: '止盈 2', pct: '+30%', action: '平 1/3', color: 'bg-green-500', pctColor: 'text-green-500' },
                  { label: '止盈 3', pct: '追踪', action: '最高回撤 10% 平', color: 'bg-amber-400', pctColor: 'text-amber-400' },
                ].map((r, i) => (
                  <div key={i} className="flex items-center gap-3 py-3 border-b border-gray-800">
                    <div className={`w-3 h-3 rounded-full ${r.color} flex-shrink-0`} />
                    <span className="flex-1 text-sm font-semibold">{r.label}</span>
                    <span className={`text-sm font-bold ${r.pctColor}`}>{r.pct}</span>
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">{r.action}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* SL */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-red-400">🛑 止损规则</h3>
              <div className="space-y-0">
                {[
                  { label: 'ATR 自适应', pct: '-2×ATR', action: '根据波动率', color: 'bg-red-400' },
                  { label: '支撑位止损', pct: '-2~3%', action: '跌破支撑位', color: 'bg-red-400' },
                  { label: 'OI 止损', pct: 'OI↓', action: '跌破布局期低点', color: 'bg-amber-400' },
                  { label: '时间止损', pct: '3天', action: '无起色就走', color: 'bg-gray-500' },
                  { label: '最大亏损', pct: '-8%/-5%', action: '现货/合约铁律', color: 'bg-red-400' },
                ].map((r, i) => (
                  <div key={i} className="flex items-center gap-3 py-3 border-b border-gray-800">
                    <div className={`w-3 h-3 rounded-full ${r.color} flex-shrink-0`} />
                    <span className="flex-1 text-sm font-semibold">{r.label}</span>
                    <span className="text-sm font-bold text-red-400">{r.pct}</span>
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">{r.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Iron Rules */}
      <section className="border-t border-gray-800 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-4xl mb-3">⚠️</div>
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Iron Rules</div>
            <h2 className="text-3xl font-bold mb-3">铁律 · 不可违反</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rules.map(r => (
              <div key={r.num} className="p-4 rounded-xl bg-red-500/[0.04] border border-red-500/12 flex gap-4 items-start">
                <div className="w-7 h-7 rounded-lg bg-red-500/12 text-red-400 text-xs font-bold flex items-center justify-center flex-shrink-0">{r.num}</div>
                <div className="text-sm leading-relaxed">{r.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CoinGlass */}
      <section className="border-t border-gray-800 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-4xl mb-3">🔬</div>
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Data Infrastructure</div>
            <h2 className="text-3xl font-bold mb-3">CoinGlass 8大板块 · 第一性原理</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">80+ 端点回答一个终极问题：市场上的钱在往哪走？</p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/[0.02] border-b border-gray-800">
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase">板块</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase">核心问题</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase">关键指标</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase">本质</th>
                </tr>
              </thead>
              <tbody>
                {coinGlassRows.map((r, i) => (
                  <tr key={i} className="border-b border-gray-800/50 hover:bg-white/[0.02]">
                    <td className={`py-3 px-4 font-bold ${r[5]}`}>{r[0]} {r[1]}</td>
                    <td className="py-3 px-4 text-gray-300">{r[2]}</td>
                    <td className="py-3 px-4 text-gray-400 text-xs">{r[3]}</td>
                    <td className="py-3 px-4 text-gray-300">{r[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4H Breakout */}
      <section className="border-t border-gray-800 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-4xl mb-3">🎣</div>
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">4H Breakout Hunting</div>
            <h2 className="text-3xl font-bold mb-3">4H 线起涨捕捉法</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">复盘 ENJ +170% 暴涨，提炼出可复用的起涨信号。不追 +64%，追 +5.9% 那根 K 线。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {breakoutSteps.map(s => (
              <div key={s.num} className="p-5 rounded-xl bg-gray-900/50 border border-gray-800">
                <div className="text-2xl mb-2">{s.num}</div>
                <h4 className="font-bold text-sm mb-2">{s.title}</h4>
                <div className="text-xs text-gray-400 space-y-1">
                  {s.desc.map((d, i) => <p key={i}>{d}</p>)}
                </div>
              </div>
            ))}
          </div>

          {/* ENJ case */}
          <div className="p-6 rounded-xl bg-emerald-500/[0.03] border border-emerald-500/12">
            <h4 className="font-bold mb-4 text-emerald-400">📊 实战案例：ENJ +170%（2026-04-11 → 04-15）</h4>
            <div className="font-mono text-xs space-y-1 text-gray-400">
              {enjTimeline.map((e, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-gray-500 w-24 flex-shrink-0">{e.date}</span>
                  <span>{e.desc}</span>
                  <span className={`ml-auto ${e.color}`}>← {e.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-emerald-600/20 to-blue-600/20 border border-gray-800">
          <h2 className="text-3xl font-black mb-4">发币名，出报告 🎯</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            在 Telegram 群 @Crypto Alpha Agent，发送任意币名，自动跑完 5 层分析，一步到位输出完整报告。
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/game/" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-full font-semibold transition">🦐 ShrimpFi 游戏</a>
            <a href="/blog/36" className="px-6 py-3 border border-gray-600 hover:border-gray-400 rounded-full font-semibold transition">📖 36计方法论</a>
          </div>
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
          <a href="/skills-wiki" className="hover:text-white transition">Skills Wiki</a>
        </div>
        <p>© 2026 SingClaw · Crypto Alpha 分析系统 · Built with 🧠 by Agent Team</p>
        <p className="mt-2 text-xs">⚠️ 本页面仅供学习研究，不构成投资建议。加密货币投资风险极大，请自行评估。</p>
      </footer>
    </div>
  )
}
