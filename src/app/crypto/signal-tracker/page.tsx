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
    "label": "今天 · 2026-08-10",
    "data": [
      {
        "coin": "CATI",
        "score": 100,
        "price": "0.0464",
        "change_24h": "+5.8%",
        "change_4h": "-4.7%",
        "change_8h": "-9.5%"
      },
      {
        "coin": "PTB",
        "score": 100,
        "price": "0.0009105",
        "change_24h": "+7.6%",
        "change_4h": "+0.2%",
        "change_8h": "+0.5%"
      },
      {
        "coin": "4",
        "score": 100,
        "price": "0.013714",
        "change_24h": "+8.7%",
        "change_4h": "+3.9%",
        "change_8h": "+7.7%"
      },
      {
        "coin": "TST",
        "score": 100,
        "price": "0.01926",
        "change_24h": "+11.6%",
        "change_4h": "-1.4%",
        "change_8h": "-2.8%"
      },
      {
        "coin": "INX",
        "score": 100,
        "price": "0.008577",
        "change_24h": "+12.6%",
        "change_4h": "+0.5%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "WLD",
        "score": 100,
        "price": "0.3215",
        "change_24h": "+6.2%",
        "change_4h": "+1.1%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "KERNEL",
        "score": 100,
        "price": "0.03676",
        "change_24h": "+6.1%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
      },
      {
        "coin": "LISTA",
        "score": 100,
        "price": "0.06766",
        "change_24h": "+10.2%",
        "change_4h": "+3.4%",
        "change_8h": "+6.7%"
      },
      {
        "coin": "PUMP",
        "score": 100,
        "price": "0.002736",
        "change_24h": "+12.9%",
        "change_4h": "+2.4%",
        "change_8h": "+4.8%"
      },
      {
        "coin": "AKE",
        "score": 100,
        "price": "0.0041969",
        "change_24h": "+6.5%",
        "change_4h": "+1.0%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "SHELL",
        "score": 100,
        "price": "0.02027",
        "change_24h": "+5.3%",
        "change_4h": "-4.3%",
        "change_8h": "-8.7%"
      },
      {
        "coin": "PARTI",
        "score": 100,
        "price": "0.02695",
        "change_24h": "+12.2%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "BABY",
        "score": 100,
        "price": "0.01334",
        "change_24h": "+6.5%",
        "change_4h": "+2.0%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "COOKIE",
        "score": 100,
        "price": "0.013732",
        "change_24h": "+12.5%",
        "change_4h": "-1.2%",
        "change_8h": "-2.5%"
      },
      {
        "coin": "CC",
        "score": 100,
        "price": "0.10037",
        "change_24h": "+6.7%",
        "change_4h": "+1.1%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "BROCCOLI714",
        "score": 100,
        "price": "0.02035",
        "change_24h": "+13.2%",
        "change_4h": "+3.4%",
        "change_8h": "+6.7%"
      },
      {
        "coin": "ARC",
        "score": 100,
        "price": "0.06582",
        "change_24h": "+6.2%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "SOLV",
        "score": 100,
        "price": "0.002687",
        "change_24h": "+10.5%",
        "change_4h": "-0.0%",
        "change_8h": "-0.1%"
      },
      {
        "coin": "JOE",
        "score": 100,
        "price": "0.02886",
        "change_24h": "+9.8%",
        "change_4h": "-3.6%",
        "change_8h": "-7.2%"
      },
      {
        "coin": "GRVT",
        "score": 100,
        "price": "0.3188",
        "change_24h": "+10.8%",
        "change_4h": "+3.8%",
        "change_8h": "+7.5%"
      },
      {
        "coin": "ON",
        "score": 100,
        "price": "0.3657",
        "change_24h": "+8.6%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "LA",
        "score": 100,
        "price": "0.05447",
        "change_24h": "+6.7%",
        "change_4h": "+1.6%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "PNUT",
        "score": 100,
        "price": "0.04298",
        "change_24h": "+8.8%",
        "change_4h": "+0.2%",
        "change_8h": "+0.4%"
      },
      {
        "coin": "NEIRO",
        "score": 100,
        "price": "7.616e-05",
        "change_24h": "+14.2%",
        "change_4h": "+3.4%",
        "change_8h": "+6.8%"
      },
      {
        "coin": "1000RATS",
        "score": 100,
        "price": "0.04621",
        "change_24h": "+6.7%",
        "change_4h": "+1.3%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "CTSI",
        "score": 100,
        "price": "0.02807",
        "change_24h": "+12.8%",
        "change_4h": "+2.0%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "MMT",
        "score": 100,
        "price": "0.2085",
        "change_24h": "+5.1%",
        "change_4h": "-1.4%",
        "change_8h": "-2.8%"
      },
      {
        "coin": "ACT",
        "score": 100,
        "price": "0.011247",
        "change_24h": "+12.8%",
        "change_4h": "+3.7%",
        "change_8h": "+7.5%"
      },
      {
        "coin": "BB",
        "score": 100,
        "price": "0.01456",
        "change_24h": "+7.1%",
        "change_4h": "-1.2%",
        "change_8h": "-2.4%"
      },
      {
        "coin": "HAEDAL",
        "score": 95,
        "price": "0.01749",
        "change_24h": "+6.1%",
        "change_4h": "+0.6%",
        "change_8h": "+1.2%"
      },
      {
        "coin": "BIO",
        "score": 95,
        "price": "0.0261",
        "change_24h": "+5.5%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "PROMPT",
        "score": 95,
        "price": "0.02338",
        "change_24h": "+9.4%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "CRV",
        "score": 95,
        "price": "0.2391",
        "change_24h": "+6.0%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "CLANKER",
        "score": 95,
        "price": "13.58",
        "change_24h": "+7.6%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "DYM",
        "score": 95,
        "price": "0.01583",
        "change_24h": "+5.2%",
        "change_4h": "-2.3%",
        "change_8h": "-4.6%"
      },
      {
        "coin": "FIGHT",
        "score": 95,
        "price": "0.003763",
        "change_24h": "+5.3%",
        "change_4h": "+1.6%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "REZ",
        "score": 95,
        "price": "0.003086",
        "change_24h": "+11.4%",
        "change_4h": "+2.5%",
        "change_8h": "+5.0%"
      },
      {
        "coin": "ICNT",
        "score": 95,
        "price": "0.1369",
        "change_24h": "+5.1%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "1MBABYDOGE",
        "score": 95,
        "price": "0.0003634",
        "change_24h": "+7.5%",
        "change_4h": "+1.9%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "CHR",
        "score": 95,
        "price": "0.01484",
        "change_24h": "+9.2%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "DRIFT",
        "score": 95,
        "price": "0.01408",
        "change_24h": "+8.1%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "GUN",
        "score": 95,
        "price": "0.00326",
        "change_24h": "+6.3%",
        "change_4h": "+0.9%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "AVNT",
        "score": 95,
        "price": "0.09544",
        "change_24h": "+9.0%",
        "change_4h": "+1.7%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "YB",
        "score": 95,
        "price": "0.07633",
        "change_24h": "+5.8%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
      },
      {
        "coin": "MEME",
        "score": 95,
        "price": "0.0005453",
        "change_24h": "+8.0%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "AIXBT",
        "score": 95,
        "price": "0.02011",
        "change_24h": "+12.0%",
        "change_4h": "+2.3%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "CVX",
        "score": 95,
        "price": "1.608",
        "change_24h": "+6.0%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "1000SATS",
        "score": 95,
        "price": "1.119e-05",
        "change_24h": "+8.6%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "COAI",
        "score": 95,
        "price": "0.3837",
        "change_24h": "+7.8%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "SQD",
        "score": 95,
        "price": "0.03792",
        "change_24h": "+8.8%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
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
