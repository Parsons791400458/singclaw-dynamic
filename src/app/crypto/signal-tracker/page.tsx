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
    "label": "今天 · 2026-07-27",
    "data": [
      {
        "coin": "BEAT",
        "score": 100,
        "price": "3.561",
        "change_24h": "+5.5%",
        "change_4h": "+0.1%",
        "change_8h": "+0.2%"
      },
      {
        "coin": "MERL",
        "score": 100,
        "price": "0.01934",
        "change_24h": "+10.7%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "ORDI",
        "score": 100,
        "price": "3.84",
        "change_24h": "+5.0%",
        "change_4h": "-0.5%",
        "change_8h": "-1.0%"
      },
      {
        "coin": "PUMP",
        "score": 100,
        "price": "0.002013",
        "change_24h": "+12.6%",
        "change_4h": "+2.6%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "ONDO",
        "score": 100,
        "price": "0.406",
        "change_24h": "+6.1%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "1000SHIB",
        "score": 100,
        "price": "0.005257",
        "change_24h": "+6.2%",
        "change_4h": "-1.1%",
        "change_8h": "-2.3%"
      },
      {
        "coin": "NIL",
        "score": 100,
        "price": "0.03949",
        "change_24h": "+13.2%",
        "change_4h": "+2.9%",
        "change_8h": "+5.8%"
      },
      {
        "coin": "1000PEPE",
        "score": 100,
        "price": "0.0029533",
        "change_24h": "+7.5%",
        "change_4h": "+1.0%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "KAITO",
        "score": 100,
        "price": "1.1739",
        "change_24h": "+14.4%",
        "change_4h": "+2.8%",
        "change_8h": "+5.6%"
      },
      {
        "coin": "PIEVERSE",
        "score": 100,
        "price": "0.7118",
        "change_24h": "+10.7%",
        "change_4h": "-6.5%",
        "change_8h": "-13.1%"
      },
      {
        "coin": "AAVE",
        "score": 100,
        "price": "100.45",
        "change_24h": "+9.0%",
        "change_4h": "+1.9%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "LA",
        "score": 100,
        "price": "0.0763",
        "change_24h": "+11.2%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "LQTY",
        "score": 95,
        "price": "0.1999",
        "change_24h": "+10.0%",
        "change_4h": "+2.6%",
        "change_8h": "+5.2%"
      },
      {
        "coin": "ENS",
        "score": 95,
        "price": "4.606",
        "change_24h": "+6.4%",
        "change_4h": "+1.2%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "STX",
        "score": 95,
        "price": "0.1447",
        "change_24h": "+6.6%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "MET",
        "score": 95,
        "price": "0.1755",
        "change_24h": "+9.1%",
        "change_4h": "+1.9%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "IRYS",
        "score": 95,
        "price": "0.01391",
        "change_24h": "+5.9%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "HOLO",
        "score": 95,
        "price": "0.0737",
        "change_24h": "+9.6%",
        "change_4h": "+2.5%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "MANTRA",
        "score": 90,
        "price": "0.00647",
        "change_24h": "+5.6%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
      },
      {
        "coin": "SPK",
        "score": 90,
        "price": "0.01765",
        "change_24h": "+5.6%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "SXT",
        "score": 90,
        "price": "0.00696",
        "change_24h": "+5.5%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "AGT",
        "score": 90,
        "price": "0.015626",
        "change_24h": "+6.3%",
        "change_4h": "-0.2%",
        "change_8h": "-0.3%"
      },
      {
        "coin": "CFG",
        "score": 90,
        "price": "0.1823",
        "change_24h": "+6.2%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "DIA",
        "score": 85,
        "price": "0.1386",
        "change_24h": "+20.6%",
        "change_4h": "+1.4%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "SOON",
        "score": 75,
        "price": "0.2004",
        "change_24h": "+19.1%",
        "change_4h": "+3.4%",
        "change_8h": "+6.9%"
      },
      {
        "coin": "SAFE",
        "score": 75,
        "price": "0.1062",
        "change_24h": "+28.3%",
        "change_4h": "+6.0%",
        "change_8h": "+12.1%"
      },
      {
        "coin": "4",
        "score": 75,
        "price": "0.009803",
        "change_24h": "+17.2%",
        "change_4h": "+0.5%",
        "change_8h": "+1.0%"
      },
      {
        "coin": "UB",
        "score": 75,
        "price": "0.14783",
        "change_24h": "+19.6%",
        "change_4h": "+2.6%",
        "change_8h": "+5.3%"
      },
      {
        "coin": "CROSS",
        "score": 75,
        "price": "0.09648",
        "change_24h": "+25.3%",
        "change_4h": "+3.4%",
        "change_8h": "+6.9%"
      },
      {
        "coin": "BOME",
        "score": 70,
        "price": "0.0005394",
        "change_24h": "+15.7%",
        "change_4h": "+3.1%",
        "change_8h": "+6.2%"
      },
      {
        "coin": "B",
        "score": 70,
        "price": "0.1833",
        "change_24h": "+15.1%",
        "change_4h": "+4.1%",
        "change_8h": "+8.1%"
      },
      {
        "coin": "PEOPLE",
        "score": 65,
        "price": "0.006627",
        "change_24h": "+17.9%",
        "change_4h": "+4.2%",
        "change_8h": "+8.3%"
      },
      {
        "coin": "EPIC",
        "score": 60,
        "price": "0.7093",
        "change_24h": "+1.5%",
        "change_4h": "+3.6%",
        "change_8h": "+7.3%"
      },
      {
        "coin": "WLD",
        "score": 55,
        "price": "0.3523",
        "change_24h": "+2.7%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "ZEC",
        "score": 55,
        "price": "503.28",
        "change_24h": "+3.5%",
        "change_4h": "+0.6%",
        "change_8h": "+1.2%"
      },
      {
        "coin": "XAG",
        "score": 50,
        "price": "59.65",
        "change_24h": "+2.0%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "SPCX",
        "score": 50,
        "price": "113.22",
        "change_24h": "+1.1%",
        "change_4h": "+0.3%",
        "change_8h": "+0.7%"
      },
      {
        "coin": "AKE",
        "score": 50,
        "price": "0.0031097",
        "change_24h": "-3.5%",
        "change_4h": "-0.5%",
        "change_8h": "-1.1%"
      },
      {
        "coin": "XAU",
        "score": 50,
        "price": "4103.18",
        "change_24h": "+1.0%",
        "change_4h": "+0.1%",
        "change_8h": "+0.3%"
      },
      {
        "coin": "SOL",
        "score": 50,
        "price": "76.2",
        "change_24h": "+2.1%",
        "change_4h": "+0.2%",
        "change_8h": "+0.4%"
      },
      {
        "coin": "DEXE",
        "score": 50,
        "price": "3.497",
        "change_24h": "-11.0%",
        "change_4h": "-0.4%",
        "change_8h": "-0.9%"
      },
      {
        "coin": "ETH",
        "score": 50,
        "price": "1940.59",
        "change_24h": "+3.3%",
        "change_4h": "+0.5%",
        "change_8h": "+1.0%"
      },
      {
        "coin": "LINK",
        "score": 50,
        "price": "8.771",
        "change_24h": "+4.5%",
        "change_4h": "+0.9%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "ENA",
        "score": 50,
        "price": "0.08931",
        "change_24h": "+3.8%",
        "change_4h": "+1.0%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "UNI",
        "score": 50,
        "price": "3.854",
        "change_24h": "+4.9%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
      },
      {
        "coin": "HYPE",
        "score": 50,
        "price": "59.433",
        "change_24h": "+1.8%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "BTC",
        "score": 50,
        "price": "64993.2",
        "change_24h": "+0.9%",
        "change_4h": "+0.1%",
        "change_8h": "+0.1%"
      },
      {
        "coin": "CAP",
        "score": 50,
        "price": "0.02208",
        "change_24h": "+4.8%",
        "change_4h": "+1.8%",
        "change_8h": "+3.5%"
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
