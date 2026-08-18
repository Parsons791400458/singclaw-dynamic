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
    "label": "今天 · 2026-08-18",
    "data": [
      {
        "coin": "ACU",
        "score": 100,
        "price": "0.12595",
        "change_24h": "+11.5%",
        "change_4h": "+3.7%",
        "change_8h": "+7.4%"
      },
      {
        "coin": "SNXX",
        "score": 100,
        "price": "19.22",
        "change_24h": "+13.2%",
        "change_4h": "+2.4%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "MUU",
        "score": 100,
        "price": "35.19",
        "change_24h": "+5.9%",
        "change_4h": "+0.5%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "DEXE",
        "score": 100,
        "price": "1.958",
        "change_24h": "+7.3%",
        "change_4h": "+1.0%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "KORU",
        "score": 100,
        "price": "23.67",
        "change_24h": "+6.9%",
        "change_4h": "+0.0%",
        "change_8h": "+0.0%"
      },
      {
        "coin": "COMP",
        "score": 100,
        "price": "17.71",
        "change_24h": "+9.7%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "KOMA",
        "score": 100,
        "price": "0.015098",
        "change_24h": "+5.1%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "HEMI",
        "score": 100,
        "price": "0.006849",
        "change_24h": "+11.8%",
        "change_4h": "+0.8%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "GIGGLE",
        "score": 100,
        "price": "33.76",
        "change_24h": "+7.4%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "COHR",
        "score": 100,
        "price": "352.07",
        "change_24h": "+6.2%",
        "change_4h": "+0.8%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "POL",
        "score": 100,
        "price": "0.08013",
        "change_24h": "+6.9%",
        "change_4h": "+0.2%",
        "change_8h": "+0.4%"
      },
      {
        "coin": "CBRS",
        "score": 100,
        "price": "251.65",
        "change_24h": "+13.2%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "ALLO",
        "score": 100,
        "price": "0.29611",
        "change_24h": "+12.6%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "MON",
        "score": 100,
        "price": "0.02152",
        "change_24h": "+6.7%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "MVLL",
        "score": 100,
        "price": "31.21",
        "change_24h": "+9.4%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "AXTI",
        "score": 100,
        "price": "94.27",
        "change_24h": "+12.4%",
        "change_4h": "+2.0%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "BMT",
        "score": 100,
        "price": "0.01692",
        "change_24h": "+14.9%",
        "change_4h": "+0.9%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "CSOPSKHYNIX2L",
        "score": 100,
        "price": "5.365",
        "change_24h": "+11.0%",
        "change_4h": "+2.4%",
        "change_8h": "+4.8%"
      },
      {
        "coin": "EDEN",
        "score": 100,
        "price": "0.04802",
        "change_24h": "+10.1%",
        "change_4h": "-0.7%",
        "change_8h": "-1.4%"
      },
      {
        "coin": "SKYAI",
        "score": 100,
        "price": "0.07454",
        "change_24h": "+5.6%",
        "change_4h": "-1.5%",
        "change_8h": "-3.0%"
      },
      {
        "coin": "SNDK",
        "score": 100,
        "price": "1796.04",
        "change_24h": "+6.9%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "EUL",
        "score": 100,
        "price": "1.1531",
        "change_24h": "+8.2%",
        "change_4h": "-0.2%",
        "change_8h": "-0.5%"
      },
      {
        "coin": "GIGADEV",
        "score": 100,
        "price": "72.02",
        "change_24h": "+9.1%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "ZHONGJI",
        "score": 100,
        "price": "168.14",
        "change_24h": "+8.7%",
        "change_4h": "+2.7%",
        "change_8h": "+5.4%"
      },
      {
        "coin": "VVV",
        "score": 100,
        "price": "13.169",
        "change_24h": "+9.1%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "ACE",
        "score": 100,
        "price": "0.15509",
        "change_24h": "+14.1%",
        "change_4h": "-4.4%",
        "change_8h": "-8.8%"
      },
      {
        "coin": "SKHYNIX",
        "score": 100,
        "price": "1260.58",
        "change_24h": "+6.0%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "CSOPSAMSUNG2L",
        "score": 95,
        "price": "11.66",
        "change_24h": "+6.8%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "GWEI",
        "score": 95,
        "price": "0.02374",
        "change_24h": "+6.0%",
        "change_4h": "+1.6%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "MORPHO",
        "score": 95,
        "price": "2.1484",
        "change_24h": "+6.9%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "TST",
        "score": 95,
        "price": "0.01516",
        "change_24h": "+7.4%",
        "change_4h": "-0.3%",
        "change_8h": "-0.5%"
      },
      {
        "coin": "CRDO",
        "score": 90,
        "price": "283.44",
        "change_24h": "+7.5%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "EGLD",
        "score": 90,
        "price": "2.778",
        "change_24h": "+5.6%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "GUA",
        "score": 90,
        "price": "0.0439",
        "change_24h": "+7.0%",
        "change_4h": "+1.7%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "CROSS",
        "score": 90,
        "price": "0.10316",
        "change_24h": "+6.1%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "TUT",
        "score": 80,
        "price": "0.04416",
        "change_24h": "+26.4%",
        "change_4h": "-2.8%",
        "change_8h": "-5.7%"
      },
      {
        "coin": "GPS",
        "score": 70,
        "price": "0.016728",
        "change_24h": "+40.9%",
        "change_4h": "+7.2%",
        "change_8h": "+14.5%"
      },
      {
        "coin": "PIEVERSE",
        "score": 65,
        "price": "0.9844",
        "change_24h": "+16.7%",
        "change_4h": "+3.8%",
        "change_8h": "+7.7%"
      },
      {
        "coin": "STAR",
        "score": 65,
        "price": "0.14449",
        "change_24h": "+47.8%",
        "change_4h": "+8.4%",
        "change_8h": "+16.8%"
      },
      {
        "coin": "CAP",
        "score": 60,
        "price": "0.07081",
        "change_24h": "+0.5%",
        "change_4h": "+1.5%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "SPCX",
        "score": 55,
        "price": "145.45",
        "change_24h": "+2.7%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "SOXL",
        "score": 55,
        "price": "152.72",
        "change_24h": "+3.5%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "SAMSUNG",
        "score": 55,
        "price": "199.86",
        "change_24h": "+3.5%",
        "change_4h": "+0.1%",
        "change_8h": "+0.3%"
      },
      {
        "coin": "DRAM",
        "score": 55,
        "price": "61.09",
        "change_24h": "+4.7%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "CRCL",
        "score": 55,
        "price": "74.74",
        "change_24h": "+4.3%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "ZEC",
        "score": 55,
        "price": "514.11",
        "change_24h": "+4.6%",
        "change_4h": "+0.8%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "MU",
        "score": 55,
        "price": "1014.91",
        "change_24h": "+3.0%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "MRVL",
        "score": 55,
        "price": "236.07",
        "change_24h": "+4.8%",
        "change_4h": "+0.9%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "SKHY",
        "score": 55,
        "price": "175.26",
        "change_24h": "+4.1%",
        "change_4h": "+0.7%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "XAU",
        "score": 50,
        "price": "4430.0",
        "change_24h": "+0.4%",
        "change_4h": "+0.2%",
        "change_8h": "+0.4%"
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
