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
    "label": "今天 · 2026-08-19",
    "data": [
      {
        "coin": "GPS",
        "score": 100,
        "price": "0.018467",
        "change_24h": "+10.4%",
        "change_4h": "+3.7%",
        "change_8h": "+7.4%"
      },
      {
        "coin": "OPG",
        "score": 100,
        "price": "0.1028",
        "change_24h": "+5.3%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "ESPORTS",
        "score": 100,
        "price": "0.01672",
        "change_24h": "+9.0%",
        "change_4h": "+3.2%",
        "change_8h": "+6.4%"
      },
      {
        "coin": "PUMP",
        "score": 100,
        "price": "0.003109",
        "change_24h": "+12.3%",
        "change_4h": "+3.0%",
        "change_8h": "+6.1%"
      },
      {
        "coin": "PEOPLE",
        "score": 100,
        "price": "0.007584",
        "change_24h": "+6.7%",
        "change_4h": "+0.7%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "1000RATS",
        "score": 100,
        "price": "0.04535",
        "change_24h": "+12.8%",
        "change_4h": "-2.2%",
        "change_8h": "-4.4%"
      },
      {
        "coin": "HOLO",
        "score": 100,
        "price": "0.05615",
        "change_24h": "+5.3%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "HEI",
        "score": 100,
        "price": "0.13537",
        "change_24h": "+5.7%",
        "change_4h": "-0.7%",
        "change_8h": "-1.4%"
      },
      {
        "coin": "OPN",
        "score": 100,
        "price": "0.0565",
        "change_24h": "+7.0%",
        "change_4h": "-0.9%",
        "change_8h": "-1.9%"
      },
      {
        "coin": "VVV",
        "score": 100,
        "price": "13.957",
        "change_24h": "+5.9%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "VELVET",
        "score": 100,
        "price": "0.6425",
        "change_24h": "+11.5%",
        "change_4h": "+4.8%",
        "change_8h": "+9.7%"
      },
      {
        "coin": "PRL",
        "score": 100,
        "price": "0.4548",
        "change_24h": "+10.1%",
        "change_4h": "+1.8%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "EDEN",
        "score": 100,
        "price": "0.05132",
        "change_24h": "+6.9%",
        "change_4h": "-2.1%",
        "change_8h": "-4.1%"
      },
      {
        "coin": "DOS",
        "score": 100,
        "price": "0.2433",
        "change_24h": "+10.3%",
        "change_4h": "+2.5%",
        "change_8h": "+5.0%"
      },
      {
        "coin": "XAI",
        "score": 100,
        "price": "0.007249",
        "change_24h": "+5.1%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "UB",
        "score": 100,
        "price": "0.12147",
        "change_24h": "+8.4%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "ENSO",
        "score": 100,
        "price": "0.809",
        "change_24h": "+6.2%",
        "change_4h": "+0.6%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "APR",
        "score": 100,
        "price": "0.1987",
        "change_24h": "+6.6%",
        "change_4h": "-0.8%",
        "change_8h": "-1.7%"
      },
      {
        "coin": "PIPPIN",
        "score": 100,
        "price": "0.01803",
        "change_24h": "+6.4%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "O",
        "score": 95,
        "price": "0.4889",
        "change_24h": "+11.0%",
        "change_4h": "+2.4%",
        "change_8h": "+4.8%"
      },
      {
        "coin": "AEVO",
        "score": 95,
        "price": "0.02096",
        "change_24h": "+5.2%",
        "change_4h": "+1.1%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "MAGMA",
        "score": 95,
        "price": "0.1709",
        "change_24h": "+6.9%",
        "change_4h": "+0.4%",
        "change_8h": "+0.9%"
      },
      {
        "coin": "AGT",
        "score": 95,
        "price": "0.016281",
        "change_24h": "+9.3%",
        "change_4h": "+0.5%",
        "change_8h": "+0.9%"
      },
      {
        "coin": "ARIA",
        "score": 95,
        "price": "0.03518",
        "change_24h": "+6.9%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "BR",
        "score": 95,
        "price": "0.20709",
        "change_24h": "+6.9%",
        "change_4h": "+2.6%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "FWDI",
        "score": 90,
        "price": "4.52",
        "change_24h": "+6.6%",
        "change_4h": "+1.8%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "Q",
        "score": 90,
        "price": "0.02116",
        "change_24h": "+5.5%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "LIGHT",
        "score": 90,
        "price": "0.1838",
        "change_24h": "+6.3%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "BTW",
        "score": 85,
        "price": "0.43922",
        "change_24h": "+23.1%",
        "change_4h": "+5.3%",
        "change_8h": "+10.5%"
      },
      {
        "coin": "SOXS",
        "score": 85,
        "price": "44.06",
        "change_24h": "+15.5%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "CLO",
        "score": 80,
        "price": "0.13877",
        "change_24h": "+19.5%",
        "change_4h": "+1.8%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "ALPINE",
        "score": 80,
        "price": "0.3697",
        "change_24h": "+17.7%",
        "change_4h": "+0.2%",
        "change_8h": "+0.4%"
      },
      {
        "coin": "TRIA",
        "score": 75,
        "price": "0.010211",
        "change_24h": "+23.6%",
        "change_4h": "+5.4%",
        "change_8h": "+10.9%"
      },
      {
        "coin": "LA",
        "score": 75,
        "price": "0.05754",
        "change_24h": "+15.2%",
        "change_4h": "+2.7%",
        "change_8h": "+5.5%"
      },
      {
        "coin": "CYS",
        "score": 65,
        "price": "0.5109",
        "change_24h": "+4.2%",
        "change_4h": "+0.7%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "AKE",
        "score": 60,
        "price": "0.009056",
        "change_24h": "+2.3%",
        "change_4h": "-0.8%",
        "change_8h": "-1.7%"
      },
      {
        "coin": "RED",
        "score": 55,
        "price": "0.0909",
        "change_24h": "+3.6%",
        "change_4h": "-4.6%",
        "change_8h": "-9.3%"
      },
      {
        "coin": "LINK",
        "score": 50,
        "price": "9.506",
        "change_24h": "+0.2%",
        "change_4h": "+0.4%",
        "change_8h": "+0.7%"
      },
      {
        "coin": "BZ",
        "score": 50,
        "price": "90.24",
        "change_24h": "+1.1%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "CL",
        "score": 50,
        "price": "84.92",
        "change_24h": "+1.0%",
        "change_4h": "+0.2%",
        "change_8h": "+0.5%"
      },
      {
        "coin": "ETH",
        "score": 50,
        "price": "1914.42",
        "change_24h": "+0.4%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "SOL",
        "score": 50,
        "price": "76.8",
        "change_24h": "+1.3%",
        "change_4h": "+0.3%",
        "change_8h": "+0.7%"
      },
      {
        "coin": "HEMI",
        "score": 50,
        "price": "0.007085",
        "change_24h": "+3.7%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
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
