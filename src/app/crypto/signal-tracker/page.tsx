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
    "label": "今天 · 2026-08-26",
    "data": [
      {
        "coin": "STX",
        "score": 100,
        "price": "0.2701",
        "change_24h": "+13.2%",
        "change_4h": "+1.6%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "ZRO",
        "score": 100,
        "price": "1.1976",
        "change_24h": "+7.0%",
        "change_4h": "+0.2%",
        "change_8h": "+0.3%"
      },
      {
        "coin": "KOMA",
        "score": 100,
        "price": "0.01428",
        "change_24h": "+13.3%",
        "change_4h": "+2.7%",
        "change_8h": "+5.4%"
      },
      {
        "coin": "H",
        "score": 100,
        "price": "0.07879",
        "change_24h": "+12.1%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "SMCI",
        "score": 100,
        "price": "38.23",
        "change_24h": "+9.3%",
        "change_4h": "+1.8%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "EDEN",
        "score": 100,
        "price": "0.05254",
        "change_24h": "+10.9%",
        "change_4h": "+2.6%",
        "change_8h": "+5.2%"
      },
      {
        "coin": "BICO",
        "score": 100,
        "price": "0.02003",
        "change_24h": "+9.9%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "CSOPSKHYNIX2L",
        "score": 100,
        "price": "4.746",
        "change_24h": "+13.8%",
        "change_4h": "+2.3%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "HANA",
        "score": 100,
        "price": "0.01907",
        "change_24h": "+12.5%",
        "change_4h": "-0.5%",
        "change_8h": "-1.1%"
      },
      {
        "coin": "APR",
        "score": 100,
        "price": "0.2327",
        "change_24h": "+13.7%",
        "change_4h": "+2.9%",
        "change_8h": "+5.9%"
      },
      {
        "coin": "HOOD",
        "score": 100,
        "price": "110.96",
        "change_24h": "+6.0%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "ZHIPU",
        "score": 100,
        "price": "136.83",
        "change_24h": "+5.5%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "ONT",
        "score": 100,
        "price": "0.05251",
        "change_24h": "+5.2%",
        "change_4h": "-0.0%",
        "change_8h": "-0.0%"
      },
      {
        "coin": "SKHYNIX",
        "score": 100,
        "price": "1214.23",
        "change_24h": "+6.6%",
        "change_4h": "+1.1%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "SPX",
        "score": 100,
        "price": "0.526",
        "change_24h": "+13.3%",
        "change_4h": "+1.9%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "MRNA",
        "score": 100,
        "price": "155.8",
        "change_24h": "+8.8%",
        "change_4h": "+1.7%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "LITE",
        "score": 100,
        "price": "869.51",
        "change_24h": "+5.1%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
      },
      {
        "coin": "TWT",
        "score": 100,
        "price": "0.4652",
        "change_24h": "+10.1%",
        "change_4h": "+2.4%",
        "change_8h": "+4.8%"
      },
      {
        "coin": "KORU",
        "score": 100,
        "price": "20.12",
        "change_24h": "+9.3%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "TLM",
        "score": 100,
        "price": "0.001567",
        "change_24h": "+10.8%",
        "change_4h": "+0.2%",
        "change_8h": "+0.5%"
      },
      {
        "coin": "CYS",
        "score": 100,
        "price": "0.672",
        "change_24h": "+7.1%",
        "change_4h": "-0.5%",
        "change_8h": "-1.0%"
      },
      {
        "coin": "FF",
        "score": 100,
        "price": "0.10111",
        "change_24h": "+12.3%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "BTR",
        "score": 100,
        "price": "0.03319",
        "change_24h": "+12.5%",
        "change_4h": "+1.7%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "MVLL",
        "score": 100,
        "price": "30.74",
        "change_24h": "+7.4%",
        "change_4h": "-0.1%",
        "change_8h": "-0.2%"
      },
      {
        "coin": "POL",
        "score": 100,
        "price": "0.12213",
        "change_24h": "+5.3%",
        "change_4h": "+0.3%",
        "change_8h": "+0.5%"
      },
      {
        "coin": "JCT",
        "score": 95,
        "price": "0.002313",
        "change_24h": "+11.5%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "CSOPSAMSUNG2L",
        "score": 95,
        "price": "9.22",
        "change_24h": "+6.5%",
        "change_4h": "+0.6%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "PLAY",
        "score": 95,
        "price": "0.03953",
        "change_24h": "+8.7%",
        "change_4h": "+2.6%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "TA",
        "score": 95,
        "price": "0.05914",
        "change_24h": "+8.1%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "ACU",
        "score": 95,
        "price": "0.12284",
        "change_24h": "+11.3%",
        "change_4h": "+3.0%",
        "change_8h": "+6.1%"
      },
      {
        "coin": "SOLV",
        "score": 95,
        "price": "0.00282",
        "change_24h": "+5.1%",
        "change_4h": "-1.3%",
        "change_8h": "-2.6%"
      },
      {
        "coin": "LIGHT",
        "score": 95,
        "price": "0.1595",
        "change_24h": "+8.9%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "DOS",
        "score": 95,
        "price": "0.2392",
        "change_24h": "+5.3%",
        "change_4h": "-0.2%",
        "change_8h": "-0.3%"
      },
      {
        "coin": "PTB",
        "score": 95,
        "price": "0.000813",
        "change_24h": "+5.2%",
        "change_4h": "+1.3%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "IREN",
        "score": 95,
        "price": "41.61",
        "change_24h": "+5.2%",
        "change_4h": "+0.8%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "YB",
        "score": 95,
        "price": "0.096",
        "change_24h": "+5.3%",
        "change_4h": "+0.7%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "INX",
        "score": 90,
        "price": "0.007041",
        "change_24h": "+7.4%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "GIGADEV",
        "score": 90,
        "price": "62.81",
        "change_24h": "+7.6%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "XPIN",
        "score": 90,
        "price": "0.001109",
        "change_24h": "+5.0%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "KGEN",
        "score": 90,
        "price": "0.1847",
        "change_24h": "+6.9%",
        "change_4h": "+1.6%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "PAYP",
        "score": 90,
        "price": "16.04",
        "change_24h": "+5.8%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "PROM",
        "score": 85,
        "price": "4.466",
        "change_24h": "+18.9%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "ONG",
        "score": 85,
        "price": "0.09862",
        "change_24h": "+15.3%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "TAC",
        "score": 85,
        "price": "0.002653",
        "change_24h": "+18.8%",
        "change_4h": "+5.2%",
        "change_8h": "+10.3%"
      },
      {
        "coin": "BR",
        "score": 75,
        "price": "0.26644",
        "change_24h": "+18.9%",
        "change_4h": "+3.5%",
        "change_8h": "+7.1%"
      },
      {
        "coin": "CRCL",
        "score": 60,
        "price": "91.26",
        "change_24h": "+3.1%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "STAR",
        "score": 60,
        "price": "0.16862",
        "change_24h": "+32.1%",
        "change_4h": "+4.9%",
        "change_8h": "+9.8%"
      },
      {
        "coin": "TUT",
        "score": 60,
        "price": "0.04783",
        "change_24h": "+2.1%",
        "change_4h": "+2.0%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "SKHY",
        "score": 55,
        "price": "158.34",
        "change_24h": "+4.1%",
        "change_4h": "+0.5%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "SAMSUNG",
        "score": 55,
        "price": "186.05",
        "change_24h": "+3.6%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
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
