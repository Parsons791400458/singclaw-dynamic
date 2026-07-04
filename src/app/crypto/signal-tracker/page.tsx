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
    "label": "今天 · 2026-07-04",
    "data": [
      {
        "coin": "VELODROME",
        "score": 100,
        "price": "0.02353",
        "change_24h": "+8.1%",
        "change_4h": "-1.9%",
        "change_8h": "-3.8%"
      },
      {
        "coin": "THE",
        "score": 100,
        "price": "0.06637",
        "change_24h": "+7.7%",
        "change_4h": "-2.4%",
        "change_8h": "-4.8%"
      },
      {
        "coin": "HYPE",
        "score": 100,
        "price": "70.361",
        "change_24h": "+5.4%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "ALICE",
        "score": 100,
        "price": "0.1267",
        "change_24h": "+6.4%",
        "change_4h": "+0.3%",
        "change_8h": "+0.5%"
      },
      {
        "coin": "S",
        "score": 100,
        "price": "0.02692",
        "change_24h": "+5.7%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "1000BONK",
        "score": 100,
        "price": "0.00487",
        "change_24h": "+11.3%",
        "change_4h": "+1.8%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "RIF",
        "score": 100,
        "price": "0.11351",
        "change_24h": "+8.9%",
        "change_4h": "-2.4%",
        "change_8h": "-4.7%"
      },
      {
        "coin": "KITE",
        "score": 100,
        "price": "0.11787",
        "change_24h": "+12.3%",
        "change_4h": "+2.4%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "ETHFI",
        "score": 100,
        "price": "0.3736",
        "change_24h": "+11.8%",
        "change_4h": "+2.2%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "COOKIE",
        "score": 100,
        "price": "0.00994",
        "change_24h": "+6.7%",
        "change_4h": "-0.9%",
        "change_8h": "-1.8%"
      },
      {
        "coin": "RIVER",
        "score": 100,
        "price": "4.067",
        "change_24h": "+5.9%",
        "change_4h": "+0.2%",
        "change_8h": "+0.5%"
      },
      {
        "coin": "XPL",
        "score": 100,
        "price": "0.10715",
        "change_24h": "+11.3%",
        "change_4h": "+0.6%",
        "change_8h": "+1.2%"
      },
      {
        "coin": "MET",
        "score": 100,
        "price": "0.189",
        "change_24h": "+6.7%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "CLO",
        "score": 100,
        "price": "0.14017",
        "change_24h": "+6.7%",
        "change_4h": "-0.5%",
        "change_8h": "-0.9%"
      },
      {
        "coin": "KORU",
        "score": 100,
        "price": "614.94",
        "change_24h": "+8.0%",
        "change_4h": "+2.5%",
        "change_8h": "+5.0%"
      },
      {
        "coin": "ZEC",
        "score": 100,
        "price": "459.69",
        "change_24h": "+6.0%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "OP",
        "score": 100,
        "price": "0.1063",
        "change_24h": "+6.5%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "1000FLOKI",
        "score": 100,
        "price": "0.02377",
        "change_24h": "+6.7%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "ADA",
        "score": 100,
        "price": "0.1783",
        "change_24h": "+8.3%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "NIL",
        "score": 100,
        "price": "0.03938",
        "change_24h": "+10.9%",
        "change_4h": "+1.1%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "TRB",
        "score": 100,
        "price": "15.806",
        "change_24h": "+13.7%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "BLESS",
        "score": 100,
        "price": "0.008691",
        "change_24h": "+11.8%",
        "change_4h": "-0.8%",
        "change_8h": "-1.7%"
      },
      {
        "coin": "AKE",
        "score": 100,
        "price": "0.0004268",
        "change_24h": "+5.3%",
        "change_4h": "-3.6%",
        "change_8h": "-7.2%"
      },
      {
        "coin": "1000PEPE",
        "score": 100,
        "price": "0.0027586",
        "change_24h": "+12.4%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "AERO",
        "score": 100,
        "price": "0.5456",
        "change_24h": "+6.4%",
        "change_4h": "+0.5%",
        "change_8h": "+1.0%"
      },
      {
        "coin": "UB",
        "score": 100,
        "price": "0.0968",
        "change_24h": "+9.2%",
        "change_4h": "-0.3%",
        "change_8h": "-0.6%"
      },
      {
        "coin": "GRASS",
        "score": 100,
        "price": "0.5523",
        "change_24h": "+9.0%",
        "change_4h": "+0.1%",
        "change_8h": "+0.2%"
      },
      {
        "coin": "SKHYNIX",
        "score": 100,
        "price": "1620.47",
        "change_24h": "+11.5%",
        "change_4h": "+2.9%",
        "change_8h": "+5.8%"
      },
      {
        "coin": "XTZ",
        "score": 100,
        "price": "0.2377",
        "change_24h": "+9.0%",
        "change_4h": "+1.1%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "SENT",
        "score": 100,
        "price": "0.0144",
        "change_24h": "+6.0%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "GWEI",
        "score": 100,
        "price": "0.1361",
        "change_24h": "+12.7%",
        "change_4h": "+0.1%",
        "change_8h": "+0.1%"
      },
      {
        "coin": "POPCAT",
        "score": 100,
        "price": "0.05107",
        "change_24h": "+5.7%",
        "change_4h": "+0.7%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "BULLA",
        "score": 100,
        "price": "0.006713",
        "change_24h": "+10.8%",
        "change_4h": "-1.8%",
        "change_8h": "-3.6%"
      },
      {
        "coin": "GALA",
        "score": 100,
        "price": "0.002472",
        "change_24h": "+6.4%",
        "change_4h": "+0.7%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "MANA",
        "score": 100,
        "price": "0.0705",
        "change_24h": "+9.8%",
        "change_4h": "-0.8%",
        "change_8h": "-1.6%"
      },
      {
        "coin": "TIA",
        "score": 100,
        "price": "0.3955",
        "change_24h": "+7.1%",
        "change_4h": "+1.0%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "SPX",
        "score": 95,
        "price": "0.4004",
        "change_24h": "+5.6%",
        "change_4h": "-0.1%",
        "change_8h": "-0.2%"
      },
      {
        "coin": "APR",
        "score": 95,
        "price": "0.218",
        "change_24h": "+6.6%",
        "change_4h": "+2.0%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "SXT",
        "score": 95,
        "price": "0.007447",
        "change_24h": "+5.9%",
        "change_4h": "+0.6%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "HUMA",
        "score": 95,
        "price": "0.02379",
        "change_24h": "+10.0%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "IMX",
        "score": 95,
        "price": "0.1293",
        "change_24h": "+6.4%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "MINA",
        "score": 95,
        "price": "0.04595",
        "change_24h": "+7.4%",
        "change_4h": "+0.7%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "KAITO",
        "score": 95,
        "price": "0.6195",
        "change_24h": "+8.0%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "GOAT",
        "score": 95,
        "price": "0.01428",
        "change_24h": "+5.2%",
        "change_4h": "+0.5%",
        "change_8h": "+1.0%"
      },
      {
        "coin": "STAR",
        "score": 95,
        "price": "0.15058",
        "change_24h": "+8.4%",
        "change_4h": "+0.4%",
        "change_8h": "+0.7%"
      },
      {
        "coin": "ON",
        "score": 95,
        "price": "0.08924",
        "change_24h": "+9.1%",
        "change_4h": "+1.6%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "MMT",
        "score": 95,
        "price": "0.1633",
        "change_24h": "+8.2%",
        "change_4h": "+2.4%",
        "change_8h": "+4.9%"
      },
      {
        "coin": "MELANIA",
        "score": 95,
        "price": "0.08246",
        "change_24h": "+7.8%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "PIXEL",
        "score": 95,
        "price": "0.005214",
        "change_24h": "+5.8%",
        "change_4h": "+0.5%",
        "change_8h": "+1.0%"
      },
      {
        "coin": "4",
        "score": 95,
        "price": "0.01011",
        "change_24h": "+7.5%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
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
