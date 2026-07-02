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
    "label": "今天 · 2026-07-02",
    "data": [
      {
        "coin": "PLTR",
        "score": 100,
        "price": "125.55",
        "change_24h": "+7.1%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "IOTA",
        "score": 100,
        "price": "0.03824",
        "change_24h": "+10.0%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "META",
        "score": 100,
        "price": "606.96",
        "change_24h": "+7.7%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "SYRUP",
        "score": 100,
        "price": "0.1529",
        "change_24h": "+11.1%",
        "change_4h": "+2.6%",
        "change_8h": "+5.2%"
      },
      {
        "coin": "MON",
        "score": 100,
        "price": "0.02021",
        "change_24h": "+10.1%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "VVV",
        "score": 100,
        "price": "12.848",
        "change_24h": "+5.3%",
        "change_4h": "-2.9%",
        "change_8h": "-5.8%"
      },
      {
        "coin": "US",
        "score": 100,
        "price": "0.012762",
        "change_24h": "+12.7%",
        "change_4h": "+3.9%",
        "change_8h": "+7.8%"
      },
      {
        "coin": "ONDO",
        "score": 100,
        "price": "0.3311",
        "change_24h": "+7.8%",
        "change_4h": "+1.8%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "MET",
        "score": 100,
        "price": "0.1818",
        "change_24h": "+12.2%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "SUI",
        "score": 100,
        "price": "0.7227",
        "change_24h": "+5.3%",
        "change_4h": "+1.1%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "BSV",
        "score": 100,
        "price": "14.0",
        "change_24h": "+7.0%",
        "change_4h": "+0.8%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "JTO",
        "score": 100,
        "price": "0.7773",
        "change_24h": "+7.1%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "BCH",
        "score": 100,
        "price": "215.15",
        "change_24h": "+8.1%",
        "change_4h": "+1.5%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "APT",
        "score": 100,
        "price": "0.5982",
        "change_24h": "+5.2%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "SAGA",
        "score": 100,
        "price": "0.01313",
        "change_24h": "+6.6%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "HOOD",
        "score": 100,
        "price": "108.58",
        "change_24h": "+8.5%",
        "change_4h": "+2.0%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "TURBO",
        "score": 100,
        "price": "0.000849",
        "change_24h": "+7.7%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "BTW",
        "score": 100,
        "price": "0.06596",
        "change_24h": "+11.2%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "ADA",
        "score": 100,
        "price": "0.1545",
        "change_24h": "+7.4%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "EVAA",
        "score": 100,
        "price": "0.9249",
        "change_24h": "+8.2%",
        "change_4h": "+4.8%",
        "change_8h": "+9.5%"
      },
      {
        "coin": "FET",
        "score": 100,
        "price": "0.1805",
        "change_24h": "+5.8%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "NEAR",
        "score": 100,
        "price": "1.9",
        "change_24h": "+7.0%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "ALICE",
        "score": 100,
        "price": "0.1227",
        "change_24h": "+8.3%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "KAITO",
        "score": 100,
        "price": "0.6334",
        "change_24h": "+11.7%",
        "change_4h": "+2.6%",
        "change_8h": "+5.3%"
      },
      {
        "coin": "PENDLE",
        "score": 100,
        "price": "1.4628",
        "change_24h": "+12.0%",
        "change_4h": "+2.9%",
        "change_8h": "+5.8%"
      },
      {
        "coin": "ICNT",
        "score": 100,
        "price": "0.1959",
        "change_24h": "+8.3%",
        "change_4h": "+0.7%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "JUP",
        "score": 100,
        "price": "0.2357",
        "change_24h": "+12.8%",
        "change_4h": "+2.5%",
        "change_8h": "+4.9%"
      },
      {
        "coin": "FIDA",
        "score": 100,
        "price": "0.0222",
        "change_24h": "+10.4%",
        "change_4h": "+1.9%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "RESOLV",
        "score": 100,
        "price": "0.02127",
        "change_24h": "+13.4%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "EPIC",
        "score": 100,
        "price": "0.4599",
        "change_24h": "+7.6%",
        "change_4h": "-1.2%",
        "change_8h": "-2.3%"
      },
      {
        "coin": "SHELL",
        "score": 100,
        "price": "0.02317",
        "change_24h": "+12.0%",
        "change_4h": "+0.7%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "CRV",
        "score": 100,
        "price": "0.2063",
        "change_24h": "+11.7%",
        "change_4h": "+2.5%",
        "change_8h": "+5.0%"
      },
      {
        "coin": "MORPHO",
        "score": 100,
        "price": "2.1342",
        "change_24h": "+12.3%",
        "change_4h": "+2.5%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "ZEC",
        "score": 100,
        "price": "415.22",
        "change_24h": "+5.2%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "SOL",
        "score": 100,
        "price": "78.16",
        "change_24h": "+6.6%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "TA",
        "score": 100,
        "price": "0.08095",
        "change_24h": "+10.6%",
        "change_4h": "+0.5%",
        "change_8h": "+1.0%"
      },
      {
        "coin": "MSTR",
        "score": 100,
        "price": "95.43",
        "change_24h": "+11.2%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "COIN",
        "score": 100,
        "price": "160.51",
        "change_24h": "+10.9%",
        "change_4h": "+1.9%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "LIT",
        "score": 100,
        "price": "2.0196",
        "change_24h": "+9.2%",
        "change_4h": "+1.6%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "PYTH",
        "score": 100,
        "price": "0.03938",
        "change_24h": "+5.4%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
      },
      {
        "coin": "YFI",
        "score": 95,
        "price": "1756.0",
        "change_24h": "+9.5%",
        "change_4h": "+1.9%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "RONIN",
        "score": 95,
        "price": "0.05937",
        "change_24h": "+9.9%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "GTC",
        "score": 95,
        "price": "0.07333",
        "change_24h": "+12.4%",
        "change_4h": "+1.8%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "SOLV",
        "score": 95,
        "price": "0.002998",
        "change_24h": "+9.1%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "GUN",
        "score": 95,
        "price": "0.004521",
        "change_24h": "+13.5%",
        "change_4h": "+3.0%",
        "change_8h": "+6.0%"
      },
      {
        "coin": "ZKC",
        "score": 95,
        "price": "0.04385",
        "change_24h": "+5.6%",
        "change_4h": "+0.4%",
        "change_8h": "+0.7%"
      },
      {
        "coin": "GMX",
        "score": 95,
        "price": "5.657",
        "change_24h": "+7.0%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "SLP",
        "score": 95,
        "price": "0.0004865",
        "change_24h": "+8.7%",
        "change_4h": "-6.4%",
        "change_8h": "-12.8%"
      },
      {
        "coin": "SANTOS",
        "score": 95,
        "price": "0.5722",
        "change_24h": "+8.3%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "CTSI",
        "score": 95,
        "price": "0.02295",
        "change_24h": "+7.2%",
        "change_4h": "+0.1%",
        "change_8h": "+0.2%"
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
