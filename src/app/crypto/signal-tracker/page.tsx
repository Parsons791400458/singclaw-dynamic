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
    "label": "今天 · 2026-08-30",
    "data": [
      {
        "coin": "GIGGLE",
        "score": 100,
        "price": "40.2",
        "change_24h": "+8.5%",
        "change_4h": "-0.7%",
        "change_8h": "-1.4%"
      },
      {
        "coin": "OPG",
        "score": 100,
        "price": "0.1009",
        "change_24h": "+12.4%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "ZKC",
        "score": 100,
        "price": "0.04152",
        "change_24h": "+5.6%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
      },
      {
        "coin": "TST",
        "score": 100,
        "price": "0.01795",
        "change_24h": "+5.9%",
        "change_4h": "+0.4%",
        "change_8h": "+0.9%"
      },
      {
        "coin": "MOVR",
        "score": 100,
        "price": "0.8247",
        "change_24h": "+6.6%",
        "change_4h": "+1.2%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "DASH",
        "score": 100,
        "price": "41.19",
        "change_24h": "+6.3%",
        "change_4h": "+0.9%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "BEAT",
        "score": 100,
        "price": "0.1373",
        "change_24h": "+5.2%",
        "change_4h": "-2.6%",
        "change_8h": "-5.1%"
      },
      {
        "coin": "ESPORTS",
        "score": 100,
        "price": "0.01602",
        "change_24h": "+10.4%",
        "change_4h": "+2.4%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "CLO",
        "score": 100,
        "price": "0.1214",
        "change_24h": "+14.2%",
        "change_4h": "+1.7%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "TWT",
        "score": 100,
        "price": "0.4773",
        "change_24h": "+7.2%",
        "change_4h": "+0.2%",
        "change_8h": "+0.5%"
      },
      {
        "coin": "BTW",
        "score": 100,
        "price": "0.45123",
        "change_24h": "+11.8%",
        "change_4h": "+1.8%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "PUMP",
        "score": 100,
        "price": "0.004958",
        "change_24h": "+6.7%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "BROCCOLI714",
        "score": 100,
        "price": "0.01865",
        "change_24h": "+10.2%",
        "change_4h": "-0.6%",
        "change_8h": "-1.2%"
      },
      {
        "coin": "PIEVERSE",
        "score": 100,
        "price": "1.0926",
        "change_24h": "+7.2%",
        "change_4h": "+0.3%",
        "change_8h": "+0.7%"
      },
      {
        "coin": "USELESS",
        "score": 100,
        "price": "0.06442",
        "change_24h": "+7.6%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "KOMA",
        "score": 100,
        "price": "0.014488",
        "change_24h": "+8.3%",
        "change_4h": "-1.0%",
        "change_8h": "-1.9%"
      },
      {
        "coin": "DOS",
        "score": 100,
        "price": "0.2918",
        "change_24h": "+5.0%",
        "change_4h": "+1.7%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "O",
        "score": 100,
        "price": "0.5371",
        "change_24h": "+13.8%",
        "change_4h": "+2.5%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "BROCCOLIF3B",
        "score": 95,
        "price": "0.006431",
        "change_24h": "+7.9%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
      },
      {
        "coin": "ACU",
        "score": 95,
        "price": "0.13151",
        "change_24h": "+10.5%",
        "change_4h": "+2.5%",
        "change_8h": "+5.0%"
      },
      {
        "coin": "FORM",
        "score": 95,
        "price": "0.2533",
        "change_24h": "+7.0%",
        "change_4h": "+1.6%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "RECALL",
        "score": 95,
        "price": "0.04878",
        "change_24h": "+5.2%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "GRIFFAIN",
        "score": 95,
        "price": "0.012436",
        "change_24h": "+7.6%",
        "change_4h": "+1.9%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "COOKIE",
        "score": 95,
        "price": "0.012505",
        "change_24h": "+7.1%",
        "change_4h": "+0.3%",
        "change_8h": "+0.5%"
      },
      {
        "coin": "LISTA",
        "score": 95,
        "price": "0.07343",
        "change_24h": "+9.7%",
        "change_4h": "+2.5%",
        "change_8h": "+5.0%"
      },
      {
        "coin": "INIT",
        "score": 95,
        "price": "0.05899",
        "change_24h": "+10.4%",
        "change_4h": "+2.4%",
        "change_8h": "+4.9%"
      },
      {
        "coin": "CC",
        "score": 90,
        "price": "0.11768",
        "change_24h": "+6.7%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "POWER",
        "score": 90,
        "price": "0.08268",
        "change_24h": "+5.5%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "BLUAI",
        "score": 90,
        "price": "0.013346",
        "change_24h": "+5.8%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "SKR",
        "score": 75,
        "price": "0.010997",
        "change_24h": "+17.4%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "CYS",
        "score": 75,
        "price": "0.7421",
        "change_24h": "+22.7%",
        "change_4h": "+4.8%",
        "change_8h": "+9.5%"
      },
      {
        "coin": "PROM",
        "score": 70,
        "price": "7.119",
        "change_24h": "+39.0%",
        "change_4h": "+8.9%",
        "change_8h": "+17.9%"
      },
      {
        "coin": "4",
        "score": 70,
        "price": "0.01773",
        "change_24h": "+46.8%",
        "change_4h": "+4.1%",
        "change_8h": "+8.2%"
      },
      {
        "coin": "COLLECT",
        "score": 70,
        "price": "0.07679",
        "change_24h": "+15.1%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "MAGMA",
        "score": 65,
        "price": "0.51321",
        "change_24h": "+2.9%",
        "change_4h": "+2.7%",
        "change_8h": "+5.4%"
      },
      {
        "coin": "ZKP",
        "score": 65,
        "price": "0.05912",
        "change_24h": "+38.0%",
        "change_4h": "+6.4%",
        "change_8h": "+12.8%"
      },
      {
        "coin": "NIL",
        "score": 60,
        "price": "0.05286",
        "change_24h": "+4.8%",
        "change_4h": "-2.5%",
        "change_8h": "-4.9%"
      },
      {
        "coin": "ONG",
        "score": 60,
        "price": "0.12085",
        "change_24h": "+3.6%",
        "change_4h": "-1.2%",
        "change_8h": "-2.4%"
      },
      {
        "coin": "BTR",
        "score": 55,
        "price": "0.17241",
        "change_24h": "+4.9%",
        "change_4h": "-4.1%",
        "change_8h": "-8.1%"
      },
      {
        "coin": "ZEC",
        "score": 55,
        "price": "831.62",
        "change_24h": "+3.2%",
        "change_4h": "+0.7%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "HUMA",
        "score": 50,
        "price": "0.021769",
        "change_24h": "+4.8%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "XAU",
        "score": 50,
        "price": "4474.09",
        "change_24h": "+0.2%",
        "change_4h": "+0.1%",
        "change_8h": "+0.1%"
      },
      {
        "coin": "UNI",
        "score": 50,
        "price": "4.644",
        "change_24h": "+4.9%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "SNDK",
        "score": 50,
        "price": "1492.26",
        "change_24h": "+0.5%",
        "change_4h": "+0.1%",
        "change_8h": "+0.3%"
      },
      {
        "coin": "BTC",
        "score": 50,
        "price": "77983.1",
        "change_24h": "+0.3%",
        "change_4h": "+0.1%",
        "change_8h": "+0.2%"
      },
      {
        "coin": "NEAR",
        "score": 50,
        "price": "1.848",
        "change_24h": "+1.9%",
        "change_4h": "+0.4%",
        "change_8h": "+0.9%"
      },
      {
        "coin": "AAVE",
        "score": 50,
        "price": "125.09",
        "change_24h": "+2.7%",
        "change_4h": "+0.6%",
        "change_8h": "+1.2%"
      },
      {
        "coin": "HYPE",
        "score": 50,
        "price": "83.046",
        "change_24h": "+3.4%",
        "change_4h": "+0.7%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "TUT",
        "score": 50,
        "price": "0.03547",
        "change_24h": "-12.6%",
        "change_4h": "-2.3%",
        "change_8h": "-4.5%"
      },
      {
        "coin": "ETH",
        "score": 50,
        "price": "2453.21",
        "change_24h": "+0.4%",
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
