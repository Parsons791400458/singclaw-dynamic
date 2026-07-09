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
    "label": "今天 · 2026-07-09",
    "data": [
      {
        "coin": "DYDX",
        "score": 100,
        "price": "0.1416",
        "change_24h": "+10.5%",
        "change_4h": "+3.4%",
        "change_8h": "+6.7%"
      },
      {
        "coin": "EIGEN",
        "score": 100,
        "price": "0.2475",
        "change_24h": "+10.7%",
        "change_4h": "+3.2%",
        "change_8h": "+6.4%"
      },
      {
        "coin": "PLAY",
        "score": 100,
        "price": "0.03434",
        "change_24h": "+6.6%",
        "change_4h": "+0.5%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "SLX",
        "score": 100,
        "price": "0.1899",
        "change_24h": "+13.6%",
        "change_4h": "+3.1%",
        "change_8h": "+6.2%"
      },
      {
        "coin": "CRWV",
        "score": 100,
        "price": "89.55",
        "change_24h": "+6.8%",
        "change_4h": "+2.7%",
        "change_8h": "+5.5%"
      },
      {
        "coin": "BTW",
        "score": 100,
        "price": "0.06707",
        "change_24h": "+7.0%",
        "change_4h": "+3.0%",
        "change_8h": "+5.9%"
      },
      {
        "coin": "MANA",
        "score": 100,
        "price": "0.0751",
        "change_24h": "+9.3%",
        "change_4h": "+2.7%",
        "change_8h": "+5.3%"
      },
      {
        "coin": "CRDO",
        "score": 100,
        "price": "263.93",
        "change_24h": "+5.6%",
        "change_4h": "+3.0%",
        "change_8h": "+6.0%"
      },
      {
        "coin": "MMT",
        "score": 100,
        "price": "0.1552",
        "change_24h": "+7.1%",
        "change_4h": "+0.9%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "UAI",
        "score": 100,
        "price": "0.4138",
        "change_24h": "+12.7%",
        "change_4h": "+6.3%",
        "change_8h": "+12.6%"
      },
      {
        "coin": "OGN",
        "score": 100,
        "price": "0.01871",
        "change_24h": "+12.0%",
        "change_4h": "-0.5%",
        "change_8h": "-1.0%"
      },
      {
        "coin": "VVV",
        "score": 100,
        "price": "11.487",
        "change_24h": "+6.8%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "KAITO",
        "score": 100,
        "price": "0.6667",
        "change_24h": "+9.2%",
        "change_4h": "-4.2%",
        "change_8h": "-8.4%"
      },
      {
        "coin": "NBIS",
        "score": 100,
        "price": "218.3",
        "change_24h": "+11.0%",
        "change_4h": "+4.2%",
        "change_8h": "+8.3%"
      },
      {
        "coin": "CAP",
        "score": 100,
        "price": "0.02335",
        "change_24h": "+11.1%",
        "change_4h": "+4.3%",
        "change_8h": "+8.6%"
      },
      {
        "coin": "TIA",
        "score": 100,
        "price": "0.4016",
        "change_24h": "+5.0%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "COAI",
        "score": 100,
        "price": "0.3036",
        "change_24h": "+7.2%",
        "change_4h": "+1.8%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "TAIKO",
        "score": 100,
        "price": "0.0848",
        "change_24h": "+7.3%",
        "change_4h": "+3.9%",
        "change_8h": "+7.8%"
      },
      {
        "coin": "MAV",
        "score": 100,
        "price": "0.01018",
        "change_24h": "+8.2%",
        "change_4h": "-1.2%",
        "change_8h": "-2.3%"
      },
      {
        "coin": "BABA",
        "score": 100,
        "price": "111.69",
        "change_24h": "+13.4%",
        "change_4h": "+3.0%",
        "change_8h": "+6.0%"
      },
      {
        "coin": "ACT",
        "score": 100,
        "price": "0.00907",
        "change_24h": "+6.3%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "APE",
        "score": 100,
        "price": "0.1613",
        "change_24h": "+11.5%",
        "change_4h": "+2.9%",
        "change_8h": "+5.8%"
      },
      {
        "coin": "IREN",
        "score": 95,
        "price": "43.47",
        "change_24h": "+7.8%",
        "change_4h": "+3.0%",
        "change_8h": "+6.0%"
      },
      {
        "coin": "BEAMX",
        "score": 95,
        "price": "0.001582",
        "change_24h": "+6.2%",
        "change_4h": "+1.3%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "SFP",
        "score": 95,
        "price": "0.2391",
        "change_24h": "+7.6%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "SMCI",
        "score": 95,
        "price": "28.13",
        "change_24h": "+6.7%",
        "change_4h": "+2.3%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "ELSA",
        "score": 95,
        "price": "0.04947",
        "change_24h": "+7.5%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "SXT",
        "score": 95,
        "price": "0.00712",
        "change_24h": "+7.2%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "HOME",
        "score": 95,
        "price": "0.01575",
        "change_24h": "+5.4%",
        "change_4h": "+1.2%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "PROVE",
        "score": 95,
        "price": "0.2082",
        "change_24h": "+7.8%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "AIOT",
        "score": 95,
        "price": "0.05655",
        "change_24h": "+6.9%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "ZRX",
        "score": 90,
        "price": "0.09",
        "change_24h": "+5.1%",
        "change_4h": "+1.6%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "NMR",
        "score": 90,
        "price": "10.498",
        "change_24h": "+5.2%",
        "change_4h": "+1.7%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "EGLD",
        "score": 90,
        "price": "2.913",
        "change_24h": "+6.3%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "VANRY",
        "score": 85,
        "price": "0.00745",
        "change_24h": "+17.3%",
        "change_4h": "+1.9%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "BLUAI",
        "score": 70,
        "price": "0.019505",
        "change_24h": "+26.3%",
        "change_4h": "+6.8%",
        "change_8h": "+13.5%"
      },
      {
        "coin": "POWER",
        "score": 70,
        "price": "0.10398",
        "change_24h": "+37.2%",
        "change_4h": "+3.7%",
        "change_8h": "+7.5%"
      },
      {
        "coin": "SOXL",
        "score": 65,
        "price": "178.61",
        "change_24h": "+4.8%",
        "change_4h": "+4.2%",
        "change_8h": "+8.4%"
      },
      {
        "coin": "LDO",
        "score": 60,
        "price": "0.3255",
        "change_24h": "+2.8%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "SNDK",
        "score": 60,
        "price": "1725.37",
        "change_24h": "+3.3%",
        "change_4h": "+2.9%",
        "change_8h": "+5.8%"
      },
      {
        "coin": "MU",
        "score": 60,
        "price": "963.31",
        "change_24h": "+1.5%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "EVAA",
        "score": 60,
        "price": "2.7466",
        "change_24h": "+3.7%",
        "change_4h": "-5.1%",
        "change_8h": "-10.2%"
      },
      {
        "coin": "DRAM",
        "score": 60,
        "price": "62.54",
        "change_24h": "+0.8%",
        "change_4h": "+2.3%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "O",
        "score": 55,
        "price": "0.5581",
        "change_24h": "+0.2%",
        "change_4h": "+0.6%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "UNI",
        "score": 55,
        "price": "3.369",
        "change_24h": "+4.3%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "KORU",
        "score": 55,
        "price": "538.97",
        "change_24h": "-5.6%",
        "change_4h": "+3.3%",
        "change_8h": "+6.5%"
      },
      {
        "coin": "BZ",
        "score": 55,
        "price": "78.8",
        "change_24h": "+4.4%",
        "change_4h": "+0.5%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "MRVL",
        "score": 55,
        "price": "236.32",
        "change_24h": "+1.2%",
        "change_4h": "+2.0%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "CBRS",
        "score": 55,
        "price": "186.27",
        "change_24h": "+4.2%",
        "change_4h": "+2.0%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "WLD",
        "score": 55,
        "price": "0.3847",
        "change_24h": "+0.4%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      }
    ]
  }
];
// ─── Helper ──────────────────────────────────────────────────────────────────
const scoreClass = (score: number) => score >= 70 ? 'text-[var(--sc-accent)]' : 'text-amber-400';
const changeClass = (v: string) => {
  if (v.startsWith('+')) return 'text-green-400';
  if (v.startsWith('-')) return 'text-red-400';
  return 'text-gray-400';
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function SignalTrackerPage() {
  const [selectedDay, setSelectedDay] = useState(0);
  const day = SIGNAL_DAYS[selectedDay];

  const perfectCount = day.data.filter(d => d.score === 100).length;
  const focusCount = day.data.filter(d => d.score >= 70 && d.score < 100).length;
  const watchCount = day.data.filter(d => d.score >= 60 && d.score < 70).length;
  const cautiousCount = day.data.filter(d => d.score >= 50 && d.score < 60).length;

  return (
    <div className="min-h-screen bg-[var(--sc-bg)] text-[var(--sc-text)]">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--sc-bg)]/80 border-b border-[var(--sc-border)]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-2xl">🦞</span>SingClaw
          </a>
          <nav className="flex gap-1 text-sm">
            <a href="/crypto/" className="px-3 py-1.5 rounded-lg text-[var(--sc-dim)] hover:text-white hover:bg-white/5 transition">5层分析</a>
            <a href="/crypto/watchlist" className="px-3 py-1.5 rounded-lg text-[var(--sc-dim)] hover:text-white hover:bg-white/5 transition">Watchlist</a>
            <a href="/crypto/signal-tracker" className="px-3 py-1.5 rounded-lg text-[var(--sc-accent)] bg-[var(--sc-accent)]/10 font-semibold">信号追踪</a>
            <a href="/crypto/paper-trade" className="px-3 py-1.5 rounded-lg text-[var(--sc-dim)] hover:text-white hover:bg-white/5 transition">Paper Trade</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          Crypto <span className="bg-gradient-to-r from-[var(--sc-accent)] to-[var(--sc-accent2)] bg-clip-text text-transparent">信号追踪</span>
        </h1>
        <p className="text-[var(--sc-dim)] text-lg max-w-2xl mb-8">
          基于Score v2（追高扣分版）每日扫描Binance USDT永续合约，筛选高分信号并追踪4h/8h表现。
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-[var(--sc-card)] border border-[var(--sc-border)] text-center">
            <div className="text-3xl font-black text-[var(--sc-accent)]">{perfectCount}</div>
            <div className="text-xs text-[var(--sc-dim)] uppercase tracking-wider mt-1">💯 满分</div>
          </div>
          <div className="p-4 rounded-xl bg-[var(--sc-card)] border border-[var(--sc-border)] text-center">
            <div className="text-3xl font-black text-[var(--sc-accent)]">{focusCount}</div>
            <div className="text-xs text-[var(--sc-dim)] uppercase tracking-wider mt-1">⭐ 重点</div>
          </div>
          <div className="p-4 rounded-xl bg-[var(--sc-card)] border border-[var(--sc-border)] text-center">
            <div className="text-3xl font-black text-[var(--sc-blue,#4d8ffa)]">{watchCount}</div>
            <div className="text-xs text-[var(--sc-dim)] uppercase tracking-wider mt-1">👁 观察</div>
          </div>
          <div className="p-4 rounded-xl bg-[var(--sc-card)] border border-[var(--sc-border)] text-center">
            <div className="text-3xl font-black text-amber-400">{cautiousCount}</div>
            <div className="text-xs text-[var(--sc-dim)] uppercase tracking-wider mt-1">⚠️ 谨慎</div>
          </div>
          <div className="p-4 rounded-xl bg-[var(--sc-card)] border border-[var(--sc-border)] text-center">
            <div className="text-3xl font-black text-[var(--sc-purple,#a855f7)]">528</div>
            <div className="text-xs text-[var(--sc-dim)] uppercase tracking-wider mt-1">📊 合约</div>
          </div>
        </div>

        {/* Signal Table */}
        <div className="rounded-xl bg-[var(--sc-card)] border border-[var(--sc-border)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[var(--sc-border)]">
            <h2 className="text-lg font-bold text-[var(--sc-accent)]">{day.label}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--sc-border)]">
                  <th className="text-left px-4 py-3 text-[var(--sc-muted)] text-xs uppercase font-semibold">#</th>
                  <th className="text-left px-4 py-3 text-[var(--sc-muted)] text-xs uppercase font-semibold">币种</th>
                  <th className="text-left px-4 py-3 text-[var(--sc-muted)] text-xs uppercase font-semibold">Score</th>
                  <th className="text-left px-4 py-3 text-[var(--sc-muted)] text-xs uppercase font-semibold">价格</th>
                  <th className="text-left px-4 py-3 text-[var(--sc-muted)] text-xs uppercase font-semibold">24h涨跌</th>
                  <th className="text-left px-4 py-3 text-[var(--sc-muted)] text-xs uppercase font-semibold">4h后</th>
                  <th className="text-left px-4 py-3 text-[var(--sc-muted)] text-xs uppercase font-semibold">8h后</th>
                </tr>
              </thead>
              <tbody>
                {day.data.map((entry, i) => (
                  <tr key={entry.coin} className="border-b border-[var(--sc-border)] hover:bg-white/[0.02] transition">
                    <td className="px-4 py-3 text-[var(--sc-muted)]">{i + 1}</td>
                    <td className="px-4 py-3 font-bold">{entry.coin}</td>
                    <td className="px-4 py-3 font-bold {scoreClass(entry.score)}">{entry.score}</td>
                    <td className="px-4 py-3 font-mono">{entry.price}</td>
                    <td className={`px-4 py-3 font-bold ${changeClass(entry.change_24h)}`}>{entry.change_24h}</td>
                    <td className="px-4 py-3 text-[var(--sc-muted)] italic">{entry.change_4h}</td>
                    <td className="px-4 py-3 text-[var(--sc-muted)] italic">{entry.change_8h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="border-t border-[var(--sc-border)] mt-16 py-8 text-center text-[var(--sc-muted)] text-sm">
        <p>SingClaw Crypto Alpha · Score v2 · 数据仅供参考，不构成投资建议</p>
      </footer>
    </div>
  );
}
