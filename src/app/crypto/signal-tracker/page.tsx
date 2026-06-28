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
    "label": "今天 · 2026-06-28",
    "data": [
      {
        "coin": "AIN",
        "score": 100,
        "price": "0.0868",
        "change_24h": "+7.5%",
        "change_4h": "+4.0%",
        "change_8h": "+8.0%"
      },
      {
        "coin": "BAS",
        "score": 100,
        "price": "0.048481",
        "change_24h": "+13.3%",
        "change_4h": "+6.4%",
        "change_8h": "+12.8%"
      },
      {
        "coin": "CBRS",
        "score": 100,
        "price": "194.56",
        "change_24h": "+7.2%",
        "change_4h": "+1.3%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "KAITO",
        "score": 100,
        "price": "0.5651",
        "change_24h": "+8.7%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "S",
        "score": 100,
        "price": "0.02232",
        "change_24h": "+11.1%",
        "change_4h": "+0.6%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "SYRUP",
        "score": 100,
        "price": "0.14441",
        "change_24h": "+7.3%",
        "change_4h": "-0.8%",
        "change_8h": "-1.6%"
      },
      {
        "coin": "SIREN",
        "score": 100,
        "price": "0.03755",
        "change_24h": "+7.3%",
        "change_4h": "+0.2%",
        "change_8h": "+0.4%"
      },
      {
        "coin": "BASED",
        "score": 100,
        "price": "0.07497",
        "change_24h": "+14.9%",
        "change_4h": "+3.0%",
        "change_8h": "+6.0%"
      },
      {
        "coin": "ARX",
        "score": 100,
        "price": "0.2843",
        "change_24h": "+10.2%",
        "change_4h": "-0.4%",
        "change_8h": "-0.8%"
      },
      {
        "coin": "SLX",
        "score": 100,
        "price": "0.5154",
        "change_24h": "+12.6%",
        "change_4h": "-3.9%",
        "change_8h": "-7.7%"
      },
      {
        "coin": "HOT",
        "score": 100,
        "price": "0.0003342",
        "change_24h": "+13.7%",
        "change_4h": "-1.3%",
        "change_8h": "-2.6%"
      },
      {
        "coin": "MMT",
        "score": 100,
        "price": "0.1984",
        "change_24h": "+5.1%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "0G",
        "score": 100,
        "price": "0.2335",
        "change_24h": "+9.6%",
        "change_4h": "+0.8%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "CVC",
        "score": 100,
        "price": "0.02199",
        "change_24h": "+7.7%",
        "change_4h": "-0.9%",
        "change_8h": "-1.9%"
      },
      {
        "coin": "AGT",
        "score": 100,
        "price": "0.022242",
        "change_24h": "+8.1%",
        "change_4h": "-2.5%",
        "change_8h": "-4.9%"
      },
      {
        "coin": "NEAR",
        "score": 100,
        "price": "1.904",
        "change_24h": "+5.5%",
        "change_4h": "+0.8%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "EIGEN",
        "score": 100,
        "price": "0.2424",
        "change_24h": "+11.3%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "RE",
        "score": 100,
        "price": "0.6156",
        "change_24h": "+14.2%",
        "change_4h": "+0.0%",
        "change_8h": "+0.1%"
      },
      {
        "coin": "RAVE",
        "score": 100,
        "price": "0.2543",
        "change_24h": "+12.1%",
        "change_4h": "-1.2%",
        "change_8h": "-2.4%"
      },
      {
        "coin": "OPN",
        "score": 95,
        "price": "0.06327",
        "change_24h": "+5.7%",
        "change_4h": "+2.1%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "GRIFFAIN",
        "score": 95,
        "price": "0.009463",
        "change_24h": "+9.9%",
        "change_4h": "+2.3%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "ZEREBRO",
        "score": 95,
        "price": "0.036861",
        "change_24h": "+11.0%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "TRADOOR",
        "score": 95,
        "price": "0.4354",
        "change_24h": "+8.0%",
        "change_4h": "-0.1%",
        "change_8h": "-0.2%"
      },
      {
        "coin": "UAI",
        "score": 95,
        "price": "0.3142",
        "change_24h": "+8.3%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "GLW",
        "score": 95,
        "price": "235.11",
        "change_24h": "+5.4%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "STBL",
        "score": 95,
        "price": "0.02579",
        "change_24h": "+8.2%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "POWR",
        "score": 95,
        "price": "0.04532",
        "change_24h": "+7.6%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "BSV",
        "score": 95,
        "price": "12.3",
        "change_24h": "+8.3%",
        "change_4h": "-0.1%",
        "change_8h": "-0.1%"
      },
      {
        "coin": "CYS",
        "score": 95,
        "price": "0.3425",
        "change_24h": "+7.1%",
        "change_4h": "+2.0%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "COLLECT",
        "score": 95,
        "price": "0.04818",
        "change_24h": "+7.2%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "PRL",
        "score": 90,
        "price": "0.1502",
        "change_24h": "+5.1%",
        "change_4h": "-0.2%",
        "change_8h": "-0.4%"
      },
      {
        "coin": "CATI",
        "score": 90,
        "price": "0.06346",
        "change_24h": "+5.1%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "SNX",
        "score": 75,
        "price": "0.2435",
        "change_24h": "+21.6%",
        "change_4h": "+4.7%",
        "change_8h": "+9.4%"
      },
      {
        "coin": "PIEVERSE",
        "score": 75,
        "price": "0.8269",
        "change_24h": "+19.9%",
        "change_4h": "+4.3%",
        "change_8h": "+8.6%"
      },
      {
        "coin": "PHAROS",
        "score": 70,
        "price": "0.499",
        "change_24h": "+17.7%",
        "change_4h": "+3.6%",
        "change_8h": "+7.1%"
      },
      {
        "coin": "KGEN",
        "score": 70,
        "price": "0.2208",
        "change_24h": "+23.6%",
        "change_4h": "+3.9%",
        "change_8h": "+7.8%"
      },
      {
        "coin": "BEAT",
        "score": 65,
        "price": "2.667",
        "change_24h": "+2.5%",
        "change_4h": "+6.7%",
        "change_8h": "+13.5%"
      },
      {
        "coin": "MYX",
        "score": 65,
        "price": "0.1114",
        "change_24h": "+31.8%",
        "change_4h": "+6.1%",
        "change_8h": "+12.3%"
      },
      {
        "coin": "LAB",
        "score": 55,
        "price": "17.358",
        "change_24h": "-13.4%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "UB",
        "score": 55,
        "price": "0.08119",
        "change_24h": "+1.8%",
        "change_4h": "+2.5%",
        "change_8h": "+5.0%"
      },
      {
        "coin": "WIF",
        "score": 50,
        "price": "0.1652",
        "change_24h": "+4.6%",
        "change_4h": "-1.5%",
        "change_8h": "-3.0%"
      },
      {
        "coin": "SYN",
        "score": 50,
        "price": "0.30616",
        "change_24h": "-5.3%",
        "change_4h": "-1.9%",
        "change_8h": "-3.8%"
      },
      {
        "coin": "M",
        "score": 50,
        "price": "0.7425",
        "change_24h": "+3.4%",
        "change_4h": "-2.5%",
        "change_8h": "-5.0%"
      },
      {
        "coin": "PUMP",
        "score": 50,
        "price": "0.001357",
        "change_24h": "+2.4%",
        "change_4h": "-0.3%",
        "change_8h": "-0.5%"
      },
      {
        "coin": "CL",
        "score": 50,
        "price": "72.31",
        "change_24h": "+2.5%",
        "change_4h": "+0.8%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "SPCX",
        "score": 50,
        "price": "154.2",
        "change_24h": "+0.2%",
        "change_4h": "+0.1%",
        "change_8h": "+0.3%"
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
