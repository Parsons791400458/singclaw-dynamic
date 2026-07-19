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
    "label": "今天 · 2026-07-19",
    "data": [
      {
        "coin": "ALLO",
        "score": 100,
        "price": "0.45282",
        "change_24h": "+14.2%",
        "change_4h": "+3.1%",
        "change_8h": "+6.1%"
      },
      {
        "coin": "TRUTH",
        "score": 100,
        "price": "0.012787",
        "change_24h": "+7.0%",
        "change_4h": "+1.2%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "O",
        "score": 100,
        "price": "0.582",
        "change_24h": "+8.5%",
        "change_4h": "+1.3%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "LAB",
        "score": 100,
        "price": "0.19",
        "change_24h": "+5.3%",
        "change_4h": "+0.7%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "BILL",
        "score": 100,
        "price": "0.02637",
        "change_24h": "+12.4%",
        "change_4h": "+4.7%",
        "change_8h": "+9.5%"
      },
      {
        "coin": "PHA",
        "score": 100,
        "price": "0.02423",
        "change_24h": "+10.8%",
        "change_4h": "-0.2%",
        "change_8h": "-0.4%"
      },
      {
        "coin": "MET",
        "score": 100,
        "price": "0.137",
        "change_24h": "+6.4%",
        "change_4h": "+0.7%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "TAC",
        "score": 100,
        "price": "0.003501",
        "change_24h": "+8.9%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "AVAAI",
        "score": 100,
        "price": "0.008437",
        "change_24h": "+13.0%",
        "change_4h": "+0.2%",
        "change_8h": "+0.4%"
      },
      {
        "coin": "ALCH",
        "score": 95,
        "price": "0.02748",
        "change_24h": "+6.3%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "STRK",
        "score": 95,
        "price": "0.02958",
        "change_24h": "+6.9%",
        "change_4h": "+2.1%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "COLLECT",
        "score": 95,
        "price": "0.04798",
        "change_24h": "+12.1%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "ON",
        "score": 95,
        "price": "0.10159",
        "change_24h": "+8.9%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "BTR",
        "score": 95,
        "price": "0.01728",
        "change_24h": "+5.5%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "SPORTFUN",
        "score": 95,
        "price": "0.02184",
        "change_24h": "+7.1%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "AWE",
        "score": 95,
        "price": "0.05966",
        "change_24h": "+7.5%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "MYX",
        "score": 95,
        "price": "0.07989",
        "change_24h": "+5.9%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "WOO",
        "score": 95,
        "price": "0.01284",
        "change_24h": "+9.1%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "SWARMS",
        "score": 95,
        "price": "0.00673",
        "change_24h": "+8.9%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "JASMY",
        "score": 95,
        "price": "0.004804",
        "change_24h": "+5.6%",
        "change_4h": "+1.1%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "GUA",
        "score": 95,
        "price": "0.05668",
        "change_24h": "+7.8%",
        "change_4h": "+0.4%",
        "change_8h": "+0.9%"
      },
      {
        "coin": "AIOT",
        "score": 95,
        "price": "0.04536",
        "change_24h": "+9.5%",
        "change_4h": "+2.6%",
        "change_8h": "+5.3%"
      },
      {
        "coin": "CTR",
        "score": 90,
        "price": "0.00828",
        "change_24h": "+5.6%",
        "change_4h": "-0.4%",
        "change_8h": "-0.9%"
      },
      {
        "coin": "SQD",
        "score": 90,
        "price": "0.03115",
        "change_24h": "+6.2%",
        "change_4h": "+1.7%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "AIO",
        "score": 90,
        "price": "0.10619",
        "change_24h": "+6.4%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "MAGMA",
        "score": 90,
        "price": "0.30319",
        "change_24h": "+8.2%",
        "change_4h": "+1.9%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "GMX",
        "score": 90,
        "price": "6.453",
        "change_24h": "+5.8%",
        "change_4h": "+1.2%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "ESPORTS",
        "score": 85,
        "price": "0.04452",
        "change_24h": "+28.4%",
        "change_4h": "+19.6%",
        "change_8h": "+39.2%"
      },
      {
        "coin": "1000XEC",
        "score": 85,
        "price": "0.009365",
        "change_24h": "+19.4%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "TRADOOR",
        "score": 80,
        "price": "0.5653",
        "change_24h": "+25.3%",
        "change_4h": "+4.3%",
        "change_8h": "+8.6%"
      },
      {
        "coin": "TLM",
        "score": 75,
        "price": "0.001639",
        "change_24h": "+19.0%",
        "change_4h": "+3.7%",
        "change_8h": "+7.4%"
      },
      {
        "coin": "ZBT",
        "score": 75,
        "price": "0.10528",
        "change_24h": "+17.9%",
        "change_4h": "+6.2%",
        "change_8h": "+12.3%"
      },
      {
        "coin": "ARIA",
        "score": 70,
        "price": "0.0263",
        "change_24h": "+16.4%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "BULLA",
        "score": 70,
        "price": "0.009986",
        "change_24h": "+15.9%",
        "change_4h": "+4.6%",
        "change_8h": "+9.1%"
      },
      {
        "coin": "B",
        "score": 70,
        "price": "0.1671",
        "change_24h": "+45.6%",
        "change_4h": "+5.8%",
        "change_8h": "+11.6%"
      },
      {
        "coin": "AKE",
        "score": 70,
        "price": "0.0020572",
        "change_24h": "+43.9%",
        "change_4h": "+7.2%",
        "change_8h": "+14.5%"
      },
      {
        "coin": "US",
        "score": 55,
        "price": "0.04923",
        "change_24h": "+1.5%",
        "change_4h": "+2.7%",
        "change_8h": "+5.3%"
      },
      {
        "coin": "ZEC",
        "score": 55,
        "price": "556.51",
        "change_24h": "+1.6%",
        "change_4h": "+0.7%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "XAU",
        "score": 50,
        "price": "4022.04",
        "change_24h": "+0.1%",
        "change_4h": "+0.0%",
        "change_8h": "+0.0%"
      },
      {
        "coin": "KITE",
        "score": 50,
        "price": "0.11378",
        "change_24h": "+0.2%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "HYPE",
        "score": 50,
        "price": "60.546",
        "change_24h": "+1.2%",
        "change_4h": "+1.0%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "BNB",
        "score": 50,
        "price": "570.86",
        "change_24h": "+0.6%",
        "change_4h": "+0.1%",
        "change_8h": "+0.2%"
      },
      {
        "coin": "ETH",
        "score": 50,
        "price": "1860.43",
        "change_24h": "+1.0%",
        "change_4h": "+0.2%",
        "change_8h": "+0.5%"
      },
      {
        "coin": "SOL",
        "score": 50,
        "price": "75.56",
        "change_24h": "+0.5%",
        "change_4h": "+0.3%",
        "change_8h": "+0.7%"
      },
      {
        "coin": "LTC",
        "score": 50,
        "price": "46.94",
        "change_24h": "+3.9%",
        "change_4h": "+0.5%",
        "change_8h": "+0.9%"
      },
      {
        "coin": "TRUMP",
        "score": 50,
        "price": "1.632",
        "change_24h": "+4.1%",
        "change_4h": "-0.1%",
        "change_8h": "-0.2%"
      },
      {
        "coin": "CL",
        "score": 50,
        "price": "83.66",
        "change_24h": "+2.1%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "BTC",
        "score": 50,
        "price": "64754.1",
        "change_24h": "+1.2%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "XRP",
        "score": 50,
        "price": "1.0935",
        "change_24h": "+0.4%",
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
