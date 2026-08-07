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
    "label": "今天 · 2026-08-07",
    "data": [
      {
        "coin": "AAOI",
        "score": 100,
        "price": "130.63",
        "change_24h": "+5.5%",
        "change_4h": "+0.6%",
        "change_8h": "+1.2%"
      },
      {
        "coin": "ADA",
        "score": 100,
        "price": "0.2011",
        "change_24h": "+5.2%",
        "change_4h": "+0.6%",
        "change_8h": "+1.2%"
      },
      {
        "coin": "JCT",
        "score": 100,
        "price": "0.004725",
        "change_24h": "+11.2%",
        "change_4h": "+1.1%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "TST",
        "score": 100,
        "price": "0.01115",
        "change_24h": "+9.2%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "SUSHI",
        "score": 100,
        "price": "0.165",
        "change_24h": "+7.1%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
      },
      {
        "coin": "ZHIPU",
        "score": 100,
        "price": "142.28",
        "change_24h": "+12.0%",
        "change_4h": "+1.9%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "ARM",
        "score": 100,
        "price": "288.03",
        "change_24h": "+7.3%",
        "change_4h": "+1.1%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "MAVIA",
        "score": 100,
        "price": "0.03135",
        "change_24h": "+14.3%",
        "change_4h": "+2.1%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "MINIMAX",
        "score": 100,
        "price": "37.59",
        "change_24h": "+12.3%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "LIT",
        "score": 100,
        "price": "2.3981",
        "change_24h": "+9.3%",
        "change_4h": "+2.8%",
        "change_8h": "+5.6%"
      },
      {
        "coin": "DIA",
        "score": 100,
        "price": "0.1226",
        "change_24h": "+10.8%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "SIREN",
        "score": 100,
        "price": "0.03127",
        "change_24h": "+11.6%",
        "change_4h": "+2.8%",
        "change_8h": "+5.6%"
      },
      {
        "coin": "HYPER",
        "score": 100,
        "price": "0.06352",
        "change_24h": "+6.2%",
        "change_4h": "+0.3%",
        "change_8h": "+0.5%"
      },
      {
        "coin": "AIO",
        "score": 100,
        "price": "0.03963",
        "change_24h": "+9.3%",
        "change_4h": "+1.7%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "ROBO",
        "score": 100,
        "price": "0.01415",
        "change_24h": "+12.7%",
        "change_4h": "+1.9%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "LITE",
        "score": 100,
        "price": "857.67",
        "change_24h": "+5.8%",
        "change_4h": "+1.2%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "COHR",
        "score": 100,
        "price": "340.25",
        "change_24h": "+7.2%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "ZRO",
        "score": 100,
        "price": "0.821",
        "change_24h": "+5.9%",
        "change_4h": "+0.6%",
        "change_8h": "+1.2%"
      },
      {
        "coin": "RESOLV",
        "score": 100,
        "price": "0.01934",
        "change_24h": "+9.9%",
        "change_4h": "-0.1%",
        "change_8h": "-0.3%"
      },
      {
        "coin": "STAR",
        "score": 100,
        "price": "0.08688",
        "change_24h": "+8.1%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "UAI",
        "score": 100,
        "price": "0.2767",
        "change_24h": "+6.4%",
        "change_4h": "+4.2%",
        "change_8h": "+8.4%"
      },
      {
        "coin": "BTW",
        "score": 100,
        "price": "0.18115",
        "change_24h": "+11.1%",
        "change_4h": "+3.3%",
        "change_8h": "+6.6%"
      },
      {
        "coin": "CAP",
        "score": 100,
        "price": "0.03002",
        "change_24h": "+6.5%",
        "change_4h": "-4.2%",
        "change_8h": "-8.4%"
      },
      {
        "coin": "BASED",
        "score": 100,
        "price": "0.08468",
        "change_24h": "+7.1%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "PEOPLE",
        "score": 100,
        "price": "0.007525",
        "change_24h": "+5.4%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "AKE",
        "score": 100,
        "price": "0.0042102",
        "change_24h": "+5.0%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "ENSO",
        "score": 100,
        "price": "1.0134",
        "change_24h": "+12.7%",
        "change_4h": "+3.1%",
        "change_8h": "+6.1%"
      },
      {
        "coin": "COTI",
        "score": 100,
        "price": "0.014074",
        "change_24h": "+6.9%",
        "change_4h": "-0.5%",
        "change_8h": "-1.0%"
      },
      {
        "coin": "MMT",
        "score": 100,
        "price": "0.1787",
        "change_24h": "+11.5%",
        "change_4h": "+2.1%",
        "change_8h": "+4.3%"
      },
      {
        "coin": "UB",
        "score": 100,
        "price": "0.15587",
        "change_24h": "+5.4%",
        "change_4h": "+3.0%",
        "change_8h": "+5.9%"
      },
      {
        "coin": "ACT",
        "score": 100,
        "price": "0.010337",
        "change_24h": "+7.9%",
        "change_4h": "-0.6%",
        "change_8h": "-1.1%"
      },
      {
        "coin": "MVLL",
        "score": 100,
        "price": "25.55",
        "change_24h": "+7.1%",
        "change_4h": "+0.6%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "AXTI",
        "score": 100,
        "price": "76.49",
        "change_24h": "+14.5%",
        "change_4h": "+2.9%",
        "change_8h": "+5.9%"
      },
      {
        "coin": "SOXL",
        "score": 100,
        "price": "134.23",
        "change_24h": "+6.1%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "ALLO",
        "score": 100,
        "price": "0.2944",
        "change_24h": "+11.1%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "LUMIA",
        "score": 95,
        "price": "0.07935",
        "change_24h": "+7.5%",
        "change_4h": "+0.7%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "C98",
        "score": 95,
        "price": "0.01374",
        "change_24h": "+9.3%",
        "change_4h": "+2.0%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "CRDO",
        "score": 95,
        "price": "230.28",
        "change_24h": "+5.3%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "IRYS",
        "score": 95,
        "price": "0.01611",
        "change_24h": "+9.8%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "KITE",
        "score": 95,
        "price": "0.10736",
        "change_24h": "+5.6%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "FHE",
        "score": 95,
        "price": "0.02607",
        "change_24h": "+7.2%",
        "change_4h": "+1.3%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "COAI",
        "score": 95,
        "price": "0.3597",
        "change_24h": "+5.6%",
        "change_4h": "+1.8%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "LA",
        "score": 95,
        "price": "0.0479",
        "change_24h": "+5.5%",
        "change_4h": "+1.7%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "BLUAI",
        "score": 95,
        "price": "0.013392",
        "change_24h": "+7.4%",
        "change_4h": "+1.1%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "PIXEL",
        "score": 95,
        "price": "0.004421",
        "change_24h": "+5.4%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "FRAX",
        "score": 95,
        "price": "0.3099",
        "change_24h": "+13.7%",
        "change_4h": "+2.1%",
        "change_8h": "+4.3%"
      },
      {
        "coin": "HAEDAL",
        "score": 95,
        "price": "0.0157",
        "change_24h": "+6.4%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
      },
      {
        "coin": "TAG",
        "score": 95,
        "price": "0.001351",
        "change_24h": "+5.2%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "BTR",
        "score": 95,
        "price": "0.02217",
        "change_24h": "+6.8%",
        "change_4h": "+0.9%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "ZKP",
        "score": 95,
        "price": "0.0495",
        "change_24h": "+8.6%",
        "change_4h": "+2.1%",
        "change_8h": "+4.1%"
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
