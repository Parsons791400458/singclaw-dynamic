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
    "label": "今天 · 2026-06-25",
    "data": [
      {
        "coin": "DODOX",
        "score": 100,
        "price": "0.018166",
        "change_24h": "+12.8%",
        "change_4h": "+1.9%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "SAMSUNG",
        "score": 100,
        "price": "233.12",
        "change_24h": "+8.0%",
        "change_4h": "+2.3%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "AAVE",
        "score": 100,
        "price": "78.85",
        "change_24h": "+8.9%",
        "change_4h": "+2.0%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "KORU",
        "score": 100,
        "price": "843.81",
        "change_24h": "+11.0%",
        "change_4h": "+2.5%",
        "change_8h": "+4.9%"
      },
      {
        "coin": "EVAA",
        "score": 100,
        "price": "0.8652",
        "change_24h": "+6.0%",
        "change_4h": "-0.1%",
        "change_8h": "-0.3%"
      },
      {
        "coin": "IDOL",
        "score": 100,
        "price": "0.02001",
        "change_24h": "+5.3%",
        "change_4h": "+12.0%",
        "change_8h": "+23.9%"
      },
      {
        "coin": "GLW",
        "score": 100,
        "price": "213.4",
        "change_24h": "+8.4%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "MU",
        "score": 100,
        "price": "1195.25",
        "change_24h": "+9.5%",
        "change_4h": "+3.8%",
        "change_8h": "+7.6%"
      },
      {
        "coin": "QCOM",
        "score": 100,
        "price": "219.33",
        "change_24h": "+6.5%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "CELO",
        "score": 100,
        "price": "0.06736",
        "change_24h": "+10.3%",
        "change_4h": "+2.3%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "DRAM",
        "score": 100,
        "price": "76.94",
        "change_24h": "+7.2%",
        "change_4h": "+1.7%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "LIT",
        "score": 100,
        "price": "1.6444",
        "change_24h": "+8.0%",
        "change_4h": "+1.8%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "RECALL",
        "score": 100,
        "price": "0.03519",
        "change_24h": "+11.6%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "GWEI",
        "score": 100,
        "price": "0.1333",
        "change_24h": "+12.1%",
        "change_4h": "+2.5%",
        "change_8h": "+5.0%"
      },
      {
        "coin": "EDEN",
        "score": 100,
        "price": "0.04719",
        "change_24h": "+5.1%",
        "change_4h": "+4.1%",
        "change_8h": "+8.2%"
      },
      {
        "coin": "XPL",
        "score": 100,
        "price": "0.09348",
        "change_24h": "+5.3%",
        "change_4h": "+2.8%",
        "change_8h": "+5.6%"
      },
      {
        "coin": "GRASS",
        "score": 100,
        "price": "0.4612",
        "change_24h": "+6.4%",
        "change_4h": "+2.1%",
        "change_8h": "+4.3%"
      },
      {
        "coin": "SAHARA",
        "score": 100,
        "price": "0.01343",
        "change_24h": "+11.8%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "JUP",
        "score": 100,
        "price": "0.2191",
        "change_24h": "+5.8%",
        "change_4h": "+2.4%",
        "change_8h": "+4.9%"
      },
      {
        "coin": "SYN",
        "score": 100,
        "price": "0.31676",
        "change_24h": "+8.4%",
        "change_4h": "+0.1%",
        "change_8h": "+0.3%"
      },
      {
        "coin": "G",
        "score": 100,
        "price": "0.003058",
        "change_24h": "+5.5%",
        "change_4h": "-1.8%",
        "change_8h": "-3.5%"
      },
      {
        "coin": "INX",
        "score": 100,
        "price": "0.008836",
        "change_24h": "+6.8%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "MAVIA",
        "score": 100,
        "price": "0.02772",
        "change_24h": "+14.5%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "MANTA",
        "score": 100,
        "price": "0.08526",
        "change_24h": "+7.9%",
        "change_4h": "+2.2%",
        "change_8h": "+4.3%"
      },
      {
        "coin": "USELESS",
        "score": 100,
        "price": "0.07298",
        "change_24h": "+5.6%",
        "change_4h": "+2.6%",
        "change_8h": "+5.3%"
      },
      {
        "coin": "ACU",
        "score": 95,
        "price": "0.08189",
        "change_24h": "+5.5%",
        "change_4h": "+2.4%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "LRCX",
        "score": 95,
        "price": "398.44",
        "change_24h": "+5.3%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "MORPHO",
        "score": 95,
        "price": "1.7227",
        "change_24h": "+6.2%",
        "change_4h": "+1.3%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "AKE",
        "score": 95,
        "price": "0.0003753",
        "change_24h": "+9.1%",
        "change_4h": "+0.0%",
        "change_8h": "+0.1%"
      },
      {
        "coin": "APR",
        "score": 90,
        "price": "0.2074",
        "change_24h": "+5.9%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "HD",
        "score": 90,
        "price": "342.01",
        "change_24h": "+5.2%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "UBER",
        "score": 90,
        "price": "74.01",
        "change_24h": "+6.0%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "BAS",
        "score": 85,
        "price": "0.040453",
        "change_24h": "+27.1%",
        "change_4h": "+0.1%",
        "change_8h": "+0.1%"
      },
      {
        "coin": "LAB",
        "score": 85,
        "price": "16.749",
        "change_24h": "+18.8%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "ID",
        "score": 80,
        "price": "0.04157",
        "change_24h": "+21.1%",
        "change_4h": "+4.7%",
        "change_8h": "+9.3%"
      },
      {
        "coin": "SLX",
        "score": 70,
        "price": "0.32024",
        "change_24h": "+37.2%",
        "change_4h": "+7.8%",
        "change_8h": "+15.6%"
      },
      {
        "coin": "SOXL",
        "score": 65,
        "price": "252.41",
        "change_24h": "+4.6%",
        "change_4h": "+2.9%",
        "change_8h": "+5.9%"
      },
      {
        "coin": "1000RATS",
        "score": 65,
        "price": "0.02879",
        "change_24h": "+15.9%",
        "change_4h": "+4.3%",
        "change_8h": "+8.5%"
      },
      {
        "coin": "ESPORTS",
        "score": 60,
        "price": "0.03258",
        "change_24h": "+0.4%",
        "change_4h": "+2.9%",
        "change_8h": "+5.8%"
      },
      {
        "coin": "O",
        "score": 60,
        "price": "0.779",
        "change_24h": "+1.9%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "EWY",
        "score": 60,
        "price": "206.04",
        "change_24h": "+4.1%",
        "change_4h": "+0.9%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "SKHYNIX",
        "score": 60,
        "price": "1786.3",
        "change_24h": "+3.7%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "SNDK",
        "score": 60,
        "price": "2106.16",
        "change_24h": "+4.3%",
        "change_4h": "+2.2%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "MRVL",
        "score": 60,
        "price": "286.75",
        "change_24h": "+1.0%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "VELVET",
        "score": 55,
        "price": "0.4818",
        "change_24h": "+4.7%",
        "change_4h": "+4.9%",
        "change_8h": "+9.9%"
      },
      {
        "coin": "INTC",
        "score": 55,
        "price": "137.28",
        "change_24h": "+1.6%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "UB",
        "score": 55,
        "price": "0.07163",
        "change_24h": "-2.1%",
        "change_4h": "+3.9%",
        "change_8h": "+7.8%"
      },
      {
        "coin": "HYPE",
        "score": 55,
        "price": "63.175",
        "change_24h": "+0.8%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "OP",
        "score": 50,
        "price": "0.1056",
        "change_24h": "+3.5%",
        "change_4h": "+2.4%",
        "change_8h": "+4.8%"
      },
      {
        "coin": "ADA",
        "score": 50,
        "price": "0.1477",
        "change_24h": "-3.5%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
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
