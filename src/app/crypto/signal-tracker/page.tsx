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
    "label": "今天 · 2026-07-24",
    "data": [
      {
        "coin": "UB",
        "score": 100,
        "price": "0.12548",
        "change_24h": "+8.2%",
        "change_4h": "+0.6%",
        "change_8h": "+1.2%"
      },
      {
        "coin": "CAP",
        "score": 100,
        "price": "0.02427",
        "change_24h": "+8.5%",
        "change_4h": "+2.8%",
        "change_8h": "+5.7%"
      },
      {
        "coin": "MAGMA",
        "score": 100,
        "price": "0.32093",
        "change_24h": "+12.0%",
        "change_4h": "+1.2%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "BR",
        "score": 100,
        "price": "0.15638",
        "change_24h": "+5.9%",
        "change_4h": "+4.7%",
        "change_8h": "+9.4%"
      },
      {
        "coin": "SOXS",
        "score": 100,
        "price": "45.45",
        "change_24h": "+5.7%",
        "change_4h": "+0.1%",
        "change_8h": "+0.2%"
      },
      {
        "coin": "WLFI",
        "score": 100,
        "price": "0.05771",
        "change_24h": "+9.6%",
        "change_4h": "-2.1%",
        "change_8h": "-4.2%"
      },
      {
        "coin": "EPIC",
        "score": 100,
        "price": "0.6537",
        "change_24h": "+7.2%",
        "change_4h": "+2.1%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "CLO",
        "score": 100,
        "price": "0.12031",
        "change_24h": "+11.7%",
        "change_4h": "-0.4%",
        "change_8h": "-0.7%"
      },
      {
        "coin": "ANTHROPIC",
        "score": 100,
        "price": "1561.62",
        "change_24h": "+7.0%",
        "change_4h": "+0.6%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "HEI",
        "score": 100,
        "price": "0.10477",
        "change_24h": "+11.2%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "ZAMA",
        "score": 100,
        "price": "0.05503",
        "change_24h": "+14.4%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "ZEST",
        "score": 95,
        "price": "0.24948",
        "change_24h": "+10.0%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "COLLECT",
        "score": 95,
        "price": "0.05365",
        "change_24h": "+5.6%",
        "change_4h": "+0.9%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "UVXY",
        "score": 95,
        "price": "25.47",
        "change_24h": "+7.9%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "SQQQ",
        "score": 95,
        "price": "43.07",
        "change_24h": "+6.1%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "ENSO",
        "score": 90,
        "price": "0.7875",
        "change_24h": "+5.3%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "XTZ",
        "score": 90,
        "price": "0.2378",
        "change_24h": "+5.4%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "FLUID",
        "score": 90,
        "price": "1.105",
        "change_24h": "+6.8%",
        "change_4h": "+1.4%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "H",
        "score": 90,
        "price": "0.06341",
        "change_24h": "+6.7%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "ON",
        "score": 85,
        "price": "0.19451",
        "change_24h": "+16.8%",
        "change_4h": "+5.6%",
        "change_8h": "+11.3%"
      },
      {
        "coin": "BANK",
        "score": 85,
        "price": "0.29879",
        "change_24h": "+21.3%",
        "change_4h": "+7.4%",
        "change_8h": "+14.9%"
      },
      {
        "coin": "RE",
        "score": 85,
        "price": "0.5833",
        "change_24h": "+19.7%",
        "change_4h": "+6.1%",
        "change_8h": "+12.2%"
      },
      {
        "coin": "AKE",
        "score": 80,
        "price": "0.002234",
        "change_24h": "+24.8%",
        "change_4h": "-0.1%",
        "change_8h": "-0.3%"
      },
      {
        "coin": "LA",
        "score": 80,
        "price": "0.06431",
        "change_24h": "+18.5%",
        "change_4h": "+1.3%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "BILL",
        "score": 75,
        "price": "0.03065",
        "change_24h": "+20.8%",
        "change_4h": "+4.3%",
        "change_8h": "+8.6%"
      },
      {
        "coin": "PROM",
        "score": 75,
        "price": "1.868",
        "change_24h": "+27.3%",
        "change_4h": "+6.6%",
        "change_8h": "+13.2%"
      },
      {
        "coin": "BEAT",
        "score": 70,
        "price": "3.061",
        "change_24h": "+17.1%",
        "change_4h": "+3.8%",
        "change_8h": "+7.6%"
      },
      {
        "coin": "ZBT",
        "score": 65,
        "price": "0.11631",
        "change_24h": "+15.1%",
        "change_4h": "+3.6%",
        "change_8h": "+7.1%"
      },
      {
        "coin": "ESPORTS",
        "score": 65,
        "price": "0.04158",
        "change_24h": "+36.8%",
        "change_4h": "+9.5%",
        "change_8h": "+19.0%"
      },
      {
        "coin": "INTC",
        "score": 55,
        "price": "105.22",
        "change_24h": "+0.1%",
        "change_4h": "-0.6%",
        "change_8h": "-1.2%"
      },
      {
        "coin": "CBRS",
        "score": 55,
        "price": "218.9",
        "change_24h": "+3.5%",
        "change_4h": "+0.0%",
        "change_8h": "+0.0%"
      },
      {
        "coin": "CL",
        "score": 55,
        "price": "91.5",
        "change_24h": "+3.5%",
        "change_4h": "+0.5%",
        "change_8h": "+1.0%"
      },
      {
        "coin": "LAB",
        "score": 55,
        "price": "0.1513",
        "change_24h": "+1.3%",
        "change_4h": "-1.6%",
        "change_8h": "-3.2%"
      },
      {
        "coin": "HANA",
        "score": 50,
        "price": "0.03521",
        "change_24h": "+4.1%",
        "change_4h": "+1.9%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "BZ",
        "score": 50,
        "price": "93.65",
        "change_24h": "+2.1%",
        "change_4h": "+0.2%",
        "change_8h": "+0.4%"
      },
      {
        "coin": "SNXX",
        "score": 50,
        "price": "18.24",
        "change_24h": "-3.5%",
        "change_4h": "-0.9%",
        "change_8h": "-1.9%"
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
