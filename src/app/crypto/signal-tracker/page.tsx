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
    "label": "今天 · 2026-08-11",
    "data": [
      {
        "coin": "GWEI",
        "score": 100,
        "price": "0.025",
        "change_24h": "+12.2%",
        "change_4h": "-2.7%",
        "change_8h": "-5.3%"
      },
      {
        "coin": "TST",
        "score": 100,
        "price": "0.02092",
        "change_24h": "+7.4%",
        "change_4h": "-2.7%",
        "change_8h": "-5.5%"
      },
      {
        "coin": "ICP",
        "score": 100,
        "price": "2.328",
        "change_24h": "+6.9%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "WLD",
        "score": 100,
        "price": "0.338",
        "change_24h": "+5.3%",
        "change_4h": "+0.1%",
        "change_8h": "+0.3%"
      },
      {
        "coin": "B",
        "score": 100,
        "price": "0.163",
        "change_24h": "+12.6%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "ME",
        "score": 100,
        "price": "0.06794",
        "change_24h": "+9.1%",
        "change_4h": "+1.3%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "UAI",
        "score": 100,
        "price": "0.2645",
        "change_24h": "+9.1%",
        "change_4h": "+2.4%",
        "change_8h": "+4.8%"
      },
      {
        "coin": "ON",
        "score": 100,
        "price": "0.3868",
        "change_24h": "+5.8%",
        "change_4h": "-0.4%",
        "change_8h": "-0.9%"
      },
      {
        "coin": "ARIA",
        "score": 100,
        "price": "0.03664",
        "change_24h": "+14.1%",
        "change_4h": "+2.6%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "LIGHT",
        "score": 100,
        "price": "0.1693",
        "change_24h": "+13.9%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "PRL",
        "score": 100,
        "price": "0.3073",
        "change_24h": "+8.9%",
        "change_4h": "+2.4%",
        "change_8h": "+4.8%"
      },
      {
        "coin": "CRV",
        "score": 100,
        "price": "0.2681",
        "change_24h": "+12.4%",
        "change_4h": "+2.9%",
        "change_8h": "+5.8%"
      },
      {
        "coin": "SNXX",
        "score": 100,
        "price": "9.63",
        "change_24h": "+5.8%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "ZEST",
        "score": 100,
        "price": "0.16758",
        "change_24h": "+8.8%",
        "change_4h": "-0.8%",
        "change_8h": "-1.5%"
      },
      {
        "coin": "GRVT",
        "score": 100,
        "price": "0.3351",
        "change_24h": "+5.3%",
        "change_4h": "-3.5%",
        "change_8h": "-7.0%"
      },
      {
        "coin": "SOXS",
        "score": 100,
        "price": "44.05",
        "change_24h": "+5.5%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "DODOX",
        "score": 100,
        "price": "0.021929",
        "change_24h": "+10.9%",
        "change_4h": "-2.8%",
        "change_8h": "-5.7%"
      },
      {
        "coin": "BULLA",
        "score": 100,
        "price": "0.015981",
        "change_24h": "+8.6%",
        "change_4h": "+0.6%",
        "change_8h": "+1.2%"
      },
      {
        "coin": "GENIUS",
        "score": 95,
        "price": "0.3607",
        "change_24h": "+5.1%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "SHAZ",
        "score": 95,
        "price": "53.47",
        "change_24h": "+7.5%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "RIVER",
        "score": 95,
        "price": "2.778",
        "change_24h": "+5.5%",
        "change_4h": "-0.1%",
        "change_8h": "-0.3%"
      },
      {
        "coin": "GRIFFAIN",
        "score": 95,
        "price": "0.011842",
        "change_24h": "+6.9%",
        "change_4h": "+0.4%",
        "change_8h": "+0.9%"
      },
      {
        "coin": "CVX",
        "score": 95,
        "price": "1.742",
        "change_24h": "+8.3%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "BR",
        "score": 95,
        "price": "0.13144",
        "change_24h": "+6.9%",
        "change_4h": "+1.1%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "WLFI",
        "score": 95,
        "price": "0.05633",
        "change_24h": "+5.7%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "TOWNS",
        "score": 95,
        "price": "0.002625",
        "change_24h": "+6.8%",
        "change_4h": "+1.1%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "BIRB",
        "score": 90,
        "price": "0.05719",
        "change_24h": "+6.0%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "EGLD",
        "score": 90,
        "price": "2.807",
        "change_24h": "+5.1%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "CRWD",
        "score": 90,
        "price": "226.02",
        "change_24h": "+5.3%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "CYS",
        "score": 85,
        "price": "1.2891",
        "change_24h": "+24.1%",
        "change_4h": "+6.8%",
        "change_8h": "+13.6%"
      },
      {
        "coin": "BLESS",
        "score": 80,
        "price": "0.01413",
        "change_24h": "+16.7%",
        "change_4h": "+4.5%",
        "change_8h": "+9.0%"
      },
      {
        "coin": "BSP",
        "score": 75,
        "price": "53.02",
        "change_24h": "+18.4%",
        "change_4h": "+2.4%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "SQD",
        "score": 75,
        "price": "0.04554",
        "change_24h": "+20.6%",
        "change_4h": "+1.6%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "GUA",
        "score": 65,
        "price": "0.05497",
        "change_24h": "+49.3%",
        "change_4h": "-1.6%",
        "change_8h": "-3.2%"
      },
      {
        "coin": "PROM",
        "score": 60,
        "price": "2.634",
        "change_24h": "+30.4%",
        "change_4h": "+5.3%",
        "change_8h": "+10.6%"
      },
      {
        "coin": "SAMSUNG",
        "score": 55,
        "price": "167.05",
        "change_24h": "+2.2%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "XAG",
        "score": 55,
        "price": "65.99",
        "change_24h": "+4.3%",
        "change_4h": "+1.0%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "SNDK",
        "score": 55,
        "price": "1251.7",
        "change_24h": "+2.9%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
      },
      {
        "coin": "KORU",
        "score": 55,
        "price": "16.93",
        "change_24h": "+0.3%",
        "change_4h": "+0.5%",
        "change_8h": "+1.0%"
      },
      {
        "coin": "BZ",
        "score": 55,
        "price": "86.93",
        "change_24h": "+3.4%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "CL",
        "score": 55,
        "price": "81.81",
        "change_24h": "+3.8%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "HOME",
        "score": 55,
        "price": "0.009231",
        "change_24h": "+2.1%",
        "change_4h": "-6.6%",
        "change_8h": "-13.2%"
      },
      {
        "coin": "BICO",
        "score": 55,
        "price": "0.04418",
        "change_24h": "-7.6%",
        "change_4h": "+1.6%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "SPCX",
        "score": 55,
        "price": "136.86",
        "change_24h": "+1.8%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
      },
      {
        "coin": "PUMP",
        "score": 55,
        "price": "0.002792",
        "change_24h": "+2.2%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "HYPE",
        "score": 50,
        "price": "55.163",
        "change_24h": "+2.2%",
        "change_4h": "+0.1%",
        "change_8h": "+0.3%"
      },
      {
        "coin": "MMT",
        "score": 50,
        "price": "0.2123",
        "change_24h": "+2.1%",
        "change_4h": "+0.2%",
        "change_8h": "+0.4%"
      },
      {
        "coin": "UB",
        "score": 50,
        "price": "0.13835",
        "change_24h": "+1.5%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "EWY",
        "score": 50,
        "price": "164.94",
        "change_24h": "+0.2%",
        "change_4h": "+0.2%",
        "change_8h": "+0.3%"
      },
      {
        "coin": "SKYAI",
        "score": 50,
        "price": "0.10217",
        "change_24h": "+3.6%",
        "change_4h": "-1.6%",
        "change_8h": "-3.1%"
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
