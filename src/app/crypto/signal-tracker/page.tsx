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
    "label": "今天 · 2026-07-01",
    "data": [
      {
        "coin": "XLM",
        "score": 100,
        "price": "0.20424",
        "change_24h": "+11.8%",
        "change_4h": "+3.6%",
        "change_8h": "+7.1%"
      },
      {
        "coin": "AMD",
        "score": 100,
        "price": "579.4",
        "change_24h": "+6.9%",
        "change_4h": "+1.7%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "SYN",
        "score": 100,
        "price": "0.51325",
        "change_24h": "+5.6%",
        "change_4h": "-7.3%",
        "change_8h": "-14.6%"
      },
      {
        "coin": "QNTX",
        "score": 100,
        "price": "82.1",
        "change_24h": "+12.6%",
        "change_4h": "+3.8%",
        "change_8h": "+7.6%"
      },
      {
        "coin": "MVLL",
        "score": 100,
        "price": "56.38",
        "change_24h": "+10.4%",
        "change_4h": "+2.6%",
        "change_8h": "+5.3%"
      },
      {
        "coin": "CYS",
        "score": 100,
        "price": "0.37",
        "change_24h": "+12.6%",
        "change_4h": "+3.2%",
        "change_8h": "+6.4%"
      },
      {
        "coin": "NFP",
        "score": 100,
        "price": "0.005555",
        "change_24h": "+7.8%",
        "change_4h": "+5.1%",
        "change_8h": "+10.3%"
      },
      {
        "coin": "PYTH",
        "score": 100,
        "price": "0.0401",
        "change_24h": "+10.5%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "AIOT",
        "score": 100,
        "price": "0.05413",
        "change_24h": "+11.5%",
        "change_4h": "+0.1%",
        "change_8h": "+0.1%"
      },
      {
        "coin": "APR",
        "score": 100,
        "price": "0.2285",
        "change_24h": "+10.4%",
        "change_4h": "+1.5%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "CAP",
        "score": 100,
        "price": "0.02648",
        "change_24h": "+5.8%",
        "change_4h": "-5.3%",
        "change_8h": "-10.5%"
      },
      {
        "coin": "TAC",
        "score": 100,
        "price": "0.06298",
        "change_24h": "+5.7%",
        "change_4h": "+0.6%",
        "change_8h": "+1.2%"
      },
      {
        "coin": "SNDK",
        "score": 100,
        "price": "2222.28",
        "change_24h": "+6.5%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "MRVL",
        "score": 100,
        "price": "295.41",
        "change_24h": "+5.6%",
        "change_4h": "+1.4%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "BEAT",
        "score": 100,
        "price": "3.216",
        "change_24h": "+14.7%",
        "change_4h": "+4.6%",
        "change_8h": "+9.1%"
      },
      {
        "coin": "XAN",
        "score": 100,
        "price": "0.01056",
        "change_24h": "+11.8%",
        "change_4h": "+3.0%",
        "change_8h": "+6.0%"
      },
      {
        "coin": "SOXL",
        "score": 100,
        "price": "264.65",
        "change_24h": "+9.4%",
        "change_4h": "+2.0%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "ALAB",
        "score": 100,
        "price": "484.38",
        "change_24h": "+6.0%",
        "change_4h": "+1.0%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "CRDO",
        "score": 100,
        "price": "271.4",
        "change_24h": "+8.9%",
        "change_4h": "+2.2%",
        "change_8h": "+4.3%"
      },
      {
        "coin": "GLM",
        "score": 100,
        "price": "0.10494",
        "change_24h": "+7.8%",
        "change_4h": "-1.4%",
        "change_8h": "-2.7%"
      },
      {
        "coin": "BIO",
        "score": 100,
        "price": "0.0298",
        "change_24h": "+6.6%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "STG",
        "score": 100,
        "price": "0.1761",
        "change_24h": "+7.4%",
        "change_4h": "+1.4%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "BSV",
        "score": 95,
        "price": "13.62",
        "change_24h": "+8.9%",
        "change_4h": "+2.3%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "NMR",
        "score": 95,
        "price": "8.923",
        "change_24h": "+6.3%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "BEAMX",
        "score": 95,
        "price": "0.001443",
        "change_24h": "+7.6%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "VELODROME",
        "score": 95,
        "price": "0.01965",
        "change_24h": "+8.1%",
        "change_4h": "+2.5%",
        "change_8h": "+5.0%"
      },
      {
        "coin": "XPIN",
        "score": 95,
        "price": "0.001421",
        "change_24h": "+12.2%",
        "change_4h": "+2.6%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "KLAC",
        "score": 95,
        "price": "303.48",
        "change_24h": "+6.3%",
        "change_4h": "+1.6%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "HIMS",
        "score": 95,
        "price": "34.56",
        "change_24h": "+5.1%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "SFP",
        "score": 95,
        "price": "0.2269",
        "change_24h": "+8.5%",
        "change_4h": "+2.8%",
        "change_8h": "+5.6%"
      },
      {
        "coin": "BTW",
        "score": 85,
        "price": "0.06201",
        "change_24h": "+15.6%",
        "change_4h": "+0.2%",
        "change_8h": "+0.3%"
      },
      {
        "coin": "RIF",
        "score": 80,
        "price": "0.08884",
        "change_24h": "+19.5%",
        "change_4h": "+3.2%",
        "change_8h": "+6.4%"
      },
      {
        "coin": "H",
        "score": 80,
        "price": "0.08777",
        "change_24h": "+23.6%",
        "change_4h": "+3.8%",
        "change_8h": "+7.7%"
      },
      {
        "coin": "BE",
        "score": 75,
        "price": "328.71",
        "change_24h": "+18.2%",
        "change_4h": "+2.5%",
        "change_8h": "+4.9%"
      },
      {
        "coin": "DYDX",
        "score": 75,
        "price": "0.2031",
        "change_24h": "+29.0%",
        "change_4h": "+6.4%",
        "change_8h": "+12.8%"
      },
      {
        "coin": "M",
        "score": 75,
        "price": "0.802",
        "change_24h": "+17.9%",
        "change_4h": "+4.7%",
        "change_8h": "+9.4%"
      },
      {
        "coin": "ZBT",
        "score": 75,
        "price": "0.12571",
        "change_24h": "+20.4%",
        "change_4h": "+4.9%",
        "change_8h": "+9.9%"
      },
      {
        "coin": "TRIA",
        "score": 70,
        "price": "0.02047",
        "change_24h": "+18.1%",
        "change_4h": "+4.4%",
        "change_8h": "+8.7%"
      },
      {
        "coin": "XNY",
        "score": 70,
        "price": "0.005979",
        "change_24h": "+19.0%",
        "change_4h": "-1.4%",
        "change_8h": "-2.8%"
      },
      {
        "coin": "BASED",
        "score": 65,
        "price": "0.10423",
        "change_24h": "+30.6%",
        "change_4h": "+6.4%",
        "change_8h": "+12.8%"
      },
      {
        "coin": "CBRS",
        "score": 55,
        "price": "218.95",
        "change_24h": "+0.9%",
        "change_4h": "+1.4%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "ADA",
        "score": 55,
        "price": "0.1498",
        "change_24h": "+3.6%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "SOL",
        "score": 55,
        "price": "75.39",
        "change_24h": "+1.4%",
        "change_4h": "+1.1%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "NBIS",
        "score": 55,
        "price": "277.11",
        "change_24h": "+4.1%",
        "change_4h": "+0.7%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "INTC",
        "score": 55,
        "price": "138.84",
        "change_24h": "+4.6%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "SPCX",
        "score": 55,
        "price": "170.85",
        "change_24h": "+4.7%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "ETH",
        "score": 50,
        "price": "1593.93",
        "change_24h": "+0.3%",
        "change_4h": "+0.7%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "FIL",
        "score": 50,
        "price": "0.734",
        "change_24h": "+0.8%",
        "change_4h": "+0.9%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "CLO",
        "score": 50,
        "price": "0.15077",
        "change_24h": "+1.7%",
        "change_4h": "-0.8%",
        "change_8h": "-1.5%"
      },
      {
        "coin": "BCH",
        "score": 50,
        "price": "208.72",
        "change_24h": "+4.4%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
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
