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
    "label": "今天 · 2026-06-30",
    "data": [
      {
        "coin": "CHZ",
        "score": 100,
        "price": "0.01889",
        "change_24h": "+9.6%",
        "change_4h": "+2.1%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "1000SATS",
        "score": 100,
        "price": "1.003e-05",
        "change_24h": "+7.6%",
        "change_4h": "+0.0%",
        "change_8h": "+0.0%"
      },
      {
        "coin": "BBX",
        "score": 100,
        "price": "12.47",
        "change_24h": "+6.1%",
        "change_4h": "+2.6%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "TSM",
        "score": 100,
        "price": "453.68",
        "change_24h": "+5.3%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "APE",
        "score": 100,
        "price": "0.1445",
        "change_24h": "+6.2%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "SOXL",
        "score": 100,
        "price": "237.54",
        "change_24h": "+11.7%",
        "change_4h": "+4.8%",
        "change_8h": "+9.5%"
      },
      {
        "coin": "XPL",
        "score": 100,
        "price": "0.10117",
        "change_24h": "+6.5%",
        "change_4h": "+0.1%",
        "change_8h": "+0.3%"
      },
      {
        "coin": "GWEI",
        "score": 100,
        "price": "0.1739",
        "change_24h": "+8.3%",
        "change_4h": "-5.8%",
        "change_8h": "-11.6%"
      },
      {
        "coin": "ZEC",
        "score": 100,
        "price": "401.54",
        "change_24h": "+7.4%",
        "change_4h": "+1.3%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "TSLA",
        "score": 100,
        "price": "408.8",
        "change_24h": "+7.4%",
        "change_4h": "+1.5%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "EDEN",
        "score": 100,
        "price": "0.04624",
        "change_24h": "+9.4%",
        "change_4h": "+1.3%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "LRCX",
        "score": 100,
        "price": "413.21",
        "change_24h": "+8.1%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "ON",
        "score": 100,
        "price": "0.08347",
        "change_24h": "+11.3%",
        "change_4h": "+0.2%",
        "change_8h": "+0.5%"
      },
      {
        "coin": "CHIP",
        "score": 100,
        "price": "0.03163",
        "change_24h": "+6.3%",
        "change_4h": "+0.9%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "SYRUP",
        "score": 100,
        "price": "0.14552",
        "change_24h": "+6.7%",
        "change_4h": "+1.3%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "TAG",
        "score": 100,
        "price": "0.000995",
        "change_24h": "+10.7%",
        "change_4h": "-0.6%",
        "change_8h": "-1.2%"
      },
      {
        "coin": "WDC",
        "score": 100,
        "price": "654.87",
        "change_24h": "+12.0%",
        "change_4h": "+2.6%",
        "change_8h": "+5.3%"
      },
      {
        "coin": "HYPE",
        "score": 100,
        "price": "66.193",
        "change_24h": "+7.8%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "MYX",
        "score": 100,
        "price": "0.1007",
        "change_24h": "+11.6%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "PENDLE",
        "score": 100,
        "price": "1.3459",
        "change_24h": "+7.9%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "GLW",
        "score": 100,
        "price": "256.14",
        "change_24h": "+10.9%",
        "change_4h": "+4.0%",
        "change_8h": "+7.9%"
      },
      {
        "coin": "MAGMA",
        "score": 100,
        "price": "0.45458",
        "change_24h": "+5.9%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "AAOI",
        "score": 100,
        "price": "148.98",
        "change_24h": "+10.2%",
        "change_4h": "+2.8%",
        "change_8h": "+5.6%"
      },
      {
        "coin": "KAS",
        "score": 100,
        "price": "0.03047",
        "change_24h": "+9.8%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "LIT",
        "score": 100,
        "price": "1.842",
        "change_24h": "+7.6%",
        "change_4h": "+2.0%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "AMAT",
        "score": 100,
        "price": "704.67",
        "change_24h": "+10.8%",
        "change_4h": "+2.5%",
        "change_8h": "+5.0%"
      },
      {
        "coin": "SIREN",
        "score": 100,
        "price": "0.03856",
        "change_24h": "+5.1%",
        "change_4h": "+1.9%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "ACT",
        "score": 100,
        "price": "0.01293",
        "change_24h": "+5.5%",
        "change_4h": "-0.1%",
        "change_8h": "-0.3%"
      },
      {
        "coin": "RAVE",
        "score": 100,
        "price": "0.3606",
        "change_24h": "+12.7%",
        "change_4h": "-7.9%",
        "change_8h": "-15.8%"
      },
      {
        "coin": "BCH",
        "score": 100,
        "price": "200.44",
        "change_24h": "+5.2%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "SPCX",
        "score": 100,
        "price": "162.61",
        "change_24h": "+5.3%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "RIF",
        "score": 100,
        "price": "0.0729",
        "change_24h": "+6.2%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "PIEVERSE",
        "score": 100,
        "price": "0.7638",
        "change_24h": "+8.1%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "HEI",
        "score": 100,
        "price": "0.14798",
        "change_24h": "+9.0%",
        "change_4h": "+0.7%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "SPX",
        "score": 100,
        "price": "0.3525",
        "change_24h": "+9.3%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "ZRO",
        "score": 100,
        "price": "0.8093",
        "change_24h": "+5.5%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "MET",
        "score": 100,
        "price": "0.1675",
        "change_24h": "+9.3%",
        "change_4h": "+0.9%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "MSTR",
        "score": 100,
        "price": "92.43",
        "change_24h": "+13.4%",
        "change_4h": "+2.8%",
        "change_8h": "+5.7%"
      },
      {
        "coin": "CAP",
        "score": 100,
        "price": "0.02731",
        "change_24h": "+13.5%",
        "change_4h": "+2.9%",
        "change_8h": "+5.8%"
      },
      {
        "coin": "NBIS",
        "score": 100,
        "price": "263.25",
        "change_24h": "+8.5%",
        "change_4h": "+2.5%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "PRL",
        "score": 100,
        "price": "0.1675",
        "change_24h": "+5.9%",
        "change_4h": "+0.6%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "USELESS",
        "score": 100,
        "price": "0.07953",
        "change_24h": "+11.5%",
        "change_4h": "+2.6%",
        "change_8h": "+5.3%"
      },
      {
        "coin": "AR",
        "score": 100,
        "price": "1.986",
        "change_24h": "+7.8%",
        "change_4h": "+1.0%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "BAN",
        "score": 95,
        "price": "0.07618",
        "change_24h": "+5.1%",
        "change_4h": "+1.3%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "PORTAL",
        "score": 95,
        "price": "0.01305",
        "change_24h": "+5.7%",
        "change_4h": "+0.5%",
        "change_8h": "+1.0%"
      },
      {
        "coin": "HMSTR",
        "score": 95,
        "price": "0.0001928",
        "change_24h": "+11.3%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "ONG",
        "score": 95,
        "price": "0.05108",
        "change_24h": "+10.8%",
        "change_4h": "+2.5%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "STXX",
        "score": 95,
        "price": "972.12",
        "change_24h": "+8.5%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "BE",
        "score": 95,
        "price": "275.47",
        "change_24h": "+5.3%",
        "change_4h": "+0.6%",
        "change_8h": "+1.2%"
      },
      {
        "coin": "ENSO",
        "score": 95,
        "price": "0.6314",
        "change_24h": "+5.7%",
        "change_4h": "-0.0%",
        "change_8h": "-0.1%"
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
