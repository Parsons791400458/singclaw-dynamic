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
    "label": "今天 · 2026-07-23",
    "data": [
      {
        "coin": "BEAT",
        "score": 100,
        "price": "2.617",
        "change_24h": "+7.4%",
        "change_4h": "+1.3%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "UB",
        "score": 100,
        "price": "0.11574",
        "change_24h": "+13.5%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "AKE",
        "score": 100,
        "price": "0.0017936",
        "change_24h": "+10.5%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "TLM",
        "score": 100,
        "price": "0.001786",
        "change_24h": "+7.3%",
        "change_4h": "-0.3%",
        "change_8h": "-0.5%"
      },
      {
        "coin": "US",
        "score": 100,
        "price": "0.046051",
        "change_24h": "+9.5%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "CRWV",
        "score": 100,
        "price": "85.58",
        "change_24h": "+5.8%",
        "change_4h": "+1.4%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "SOXL",
        "score": 100,
        "price": "166.44",
        "change_24h": "+5.9%",
        "change_4h": "+3.4%",
        "change_8h": "+6.9%"
      },
      {
        "coin": "EPIC",
        "score": 100,
        "price": "0.6061",
        "change_24h": "+12.8%",
        "change_4h": "+3.0%",
        "change_8h": "+6.0%"
      },
      {
        "coin": "CAP",
        "score": 100,
        "price": "0.02232",
        "change_24h": "+6.3%",
        "change_4h": "+3.4%",
        "change_8h": "+6.8%"
      },
      {
        "coin": "MVLL",
        "score": 100,
        "price": "28.36",
        "change_24h": "+6.5%",
        "change_4h": "+3.9%",
        "change_8h": "+7.8%"
      },
      {
        "coin": "TRIA",
        "score": 100,
        "price": "0.009307",
        "change_24h": "+9.9%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "ARX",
        "score": 100,
        "price": "0.171",
        "change_24h": "+11.5%",
        "change_4h": "+2.4%",
        "change_8h": "+4.8%"
      },
      {
        "coin": "STBL",
        "score": 95,
        "price": "0.02403",
        "change_24h": "+8.2%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "DYDX",
        "score": 95,
        "price": "0.1279",
        "change_24h": "+5.1%",
        "change_4h": "+1.0%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "ARIA",
        "score": 95,
        "price": "0.02703",
        "change_24h": "+6.5%",
        "change_4h": "-0.1%",
        "change_8h": "-0.1%"
      },
      {
        "coin": "BAS",
        "score": 95,
        "price": "0.03093",
        "change_24h": "+6.5%",
        "change_4h": "+0.7%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "ALAB",
        "score": 95,
        "price": "339.7",
        "change_24h": "+5.7%",
        "change_4h": "+2.7%",
        "change_8h": "+5.4%"
      },
      {
        "coin": "KITE",
        "score": 95,
        "price": "0.12491",
        "change_24h": "+6.0%",
        "change_4h": "+1.9%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "BLUAI",
        "score": 95,
        "price": "0.01263",
        "change_24h": "+7.7%",
        "change_4h": "+0.9%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "SAPIEN",
        "score": 95,
        "price": "0.08265",
        "change_24h": "+6.4%",
        "change_4h": "+0.5%",
        "change_8h": "+0.9%"
      },
      {
        "coin": "SQD",
        "score": 90,
        "price": "0.03351",
        "change_24h": "+5.4%",
        "change_4h": "+1.7%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "RECALL",
        "score": 90,
        "price": "0.03921",
        "change_24h": "+5.9%",
        "change_4h": "+1.5%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "AIO",
        "score": 90,
        "price": "0.11965",
        "change_24h": "+6.8%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "NXPC",
        "score": 90,
        "price": "0.2567",
        "change_24h": "+5.8%",
        "change_4h": "+1.1%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "INX",
        "score": 90,
        "price": "0.007481",
        "change_24h": "+5.5%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "ESP",
        "score": 90,
        "price": "0.07412",
        "change_24h": "+5.4%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "RE",
        "score": 85,
        "price": "0.4862",
        "change_24h": "+18.8%",
        "change_4h": "+3.9%",
        "change_8h": "+7.7%"
      },
      {
        "coin": "ZAMA",
        "score": 80,
        "price": "0.04809",
        "change_24h": "+21.0%",
        "change_4h": "+4.5%",
        "change_8h": "+8.9%"
      },
      {
        "coin": "ERA",
        "score": 80,
        "price": "0.10053",
        "change_24h": "+15.3%",
        "change_4h": "-4.4%",
        "change_8h": "-8.7%"
      },
      {
        "coin": "DODOX",
        "score": 80,
        "price": "0.020378",
        "change_24h": "+26.3%",
        "change_4h": "+3.5%",
        "change_8h": "+7.1%"
      },
      {
        "coin": "BROCCOLIF3B",
        "score": 75,
        "price": "0.00671",
        "change_24h": "+17.8%",
        "change_4h": "-2.7%",
        "change_8h": "-5.3%"
      },
      {
        "coin": "UAI",
        "score": 70,
        "price": "0.3858",
        "change_24h": "+16.4%",
        "change_4h": "+3.4%",
        "change_8h": "+6.9%"
      },
      {
        "coin": "PHAROS",
        "score": 70,
        "price": "0.403",
        "change_24h": "+23.1%",
        "change_4h": "+4.7%",
        "change_8h": "+9.4%"
      },
      {
        "coin": "BANK",
        "score": 70,
        "price": "0.25081",
        "change_24h": "+36.3%",
        "change_4h": "+16.5%",
        "change_8h": "+33.1%"
      },
      {
        "coin": "AIA",
        "score": 70,
        "price": "0.06573",
        "change_24h": "+15.1%",
        "change_4h": "+2.5%",
        "change_8h": "+5.0%"
      },
      {
        "coin": "SNXX",
        "score": 65,
        "price": "18.9",
        "change_24h": "+2.6%",
        "change_4h": "+3.6%",
        "change_8h": "+7.3%"
      },
      {
        "coin": "MIRA",
        "score": 65,
        "price": "0.04872",
        "change_24h": "+2.0%",
        "change_4h": "+0.7%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "ON",
        "score": 60,
        "price": "0.16627",
        "change_24h": "+33.4%",
        "change_4h": "+8.7%",
        "change_8h": "+17.5%"
      },
      {
        "coin": "MRVL",
        "score": 55,
        "price": "217.41",
        "change_24h": "+3.3%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "ONDO",
        "score": 55,
        "price": "0.4152",
        "change_24h": "+3.2%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "ESPORTS",
        "score": 55,
        "price": "0.03026",
        "change_24h": "+1.3%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "SNDK",
        "score": 55,
        "price": "1634.49",
        "change_24h": "+1.2%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "MUU",
        "score": 55,
        "price": "36.25",
        "change_24h": "+1.4%",
        "change_4h": "+2.9%",
        "change_8h": "+5.7%"
      },
      {
        "coin": "ENA",
        "score": 55,
        "price": "0.09027",
        "change_24h": "+3.4%",
        "change_4h": "+0.4%",
        "change_8h": "+0.9%"
      },
      {
        "coin": "LAB",
        "score": 55,
        "price": "0.1497",
        "change_24h": "+1.0%",
        "change_4h": "-6.4%",
        "change_8h": "-12.8%"
      },
      {
        "coin": "NBIS",
        "score": 55,
        "price": "228.87",
        "change_24h": "+4.3%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "MU",
        "score": 55,
        "price": "986.35",
        "change_24h": "+0.8%",
        "change_4h": "+1.4%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "RIF",
        "score": 55,
        "price": "0.06945",
        "change_24h": "-2.9%",
        "change_4h": "+10.1%",
        "change_8h": "+20.2%"
      },
      {
        "coin": "SMCI",
        "score": 50,
        "price": "31.27",
        "change_24h": "+4.1%",
        "change_4h": "+1.5%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "1000PEPE",
        "score": 50,
        "price": "0.0028807",
        "change_24h": "+0.2%",
        "change_4h": "+0.1%",
        "change_8h": "+0.1%"
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
