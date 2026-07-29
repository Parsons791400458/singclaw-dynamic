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
    "label": "今天 · 2026-07-29",
    "data": [
      {
        "coin": "LIT",
        "score": 100,
        "price": "2.2889",
        "change_24h": "+7.8%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "EUL",
        "score": 100,
        "price": "1.6102",
        "change_24h": "+5.0%",
        "change_4h": "+0.2%",
        "change_8h": "+0.3%"
      },
      {
        "coin": "CAP",
        "score": 100,
        "price": "0.02656",
        "change_24h": "+11.6%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "GWEI",
        "score": 100,
        "price": "0.02041",
        "change_24h": "+8.6%",
        "change_4h": "+1.5%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "RAVE",
        "score": 100,
        "price": "0.2787",
        "change_24h": "+5.1%",
        "change_4h": "+0.1%",
        "change_8h": "+0.2%"
      },
      {
        "coin": "TER",
        "score": 100,
        "price": "359.36",
        "change_24h": "+9.0%",
        "change_4h": "+3.2%",
        "change_8h": "+6.3%"
      },
      {
        "coin": "MMT",
        "score": 100,
        "price": "0.1877",
        "change_24h": "+6.3%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
      },
      {
        "coin": "SOXS",
        "score": 100,
        "price": "64.17",
        "change_24h": "+11.1%",
        "change_4h": "+1.6%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "TAO",
        "score": 100,
        "price": "196.99",
        "change_24h": "+5.9%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "AIN",
        "score": 95,
        "price": "0.08063",
        "change_24h": "+5.3%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "1000CHEEMS",
        "score": 95,
        "price": "0.0005123",
        "change_24h": "+11.3%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "FF",
        "score": 95,
        "price": "0.06527",
        "change_24h": "+5.6%",
        "change_4h": "+1.3%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "BILL",
        "score": 95,
        "price": "0.02411",
        "change_24h": "+6.4%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "MORPHO",
        "score": 95,
        "price": "2.0213",
        "change_24h": "+5.2%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "JUP",
        "score": 95,
        "price": "0.1923",
        "change_24h": "+5.8%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "AVAAI",
        "score": 95,
        "price": "0.007557",
        "change_24h": "+5.7%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "OPEN",
        "score": 95,
        "price": "0.1712",
        "change_24h": "+8.4%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "XPL",
        "score": 95,
        "price": "0.08327",
        "change_24h": "+5.8%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
      },
      {
        "coin": "TOWNS",
        "score": 95,
        "price": "0.002058",
        "change_24h": "+6.6%",
        "change_4h": "+0.7%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "ZEST",
        "score": 95,
        "price": "0.24865",
        "change_24h": "+9.5%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "HOLO",
        "score": 95,
        "price": "0.07152",
        "change_24h": "+9.8%",
        "change_4h": "+3.0%",
        "change_8h": "+6.0%"
      },
      {
        "coin": "KMNO",
        "score": 95,
        "price": "0.01894",
        "change_24h": "+6.0%",
        "change_4h": "+0.1%",
        "change_8h": "+0.3%"
      },
      {
        "coin": "PLUME",
        "score": 95,
        "price": "0.01199",
        "change_24h": "+5.6%",
        "change_4h": "+0.7%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "FLOW",
        "score": 95,
        "price": "0.02594",
        "change_24h": "+8.8%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "COLLECT",
        "score": 95,
        "price": "0.05408",
        "change_24h": "+6.2%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "WET",
        "score": 90,
        "price": "0.06703",
        "change_24h": "+6.8%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "RECALL",
        "score": 90,
        "price": "0.04016",
        "change_24h": "+6.9%",
        "change_4h": "+1.8%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "SXT",
        "score": 90,
        "price": "0.007007",
        "change_24h": "+6.8%",
        "change_4h": "+1.7%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "HK1810",
        "score": 90,
        "price": "30.45",
        "change_24h": "+6.4%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "BLUAI",
        "score": 90,
        "price": "0.012581",
        "change_24h": "+5.2%",
        "change_4h": "+0.5%",
        "change_8h": "+1.0%"
      },
      {
        "coin": "GPS",
        "score": 90,
        "price": "0.00966",
        "change_24h": "+5.9%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "AIA",
        "score": 90,
        "price": "0.06373",
        "change_24h": "+6.0%",
        "change_4h": "-0.2%",
        "change_8h": "-0.4%"
      },
      {
        "coin": "SIREN",
        "score": 90,
        "price": "0.02815",
        "change_24h": "+6.5%",
        "change_4h": "+1.4%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "SOON",
        "score": 85,
        "price": "0.2767",
        "change_24h": "+17.8%",
        "change_4h": "+3.7%",
        "change_8h": "+7.3%"
      },
      {
        "coin": "BEAT",
        "score": 85,
        "price": "3.47",
        "change_24h": "+23.4%",
        "change_4h": "+7.2%",
        "change_8h": "+14.4%"
      },
      {
        "coin": "ZIL",
        "score": 80,
        "price": "0.00285",
        "change_24h": "+21.3%",
        "change_4h": "+2.3%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "BULLA",
        "score": 75,
        "price": "0.018334",
        "change_24h": "+29.1%",
        "change_4h": "+5.0%",
        "change_8h": "+10.1%"
      },
      {
        "coin": "UB",
        "score": 75,
        "price": "0.13744",
        "change_24h": "+15.0%",
        "change_4h": "+4.6%",
        "change_8h": "+9.2%"
      },
      {
        "coin": "BOT",
        "score": 70,
        "price": "29.87",
        "change_24h": "+15.7%",
        "change_4h": "+4.2%",
        "change_8h": "+8.5%"
      },
      {
        "coin": "BTW",
        "score": 65,
        "price": "0.08999",
        "change_24h": "+43.2%",
        "change_4h": "+5.7%",
        "change_8h": "+11.5%"
      },
      {
        "coin": "SPCX",
        "score": 60,
        "price": "116.21",
        "change_24h": "+4.8%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "BE",
        "score": 55,
        "price": "189.01",
        "change_24h": "+2.1%",
        "change_4h": "+3.6%",
        "change_8h": "+7.2%"
      },
      {
        "coin": "ADA",
        "score": 55,
        "price": "0.1624",
        "change_24h": "+4.5%",
        "change_4h": "+1.1%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "SKHY",
        "score": 55,
        "price": "129.01",
        "change_24h": "-7.7%",
        "change_4h": "+0.1%",
        "change_8h": "+0.3%"
      },
      {
        "coin": "DEXE",
        "score": 55,
        "price": "2.909",
        "change_24h": "+0.2%",
        "change_4h": "-4.3%",
        "change_8h": "-8.5%"
      },
      {
        "coin": "CL",
        "score": 55,
        "price": "82.96",
        "change_24h": "+1.5%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "KAITO",
        "score": 55,
        "price": "1.2374",
        "change_24h": "-6.1%",
        "change_4h": "+0.9%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "BZ",
        "score": 55,
        "price": "85.56",
        "change_24h": "+0.5%",
        "change_4h": "+1.4%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "MSTR",
        "score": 50,
        "price": "96.56",
        "change_24h": "+1.3%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "AAVE",
        "score": 50,
        "price": "101.0",
        "change_24h": "+3.6%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
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
