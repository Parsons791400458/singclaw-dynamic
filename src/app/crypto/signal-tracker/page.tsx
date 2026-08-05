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
    "label": "今天 · 2026-08-05",
    "data": [
      {
        "coin": "RKLB",
        "score": 100,
        "price": "75.6",
        "change_24h": "+7.0%",
        "change_4h": "+1.1%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "MU",
        "score": 100,
        "price": "881.84",
        "change_24h": "+6.6%",
        "change_4h": "+1.2%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "DEXE",
        "score": 100,
        "price": "2.397",
        "change_24h": "+8.4%",
        "change_4h": "+2.7%",
        "change_8h": "+5.4%"
      },
      {
        "coin": "ASTS",
        "score": 100,
        "price": "69.35",
        "change_24h": "+9.2%",
        "change_4h": "+1.4%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "STO",
        "score": 100,
        "price": "0.04055",
        "change_24h": "+12.0%",
        "change_4h": "-2.9%",
        "change_8h": "-5.9%"
      },
      {
        "coin": "EWY",
        "score": 100,
        "price": "169.27",
        "change_24h": "+5.6%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "TUT",
        "score": 100,
        "price": "0.02292",
        "change_24h": "+9.8%",
        "change_4h": "+0.8%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "MUU",
        "score": 100,
        "price": "26.95",
        "change_24h": "+13.0%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "COHR",
        "score": 100,
        "price": "324.25",
        "change_24h": "+12.2%",
        "change_4h": "+1.0%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "ZHIPU",
        "score": 100,
        "price": "133.37",
        "change_24h": "+9.0%",
        "change_4h": "+1.8%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "GLW",
        "score": 100,
        "price": "158.57",
        "change_24h": "+7.3%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "AIO",
        "score": 100,
        "price": "0.03962",
        "change_24h": "+12.3%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
      },
      {
        "coin": "SNDK",
        "score": 100,
        "price": "1411.33",
        "change_24h": "+9.5%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "PUMP",
        "score": 100,
        "price": "0.002409",
        "change_24h": "+13.7%",
        "change_4h": "+1.6%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "GRAM",
        "score": 100,
        "price": "1.392",
        "change_24h": "+5.1%",
        "change_4h": "+1.0%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "CRWV",
        "score": 100,
        "price": "90.59",
        "change_24h": "+5.7%",
        "change_4h": "+0.7%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "SYN",
        "score": 100,
        "price": "0.0979",
        "change_24h": "+14.9%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "ZEC",
        "score": 100,
        "price": "507.15",
        "change_24h": "+5.8%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "DELL",
        "score": 100,
        "price": "465.48",
        "change_24h": "+7.9%",
        "change_4h": "+1.3%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "EPIC",
        "score": 100,
        "price": "1.0265",
        "change_24h": "+11.9%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "PLTR",
        "score": 100,
        "price": "159.53",
        "change_24h": "+11.4%",
        "change_4h": "+1.9%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "TQQQ",
        "score": 100,
        "price": "74.42",
        "change_24h": "+9.5%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "DRAM",
        "score": 100,
        "price": "53.91",
        "change_24h": "+6.7%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "ZRO",
        "score": 100,
        "price": "0.7893",
        "change_24h": "+7.9%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "SKHYNIX",
        "score": 100,
        "price": "1164.0",
        "change_24h": "+9.4%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "MRVL",
        "score": 100,
        "price": "216.95",
        "change_24h": "+11.0%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "INTC",
        "score": 100,
        "price": "97.7",
        "change_24h": "+7.4%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
      },
      {
        "coin": "GWEI",
        "score": 100,
        "price": "0.01771",
        "change_24h": "+10.5%",
        "change_4h": "+2.3%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "BIO",
        "score": 100,
        "price": "0.02387",
        "change_24h": "+8.4%",
        "change_4h": "+2.1%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "ALAB",
        "score": 100,
        "price": "367.03",
        "change_24h": "+14.5%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "GIGADEV",
        "score": 100,
        "price": "58.19",
        "change_24h": "+8.4%",
        "change_4h": "+1.0%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "LITE",
        "score": 100,
        "price": "845.74",
        "change_24h": "+8.4%",
        "change_4h": "+0.5%",
        "change_8h": "+1.0%"
      },
      {
        "coin": "ACE",
        "score": 100,
        "price": "0.07247",
        "change_24h": "+10.2%",
        "change_4h": "+2.7%",
        "change_8h": "+5.5%"
      },
      {
        "coin": "SKHY",
        "score": 100,
        "price": "153.15",
        "change_24h": "+8.2%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "INTW",
        "score": 100,
        "price": "22.41",
        "change_24h": "+14.0%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "ARM",
        "score": 100,
        "price": "276.4",
        "change_24h": "+14.7%",
        "change_4h": "+2.8%",
        "change_8h": "+5.6%"
      },
      {
        "coin": "CRDO",
        "score": 95,
        "price": "237.3",
        "change_24h": "+9.2%",
        "change_4h": "+1.0%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "NOK",
        "score": 95,
        "price": "9.89",
        "change_24h": "+5.8%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
      },
      {
        "coin": "XPD",
        "score": 95,
        "price": "1341.06",
        "change_24h": "+5.4%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "TER",
        "score": 95,
        "price": "405.33",
        "change_24h": "+12.1%",
        "change_4h": "+2.5%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "QNTX",
        "score": 95,
        "price": "59.03",
        "change_24h": "+5.6%",
        "change_4h": "+1.1%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "LRCX",
        "score": 95,
        "price": "317.01",
        "change_24h": "+9.1%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "XNY",
        "score": 95,
        "price": "0.007368",
        "change_24h": "+6.3%",
        "change_4h": "+2.3%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "JCT",
        "score": 95,
        "price": "0.003925",
        "change_24h": "+7.2%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "XPT",
        "score": 95,
        "price": "1727.84",
        "change_24h": "+5.3%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "SHAZ",
        "score": 95,
        "price": "55.58",
        "change_24h": "+6.9%",
        "change_4h": "+0.5%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "USAR",
        "score": 95,
        "price": "17.38",
        "change_24h": "+8.4%",
        "change_4h": "+1.6%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "AVGO",
        "score": 95,
        "price": "417.9",
        "change_24h": "+7.2%",
        "change_4h": "+1.4%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "SMCI",
        "score": 95,
        "price": "31.65",
        "change_24h": "+10.0%",
        "change_4h": "+2.3%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "MUBARAK",
        "score": 95,
        "price": "0.0137",
        "change_24h": "+7.3%",
        "change_4h": "+2.5%",
        "change_8h": "+4.9%"
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
