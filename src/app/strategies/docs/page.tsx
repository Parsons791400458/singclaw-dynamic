export default function StrategyDocsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-2">📄 策略中心 - 完整技术文档</h1>
        <p className="text-gray-400 mb-8">版本 v1.0 | 2026-05-02 | 9大策略完整逻辑、参数、计算公式</p>

        <div className="space-y-12">
          {/* 通用设置 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">⚙️ 通用回测设置</h2>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-800 text-gray-400">
                  <th className="text-left py-2 px-3">参数</th><th className="text-left py-2 px-3">值</th><th className="text-left py-2 px-3">说明</th>
                </tr></thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-800/50"><td className="py-2 px-3">K线周期</td><td className="py-2 px-3 font-mono">15分钟</td><td className="py-2 px-3">所有策略统一使用15min K线</td></tr>
                  <tr className="border-b border-gray-800/50"><td className="py-2 px-3">仓位模型</td><td className="py-2 px-3 font-mono">15% 复利</td><td className="py-2 px-3">每笔交易使用账户资金的15%</td></tr>
                  <tr className="border-b border-gray-800/50"><td className="py-2 px-3">初始资金</td><td className="py-2 px-3 font-mono">$10,000</td><td className="py-2 px-3">模拟账户起始余额</td></tr>
                  <tr className="border-b border-gray-800/50"><td className="py-2 px-3">最大持仓</td><td className="py-2 px-3 font-mono">1笔</td><td className="py-2 px-3">同一时间只持有一个仓位</td></tr>
                  <tr className="border-b border-gray-800/50"><td className="py-2 px-3">止损</td><td className="py-2 px-3 font-mono">-8%</td><td className="py-2 px-3">硬性止损，所有策略通用</td></tr>
                  <tr className="border-b border-gray-800/50"><td className="py-2 px-3">止盈</td><td className="py-2 px-3 font-mono">+20%</td><td className="py-2 px-3">硬性止盈，所有策略通用</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 策略1 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">🐢 策略1: 海龟突破 (Turtle Breakout)</h2>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
              <p className="text-gray-300">经典的唐奇安通道突破策略。价格突破20周期高点做多，跌破10周期低点平仓。</p>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">技术指标</h3>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">donchian_upper_20 = max(high, 20)</code> — 过去20根K线的最高价</li>
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">donchian_lower_10 = min(low, 10)</code> — 过去10根K线的最低价</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">入场条件（同时满足）</h3>
                <ol className="space-y-1 text-sm text-gray-300 list-decimal list-inside">
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">close &gt; donchian_upper_20</code>（当前收盘价突破20周期高点）</li>
                  <li>当前无持仓</li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-2">出场条件（满足任一）</h3>
                <ol className="space-y-1 text-sm text-gray-300 list-decimal list-inside">
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">close &lt; donchian_lower_10</code>（跌破10周期低点）</li>
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">(close - entry_price) / entry_price &lt; -0.08</code>（止损8%）</li>
                </ol>
              </div>
              <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-400 mb-1">LABUSDT 表现</h3>
                <p className="text-sm text-gray-300">交易9笔 | 胜率56% | 盈亏比42.40 | 账户收益+26.3% | 🥇 最佳策略</p>
              </div>
            </div>
          </section>

          {/* 策略2 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">📈 策略2: EMA趋势跟踪 (EMA Trend Following)</h2>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
              <p className="text-gray-300">使用三条EMA均线的多头排列判断趋势，金叉做多，死叉平仓。</p>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">技术指标</h3>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">EMA9</code>: 9周期指数移动平均，k = 2/10 = 0.2</li>
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">EMA20</code>: 20周期指数移动平均，k = 2/21 ≈ 0.0952</li>
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">EMA50</code>: 50周期指数移动平均，k = 2/51 ≈ 0.0392</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">入场条件（同时满足）</h3>
                <ol className="space-y-1 text-sm text-gray-300 list-decimal list-inside">
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">EMA9 &gt; EMA20</code>（短期均线在中期上方）</li>
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">EMA20 &gt; EMA50</code>（中期均线在长期上方）</li>
                  <li>当前无持仓</li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-2">出场条件（满足任一）</h3>
                <ol className="space-y-1 text-sm text-gray-300 list-decimal list-inside">
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">EMA9 &lt; EMA20</code>（EMA死叉）</li>
                  <li>止损8% 或 止盈20%</li>
                </ol>
              </div>
              <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-400 mb-1">LABUSDT 表现</h3>
                <p className="text-sm text-gray-300">交易52笔 | 胜率65% | 盈亏比3.24 | 账户收益+20.9% | 🥈 最稳健</p>
              </div>
            </div>
          </section>

          {/* 策略3 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">💹 策略3: 量价突破 (Volume-Price Breakout)</h2>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
              <p className="text-gray-300">放量（&gt;2x均量）且价格突破20周期高点时做多。</p>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">技术指标</h3>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">donchian_upper_20 = max(high, 20)</code></li>
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">volume_ma_20 = mean(volume, 20)</code></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">入场条件</h3>
                <ol className="space-y-1 text-sm text-gray-300 list-decimal list-inside">
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">close &gt; donchian_upper_20</code></li>
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">volume &gt; volume_ma_20 * 2</code></li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-2">出场条件</h3>
                <ol className="space-y-1 text-sm text-gray-300 list-decimal list-inside">
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">close &lt; donchian_lower_10</code></li>
                  <li>止损8% 或 止盈20%</li>
                </ol>
              </div>
              <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-400 mb-1">LABUSDT 表现</h3>
                <p className="text-sm text-gray-300">交易17笔 | 胜率65% | 盈亏比3.62 | 账户收益+20.2% | 🥉 高效率</p>
              </div>
            </div>
          </section>

          {/* 策略4 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">🛡️ 策略4: ATR自适应止损 (ATR Adaptive Stop)</h2>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
              <p className="text-gray-300">用ATR动态计算止损止盈位。15min涨幅&gt;3%且放量入场。</p>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">技术指标</h3>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">TR = max(high-low, abs(high-prev_close), abs(low-prev_close))</code></li>
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">ATR14 = mean(TR, 14)</code></li>
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">change_1h = (close - close[4]) / close[4]</code></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">入场条件</h3>
                <ol className="space-y-1 text-sm text-gray-300 list-decimal list-inside">
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">change_1h &gt; 0.03</code>（1小时涨幅&gt;3%）</li>
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">volume &gt; mean(volume,4) * 1.5</code></li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-2">出场条件</h3>
                <ol className="space-y-1 text-sm text-gray-300 list-decimal list-inside">
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">entry_price - close &gt; ATR14 * 2</code>（ATR*2止损）</li>
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">close - entry_price &gt; ATR14 * 3</code>（ATR*3止盈）</li>
                </ol>
              </div>
              <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-400 mb-1">LABUSDT 表现</h3>
                <p className="text-sm text-gray-300">交易18笔 | 胜率67% | 盈亏比2.43 | 账户收益+19.4% | ⭐ 风控最优</p>
              </div>
            </div>
          </section>

          {/* 策略5 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">⚡ 策略5: 时间序列动量 (Time Series Momentum)</h2>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
              <p className="text-gray-300">4小时涨幅&gt;5%时做多，动量反转（4h跌幅&gt;5%）时平仓。</p>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">技术指标</h3>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">change_4h = (close - close[16]) / close[16]</code>（16根15min K = 4小时）</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">入场条件</h3>
                <ol className="space-y-1 text-sm text-gray-300 list-decimal list-inside">
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">change_4h &gt; 0.05</code></li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-2">出场条件</h3>
                <ol className="space-y-1 text-sm text-gray-300 list-decimal list-inside">
                  <li><code className="bg-gray-800 px-2 py-0.5 rounded">change_4h &lt; -0.05</code>（动量反转）</li>
                  <li>止损8% 或 止盈20%</li>
                </ol>
              </div>
              <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-400 mb-1">LABUSDT 表现</h3>
                <p className="text-sm text-gray-300">交易9笔 | 胜率78% | 盈亏比2.10 | 账户收益+19.1% | ⭐ 最高胜率</p>
              </div>
            </div>
          </section>

          {/* 策略6-9 简化展示 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">📋 策略6-9 概要</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                <h3 className="font-bold text-lg mb-2">🔄 策略6: 双策略切换</h3>
                <p className="text-sm text-gray-400 mb-2">趋势模式(EMA多头) OR 反转模式(RSI&lt;30)</p>
                <p className="text-sm text-green-400">LAB: 9笔 78% +19.1%</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                <h3 className="font-bold text-lg mb-2">📊 策略7: MA20趋势</h3>
                <p className="text-sm text-gray-400 mb-2">价格上穿MA20做多，下穿平仓</p>
                <p className="text-sm text-green-400">LAB: 19笔 63% +15.7%</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                <h3 className="font-bold text-lg mb-2">📉 策略8: 布林带突破</h3>
                <p className="text-sm text-gray-400 mb-2">突破BB上轨做多，跌破中轨平仓</p>
                <p className="text-sm text-green-400">LAB: 65笔 49% +14.6%</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                <h3 className="font-bold text-lg mb-2">🔀 策略9: RSI均值回归</h3>
                <p className="text-sm text-gray-400 mb-2">RSI&lt;30买入，RSI&gt;70卖出</p>
                <p className="text-sm text-green-400">LAB: 32笔 53% +6.6%</p>
              </div>
            </div>
          </section>

          {/* 手工回测指南 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">🔧 如何手工回测</h2>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
              <ol className="space-y-2 text-sm text-gray-300 list-decimal list-inside">
                <li><strong>获取数据</strong>: 从 Binance 下载 15min K线（Open, High, Low, Close, Volume）</li>
                <li><strong>计算指标</strong>: 用 Excel/Google Sheets 计算各策略所需指标</li>
                <li><strong>逐根K线判断</strong>: 从第50根K线开始（需足够历史数据）</li>
                <li><strong>记录交易</strong>: 记录入场价、出场价、盈亏、持仓时间</li>
                <li><strong>计算账户</strong>: 按15%仓位复利计算最终收益</li>
              </ol>
              <div className="bg-gray-800/50 rounded-lg p-4 mt-4">
                <h3 className="text-sm font-semibold text-blue-400 mb-2">Excel公式示例</h3>
                <pre className="text-xs text-gray-300 overflow-x-auto">
{`EMA9: =B2*(2/10)+C1*(1-2/10)  (B2=当前收盘价, C1=前一期EMA9)
MA20: =AVERAGE(B2:B21)  (B2:B21=最近20个收盘价)
RSI14: 需要辅助列计算gain和loss，然后用14周期平均
Donchian Upper: =MAX(C2:C21)  (C列=最高价)
Donchian Lower: =MIN(D2:D21)  (D列=最低价)
ATR14: =AVERAGE(TR2:TR15)  (TR列=真实波幅)`}
                </pre>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
