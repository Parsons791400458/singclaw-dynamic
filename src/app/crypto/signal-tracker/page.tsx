'use client';

import { useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface SignalEntry {
  coin: string;
  score: number;
  price: string;
  change_24h: string;
  change_4h: string;
  change_8h: string;
}

interface DayData {
  label: string;
  data: SignalEntry[];
}

// ─── Signal Data ─────────────────────────────────────────────────────────────
const SIGNAL_DAYS: DayData[] = [
  {
    "label": "今天 · 2026-04-28",
    "data": [
      {
        "coin": "PENGU",
        "score": 100,
        "price": "0.010419",
        "change_24h": "+7.3%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "ARC",
        "score": 100,
        "price": "0.07493",
        "change_24h": "+8.8%",
        "change_4h": "-0.1%",
        "change_8h": "-0.2%"
      },
      {
        "coin": "APE",
        "score": 100,
        "price": "0.1577",
        "change_24h": "+8.5%",
        "change_4h": "+3.1%",
        "change_8h": "+6.1%"
      },
      {
        "coin": "OPEN",
        "score": 100,
        "price": "0.2762",
        "change_24h": "+7.4%",
        "change_4h": "+2.9%",
        "change_8h": "+5.7%"
      },
      {
        "coin": "AXS",
        "score": 100,
        "price": "1.464",
        "change_24h": "+6.2%",
        "change_4h": "+0.8%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "VANA",
        "score": 100,
        "price": "1.535",
        "change_24h": "+6.3%",
        "change_4h": "+0.6%",
        "change_8h": "+1.2%"
      },
      {
        "coin": "GPS",
        "score": 100,
        "price": "0.007884",
        "change_24h": "+8.4%",
        "change_4h": "-1.7%",
        "change_8h": "-3.5%"
      },
      {
        "coin": "PNUT",
        "score": 100,
        "price": "0.05703",
        "change_24h": "+8.0%",
        "change_4h": "+2.5%",
        "change_8h": "+4.9%"
      },
      {
        "coin": "ZEREBRO",
        "score": 100,
        "price": "0.018214",
        "change_24h": "+11.9%",
        "change_4h": "+3.3%",
        "change_8h": "+6.7%"
      },
      {
        "coin": "SPELL",
        "score": 100,
        "price": "0.0001778",
        "change_24h": "+7.1%",
        "change_4h": "-0.1%",
        "change_8h": "-0.2%"
      },
      {
        "coin": "ENSO",
        "score": 100,
        "price": "0.9396",
        "change_24h": "+5.1%",
        "change_4h": "+1.7%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "DOLO",
        "score": 100,
        "price": "0.03535",
        "change_24h": "+6.4%",
        "change_4h": "+0.1%",
        "change_8h": "+0.1%"
      },
      {
        "coin": "MYX",
        "score": 100,
        "price": "0.2677",
        "change_24h": "+9.8%",
        "change_4h": "+2.2%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "AIOT",
        "score": 100,
        "price": "0.09224",
        "change_24h": "+13.0%",
        "change_4h": "+5.2%",
        "change_8h": "+10.4%"
      },
      {
        "coin": "GIGGLE",
        "score": 100,
        "price": "35.47",
        "change_24h": "+7.5%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "TURTLE",
        "score": 100,
        "price": "0.05809",
        "change_24h": "+13.8%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "TA",
        "score": 100,
        "price": "0.05151",
        "change_24h": "+7.3%",
        "change_4h": "+2.4%",
        "change_8h": "+4.9%"
      },
      {
        "coin": "UAI",
        "score": 100,
        "price": "0.3556",
        "change_24h": "+12.1%",
        "change_4h": "+2.3%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "LUMIA",
        "score": 100,
        "price": "0.16613",
        "change_24h": "+9.6%",
        "change_4h": "-1.1%",
        "change_8h": "-2.1%"
      },
      {
        "coin": "HIGH",
        "score": 100,
        "price": "0.2302",
        "change_24h": "+8.9%",
        "change_4h": "+0.9%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "AGT",
        "score": 100,
        "price": "0.021171",
        "change_24h": "+12.1%",
        "change_4h": "+2.8%",
        "change_8h": "+5.7%"
      },
      {
        "coin": "CGPT",
        "score": 95,
        "price": "0.02661",
        "change_24h": "+10.1%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "VELODROME",
        "score": 95,
        "price": "0.01749",
        "change_24h": "+7.6%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "COMP",
        "score": 95,
        "price": "23.15",
        "change_24h": "+5.5%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "STG",
        "score": 95,
        "price": "0.2222",
        "change_24h": "+10.5%",
        "change_4h": "+2.4%",
        "change_8h": "+4.8%"
      },
      {
        "coin": "ALCH",
        "score": 95,
        "price": "0.08263",
        "change_24h": "+5.5%",
        "change_4h": "+1.6%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "KAITO",
        "score": 95,
        "price": "0.4369",
        "change_24h": "+7.1%",
        "change_4h": "+1.5%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "AVAAI",
        "score": 95,
        "price": "0.008791",
        "change_24h": "+9.8%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "GOAT",
        "score": 95,
        "price": "0.01783",
        "change_24h": "+8.2%",
        "change_4h": "+2.5%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "SNDK",
        "score": 95,
        "price": "1069.5",
        "change_24h": "+6.9%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "TAKE",
        "score": 95,
        "price": "0.03267",
        "change_24h": "+13.5%",
        "change_4h": "+3.1%",
        "change_8h": "+6.2%"
      },
      {
        "coin": "JCT",
        "score": 95,
        "price": "0.003046",
        "change_24h": "+8.1%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "SHELL",
        "score": 90,
        "price": "0.03506",
        "change_24h": "+5.6%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "CETUS",
        "score": 90,
        "price": "0.03105",
        "change_24h": "+5.8%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "VINE",
        "score": 90,
        "price": "0.01628",
        "change_24h": "+6.0%",
        "change_4h": "-0.7%",
        "change_8h": "-1.4%"
      },
      {
        "coin": "XTZ",
        "score": 90,
        "price": "0.3851",
        "change_24h": "+6.3%",
        "change_4h": "+1.7%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "1000LUNC",
        "score": 85,
        "price": "0.06852",
        "change_24h": "+15.8%",
        "change_4h": "+3.1%",
        "change_8h": "+6.2%"
      },
      {
        "coin": "SWARMS",
        "score": 85,
        "price": "0.02284",
        "change_24h": "+19.3%",
        "change_4h": "+0.5%",
        "change_8h": "+1.0%"
      },
      {
        "coin": "ZBT",
        "score": 85,
        "price": "0.22049",
        "change_24h": "+15.6%",
        "change_4h": "+6.5%",
        "change_8h": "+13.1%"
      },
      {
        "coin": "SIREN",
        "score": 80,
        "price": "0.7121",
        "change_24h": "+19.4%",
        "change_4h": "+6.8%",
        "change_8h": "+13.6%"
      },
      {
        "coin": "ORCA",
        "score": 80,
        "price": "1.467",
        "change_24h": "+19.8%",
        "change_4h": "-2.0%",
        "change_8h": "-4.1%"
      },
      {
        "coin": "TAC",
        "score": 70,
        "price": "0.010897",
        "change_24h": "+20.4%",
        "change_4h": "+4.1%",
        "change_8h": "+8.2%"
      },
      {
        "coin": "RAVE",
        "score": 55,
        "price": "0.8783",
        "change_24h": "+0.2%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "BASED",
        "score": 55,
        "price": "0.14131",
        "change_24h": "+0.5%",
        "change_4h": "-0.6%",
        "change_8h": "-1.2%"
      },
      {
        "coin": "SUI",
        "score": 50,
        "price": "0.9338",
        "change_24h": "+0.3%",
        "change_4h": "+0.4%",
        "change_8h": "+0.9%"
      },
      {
        "coin": "CL",
        "score": 50,
        "price": "97.89",
        "change_24h": "+1.7%",
        "change_4h": "+0.6%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "OPG",
        "score": 50,
        "price": "0.2783",
        "change_24h": "+4.8%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "BZ",
        "score": 50,
        "price": "103.1",
        "change_24h": "+1.7%",
        "change_4h": "+0.6%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "LDO",
        "score": 50,
        "price": "0.4052",
        "change_24h": "+0.4%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "0G",
        "score": 50,
        "price": "0.555",
        "change_24h": "+3.6%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      }
    ]
  }
];
// ─── Helpers ─────────────────────────────────────────────────────────────────
function getScoreColor(score: number): string {
  if (score >= 70) return 'bg-emerald-500/15 text-emerald-400';
  if (score >= 50) return 'bg-amber-500/15 text-amber-400';
  return 'bg-gray-500/15 text-gray-500';
}

function getChangeClass(val: string): string {
  if (val === '待追踪') return 'text-gray-600 italic';
  if (val.startsWith('+')) return 'text-green-400';
  if (val.startsWith('-')) return 'text-red-400';
  return 'text-gray-400';
}

export default function SignalTrackerPage() {
  const [activeDay, setActiveDay] = useState(0);
  const day = SIGNAL_DAYS[activeDay];
  const highSignals = day.data.filter(d => d.score >= 70);
  const watchSignals = day.data.filter(d => d.score >= 60 && d.score < 70);
  const cautionSignals = day.data.filter(d => d.score >= 50 && d.score < 60);
  const excludedCount = day.data.length - highSignals.length - watchSignals.length - cautionSignals.length;

  return (
    <div className="min-h-screen bg-gray-950 text-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Crypto <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">信号追踪</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            每日自动扫描Binance USDT永续合约，基于Score v2算法（追高扣分版）筛选高分信号
          </p>
          <p className="text-gray-600 text-sm mt-2">📅 最后更新: 2026-04-27 15:12 UTC · Binance Futures API · Score v2</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800 text-center">
            <div className="text-3xl font-black text-emerald-400">{highSignals.length}</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">⭐ 重点关注 (≥70)</div>
          </div>
          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800 text-center">
            <div className="text-3xl font-black text-blue-400">{watchSignals.length}</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">👀 观察 (60-69)</div>
          </div>
          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800 text-center">
            <div className="text-3xl font-black text-amber-400">{cautionSignals.length}</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">⚠️ 谨慎 (50-59)</div>
          </div>
          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800 text-center">
            <div className="text-3xl font-black text-purple-400">{excludedCount}</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">❌ 排除 ({'<'}50)</div>
          </div>
          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800 text-center">
            <div className="text-3xl font-black text-white">{day.data.length}</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">📊 扫描总对数</div>
          </div>
        </div>

        {/* Algorithm Info */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 mb-8 text-sm text-gray-400 leading-relaxed">
          <strong className="text-white">📐 Score v2 算法</strong> | 追高扣分版
          <br/>
          ✅ 成交量+波动率基础分(0-50) | 🚀 涨幅5-15%+放量启动+65分 | 🔴 涨幅{'>'}100%-30分(过热排除) | ⚡ 涨幅{'>'}50%-15分
          <br/>
          原则：捕捉启动拐点，拒绝追高FOMO
        </div>

        {/* Day Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {SIGNAL_DAYS.map((d, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition ${
                i === activeDay
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-gray-900/60 text-gray-500 border border-gray-800 hover:border-gray-700'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Day Title */}
        <div className="text-lg font-bold text-emerald-400 mb-4">
          📅 {day.label} · {highSignals.length} 个高分信号(≥70) · v2 - 追高扣分版
        </div>

        {/* Signal Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">#</th>
                <th className="text-left p-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">币种</th>
                <th className="text-left p-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Score</th>
                <th className="text-left p-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">信号价</th>
                <th className="text-left p-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">24h涨幅</th>
                <th className="text-left p-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">4h涨幅</th>
                <th className="text-left p-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">8h涨幅</th>
              </tr>
            </thead>
            <tbody>
              {day.data.map((entry, i) => (
                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/[0.02] transition">
                  <td className="p-3 text-gray-600">{i + 1}</td>
                  <td className="p-3 font-semibold text-white">{entry.coin}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${getScoreColor(entry.score)}`}>
                      {entry.score}
                    </span>
                  </td>
                  <td className="p-3 text-gray-300 font-mono text-xs">{entry.price}</td>
                  <td className={`p-3 font-medium ${getChangeClass(entry.change_24h)}`}>{entry.change_24h}</td>
                  <td className={`p-3 font-medium ${getChangeClass(entry.change_4h)}`}>{entry.change_4h}</td>
                  <td className={`p-3 font-medium ${getChangeClass(entry.change_8h)}`}>{entry.change_8h}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* High Signals Highlight */}
        <div className="mt-8 p-5 bg-gray-900/40 border border-gray-800 rounded-xl">
          <h3 className="text-lg font-bold text-white mb-3">🔥 高分信号 ({highSignals.length} 个 ≥70)</h3>
          <div className="flex flex-wrap gap-2">
            {highSignals.map((s, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-sm font-semibold border border-emerald-500/20"
              >
                {s.coin}
                <span className="ml-1 text-xs opacity-60">({s.score})</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
