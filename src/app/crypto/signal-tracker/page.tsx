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
    "label": "今天 · 2026-08-08",
    "data": [
      {
        "coin": "KOMA",
        "score": 100,
        "price": "0.0132",
        "change_24h": "+10.0%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "SKYAI",
        "score": 100,
        "price": "0.11367",
        "change_24h": "+12.1%",
        "change_4h": "+3.7%",
        "change_8h": "+7.4%"
      },
      {
        "coin": "AIN",
        "score": 100,
        "price": "0.07759",
        "change_24h": "+10.6%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "ALLO",
        "score": 100,
        "price": "0.3184",
        "change_24h": "+9.3%",
        "change_4h": "-1.3%",
        "change_8h": "-2.6%"
      },
      {
        "coin": "RKLB",
        "score": 100,
        "price": "83.77",
        "change_24h": "+9.5%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "ZHIPU",
        "score": 100,
        "price": "161.04",
        "change_24h": "+11.5%",
        "change_4h": "+2.4%",
        "change_8h": "+4.8%"
      },
      {
        "coin": "CBRS",
        "score": 100,
        "price": "229.38",
        "change_24h": "+8.1%",
        "change_4h": "+2.9%",
        "change_8h": "+5.7%"
      },
      {
        "coin": "MMT",
        "score": 100,
        "price": "0.1907",
        "change_24h": "+5.7%",
        "change_4h": "+3.4%",
        "change_8h": "+6.7%"
      },
      {
        "coin": "MINIMAX",
        "score": 100,
        "price": "42.54",
        "change_24h": "+9.8%",
        "change_4h": "-0.4%",
        "change_8h": "-0.9%"
      },
      {
        "coin": "MUBARAK",
        "score": 100,
        "price": "0.01402",
        "change_24h": "+10.9%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "BROCCOLI714",
        "score": 100,
        "price": "0.01551",
        "change_24h": "+12.1%",
        "change_4h": "+2.2%",
        "change_8h": "+4.3%"
      },
      {
        "coin": "TAKE",
        "score": 100,
        "price": "0.07076",
        "change_24h": "+5.3%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "KGEN",
        "score": 100,
        "price": "0.2092",
        "change_24h": "+8.2%",
        "change_4h": "-2.3%",
        "change_8h": "-4.7%"
      },
      {
        "coin": "CAP",
        "score": 100,
        "price": "0.03441",
        "change_24h": "+14.8%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "ESP",
        "score": 100,
        "price": "0.07056",
        "change_24h": "+11.7%",
        "change_4h": "+0.6%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "LA",
        "score": 100,
        "price": "0.05284",
        "change_24h": "+10.2%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "APR",
        "score": 100,
        "price": "0.2134",
        "change_24h": "+10.4%",
        "change_4h": "+1.8%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "RAVE",
        "score": 100,
        "price": "0.3264",
        "change_24h": "+7.9%",
        "change_4h": "+1.6%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "USAR",
        "score": 100,
        "price": "19.41",
        "change_24h": "+10.5%",
        "change_4h": "+2.3%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "COIN",
        "score": 100,
        "price": "154.22",
        "change_24h": "+5.3%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "IREN",
        "score": 100,
        "price": "41.71",
        "change_24h": "+8.9%",
        "change_4h": "+2.7%",
        "change_8h": "+5.5%"
      },
      {
        "coin": "HMSTR",
        "score": 100,
        "price": "0.0001995",
        "change_24h": "+6.1%",
        "change_4h": "+0.4%",
        "change_8h": "+0.9%"
      },
      {
        "coin": "MVLL",
        "score": 100,
        "price": "27.06",
        "change_24h": "+5.0%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "PLTR",
        "score": 100,
        "price": "172.46",
        "change_24h": "+10.3%",
        "change_4h": "+2.5%",
        "change_8h": "+5.0%"
      },
      {
        "coin": "C98",
        "score": 100,
        "price": "0.01538",
        "change_24h": "+11.9%",
        "change_4h": "-2.3%",
        "change_8h": "-4.6%"
      },
      {
        "coin": "GRVT",
        "score": 100,
        "price": "0.3203",
        "change_24h": "+14.2%",
        "change_4h": "+3.0%",
        "change_8h": "+6.1%"
      },
      {
        "coin": "AIO",
        "score": 100,
        "price": "0.04344",
        "change_24h": "+9.7%",
        "change_4h": "+2.0%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "COHR",
        "score": 100,
        "price": "382.1",
        "change_24h": "+12.3%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "PROM",
        "score": 95,
        "price": "2.118",
        "change_24h": "+5.0%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "GRIFFAIN",
        "score": 95,
        "price": "0.010576",
        "change_24h": "+9.3%",
        "change_4h": "+2.4%",
        "change_8h": "+4.8%"
      },
      {
        "coin": "AVA",
        "score": 95,
        "price": "0.2054",
        "change_24h": "+7.1%",
        "change_4h": "+0.3%",
        "change_8h": "+0.7%"
      },
      {
        "coin": "DKNG",
        "score": 95,
        "price": "23.98",
        "change_24h": "+12.0%",
        "change_4h": "+2.6%",
        "change_8h": "+5.2%"
      },
      {
        "coin": "TRIA",
        "score": 95,
        "price": "0.008972",
        "change_24h": "+7.2%",
        "change_4h": "+2.6%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "GLW",
        "score": 95,
        "price": "167.12",
        "change_24h": "+5.1%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "POWER",
        "score": 95,
        "price": "0.09238",
        "change_24h": "+6.3%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "1000XEC",
        "score": 95,
        "price": "0.006581",
        "change_24h": "+5.3%",
        "change_4h": "+0.7%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "ETHFI",
        "score": 95,
        "price": "0.3805",
        "change_24h": "+5.4%",
        "change_4h": "+0.9%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "CRWV",
        "score": 95,
        "price": "91.54",
        "change_24h": "+6.4%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "COAI",
        "score": 95,
        "price": "0.3842",
        "change_24h": "+6.6%",
        "change_4h": "+2.4%",
        "change_8h": "+4.8%"
      },
      {
        "coin": "ELSA",
        "score": 95,
        "price": "0.05692",
        "change_24h": "+6.6%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "FIGHT",
        "score": 95,
        "price": "0.00382",
        "change_24h": "+9.3%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "1000CAT",
        "score": 95,
        "price": "0.001551",
        "change_24h": "+5.1%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "CARV",
        "score": 95,
        "price": "0.03178",
        "change_24h": "+8.8%",
        "change_4h": "+2.2%",
        "change_8h": "+4.3%"
      },
      {
        "coin": "CRDO",
        "score": 90,
        "price": "250.07",
        "change_24h": "+8.3%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "UBER",
        "score": 90,
        "price": "74.94",
        "change_24h": "+5.8%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "AIA",
        "score": 90,
        "price": "0.06911",
        "change_24h": "+5.1%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "ASTS",
        "score": 90,
        "price": "72.2",
        "change_24h": "+6.1%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "MAV",
        "score": 90,
        "price": "0.008737",
        "change_24h": "+5.9%",
        "change_4h": "-0.0%",
        "change_8h": "-0.1%"
      },
      {
        "coin": "IN",
        "score": 90,
        "price": "0.03552",
        "change_24h": "+5.4%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "BROCCOLIF3B",
        "score": 90,
        "price": "0.006922",
        "change_24h": "+5.1%",
        "change_4h": "+0.4%",
        "change_8h": "+0.9%"
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
