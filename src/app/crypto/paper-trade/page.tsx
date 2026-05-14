'use client'

const openRules = [
  '✅ 信号Score ≥ 70',
  '✅ 场景为 S1/S1b/S2/S5（看多或蓄力）',
  '✅ 排除 S7/S8（过热/极端过热）',
  '✅ 单笔风险 ≤ 总资金2%',
]

const closeRules = [
  '📈 止盈: +15%',
  '📉 止损: -8%',
  '⏰ 时间止损: 持仓>24h自动平仓',
]

export default function PaperTradePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-600/8 to-transparent" />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            模拟 <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">交易</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-3">
            基于高分信号(Score≥70)自动开仓，虚拟资金追踪盈亏，验证信号策略的实际表现。
          </p>
          <div className="text-sm text-gray-500">📅 启动: 2026-04-22 · 初始资金: 10,000 USDT · 每笔2%风险</div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-800 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '10,000', label: '初始资金 (USDT)', color: 'text-green-400' },
            { val: '0', label: '当前持仓', color: 'text-blue-400' },
            { val: '0', label: '已平仓', color: 'text-amber-400' },
            { val: '—', label: '总盈亏', color: 'text-purple-400' },
          ].map(s => (
            <div key={s.label} className="p-5 rounded-xl bg-gray-900/50 border border-gray-800 text-center">
              <div className={`text-3xl font-black ${s.color}`}>{s.val}</div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trade History */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-2">📋 交易记录</h2>
        <p className="text-gray-400 mb-8 text-sm">信号驱动的模拟开仓/平仓记录</p>
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/[0.02] border-b border-gray-800">
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase">开仓时间</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase">币种</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase">方向</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase">开仓价</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase">Score</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase">状态</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase">平仓价</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase">盈亏</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} className="text-center py-12 text-gray-500">
                  🚀 模拟交易即将启动，等待首个高分信号...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Rules */}
      <section className="max-w-4xl mx-auto px-4 pb-12 border-t border-gray-800 pt-12">
        <h2 className="text-2xl font-bold mb-8">⚙️ 交易规则</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800">
            <h3 className="text-lg font-bold mb-4">开仓条件</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {openRules.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
          <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800">
            <h3 className="text-lg font-bold mb-4">平仓条件</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {closeRules.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-10 px-4 text-center text-gray-500 text-sm">
        <p>SingClaw Crypto Alpha · 模拟交易 · 数据仅供参考，不构成投资建议</p>
        <p className="mt-2">自动执行 | 信号驱动 · 虚拟资金</p>
      </footer>
    </div>
  )
}
