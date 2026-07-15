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
    "label": "今天 · 2026-07-15",
    "data": [
      {
        "coin": "SNDK",
        "score": 100,
        "price": "1774.8",
        "change_24h": "+5.2%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "DELL",
        "score": 100,
        "price": "459.63",
        "change_24h": "+7.4%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "FF",
        "score": 100,
        "price": "0.06507",
        "change_24h": "+7.8%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "PUMP",
        "score": 100,
        "price": "0.001598",
        "change_24h": "+7.7%",
        "change_4h": "+4.0%",
        "change_8h": "+8.0%"
      },
      {
        "coin": "BMNR",
        "score": 100,
        "price": "16.33",
        "change_24h": "+10.6%",
        "change_4h": "+2.5%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "ZAMA",
        "score": 100,
        "price": "0.03512",
        "change_24h": "+7.1%",
        "change_4h": "+2.5%",
        "change_8h": "+4.9%"
      },
      {
        "coin": "WOO",
        "score": 100,
        "price": "0.01232",
        "change_24h": "+9.3%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "PENDLE",
        "score": 100,
        "price": "1.558",
        "change_24h": "+6.6%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "DRAM",
        "score": 100,
        "price": "61.67",
        "change_24h": "+6.3%",
        "change_4h": "+2.8%",
        "change_8h": "+5.6%"
      },
      {
        "coin": "ARC",
        "score": 100,
        "price": "0.08061",
        "change_24h": "+8.4%",
        "change_4h": "+3.7%",
        "change_8h": "+7.5%"
      },
      {
        "coin": "GRASS",
        "score": 100,
        "price": "0.395",
        "change_24h": "+10.4%",
        "change_4h": "+2.5%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "INTC",
        "score": 100,
        "price": "109.82",
        "change_24h": "+6.3%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "UAI",
        "score": 100,
        "price": "0.3789",
        "change_24h": "+6.3%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "FARTCOIN",
        "score": 100,
        "price": "0.1514",
        "change_24h": "+9.1%",
        "change_4h": "+2.6%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "MSTR",
        "score": 100,
        "price": "98.18",
        "change_24h": "+6.0%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "B",
        "score": 100,
        "price": "0.1133",
        "change_24h": "+6.9%",
        "change_4h": "+0.8%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "VIRTUAL",
        "score": 100,
        "price": "0.5842",
        "change_24h": "+6.2%",
        "change_4h": "+1.3%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "BOT",
        "score": 100,
        "price": "36.97",
        "change_24h": "+13.1%",
        "change_4h": "+2.7%",
        "change_8h": "+5.3%"
      },
      {
        "coin": "SKHYNIX",
        "score": 100,
        "price": "1407.28",
        "change_24h": "+10.1%",
        "change_4h": "+3.7%",
        "change_8h": "+7.5%"
      },
      {
        "coin": "ETH",
        "score": 100,
        "price": "1876.22",
        "change_24h": "+5.1%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "MVLL",
        "score": 100,
        "price": "31.34",
        "change_24h": "+6.7%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "O",
        "score": 100,
        "price": "0.562",
        "change_24h": "+6.8%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "INJ",
        "score": 100,
        "price": "5.026",
        "change_24h": "+7.6%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "SPX",
        "score": 100,
        "price": "0.3798",
        "change_24h": "+10.3%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "SOXL",
        "score": 100,
        "price": "182.73",
        "change_24h": "+8.7%",
        "change_4h": "+2.4%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "AIOT",
        "score": 100,
        "price": "0.0382",
        "change_24h": "+8.2%",
        "change_4h": "-2.9%",
        "change_8h": "-5.7%"
      },
      {
        "coin": "LIT",
        "score": 100,
        "price": "2.6087",
        "change_24h": "+8.7%",
        "change_4h": "+2.4%",
        "change_8h": "+4.9%"
      },
      {
        "coin": "SYN",
        "score": 100,
        "price": "0.2748",
        "change_24h": "+14.4%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "DODOX",
        "score": 100,
        "price": "0.02466",
        "change_24h": "+13.2%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "TRIA",
        "score": 100,
        "price": "0.00925",
        "change_24h": "+12.7%",
        "change_4h": "-1.0%",
        "change_8h": "-2.0%"
      },
      {
        "coin": "MU",
        "score": 100,
        "price": "992.47",
        "change_24h": "+5.3%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "ESPORTS",
        "score": 100,
        "price": "0.01491",
        "change_24h": "+6.5%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "WLD",
        "score": 100,
        "price": "0.4157",
        "change_24h": "+6.5%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "TOWNS",
        "score": 100,
        "price": "0.002055",
        "change_24h": "+9.3%",
        "change_4h": "-0.7%",
        "change_8h": "-1.5%"
      },
      {
        "coin": "XPL",
        "score": 100,
        "price": "0.09393",
        "change_24h": "+5.6%",
        "change_4h": "+1.0%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "LINK",
        "score": 100,
        "price": "8.333",
        "change_24h": "+5.1%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "EWY",
        "score": 100,
        "price": "177.9",
        "change_24h": "+5.4%",
        "change_4h": "+2.5%",
        "change_8h": "+4.9%"
      },
      {
        "coin": "SNXX",
        "score": 100,
        "price": "23.52",
        "change_24h": "+10.2%",
        "change_4h": "+3.2%",
        "change_8h": "+6.5%"
      },
      {
        "coin": "LITE",
        "score": 100,
        "price": "826.53",
        "change_24h": "+7.3%",
        "change_4h": "+1.8%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "ZEC",
        "score": 100,
        "price": "555.66",
        "change_24h": "+11.0%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "SANTOS",
        "score": 100,
        "price": "0.5549",
        "change_24h": "+11.7%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "SWARMS",
        "score": 95,
        "price": "0.006301",
        "change_24h": "+7.4%",
        "change_4h": "+0.7%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "INTW",
        "score": 95,
        "price": "30.16",
        "change_24h": "+12.3%",
        "change_4h": "+3.6%",
        "change_8h": "+7.3%"
      },
      {
        "coin": "TAKE",
        "score": 95,
        "price": "0.02079",
        "change_24h": "+8.3%",
        "change_4h": "+1.4%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "C",
        "score": 95,
        "price": "0.0685",
        "change_24h": "+9.3%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "MET",
        "score": 95,
        "price": "0.1592",
        "change_24h": "+7.9%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "ALPINE",
        "score": 95,
        "price": "0.3254",
        "change_24h": "+9.4%",
        "change_4h": "+0.7%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "DATAIP",
        "score": 95,
        "price": "0.2903",
        "change_24h": "+6.9%",
        "change_4h": "+2.6%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "APT",
        "score": 95,
        "price": "0.6247",
        "change_24h": "+5.1%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "BE",
        "score": 95,
        "price": "246.93",
        "change_24h": "+5.2%",
        "change_4h": "+1.1%",
        "change_8h": "+2.1%"
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
