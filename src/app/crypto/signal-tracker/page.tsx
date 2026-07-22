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
    "label": "今天 · 2026-07-22",
    "data": [
      {
        "coin": "SNDK",
        "score": 100,
        "price": "1610.58",
        "change_24h": "+12.5%",
        "change_4h": "+2.1%",
        "change_8h": "+4.3%"
      },
      {
        "coin": "FWDI",
        "score": 100,
        "price": "4.512",
        "change_24h": "+7.7%",
        "change_4h": "-2.3%",
        "change_8h": "-4.6%"
      },
      {
        "coin": "GENIUS",
        "score": 100,
        "price": "0.3601",
        "change_24h": "+11.5%",
        "change_4h": "+1.9%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "MU",
        "score": 100,
        "price": "975.69",
        "change_24h": "+10.0%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "ANTHROPIC",
        "score": 100,
        "price": "1573.7",
        "change_24h": "+12.7%",
        "change_4h": "+2.9%",
        "change_8h": "+5.7%"
      },
      {
        "coin": "SAMSUNG",
        "score": 100,
        "price": "185.25",
        "change_24h": "+6.8%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "SIREN",
        "score": 100,
        "price": "0.0307",
        "change_24h": "+5.2%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "GLW",
        "score": 100,
        "price": "163.55",
        "change_24h": "+5.6%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "BILL",
        "score": 100,
        "price": "0.02555",
        "change_24h": "+6.7%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "ONDO",
        "score": 100,
        "price": "0.4017",
        "change_24h": "+12.0%",
        "change_4h": "+2.3%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "INTW",
        "score": 100,
        "price": "27.57",
        "change_24h": "+14.7%",
        "change_4h": "+2.4%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "SOXL",
        "score": 100,
        "price": "156.85",
        "change_24h": "+11.4%",
        "change_4h": "+2.0%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "EWY",
        "score": 100,
        "price": "175.57",
        "change_24h": "+6.1%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "AAVE",
        "score": 100,
        "price": "96.29",
        "change_24h": "+6.0%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "NBIS",
        "score": 100,
        "price": "219.04",
        "change_24h": "+14.8%",
        "change_4h": "+3.1%",
        "change_8h": "+6.1%"
      },
      {
        "coin": "HMSTR",
        "score": 100,
        "price": "0.0001824",
        "change_24h": "+6.3%",
        "change_4h": "+0.1%",
        "change_8h": "+0.1%"
      },
      {
        "coin": "US",
        "score": 100,
        "price": "0.042146",
        "change_24h": "+9.4%",
        "change_4h": "+1.5%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "SKHY",
        "score": 100,
        "price": "173.6",
        "change_24h": "+11.2%",
        "change_4h": "+2.6%",
        "change_8h": "+5.3%"
      },
      {
        "coin": "ZBT",
        "score": 100,
        "price": "0.09806",
        "change_24h": "+12.1%",
        "change_4h": "+2.1%",
        "change_8h": "+4.3%"
      },
      {
        "coin": "MINIMAX",
        "score": 100,
        "price": "29.41",
        "change_24h": "+11.5%",
        "change_4h": "+4.7%",
        "change_8h": "+9.4%"
      },
      {
        "coin": "RE",
        "score": 100,
        "price": "0.4095",
        "change_24h": "+11.9%",
        "change_4h": "+1.9%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "SKHYNIX",
        "score": 100,
        "price": "1346.55",
        "change_24h": "+9.3%",
        "change_4h": "+2.2%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "MITO",
        "score": 100,
        "price": "0.02532",
        "change_24h": "+13.2%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "DRAM",
        "score": 100,
        "price": "59.62",
        "change_24h": "+9.4%",
        "change_4h": "+2.2%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "OPN",
        "score": 100,
        "price": "0.06649",
        "change_24h": "+7.0%",
        "change_4h": "-0.7%",
        "change_8h": "-1.5%"
      },
      {
        "coin": "OPENAI",
        "score": 100,
        "price": "1117.84",
        "change_24h": "+5.3%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "BE",
        "score": 100,
        "price": "228.91",
        "change_24h": "+13.4%",
        "change_4h": "+2.9%",
        "change_8h": "+5.9%"
      },
      {
        "coin": "XMR",
        "score": 100,
        "price": "358.97",
        "change_24h": "+6.1%",
        "change_4h": "+1.2%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "1INCH",
        "score": 100,
        "price": "0.08224",
        "change_24h": "+8.5%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "COIN",
        "score": 100,
        "price": "176.61",
        "change_24h": "+8.9%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "CRCL",
        "score": 100,
        "price": "70.43",
        "change_24h": "+5.2%",
        "change_4h": "+0.8%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "MVLL",
        "score": 100,
        "price": "26.6",
        "change_24h": "+13.0%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "DELL",
        "score": 100,
        "price": "425.08",
        "change_24h": "+9.9%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "VVV",
        "score": 100,
        "price": "12.601",
        "change_24h": "+8.0%",
        "change_4h": "+0.7%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "LITE",
        "score": 100,
        "price": "831.46",
        "change_24h": "+6.6%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "RKLB",
        "score": 100,
        "price": "72.93",
        "change_24h": "+9.6%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "WDC",
        "score": 100,
        "price": "553.18",
        "change_24h": "+11.3%",
        "change_4h": "+2.1%",
        "change_8h": "+4.3%"
      },
      {
        "coin": "PLAY",
        "score": 100,
        "price": "0.03715",
        "change_24h": "+7.7%",
        "change_4h": "+3.2%",
        "change_8h": "+6.3%"
      },
      {
        "coin": "MRVL",
        "score": 100,
        "price": "210.39",
        "change_24h": "+6.6%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "GRAM",
        "score": 100,
        "price": "1.534",
        "change_24h": "+7.0%",
        "change_4h": "+1.3%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "INTC",
        "score": 100,
        "price": "105.96",
        "change_24h": "+7.3%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "FIL",
        "score": 100,
        "price": "0.7742",
        "change_24h": "+5.3%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "AMD",
        "score": 100,
        "price": "542.01",
        "change_24h": "+6.4%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "COHR",
        "score": 95,
        "price": "318.12",
        "change_24h": "+9.9%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "PLUME",
        "score": 95,
        "price": "0.01154",
        "change_24h": "+7.6%",
        "change_4h": "+1.8%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "COLLECT",
        "score": 95,
        "price": "0.05016",
        "change_24h": "+5.3%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "CAP",
        "score": 95,
        "price": "0.02102",
        "change_24h": "+8.2%",
        "change_4h": "+2.7%",
        "change_8h": "+5.5%"
      },
      {
        "coin": "DUSK",
        "score": 95,
        "price": "0.06928",
        "change_24h": "+5.6%",
        "change_4h": "+0.1%",
        "change_8h": "+0.3%"
      },
      {
        "coin": "SAGA",
        "score": 95,
        "price": "0.01379",
        "change_24h": "+5.6%",
        "change_4h": "+1.8%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "AMAT",
        "score": 95,
        "price": "560.55",
        "change_24h": "+6.0%",
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
