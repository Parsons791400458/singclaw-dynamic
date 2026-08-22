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
    "label": "今天 · 2026-08-22",
    "data": [
      {
        "coin": "KITE",
        "score": 100,
        "price": "0.11105",
        "change_24h": "+11.9%",
        "change_4h": "+2.9%",
        "change_8h": "+5.7%"
      },
      {
        "coin": "STAR",
        "score": 100,
        "price": "0.14865",
        "change_24h": "+7.6%",
        "change_4h": "-0.1%",
        "change_8h": "-0.3%"
      },
      {
        "coin": "MMT",
        "score": 100,
        "price": "0.1883",
        "change_24h": "+6.6%",
        "change_4h": "+1.6%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "ARX",
        "score": 100,
        "price": "0.1281",
        "change_24h": "+10.3%",
        "change_4h": "+1.3%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "1MBABYDOGE",
        "score": 100,
        "price": "0.0003948",
        "change_24h": "+8.5%",
        "change_4h": "+1.7%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "MOVE",
        "score": 100,
        "price": "0.007369",
        "change_24h": "+11.9%",
        "change_4h": "+2.7%",
        "change_8h": "+5.4%"
      },
      {
        "coin": "1000XEC",
        "score": 100,
        "price": "0.007948",
        "change_24h": "+14.8%",
        "change_4h": "+3.1%",
        "change_8h": "+6.3%"
      },
      {
        "coin": "COTI",
        "score": 100,
        "price": "0.011107",
        "change_24h": "+13.9%",
        "change_4h": "-1.9%",
        "change_8h": "-3.7%"
      },
      {
        "coin": "ACT",
        "score": 100,
        "price": "0.012241",
        "change_24h": "+11.1%",
        "change_4h": "+1.3%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "BASED",
        "score": 100,
        "price": "0.09314",
        "change_24h": "+11.3%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "HOME",
        "score": 100,
        "price": "0.006616",
        "change_24h": "+9.4%",
        "change_4h": "+2.1%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "MANTRA",
        "score": 100,
        "price": "0.004841",
        "change_24h": "+12.1%",
        "change_4h": "+2.5%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "LTC",
        "score": 100,
        "price": "53.71",
        "change_24h": "+11.8%",
        "change_4h": "+2.6%",
        "change_8h": "+5.2%"
      },
      {
        "coin": "CFX",
        "score": 100,
        "price": "0.05027",
        "change_24h": "+11.9%",
        "change_4h": "+2.3%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "MEME",
        "score": 100,
        "price": "0.0005826",
        "change_24h": "+13.4%",
        "change_4h": "+2.8%",
        "change_8h": "+5.6%"
      },
      {
        "coin": "BERA",
        "score": 100,
        "price": "0.199",
        "change_24h": "+14.8%",
        "change_4h": "+2.7%",
        "change_8h": "+5.5%"
      },
      {
        "coin": "GRAM",
        "score": 100,
        "price": "1.489",
        "change_24h": "+6.0%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "GPS",
        "score": 100,
        "price": "0.013108",
        "change_24h": "+8.3%",
        "change_4h": "-0.9%",
        "change_8h": "-1.8%"
      },
      {
        "coin": "CAKE",
        "score": 100,
        "price": "1.7794",
        "change_24h": "+8.1%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "AR",
        "score": 100,
        "price": "2.292",
        "change_24h": "+11.8%",
        "change_4h": "+2.3%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "NEAR",
        "score": 100,
        "price": "1.979",
        "change_24h": "+11.6%",
        "change_4h": "+2.7%",
        "change_8h": "+5.5%"
      },
      {
        "coin": "ADA",
        "score": 100,
        "price": "0.232",
        "change_24h": "+13.3%",
        "change_4h": "+3.0%",
        "change_8h": "+6.0%"
      },
      {
        "coin": "HBAR",
        "score": 100,
        "price": "0.08032",
        "change_24h": "+8.3%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "DOGE",
        "score": 100,
        "price": "0.09218",
        "change_24h": "+12.5%",
        "change_4h": "+2.4%",
        "change_8h": "+4.8%"
      },
      {
        "coin": "TAO",
        "score": 100,
        "price": "230.46",
        "change_24h": "+7.3%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "BANK",
        "score": 100,
        "price": "0.03865",
        "change_24h": "+7.6%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "XLM",
        "score": 100,
        "price": "0.2061",
        "change_24h": "+11.6%",
        "change_4h": "+2.9%",
        "change_8h": "+5.8%"
      },
      {
        "coin": "ALGO",
        "score": 100,
        "price": "0.09879",
        "change_24h": "+12.5%",
        "change_4h": "+3.0%",
        "change_8h": "+6.0%"
      },
      {
        "coin": "ZHIPU",
        "score": 100,
        "price": "144.61",
        "change_24h": "+10.4%",
        "change_4h": "+2.7%",
        "change_8h": "+5.4%"
      },
      {
        "coin": "EDGE",
        "score": 100,
        "price": "0.3873",
        "change_24h": "+13.7%",
        "change_4h": "+3.1%",
        "change_8h": "+6.2%"
      },
      {
        "coin": "WLD",
        "score": 100,
        "price": "0.417",
        "change_24h": "+11.9%",
        "change_4h": "+2.8%",
        "change_8h": "+5.6%"
      },
      {
        "coin": "TRIA",
        "score": 100,
        "price": "0.007782",
        "change_24h": "+8.8%",
        "change_4h": "+0.8%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "LDO",
        "score": 100,
        "price": "0.3809",
        "change_24h": "+12.1%",
        "change_4h": "+2.5%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "LPT",
        "score": 100,
        "price": "1.474",
        "change_24h": "+12.3%",
        "change_4h": "+2.8%",
        "change_8h": "+5.6%"
      },
      {
        "coin": "ATOM",
        "score": 100,
        "price": "1.606",
        "change_24h": "+6.2%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "GAS",
        "score": 100,
        "price": "1.325",
        "change_24h": "+13.8%",
        "change_4h": "+3.5%",
        "change_8h": "+7.0%"
      },
      {
        "coin": "CFG",
        "score": 100,
        "price": "0.1514",
        "change_24h": "+13.7%",
        "change_4h": "+3.1%",
        "change_8h": "+6.3%"
      },
      {
        "coin": "COIN",
        "score": 100,
        "price": "189.95",
        "change_24h": "+7.7%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "1000LUNC",
        "score": 100,
        "price": "0.06027",
        "change_24h": "+13.2%",
        "change_4h": "+3.1%",
        "change_8h": "+6.2%"
      },
      {
        "coin": "SOL",
        "score": 100,
        "price": "94.02",
        "change_24h": "+6.4%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "ONDO",
        "score": 100,
        "price": "0.4087",
        "change_24h": "+13.9%",
        "change_4h": "+3.3%",
        "change_8h": "+6.6%"
      },
      {
        "coin": "STRK",
        "score": 100,
        "price": "0.02956",
        "change_24h": "+14.9%",
        "change_4h": "+3.3%",
        "change_8h": "+6.6%"
      },
      {
        "coin": "IO",
        "score": 100,
        "price": "0.1431",
        "change_24h": "+10.0%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "DUSK",
        "score": 100,
        "price": "0.08121",
        "change_24h": "+13.1%",
        "change_4h": "+3.0%",
        "change_8h": "+5.9%"
      },
      {
        "coin": "ARB",
        "score": 100,
        "price": "0.09892",
        "change_24h": "+8.7%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "INJ",
        "score": 100,
        "price": "5.056",
        "change_24h": "+6.7%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "OP",
        "score": 100,
        "price": "0.10856",
        "change_24h": "+12.1%",
        "change_4h": "+2.8%",
        "change_8h": "+5.6%"
      },
      {
        "coin": "MOODENG",
        "score": 100,
        "price": "0.04962",
        "change_24h": "+14.1%",
        "change_4h": "+3.6%",
        "change_8h": "+7.2%"
      },
      {
        "coin": "AXS",
        "score": 100,
        "price": "1.0693",
        "change_24h": "+10.2%",
        "change_4h": "+2.1%",
        "change_8h": "+4.3%"
      },
      {
        "coin": "ICP",
        "score": 100,
        "price": "2.565",
        "change_24h": "+7.5%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
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
