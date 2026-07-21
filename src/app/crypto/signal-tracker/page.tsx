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
    "label": "今天 · 2026-07-21",
    "data": [
      {
        "coin": "MVLL",
        "score": 100,
        "price": "23.62",
        "change_24h": "+10.7%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "CRCL",
        "score": 100,
        "price": "66.99",
        "change_24h": "+9.7%",
        "change_4h": "+2.6%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "DOOD",
        "score": 100,
        "price": "0.001519",
        "change_24h": "+5.3%",
        "change_4h": "+0.1%",
        "change_8h": "+0.1%"
      },
      {
        "coin": "KOMA",
        "score": 100,
        "price": "0.008275",
        "change_24h": "+12.0%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "SNDK",
        "score": 100,
        "price": "1435.19",
        "change_24h": "+5.7%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "ZAMA",
        "score": 100,
        "price": "0.03836",
        "change_24h": "+8.7%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "AIO",
        "score": 100,
        "price": "0.11785",
        "change_24h": "+5.9%",
        "change_4h": "+0.2%",
        "change_8h": "+0.3%"
      },
      {
        "coin": "TOWNS",
        "score": 100,
        "price": "0.002457",
        "change_24h": "+6.0%",
        "change_4h": "+0.5%",
        "change_8h": "+1.0%"
      },
      {
        "coin": "UB",
        "score": 100,
        "price": "0.10082",
        "change_24h": "+14.6%",
        "change_4h": "+3.0%",
        "change_8h": "+6.0%"
      },
      {
        "coin": "ARX",
        "score": 100,
        "price": "0.156",
        "change_24h": "+7.1%",
        "change_4h": "+1.3%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "BLUAI",
        "score": 100,
        "price": "0.0129",
        "change_24h": "+7.6%",
        "change_4h": "+0.2%",
        "change_8h": "+0.3%"
      },
      {
        "coin": "USELESS",
        "score": 100,
        "price": "0.06332",
        "change_24h": "+7.5%",
        "change_4h": "+2.7%",
        "change_8h": "+5.4%"
      },
      {
        "coin": "BLESS",
        "score": 100,
        "price": "0.009974",
        "change_24h": "+8.8%",
        "change_4h": "+3.6%",
        "change_8h": "+7.2%"
      },
      {
        "coin": "PROM",
        "score": 100,
        "price": "1.794",
        "change_24h": "+8.1%",
        "change_4h": "-6.6%",
        "change_8h": "-13.3%"
      },
      {
        "coin": "ACE",
        "score": 100,
        "price": "0.10854",
        "change_24h": "+11.1%",
        "change_4h": "-5.1%",
        "change_8h": "-10.2%"
      },
      {
        "coin": "PTB",
        "score": 100,
        "price": "0.0006312",
        "change_24h": "+10.9%",
        "change_4h": "+0.7%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "MUU",
        "score": 100,
        "price": "29.82",
        "change_24h": "+6.9%",
        "change_4h": "+1.7%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "MET",
        "score": 100,
        "price": "0.1697",
        "change_24h": "+11.9%",
        "change_4h": "+2.5%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "LITE",
        "score": 100,
        "price": "782.15",
        "change_24h": "+7.5%",
        "change_4h": "+1.3%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "VIRTUAL",
        "score": 100,
        "price": "0.6479",
        "change_24h": "+5.6%",
        "change_4h": "+1.7%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "SNXX",
        "score": 100,
        "price": "14.78",
        "change_24h": "+11.7%",
        "change_4h": "+2.7%",
        "change_8h": "+5.4%"
      },
      {
        "coin": "SAGA",
        "score": 100,
        "price": "0.01304",
        "change_24h": "+7.3%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "MRVL",
        "score": 100,
        "price": "197.82",
        "change_24h": "+5.2%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "NBIS",
        "score": 100,
        "price": "191.66",
        "change_24h": "+7.0%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "EVAA",
        "score": 100,
        "price": "0.873",
        "change_24h": "+9.5%",
        "change_4h": "-2.6%",
        "change_8h": "-5.2%"
      },
      {
        "coin": "MON",
        "score": 100,
        "price": "0.0234",
        "change_24h": "+10.2%",
        "change_4h": "+2.5%",
        "change_8h": "+4.9%"
      },
      {
        "coin": "LDO",
        "score": 100,
        "price": "0.3965",
        "change_24h": "+11.8%",
        "change_4h": "+3.1%",
        "change_8h": "+6.2%"
      },
      {
        "coin": "AXTI",
        "score": 95,
        "price": "49.78",
        "change_24h": "+8.7%",
        "change_4h": "+1.9%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "ACT",
        "score": 95,
        "price": "0.00875",
        "change_24h": "+7.0%",
        "change_4h": "-0.2%",
        "change_8h": "-0.3%"
      },
      {
        "coin": "PIEVERSE",
        "score": 95,
        "price": "0.682",
        "change_24h": "+8.0%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "AZTEC",
        "score": 95,
        "price": "0.01446",
        "change_24h": "+5.1%",
        "change_4h": "+2.0%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "AIOT",
        "score": 95,
        "price": "0.04628",
        "change_24h": "+7.2%",
        "change_4h": "+0.6%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "CRDO",
        "score": 95,
        "price": "216.87",
        "change_24h": "+7.0%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "AIN",
        "score": 95,
        "price": "0.083",
        "change_24h": "+10.8%",
        "change_4h": "+2.3%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "PROMPT",
        "score": 95,
        "price": "0.02044",
        "change_24h": "+6.2%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "TUT",
        "score": 95,
        "price": "0.01475",
        "change_24h": "+11.2%",
        "change_4h": "+3.3%",
        "change_8h": "+6.6%"
      },
      {
        "coin": "COAI",
        "score": 95,
        "price": "0.3325",
        "change_24h": "+8.5%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "TURTLE",
        "score": 95,
        "price": "0.03589",
        "change_24h": "+5.8%",
        "change_4h": "-1.5%",
        "change_8h": "-3.0%"
      },
      {
        "coin": "ENSO",
        "score": 95,
        "price": "0.754",
        "change_24h": "+7.6%",
        "change_4h": "+2.1%",
        "change_8h": "+4.3%"
      },
      {
        "coin": "MYX",
        "score": 95,
        "price": "0.08091",
        "change_24h": "+7.3%",
        "change_4h": "+1.7%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "FHE",
        "score": 95,
        "price": "0.02044",
        "change_24h": "+9.8%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "INTW",
        "score": 95,
        "price": "24.17",
        "change_24h": "+8.0%",
        "change_4h": "+1.2%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "TREE",
        "score": 95,
        "price": "0.0375",
        "change_24h": "+6.3%",
        "change_4h": "+1.6%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "S",
        "score": 95,
        "price": "0.0253",
        "change_24h": "+5.6%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "JST",
        "score": 90,
        "price": "0.10197",
        "change_24h": "+5.2%",
        "change_4h": "+1.5%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "SYRUP",
        "score": 90,
        "price": "0.18936",
        "change_24h": "+5.5%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "BIRB",
        "score": 90,
        "price": "0.05631",
        "change_24h": "+5.0%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "IRYS",
        "score": 90,
        "price": "0.01307",
        "change_24h": "+5.7%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "MINA",
        "score": 90,
        "price": "0.04665",
        "change_24h": "+7.1%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "BANK",
        "score": 85,
        "price": "0.28942",
        "change_24h": "+25.7%",
        "change_4h": "+5.1%",
        "change_8h": "+10.2%"
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
