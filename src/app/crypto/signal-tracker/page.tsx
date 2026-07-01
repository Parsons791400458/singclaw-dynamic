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
        "coin": "AIOT",
        "score": 100,
        "price": "0.05259",
        "change_24h": "+8.4%",
        "change_4h": "-1.4%",
        "change_8h": "-2.7%"
      },
      {
        "coin": "MRVL",
        "score": 100,
        "price": "294.22",
        "change_24h": "+6.5%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "CLO",
        "score": 100,
        "price": "0.1492",
        "change_24h": "+12.2%",
        "change_4h": "-0.2%",
        "change_8h": "-0.4%"
      },
      {
        "coin": "XLM",
        "score": 100,
        "price": "0.19541",
        "change_24h": "+11.7%",
        "change_4h": "+2.9%",
        "change_8h": "+5.7%"
      },
      {
        "coin": "MVLL",
        "score": 100,
        "price": "55.65",
        "change_24h": "+12.5%",
        "change_4h": "+2.0%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "SNDK",
        "score": 100,
        "price": "2212.89",
        "change_24h": "+7.3%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "DODOX",
        "score": 100,
        "price": "0.020066",
        "change_24h": "+6.2%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "KLAC",
        "score": 100,
        "price": "303.46",
        "change_24h": "+8.5%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "AGT",
        "score": 100,
        "price": "0.021527",
        "change_24h": "+5.8%",
        "change_4h": "-0.0%",
        "change_8h": "-0.1%"
      },
      {
        "coin": "ALAB",
        "score": 100,
        "price": "482.65",
        "change_24h": "+6.7%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "TRIA",
        "score": 100,
        "price": "0.01987",
        "change_24h": "+13.7%",
        "change_4h": "+2.8%",
        "change_8h": "+5.6%"
      },
      {
        "coin": "H",
        "score": 100,
        "price": "0.08598",
        "change_24h": "+15.0%",
        "change_4h": "+2.7%",
        "change_8h": "+5.5%"
      },
      {
        "coin": "AMD",
        "score": 100,
        "price": "578.42",
        "change_24h": "+7.4%",
        "change_4h": "+1.6%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "SYN",
        "score": 100,
        "price": "0.55477",
        "change_24h": "+5.7%",
        "change_4h": "-3.9%",
        "change_8h": "-7.7%"
      },
      {
        "coin": "TAC",
        "score": 100,
        "price": "0.063312",
        "change_24h": "+10.6%",
        "change_4h": "+1.6%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "DYDX",
        "score": 100,
        "price": "0.1785",
        "change_24h": "+13.2%",
        "change_4h": "+3.0%",
        "change_8h": "+6.0%"
      },
      {
        "coin": "APR",
        "score": 100,
        "price": "0.2264",
        "change_24h": "+10.6%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "CYS",
        "score": 100,
        "price": "0.3708",
        "change_24h": "+10.7%",
        "change_4h": "+3.3%",
        "change_8h": "+6.7%"
      },
      {
        "coin": "BIO",
        "score": 100,
        "price": "0.02931",
        "change_24h": "+5.3%",
        "change_4h": "+0.6%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "QNTX",
        "score": 100,
        "price": "80.92",
        "change_24h": "+10.5%",
        "change_4h": "+3.0%",
        "change_8h": "+6.1%"
      },
      {
        "coin": "GLM",
        "score": 100,
        "price": "0.1037",
        "change_24h": "+6.7%",
        "change_4h": "-1.9%",
        "change_8h": "-3.9%"
      },
      {
        "coin": "NBIS",
        "score": 100,
        "price": "276.67",
        "change_24h": "+5.1%",
        "change_4h": "+0.6%",
        "change_8h": "+1.2%"
      },
      {
        "coin": "INTC",
        "score": 100,
        "price": "138.78",
        "change_24h": "+5.6%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "SOXL",
        "score": 100,
        "price": "264.35",
        "change_24h": "+11.4%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "CRDO",
        "score": 100,
        "price": "271.51",
        "change_24h": "+10.3%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "BEAMX",
        "score": 95,
        "price": "0.001427",
        "change_24h": "+5.3%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "NMR",
        "score": 95,
        "price": "8.785",
        "change_24h": "+5.1%",
        "change_4h": "+0.4%",
        "change_8h": "+0.9%"
      },
      {
        "coin": "STG",
        "score": 95,
        "price": "0.1725",
        "change_24h": "+6.3%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "XPIN",
        "score": 95,
        "price": "0.001376",
        "change_24h": "+7.3%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "XAN",
        "score": 95,
        "price": "0.010656",
        "change_24h": "+14.6%",
        "change_4h": "+4.1%",
        "change_8h": "+8.1%"
      },
      {
        "coin": "ASML",
        "score": 90,
        "price": "1981.43",
        "change_24h": "+5.4%",
        "change_4h": "+1.0%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "AIGENSYN",
        "score": 85,
        "price": "0.03632",
        "change_24h": "+22.1%",
        "change_4h": "+3.0%",
        "change_8h": "+6.0%"
      },
      {
        "coin": "RIF",
        "score": 80,
        "price": "0.09093",
        "change_24h": "+24.8%",
        "change_4h": "+4.4%",
        "change_8h": "+8.9%"
      },
      {
        "coin": "BASED",
        "score": 80,
        "price": "0.10425",
        "change_24h": "+29.5%",
        "change_4h": "+7.5%",
        "change_8h": "+15.0%"
      },
      {
        "coin": "BE",
        "score": 75,
        "price": "326.98",
        "change_24h": "+18.6%",
        "change_4h": "+2.3%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "BTW",
        "score": 75,
        "price": "0.06049",
        "change_24h": "+15.5%",
        "change_4h": "-1.0%",
        "change_8h": "-2.0%"
      },
      {
        "coin": "M",
        "score": 75,
        "price": "0.7356",
        "change_24h": "+19.0%",
        "change_4h": "+4.0%",
        "change_8h": "+8.1%"
      },
      {
        "coin": "TAIKO",
        "score": 75,
        "price": "0.08",
        "change_24h": "+19.4%",
        "change_4h": "-0.4%",
        "change_8h": "-0.8%"
      },
      {
        "coin": "ZBT",
        "score": 70,
        "price": "0.12281",
        "change_24h": "+15.6%",
        "change_4h": "+4.8%",
        "change_8h": "+9.6%"
      },
      {
        "coin": "XNY",
        "score": 65,
        "price": "0.005948",
        "change_24h": "+19.0%",
        "change_4h": "-1.5%",
        "change_8h": "-3.0%"
      },
      {
        "coin": "SPCX",
        "score": 55,
        "price": "170.11",
        "change_24h": "+4.6%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "OPG",
        "score": 55,
        "price": "0.1311",
        "change_24h": "+0.7%",
        "change_4h": "+2.3%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "LAB",
        "score": 55,
        "price": "13.119",
        "change_24h": "-6.0%",
        "change_4h": "+2.5%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "CBRS",
        "score": 55,
        "price": "216.76",
        "change_24h": "+1.0%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "RKLB",
        "score": 50,
        "price": "100.42",
        "change_24h": "+0.4%",
        "change_4h": "+0.2%",
        "change_8h": "+0.4%"
      },
      {
        "coin": "TSLA",
        "score": 50,
        "price": "415.8",
        "change_24h": "+1.7%",
        "change_4h": "+0.2%",
        "change_8h": "+0.4%"
      },
      {
        "coin": "PYTH",
        "score": 50,
        "price": "0.03741",
        "change_24h": "+4.5%",
        "change_4h": "-2.1%",
        "change_8h": "-4.3%"
      },
      {
        "coin": "BEAT",
        "score": 50,
        "price": "2.943",
        "change_24h": "+5.0%",
        "change_4h": "+1.7%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "LIT",
        "score": 50,
        "price": "1.8582",
        "change_24h": "+0.9%",
        "change_4h": "-1.0%",
        "change_8h": "-2.1%"
      },
      {
        "coin": "QQQ",
        "score": 50,
        "price": "735.03",
        "change_24h": "+1.4%",
        "change_4h": "+0.3%",
        "change_8h": "+0.7%"
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
