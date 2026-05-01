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
    "label": "今天 · 2026-05-01",
    "data": [
      {
        "coin": "DRIFT",
        "score": 100,
        "price": "0.04025",
        "change_24h": "+12.2%",
        "change_4h": "+5.6%",
        "change_8h": "+11.3%"
      },
      {
        "coin": "ZEC",
        "score": 100,
        "price": "345.32",
        "change_24h": "+5.2%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
      },
      {
        "coin": "NATGAS",
        "score": 100,
        "price": "2.776",
        "change_24h": "+5.4%",
        "change_4h": "+1.5%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "REZ",
        "score": 100,
        "price": "0.004557",
        "change_24h": "+6.6%",
        "change_4h": "+1.8%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "APE",
        "score": 100,
        "price": "0.1618",
        "change_24h": "+8.2%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "GUA",
        "score": 100,
        "price": "0.8753",
        "change_24h": "+7.5%",
        "change_4h": "+0.2%",
        "change_8h": "+0.3%"
      },
      {
        "coin": "AIXBT",
        "score": 100,
        "price": "0.03148",
        "change_24h": "+9.2%",
        "change_4h": "+2.4%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "HUMA",
        "score": 100,
        "price": "0.022489",
        "change_24h": "+9.5%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "USTC",
        "score": 100,
        "price": "0.006823",
        "change_24h": "+12.4%",
        "change_4h": "+2.5%",
        "change_8h": "+5.0%"
      },
      {
        "coin": "1000LUNC",
        "score": 100,
        "price": "0.07414",
        "change_24h": "+6.2%",
        "change_4h": "+1.0%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "CHR",
        "score": 100,
        "price": "0.02433",
        "change_24h": "+8.9%",
        "change_4h": "+2.4%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "FLOW",
        "score": 100,
        "price": "0.04454",
        "change_24h": "+7.7%",
        "change_4h": "+0.8%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "FORM",
        "score": 100,
        "price": "0.2648",
        "change_24h": "+8.0%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "PENDLE",
        "score": 100,
        "price": "1.3963",
        "change_24h": "+7.5%",
        "change_4h": "+1.6%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "AKE",
        "score": 100,
        "price": "0.0003284",
        "change_24h": "+6.5%",
        "change_4h": "-3.2%",
        "change_8h": "-6.4%"
      },
      {
        "coin": "UB",
        "score": 100,
        "price": "0.07434",
        "change_24h": "+11.8%",
        "change_4h": "+6.3%",
        "change_8h": "+12.6%"
      },
      {
        "coin": "API3",
        "score": 100,
        "price": "0.3828",
        "change_24h": "+5.7%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "ARIA",
        "score": 100,
        "price": "0.063",
        "change_24h": "+5.7%",
        "change_4h": "+0.8%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "BAS",
        "score": 100,
        "price": "0.015271",
        "change_24h": "+11.8%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "LUNA2",
        "score": 100,
        "price": "0.06879",
        "change_24h": "+7.4%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "SKR",
        "score": 95,
        "price": "0.016767",
        "change_24h": "+5.8%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "TRB",
        "score": 95,
        "price": "19.776",
        "change_24h": "+7.0%",
        "change_4h": "+2.0%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "PAYP",
        "score": 95,
        "price": "21.93",
        "change_24h": "+8.3%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "B2",
        "score": 95,
        "price": "0.5474",
        "change_24h": "+9.2%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "GUN",
        "score": 95,
        "price": "0.01511",
        "change_24h": "+6.0%",
        "change_4h": "+1.5%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "ALLO",
        "score": 95,
        "price": "0.12407",
        "change_24h": "+13.3%",
        "change_4h": "+3.1%",
        "change_8h": "+6.2%"
      },
      {
        "coin": "TRIA",
        "score": 95,
        "price": "0.03764",
        "change_24h": "+5.3%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "ACU",
        "score": 95,
        "price": "0.0944",
        "change_24h": "+6.5%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "POWER",
        "score": 90,
        "price": "0.09171",
        "change_24h": "+6.0%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "AIOT",
        "score": 85,
        "price": "0.12388",
        "change_24h": "+24.5%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "BIO",
        "score": 85,
        "price": "0.04214",
        "change_24h": "+16.1%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "ORCA",
        "score": 85,
        "price": "1.968",
        "change_24h": "+20.6%",
        "change_4h": "+2.7%",
        "change_8h": "+5.4%"
      },
      {
        "coin": "GWEI",
        "score": 80,
        "price": "0.1091",
        "change_24h": "+16.2%",
        "change_4h": "+1.6%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "ENSO",
        "score": 80,
        "price": "1.0617",
        "change_24h": "+19.1%",
        "change_4h": "+3.6%",
        "change_8h": "+7.2%"
      },
      {
        "coin": "TAC",
        "score": 75,
        "price": "0.018437",
        "change_24h": "+17.0%",
        "change_4h": "-3.6%",
        "change_8h": "-7.1%"
      },
      {
        "coin": "GENIUS",
        "score": 75,
        "price": "0.5346",
        "change_24h": "+17.8%",
        "change_4h": "+6.7%",
        "change_8h": "+13.4%"
      },
      {
        "coin": "TAG",
        "score": 75,
        "price": "0.0007005",
        "change_24h": "+28.8%",
        "change_4h": "+7.3%",
        "change_8h": "+14.6%"
      },
      {
        "coin": "SKYAI",
        "score": 70,
        "price": "0.37757",
        "change_24h": "+31.0%",
        "change_4h": "+6.6%",
        "change_8h": "+13.3%"
      },
      {
        "coin": "BLUAI",
        "score": 70,
        "price": "0.014069",
        "change_24h": "+20.5%",
        "change_4h": "+4.2%",
        "change_8h": "+8.4%"
      },
      {
        "coin": "BSB",
        "score": 70,
        "price": "0.61535",
        "change_24h": "+42.1%",
        "change_4h": "+8.7%",
        "change_8h": "+17.4%"
      },
      {
        "coin": "MAGMA",
        "score": 65,
        "price": "0.23794",
        "change_24h": "+17.8%",
        "change_4h": "+3.8%",
        "change_8h": "+7.6%"
      },
      {
        "coin": "SWARMS",
        "score": 60,
        "price": "0.026585",
        "change_24h": "+2.1%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "PENGU",
        "score": 55,
        "price": "0.010088",
        "change_24h": "+1.7%",
        "change_4h": "+1.5%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "BZ",
        "score": 55,
        "price": "111.34",
        "change_24h": "+0.3%",
        "change_4h": "+0.2%",
        "change_8h": "+0.5%"
      },
      {
        "coin": "NAORIS",
        "score": 55,
        "price": "0.13101",
        "change_24h": "-4.5%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "XAU",
        "score": 50,
        "price": "4622.69",
        "change_24h": "+0.9%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "XAG",
        "score": 50,
        "price": "74.25",
        "change_24h": "+1.8%",
        "change_4h": "+0.8%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "HYPE",
        "score": 50,
        "price": "40.352",
        "change_24h": "+0.5%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "MEGA",
        "score": 50,
        "price": "0.16819",
        "change_24h": "-12.7%",
        "change_4h": "-2.8%",
        "change_8h": "-5.6%"
      },
      {
        "coin": "PAXG",
        "score": 50,
        "price": "4609.31",
        "change_24h": "+0.9%",
        "change_4h": "+0.3%",
        "change_8h": "+0.5%"
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
