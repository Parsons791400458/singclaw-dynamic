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
    "label": "今天 · 2026-07-14",
    "data": [
      {
        "coin": "SOON",
        "score": 100,
        "price": "0.1742",
        "change_24h": "+5.0%",
        "change_4h": "+3.4%",
        "change_8h": "+6.9%"
      },
      {
        "coin": "FOLKS",
        "score": 100,
        "price": "2.153",
        "change_24h": "+13.9%",
        "change_4h": "+3.7%",
        "change_8h": "+7.4%"
      },
      {
        "coin": "EDGE",
        "score": 100,
        "price": "0.4198",
        "change_24h": "+8.4%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "TRIA",
        "score": 100,
        "price": "0.0082",
        "change_24h": "+7.0%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "AGT",
        "score": 100,
        "price": "0.013886",
        "change_24h": "+9.1%",
        "change_4h": "-0.4%",
        "change_8h": "-0.8%"
      },
      {
        "coin": "UAI",
        "score": 100,
        "price": "0.3548",
        "change_24h": "+5.1%",
        "change_4h": "+2.0%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "JCT",
        "score": 100,
        "price": "0.004226",
        "change_24h": "+7.9%",
        "change_4h": "+2.0%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "BZ",
        "score": 100,
        "price": "83.58",
        "change_24h": "+5.6%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "BAN",
        "score": 100,
        "price": "0.07462",
        "change_24h": "+6.6%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "ELSA",
        "score": 100,
        "price": "0.05697",
        "change_24h": "+6.9%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "THE",
        "score": 100,
        "price": "0.05681",
        "change_24h": "+7.9%",
        "change_4h": "+2.2%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "RIF",
        "score": 100,
        "price": "0.13501",
        "change_24h": "+5.7%",
        "change_4h": "+3.6%",
        "change_8h": "+7.2%"
      },
      {
        "coin": "ALLO",
        "score": 100,
        "price": "0.43417",
        "change_24h": "+14.8%",
        "change_4h": "-2.0%",
        "change_8h": "-4.0%"
      },
      {
        "coin": "BSV",
        "score": 100,
        "price": "14.22",
        "change_24h": "+6.0%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "KITE",
        "score": 100,
        "price": "0.13283",
        "change_24h": "+6.8%",
        "change_4h": "-0.3%",
        "change_8h": "-0.6%"
      },
      {
        "coin": "CL",
        "score": 100,
        "price": "79.03",
        "change_24h": "+6.1%",
        "change_4h": "+1.8%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "MUBARAK",
        "score": 95,
        "price": "0.01356",
        "change_24h": "+7.4%",
        "change_4h": "+3.7%",
        "change_8h": "+7.4%"
      },
      {
        "coin": "ESP",
        "score": 95,
        "price": "0.06861",
        "change_24h": "+5.9%",
        "change_4h": "+2.1%",
        "change_8h": "+4.3%"
      },
      {
        "coin": "LINEA",
        "score": 95,
        "price": "0.002533",
        "change_24h": "+7.5%",
        "change_4h": "+2.4%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "ICNT",
        "score": 95,
        "price": "0.1692",
        "change_24h": "+7.2%",
        "change_4h": "+2.0%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "LIGHT",
        "score": 95,
        "price": "0.1243",
        "change_24h": "+8.8%",
        "change_4h": "+2.5%",
        "change_8h": "+5.0%"
      },
      {
        "coin": "ON",
        "score": 95,
        "price": "0.09824",
        "change_24h": "+8.5%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "KGEN",
        "score": 90,
        "price": "0.169",
        "change_24h": "+5.2%",
        "change_4h": "+1.0%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "1000XEC",
        "score": 85,
        "price": "0.006684",
        "change_24h": "+19.1%",
        "change_4h": "+2.7%",
        "change_8h": "+5.3%"
      },
      {
        "coin": "VELVET",
        "score": 85,
        "price": "0.6123",
        "change_24h": "+21.8%",
        "change_4h": "+3.4%",
        "change_8h": "+6.8%"
      },
      {
        "coin": "BILL",
        "score": 85,
        "price": "0.0604",
        "change_24h": "+16.9%",
        "change_4h": "+5.2%",
        "change_8h": "+10.4%"
      },
      {
        "coin": "CAP",
        "score": 75,
        "price": "0.02041",
        "change_24h": "+19.9%",
        "change_4h": "+4.7%",
        "change_8h": "+9.4%"
      },
      {
        "coin": "ZBT",
        "score": 75,
        "price": "0.1399",
        "change_24h": "+22.6%",
        "change_4h": "+4.9%",
        "change_8h": "+9.8%"
      },
      {
        "coin": "1000RATS",
        "score": 70,
        "price": "0.03557",
        "change_24h": "+17.0%",
        "change_4h": "+2.9%",
        "change_8h": "+5.8%"
      },
      {
        "coin": "NEAR",
        "score": 55,
        "price": "1.939",
        "change_24h": "+2.1%",
        "change_4h": "+0.6%",
        "change_8h": "+1.2%"
      },
      {
        "coin": "CRV",
        "score": 50,
        "price": "0.2153",
        "change_24h": "+4.1%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "SAMSUNG",
        "score": 50,
        "price": "176.87",
        "change_24h": "-3.2%",
        "change_4h": "+1.0%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "AVAX",
        "score": 50,
        "price": "6.47",
        "change_24h": "+0.5%",
        "change_4h": "-0.3%",
        "change_8h": "-0.6%"
      },
      {
        "coin": "T",
        "score": 50,
        "price": "0.004913",
        "change_24h": "-10.1%",
        "change_4h": "-1.5%",
        "change_8h": "-3.1%"
      },
      {
        "coin": "BEAT",
        "score": 50,
        "price": "2.638",
        "change_24h": "+2.7%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "DODOX",
        "score": 50,
        "price": "0.021628",
        "change_24h": "-6.7%",
        "change_4h": "-0.5%",
        "change_8h": "-0.9%"
      },
      {
        "coin": "EIGEN",
        "score": 50,
        "price": "0.2419",
        "change_24h": "+4.3%",
        "change_4h": "+0.9%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "JTO",
        "score": 50,
        "price": "0.6408",
        "change_24h": "+4.1%",
        "change_4h": "-0.7%",
        "change_8h": "-1.3%"
      },
      {
        "coin": "UNI",
        "score": 50,
        "price": "3.618",
        "change_24h": "+0.5%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "HEI",
        "score": 50,
        "price": "0.10394",
        "change_24h": "+0.7%",
        "change_4h": "+4.2%",
        "change_8h": "+8.5%"
      },
      {
        "coin": "EVAA",
        "score": 50,
        "price": "0.8301",
        "change_24h": "-26.8%",
        "change_4h": "-4.8%",
        "change_8h": "-9.7%"
      },
      {
        "coin": "DEXE",
        "score": 50,
        "price": "42.94",
        "change_24h": "-12.0%",
        "change_4h": "-1.2%",
        "change_8h": "-2.3%"
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
