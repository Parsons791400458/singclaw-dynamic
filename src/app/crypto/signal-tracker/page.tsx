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
    "label": "今天 · 2026-07-18",
    "data": [
      {
        "coin": "US",
        "score": 100,
        "price": "0.048425",
        "change_24h": "+13.9%",
        "change_4h": "+2.7%",
        "change_8h": "+5.5%"
      },
      {
        "coin": "TAG",
        "score": 100,
        "price": "0.000982",
        "change_24h": "+14.5%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "INJ",
        "score": 100,
        "price": "5.17",
        "change_24h": "+6.1%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "ASTS",
        "score": 100,
        "price": "58.31",
        "change_24h": "+7.1%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "TRADOOR",
        "score": 100,
        "price": "0.4522",
        "change_24h": "+7.4%",
        "change_4h": "-0.7%",
        "change_8h": "-1.3%"
      },
      {
        "coin": "SYN",
        "score": 100,
        "price": "0.2329",
        "change_24h": "+5.2%",
        "change_4h": "+6.7%",
        "change_8h": "+13.5%"
      },
      {
        "coin": "DODOX",
        "score": 100,
        "price": "0.023408",
        "change_24h": "+9.0%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "BE",
        "score": 100,
        "price": "215.82",
        "change_24h": "+5.9%",
        "change_4h": "+1.6%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "IDOL",
        "score": 100,
        "price": "0.01697",
        "change_24h": "+13.5%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "ONE",
        "score": 100,
        "price": "0.001208",
        "change_24h": "+8.2%",
        "change_4h": "-0.0%",
        "change_8h": "-0.1%"
      },
      {
        "coin": "T",
        "score": 100,
        "price": "0.004291",
        "change_24h": "+8.9%",
        "change_4h": "+0.1%",
        "change_8h": "+0.2%"
      },
      {
        "coin": "BLUAI",
        "score": 100,
        "price": "0.011692",
        "change_24h": "+10.4%",
        "change_4h": "+0.0%",
        "change_8h": "+0.1%"
      },
      {
        "coin": "DEXE",
        "score": 100,
        "price": "36.21",
        "change_24h": "+5.7%",
        "change_4h": "+1.2%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "AAOI",
        "score": 100,
        "price": "102.86",
        "change_24h": "+5.5%",
        "change_4h": "+2.0%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "BULLA",
        "score": 100,
        "price": "0.008585",
        "change_24h": "+11.7%",
        "change_4h": "+0.5%",
        "change_8h": "+0.9%"
      },
      {
        "coin": "ENS",
        "score": 100,
        "price": "4.526",
        "change_24h": "+5.0%",
        "change_4h": "+0.6%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "NBIS",
        "score": 100,
        "price": "178.07",
        "change_24h": "+6.0%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "AERGO",
        "score": 100,
        "price": "0.02394",
        "change_24h": "+8.2%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "AGT",
        "score": 95,
        "price": "0.013985",
        "change_24h": "+6.3%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "TOWNS",
        "score": 95,
        "price": "0.002178",
        "change_24h": "+5.4%",
        "change_4h": "-0.2%",
        "change_8h": "-0.5%"
      },
      {
        "coin": "STXX",
        "score": 95,
        "price": "783.28",
        "change_24h": "+6.9%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "EGLD",
        "score": 95,
        "price": "3.252",
        "change_24h": "+5.0%",
        "change_4h": "+1.6%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "BR",
        "score": 95,
        "price": "0.15875",
        "change_24h": "+10.0%",
        "change_4h": "+2.5%",
        "change_8h": "+5.0%"
      },
      {
        "coin": "USUAL",
        "score": 90,
        "price": "0.00934",
        "change_24h": "+5.3%",
        "change_4h": "+1.2%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "1000XEC",
        "score": 85,
        "price": "0.007869",
        "change_24h": "+18.7%",
        "change_4h": "+1.2%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "BANK",
        "score": 85,
        "price": "0.07441",
        "change_24h": "+18.3%",
        "change_4h": "+4.9%",
        "change_8h": "+9.9%"
      },
      {
        "coin": "STAR",
        "score": 75,
        "price": "0.22859",
        "change_24h": "+28.4%",
        "change_4h": "+7.0%",
        "change_8h": "+13.9%"
      },
      {
        "coin": "ESPORTS",
        "score": 70,
        "price": "0.03449",
        "change_24h": "+45.3%",
        "change_4h": "+14.8%",
        "change_8h": "+29.5%"
      },
      {
        "coin": "UB",
        "score": 70,
        "price": "0.09259",
        "change_24h": "+15.7%",
        "change_4h": "+3.1%",
        "change_8h": "+6.2%"
      },
      {
        "coin": "AVAAI",
        "score": 70,
        "price": "0.007446",
        "change_24h": "+21.0%",
        "change_4h": "+3.9%",
        "change_8h": "+7.9%"
      },
      {
        "coin": "DRAM",
        "score": 60,
        "price": "52.36",
        "change_24h": "+1.6%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "SAMSUNG",
        "score": 60,
        "price": "169.11",
        "change_24h": "+2.0%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "KORU",
        "score": 55,
        "price": "18.18",
        "change_24h": "-0.9%",
        "change_4h": "+0.7%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "SOXL",
        "score": 55,
        "price": "134.34",
        "change_24h": "-3.1%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "KAITO",
        "score": 55,
        "price": "0.865",
        "change_24h": "+2.1%",
        "change_4h": "-1.2%",
        "change_8h": "-2.4%"
      },
      {
        "coin": "ZEC",
        "score": 55,
        "price": "547.37",
        "change_24h": "+2.0%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
      },
      {
        "coin": "MRVL",
        "score": 55,
        "price": "186.26",
        "change_24h": "+1.8%",
        "change_4h": "+0.1%",
        "change_8h": "+0.2%"
      },
      {
        "coin": "ADA",
        "score": 55,
        "price": "0.1678",
        "change_24h": "+4.0%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "SOXS",
        "score": 55,
        "price": "54.54",
        "change_24h": "+2.6%",
        "change_4h": "-1.6%",
        "change_8h": "-3.2%"
      },
      {
        "coin": "BZ",
        "score": 55,
        "price": "86.59",
        "change_24h": "+2.9%",
        "change_4h": "+1.1%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "MU",
        "score": 55,
        "price": "846.45",
        "change_24h": "+1.7%",
        "change_4h": "-0.4%",
        "change_8h": "-0.9%"
      },
      {
        "coin": "MSTR",
        "score": 55,
        "price": "95.15",
        "change_24h": "+1.9%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "ONDO",
        "score": 55,
        "price": "0.3835",
        "change_24h": "+3.4%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "CL",
        "score": 55,
        "price": "81.95",
        "change_24h": "+3.2%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "BTC",
        "score": 50,
        "price": "63973.5",
        "change_24h": "+0.0%",
        "change_4h": "+0.4%",
        "change_8h": "+0.9%"
      },
      {
        "coin": "ENA",
        "score": 50,
        "price": "0.08251",
        "change_24h": "+0.2%",
        "change_4h": "+1.1%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "XAG",
        "score": 50,
        "price": "56.06",
        "change_24h": "+0.8%",
        "change_4h": "+0.4%",
        "change_8h": "+0.9%"
      },
      {
        "coin": "1000PEPE",
        "score": 50,
        "price": "0.0027471",
        "change_24h": "+0.2%",
        "change_4h": "+0.5%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "MUU",
        "score": 50,
        "price": "27.08",
        "change_24h": "+3.4%",
        "change_4h": "-0.8%",
        "change_8h": "-1.6%"
      },
      {
        "coin": "UNI",
        "score": 50,
        "price": "3.588",
        "change_24h": "+0.7%",
        "change_4h": "+0.6%",
        "change_8h": "+1.2%"
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
