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
    "label": "今天 · 2026-07-01",
    "data": [
      {
        "coin": "MVLL",
        "score": 100,
        "price": "56.28",
        "change_24h": "+10.5%",
        "change_4h": "+2.5%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "SYN",
        "score": 100,
        "price": "0.52206",
        "change_24h": "+7.8%",
        "change_4h": "-6.8%",
        "change_8h": "-13.7%"
      },
      {
        "coin": "PYTH",
        "score": 100,
        "price": "0.04014",
        "change_24h": "+10.9%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "APR",
        "score": 100,
        "price": "0.2287",
        "change_24h": "+9.7%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "XLM",
        "score": 100,
        "price": "0.20327",
        "change_24h": "+11.8%",
        "change_4h": "+3.3%",
        "change_8h": "+6.6%"
      },
      {
        "coin": "QNTX",
        "score": 100,
        "price": "82.27",
        "change_24h": "+13.0%",
        "change_4h": "+3.9%",
        "change_8h": "+7.9%"
      },
      {
        "coin": "TAC",
        "score": 100,
        "price": "0.06296",
        "change_24h": "+5.7%",
        "change_4h": "+0.6%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "CYS",
        "score": 100,
        "price": "0.373",
        "change_24h": "+13.6%",
        "change_4h": "+3.6%",
        "change_8h": "+7.3%"
      },
      {
        "coin": "SNDK",
        "score": 100,
        "price": "2218.91",
        "change_24h": "+6.5%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "NFP",
        "score": 100,
        "price": "0.005815",
        "change_24h": "+13.1%",
        "change_4h": "+7.7%",
        "change_8h": "+15.4%"
      },
      {
        "coin": "AMD",
        "score": 100,
        "price": "579.07",
        "change_24h": "+6.9%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "ALAB",
        "score": 100,
        "price": "484.5",
        "change_24h": "+6.2%",
        "change_4h": "+1.0%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "AIOT",
        "score": 100,
        "price": "0.0542",
        "change_24h": "+11.0%",
        "change_4h": "+0.1%",
        "change_8h": "+0.3%"
      },
      {
        "coin": "GLM",
        "score": 100,
        "price": "0.10487",
        "change_24h": "+7.8%",
        "change_4h": "-1.4%",
        "change_8h": "-2.8%"
      },
      {
        "coin": "XAN",
        "score": 100,
        "price": "0.010593",
        "change_24h": "+12.8%",
        "change_4h": "+3.2%",
        "change_8h": "+6.4%"
      },
      {
        "coin": "CRDO",
        "score": 100,
        "price": "271.34",
        "change_24h": "+8.9%",
        "change_4h": "+2.1%",
        "change_8h": "+4.3%"
      },
      {
        "coin": "SOXL",
        "score": 100,
        "price": "264.0",
        "change_24h": "+9.5%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "MRVL",
        "score": 100,
        "price": "295.18",
        "change_24h": "+5.7%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "STG",
        "score": 100,
        "price": "0.1761",
        "change_24h": "+7.4%",
        "change_4h": "+1.4%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "BIO",
        "score": 100,
        "price": "0.02989",
        "change_24h": "+7.2%",
        "change_4h": "+1.6%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "SFP",
        "score": 95,
        "price": "0.2277",
        "change_24h": "+9.2%",
        "change_4h": "+2.8%",
        "change_8h": "+5.5%"
      },
      {
        "coin": "KLAC",
        "score": 95,
        "price": "303.33",
        "change_24h": "+6.6%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "VELODROME",
        "score": 95,
        "price": "0.01965",
        "change_24h": "+8.3%",
        "change_4h": "+2.5%",
        "change_8h": "+5.0%"
      },
      {
        "coin": "BEAMX",
        "score": 95,
        "price": "0.001444",
        "change_24h": "+7.7%",
        "change_4h": "+1.8%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "HIMS",
        "score": 95,
        "price": "34.54",
        "change_24h": "+5.2%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "XPIN",
        "score": 95,
        "price": "0.00142",
        "change_24h": "+12.3%",
        "change_4h": "+2.5%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "NMR",
        "score": 95,
        "price": "8.919",
        "change_24h": "+6.3%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "BSV",
        "score": 95,
        "price": "13.65",
        "change_24h": "+9.3%",
        "change_4h": "+2.5%",
        "change_8h": "+4.9%"
      },
      {
        "coin": "OPEN",
        "score": 90,
        "price": "0.16",
        "change_24h": "+5.1%",
        "change_4h": "+0.3%",
        "change_8h": "+0.5%"
      },
      {
        "coin": "MAVIA",
        "score": 90,
        "price": "0.0314",
        "change_24h": "+5.1%",
        "change_4h": "-1.2%",
        "change_8h": "-2.5%"
      },
      {
        "coin": "BTW",
        "score": 85,
        "price": "0.06236",
        "change_24h": "+16.4%",
        "change_4h": "+0.5%",
        "change_8h": "+0.9%"
      },
      {
        "coin": "RIF",
        "score": 80,
        "price": "0.08889",
        "change_24h": "+19.5%",
        "change_4h": "+3.2%",
        "change_8h": "+6.4%"
      },
      {
        "coin": "BEAT",
        "score": 80,
        "price": "3.241",
        "change_24h": "+15.5%",
        "change_4h": "+4.7%",
        "change_8h": "+9.3%"
      },
      {
        "coin": "H",
        "score": 80,
        "price": "0.08735",
        "change_24h": "+22.8%",
        "change_4h": "+3.6%",
        "change_8h": "+7.2%"
      },
      {
        "coin": "DYDX",
        "score": 75,
        "price": "0.2033",
        "change_24h": "+29.5%",
        "change_4h": "+6.5%",
        "change_8h": "+12.9%"
      },
      {
        "coin": "ZBT",
        "score": 75,
        "price": "0.12613",
        "change_24h": "+20.9%",
        "change_4h": "+5.1%",
        "change_8h": "+10.3%"
      },
      {
        "coin": "BE",
        "score": 75,
        "price": "328.78",
        "change_24h": "+18.3%",
        "change_4h": "+2.5%",
        "change_8h": "+4.9%"
      },
      {
        "coin": "M",
        "score": 75,
        "price": "0.8057",
        "change_24h": "+20.1%",
        "change_4h": "+4.9%",
        "change_8h": "+9.9%"
      },
      {
        "coin": "XNY",
        "score": 70,
        "price": "0.005987",
        "change_24h": "+19.4%",
        "change_4h": "-1.4%",
        "change_8h": "-2.7%"
      },
      {
        "coin": "TRIA",
        "score": 70,
        "price": "0.02043",
        "change_24h": "+18.1%",
        "change_4h": "+4.3%",
        "change_8h": "+8.5%"
      },
      {
        "coin": "BASED",
        "score": 65,
        "price": "0.10439",
        "change_24h": "+31.6%",
        "change_4h": "+6.5%",
        "change_8h": "+13.0%"
      },
      {
        "coin": "INTC",
        "score": 55,
        "price": "138.75",
        "change_24h": "+4.8%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "ADA",
        "score": 55,
        "price": "0.15",
        "change_24h": "+4.0%",
        "change_4h": "+1.3%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "OPG",
        "score": 55,
        "price": "0.1312",
        "change_24h": "+0.1%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "CBRS",
        "score": 55,
        "price": "218.64",
        "change_24h": "+0.9%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "SOL",
        "score": 55,
        "price": "75.55",
        "change_24h": "+1.9%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "NBIS",
        "score": 55,
        "price": "277.15",
        "change_24h": "+4.2%",
        "change_4h": "+0.7%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "SPCX",
        "score": 55,
        "price": "170.78",
        "change_24h": "+4.7%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "FIL",
        "score": 50,
        "price": "0.735",
        "change_24h": "+1.2%",
        "change_4h": "+0.9%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "XRP",
        "score": 50,
        "price": "1.0515",
        "change_24h": "+0.7%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
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
