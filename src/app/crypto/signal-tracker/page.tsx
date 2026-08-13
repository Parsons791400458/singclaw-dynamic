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
    "label": "今天 · 2026-08-13",
    "data": [
      {
        "coin": "LITE",
        "score": 100,
        "price": "930.46",
        "change_24h": "+8.9%",
        "change_4h": "+1.6%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "DRAM",
        "score": 100,
        "price": "55.37",
        "change_24h": "+7.1%",
        "change_4h": "+1.4%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "MOVE",
        "score": 100,
        "price": "0.006737",
        "change_24h": "+6.7%",
        "change_4h": "+2.2%",
        "change_8h": "+4.3%"
      },
      {
        "coin": "EUL",
        "score": 100,
        "price": "1.1934",
        "change_24h": "+6.2%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "MUBARAK",
        "score": 100,
        "price": "0.01879",
        "change_24h": "+6.0%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "SMCI",
        "score": 100,
        "price": "37.34",
        "change_24h": "+9.6%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "MUU",
        "score": 100,
        "price": "29.25",
        "change_24h": "+12.6%",
        "change_4h": "+2.3%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "SOXL",
        "score": 100,
        "price": "143.48",
        "change_24h": "+6.3%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "ONE",
        "score": 100,
        "price": "0.000782",
        "change_24h": "+9.4%",
        "change_4h": "-9.7%",
        "change_8h": "-19.4%"
      },
      {
        "coin": "BE",
        "score": 100,
        "price": "239.19",
        "change_24h": "+11.9%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "GUA",
        "score": 100,
        "price": "0.05167",
        "change_24h": "+11.3%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "AT",
        "score": 100,
        "price": "0.1654",
        "change_24h": "+6.9%",
        "change_4h": "+1.3%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "NOK",
        "score": 100,
        "price": "10.4",
        "change_24h": "+9.8%",
        "change_4h": "+2.2%",
        "change_8h": "+4.3%"
      },
      {
        "coin": "KOMA",
        "score": 100,
        "price": "0.014396",
        "change_24h": "+7.9%",
        "change_4h": "+0.2%",
        "change_8h": "+0.4%"
      },
      {
        "coin": "VIRTUAL",
        "score": 100,
        "price": "0.591",
        "change_24h": "+10.2%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "SAMSUNG",
        "score": 100,
        "price": "188.0",
        "change_24h": "+6.5%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "VELVET",
        "score": 100,
        "price": "0.6709",
        "change_24h": "+12.3%",
        "change_4h": "+2.9%",
        "change_8h": "+5.8%"
      },
      {
        "coin": "WEN",
        "score": 100,
        "price": "8.64",
        "change_24h": "+14.6%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "MU",
        "score": 100,
        "price": "923.69",
        "change_24h": "+6.4%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "BANK",
        "score": 100,
        "price": "0.0386",
        "change_24h": "+8.9%",
        "change_4h": "+2.0%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "KORU",
        "score": 100,
        "price": "20.6",
        "change_24h": "+12.3%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "DELL",
        "score": 100,
        "price": "482.76",
        "change_24h": "+7.6%",
        "change_4h": "+1.8%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "SNXX",
        "score": 100,
        "price": "11.32",
        "change_24h": "+13.0%",
        "change_4h": "+2.0%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "SNDK",
        "score": 100,
        "price": "1358.06",
        "change_24h": "+6.4%",
        "change_4h": "+1.0%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "INTW",
        "score": 100,
        "price": "24.05",
        "change_24h": "+6.7%",
        "change_4h": "+0.9%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "GRVT",
        "score": 100,
        "price": "0.3271",
        "change_24h": "+5.6%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
      },
      {
        "coin": "SKHYNIX",
        "score": 100,
        "price": "1139.34",
        "change_24h": "+9.8%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "ARC",
        "score": 100,
        "price": "0.07116",
        "change_24h": "+7.3%",
        "change_4h": "+1.3%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "MINIMAX",
        "score": 100,
        "price": "45.86",
        "change_24h": "+7.6%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "SPCX",
        "score": 100,
        "price": "145.82",
        "change_24h": "+9.9%",
        "change_4h": "+1.8%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "SKHY",
        "score": 100,
        "price": "155.62",
        "change_24h": "+9.6%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "GWEI",
        "score": 100,
        "price": "0.02519",
        "change_24h": "+7.1%",
        "change_4h": "+2.3%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "STXX",
        "score": 95,
        "price": "875.78",
        "change_24h": "+6.3%",
        "change_4h": "+1.2%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "AIXBT",
        "score": 95,
        "price": "0.01912",
        "change_24h": "+7.3%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "CSOPSAMSUNG2L",
        "score": 95,
        "price": "10.17",
        "change_24h": "+10.4%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "AIOT",
        "score": 95,
        "price": "0.0408",
        "change_24h": "+8.6%",
        "change_4h": "+1.7%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "ACU",
        "score": 95,
        "price": "0.09584",
        "change_24h": "+7.4%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "CRDO",
        "score": 95,
        "price": "268.86",
        "change_24h": "+7.4%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "POWER",
        "score": 90,
        "price": "0.09989",
        "change_24h": "+7.6%",
        "change_4h": "+1.6%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "SAGA",
        "score": 90,
        "price": "0.01425",
        "change_24h": "+5.0%",
        "change_4h": "+0.6%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "GIGADEV",
        "score": 90,
        "price": "67.79",
        "change_24h": "+5.9%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "AGT",
        "score": 90,
        "price": "0.015446",
        "change_24h": "+6.1%",
        "change_4h": "-2.1%",
        "change_8h": "-4.2%"
      },
      {
        "coin": "FIGHT",
        "score": 90,
        "price": "0.003928",
        "change_24h": "+5.5%",
        "change_4h": "-0.2%",
        "change_8h": "-0.4%"
      },
      {
        "coin": "HPE",
        "score": 90,
        "price": "58.48",
        "change_24h": "+6.7%",
        "change_4h": "+1.3%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "COTI",
        "score": 85,
        "price": "0.012459",
        "change_24h": "+22.7%",
        "change_4h": "+3.4%",
        "change_8h": "+6.8%"
      },
      {
        "coin": "BTW",
        "score": 85,
        "price": "0.2583",
        "change_24h": "+24.0%",
        "change_4h": "+7.0%",
        "change_8h": "+14.0%"
      },
      {
        "coin": "NBIS",
        "score": 85,
        "price": "253.27",
        "change_24h": "+22.7%",
        "change_4h": "+3.9%",
        "change_8h": "+7.7%"
      },
      {
        "coin": "NIL",
        "score": 75,
        "price": "0.04212",
        "change_24h": "+19.3%",
        "change_4h": "+2.6%",
        "change_8h": "+5.2%"
      },
      {
        "coin": "QNTX",
        "score": 70,
        "price": "71.24",
        "change_24h": "+26.8%",
        "change_4h": "+5.7%",
        "change_8h": "+11.3%"
      },
      {
        "coin": "CYS",
        "score": 70,
        "price": "1.6394",
        "change_24h": "+42.0%",
        "change_4h": "+12.1%",
        "change_8h": "+24.2%"
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
