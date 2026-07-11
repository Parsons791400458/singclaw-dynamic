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
    "label": "今天 · 2026-07-11",
    "data": [
      {
        "coin": "LIT",
        "score": 100,
        "price": "2.6456",
        "change_24h": "+10.1%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "DEXE",
        "score": 100,
        "price": "35.85",
        "change_24h": "+5.8%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "AKE",
        "score": 100,
        "price": "0.000209",
        "change_24h": "+7.7%",
        "change_4h": "+4.5%",
        "change_8h": "+9.0%"
      },
      {
        "coin": "BEL",
        "score": 100,
        "price": "0.11043",
        "change_24h": "+7.4%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "HMSTR",
        "score": 100,
        "price": "0.0002089",
        "change_24h": "+8.3%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "M",
        "score": 100,
        "price": "1.3553",
        "change_24h": "+11.8%",
        "change_4h": "+1.7%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "KAT",
        "score": 100,
        "price": "0.005272",
        "change_24h": "+7.3%",
        "change_4h": "-2.7%",
        "change_8h": "-5.4%"
      },
      {
        "coin": "BEAT",
        "score": 100,
        "price": "2.588",
        "change_24h": "+13.5%",
        "change_4h": "+3.1%",
        "change_8h": "+6.2%"
      },
      {
        "coin": "PYTH",
        "score": 100,
        "price": "0.04826",
        "change_24h": "+6.5%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "ENA",
        "score": 100,
        "price": "0.08194",
        "change_24h": "+5.8%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "SNXX",
        "score": 100,
        "price": "28.54",
        "change_24h": "+6.5%",
        "change_4h": "+2.6%",
        "change_8h": "+5.2%"
      },
      {
        "coin": "TAG",
        "score": 100,
        "price": "0.000999",
        "change_24h": "+13.1%",
        "change_4h": "+0.0%",
        "change_8h": "+0.0%"
      },
      {
        "coin": "ZBT",
        "score": 100,
        "price": "0.12967",
        "change_24h": "+7.8%",
        "change_4h": "+0.6%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "USELESS",
        "score": 100,
        "price": "0.08992",
        "change_24h": "+8.7%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "SYRUP",
        "score": 100,
        "price": "0.18402",
        "change_24h": "+12.8%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "CBRS",
        "score": 100,
        "price": "214.23",
        "change_24h": "+6.5%",
        "change_4h": "+2.5%",
        "change_8h": "+5.0%"
      },
      {
        "coin": "ACT",
        "score": 100,
        "price": "0.00962",
        "change_24h": "+6.5%",
        "change_4h": "+1.7%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "UAI",
        "score": 100,
        "price": "0.4031",
        "change_24h": "+5.2%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "DOT",
        "score": 100,
        "price": "0.878",
        "change_24h": "+6.0%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "1000PEPE",
        "score": 100,
        "price": "0.0027889",
        "change_24h": "+6.0%",
        "change_4h": "+0.7%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "SKYAI",
        "score": 100,
        "price": "0.03939",
        "change_24h": "+6.2%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "IN",
        "score": 95,
        "price": "0.05047",
        "change_24h": "+7.5%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "ZEST",
        "score": 95,
        "price": "0.22125",
        "change_24h": "+8.1%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "CVX",
        "score": 95,
        "price": "1.248",
        "change_24h": "+5.3%",
        "change_4h": "+0.2%",
        "change_8h": "+0.3%"
      },
      {
        "coin": "BLESS",
        "score": 95,
        "price": "0.008405",
        "change_24h": "+10.8%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "RLC",
        "score": 95,
        "price": "0.3121",
        "change_24h": "+7.0%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "WET",
        "score": 95,
        "price": "0.07239",
        "change_24h": "+6.7%",
        "change_4h": "+2.2%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "BIRB",
        "score": 95,
        "price": "0.06532",
        "change_24h": "+5.1%",
        "change_4h": "+1.3%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "TUT",
        "score": 95,
        "price": "0.01181",
        "change_24h": "+11.4%",
        "change_4h": "+2.6%",
        "change_8h": "+5.3%"
      },
      {
        "coin": "SCRT",
        "score": 95,
        "price": "0.04272",
        "change_24h": "+6.9%",
        "change_4h": "+2.3%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "F",
        "score": 95,
        "price": "0.003519",
        "change_24h": "+5.3%",
        "change_4h": "-0.3%",
        "change_8h": "-0.6%"
      },
      {
        "coin": "DUSK",
        "score": 95,
        "price": "0.08341",
        "change_24h": "+9.9%",
        "change_4h": "+2.4%",
        "change_8h": "+4.8%"
      },
      {
        "coin": "BNC",
        "score": 95,
        "price": "2.957",
        "change_24h": "+8.8%",
        "change_4h": "-7.7%",
        "change_8h": "-15.5%"
      },
      {
        "coin": "NAORIS",
        "score": 95,
        "price": "0.03665",
        "change_24h": "+13.2%",
        "change_4h": "+2.6%",
        "change_8h": "+5.3%"
      },
      {
        "coin": "HOLO",
        "score": 95,
        "price": "0.07332",
        "change_24h": "+6.7%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "TRUST",
        "score": 95,
        "price": "0.05184",
        "change_24h": "+5.5%",
        "change_4h": "-0.7%",
        "change_8h": "-1.3%"
      },
      {
        "coin": "APR",
        "score": 95,
        "price": "0.2158",
        "change_24h": "+6.9%",
        "change_4h": "+1.1%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "SAFE",
        "score": 95,
        "price": "0.1136",
        "change_24h": "+6.3%",
        "change_4h": "+2.2%",
        "change_8h": "+4.3%"
      },
      {
        "coin": "YB",
        "score": 90,
        "price": "0.07723",
        "change_24h": "+6.5%",
        "change_4h": "+1.2%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "ZKP",
        "score": 90,
        "price": "0.04719",
        "change_24h": "+6.4%",
        "change_4h": "+1.3%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "FOGO",
        "score": 90,
        "price": "0.01012",
        "change_24h": "+8.4%",
        "change_4h": "+1.8%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "SOON",
        "score": 90,
        "price": "0.1783",
        "change_24h": "+6.4%",
        "change_4h": "+1.3%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "ESP",
        "score": 90,
        "price": "0.0677",
        "change_24h": "+6.0%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "FRAX",
        "score": 90,
        "price": "0.251",
        "change_24h": "+5.6%",
        "change_4h": "+0.7%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "PLUME",
        "score": 90,
        "price": "0.01065",
        "change_24h": "+5.7%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
      },
      {
        "coin": "AVNT",
        "score": 90,
        "price": "0.1003",
        "change_24h": "+5.5%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "C",
        "score": 90,
        "price": "0.06918",
        "change_24h": "+6.1%",
        "change_4h": "-0.8%",
        "change_8h": "-1.6%"
      },
      {
        "coin": "GPS",
        "score": 90,
        "price": "0.010463",
        "change_24h": "+6.0%",
        "change_4h": "+1.6%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "EVAA",
        "score": 85,
        "price": "2.5996",
        "change_24h": "+20.5%",
        "change_4h": "+3.8%",
        "change_8h": "+7.5%"
      },
      {
        "coin": "SKL",
        "score": 80,
        "price": "0.004804",
        "change_24h": "+18.7%",
        "change_4h": "-2.6%",
        "change_8h": "-5.2%"
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
