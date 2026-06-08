import { promises as fs } from 'fs';
import path from 'path';

interface Coin {
  symbol: string;
  events_total: number;
  events_strong: number;
  events_effective: number;
  hit_rate_pct: number;
  best_72h_pct: number;
  worst_dd_pct: number;
  tier: string;
}

interface Event {
  symbol: string;
  event_time: string;
  classification: string;
  price: number;
  funding_rate: number;
  return_72h_pct: number;
  drop_pct: number;
  ma_score: number;
  vol_ratio: number;
}

interface NfrData {
  generated_at: string;
  strategy: string;
  summary: { total_coins_analyzed: number; total_events: number; tier_a_coins: number };
  tier_a_coins: Coin[];
  top_events: Event[];
}

export default async function NfrPage() {
  let data: NfrData | null = null;
  try {
    const jsonPath = path.join(process.cwd(), 'public', 'crypto', 'nfr-data.json');
    const raw = await fs.readFile(jsonPath, 'utf-8');
    data = JSON.parse(raw);
  } catch {
    // data stays null
  }

  const tierA = data?.tier_a_coins || [];
  const events = data?.top_events?.slice?.(0, 20) || [];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            📉 负费率反抽收回策略
          </h1>
          <p className="text-xl text-gray-400 mb-4">
            NFR — Negative Funding Reversal · 极低费率反弹扫描系统
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <span className="px-3 py-1 bg-emerald-400/10 text-emerald-400 rounded-full text-sm font-semibold">历史回扫验证</span>
            <span className="px-3 py-1 bg-blue-400/10 text-blue-400 rounded-full text-sm font-semibold">166币种</span>
            <span className="px-3 py-1 bg-purple-400/10 text-purple-400 rounded-full text-sm font-semibold">11,378样本</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-400/10 text-emerald-400 rounded-full text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              实时监控中
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {[
            { num: '12', label: 'A级币种' },
            { num: '1,914', label: '强有效事件' },
            { num: '3,822', label: '有效事件' },
            { num: '+796%', label: '最佳72h(RAVE)' },
            { num: '59%', label: '整体有效率' },
          ].map((s) => (
            <div key={s.label} className="bg-gray-900 rounded-xl p-4 text-center border border-gray-800">
              <div className="text-2xl font-black text-emerald-400">{s.num}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Four Conditions */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-8">
          <h2 className="text-xl font-bold mb-4">🔍 四条件核验体系</h2>
          <p className="text-gray-500 mb-4 text-sm">四个条件<strong className="text-red-400">全部满足</strong>才允许做多</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { n: '①', t: '24h急跌 ≥30%', d: '快速下跌制造恐慌' },
              { n: '②', t: '费率深负 ≤-0.1%/8h', d: '空头拥挤，轧空势能' },
              { n: '③ ⭐关键', t: '止跌收回 MA', d: '金叉确认，趋势反转' },
              { n: '④', t: '量能回补 ≥1.5x', d: '真实买盘，排除假反抽' },
            ].map((c) => (
              <div key={c.n} className="bg-gray-800 rounded-lg p-4 border-l-2 border-emerald-400">
                <div className="text-xs text-gray-500">{c.n}</div>
                <div className="font-semibold text-sm mt-1">{c.t}</div>
                <div className="text-xs text-gray-500 mt-1">{c.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Case */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-emerald-400/5 to-blue-400/5 rounded-xl p-5 border border-emerald-400/20">
            <div className="text-lg font-bold text-emerald-400">🏠 HOMEUSDT (实时验证)</div>
            <div className="text-sm text-gray-400 mt-2 space-y-1">
              <p>06-07 → 06-08: 急跌-63%（$0.077→$0.029）</p>
              <p>费率 -0.91%/8h · 低点 $0.02851</p>
              <p>MA得分: 0/5 → <span className="text-emerald-400">5/5 ✅</span></p>
              <p>对标 COAI 2025-10 形态</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-xl p-5 border border-blue-400/20">
            <div className="text-lg font-bold text-blue-400">🤖 COAIUSDT (历史验证)</div>
            <div className="text-sm text-gray-400 mt-2 space-y-1">
              <p>2025-10-13→14: MA 0→4 修复</p>
              <p>急跌-65% · 费率深负</p>
              <p className="text-2xl font-black text-emerald-400">72h +136~252%</p>
            </div>
          </div>
        </div>

        {/* A-tier Table */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-8">
          <h2 className="text-xl font-bold mb-4">
            🏆 A级币种排名 <span className="px-2 py-0.5 bg-emerald-400/10 text-emerald-400 rounded text-sm">TOP{tierA.length}</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 text-xs uppercase">
                  <th className="p-2">#</th><th className="p-2">币种</th><th className="p-2 text-right">总事件</th>
                  <th className="p-2 text-right">强力</th><th className="p-2 text-right">有效</th>
                  <th className="p-2 text-right">命中率</th><th className="p-2 text-right">最佳72h</th>
                  <th className="p-2 text-right">最大回撤</th>
                </tr>
              </thead>
              <tbody>
                {tierA.map((c, i) => (
                  <tr key={c.symbol} className={`border-t border-gray-800 ${c.best_72h_pct > 200 ? 'bg-emerald-400/5' : ''}`}>
                    <td className="p-2 text-gray-500">{i + 1}</td>
                    <td className="p-2 font-semibold">{c.symbol}</td>
                    <td className="p-2 text-right">{c.events_total}</td>
                    <td className="p-2 text-right">{c.events_strong}</td>
                    <td className="p-2 text-right">{c.events_effective}</td>
                    <td className="p-2 text-right">{c.hit_rate_pct.toFixed(1)}%</td>
                    <td className="p-2 text-right text-emerald-400 font-semibold">+{c.best_72h_pct.toFixed(0)}%</td>
                    <td className="p-2 text-right text-red-400">{c.worst_dd_pct.toFixed(0)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Events */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-8">
          <h2 className="text-xl font-bold mb-4">⚡ 强力事件 TOP20</h2>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-900">
                <tr className="text-left text-gray-500 text-xs uppercase">
                  <th className="p-2">#</th><th className="p-2">币种</th><th className="p-2">时间</th>
                  <th className="p-2 text-right">价格</th><th className="p-2 text-right">费率</th>
                  <th className="p-2 text-right">72h收益</th><th className="p-2 text-right">跌幅</th>
                  <th className="p-2 text-right">MA</th><th className="p-2 text-right">量比</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e, i) => (
                  <tr key={`${e.symbol}-${e.event_time}`} className={`border-t border-gray-800 ${e.return_72h_pct > 150 ? 'bg-emerald-400/5' : ''}`}>
                    <td className="p-2 text-gray-500">{i + 1}</td>
                    <td className="p-2 font-semibold">{e.symbol}</td>
                    <td className="p-2 text-xs text-gray-400">{e.event_time}</td>
                    <td className="p-2 text-right">${e.price.toFixed(4)}</td>
                    <td className="p-2 text-right text-red-400">{(e.funding_rate * 100).toFixed(2)}%</td>
                    <td className="p-2 text-right text-emerald-400 font-semibold">+{e.return_72h_pct.toFixed(0)}%</td>
                    <td className="p-2 text-right text-red-400">{e.drop_pct.toFixed(0)}%</td>
                    <td className="p-2 text-right">{e.ma_score}</td>
                    <td className="p-2 text-right">{e.vol_ratio.toFixed(1)}x</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Downloads */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-8">
          <h2 className="text-xl font-bold mb-4">📥 数据下载</h2>
          <div className="flex flex-wrap gap-3">
            <a href="/reports/NFR_负费率反抽策略_20260607.xlsx"
               className="px-4 py-2 bg-emerald-500 text-black rounded-lg font-semibold text-sm hover:bg-emerald-400 transition">
              📊 Excel 完整报告
            </a>
            <a href="/reports/nfr_full_data_20260607_coins.csv"
               className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition border border-gray-700">
              📄 币种汇总 CSV
            </a>
            <a href="/reports/nfr_full_data_20260607_events.csv"
               className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition border border-gray-700">
              📄 事件明细 CSV
            </a>
            <a href="/reports/nfr_full_data_20260607_tierA_conditions.csv"
               className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition border border-gray-700">
              📄 A级核验 CSV
            </a>
          </div>
        </div>

        {/* Strategy Rules */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold mb-4">📋 策略纪律</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 border-l-2 border-red-400">
              <div className="font-semibold text-red-400">🚫 禁止</div>
              <div className="text-xs text-gray-500 mt-2 space-y-1">
                <p>· 费率深负但价格创新低 → 不接飞刀</p>
                <p>· 止跌未收回MA → 不抄底</p>
                <p>· 量弱反抽 → 不追</p>
                <p>· 同时追3+个 → 禁止</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border-l-2 border-emerald-400">
              <div className="font-semibold text-emerald-400">✅ 退出条件</div>
              <div className="text-xs text-gray-500 mt-2 space-y-1">
                <p>· 跌破15m MA10 → 无条件退出</p>
                <p>· 费率转正+OI萎缩 → 退出</p>
                <p>· 回撤&gt;5%+结构破坏 → 退出</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border-l-2 border-yellow-400">
              <div className="font-semibold text-yellow-400">⚠️ 风险</div>
              <div className="text-xs text-gray-500 mt-2 space-y-1">
                <p>· 假信号率约31%</p>
                <p>· 历史回测≠未来收益</p>
                <p>· 短线策略，不能拿成中长线</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-600 text-xs mt-8">
          SingClaw Crypto Alpha · NFR v1.0 · 2026-06-07 · 数据驱动 · 不构成投资建议
        </div>
      </div>
    </div>
  );
}
