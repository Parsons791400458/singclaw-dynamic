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
    "label": "今天 · 2026-04-30",
    "data": [
      {
        "coin": "AIN",
        "score": 100,
        "price": "0.09786",
        "change_24h": "+9.1%",
        "change_4h": "+2.8%",
        "change_8h": "+5.6%"
      },
      {
        "coin": "DOGE",
        "score": 100,
        "price": "0.10583",
        "change_24h": "+5.8%",
        "change_4h": "-0.1%",
        "change_8h": "-0.2%"
      },
      {
        "coin": "BZ",
        "score": 100,
        "price": "112.86",
        "change_24h": "+8.9%",
        "change_4h": "+1.9%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "CL",
        "score": 100,
        "price": "109.13",
        "change_24h": "+10.4%",
        "change_4h": "+2.4%",
        "change_8h": "+4.8%"
      },
      {
        "coin": "MAGMA",
        "score": 100,
        "price": "0.20966",
        "change_24h": "+11.7%",
        "change_4h": "+2.6%",
        "change_8h": "+5.2%"
      },
      {
        "coin": "ZBT",
        "score": 100,
        "price": "0.18819",
        "change_24h": "+7.5%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "GOOGL",
        "score": 100,
        "price": "373.94",
        "change_24h": "+6.3%",
        "change_4h": "+1.9%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "RIVER",
        "score": 100,
        "price": "6.677",
        "change_24h": "+6.1%",
        "change_4h": "+2.2%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "INTC",
        "score": 100,
        "price": "96.42",
        "change_24h": "+12.2%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "EPIC",
        "score": 100,
        "price": "0.3182",
        "change_24h": "+7.2%",
        "change_4h": "+0.1%",
        "change_8h": "+0.2%"
      },
      {
        "coin": "AIO",
        "score": 100,
        "price": "0.11396",
        "change_24h": "+9.5%",
        "change_4h": "+2.6%",
        "change_8h": "+5.3%"
      },
      {
        "coin": "BANANAS31",
        "score": 95,
        "price": "0.009948",
        "change_24h": "+6.2%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "B",
        "score": 95,
        "price": "0.132",
        "change_24h": "+5.4%",
        "change_4h": "+0.1%",
        "change_8h": "+0.1%"
      },
      {
        "coin": "IRYS",
        "score": 95,
        "price": "0.03647",
        "change_24h": "+9.0%",
        "change_4h": "+1.1%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "CATI",
        "score": 95,
        "price": "0.04998",
        "change_24h": "+5.4%",
        "change_4h": "-0.4%",
        "change_8h": "-0.7%"
      },
      {
        "coin": "COLLECT",
        "score": 95,
        "price": "0.03025",
        "change_24h": "+5.4%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "CGPT",
        "score": 90,
        "price": "0.0276",
        "change_24h": "+6.4%",
        "change_4h": "+2.1%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "STG",
        "score": 90,
        "price": "0.2252",
        "change_24h": "+5.3%",
        "change_4h": "+0.5%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "GPS",
        "score": 90,
        "price": "0.00789",
        "change_24h": "+5.4%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "AIGENSYN",
        "score": 85,
        "price": "0.05438",
        "change_24h": "+28.4%",
        "change_4h": "+5.2%",
        "change_8h": "+10.3%"
      },
      {
        "coin": "SKYAI",
        "score": 85,
        "price": "0.28721",
        "change_24h": "+28.2%",
        "change_4h": "+5.3%",
        "change_8h": "+10.6%"
      },
      {
        "coin": "AIOT",
        "score": 85,
        "price": "0.10558",
        "change_24h": "+29.2%",
        "change_4h": "+0.7%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "TAC",
        "score": 80,
        "price": "0.016307",
        "change_24h": "+17.1%",
        "change_4h": "-0.8%",
        "change_8h": "-1.6%"
      },
      {
        "coin": "BIO",
        "score": 80,
        "price": "0.04034",
        "change_24h": "+21.2%",
        "change_4h": "+4.9%",
        "change_8h": "+9.8%"
      },
      {
        "coin": "SOLV",
        "score": 80,
        "price": "0.004832",
        "change_24h": "+18.9%",
        "change_4h": "+1.1%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "UB",
        "score": 80,
        "price": "0.06755",
        "change_24h": "+19.2%",
        "change_4h": "+3.6%",
        "change_8h": "+7.2%"
      },
      {
        "coin": "MEGA",
        "score": 75,
        "price": "0.19782",
        "change_24h": "+17.6%",
        "change_4h": "+2.3%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "ARC",
        "score": 70,
        "price": "0.08113",
        "change_24h": "+19.8%",
        "change_4h": "+5.1%",
        "change_8h": "+10.2%"
      },
      {
        "coin": "ZEREBRO",
        "score": 70,
        "price": "0.027928",
        "change_24h": "+45.2%",
        "change_4h": "+6.2%",
        "change_8h": "+12.3%"
      },
      {
        "coin": "NAORIS",
        "score": 65,
        "price": "0.12052",
        "change_24h": "+31.3%",
        "change_4h": "-0.5%",
        "change_8h": "-0.9%"
      },
      {
        "coin": "SWARMS",
        "score": 65,
        "price": "0.025604",
        "change_24h": "+33.6%",
        "change_4h": "+7.3%",
        "change_8h": "+14.6%"
      },
      {
        "coin": "1000LUNC",
        "score": 55,
        "price": "0.0692",
        "change_24h": "+2.6%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "NOM",
        "score": 55,
        "price": "0.002923",
        "change_24h": "+1.2%",
        "change_4h": "-4.6%",
        "change_8h": "-9.1%"
      },
      {
        "coin": "LIT",
        "score": 50,
        "price": "0.9373",
        "change_24h": "+1.5%",
        "change_4h": "+0.5%",
        "change_8h": "+1.0%"
      },
      {
        "coin": "BAS",
        "score": 50,
        "price": "0.01395",
        "change_24h": "+0.8%",
        "change_4h": "+0.0%",
        "change_8h": "+0.1%"
      },
      {
        "coin": "ARB",
        "score": 50,
        "price": "0.1256",
        "change_24h": "+0.8%",
        "change_4h": "-0.4%",
        "change_8h": "-0.8%"
      },
      {
        "coin": "AMZN",
        "score": 50,
        "price": "268.8",
        "change_24h": "+3.1%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "1000SHIB",
        "score": 50,
        "price": "0.00619",
        "change_24h": "+0.7%",
        "change_4h": "-0.7%",
        "change_8h": "-1.4%"
      },
      {
        "coin": "APT",
        "score": 50,
        "price": "1.0147",
        "change_24h": "+3.9%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "CRCL",
        "score": 50,
        "price": "95.59",
        "change_24h": "+0.9%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "H",
        "score": 50,
        "price": "0.17939",
        "change_24h": "+3.6%",
        "change_4h": "-0.7%",
        "change_8h": "-1.4%"
      },
      {
        "coin": "GRIFFAIN",
        "score": 50,
        "price": "0.020382",
        "change_24h": "+4.3%",
        "change_4h": "+4.3%",
        "change_8h": "+8.6%"
      },
      {
        "coin": "BROCCOLI714",
        "score": 50,
        "price": "0.0188",
        "change_24h": "+3.0%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
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
