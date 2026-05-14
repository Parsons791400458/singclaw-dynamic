'use client'

const reviewSteps = [
  { bold: '1. 信号回顾', text: '今日共发出 X 个信号，其中 Score≥70 的 Y 个' },
  { bold: '2. 4h验证', text: '已追踪 Z 个信号的4h涨幅，胜率 W%' },
  { bold: '3. 8h验证', text: '已追踪 V 个信号的8h涨幅，平均收益 U%' },
  { bold: '4. 模拟交易', text: '开仓 N 笔，平仓 M 笔，总盈亏 P USDT' },
  { bold: '5. 参数优化', text: '根据今日表现调整Score权重/阈值' },
]

const iterations = [
  { ver: 'v1.0', date: '04-13', desc: '基础OI+价格权重，胜率51.3%' },
  { ver: 'v1.1', date: '04-17', desc: '增加成交量权重，Score>80胜率提升至57.1%' },
  { ver: 'v1.2', date: '待发布', desc: '引入场景权重，排除S7/S8反向信号' },
]

export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-600/8 to-transparent" />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            每日 <span className="bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent">复盘</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-3">
            对比信号预测与实际表现，持续优化Score算法参数，形成交易策略的正向循环。
          </p>
          <div className="text-sm text-gray-500">📅 复盘周期: 每日 BJT 20:00 · 自动执行</div>
        </div>
      </section>

      {/* Today's Review */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">📅 今日复盘 (即将启动)</h2>
        <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
          <h3 className="text-lg font-bold mb-4">🔄 复盘流程</h3>
          <div className="space-y-3 text-sm text-gray-300">
            {reviewSteps.map((s, i) => (
              <p key={i}><strong className="text-white">{s.bold}</strong>{s.text}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Review Summary */}
      <section className="max-w-4xl mx-auto px-4 pb-12 border-t border-gray-800 pt-12">
        <h2 className="text-2xl font-bold mb-6">📊 历史复盘摘要</h2>
        <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
          <h3 className="text-lg font-bold mb-4">📝 2026-04-17 复盘总结</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p><strong className="text-white">信号质量：</strong>当日10个信号，4h胜率57.1%，平均收益+8.69%</p>
            <p><strong className="text-white">最佳场景：</strong>S1强看多(3次，胜率67%，平均+3.64%)</p>
            <p><strong className="text-white">最差场景：</strong>S7多头过热(1次，-1.54%)</p>
            <p><strong className="text-white">优化建议：</strong>Score{'>'}80信号胜率显著提升，建议提高开仓阈值</p>
          </div>
        </div>
      </section>

      {/* Score Iterations */}
      <section className="max-w-4xl mx-auto px-4 pb-12 border-t border-gray-800 pt-12">
        <h2 className="text-2xl font-bold mb-6">🎯 策略优化记录</h2>
        <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
          <h3 className="text-lg font-bold mb-4">📈 Score算法迭代</h3>
          <div className="space-y-3">
            {iterations.map(it => (
              <div key={it.ver} className="flex items-start gap-3 text-sm">
                <span className="px-2 py-0.5 rounded bg-emerald-500/12 text-emerald-400 text-xs font-bold flex-shrink-0 mt-0.5">{it.ver}</span>
                <span className="text-gray-500 w-16 flex-shrink-0">{it.date}</span>
                <span className="text-gray-300">{it.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-10 px-4 text-center text-gray-500 text-sm">
        <p>SingClaw Crypto Alpha · 每日复盘 · 数据仅供参考，不构成投资建议</p>
        <p className="mt-2">自动执行 | 持续优化 · 正向循环</p>
      </footer>
    </div>
  )
}
