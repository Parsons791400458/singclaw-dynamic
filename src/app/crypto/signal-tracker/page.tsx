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
    "label": "今天 · 2026-08-16",
    "data": [
      {
        "coin": "PIXEL",
        "score": 100,
        "price": "0.004928",
        "change_24h": "+7.8%",
        "change_4h": "+1.8%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "US",
        "score": 100,
        "price": "0.018125",
        "change_24h": "+10.6%",
        "change_4h": "+3.5%",
        "change_8h": "+7.0%"
      },
      {
        "coin": "STAR",
        "score": 100,
        "price": "0.09169",
        "change_24h": "+13.1%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "NOM",
        "score": 100,
        "price": "0.00165",
        "change_24h": "+6.7%",
        "change_4h": "+0.5%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "NXPC",
        "score": 100,
        "price": "0.1957",
        "change_24h": "+7.2%",
        "change_4h": "+0.4%",
        "change_8h": "+0.7%"
      },
      {
        "coin": "ONG",
        "score": 100,
        "price": "0.0498",
        "change_24h": "+11.4%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "AKE",
        "score": 100,
        "price": "0.010484",
        "change_24h": "+5.4%",
        "change_4h": "+0.3%",
        "change_8h": "+0.5%"
      },
      {
        "coin": "HUMA",
        "score": 100,
        "price": "0.020486",
        "change_24h": "+7.2%",
        "change_4h": "+0.1%",
        "change_8h": "+0.3%"
      },
      {
        "coin": "ENSO",
        "score": 100,
        "price": "0.8327",
        "change_24h": "+13.4%",
        "change_4h": "+0.8%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "ANTHROPIC",
        "score": 100,
        "price": "1798.43",
        "change_24h": "+8.1%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "TUT",
        "score": 100,
        "price": "0.03203",
        "change_24h": "+9.2%",
        "change_4h": "-2.8%",
        "change_8h": "-5.6%"
      },
      {
        "coin": "BULLA",
        "score": 100,
        "price": "0.017887",
        "change_24h": "+12.4%",
        "change_4h": "-1.3%",
        "change_8h": "-2.7%"
      },
      {
        "coin": "ON",
        "score": 100,
        "price": "0.382",
        "change_24h": "+5.7%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "BASED",
        "score": 100,
        "price": "0.082",
        "change_24h": "+9.2%",
        "change_4h": "+1.9%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "WAL",
        "score": 100,
        "price": "0.02318",
        "change_24h": "+11.7%",
        "change_4h": "-3.2%",
        "change_8h": "-6.4%"
      },
      {
        "coin": "AIO",
        "score": 100,
        "price": "0.05888",
        "change_24h": "+8.8%",
        "change_4h": "+3.9%",
        "change_8h": "+7.8%"
      },
      {
        "coin": "SOPH",
        "score": 95,
        "price": "0.003654",
        "change_24h": "+5.6%",
        "change_4h": "+0.5%",
        "change_8h": "+1.0%"
      },
      {
        "coin": "BANANA",
        "score": 95,
        "price": "3.933",
        "change_24h": "+5.4%",
        "change_4h": "-0.4%",
        "change_8h": "-0.9%"
      },
      {
        "coin": "PIEVERSE",
        "score": 95,
        "price": "0.8469",
        "change_24h": "+6.0%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "FHE",
        "score": 95,
        "price": "0.02649",
        "change_24h": "+9.1%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "OPN",
        "score": 95,
        "price": "0.05105",
        "change_24h": "+6.7%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "TAKE",
        "score": 95,
        "price": "0.04454",
        "change_24h": "+5.3%",
        "change_4h": "-1.6%",
        "change_8h": "-3.2%"
      },
      {
        "coin": "Q",
        "score": 95,
        "price": "0.023638",
        "change_24h": "+5.7%",
        "change_4h": "+1.7%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "CELR",
        "score": 95,
        "price": "0.002116",
        "change_24h": "+6.5%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "BERA",
        "score": 95,
        "price": "0.1508",
        "change_24h": "+6.1%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "TAC",
        "score": 90,
        "price": "0.002774",
        "change_24h": "+5.2%",
        "change_4h": "-0.3%",
        "change_8h": "-0.7%"
      },
      {
        "coin": "AIGENSYN",
        "score": 90,
        "price": "0.0215",
        "change_24h": "+6.6%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "SOMI",
        "score": 90,
        "price": "0.0946",
        "change_24h": "+5.1%",
        "change_4h": "+0.2%",
        "change_8h": "+0.4%"
      },
      {
        "coin": "CETUS",
        "score": 90,
        "price": "0.02139",
        "change_24h": "+6.2%",
        "change_4h": "+1.3%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "RONIN",
        "score": 90,
        "price": "0.04944",
        "change_24h": "+5.4%",
        "change_4h": "+1.0%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "COW",
        "score": 80,
        "price": "0.125",
        "change_24h": "+22.4%",
        "change_4h": "-3.1%",
        "change_8h": "-6.3%"
      },
      {
        "coin": "SPORTFUN",
        "score": 75,
        "price": "0.02595",
        "change_24h": "+23.6%",
        "change_4h": "-4.4%",
        "change_8h": "-8.7%"
      },
      {
        "coin": "CHIP",
        "score": 75,
        "price": "0.02791",
        "change_24h": "+19.3%",
        "change_4h": "+3.2%",
        "change_8h": "+6.4%"
      },
      {
        "coin": "XNY",
        "score": 70,
        "price": "0.008715",
        "change_24h": "+20.9%",
        "change_4h": "+4.5%",
        "change_8h": "+8.9%"
      },
      {
        "coin": "HEMI",
        "score": 70,
        "price": "0.006299",
        "change_24h": "+30.9%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "H",
        "score": 65,
        "price": "0.15657",
        "change_24h": "+31.7%",
        "change_4h": "+7.3%",
        "change_8h": "+14.6%"
      },
      {
        "coin": "BTW",
        "score": 55,
        "price": "0.30589",
        "change_24h": "+2.2%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "NIL",
        "score": 55,
        "price": "0.04695",
        "change_24h": "+4.5%",
        "change_4h": "-1.7%",
        "change_8h": "-3.4%"
      },
      {
        "coin": "PRL",
        "score": 55,
        "price": "0.3774",
        "change_24h": "+3.1%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "LINK",
        "score": 55,
        "price": "9.46",
        "change_24h": "+3.1%",
        "change_4h": "+0.0%",
        "change_8h": "+0.0%"
      },
      {
        "coin": "DOLO",
        "score": 50,
        "price": "0.02304",
        "change_24h": "+1.5%",
        "change_4h": "+0.6%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "XMR",
        "score": 50,
        "price": "411.69",
        "change_24h": "+2.3%",
        "change_4h": "+0.6%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "HYPE",
        "score": 50,
        "price": "57.029",
        "change_24h": "+1.0%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "BOME",
        "score": 50,
        "price": "0.0008426",
        "change_24h": "+3.6%",
        "change_4h": "-0.7%",
        "change_8h": "-1.4%"
      },
      {
        "coin": "XAU",
        "score": 50,
        "price": "4387.94",
        "change_24h": "+0.1%",
        "change_4h": "+0.0%",
        "change_8h": "+0.0%"
      },
      {
        "coin": "SNDK",
        "score": 50,
        "price": "1654.31",
        "change_24h": "+0.3%",
        "change_4h": "+0.2%",
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
